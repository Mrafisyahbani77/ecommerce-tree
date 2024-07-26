import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '../AxiosInstance';
import toast from 'react-hot-toast';

export const UseMutationProfile = () => {
  const { mutate, reset } = useMutation({
    mutationKey: ['update.profile'],
    mutationFn: async (data) => {
      const response = await AxiosInstance.put('/profiles/update/', data);
      console.log(response);
      return response;
    },
    onSuccess : () => {
        toast.success('Profile Updated', {
          position: 'top-center',
        });
    }
  });

  return {
    mutate, reset
  }
};
