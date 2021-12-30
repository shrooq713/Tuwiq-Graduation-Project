import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { setToken, setUser } from "../reducers/User/User";
import { useDispatch } from "react-redux";
function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [riderUserName, setRiderUserName] = useState("");
  const [riderFName, setRiderFName] = useState("");
  const [riderLName, setRiderLName] = useState("");
  const [riderPassword, setRiderPassowrd] = useState("");
  const [riderEmail, setRiderEmail] = useState("");
  const [riderPhone, setRiderPhone] = useState("");

  const signUpClicked = () => {
    console.log("signUpClicked");

    let user = {
      user: {
        userName: riderUserName,
        password: riderPassword,
      },
      role_id: 9,
    };
    // axios.post("http://localhost:8080/users", user).then(function (response) {
    //   console.log(response.data);
    //   if (response.data == null) {
    //     console.log("UserName exist! please choose unique userName");
    //   } else {
    //     let rider = {
    //       id: riderUserName,
    //       firstName: riderFName,
    //       lastName: riderLName,
    //       password: riderPassword,
    //       phoneNumber: riderPhone,
    //       email: riderEmail,
    //     };
    //     axios
    //       .post("http://localhost:8080/rider", rider)
    //       .then(function (response) {
    //         console.log(response.data);
    //         if (response.data === null) {
    //           console.log("email exist! please choose unique userName");
    //         } else {
    //           const action = setUser(rider);
    //           dispatch(action);
    //           user = { username: riderUserName, password: riderPassword };
    //           axios
    //             .post("http://localhost:8080/login", user)
    //             .then(function (response) {
    //               console.log(response.data);
    //               const token = response.data.access_token;
    //               const action_token = setToken(token);
    //               dispatch(action_token);
    //               navigate("/rider");
    //             })
    //             .catch(function (error) {
    //               console.error(error);
    //             });
    //         }
    //       })
    //       .catch(function (error) {
    //         console.error(error);
    //       });
    // }
    // console.log(response);
    // navigate("/rider");
    // });
  };
  return (
    <div className="align container h-100">
      <div className="">
        <div className="user_card_signUp">
          <div className="brand_logo_container">
            <img
              src="https://cdn-icons.flaticon.com/png/512/1916/premium/1916788.png?token=exp=1639550670~hmac=09861a67572e4df4a26dceca0d51538c"
              className="brand_logo"
              alt="Logo"
            />
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
                      setRiderUserName(e.target.value);
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
                      setRiderFName(e.target.value);
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
                      setRiderLName(e.target.value);
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
                      setRiderEmail(e.target.value);
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
                      setRiderPhone(e.target.value);
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
                      setRiderPassowrd(e.target.value);
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
