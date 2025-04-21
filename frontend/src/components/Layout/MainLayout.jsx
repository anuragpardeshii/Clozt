import Navbar2 from "../utils/Navbar/Navbar2";
import Footer from "../utils/Footer/Footer";
import { useAuth } from "../../context/AuthContext";

const MainLayout = ({ children }) => {
  const { user } = useAuth();
  
  return (
    <>
      <Navbar2 user={user} />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
