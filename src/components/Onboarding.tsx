
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { X, Gift, CreditCard, Phone, Wallet, Zap } from 'lucide-react';

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
      title: "Ready to Start",
      description: "You're all set! Explore the dashboard, manage your balance, make transfers, buy services, and enjoy all the features PayGo has to offer."
    }
  ];

  const currentStepData = steps[currentStep - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-orange-400 text-white rounded-t-2xl p-6 relative">
          <Button 
            onClick={handleSkip}
            className="absolute top-4 right-4 p-2 bg-transparent hover:bg-white/10 text-white"
          >
            <X className="w-6 h-6" />
          </Button>
          
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome to PayGo, {user?.name}!</h2>
            <p className="text-sm opacity-90 mb-4">Step {currentStep} of {totalSteps}</p>
          </div>
          
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
