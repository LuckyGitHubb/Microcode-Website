import React from 'react'
// import { Link } from 'react-router-dom'

function WebDevServicesDetails() {
  return (
    <div>
      <div className="services-details-area default-padding">
        <div className="cotnainer">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="site-heading text-center">
                <h4 className="sub-title">Software Development</h4>
                <h1 className="title">Software Development That Drives Your Business Success</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="services-details-items">
            <div className="row">
              <div className="col-xl-12 services-single-content">
                <div className="thumb mb-50">
                  <img src="static/img/web/21.webp" alt="Thumb" title='Software Development' />
                </div>
                <p>
                  Microcode Software is a leading software development company in India; we deliver exceptional software development services customized to your business requirements. As the best software development company, we provide solutions based on the latest technologies and innovative thinking for high performance, growth, and efficiency. We always manage to deliver the project on time without any quality sacrifice. Whether you want enterprise-grade applications, custom software development, web development, or SaaS products, we are committed to fulfilling your business software requirements and making your software ready for the future.
                </p>
                <h2>Core Types of Software Development</h2>
                <p>
                  <strong>Web Development Services:</strong> We design high-performance websites and web applications that work flawlessly on any browser or device. Our web development services leverage top-notch front-end and back-end technologies (HTML, CSS, JavaScript, node.js, PHP, python) to work with anything from landing pages to e-commerce to SaaS products. We are a trusted software development company in India providing reliable web development services for businesses of all sizes.
                </p>
                <p>
                  <strong> Mobile App Development Services:</strong> Our developers design inspiring, feature-rich mobile apps for Android and iOS. Whether using native tools like Swift and Kotlin or cross-platform frameworks like Flutter and React Native, we help you design scalable apps that engage users with your brand, as well as help grow your business.

                </p>
                <p><strong>Desktop Software Development:</strong> At Microcode software, We design powerful desktop applications that run natively on Windows, macOS, and Linux. Whatever platform you're designing for or software solution scope you need to accomplish; from productivity tools to ERP systems to industry-specific software, we have covered you! Our team uses tools like C#, Java, C++, and Electron to design efficient and secure desktop software.
                </p>
                {/* <p><strong>Game Development Services:</strong> As the best software development company in Delhi, NCR, we bring creative gaming ideas to life with technical expertise. We provide full-cycle game development services for PC, Console, Mobile, and VR platforms. Our developers work in engines like Unity and Unreal Engine to build great immersion in storytelling, responsive controls, and quality visual design while building this experience.
                </p> */}
                <p><strong>Embedded Systems Development:</strong> We create custom, embedded software for IoT devices, smart appliances, wearables, and medical equipment. We accomplish this by developing in low-level programming languages (C, C++), which allows our engineers to fine-tune the system since its performance requires real-time and low-level interaction with hardware.
                </p>
                <p><strong>Cloud-Based Software Development:</strong> Cloud development offers high levels of scalability and performance. Using cloud platforms like AWS, Microsoft Azure and Google Cloud, we build cloud-native applications that enable businesses to provide their services securely and reliably from anywhere in the world.

                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="services-content bg-gray default-padding">
        <div className="container">
          <div className="about-style-one-items">
            <div className="row align-items-center">

              <div className="col-xl-7 col-lg-6 pl-50 pl-md-15 pl-xs-15">
                <div className="about-style-one-info">
                  <div className="content">
                    <h2 className="title">
                      Innovate Faster with Smarter Development
                    </h2>
                    <p>
                      Microcode Software offers flexible and scalable solutions in the domains of AI, IoT and blockchain so that businesses can save on costly in-house overhead. We can drive innovation, success and accelerate time to market as a digital agency partner.
                    </p>
                    <a class="btn btn-md circle btn-gradient animation mb-20 mb-lg-0" href="/contact" data-discover="true">Contact Us</a>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-lg-6">
                <div className="thumb-style-one">
                  <img src="static/img/web/2.webp" alt="Img Not Found" title='Application Development' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='services-details-area default-padding'>
        <div className='container'>
          <div className="process-style-one-items mt-50">
            <div className="choose-us-one-thumb">
              <div className="content">
                <div className="left-info">
                  <h2 className="title">
                    Smart Software for Bold Businesses
                  </h2>
                </div>
                <div className="process-style-one">
                  <div className="process-style-one-item">
                    <span>01</span>
                    <h4>Planning & Analysis</h4>
                    <p>
                      Clarify objectives for the project, identify requirements, and develop the project plan.
                    </p>
                  </div>
                  <div className="process-style-one-item">
                    <span>02</span>
                    <h4>Design & Development</h4>
                    <p>
                      Establish system architecture, UI/UX and build the software by developing code.
                    </p>
                  </div>
                  <div className="process-style-one-item">
                    <span>03</span>
                    <h4>Testing & Deployment</h4>
                    <p>
                      Test for defects, verify quality, and deploy the product to users.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default WebDevServicesDetails
