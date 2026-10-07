import React, { useState } from "react";
import { useCart } from "../context/cartContext";
import AboutNavBar from "../components/AboutNavBar";
import Footer from "../components/Footer";
import PhoneInput from "react-phone-input-2";
import { apiRequestHandler } from "../apiConfig/service";
import { load } from "@cashfreepayments/cashfree-js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const countries = ["India", "United States", "Canada", "United Kingdom", "Australia"];

const CheckoutPage = () => {
    const { cartItems } = useCart();
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        country: "India",
        billingFirstName: "",
        billingLastName: "",
        billingAddress: "",
        permanentFirstName: "",
        permanentLastName: "",
        permanentAddress: "",
        sameAsBilling: false,
    });

    const [errors, setErrors] = useState({});
    const [submissionError, setSubmissionError] = useState("");

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return "Email is required";
        if (!emailRegex.test(email)) return "Invalid email format";
        return "";
    };

    const validatePhone = (phone) => {
        if (!phone) return "Phone number is required";
        if (phone.length < 10) return "Phone number must be at least 10 digits";
        return "";
    };

    const validateName = (name, field) => {
        const nameRegex = /^[A-Za-z]+$/;
        if (!name) return `${field} is required`;
        if (name.length < 2) return `${field} must be at least 2 characters`;
        if (!nameRegex.test(name)) return `${field} must contain only letters`;
        return "";
    };

    const validateAddress = (address, field) => {
        if (!address) return `${field} is required`;
        if (address.length < 10) return `${field} must be at least 10 characters`;
        return "";
    };

    const validateForm = () => {
        const newErrors = {};

        // Validate email
        newErrors.email = validateEmail(formData.email);

        // Validate phone
        newErrors.phone = validatePhone(formData.phone);

        // Validate country (ensure it's not empty)
        if (!formData.country) newErrors.country = "Country is required";

        // Validate billing address fields
        newErrors.billingFirstName = validateName(formData.billingFirstName, "Billing First Name");
        newErrors.billingLastName = validateName(formData.billingLastName, "Billing Last Name");
        newErrors.billingAddress = validateAddress(formData.billingAddress, "Billing Address");

        // Validate permanent address fields if not same as billing
        if (!formData.sameAsBilling) {
            newErrors.permanentFirstName = validateName(formData.permanentFirstName, "Permanent First Name");
            newErrors.permanentLastName = validateName(formData.permanentLastName, "Permanent Last Name");
            newErrors.permanentAddress = validateAddress(formData.permanentAddress, "Permanent Address");
        }

        setErrors(newErrors);

        // Return true if there are no errors
        return !Object.values(newErrors).some((error) => error);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "sameAsBilling") {
            setFormData((prev) => ({
                ...prev,
                sameAsBilling: checked,
                permanentFirstName: checked ? prev.billingFirstName : prev.permanentFirstName,
                permanentLastName: checked ? prev.billingLastName : prev.permanentLastName,
                permanentAddress: checked ? prev.billingAddress : prev.permanentAddress,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        }

        // Validate the field on change
        const newErrors = { ...errors };
        if (name === "email") newErrors.email = validateEmail(value);
        if (name === "phone") newErrors.phone = validatePhone(value);
        if (name === "billingFirstName") newErrors.billingFirstName = validateName(value, "Billing First Name");
        if (name === "billingLastName") newErrors.billingLastName = validateName(value, "Billing Last Name");
        if (name === "billingAddress") newErrors.billingAddress = validateAddress(value, "Billing Address");
        if (name === "permanentFirstName" && !formData.sameAsBilling) {
            newErrors.permanentFirstName = validateName(value, "Permanent First Name");
        }
        if (name === "permanentLastName" && !formData.sameAsBilling) {
            newErrors.permanentLastName = validateName(value, "Permanent Last Name");
        }
        if (name === "permanentAddress" && !formData.sameAsBilling) {
            newErrors.permanentAddress = validateAddress(value, "Permanent Address");
        }
        setErrors(newErrors);
    };

    const handlePhoneChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            phone: value,
        }));
        const newErrors = { ...errors };
        newErrors.phone = validatePhone(value);
        setErrors(newErrors);
    };

    const handleSubmit = async () => {
        if(!localStorage.getItem("token")){
            toast.error("Please login first")
            navigate("/user-login")
            return;
            
        }
        if (!validateForm()) {
            setSubmissionError("Please fix the errors in the form before submitting.");
            return;
        }

        setSubmissionError(""); // Clear any previous submission errors

        try {
            const res = await apiRequestHandler({
                method: "POST",
                endPoint: "createCashfreeOrder",
                data: {
                    name: formData.permanentFirstName + " " + formData.permanentLastName,
                    email: formData.email,
                    phone: formData.phone,
                    amount: subtotal,
                    billingAddress: {
                        firstName: formData.billingFirstName,
                        lastName: formData.billingLastName,
                        address: formData.billingAddress,
                        country: formData.country,
                    },
                    shippingAddress: {
                        firstName: formData.permanentFirstName,
                        lastName: formData.permanentLastName,
                        address: formData.permanentAddress,
                        country: formData.country,
                    },
                    cartItems,
                },
            });

            if (res?.success) {
                const sessionId = res?.data?.payment_session_id;
                const order_id = res?.data?.order_id;
                const cashfree = await load({ mode: "production" });

                const checkoutOptions = {
                    paymentSessionId: sessionId,
                    // returnUrl: `http://localhost:3000/success?order_id=${order_id}`,
                    returnUrl: `https://microcodesoftware.com/success?order_id=${order_id}`,
                };

                const result = await cashfree.checkout(checkoutOptions);

                if (result.error) {
                    setSubmissionError(result.error.message);
                }
            }
        } catch (error) {
            setSubmissionError("An error occurred during payment processing. Please try again.");
        }
    };

    return (
        <div>
            <AboutNavBar />
            <div className="container py-5">
                <div className="row">
                    {/* LEFT FORM */}
                    <div className="col-md-7 mb-4">
                        <h3 className="mb-4 fw-bold">Checkout Information</h3>

                        {/* Contact Info */}
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="mb-3 checkout">
                            <label className="form-label">Phone Number</label>
                            <div className="form-group">
                                <PhoneInput
                                    country={"in"}
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    inputStyle={{ width: "100%", border: errors.phone ? "1px solid #dc3545" : "" }}
                                    containerStyle={{ width: "100%" }}
                                />
                                {errors.phone && <div className="text-danger small">{errors.phone}</div>}
                            </div>
                        </div>

                        {/* Billing Address */}
                        <h5 className="mt-4 fw-semibold">Billing Address</h5>
                        <div className="mb-3">
                            <label className="form-label">Country</label>
                            <select
                                className={`form-select ${errors.country ? "is-invalid" : ""}`}
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                            >
                                {countries.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                            {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                        </div>

                        <div className="mb-3 d-flex gap-2">
                            <div className="w-100">
                                <input
                                    type="text"
                                    className={`form-control ${errors.billingFirstName ? "is-invalid" : ""}`}
                                    placeholder="First Name"
                                    name="billingFirstName"
                                    value={formData.billingFirstName}
                                    onChange={handleChange}
                                />
                                {errors.billingFirstName && (
                                    <div className="invalid-feedback">{errors.billingFirstName}</div>
                                )}
                            </div>
                            <div className="w-100">
                                <input
                                    type="text"
                                    className={`form-control ${errors.billingLastName ? "is-invalid" : ""}`}
                                    placeholder="Last Name"
                                    name="billingLastName"
                                    value={formData.billingLastName}
                                    onChange={handleChange}
                                />
                                {errors.billingLastName && (
                                    <div className="invalid-feedback">{errors.billingLastName}</div>
                                )}
                            </div>
                        </div>

                        <div className="mb-3">
                            <textarea
                                rows="3"
                                className={`form-control ${errors.billingAddress ? "is-invalid" : ""}`}
                                placeholder="Billing Address"
                                name="billingAddress"
                                value={formData.billingAddress}
                                onChange={handleChange}
                            ></textarea>
                            {errors.billingAddress && (
                                <div className="invalid-feedback">{errors.billingAddress}</div>
                            )}
                        </div>

                        {/* Permanent Address */}
                        <h5 className="mt-4 fw-semibold">Permanent Address</h5>

                        <div className="form-check mb-3">
                            <input
                                className="form-check-input"
                                style={{ minHeight: "20px" }}
                                type="checkbox"
                                id="sameAsBilling"
                                name="sameAsBilling"
                                checked={formData.sameAsBilling}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="sameAsBilling">
                                Same as Billing Address
                            </label>
                        </div>

                        <div className="mb-3 d-flex gap-2">
                            <div className="w-100">
                                <input
                                    type="text"
                                    className={`form-control ${errors.permanentFirstName ? "is-invalid" : ""}`}
                                    placeholder="First Name"
                                    name="permanentFirstName"
                                    value={formData.permanentFirstName}
                                    onChange={handleChange}
                                    disabled={formData.sameAsBilling}
                                />
                                {errors.permanentFirstName && (
                                    <div className="invalid-feedback">{errors.permanentFirstName}</div>
                                )}
                            </div>
                            <div className="w-100">
                                <input
                                    type="text"
                                    className={`form-control ${errors.permanentLastName ? "is-invalid" : ""}`}
                                    placeholder="Last Name"
                                    name="permanentLastName"
                                    value={formData.permanentLastName}
                                    onChange={handleChange}
                                    disabled={formData.sameAsBilling}
                                />
                                {errors.permanentLastName && (
                                    <div className="invalid-feedback">{errors.permanentLastName}</div>
                                )}
                            </div>
                        </div>

                        <div className="mb-3">
                            <textarea
                                rows="3"
                                className={`form-control ${errors.permanentAddress ? "is-invalid" : ""}`}
                                placeholder="Permanent Address"
                                name="permanentAddress"
                                value={formData.permanentAddress}
                                onChange={handleChange}
                                disabled={formData.sameAsBilling}
                            ></textarea>
                            {errors.permanentAddress && (
                                <div className="invalid-feedback">{errors.permanentAddress}</div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT CART TOTAL */}
                    <div className="col-md-5">
                        <div className="bg-white border rounded shadow-sm p-4">
                            <h4 className="fw-bold mb-3">Cart Summary</h4>

                            <ul className="list-group mb-3">
                                {cartItems.map((item) => (
                                    <li
                                        key={item.id}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        <div>
                                            <strong>{item.name}</strong>
                                            <br />
                                            <small className="text-muted">{item.category}</small>
                                        </div>
                                        <span>${item.price.toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="d-flex justify-content-between mb-2">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Delivery</span>
                                <span className="fw-bold">FREE</span>
                            </div>
                            <div className="d-flex justify-content-between border-top pt-3 mt-3 fw-bold">
                                <span>Total</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>

                            {submissionError && (
                                <div className="text-danger mt-3">{submissionError}</div>
                            )}

                            <button
                                className="btn btn-success w-100 mt-4 py-2 fw-bold"
                                onClick={handleSubmit}
                            >
                                Confirm & Pay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CheckoutPage;