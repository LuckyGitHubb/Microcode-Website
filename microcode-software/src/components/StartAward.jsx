import React from 'react'

function StartAward() {
  return (
    <div>
      <div
        className="award-area bg-fixed"
        style={{ backgroundImage: "url(static/img/banner/20.webp)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="award-items text-center bg-dark text-light">
                <div className="award-item">
                  <img title='Microcode Software' src="static/img/icon/badge.png" alt="Img Not Found" />
                  <div className="center-info">
                    <h2>Your Trusted</h2>
                    <h4>Partner Since</h4>
                  </div>
                  <h2>2016</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default StartAward
