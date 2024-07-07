import React from 'react';
import Navbar from '../component/Navbar';
import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '../AxiosInstance';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };
  const { mutate } = useMutation({
    mutationKey: ['login'],
    mutationFn: async () => {
      const response = await AxiosInstance.post('/login', {
        email: 'admin@gmail.com',
        password: 'admin',
      });
      console.log(response);
      return response;
    },
    onSuccess: () => {
      alert('Login Success');
    },
  });

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" id="name" />
        <label>Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
