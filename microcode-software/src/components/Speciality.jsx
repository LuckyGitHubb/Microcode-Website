import React from 'react'

function Speciality() {
  return (
    <div>
      <div className="speciality-style-one-area default-padding-bottom">
        <div className="container">
          <div className="row align-center">
            <div className="col-lg-4">
              <img title='Microcode Software' src="static/img/shape/1.webp" alt="side-image" style={{ borderRadius: 30 + 'px' }} />

            </div>
            <div className="col-xl-7 offset-xl-1 col-lg-8 pt-lg-0  pt-120">
              <div className="speciality-items">
                <h4 className="sub-title">Our Goal</h4>
                <h2 className="title">
                  Your satisfaction is our top priority
                </h2>
                <div className="d-grid mt-40">
                  <ul className="list-style-two">
                    <li>Custom Solutions </li>
                    <li>Agile Development</li>
                    <li>Quality Assurance</li>
                    <li>Scalable Architecture</li>
                  </ul>

                  <ul className="list-style-two">
                    <li>User-Centric Design </li>
                    <li>Continuous Support</li>
                    <li>Transparent Process</li>
                    <li>Rapid Delivery</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Speciality
