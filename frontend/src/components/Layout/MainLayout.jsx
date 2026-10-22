import Navbar2 from "../utils/Navbar/Navbar2";
import Footer from "../utils/Footer/Footer";
import PropTypes from "prop-types";

const MainLayout = ({ children }) => {
  
  return (
    <>
      <Navbar2 />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;

MainLayout.propTypes = { children: PropTypes.node.isRequired };
