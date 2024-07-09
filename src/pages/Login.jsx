import React from "react";
import Navbar from "../component/Navbar";
import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "../AxiosInstance";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: async () => {
      const response = await AxiosInstance.post("/login", {
        email: "admin@gmail.com",
        password: "admin",
      });
      console.log(response);
      return response;
    },
    onSuccess: () => {
      alert("Login Success");
    },
  });

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
          <div className="text-center">
            <span className="text-2xl font-bold text-gray-900">E-Commerce-Tree</span>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
