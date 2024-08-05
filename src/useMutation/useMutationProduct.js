import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from '../AxiosInstance';

export const useMutationProdcut = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['createProduct'],
    mutationFn: async (productData) => {
      const response = await AxiosInstance.post('/products/store', productData);
      console.log(response);
      return response.data.data;
    },
  });
  return {
    mutate,
    isPending,
  };
};

export const useDeletedProduct = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['deleteProduct'],
    mutationFn: async (productId) => {
      const response = await AxiosInstance.delete(`/products/${productId}`);
      console.log(response);
      return response;
    },
  });
  return {
    mutate,
    isPending,
  };
};
