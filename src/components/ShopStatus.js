import React from "react";
import { useShopStatus } from "../context/StatusContext";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useLogo } from "../context/LogoCoontext";

const ShopStatus = () => {
  const { shopStatus, setShopStatus, cooking, setCooking } = useShopStatus();
  const { logoUrl, setLogoUrl } = useLogo(); // Use the logoUrl and setLogoUrl from LogoContext

  // Handler to toggle shop status
  const toggleShopStatus = () => {
    if (cooking) {
      alert("Cannot open shop while cooking is on.");
      return;
    }
    setShopStatus(!shopStatus); // Update both localStorage and WebSocket server
  };

  // Handler to toggle cooking status
  const toggleCookingStatus = () => {
    if (shopStatus) {
      alert("Cannot start cooking while the shop is open.");
      return;
    }
    setCooking(!cooking); // Update both localStorage and WebSocket server
  };

  // Handler for uploading a new logo
  const handleLogoUpload = async (file) => {
    const formData = new FormData();
    formData.append("logo", file);

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        // console.info("Logo Upload Success!!");
        const newLogoUrl = `${process.env.REACT_APP_BASE_URL}${
          result.filePath
        }?t=${new Date().getTime()}`; // Adding timestamp to avoid caching
        setLogoUrl(newLogoUrl); // Immediately update the frontend with new logo from LogoContext
      } else {
        alert("Failed to upload logo");
      }
    } catch (error) {
      console.error("Error uploading logo:", error);
      alert("Error uploading logo. Please try again.");
    }
  };

  // Ant Design Upload Props
  const uploadProps = {
    name: "file",
    accept: "image/*",
    beforeUpload: (file) => {
      handleLogoUpload(file); // Call the custom upload handler
      return false; // Prevent default upload behavior
    },
    showUploadList: false, // Hide the default file list
  };

  return (
    <section id="Shop Status" className="App">
      <div className="landing-container-one">
        {/* Display Shop Logo */}
        <img
          className="landing-logo"
          src={logoUrl}
          alt="Swamy's Hot Foods Logo"
          key={logoUrl} // Adding key prop to force re-render
        />

        <div className="title-heading-container">
          <h2 className="quicksand-text title-heading">Swamy's hot foods</h2>
          <span className="macondo-regular title-heading-span">
            --- Pure Veg ---
          </span>
        </div>
        <div className="change-logo-container">
          {/* Upload New Logo */}
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Upload New Logo</Button>
          </Upload>
        </div>
        <h2 className="quicksand-text address-heading">Shop Status</h2>

        {/* Switch for Cooking Status */}
        <div className="shop-status-toggle">
          <button
            className={`switch-button ${cooking ? "cooking" : "not-cooking"}`}
            onClick={toggleCookingStatus}
          >
            {cooking ? "Cooking On" : "Cooking Off"}
          </button>
        </div>

        {/* Switch for Shop Status */}
        <div className="shop-status-toggle">
          <button
            className={`switch-button ${shopStatus ? "open" : "closed"}`}
            onClick={toggleShopStatus}
          >
            {shopStatus ? "Open" : "Closed"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopStatus;
