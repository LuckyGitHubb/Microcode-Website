import React from "react";
import AboutNavBar from "../components/AboutNavBar";
import AppServicesDetails from "../components/AppServicesDetails";
import AppServicesContent from "../components/AppServicesContent";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

function SocialMediaMarketing() {
  const siteUrl = "https://microcodesoftware.com"; // Base URL
  const pagePath = "/social-media-marketing"; // Dynamic path if needed
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
          Social Media Marketing Agency | Boost Engagement & Sales with
          Microcode Software
        </title>
        <meta
          name="description"
          content="Grow your brand with Microcode Software, a top social media marketing agency. We offer content creation, strategy, paid ads & more to drive engagement, visibility, and conversions across Facebook, Instagram, LinkedIn, and Twitter."
        />
        <meta
          name="keywords"
          content="Social media marketing, Social media agency, Social media marketing services, Social media advertising, Content creation, Influencer marketing, Facebook marketing, Instagram strategy, LinkedIn marketing, Twitter advertising, Community management, Paid social ads, Digital marketing agency, Brand engagement, Online visibility"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}${pagePath}`} />
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <AboutNavBar />
      <AppServicesDetails />
      <AppServicesContent />
      <Footer />
    </div>
  );
}

export default SocialMediaMarketing;
