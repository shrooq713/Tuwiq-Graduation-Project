import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { setToken, setUser } from "../reducers/User/User";
import { useDispatch } from "react-redux";
import image from "../Images/logo1.png";

function SignUpDriver() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [driverUserName, setDriverUserName] = useState("");
  const [driverFName, setDriverFName] = useState("");
  const [driverLName, setDriverLName] = useState("");
  const [driverPassword, setDriverPassword] = useState("");
  const [driverEmail, setDriverEmail] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [driverCarName, setDriverCarName] = useState("");
  const [driverCarType, setDriverCarType] = useState("");
  const [driverLicensesPlate, setDriverLicensesPlate] = useState("");

  const signUpClicked = () => {
    console.log("signUpClicked");
    let user = {
      userName: driverUserName,
      password: driverPassword,
      role: "Driver",
    };
    axios.post("http://localhost:8080/users", user).then(function (response) {
      console.log(response.data);
      if (response.data == null) {
        console.log("UserName exist! please choose unique userName");
      } else {
        let driver = {
          id: driverUserName,
          firstName: driverFName,
          lastName: driverLName,
          password: driverPassword,
          phoneNumber: driverPhone,
          email: driverEmail,
          carName: driverCarName,
          carType: driverCarType,
          licenses_plate: driverLicensesPlate,

          user: { id: response.data.id },
        };
        axios
          .post("http://localhost:8080/driver", driver)
          .then(function (response) {
            console.log(response.data);
            if (response.data === null) {
              console.log("email exist! please choose unique userName");
            } else {
              const action = setUser(driver);
              dispatch(action);
              user = { userName: driverUserName, password: driverPassword };
              axios
                .post("http://localhost:8080/login", user)
                .then(function (response) {
                  console.log(response.data);
                  const token = response.data.access_token;
                  const action_token = setToken(token);
                  console.log("token");
                  console.log(token);
                  dispatch(action_token);
                  navigate("/rider");
                })
                .catch(function (error) {
                  console.error(error);
                });
            }
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    });
  };

  return (
    <div className="align container h-100">
      <div className="">
        <div className="user_card_signUp_driver">
          <div className="brand_logo_container">
            <img src={image} className="brand_logo" alt="Logo" />
          </div>
          <div className="form">
            <form>
              <h1 className="SignHeader">Sign Up</h1>
              <div className="flexForm">
                <div>
                  <label>Driver Name: </label>
                </div>
                <div>
                  <input
                    type="text"
                    className="input-group-text"
                    placeholder="user name"
                    required
                    onChange={(e) => {
                      setDriverUserName(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label>First Name: </label>
                </div>
                <div>
                  <input
                    type="text"
                    className="input-group-text"
                    placeholder="first name"
                    onChange={(e) => {
                      setDriverFName(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label>Last Name: </label>
                </div>
                <div>
                  <input
                    type="text"
                    className="input-group-text"
                    placeholder="last name"
                    onChange={(e) => {
                      setDriverLName(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label>Email: </label>
                </div>
                <div>
                  <input
                    type="email"
                    className="input-group-text"
                    placeholder="emaple@email.com"
                    required
                    onChange={(e) => {
                      setDriverEmail(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label>Phone number: </label>
                </div>
                <div>
                  <input
                    type="tel"
                    className="input-group-text"
                    placeholder="050-000-0000"
                    required
                    onChange={(e) => {
                      setDriverPhone(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label>Password: </label>
                </div>
                <div>
                  <input
                    type="password"
                    className="input-group-text"
                    placeholder="password"
                    required
                    onChange={(e) => {
                      setDriverPassword(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label>Car Name: </label>
                </div>
                <div>
                  <input
                    type="text"
                    className="input-group-text"
                    placeholder="car name"
                    onChange={(e) => {
                      setDriverCarName(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label>Car type: </label>
                </div>
                <div>
                  <input
                    type="text"
                    className="input-group-text"
                    placeholder="car type"
                    onChange={(e) => {
                      setDriverCarType(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label>licenses plate: </label>
                </div>
                <div>
                  <input
                    type="text"
                    className="input-group-text"
                    placeholder="licenses plate"
                    onChange={(e) => {
                      setDriverLicensesPlate(e.target.value);
                    }}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="flexForm">
            <div className="login_container">
              <button
                type="button"
                name="button"
                className="login_btn gap"
                onClick={signUpClicked}
              >
                Sign up
              </button>
            </div>
            <div className="Link_container">
              <div>
                Already have an account?
                <Link to="/signIn">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpDriver;
