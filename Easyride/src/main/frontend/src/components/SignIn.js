import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../reducers/User/User";
import image from "../Images/logo1.png";
import NavBar from "./Navbar";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [worning, setWorning] = useState("");
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });
  const signInClicked = () => {
    if (form.userName === "") {
      setWorning("Please enter username");
      return;
    } else if (form.password === "") {
      setWorning("Please enter password");
      return;
    }

    axios
      .post("http://localhost:8080/login", form)
      .then((response) => {
        const token = response.data.access_token;
        const decode = jwt_decode(token);
        const action_token = setToken({ token });
        dispatch(action_token);
        console.log(token);

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        if (decode.roles[0] === "Rider") {
          axios
            .get(`http://localhost:8080/rider/${decode.sub}`, config)
            .then(function (response) {
              const action = setUser(response.data);
              dispatch(action);
              navigate("/rider");
            })
            .catch(function (error) {
              console.error(error);
            });
        } else if (decode.roles[0] === "Driver") {
          axios
            .get(`http://localhost:8080/driver/${decode.sub}`, config)
            .then(function (response) {
              const action2 = setUser(response.data);
              dispatch(action2);
              navigate("/profile");
            })
            .catch(function (error) {
              console.error(error);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        setWorning("Username or password is not correct!");
      });
  };

  return (
    <div className="page-header clear-filter" filter-color="orange">
      <NavBar />
      <div className="align">
        <div >
          <div className="user_card">
            <div className="brand_logo_container">
              <img src={image} className="brand_logo" alt="Logo" />
            </div>
            <div className="form">
              <form>
              <h1 className="SignHeader">Sign In</h1>
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
                          userName: e.target.value,
                        }));
                        setWorning("");
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
                        setWorning("");
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
                  onClick={signInClicked}
                >
                  Sign In
                </button>
              </div>
              <div className="Worning">{worning}</div>
              <div className="Link_container">
                <div>
                  Don't have an account? {" "}
                  <Link className="link-color" to="/">Sign Up</Link>
                </div>
                <div>
                  Are you driver? {" "}
                  <Link className="link-color" to="/signInDriver">Sign In</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
