import React from 'react'

function Testimonials() {
  return (
    <div>
      <div
        className="testimonial-style-two-area bg-dark default-padding text-light bg-cover"
        style={{ backgroundImage: "url(static/img/shape/5.webp)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="testimonial-two-info">
                <div className="icon">
                  <img title='Microcode Software' src="static/img/quote.png" alt="Img Not Found" />
                </div>
                <h2 className="split-text">
                  Words from Our Valued Clients
                </h2>
                <div className="review-card">
                  <h6>Excellent 5,120+ Reviews</h6>
                  <div className="d-flex">
                    <div className="icon">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                    </div>
                    <span>4.8/5</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 pl-60 pl-md-15 pl-xs-15">
              <div className="testimonial-style-two-carousel swiper">
                {/* Additional required wrapper */}
                <div className="swiper-wrapper">
                  {/* Single item */}
                  <div className="swiper-slide">
                    <div className="testimonial-style-two">
                      <div className="item">
                        <div className="text-info">
                          <p>
                            "Microcode as a software development company in India, has a unique approach that utilizes a specific, data-driven approach that tripled our business engagement. Amazing!"
                          </p>
                        </div>
                        <div className="content">
                          {/* <div className="thumb">
                            <img title='Microcode Software' src="static/img/team/v1.webp" alt="Img Not Found" />
                          </div> */}
                          <div className="info">
                            <h4>Anita S.</h4>
                            <span>Senior Consultant</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Single item */}
                  {/* Single item */}
                  <div className="swiper-slide">
                    <div className="testimonial-style-two">
                      <div className="item">
                        <div className="text-info">
                          <p>
                            "The web design exceeded all my expectations; it is beautiful, intuitive to use, and highly performance optimized."
                          </p>
                        </div>
                        <div className="content">
                          {/* <div className="thumb">
                            <img title='Microcode Software' src="static/img/team/v2.webp" alt="Img Not Found" />
                          </div> */}
                          <div className="info">
                            <h4>Rakesh M.</h4>
                            <span>Marketing Manager</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Single item */}
                  {/* Single item */}
                  <div className="swiper-slide">
                    <div className="testimonial-style-two">
                      <div className="item">
                        <div className="text-info">
                          <p>
                            "The app is smooth and intuitive, I can always rely on it. Microcode understood our needs perfectly to ensure our users are super satisfied."
                          </p>
                        </div>
                        <div className="content">
                          {/* <div className="thumb">
                            <img title='Microcode Software' src="static/img/team/v2.webp" alt="Img Not Found" />
                          </div> */}
                          <div className="info">
                            <h4>Vikram R.</h4>
                            <span>Marketing Manager</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Single item */}
                  {/* Single item */}
                  <div className="swiper-slide">
                    <div className="testimonial-style-two">
                      <div className="item">
                        <div className="text-info">
                          <p>
                          "Based on my analysis, it seems that Microcode is one of the best online marketing companies in India based on their performance marketing capabilities and ROI, impressive work!"
                          </p>
                        </div>
                        <div className="content">
                          {/* <div className="thumb">
                            <img title='Microcode Software' src="static/img/team/v2.webp" alt="Img Not Found" />
                          </div> */}
                          <div className="info">
                            <h4>Deepika J.</h4>
                            <span>Marketing Manager</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Single item */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Testimonials
