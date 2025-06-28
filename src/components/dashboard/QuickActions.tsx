
import { Headphones, Globe, DollarSign, User } from 'lucide-react';

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  action: () => void;
}

interface QuickActionsProps {
  onBuyPayId: () => void;
  onAirtime: () => void;
  onData: () => void;
  onSupport: () => void;
  onJoinCommunities: () => void;
  onEarnMore: () => void;
  onProfile: () => void;
}

const QuickActions = ({ 
  onBuyPayId, 
  onAirtime, 
  onData, 
  onSupport, 
  onJoinCommunities, 
  onEarnMore, 
  onProfile 
}: QuickActionsProps) => {
  const quickActions: QuickAction[] = [
    { 
      icon: <div className="w-6 h-6 bg-yellow-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">💳</div>, 
      label: "Buy PAY ID",
      action: onBuyPayId
    },
    { 
      icon: <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm">📺</div>, 
      label: "Watch",
      action: () => window.open('https://t.me/bluepay247', '_blank')
    },
    { 
      icon: <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm">📊</div>, 
      label: "Airtime",
      action: onAirtime
    },
    { 
      icon: <div className="w-6 h-6 bg-purple-600 rounded-lg flex items-center justify-center text-white text-sm">💾</div>, 
      label: "Data",
      action: onData
    },
    { 
      icon: <Headphones className="w-6 h-6 text-gray-700" />, 
      label: "Support",
      action: onSupport
    },
    { 
      icon: <Globe className="w-6 h-6 text-blue-500" />, 
      label: "Group",
      action: onJoinCommunities
    },
    { 
      icon: <DollarSign className="w-6 h-6 text-yellow-600" />, 
      label: "Earn More",
      action: onEarnMore
    },
    { 
      icon: <User className="w-6 h-6 text-gray-700" />, 
      label: "Profile",
      action: onProfile
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-3 mb-6 px-4">
      {quickActions.map((action, index) => (
        <div key={index} className="text-center">
          <button 
            onClick={action.action}
            className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow mb-2 w-full flex items-center justify-center"
          >
            {action.icon}
          </button>
          <p className="text-xs text-gray-700 font-medium">{action.label}</p>
        </div>
      ))}
    </div>
  );
};

export default QuickActions;
