// 반응형 디자인 유틸리티
import { css } from 'styled-components';

// 브레이크포인트 정의 (모바일 퍼스트)
export const breakpoints = {
  mobile: '320px',
  tablet: '768px', 
  desktop: '1024px',
  wide: '1440px'
};

// 미디어 쿼리 헬퍼 (styled-components용)
export const media = {
  mobile: (...args) => css`
    @media (max-width: ${breakpoints.tablet}) {
      ${css(...args)}
    }
  `,
  tablet: (...args) => css`
    @media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop}) {
      ${css(...args)}
    }
  `,
  desktop: (...args) => css`
    @media (min-width: ${breakpoints.desktop}) {
      ${css(...args)}
    }
  `,
  wide: (...args) => css`
    @media (min-width: ${breakpoints.wide}) {
      ${css(...args)}
    }
  `,
  
  // 특정 크기 이상/이하
  above: (breakpoint) => (...args) => css`
    @media (min-width: ${breakpoint}) {
      ${css(...args)}
    }
  `,
  below: (breakpoint) => (...args) => css`
    @media (max-width: ${breakpoint}) {
      ${css(...args)}
    }
  `
};

// 컨테이너 쿼리 헬퍼 (최신 브라우저 지원)
export const container = {
  above: (size) => (...args) => css`
    @container (min-width: ${size}) {
      ${css(...args)}
    }
  `,
  below: (size) => (...args) => css`
    @container (max-width: ${size}) {
      ${css(...args)}
    }
  `
};

// 그리드 시스템 유틸리티
export const grid = {
  // 자동 반응형 그리드 (카드 레이아웃에 적합)
  autoFit: (minSize = '280px') => css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(${minSize}, 1fr));
    gap: clamp(1rem, 3vw, 2rem);
  `,
  
  // 자동 채우기 그리드
  autoFill: (minSize = '200px') => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(${minSize}, 1fr));
    gap: clamp(0.5rem, 2vw, 1rem);
  `,
  
  // 반응형 컬럼 수
  columns: (mobile = 1, tablet = 2, desktop = 3) => css`
    display: grid;
    gap: clamp(1rem, 3vw, 2rem);
    grid-template-columns: repeat(${mobile}, 1fr);
    
    ${media.tablet`
      grid-template-columns: repeat(${tablet}, 1fr);
    `}
    
    ${media.desktop`
      grid-template-columns: repeat(${desktop}, 1fr);
    `}
  `
};

// 플렉스박스 유틸리티
export const flex = {
  // 중앙 정렬
  center: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  
  // 공간 분배
  between: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  
  // 컬럼 방향
  column: css`
    display: flex;
    flex-direction: column;
  `,
  
  // 반응형 방향 (모바일: 세로, 데스크탑: 가로)
  responsiveRow: css`
    display: flex;
    flex-direction: column;
    gap: clamp(1rem, 3vw, 2rem);
    
    ${media.tablet`
      flex-direction: row;
    `}
  `
};

// 반응형 크기 유틸리티
export const size = {
  // 화면 대비 비율 크기 (최소/최대 제한)
  responsive: (min, preferred, max) => css`
    width: clamp(${min}, ${preferred}, ${max});
    height: auto;
  `,
  
  // 정사각형 유지
  square: (size) => css`
    width: ${size};
    height: ${size};
    aspect-ratio: 1;
  `,
  
  // 16:9 비율 유지
  video: css`
    aspect-ratio: 16/9;
    width: 100%;
  `,
  
  // 전체 화면 크기
  fullScreen: css`
    width: 100vw;
    height: 100vh;
  `
};

// 타이포그래피 유틸리티
export const typography = {
  // 한 줄 말줄임
  ellipsis: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  
  // 여러 줄 말줄임 (webkit 전용)
  clamp: (lines = 2) => css`
    display: -webkit-box;
    -webkit-line-clamp: ${lines};
    -webkit-box-orient: vertical;
    overflow: hidden;
  `,
  
  // 반응형 텍스트 크기
  fluid: (minSize, maxSize, minScreen = '320px', maxScreen = '1200px') => css`
    font-size: clamp(${minSize}, 
      ${minSize} + (${parseFloat(maxSize)} - ${parseFloat(minSize)}) * 
      ((100vw - ${minScreen}) / (${parseFloat(maxScreen)} - ${parseFloat(minScreen)})), 
      ${maxSize});
  `
};

// 접근성 유틸리티
export const a11y = {
  // 스크린 리더 전용 텍스트
  srOnly: css`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  `,
  
  // 포커스 표시
  focusRing: (color = '#4CAF50') => css`
    &:focus {
      outline: 2px solid ${color};
      outline-offset: 2px;
    }
    
    &:focus:not(:focus-visible) {
      outline: none;
    }
  `,
  
  // 터치 영역 최소 크기 보장
  touchTarget: css`
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  `
};