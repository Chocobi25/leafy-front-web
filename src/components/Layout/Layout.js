// 메인 레이아웃 컴포넌트
import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { media } from '../../styles/responsive';
import { useResponsive } from '../../hooks/useResponsive';
import Header from './Header';
import Navigation from './Navigation';

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.background};
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  
  ${props => props.$hasNavigation && media.desktop`
    margin-left: 250px; /* 사이드바 너비 */
  `}
`;

const Content = styled.div`
  flex: 1;
  padding: ${theme.spacing.md};
  
  ${media.desktop`
    padding: ${theme.spacing.lg};
  `}
`;

const MobileNavigation = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${theme.zIndex.header};
  background: ${theme.colors.surface};
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  
  ${media.desktop`
    display: none;
  `}
`;

const DesktopSidebar = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background: ${theme.colors.surface};
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  z-index: ${theme.zIndex.header};
  transform: translateX(-100%);
  transition: transform ${theme.transitions.medium};
  
  ${props => props.$isOpen && `
    transform: translateX(0);
  `}
  
  ${media.desktop`
    position: static;
    transform: translateX(0);
    display: block;
  `}
  
  ${media.mobile`
    display: none;
  `}
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: ${theme.zIndex.modal - 1};
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: opacity ${theme.transitions.medium}, visibility ${theme.transitions.medium};
  
  ${media.desktop`
    display: none;
  `}
`;

const Layout = ({ 
  children, 
  showHeader = true, 
  showNavigation = true, 
  title,
  user
}) => {
  const { isDesktop, isMobile } = useResponsive();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <LayoutWrapper>
      {showHeader && (
        <Header 
          title={title}
          user={user}
          onMenuClick={toggleSidebar}
          showMenuButton={!isDesktop && showNavigation}
        />
      )}
      
      {showNavigation && (
        <>
          {/* 데스크톱 사이드바 */}
          {isDesktop ? (
            <DesktopSidebar>
              <Navigation onItemClick={closeSidebar} />
            </DesktopSidebar>
          ) : (
            /* 모바일 사이드바 + 오버레이 */
            <>
              <Overlay $isOpen={sidebarOpen} onClick={closeSidebar} />
              <DesktopSidebar $isOpen={sidebarOpen}>
                <Navigation onItemClick={closeSidebar} />
              </DesktopSidebar>
            </>
          )}
        </>
      )}

      <Main $hasNavigation={showNavigation && isDesktop}>
        <Content>
          {children}
        </Content>
      </Main>

      {/* 모바일 하단 네비게이션 */}
      {showNavigation && isMobile && (
        <MobileNavigation>
          <Navigation 
            isMobile 
            onItemClick={() => {}} 
          />
        </MobileNavigation>
      )}
    </LayoutWrapper>
  );
};

export default Layout;