import React from 'react';
import NavbarUsers from '../component/NavbarUsers';
import Product from './Product';
import { useFetchWishlist } from '../useFetchProduct/useFetchWishlist';
export default function WishList() {
  const { data, isLoading, isError, error, isFetching } = useFetchWishlist();

  if (isLoading || isFetching) {
    return <div>Loading....</div>;
  }
  console.log(data);
  return (
    <>
      <div>
        <NavbarUsers />
       <div className='pt-10 container'>
            {data.map((wishlist, index) => (
              <div key={index}>
                <div>
                    <img src={wishlist.products_id.image_url} alt={wishlist.products_id.name} className='max-w-md h-full object-cover'/>
                    <h1 className='text-2xl'>{wishlist.products_id.name}</h1>
                    <h3 className='text-xl mt-3'>Category : {wishlist.products_id.merchant}</h3>
                </div>
              </div>
            ))}
       </div>
      </div>
    </>
  );
}
