import React from "react";
import AboutNavBar from "../components/AboutNavBar";
import CloudComputingServiceDetails from "../components/CloudComputingServiceDetails";
import CloudComputingServicesContent from "../components/CloudComputingServicesContent";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

function WebsiteDevelopment() {
  const siteUrl = "https://microcodesoftware.com"; // Base URL
  const pagePath = "/website-development"; // Dynamic path if needed
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
          Custom Website Development Services India | Microcode Software
        </title>
        <meta
          name="description"
          content="Boost your online presence with Microcode Software â€“ a top website development company in India. Get responsive, scalable, SEO-friendly websites with AI features, cloud integration, and full-stack development."
        />
        <meta
          name="keywords"
          content="Web development in Noida, Web development companies Noida, Best website development company in Noida, Website development in Noida, Top website development companies in Noida, Website designing company Noida, Web design companies in Noida, Web designers Noida, Website designers in Noida"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}${pagePath}`} />
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <AboutNavBar />
      <CloudComputingServiceDetails />
      <CloudComputingServicesContent />
      <Footer />
    </div>
  );
}

export default WebsiteDevelopment;
