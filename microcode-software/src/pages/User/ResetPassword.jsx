import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequestHandler } from "../../apiConfig/service";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in both password fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    const email = localStorage.getItem("emailForOtp");
    const resetToken = localStorage.getItem("resetToken");
console.log(resetToken)
    if (!email || !resetToken) {
      toast.error("Session expired. Please start the process again.");
      navigate("/forgot-password");
      return;
    }

    const res = await apiRequestHandler({
      method: "POST",
      endPoint: "resetPassword",
      data: { email, resetToken, password },
    });

    if (res?.success) {
      toast.success(res?.message);
      localStorage.removeItem("resetToken"); // Clean up reset token
      localStorage.removeItem("emailForOtp"); // Clean up email
      navigate("/user-login"); // Redirect to login page after successful reset
    } else {
      toast.error(res?.message || "Failed to reset password");
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
              alt="Reset Password Visual"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 shadow p-5 bg-white rounded-4">
            <h3 className="text-center mb-4 fw-bold text-primary">
              Reset Password
            </h3>
            <form onSubmit={handleResetPassword}>
              <div className="form-floating mb-4">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <label htmlFor="floatingPassword">New Password</label>
              </div>

              <div className="form-floating mb-4">
                <input
                  type="password"
                  className="form-control"
                  id="floatingConfirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <label htmlFor="floatingConfirmPassword">Confirm Password</label>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <small className="text-muted">
                  Password must be at least 6 characters long
                </small>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-100">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;