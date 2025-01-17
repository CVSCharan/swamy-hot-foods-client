import React from "react";
import { ShopStatusProvider } from "./context/StatusContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
// import ShopStatus from "./components/ShopStatus";
import { LogoProvider } from "./context/LogoCoontext";
import MenuPage from "./components/Menu";

function App() {
  return (
    <LogoProvider>
      <ShopStatusProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/menu" element={<MenuPage />} />
            {/* <Route path="/shop-status" element={<ShopStatus />} /> */}
          </Routes>
        </Router>
      </ShopStatusProvider>
    </LogoProvider>
  );
}

export default App;
