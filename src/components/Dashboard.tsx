
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useAuth } from '../contexts/AuthContext';
import { Bell, Eye, EyeOff, ArrowUp, CheckCircle, CreditCard, BarChart3, Database, Headphones, Globe, DollarSign, User } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [balanceVisible, setBalanceVisible] = useState(true);

  const quickActions = [
    { icon: <CreditCard className="w-8 h-8 text-purple-600" />, label: "Buy PAY ID" },
    { icon: <div className="w-8 h-8 bg-gray-600 rounded"></div>, label: "Watch" },
    { icon: <BarChart3 className="w-8 h-8 text-blue-600" />, label: "Airtime" },
    { icon: <Database className="w-8 h-8 text-red-600" />, label: "Data" },
    { icon: <Headphones className="w-8 h-8 text-gray-600" />, label: "Support" },
    { icon: <Globe className="w-8 h-8 text-blue-500" />, label: "Group" },
    { icon: <DollarSign className="w-8 h-8 text-yellow-600" />, label: "Earn More" },
    { icon: <User className="w-8 h-8 text-gray-600" />, label: "Profile" }
  ];

  const promotions = [
    {
      title: "Winners",
      subtitle: "of K20 airtime",
      names: ["Patience Ng'andwe", "Phiri John"],
      image: "/lovable-uploads/00f34589-f4d0-44bf-9eb9-14cd644b9587.png"
    },
    {
      title: "Transact & Win", 
      subtitle: "Locations: Cheers Gold Crest Mall | Chrismar Hotel | Hot Spot Pub & Grill",
      description: "All customers who pay with PayGo in store will stand a chance to win great prizes.",
      image: "/lovable-uploads/5d0602d7-969f-4037-b1da-7ebc89886872.png"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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
            <Button className="flex-1 bg-white text-purple-600 hover:bg-gray-100 rounded-full py-3 flex items-center justify-center space-x-2">
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
              <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow mb-2">
                {action.icon}
              </div>
              <p className="text-xs text-gray-600">{action.label}</p>
            </div>
          ))}
        </div>

        {/* Promotions Carousel */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Current Promotions</h3>
          <Carousel className="w-full">
            <CarouselContent>
              {promotions.map((promotion, index) => (
                <CarouselItem key={index}>
                  <div className="bg-gradient-to-r from-purple-600 to-orange-400 rounded-2xl p-6 text-white relative overflow-hidden min-h-[200px]">
                    <div className="relative z-10">
                      <h4 className="text-2xl font-bold mb-2">{promotion.title}</h4>
                      <p className="text-lg mb-1">{promotion.subtitle}</p>
                      {promotion.names && promotion.names.map((name, nameIndex) => (
                        <p key={nameIndex} className="text-sm opacity-90 mb-1">{name}</p>
                      ))}
                      {promotion.description && (
                        <p className="text-sm opacity-90 mt-2">{promotion.description}</p>
                      )}
                    </div>
                    <div className="absolute right-4 top-4 w-20 h-20 bg-white/20 rounded-full"></div>
                    <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full"></div>
                    {/* Decorative elements */}
                    <div className="absolute top-8 right-8 w-2 h-2 bg-yellow-300 rounded-full"></div>
                    <div className="absolute top-16 right-16 w-1 h-1 bg-orange-300 rounded-full"></div>
                    <div className="absolute bottom-12 right-12 w-3 h-3 bg-pink-300 rounded-full"></div>
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
