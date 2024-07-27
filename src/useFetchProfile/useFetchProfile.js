import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '../AxiosInstance';

export const useFetchProfile = () => {
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ['fetch.profile'],
    queryFn: async () => {
      const response = await AxiosInstance.get(`profiles/${localStorage.getItem('user_id')}`);
      const { data: data } = response;
      console.log(data);
      return data;
    },
  });

  return {
    data,
    isLoading,
    isFetching,
    error,
    refetch
  };
};
