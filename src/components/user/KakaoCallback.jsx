import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './KakaoCallback.css';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const token = searchParams.get('token');
        const error = searchParams.get('error');

        if (error) {
          console.error('카카오 로그인 실패:', error);
          alert('로그인에 실패했습니다. 다시 시도해주세요.');
          navigate('/login');
          return;
        }

        if (token) {
          login(token);
          navigate('/');
        } else {
          throw new Error('토큰이 없습니다.');
        }
      } catch (error) {
        console.error('로그인 처리 중 오류:', error);
        alert('로그인 처리 중 오류가 발생했습니다.');
        navigate('/login');
      }
    };

    handleCallback();
  }, [searchParams, login, navigate]);

  return (
    <div className="kakao-callback">
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>로그인 처리 중...</p>
      </div>
    </div>
  );
};

export default KakaoCallback;