import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'login';

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Добро пожаловать</h1>
          <p>Войдите или создайте аккаунт</p>
        </div>

        <div className="auth-tabs">
          <a
            href="/auth?tab=login"
            className={`auth-tab ${currentTab === 'login' ? 'active' : ''}`}
          >
            Вход
          </a>
          <a
            href="/auth?tab=signup"
            className={`auth-tab ${currentTab === 'signup' ? 'active' : ''}`}
          >
            Регистрация
          </a>
        </div>

        <div className="auth-content">
          {currentTab === 'login' ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;