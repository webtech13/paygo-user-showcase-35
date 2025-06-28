
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardHeaderProps {
  onTransactionHistory: () => void;
  onLogout: () => void;
}

const DashboardHeader = ({ onTransactionHistory, onLogout }: DashboardHeaderProps) => {
  const { user } = useAuth();

  return (
    <div className="mx-2">
      <div className="bg-purple-900 text-white p-4 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold text-xl">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Hi, {user?.name} 👋</h1>
              <p className="text-sm opacity-90">Welcome back!</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              onClick={onTransactionHistory}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full"
            >
              <Bell className="w-6 h-6" />
            </Button>
            <Button 
              onClick={onLogout}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full text-sm font-medium"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
