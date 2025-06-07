
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from '@/components/ui/carousel';
import { useAuth } from '../contexts/AuthContext';
import { useAutoSlide } from '../hooks/useAutoSlide';
import { Bell, Eye, EyeOff, ArrowUp, CheckCircle, CreditCard, BarChart3, Database, Headphones, Globe, DollarSign, User } from 'lucide-react';
import BuyPayId from './BuyPayId';
import Transfer from './Transfer';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const [currentView, setCurrentView] = useState('dashboard');

  useAutoSlide(api, 4000);

  const quickActions = [
    { 
      icon: <CreditCard className="w-8 h-8 text-purple-600" />, 
      label: "Buy PAY ID",
      action: () => setCurrentView('buy-pay-id')
    },
    { 
      icon: <div className="w-8 h-8 bg-gray-600 rounded"></div>, 
      label: "Watch",
      action: () => alert('This feature is coming soon!')
    },
    { 
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />, 
      label: "Airtime",
      action: () => alert('This feature is coming soon!')
    },
    { 
      icon: <Database className="w-8 h-8 text-red-600" />, 
      label: "Data",
      action: () => alert('This feature is coming soon!')
    },
    { 
      icon: <Headphones className="w-8 h-8 text-gray-600" />, 
      label: "Support",
      action: () => alert('This feature is coming soon!')
    },
    { 
      icon: <Globe className="w-8 h-8 text-blue-500" />, 
      label: "Group",
      action: () => alert('This feature is coming soon!')
    },
    { 
      icon: <DollarSign className="w-8 h-8 text-yellow-600" />, 
      label: "Earn More",
      action: () => alert('This feature is coming soon!')
    },
    { 
      icon: <User className="w-8 h-8 text-gray-600" />, 
      label: "Profile",
      action: () => alert('This feature is coming soon!')
    }
  ];

  const promotions = [
    {
      title: "Winners",
      subtitle: "of K20 airtime",
      names: ["Patience Ng'andwe", "Phiri John"],
      image: "/lovable-uploads/7db94283-0659-4709-a9ca-075e35c706eb.png"
    },
    {
      title: "Transact & Win", 
      subtitle: "Locations: Cheers Gold Crest Mall | Chrismar Hotel | Hot Spot Pub & Grill",
      description: "All customers who pay with PayGo in store will stand a chance to win great prizes.",
      image: "/lovable-uploads/c27b5632-5a9c-471e-b478-6c7fb61da4d6.png"
    },
    {
      title: "Mobile Money",
      subtitle: "AUGUST 27-28",
      description: "Special promotion for mobile money transactions",
      image: "/lovable-uploads/f326e837-824b-407f-a8e6-3f460a1006e3.png"
    }
  ];

  if (currentView === 'buy-pay-id') {
    return <BuyPayId onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'transfer') {
    return <Transfer onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sliding Banner */}
      <div className="bg-red-500 text-white p-3 overflow-hidden">
        <div className="animate-slide-banner whitespace-nowrap">
          Dear user we're currently having issues with OPay bank kindly use another bank for your payment of pay Id
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-orange-400 text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold text-lg">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Hi, {user?.name} 👋</h1>
              <p className="text-sm opacity-90">Welcome back!</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Bell className="w-6 h-6" />
            <Button 
              onClick={logout}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <p className="text-sm opacity-90 mb-2">Your Balance</p>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                {balanceVisible ? '₦180,000.00' : '₦***,***.00'}
              </h2>
              <p className="text-sm opacity-90">Weekly Rewards: ₦180,000.00</p>
            </div>
            <Button
              onClick={() => setBalanceVisible(!balanceVisible)}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-full"
            >
              {balanceVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </Button>
          </div>

          <div className="flex space-x-4 mt-6">
            <Button className="flex-1 bg-white text-purple-600 hover:bg-gray-100 rounded-full py-3 flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Upgrade</span>
            </Button>
            <Button 
              onClick={() => setCurrentView('transfer')}
              className="flex-1 bg-white text-purple-600 hover:bg-gray-100 rounded-full py-3 flex items-center justify-center space-x-2"
            >
              <ArrowUp className="w-5 h-5" />
              <span>Transfer</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6">
        <div className="grid grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <div key={index} className="text-center">
              <button 
                onClick={action.action}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow mb-2 w-full"
              >
                {action.icon}
              </button>
              <p className="text-xs text-gray-600">{action.label}</p>
            </div>
          ))}
        </div>

        {/* Promotions Carousel */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Current Promotions</h3>
          <Carousel 
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
          >
            <CarouselContent>
              {promotions.map((promotion, index) => (
                <CarouselItem key={index}>
                  <div className="relative rounded-2xl overflow-hidden h-[240px]">
                    <img 
                      src={promotion.image} 
                      alt={promotion.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
