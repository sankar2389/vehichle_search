import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VehicleDetail from "./pages/vehicleDetails";
import Home from "./pages/home";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicle-detail/:id" element={<VehicleDetail/>} />
      </Routes>
    </Router>
  );
}

export default App;
