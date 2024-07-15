import { Route, Router, Routes } from 'react-router-dom';
import LandingPages from '../pages/LandingPages';
import Login from '../pages/Login';
import Cart from '../pages/Cart';
import Register from '../pages/Register';
import UserDashboard from '../pages/userDashboard';

export default function RouterApp() {
  return (
    <Routes>
      <Route path="/" element={<LandingPages />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/register" element={<Register />} />
      <Route path="/userDashboard" element={<UserDashboard />} />
      {/* <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />  */}
    </Routes>
  );
}
