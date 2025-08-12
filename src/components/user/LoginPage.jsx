import React from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    // 백엔드의 카카오 OAuth 엔드포인트로 리다이렉트
    window.location.href = apiClient.getKakaoLoginUrl();
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <header className="login-header">
          <h1>🌱 Leafy</h1>
          <p>로그인하여 친환경 여행을 시작하세요</p>
        </header>

        <main className="login-content">
          <div className="login-form">
            <button 
              className="kakao-login-btn" 
              onClick={handleKakaoLogin}
            >
              <span className="kakao-icon">💬</span>
              카카오 로그인
            </button>
            
            <button 
              className="back-btn" 
              onClick={handleBack}
            >
              돌아가기
            </button>
          </div>

          <div className="login-info">
            <p>카카오 계정으로 간편하게 로그인하고</p>
            <p>나만의 친환경 여행을 계획해보세요!</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LoginPage;