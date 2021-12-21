import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Rider from "./components/Rider";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SignInDriver from "./components/SignInDriver";
import SignUpDriver from "./components/SignUpDriver";
import DriverMap from "./components/DriverMap";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            {/* <Route path="/signInDriver" element={<SignInDriver />} /> */}
            <Route path="/SignUpDriver" element={<SignUpDriver />} />
            <Route path="/rider" element={<Rider />} />
            <Route path="/driver/Map" element={<DriverMap />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
