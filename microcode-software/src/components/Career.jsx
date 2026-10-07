import React, { useEffect, useRef, useState } from "react";
import "react-phone-input-2/lib/bootstrap.css";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import { addContactAPI } from "../features/AddContactSlice";
import ReCAPTCHA from "react-google-recaptcha";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiRequestHandler } from "../apiConfig/service";


function Career() {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [file, setFile] = useState("");
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
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef(null);

    console.log('files: ', file)

    const handleFileInput = async (e) => {
        console.log("fileInputRef: ",fileInputRef)
        if (loading) return;
        const selectedFile = e.target.files[0];
        console.log('selectedFile: ', selectedFile)
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            setLoading(true)
            const response = await apiRequestHandler({
                method: "POST",
                endPoint: "uploadFile",
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response?.data?.url) {
                setFile(response.data.url); // Store uploaded file URL
            }
        } catch (err) {
            console.error("Upload error:", err);
            toast.error("Failed to upload file");
        }
        finally {
            setLoading(false)
        }
    };



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

    async function submit_ContactForm(e) {
        if (loading) return;
        e.preventDefault();
        const newErrors = {};
        const badInputRegex = /<[^>]*>|[:;]|(script|iframe|onerror|onload|style|img)/i;

        if (!name.trim()) newErrors.name = "Please enter the name";
        // Check for email validity and if OTP has been successfully verified (if applicable)
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email";
        }
        if (!jobTitle.trim()) newErrors.jobTitle = "Please select the job title"

        if (!file) newErrors.file = "Please select a file"

        if (!mobile || mobile.length < 10 || mobile.length > 20)
            newErrors.mobile = "Please enter a valid mobile number";
        if (!description.trim()) {
            newErrors.description = "Please enter the cover letter";
        } else if (badInputRegex.test(description)) {
            newErrors.description = "Cover letter must not contain invalid characters or dangerous content.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        try {
            setLoading(true)
            const res = await apiRequestHandler({
                method: "POST",
                endPoint: "addCareer",
                data: { name, email, mobile, jobTitle, file, coverLetter: description },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (res?.success === true) {
                toast.success(res?.message);
                setShowMessage(true);
                setName("");
                setMobile("");
                setEmail("");
                setDescription("");
                setFile("");
                setJobTitle("");
  fileInputRef.current.value = ""; 
            }
            else {
                toast.error(res?.message);
            }
        } catch (error) {
            toast.error('Something went wrong');
            setVerified(false);
            console.error("Form submission failed:", error);
        }
        finally {
            setLoading(false)
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
                            <img src="static/img/illustration/career-pic.webp" alt="" srcset="" />
                        </div>
                        <div className="contact-stye-one col-lg-7 pl-60 pl-md-15 pl-xs-15">
                            <div className="contact-form-style-one">
                                <h2 className="heading">Apply for the job</h2>
                                <form onSubmit={submit_ContactForm}>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            {errors && errors.name && (
                                                <div style={{ color: "red" }}>{errors.name}</div>
                                            )}
                                            <div className="form-group">
                                                <input
                                                    className="form-control"
                                                    // id="name"
                                                    // name="name"
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
                                                <input
                                                    // country={"in"}
                                                    value={mobile}
                                                    onChange={(e) => setMobile(e.target.value)}
                                                    inputClass="form-control"
                                                    inputStyle={{ width: "100%" }}
                                                    containerStyle={{ width: "100%" }}
                                                    placeholder="Mobile"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            {errors && errors.email && (
                                                <div style={{ color: "red" }}>{errors.email}</div>
                                            )}
                                            <div className="form-group">
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
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            {errors && errors.jobTitle && (
                                                <div style={{ color: "red" }}>{errors.jobTitle}</div>
                                            )}
                                            <div className="form-group">
                                                <select
                                                   
                                                    className="form-control form-select"
                                                    id="jobTitle"
                                                    name="jobTitle"
                                                    placeholder="jobTitle"
                                                    type="text"
                                                    value={jobTitle}
                                                    onChange={(e) => setJobTitle(e.target.value)}>
                                                    <option disabled selected value="">Select Job Title</option>
                                                    <option value="Frontend Developer">Frontend Developer</option>
                                                    <option value="Backend Developer">Backend Developer</option>
                                                    <option value="FullStack Developer">FullStack Developer</option>
                                                    <option value="Graphic Designer">Graphic Designer</option>
                                                    <option value="SEO Specialist">SEO Specialist</option>
                                                    <option value="Performance Marketer">Performance Marketer</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            {errors && errors.file && (
                                                <div style={{ color: "red" }}>{errors.file}</div>
                                            )}
                                            <div className="form-group">
                                                <input
                                                    className="form-control"
                                                    id="file"
                                                    name="file"
                                                    type="file"
                                                    accept=".pdf"
                                                    onChange={handleFileInput}
                                                    ref={fileInputRef}
                                                />
                                            </div>
                                        </div>


                                        <div className="col-lg-12">
                                            {errors && errors.description && (
                                                <div style={{ color: "red" }}>{errors.description}</div>
                                            )}
                                            <div className="form-group comments">
                                                <textarea
                                                    className="form-control"
                                                    id="comments"
                                                    name="comments"
                                                    placeholder="Cover Letter"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row mt-4">
                                        <div className="col-lg-12">
                                            <button type="submit" disabled={loading}>
                                                {loading ? (
                                                    <span><i className="fa fa-spinner fa-spin" /> Submitting...</span>
                                                ) : (
                                                    <span><i className="fa fa-paper-plane" /> Submit</span>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Alert Message */}
                                
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}
export default Career;