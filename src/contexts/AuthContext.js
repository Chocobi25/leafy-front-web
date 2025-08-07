// 인증 상태 관리 Context
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { tokenManager, userIdManager, userAPI, clearAuthData } from '../api/apiClient';

// 초기 상태
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
};

// 액션 타입들
const AuthActionTypes = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  UPDATE_USER: 'UPDATE_USER',
  SET_LOADING: 'SET_LOADING',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// 리듀서 함수
const authReducer = (state, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        loading: false,
        error: null,
      };

    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload.error,
      };

    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      };

    case AuthActionTypes.UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload.updates,
        },
      };

    case AuthActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };

    case AuthActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Context 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // 컴포넌트 마운트 시 토큰 확인
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // 인증 상태 확인
  const checkAuthStatus = async () => {
    try {
      dispatch({ type: AuthActionTypes.SET_LOADING, payload: { loading: true } });

      const token = tokenManager.getToken();
      if (!token) {
        dispatch({ type: AuthActionTypes.LOGOUT });
        return;
      }

      // 사용자 프로필 조회로 토큰 유효성 검증
      const userProfile = await userAPI.getProfile();
      
      dispatch({
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: { user: userProfile },
      });
    } catch (error) {
      console.error('Auth check failed:', error);
      // 토큰이 유효하지 않으면 로그아웃 처리
      clearAuthData();
      dispatch({ type: AuthActionTypes.LOGOUT });
    }
  };

  // 로그인 처리
  const login = async (token, userId) => {
    try {
      dispatch({ type: AuthActionTypes.LOGIN_START });

      // 토큰과 사용자 ID 저장
      tokenManager.setToken(token);
      userIdManager.setUserId(userId);

      // 사용자 프로필 조회
      const userProfile = await userAPI.getProfile();

      dispatch({
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: { user: userProfile },
      });

      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      clearAuthData();
      
      dispatch({
        type: AuthActionTypes.LOGIN_FAILURE,
        payload: { error: error.message },
      });

      return { success: false, error: error.message };
    }
  };

  // 로그아웃 처리
  const logout = async () => {
    try {
      // 서버에 로그아웃 요청 (선택적)
      // await authAPI.logout();
    } catch (error) {
      console.error('Logout API failed:', error);
    } finally {
      // 로컬 데이터 삭제
      clearAuthData();
      dispatch({ type: AuthActionTypes.LOGOUT });
    }
  };

  // 사용자 정보 업데이트
  const updateUser = (updates) => {
    dispatch({
      type: AuthActionTypes.UPDATE_USER,
      payload: { updates },
    });
  };

  // 닉네임 수정
  const updateNickname = async (nickname) => {
    try {
      await userAPI.updateNickname(nickname);
      updateUser({ nickname });
      return { success: true };
    } catch (error) {
      console.error('Nickname update failed:', error);
      return { success: false, error: error.message };
    }
  };

  // 레벨 아이콘 변경
  const updateLevelIcon = async (iconId) => {
    try {
      await userAPI.updateLevelIcon(iconId);
      updateUser({ selectedLevelIcon: iconId });
      return { success: true };
    } catch (error) {
      console.error('Level icon update failed:', error);
      return { success: false, error: error.message };
    }
  };

  // 사용자 프로필 새로고침
  const refreshUserProfile = async () => {
    try {
      const userProfile = await userAPI.getProfile();
      updateUser(userProfile);
      return { success: true, data: userProfile };
    } catch (error) {
      console.error('Profile refresh failed:', error);
      return { success: false, error: error.message };
    }
  };

  // 에러 클리어
  const clearError = () => {
    dispatch({ type: AuthActionTypes.CLEAR_ERROR });
  };

  // Context 값
  const contextValue = {
    // 상태
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    loading: state.loading,
    error: state.error,

    // 액션들
    login,
    logout,
    updateUser,
    updateNickname,
    updateLevelIcon,
    refreshUserProfile,
    clearError,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;