import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequestHandler } from "../../apiConfig/service";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Timer persistence: Store end timestamp in localStorage
  const TIMER_DURATION = 120; // 2 minutes in seconds
  const TIMER_KEY = "otpTimerEnd";

  // Initialize timer on mount
  useEffect(() => {
    const savedEndTime = localStorage.getItem(TIMER_KEY);
    const now = Math.floor(Date.now() / 1000); // Current time in seconds

    if (savedEndTime) {
      const endTime = parseInt(savedEndTime, 10);
      const remainingSeconds = Math.max(0, endTime - now);
      setTimer(remainingSeconds);
      setCanResend(remainingSeconds <= 0);
    } else {
      // Set new timer if none exists
      const endTime = now + TIMER_DURATION;
      localStorage.setItem(TIMER_KEY, endTime.toString());
      setTimer(TIMER_DURATION);
    }
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const endTime = parseInt(localStorage.getItem(TIMER_KEY), 10);
      const remainingSeconds = Math.max(0, endTime - now);

      setTimer(remainingSeconds);
      if (remainingSeconds <= 0) {
        setCanResend(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Format timer as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Handle input change and focus shifting
  const handleChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input if a digit is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle backspace to move to previous input
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle OTP verification submission
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    const email = localStorage.getItem("emailForOtp");
    const otpSource = localStorage.getItem("otpSource");

    if (!email || !otpSource) {
      toast.error("Session expired. Please start the process again.");
      navigate("/user-login");
      return;
    }

    const res = await apiRequestHandler({
      method: "POST",
      endPoint: "verifyOtp",
      data: { email, otp: otpCode, otpSource },
    });

    if (res?.success) {
      toast.success(res?.message);
      if (otpSource === "registration") {
        navigate("/pricing"); // Redirect to pricing page for registration
      } else if (otpSource === "forgotPassword") {
        localStorage.setItem("resetToken", res?.data?.resetToken); // Store reset token for password reset
        navigate("/reset-password"); // Redirect to reset password page
      } else {
        navigate("/user-login"); // Fallback redirection
      }
      // Clean up localStorage
      localStorage.removeItem("otpSource");
    //   localStorage.removeItem("emailForOtp");
      localStorage.removeItem(TIMER_KEY);
    } else {
      toast.error(res?.message || "OTP verification failed");
    }
  };

  // Handle OTP resend
  const handleResendOtp = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("emailForOtp");
    const otpSource = localStorage.getItem("otpSource");

    if (!email || !otpSource) {
      toast.error("Email not found. Please start the process again.");
      navigate("/forgot-password");
      return;
    }

    const res = await apiRequestHandler({
      method: "POST",
      endPoint: "sendOtpToEmailUser",
      data: { email, otpSource },
    });

    if (res?.success) {
      toast.success("OTP resent successfully");
      // Reset timer
      const now = Math.floor(Date.now() / 1000);
      const endTime = now + TIMER_DURATION;
      localStorage.setItem(TIMER_KEY, endTime.toString());
      setTimer(TIMER_DURATION);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]); // Clear OTP inputs
      inputRefs.current[0]?.focus();
    } else {
      toast.error(res?.message || "Failed to resend OTP");
    }
  };

  // Focus the first input on component mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <section className="vh-100 bg-light">
      <div className="container h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="OTP Verification Visual"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 shadow p-5 bg-white rounded-4">
            <h3 className="text-center mb-4 fw-bold text-primary">
              Verify OTP
            </h3>
            <form onSubmit={handleVerifyOtp}>
              <div className="d-flex justify-content-center mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="form-control mx-1 text-center"
                    style={{ width: "40px", height: "40px", fontSize: "18px" }}
                    placeholder="0"
                  />
                ))}
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <small className="text-muted">
                  Enter the 6-digit OTP sent to your email
                </small>
                <div>
                  <small className="text-muted">
                    {canResend ? (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        style={{ border: "none", background: "none", color: "#007bff" }}
                      >
                        Resend OTP
                      </button>
                    ) : (
                      `Resend in ${formatTime(timer)}`
                    )}
                  </small>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-100">
                Verify OTP
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyOtp;