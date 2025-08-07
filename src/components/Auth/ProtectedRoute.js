// 보호된 라우트 컴포넌트
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { theme } from '../../styles/theme';
import { Container, Card, Flex } from '../Layout/Container';

// 로딩 스피너 컴포넌트
const LoadingWrapper = styled(Flex)`
  min-height: 100vh;
  background-color: ${theme.colors.background};
`;

const LoadingCard = styled(Card)`
  text-align: center;
  padding: ${theme.spacing.xl};
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${theme.colors.background};
  border-top: 3px solid ${theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto ${theme.spacing.md} auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  ${theme.typography.body};
  color: ${theme.colors.text.secondary};
  margin: 0;
`;

const LoadingComponent = () => (
  <LoadingWrapper $center>
    <Container>
      <LoadingCard>
        <Spinner />
        <LoadingText>인증 정보를 확인하고 있습니다...</LoadingText>
      </LoadingCard>
    </Container>
  </LoadingWrapper>
);

// 보호된 라우트 컴포넌트
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // 로딩 중인 경우
  if (loading) {
    return <LoadingComponent />;
  }

  // 인증되지 않은 경우 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    // 현재 위치를 state로 전달하여 로그인 후 돌아올 수 있게 함
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // 인증된 경우 자식 컴포넌트 렌더링
  return children;
};

export default ProtectedRoute;