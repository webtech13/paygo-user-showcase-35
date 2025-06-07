
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Transfer = ({ onBack }: { onBack: () => void }) => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    accountName: '',
    accountNumber: '',
    bank: '',
    amount: '',
    payId: ''
  });
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [processing, setProcessing] = useState(false);

  const nigerianBanks = [
    'Access Bank', 'Afribank', 'Diamond Bank', 'Ecobank', 'Fidelity Bank',
    'First Bank', 'First City Monument Bank', 'Guaranty Trust Bank', 'Heritage Bank',
    'Keystone Bank', 'Polaris Bank', 'Providus Bank', 'Skye Bank', 'Stanbic IBTC Bank',
    'Standard Chartered Bank', 'Sterling Bank', 'Union Bank', 'United Bank for Africa',
    'Unity Bank', 'Wema Bank', 'Zenith Bank', 'ALAT by WEMA', 'Carbon', 'Kuda Bank',
    'Opay', 'PalmPay', 'Rubies Bank', 'SunTrust Bank', 'Taj Bank', 'Titan Trust Bank'
  ];

  const handleSubmit = () => {
    if (formData.payId !== 'paygo238') {
      alert('Invalid PAY ID. Transfer not allowed.');
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setCurrentStep(2);
      setProcessing(false);
    }, 7000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Bank Details</h2>

            <div className="space-y-2">
              <label className="text-gray-700 font-medium flex items-center space-x-2">
                <span className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center text-white text-xs">👤</span>
                <span>Account Name</span>
              </label>
              <input
                type="text"
                placeholder="Account Name"
                value={formData.accountName}
                onChange={(e) => setFormData({...formData, accountName: e.target.value})}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 font-medium flex items-center space-x-2">
                <span className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center text-white text-xs">#</span>
                <span>Account Number (10 digits)</span>
              </label>
              <input
                type="text"
                placeholder="Account Number (10 digits)"
                value={formData.accountNumber}
                onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                maxLength={10}
              />
            </div>

            <div className="space-y-2 relative">
              <label className="text-gray-700 font-medium flex items-center space-x-2">
                <span className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center text-white text-xs">🏦</span>
                <span>Bank Name</span>
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowBankDropdown(!showBankDropdown)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-between"
                >
                  <span className={formData.bank ? 'text-gray-900' : 'text-gray-500'}>
                    {formData.bank || 'Select Bank'}
                  </span>
                  <ChevronDown className="w-5 h-5 text-purple-600" />
                </button>
                {showBankDropdown && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto z-10">
                    {nigerianBanks.map((bank) => (
                      <button
                        key={bank}
                        onClick={() => {
                          setFormData({...formData, bank});
                          setShowBankDropdown(false);
                        }}
                        className="w-full p-3 text-left hover:bg-purple-50 border-b border-gray-100 last:border-b-0"
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Amount</label>
              <input
                type="number"
                placeholder="Amount"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 font-medium">PAY ID CODE (Buy PAY ID)</label>
              <input
                type="text"
                placeholder="PAY ID CODE (Buy PAY ID)"
                value={formData.payId}
                onChange={(e) => setFormData({...formData, payId: e.target.value})}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="text-purple-600 text-sm cursor-pointer">
              Buy PAY ID code
            </div>

            <div className="text-lg font-bold text-gray-800">
              Available Balance: ₦180,000.00
            </div>

            <Button
              onClick={handleSubmit}
              disabled={processing}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg rounded-lg"
            >
              {processing ? 'Processing...' : 'Submit'}
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col items-center justify-center space-y-6 py-12">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-4xl">✓</span>
            </div>
            <h3 className="text-2xl font-bold text-green-600">Withdrawal Successful!</h3>
            <p className="text-gray-600 text-center">
              Your withdrawal has been sent to your provided bank details
            </p>
            
            <div className="bg-gray-100 rounded-lg p-6 w-full space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-bold">₦{formData.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account:</span>
                <span className="font-bold">{formData.accountNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bank:</span>
                <span className="font-bold">{formData.bank}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Name:</span>
                <span className="font-bold">{formData.accountName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Reference:</span>
                <span className="font-bold">TXN{Date.now()}</span>
              </div>
            </div>

            <Button 
              onClick={onBack}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg rounded-lg"
            >
              Back to Dashboard
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  if (processing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h3 className="text-xl font-bold">Withdrawal is processing...</h3>
          <p className="text-gray-600">Please wait while we process your request</p>
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
          <h1 className="text-xl font-bold">Transfer To Bank</h1>
        </div>
      </div>

      <div className="p-6">
        {renderStep()}
      </div>
    </div>
  );
};

export default Transfer;
