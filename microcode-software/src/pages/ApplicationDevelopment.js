import React from "react";
import AboutNavBar from "../components/AboutNavBar";
import SoftwareServiceDetails from "../components/SoftwareServiceDetails";
import SoftwareServicesContent from "../components/SoftwareServicesContent";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

function ApplicationDevelopment() {
  const siteUrl = "https://microcodesoftware.com"; // Base URL
  const pagePath = "/application-development"; // Dynamic path if needed
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
          Top Application Development Company India | Custom Web & Mobile App
          Services
        </title>
        <meta
          name="description"
          content="Microcode Software offers expert application development services including custom mobile apps, web applications, cloud-based solutions, and enterprise software. Get scalable, secure, and future-ready applications tailored to your business needs."
        />
        <meta
          name="keywords"
          content="Application development services, Custom application development, Web application development, Mobile app development India, Enterprise app development, Cloud application development, Database application development, App development company India, Cross-platform apps, Scalable app architecture, iOS and Android development, SaaS application development, IoT application development, Low-code no-code development, Shopify app development"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}${pagePath}`} />
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <AboutNavBar />
      <SoftwareServiceDetails />
      <SoftwareServicesContent />
      <Footer />
    </div>
  );
}

export default ApplicationDevelopment;
