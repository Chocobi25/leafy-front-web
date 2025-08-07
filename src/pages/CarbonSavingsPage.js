// 탄소 절감량 확인 페이지 (임시)
import React from 'react';
import Layout from '../components/Layout/Layout';
import { Container, Card } from '../components/Layout/Container';
import { useAuth } from '../contexts/AuthContext';
import { theme } from '../styles/theme';

const CarbonSavingsPage = () => {
  const { user } = useAuth();

  return (
    <Layout 
      title="탄소 절감량"
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
            📊 탄소 절감량 확인
          </h1>
          <p style={{ 
            margin: 0, 
            color: theme.colors.text.secondary,
            fontSize: '1.1rem'
          }}>
            이 페이지는 개발 중입니다.
            <br />탄소 절감량 차트와 통계가 여기에 표시될 예정입니다.
          </p>
        </Card>
      </Container>
    </Layout>
  );
};

export default CarbonSavingsPage;