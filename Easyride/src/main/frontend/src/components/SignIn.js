import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const signInClicked = () => {
    console.log("signInClicked");


    
        navigate("/rider");
  };

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
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="flexForm">
            <div className="login_container">
              <button type="button" name="button" className="login_btn gap" onClick={signInClicked}>
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
