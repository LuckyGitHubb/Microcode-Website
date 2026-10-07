import React from 'react'

function WebDevServicesContent() {
  return (
    <div>
      <>
        <div className="services-content bg-gray default-padding">
          <div className="container">
            <div className="about-style-one-items">
              <div className="row">
                <div className="col-xl-7 col-lg-6">
                  <div className="thumb-style-one">
                    <img title='Microcode Software' src="static/img/web/1.webp" alt="Img Not Found" />

                  </div>
                </div>
                <div className="col-xl-5 col-lg-6 pl-50 pl-md-15 pl-xs-15">
                  <div className="about-style-one-info">
                    <div className="content">
                      <h2 className="title">
                      Smart Tech for Every Stage
                      </h2>
                      <p>
                      At Microcode Software, we provide personalized software solutions for your business, whether you are a startup or a established brand. We build secure, scalable and user-friendly software to give you the competitive edge.
                      </p>
                    </div>
                    <ul className="card-list">
                      <li>
                        <img title='Microcode Software' src="static/img/icon/4.png" alt="Img Not Found" />
                        <h5>Innovative Software Solutions</h5>
                      </li>
                      <li>
                        <h2>3.8 X</h2>
                        <h5>Cloud-based Application Development </h5>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="services-content default-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="title">Frequently Asked Questions</h2>
                <p>
                  At Microcode Software, we believe every project is different and requires a unique plan for maximum results. Our experts assess your business type, audience, and goals, scalability, security, and choose the best technology for your business development. We take care to ensure that the technology we choose works towards your long-term visions. We always consider performance and security, which will ensure your software will be working correctly and ready for future evolution.
                </p>
                <div className="accordion mt-50" id="faqAccordion">
                  <div className="accordion-item accordion-style-one">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        What is a software development service?
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        <p>
                          In software development services, we develop software by designing, developing, testing, and maintaining it per your business's requirements. </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item accordion-style-one">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        How do you ensure the scalability of custom software?
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        <p>
                          We implement modular architecture, cloud computing, optimized databases, and flexible APIs to ensure the scalability of your custom software solution.
                        </p>

                      </div>
                    </div>
                  </div>
                  <div className="accordion-item accordion-style-one">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        What is CSD in software development?
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        <p>
                          CSD stands for custom software development, which is software that is customized according to your business's unique requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

    </div>
  )
}

export default WebDevServicesContent
