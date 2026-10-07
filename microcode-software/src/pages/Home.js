import React from 'react';
import NavigationBar from "../components/NavigationBar";
import Banner from "../components/Banner";
import About from "../components/About";
import Features from "../components/Features";
// import Partner from '../components/Partner'
import ChooseUs from "../components/ChooseUs";
import Services from "../components/Services";
import Speciality from "../components/Speciality";
// import Gallery from '../components/Gallery'
// import Team from '../components/Team'
import Testimonials from "../components/Testimonials";
import Blog from "../components/Blog";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

function Home() {
  // useEffect(()=>{
  //   const script1 = document.createElement('script');
  //   script1.src = 'static/js/main.js';
  //   script1.async = true;
  //   document.getElementsByClassName('wrapper')[0].appendChild(script1)
  //   return ()=>{
  //     document.getElementsByClassName('wrapper')[0].removeChild(script1)
  //   }
  // },[])
  const siteUrl = "https://microcodesoftware.com"; // Base URL
  // Dynamic path if needed
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    name: "microcodesoftware",
    url: `${siteUrl}`,
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
          Top Software Development & Digital Marketing Company in India |
          Microcode Software
        </title>
        <meta
          name="description"
          content="Microcode Software is a trusted software development and digital marketing company in India. We build custom software, high-performing websites, and ROI-driven marketing strategies to help your business grow smarter and faster."
        />
        <meta
          name="keywords"
          content="Software development company India, Digital marketing company India, Custom software development, Website development services, Performance marketing, Social media marketing India, Application development India, Shopify development, Tech and marketing integration, Scalable software solutions"
        />

        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}`} />
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <NavigationBar />
      <Banner />
      <About />
      <Features />
      <ChooseUs />
      <Services />
      <Speciality />
      <Testimonials />
      <Blog />
      <Footer />
    </div>
  );
}

export default Home;
