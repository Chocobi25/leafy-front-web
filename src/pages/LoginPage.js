// 로그인 페이지 - React Native 버전을 웹으로 이식
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { theme } from '../styles/theme';
import { media } from '../styles/responsive';
import { Container, Flex } from '../components/Layout/Container';
import Button from '../components/UI/Button';

// 애니메이션 키프레임
const scaleIn = keyframes`
  from {
    transform: scale(1.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 스타일드 컴포넌트들
const LoginWrapper = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.md};
`;

const LoginContainer = styled(Container)`
  max-width: 400px;
  text-align: center;
`;

const LogoContainer = styled.div`
  margin-bottom: ${theme.spacing.xxl};
  animation: ${scaleIn} 1s ease-out;
`;

const Logo = styled.div`
  width: clamp(120px, 20vw, 200px);
  height: clamp(120px, 20vw, 200px);
  margin: 0 auto ${theme.spacing.md};
  background: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(2rem, 8vw, 4rem);
  box-shadow: ${theme.shadows.lg};
  
  ${media.mobile`
    margin-bottom: ${theme.spacing.lg};
  `}
`;

const Title = styled.h1`
  ${theme.typography.h1};
  color: ${theme.colors.primary};
  margin: 0 0 ${theme.spacing.sm} 0;
  font-weight: 700;
`;

const Subtitle = styled.p`
  ${theme.typography.body};
  color: ${theme.colors.text.secondary};
  margin: 0;
`;

const LoginButtonContainer = styled.div`
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateY(${props => props.$visible ? 0 : '20px'});
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  animation: ${props => props.$visible ? fadeIn : 'none'} 0.5s ease-out;
`;

const KakaoButtonStyled = styled(Button)`
  margin-top: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  img {
    width: 20px;
    height: 20px;
  }
  
  ${media.mobile`
    margin-top: ${theme.spacing.xl};
  `}
`;

const ErrorMessage = styled.div`
  background: ${theme.colors.error};
  color: white;
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  margin-top: ${theme.spacing.md};
  ${theme.typography.body};
  text-align: left;
`;

const LoginPage = () => {
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 이미 로그인된 경우 메인 페이지로 이동
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/main';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // 로고 애니메이션 후 로그인 버튼 표시
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoginButton(true);
    }, 1000); // 1초 후 로그인 버튼 표시

    return () => clearTimeout(timer);
  }, []);

  // 에러 자동 클리어
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  // 카카오 로그인 처리
  const handleKakaoLogin = () => {
    setIsLoading(true);
    clearError();

    // 카카오 로그인 팝업 열기
    const kakaoLoginUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/oauth2/authorization/kakao`;
    
    const popup = window.open(
      kakaoLoginUrl,
      'kakaoLogin',
      'width=500,height=600,scrollbars=yes,resizable=yes'
    );

    // 팝업 메시지 리스너
    const handleMessage = async (event) => {
      // 보안상 origin 체크
      const allowedOrigins = [
        'http://localhost:8080',
        process.env.REACT_APP_API_URL
      ].filter(Boolean);
      
      if (!allowedOrigins.includes(event.origin)) {
        console.warn('Unauthorized origin:', event.origin);
        return;
      }

      try {
        const data = event.data;
        
        if (data.success && data.token && data.userId) {
          popup?.close();
          
          const result = await login(data.token, data.userId);
          
          if (result.success) {
            // 로그인 성공 시 원래 페이지 또는 메인 페이지로 이동
            const from = location.state?.from?.pathname || '/main';
            navigate(from, { replace: true });
          }
        } else if (data.error) {
          console.error('Kakao login error:', data.error);
          popup?.close();
        }
      } catch (error) {
        console.error('Login message handling error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // 팝업 닫힘 감지
    const checkClosed = setInterval(() => {
      if (popup?.closed) {
        clearInterval(checkClosed);
        setIsLoading(false);
        window.removeEventListener('message', handleMessage);
      }
    }, 1000);

    // 메시지 리스너 등록
    window.addEventListener('message', handleMessage);

    // 클린업을 위한 타이머
    setTimeout(() => {
      if (!popup?.closed) {
        popup?.close();
        setIsLoading(false);
        clearInterval(checkClosed);
        window.removeEventListener('message', handleMessage);
      }
    }, 30000); // 30초 후 자동 닫기
  };

  return (
    <LoginWrapper>
      <LoginContainer>
        <LogoContainer>
          <Logo>🌱</Logo>
          <Title>Leafy</Title>
          <Subtitle>저탄소 배출 여행 서비스</Subtitle>
        </LogoContainer>

        <LoginButtonContainer $visible={showLoginButton}>
          <KakaoButtonStyled
            variant="kakao"
            size="large"
            fullWidth
            loading={isLoading}
            onClick={handleKakaoLogin}
            disabled={isLoading}
          >
            {!isLoading && '💬'}
            카카오로 시작하기
          </KakaoButtonStyled>

          {error && (
            <ErrorMessage>
              ❌ {error}
            </ErrorMessage>
          )}
        </LoginButtonContainer>
      </LoginContainer>
    </LoginWrapper>
  );
};

export default LoginPage;