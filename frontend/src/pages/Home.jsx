import { useRef, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../Styles/Home.css";

// Lazy load categories component
const Categories = lazy(() => import("../pages/Categories"));

const Home = () => {
  useAuth();
  const categoriesRef = useRef(null);
  const navigate = useNavigate();

  const scrollToCategories = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginTimestamp");
    navigate("/auth");
  };

  // Stats data extracted to make code more maintainable
  const stats = [
    { value: "14k+", label: "PRODUCT VARIETIES" },
    { value: "50k+", label: "HAPPY CUSTOMERS" },
    { value: "10+", label: "STORE LOCATIONS" },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="content">
          <h1>
            <span className="green-text">Organic</span> Foods at your <br />
            <span className="bold-text">Doorsteps</span>
          </h1>
          <p>Dignissim massa diam elementum.</p>
          <div className="buttons">
            <button className="green-button" onClick={scrollToCategories}>
              START SHOPPING
            </button>
            <button className="black-button" onClick={() => navigate("/auth")}>
              JOIN NOW
            </button>
          </div>
          <div className="stats">
            {stats.map((item, index) => (
              <div key={index}>
                <strong>{item.value}</strong>
                <br />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section - Lazy loaded */}
      <section ref={categoriesRef} className="categories">
        <Suspense fallback={<div>Loading categories...</div>}>
          <Categories />
        </Suspense>
      </section>
    </div>
  );
};

export default Home;