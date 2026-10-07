import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRequestHandler } from "../../apiConfig/service";
import { toast } from "react-toastify";
// import 'bootstrap/dist/css/bootstrap.min.css';

const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("clicking ");
        console.log(email, password);

        const res = await apiRequestHandler({
            method: "POST",
            endPoint: "userLogin", // Endpoint defined in ApiConfig as /auth/user-login
            data: { email, password },
        });

        if (res?.success) {
            localStorage.setItem("token", res?.data?.token);
            localStorage.setItem("name", res?.data?.user?.name);
            toast.success(res?.message);
            navigate("/pricing"); // Redirect to user dashboard
        } else {
            toast.error(res?.message || "Login failed");
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
                            alt="Login Visual"
                        />
                    </div>
                    <div
                        className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 bg-white shadow p-5 rounded-4"
                        style={{
                            borderRadius:"20px"
                        }}

                    >

                        <h3 className="text-center mb-4 fw-bold text-primary">
                            User Login
                        </h3>
                        <form onSubmit={handleLogin}>
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

                            <div className="form-floating mb-4">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="floatingPassword"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <small className="text-muted">
                                    <Link to="/forgot-password" className="text-primary">
                                        Forgot Password?
                                    </Link>
                                </small>
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg w-100">
                                Login
                            </button>

                            <div className="text-center mt-3">
                                <small className="text-muted">
                                    Don't have an account?{" "}
                                    <Link to="/user-registration" className="text-primary">
                                        Sign up
                                    </Link>
                                </small>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserLogin;