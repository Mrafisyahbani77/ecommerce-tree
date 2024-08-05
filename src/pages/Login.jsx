import Navbar from '../component/Navbar';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutationLogin } from '../useMutation/useMutationLogin';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//icons
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import Google from '../assets/Image/google.png';
import logo from '../assets/Image/logo3.png';
import Loader from '../component/Loader';
import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import toast from 'react-hot-toast';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .min(4, 'Password harus memiliki 4 huruf - minimum harus ada 4 chars.')
      .matches(/^.{4,}$/, 'Minimal Memiliki 4 karakter'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate: SubmitLogin, isPending } = useMutationLogin();

  const submited = (data) => {
    SubmitLogin(data);
  };

  const handleSubmitGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success('Success Login With Google', {
        position: 'top-center',
        duration: 3000,
      });

      // Extract the access token from the user object
      const token = result.user.accessToken;
      localStorage.setItem('token', token);
      console.log('Access Token:', token);

      navigate('/userdashboard');
    } catch (error) {
      toast.error('Failed to login with Google');
      console.error('Error logging in with Google:', error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="background-color flex items-center justify-center min-h-svh">
        <div className="hidden md:flex">
          <img src={logo} alt="" className="w-[100%] max-w-md p-8 space-y-8" />
        </div>
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
          <div className="text-center">
            <span className="text-2xl font-bold text-gray-900">E-Commerce-Tree</span>
          </div>
          <form onSubmit={handleSubmit(submited)} className="space-y-6">
            <div>
              <label htmlFor="email" className="flex text-sm font-medium text-gray-700">
                Email
                <MdEmail className="ml-1 h-5 w-4" />
              </label>
              <input type="email" name="email" id="email" {...register('email')} className="block w-full px-3 py-2 mt-1 border-slate-500 border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
              <p className="text-red-600">{errors.email?.message}</p>
            </div>
            <div>
              <label htmlFor="password" className="flex text-sm font-medium text-gray-700">
                Password <RiLockPasswordFill className="ml-1 w-4 h-4" />
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  {...register('password')}
                  className="block w-full px-3 py-2 mt-1 border-slate-500 border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
             
                />
                <button type="button" onClick={handleTogglePassword} className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none">
                  {showPassword ? <Eye className="w-4" /> : <EyeOff className="w-4" />}
                </button>
              </div>
              <p className="text-red-600">{errors.password?.message}</p>
            </div>
            <div>
              <div className="flex flex-col gap-5">
                <button
                  type="submit"
                  className="w-full px-4 py-2 font-medium text-white bg-cyan-800 border border-transparent rounded-md shadow-sm hover:bg-cyan-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isPending ? <Loader /> : 'Login'}
                </button>
                <button
                  onClick={handleSubmitGoogle}
                  type="button"
                  className="flex items-center justify-center gap-3 w-full px-4 py-2 font-medium text-black ring-1 border border-transparent rounded-md shadow-sm hover:ring-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <img src={Google} alt="cihuy image" className="w-6" />
                  Login With Google
                </button>
              </div>
              <Link to="/register" className="block text-black pt-5 font-medium text-md">
                Belum Punya Akun? Register <span className="text-cyan-400 underline">Disini</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
