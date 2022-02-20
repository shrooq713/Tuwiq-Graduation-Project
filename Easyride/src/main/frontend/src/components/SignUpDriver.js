import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { setToken, setUser } from "../reducers/User/User";
import { useDispatch } from "react-redux";
import image from "../Images/logo1.png";
import NavBar from "./Navbar";

function SignUpDriver() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [worning, setWorning] = useState("");
  const [form, setForm] = useState({
    id: "",
    firstName: "",
    lastName: "",
    password: "",
    phoneNumber: "",
    email: "",
    carName: "",
    carType: "",
    licenses_plate: "",
    user: {},
  });

  const signUpClicked = () => {
    if (form.id === "") {
      setWorning("Please enter username");
      return;
    } else if (form.password === "") {
      setWorning("Please enter password");
      return;
    }
    let user = {
      userName: form.id,
      password: form.password,
      role: "Driver",
    };
    axios.post("http://localhost:8080/users", user).then(function (response) {
      if (response.data == null) {
        console.log("UserName exist! please choose unique userName");
      } else {
        console.log("id is:");
        console.log(response.data.id);
        let newForm = { ...form };
        newForm.user = { id: response.data.id };
        console.log("new form is:");
        console.log(newForm);
        axios
          .post("http://localhost:8080/driver", newForm)
          .then(function (response) {
            if (response.data === null) {
              console.log("email exist! please choose unique userName");
            } else {
              const action = setUser(newForm);
              dispatch(action);
              user = { userName: newForm.id, password: newForm.password };
              axios
                .post("http://localhost:8080/login", user)
                .then(function (response) {
                  const token = response.data.access_token;
                  const action_token = setToken(token);
                  console.log(token);
                  dispatch(action_token);
                  navigate("/profile");
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
    <div className="page-header clear-filter" filter-color="orange">
      <NavBar />
      <div className="align container">
        <div className="">
          <div className="user_card_signUp_driver">
            <div className="brand_logo_container">
              <img src={image} className="brand_logo" alt="Logo" />
            </div>
            <div className="form">
              <form>
                <h1>Sign Up</h1>
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
                        setForm({
                          ...form,
                          id: e.target.value,
                        });
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
                        setForm({
                          ...form,
                          firstName: e.target.value,
                        });
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
                        setForm({
                          ...form,
                          lastName: e.target.value,
                        });
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
                        setForm({
                          ...form,
                          email: e.target.value,
                        });
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
                        setForm({
                          ...form,
                          phoneNumber: e.target.value,
                        });
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
                        setForm({
                          ...form,
                          password: e.target.value,
                        });
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
                        setForm({
                          ...form,
                          carName: e.target.value,
                        });
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
                        setForm({
                          ...form,
                          carType: e.target.value,
                        });
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
                        setForm({
                          ...form,
                          licenses_plate: e.target.value,
                        });
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
              <div className="Worning_driver">{worning}</div>
              <div className="Link_cont">
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
