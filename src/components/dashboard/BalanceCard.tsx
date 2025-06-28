
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, CheckCircle, ArrowUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface BalanceCardProps {
  onUpgrade: () => void;
  onTransfer: () => void;
}

const BalanceCard = ({ onUpgrade, onTransfer }: BalanceCardProps) => {
  const { user } = useAuth();
  const [balanceVisible, setBalanceVisible] = useState(true);

  return (
    <div className="mx-2 -mt-4">
      <div className="bg-purple-900 text-white pb-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mx-4">
          <p className="text-xs opacity-90 mb-2">Your Balance</p>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold mb-1">
                {balanceVisible ? `₦${(user?.balance || 180000).toLocaleString()}.00` : '₦***,***.00'}
              </h2>
              <p className="text-xs opacity-90">Weekly Rewards: ₦180,000.00</p>
            </div>
            <Button
              onClick={() => setBalanceVisible(!balanceVisible)}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-full"
            >
              {balanceVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>

          <div className="flex space-x-3">
            <Button 
              onClick={onUpgrade}
              className="flex-1 bg-white text-purple-600 hover:bg-gray-100 rounded-full py-3 flex items-center justify-center space-x-2 text-sm font-medium"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Upgrade</span>
            </Button>
            <Button 
              onClick={onTransfer}
              className="flex-1 bg-white text-purple-600 hover:bg-gray-100 rounded-full py-3 flex items-center justify-center space-x-2 text-sm font-medium"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Transfer</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
