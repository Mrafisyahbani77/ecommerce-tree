import { Route, Router, Routes } from "react-router-dom";
import HomePages from "../pages/HomePages";

export default function RouterApp() {
  return (
    <Routes>
        <Route path="/" element={<HomePages />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}
