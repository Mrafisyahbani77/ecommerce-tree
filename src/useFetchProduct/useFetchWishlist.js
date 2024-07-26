import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '../AxiosInstance';

export const useFetchWishlist = () => {
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['fetch.wishlist'],
    queryFn: async () => {
      const response = await AxiosInstance.get('wishlists/');
      console.log(response.data.data);
      return response.data.data;
    },
  });
  return {
    data,isLoading, isError, error, isFetching
  };
};
