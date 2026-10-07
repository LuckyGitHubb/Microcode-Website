import React, { useState, useEffect } from 'react';
import { FaEye, FaSearch, FaTrash } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { apiRequestHandler } from '../../apiConfig/service';
import { formatDate } from '../../utils/formatedDate';
import DeleteModal from '../../components/DeleteBlogModal';
import { toast } from 'react-toastify';
import { url } from '../../apiConfig/ApiConfig';
const getAllCareer=async(endPoint,token)=>{
const res=await apiRequestHandler({endPoint,headers:{Authorization: `Bearer ${token}`}});
return res?.career
}
const CareerManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [career, setCareer] = useState([]);
  const [filteredCareer, setFilteredCareer] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [careerToDelete, setCareerToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const careerPerPage = 9;
 useEffect(()=>{
  getAllCareer("allCareer",localStorage.getItem("token")).then(res=>{setCareer(res||[])})
  },[])
  
 useEffect(() => {
  if (!Array.isArray(career)) {
    setFilteredCareer([]);
    return;
  }

  const filtered = career.filter(career =>
    career?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    career?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  setFilteredCareer(filtered);
  setCurrentPage(1);
}, [searchTerm, career]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastCareer = currentPage * careerPerPage;
  const indexOfFirstCareer = indexOfLastCareer - careerPerPage;
  const currentCareer = filteredCareer.slice(indexOfFirstCareer, indexOfLastCareer);
  const totalPages = Math.ceil(filteredCareer.length / careerPerPage);

  // Delete Career ===========================================
  const handleDeleteCareer = async (id) => {
      try {
        console.log(id)
        setIsLoading(true); // Start loading for delete action
        const res = await apiRequestHandler({
          method: 'DELETE',
          endPoint: `${url}/career/delete/${id}`,
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log('rhis is my res: ',res);
        if (res?.success) {
          toast.success(res?.message);
          const updatedCareers = await getAllCareer('allCareer', localStorage.getItem('token'));
          setCareer(updatedCareers || []);
        } else {
          toast.error(res?.message);
        }
      } catch (error) {
        toast.error('Something went wrong');
      } finally {
        setIsLoading(false); // End loading
      }
    };
  // =========================================================

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

  const handleViewClick = (career) => {
    setSelectedCareer(career);
    setShowViewModal(true);
  };

  const trimText = (text, maxLength = 50) => {
    if (!text) return 'N/A';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', background: '#f5f7fa' }}>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '20px' }}>
          <h4 style={{ margin: 0 }}>Career Management</h4>
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
              {currentCareer.length > 0 ? (
                currentCareer.map((career, index) => (
                  <tr key={career._id}>
                    <td style={{ ...tdStyle, borderRight: '1px solid #eee' }}>{indexOfFirstCareer + index + 1}</td>
                    <td style={{ ...tdStyle, borderRight: '1px solid #eee' }}>{trimText(career.name)}</td>
                    <td style={{ ...tdStyle, borderRight: '1px solid #eee' }}>{trimText(career.email)}</td>
                    <td style={{ ...tdStyle, borderRight: '1px solid #eee' }}>{trimText(career.jobTitle)}</td>
                    <td style={{ ...tdStyle, borderRight: '1px solid #eee' }}>{career.createdAt}</td>
                    <td style={tdStyle}>
                      <FaEye
                        title="View"
                        style={{ color: '#00bfa5', marginRight:'10px', cursor: 'pointer' }}
                        onClick={() => handleViewClick(career)}
                      />
                      <FaTrash
                            title="Delete"
                            style={{ color: '#f44336',  cursor: 'pointer' }}
                            onClick={() => {
                              setCareerToDelete(career);
                              setShowDeleteModal(true);
                            }}
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
            <strong>Showing {indexOfFirstCareer + 1} to {Math.min(indexOfLastCareer, filteredCareer.length)} of {filteredCareer.length} entries</strong>
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
          <DeleteModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            handleDeleteCareer(careerToDelete?._id);
            setShowDeleteModal(false);
          }}
        />
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
          {selectedCareer && (
            <div className='row'>
              <div className='col-lg-6'>
                <div style={modalStyle.label}>Name</div>
                <div style={modalStyle.value}>{selectedCareer?.name || 'N/A'}</div>
              </div>
              <div className='col-lg-6'>
                <div style={modalStyle.label}>Email</div>
                <div style={modalStyle.value}>{selectedCareer?.email || 'N/A'}</div>
              </div>
              <div className='col-lg-6'>
                <div style={modalStyle.label}>Mobile</div>
                <div style={modalStyle.value}>{selectedCareer?.mobile || 'N/A'}</div>
              </div>
              <div className='col-lg-6'>
                <div style={modalStyle.label}>Job Title</div>
                <div style={modalStyle.value}>{selectedCareer?.jobTitle || 'N/A'}</div>
              </div>
              <div className='col-lg-12'>
                <div style={modalStyle.label}>Cover Letter</div>
                <div style={modalStyle.value}>{selectedCareer?.coverLetter || 'N/A'}</div>
              </div>
              <div className='col-lg-6'>
                <div style={modalStyle.label}>Created At</div>
                <div style={modalStyle.value}>{selectedCareer?.createdAt || 'N/A'}</div>
              </div>
               <div className='col-lg-6'>
                <div style={modalStyle.label}>Resume</div>
                <div style={modalStyle.value} onClick={()=> window.open(selectedCareer.file)}>
                    <button style={{
              background: '#00bfa5',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
            }}>View</button>
                </div>
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

export default CareerManagement;