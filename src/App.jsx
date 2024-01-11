import { useState } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import MobileNav from "./components/Navbar/MobileNav";
import Navbar from "./components/Navbar/Navbar";
import TopSection from "./components/TopSection/TopSection";
import Home from "./pages/Home";
import Download from "./pages/Download";
import Modal from 'react-modal';

function App() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  function handleMobileNav() {
    setShowMobileNav((prevState) => !prevState);
  }
  
  return (
    <div className="App">
      <HashRouter>
        <Navbar handleMobileNav={handleMobileNav} />
        {showMobileNav && <MobileNav />}
        <TopSection />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/search/:query" element={<Home />} />
          <Route exact path="/download" element={<Download />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
