import React from 'react'

function AppServicesContent() {
  return (
    <div>
      <>
        <div className="services-content bg-gray default-padding">
          <div className="container">
            <div className="about-style-one-items">
              <div className="row">
                <div className="col-xl-7 col-lg-6">
                  <div className="thumb-style-one">
                    <img title='Microcode Software' src="static/img/mobile/1.webp" alt="Img Not Found" />

                  </div>
                </div>
                <div className="col-xl-5 col-lg-6 pl-50 pl-md-15 pl-xs-15">
                  <div className="about-style-one-info">
                    <div className="content">
                      <h2 className="title">
                        Strategic Social Success
                      </h2>
                      <p>
                        Social media marketing at Microcode Software is about connections, not content. We build relationships that increase visibility and drive results! From growing followers to engagement and sales, we create strategies tailored to your specific social media business goals.
                      </p>
                    </div>
                    <ul className="card-list">
                      <li>
                        <img title='Microcode Software' src="static/img/icon/4.png" alt="Img Not Found" />
                        <h5>Organic Social Media Marketing</h5>
                      </li>
                      <li>
                        <h2>3.8 X</h2>
                        <h5>Community Building </h5>
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
                  Social media marketing is important because it allows various businesses to reach global audiences, boost brand awareness and direct engagement with their customers. Social media platforms give you a chance to get the right audience cost-effectively. Social media also provides instant feedback and Valuable insights that help your business grow. It has become an important tool for aligning your business goals with success.
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
                        What do social media marketing services include?
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        <p>Social media marketing services include:</p>
                        <ul className="list-style-two">
                          <li><strong>Social Media Strategy Development:</strong> Develop customized social media strategies according to your business goals and target audience. </li>
                          <li><strong>Content Creation:</strong> Creating engaging and valuable content with images, videos and stories for your brand. </li>
                          <li><strong>Community Management:</strong> Encouraging two-way communications, responding to comments and promoting engagements.</li>
                          <li><strong>Paid Social Media Advertising:</strong> Running targeted ad campaigns to expand your business reach, engagement and conversions. </li>
                          <li><strong>Analytics and Reporting:</strong> Regular analysis of analytics reports to optimize future campaigns. </li>
                          <li><strong>Influencer Marketing:</strong> Collaborations with influencers to promote your brand to a wide range of audiences. </li>
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
                        Can I hire someone to manage my social media?
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
                          Yes, You can hire a social media marketing company like Microcode Software. We manage all your social media platforms like Facebook, Instagram, LinkedIn and Twitter. Our team of experts builds customized strategies based on your business goals. We create content, engage with your followers, and manage paid advertising campaigns to enhance online visibility. </p>
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
                        What are the most effective social media platforms for marketing?
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
                          The most effective social media platform for marketing can be determined according to your business type and target audience.

                        </p>
                        <ul className="list-style-two">
                          <li><strong>Facebook:</strong> An excellent platform for a broad audience and paid advertising.</li>
                          <li><strong>Instagram:</strong>  An ideal platform for brands related to lifestyle, fashion, and food.</li>
                          <li><strong>LinkedIn:</strong> A professional platform especially for B2B networking and marketing.</li>
                          <li><strong>Twitter:</strong> An effective platform for engagement building, updates and conversations. </li>
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

export default AppServicesContent
