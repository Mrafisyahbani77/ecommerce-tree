import Navbar from "../component/Navbar";
import Keranjang from "../assets/Image/Ker.png";
import Diskon from "../assets/Image/dis.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFetchCart } from "../useFetchProduct/useFetch";

export default function Cart() {
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = () => {
    setButtonLoading(true);
    setTimeout(() => {
      setButtonLoading(false);
    }, 2000);
  };

  const { data, isError, isFetching, isLoading } = useFetchCart();

  if (isFetching || isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading cart items</div>;
  }

  return (
    <div className="background-color h-screen">
      <Navbar />
      <div className="container mx-auto px-10">
        <div className="my-4">
          <p className="font-semibold text-white md:text-left sm:text-left text-xl text-center md:text-2xl">
            Keranjang
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start space-y-4 md:space-y-0 md:space-x-4">
          <div className="md:flex md:max-w-[100%] bg-white shadow-md rounded-lg md:p-16 p-10 items-center mb-4 md:mb-0 relative">
            {loading ? (
              <div className="flex justify-center items-center w-full h-full">
                <div className="animate-spin rounded-full border-t-4 border-blue-700 border-opacity-25 w-24 h-24"></div>
              </div>
            ) : (
              <>
                {data.length === 0 ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={Keranjang}
                      alt="Empty Cart"
                      className="md:w-24 md:h-24 w-24 h-24 md:mr-4"
                    />
                    <p className="font-semibold text-sm md:text-lg">
                      Wah, keranjang belanjamu kosong
                    </p>
                    <p className="text-gray-500">
                      Yuk, isi dengan barang-barang impianmu!
                    </p>
                    <Link to="/">
                      <button className="mt-4 hover:bg-green-700 py-1 px-2 text-sm md:text-md bg-green-500 text-white md:px-4 md:py-2 rounded-lg">
                        Mulai Belanja
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="w-full">
                    {data.map((cartItem) => (
                      <div key={cartItem.id} className="flex items-center justify-between p-4 border-b">
                        <img
                          src={cartItem.product.image_url}
                          alt={cartItem.product.name}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <div className="ml-4 flex-grow">
                          <h1 className="text-xl font-semibold">{cartItem.product.name}</h1>
                          <p className="text-gray-500">{cartItem.product.merchant}</p>
                          <p className="text-red-400">IDR: {cartItem.product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 md:max-w-lg w-full md:w-auto">
            <p className="font-semibold text-lg">Ringkasan belanja</p>
            <div className="flex justify-between mt-4">
              <span className="text-gray-500">Total</span>
              <span className="font-semibold">
                IDR: {data.reduce((total, item) => total + parseFloat(item.product.price), 0)}
              </span>
            </div>
            <div className="bg-green-100 max-w-full text-green-600 p-1 md:p-4 flex rounded-lg mt-4 items-center">
              <img
                src={Diskon}
                alt="Promo"
                className="w-4 h-4 md:w-6 md:h-6 mr-2 md:mr-2"
              />
              <span className="text-xs md:text-md">Makin hemat pakai promo</span>
              <span className="ml-auto md:ml-auto">&gt;</span>
            </div>
            <button
              className="mt-4 bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full flex justify-center items-center"
              onClick={handleButtonClick}
              disabled={buttonLoading}
            >
              {buttonLoading ? "Loading...." : "Beli"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
