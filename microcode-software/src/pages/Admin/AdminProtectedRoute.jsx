import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

const AdminProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/adminlogin" />;
};

export default AdminProtectedRoute;
