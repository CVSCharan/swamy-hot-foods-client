import React, { useEffect, useState } from "react";
import { useLogo } from "../context/LogoCoontext";
import Footer from "./Footer";

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
    <main id="Menu" className="App">
      {/* Logo Section */}
      <div className="landing-container-one">
        {logoUrl ? (
          <img
            className="landing-logo"
            src={logoUrl}
            alt="Swamy's Hot Foods Landing Logo"
            key={logoUrl}
            loading="lazy"
          />
        ) : (
          <div className="logo-loader-container">
            <span className="logo-loader"></span>
          </div>
        )}

        <div className="title-heading-container">
          <h2 className="quicksand-text title-heading">Swamy's Hot Foods</h2>
          <span className="macondo-regular title-heading-span">
            --- Pure Veg ---
          </span>
        </div>
      </div>

      <div>
        {shopDescription && (
          <h2 className="quicksand-text">{shopDescription}</h2>
        )}
      </div>

      {/* Menu Section */}
      <section className="menu-container">
        {loading && <p className="loading-text">Loading menu...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && menuItems.length === 0 && (
          <p className="no-items-text">No menu items available.</p>
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
                  src={item.imgSrc !== "" ? item.imgSrc : "/default_menu_img.png"}
                  alt={item.name}
                  className="menu-image"
                />
                <div className="menu-info">
                  <h3 className="quicksand-text menu-item-name">{item.name}</h3>

                  {/* Description - Always show only 100 words */}
                  {item.desc && (
                    <p className="quicksand-text menu-item-desc">{item.desc}</p>
                  )}

                  <p className="quicksand-text menu-item-timings">
                    {item.timings}
                  </p>

                  {/* Ingredients - Initially show 100 words, expand on Read More */}
                  {item.ingredients && (
                    <>
                      <p className="quicksand-text menu-item-desc">
                        {showFullIngredients
                          ? item.ingredients
                          : ingredientsWords.slice(0, 0).join(" ") +
                            (isLongIngredients ? "..." : "")}
                      </p>

                      {/* Read More Button for Ingredients */}
                      {isLongIngredients && (
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
