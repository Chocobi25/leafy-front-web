// 반응형 화면 크기를 감지하는 커스텀 훅
import { useState, useEffect } from 'react';
import { breakpoints } from '../styles/responsive';

export const useResponsive = () => {
  const [screenInfo, setScreenInfo] = useState(() => {
    // SSR 지원을 위한 초기값
    if (typeof window === 'undefined') {
      return {
        width: 1024,
        height: 768,
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isWide: false,
        orientation: 'landscape'
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    return {
      width,
      height,
      isMobile: width < parseInt(breakpoints.tablet),
      isTablet: width >= parseInt(breakpoints.tablet) && width < parseInt(breakpoints.desktop),
      isDesktop: width >= parseInt(breakpoints.desktop) && width < parseInt(breakpoints.wide),
      isWide: width >= parseInt(breakpoints.wide),
      orientation: width > height ? 'landscape' : 'portrait'
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenInfo({
        width,
        height,
        isMobile: width < parseInt(breakpoints.tablet),
        isTablet: width >= parseInt(breakpoints.tablet) && width < parseInt(breakpoints.desktop),
        isDesktop: width >= parseInt(breakpoints.desktop) && width < parseInt(breakpoints.wide),
        isWide: width >= parseInt(breakpoints.wide),
        orientation: width > height ? 'landscape' : 'portrait'
      });
    };

    // 디바운스를 위한 타이머
    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', debouncedResize);
    window.addEventListener('orientationchange', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('orientationchange', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // 편의 메서드들
  const isSmallScreen = screenInfo.isMobile;
  const isMediumScreen = screenInfo.isTablet;
  const isLargeScreen = screenInfo.isDesktop || screenInfo.isWide;
  const isTouchDevice = screenInfo.isMobile || screenInfo.isTablet;

  return {
    ...screenInfo,
    isSmallScreen,
    isMediumScreen, 
    isLargeScreen,
    isTouchDevice,
    // 특정 브레이크포인트 이상/이하 체크
    isAbove: (breakpoint) => screenInfo.width >= parseInt(breakpoints[breakpoint]),
    isBelow: (breakpoint) => screenInfo.width < parseInt(breakpoints[breakpoint])
  };
};

// 특정 미디어 쿼리 조건을 체크하는 훅
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    const handleChange = (event) => setMatches(event.matches);

    // 최신 브라우저는 addEventListener 사용
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    
    // 구형 브라우저 지원
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [query]);

  return matches;
};

// 컨테이너 쿼리를 체크하는 훅 (실험적)
export const useContainerQuery = (containerRef, query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    // ResizeObserver로 컨테이너 크기 감지
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        
        // 간단한 쿼리 파싱 (예: 'min-width: 400px')
        const match = query.match(/(min-width|max-width|min-height|max-height):\s*(\d+)px/);
        if (!match) return;
        
        const [, property, value] = match;
        const numValue = parseInt(value);
        
        let result = false;
        switch (property) {
          case 'min-width':
            result = width >= numValue;
            break;
          case 'max-width':
            result = width <= numValue;
            break;
          case 'min-height':
            result = height >= numValue;
            break;
          case 'max-height':
            result = height <= numValue;
            break;
        }
        
        setMatches(result);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [containerRef, query]);

  return matches;
};