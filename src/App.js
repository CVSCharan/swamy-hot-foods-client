import { useState, useEffect } from "react";
import { ShopStatusProvider } from "./context/StatusContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import SplashScreen from "./components/SplashScreen";
import { LogoProvider } from "./context/LogoCoontext";
import MenuPage from "./components/Menu";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000); // Show splash screen for 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <LogoProvider>
      <ShopStatusProvider>
        <Router>
          {showSplash ? (
            <SplashScreen />
          ) : (
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/menu" element={<MenuPage />} />
              {/* <Route path="/shop-status" element={<ShopStatus />} /> */}
            </Routes>
          )}
        </Router>
      </ShopStatusProvider>
    </LogoProvider>
  );
}

export default App;
