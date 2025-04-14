import React, { useEffect, useState } from "react";
import "../Styles/ScrollToTopButton.css";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  // Show button after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
      ⬆
    </button>
  ) : null;
};

export default ScrollToTopButton;
