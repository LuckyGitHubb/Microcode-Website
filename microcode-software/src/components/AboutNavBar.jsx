import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/cartContext';

function AboutNavBar() {
  const refElement = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);
  const [menuOpen, setMenuOpen] = useState(false);
  const [iconOpen, setIconOpen] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const { cartItems } = useCart();
  const navigate = useNavigate()
  const [hasToken, setHasToken] = useState(false);
  const [showDropdown2, setShowDropdown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setHasToken(false);
    setShowDropdown(false);
    navigate("/user-login");
  };

  useEffect(() => {
    if (refElement.current) {
      refElement.current.style.display = 'none';
    }

    const handleResize = () => {
      const mobile = window.innerWidth <= 991;
      setIsMobile(mobile);
      if (!mobile) {
        setMenuOpen(false);
        setIconOpen(false);
        setShowMobileDropdown(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function showDropdown() {
    if (refElement.current && !isMobile) {
      refElement.current.style.display = 'block';
    }
  }

  function hideDropdown() {
    if (refElement.current && !isMobile) {
      refElement.current.style.display = 'none';
    }
  }

  const handleToggleClick = () => {
    if (!isMobile) return;
    const navbar = document.querySelector('.navbar');
    const overlay = document.querySelector('.overlay-screen');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const header = document.querySelector('header');

    const isOpen = menuOpen;

    setMenuOpen(!isOpen);
    setIconOpen(!isOpen);

    navbar?.classList.toggle('navbar-responsive', !isOpen);
    navbar?.classList.toggle('force-sticky', !isOpen);
    overlay?.classList.toggle('opened', !isOpen);
    header?.classList.toggle('adjust-height', !isOpen);
    navbarCollapse?.classList.toggle('show', !isOpen);
    navbarCollapse?.classList.toggle('collapse-mobile', !isOpen);
  };

  return (
    <div>
      <header>
        <nav className="navbar mobile-sidenav navbar-common navbar-default validnavs dark">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle"
                  onClick={handleToggleClick}
                >
                  <i className={`fa ${iconOpen ? 'fa-times' : 'fa-bars'}`} />
                </button>
                <Link className="navbar-brand" to="/">
                  <img title='Microcode Software' src="/static/img/logo.png" className="logo" alt="Logo" />
                </Link>
              </div>

              <div className="collapse navbar-collapse" id="navbar-menu">
                <div className="collapse-header">
                  <img title='Microcode Software' src="static/img/logo.png" alt="Logo" />
                  <button
                    type="button"
                    className="navbar-toggle"
                    onClick={handleToggleClick}
                  >
                    <i className="fa fa-times" />
                  </button>
                </div>
                <ul className="nav navbar-nav navbar-center" data-in="fadeInDown" data-out="fadeOutUp">
                  <li className="dropdown megamenu-fw">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="dropdown">
                    <Link to="/about">About Us</Link>
                  </li>
                  <li
                    className="dropdown"
                    onMouseEnter={() => !isMobile && showDropdown()}
                    onMouseLeave={() => !isMobile && hideDropdown()}
                  >
                    <Link
                      to="#"
                      onClick={(e) => {
                        if (isMobile) {
                          e.preventDefault();
                          setShowMobileDropdown(!showMobileDropdown);
                        }
                      }}
                    >
                      Our Services
                    </Link>
                    <ul
                      ref={refElement}
                      className="dropdown-menu"
                      style={{
                        display: isMobile ? (showMobileDropdown ? 'block' : 'none') : undefined,
                      }}
                    >
                      <li><Link to="/application-development">Application Development</Link></li>
                      <li><Link to="/social-media-marketing">Social Media Marketing</Link></li>
                      <li><Link to="/performance-marketing">Performance Marketing</Link></li>
                      <li><Link to="/software-development">Software Development</Link></li>
                      <li><Link to="/website-development">Website Development</Link></li>
                      <li><Link to="/shopify-development">Shopify Development</Link></li>
                      <li><Link to="/seo-services">Search Engine Optimization (SEO)</Link></li>
                    </ul>
                  </li>
                  {/* <li><Link to="/granoble-app">Coming Soon!</Link></li> */}
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/contact">contact Us</Link></li>
                </ul>
              </div>

              {/* <div className="attr-right">
                <div className="attr-nav">
               
                </div>
              </div> */}


              <div className="attr-right">
                <div className="attr-nav">
                  <ul>
                    <li className="contact">
                      <div className="call">
                        <div className="icon displaycenter  " >
                          <i className="fas fa-envelope" style={{ fontSize: "28px" }} />
                        </div>
                        <div className="icon">
                          <Link to="/cart" className="d-flex align-items-center gap-1 position-relative" style={{ color: "#02adf3" }}>
                            <i className="fas fa-shopping-cart " style={{ fontSize: "25px" }}></i>
                            {cartItems.length > 0 && (
                              <span
                                className="badge rounded-circle bg-danger text-white"
                                style={{
                                  position: "absolute",
                                  top: "15px",
                                  right: "0px",
                                  fontSize: "10px",

                                  minWidth: "20px",
                                  textAlign: "center",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center"
                                }}
                              >
                                {cartItems.length}
                              </span>
                            )}
                          </Link>
                        </div>
                        <div className="button displaycenter" style={{ position: "relative" }}>
                          {!hasToken ? (
                            <Link
                              style={{ padding: "10px 28px" }}
                              className="btn circle btn-gradient btn-md radius animation"
                              to="/user-login"
                            >
                              Login
                            </Link>
                          ) : (
                            <div>
                              <img
                                src="/avtar.jpg" // replace with your avatar icon or image
                                alt="Profile"
                                style={{ width: 40, height: 40, borderRadius: "50%", cursor: "pointer" }}
                                onClick={() => setShowDropdown(prev => !prev)}
                              />
                              {showDropdown2 && (
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "50px",
                                    right: 0,
                                    backgroundColor: "#fff",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                    borderRadius: "5px",
                                    zIndex: 10,
                                  }}
                                >
                                  <button
                                    onClick={handleLogout}
                                    style={{
                                      padding: "10px 20px",
                                      background: "none",
                                      border: "none",
                                      width: "100%",
                                      textAlign: "left",
                                      cursor: "pointer",
                                    }}
                                  >
                                    Logout
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                      </div>
                    </li>

                  </ul>

                </div>
              </div>

              <div className="attr-right d-block d-sm-block d-lg-none">
                <div className="attr-nav">
                  <ul>
                    <li className="contact d-block d-sm-block d-lg-none">
                      <div className="call">
                        <a href="mailto:info@granobleinfosystem.com">
                          <div className="icon">
                            <i className="fas fa-comments-alt-dollar" />
                          </div>
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="overlay-screen" onClick={handleToggleClick} />
        </nav>
      </header>
    </div>
  )
}

export default AboutNavBar
