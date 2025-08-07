// 반응형 컨테이너 컴포넌트
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { media } from '../../styles/responsive';

export const Container = styled.div`
  width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${theme.layout.containerPadding};
  
  ${media.mobile`
    padding: 0 ${theme.spacing.md};
  `}
  
  ${media.wide`
    padding: 0 ${theme.spacing.xl};
  `}
`;

export const Section = styled.section`
  padding: ${theme.spacing.xl} 0;
  
  ${media.mobile`
    padding: ${theme.spacing.lg} 0;
  `}
`;

export const Card = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
  width: 100%;
  max-width: ${props => props.$maxWidth || theme.layout.cardMaxWidth};
  margin: 0 auto;
  
  ${media.mobile`
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.md};
  `}
  
  ${media.desktop`
    padding: ${theme.spacing.xl};
  `}
`;

export const Grid = styled.div`
  display: grid;
  gap: ${props => props.$gap || theme.spacing.md};
  
  ${props => props.$columns && `
    grid-template-columns: repeat(${props.$columns}, 1fr);
  `}
  
  ${props => props.$autoFit && `
    grid-template-columns: repeat(auto-fit, minmax(${props.$minWidth || '280px'}, 1fr));
  `}
  
  ${props => props.$responsive && `
    grid-template-columns: 1fr;
    
    ${media.tablet`
      grid-template-columns: repeat(2, 1fr);
    `}
    
    ${media.desktop`
      grid-template-columns: repeat(3, 1fr);
    `}
  `}
`;

export const Flex = styled.div`
  display: flex;
  gap: ${props => props.$gap || theme.spacing.md};
  
  ${props => props.$direction && `flex-direction: ${props.$direction};`}
  ${props => props.$justify && `justify-content: ${props.$justify};`}
  ${props => props.$align && `align-items: ${props.$align};`}
  ${props => props.$wrap && `flex-wrap: wrap;`}
  
  ${props => props.$center && `
    justify-content: center;
    align-items: center;
  `}
  
  ${props => props.$between && `
    justify-content: space-between;
    align-items: center;
  `}
  
  ${props => props.$responsiveRow && `
    flex-direction: column;
    
    ${media.tablet`
      flex-direction: row;
    `}
  `}
`;