import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../components/DeleteBlogModal';
import { apiRequestHandler } from '../../apiConfig/service';
import { url } from '../../apiConfig/ApiConfig';
import { formatDate } from '../../utils/formatedDate'; 
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

const getAllBlogs = async (endPoint, token) => {
  const res = await apiRequestHandler({ endPoint, headers: { Authorization: `Bearer ${token}` } });
  return res?.data;
};

const BlogManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const blogsPerPage = 5;

  // Fetch blogs with loading state
  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true); // Start loading
      try {
        const res = await getAllBlogs('getBlog', localStorage.getItem('token'));
        setBlogs(res || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        toast.error('Failed to load blogs');
        setBlogs([]);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (!Array.isArray(blogs)) {
      setFilteredBlogs([]);
      return;
    }
    const filtered = blogs?.length > 0
      ? blogs.filter(blog =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];
    setFilteredBlogs(filtered);
    setCurrentPage(1);
  }, [searchTerm, blogs]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const tdStyle = {
    padding: '14px',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    borderBottom: '1px solid #eee'
  };

  const thStyle = {
    padding: '14px',
    fontSize: '14px',
    fontWeight: 600,
    backgroundColor: '#fff',
    borderBottom: '2px solid #f0f0f0',
    textAlign: 'left'
  };

  const handleDeleteBlog = async (id) => {
    try {
      setIsLoading(true); // Start loading for delete action
      const res = await apiRequestHandler({
        method: 'DELETE',
        endPoint: `${url}/blog/${id}`,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log('res: ',res);
      if (res?.success) {
        toast.success(res?.message);
        const updatedBlogs = await getAllBlogs('getBlog', localStorage.getItem('token'));
        setBlogs(updatedBlogs || []);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false); // End loading
    }
  };

  // Simple loader component
 

  return (
    <div style={{ minHeight: '100vh', padding: '20px', background: '#f5f7fa' }}>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '20px' }}>
          <h4 style={{ margin: 0 }}>Blog Management</h4>
          <button
            onClick={() => navigate('/admin/add-blog')}
            style={{
              background: '#00bfa5',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            + Add Blog
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
            placeholder="Search by blog title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 32px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              fontSize: '14px'
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
                    <th style={{ ...thStyle, borderRight: '1px solid #eee', borderBottom: '1px solid #ccc' }}>Title</th>
                    <th style={{ ...thStyle, borderRight: '1px solid #eee', borderBottom: '1px solid #ccc' }}>Description</th>
                    <th style={{ ...thStyle, borderRight: '1px solid #eee', borderBottom: '1px solid #ccc' }}>Created Date & Time</th>
                    <th style={{ ...thStyle, borderBottom: '1px solid #ccc' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBlogs.length > 0 ? (
                    currentBlogs.map((blog, index) => (
                      <tr key={index}>
                        <td style={{ ...tdStyle, borderRight: '1px solid #eee' }}>{indexOfFirstBlog + index + 1}</td>
                        <td style={{ ...tdStyle, borderRight: '1px solid #eee' }}>{blog.title}</td>
                        <td style={{ ...tdStyle, borderRight: '1px solid #eee', maxWidth: '300px' }}>{blog.shortDescription}</td>
                        <td style={{ ...tdStyle, borderRight: '1px solid #eee' }}>{formatDate(blog.createdAt)}</td>
                        <td style={tdStyle}>
                          <FaEye
                            title="View"
                            style={{ color: '#00bfa5', marginRight: '10px', cursor: 'pointer' }}
                            onClick={() => navigate('/admin/add-blog', { state: { blog, mode: 'view' } })}
                          />
                          <FaEdit
                            title="Edit"
                            style={{ color: '#ff9800', marginRight: '10px', cursor: 'pointer' }}
                            onClick={() => navigate('/admin/add-blog', { state: { blog, mode: 'edit' } })}
                          />
                          <FaTrash
                            title="Delete"
                            style={{ color: '#f44336', cursor: 'pointer' }}
                            onClick={() => {
                              setBlogToDelete(blog);
                              setShowDeleteModal(true);
                            }}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                        No Blogs Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', fontSize: '13px', color: '#333' }}>
              <div>
                <strong>Showing {indexOfFirstBlog + 1} to {Math.min(indexOfLastBlog, filteredBlogs.length)} of {filteredBlogs.length} entries</strong>
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
                      fontSize: '14px'
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
            handleDeleteBlog(blogToDelete?._id);
            setShowDeleteModal(false);
          }}
        />
      </div>
    </div>
  );
};

export default BlogManagement;