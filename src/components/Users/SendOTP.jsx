import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorToast, IsEmail } from "../../helper/FormHelper";
import { RecoverVerifyEmailRequest } from "../../APIRequest/UserApiRequest";

const SendOTP = () => {
  let navigate = useNavigate();

  let [data, setData] = useState({ email: "" });
// console.log(data.email)
  const VerifyEmail = async () => {
    let email = data.email;
    if (IsEmail(email)) {
      ErrorToast("Valid Email Address Required !");
    } else {
      let result = await RecoverVerifyEmailRequest(email);
      if (result === true) {
        navigate("/verifyOtp");
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card w-90">
              <div className="card-body text-start">
                <h4>EMAIL ADDRESS</h4>
                <hr />
                <label>Your email address</label>
                <input
                  value={data.email}
                  onChange={(e) =>
                    setData((value) => {
                      return { ...value, email: e.target.value };
                    })
                  }
                  placeholder="User Email"
                  className="form-control animated fadeInUp"
                  type="email"
                />
                <br />
                <button onClick={VerifyEmail} className="btn w-100 btn-success animated fadeInUp">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendOTP;
