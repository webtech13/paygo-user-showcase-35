import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowDown, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const TransactionHistory = ({ onBack }: { onBack: () => void }) => {
  const { user, transactions } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button onClick={onBack} className="bg-transparent p-2">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-bold">Transaction History</h1>
          </div>
          <Button className="bg-transparent text-red-400 hover:bg-red-500/20">
            <Trash2 className="w-5 h-5 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Your Transactions</h2>

        <div className="space-y-4">
          {/* Welcome Bonus Transaction */}
          <div className="bg-white rounded-lg p-4 shadow-sm border flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <ArrowDown className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Welcome Bonus</h3>
                <p className="text-gray-600 text-sm">
                  {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
            <span className="text-green-600 font-bold text-lg">+₦180,000.00</span>
          </div>

          {/* Other Transactions */}
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm border flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <ArrowDown className="w-6 h-6 text-red-600 rotate-180" />
                  </div>
                  <div>
                    <h3 className="font-medium">{transaction.type}</h3>
                    <p className="text-gray-600 text-sm">{transaction.date}</p>
                    {transaction.network && (
                      <p className="text-gray-500 text-xs">{transaction.network} - {transaction.phoneNumber}</p>
                    )}
                  </div>
                </div>
                <span className="text-red-600 font-bold text-lg">-₦{transaction.amount.toLocaleString()}.00</span>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-8">
              <p>No other transactions found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
