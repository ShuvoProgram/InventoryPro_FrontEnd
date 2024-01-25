import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmail, getOtp } from "../../helper/SessionHelper";
import { ErrorToast, IsEmpty } from "../../helper/FormHelper";
import { RecoverResetPassRequest } from "../../APIRequest/UserApiRequest";

const CreatePassword = () => {
  let navigate = useNavigate();

  const [data, setData] = useState({ password: "", confirmPassword: "" });

  const handelChange = (event) => {
    const name = event.target.name;
    setData((oldData) => {
      return { ...oldData, [name]: event.target.value };
    });
  };

  const ResetPass = async () => {
    let Password = data.password;
    let ConfirmPassword = data.confirmPassword;
    if (IsEmpty(Password)) {
      ErrorToast("Password Required");
    } else if (IsEmpty(ConfirmPassword)) {
      ErrorToast("Confirm Password Required");
    } else if (Password !== ConfirmPassword) {
      ErrorToast("Password & Confirm Password Should be Same");
    } else {
      let result = await RecoverResetPassRequest(
        getEmail(),
        getOtp(),
        Password
      );
      if (result === true) {
        navigate("/login");
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 text-start col-lg-6 center-screen">
            <div className="card w-90 p-4">
              <div className="card-body">
                <h4>SET NEW PASSWORD</h4>
                <br />
                <label>Your email address</label>
                <input
                  readOnly={true}
                  value={getEmail()}
                  placeholder="User Email"
                  className="form-control animated fadeInUp"
                  type="email"
                />
                <br />
                <label>New Password</label>
                <input
                  name="password"
                  onChange={handelChange}
                  placeholder="New Password"
                  className="form-control animated fadeInUp"
                  type="password"
                />
                <br />
                <label>Confirm Password</label>
                <input
                  name="confirmPassword"
                  onChange={handelChange}
                  placeholder="Confirm Password"
                  className="form-control animated fadeInUp"
                  type="password"
                />
                <br />
                <button onClick={ResetPass} className="btn w-100 btn-success animated fadeInUp">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePassword;
