import React, { createContext, useState, useContext } from 'react';
import { chatService } from '../services/chatService';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const createNewChat = async (chatData = {}) => {
    try {
      setIsLoading(true);
      const newChat = await chatService.createChat(chatData);

      setChats(prev => [newChat, ...prev]);
      setCurrentChat(newChat);

      return newChat;
    } catch (error) {
      console.error('Failed to create chat:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const selectChat = (chat) => {
    setCurrentChat(chat);
  };

  const value = {
    chats,
    currentChat,
    isLoading,
    createNewChat,
    selectChat
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};