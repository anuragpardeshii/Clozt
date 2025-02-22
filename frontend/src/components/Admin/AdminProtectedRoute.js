import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/check", {
          withCredentials: true, // Important for authentication cookies
        });

        if (res.data.loggedIn) {
          setIsAuth(true);
        } else {
          navigate("/admin-login");
        }
      } catch (error) {
        navigate("/admin-login"); // Redirect to login if API fails
      }
    };

    checkAdminAuth();
  }, [navigate]);

  if (isAuth === null) return null; // Prevent flashing content while checking auth

  return children;
};

export default AdminProtectedRoute;