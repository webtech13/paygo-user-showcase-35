
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '../contexts/AuthContext';

interface RegisterProps {
  onSwitchToLogin: () => void;
}

const Register = ({ onSwitchToLogin }: RegisterProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (name && email && password) {
      const result = register(name, email, password);
      if (!result.success && result.error) {
        setError(result.error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-orange-400 text-white text-2xl font-bold py-4 px-8 rounded-lg mb-8 mx-auto w-fit overflow-hidden relative">
            <div className="animate-slide-paygo">
              PAYGO
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Register to continue
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 text-lg border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

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
              Register
            </Button>
          </form>

          <p className="text-center mt-6 text-purple-600 cursor-pointer" onClick={onSwitchToLogin}>
            Already have an account? Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
