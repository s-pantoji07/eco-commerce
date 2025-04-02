import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loginTime = localStorage.getItem("loginTime");
    const currentTime = new Date().getTime();

    if (token && loginTime) {
      const elapsedTime = currentTime - parseInt(loginTime, 10);

      if (elapsedTime > 3600000) {
        // Session expired
        console.log("Session ended: User logged out due to inactivity.");
        localStorage.removeItem("token");
        localStorage.removeItem("loginTime");
        navigate("/auth");
      } else {
        // Valid session
        console.log("Session has begun: User is logged in.");
      }
    } else {
      // Redirect only if there's no token and no login time
      const timeout = setTimeout(() => {
        console.log("Session ended: Redirecting to login page.");
        navigate("/auth");
      }, 15000);

      return () => clearTimeout(timeout);
    }
  }, [navigate]);
};

export default useAuth;
