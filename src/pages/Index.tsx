import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Privilege {
  id: number;
  name: string;
  price: number;
  color: string;
  features: string[];
  popular?: boolean;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'donate' | 'rules'>('home');

  const privileges: Privilege[] = [
    {
      id: 1,
      name: 'VIP',
      price: 199,
      color: 'from-green-500 to-green-700',
      features: [
        'Префикс [VIP] перед ником',
        'Доступ к /fly на 30 минут',
        '5 приватных территорий',
        'Зелёный цвет ника в чате',
        'Приоритет входа на сервер'
      ]
    },
    {
      id: 2,
      name: 'PREMIUM',
      price: 499,
      color: 'from-blue-500 to-blue-700',
      popular: true,
      features: [
        'Префикс [PREMIUM] перед ником',
        'Безлимитный /fly',
        '15 приватных территорий',
        'Синий цвет ника в чате',
        'Доступ к команде /heal',
        'Кит с алмазной бронёй',
        'Собственный варп'
      ]
    },
    {
      id: 3,
      name: 'ULTIMATE',
      price: 999,
      color: 'from-purple-500 to-pink-600',
      features: [
        'Префикс [ULTIMATE] перед ником',
        'Все возможности PREMIUM',
        'Безлимитные приваты',
        'Градиентный цвет ника',
        'Доступ к /god режиму',
        'Команда /enderchest',
        'Кит с незеритовой бронёй',
        '3 собственных варпа',
        'Уникальные партиклы'
      ]
    }
  ];

  const rules = [
    { icon: 'Shield', title: 'Запрет читов', text: 'Использование читов ведёт к бану' },
    { icon: 'Users', title: 'Уважение', text: 'Уважайте других игроков' },
    { icon: 'Hammer', title: 'Гриферство', text: 'Запрещено ломать чужие постройки' },
    { icon: 'MessageSquare', title: 'Чат', text: 'Мат и спам запрещены' },
    { icon: 'AlertTriangle', title: 'Баги', text: 'Использование багов наказуемо' },
    { icon: 'Crown', title: 'Донат', text: 'Возврат доната невозможен' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="sticky top-0 z-50 bg-black/50 backdrop-blur-md border-b-4 border-purple-500">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 pixel-corners flex items-center justify-center">
                <span className="text-2xl">⛏️</span>
              </div>
              <h1 className="text-2xl font-bold text-white pixel-text">MINESHOP</h1>
            </div>
            <div className="flex gap-2">
              {[
                { id: 'home', label: 'Главная', icon: 'Home' },
                { id: 'donate', label: 'Донаты', icon: 'ShoppingBag' },
                { id: 'rules', label: 'Правила', icon: 'Book' }
              ].map((item) => (
                <Button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as any)}
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  className={`pixel-corners gap-2 ${
                    activeSection === item.id
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <Icon name={item.icon as any} size={18} />
                  <span className="hidden md:inline">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'home' && (
          <div className="space-y-16 animate-fade-in">
            <section className="text-center space-y-6 py-20">
              <div className="inline-block pixel-corners bg-gradient-to-r from-purple-600 to-pink-600 p-8 mb-6">
                <h2 className="text-6xl md:text-8xl font-bold text-white pixel-text">
                  MINESHOP
                </h2>
              </div>
              <p className="text-xl md:text-2xl text-purple-200 max-w-2xl mx-auto">
                Прокачай свой игровой опыт! Получи эксклюзивные привилегии и стань легендой сервера
              </p>
              <Button
                onClick={() => setActiveSection('donate')}
                size="lg"
                className="pixel-corners bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white text-lg px-8 py-6"
              >
                <Icon name="Sparkles" size={24} />
                Выбрать донат
              </Button>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
              {[
                { icon: '⚡', title: 'Моментально', text: 'Активация сразу после оплаты' },
                { icon: '🎮', title: 'Навсегда', text: 'Привилегии остаются с тобой' },
                { icon: '🔒', title: 'Безопасно', text: 'Защищённые платежи' }
              ].map((feature, i) => (
                <Card key={i} className="pixel-corners bg-black/40 border-purple-500/50 hover-scale">
                  <CardContent className="pt-6 text-center space-y-3">
                    <div className="text-5xl">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                    <p className="text-purple-200">{feature.text}</p>
                  </CardContent>
                </Card>
              ))}
            </section>
          </div>
        )}

        {activeSection === 'donate' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white pixel-text">
                ДОНАТ-ПРИВИЛЕГИИ
              </h2>
              <p className="text-purple-200 text-lg">
                Выбери подходящий пакет и получи крутые возможности
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {privileges.map((priv) => (
                <Card
                  key={priv.id}
                  className={`pixel-corners bg-black/40 border-2 ${
                    priv.popular
                      ? 'border-yellow-500 shadow-lg shadow-yellow-500/50 scale-105'
                      : 'border-purple-500/50'
                  } hover-scale transition-all`}
                >
                  {priv.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="pixel-corners bg-yellow-500 text-black px-4 py-1">
                        ⭐ ПОПУЛЯРНО
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="space-y-4">
                    <div
                      className={`w-full h-24 pixel-corners bg-gradient-to-r ${priv.color} flex items-center justify-center`}
                    >
                      <CardTitle className="text-3xl text-white pixel-text">
                        {priv.name}
                      </CardTitle>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white">{priv.price} ₽</div>
                      <CardDescription className="text-purple-300">навсегда</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {priv.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Icon name="Check" size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-purple-100 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className={`w-full pixel-corners bg-gradient-to-r ${priv.color} hover:opacity-90 text-white font-bold`}
                    >
                      Купить {priv.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'rules' && (
          <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white pixel-text">
                ПРАВИЛА СЕРВЕРА
              </h2>
              <p className="text-purple-200 text-lg">
                Соблюдай правила и наслаждайся игрой
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {rules.map((rule, i) => (
                <Card key={i} className="pixel-corners bg-black/40 border-purple-500/50 hover-scale">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 pixel-corners bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                        <Icon name={rule.icon as any} size={24} className="text-white" />
                      </div>
                      <CardTitle className="text-white">{rule.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-purple-200">{rule.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="pixel-corners bg-gradient-to-r from-red-600/20 to-orange-600/20 border-red-500">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="AlertTriangle" size={24} />
                  Важная информация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-purple-100">
                <p>• Незнание правил не освобождает от ответственности</p>
                <p>• Администрация имеет право изменять правила</p>
                <p>• При нарушении правил возможен бан без предупреждения</p>
                <p>• Возврат средств за донат не производится</p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="mt-20 border-t-4 border-purple-500 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-purple-300">
            © 2025 MINESHOP. Лучший магазин донатов для Minecraft
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;