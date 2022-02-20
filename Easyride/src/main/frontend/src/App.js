import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Rider from "./components/Rider";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SignUpDriver from "./components/SignUpDriver";
import Driver from "./components/Driver";
import Profile from "./components/Profile";
import AboutUs from "./components/Aboutus";
import Trip from "./components/Trip";
import AllTrip from "./components/AllTrip";
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
            <Route path="/profile" element={<Profile />} />           
            <Route path="/active/:id" element={<Trip />} />
            <Route path="/trips" element={<AllTrip />} />
            <Route path="/aboutus" element={<AboutUs />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
