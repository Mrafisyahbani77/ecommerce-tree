import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '../AxiosInstance';

export const useFetch = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['fetch.products'],
    queryFn: async () => {
      const response = await AxiosInstance.get('products/');
      return response.data.data;
    },
  });

  return {
    data,
    isLoading,
    error,
  };
};

  export const useFetchCart = () => {
    const {data , isLoading, isError, isFetching, error} = useQuery({
      queryKey : ['product.cart'], 
      queryFn : async () => {
        const response = await AxiosInstance.get('carts-items/')
        const {data : ProductData} = response
        console.log(ProductData.data);
        return ProductData.data
      }
    })
  return {
    data, isLoading, isError, isFetching, error
  }
  }

