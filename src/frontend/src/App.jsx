import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import MainPage from './pages/MainPage';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';
import './styles/main.css';

function App() {
  return (
    <AuthProvider>
        <ChatProvider>
          <Router>
            <div className="app">
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </Router>
        </ChatProvider>
    </AuthProvider>
  );
}

export default App;