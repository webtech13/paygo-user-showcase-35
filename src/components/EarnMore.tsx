
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share, ExternalLink } from 'lucide-react';

const EarnMore = ({ onBack }: { onBack: () => void }) => {
  const handleStartReferring = () => {
    window.open('https://paygo-financial-pro-25.vercel.app', '_blank');
  };

  const handleSignUpNow = () => {
    window.open('https://bluepay-28.vercel.app/', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 border-b">
        <div className="flex items-center space-x-3">
          <Button onClick={onBack} className="bg-transparent p-2 text-black hover:bg-gray-100">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Earn More</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Refer & Earn Section */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <Share className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-bold">Refer & Earn</h3>
              <p className="text-sm opacity-90">Earn ₦5,000 for each friend who joins</p>
            </div>
          </div>
          
          <p className="mb-6 leading-relaxed">
            Invite friends to PayGo and earn ₦5,000 for each friend who signs up using your referral link and purchases a PAY ID.
          </p>
          
          <Button
            onClick={handleStartReferring}
            className="w-full bg-white text-purple-600 hover:bg-gray-100 py-4 text-lg rounded-lg font-medium"
          >
            <Share className="w-5 h-5 mr-2" />
            Start Referring Friends
          </Button>
        </div>

        {/* BluePay Pro Section */}
        <div className="bg-white rounded-lg p-6 text-center">
          <h2 className="text-3xl font-bold text-purple-600 mb-6">BluePay Pro</h2>
          
          <p className="text-gray-800 text-lg mb-4">
            Take your earnings to the next level with BluePay Pro.
          </p>
          
          <p className="text-gray-600 mb-4">
            Access exclusive features and higher earning opportunities.
          </p>
          
          <p className="text-gray-600 mb-8">
            Join thousands of users already maximizing their income.
          </p>
          
          <Button
            onClick={handleSignUpNow}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg rounded-lg font-medium"
          >
            Sign Up Now <ExternalLink className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EarnMore;
