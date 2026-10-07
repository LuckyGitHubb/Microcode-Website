import React from "react";
import AboutNavBar from "../components/AboutNavBar";
import SeoServiceDetails from "../components/SeoServiceDetails";
import SeoServiceContent from "../components/SeoServiceContent";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

function SeoServices() {
  const siteUrl = "https://microcodesoftware.com"; // Base URL
  const pagePath = "/seo-services"; // Dynamic path if needed
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    name: "microcodesoftware",
    url: `${siteUrl}${pagePath}`,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <div>
      <Helmet>
        <title>Affordable SEO Services in India | Microcode Software</title>
        <meta
          name="description"
          content="Boost your online visibility with the best SEO company in India. We offer affordable SEO, local SEO, and eCommerce SEO services tailored to your business."
        />
        <meta
          name="keywords"
          content="SEO services in Delhi, SEO agency in Delhi, SEO company in Delhi, Best SEO Company in Delhi, Best SEO Agency in Delhi, Website designing company in Delhi, Best SEO services in Delhi"
        />

        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}${pagePath}`} />
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <AboutNavBar />
      <SeoServiceDetails />
      <SeoServiceContent />
      <Footer />
    </div>
  );
}

export default SeoServices;
