import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoginRequest } from "../../APIRequest/UserApiRequest";
import { ErrorToast, IsEmail, IsEmpty } from "../../helper/FormHelper";

const Login = () => {
  let [data, setData] = useState({
    UserEmail: "ismailsardar540@gmail.com",
    password: "1234567",
  });

  let { UserEmail, password } = data;

  const handelChange = (event) => {
    const name = event.target.name;
    setData((oldData) => {
      return { ...oldData, [name]: event.target.value };
    });
  };

  const SubmitLogin = async () => {
    if (IsEmail(UserEmail)) {
      ErrorToast("Invalid Email Address");
    } else if (IsEmpty(password)) {
      ErrorToast("Password Required");
    } else {
      let result = await LoginRequest(UserEmail, password);
      if (result) {
        window.location.href = "/";
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card w-90  p-4">
              <div className="card-body">
                <h3>SIGN IN</h3>
                <br />
                <input
                  name="UserEmail"
                  value={UserEmail}
                  onChange={handelChange}
                  required
                  placeholder="User Email"
                  className="form-control animated fadeInUp"
                  type="email"
                />
                <br />
                <input
                  name="password"
                  value={password}
                  onChange={handelChange}
                  required
                  placeholder="User Password"
                  className="form-control animated fadeInUp"
                  type="password"
                />
                <br />
                <button
                  onClick={SubmitLogin}
                  className="btn btn-success w-100 animated "
                >
                  Next
                </button>
                <div className="float-end mt-3">
                  <span>
                    <Link className="text-center ms-3 h6" to="/registration">
                      Sign Up
                    </Link>
                    <span className="ms-1">|</span>
                    <Link className="text-center ms-3 h6" to="/sendOtp">
                      Forget Password
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
