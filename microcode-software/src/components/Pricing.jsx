import React, { useState } from 'react';
import { useCart } from "../context/cartContext"; // adjust the path as needed
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';


function Pricing() {

  const [activeTab, setActiveTab] = useState('tab1');

  const [expandedCards, setExpandedCards] = useState({});

  const navigate = useNavigate();

  const tabLabels = {
    tab1: "Business Plan",
    tab2: "Digital Marketing",
    tab3: "Email Marketing",
    tab4: "Web Development"
  };


  const { addToCart } = useCart();


  return (
    <div>
      <div
        className="pricing-style-one-area default-padding bg-cover bg-gray"
        style={{ backgroundImage: "url(static/img/shape/3.webp)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h4 className="sub-title">Pricing Plan</h4>
                <h2 className="title">Our Pricing Packages</h2>
              </div>
            </div>
          </div>
        </div>


        <div className='container'>
          <ul className="nav nav-tabs d-flex mb-5">
            <li className="nav-item flex-fill text-center">
              <button className={`nav-link w-100 btn circle ${activeTab === 'tab1' ? 'active' : ''}`} onClick={() => setActiveTab('tab1')}>
                Business Plan
              </button>
            </li>
            <li className="nav-item flex-fill text-center">
              <button className={`nav-link w-100 btn circle ${activeTab === 'tab2' ? 'active' : ''}`} onClick={() => setActiveTab('tab2')}>
                Digital Marketing
              </button>
            </li>
            <li className="nav-item flex-fill text-center">
              <button className={`nav-link w-100 btn circle ${activeTab === 'tab3' ? 'active' : ''}`} onClick={() => setActiveTab('tab3')}>
                Email Marketing
              </button>
            </li>
            <li className="nav-item flex-fill text-center">
              <button className={`nav-link w-100 btn circle ${activeTab === 'tab4' ? 'active' : ''}`} onClick={() => setActiveTab('tab4')}>
                Web Development
              </button>
            </li>
          </ul>
        </div>


        <div className="tab-content mt-3">
          {activeTab === 'tab1' && <div >
            <div className='px-5'>
              <div className="row">
                {['Basic', 'Lite', 'Premium', 'Enterprise'].map((plan, index) => {
                  const plans = {
                    Basic: [
                      "Unlimited Contacts",
                      "Up to 300 Emails Per Day",
                      "Chat Support",
                      "1 Free Domain",
                      "5 Page Website (Dynamic)",
                      "1 Email",
                      "1 Month Free Hosting",
                      "24/7 Support",
                      "Annual Renewal",
                      "Website Review",
                      "5 Keywords",
                      "Website Competitor Analysis",
                      "Content Duplicity",
                      "ON Page SEO",
                      "Meta Tags Optimization",
                      "URL Structure",
                      "Google Analytics Tracking",
                      "Content Marketing",
                      "Blog Posting",
                      "Article Writing (500 Words)",
                      "Press Release Submission (500 Words)",
                      "Email Outreach"
                    ],
                    Lite: [
                      "Website Review and Analysis",
                      "Initial Ranking",
                      "Keyword Research",
                      "On Page SEO",
                      "Content Optimization",
                      "Image Optimization",
                      "Heading Tag Optimization",
                      "Content Marketing",
                      "Blog Post",
                      "Article",
                      "Press Release",
                      "Email Outreach",
                      "Guest Blogging",
                      "Broken Backlink",
                      "For Startup",
                      "Everything in Basic",
                      "No Daily Sending Limit",
                      "Email Support",
                      "Lite + Addon A/B Testing",
                      "Remove Branding",
                      "Advance Statistics",
                      "5 Business Email",
                      "10 Page Website",
                      "Image and Videos",
                      "SEO Express"
                    ],
                    Premium: [
                      "Everything in Lite",
                      "Marketing Automation",
                      "Facebook Ads",
                      "Landing Page",
                      "Multi User Access",
                      "Phone Support",
                      "Unlimited Email",
                      "Unlimited Pages",
                      "Unlimited Video/Image",
                      "3 Month SEO",
                      "Payment Gateway Integrate Multiple",
                      "Free Chat Tool",
                      "Free Google Analytics",
                      "Annual Renewal",
                      "Client Support",
                      "Email",
                      "Chat",
                      "Phone",
                      "Monthly Reporting",
                      "Keyword Ranking",
                      "Google Analysis",
                      "Accuried Link Report",
                      "Off Page SEO",
                      "Social Sharing (40)",
                      "Blog Social Sharing",
                      "Slide Submission (2)",
                      "Email Outreach",
                      "Alerts Mention",
                      "Local SEO Setup",
                      "Google Maps Integrate",
                      "Local Citations (15)",
                      "Local Classified (5)"
                    ],
                    Enterprise: [
                      "For those who want to grow more",
                      "All From Premium",
                      "Custom Volume of Email",
                      "Priority Sending",
                      "20+ Landing Pages",
                      "10+ User Access",
                      "SSO",
                      "CSM (Customer Success Manager)",
                      "Premium Support",
                      "24/7 365 Days Support",
                      "6 Month Basic SEO",
                      "Unlimited Bandwidth",
                      "Personalize Chat Tool",
                      "SM Integration",
                      "Free SSL",
                      "Full Customization",
                      "Annual Renewal",
                      "INITIAL REVIEW & ANALYSIS",
                      "Max 25 Keywords",
                      "Website & Competitor Analysis",
                      "Initial Ranking Report",
                      "Keywords Research",
                      "ON PAGE SEO ANALYSIS",
                      "Meta Tags Creation",
                      "Robots.txt",
                      "Website Speed Optimization",
                      "Heading Tag Optimization",
                      "Blog Optimization – 10 Posts",
                      "Google Analytics & Search Console Setup",
                      "CONTENT MARKETING",
                      "Blog Posting (500 – 700 words) – 2",
                      "Article Writing and Submissions (500 – 700 words) – 4",
                      "Press Release Submissions (300 – 500 words) – 2",
                      "OFF PAGE SEO",
                      "Text-Based Infographic Creation – 3",
                      "Video – 1 Product Related (1 Minute)",
                      "Q & A – 5"
                    ]
                  };

                  const planPrice = {
                    Basic: "$599.99",
                    Lite: "$699.99",
                    Premium: "$799.99",
                    Enterprise: "$999.99"
                  };



                  const toggleExpand = (plan) => {
                    setExpandedCards((prev) => ({
                      ...prev,
                      [plan]: !prev[plan],
                    }));
                  };

                  return (
                    <div key={plan} className="col-lg-3">
                      <div className="pricing-style-one wow fadeInUp ">
                        <div className="pricing-header">
                          <h4>{plan} Plan</h4>
                          <h2>{planPrice[plan]}</h2>
                          <span>Per Month Package</span>
                        </div>
                        <ul className='position-relative'>
                          {plans[plan].slice(0, 5).map((feature, i) => (
                            <li key={i}><i className="fas fa-check" /> {feature}</li>
                          ))}

                          {expandedCards[plan] && plans[plan].slice(5).map((feature, i) => (
                            <li key={i + 5}><i className="fas fa-check" /> {feature}</li>
                          ))}

                          {plans[plan].length > 5 && (
                            <button
                              onClick={() => toggleExpand(plan)}
                              className="bg-transparent border-0 position-absolute end-0 bottom-0"
                              title='Read More Points'
                            >
                              <i
                                className={`fas fa-long-arrow-alt-down`}
                                style={{
                                  transition: "transform 0.3s",
                                  transform: expandedCards[plan] ? "rotate(180deg)" : "rotate(0deg)"
                                }}
                              />
                            </button>
                          )}

                        </ul>
                        <button
                          className="btn btn-md circle btn-gradient animation"
                          onClick={() => {
                            const added = addToCart({
                              name: `${plan} Plan`,
                              category: tabLabels[activeTab],
                              price: parseFloat(planPrice[plan].replace("$", ""))
                            });

                            if (added) {
                              toast.success(`${plan} Plan added to cart`);
                              navigate("/cart");
                            } else {
                              toast.warning(`${plan} Plan is already in cart`);
                            }
                          }}

                        >
                          Purchase Plan
                        </button>

                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>}
          {activeTab === 'tab2' && <div>
            <div className='px-5'>
              <div className="row">
                {['Basic', 'Lite', 'Premium', 'Enterprise'].map((plan, index) => {
                  const plans = {
                    Basic: [
                      "Website Review",
                      "5 Keywords",
                      "Website Competitor Analysis",
                      "Content Duplicity",
                      "On Page SEO",
                      "Meta Tags",
                      "Google Analytics Tracking",
                      "Content Optimization",
                      "Blog Posting (3 per month)",
                      "Guest Posting (1 per month) 500 Words"
                    ],
                    Lite: [
                      "Website Review and Analysis",
                      "Initial Ranking Report",
                      "Keyword Research",
                      "On Page SEO",
                      "Meta Tags Optimization",
                      "Image Optimization",
                      "Heading Tag Optimization",
                      "Content Marketing",
                      "Blog Post (5 per Month)",
                      "Social Media Posting (3 per Week)",
                      "Guest Blogging (3 per month)"
                    ],
                    Premium: [
                      "All from Lite",
                      "Email Support",
                      "Chat Support",
                      "Phone Support",
                      "Monthly Reporting",
                      "Keyword Ranking",
                      "Google Analytics Tracking",
                      "Off Page SEO",
                      "Social Sharing",
                      "Blog Post (7 per Month)",
                      "Blog Social Sharing",
                      "Slide Submission (2)",
                      "Local SEO Setup",
                      "Local Citations (15)",
                      "Local Classified (5)"
                    ],
                    Enterprise: [
                      "All From Premium",
                      "Website Competitor Analysis",
                      "Max 25 Keywords",
                      "Initial Ranking Report",
                      "Keywords Research",
                      "Content Optimization",
                      "Meta Tags Creation",
                      "Robots.txt",
                      "Website Speed Optimization",
                      "Blog Posting – 10 Posts",
                      "Google Analytics & Search Console Setup",
                      "Press Release Submission (300 – 500 words) – 2",
                      "Off Page SEO",
                      "Text-Based Infographic Creation",
                      "Video – 1 Product Related Only (60 Seconds)"
                    ]
                  };


                  const planPrice = {
                    Basic: "$349.99",
                    Lite: "$399.99",
                    Premium: "$449.99",
                    Enterprise: "$499.99"
                  };




                  const toggleExpand = (plan) => {
                    setExpandedCards((prev) => ({
                      ...prev,
                      [plan]: !prev[plan],
                    }));
                  };

                  return (
                    <div key={plan} className="col-lg-3">
                      <div className="pricing-style-one wow fadeInUp ">
                        <div className="pricing-header">
                          <h4>{plan} Plan</h4>
                          <h2>{planPrice[plan]}</h2>
                          <span>Per Month Package</span>
                        </div>
                        <ul className='position-relative'>
                          {plans[plan].slice(0, 5).map((feature, i) => (
                            <li key={i}><i className="fas fa-check" /> {feature}</li>
                          ))}

                          {expandedCards[plan] && plans[plan].slice(5).map((feature, i) => (
                            <li key={i + 5}><i className="fas fa-check" /> {feature}</li>
                          ))}

                          {plans[plan].length > 5 && (
                            <button
                              onClick={() => toggleExpand(plan)}
                              className="bg-transparent border-0 position-absolute end-0 bottom-0"
                              title='Read More Points'

                            >
                              <i
                                className={`fas fa-long-arrow-alt-down`}
                                style={{
                                  transition: "transform 0.3s",
                                  transform: expandedCards[plan] ? "rotate(180deg)" : "rotate(0deg)"
                                }}
                              />
                            </button>
                          )}

                        </ul>




                        <button
                          className="btn btn-md circle btn-gradient animation"
                          onClick={() => {
                            const added = addToCart({
                              name: `${plan} Plan`,
                              category: tabLabels[activeTab],
                              price: parseFloat(planPrice[plan].replace("$", ""))
                            });

                            if (added) {
                              toast.success(`${plan} Plan added to cart`);
                              navigate("/cart");
                            } else {
                              toast.warning(`${plan} Plan is already in cart`);
                            }
                          }}

                        >
                          Purchase Plan
                        </button>









                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>}
          {activeTab === 'tab3' && <div>
            <div className='px-5'>
              <div className="row">
                {['Basic', 'Lite', 'Premium', 'Enterprise'].map((plan, index) => {
                  const plans = {
                    Basic: [
                      "Getting Started With Microcode",
                      "Unlimited Contacts",
                      "UpTo 300 Emails Per day",
                      "Chat Support"
                    ],
                    Lite: [
                      "For Startup",
                      "Everything in Basic",
                      "No Daily Sending Limit",
                      "Email Support",
                      "Lite + Addon A/B testing",
                      "Remove Branding",
                      "Advance Statistics"
                    ],
                    Premium: [
                      "Marketing Pros",
                      "Everything in Lite",
                      "Marketing Automation",
                      "Facebook Ads",
                      "Landing Page",
                      "Multi User Access",
                      "Phone Support"
                    ],
                    Enterprise: [
                      "For who want to grow more",
                      "All From Premium",
                      "Custom volume of Email",
                      "Priority Sending",
                      "20+ Landing Page",
                      "10+ User Access",
                      "SSO",
                      "CSM(Customer Success Manager)",
                      "Premium Support",
                      "24/7 365 Days Support"
                    ]
                  };

                  const planPrice = {
                    Basic: "$49.99",
                    Lite: "$99.99",
                    Premium: "$149.99",
                    Enterprise: "$199.99"
                  };

                  const toggleExpand = (plan) => {
                    setExpandedCards((prev) => ({
                      ...prev,
                      [plan]: !prev[plan],
                    }));
                  };

                  return (
                    <div key={plan} className="col-lg-3">
                      <div className="pricing-style-one wow fadeInUp ">
                        <div className="pricing-header">
                          <h4>{plan} Plan</h4>
                          <h2>{planPrice[plan]}</h2>
                          <span>Per Month Package</span>
                        </div>
                        <ul className='position-relative'>
                          {plans[plan].slice(0, 5).map((feature, i) => (
                            <li key={i}><i className="fas fa-check" /> {feature}</li>
                          ))}

                          {expandedCards[plan] && plans[plan].slice(5).map((feature, i) => (
                            <li key={i + 5}><i className="fas fa-check" /> {feature}</li>
                          ))}

                          {plans[plan].length > 5 && (
                            <button
                              onClick={() => toggleExpand(plan)}
                              className="bg-transparent border-0 position-absolute end-0 bottom-0"
                              title='Read More Points'

                            >
                              <i
                                className={`fas fa-long-arrow-alt-down`}
                                style={{
                                  transition: "transform 0.3s",
                                  transform: expandedCards[plan] ? "rotate(180deg)" : "rotate(0deg)"
                                }}
                              />
                            </button>
                          )}

                        </ul>




                        <button
                          className="btn btn-md circle btn-gradient animation"
                          onClick={() => {
                            const added = addToCart({
                              name: `${plan} Plan`,
                              category: tabLabels[activeTab],
                              price: parseFloat(planPrice[plan].replace("$", ""))
                            });

                            if (added) {
                              toast.success(`${plan} Plan added to cart`);
                              navigate("/cart");
                            } else {
                              toast.warning(`${plan} Plan is already in cart`);
                            }
                          }}

                        >
                          Purchase Plan
                        </button>








                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>}
          {activeTab === 'tab4' && <div>
            <div className='px-5'>
              <div className="row">
                {['Basic', 'Lite', 'Premium', 'Enterprise'].map((plan, index) => {
                  const plans = {
                    Basic: [
                      "1 Free Domain",
                      "5 Page Website (Dynamic)",
                      "1 Email",
                      "1 Month Free Hosting",
                      "24/7 Support",
                      "Annual Renewal"
                    ],
                    Lite: [
                      "All From Basic",
                      "5 Business Email",
                      "10 Page Website",
                      "Image and Videos",
                      "SEO Express",
                      "Payment Gateway Integration",
                      "Annual Renewal"
                    ],
                    Premium: [
                      "All From Lite",
                      "Unlimited Email",
                      "Unlimited Pages",
                      "Unlimited Video/Image",
                      "3 Month SEO",
                      "Payment Gateway Integration (Multiple)",
                      "Free Chat Tool",
                      "Free Google Analytics",
                      "Annual Renewal"
                    ],
                    Enterprise: [
                      "All From Premium",
                      "6 Month Basic SEO",
                      "Unlimited Bandwidth",
                      "Personalized Chat Tool",
                      "Social Media Integration",
                      "Free SSL",
                      "Full Customization",
                      "Annual Renewal"
                    ]
                  };

                  const planPrice = {
                    Basic: "$149.99",
                    Lite: "$199.99",
                    Premium: "$249.99",
                    Enterprise: "$299.99"
                  };


                  const toggleExpand = (plan) => {
                    setExpandedCards((prev) => ({
                      ...prev,
                      [plan]: !prev[plan],
                    }));
                  };

                  return (
                    <div key={plan} className="col-lg-3">
                      <div className="pricing-style-one wow fadeInUp ">
                        <div className="pricing-header">
                          <h4>{plan} Plan</h4>
                          <h2>{planPrice[plan]}</h2>
                          <span>Per Month Package</span>
                        </div>
                        <ul className='position-relative'>
                          {plans[plan].slice(0, 5).map((feature, i) => (
                            <li key={i}><i className="fas fa-check" /> {feature}</li>
                          ))}

                          {expandedCards[plan] && plans[plan].slice(5).map((feature, i) => (
                            <li key={i + 5}><i className="fas fa-check" /> {feature}</li>
                          ))}

                          {plans[plan].length > 5 && (
                            <button
                              onClick={() => toggleExpand(plan)}
                              className="bg-transparent border-0 position-absolute end-0 bottom-0"
                              title='Read More Points'
                            >
                              <i
                                className={`fas fa-long-arrow-alt-down`}
                                style={{
                                  transition: "transform 0.3s",
                                  transform: expandedCards[plan] ? "rotate(180deg)" : "rotate(0deg)"
                                }}
                              />
                            </button>
                          )}
                        </ul>
                        <button
                          className="btn btn-md circle btn-gradient animation"
                          onClick={() => {
                            const added = addToCart({
                              name: `${plan} Plan`,
                              category: tabLabels[activeTab],
                              price: parseFloat(planPrice[plan].replace("$", ""))
                            });

                            if (added) {
                              toast.success(`${plan} Plan added to cart`);
                              navigate("/cart");
                            } else {
                              toast.warning(`${plan} Plan is already in cart`);
                            }
                          }}

                        >
                          Purchase Plan
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>}
        </div>
      </div>
    </div>
  )
}


export default Pricing
