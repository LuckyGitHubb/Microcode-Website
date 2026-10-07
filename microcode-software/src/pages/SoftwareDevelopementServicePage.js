// src/pages/BlockChainDataPage.jsx
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AboutNavBar from "../components/AboutNavBar";
import Footer from "../components/Footer";
import { apiRequestHandler } from "../apiConfig/service";
import ApiConfig from "../apiConfig/ApiConfig";
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";

const CustomDevelopmentServicePage = () => {
  const { slug } = useParams();

  // const serviceData = customDevelopmentData.find((loc) => loc.slug === slug);
  const [serviceData, setServiceData] = useState({})

  useEffect(() => {
    const getServiceData = async () => {
      const endPoint = ApiConfig.getServiceBySlug(slug);
      console.log(endPoint);

      try {
        const res = await apiRequestHandler({ method: "get", endPoint });
        console.log(res);
        if (res?.success) {
          setServiceData(res?.data || {});
        }
      } catch (error) {
        setServiceData({});
        console.log(error);
      }
    };
    getServiceData();
  }, [slug])

  if (!serviceData) return <NotFound />;

  return (
    <div className="customDevelopmentData-page">
      <Helmet>
        <title>{serviceData.metaTitle}</title>
        <meta name="description" content={serviceData.metaDescription} />
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
                <h4 className="sub-title">{serviceData.serviceName}</h4>
                <h1 className="title m-0">{serviceData.title}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="services-details-items">
            <div className="row">
              <div className="col-xl-12 services-single-content">
                <div className="thumb mb-50">
                  <img
                    src={serviceData?.bannerImage}
                    alt="Thumb"
                    style={{ height: '80vh', width: '100vw' }} // React inline styles
                  />
                </div>
                <div
                  className="outfit-font"
                  dangerouslySetInnerHTML={{ __html: serviceData?.description }}
                />



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
                  <img src={serviceData?.whyChooseUs?.image} alt="Img Not Found" style={{ maxHeight: "400px", width: "100%" }} />
                </div>
              </div>
              <div className="col-xl-5 col-lg-6 pl-50 pl-md-15 pl-xs-15">
                <div className="about-style-one-info">
                  <div className="content">
                    <h2 className="title">{serviceData?.whyChooseUs?.title}</h2>
                    <div  className="outfit-font" dangerouslySetInnerHTML={{ __html: serviceData?.whyChooseUs?.description }}></div>
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
                    <h2 className="title">{serviceData.featureSection?.title}</h2>
                    <div
                     className="outfit-font"
                      dangerouslySetInnerHTML={{
                        __html: serviceData.featureSection?.description || ""
                      }}
                    ></div>
                    <h4>Features:</h4>
                    <ul className="list-style-two">
                      {serviceData.featureSection?.features?.map((item, index) => (
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
              <div  className="outfit-font" dangerouslySetInnerHTML={{ __html: serviceData.faqSection?.description }}></div>
              <div className="accordion mt-50" id="faqAccordion">
                {serviceData.faqSection?.questions?.map((faq, index) => {
                  const collapseId = `collapse${index}`;
                  const headingId = `heading${index}`;

                  return (
  <div
    className="accordion-item accordion-style-one"
    key={index}
  >
    <h2 className="accordion-header" id={headingId}>
      <button
        className="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#${collapseId}`}
        aria-expanded="false"
        aria-controls={collapseId}
      >
        {faq.question}
      </button>
    </h2>
    <div
      id={collapseId}
      className="accordion-collapse collapse"
      aria-labelledby={headingId}
    >
      <div className="accordion-body">
        <div
          className="outfit-font"
          dangerouslySetInnerHTML={{
            __html: faq.answer || ""
          }}
        ></div>
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
