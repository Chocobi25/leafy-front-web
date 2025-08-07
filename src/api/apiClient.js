// API 클라이언트 - React Native 버전을 웹으로 이식
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - JWT 토큰 자동 첨부
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('user-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 인증 에러 처리
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 401 또는 403 에러 시 자동 로그아웃
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.log('Authentication error, redirecting to login.');
      
      // 토큰 및 사용자 정보 삭제
      localStorage.removeItem('user-token');
      localStorage.removeItem('user-id');
      
      // 로그인 페이지로 리다이렉트
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      
      return Promise.reject(new Error('Authentication Failed'));
    }

    // 네트워크 에러 처리
    if (!error.response) {
      console.error('Network error:', error.message);
      return Promise.reject(new Error('네트워크 연결을 확인해주세요.'));
    }

    // 서버 에러 처리
    const errorMessage = error.response.data?.message || 'API 요청 중 오류가 발생했습니다.';
    console.error(`API Error: ${error.response.status}`, error.response.data);
    
    return Promise.reject(new Error(errorMessage));
  }
);

// API 요청 헬퍼 함수들
export const api = {
  // GET 요청
  get: async (url, config = {}) => {
    try {
      const response = await apiClient.get(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST 요청
  post: async (url, data = null, config = {}) => {
    try {
      const response = await apiClient.post(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PUT 요청
  put: async (url, data = null, config = {}) => {
    try {
      const response = await apiClient.put(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // DELETE 요청
  delete: async (url, config = {}) => {
    try {
      const response = await apiClient.delete(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PATCH 요청
  patch: async (url, data = null, config = {}) => {
    try {
      const response = await apiClient.patch(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// 사용자 관련 API 함수들
export const userAPI = {
  // 사용자 프로필 조회
  getProfile: () => api.get('/api/user/profile'),
  
  // 닉네임 수정
  updateNickname: (nickname) => api.put('/api/user/nickname', { nickname }),
  
  // 레벨 아이콘 변경
  updateLevelIcon: (selectedLevelIcon) => 
    api.put('/api/user/level-icon', { selectedLevelIcon }),
  
  // 테스트용 레벨 변경
  testChangeLevel: (level) => api.put('/api/user/test/level', { level }),
  
  // 테스트용 탄소 절감량 변경
  testChangeCarbonSaved: (totalCarbonSaved) => 
    api.put('/api/user/test/carbon', { totalCarbonSaved }),
};

// 인증 관련 API 함수들
export const authAPI = {
  // 카카오 로그인 URL 생성
  getKakaoLoginUrl: () => `${API_BASE_URL}/oauth2/authorization/kakao`,
  
  // 토큰 유효성 검증
  validateToken: () => api.get('/api/auth/validate'),
  
  // 로그아웃
  logout: () => api.post('/api/auth/logout'),
};

// 토큰 관리 유틸리티
export const tokenManager = {
  // 토큰 저장
  setToken: (token) => {
    localStorage.setItem('user-token', token);
  },
  
  // 토큰 조회
  getToken: () => {
    return localStorage.getItem('user-token');
  },
  
  // 토큰 삭제
  removeToken: () => {
    localStorage.removeItem('user-token');
  },
  
  // 토큰 존재 여부 확인
  hasToken: () => {
    return !!localStorage.getItem('user-token');
  },
};

// 사용자 ID 관리 유틸리티
export const userIdManager = {
  // 사용자 ID 저장
  setUserId: (userId) => {
    localStorage.setItem('user-id', userId.toString());
  },
  
  // 사용자 ID 조회
  getUserId: () => {
    return localStorage.getItem('user-id');
  },
  
  // 사용자 ID 삭제
  removeUserId: () => {
    localStorage.removeItem('user-id');
  },
};

// 전체 인증 정보 삭제
export const clearAuthData = () => {
  tokenManager.removeToken();
  userIdManager.removeUserId();
};

export default apiClient;