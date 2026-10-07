// ✅ WORKING CART PAGE IMPLEMENTATION
// File: src/pages/CartPage.jsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useState } from "react";
// import CheckoutModal from "../components/CheckoutModal";


const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-5">
        {cartItems.length === 0 ? (
          <div className="text-center py-5">
            <h4 className="mb-3">🛒 Your cart is empty</h4>
            <p className="text-muted mb-4">
              Purchase some services from our <strong>Pricing & Plans</strong> page to get started.
            </p>
            <Link to="/pricing" className="btn btn-primary px-4">
              Go to Pricing & Plans
            </Link>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-8">
              <h3 className="fw-bold mb-4">PRODUCTS</h3>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-center align-items-center mb-4 p-3 bg-white shadow-sm rounded border"
                >
                  <div className="flex-grow-1">
                    <h4 className="fw-semibold text-success mb-1">{item.name}</h4>
                    <span className="badge bg-light text-dark small mb-2">
                      {item.category}
                    </span>
                  </div>
                  <div className="d-flex flex-column align-items-end">
                    <div className="d-flex align-items-center">
                      <h5 className="fw-bold text-dark m-0 me-3">
                        ${item.price.toFixed(2)}<small>/pm</small>
                      </h5>

                      <div
                        style={{
                          borderLeft: "1px solid rgb(191 193 196)",
                          height: "52px",
                          marginRight: "14px"
                        }}
                      ></div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        title="Remove item"
                        style={{
                          color: "#dc3545",
                          fontSize: "1.2rem",
                          border: "none",
                          background: "transparent"
                        }}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            <div className="col-md-4">
              <div className="bg-white border p-4 rounded shadow-sm cart-section">
                <h4 className="fw-bold mb-3">CART TOTALS</h4>

                <div className="mb-3">
                  {/* <label htmlFor="coupon" className="form-label">
                    Add a coupon
                  </label> */}
                  <div className="accordion mb-3" id="couponAccordion">
                    <div className="accordion-item border-0 ">
                      <h2 className="accordion-header" id="headingCoupon">
                        <button
                          className="accordion-button collapsed px-0"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseCoupon"
                          aria-expanded="false"
                          aria-controls="collapseCoupon"
                        >
                          Have a coupon?
                        </button>
                      </h2>
                      <div
                        id="collapseCoupon"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingCoupon"
                        data-bs-parent="#couponAccordion"
                      >
                        <div className="accordion-body px-0">
                          {/* <label htmlFor="coupon" className="form-label">
                            Enter coupon code
                          </label> */}
                          <div className="d-flex">
                            <input
                              type="text"
                              className="form-control me-2"
                              id="coupon"
                              placeholder="Enter coupon code"
                            />
                            <button className="btn btn-outline-primary">Apply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery</span>
                  <span className="fw-bold">FREE</span>
                </div>

                {/* <p className="text-muted small mb-2">
                  Delivers to <strong>UTTAR PRADESH, INDIA</strong>
                </p> */}

                <div className="d-flex justify-content-between border-top pt-3 mt-3 fw-bold">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <button className="btn  w-100 mt-4 py-2 fw-bold"  onClick={() => navigate("/checkout")}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default CartPage;
