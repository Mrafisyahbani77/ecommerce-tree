import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosInstance } from '../AxiosInstance';
import { useState } from 'react';

export const useMutationLogin = () => {
  const [onSubmit, setOnSubmit] = useState(false);
  const { mutate } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (data) => {
      setOnSubmit(true);
      const response = await AxiosInstance.post('/login', data);
      console.log(response);
      setOnSubmit(false);
      return response;
    },
    onSuccess: () => {
      toast.success('Login Successfully', {
        position: 'top-right',
        duration: 3000,
      });
    },

    onError : () => {
      toast.error('Password atau Email anda salah',{
        position: 'top-right',
        duration: 3000,
      })
    }
  });
  return { mutate, onSubmit, };
};
