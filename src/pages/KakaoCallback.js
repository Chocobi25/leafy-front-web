// 카카오 OAuth 콜백 처리 페이지
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Container, Flex } from '../components/Layout/Container';

const CallbackWrapper = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.md};
`;

const CallbackContainer = styled(Container)`
  max-width: 400px;
  text-align: center;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${theme.colors.background};
  border-top: 3px solid ${theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto ${theme.spacing.md} auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Message = styled.p`
  ${theme.typography.body};
  color: ${theme.colors.text.secondary};
  margin: 0;
`;

const KakaoCallback = () => {
  useEffect(() => {
    // URL에서 파라미터 추출
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userId = urlParams.get('userId');
    const error = urlParams.get('error');

    if (error) {
      // 에러 발생 시 부모 창에 에러 메시지 전송
      if (window.opener) {
        window.opener.postMessage({
          success: false,
          error: decodeURIComponent(error)
        }, window.location.origin);
      }
      window.close();
    } else if (token && userId) {
      // 성공 시 부모 창에 토큰 정보 전송
      if (window.opener) {
        window.opener.postMessage({
          success: true,
          token,
          userId: parseInt(userId)
        }, window.location.origin);
      }
      window.close();
    } else {
      // 파라미터가 없는 경우 에러
      if (window.opener) {
        window.opener.postMessage({
          success: false,
          error: '로그인 정보를 받아올 수 없습니다.'
        }, window.location.origin);
      }
      window.close();
    }
  }, []);

  return (
    <CallbackWrapper>
      <CallbackContainer>
        <Spinner />
        <Message>로그인 처리 중...</Message>
      </CallbackContainer>
    </CallbackWrapper>
  );
};

export default KakaoCallback;