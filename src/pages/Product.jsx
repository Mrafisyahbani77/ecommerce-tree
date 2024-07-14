import React, { useEffect, useState } from 'react';
import { useFetch } from '../useFetchProduct/useFetch';
import Banner from './Banner';
import { ShoppingCart } from 'lucide-react';

const HomePages = () => {
  const { data: products, isLoading, error } = useFetch();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <Banner />
      <section id="home" className="pt-20 pb-12 container">
        <div className=" gap-10 my-8 grid grid-cols-1 lg:grid lg:grid-cols-3 md:grid md:grid-cols-2 sm:items-center">
          {products?.map((product) => (
            <div key={product.id} className="border border-slate-600 w-full">
              <img src={product.image_url} alt={product.name} className="object-cover rounded-md w-full overflow-hidden md:max-h-52 max-h-80 mx-auto" />
              <div className="mt-10 mb-3 px-4">
                <h1 className="py-2 text-2xl font-bold text-slate-800 truncate">{product.name}</h1>
                <h2 className="text-xl font-semibold text-red-400">IDR : {product.price}</h2>
                <p className="py-3 text-lg font-medium">
                  Category :<span className="bg-slate-600 text-white px-3 py-2 rounded-full mx-3 text-center"> {product.merchant}</span>
                </p>
                <div>
                  <button className="w-full bg-slate-600 py-3 mt-10 text-white flex items-center justify-center gap-3 text-xl font-bold rounded-md" onClick={() => alert('Product added')}>
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

export default HomePages;
