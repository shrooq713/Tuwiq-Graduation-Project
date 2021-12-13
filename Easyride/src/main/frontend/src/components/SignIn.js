function SignIn() {
  return (
    <div className="align container h-100">
      <div className="">
        <div className="user_card">
          <div className="brand_logo_container">
            <img
              src="https://cdn-icons.flaticon.com/png/512/1916/premium/1916788.png?token=exp=1639293991~hmac=32551fdba3422eacb6daf105dde8eb8d"
              class="brand_logo"
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
              <button type="button" name="button" className="login_btn gap">
                Sign In
              </button>
            </div>
            <div className="mt-4">
              <div className="">
                Don't have an account? <a href="#">Sign Up</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
