import React from 'react'

function FunFact() {
  return (
    <div>
      <div className="fun-fact-style-onea-rea default-padding-bottom default-padding-top bg-gray">
        <div className="container">
          <div className="fun-fact-style-one-items text-center">
            <div className="row">
              {/* Single item */}
              <div className="col-lg-3 col-md-6 funfact-style-one-item">
                <div className="fun-fact">
                  <div className="counter">
                    <div className="timer" data-to={150} data-speed={2000}>
                      150
                    </div>
                    <div className="operator">+</div>
                  </div>
                  <span className="medium">Project
                    Completed</span>
                </div>
              </div>
              {/* End Single item */}
              {/* Single item */}
              <div className="col-lg-3 col-md-6 funfact-style-one-item">
                <div className="fun-fact">
                  <div className="counter">
                    <div className="timer" data-to={60} data-speed={2000}>
                      60
                    </div>
                    <div className="operator">+</div>
                  </div>
                  <span className="medium">Happy
                    Customers</span>
                </div>
              </div>
              {/* End Single item */}
              {/* Single item */}
              <div className="col-lg-3 col-md-6 funfact-style-one-item">
                <div className="fun-fact">
                  <div className="counter">
                    <div className="timer" data-to={10} data-speed={2000}>
                      10
                    </div>
                    <div className="operator">+</div>
                  </div>
                  <span className="medium">Years of Experience</span>
                </div>
              </div>
              {/* End Single item */}
              {/* Single item */}
              <div className="col-lg-3 col-md-6 funfact-style-one-item">
                <div className="fun-fact">
                  <div className="counter">
                    <div className="timer" data-to={20} data-speed={2000}>
                      20
                    </div>
                    <div className="operator">+</div>
                  </div>
                  <span className="medium">Industries Serve</span>
                </div>
              </div>
              {/* End Single item */}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default FunFact
