
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Copy, Shield, Star, Zap, Diamond, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Upgrade = ({ onBack }: { onBack: () => void }) => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [countdown, setCountdown] = useState(10);
  const [progress, setProgress] = useState(0);

  const upgradeLevels = [
    { name: 'Silver', price: 5500, icon: <Shield className="w-8 h-8" />, benefits: ['Earn ₦6,500 per referral', 'Weekly rewards of ₦5,000', 'Basic customer support', 'Access to standard features'] },
    { name: 'Gold', price: 7500, icon: <Star className="w-8 h-8" />, benefits: ['Earn ₦8,000 per referral', 'Weekly rewards of ₦7,500', 'Priority customer support', 'Advanced features access'] },
    { name: 'Platinum', price: 10000, icon: <Zap className="w-8 h-8" />, benefits: ['Earn ₦10,000 per referral', 'Weekly rewards of ₦10,000', 'Premium customer support', 'All features unlocked'] },
    { name: 'Emerald', price: 15000, icon: <Diamond className="w-8 h-8" />, benefits: ['Earn ₦12,500 per referral', 'Weekly rewards of ₦15,000', 'VIP customer support', 'Exclusive features'] },
    { name: 'Ruby', price: 20000, icon: <Crown className="w-8 h-8" />, benefits: ['Earn ₦15,000 per referral', 'Weekly rewards of ₦20,000', 'Dedicated account manager', 'Premium exclusive features'] },
    { name: 'Diamond', price: 25000, icon: <Diamond className="w-8 h-8" />, benefits: ['Earn ₦20,000 per referral', 'Weekly rewards of ₦25,000', 'White-glove service', 'Ultimate access'] },
    { name: 'Black', price: 50000, icon: <Diamond className="w-8 h-8" />, benefits: ['Earn ₦25,000 per referral', 'Weekly rewards of ₦50,000', 'Concierge service', 'Elite status'] }
  ];

  // Auto-redirect for preparing payment
  useEffect(() => {
    if (currentStep === 3) {
      let countdownTimer = 10;
      setProgress(0);
      const timer = setInterval(() => {
        countdownTimer--;
        setProgress((10 - countdownTimer) / 10 * 100);
        if (countdownTimer <= 0) {
          clearInterval(timer);
          setCurrentStep(4);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentStep]);

  // Auto-redirect for payment confirmation
  useEffect(() => {
    if (currentStep === 5) {
      let countdownTimer = 10;
      setProgress(0);
      const timer = setInterval(() => {
        countdownTimer--;
        setProgress((10 - countdownTimer) / 10 * 100);
        if (countdownTimer <= 0) {
          clearInterval(timer);
          setCurrentStep(6);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentStep]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Level</h2>
              <p className="text-gray-600">Select a level to view benefits and upgrade</p>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 flex items-center space-x-3">
              <Shield className="w-6 h-6 text-purple-600" />
              <div>
                <p className="font-medium">Current Level</p>
                <p className="text-lg font-bold">Basic</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Select Level to Upgrade</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {upgradeLevels.slice(0, 3).map((level, index) => (
                  <button
                    key={level.name}
                    onClick={() => setSelectedLevel(level)}
                    className={`p-4 rounded-lg border-2 text-center ${selectedLevel?.name === level.name ? 'border-purple-600 bg-purple-50' : 'border-gray-200 bg-white'}`}
                  >
                    {level.icon}
                    <p className="font-medium mt-2">{level.name}</p>
                    <p className="text-sm text-gray-600">₦{level.price.toLocaleString()}</p>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {upgradeLevels.slice(3, 6).map((level, index) => (
                  <button
                    key={level.name}
                    onClick={() => setSelectedLevel(level)}
                    className={`p-4 rounded-lg border-2 text-center ${selectedLevel?.name === level.name ? 'border-purple-600 bg-purple-50' : 'border-gray-200 bg-white'}`}
                  >
                    {level.icon}
                    <p className="font-medium mt-2">{level.name}</p>
                    <p className="text-sm text-gray-600">₦{level.price.toLocaleString()}</p>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-3">
                {upgradeLevels.slice(6).map((level, index) => (
                  <button
                    key={level.name}
                    onClick={() => setSelectedLevel(level)}
                    className={`p-4 rounded-lg border-2 text-center ${selectedLevel?.name === level.name ? 'border-purple-600 bg-purple-50' : 'border-gray-200 bg-white'}`}
                  >
                    <div className="flex items-center justify-center space-x-3">
                      {level.icon}
                      <div>
                        <p className="font-medium">{level.name}</p>
                        <p className="text-sm text-gray-600">₦{level.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={() => selectedLevel ? setCurrentStep(2) : null}
              disabled={!selectedLevel}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg rounded-lg disabled:opacity-50"
            >
              View Benefits
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-gray-100 rounded-lg p-4 flex items-center space-x-3">
              {selectedLevel?.icon}
              <div>
                <p className="text-lg font-bold">{selectedLevel?.name} Level</p>
                <p className="text-xl font-bold">₦{selectedLevel?.price.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="text-lg font-bold text-purple-800 mb-4">Benefits & Features</h3>
              <div className="space-y-3">
                {selectedLevel?.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-gray-800">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={() => setCurrentStep(3)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg rounded-lg"
            >
              Proceed to Payment
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col items-center justify-center space-y-6 py-12">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <h3 className="text-2xl font-bold text-gray-800">Preparing Payment</h3>
            <p className="text-gray-600 text-center">Please wait while we set up your payment...</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-1000" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-orange-400 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">NGN {selectedLevel?.price.toLocaleString()}</p>
                <p className="text-sm text-gray-600">{selectedLevel?.name} Level Upgrade</p>
              </div>
            </div>

            <p className="text-center text-lg font-medium">
              Complete this bank transfer to proceed
            </p>

            <div className="bg-gray-100 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Amount</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold">NGN {selectedLevel?.price.toLocaleString()}</span>
                  <Button onClick={() => handleCopy(selectedLevel?.price.toString())} className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 text-sm">
                    Copy
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium">Account Number</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold">8105415222</span>
                  <Button onClick={() => handleCopy('8105415222')} className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 text-sm">
                    Copy
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium">Bank Name</span>
                <span className="text-xl font-bold">MONIEPOINT MFB</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium">Account Name</span>
                <span className="text-xl font-bold">SAMUEL KALLY</span>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              Make Payment to the Account Above to upgrade your account level
            </p>

            <Button
              onClick={() => setCurrentStep(5)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg rounded-lg"
            >
              I have made this bank Transfer
            </Button>
          </div>
        );

      case 5:
        return (
          <div className="flex flex-col items-center justify-center space-y-6 py-12">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <h3 className="text-2xl font-bold text-gray-800">Confirming Your Payment</h3>
            <p className="text-gray-600 text-center">Please wait while we verify your transaction...</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-1000" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">This may take a few moments</p>
            <p className="text-sm text-gray-500">Please do not close this page</p>
          </div>
        );

      case 6:
        return (
          <div className="flex flex-col items-center justify-center space-y-6 py-12">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">!</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Payment Not Received</h3>
            <div className="text-center">
              <p className="text-gray-600 mb-4">We couldn't verify your payment. This could be due to a delay in the banking system or the payment wasn't completed.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 w-full">
              <h4 className="font-bold text-gray-800 mb-3">What to do next:</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="text-purple-600 font-bold">1.</span> Check if the amount was debited from your account</p>
                <p><span className="text-purple-600 font-bold">2.</span> If debited, wait a few minutes and check your upgrade status</p>
                <p><span className="text-purple-600 font-bold">3.</span> If not debited, try making the payment again</p>
              </div>
            </div>

            <div className="w-full space-y-3">
              <Button 
                onClick={onBack}
                className="w-full bg-transparent border border-gray-300 text-gray-700 py-4 text-lg rounded-lg hover:bg-gray-50"
              >
                Back to Dashboard
              </Button>
              <Button 
                onClick={() => setCurrentStep(1)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg rounded-lg"
              >
                Retry Payment
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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

      <div className="p-6">
        {renderStep()}
      </div>
    </div>
  );
};

export default Upgrade;
