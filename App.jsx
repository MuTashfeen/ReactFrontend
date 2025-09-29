import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';
import Navbar from './components/Navbar'; // We'll add this later

function App() {
  // A simple way to manage auth state for demonstration.
  // In a real app, this would come from context, Redux, or a custom hook.
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated && <Navbar onSignOut={handleLogout} />} {/* Only show navbar if logged in */}
      <Routes>
        <Route path="/auth" element={isAuthenticated ? <Navigate to="/chat" /> : <AuthPage onLoginSuccess={handleLogin} />} />
        <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/auth" />} /> {/* Redirect to auth by default */}
      </Routes>
    </div>
  );
}

export default App;