  // import React, { useContext, useEffect, useState } from 'react';
  import { useFetch } from '../useFetchProduct/useFetch';
  import Banner from './Banner';
  import { ShoppingCart } from 'lucide-react';
  import { AppContext } from '../store/context';
  import { useMutation } from '@tanstack/react-query';
  import { AxiosInstance } from '../AxiosInstance';


const Product = () => {
  const { data: products, isLoading, error } = useFetch();
  // const { addToCart } = useContext(AppContext);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  // const {} = useMutation({
  //   mutationKey : ['mutation.product.cart'],
  //   mutationFn : async () => {
  //     const response = await AxiosInstance.post('')
  //   }
  // })

  return (
    <>
      <Banner />
      <section id="home" className="pt-10 pb-12 container px-4">
        <h1 className='text-xl font-bold py-5 md:text-2xl lg:text-3xl'>Kategori Pilihan</h1>
        <hr/>
        <div className=" gap-10 my-8 grid grid-cols-1 lg:grid lg:grid-cols-3 md:grid md:grid-cols-2 sm:items-center">
          {products?.map((product) => (
            <div key={product.id} className="rounded-md bg-white shadow-md p-5 mx-auto">
              <img src={product.image_url} alt={product.name} className="object-cover rounded-md  max-w-full overflow-hidden md:max-h-52 max-h-80 mx-auto" />
              <div className="mt-10 mb-3 px-4">
                <h1 className="py-2 text-2xl font-semibold text-slate-800 truncate">{product.name}</h1>
                <h2 className="text-xl font-medium text-red-400">IDR : {product.price}</h2>
                <p className="py-3 text-lg font-medium">
                  Category :<span className="bg-slate-600 text-white px-3 py-2 rounded-full mx-3 text-center"> {product.merchant}</span>
                </p>
                <div>
                  <button className="w-full bg-slate-600 py-3 mt-10 text-white flex items-center justify-center gap-3 text-xl font-bold rounded-md" onClick={() => addToCart(product)}>
                    <ShoppingCart />
                    Add To cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Product

  