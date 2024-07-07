import { Route, Router, Routes } from "react-router-dom";
import HomePages from "../pages/HomePages";
import LandingPages from "../pages/LandingPages";
import Login from "../pages/Login";

export default function RouterApp() {
  return (
    <Routes>
        <Route path="/" element={<LandingPages />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}
