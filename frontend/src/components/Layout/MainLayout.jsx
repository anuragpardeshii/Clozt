import Navbar2 from "../comman/Navbar/Navbar2";
import Footer from "../comman/Footer/Footer";

const MainLayout = ({ children, user, setUser }) => {
  return (
    <>
      <Navbar2 user={user} setUser={setUser} />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
