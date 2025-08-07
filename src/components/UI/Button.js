// 재사용 가능한 버튼 컴포넌트
import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';
import { a11y } from '../../styles/responsive';

const ButtonBase = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  font-family: inherit;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: all ${theme.transitions.fast};
  position: relative;
  overflow: hidden;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  ${a11y.focusRing()}
  ${a11y.touchTarget}
  
  /* 기본 크기 */
  ${props => props.$size === 'small' && css`
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    ${theme.typography.caption};
    min-height: 36px;
  `}
  
  ${props => (!props.$size || props.$size === 'medium') && css`
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    ${theme.typography.button};
    min-height: 44px;
  `}
  
  ${props => props.$size === 'large' && css`
    padding: ${theme.spacing.lg} ${theme.spacing.xl};
    ${theme.typography.h3};
    min-height: 52px;
  `}
  
  /* 전체 너비 */
  ${props => props.$fullWidth && css`
    width: 100%;
  `}
`;

const PrimaryButton = styled(ButtonBase)`
  background: ${theme.colors.primary};
  color: ${theme.colors.text.onPrimary};
  
  &:hover:not(:disabled) {
    background: ${theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: ${theme.shadows.sm};
  }
`;

const SecondaryButton = styled(ButtonBase)`
  background: transparent;
  color: ${theme.colors.primary};
  border: 2px solid ${theme.colors.primary};
  
  &:hover:not(:disabled) {
    background: ${theme.colors.primary};
    color: ${theme.colors.text.onPrimary};
  }
`;

const OutlineButton = styled(ButtonBase)`
  background: ${theme.colors.surface};
  color: ${theme.colors.text.primary};
  border: 1px solid rgba(0, 0, 0, 0.2);
  
  &:hover:not(:disabled) {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

const TextButton = styled(ButtonBase)`
  background: transparent;
  color: ${theme.colors.primary};
  padding: ${theme.spacing.sm};
  
  &:hover:not(:disabled) {
    background: rgba(76, 175, 80, 0.1);
  }
`;

const KakaoButton = styled(ButtonBase)`
  background: #FEE500;
  color: #000000;
  
  &:hover:not(:disabled) {
    background: #FFEB3B;
  }
`;

// 로딩 스피너
const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

// 메인 버튼 컴포넌트
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled = false,
  icon,
  onClick,
  type = 'button',
  className,
  ...props
}) => {
  const handleClick = (e) => {
    if (loading || disabled) return;
    onClick?.(e);
  };

  const getButtonComponent = () => {
    switch (variant) {
      case 'secondary':
        return SecondaryButton;
      case 'outline':
        return OutlineButton;
      case 'text':
        return TextButton;
      case 'kakao':
        return KakaoButton;
      default:
        return PrimaryButton;
    }
  };

  const ButtonComponent = getButtonComponent();

  return (
    <ButtonComponent
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={handleClick}
      type={type}
      className={className}
      {...props}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children}
        </>
      )}
    </ButtonComponent>
  );
};

export default Button;