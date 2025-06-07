
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { X, Gift, CreditCard, Phone, Wallet, Zap, BarChart3, User } from 'lucide-react';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { user, completeOnboarding } = useAuth();
  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const steps = [
    {
      icon: <Gift className="w-12 h-12 text-purple-600" />,
      title: "Welcome Bonus",
      description: "You've received a welcome bonus of ₦180,000! This amount is already in your account and can be withdrawn after purchasing a PAY ID."
    },
    {
      icon: <CreditCard className="w-12 h-12 text-blue-600" />,
      title: "Get Your PAY ID",
      description: "To withdraw funds, you'll need to purchase a PAY ID for ₦6,500. This is a one-time purchase that unlocks all features of the app."
    },
    {
      icon: <Phone className="w-12 h-12 text-green-600" />,
      title: "Airtime & Data",
      description: "You can purchase airtime and data for all major networks directly from the app. Simply select the service, enter the phone number, choose your plan, and complete your purchase."
    },
    {
      icon: <Wallet className="w-12 h-12 text-red-600" />,
      title: "Withdrawal Process",
      description: "To withdraw your funds, tap the \"Withdraw\" button on your dashboard, enter your bank details and PAY ID, and submit your request. Withdrawals are processed within 24 hours."
    },
    {
      icon: <Zap className="w-12 h-12 text-orange-600" />,
      title: "Dashboard Preview",
      description: "Here's what your dashboard will look like! Manage your balance, make transfers, buy services, and explore all the features PayGo has to offer."
    }
  ];

  const currentStepData = steps[currentStep - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-orange-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-orange-400 text-white rounded-t-2xl p-6 relative">
          <Button 
            onClick={handleSkip}
            className="absolute top-4 right-4 bg-transparent hover:bg-white/10 p-2"
          >
            <X className="w-6 h-6" />
          </Button>
          
          <h2 className="text-2xl font-bold mb-2">Welcome to PayGo, {user?.name}!</h2>
          <p className="text-sm opacity-90 mb-4">Step {currentStep} of {totalSteps}</p>
          
          {/* Progress bar */}
          <div className="flex space-x-1">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full ${
                  i < currentStep ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-2xl p-8 shadow-xl text-center">
          <div className="mb-6 flex justify-center">
            {currentStepData.icon}
          </div>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {currentStepData.title}
          </h3>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            {currentStepData.description}
          </p>

          {currentStep === totalSteps && (
            <div className="mb-6 space-y-4">
              {/* Dashboard Preview */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">P</span>
                    </div>
                    <span className="text-sm font-medium">Your Balance</span>
                  </div>
                  <span className="text-lg font-bold">₦180,000</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="bg-white rounded p-2 flex flex-col items-center">
                    <CreditCard className="w-4 h-4 text-purple-600 mb-1" />
                    <span className="text-xs">PAY ID</span>
                  </div>
                  <div className="bg-white rounded p-2 flex flex-col items-center">
                    <BarChart3 className="w-4 h-4 text-blue-600 mb-1" />
                    <span className="text-xs">Airtime</span>
                  </div>
                  <div className="bg-white rounded p-2 flex flex-col items-center">
                    <User className="w-4 h-4 text-gray-600 mb-1" />
                    <span className="text-xs">Profile</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600 to-orange-400 rounded h-16 flex items-center justify-center">
                  <span className="text-white text-xs">Quick Actions & Promotions</span>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-purple-600 to-orange-400 text-white py-4 text-lg font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            {currentStep === totalSteps ? 'Get Started →' : 'Next →'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
