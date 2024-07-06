import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '../AxiosInstance';

export const useFetch = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['fetch.products'],
    queryFn: async () => {
      const response = await AxiosInstance.get('products/');
      console.log(response.data.data)
      return response.data.data;
    },
  });

  return {
    data,
    isLoading,
    error,
    isError,
  };
};
