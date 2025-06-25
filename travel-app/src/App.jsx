import { useState, useEffect, useRef, lazy, Suspense, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import React from "react";
import { TripsProvider } from "./context/TripsContext";
import AllTrips from "./components/AllTrips";
import LeaderboardPage from './components/LeaderboardPage';

// Lazy loaded components
const Landing = lazy(() => import('./components/Landing'));
const Login = lazy(() => import('./components/login'));
const SignUp = lazy(() => import('./components/SignUp'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Profile = lazy(() => import('./components/Profile'));
const Loading = lazy(() => import('./components/Loading'));
const OAuthSuccess = lazy(() => import('./components/OAuthSuccess'));
const OAuthError = lazy(() => import('./components/OAuthError'));


const STORAGE_KEYS = {
  DARK_MODE: 'darkMode',
  AUTH_TOKEN: 'authToken',
  USER: 'user',
};

const useLocalStorage = (key, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  return token ? children : <Navigate to="/login" replace />;
};

// Public Route Component
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  return !token ? children : <Navigate to="/dashboard" replace />;
};

// Wrapper for Login Page
const LoginWrapper = ({ handleAuthSuccess }) => {
  const navigate = useNavigate();

  return (
      <Login
        onLoginSuccess={handleAuthSuccess}
        onSignUpClick={() => navigate('/signup')}
        onBackToLanding={() => navigate('/')}
      />
  );
};

// Wrapper for SignUp Page
const SignUpWrapper = ({ handleAuthSuccess }) => {
  const navigate = useNavigate();

  return (
      <SignUp
        onSignUpSuccess={handleAuthSuccess}
        onLoginClick={() => navigate('/login')}
        onBackToLanding={() => navigate('/')}
      />
  );
};

const App = () => {
  const hasTransitioned = useRef(false);
  const [darkMode, setDarkMode] = useLocalStorage(STORAGE_KEYS.DARK_MODE, true);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleAuthSuccess = useCallback(() => {
    setIsLoggedIn(true);
    navigate('/dashboard', { replace: true });
  }, [navigate]);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    navigate('/login', { replace: true });
  }, [navigate]);

  const currentUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER));

  return (
    <Suspense fallback={<Loading onLoadingComplete={() => {}} />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginWrapper handleAuthSuccess={handleAuthSuccess} />} />
        <Route path="/signup" element={<SignUpWrapper handleAuthSuccess={handleAuthSuccess} />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/oauth-error" element={<OAuthError />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard
                onLogout={handleLogout}
                currentUser={currentUser}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={<Profile currentUser={currentUser} />}
        />
        <Route path="/all-trips" element={<AllTrips />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        {/* Redirect unknown routes to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <TripsProvider>
        <App />
      </TripsProvider>
    </BrowserRouter>
  );
}
