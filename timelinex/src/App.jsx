// App.jsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Interests from "./pages/Interests";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [user, setUser] = useState(null);
  const [interests, setInterests] = useState([]);
  const [isSignupFlow, setIsSignupFlow] = useState(false);
  const [showSplash, setShowSplash] = useState(true); // 👈 splash toggle

  const handleLogin = (userData) => {
    setUser(userData);
    setIsSignupFlow(false);
  };

  const handleSignup = (userData) => {
    setUser(userData);
    setIsSignupFlow(true);
  };

  const handleInterestsSubmit = (selectedInterests) => {
    setInterests(selectedInterests);
    setIsSignupFlow(false);
  };

  const handleLogout = () => {
    setUser(null);
    setInterests([]);
    setIsSignupFlow(false);
  };

  // 👇 Render splash first
  if (showSplash) {
    return (
      <SplashScreen
        onComplete={() => {
          setShowSplash(false); // after splash is done → load router
        }}
      />
    );
  }

  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route
          path="/login"
          element={
            user && !isSignupFlow ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={
            user && isSignupFlow ? (
              <Navigate to="/interests" replace />
            ) : (
              <Signup onSignup={handleSignup} />
            )
          }
        />

        {/* Interests */}
        <Route
          path="/interests"
          element={
            user && isSignupFlow ? (
              <Interests onSubmit={handleInterestsSubmit} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            user ? (
              isSignupFlow && interests.length === 0 ? (
                <Navigate to="/interests" replace />
              ) : (
                <Dashboard
                  user={user}
                  userInterests={interests}
                  onLogout={handleLogout}
                />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* default redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
