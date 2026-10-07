import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "./context/cartContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import store from "./apps/store";
import ScrollToTop from "./components/ScrollToTop";
import AdminLoginGuard from "./pages/Admin/AdminLoginGuard";
import AdminProtectedRoute from "./pages/Admin/AdminProtectedRoute";
import { useCart } from "./context/cartContext";

// Public Pages
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ApplicationDevelopment from "./pages/ApplicationDevelopment";
import SocialMediaMarketing from "./pages/SocialMediaMarketing";
import ShopifyDevelopment from "./pages/ShopifyDevelopment";
import SoftwareDevelopment from "./pages/SoftwareDevelopment";
import PerformanceMarketing from "./pages/PerformanceMarketing";
import WebsiteDevelopment from "./pages/WebsiteDevelopment";
import SeoServices from "./pages/SeoServices";
import Pricing from "./pages/Pricing";
import Cart from "./pages/Cart";
import Blog from "./pages/Blog";
import Blog1 from "./pages/Blog1";
import Blog2 from "./pages/Blog2";
import NotFoundPage from "./pages/NotFoundPage";
import CheckoutPage from "./pages/Checkout";
import CashfreePayment from "./pages/CashfreePayment";
import CashfreeSuccess from "./pages/CashfreeSuccess";

// Admin Pages
import AdminLogin from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import AdminLayout from "./layout/AdminLayout";
import BlogManagement from "./pages/Admin/BlogList";
import AddBlogForm from "./pages/Admin/AddBlog";
import CategoryMangement from "./pages/Admin/CategoryList";
import AddCategoryForm from "./pages/Admin/AddCategory";
import AddServiceForm from "./pages/Admin/AddService";
import ServiceManagement from "./pages/Admin/ListService";
import ContactManagement from "./pages/Admin/ContactManagement";
import TransactionsList from "./pages/Admin/TransactionList";
import AddSubAdminForm from "./pages/Admin/AddSubAdmin";
import SubAdminManagement from "./pages/Admin/ListSubAdmin";
import CustomDevelopmentServicePage from "./pages/SoftwareDevelopementServicePage";
import NotFound from "./components/NotFound";
import UserLogin from "./pages/User/Login";
import UserRegistration from "./pages/User/Register";
import OtpVerification from "./pages/User/VerifyOTP";
import ForgotPassword from "./pages/User/ForgotPassword";
import ResetPassword from "./pages/User/ResetPassword";
import StaticContentManagement from "./pages/Admin/ListStaticContent";
import EditStaticContentForm from "./pages/Admin/EditStaticContent";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundPolicy from "./pages/RefundPolicy";
// import Career from "./components/Career";
import CareerPage from "./pages/CareerPage";
import CareerManagement from "./pages/Admin/CareerManagement";

// ðŸ›¡ Permission Protected Wrapper
const PermissionRoute = ({ permission, children }) => {
  const { user, loadingUser } = useCart();

  if (loadingUser) return null;
  if (user?.userType !== 'SubAdmin') return children; // Allow full access to superadmin

  const normalizedFrontendPermission = permission.toLowerCase().replace(/\s+/g, '');

  const hasPermission = user.permissions?.some((perm) => {
    const backendName = perm.moduleName.toLowerCase().replace(/\s+/g, '');
    console.log(`Comparing: Backend -> "${backendName}", Frontend -> "${normalizedFrontendPermission}"`);
    return backendName === normalizedFrontendPermission && perm.isAllow;
  });

  if (!hasPermission) return <NotFound />;

  return children;
};



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HelmetProvider>
    <Provider store={store}>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:slug" element={<CustomDevelopmentServicePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/adminlogin" element={<AdminLoginGuard><AdminLogin /></AdminLoginGuard>} />
            <Route path="/admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
              <Route path="dashboard" element={<PermissionRoute permission="dashboardaccess"><Dashboard /></PermissionRoute>} />
              <Route path="blog-list" element={<PermissionRoute permission="blogmanagement"><BlogManagement /></PermissionRoute>} />
              <Route path="add-blog" element={<PermissionRoute permission="blogmanagement"><AddBlogForm /></PermissionRoute>} />
              <Route path="category-list" element={<PermissionRoute permission="blogmanagement"><CategoryMangement /></PermissionRoute>} />
              <Route path="career-list" element={<PermissionRoute permission="blogmanagement"><CareerManagement /></PermissionRoute>} />
              <Route path="add-category" element={<PermissionRoute permission="blogmanagement"><AddCategoryForm /></PermissionRoute>} />
              <Route path="add-service" element={<PermissionRoute permission="servicepage"><AddServiceForm /></PermissionRoute>} />
              <Route path="list-services" element={<PermissionRoute permission="servicepage"><ServiceManagement /></PermissionRoute>} />
              <Route path="contact-list" element={<PermissionRoute permission="contactform"><ContactManagement /></PermissionRoute>} />
              <Route path="transaction-list" element={<PermissionRoute permission="transactionlist"><TransactionsList /></PermissionRoute>} />
              <Route path="add-subadmin" element={<PermissionRoute permission="addsubadmin"><AddSubAdminForm /></PermissionRoute>} />
              <Route path="list-subadmin" element={<PermissionRoute permission="listsubadmin"><SubAdminManagement /></PermissionRoute>} />
              <Route path="list-static-content" element={<PermissionRoute permission="staticcontent"><StaticContentManagement /></PermissionRoute>} />
              <Route path="edit-static-content" element={<PermissionRoute permission="staticcontent"><EditStaticContentForm /></PermissionRoute>} />
            </Route>

            <Route path="/contact" element={<ContactUs />} />
            <Route path="/career" element={<CareerPage />} />
            <Route path="/application-development" element={<ApplicationDevelopment />} />
            <Route path="/social-media-marketing" element={<SocialMediaMarketing />} />
            <Route path="/shopify-development" element={<ShopifyDevelopment />} />
            <Route path="/software-development" element={<SoftwareDevelopment />} />
            <Route path="/performance-marketing" element={<PerformanceMarketing />} />
            <Route path="/website-development" element={<WebsiteDevelopment />} />
            <Route path="/seo-services" element={<SeoServices />} />
            <Route path="/pay" element={<CashfreePayment />} />
            <Route path="/success" element={<CashfreeSuccess />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/blog" element={<Blog />} />
            {/* <Route path="/how-ai-is-revolutionizing-digital-marketing-trends-and-predictions" element={<Blog1 />} /> */}
            <Route path="/blog/:slug" element={<Blog1 />} />
            <Route path="/the-future-of-digital-interaction-and-business" element={<Blog2 />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/user-registration" element={<UserRegistration />} />
            <Route path="/user-login" element={<UserLogin />} />
            <Route path="/verify-otp" element={<OtpVerification />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsAndConditions />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />

          </Routes>
        </BrowserRouter>
      </CartProvider>
    </Provider>
  </HelmetProvider>
);

reportWebVitals();
