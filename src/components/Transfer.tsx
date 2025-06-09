
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Transfer = ({ onBack }: { onBack: () => void }) => {
  const { user, updateBalance, addTransaction } = useAuth();
  const [amount, setAmount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleTransfer = () => {
    const transferAmount = parseFloat(amount);
    if (transferAmount > 0 && transferAmount <= (user?.balance || 0)) {
      updateBalance(transferAmount);
      addTransaction({
        type: 'Transfer',
        amount: transferAmount,
        date: new Date().toLocaleDateString() + ' at ' + new Date().toLocaleTimeString()
      });
      setShowConfirmation(true);
      setTimeout(() => {
        onBack();
      }, 2000);
    }
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 shadow-lg text-center max-w-sm w-full mx-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ArrowRight className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Transfer Successful!</h3>
          <p className="text-gray-600 mb-4">
            ₦{parseFloat(amount).toLocaleString()} has been transferred to {recipientName}
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
          <h1 className="text-xl font-bold">Transfer Money</h1>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <p className="text-gray-600 text-sm mb-2">Available Balance</p>
          <p className="text-2xl font-bold text-gray-800">₦{(user?.balance || 0).toLocaleString()}.00</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Recipient Name</label>
            <input
              type="text"
              placeholder="Enter recipient name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Account Number</label>
            <input
              type="text"
              placeholder="Enter account number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Bank Name</label>
            <input
              type="text"
              placeholder="Enter bank name"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <Button
            onClick={handleTransfer}
            disabled={!amount || !recipientName || !accountNumber || !bankName || parseFloat(amount) > (user?.balance || 0)}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg rounded-lg disabled:opacity-50"
          >
            Transfer ₦{amount ? parseFloat(amount).toLocaleString() : '0'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
