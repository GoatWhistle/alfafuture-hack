import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ChatWindow from '../components/Chat/ChatWindow';
import Sidebar from '../components/Chat/Sidebar';

const ChatPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sendMessage = async (content) => {
    const userMessage = {
      id: Date.now(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        content: "Это пример ответа AI. Когда будут готовы бекенд-ручки, здесь будут реальные ответы.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="chat-page">
      <div className="chat-layout">
        <Sidebar user={user} onLogout={handleLogout} />
        <ChatWindow
          messages={messages}
          onSendMessage={sendMessage}
          isLoading={isLoading}
          user={user}
        />
      </div>
    </div>
  );
};

export default ChatPage;