import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/Navbar';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutationRegister } from '../useMutation/useMutationRegister';
//icons
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdPhoneAndroid } from "react-icons/md";



const Register = () => {
  const schema = yup.object().shape({
    username: yup.string().required('Username Wajib Diisi'),
    email: yup.string().email().required('Email Wajib Diisi'),
    no_telp: yup.string().min(8).required('No Telepon Wajib Diisi'),
    password: yup
      .string()
      .required('Password Wajib Diisi')
      .min(8, 'Password harus memiliki 8 huruf - minimum harus ada 8 chars.')
      .matches(/^.{8,}$/, 'Minimal Memiliki 8 karakter'),
  });

  const Submitted = (data) => {
    mutate(data);
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
 
  const {mutate, } = useMutationRegister()

  return (
    <>
      <Navbar />
      <div className="max-w-md p-8 mx-auto border-slate-500 border-2  bg-slate-200 rounded-md my-10">
        <h1 className="text-center mb-10 text-3xl font-bold  bg-gradient-to-r bg-clip-text text-transparent from-indigo-500 via-indigo-400 to-cyan-500">Register</h1>
        <form className="space-y-5" onSubmit={handleSubmit(Submitted)}>
          <div>
            <label className="text-md flex font-semibold text-slate-800">Username<FaUser className='ml-1 w-3 my-1'/></label>
            <input type="text" name="username" id="username" className="block w-full rounded-md py-2 px-3 mb-3 mt-2 border-2 border-slate-500" {...register('username')} />
            <p className="text-red-600">{errors.username?.message}</p>
          </div>
          <div>
            <label className="text-md flex font-semibold text-slate-800">Email<MdEmail className='ml-1 w-4 my-1'/></label>
            <input type="email" name="email" id="email" className="block border-slate-500 border-2  w-full rounded-md py-2 px-3 mb-3 mt-2" {...register('email')} />
            <p className="text-red-600">{errors.email?.message}</p>
          </div>
          <div>
            <label className="text-md flex font-semibold text-slate-800">No Telepon<MdPhoneAndroid className='ml-1 w-4 my-1'/></label>
            <input type="number" name="no_telp" id="no_telp" className="block w-full border-2 border-slate-500 rounded-md py-2 px-3 mb-3 mt-2" {...register('no_telp')} />
            <p className="text-red-600">{errors.no_telp?.message}</p>
          </div>
          <div>
            <label className="text-md font-semibold flex text-slate-800">Password<RiLockPasswordFill className='ml-1 w-4 my-1'/></label>
            <input type="password" name="password" id="password" className="block border-2 border-slate-500 w-full rounded-md py-2 px-3 mb-3 mt-2" {...register('password')} />
            <p className="text-red-600">{errors.password?.message}</p>
          </div>
          <button type="submit" className="w-full font-semibold bg-indigo-500  text-xl py-3 rounded-md text-white hover:bg-indigo-700 transition duration-300 ease-in-out shadow-xl shadow-indigo-300">
            Submit
          </button>
          <div className="w-full px-3 text-lg">
            {' '}
            <Link to="/login">
              Sudah Memiliki Akun? Login <span className="underline text-sky-500">Disini</span>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
