import React from 'react'

function UiServicesContent() {
  return (
    <div>
      <>
        <div className="services-content bg-gray default-padding">
          <div className="container">
            <div className="about-style-one-items">
              <div className="row">
                <div className="col-xl-7 col-lg-6">
                  <div className="thumb-style-one">
                    <img title='Microcode Software' src="static/img/ui/1.webp" alt="Img Not Found" />

                  </div>
                </div>
                <div className="col-xl-5 col-lg-6 pl-50 pl-md-15 pl-xs-15">
                  <div className="about-style-one-info">
                    <div className="content">
                      <h2 className="title">
                        Where Design Meets Revenue
                      </h2>
                      <p>
                        Microcode Software offers professional Shopify development customize to your brand and goals. We create a fast, scalable, mobile-friendly store that drives conversions and integrates seamlessly with the tools you need.
                      </p>
                    </div>
                    <ul className="card-list">
                      <li>
                        <img title='Microcode Software' src="static/img/icon/4.png" alt="Img Not Found" />
                        <h5>Responsive Design</h5>
                      </li>
                      <li>
                        <h2>3.8 X</h2>
                        <h5>Speed Optimization</h5>
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
                  At Microcode, we create custom, high-performance Shopify stores that fit your brand. Our team delivers seamless design, rapid page load times, and smooth integrations that help you sell more. We focus on the entire process from strategy to even your launch and we are committed to helping you grow and succeed afterwards.
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
                        How long will it take to build my Shopify store?
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
                          The timeline is dependent on your project scope and complexity. On average, a standard build is 4-6 weeks, however complex stores could take longer to build.
                        </p>
                        <ul className="list-style-two">
                          <li>Project Scope</li>
                          <li>Design Complexity</li>
                          <li>Project Customization Level</li>
                        </ul>
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
                        Will my Shopify store be optimized for mobile and fast performance?
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
                          Yes, we ensure mobile-friendly and fast loading speeds on every device. All the stores we build are responsive and optimized for speed and performance to ensure a good user experience.
                        </p>
                        <ul className="list-style-two">
                          <li>Mobile Friendly</li>
                          <li>Speed Optimized</li>
                          <li>SEO Ready</li>
                        </ul>
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
                        What kind of ongoing support do you provide after the store is live?
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
                          We provide ongoing support for updates, troubleshooting, and performance monitoring to ensure your store is operating seamlessly. We are always available to help post-launch.
                        </p>
                        <ul className="list-style-two">
                          <li>Regular updates</li>
                          <li>Technical support</li>
                          <li>Performance monitoring</li>
                        </ul>
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

export default UiServicesContent
