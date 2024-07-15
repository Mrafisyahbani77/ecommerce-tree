import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosInstance } from '../AxiosInstance';
import toast from 'react-hot-toast';

export const useMutationRegister = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationKey: ['register'],
    mutationFn: async (data) => {
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

  return { mutate };
};
