// 전역 스타일 정의
import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  /* CSS Reset & Base Styles */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.background};
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* 반응형 이미지 */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
    height: auto;
  }

  /* 폼 요소 스타일 초기화 */
  input, button, textarea, select {
    font: inherit;
    color: inherit;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
  }

  /* 링크 스타일 */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* 리스트 스타일 제거 */
  ul, ol {
    list-style: none;
  }

  /* 접근성: 포커스 표시 */
  :focus {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  :focus:not(:focus-visible) {
    outline: none;
  }

  /* 스크롤바 커스텀 (Webkit 기반 브라우저) */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.primaryDark};
  }

  /* 텍스트 선택 색상 */
  ::selection {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.text.onPrimary};
  }

  /* 애니메이션 줄이기 설정 존중 */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* 고대비 모드 지원 */
  @media (prefers-contrast: high) {
    body {
      filter: contrast(2);
    }
  }

  /* 다크 모드 기본 설정 (나중에 확장 가능) */
  @media (prefers-color-scheme: dark) {
    /* 추후 다크 테마 구현 시 사용 */
  }

  /* 유틸리티 클래스들 */
  .visually-hidden {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }

  .no-scroll {
    overflow: hidden;
  }

  /* 컨테이너 쿼리 지원 설정 */
  .container-query {
    container-type: inline-size;
  }

  /* 애니메이션 키프레임 */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* 애니메이션 유틸리티 클래스 */
  .animate-fadeIn {
    animation: fadeIn ${theme.transitions.medium};
  }

  .animate-slideIn {
    animation: slideIn ${theme.transitions.medium};
  }

  .animate-scaleIn {
    animation: scaleIn ${theme.transitions.medium};
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .animate-spin {
    animation: spin 1s linear infinite;
  }
`;