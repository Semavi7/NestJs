import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Login from '../Auth/Login';
import ChatContainer from '../Chat/ChatContainer';

const AppLayout: React.FC = () => {
  const { state: authState, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (!authState.isAuthenticated) {
    return  <Login  />
  }



  return (
    <div className="relative h-screen">
      <ChatContainer />
      
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none"
      >
        Logout
      </button>
    </div>
  );
};

export default AppLayout;