
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Airtime = ({ onBack }: { onBack: () => void }) => {
  const { user, updateBalance, addTransaction } = useAuth();
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [payId, setPayId] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const networks = ['Airtel', 'MTN', 'Glo', '9mobile'];
  
  const amounts = [
    { value: '50', cashback: '1' },
    { value: '100', cashback: '2' },
    { value: '200', cashback: '3' },
    { value: '500', cashback: '10' },
    { value: '1000', cashback: '20' },
    { value: '2000', cashback: '50' },
    { value: '3000', cashback: '75' },
    { value: '5000', cashback: '125' },
    { value: '10000', cashback: '250' }
  ];

  const handleSubmit = () => {
    if (payId !== 'paygo238') {
      alert('Invalid PAY ID. Transaction not allowed.');
      return;
    }

    if (!selectedNetwork || !phoneNumber || !selectedAmount) {
      alert('Please fill all fields');
      return;
    }

    const amount = parseInt(selectedAmount);
    if (amount > (user?.balance || 0)) {
      alert('Insufficient balance');
      return;
    }

    setProcessing(true);
    
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          updateBalance(amount);
          addTransaction({
            type: 'Airtime Purchase',
            amount: amount,
            network: selectedNetwork,
            phoneNumber: phoneNumber,
            date: new Date().toLocaleString()
          });
          setSuccess(true);
          setProcessing(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  if (processing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h3 className="text-xl font-bold">Processing Airtime Purchase...</h3>
          <p className="text-gray-600">Please wait while we process your request</p>
          <div className="text-3xl font-bold text-purple-600">{countdown}</div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex flex-col items-center justify-center space-y-6 py-12">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-4xl">✓</span>
          </div>
          <h3 className="text-2xl font-bold text-green-600">Airtime Purchase Successful!</h3>
          
          <div className="bg-gray-100 rounded-lg p-6 w-full space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Network:</span>
              <span className="font-bold">{selectedNetwork}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone Number:</span>
              <span className="font-bold">{phoneNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-bold">₦{selectedAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cashback:</span>
              <span className="font-bold text-green-600">₦{amounts.find(a => a.value === selectedAmount)?.cashback}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Reference:</span>
              <span className="font-bold">AIR{Date.now()}</span>
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
      <div className="bg-purple-600 text-white p-4">
        <div className="flex items-center space-x-3">
          <Button onClick={onBack} className="bg-transparent p-2">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Airtime</h1>
        </div>
      </div>

      <div className="bg-purple-600 text-white p-4 flex items-center justify-between">
        <span className="text-lg">Enjoy Airtime Bonuses!</span>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-full font-bold">
          GO
        </Button>
      </div>

      <div className="p-6 space-y-6">
        {/* Network Selection */}
        <div className="grid grid-cols-2 gap-4">
          {networks.map((network) => (
            <button
              key={network}
              onClick={() => setSelectedNetwork(network)}
              className={`p-4 border-2 rounded-lg text-center font-medium ${
                selectedNetwork === network ? 'border-purple-600 bg-purple-50' : 'border-gray-300'
              }`}
            >
              {network}
            </button>
          ))}
        </div>

        {/* Phone Number */}
        <input
          type="tel"
          placeholder="Enter mobile number (11 digits)"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          maxLength={11}
        />

        {/* Amount Selection */}
        <div>
          <h3 className="text-lg font-bold mb-4">Select Amount</h3>
          <div className="grid grid-cols-3 gap-4">
            {amounts.map((amount) => (
              <button
                key={amount.value}
                onClick={() => setSelectedAmount(amount.value)}
                className={`p-4 border-2 rounded-lg text-center ${
                  selectedAmount === amount.value ? 'border-purple-600 bg-purple-50' : 'border-gray-300'
                }`}
              >
                <div className="text-xl font-bold">₦{amount.value}</div>
                <div className="text-sm text-gray-600">₦{amount.cashback} Cashback</div>
              </button>
            ))}
          </div>
        </div>

        {/* PAY ID */}
        <input
          type="text"
          placeholder="Enter PAY ID Code"
          value={payId}
          onChange={(e) => setPayId(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <Button
          onClick={handleSubmit}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg rounded-lg"
        >
          Buy Airtime
        </Button>
      </div>
    </div>
  );
};

export default Airtime;
