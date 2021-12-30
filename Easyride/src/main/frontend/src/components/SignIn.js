import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../reducers/User/User";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.User.token,
    };
  });
  const signInClicked = () => {
    const data = {
      userName,
      password,
    };

    axios
      .post("http://localhost:8080/login", data)
      .then((res) => {
        console.log("Data::");
        console.log(res.data);
        const token = res.data.access_token;
        const decode = jwt_decode(token);

        const config = {
          headers: { Authorization: `Bearer ${state.token}` },
        };

        // add user to redux
        console.log(decode);

        console.log("token");
        console.log(token);
        // const action = setUser({
        //   id: decode.id,
        //   userName: decode.sub,
        // });
        // dispatch(action);

        const action_token = setToken({ token });
        dispatch(action_token);

        // if (decode.roles[0] === "Rider") {
        //   console.log("inside rider");
        //   axios
        //     .get(`http://localhost:8080/rider/rider/user/${decode.id}`, config)
        //     .then(function (response) {
        //       const action = setUser(response.data);
        //       dispatch(action);
        //       console.log(response.data);
        //     })
        //     .catch(function (error) {
        //       console.error(error);
        //     });
        //   navigate("/rider");
        // } 
        // else if (decode.roles[0] === "Driver") {
        //   // get the student using the login user id
        //   axios
        //     .get(
        //       `http://localhost:8080/driver/driver/user/${decode.id}`,
        //       config
        //     )
        //     .then(function (response) {
        //       const action2 = setUser(response.data);
        //       dispatch(action2);
        //       console.log(response.data);
        //     })
        //     .catch(function (error) {
        //       console.error(error);
        //     });
        //   navigate("/driver");
        //   console.log("Driver");
        // }

      })
      .catch((err) => {
        console.log("Error::");
        console.log(err);
        console.log("UserName or password is not correct!");
      });
    // navigate("/rider");
  };
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="align container h-100">
      <div className="">
        <div className="user_card">
          <div className="brand_logo_container">
            <img
              src="https://cdn-icons.flaticon.com/png/512/1916/premium/1916788.png?token=exp=1639550670~hmac=09861a67572e4df4a26dceca0d51538c"
              className="brand_logo"
              alt="Logo"
            />
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
                      setUserName(e.target.value);
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
