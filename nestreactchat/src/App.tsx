import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import AppLayout from './components/Layouts/AppLayout';
import './index.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ChatProvider>
        <AppLayout />
      </ChatProvider>
    </AuthProvider>
  );
};

export default App;