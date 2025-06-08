
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  balance?: number;
}

interface Transaction {
  type: string;
  amount: number;
  network?: string;
  phoneNumber?: string;
  plan?: any;
  date: string;
}

interface AuthContextType {
  user: User | null;
  transactions: Transaction[];
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  isOnboardingComplete: boolean;
  isWelcomeComplete: boolean;
  completeOnboarding: () => void;
  completeWelcome: () => void;
  updateBalance: (amount: number) => void;
  addTransaction: (transaction: Transaction) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isWelcomeComplete, setIsWelcomeComplete] = useState(false);

  const register = (name: string, email: string, password: string) => {
    // Check if email already exists
    const existingUsers = JSON.parse(localStorage.getItem('paygo_users') || '[]');
    const emailExists = existingUsers.some((u: User) => u.email === email);
    
    if (emailExists) {
      return { success: false, error: 'Email already exists, please login' };
    }

    // Register new user
    const newUser = { name, email, balance: 180000 };
    existingUsers.push(newUser);
    localStorage.setItem('paygo_users', JSON.stringify(existingUsers));
    
    setUser(newUser);
    setTransactions([]);
    setIsWelcomeComplete(false);
    setIsOnboardingComplete(false);
    return { success: true };
  };

  const login = (email: string, password: string) => {
    const existingUsers = JSON.parse(localStorage.getItem('paygo_users') || '[]');
    const userData = existingUsers.find((u: User) => u.email === email);
    
    if (userData) {
      setUser({ ...userData, balance: userData.balance || 180000 });
      const userTransactions = JSON.parse(localStorage.getItem(`paygo_transactions_${email}`) || '[]');
      setTransactions(userTransactions);
      setIsWelcomeComplete(true);
      setIsOnboardingComplete(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setTransactions([]);
    setIsOnboardingComplete(false);
    setIsWelcomeComplete(false);
  };

  const completeOnboarding = () => {
    setIsOnboardingComplete(true);
  };

  const completeWelcome = () => {
    setIsWelcomeComplete(true);
  };

  const updateBalance = (amount: number) => {
    if (user) {
      const newBalance = (user.balance || 180000) - amount;
      const updatedUser = { ...user, balance: newBalance };
      setUser(updatedUser);
      
      // Update localStorage
      const existingUsers = JSON.parse(localStorage.getItem('paygo_users') || '[]');
      const userIndex = existingUsers.findIndex((u: User) => u.email === user.email);
      if (userIndex !== -1) {
        existingUsers[userIndex] = updatedUser;
        localStorage.setItem('paygo_users', JSON.stringify(existingUsers));
      }
    }
  };

  const addTransaction = (transaction: Transaction) => {
    if (user) {
      const newTransactions = [...transactions, transaction];
      setTransactions(newTransactions);
      localStorage.setItem(`paygo_transactions_${user.email}`, JSON.stringify(newTransactions));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      transactions,
      login,
      register,
      logout,
      isOnboardingComplete,
      isWelcomeComplete,
      completeOnboarding,
      completeWelcome,
      updateBalance,
      addTransaction
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
