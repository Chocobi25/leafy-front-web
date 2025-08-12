import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      logout();
    }
  };

  const handleMyPage = () => {
    navigate('/mypage');
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="header-content">
          <h1 className="home-title">🌱 Leafy</h1>
          <p className="home-subtitle">저탄소 여행의 시작</p>
        </div>
        
        {/* 로그인 상태에 따른 사용자 정보 표시 */}
        {isAuthenticated() && (
          <div className="user-info">
            <div className="user-profile" onClick={handleMyPage}>
              <div className="user-avatar">
                {user?.nickname?.charAt(0) || '🌱'}
              </div>
              <div className="user-details">
                <span className="user-name">{user?.nickname || '사용자'}</span>
                <span className="user-level">{user?.level ? user.level.replace('LV', 'Lv.') : 'Lv.1'}</span>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="home-content">
        <div className="hero-section">
          <h2>친환경 여행을 계획하세요</h2>
          <p>탄소 배출량을 줄이며 즐기는 똑똑한 여행</p>
        </div>

        <div className="action-buttons">
          {isAuthenticated() ? (
            <>
              <button 
                className="btn btn-secondary" 
                onClick={handleMyPage}
              >
                마이페이지
              </button>
              <button 
                className="btn btn-danger" 
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          ) : (
            <button 
              className="btn btn-primary" 
              onClick={handleLogin}
            >
              로그인
            </button>
          )}
        </div>

        <div className="features">
          <div className="feature-card">
            <h3>🚗 탄소 배출량 추적</h3>
            <p>여행 중 탄소 배출량을 실시간으로 확인하세요</p>
          </div>
          <div className="feature-card">
            <h3>🌍 친환경 경로 추천</h3>
            <p>최소 탄소 배출 경로로 여행을 계획하세요</p>
          </div>
          <div className="feature-card">
            <h3>📊 환경 기여도 확인</h3>
            <p>내가 절약한 탄소량으로 심은 나무의 효과를 확인하세요</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;