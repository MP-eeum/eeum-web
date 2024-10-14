import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import LandingPage from "./pages/LandingPage";
import "./App.css";

function App() {
  return (
    <div className="pb-20 App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <NavigationBar />
    </div>
  );
}

export default App;
