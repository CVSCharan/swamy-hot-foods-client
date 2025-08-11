import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <section id="Footer" className="footer-container">
      <div className="footer-divider"></div>
      <h3 className="cinzel-text footer-heading">
        © 2024 - 2025 Swamy's Hot Foods. All Rights Reserved.
      </h3>
      <h3 className="cinzel-text footer-heading">
        Crafted with <span className="heart-icon">♥</span> by CVS Charan
      </h3>
      <div className="footer-tagline">
        Celebrating India's Spirit with Every Bite
        <svg
          className="ashoka-chakra"
          width="20"
          height="20"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="45" fill="none" stroke="#000080" strokeWidth="5" />
          <circle cx="50" cy="50" r="5" fill="#000080" />
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="10"
              x2="50"
              y2="20"
              stroke="#000080"
              strokeWidth="3"
              transform={`rotate(${(i * 360) / 24} 50 50)`}
            />
          ))}
        </svg>
      </div>
    </section>
  );
};

export default Footer;