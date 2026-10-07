import React from 'react'
import { Link } from 'react-router-dom'

function Banner() {
  return (
    <div>
      <div className="banner-area banner-style-two content-right navigation-custom-large zoom-effect overflow-hidden text-light">
        {/* Slider main container */}
        <div className="banner-fade">
          {/* Additional required wrapper */}
          <div className="swiper-wrapper">
            {/* Single Item */}
            <div className="swiper-slide banner-style-two">
              <div
                className="banner-thumb bg-cover shadow dark"
                style={{ background: "url(static/img/banner/1.webp)" }}
              />
              <div className="container">
                <div className="row align-center">
                  <div className="col-xl-7 offset-xl-5 col-lg-10 offset-lg-1">
                    <div className="content">
                      <h4>Innovative, Intuitive and Impactful</h4>
                      <h2> 
                        <strong>Software That Built </strong>Your Business
                      </h2>
                      <div className="button">
                        <Link
                          className="btn circle btn-gradient btn-md radius animation"
                          to="/contact"
                        >
                          Get Consultation
                        </Link>
                      </div>
                      <div className="shape-circle" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Shape */}
              <div className="banner-angle-shape">
                <div
                  className="shape-item"
                  style={{ background: "url(static/img/shape/2.png)" }}
                />
              </div>
              {/* End Shape */}
            </div>
            {/* End Single Item */}
            {/* Single Item */}
            <div className="swiper-slide banner-style-two">
              <div
                className="banner-thumb bg-cover shadow dark"
                style={{ background: "url(static/img/banner/2.webp)" }}
              />
              <div className="container">
                <div className="row align-center">
                  <div className="col-xl-7 offset-xl-5 col-lg-10 offset-lg-1">
                    <div className="content">
                      <h4>Turn Clicks Into Clients</h4>
                      <h2>
                        <strong>Smart Marketing Solutions For</strong> Smartest Businesses
                      </h2>
                      <div className="button">
                        <Link
                          className="btn circle btn-gradient btn-md radius animation"
                          to="/contact"
                        >
                          Get Consultation
                        </Link>
                      </div>
                      <div className="shape-circle" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Shape */}
              <div className="banner-angle-shape">
                <div
                  className="shape-item"
                  style={{ background: "url(static/img/shape/2.png)" }}
                />
              </div>
              {/* End Shape */}
            </div>
            {/* End Single Item */}
          </div>
          {/* Pagination */}
          <div className="swiper-pagination" />
        </div>
      </div>

    </div>
  )
}

export default Banner
