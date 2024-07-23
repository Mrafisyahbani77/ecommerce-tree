import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '../AxiosInstance';

export const useFetchProfile = () => {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['fetch.profile'],
    queryFn: async () => {
      const response = await AxiosInstance.get('profiles/');
      const {data : data} = response
      console.log(data.data);
      return data.data;
    },
  });

  return {
    data,
    isLoading, isFetching, error
  };
};
