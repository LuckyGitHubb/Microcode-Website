// src/pages/BlockChainDataPage.jsx
import { useParams } from "react-router-dom";
import customDevelopmentData from "../data/webDevelopmentData.json";
import { Helmet } from "react-helmet-async";
import AboutNavBar from "../components/AboutNavBar";
import Footer from "../components/Footer";

const CustomDevelopmentServicePage = () => {
  const { slug } = useParams();
  const serviceData = customDevelopmentData.find((loc) => loc.slug === slug);

  if (!serviceData) return <h2>404 - Service Not Found</h2>;

  return (
    <div className="customDevelopmentData-page">
      <Helmet>
        <title>{serviceData.title}</title>
        <meta name="description" content={serviceData.description} />
        <meta name="keywords" content={serviceData.keywords} />
        <link
          rel="canonical"
          href={`https://microcodesoftware.com/${serviceData.slug}`}
        />
      </Helmet>
      <AboutNavBar />

      <div className="services-details-area default-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="site-heading text-center">
                <h4 className="sub-title">{serviceData.service}</h4>
                <h1 className="title m-0">{serviceData.mainHeading}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="services-details-items">
            <div className="row">
              <div className="col-xl-12 services-single-content">
                <div className="thumb mb-50">
                  <img src="static/img/cloudcomputing/21.webp" alt="Thumb" />
                </div>
                <p>{serviceData.content}</p>
                <p>{serviceData.content1}</p>
                <p>{serviceData.content2}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="services-content bg-gray default-padding">
        <div className="container">
          <div className="about-style-one-items">
            <div className="row">
              <div className="col-xl-7 col-lg-6">
                <div className="thumb-style-one">
                  <img src="static/img/cloudcomputing/1.webp" alt="Img Not Found" />
                </div>
              </div>
              <div className="col-xl-5 col-lg-6 pl-50 pl-md-15 pl-xs-15">
                <div className="about-style-one-info">
                  <div className="content">
                    <h2 className="title">{serviceData.nextSectionHeading}</h2>
                    <p>{serviceData.nextSectionContent}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="services-content default-padding">
        <div className="container">
          <div className="about-style-one-items">
            <div className="row">
              <div className="col-12">
                <div className="about-style-one-info">
                  <div className="content">
                    <h2 className="title">{serviceData.nextSection2Heading}</h2>
                    <p>{serviceData.nextSection2Content}</p>
                    <h4>Features:</h4>
                    <ul className="list-style-two">
                      {serviceData.features?.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="services-content default-padding pt-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="title">Frequently Asked Questions</h2>
              <p>{serviceData.faqscontent}</p>
              <div className="accordion mt-50" id="faqAccordion">
                {serviceData.faqs?.map((faq, index) => {
                  const collapseId = `collapse${index}`;
                  const headingId = `heading${index}`;
                  const isFirst = index === 0;

                  return (
                    <div
                      className="accordion-item accordion-style-one"
                      key={index}
                    >
                      <h2 className="accordion-header" id={headingId}>
                        <button
                          className={`accordion-button ${
                            !isFirst ? "collapsed" : ""
                          }`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${collapseId}`}
                          aria-expanded={isFirst ? "true" : "false"}
                          aria-controls={collapseId}
                        >
                          {faq.question}
                        </button>
                      </h2>
                      <div
                        id={collapseId}
                        className={`accordion-collapse collapse ${
                          isFirst ? "show" : ""
                        }`}
                        aria-labelledby={headingId}
                        data-bs-parent="#faqAccordion"
                      >
                        <div className="accordion-body">
                          <p>{faq.answer}</p>
                          {faq.points?.length > 0 && (
                            <div className="faq-points mt-2">
                              {faq.points.map((point, idx) => (
                                <p key={idx}>
                                  <strong>{point.bold} </strong>
                                  {point.text}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CustomDevelopmentServicePage;
