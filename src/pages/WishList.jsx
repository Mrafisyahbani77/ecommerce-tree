import React from 'react';
import NavbarUsers from '../component/NavbarUsers';
import Product from './Product';
import { useFetchWishlist } from '../useFetchProduct/useFetchWishlist';
import { useDeletedWishlist } from '../useWishlistProduct/useDeletedWishlist';
import { Trash } from 'lucide-react';
import Loading from '../component/Loading';
import toast from 'react-hot-toast';
// import { useDeletedWishlist } from '../useWishlistProduct/useDeletedWishlist';

export default function WishList() {
  // QUERYING WISHLIST
  const { mutate } = useDeletedWishlist();
  const { data, isLoading, isError, error, isFetching, refetch } = useFetchWishlist();

  if (isLoading || isFetching) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    <div>{error.message}</div>;
  }

  if (isError) {
    <div>An error occured</div>;
  }
  console.log(data);

  const handleClickDeleted = (ProductId) => {
    const confirmm = confirm('Are you sure you want to delete');

    if (confirmm) {
      return mutate(ProductId, {
        onSuccess: () => {
          refetch();
          toast.success('Product Deleted', {
            position : "top-left",
            duration: 3000,
          });
        },
      });
    }
  };

  return (
    <>
      <div>
        <NavbarUsers />
        <div className="pt-10 container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((wishlist, index) => (
            <div key={index}>
              <div className="px-4 shadow-xl bg-white p-5 rounded-md">
                <img src={wishlist.products_id.image_url} alt={wishlist.products_id.name} className="max-w-md h-full object-cover mx-auto w-full" />
                <div className="flex justify-center flex-col">
                  <h1 className="text-2xl font-semibold py-3">{wishlist.products_id.name}</h1>
                  <span className="text-red-500 font-bold">Rp: {wishlist.products_id.price}</span>

                  <h3 className="font-medium mt-3">
                    Category : <span className="bg-slate-600 font-mono text-white py-1 px-3 rounded-full"> {wishlist.products_id.merchant}</span>
                  </h3>
                  <div className="items-center justify-center gap-5 mt-5 font-xl font-semibold md:flex">
                    <button className="bg-primary py-3 w-full my-5 rounded-md text-white md:w-1/2">Add To Cart</button>
                    <button onClick={() => handleClickDeleted(wishlist.id)} className="w-full md:w-1/2 ring-1 ring-red-500 py-3 rounded-md hover:bg-red-600 transition duration-300 ease-in-out text-sm gap-1 flex justify-center items-center">
                      <Trash />
                      Hapus Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
