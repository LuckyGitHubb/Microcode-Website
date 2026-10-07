import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import { apiRequestHandler } from "../../apiConfig/service";
import { toast } from "react-toastify";

const UserRegistration = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        const { name, email, phone, password } = values;

        const res = await apiRequestHandler({
            method: "POST",
            endPoint: "registerUser",
            data: { name, email, phone, password },
        });

        if (res?.success) {
            toast.success(res?.message);
            localStorage.setItem("otpSource", "registration");
            localStorage.setItem("emailForOtp", email); // Store email for OTP resend
            navigate("/verify-otp");
        } else {
            toast.error(res?.message || "Registration failed");
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, "Name must be at least 3 characters")
            .required("Name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        phone: Yup.string()
            .required("Phone number is required")
            .matches(/^\+?[1-9]\d{1,14}$/, "Phone number must be a valid international format"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm password is required"),
    });

    return (
        <section className="p-5 bg-light">
            <div className="container">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-6 col-xl-5">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid"
                            alt="Register Visual"
                        />
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 shadow p-5 bg-white rounded-4">
                        <h3 className="text-center mb-4 fw-bold text-primary">
                            User Registration
                        </h3>

                        <Formik
                            initialValues={{
                                name: "",
                                email: "",
                                phone: "",
                                password: "",
                                confirmPassword: "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ setFieldValue, errors, touched, values }) => (
                                <Form>
                                    <div className="form-floating mb-4">
                                        <Field
                                            type="text"
                                            className="form-control"
                                            id="floatingName"
                                            placeholder="Enter your name"
                                            name="name"
                                        />
                                        <label htmlFor="floatingName">Full Name</label>
                                        <ErrorMessage
                                            name="name"
                                            component="div"
                                            className="text-danger small"
                                        />
                                    </div>

                                    <div className="form-floating mb-4">
                                        <Field
                                            type="email"
                                            className="form-control"
                                            id="floatingEmail"
                                            placeholder="Enter your email"
                                            name="email"
                                        />
                                        <label htmlFor="floatingEmail">Email address</label>
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="text-danger small"
                                        />
                                    </div>

                                    <div className="mb-3 checkout">
                                        <label className="form-label">Phone Number</label>
                                        <PhoneInput
                                            country={"in"}
                                            value={values.phone}
                                            onChange={(value) => setFieldValue("phone", value)}
                                            inputStyle={{
                                                width: "100%",
                                                border:
                                                    errors.phone && touched.phone
                                                        ? "1px solid #dc3545"
                                                        : "",
                                            }}
                                            containerStyle={{ width: "100%" }}
                                        />
                                        <ErrorMessage
                                            name="phone"
                                            component="div"
                                            className="text-danger small"
                                        />
                                    </div>

                                    <div className="form-floating mb-4">
                                        <Field
                                            type="password"
                                            className="form-control"
                                            id="floatingPassword"
                                            placeholder="Enter your password"
                                            name="password"
                                            autoComplete="new-password"
                                        />
                                        <label htmlFor="floatingPassword">Password</label>
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="text-danger small"
                                        />
                                    </div>

                                    <div className="form-floating mb-4">
                                        <Field
                                            type="password"
                                            className="form-control"
                                            id="floatingConfirmPassword"
                                            placeholder="Confirm your password"
                                            name="confirmPassword"
                                            autoComplete="new-password"
                                        />
                                        <label htmlFor="floatingConfirmPassword">
                                            Confirm Password
                                        </label>
                                        <ErrorMessage
                                            name="confirmPassword"
                                            component="div"
                                            className="text-danger small"
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-lg w-100">
                                        Register
                                    </button>

                                    <div className="mt-3 text-center">
                                        <small>
                                            Already have an account?{" "}
                                            <Link to="/user-login" className="text-primary">
                                                Sign In
                                            </Link>
                                        </small>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserRegistration;