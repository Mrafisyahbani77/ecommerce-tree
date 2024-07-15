import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosInstance } from '../AxiosInstance';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const useMutationLogin = () => {
  const [onSubmit, setOnSubmit] = useState(false);
  const navigate = useNavigate()
  const { mutate } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (data) => {
      setOnSubmit(true);
      const response = await AxiosInstance.post('/login', data);
      const {
        success,
        role,
        token,
        permissions,
        user: { email, username },
      } = response.data
      console.log(response.data);
      if (success) {
     localStorage.setItem('username', username)
     localStorage.setItem('email', email)
     localStorage.setItem('token', token)
     localStorage.setItem('permission', permissions)
     localStorage.setItem('role', role)
      }
 if(role.includes('admin')) {
        navigate('/adminDashboard');
      } else {
        navigate('/userDashboard');
      }
      setOnSubmit(false);
      return response;
    },
    onSuccess: () => {
      toast.success('Login Successfully', {
        position: 'top-right',
        duration: 3000,
      });
    
    },

    onError: () => {
      toast.error('Password atau Email anda salah', {
        position: 'top-right',
        duration: 3000,
      });
    },
  });
  return { mutate, onSubmit };
};
