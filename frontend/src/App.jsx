import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SupportAgent from "./components/SupportAgent";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SupportAgent />} />
          <Route path="/contact" element={<SupportAgent />} />
          <Route path="/*" element={<SupportAgent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
