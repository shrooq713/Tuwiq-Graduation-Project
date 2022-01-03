import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { setToken, setUser } from "../reducers/User/User";
import { useDispatch } from "react-redux";
import image from "../Images/logo1.png";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    id: "",
    firstName: "",
    lastName: "",
    password: "",
    phoneNumber: "",
    email: "",
    user: {},
  });
  const signUpClicked = () => {
    let user = {
      userName: form.id,
      password: form.password,
      role: "Rider",
    };
    axios.post("http://localhost:8080/users", user).then(function (response) {
      console.log(response.data);
      if (response.data == null) {
        console.log("UserName exist! please choose unique userName");
      } else {
        setForm((prevState) => ({
          ...prevState,
          user: { id: response.data.id },
        }));
        axios
          .post("http://localhost:8080/rider", form)
          .then(function (response) {
            if (response.data === null) {
              console.log("email exist! please choose unique userName");
            } else {
              const action = setUser(form);
              dispatch(action);
              user = { userName: form.id, password: form.password };
              axios
                .post("http://localhost:8080/login", user)
                .then(function (response) {
                  const token = response.data.access_token;
                  const action_token = setToken(token);
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
        <div className="user_card_signUp">
          <div className="brand_logo_container">
            <img src={image} className="brand_logo" alt="Logo" />
          </div>
          <div className="form">
            <form>
              <h1 className="SignHeader">Sign Up</h1>
              <div className="flexForm">
                <div>
                  <label>User Name: </label>
                </div>
                <div>
                  <input
                    type="text"
                    className="input-group-text"
                    placeholder="user name"
                    required
                    onChange={(e) => {
                      setForm((prevState) => ({
                        ...prevState,
                        id: e.target.value,
                      }));
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
                      setForm((prevState) => ({
                        ...prevState,
                        firstName: e.target.value,
                      }));
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
                      setForm((prevState) => ({
                        ...prevState,
                        lastName: e.target.value,
                      }));
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
                      setForm((prevState) => ({
                        ...prevState,
                        email: e.target.value,
                      }));
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
                      setForm((prevState) => ({
                        ...prevState,
                        phoneNumber: e.target.value,
                      }));
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
                      setForm((prevState) => ({
                        ...prevState,
                        password: e.target.value,
                      }));
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
              <div>
                <Link to="/SignUpDriver">Drive with us!</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
