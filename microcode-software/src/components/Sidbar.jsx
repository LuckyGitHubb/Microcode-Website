import React from 'react';
import { MdDashboard, MdCategory } from "react-icons/md";
import { FaBlog } from "react-icons/fa";
import { GrServices } from "react-icons/gr";
import { IoLogOut } from "react-icons/io5";
import { IoIosContact } from "react-icons/io";
import { GrTransaction } from "react-icons/gr";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../context/cartContext';

const Sidebar = ({ showSidebar, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useCart(); // ✅ Grab user from context

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success("Logout successful");
    navigate("/adminLogin");
  };

  // Module permission check
  const labelToModuleMap = {
    "Dashboard": "Dashboard",
    "Sub Admin List": "SubAdmin",
    "Blog Management": "Blog Management",
    "Category Management": "Category Management",
    "Service Management": "Service Page",
    "Contact List": "Contact Forms",
    "Transaction List": "Transaction",
    "Logout": "Logout",
  };
  console.log(user)

  const allowedModules = user?.userType === "SubAdmin"
    ? user?.permissions?.filter(p => p.isAllow).map(p => p.moduleName)
    : null;

  const isModuleAllowed = (label) => {
    if (user?.userType !== "SubAdmin") return true;
    const module = labelToModuleMap[label];
    return allowedModules?.includes(module);
  };

  const routes = [
    {
      section: "Menu",
      items: [
        { path: "/admin/dashboard", label: "Dashboard", icon: <MdDashboard fontSize={"20px"} /> },
        { path: "/admin/list-subadmin", label: "Sub Admin List", icon: <MdDashboard fontSize={"20px"} /> },
      ],
    },
    {
      section: "Blog",
      items: [
        { path: "/admin/blog-list", label: "Blog Management", icon: <FaBlog fontSize={"20px"} /> },
        { path: "/admin/category-list", label: "Category Management", icon: <MdCategory fontSize={"20px"} /> },
      ],
    },
    {
      section: "Pages",
      items: [
        { path: "/admin/list-services", label: "Service Management", icon: <GrServices fontSize={"20px"} /> },
        { path: "/admin/list-static-content", label: "Static Pages", icon: <GrServices fontSize={"20px"} /> },
      ],
    },
    {
      section: "Components",
      items: [
        { path: "/admin/contact-list", label: "Contact List", icon: <IoIosContact fontSize={"20px"} /> },
        { path: "/admin/career-list", label: "Career List", icon: <GrTransaction fontSize={"20px"} /> },
        { path: "/admin/transaction-list", label: "Transaction List", icon: <GrTransaction fontSize={"20px"} /> },
        { path: null, label: "Logout", icon: <IoLogOut fontSize={"20px"} />, onClick: handleLogout },
      ],
    }, 
  ];

  const sidebarStyles = {
    container: {
      position: 'fixed',
      top: 0,
      left: showSidebar ? '0' : '-260px',
      width: '260px',
      height: '100vh',
      backgroundColor: '#1A2E44',
      color: '#fff',
      zIndex: 1000,
      transition: 'left 0.3s ease',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
    },
    logo: {
      padding: '10px 20px 0px 20px',
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#00C4B4',
      textAlign: 'center',
    },
    menu: {
      padding: '0 20px 20px',
    },
    menuTitle: {
      fontSize: '14px',
      color: '#B0BEC5',
      margin: '20px 0 10px',
      textTransform: 'uppercase',
    },
    menuItem: {
      padding: '15px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '16px',
      cursor: 'pointer',
      color: '#B0BEC5',
      transition: 'color 0.2s ease',
    },
    menuItemHover: {
      color: '#fff',
    },
    icon: {
      fontSize: '16px',
      width: '20px',
      textAlign: 'center',
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      zIndex: 1001,
      fontSize: '24px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#fff',
    },
  };

  return (
    <>
      <style>
        {`
          @media (min-width: 769px) {
            .sidebar-container {
              left: 0 !important;
            }
            .close-button {
              display: none !important;
            }
          }
          @media (max-width: 768px) {
            .close-button {
              display: ${showSidebar ? 'block' : 'none'} !important;
            }
          }
          .sidebar-container::-webkit-scrollbar {
            width: 6px;
          }
          .sidebar-container::-webkit-scrollbar-track {
            background: #2A3F5F;
            border-radius: 3px;
          }
          .sidebar-container::-webkit-scrollbar-thumb {
            background: #00C4B4;
            border-radius: 3px;
          }
          .sidebar-container::-webkit-scrollbar-thumb:hover {
            background: #00A89A;
          }
        `}
      </style>
      <div className="sidebar-container" style={sidebarStyles.container}>
        <button
          className="close-button"
          style={{ ...sidebarStyles.closeButton, display: 'none' }}
          onClick={toggleSidebar}
        >
          ×
        </button>
        <div style={{
          ...sidebarStyles.logo,
          display: 'flex',
          alignItems: 'center',
          justifyContent: "center",
          gap: '10px'
        }}>
          <img src="/logo-light.png" alt="Logo" style={{ height: '50px' }} />
        </div>
        <div style={sidebarStyles.menu}>
          {routes.map((section, index) => {
            const visibleItems = section.items.filter(item =>
              item.label === "Logout" || isModuleAllowed(item.label)
            );

            if (visibleItems.length === 0) return null;

            return (
              <div key={index}>
                <div style={sidebarStyles.menuTitle}>{section.section}</div>
                {visibleItems.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    style={{
                      ...sidebarStyles.menuItem,
                      color: item.path && isActive(item.path) ? '#fff' : '#B0BEC5',
                      backgroundColor: item.path && isActive(item.path) ? '#00C4B4' : 'transparent',
                      borderRadius: '6px',
                      paddingLeft: item.path && isActive(item.path) ? '12px' : "0",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = sidebarStyles.menuItemHover.color)}
                    onMouseLeave={(e) => {
                      if (!item.path || !isActive(item.path)) e.currentTarget.style.color = '#B0BEC5';
                    }}
                    onClick={item.path ? () => navigate(item.path) : item.onClick}
                  >
                    <span style={sidebarStyles.icon}>{item.icon}</span> {item.label}
                  </div>
                ))}
              </div>
            );
          })}

        </div>
      </div>
    </>
  );
};

export default Sidebar;
