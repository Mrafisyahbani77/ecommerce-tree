import { LogOut, Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const NavLinks = () => {
  return (
    <>
      <NavLink to="/" className="text-black w-full text-center rounded-md transition duration-300 ease-in-out hover:py-2 py-2">
        Home
      </NavLink>
      <NavLink to="/cart" className="text-black w-full text-center rounded-md transition duration-300 ease-in-out hover:py-2 py-2">
        Cart
      </NavLink>
      <NavLink to="/login" className="text-black w-full text-center rounded-md transition duration-300 ease-in-out hover:py-2 py-2">
        Login
      </NavLink>
    </>
  );
};

const Nav = () => {
  const [opened, setOpened] = useState(false);

  const handleNav = () => {
    setOpened(!opened);
  };
  return (
    <>
      <div className="w-1/3">
        <div className="md:flex text-white items-center justify-between hidden">
          {' '}
          <NavLinks />
        </div>
      </div>
      <button className="md:hidden" onClick={handleNav}>
        {opened ? <X size={25} color="#3e9392" /> : <Menu size={25} color="#3e9392" />}
      </button>
      {opened && (
        <div className="flex text-white basis-full flex-col mb-5  items-center">
          <NavLinks />
        </div>
      )}
    </>
  );
};

export default Nav;
