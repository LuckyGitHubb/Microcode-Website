import React, { useState, useEffect } from 'react';
import { FaEye, FaSearch } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import { apiRequestHandler } from '../../apiConfig/service';
import { formatDate } from '../../utils/formatedDate';
const getAllTransections=async(endPoint,token)=>{
const res=await apiRequestHandler({endPoint,headers:{Authorization: `Bearer ${token}`}});
return res?.data
}
const TransactionsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const paymentsPerPage = 5;
  useEffect(()=>{
    getAllTransections("getAllTransectionData",localStorage.getItem("token")).then(res=>{setPayments(res||[])})
    
    },[])
  useEffect(() => {
      if (!Array.isArray(payments)) {
    setFilteredPayments([]);
    return;
  }
    const filtered = payments.filter(payment =>
      payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.customerDetails.customerName && payment.customerDetails.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (payment.customerDetails.customerEmail && payment.customerDetails.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredPayments(filtered);
    setCurrentPage(1);
  }, [searchTerm, payments]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);
  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

  const tdStyle = {
    padding: '14px',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    borderBottom: '1px solid #eee',
  };

  const thStyle = {
    padding: '14px',
    fontSize: '14px',
    fontWeight: 600,
    backgroundColor: '#fff',
    borderBottom: '2px solid #f0f0f0',
    textAlign: 'left',
  };

  const modalStyle = {
    label: {
      fontWeight: 600,
      fontSize: '14px',
      marginBottom: '8px',
      color: '#333',
    },
    value: {
      fontSize: '14px',
      color: '#555',
      marginBottom: '16px',
      wordBreak: 'break-word',
    },
  };

  const trimText = (text, maxLength = 50) => {
    if (!text) return 'N/A';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const serializeCartItems = (cartItems) => {
    if (!cartItems || cartItems.length === 0) return 'N/A';
    return cartItems.map(item => `${item.name} (Qty: ${item.quantity})`).join(', ');
  };

  const handleViewClick = (payment) => {
    setSelectedPayment(payment);
    setShowViewModal(true);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', background: '#f5f7fa' }}>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '20px' }}>
          <h4 style={{ margin: 0 }}>Transactions List</h4>
        </div>
        <div style={{ position: 'relative', width: '250px', marginBottom: '20px' }}>
          <FaSearch
            style={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              transform: 'translateY(-50%)',
              color: '#888',
              fontSize: '14px',
            }}
          />
          <input
            type="text"
            placeholder="Search by order ID, name, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 32px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              fontSize: '14px',
            }}
          />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '20px',
            }}
          >
            <thead>
              <tr>
                <th style={{ ...thStyle, borderRight: '1px solid #eee', borderBottom: '1px solid #ccc' }}>Sr No.</th>
                <th style={{ ...thStyle, borderRight: '1px solid #eee', borderBottom: '1px solid #ccc' }}>Order ID</th>
                <th style={{ ...thStyle, borderRight: '1px solid #eee', borderBottom: '1px solid #ccc' }}>Customer Name</th>
                <th style={{ ...thStyle, borderRight: '1px solid #eee', borderBottom: '1px solid #ccc' }}>Customer Email</th>
                <th style={{ ...thStyle, borderRight: '1px solid #eee', borderBottom: '1px solid #ccc' }}>Order Amount</th>
                <th style={{ ...thStyle, borderRight: '1px solid #eee', borderBottom: '1px solid #ccc' }}>Order Status</th>
                <th style={{ ...thStyle, borderRight: '1px solid #eee', borderBottom: '1px solid #ccc' }}>Cart Items</th>
                <th style={{ ...thStyle, borderRight: '1px solid #eee', borderBottom: '1px solid #ccc' }}>Created At</th>
                <th style={{ ...thStyle, borderBottom: '1px solid #ccc' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPayments.length > 0 ? (
                currentPayments.map((payment, index) => (
                  <tr key={payment._id}>
                    <td style={{ ...tdStyle, borderRight: '1px solid #eee' }}>{indexOfFirstPayment + index + 1}</td>
                    <td style={{ ...tdStyle, borderRight: '1px solid #eee' }}>{trimText(payment.orderId)}</td>
                    <td style={{ ...tdStyle, borderRight: '1px solid #eee' }}>{trimText(payment.customerDetails.customerName)}</td>
                    <td style={{ ...tdStyle, borderRight: '1px solid #eee' }}>{trimText(payment.customerDetails.customerEmail)}</td>
                    <td style={{ ...tdStyle, borderRight: '1px solid #eee' }}>{payment.orderAmount} {payment.orderCurrency}</td>
                    <td style={{ ...tdStyle, borderRight: '1px solid #eee' }}>{payment.orderStatus}</td>
                    <td style={{ ...tdStyle, borderRight: '1px solid #eee', maxWidth: '200px' }}>{trimText(serializeCartItems(payment.cartItems))}</td>
                    <td style={{ ...tdStyle, borderRight: '1px solid #eee' }}>{formatDate(payment.createdAt)}</td>
                    <td style={tdStyle}>
                      <FaEye
                        title="View"
                        style={{ color: '#00bfa5', cursor: 'pointer' }}
                        onClick={() => handleViewClick(payment)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                    No Transactions Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', fontSize: '13px', color: '#333' }}>
          <div>
            <strong>Showing {indexOfFirstPayment + 1} to {Math.min(indexOfLastPayment, filteredPayments.length)} of {filteredPayments.length} entries</strong>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: currentPage === i + 1 ? '#00bfa5' : 'transparent',
                  color: currentPage === i + 1 ? '#fff' : '#333',
                  border: '1px solid #00bfa5',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Modal
        show={showViewModal}
        onHide={() => setShowViewModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <div>
              <div>
                <div style={modalStyle.label}>Order ID</div>
                <div style={modalStyle.value}>{selectedPayment?.orderId || 'N/A'}</div>
              </div>
              <div>
                <div style={modalStyle.label}>Order Amount</div>
                <div style={modalStyle.value}>{Number(selectedPayment?.orderAmount).toFixed(2)} {selectedPayment?.orderCurrency}</div>
              </div>
              <div>
                <div style={modalStyle.label}>Order Status</div>
                <div style={modalStyle.value}>{selectedPayment?.orderStatus}</div>
              </div>
              <div>
                <div style={modalStyle.label}>Customer Name</div>
                <div style={modalStyle.value}>{selectedPayment?.customerDetails?.customerName || 'N/A'}</div>
              </div>
              <div>
                <div style={modalStyle.label}>Customer Email</div>
                <div style={modalStyle.value}>{selectedPayment?.customerDetails?.customerEmail || 'N/A'}</div>
              </div>
              <div>
                <div style={modalStyle.label}>Customer Phone</div>
                <div style={modalStyle.value}>{selectedPayment?.customerDetails?.customerPhone || 'N/A'}</div>
              </div>
              <div>
                <div style={modalStyle.label}>Customer ID</div>
                <div style={modalStyle.value}>{selectedPayment?.customerDetails?.customerId || 'N/A'}</div>
              </div>
              <div>
                <div style={modalStyle.label}>Cart Items</div>
                <div style={modalStyle.value}>
                  {selectedPayment?.cartItems && selectedPayment?.cartItems?.length > 0 ? (
                    <ul style={{ paddingLeft: '20px', margin: 0 }}>
                      {selectedPayment?.cartItems.map((item, index) => (
                        <li key={index}>
                          {item?.name} (Category: {item?.category}, Price: {item?.price}, Quantity: {item?.quantity})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    'N/A'
                  )}
                </div>
              </div>
              <div>
                <div style={modalStyle.label}>Verified</div>
                <div style={modalStyle.value}>{selectedPayment?.isVerified ? 'Yes' : 'No'}</div>
              </div>
              <div>
                <div style={modalStyle.label}>Created At</div>
                <div style={modalStyle.value}>{formatDate(selectedPayment.createdAt)}</div>
              </div>
              <div>
                <div style={modalStyle.label}>Updated At</div>
                <div style={modalStyle.value}>{formatDate(selectedPayment.updatedAt)}</div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            style={{
              background: '#00bfa5',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
            onClick={() => setShowViewModal(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TransactionsList;