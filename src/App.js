import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { AuthProvider } from './contexts/AuthContext';

// 페이지 컴포넌트들 (나중에 구현)
import LoginPage from './pages/LoginPage';
import KakaoCallback from './pages/KakaoCallback';
import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage';
import CarbonSavingsPage from './pages/CarbonSavingsPage';

// 라우트 보호 컴포넌트
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Router>
          <Routes>
            {/* 로그인 페이지 */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* 카카오 OAuth 콜백 */}
            <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
            
            {/* 보호된 라우트들 */}
            <Route path="/main" element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            } />
            
            <Route path="/carbon-savings" element={
              <ProtectedRoute>
                <CarbonSavingsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/mypage" element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            } />
            
            {/* 기본 리다이렉트 */}
            <Route path="/" element={<Navigate to="/main" replace />} />
            
            {/* 404 처리 */}
            <Route path="*" element={<Navigate to="/main" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
