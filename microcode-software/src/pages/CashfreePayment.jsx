// âœ… FULL React + Cashfree Integration Using SDK (v3)

// ðŸ“ src/components/CashfreePayment.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { load } from '@cashfreepayments/cashfree-js';

const CashfreePayment = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        amount: ''
    });

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handlePayment = async () => {
        setLoading(true);
        setErrorMsg('');

        try {
            const res = await axios.post('http://localhost:3300/payment/createCashfreeOrder', formData);
            console.log(res)
            const sessionId = res.data?.data?.payment_session_id;
            const order_id = res.data?.data?.order_id

            const cashfree = await load({ mode: 'sandbox' });

         const checkoutOptions = {
  paymentSessionId: sessionId,
  returnUrl: `http://localhost:3000/success?order_id=${order_id}`
};

            const result = await cashfree.checkout(checkoutOptions);

            if (result.error) {
                setErrorMsg(result.error.message);
            }
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-body p-4">
                            <h3 className="text-center mb-4 text-primary">ðŸ’³ Cashfree Payment</h3>

                            <div className="mb-3">
                                <label className="form-label">Full Name</label>
                                <input type="text" className="form-control" name="name" placeholder="John Doe"
                                    value={formData.name} onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input type="email" className="form-control" name="email" placeholder="you@example.com"
                                    value={formData.email} onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Phone Number</label>
                                <input type="text" className="form-control" name="phone" placeholder="9876543210"
                                    value={formData.phone} onChange={handleChange} required />
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Amount (INR)</label>
                                <input type="number" className="form-control" name="amount" placeholder="1000"
                                    value={formData.amount} onChange={handleChange} required />
                            </div>

                            <div className="d-grid">
                                <button onClick={handlePayment} disabled={loading} className="btn btn-primary btn-lg">
                                    {loading ? 'Processing...' : 'Pay Now'}
                                </button>
                            </div>

                            {errorMsg && (
                                <div className="alert alert-danger mt-3" role="alert">
                                    {errorMsg}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CashfreePayment;
