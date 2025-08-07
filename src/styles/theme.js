// 테마 시스템: 색상, 폰트, 간격 등 디자인 토큰 정의
export const theme = {
  // 브랜드 색상
  colors: {
    primary: '#4CAF50',
    primaryLight: '#81C784', 
    primaryDark: '#388E3C',
    secondary: '#FFC107',
    background: '#F3F7F0',
    surface: '#FFFFFF',
    text: {
      primary: '#333333',
      secondary: '#666666',
      disabled: '#999999',
      onPrimary: '#FFFFFF'
    },
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',
    info: '#2196F3'
  },

  // 타이포그래피 (clamp 사용으로 반응형)
  typography: {
    h1: {
      fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
      fontWeight: 'bold',
      lineHeight: '1.2'
    },
    h2: {
      fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
      fontWeight: 'bold', 
      lineHeight: '1.3'
    },
    h3: {
      fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
      fontWeight: '600',
      lineHeight: '1.4'
    },
    body: {
      fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
      fontWeight: '400',
      lineHeight: '1.5'
    },
    button: {
      fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
      fontWeight: '600',
      lineHeight: '1'
    },
    caption: {
      fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
      fontWeight: '400',
      lineHeight: '1.4'
    }
  },

  // 간격 시스템 (clamp로 반응형)
  spacing: {
    xs: 'clamp(0.25rem, 1vw, 0.5rem)',    // 4-8px
    sm: 'clamp(0.5rem, 2vw, 1rem)',       // 8-16px  
    md: 'clamp(1rem, 3vw, 1.5rem)',       // 16-24px
    lg: 'clamp(1.5rem, 4vw, 2rem)',       // 24-32px
    xl: 'clamp(2rem, 5vw, 3rem)',         // 32-48px
    xxl: 'clamp(3rem, 6vw, 4rem)'         // 48-64px
  },

  // 둥근 모서리
  borderRadius: {
    sm: '4px',
    md: '8px', 
    lg: '12px',
    xl: '16px',
    full: '50%'
  },

  // 그림자
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 2px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 4px 12px rgba(0, 0, 0, 0.15)',
    xl: '0 8px 24px rgba(0, 0, 0, 0.2)'
  },

  // 애니메이션
  transitions: {
    fast: '150ms ease-out',
    medium: '300ms ease-out', 
    slow: '500ms ease-out'
  },

  // Z-index 레이어
  zIndex: {
    base: 0,
    content: 1,
    header: 10,
    modal: 100,
    toast: 1000
  },

  // 레이아웃 제약사항
  layout: {
    maxWidth: 'min(90%, 1200px)',
    containerPadding: 'clamp(1rem, 4vw, 2rem)',
    cardMaxWidth: 'min(100%, 600px)'
  }
};

// 레벨별 색상 시스템
export const levelColors = {
  LV1: '#8BC34A', // 연두색 (씨앗)
  LV2: '#4CAF50', // 초록색 (새싹) 
  LV3: '#2E7D32', // 진한 초록 (잎새)
  LV4: '#1B5E20', // 더 진한 초록 (나무)
  LV5: '#0D47A1'  // 파란 초록 (숲)
};