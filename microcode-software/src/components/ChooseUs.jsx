import React from 'react'
import { Link } from 'react-router-dom'

function ChooseUs() {
  return (
    <div>
      <div className="choose-us-style-two-area relative bg-dark text-light">
        <div className="container">
          <div className="row align-center py-md-5">
            <div className="col-xl-6 order-xl-last pl-80 pl-md-15 pl-xs-15 choose-us-style-two-content">
              <div className="info-style-one">
                <h4 className="sub-title">Why Choose Microcode Software</h4>
                <h2 className="title split-text">
                  The Game-Changer in Your Business Success
                </h2>
                <p>
                  Microcode Software is a leading software development company in India, that helps you by working through customized solutions, data-centric strategies and results-focused services. We immerse ourselves within your systems for long-term growth support for your long-term digital growth.
                </p>
                <ul className="list-sytle-four mt-30">
                  <li className="wow fadeInUp">
                    <h4>Custom Software Development</h4>
                    <p>
                      Our software solutions are carefully crafted to fit perfectly in your existing ecosystem.
                    </p>
                  </li>
                  <li className="wow fadeInUp">
                    <h4>Targeted Digital Marketing</h4>
                    <p>
                      Our campaign methods are laser-focused on solving the unique challenges and maximizing ROI for your company.
                    </p>
                  </li>
                </ul>
                <Link
                  className="btn btn-md circle btn-gradient animation mt-20"
                  to="/about"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="thumb-style-three">
                <img title='Microcode Software' src="static/img/illustration/7.png" alt="Not Found" />
                <div
                  className="circle-text"
                  style={{ backgroundImage: "url(static/img/shape/26.png)" }}
                >
                  {/* curved-circle start*/}
                  <div
                    className="circle-text-item"
                    data-circle-text-options='{"radius": 81, "forceWidth": true, "forceHeight": true }'
                  >
                    . Certified Company . IT Consulting Solution
                  </div>
                 
                    {/* <i className="fas fa-long-arrow-right" /> */}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ChooseUs
