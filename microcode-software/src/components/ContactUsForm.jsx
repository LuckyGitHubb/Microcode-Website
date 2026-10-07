import React, { useEffect, useRef, useState } from "react";
import "react-phone-input-2/lib/bootstrap.css";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import { addContactAPI } from "../features/AddContactSlice";
import ReCAPTCHA from "react-google-recaptcha";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ContactUsForm() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [verified, setVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const [sentMail, setSentMail] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [otpSuccessMessage, setOtpSuccessMessage] = useState("");
  const [otpValue, setOtpValue] = useState(""); // State to hold the entered OTP
  const dispatch = useDispatch();
  const { successMessage, error } = useSelector((state) => state.addContact);
  const [timer, setTimer] = useState(0);
  const recaptchaRef = useRef(null); // Ref for ReCAPTCHA to reset it

  function onChange(value) {
    setVerified(!!value); // Set verified to true if value exists, false otherwise
  }

  // Enable timer for OTP resend
  useEffect(() => {
    let interval;
    if (openOtp && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [openOtp, timer]);
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  async function submit_ContactForm(e) {
    e.preventDefault();
    const newErrors = {};
    const badInputRegex = /<[^>]*>|[:;]|(script|iframe|onerror|onload|style|img)/i;

    if (!name.trim()) newErrors.name = "Please enter the name";
    // Check for email validity and if OTP has been successfully verified (if applicable)
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    } else if (email.endsWith("@gmail.com") && !otpSuccess) {
      newErrors.email = "Please verify your email with OTP";
    }

    if (!mobile || mobile.length < 10 || mobile.length > 20)
      newErrors.mobile = "Please enter a valid mobile number";
    if (!description.trim()) {
      newErrors.description = "Please enter the description";
    } else if (badInputRegex.test(description)) {
      newErrors.description = "Description must not contain invalid characters or dangerous content.";
    }
    if (!verified) {
      newErrors.verification = "Please verify using the reCAPTCHA checkbox";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await dispatch(
        addContactAPI({ name, mobile, email, description })
      );

      if (res?.payload?.success) {
        setShowMessage(true);
        setName("");
        setMobile("");
        setEmail("");
        setDescription("");
        setErrors({});
        setVerified(false);
        setSentMail(false); // Reset sentMail state
        setOpenOtp(false); // Reset openOtp state
        setOtpSuccess(false); // Reset OTP success state
        setOtpSuccessMessage(""); // Clear OTP success message
        setOtpValue(""); // Clear OTP input
        if (recaptchaRef.current) {
          recaptchaRef.current.reset(); // Reset reCAPTCHA
        }
      }
    } catch (error) {
      setVerified(false);
      console.error("Form submission failed:", error);
    }
  }

  useEffect(() => {
    if (successMessage || error) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error]);

  const handleEmail = (value) => {
    const wasEmailDifferent = email !== value;

    setEmail(value);

    // Reset OTP states if email is changed
    if (wasEmailDifferent) {
      setOpenOtp(false);
      setOtpSuccess(false);
      setOtpSuccessMessage("");
      setOtpValue("");
      setTimer(0);
      setSentMail(false); // Always hide resend until explicitly sent again
    }

    // Check if it's a valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setSentMail(emailRegex.test(value));

    // Remove email error if corrected
    if (errors.email) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.email;
        return newErrors;
      });
    }
  };


  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Please enter a valid email to send OTP" }));
      return;
    }
    setOtpSuccess(false); // Reset OTP success state
    setOtpSuccessMessage(""); // Clear previous OTP success message

    try {
      const res = await fetch(`${process.env.REACT_APP_URL}/auth/sent-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      const data = await res.json();
      if (res.ok) {
        setTimer(300); // Start 5-minute timer (300 seconds)
        setOpenOtp(true);
        setSentMail(false); // Hide send OTP button after sending
        setOtpSuccessMessage(data.message || "OTP sent successfully!");
        setErrors((prevErrors) => { // Clear email error if OTP sent
          const newErrors = { ...prevErrors };
          delete newErrors.email;
          return newErrors;
        });
      } else {
        setOtpSuccess(true); // Display error message
        setOtpSuccessMessage(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      setOtpSuccess(true);
      setOtpSuccessMessage("Error sending OTP. Please try again.");
      console.error("Error sending OTP:", error);
    }
  };

  // OTP verification
  const handleVerifyOtp = async (otp) => {
    setOtpValue(otp);
    setOtpSuccess(false);
    setOtpSuccessMessage("");

    if (otp.length === 6) {
      try {
        const res = await fetch(`${process.env.REACT_APP_URL}/auth/verify-otp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, otp: otp }),
        });

        const data = await res.json();

        if (res.ok) {
          setOpenOtp(false);
          setOtpSuccess(true);
          setOtpSuccessMessage(data.message || "OTP verified successfully!");
          setTimer(0);
          toast.success(data.message || "OTP verified successfully!");

          setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors.email;
            return newErrors;
          });
        } else {
          setOtpSuccess(true);
          setOtpSuccessMessage(data.message || "Invalid OTP. Please try again.");
          toast.error(data.message || "Invalid OTP. Please try again.");
        }
      } catch (error) {
        setOtpSuccess(true);
        setOtpSuccessMessage("Error verifying OTP. Please try again.");
        toast.error("Error verifying OTP. Please try again.");
        console.error("Error verifying OTP:", error);
      }
    }
  };


  const handleOtpInput = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // Only digits
    if (!value) return;

    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);

    // Move focus to next box
    if (index < 5 && value) {
      otpRefs.current[index + 1].current.focus();
    }

    // Auto-submit if all boxes filled
    const fullOtp = newOtp.join("");
    if (fullOtp.length === 6) {
      handleVerifyOtp(fullOtp);
    }
  };

  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([...Array(6)].map(() => React.createRef()));


  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otpDigits];
      if (newOtp[index]) {
        newOtp[index] = "";
        setOtpDigits(newOtp);
      } else if (index > 0) {
        otpRefs.current[index - 1].current.focus();
      }
    }
  };


  return (
    <div>
      <div className="contact-style-one-area overflow-hidden default-padding">
        <div className="contact-shape" style={{ zIndex: 1 }}>
          <img
            title="Microcode Software"
            src="static/img/illustration/14.png"
            alt="Img Not Found"
          />
        </div>
        <div className="container">
          <div className="row align-center">
            <div className="contact-stye-one col-lg-5 mb-md-50 mb-xs-40">
              <div className="contact-style-one-info">
                <h4 className="sub-title">Get in Touch Today</h4>
                <h2>Your Success Is Just a Click Away</h2>
                <p>
                  Get in touch with us today for expert support and customize
                  solutions designed to fit your unique needs. Let’s collaborate
                  to turn your goals into reality!
                </p>
                <ul>
                  <li className="wow fadeInUp" data-wow-delay="300ms">
                    <div className="icon">
                      <i className="fas fa-phone-alt"></i>
                    </div>
                    <div className="content">
                      <h5 className="title">Contact Number</h5>
                      <p>
                        <a href="tel:+911142233502">+91-114-223-3502</a>
                      </p>
                      <p>
                        <a href="tel:+918882581143">+91-888-258-1143</a>
                      </p>
                      <p>
                        <a href="tel:+18444170888">+1-844-417-0888</a>
                      </p>

                    </div>
                  </li>
                  <li className="wow fadeInUp" data-wow-delay="300ms">
                    <div className="icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="info">
                      <h5 className="title">Our Location</h5>
                      <p>Delhi, India</p>
                      <p>Texas, USA</p>
                    </div>
                  </li>
                  <li className="wow fadeInUp" data-wow-delay="500ms">
                    <div className="icon">
                      <i className="fas fa-envelope-open-text"></i>
                    </div>
                    <div className="info">
                      <h5 className="title">Official Email</h5>
                      <p>
                        {" "}
                        <a href="mailto:contact@microcode.email">
                          contact@microcode.email
                        </a>
                      </p>
                      <p>
                        <a href="mailto:info@microcodesoftware.com">
                          info@microcodesoftware.com
                        </a>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="contact-stye-one col-lg-7 pl-60 pl-md-15 pl-xs-15">
              <div className="contact-form-style-one">
                <h2 className="heading">Send us a Message</h2>
                <form>
                  <div className="row">
                    <div className="col-lg-6">
                      {errors && errors.name && (
                        <div style={{ color: "red" }}>{errors.name}</div>
                      )}
                      <div className="form-group">
                        <input
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      {errors && errors.mobile && (
                        <div style={{ color: "red" }}>{errors.mobile}</div>
                      )}
                      <div className="form-group">
                        <PhoneInput
                          country={"in"}
                          value={mobile}
                          onChange={(value) => setMobile(value)}
                          inputClass="form-control"
                          inputStyle={{ width: "100%" }}
                          containerStyle={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      {errors && errors.email && (
                        <div style={{ color: "red" }}>{errors.email}</div>
                      )}
                      <div className="form-group position-relative">
                        <input
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Email*"
                          type="text"
                          value={email}
                          onChange={(e) => handleEmail(e.target.value)}
                          style={{ paddingRight: 100 }}
                        />
                        {email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !openOtp && !otpSuccess && (
                          <span
                            className="position-absolute end-0 text-primary"
                            style={{ top: 11, right: 10, cursor: "pointer" }}
                            onClick={handleSendOtp}
                          >
                            {timer > 0 ? `Resend OTP in ${formatTime(timer)}` : "Verify Email"}
                          </span>
                        )}

                        {openOtp && (
                          <div className="text-center">
                            <div className="d-flex align-items-center justify-content-around gap-2 my-4">
                              {/* OTP Inputs */}
                              <div className="d-flex gap-2">
                                {otpDigits.map((digit, index) => (
                                  <input
                                    key={index}
                                    ref={otpRefs.current[index]}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleOtpInput(e, index)}
                                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                    className="form-control text-center m-0"
                                    style={{ width: "40px", height: "40px", fontSize: "18px" }}
                                  />
                                ))}
                              </div>

                              {/* ✅ Verify OTP Button beside inputs */}
                              <button
                                type="button"

                                onClick={() => handleVerifyOtp(otpDigits.join(""))}
                                disabled={otpDigits.join("").length !== 6}
                              >
                                Verify OTP
                              </button>
                            </div>

                            {/* 🔁 Resend Button below */}
                            <span
                              type="button"

                              onClick={handleSendOtp}
                              disabled={timer > 0}
                            >
                              {timer > 0 ? `Resend OTP in ${formatTime(timer)}` : "Resend OTP"}
                            </span>
                          </div>
                        )}
                        {/* {otpSuccess && <p className="text-success mt-2">{otpSuccessMessage}</p>} */}

                      </div>
                    </div>


                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      {errors && errors.description && (
                        <div style={{ color: "red" }}>{errors.description}</div>
                      )}
                      <div className="form-group comments">
                        <textarea
                          className="form-control"
                          id="comments"
                          name="comments"
                          placeholder="Tell Us About Project *"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="position-relative" style={{ zIndex: 2 }}>
                    <ReCAPTCHA
                      sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY_LOCAL}
                      onChange={onChange}
                      ref={recaptchaRef} // Assign the ref here
                    />
                    {errors.verification && (
                      <div style={{ color: "red" }}>{errors.verification}</div>
                    )}
                    {/* {verified && (
                      <div className="verified-label">
                        ✔ Verified by reCAPTCHA
                      </div>
                    )} */}
                  </div>

                  <div className="row mt-4">
                    <div className="col-lg-12">
                      <button
                        onClick={submit_ContactForm}
                        type="submit"
                        name="submit"
                        id="submit"
                      >
                        <i className="fa fa-paper-plane" /> Get in Touch
                      </button>
                    </div>
                  </div>

                  {/* Alert Message */}
                  {showMessage && (
                    <div
                      className="overlay_message_curd_1_my"
                      style={{
                        borderLeftColor: successMessage ? "#50d050" : "#f44336",
                        animation:
                          "slideIn 0.5s ease forwards, fadeOut 0.5s ease 2.5s forwards",
                      }}
                    >
                      <div className="content_1_my">
                        <div
                          className="icon-circle"
                          style={{
                            borderColor: successMessage ? "#50d050" : "#f44336",
                            color: successMessage ? "#50d050" : "#f44336",
                          }}
                        >
                          {successMessage ? (
                            <i className="fa fa-check"></i>
                          ) : (
                            <i className="fa fa-times"></i>
                          )}
                        </div>
                        <p className="message-type_1_my">
                          {successMessage ? successMessage : error}
                        </p>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ContactUsForm;