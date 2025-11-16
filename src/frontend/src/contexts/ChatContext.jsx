import React, { createContext, useState, useContext, useEffect } from 'react';
import { chatService } from '../services/chatService';
import { messageService } from '../services/messageService';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem('chats');
    return savedChats ? JSON.parse(savedChats) : [];
  });

  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  const createNewChat = async (chatData = {}) => {
    try {
      setIsLoading(true);
      const newChat = await chatService.createChat({
        title: 'Новый чат',
        ...chatData
      });

      setCurrentChat(newChat);
      setMessages(newChat.messages || []);
      setChats(prev => [newChat, ...prev]);

      return newChat;
    } catch (error) {
      console.error('Failed to create chat:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loadChatById = async (chatId) => {
    try {
      setIsLoadingChat(true);

      const chatData = await chatService.getChatById(chatId);

      setCurrentChat(chatData);
      setMessages(chatData.messages || []);

      // Обновляем чат в списке
      setChats(prev => prev.map(chat =>
        chat.id === chatId ? { ...chat, ...chatData } : chat
      ));

      return chatData;
    } catch (error) {
      console.error(`Failed to load chat ${chatId}:`, error);
      throw error;
    } finally {
      setIsLoadingChat(false);
    }
  };

  const selectChat = async (chat) => {
    try {
      if (currentChat?.id === chat.id) {
        return;
      }

      await loadChatById(chat.id);

    } catch (error) {
      console.error('Failed to select chat:', error);
      setCurrentChat(chat);
      setMessages([]);
    }
  };

  const sendMessage = async (content) => {
    if (!currentChat || !content.trim()) {
      return;
    }

    try {
      setIsSendingMessage(true);

      // Создаем временное сообщение пользователя
      const tempUserMessage = {
        id: `temp-${Date.now()}`,
        content: content.trim(),
        sender: 'user',
        timestamp: new Date().toISOString(),
        isTemp: true
      };

      setMessages(prev => [...prev, tempUserMessage]);

      // Отправляем сообщение на бэкенд
      const response = await messageService.sendMessage({
        chat_id: currentChat.id,
        content: content.trim()
      });

      console.log('Message sent successfully:', response);

      // Удаляем временное сообщение и добавляем настоящие
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isTemp);
        return [
          ...filtered,
          {
            id: response.user_message.id || `user-${Date.now()}`,
            content: response.user_message.content,
            sender: 'user',
            timestamp: new Date().toISOString(),
            ...response.user_message
          },
          {
            id: response.llm_message.id || `ai-${Date.now()}`,
            content: response.llm_message.content,
            sender: 'ai',
            timestamp: new Date().toISOString(),
            ...response.llm_message
          }
        ];
      });

      // Обновляем последнее сообщение в чате
      setChats(prev => prev.map(chat =>
        chat.id === currentChat.id
          ? {
              ...chat,
              last_message: content.trim(),
              updated_at: new Date().toISOString()
            }
          : chat
      ));

    } catch (error) {
      console.error('Failed to send message:', error);

      // Удаляем временное сообщение при ошибке
      setMessages(prev => prev.filter(msg => !msg.isTemp));

      // Показываем сообщение об ошибке
      const errorMessage = {
        id: `error-${Date.now()}`,
        content: 'Ошибка при отправке сообщения. Попробуйте еще раз.',
        sender: 'system',
        timestamp: new Date().toISOString(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsSendingMessage(false);
    }
  };

  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  const value = {
    chats,
    currentChat,
    messages,
    isLoading,
    isLoadingChat,
    isSendingMessage,
    createNewChat,
    selectChat,
    loadChatById,
    sendMessage,
    addMessage
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};