import React from "react";
import AboutNavBar from "../components/AboutNavBar";
import BlockChainServiceDetails from "../components/BlockChainServiceDetails";
import BlockChainServicesContent from "../components/BlockChainServicesContent";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

function PerformanceMarketing() {
  const siteUrl = "https://microcodesoftware.com"; // Base URL
  const pagePath = "/performance-marketing"; // Dynamic path if needed
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
          PPC Advertising Services India | High-ROI Google & Social Ads â€“
          Microcode Software
        </title>
        <meta
          name="description"
          content="Drive targeted traffic and boost conversions with Microcode Softwareâ€™s expert PPC advertising services in India. We offer Google Ads, social media ads, remarketing, and real-time optimization to maximize your ROI."
        />
        <meta
          name="keywords"
          content="PPC services in Delhi, PPC advertising company in Delhi, PPC company in Delhi, PPC services in Delhi NCR, PPC agency Delhi, Google Ads agency India, Google Ads agency in Delhi, Google ad agencies, Agency Google Ads, Google AdWords marketing services"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}${pagePath}`} />
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <AboutNavBar />
      <BlockChainServiceDetails />
      <BlockChainServicesContent />
      <Footer />
    </div>
  );
}

export default PerformanceMarketing;
