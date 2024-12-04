import React from "react";
import { ShopStatusProvider } from "./context/StatusContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import ShopStatus from "./components/ShopStatus";
import { LogoProvider } from "./context/LogoCoontext";

function App() {
  return (
    <LogoProvider>
      <ShopStatusProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/shop-status" element={<ShopStatus />} />
          </Routes>
        </Router>
      </ShopStatusProvider>
    </LogoProvider>
  );
}

export default App;
