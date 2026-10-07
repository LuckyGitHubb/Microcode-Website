// File: src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequestHandler } from "../../apiConfig/service";
import { toast } from "react-toastify";
// import 'bootstrap/dist/css/bootstrap.min.css';

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    console.log("clicking ");
    e.preventDefault();
    const res = await apiRequestHandler({
      method: "POST",
      endPoint: "adminLogin",
      data: { email, password },
    });
    // console.log("res===> ",res)
    if(res?.success){
      localStorage.setItem("token",res?.data?.token);
      localStorage.setItem("user",res?.data?.user);
      toast.success(res?.message);
      navigate("/admin/dashboard");
    }
    else{
      toast.error(res?.message);
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
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 shadow p-5 bg-white rounded-4">
            <h3 className="text-center mb-4 fw-bold text-primary">
              Admin Login
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
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <small className="text-muted">
                  Use: admin@microcode.com / admin123
                </small>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-100">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
