import React from 'react';
import NavUsers from './NavUsers';
import Icons from "../assets/Image/logo3.png"

const Navbar = () => {
  return (
    <>
     <header className="bg-secondary shadow-md border-b sticky top-0 flex-wrap z-50">
        <div className="container w-full px-4 font-semibold flex justify-between items-center mx-auto flex-wrap">
          <div className="text-black flex py-7">
            <img src={Icons} alt='Icons' className='md:w-10 w-5 bg-black rounded-2xl mr-2'/>
            <h1 className="text-sm md:mt-1 md:text-2xl">E-Commerce Tree</h1>
          </div>
          {/* // MY Logo Pake Logo Disini klo ada */}
          <NavUsers/>

        </div>
      </header>
    </>
  );
};

export default Navbar;
