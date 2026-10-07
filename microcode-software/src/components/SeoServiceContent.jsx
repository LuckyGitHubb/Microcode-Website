import React from 'react'

function SeoServicesContent() {
    return (
        <div>
            <>
                <div className="services-content bg-gray default-padding">
                    <div className="container">
                        <div className="about-style-one-items">
                            <div className="row">
                                <div className="col-xl-7 col-lg-6">
                                    <div className="thumb-style-one">
                                        <img title='Microcode Software' src="static/img/seo/1.webp" alt="Img Not Found" />
                                    </div>
                                </div>
                                <div className="col-xl-5 col-lg-6 pl-50 pl-md-15 pl-xs-15">
                                    <div className="about-style-one-info">
                                        <div className="content">
                                            <h2 className="title">
                                            Rank Higher, Reach Further
                                            </h2>
                                            <p>
                                                SEO in 2025 is about leaner tactics and better experiences. From AI optimizations and zero-click searches to video content and UX optimizations, staying ahead means providing speed, engagement, and better experiences that users and search engines love.
                                            </p>
                                        </div>
                                        <ul className="card-list">
                                            <li>
                                                <img title='Microcode Software' src="static/img/icon/4.png" alt="Img Not Found" />
                                                <h5>Quality Traffic</h5>
                                            </li>
                                            <li>
                                                <h2>3.8 X</h2>
                                                <h5>Increased ROI </h5>
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
                                    SEO (Search Engine Optimization) enhances your website's online presence on search engines like Google. It also attracts organic traffic to your website, increases leads and maximizes your ROI. Additionally, the technical SEO resolves technical issues like broken links, slow loading performance and poor user experience, after the solution of these issues, your website is ready to be visible online on any online platform.
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
                                                What is an SEO Company?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseOne"
                                            className="accordion-collapse collapse show"
                                            aria-labelledby="headingOne"
                                            data-bs-parent="#faqAccordion"
                                        >
                                            <div className="accordion-body">
                                                An SEO company helps you to improve your website's online presence on search engines by driving organic traffic, leads and sales for your business.
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
                                                How Much Do SEO Services Cost?
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
                                                    The cost will vary depending on the complexity of your project. We offer very affordable seo services in India for all types of business.

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
                                                How Long Does It Take to See Results?
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
                                                    SEO is a long-term strategy in most businesses. You can see the results in 3 to 6 months.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item accordion-style-one">
                                        <h2 className="accordion-header" id="headingFour">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseFour"
                                                aria-expanded="false"
                                                aria-controls="collapseFour"
                                            >
                                                Which Tools Do You Use for SEO?

                                            </button>
                                        </h2>
                                        <div
                                            id="collapseFour"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingFour"
                                            data-bs-parent="#faqAccordion"
                                        >
                                            <div className="accordion-body">
                                                <p>
                                                    We use advanced tools like SEMrush, Ahrefs and Google Analytics for research, analysis and reporting.
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

export default SeoServicesContent
