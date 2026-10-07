import React from "react";
import AboutNavBar from "../components/AboutNavBar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import Career from "../components/Career";

function CareerPage() {
  const siteUrl = "https://microcodesoftware.com"; // Base URL
  const pagePath = "/contact"; // Dynamic path if needed
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
        <title>
          Contact Microcode Software | Software & Marketing Experts in India
        </title>
        <meta
          name="description"
          content="Have questions or need a custom solution? Contact Microcode Software â€“ a top software development and digital marketing company in India. Letâ€™s discuss how we can help grow your business."
        />
        <meta
          name="keywords"
          content="Contact Microcode Software, Software development company India contact, Digital marketing agency India contact, Get in touch software company, Business inquiry Microcode, Tech support Microcode Software, Marketing solutions India"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}${pagePath}`} />
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <AboutNavBar />
      <Career />
      <Footer />
    </div>
  );
}

export default CareerPage;
