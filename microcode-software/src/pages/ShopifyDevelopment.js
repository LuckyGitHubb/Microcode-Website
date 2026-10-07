import React from "react";
import AboutNavBar from "../components/AboutNavBar";
import UiServicesDetails from "../components/UiServicesDetails";
import UiServicesContent from "../components/UiServicesContent";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

function ShopifyDevelopment() {
  const siteUrl = "https://microcodesoftware.com"; // Base URL
  const pagePath = "/shopify-development"; // Dynamic path if needed
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
        <title>Shopify Development Company | Custom Shopify Solutions</title>
        <meta
          name="description"
          content="Build a high-converting, mobile-friendly Shopify store with Microcode Software. Custom themes, app development, migration & ongoing supportâ€”everything you need!"
        />
        <meta
          name="keywords"
          content="Ecommerce website designing, Ecommerce website designing company, Ecommerce website designing company in Delhi, Ecommerce website development Delhi, Ecommerce website designing company Delhi, Ecommerce website designing company Delhi NCR"
        />

        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}${pagePath}`} />
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <AboutNavBar />
      <UiServicesDetails />
      <UiServicesContent />
      <Footer />
    </div>
  );
}

export default ShopifyDevelopment;
