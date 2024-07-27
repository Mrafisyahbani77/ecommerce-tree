import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '../AxiosInstance';
import toast from 'react-hot-toast';

export const UseMutationProfile = () => {
  const { mutate, reset } = useMutation({
    mutationKey: ['update.profile'],
    mutationFn: async (data) => {
      const response = await AxiosInstance.post(`/profiles/update/${localStorage.getItem('user_id')}`, data, {
        method: 'PUT',
      });
      console.log(response);
      return response;
    },
    onSuccess: () => {
      toast.success('Profile Updated', {
        position: 'top-center',
      });
    },
    onError : () => {
      toast.error('Silahan Masukan Gambar Profile Mu', {
        position: 'top-center',
      });
    }
  });

  return {
    mutate,
    reset,
  };
};
