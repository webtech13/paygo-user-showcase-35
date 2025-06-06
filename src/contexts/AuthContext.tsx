
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isOnboardingComplete: boolean;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  const register = (name: string, email: string, password: string) => {
    // Simple registration logic
    const newUser = { name, email };
    setUser(newUser);
    setIsOnboardingComplete(false);
    return true;
  };

  const login = (email: string, password: string) => {
    // Simple login logic - in real app, this would validate credentials
    const userData = localStorage.getItem('paygo_user');
    if (userData) {
      const user = JSON.parse(userData);
      setUser(user);
      setIsOnboardingComplete(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsOnboardingComplete(false);
    localStorage.removeItem('paygo_user');
  };

  const completeOnboarding = () => {
    setIsOnboardingComplete(true);
    if (user) {
      localStorage.setItem('paygo_user', JSON.stringify(user));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isOnboardingComplete,
      completeOnboarding
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
