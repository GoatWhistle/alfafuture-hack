import React, { useState } from 'react';

const Sidebar = ({ user, onLogout }) => {
  const [chats, setChats] = useState([
    { id: 1, title: 'Текущий чат', preview: 'Начните общение...', active: true },
    { id: 2, title: 'Вопросы по коду', preview: 'Как улучшить производительность...', active: false },
    { id: 3, title: 'Идеи для проекта', preview: 'Мозговой штурм по новому...', active: false }
  ]);

  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: `Новый чат ${chats.length}`,
      preview: 'Новый диалог...',
      active: true
    };

    setChats(prevChats =>
      prevChats.map(chat => ({ ...chat, active: false }))
        .concat(newChat)
    );
  };

  const handleChatSelect = (chatId) => {
    setChats(prevChats =>
      prevChats.map(chat => ({
        ...chat,
        active: chat.id === chatId
      }))
    );
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="user-info">
          <h3>{user?.name || 'Пользователь'}</h3>
          <p>{user?.email || 'user@example.com'}</p>
        </div>
        <div className="user-status">
          <span className="status-dot"></span>
          Online
        </div>
      </div>

      <div className="sidebar-content">
        <button
          className="btn btn-primary full-width new-chat-btn"
          onClick={handleNewChat}
        >
          <span>+</span>
          Новый чат
        </button>

        <div className="chat-history">
          <h4>История чатов</h4>
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${chat.active ? 'active' : ''}`}
              onClick={() => handleChatSelect(chat.id)}
            >
              <div className="chat-icon">💬</div>
              <div className="chat-info">
                <div className="chat-title">{chat.title}</div>
                <div className="chat-preview">{chat.preview}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-footer">
        <button
          className="btn btn-secondary full-width"
          onClick={onLogout}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
          </svg>
          Выйти
        </button>
      </div>
    </div>
  );
};

export default Sidebar;