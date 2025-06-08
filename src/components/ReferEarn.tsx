
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Copy, Share } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ReferEarnProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const ReferEarn = ({ onBack, onNavigate }: ReferEarnProps) => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState('main');
  const [countdown, setCountdown] = useState(10);
  const [progress, setProgress] = useState(0);
  const [withdrawData, setWithdrawData] = useState({
    accountName: '',
    accountNumber: '',
    bank: '',
    payId: ''
  });

  // Mock referral data - starts at 0 unless user has referrals
  const referralBalance = 0; // Changed from 5000 to 0
  const totalReferrals = 0; // Changed from 1 to 0
  const totalEarnings = 0; // Changed from 5000 to 0
  const referralLink = 'https://bestearnig9jaupdatespaygo.netlify.app';

  useEffect(() => {
    if (currentView === 'processing' && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
        setProgress((10 - countdown + 1) / 10 * 100);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (currentView === 'processing' && countdown === 0) {
      setCurrentView('success');
    }
  }, [currentView, countdown]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleWithdrawSubmit = () => {
    if (withdrawData.payId !== 'paygo238') {
      alert('Invalid PAY ID. Please use paygo238');
      return;
    }
    setCurrentView('processing');
  };

  const handleShareWhatsApp = () => {
    const message = `Join PayGo and earn money! Use my referral link: ${referralLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (currentView === 'withdraw') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-purple-600 text-white p-4">
          <div className="flex items-center space-x-3">
            <Button onClick={() => setCurrentView('main')} className="bg-transparent p-2">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-bold">Withdraw Referral Earnings</h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <p className="text-purple-600 text-sm">Available Balance</p>
            <h2 className="text-4xl font-bold text-purple-600">₦{referralBalance.toLocaleString()}.00</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-gray-700 font-medium">Account Name</label>
              <input
                type="text"
                placeholder="Enter account name"
                value={withdrawData.accountName}
                onChange={(e) => setWithdrawData({...withdrawData, accountName: e.target.value})}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Account Number</label>
              <input
                type="text"
                placeholder="Enter account number"
                value={withdrawData.accountNumber}
                onChange={(e) => setWithdrawData({...withdrawData, accountNumber: e.target.value})}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Bank</label>
              <select
                value={withdrawData.bank}
                onChange={(e) => setWithdrawData({...withdrawData, bank: e.target.value})}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2"
              >
                <option value="">Select Bank</option>
                <option value="Access Bank">Access Bank</option>
                <option value="GTBank">GTBank</option>
                <option value="First Bank">First Bank</option>
                <option value="UBA">UBA</option>
                <option value="Zenith Bank">Zenith Bank</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700 font-medium">PAY ID</label>
              <input
                type="text"
                placeholder="Enter your PAY ID"
                value={withdrawData.payId}
                onChange={(e) => setWithdrawData({...withdrawData, payId: e.target.value})}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2"
              />
            </div>
          </div>

          <Button
            onClick={handleWithdrawSubmit}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg rounded-lg"
          >
            Submit Withdrawal Request
          </Button>
        </div>
      </div>
    );
  }

  if (currentView === 'processing') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-6 p-6">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h3 className="text-2xl font-bold text-gray-800">Processing Withdrawal</h3>
          <p className="text-gray-600">Please wait while we process your withdrawal...</p>
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

  if (currentView === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-6 p-6 max-w-md">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <span className="text-white text-4xl">✓</span>
          </div>
          <h3 className="text-2xl font-bold text-green-600">Withdrawal Successful!</h3>
          <p className="text-gray-600">Your withdrawal has been successfully sent to your provided bank details.</p>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border text-left space-y-3">
            <h4 className="font-bold text-gray-800">Transaction Receipt</h4>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-bold">₦{referralBalance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Account Name:</span>
              <span className="font-bold">{withdrawData.accountName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Account Number:</span>
              <span className="font-bold">{withdrawData.accountNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bank:</span>
              <span className="font-bold">{withdrawData.bank}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-bold">{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <Button
            onClick={onBack}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg rounded-lg"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 border-b">
        <div className="flex items-center space-x-3">
          <Button onClick={onBack} className="bg-transparent p-2 text-black hover:bg-gray-100">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Refer & Earn</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Referral Balance */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
          <h3 className="text-lg font-medium mb-2">Referral Balance</h3>
          <h2 className="text-4xl font-bold mb-4">₦{referralBalance.toLocaleString()}.00</h2>
          <Button
            onClick={() => setCurrentView('withdraw')}
            className="w-full bg-white text-purple-600 hover:bg-gray-100 py-3 rounded-lg font-medium"
          >
            Withdraw Earnings
          </Button>
        </div>

        {/* Invite Friends & Earn */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white text-center">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Share className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-4">Invite Friends & Earn</h3>
          <p className="mb-6 opacity-90">
            Earn ₦5,000 for each friend who signs up using your referral link and purchases a PAY ID.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => handleCopy(referralLink)}
            className="w-full bg-white border border-gray-300 text-gray-700 py-4 rounded-lg flex items-center justify-center space-x-2"
          >
            <Copy className="w-5 h-5" />
            <span>Copy Referral Message</span>
          </Button>

          <Button
            onClick={handleShareWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg flex items-center justify-center space-x-2"
          >
            <span>📱</span>
            <span>Share via WhatsApp</span>
          </Button>
        </div>

        {/* How It Works */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800">How It Works</h3>
          <div className="space-y-3 text-gray-700">
            <p>1. Share your referral link with friends</p>
            <p>2. Your friend signs up using your link</p>
            <p>3. When they purchase a PAY ID, you earn ₦5,000</p>
            <p>4. Your earnings will be added to your referral balance</p>
            <p>5. Withdraw your earnings to your bank account</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <h4 className="text-3xl font-bold text-purple-600">{totalReferrals}</h4>
            <p className="text-gray-600">Total Referrals</p>
          </div>
          <div className="text-center">
            <h4 className="text-3xl font-bold text-purple-600">₦{totalEarnings.toLocaleString()}.00</h4>
            <p className="text-gray-600">Total Earnings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferEarn;
