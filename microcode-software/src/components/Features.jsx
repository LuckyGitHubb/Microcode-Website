import React from 'react'

function Features() {
  return (
    <div>
      <div className="features-style-two-area default-padding bottom-less bg-gray">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h4 className="sub-title">Our Features</h4>
                <h2 className="title split-text">
                  The Microcode Edge
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {/* Single Item */}
            <div className="col-xl-4 col-md-6 feature-style-two-item">
              <div className="feature-style-two wow fadeInRight">
                <div className="thumb">
                  <img title='Microcode Software' src="static/img/features/2.webp" alt="Thumb" />
                  <div className="title">
                    <div className="top">
                      <img title='Microcode Software' src="static/img/icon/13.png" alt="Icon Not Found" />
                      <h4>
                        Complete Digital Coverage
                      </h4>
                    </div>
                  </div>
                  <div className="overlay text-center">
                    <div className="content">
                      <div className="icon">
                        <img title='Microcode Software' src="static/img/icon/13.png" alt="Icon Not Found" />
                      </div>
                      <h4 className="text-white">
                        Complete Digital Coverage
                      </h4>
                      <p>
                        We will manage the full digital experience from strategy and design through development and delivery.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Single Item */}
            {/* Single Item */}
            <div className="col-xl-4 col-md-6 feature-style-two-item">
              <div
                className="feature-style-two wow fadeInRight"
                data-wow-delay="200ms"
              >
                <div className="thumb">
                  <img title='Microcode Software' src="static/img/features/1.webp" alt="Thumb" />
                  <div className="title">
                    <div className="top">
                      <img title='Microcode Software' src="static/img/icon/14.png" alt="Icon Not Found" />
                      <h4 >
                        Marketing & Tech Integration
                      </h4>
                    </div>
                  </div>
                  <div className="overlay text-center">
                    <div className="content">
                      <div className="icon">
                        <img title='Microcode Software' src="static/img/icon/14.png" alt="Icon Not Found" />
                      </div>
                      <h4 className="text-white">
                        Marketing & Tech Integration
                      </h4>
                      <p>
                        We merge strategic marketing and leveraged code in delivering performance-driven solutions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Single Item */}
            {/* Single Item */}
            <div className="col-xl-4 col-md-6 feature-style-two-item">
              <div
                className="feature-style-two wow fadeInRight"
                data-wow-delay="400ms"
              >
                <div className="thumb">
                  <img title='Microcode Software' src="static/img/features/3.webp" alt="Thumb" />
                  <div className="title">
                    <div className="top">
                      <img title='Microcode Software' src="static/img/icon/15.png" alt="Icon Not Found" />
                      <h4>
                        Agile and Scalable Delivery
                      </h4>
                    </div>
                  </div>
                  <div className="overlay text-center">
                    <div className="content">
                      <div className="icon">
                        <img title='Microcode Software' src="static/img/icon/15.png" alt="Icon Not Found" />
                      </div>
                      <h4 className="text-white">
                        Agile and Scalable Delivery
                      </h4>
                      <p>
                        Rapid and flexible development in lock-step with your evolving business objectives.
                      </p>
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

export default Features
