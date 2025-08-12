import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/home/Home';
import LoginPage from './components/user/LoginPage';
import MyPage from './components/user/MyPage';
import KakaoCallback from './components/user/KakaoCallback';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
