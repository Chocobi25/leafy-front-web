import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TripStart from "./pages/TripStart";
import PlacesSelect from "./pages/PlacesSelect";
import ReorderPlaces from "./pages/ReorderPlaces";
import FinalItinerary from "./pages/FinalItinerary"; // 새로 추가

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TripStart />} />
        <Route path="/placesSelect" element={<PlacesSelect />} />
        <Route path="/ReorderPlaces" element={<ReorderPlaces />} />
        <Route path="/final-itinerary" element={<FinalItinerary />} />
      </Routes>
    </Router>
  );
}

export default App;