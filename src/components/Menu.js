import { useEffect, useState } from "react";
import { useLogo } from "../context/LogoCoontext"; // Corrected typo: LogoCoontext → LogoContext
import Footer from "./Footer";
import "../styles/Menu.css";

const MenuPage = () => {
  const { logoUrl } = useLogo();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shopDescription, setShopDescription] = useState("");
  const [expandedIngredients, setExpandedIngredients] = useState({});

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/menu`
        );
        if (!response.ok) throw new Error("Failed to fetch menu items");
        const data = await response.json();

        // Sort items based on priority (lower priority number = higher importance)
        const sortedMenuItems = data.sort((a, b) => a.priority - b.priority);

        setMenuItems(sortedMenuItems);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    const fetchShopDesc = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/shop/desc`
        );
        if (!response.ok) throw new Error("Failed to fetch shop description");
        const data = await response.json();
        setShopDescription(data.desc);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShopDesc();
  }, []);

  // Function to toggle expanded state for ingredients
  const toggleExpandIngredients = (id) => {
    setExpandedIngredients((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <main id="Menu" className="menu-page">
      {/* Logo Section */}
      <div className="landing-container">
        {logoUrl ? (
          <div className="logo-container">
            <img
              className="landing-logo"
              src={logoUrl}
              alt="Swamy's Hot Foods Logo"
              key={logoUrl}
              loading="lazy"
            />
            <svg
              className="ashoka-chakra"
              width="30"
              height="30"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#000080"
                strokeWidth="5"
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
                  strokeWidth="3"
                  transform={`rotate(${(i * 360) / 24} 50 50)`}
                />
              ))}
            </svg>
          </div>
        ) : (
          <div className="logo-loader-container">
            <span className="logo-loader"></span>
          </div>
        )}

        <div className="title-heading-container">
          <h2 className="cinzel-text title-heading">Swamy's Hot Foods</h2>
          <span className="cinzel-text title-heading-span">
            Celebrating Pure Veg Delights
          </span>
        </div>
      </div>

      {/* Shop Description Section */}
      <div className="shop-description-container">
        {shopDescription && (
          <h2 className="lora-text shop-description">
            <span className="quote-mark">“</span>
            {shopDescription}
            <span className="quote-mark">”</span>
          </h2>
        )}
      </div>

      {/* Menu Section */}
      <section className="menu-container">
        {loading && <p className="lora-text loading-text">Loading menu...</p>}
        {error && <p className="lora-text error-text">{error}</p>}
        {!loading && !error && menuItems.length === 0 && (
          <p className="lora-text no-items-text">No menu items available.</p>
        )}

        <div className="menu-grid">
          {menuItems.map((item) => {
            const ingredientsWords = item.ingredients
              ? item.ingredients.split(" ")
              : [];
            const isLongIngredients = ingredientsWords.length > 0;
            const showFullIngredients = expandedIngredients[item._id];

            return (
              <div key={item._id} className="menu-card">
                <img
                  src={
                    item.imgSrc !== "" ? item.imgSrc : "/default_menu_img.png"
                  }
                  alt={item.name}
                  className="menu-image"
                />
                <div className="menu-info">
                  <h3 className="cinzel-text menu-item-name">{item.name}</h3>

                  {/* Description - Always show full description */}
                  {item.desc && (
                    <p className="lora-text menu-item-desc">{item.desc}</p>
                  )}

                  {item.timings && (
                    <p className="lora-text menu-item-timings">
                      {item.timings}
                    </p>
                  )}

                  {/* Ingredients - Show all or toggle with Read More */}
                  {item.ingredients && (
                    <>
                      <p className="lora-text menu-item-desc">
                        {showFullIngredients
                          ? item.ingredients
                          : ingredientsWords.slice(0, 10).join(" ") +
                            (isLongIngredients && ingredientsWords.length > 10
                              ? "..."
                              : "")}
                      </p>

                      {/* Read More Button for Ingredients */}
                      {isLongIngredients && ingredientsWords.length > 10 && (
                        <button
                          className="read-more-btn"
                          onClick={() => toggleExpandIngredients(item._id)}
                        >
                          {showFullIngredients ? "Read Less" : "Read More"}
                        </button>
                      )}
                    </>
                  )}

                  <div className="menu-details">
                    <span className="cinzel-text menu-price">
                      ₹ {item.price}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default MenuPage;
