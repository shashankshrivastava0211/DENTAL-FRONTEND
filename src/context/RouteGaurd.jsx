
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RouteGuard = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const isAllowedRoute =
        location.pathname.startsWith("/admin-dashboard") ||
        location.pathname === "/login";

      if (!isAllowedRoute) {
        logout();
        // navigate("/login", { replace: true });
      }
    }
  }, [location.pathname, isAuthenticated]);

  return null;
};

export default RouteGuard;