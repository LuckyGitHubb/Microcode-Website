import React from 'react'
import { Link } from 'react-router-dom'

function Services() {
  return (
    <div>
      <div
        className="services-style-three-area default-padding bottom-less bg-gray-secondary bg-cover"
        style={{ backgroundImage: "url(static/img/shape/24.png)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h4 className="sub-title">Our Services</h4>
                <h2 className="title split-text">
                  Everything You Need to Grow Online
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {/* Single Item */}
            <div className="col-xl-4 col-lg-6 col-md-6 mb-30">
              <div className="services-style-three-item wow fadeInUp">
                <div className="item-title">
                  <img title='Microcode Software' src="static/img/icon/16.png" alt="Img Not Found" />
                  <h4>
                    <Link to="/custom-software-development">Performance Marketing</Link>
                  </h4>
                  <p>
                    Our focus is on using data to conduct campaigns that optimize ROI and maximize growth in measurable quantities.
                  </p>
                  <div className="d-flex mt-30">
                    <Link to="/custom-software-development">
                      <i className="fas fa-long-arrow-right" />
                    </Link>
                    <div className="service-tags">
                      <a href='javascript:void(0)'>Custom </a>
                      <a href='javascript:void(0)'>Software</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Single Item */}
            {/* Single Item */}
            <div className="col-xl-4 col-lg-6 col-md-6 mb-30">
              <div
                className="services-style-three-item wow fadeInUp"
                data-wow-delay="200ms"
              >
                <div className="item-title">
                  <img title='Microcode Software' src="static/img/icon/17.png" alt="Img Not Found" />
                  <h4>
                    <Link to="/mobile-app-development">Social Media Marketing</Link>
                  </h4>
                  <p>
                    We grow your brand and engage your audience using strategic social media.
                    From content to conversions, we make every post count.
                  </p>
                  <div className="d-flex mt-30">
                    <Link to="/mobile-app-development">
                      <i className="fas fa-long-arrow-right" />
                    </Link>
                    <div className="service-tags">
                      <a href='javascript:void(0)'>Hybrid </a>
                      <a href='javascript:void(0)'>Native</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Single Item */}
            {/* Single Item */}
            <div className="col-xl-4 col-lg-6 col-md-6 mb-30">
              <div
                className="services-style-three-item wow fadeInUp"
                data-wow-delay="400ms"
              >
                <div className="item-title">
                  <img title='Microcode Software' src="static/img/icon/18.png" alt="Img Not Found" />
                  <h4>
                    <Link to="/web-development">Website Development</Link>
                  </h4>
                  <p>
                    We design rapid, secure, and scalable websites to help your business grow long term.
                    Built for performance, crafted for impact.
                  </p>
                  <div className="d-flex mt-30">
                    <Link to="/web-development">
                      <i className="fas fa-long-arrow-right" />
                    </Link>
                    <div className="service-tags">
                      <a href='javascript:void(0)'>UI & UX </a>
                      <a href='javascript:void(0)'>Web</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Single Item */}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Services
