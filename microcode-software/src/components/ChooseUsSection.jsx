import React from 'react'

function ChooseUsSection() {
  return (
    <div>
      <div className="choose-us-style-one-area overflow-hidden default-padding-top default-padding-bottom bg-white">
        <div className="container">
          <div className="heading-left">
            <div className="row">
              <div className="col-lg-5 offset-lg-1">
                <div className="experience-style-one">
                  <h2>
                    <strong>10</strong> Years of Experience
                  </h2>
                </div>
              </div>
              <div className="col-lg-5 offset-lg-1">
                <div className="circle-progress">
                  <div className="progressbar">
                    <div className="circle" data-percent={90}>
                      <strong />
                    </div>
                    <h4>Custom Software </h4>
                  </div>
                  <div className="progressbar">
                    <div className="circle" data-percent={85}>
                      <strong />
                    </div>
                    <h4>Digital Marketing</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container container-stage">
          <div className="choose-us-one-thumb">
            <div className="content">
              <div className="left-info">
                <h2 className="title">Smart Strategy, Bold Design </h2>
              </div>
              <div className="process-style-one">
                <div className="process-style-one-item">
                  <span>01</span>
                  <h4>Discovery</h4>
                  <p>
                    We conduct in-depth research to understand your business, targeted audience and the goals of your business.
                  </p>
                </div>
                <div className="process-style-one-item">
                  <span>02</span>
                  <h4>Strategy Planning</h4>
                  <p>
                    We build a clear roadmap, Suitable designs and choose a tech stack according to your business requirements.
                  </p>
                </div>
                <div className="process-style-one-item">
                  <span>03</span>
                  <h4>Software Development:</h4>
                  <p>
                    Our team of expert developers builds customized solutions that ensure the high quality, scalability, and functionality of your software.                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ChooseUsSection
