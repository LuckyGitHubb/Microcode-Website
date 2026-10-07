import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
      <footer className="bg-gray overflow-hidden">
        <div className="container">
          <div className="f-items default-padding">
            <div className="row">
              <div className="col-lg-4 col-md-6 footer-item pr-30 pr-md-15 pr-xs-15">
                <div className="f-item address">
                  <img title='Microcode Software' src="/static/img/logo.png" alt="Img Not Found" />
                  <p>
                    Ready to take your business to the next level? Let’s create the perfect solution for you today!
                  </p>
                  <a className="btn btn-md circle btn-gradient animation mt-20" href="/contact" data-discover="true">Contact Us</a>
                  {/* <ul className="footer-social">
                    <li>
                      <a href="#">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-youtube" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </li>
                  </ul> */}

                </div>
              </div>
              <div className="col-lg-2 col-md-6 footer-item">
                <div className="f-item link">
                  <h4 className="widget-title">Quick Links</h4>
                  <ul>
                    <li>
                      <Link to="/blog">Blogs</Link>
                    </li>
                    <li>
                      <Link to="/">Home</Link>
                    </li>

                    <li>
                      <Link to="/about">About Us</Link>
                    </li>
                    <li>
                      <Link to="/pricing">Pricing & Plans</Link>
                    </li>
                    <li>
                      <Link to="/career">Career</Link>
                    </li>
                    <li>
                      <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">Sitemap</a>
                    </li>

                    {/* <li>
                <a href="about-us.html">Career</a>
              </li>
              <li>
                <a href="pricing.html">Plans &amp; Pricing</a>
              </li>
              <li>
                <a href="blog-standard.html">News &amp; Blog</a>
              </li> */}
                    <li>
                      <Link to="/contact">Contact Us</Link>
                    </li>

                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 footer-item">
                <div className="f-item link">
                  <h4 className="widget-title">Our Services</h4>
                  <ul>
                    <li><Link to="/application-development">Application Development</Link></li>
                    <li><Link to="/social-media-marketing">Social Media Marketing</Link></li>
                    <li><Link to="/performance-marketing">Performance Marketing</Link></li>
                    <li><Link to="/software-development">Software Development</Link></li>
                    <li><Link to="/website-development">Website Development</Link></li>
                    <li><Link to="/shopify-development">Shopify Development</Link></li>
                    <li><Link to="/seo-services">Search Engine Optimization (SEO)</Link></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 footer-item">
                {/* <div className="f-item newsletter">
            <h4 className="widget-title">Newsletter</h4>
            <p>
              Join our subscribers list to get the latest <br /> news and
              special offers.
            </p>
            <form action="#">
              <input
                type="email"
                placeholder="Your Email"
                className="form-control"
                name="email"
              />
              <button type="submit">
                {" "}
                <i className="fa fa-paper-plane" />
              </button>
            </form>
            <fieldset>
              <input type="checkbox" id="privacy" name="privacy" />
              <label htmlFor="privacy">I agree to the Privacy Policy</label>
            </fieldset>
          </div> */}
                <h4 className="widget-title">Our Location</h4>
                <ul className="contact-address border-0 m-0 p-0">
                  <li>

                    {/* <p>Our Location</p> */}
                    <p>Delhi, India</p>
                    <p>Texas, USA</p>
                  </li>
                </ul>
                <ul className="footer-social">
                  <li>
                    <a href="https://www.facebook.com/profile.php?id=100090409508146" target='blank'>
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/90959047/admin/dashboard/" target='blank'>
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </li>
                  {/* <li>
                    <a href="https://wa.me/919908535101" target='blank'>
                      <i className="fab fa-whatsapp" />
                    </a>
                  </li> */}
                  <li>
                    <a href="https://www.instagram.com/microcodesoftware/" target='blank'>
                      <i className="fab fa-instagram" />
                    </a>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Start Footer Bottom */}
        <div className="footer-bottom bg-dark text-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <p>
                  © Copyright 2025. All Rights Reserved by <a href="/">Microcode</a>
                </p>
              </div>
              {/* <div className="col-lg-6 text-end">
          <ul className="link-list">
            <li>
              <a href="#">Terms</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
          </ul>
        </div> */}
            </div>
          </div>

        </div>

        {/* <Link
          to="/granoble-app"
          rel="noopener noreferrer"
          className="whatsapp-float app-logo"
        >
          <img title='Microcode Software'
            src="static/img/icon/applogo.png"
            alt="Granoble App"
          />
        </Link> */}

        <a
          href="https://wa.me/+918882581143"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float"
        >
          <img title='Microcode Software'
            src="/static/img/icon/whatsapp.png"
            alt="WhatsApp"
          />
        </a>

        {/* End Footer Bottom */}
      </footer>

    </div>
  )
}

export default Footer
