
import { Button } from '@/components/ui/button';

interface LogoutDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutDialog = ({ isOpen, onConfirm, onCancel }: LogoutDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Confirm Logout</h3>
        <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
        <div className="flex space-x-3">
          <Button
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg"
          >
            No
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg"
          >
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutDialog;
