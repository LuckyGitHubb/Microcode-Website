import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../components/DeleteBlogModal'; // Reusing DeleteModal, assuming it can be adapted for services
import Loader from '../../components/Loader'; // Import the Loader component
import { apiRequestHandler } from '../../apiConfig/service';
import { toast } from 'react-toastify';
import { url } from '../../apiConfig/ApiConfig';
import { formatDate } from '../../utils/formatedDate';

const getServices = async (endPoint, token) => {
  const res = await apiRequestHandler({ endPoint, headers: { Authorization: `Bearer ${token}` } });
  return res?.data;
};

const ServiceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const servicesPerPage = 5;

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true); // Start loading
      try {
        const res = await getServices('getServices', localStorage.getItem('token'));
        setServices(res || []);
      } catch (error) {
        console.error('Error fetching services:', error);
        toast.error('Failed to load services');
        setServices([]);
      } finally {
        setIsLoading(false); // End loading
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    if (!Array.isArray(services)) {
      setFilteredServices([]);
      return;
    }
    const filtered = services?.length > 0
      ? services.filter(service =>
          service?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service?.serviceName?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];
    setFilteredServices(filtered);
    setCurrentPage(1);
  }, [searchTerm, services]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices?.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(filteredServices?.length / servicesPerPage);

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

  const handleDeleteService = async (id) => {
    try {
      setIsLoading(true); // Start loading for delete action
      const res = await apiRequestHandler({
        method: 'DELETE',
        endPoint: `${url}/service/${id}`,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (res?.success) {
        toast.success(res?.message);
        const updatedServices = await getServices('getServices', localStorage.getItem('token'));
        setServices(updatedServices || []);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', background: '#f5f7fa' }}>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '20px' }}>
          <h4 style={{ margin: 0 }}>Service Management</h4>
          <button
            onClick={() => navigate('/admin/add-service')}
            style={{
              background: '#00bfa5',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            + Add Service
          </button>
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
            placeholder="Search by service title or name..."
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

        {isLoading ? (
          <Loader />
        ) : (
          <>
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
                    <th style={{ ...thStyle, borderRight: '1px solid #eee', borderBottom: '1px solid #ccc' }}>Service Name</th>
                    <th style={{ ...thStyle, borderRight: '1px solid #eee', borderBottom: '1px solid #ccc' }}>Title</th>
                    <th style={{ ...thStyle, borderRight: '1px solid #eee', borderBottom: '1px solid #ccc' }}>Created Date & Time</th>
                    <th style={{ ...thStyle, borderBottom: '1px solid #ccc' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentServices?.length > 0 ? (
                    currentServices?.map((service, index) => (
                      <tr key={service._id}>
                        <td style={{ ...tdStyle, borderRight: '1px solid #eee' }}>{indexOfFirstService + index + 1}</td>
                        <td style={{ ...tdStyle, borderRight: '1px solid #eee' }}>{service.serviceName}</td>
                        <td style={{ ...tdStyle, borderRight: '1px solid #eee' }}>{service.title}</td>
                        <td style={{ ...tdStyle, borderRight: '1px solid #eee' }}>
                          {formatDate(service.createdAt)}
                        </td>
                        <td style={tdStyle}>
                          <FaEye
                            title="View"
                            style={{ color: '#00bfa5', marginRight: '10px', cursor: 'pointer' }}
                            onClick={() => navigate('/admin/add-service', { state: { service, mode: 'view' } })}
                          />
                          <FaEdit
                            title="Edit"
                            style={{ color: '#ff9800', marginRight: '10px', cursor: 'pointer' }}
                            onClick={() => navigate('/admin/add-service', { state: { service, mode: 'edit' } })}
                          />
                          <FaTrash
                            title="Delete"
                            style={{ color: '#f44336', cursor: 'pointer' }}
                            onClick={() => {
                              setServiceToDelete(service);
                              setShowDeleteModal(true);
                            }}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                        No Services Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', fontSize: '13px', color: '#333' }}>
              <div>
                <strong>Showing {indexOfFirstService + 1} to {Math.min(indexOfLastService, filteredServices?.length)} of {filteredServices?.length} entries</strong>
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
          </>
        )}

        <DeleteModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            handleDeleteService(serviceToDelete?._id);
            setShowDeleteModal(false);
            setServiceToDelete(null);
          }}
        />
      </div>
    </div>
  );
};

export default ServiceManagement;