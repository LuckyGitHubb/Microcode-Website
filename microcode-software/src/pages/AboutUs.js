import React from "react";
// import NavigationBar from "../components/NavigationBar";
import AboutUsSection from "../components/AboutUsSection";
import ChooseUsSection from "../components/ChooseUsSection";
// import Team from '../components/Team'
import FunFact from "../components/FunFact";
import StartAward from "../components/StartAward";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import AboutNavBar from "../components/AboutNavBar";
import { Helmet } from "react-helmet-async";

function AboutUs() {
  const siteUrl = "https://microcodesoftware.com"; // Base URL
  const pagePath = "/about"; // Dynamic path if needed

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
          About Microcode Software | Custom Software & Digital Marketing Experts
        </title>
        <meta
          name="description"
          content="Discover Microcode Softwareâ€”a trusted partner delivering custom software solutions and digital marketing strategies. 10+ yearsâ€™ experience, 150+ projects, and 60+ happy clients across 20+ industries."
        />
        <meta
          name="keywords"
          content="Microcode Software, About Microcode Software, Custom software development, Digital marketing, Software solutions, IT consulting, Business growth, Software company, Marketing strategy, Tech solutions, Software experts"
        />

        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}${pagePath}`} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <AboutNavBar />
      <AboutUsSection />
      <ChooseUsSection />
      <FunFact />
      <StartAward />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default AboutUs;
