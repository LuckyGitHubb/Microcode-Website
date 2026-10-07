import React from 'react'

function Gallery() {
  return (
    <div>
      <div className="gallery-style-one-area bg-gray default-padding">
  <div className="container">
    <div className="row">
      <div className="col-xl-6 col-lg-9">
        <div className="site-heading">
          <h4 className="sub-title">Case Studies</h4>
          <h2 className="title split-text">
            Have a view of our amazing projects with our clients
          </h2>
        </div>
      </div>
      <div className="col-xl-6 col-lg-3">
        <div className="project-navigation-items">
          {/* Navigation */}
          <div className="project-swiper-nav">
            {/* Pagination */}
            <div className="project-pagination" />
            <div className="project-button-prev" />
            <div className="project-button-next" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="container-fill">
    <div className="row">
      <div className="gallery-style-one-carousel swiper">
        {/* Additional required wrapper */}
        <div className="swiper-wrapper">
          {/* Single Item */}
          <div className="swiper-slide">
            <div className="gallery-style-one">
              <img title='Microcode Software' src="static/img/projects/5.webp" alt="Img Not Found" />
              <div className="overlay">
                <div className="info">
                  <h4>
                    <a href="project-details.html">Cyber Security</a>
                  </h4>
                  <span>Technology, IT</span>
                  <p>
                    Continued at up to zealously necessary breakfast. Surrounded
                    sir motionless she end literature.
                  </p>
                </div>
                <a href="project-details.html">
                  Explore <i className="fas fa-long-arrow-right" />
                </a>
              </div>
            </div>
          </div>
          {/* End Single Item */}
          {/* Single Item */}
          <div className="swiper-slide">
            <div className="gallery-style-one">
              <img title='Microcode Software' src="static/img/projects/6.webp" alt="Img Not Found" />
              <div className="overlay">
                <div className="info">
                  <h4>
                    <a href="project-details.html">IT Counsultancy</a>
                  </h4>
                  <span>Security, Firewall</span>
                  <p>
                    Continued at up to zealously necessary breakfast. Surrounded
                    sir motionless she end literature.
                  </p>
                </div>
                <a href="project-details.html">
                  Explore <i className="fas fa-long-arrow-right" />
                </a>
              </div>
            </div>
          </div>
          {/* End Single Item */}
          {/* Single Item */}
          <div className="swiper-slide">
            <div className="gallery-style-one">
              <img title='Microcode Software' src="static/img/projects/7.webp" alt="Img Not Found" />
              <div className="overlay">
                <div className="info">
                  <h4>
                    <a href="project-details.html">Analysis of Security</a>
                  </h4>
                  <span>Support, Tech</span>
                  <p>
                    Continued at up to zealously necessary breakfast. Surrounded
                    sir motionless she end literature.
                  </p>
                </div>
                <a href="project-details.html">
                  Explore <i className="fas fa-long-arrow-right" />
                </a>
              </div>
            </div>
          </div>
          {/* End Single Item */}
          {/* Single Item */}
          <div className="swiper-slide">
            <div className="gallery-style-one">
              <img title='Microcode Software' src="static/img/projects/8.webp" alt="Img Not Found" />
              <div className="overlay">
                <div className="info">
                  <h4>
                    <a href="project-details.html">Business Analysis</a>
                  </h4>
                  <span>Network, Error</span>
                  <p>
                    Continued at up to zealously necessary breakfast. Surrounded
                    sir motionless she end literature.
                  </p>
                </div>
                <a href="project-details.html">
                  Explore <i className="fas fa-long-arrow-right" />
                </a>
              </div>
            </div>
          </div>
          {/* End Single Item */}
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default Gallery
