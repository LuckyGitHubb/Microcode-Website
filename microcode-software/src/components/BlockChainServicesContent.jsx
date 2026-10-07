import React from 'react'

function BlockChainServicesContent() {
    return (
        <div>
            <>
                <div className="services-content bg-gray default-padding">
                    <div className="container">
                        <div className="about-style-one-items">
                            <div className="row">
                                <div className="col-xl-7 col-lg-6">
                                    <div className="thumb-style-one">
                                        <img title='Microcode Software' src="static/img/blockchain/1.webp" alt="Img Not Found" />

                                    </div>
                                </div>
                                <div className="col-xl-5 col-lg-6 pl-50 pl-md-15 pl-xs-15">
                                    <div className="about-style-one-info">
                                        <div className="content">
                                            <h2 className="title">
                                                Smarter Ads, Better ROI
                                            </h2>
                                            <p>
                                                At Microcode Software, We offer a wide range of PPC Advertising services designed to get more results and maximize your ROI for business. Our strategies cover search engines, social media, display ads and remarketing that ensure your brand to reach the right audience.
                                            </p>
                                        </div>
                                        <ul className="card-list">
                                            <li>
                                                <img title='Microcode Software' src="static/img/icon/4.png" alt="Img Not Found" />
                                                <h5>Search Engine Ads
                                                </h5>
                                            </li>
                                            <li>
                                                <h2>3.8 X</h2>
                                                <h5>Social Media Ads </h5>
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
                                    At Microcode Software, we are concerned about not just pure numbers but the quality clicks that convert. Our strategies are a combination of our proven cutting-edge technology, depth of industry experience, and a desire to see you succeed. We will run hyper-targeted campaigns, based on behavioral and device preferences to acquire your core audience. Our ads are written to match users intent, we won't send them down a rabbit hole, our goal is a CTR increase by matching buyer intent. Using Real Time optimization and transparent and easy to read reports, performance and costs are something you can undertand without hidden fees. Our remarketing is behaviourally driven and allows us to get high chances of conversion from users. Most importantly our focus is longterm growth by using PPC metrics to assist your overall sustainable marketing plan.
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
                                                How soon will I see results from my PPC ads?
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
                                                    PPC can start generating traffic right after launch. You can expect meaningful results (qualified leads, conversions, etc.) within 2–4 weeks as we gather data, measure performance, and optimize for the best results.
                                                </p>
                                                <ul className="list-style-two">
                                                    <li>Immediate Traffic                                                    </li>
                                                    <li>Testing Phase
                                                    </li>
                                                    <li>Fast Optimization</li>
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
                                                How do you ensure my ads reach the right audience?
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
                                                    We use advanced targeting techniques through keyword intent, geography, device, audience behavior and remarketing strategies. This allows your ads to reach the people that make most sense to push your business and convert from an interested party to an actual customer.
                                                </p>
                                                <ul className="list-style-two">
                                                    <li>Smart Targeting</li>
                                                    <li>User Behavior</li>
                                                    <li>Remarketing Strategy</li>
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
                                                How much of the budget do I need to start a PPC campaign?
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
                                                    We suggest an initial budget that suits your business objectives and the level of competition within your industry. Each campaign is tailored to fit the size of your business, goals and targeted return on investment (ROI), therefore the best possible outcome can be achieved within your chosen budget.
                                                </p>
                                                <ul className="list-style-two">
                                                    <li>Custom Budgeting                                                   </li>
                                                    <li>ROI Focused</li>
                                                    <li>Scalable Spend
                                                    </li>
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

export default BlockChainServicesContent
