class SessionFunction {
  setToken(token) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }
  setUserDetails(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
  getUserDetails() {
    return JSON.parse(localStorage.getItem("user"));
  }
  removeSession = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  removeForget = () => {
    localStorage.clear();
  };
  setEmail(email) {
    localStorage.setItem("fEmail", email);
  }
  getEmail() {
    return localStorage.getItem("fEmail");
  }
  setOtp(otp) {
    localStorage.setItem("otp", otp);
  }
  getOtp() {
    return localStorage.getItem("otp");
  }
}

export const {
  setToken,
  getToken,
  setUserDetails,
  getUserDetails,
  removeSession,
  removeForget,
  setEmail,
  getEmail,
  setOtp,
  getOtp,
} = new SessionFunction();
