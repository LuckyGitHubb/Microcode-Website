import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequestHandler } from "../../apiConfig/service";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    console.log(email);
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    const res = await apiRequestHandler({
      method: "POST",
      endPoint: "sendOtpToEmailUser",
      data: { email, otpSource: "forgotPassword" },
    });
console.log(res)
    if (res?.success) {
      toast.success(res?.message);
      localStorage.setItem("otpSource", "forgotPassword");
      localStorage.setItem("emailForOtp", email); // Store email for OTP resend
      navigate("/verify-otp"); // Redirect to OTP verification page
    } else {
      toast.error(res?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <section className="vh-100 bg-light">
      <div className="container h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Forgot Password Visual"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 shadow p-5 bg-white rounded-4">
            <h3 className="text-center mb-4 fw-bold text-primary">
              Forgot Password
            </h3>
            <form onSubmit={handleSendOtp}>
              <div className="form-floating mb-4">
                <input
                  type="email"
                  className="form-control"
                  id="floatingEmail"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
                <label htmlFor="floatingEmail">Email address</label>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <small className="text-muted">
                  Enter your email to receive an OTP
                </small>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-100">
                Send OTP
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;