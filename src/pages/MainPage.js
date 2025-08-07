// 메인 대시보드 페이지
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { theme } from '../styles/theme';
import { media, grid } from '../styles/responsive';
import Layout from '../components/Layout/Layout';
import { Container, Card, Flex } from '../components/Layout/Container';
import Button from '../components/UI/Button';

// 스타일드 컴포넌트들
const WelcomeSection = styled.section`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
  
  ${media.mobile`
    margin-bottom: ${theme.spacing.xl};
  `}
`;

const WelcomeTitle = styled.h1`
  ${theme.typography.h1};
  color: ${theme.colors.text.primary};
  margin: 0 0 ${theme.spacing.sm} 0;
  
  .highlight {
    color: ${theme.colors.primary};
    font-weight: 700;
  }
`;

const WelcomeSubtitle = styled.p`
  ${theme.typography.h3};
  color: ${theme.colors.text.secondary};
  margin: 0;
`;

const DashboardGrid = styled.div`
  ${grid.autoFit('300px')}
  margin-bottom: ${theme.spacing.xl};
`;

const DashboardCard = styled(Card)`
  text-align: center;
  transition: all ${theme.transitions.medium};
  cursor: pointer;
  border: 2px solid transparent;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
    border-color: ${theme.colors.primary};
  }
  
  &:active {
    transform: translateY(-2px);
  }
`;

const CardIcon = styled.div`
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin-bottom: ${theme.spacing.md};
  line-height: 1;
`;

const CardTitle = styled.h3`
  ${theme.typography.h3};
  color: ${theme.colors.text.primary};
  margin: 0 0 ${theme.spacing.sm} 0;
`;

const CardDescription = styled.p`
  ${theme.typography.body};
  color: ${theme.colors.text.secondary};
  margin: 0 0 ${theme.spacing.md} 0;
`;

const CardButton = styled(Button)`
  margin-top: auto;
`;

const QuickStatsSection = styled.section`
  margin-bottom: ${theme.spacing.xl};
`;

const StatsTitle = styled.h2`
  ${theme.typography.h2};
  color: ${theme.colors.text.primary};
  text-align: center;
  margin: 0 0 ${theme.spacing.lg} 0;
`;

const StatsGrid = styled.div`
  ${grid.columns(1, 2, 3)}
  
  ${media.mobile`
    gap: ${theme.spacing.md};
  `}
`;

const StatCard = styled(Card)`
  text-align: center;
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark});
  color: ${theme.colors.text.onPrimary};
`;

const StatValue = styled.div`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  ${theme.typography.body};
  opacity: 0.9;
`;

const MainPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // 대시보드 카드 데이터
  const dashboardItems = [
    {
      id: 'carbon-savings',
      icon: '📊',
      title: '탄소 절감량 확인',
      description: '나의 탄소 절감 현황과 환경 기여도를 확인해보세요',
      path: '/carbon-savings'
    },
    {
      id: 'mypage', 
      icon: '👤',
      title: '마이페이지',
      description: '프로필 관리, 레벨 시스템, 설정을 관리하세요',
      path: '/mypage'
    }
  ];

  // 간단한 통계 데이터 (실제로는 API에서 가져옴)
  const quickStats = [
    {
      id: 'total-carbon',
      value: user?.totalCarbonSaved ? `${user.totalCarbonSaved}kg` : '0kg',
      label: '총 탄소 절감량'
    },
    {
      id: 'current-level',
      value: user?.level || 'LV1',
      label: '현재 레벨'
    },
    {
      id: 'tree-effect',
      value: user?.totalCarbonSaved ? `${Math.ceil(user.totalCarbonSaved / 30)}그루` : '0그루',
      label: '나무 심기 효과'
    }
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <Layout 
      title="메인"
      user={user}
      showHeader={true}
      showNavigation={true}
    >
      <Container>
        {/* 환영 메시지 */}
        <WelcomeSection>
          <WelcomeTitle>
            <span className="highlight">{user?.nickname || '사용자'}</span>님, 
            <br />환영합니다! 🌱
          </WelcomeTitle>
          <WelcomeSubtitle>
            오늘도 지구를 위한 여행을 시작해보세요
          </WelcomeSubtitle>
        </WelcomeSection>

        {/* 빠른 통계 */}
        <QuickStatsSection>
          <StatsTitle>나의 현황</StatsTitle>
          <StatsGrid>
            {quickStats.map((stat) => (
              <StatCard key={stat.id}>
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsGrid>
        </QuickStatsSection>

        {/* 메인 기능 카드들 */}
        <DashboardGrid>
          {dashboardItems.map((item) => (
            <DashboardCard
              key={item.id}
              onClick={() => handleCardClick(item.path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(item.path);
                }
              }}
            >
              <CardIcon>{item.icon}</CardIcon>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
              <CardButton variant="outline" size="small">
                이동하기 →
              </CardButton>
            </DashboardCard>
          ))}
        </DashboardGrid>

        {/* 추가 안내 메시지 */}
        <Card style={{ textAlign: 'center', marginTop: theme.spacing.xl }}>
          <h3 style={{ 
            margin: `0 0 ${theme.spacing.md} 0`, 
            color: theme.colors.primary 
          }}>
            🌍 환경을 생각하는 여행
          </h3>
          <p style={{ 
            margin: 0, 
            color: theme.colors.text.secondary,
            lineHeight: '1.6'
          }}>
            Leafy와 함께 탄소 발자국을 줄이며 의미 있는 여행을 만들어보세요. 
            <br />작은 실천이 큰 변화를 만듭니다.
          </p>
        </Card>
      </Container>
    </Layout>
  );
};

export default MainPage;