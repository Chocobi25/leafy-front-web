// 네비게이션 컴포넌트
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { media } from '../../styles/responsive';
import { a11y } from '../../styles/responsive';

const NavWrapper = styled.nav`
  padding: ${props => props.$isMobile ? theme.spacing.sm : theme.spacing.lg};
  height: 100%;
`;

const NavList = styled.ul`
  display: ${props => props.$isMobile ? 'flex' : 'flex'};
  flex-direction: ${props => props.$isMobile ? 'row' : 'column'};
  gap: ${props => props.$isMobile ? 0 : theme.spacing.sm};
  justify-content: ${props => props.$isMobile ? 'space-around' : 'flex-start'};
`;

const NavItem = styled.li`
  width: ${props => props.$isMobile ? 'auto' : '100%'};
`;

const NavLink = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.$isMobile ? theme.spacing.xs : theme.spacing.sm};
  width: 100%;
  padding: ${props => props.$isMobile ? theme.spacing.sm : theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  background: ${props => props.$isActive ? theme.colors.primary : 'transparent'};
  color: ${props => props.$isActive ? theme.colors.text.onPrimary : theme.colors.text.primary};
  transition: all ${theme.transitions.fast};
  text-align: left;
  ${theme.typography.body};
  font-weight: ${props => props.$isActive ? '600' : '400'};
  
  ${props => props.$isMobile && `
    flex-direction: column;
    justify-content: center;
    text-align: center;
    ${theme.typography.caption};
    min-height: 60px;
  `}
  
  &:hover {
    background: ${props => props.$isActive ? theme.colors.primaryDark : 'rgba(0, 0, 0, 0.05)'};
    transform: ${props => props.$isMobile ? 'none' : 'translateX(4px)'};
  }
  
  &:focus {
    ${a11y.focusRing(theme.colors.primary)}
  }
  
  ${media.desktop`
    padding: ${theme.spacing.md} ${theme.spacing.lg};
  `}
`;

const NavIcon = styled.span`
  font-size: ${props => props.$isMobile ? '1.5rem' : '1.25rem'};
  line-height: 1;
`;

const NavText = styled.span`
  ${props => props.$isMobile && media.mobile`
    font-size: 0.75rem;
    margin-top: 2px;
  `}
`;

// 네비게이션 아이템 데이터
const navigationItems = [
  {
    id: 'main',
    path: '/main',
    label: '홈',
    icon: '🏠',
    description: '메인 대시보드'
  },
  {
    id: 'carbon-savings',
    path: '/carbon-savings',
    label: '탄소 절감',
    icon: '📊',
    description: '탄소 절감량 확인'
  },
  {
    id: 'mypage',
    path: '/mypage',
    label: '마이페이지',
    icon: '👤',
    description: '프로필 및 설정'
  }
];

const Navigation = ({ isMobile = false, onItemClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (path, label) => {
    navigate(path);
    onItemClick?.(path);
    
    // 접근성을 위한 화면 리더 알림
    const announcement = `${label} 페이지로 이동했습니다`;
    const ariaLiveElement = document.createElement('div');
    ariaLiveElement.setAttribute('aria-live', 'polite');
    ariaLiveElement.setAttribute('aria-atomic', 'true');
    ariaLiveElement.className = 'visually-hidden';
    ariaLiveElement.textContent = announcement;
    document.body.appendChild(ariaLiveElement);
    
    setTimeout(() => {
      document.body.removeChild(ariaLiveElement);
    }, 1000);
  };

  return (
    <NavWrapper $isMobile={isMobile}>
      <NavList $isMobile={isMobile} role="menubar">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <NavItem key={item.id} role="none">
              <NavLink
                role="menuitem"
                $isMobile={isMobile}
                $isActive={isActive}
                onClick={() => handleNavClick(item.path, item.label)}
                aria-label={`${item.label} - ${item.description}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <NavIcon $isMobile={isMobile} aria-hidden="true">
                  {item.icon}
                </NavIcon>
                <NavText $isMobile={isMobile}>
                  {item.label}
                </NavText>
              </NavLink>
            </NavItem>
          );
        })}
      </NavList>
      
      {/* 데스크톱에서만 로그아웃 버튼 표시 */}
      {!isMobile && (
        <NavItem style={{ marginTop: 'auto', paddingTop: theme.spacing.xl }}>
          <NavLink
            role="button"
            onClick={() => handleNavClick('/login', '로그아웃')}
            aria-label="로그아웃"
            style={{ 
              color: theme.colors.error,
              justifyContent: 'center'
            }}
          >
            <NavIcon>🚪</NavIcon>
            <NavText>로그아웃</NavText>
          </NavLink>
        </NavItem>
      )}
    </NavWrapper>
  );
};

export default Navigation;