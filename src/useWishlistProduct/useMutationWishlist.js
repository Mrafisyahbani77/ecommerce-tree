import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '../AxiosInstance';

export const useMutationWishlist = () => {
  const { mutate, isError, isPending } = useMutation({
    mutationKey: ['add.to.wishlist'],
    mutationFn: async (WishlistId) => {
      const response = await AxiosInstance.post('wishlists/store', {
        products_id: WishlistId,
      });
      console.log(response);
      return response;
    },
  });

  return {
    mutate,
    isError,
    isPending,
  };
};

