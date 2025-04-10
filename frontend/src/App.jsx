import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Auth from "./pages/Auth";
import { ToastContainer } from "react-toastify";
import Cart from "./pages/Cart";
import PaymentPage from "./components/PaymentPage"; // Importing from the components folder
import MyOrders from "./components/myorder";
import UserProfile from "./components/Profile";
import Footer from "./components/Footer";
import BestProducts from "./pages/BestProducts";

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const REDIRECT_DELAY = 5000; // 5 seconds

function Layout() {
  return (
    <div>
      <Home />
      {/* <Categories /> */}
      <BestProducts />
    </div>
  );
}

function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const hideNavbarRoutes = ["/auth"];
  const hideFooterRoutes = ["/auth"];
  const [cartTotal, setCartTotal] = useState(0); // State for total cart amount

  useEffect(() => {
    const checkSession = () => {
      const token = localStorage.getItem("token");
      const loginTimestamp = localStorage.getItem("loginTimestamp");

      if (token && loginTimestamp) {
        const timeElapsed = Date.now() - parseInt(loginTimestamp, 10);
        console.log("Session active, time elapsed:", timeElapsed);

        if (timeElapsed > SESSION_TIMEOUT) {
          console.log("Session expired: Logging out");
          localStorage.removeItem("token");
          localStorage.removeItem("loginTimestamp");
          navigate("/auth");
        }
      } else {
        console.log("No session found. Redirecting in 5 seconds...");
        const timeout = setTimeout(() => {
          navigate("/auth");
        }, REDIRECT_DELAY);

        return () => clearTimeout(timeout);
      }
    };

    checkSession();
  }, []);

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<PaymentPage cartTotal={cartTotal} />} /> 
        <Route path="/myorders" element={<MyOrders />} /> {/* Add MyOrders route */}
        <Route path="/profile" element={<UserProfile />} />
        {/* <Route path="/best-products" element={<BestProducts />} /> Add BestProducts route */}
        {/* Pass cartTotal as prop */}
      </Routes>
      {!hideFooterRoutes.includes(location.pathname) && <Footer />} 
    </>
  );
}

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <MainLayout />
    </Router>
  );
}

export default App;
