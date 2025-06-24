
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

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
            <X className="w-4 h-4" />
          </Button>
          <div className="flex items-center space-x-3 text-white">
            <div className="w-6 h-6 flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
              </svg>
            </div>
            <span className="text-sm font-medium">Refer & Earn</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="mb-4 flex justify-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <div className="text-yellow-600 text-lg">🎁</div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            Earn ₦5,000!
          </h3>
          
          <p className="text-gray-600 mb-6 text-xs leading-relaxed">
            Invite your friends using your referral link. Earn ₦5,000 for each successful signup. Get a discount on your PAY ID purchase.
          </p>

          <Button
            onClick={handleShareOnWhatsApp}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-sm font-medium rounded-lg mb-4"
          >
            <div className="flex items-center justify-center space-x-2">
              <span>📱</span>
              <span>Share on WhatsApp</span>
            </div>
          </Button>

          <p className="text-gray-500 text-xs">
            Start earning and save on PAY ID costs today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReferEarnPopup;
