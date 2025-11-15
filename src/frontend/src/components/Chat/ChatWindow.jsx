import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';

const ChatWindow = ({ messages, onSendMessage, isLoading, user }) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>AI Assistant</h2>
        <p>Готов помочь с вашими вопросами</p>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🤖</div>
            <h3>Начните диалог</h3>
            <p>Задайте вопрос AI-ассистенту</p>
          </div>
        )}

        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
          />
        ))}

        {isLoading && (
          <div className="message ai">
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <form onSubmit={handleSubmit} className="chat-form">
          <textarea
            className="chat-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Введите ваш вопрос..."
            rows="1"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="send-btn"
            disabled={!inputValue.trim() || isLoading}
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;