import { Button } from '@/components/ui/button';
import { ArrowLeft, User, HelpCircle, Info, DollarSign, ChevronRight, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

const Profile = ({ onBack, onNavigate }: { onBack: () => void; onNavigate: (page: string) => void }) => {
  const { logout } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutDialog(false);
  };

  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 border-b">
        <div className="flex items-center space-x-3">
          <Button onClick={onBack} className="bg-transparent p-2 text-black hover:bg-gray-100">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Profile</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center border-2 border-purple-600 mb-4">
            <User className="w-12 h-12 text-purple-600" />
          </div>
          <p className="text-gray-600">Tap to change profile picture</p>
        </div>

        {/* Profile Options */}
        <div className="space-y-4">
          <button
            onClick={() => onNavigate('profile-info')}
            className="w-full bg-white rounded-lg p-4 flex items-center justify-between shadow-sm border"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <h3 className="font-medium">Profile Information</h3>
                <p className="text-gray-600 text-sm">View and edit your profile details</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => onNavigate('support')}
            className="w-full bg-white rounded-lg p-4 flex items-center justify-between shadow-sm border"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-teal-600" />
              </div>
              <div className="text-left">
                <h3 className="font-medium">Help & Support</h3>
                <p className="text-gray-600 text-sm">Get help with using PayGo</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => onNavigate('about')}
            className="w-full bg-white rounded-lg p-4 flex items-center justify-between shadow-sm border"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Info className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="font-medium">About</h3>
                <p className="text-gray-600 text-sm">Learn more about PayGo</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => onNavigate('refer-earn')}
            className="w-full bg-white rounded-lg p-4 flex items-center justify-between shadow-sm border"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-left">
                <h3 className="font-medium">Refer & Earn</h3>
                <p className="text-gray-600 text-sm">Invite friends and earn ₦5,000 per referral</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Logout Button */}
        <div className="mt-8">
          <Button
            onClick={handleLogout}
            className="w-full border-2 border-red-500 bg-transparent text-red-500 hover:bg-red-50 py-4 text-lg rounded-lg"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>

        {/* Logout Confirmation Dialog */}
        {showLogoutDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Confirm Logout</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
              <div className="flex space-x-3">
                <Button
                  onClick={cancelLogout}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg"
                >
                  No
                </Button>
                <Button
                  onClick={confirmLogout}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg"
                >
                  Yes
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
