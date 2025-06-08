
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Copy } from 'lucide-react';

interface UpgradeProps {
  onBack: () => void;
}

const Upgrade = ({ onBack }: UpgradeProps) => {
  const [currentView, setCurrentView] = useState('levels');
  const [selectedLevel, setSelectedLevel] = useState<any>(null);
  const [countdown, setCountdown] = useState(10);
  const [progress, setProgress] = useState(0);

  const levels = [
    { name: 'Silver', price: 5500, icon: '🛡️', benefits: ['Earn ₦500 per referral', 'Weekly rewards of ₦5,000', 'Basic customer support', 'Access to standard features'] },
    { name: 'Gold', price: 7500, icon: '🏆', benefits: ['Earn ₦750 per referral', 'Weekly rewards of ₦7,500', 'Priority customer support', 'Access to premium features'] },
    { name: 'Platinum', price: 10000, icon: '⚡', benefits: ['Earn ₦1,000 per referral', 'Weekly rewards of ₦10,000', 'VIP customer support', 'Access to all features'] },
    { name: 'Emerald', price: 15000, icon: '💎', benefits: ['Earn ₦1,500 per referral', 'Weekly rewards of ₦15,000', 'Dedicated support', 'Exclusive features'] },
    { name: 'Ruby', price: 20000, icon: '⭐', benefits: ['Earn ₦2,000 per referral', 'Weekly rewards of ₦20,000', 'Personal account manager', 'Beta access'] },
    { name: 'Diamond', price: 25000, icon: '👑', benefits: ['Earn ₦2,500 per referral', 'Weekly rewards of ₦25,000', 'White-glove service', 'Early access to new features'] },
    { name: 'Black', price: 50000, icon: '♦️', benefits: ['Earn ₦5,000 per referral', 'Weekly rewards of ₦50,000', 'Concierge service', 'Unlimited features'] }
  ];

  useEffect(() => {
    if (currentView === 'preparing' && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
        setProgress((10 - countdown + 1) / 10 * 100);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (currentView === 'preparing' && countdown === 0) {
      setCurrentView('payment');
    }
  }, [currentView, countdown]);

  useEffect(() => {
    if (currentView === 'confirming') {
      const timer = setTimeout(() => {
        setCurrentView('failed');
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (currentView === 'benefits' && selectedLevel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-purple-600 text-white p-4">
          <div className="flex items-center space-x-3">
            <Button onClick={() => setCurrentView('levels')} className="bg-transparent p-2">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-bold">Level Benefits</h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-2xl">{selectedLevel.icon}</span>
              <div>
                <h3 className="text-2xl font-bold">{selectedLevel.name} Level</h3>
                <p className="text-purple-600 text-xl font-bold">₦{selectedLevel.price.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-bold text-purple-600 mb-3">Benefits & Features</h4>
              <div className="space-y-2">
                {selectedLevel.benefits.map((benefit: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={() => setCurrentView('preparing')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg rounded-lg mt-6"
            >
              Proceed to Payment
            </Button>

            <p className="text-center text-gray-600 text-sm mt-4">
              Your upgrade will be activated immediately after payment is confirmed
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'preparing') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-6 p-6">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h3 className="text-2xl font-bold text-gray-800">Preparing Payment</h3>
          <p className="text-gray-600">Please wait while we set up your payment...</p>
          <div className="text-3xl font-bold text-purple-600">{countdown}</div>
          <div className="w-full bg-gray-200 rounded-full h-2 max-w-md mx-auto">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-1000" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'payment' && selectedLevel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button onClick={() => setCurrentView('levels')} className="bg-transparent p-2">
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <h1 className="text-xl font-bold">Bank Transfer</h1>
            </div>
            <span className="text-red-500 font-medium">Cancel</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-orange-400 rounded-full"></div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">NGN {selectedLevel.price.toLocaleString()}</p>
              <p className="text-gray-600">{selectedLevel.name} Level Upgrade</p>
            </div>
          </div>

          <p className="text-center text-lg font-medium">
            Complete this bank transfer to proceed
          </p>

          <div className="bg-gray-100 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Amount</span>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold">NGN {selectedLevel.price.toLocaleString()}</span>
                <Button onClick={() => handleCopy(selectedLevel.price.toString())} className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 text-sm">
                  Copy
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs">34</span>
                <span className="font-medium">Account Number</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold">0511309400</span>
                <Button onClick={() => handleCopy('0511309400')} className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 text-sm">
                  Copy
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-white text-xs">$</span>
                <span className="font-medium">Bank Name</span>
              </div>
              <span className="text-xl font-bold">Alternative Bank</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs">i</span>
                <span className="font-medium">Account Name</span>
              </div>
              <span className="text-xl font-bold">Upgrade-Khalifah Ibrahim</span>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            Make Payment to the Account Above to upgrade your account level
          </p>

          <Button
            onClick={() => setCurrentView('confirming')}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg rounded-lg"
          >
            I have made this bank Transfer
          </Button>
        </div>
      </div>
    );
  }

  if (currentView === 'confirming') {
    return (
      <div className="min-h-screen bg-purple-600 flex items-center justify-center">
        <div className="text-center space-y-6 p-6 text-white">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h3 className="text-2xl font-bold">Confirming Your Payment</h3>
          <p>Please wait while we verify your transaction...</p>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2 max-w-md mx-auto">
            <div className="bg-white h-2 rounded-full w-2/3 animate-pulse"></div>
          </div>
          <p className="text-sm opacity-90">This may take a few moments</p>
          <p className="text-sm opacity-90">Please do not close this page</p>
        </div>
      </div>
    );
  }

  if (currentView === 'failed') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-6 p-6 max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-red-500 text-4xl">!</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Payment Not Received</h3>
          <p className="text-gray-600">
            We couldn't verify your payment. This could be due to a delay in the banking system or the payment wasn't completed.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg text-left">
            <h4 className="font-bold text-gray-800 mb-3">What to do next:</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p><span className="text-purple-600 font-bold">1.</span> Check if the amount was debited from your account</p>
              <p><span className="text-purple-600 font-bold">2.</span> If debited, wait a few minutes and check your upgrade status</p>
              <p><span className="text-purple-600 font-bold">3.</span> If not debited, try making the payment again</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={onBack}
              className="flex-1 bg-transparent border border-gray-300 text-gray-700 py-3 rounded-lg"
            >
              Back to Dashboard
            </Button>
            <Button
              onClick={() => setCurrentView('payment')}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg"
            >
              Retry Payment
            </Button>
          </div>

          <p className="text-center text-gray-500 text-sm">
            PayGo Financial Services LTD
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-purple-600 text-white p-4">
        <div className="flex items-center space-x-3">
          <Button onClick={onBack} className="bg-transparent p-2">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Upgrade Account</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Level</h2>
          <p className="text-gray-600">Select a level to view benefits and upgrade</p>
        </div>

        {/* Current Level */}
        <div className="bg-white p-4 rounded-lg border flex items-center space-x-3">
          <span className="text-purple-600">🎯</span>
          <div>
            <p className="text-sm text-gray-600">Current Level</p>
            <p className="font-bold">Basic</p>
          </div>
        </div>

        {/* Level Selection */}
        <div>
          <h3 className="font-bold text-gray-800 mb-4">Select Level to Upgrade</h3>
          <div className="grid grid-cols-3 gap-3">
            {levels.map((level, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedLevel(level);
                  setCurrentView('benefits');
                }}
                className="bg-white p-4 rounded-lg border text-center hover:border-purple-500 transition-colors"
              >
                <div className="text-2xl mb-2">{level.icon}</div>
                <h4 className="font-bold text-sm">{level.name}</h4>
                <p className="text-purple-600 font-bold text-sm">₦{level.price.toLocaleString()}</p>
              </button>
            ))}
          </div>
        </div>

        <Button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg rounded-lg"
          disabled
        >
          View Benefits
        </Button>

        <p className="text-center text-gray-600 text-sm">
          Select a level to view detailed benefits before payment
        </p>
      </div>
    </div>
  );
};

export default Upgrade;
