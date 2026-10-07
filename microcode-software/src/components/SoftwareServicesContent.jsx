import React from 'react'

function SoftwareServicesContent() {
  return (
    <div>
      <>
        <div className="services-content bg-gray default-padding">
          <div className="container">
            <div className="about-style-one-items">
              <div className="row">
                <div className="col-xl-7 col-lg-6">
                  <div className="thumb-style-one">
                    <img title='Microcode Software' src="static/img/custom/1.webp" alt="Img Not Found" />

                  </div>
                </div>
                <div className="col-xl-5 col-lg-6 pl-50 pl-md-15 pl-xs-15">
                  <div className="about-style-one-info">
                    <div className="content">
                      <h2 className="title">
                        Core App Capablities
                      </h2>
                      <p>
                        We provide latest application development services that fit the needs of a modern business. Our dedicated team builds custom, scalable solutions designed for the future, drawing upon the latest technologies, including mobile apps, web apps, IoT, low-code, no-code, and Shopify development.
                      </p>
                    </div>
                    <ul className="card-list">
                      <li>
                        <img title='Microcode Software' src="static/img/icon/4.png" alt="Img Not Found" />
                        <h5>Customize Applications</h5>
                      </li>
                      <li>
                        <h2>3.8 X</h2>
                        <h5>Scalable Architecture </h5>
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
                  At Microcode Software, we follow complete strategic consultations before application development to ensure the scalability and future growth of your business applications. We focus on user-centric designs to enhance your customers' engagement and experience. Our rapid development framework delivers your project in less time without any quality sacrifice, Our post-launch support guarantees regular monitoring and updates to keep your applications performing their best.
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
                        What are custom application development services?
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        Custom application development service includes designing, developing, and deploying software solutions according to the unique requirements of your business. We ensure better performance, scalability and effortless integration with existing systems by building this from scratch.
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
                        How do you choose the right technology stack for your app?
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
                          We select the technology stack based on the factors you need in your app, like functionality, target audience, security requirements and budget, etc. Our team of experts analyzes the project goals and recommends the most suitable combination of frontend, backend, database and cloud service that also ensures the high performance and future scalability of your application.
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
                        How do you ensure the security of mobile applications during development?
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
                          We implement the best practices such as data encryption, secure authentication, regular security audits, OWASP guidelines and secure API integrations. Our team of experts also follows the strict coding standard, threat modeling and penetration testing that ensures protection against data breaches and cyberattacks.
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

export default SoftwareServicesContent
