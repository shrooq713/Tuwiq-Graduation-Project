import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Rider from "./components/Rider";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SignUpDriver from "./components/SignUpDriver";
import DriverMap from "./components/DriverMap";
import Driver from "./components/Driver";
import Profile from "./components/Profile";
import TripsPin from "./components/TripsPin";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/SignUpDriver" element={<SignUpDriver />} />
            <Route path="/rider" element={<Rider />} />
            <Route path="/driver" element={<Driver/>} />
            <Route path="/driver_map" element={<DriverMap />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/trips" element={<TripsPin />} />
            
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
