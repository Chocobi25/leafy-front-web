import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/home/Home';
import LoginPage from './components/user/LoginPage';
import MyPage from './components/user/MyPage';
import KakaoCallback from './components/user/KakaoCallback';
import TripStart from "./pages/TripStart";
import PlacesSelect from "./pages/PlacesSelect";
import ReorderPlaces from "./pages/ReorderPlaces";
import FinalItinerary from "./pages/FinalItinerary"; // 새로 추가
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
            <Route path="/trip-start" element={<TripStart />} />
            <Route path="/placesSelect" element={<PlacesSelect />} />
            <Route path="/ReorderPlaces" element={<ReorderPlaces />} />
            <Route path="/final-itinerary" element={<FinalItinerary />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
