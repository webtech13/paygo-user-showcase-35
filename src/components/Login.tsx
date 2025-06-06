
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '../contexts/AuthContext';

interface LoginProps {
  onSwitchToRegister: () => void;
}

const Login = ({ onSwitchToRegister }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-purple-600 text-sm mb-4">Need Help?</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Login to continue
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 text-lg border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 text-lg border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white py-4 text-lg font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Login
            </Button>
          </form>

          <p className="text-center mt-6 text-purple-600 cursor-pointer" onClick={onSwitchToRegister}>
            Don't have an account? Register
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
