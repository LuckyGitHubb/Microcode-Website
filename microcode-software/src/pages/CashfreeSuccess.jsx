'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import AboutNavBar from '../components/AboutNavBar';

const CashfreeSuccess = () => {
  const [searchParams] = useSearchParams();
  const [statusData, setStatusData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orderId = searchParams.get('order_id');
    if (!orderId) {
      setErrorMsg('Order ID not found in URL.');
      setLoading(false);
      return;
    }

    const fetchPaymentStatus = async () => {
      try {
        const res = await axios.get(`https://www.ns6.microcodepgmt.com/payment/verifyCashfreeOrder?order_id=${orderId}`);
        // const res = await axios.get(`http://localhost:3300/payment/verifyCashfreeOrder?order_id=${orderId}`);
        const data = res.data.data;
        setStatusData(data);
      } catch (err) {
        setErrorMsg(err.response?.data?.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentStatus();
  }, [searchParams]);

  const downloadInvoice = (data) => {
    const invoiceWindow = window.open('', '_blank');
    invoiceWindow.document.write(`
      <html>
      <head>
        <title>Invoice - ${data?.orderId}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h2 {
            color: #155724;
            background-color: #d4edda;
            padding: 10px;
            border-radius: 6px;
          }
          .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 30px;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
            font-size: 16px;
            line-height: 24px;
            color: #555;
          }
          table {
            width: 100%;
            text-align: left;
          }
          table td { padding: 5px; vertical-align: top; }
          .heading td { background: #eee; border-bottom: 1px solid #ddd; font-weight: bold; }
          .item td { border-bottom: 1px solid #eee; }
          .total td:nth-child(2) { border-top: 2px solid #eee; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="invoice-box">
          <h2>âœ… Payment Invoice</h2>
          <table>
            <tr>
              <td>
                <strong>Order ID:</strong> ${data?.orderId}<br/>
                <strong>Payment ID:</strong> ${data?.paymentDetails?.paymentId || 'N/A'}<br/>
                <strong>Status:</strong> ${data?.orderStatus}<br/>
                <strong>Date:</strong> ${new Date(data?.createdAt).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Customer:</strong><br/>
                ${data?.customerDetails?.customerName}<br/>
                ${data?.customerDetails?.customerEmail}<br/>
                ${data?.customerDetails?.customerPhone}
              </td>
            </tr>
          </table>
          <br/>
          <table>
            <tr class="heading">
              <td>Service</td>
              <td>Plan</td>
              <td>Price</td>
            </tr>
            ${data?.cartItems
              ?.map(
                (item) => `
              <tr class="item">
                <td>${item.category}</td>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
              </tr>`
              )
              .join('')}
            <tr class="total">
              <td colspan="2"></td>
              <td>Total: $${data?.orderAmount.toFixed(2)}</td>
            </tr>
          </table>
        </div>
      </body>
      </html>
    `);
    invoiceWindow.document.close();
    invoiceWindow.print();
  };

  if (loading) return <div className="text-center py-5">Loading payment details...</div>;
  if (errorMsg) return <div className="alert alert-danger m-5">{errorMsg}</div>;

  return (
    <div>
      <AboutNavBar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg">
              <div className="card-body">
                <h2 className="text-success text-center">âœ… Payment Successful</h2>
                <button
                  onClick={() => downloadInvoice(statusData)}
                  className="btn btn-outline-success mt-4 w-100"
                >
                  ðŸ“„ Download Invoice
                </button>
                <p className="text-center">Thank you for your payment.</p>
                <hr />
                <h5>Order Summary:</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><strong>Status:</strong> {statusData?.orderStatus}</li>
                  <li className="list-group-item"><strong>Amount:</strong> ${statusData?.orderAmount}</li>
                  <li className="list-group-item"><strong>Payment ID:</strong> {statusData?.orderId}</li>
                  <li className="list-group-item"><strong>Method:</strong> Cashfree</li>
                  <li className="list-group-item">
                    <strong>Time:</strong>{' '}
                    {new Date(statusData?.updatedAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </li>
                  <li className="list-group-item"><strong>Service:</strong> Cashfree</li>
                  <li className="list-group-item">
                    <strong>Items:</strong>
                    <ul className="mt-2">
                      {statusData?.cartItems?.map((item, index) => (
                        <li key={item._id || index}>
                          <strong>{item.category}</strong> â€” {item.name} @ ${item.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CashfreeSuccess;
