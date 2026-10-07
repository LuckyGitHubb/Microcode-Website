import React from "react";
import AboutNavBar from "../components/AboutNavBar";
import WebDevServicesDetails from "../components/WebDevServicesDetails";
import WebDevServicesContent from "../components/WebDevServicesContent";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

function SoftwareDevelopment() {
  const siteUrl = "https://microcodesoftware.com"; // Base URL
  const pagePath = "/software-development"; // Dynamic path if needed
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
          Custom Software Development Services | Microcode Software India
        </title>
        <meta
          name="description"
          content=" Discover high-performance custom software development services with Microcode Software, Indiaâ€™s leading software development company. We deliver web, mobile, desktop, cloud, and enterprise solutions designed for business growth, scalability, and innovation."
        />
        <meta
          name="keywords"
          content="Software development services, Custom software development, Web development, Mobile app development, Enterprise software, SaaS development, Cloud software, Embedded systems, Game development, DevOps, Software company India, Microcode Software, Software solutions, Scalable software, AI development, IoT software, Blockchain development, IT outsourcing, Top software development company, Software developers India"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}${pagePath}`} />
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <AboutNavBar />
      <WebDevServicesDetails />
      <WebDevServicesContent />
      <Footer />
    </div>
  );
}

export default SoftwareDevelopment;
