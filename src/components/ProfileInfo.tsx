
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Mail, Award, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ProfileInfo = ({ onBack }: { onBack: () => void }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 border-b">
        <div className="flex items-center space-x-3">
          <Button onClick={onBack} className="bg-transparent p-2 text-black hover:bg-gray-100">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Profile Information</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Picture and Name */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center border-2 border-purple-600 mb-4">
            <User className="w-12 h-12 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold">{user?.name || 'User'}</h2>
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Account Information</h3>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Full Name</p>
                <p className="font-medium">{user?.name || 'User'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Email Address</p>
                <p className="font-medium">{user?.email || 'user@example.com'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Account Level</p>
                <p className="font-medium">Basic</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Account Status</p>
                <p className="font-medium text-green-600">● Active</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm">ID</span>
              </div>
              <div>
                <p className="text-gray-600 text-sm">PAY ID Status</p>
                <p className="font-medium text-orange-600">Not Purchased</p>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-8">
          <Button
            onClick={logout}
            className="w-full border-2 border-red-500 bg-transparent text-red-500 hover:bg-red-50 py-4 text-lg rounded-lg"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
