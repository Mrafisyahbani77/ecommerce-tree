import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '../AxiosInstance';

export const useDeletedWishlist = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (ProductId) => {
      const response = await AxiosInstance.delete(`wishlists/${ProductId}`);
      console.log(response);
      return response;
    },
  });
  return {
    mutate, isPending
  };
};
