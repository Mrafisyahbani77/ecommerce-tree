import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "../AxiosInstance";

export const useFetchPay = () => {
  const { data, isLoading, isError, isFetching, error } = useQuery({
    queryKey: ['fetch.pay'],
    queryFn: async () => {
      const response = await AxiosInstance.get("/orders");
      return response.data;
    },
  });
  return {
    data,
    isLoading,
    isError,
    isFetching,
    error,
  };
};
