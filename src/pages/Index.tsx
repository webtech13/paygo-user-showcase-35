
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import Login from '../components/Login';
import Register from '../components/Register';
import Welcome from '../components/Welcome';
import Dashboard from '../components/Dashboard';
import Onboarding from '../components/Onboarding';

const AppContent = () => {
  const { user, isWelcomeComplete } = useAuth();

  if (!user) {
    return <AuthFlow />;
  }

  if (!isWelcomeComplete) {
    return <Welcome />;
  }

  return <Dashboard />;
};

const AuthFlow = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      {isLogin ? (
        <Login onSwitchToRegister={() => setIsLogin(false)} />
      ) : (
        <Register onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <AppContent />
      </div>
    </AuthProvider>
  );
};

export default Index;
