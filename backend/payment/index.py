import json
import os
import uuid
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Create payment for Minecraft donation
    Args: event with httpMethod, body (nickname, privilege_id, amount)
    Returns: HTTP response with payment URL
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    nickname = body_data.get('nickname', '')
    privilege_id = body_data.get('privilege_id')
    amount = body_data.get('amount', 0)
    
    if not nickname or not privilege_id or amount <= 0:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Missing required fields'})
        }
    
    shop_id = os.environ.get('YOOKASSA_SHOP_ID')
    secret_key = os.environ.get('YOOKASSA_SECRET_KEY')
    
    if not shop_id or not secret_key:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Payment credentials not configured'})
        }
    
    import requests
    import base64
    
    auth_string = f"{shop_id}:{secret_key}"
    auth_bytes = auth_string.encode('ascii')
    base64_auth = base64.b64encode(auth_bytes).decode('ascii')
    
    payment_id = str(uuid.uuid4())
    
    payment_data = {
        'amount': {
            'value': str(amount),
            'currency': 'RUB'
        },
        'confirmation': {
            'type': 'redirect',
            'return_url': 'https://dexland.org/success'
        },
        'capture': True,
        'description': f'Privilege for {nickname}',
        'metadata': {
            'nickname': nickname,
            'privilege_id': str(privilege_id)
        }
    }
    
    headers = {
        'Authorization': f'Basic {base64_auth}',
        'Idempotence-Key': payment_id,
        'Content-Type': 'application/json'
    }
    
    response = requests.post(
        'https://api.yookassa.ru/v3/payments',
        json=payment_data,
        headers=headers
    )
    
    if response.status_code != 200:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Payment creation failed', 'details': response.text})
        }
    
    payment_response = response.json()
    confirmation_url = payment_response.get('confirmation', {}).get('confirmation_url', '')
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({
            'payment_url': confirmation_url,
            'payment_id': payment_response.get('id')
        })
    }
