import { Button } from '@/components/ui/button';
import { Gift, X } from 'lucide-react';

const ReferEarnPopup = ({ onClose }: { onClose: () => void }) => {
  const handleShareOnWhatsApp = () => {
    const referralLink = 'https://paygo-financial-pro-71-b0b4.vercel.app';
    const message = `Join PayGo and earn money! Use my referral link: ${referralLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl">
        {/* Header with close button */}
        <div className="relative bg-purple-600 p-4">
          <Button 
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-transparent hover:bg-white/10 text-white"
          >
            <X className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-3 text-white">
            <div className="w-8 h-8 flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-purple-600 text-xs">⚡</span>
              </div>
            </div>
            <span className="text-lg font-medium">Refer & Earn</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <Gift className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            Earn ₦5,000!
          </h3>
          
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            Invite your friends using your referral link. Earn ₦5,000 for each successful signup. Get a discount on your PAY ID purchase.
          </p>

          <Button
            onClick={handleShareOnWhatsApp}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-4 text-lg font-medium rounded-lg mb-4"
          >
            <div className="flex items-center justify-center space-x-2">
              <span>📱</span>
              <span>Share on WhatsApp</span>
            </div>
          </Button>

          <p className="text-gray-500 text-sm">
            Start earning and save on PAY ID costs today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReferEarnPopup;