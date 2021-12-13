function SignUp() {
  return (
    <div className="align container h-100">
      <div className="">
        <div className="user_card_signUp">
          <div className="brand_logo_container">
            <img
              src="https://cdn-icons.flaticon.com/png/512/1916/premium/1916788.png?token=exp=1639293991~hmac=32551fdba3422eacb6daf105dde8eb8d"
              class="brand_logo"
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
                Sign up
              </button>
            </div>
            <div className="mt-4">
              <div className="">
                already have an account? <a href="#">Sign In</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
