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


export default function RouterApp() {
  const {data} = useFetch()
  return (
    <AppProvider>
    <Routes>
      <Route path="/" element={<LandingPages />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/register" element={<Register />} />
      <Route path="/userDashboard" element={<UserDashboard />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/WishList" element={<WishList />} />
      {/* <Route path="/contact" element={<Contact />} />*/}
      <Route path="*" element={<NotFoud />} />  
    </Routes>
    </AppProvider>
  );
}
