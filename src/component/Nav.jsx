import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
  return (
    <>
      <NavLink to="/" className='hover:bg-white w-full text-center rounded-md transition duration-300 ease-in-out hover:py-2 py-2 hover:text-slate-800'>Home</NavLink>
      <NavLink to="/cart" className='hover:bg-white w-full text-center rounded-md transition duration-300 ease-in-out hover:py-2 py-2 hover:text-slate-800'>Cart</NavLink>
      <NavLink to="/login" className='hover:bg-white w-full text-center rounded-md transition duration-300 ease-in-out hover:py-2 py-2 hover:text-slate-800'>Login</NavLink>
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
        {opened ? <X size={25} color='white'/> : <Menu size={25} color='white' />}
      </button>
      {opened && <div className="flex text-white basis-full flex-col mb-5  items-center">
        <NavLinks/>
        </div>}
    </>
  );
};

export default Nav;
