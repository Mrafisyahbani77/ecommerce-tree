import React from 'react';
import Nav from './Nav';

const Navbar = () => {
  return (
    <>
      <header className="bg-gray-800 border-b sticky top-0 flex-wrap z-10">
        <div className="container w-full px-4 font-semibold flex justify-between items-center mx-auto flex-wrap">
          <div className="text-white py-7">
            <h1 className="text-2xl">E-Commerce Tree</h1>
          </div>
          {/* // MY Logo Pake Logo Disini klo ada */}
          <Nav />
        </div>
      </header>
    </>
  );
};

export default Navbar;
