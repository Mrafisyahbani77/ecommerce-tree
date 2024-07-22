import Navbar from "../component/Navbar";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutationLogin } from "../useMutation/useMutationLogin";
import { useState } from "react";
import { Link } from "react-router-dom";
//icons
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import logo from '../assets/Image/logo.png'


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .min(4, "Password harus memiliki 4 huruf - minimum harus ada 4 chars.")
      .matches(/^.{4,}$/, "Minimal Memiliki 4 karakter"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate: SubmitLogin, onSubmit } = useMutationLogin();

  const submited = (data) => {
    SubmitLogin(data);
    console.log(data);
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mx-10 min-h-svh">
        <img src={logo} alt="" className="w-96 max-w-md p-8 space-y-8 bg-white rounded-lg shadow"/>
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
          <div className="text-center">
            <span className="text-2xl font-bold text-gray-900">
              E-Commerce-Tree
            </span>
          </div>
          <form onSubmit={handleSubmit(submited)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="flex text-sm font-medium text-gray-700"
              >
                Email
                <MdEmail className="ml-1 h-5 w-4" />
              </label>
              <input
                type="email"
                name="email"
                id="email"
                {...register("email")}
                className="block w-full px-3 py-2 mt-1 border-slate-500 border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
              <p className="text-red-600">{errors.email?.message}</p>
            </div>
            <div>
              <label
                htmlFor="password"
                className="flex text-sm font-medium text-gray-700"
              >
                Password <RiLockPasswordFill className="ml-1 w-4 h-4" />
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  {...register("password")}
                  className="block w-full px-3 py-2 mt-1 border-slate-500 border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
                >
                  {showPassword ? <Eye className="w-4" /> : <EyeOff className="w-4"/>}
                </button>
              </div>
              <p className="text-red-600">{errors.password?.message}</p>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {onSubmit ? "Loginnn..." : "Login"}
              </button>
              <Link to="/register" className="block pt-5 font-medium text-md">
                Belum Punya Akun? Register{" "}
                <span className="text-cyan-400 underline">Disini</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
