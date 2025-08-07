// 헤더 컴포넌트
import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { media } from '../../styles/responsive';
import { Flex } from './Container';

const HeaderWrapper = styled.header`
  background: ${theme.colors.surface};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  position: sticky;
  top: 0;
  z-index: ${theme.zIndex.header};
  backdrop-filter: blur(10px);
  
  ${media.mobile`
    padding: ${theme.spacing.sm} ${theme.spacing.md};
  `}
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  img {
    width: clamp(32px, 5vw, 40px);
    height: clamp(32px, 5vw, 40px);
    border-radius: ${theme.borderRadius.sm};
  }
`;

const Title = styled.h1`
  ${theme.typography.h2};
  color: ${theme.colors.primary};
  font-weight: 700;
  
  ${media.mobile`
    ${theme.typography.h3};
  `}
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.md};
  background: transparent;
  color: ${theme.colors.text.primary};
  transition: background-color ${theme.transitions.fast};
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  
  &:focus {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
  
  ${media.desktop`
    display: none;
  `}
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  ${media.mobile`
    .user-name {
      display: none;
    }
  `}
`;

const UserAvatar = styled.div`
  width: clamp(32px, 4vw, 40px);
  height: clamp(32px, 4vw, 40px);
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.onPrimary};
  font-weight: 600;
  ${theme.typography.caption};
`;

const UserName = styled.span`
  ${theme.typography.body};
  color: ${theme.colors.text.primary};
  font-weight: 500;
`;

// 햄버거 메뉴 아이콘
const HamburgerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const Header = ({ 
  title = "Leafy", 
  user,
  onMenuClick,
  showMenuButton = false 
}) => {
  // 사용자 이름의 첫 글자를 아바타로 사용
  const getInitials = (name) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  return (
    <HeaderWrapper>
      <Flex $between>
        <Flex $align="center">
          {showMenuButton && (
            <MenuButton onClick={onMenuClick} aria-label="메뉴 열기">
              <HamburgerIcon />
            </MenuButton>
          )}
          
          <Logo>
            {/* 로고 이미지가 있다면 추가 */}
            <Title>{title}</Title>
          </Logo>
        </Flex>

        {user && (
          <UserInfo>
            <UserName className="user-name">
              {user.nickname}님
            </UserName>
            <UserAvatar>
              {getInitials(user.nickname)}
            </UserAvatar>
          </UserInfo>
        )}
      </Flex>
    </HeaderWrapper>
  );
};

export default Header;