import React from "react";
import AboutNavBar from "../components/AboutNavBar";
// import BlockChainServiceDetails from '../components/BlockChainServiceDetails'
// import BlockChainServicesContent from '../components/BlockChainServicesContent'
import Blog from "../components/Blog";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

function Blogs() {
  const siteUrl = "https://microcodesoftware.com"; // Base URL
  const pagePath = "/blog"; // Dynamic path if needed
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
          Latest Tech Insights & Software Updates | Microcode Software Blog
        </title>
        <meta
          name="description"
          content="Stay ahead with Microcode Softwareâ€™s blogâ€”featuring expert insights, software development trends, digital transformation tips, and the latest tech news to empower your business."
        />
        <meta
          name="keywords"
          content="Microcode Software blog, Software development, Tech news, Digital transformation, Programming tutorials, Software updates, IT solutions, Coding tips, Software engineering insights"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}${pagePath}`} />
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <AboutNavBar />
      <Blog />
      {/* <BlockChainServiceDetails/> */}
      {/* <BlockChainServicesContent/> */}
      <Footer />
    </div>
  );
}

export default Blogs;
