import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useChat } from '../../contexts/ChatContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const {
    chats,
    currentChat,
    isLoading,
    isLoadingChat,
    createNewChat,
    selectChat
  } = useChat();

  const handleNewChat = async () => {
    try {
      await createNewChat({
        title: 'Новый чат',
      });
    } catch (error) {
      console.error('Failed to create new chat:', error);
    }
  };

  const handleChatSelect = async (chat) => {
    await selectChat(chat);
  };

  const handleLogout = () => {
    logout();
  };

  // Функция для обрезки длинного текста
  const truncatePreview = (text, maxLength = 50) => {
    if (!text) return 'Нет сообщений';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Получаем превью для чата
  const getChatPreview = (chat) => {
    // Если это текущий чат и у него есть сообщения, показываем последнее
    if (currentChat?.id === chat.id && chat.messages?.length > 0) {
      const lastMessage = chat.messages[chat.messages.length - 1];
      return truncatePreview(lastMessage.content);
    }

    // Иначе используем дефолтное сообщение
    return 'Начните общение...';
  };

  return (
    <div className="sidebar">
      {/* Заголовок с информацией о пользователе */}
      <div className="sidebar-header">
        <div className="user-info">
          <div className="user-info-main">
            <h3>{user?.name || 'Пользователь'}</h3>
            <p className="user-email">{user?.email || 'Email не указан'}</p>
            {user?.user_id && (
              <small className="user-id">ID: {user.user_id}</small>
            )}
          </div>
          <div className="user-status">
            <div className="status-indicator online"></div>
            <span>Online</span>
          </div>
        </div>
      </div>

      {/* Основное содержимое сайдбара */}
      <div className="sidebar-content">
        {/* Кнопка создания нового чата */}
        <button
          className="btn btn-primary full-width new-chat-btn"
          onClick={handleNewChat}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Создание...
            </>
          ) : (
            <>
              <span className="plus-icon">+</span>
              Новый чат
            </>
          )}
        </button>

        {/* Список чатов */}
        <div className="chat-history-section">
          <div className="section-header">
            <h4>Мои чаты</h4>
            <span className="chats-count">({chats.length})</span>
          </div>

          <div className="chat-history">
            {chats.length > 0 ? (
              chats.map(chat => (
                <div
                  key={chat.id}
                  className={`chat-item ${currentChat?.id === chat.id ? 'active' : ''} ${isLoadingChat ? 'loading' : ''}`}
                  onClick={() => handleChatSelect(chat)}
                >
                  <div className="chat-icon">
                    💬
                  </div>
                  <div className="chat-content">
                    <div className="chat-title">
                      {chat.title || `Чат ${chat.id}`}
                      {isLoadingChat && currentChat?.id === chat.id && (
                        <span className="loading-dots">...</span>
                      )}
                    </div>
                    <div className="chat-preview">
                      {getChatPreview(chat)}
                    </div>
                  </div>
                  {currentChat?.id === chat.id && (
                    <div className="active-indicator"></div>
                  )}
                </div>
              ))
            ) : (
              <div className="no-chats">
                <div className="no-chats-icon">💭</div>
                <p>У вас пока нет чатов</p>
                <small>Создайте первый чат, чтобы начать общение</small>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Футер сайдбара */}
      <div className="sidebar-footer">
        <div className="footer-actions">
          <button
            className="btn btn-secondary full-width logout-btn"
            onClick={handleLogout}
          >
            <span className="logout-icon">🚪</span>
            Выйти
          </button>
        </div>
        {user && (
          <div className="user-stats">
            <div className="stat-item">
              <span>Создано чатов:</span>
              <strong>{chats.length}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;