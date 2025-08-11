import { useState, useEffect } from "react";
import "../styles/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [tagline, setTagline] = useState(
    "Celebrating India's Spirit with Every Bite"
  );

  useEffect(() => {
    const taglines = [
      "Celebrating India's Spirit with Every Bite",
      "Taste the Freedom of Flavor",
      "Pride in Every Pure Veg Dish",
    ];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % taglines.length;
      setTagline(taglines[index]);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="Footer" className="footer-container">
      <div className="footer-chakra">
        <svg
          className="ashoka-chakra"
          width="100"
          height="100"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#000080"
            strokeWidth="6"
          />
          <circle cx="50" cy="50" r="5" fill="#000080" />
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="10"
              x2="50"
              y2="20"
              stroke="#000080"
              strokeWidth="4"
              transform={`rotate(${(i * 360) / 24} 50 50)`}
            />
          ))}
        </svg>
      </div>
      <div className="footer-divider" />
      <h3 className="cinzel-text footer-heading">
        © {currentYear} Swamy's Hot Foods. All Rights Reserved.
      </h3>
      <div className="footer-tagline">
        <span className="lora-text animated-text">{tagline}</span>
      </div>
      <h3 className="cinzel-text footer-heading">
        Crafted with <span className="heart-icon">♥</span> by CVS Charan
      </h3>
    </section>
  );
};

export default Footer;
