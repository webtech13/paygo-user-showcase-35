
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import BuyPayId from './BuyPayId';
import Transfer from './Transfer';
import Airtime from './Airtime';
import Data from './Data';
import Support from './Support';
import EarnMore from './EarnMore';
import Profile from './Profile';
import ProfileInfo from './ProfileInfo';
import About from './About';
import TransactionHistory from './TransactionHistory';
import ReferEarn from './ReferEarn';
import Upgrade from './Upgrade';
import JoinCommunities from './JoinCommunities';
import Onboarding from './Onboarding';
import ReferEarnPopup from './ReferEarnPopup';
import DashboardHeader from './dashboard/DashboardHeader';
import BalanceCard from './dashboard/BalanceCard';
import QuickActions from './dashboard/QuickActions';
import PromotionsCarousel from './dashboard/PromotionsCarousel';
import LogoutDialog from './dashboard/LogoutDialog';
import ServiceBanner from './dashboard/ServiceBanner';

const Dashboard = () => {
  const { logout, isOnboardingComplete, completeOnboarding, showReferPopup, hideReferPopup } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showOnboardingPopup, setShowOnboardingPopup] = useState(!isOnboardingComplete);

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutDialog(false);
  };

  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };

  const handleCompleteOnboarding = () => {
    completeOnboarding();
    setShowOnboardingPopup(false);
  };

  if (currentView === 'buy-pay-id') {
    return <BuyPayId onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'transfer') {
    return <Transfer onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'airtime') {
    return <Airtime onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'data') {
    return <Data onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'support') {
    return <Support onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'earn-more') {
    return <EarnMore onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'profile') {
    return <Profile 
      onBack={() => setCurrentView('dashboard')} 
      onNavigate={(page) => setCurrentView(page)}
    />;
  }

  if (currentView === 'profile-info') {
    return <ProfileInfo onBack={() => setCurrentView('profile')} />;
  }

  if (currentView === 'about') {
    return <About onBack={() => setCurrentView('profile')} />;
  }

  if (currentView === 'transaction-history') {
    return <TransactionHistory onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'refer-earn') {
    return <ReferEarn 
      onBack={() => setCurrentView('dashboard')} 
      onNavigate={(page) => setCurrentView(page)}
    />;
  }

  if (currentView === 'upgrade') {
    return <Upgrade onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'join-communities') {
    return <JoinCommunities onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-orange-100">
      {/* Onboarding Popup */}
      {showOnboardingPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
            <Onboarding onComplete={handleCompleteOnboarding} />
          </div>
        </div>
      )}

      {/* Service Banner */}
      <ServiceBanner />

      {/* Header */}
      <DashboardHeader 
        onTransactionHistory={() => setCurrentView('transaction-history')}
        onLogout={handleLogout}
      />

      {/* Balance Card */}
      <BalanceCard 
        onUpgrade={() => setCurrentView('upgrade')}
        onTransfer={() => setCurrentView('transfer')}
      />

      {/* Quick Actions */}
      <div className="p-6">
        <QuickActions 
          onBuyPayId={() => setCurrentView('buy-pay-id')}
          onAirtime={() => setCurrentView('airtime')}
          onData={() => setCurrentView('data')}
          onSupport={() => setCurrentView('support')}
          onJoinCommunities={() => setCurrentView('join-communities')}
          onEarnMore={() => setCurrentView('earn-more')}
          onProfile={() => setCurrentView('profile')}
        />

        {/* Promotions Carousel */}
        <PromotionsCarousel />
      </div>

      {/* Logout Confirmation Dialog */}
      <LogoutDialog 
        isOpen={showLogoutDialog}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />

      {/* Refer & Earn Popup */}
      {showReferPopup && (
        <ReferEarnPopup onClose={hideReferPopup} />
      )}
    </div>
  );
};

export default Dashboard;
