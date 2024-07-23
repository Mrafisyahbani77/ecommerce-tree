import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useFetchBanner = () => {
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ['fetch.banners'],
    queryFn: async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/banners/');
      console.log(response.data);
      return response;
    },
  });
  return {
    data,
    isLoading,
    isFetching,
    error,
  };
};

