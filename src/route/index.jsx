import { Route, Router, Routes } from 'react-router-dom';
import LandingPages from '../pages/LandingPages';
import Login from '../pages/Login';
import Cart from '../pages/Cart';
import Register from '../pages/Register';
import UserDashboard from '../pages/userDashboard';
import NotFoud from '../pages/NotFoud';
import { useFetch } from '../useFetchProduct/useFetch';
import { AppContext, AppProvider } from '../store/context';
import Profile from '../pages/Profile';
import WishList from '../pages/WishList';
import Address from '../pages/Address';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import CreateProduct from '../pages/Admin/CreateProduct';
import BannerCrud from '../pages/Admin/BannerCrud';

export default function RouterApp() {
  return (
    <AppProvider>
      <Routes>
        {/* USER PAGES */}
        <Route path="/" element={<LandingPages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Wishlist" element={<WishList />} />
        <Route path="/Address" element={<Address />} />
        {/* Bisa Tambahkan disini pages user lagi */}
        {/* USER PAGES */}

        {/* ADMIN PAGES */}
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/adminDashboard/CreateProduct" element={<CreateProduct />} />
        <Route path="/Banner" element={<BannerCrud />} />
        {/* ADMIN PAGES */}
        <Route path="*" element={<NotFoud />} />
      </Routes>
    </AppProvider>
  );
}
