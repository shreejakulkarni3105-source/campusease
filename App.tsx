
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import FilterScreen from './screens/FilterScreen';
import ResultsScreen from './screens/ResultsScreen';
import DetailScreen from './screens/DetailScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import ReservationsScreen from './screens/ReservationsScreen';
import ProfileScreen from './screens/ProfileScreen';
import AssignerProfileScreen from './screens/AssignerProfileScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import AssignerDashboard from './screens/AssignerDashboard';
import AllocationDetails from './screens/AllocationDetails';
import OnboardingScreen from './screens/OnboardingScreen';
import { Classroom, Reservation, SearchFilters, User } from './types';

const AppContent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [filters, setFilters] = useState<SearchFilters>({
    building: '',
    timeSlot: 'Now',
    capacity: 1
  });
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [lastBooking, setLastBooking] = useState<Reservation | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const location = useLocation();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleUpdateProfile = (updates: Partial<User>) => {
    if (user) setUser({ ...user, ...updates });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const addReservation = (classroom: Classroom) => {
    const newRes: Reservation = {
      id: Math.random().toString(36).substr(2, 9),
      classroom,
      date: 'Today',
      startTime: '2:00 PM',
      endTime: '4:00 PM',
      status: 'upcoming'
    };
    setReservations(prev => [newRes, ...prev]);
    setLastBooking(newRes);
  };

  const cancelReservation = (id: string) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status: 'cancelled' } : r));
  };

  const isAuthRoute = ['/signin', '/signup', '/forgot-password', '/onboarding'].includes(location.pathname);
  
  if (isFirstVisit && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  if (!user && !isAuthRoute) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="max-w-md mx-auto min-h-screen relative flex flex-col bg-background overflow-x-hidden shadow-2xl shadow-black/50">
      {!isOnline && (
        <div role="status" className="bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest text-center py-1 z-[100] animate-in slide-in-from-top duration-300">
          You’re offline. Availability may be outdated.
        </div>
      )}
      
      <Routes>
        <Route path="/onboarding" element={<OnboardingScreen onComplete={() => setIsFirstVisit(false)} />} />
        <Route path="/signin" element={<SignInScreen onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUpScreen onLogin={handleLogin} />} />
        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
        
        {/* Student Protected Routes */}
        <Route path="/" element={user?.role === 'student' ? <HomeScreen user={user} /> : <Navigate to="/assigner-dashboard" replace />} />
        <Route path="/filter" element={user?.role === 'student' ? <FilterScreen filters={filters} setFilters={setFilters} /> : <Navigate to="/assigner-dashboard" replace />} />
        <Route path="/results" element={user?.role === 'student' ? <ResultsScreen filters={filters} user={user} /> : <Navigate to="/assigner-dashboard" replace />} />
        <Route path="/detail/:id" element={user?.role === 'student' ? <DetailScreen onReserve={addReservation} reservations={reservations} /> : <Navigate to="/assigner-dashboard" replace />} />
        <Route path="/confirmation" element={user?.role === 'student' ? <ConfirmationScreen reservation={lastBooking} /> : <Navigate to="/assigner-dashboard" replace />} />
        <Route path="/reservations" element={user?.role === 'student' ? <ReservationsScreen reservations={reservations} onCancel={cancelReservation} user={user} /> : <Navigate to="/assigner-dashboard" replace />} />
        <Route path="/profile" element={user?.role === 'student' ? <ProfileScreen user={user} onLogout={handleLogout} onUpdateProfile={handleUpdateProfile} /> : <Navigate to="/assigner-profile" replace />} />
        
        {/* Assigner Protected Routes */}
        <Route path="/assigner-dashboard" element={user?.role === 'assigner' ? <AssignerDashboard user={user} /> : <Navigate to="/" replace />} />
        <Route path="/allocation/:id" element={user?.role === 'assigner' ? <AllocationDetails /> : <Navigate to="/" replace />} />
        <Route path="/assigner-profile" element={user?.role === 'assigner' ? <AssignerProfileScreen user={user} onLogout={handleLogout} onUpdateProfile={handleUpdateProfile} /> : <Navigate to="/profile" replace />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
