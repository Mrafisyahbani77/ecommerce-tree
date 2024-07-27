import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "../AxiosInstance";

export const useCreateOrderAndPay = () => {
  const mutation = useMutation({
    mutationFn: async (cartItemId) => {
      try {
        // Create order
        const response = await AxiosInstance.post("/orders/store", {
          cart_items_id: cartItemId,
        });

        const orderId = response.data.data.id;

        // Initiate payment
        const paymentResponse = await AxiosInstance.post(
          `/orders/${orderId}/payment`
        );
        return paymentResponse.data.snap_token;
      } catch (error) {
        // Log and throw error to be handled by onError
        console.error(
          "Error in createOrderAndPay:",
          error.response ? error.response.data : error.message
        );
        throw error;
      }
    },
  });

  return mutation;
};
