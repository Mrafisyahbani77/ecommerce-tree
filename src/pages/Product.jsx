import React, { useContext } from "react";
import { useFetch } from "../useFetchProduct/useFetch";
import Banner from "./Banner";
import { ShoppingCart } from "lucide-react";
import { AppContext } from "../store/context";
import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "../AxiosInstance";
import toast from "react-hot-toast";

const Product = () => {
  const { data: products, isLoading, error } = useFetch();
  const { dispatch } = useContext(AppContext);

  const mutation = useMutation({
    mutationKey: ["mutation.product.cart"],
    mutationFn: async (product) => {
      const response = await AxiosInstance.post("/carts-items/store", {
        products_id: product.id,
      });
      return response.data;
    },
    onSuccess: (data) => {
      // Update the cart in context or any other state management
      dispatch({ type: "ADD_TO_CART", payload: data });
    },
  });

  const addToCart = (product) => {
    toast.success("Product Added");
    mutation.mutate(product);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <Banner />
      <section id="home" className="pt-10 pb-12 container px-4">
        <h1 className="text-xl font-bold py-5 md:text-2xl lg:text-3xl">
          Kategori Pilihan
        </h1>
        <hr />
        <div className="md:grid grid-cols-2 mt-10 lg:grid lg:grid-cols-3 max-w-full">
          {products?.map((product) => (
            <div
              key={product.id}
              className="rounded-md mb-10 bg-white shadow-lg p-5 mx-auto max-w-xs border border-gray-200"
            >
              <div className="relative">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="object-cover rounded-t-md w-full h-48"
                />
              </div>
              <div className="p-4">
                <h1 className="text-lg font-semibold text-gray-800 truncate">
                  {product.name}
                </h1>
                <h3>
                  Category :{" "}
                  <span className="bg-slate-600 font-mono text-white px-3 py-1 rounded-full ">
                    {" "}
                    {product.merchant}
                  </span>
                </h3>
                <div className="flex items-center my-2">
                  <span className="text-red-500 font-bold">
                    Rp:{product.price}
                  </span>
                </div>
                <button
                  className="w-full bg-green-500 py-2 text-white flex items-center justify-center gap-3 text-lg font-bold rounded-md"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart />
                  Add To cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Product;
