import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import WebDevelopementService from "./WebDevelopmentServicePage";
import CustomDevelopementService from "./SoftwareDevelopementServicePage";
import webDevelopmentData from "../data/webDevelopmentData.json";
import customDevelopmentData from "../data/softwareDevelopmentData.json";

const DynamicServicePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const isWebDev = webDevelopmentData.some((item) => item.slug === slug);
  const isCustomDev = customDevelopmentData.some((item) => item.slug === slug);

  useEffect(() => {
    if (!isWebDev && !isCustomDev) {
      navigate("*", { replace: true });
    }
  }, [isWebDev, isCustomDev, navigate]);

  if (isWebDev) return <WebDevelopementService />;
  if (isCustomDev) return <CustomDevelopementService />;

  return null; // While redirecting
};

export default DynamicServicePage;
