import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FaBars, FaSearch } from 'react-icons/fa';
import Sidebar from '../components/Sidbar';

const AdminLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const headerStyles = {
    container: {
      top: 0,
      left: 0,
      right: 0,
      height: '60px',
      backgroundColor: '#f5f7fa',
      borderBottom: '1px solid #e0e0e0',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#00c4b4',
      marginRight: '20px',
    },
    searchBar: {
      flex: 1,
      padding: '8px',
      border: '1.3px solid #e0e0e0',
      borderRadius: '5px',
      fontSize: '16px',
      backgroundColor: '#fff',
    },
    icons: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginLeft: '20px',
    },
    profile: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      fontSize: '16px',
    },
  };

  const sidebarWrapperStyles = {
    backgroundColor: '#1a2e44',
    color: 'white',
    transition: 'width 0.3s ease',
  };

  const contentWrapperStyles = {
    overflowX:"auto",
    transition: 'width 0.3s ease',
    flex: 1,
  };

  return (
    <>
      {/* Global styles for media queries */}
      <style>
        {`
          @media (max-width: 768px) {
            .header-search-bar {
              display: none !important;
            }
            .header-logo {
              margin-right: 0 !important;
            }
            .header-icons {
              margin-left: 0 !important;
            }
            .mobile-toggle {
              display: block !important;
            }
          }

          .mobile-toggle {
            display: none;
          }
        `}
      </style>

      <div className="container-fluid p-0">
        <div className="d-flex" style={{ minHeight: '100vh' }}>
          {/* Sidebar */}
          <div className="sidebar-wrapper" style={sidebarWrapperStyles}>
            <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
          </div>

          {/* Main Content */}
          <div style={contentWrapperStyles}>
            {/* Header */}
            <div
              className="row  text-black px-3 py-2 m-0"
              style={{
                marginTop: '60px', // Adjust if header is fixed
                // borderBottom: '2px solid #00c4b4',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                zIndex: 999,
                position: 'relative',
              }}
            >
              <div className="d-flex justify-content-between align-items-center w-100">
                <div className="d-flex align-items-center">
                  <button
                    className="mobile-toggle btn-outline-light me-3"
                    style={{
                      background: "#00c4b4",
                      padding: "8px",
                      borderRadius: "10px"
                    }}
                    type="button"
                    onClick={toggleSidebar}
                  >
                    <FaBars />
                  </button>
                  <div style={{ position: 'relative', width: '250px' }}>
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
                      placeholder="Search..."
                      // value={searchTerm}
                      // onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px 8px 32px',
                        borderRadius: '6px',
                        border: '1px solid #ddd',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                </div>

                <div style={headerStyles.icons} className="header-icons">
                  <div style={headerStyles.profile}>
                    <span>Admin</span>
                    <img
                      src="https://i.pravatar.cc/40?img=12" // Replace with actual admin avatar URL
                      alt="Admin Avatar"
                      style={{
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>

                </div>
              </div>
            </div>


            <div width="100% !important" >
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
