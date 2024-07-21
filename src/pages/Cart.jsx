import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../store/context';
import Navbar from "../component/Navbar";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading for 1 second
    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = () => {
    setButtonLoading(true);
    setTimeout(() => {
      setButtonLoading(false);
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-10">
        <div className="my-4">
          <p className="font-semibold md:text-left sm:text-left text-xl text-center md:text-2xl">
            Keranjang
          </p>
        </div>
        {cart.length === 0 ? (
          <div className="flex justify-center items-center w-full h-full">
            <div>
              <p className="font-semibold text-sm md:text-lg">
                Wah, keranjang belanjamu kosong
              </p>
              <p className="text-gray-500">
                Yuk, isi dengan barang-barang impianmu!
              </p>
              <Link to="/">
                <button className="mt-4 py-1 px-2 text-sm md:text-md bg-green-500 text-white md:px-4 md:py-2 rounded-lg">
                  Mulai Belanja
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-start space-y-4 md:space-y-0 md:space-x-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:max-w-full bg-slate-200 shadow-xl rounded-lg md:p-16 p-10 items-center mb-4 md:mb-0 relative">
              {cart.map((item, index) => (
                <div key={index} className="border border-slate-600 w-full mb-4">
                  <img src={item.image_url} alt={item.name} className="object-cover rounded-md w-full overflow-hidden mx-auto" />
                  <div className="mt-10 mb-3 px-4">
                    <h1 className="py-2 text-2xl font-bold text-slate-800 truncate">{item.name}</h1>
                    <h2 className="text-xl font-semibold text-red-400">IDR : {item.price}</h2>
                    <p className="py-3 text-lg font-medium">
                      Category :<span className="bg-slate-600 text-white px-3 py-2 rounded-full mx-3 text-center"> {item.merchant}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 md:max-w-lg w-full md:w-auto">
              <p className="font-semibold text-lg">Ringkasan belanja</p>
              <div className="flex justify-between mt-4">
                <span className="text-gray-500">Total</span>
                <span className="font-semibold">IDR: {cart.reduce((total, item) => total + item.price, 0)}</span>
              </div>
              <button
                className="mt-4 bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-lg w-full flex justify-center items-center"
                onClick={handleButtonClick}
                disabled={buttonLoading}
              >
                {buttonLoading ? "Loading...." : "Beli"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
