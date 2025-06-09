
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Transfer = ({ onBack }: { onBack: () => void }) => {
  const { user, updateBalance, addTransaction } = useAuth();
  const [amount, setAmount] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('Access Bank');
  const [paygoId, setPaygoId] = useState('');
  const [showProcessing, setShowProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const handleTransfer = () => {
    const transferAmount = parseFloat(amount);
    
    // Validate PayGo ID
    if (paygoId !== 'paygo238') {
      alert('Invalid PayGo ID. Only paygo238 is allowed for transfers.');
      return;
    }

    if (transferAmount > 0 && transferAmount <= (user?.balance || 0) && accountName && accountNumber && paygoId) {
      setShowProcessing(true);
      
      setTimeout(() => {
        // Deduct from main balance
        updateBalance(transferAmount);
        addTransaction({
          type: 'Transfer',
          amount: transferAmount,
          date: new Date().toLocaleDateString() + ' at ' + new Date().toLocaleTimeString(),
          recipientName: accountName,
          bankName: bankName
        });
        setShowProcessing(false);
        setShowReceipt(true);
        
        setTimeout(() => {
          onBack();
        }, 3000);
      }, 2000);
    }
  };

  if (showReceipt) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 shadow-lg text-center max-w-sm w-full mx-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ArrowRight className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Transfer Successful!</h3>
          <p className="text-gray-600 mb-4">
            ₦{parseFloat(amount).toLocaleString()} has been transferred to {accountName}
          </p>
          <div className="text-left text-sm text-gray-600 space-y-1">
            <p><strong>Account:</strong> {accountNumber}</p>
            <p><strong>Bank:</strong> {bankName}</p>
            <p><strong>PayGo ID:</strong> {paygoId}</p>
          </div>
        </div>
      </div>
    );
  }

  if (showProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 shadow-lg text-center max-w-sm w-full mx-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <ArrowRight className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Processing Transfer...</h3>
          <p className="text-gray-600">Please wait while we process your transfer</p>
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Bank Details</h2>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Account Name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Account Number (10 digits)"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Access Bank">Access Bank</option>
              <option value="GTBank">GTBank</option>
              <option value="First Bank">First Bank</option>
              <option value="UBA">UBA</option>
              <option value="Zenith Bank">Zenith Bank</option>
            </select>
          </div>

          <div>
            <input
              type="text"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="PAY ID CODE (Buy PAY ID)"
              value={paygoId}
              onChange={(e) => setPaygoId(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-xs text-purple-600 mt-1">Buy PAY ID code</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-lg font-bold text-gray-800 mb-4">
            Available Balance: ₦{(user?.balance || 0).toLocaleString()}.00
          </p>

          <Button
            onClick={handleTransfer}
            disabled={!amount || !accountName || !accountNumber || !paygoId || parseFloat(amount) > (user?.balance || 0) || paygoId !== 'paygo238'}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg rounded-lg disabled:opacity-50"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
