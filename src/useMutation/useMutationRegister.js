import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosInstance } from '../AxiosInstance';
import toast from 'react-hot-toast';
import { useState } from 'react';

export const useMutationRegister = () => {
  const navigate = useNavigate();
  const [onSubmit, setOnSubmit] = useState(false);
  const { mutate } = useMutation({
    mutationKey: ['register'],
    mutationFn: async (data) => {
      setOnSubmit(true);
      const response = await AxiosInstance.post('/register', data);
      console.log(response);
      return response;
    },
    onSuccess: () => {
      toast.success('Yeay Login euyy', {
        position: 'top-center',
        duration: 3000,
      });
      navigate('/login');
    },
  });

  return { mutate, onSubmit };
};
