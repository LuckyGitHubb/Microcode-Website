import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
const AdminLoginGuard = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/admin" /> : children;
};

export default AdminLoginGuard;
