// 마이페이지 (임시)
import React from 'react';
import Layout from '../components/Layout/Layout';
import { Container, Card } from '../components/Layout/Container';
import { useAuth } from '../contexts/AuthContext';
import { theme } from '../styles/theme';

const MyPage = () => {
  const { user } = useAuth();

  return (
    <Layout 
      title="마이페이지"
      user={user}
      showHeader={true}
      showNavigation={true}
    >
      <Container>
        <Card style={{ textAlign: 'center', padding: theme.spacing.xl }}>
          <h1 style={{ 
            margin: `0 0 ${theme.spacing.lg} 0`, 
            color: theme.colors.primary 
          }}>
            👤 마이페이지
          </h1>
          <p style={{ 
            margin: 0, 
            color: theme.colors.text.secondary,
            fontSize: '1.1rem'
          }}>
            이 페이지는 개발 중입니다.
            <br />프로필 관리, 레벨 시스템, 설정 등이 여기에 표시될 예정입니다.
          </p>
        </Card>
      </Container>
    </Layout>
  );
};

export default MyPage;