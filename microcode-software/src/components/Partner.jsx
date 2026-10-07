import React from 'react'

function Partner() {
  return (
    <div>
      <div
  className="partner-style-one-area default-padding bg-dark text-light"
  style={{ backgroundImage: "url(static/img/shape/25.png)" }}
>
  <div className="container">
    <div className="row align-center">
      <div className="col-xl-4">
        <h2 className="title split-text">Thrusted brands work with us</h2>
      </div>
      <div className="col-xl-8 pl-60 pl-md-15 pl-xs-15 brand-one-contents">
        <div className="brand-style-one-items">
          <div className="brand-style-one-carousel swiper">
            {/* Additional required wrapper */}
            <div className="swiper-wrapper">
              {/* Single Item */}
              <div className="swiper-slide">
                <div className="brand-one">
                  <img title='Microcode Software' src="static/img/brand/11.png" alt="Image Not Found" />
                </div>
              </div>
              {/* End Single Item */}
              {/* Single Item */}
              <div className="swiper-slide">
                <div className="brand-one">
                  <img title='Microcode Software' src="static/img/brand/22.png" alt="Image Not Found" />
                </div>
              </div>
              {/* End Single Item */}
              {/* Single Item */}
              <div className="swiper-slide">
                <div className="brand-one">
                  <img title='Microcode Software' src="static/img/brand/55.png" alt="Image Not Found" />
                </div>
              </div>
              {/* End Single Item */}
              {/* Single Item */}
              <div className="swiper-slide">
                <div className="brand-one">
                  <img title='Microcode Software' src="static/img/brand/66.png" alt="Image Not Found" />
                </div>
              </div>
              {/* End Single Item */}
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

export default Partner
