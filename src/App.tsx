import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import LandingPage from "./pages/LandingPage";
import NewsPage from "./pages/NewsPage";
import WeatherPage from "./pages/WeatherPage";
import DisasterPage from "./pages/DisasterPage";
import EvacuationPage from "./pages/EvacuationPage";

import "./App.css";

function App() {
  return (
    <div className="h-full pb-20 App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/disaster" element={<DisasterPage />} />
        <Route path="/evacuation" element={<EvacuationPage />} />
      </Routes>
      <NavigationBar />
    </div>
  );
}

export default App;
