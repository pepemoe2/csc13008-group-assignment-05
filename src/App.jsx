import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ShippingForm from "./components/shipping_form";
import ShippingStorage from "./components/shipping_storage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<ShippingForm />} />
        <Route path="/orders" element={<ShippingStorage />} />
      </Routes>
    </BrowserRouter>
  );
}
