import React from 'react';

const Sidebar = ({ user, onLogout }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="user-info">
          <h3>{user?.name || 'Пользователь'}</h3>
          <p>{user?.email || 'user@example.com'}</p>
        </div>
      </div>

      <div className="sidebar-content">
        <button className="btn btn-primary full-width new-chat-btn">
          + Новый чат
        </button>

        <div className="chat-history">
          <div className="chat-item active">
            <div className="chat-title">Текущий чат</div>
            <div className="chat-preview">Начните общение...</div>
          </div>
        </div>
      </div>

      <div className="sidebar-footer">
        <button
          className="btn btn-secondary full-width"
          onClick={onLogout}
        >
          Выйти
        </button>
      </div>
    </div>
  );
};

export default Sidebar;