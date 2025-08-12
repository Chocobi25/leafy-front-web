import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './MyPage.css';

const MyPage = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated()) {
      alert('로그인이 필요한 페이지입니다.');
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate]);

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      logout();
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="mypage">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return null; // useEffect에서 리다이렉트 처리
  }

  return (
    <div className="mypage">
      <div className="mypage-container">
        <header className="mypage-header">
          <div className="header-content">
            <h1>마이페이지</h1>
            <p>내 정보와 탄소 절약 현황을 확인하세요</p>
          </div>
          <div className="header-actions">
            <button className="back-btn" onClick={handleBack}>
              홈으로
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        </header>

        <main className="mypage-content">
          <div className="profile-section">
            <h2>프로필 정보</h2>
            <div className="profile-info">
              <p><strong>닉네임:</strong> {user?.nickname || '설정되지 않음'}</p>
              <p><strong>가입일:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : '정보 없음'}</p>
            </div>
          </div>

          <div className="carbon-section">
            <h2>탄소 절약 현황</h2>
            <div className="carbon-stats">
              <div className="stat-card">
                <h3>총 절약량</h3>
                <p className="stat-value">{user?.totalCarbonSaved || 0} kg</p>
              </div>
              <div className="stat-card">
                <h3>현재 레벨</h3>
                <p className="stat-value">{user?.level ? user.level.replace('LV', 'Lv.') : 'Lv.1'}</p>
              </div>
              <div className="stat-card">
                <h3>나무 심은 효과</h3>
                <p className="stat-value">{user?.treeEffect || 0} 그루</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyPage;