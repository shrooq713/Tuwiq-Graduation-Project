import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../reducers/User/User";
import image from "../Images/logo1.png";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [worning, setWorning] = useState("");

  const state = useSelector((state) => {
    return {
      token: state.User.token,
    };
  });
  const signInClicked = () => {
    if(userName===""){
      setWorning("Please enter username");
      return ;
    }else if(password===""){
      setWorning("Please enter password");
      return ;
    }

    const data = {
      userName,
      password,
    };

    axios
      .post("http://localhost:8080/login", data)
      .then((response) => {
        const token = response.data.access_token;
        const decode = jwt_decode(token);
        const action_token = setToken({ token });
        dispatch(action_token);

        const config = {
          headers: { Authorization: `Bearer ${state.token}` },
        };

        if (decode.roles[0] === "Rider") {
          axios
            .get(`http://localhost:8080/rider/rider1`, config)
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
              navigate("/driver");
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
    <div className="align container h-100">
      <div className="">
        <div className="user_card">
          <div className="brand_logo_container">
            <img src={image} className="brand_logo" alt="Logo" />
          </div>
          <div className="form">
              <h1 className="SignHeader">Sign In</h1>
            <form>
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
                      setUserName(e.target.value);
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
                      setPassword(e.target.value);
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
            <div className="Worning">
              {worning}
            </div>
            <div className="Link_container">
              <div>
                Don't have an account?
                <Link to="/">Sign Up</Link>
              </div>
              <div>
                Are you driver?
                <Link to="/signInDriver">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
