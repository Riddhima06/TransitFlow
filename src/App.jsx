import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BusBooking from "./components/BusBooking";
import ViewSeats from "./components/ViewSeat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/busbook" element={<BusBooking />} />
        <Route path="/view-seats/:busId" element={<ViewSeats />} />
      </Routes>
    </Router>
  );
}

export default App;