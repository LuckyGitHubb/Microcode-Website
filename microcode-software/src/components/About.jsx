import React from 'react'

function About() {
  return (
    <div>
      <div className="about-style-three-area default-padding">
        <div className="container">
          <div className="row align-center">
            <div className="col-lg-6">
              <div className="about-style-three-info">
                <h4 className="sub-title">About Us</h4>
                <h2 className="title split-text">
                  Code That Works, Marketing That Wins
                </h2>
                <p>
                  Microcode Software is more than a software development and digital marketing company in India. We are your trusted growth partner. Specializing in software development and digital marketing, we make the perfect fit for helping your business innovate with solutions that have success in mind. From custom software building to putting into place strategic marketing, it's just simple: help your business grow.
                </p>
                <div className="info-grid mt-50">
                  <div className="left-info wow fadeInLeft" data-wow-delay="200ms">
                    <div className="fun-fact-card-two">
                      <h4 className="sub-title">Our Expertise</h4>
                      <div className="counter-title">
                        <div className="counter">
                          <div className="timer" data-to={10} data-speed={2000}>
                            10
                          </div>
                          <div className="operator">+</div>
                        </div>
                      </div>
                      <span className="medium">Years of experience</span>
                    </div>
                  </div>
                  <div
                    className="right-info bg-gradient text-light wow fadeInLeft"
                    data-wow-delay="400ms"
                  >
                    <ul className="list-style-three">
                      <li>Application Development</li>
                      <li>Social Media Marketing</li>
                      <li>Performance Marketing</li>
                      <li>Software Development</li>
                      <li>Website Development</li>
                      <li>Shopify Development</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="thumb-style-two wow fadeInUp">
                <img title='Microcode Software' src="static/img/about/4.webp" alt="Img Not Found" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default About
