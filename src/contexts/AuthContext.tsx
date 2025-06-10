
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  balance?: number;
  referralBalance?: number;
  totalReferrals?: number;
}

interface Transaction {
  type: string;
  amount: number;
  network?: string;
  phoneNumber?: string;
  plan?: any;
  date: string;
  recipientName?: string;
  bankName?: string;
}

interface AuthContextType {
  user: User | null;
  transactions: Transaction[];
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  isOnboardingComplete: boolean;
  isWelcomeComplete: boolean;
  showReferPopup: boolean;
  completeOnboarding: () => void;
  completeWelcome: () => void;
  hideReferPopup: () => void;
  updateBalance: (amount: number) => void;
  updateReferralBalance: (amount: number) => void;
  addReferral: () => void;
  addTransaction: (transaction: Transaction) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isWelcomeComplete, setIsWelcomeComplete] = useState(false);
  const [showReferPopup, setShowReferPopup] = useState(false);

  // Auto-login on app load
  useEffect(() => {
    const lastLoggedInUser = localStorage.getItem('paygo_current_user');
    if (lastLoggedInUser) {
      const existingUsers = JSON.parse(localStorage.getItem('paygo_users') || '[]');
      const userData = existingUsers.find((u: User) => u.email === lastLoggedInUser);
      
      if (userData) {
        setUser({ 
          ...userData, 
          balance: userData.balance || 180000,
          referralBalance: userData.referralBalance || 0,
          totalReferrals: userData.totalReferrals || 0
        });
        const userTransactions = JSON.parse(localStorage.getItem(`paygo_transactions_${lastLoggedInUser}`) || '[]');
        setTransactions(userTransactions);
        setIsWelcomeComplete(true);
        setIsOnboardingComplete(true);
        setShowReferPopup(true);
      }
    }
  }, []);

  const register = (name: string, email: string, password: string) => {
    // Check if email already exists
    const existingUsers = JSON.parse(localStorage.getItem('paygo_users') || '[]');
    const emailExists = existingUsers.some((u: User) => u.email === email);
    
    if (emailExists) {
      return { success: false, error: 'Email already exists, please login' };
    }

    // Register new user - start with 180,000 in main balance
    const newUser = { 
      name, 
      email, 
      balance: 180000, 
      referralBalance: 0, 
      totalReferrals: 0 
    };
    existingUsers.push(newUser);
    localStorage.setItem('paygo_users', JSON.stringify(existingUsers));
    
    setUser(newUser);
    setTransactions([]);
    setIsWelcomeComplete(false);
    setIsOnboardingComplete(false);
    localStorage.setItem('paygo_current_user', email);
    return { success: true };
  };

  const login = (email: string, password: string) => {
    const existingUsers = JSON.parse(localStorage.getItem('paygo_users') || '[]');
    const userData = existingUsers.find((u: User) => u.email === email);
    
    if (userData) {
      setUser({ 
        ...userData, 
        balance: userData.balance || 180000,
        referralBalance: userData.referralBalance || 0,
        totalReferrals: userData.totalReferrals || 0
      });
      const userTransactions = JSON.parse(localStorage.getItem(`paygo_transactions_${email}`) || '[]');
      setTransactions(userTransactions);
      setIsWelcomeComplete(true);
      setIsOnboardingComplete(true);
      setShowReferPopup(true);
      localStorage.setItem('paygo_current_user', email);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setTransactions([]);
    setIsOnboardingComplete(false);
    setIsWelcomeComplete(false);
    setShowReferPopup(false);
    localStorage.removeItem('paygo_current_user');
  };

  const completeOnboarding = () => {
    setIsOnboardingComplete(true);
    setShowReferPopup(true);
  };

  const hideReferPopup = () => {
    setShowReferPopup(false);
  };

  const completeWelcome = () => {
    setIsWelcomeComplete(true);
  };

  const updateBalance = (amount: number) => {
    if (user) {
      // Deduct from main balance only
      const newBalance = Math.max(0, (user.balance || 180000) - amount);
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

  const updateReferralBalance = (amount: number) => {
    if (user) {
      const newReferralBalance = Math.max(0, (user.referralBalance || 0) - amount);
      const updatedUser = { ...user, referralBalance: newReferralBalance };
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

  const addReferral = () => {
    if (user) {
      const newReferralBalance = (user.referralBalance || 0) + 5000;
      const newTotalReferrals = (user.totalReferrals || 0) + 1;
      const updatedUser = { 
        ...user, 
        referralBalance: newReferralBalance, 
        totalReferrals: newTotalReferrals 
      };
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
      showReferPopup,
      completeOnboarding,
      completeWelcome,
      hideReferPopup,
      updateBalance,
      updateReferralBalance,
      addReferral,
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
