import React from 'react'

function Team() {
  return (
    <div>
      <div className="team-style-two-area default-padding">
  <div className="container">
    <div className="row">
      <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
        <div className="site-heading text-center">
          <h4 className="sub-title">Team Members</h4>
          <h2 className="title split-text">
            Meet the talented team form our company
          </h2>
        </div>
      </div>
    </div>
  </div>
  <div className="container">
    <div className="row">
      {/* Single Item */}
      <div className="col-lg-4 col-md-6 team-style-two wow fadeInUp">
        <div
          className="team-style-two-item"
          style={{ backgroundImage: "url(static/img/shape/15.webp)" }}
        >
          <div className="thumb">
            <img title='Microcode Software' src="static/img/team/v4.webp" alt="Img Not Found" />
            <a href="#">
              <i className="fas fa-envelope" />
            </a>
          </div>
          <div className="info">
            <h4>
              <a href="team-details.html">Aleesha Brown</a>
            </h4>
            <span>CEO &amp; Founder</span>
          </div>
        </div>
      </div>
      {/* End Single Item */}
      {/* Single Item */}
      <div
        className="col-lg-4 col-md-6 team-style-two wow fadeInUp"
        data-wow-delay="200ms"
      >
        <div
          className="team-style-two-item"
          style={{ backgroundImage: "url(static/img/shape/15.webp)" }}
        >
          <div className="thumb">
            <img title='Microcode Software' src="static/img/team/v5.webp" alt="Img Not Found" />
            <a href="#">
              <i className="fas fa-envelope" />
            </a>
          </div>
          <div className="info">
            <h4>
              <a href="team-details.html">Kevin Martin</a>
            </h4>
            <span>Product Manager</span>
          </div>
        </div>
      </div>
      {/* End Single Item */}
      {/* Single Item */}
      <div
        className="col-lg-4 col-md-6 team-style-two wow fadeInUp"
        data-wow-delay="400ms"
      >
        <div
          className="team-style-two-item"
          style={{ backgroundImage: "url(static/img/shape/15.webp)" }}
        >
          <div className="thumb">
            <img title='Microcode Software' src="static/img/team/v1.webp" alt="Img Not Found" />
            <a href="#">
              <i className="fas fa-envelope" />
            </a>
          </div>
          <div className="info">
            <h4>
              <a href="team-details.html">Sarah Albert</a>
            </h4>
            <span>Financial Consultant</span>
          </div>
        </div>
      </div>
      {/* End Single Item */}
      {/* Single Item */}
      <div className="col-lg-4 col-md-6 team-style-two wow fadeInUp">
        <div
          className="team-style-two-item"
          style={{ backgroundImage: "url(static/img/shape/15.webp)" }}
        >
          <div className="thumb">
            <img title='Microcode Software' src="static/img/team/v2.webp" alt="Img Not Found" />
            <a href="#">
              <i className="fas fa-envelope" />
            </a>
          </div>
          <div className="info">
            <h4>
              <a href="team-details.html">Amanulla Joey</a>
            </h4>
            <span>Developer</span>
          </div>
        </div>
      </div>
      {/* End Single Item */}
      {/* Single Item */}
      <div
        className="col-lg-4 col-md-6 team-style-two wow fadeInUp"
        data-wow-delay="200ms"
      >
        <div
          className="team-style-two-item"
          style={{ backgroundImage: "url(static/img/shape/15.webp)" }}
        >
          <div className="thumb">
            <img title='Microcode Software' src="static/img/team/v3.webp" alt="Img Not Found" />
            <a href="#">
              <i className="fas fa-envelope" />
            </a>
          </div>
          <div className="info">
            <h4>
              <a href="team-details.html">Kamal Abraham</a>
            </h4>
            <span>Co Founder</span>
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

export default Team
