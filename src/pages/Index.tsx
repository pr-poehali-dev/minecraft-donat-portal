import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Privilege {
  id: number;
  name: string;
  price: number;
  description: string;
}

const Index = () => {
  const [nickname, setNickname] = useState('');
  const [selectedPrivilege, setSelectedPrivilege] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!nickname || selectedPrivilege === null) return;

    const privilege = privileges.find(p => p.id === selectedPrivilege);
    if (!privilege) return;

    setIsLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/49bba333-84b0-446d-8280-2c49ac5d7e09', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname,
          privilege_id: selectedPrivilege,
          amount: privilege.price
        })
      });

      const data = await response.json();

      if (response.ok && data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        alert('Ошибка создания платежа: ' + (data.error || 'Неизвестная ошибка'));
      }
    } catch (error) {
      alert('Ошибка соединения с сервером');
    } finally {
      setIsLoading(false);
    }
  };

  const privileges: Privilege[] = [
    {
      id: 1,
      name: 'VIP',
      price: 30,
      description: 'Базовые привилегии для комфортной игры'
    },
    {
      id: 2,
      name: 'PREMIUM',
      price: 499,
      description: 'Расширенный набор возможностей'
    },
    {
      id: 3,
      name: 'ULTIMATE',
      price: 999,
      description: 'Максимум привилегий на сервере'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200">
      <nav className="bg-[#111111] border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">DEXLAND</h1>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition">Главная</a>
              <a href="#donate" className="text-gray-400 hover:text-white transition">Донат</a>
              <a href="#rules" className="text-gray-400 hover:text-white transition">Правила</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <section id="home" className="mb-16 text-center">
          <h2 className="text-5xl font-bold text-white mb-4">Магазин привилегий</h2>
          <p className="text-xl text-gray-400 mb-8">Покупка доната, привилегий, ключей</p>
          <div className="inline-flex items-center gap-2 bg-[#111111] px-6 py-3 rounded-lg border border-gray-800">
            <Icon name="Server" size={20} className="text-green-500" />
            <span className="text-gray-300">IP сервера:</span>
            <span className="text-white font-mono">mc.dexland.org</span>
          </div>
        </section>

        <section id="donate" className="mb-16">
          <Tabs defaultValue="privileges" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#111111] border border-gray-800 mb-8">
              <TabsTrigger 
                value="privileges" 
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                <Icon name="Crown" size={18} className="mr-2" />
                Привилегии
              </TabsTrigger>
              <TabsTrigger 
                value="keys"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                <Icon name="Key" size={18} className="mr-2" />
                Ключи
              </TabsTrigger>
            </TabsList>

            <TabsContent value="privileges" className="space-y-6">
              <Card className="bg-[#111111] border-gray-800">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Никнейм игрока
                    </label>
                    <Input
                      type="text"
                      placeholder="Введите ваш ник"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="bg-[#0a0a0a] border-gray-700 text-white placeholder:text-gray-600 focus:border-green-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-3">
                      Выберите привилегию
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {privileges.map((priv) => (
                        <button
                          key={priv.id}
                          onClick={() => setSelectedPrivilege(priv.id)}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            selectedPrivilege === priv.id
                              ? 'border-green-600 bg-green-600/10'
                              : 'border-gray-700 bg-[#0a0a0a] hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-bold text-white">{priv.name}</h3>
                            {selectedPrivilege === priv.id && (
                              <Icon name="CheckCircle" size={20} className="text-green-500" />
                            )}
                          </div>
                          <p className="text-2xl font-bold text-green-500 mb-1">{priv.price} ₽</p>
                          <p className="text-xs text-gray-500">{priv.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      onClick={handlePayment}
                      disabled={!nickname || selectedPrivilege === null || isLoading}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                          Создание платежа...
                        </>
                      ) : (
                        <>
                          <Icon name="ShoppingCart" size={20} className="mr-2" />
                          Перейти к оплате
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="text-xs text-gray-500 text-center">
                    После оплаты привилегия будет активирована автоматически
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="keys" className="space-y-6">
              <Card className="bg-[#111111] border-gray-800">
                <CardContent className="p-8 text-center">
                  <Icon name="Key" size={48} className="mx-auto mb-4 text-gray-600" />
                  <p className="text-gray-400">Ключи временно недоступны</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <section id="rules" className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Правила сервера</h2>
          <Card className="bg-[#111111] border-gray-800">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Icon name="Shield" size={20} className="text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Запрет читов</h3>
                  <p className="text-sm text-gray-400">Использование читов ведёт к бану</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Users" size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Уважение</h3>
                  <p className="text-sm text-gray-400">Уважайте других игроков</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Hammer" size={20} className="text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Гриферство</h3>
                  <p className="text-sm text-gray-400">Запрещено ломать чужие постройки</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="MessageSquare" size={20} className="text-purple-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Чат</h3>
                  <p className="text-sm text-gray-400">Мат и спам запрещены</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="AlertTriangle" size={20} className="text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Баги</h3>
                  <p className="text-sm text-gray-400">Использование багов наказуемо</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Crown" size={20} className="text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Донат</h3>
                  <p className="text-sm text-gray-400">Возврат доната невозможен</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-[#111111] border-t border-gray-800 py-6 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © 2025 DexLand. Все права защищены
        </div>
      </footer>
    </div>
  );
};

export default Index;