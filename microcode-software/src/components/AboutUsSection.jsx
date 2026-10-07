import React from 'react'

function AboutUsSection() {
  return (
    <div>
      <div className="about-style-one-area shape-less default-padding">
        <div className="container">
          <div className="about-style-one-items">
            <div className="row">
              <div className="col-xl-7 col-lg-6">
                <div className="thumb-style-one">
                  <img title='Microcode Software' src="static/img/about/1.webp" alt="Img Not Found" />
                </div>
              </div>
              <div className="col-xl-5 col-lg-6 pl-50 pl-md-15 pl-xs-15">
                <div className="about-style-one-info">
                  <div className="content">
                    <h2 className="title">
                      Smart Solutions for Digital Future
                    </h2>
                    <p>
                      We don’t just build software at Microcode Software; we build growth engines! Our excellent team of developers delivers flexible and scalable software that delivers tangible business outcomes in this digital environment.
                    </p>
                    <a class="btn btn-md circle btn-gradient animation mt-20" href="/contact" data-discover="true">Contact Us</a>
                  </div>
                  {/* <ul className="card-list">
                    <li>
                      <img title='Microcode Software' src="static/img/icon/4.png" alt="Img Not Found" />
                      <h5>Digital Empowerment</h5>
                    </li>
                    <li>
                      <h2>3.8 X</h2>
                      <h5>Strategic Partnership </h5>
                    </li>
                  </ul> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AboutUsSection
