import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/Navbar';

const Register = () => {
  return (
    <>
      <Navbar />
      <div className="text-center flex justify-center underline">
        <Link to="/login">Register</Link>
      </div>
    </>
  );
};

export default Register;
