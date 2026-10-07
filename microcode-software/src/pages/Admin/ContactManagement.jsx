import React, { useState, useEffect } from 'react';
import { FaEye, FaSearch } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { apiRequestHandler } from '../../apiConfig/service';
import { formatDate } from '../../utils/formatedDate';
const getAllContacts=async(endPoint,token)=>{
const res=await apiRequestHandler({endPoint,headers:{Authorization: `Bearer ${token}`}});
return res?.data
}
const ContactManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const navigate = useNavigate();
  const contactsPerPage = 9;
 useEffect(()=>{
  getAllContacts("getContactFormData",localStorage.getItem("token")).then(res=>{setContacts(res||[])})
  },[])
  
 useEffect(() => {
  if (!Array.isArray(contacts)) {
    setFilteredContacts([]);
    return;
  }

  const filtered = contacts.filter(contact =>
    contact?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  setFilteredContacts(filtered);
  setCurrentPage(1);
}, [searchTerm, contacts]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

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

  const handleViewClick = (contact) => {
    setSelectedContact(contact);
    setShowViewModal(true);
  };

  const trimText = (text, maxLength = 50) => {
    if (!text) return 'N/A';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  console.log('hi')

  return (
    <div style={{ minHeight: '100vh', padding: '20px', background: '#f5f7fa' }}>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '20px' }}>
          <h4 style={{ margin: 0 }}>Contact Management</h4>
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
            placeholder="Search by name or email..."
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
                <th style={{ ...thStyle, borderRight: '1px solid #eee', borderBottom: '1px solid #ccc' }}>Name</th>
                <th style={{ ...thStyle, borderRight: '1px solid #eee', borderBottom: '1px solid #ccc' }}>Email</th>
                <th style={{ ...thStyle, borderRight: '1px solid #eee', borderBottom: '1px solid #ccc' }}>Description</th>
                <th style={{ ...thStyle, borderRight: '1px solid #eee', borderBottom: '1px solid #ccc' }}>Created At</th>
                <th style={{ ...thStyle, borderBottom: '1px solid #ccc' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentContacts.length > 0 ? (
                currentContacts.map((contact, index) => (
                  <tr key={contact._id}>
                    <td style={{ ...tdStyle, borderRight: '1px solid #eee' }}>{indexOfFirstContact + index + 1}</td>
                    <td style={{ ...tdStyle, borderRight: '1px solid #eee' }}>{trimText(contact.name)}</td>
                    <td style={{ ...tdStyle, borderRight: '1px solid #eee' }}>{trimText(contact.email)}</td>
                    <td style={{ ...tdStyle, borderRight: '1px solid #eee', maxWidth: '200px' }}>{trimText(contact.description)}</td>
                    <td style={{ ...tdStyle, borderRight: '1px solid #eee' }}>{formatDate(contact.createdAt)}</td>
                    <td style={tdStyle}>
                      <FaEye
                        title="View"
                        style={{ color: '#00bfa5', cursor: 'pointer' }}
                        onClick={() => handleViewClick(contact)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                    No Contacts Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', fontSize: '13px', color: '#333' }}>
          <div>
            <strong>Showing {indexOfFirstContact + 1} to {Math.min(indexOfLastContact, filteredContacts.length)} of {filteredContacts.length} entries</strong>
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
          <Modal.Title>Contact Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedContact && (
            <div>
              <div>
                <div style={modalStyle.label}>Name</div>
                <div style={modalStyle.value}>{selectedContact.name || 'N/A'}</div>
              </div>
              <div>
                <div style={modalStyle.label}>Email</div>
                <div style={modalStyle.value}>{selectedContact.email || 'N/A'}</div>
              </div>
              <div>
                <div style={modalStyle.label}>Mobile</div>
                <div style={modalStyle.value}>{selectedContact.mobile || 'N/A'}</div>
              </div>
              <div>
                <div style={modalStyle.label}>Description</div>
                <div style={modalStyle.value}>{selectedContact.description || 'N/A'}</div>
              </div>
              <div>
                <div style={modalStyle.label}>Created At</div>
                <div style={modalStyle.value}>{formatDate(selectedContact.createdAt) || 'N/A'}</div>
              </div>
              <div>
                <div style={modalStyle.label}>Updated At</div>
                <div style={modalStyle.value}>{formatDate(selectedContact.updatedAt) || 'N/A'}</div>
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

export default ContactManagement;