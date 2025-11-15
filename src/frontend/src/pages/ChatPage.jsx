import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ChatWindow from '../components/Chat/ChatWindow';
import Sidebar from '../components/Chat/Sidebar';

const ChatPage = () => {
  const { user, logout } = useAuth();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Заглушка для отправки сообщения
  const sendMessage = async (content) => {
    const userMessage = {
      id: Date.now(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Имитация ответа AI
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
        <Sidebar user={user} onLogout={logout} />
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