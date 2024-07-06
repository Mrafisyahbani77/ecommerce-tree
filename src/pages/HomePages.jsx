import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AxiosInstance } from '../AxiosInstance';
import { useFetch } from '../useFetchProduct/useFetch';

const HomePages = () => {
  const {data : products, isError, isLoading, error} = useFetch()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <h1 className="text-3xl font-bold underline">
      <div className="grid grid-cols-2 gap-5 mx-10">
        {products?.map((product) => (
          <div key={product.id}>
            gambar
            <img src={product.image} alt="" />
            <h1 className="text-3xl">Nama Product : {product.name}</h1>
            <h1 className="text-3xl">Price : {product.price}</h1>
            <h1 className="text-3xl">PrdStatus : {product.status}</h1>
            <h1 className="text-3xl">Category : {product.merchant}</h1>
          </div>
        ))}
      </div>
    </h1>
  );
};

export default HomePages;
