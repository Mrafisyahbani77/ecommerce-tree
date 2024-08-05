import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFetchCart } from '../useFetchProduct/useFetch';
import { useFetchPay } from '../useFetchPayment/useFetchPay';
import { useCreateOrderAndPay } from '../useFetchPayment/useCreateOrderAndPay';
import NavbarUser from '../component/NavbarUsers';
import Keranjang from '../assets/Image/Ker.png';
import Diskon from '../assets/Image/dis.png';
import Loading from '../component/Loading';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Loader from '../component/Loader';
import { Input, NativeSelect } from '@mui/material';
import { useFetchAlamat, useFetchKecamatan, useFetchKelurahan, useFetchRegencies } from '../useFetchComponent/useFetchAlamat';

export default function Cart() {
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { data: cartData, isError, isFetching, isLoading } = useFetchCart();
  const { data: orderData } = useFetchPay();
  const { mutate: createOrderAndPay, isLoading: buttonLoading } = useCreateOrderAndPay();
  const { data: alamat, isLoading: loadingAlamat } = useFetchAlamat();
  const { data: regency, isLoading: loadingRegency } = useFetchRegencies();
  const { data: kecamatan, isLoading: loadingKecamatan } = useFetchKecamatan();
  const { data: kelurahan, isLoading: loadingKelurahan } = useFetchKelurahan();

  console.log(kelurahan);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = () => {
    if (selectedItems.length === 1) {
      const cartItemId = selectedItems[0]; // Ambil nilai pertama jika ada satu item

      createOrderAndPay(cartItemId, {
        onSuccess: (snapToken) => {
          if (!isPopupOpen) {
            // Cek apakah popup sudah terbuka
            setIsPopupOpen(true); // Set state popup menjadi terbuka
            window.snap.pay(snapToken, {
              onSuccess: function (result) {
                console.log('success', result);
                alert('Payment Success!');
                setIsPopupOpen(false); // Set state popup menjadi tertutup
              },
              onPending: function (result) {
                console.log('pending', result);
                alert('Payment Pending!');
                setIsPopupOpen(false); // Set state popup menjadi tertutup
              },
              onError: function (result) {
                console.log('error', result);
                alert('Payment Failed!');
                setIsPopupOpen(false); // Set state popup menjadi tertutup
              },
              onClose: function () {
                console.log('customer closed the popup without finishing the payment');
                alert('You closed the popup without finishing the payment');
                setIsPopupOpen(false); // Set state popup menjadi tertutup
              },
            });
          } else {
            alert('Payment popup is already open. Please complete the current payment process first.');
          }
        },
        onError: (error) => {
          console.error('Error during payment process', error);
          alert('Payment failed! Please try again.');
        },
      });
    } else {
      alert('Please select exactly one item to proceed with the order.');
    }
  };

  useEffect(() => {
    if (selectAll) {
      setSelectedItems(cartData.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  }, [selectAll, cartData]);

  const handleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const total = selectedItems.reduce((sum, id) => {
    const item = cartData.find((cartItem) => cartItem.id === id);
    return sum + (item ? parseFloat(item.product.price) : 0);
  }, 0);

  if (isFetching || isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="font-bold text-center flex items-center justify-center min-h-screen max-w-2xl container">
        <div>
          <h1 className="text-xl">Anda Tidak Bisa Membuka Halaman ini sebelum Login</h1>
          <Link to="/login" className="mt-5 block text-white rounded-lg bg-yellow-300 py-3 px-5 text-lg">
            Login Disini
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavbarUser />
      <div className="container mx-auto px-4 md:px-10">
        <div className="my-4">
          <p className="font-semibold md:text-left sm:text-left text-xl text-center md:text-2xl">Keranjang</p>
        </div>
        <div className="flex flex-wrap justify-between items-start md:items-start space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full lg:w-2/3 bg-white shadow-md rounded-lg md:p-10 p-4 mb-4 md:mb-0 relative">
            {loading ? (
              <div className="flex justify-center items-center w-full h-full">
                <div className="animate-spin rounded-full border-t-4 border-blue-700 border-opacity-25 w-24 h-24"></div>
              </div>
            ) : (
              <>
                {cartData.length === 0 ? (
                  <div className="flex flex-col items-center">
                    <img src={Keranjang} alt="Empty Cart" className="md:w-24 md:h-24 w-24 h-24 md:mr-4" />
                    <p className="font-semibold text-sm md:text-lg">Wah, keranjang belanjamu kosong</p>
                    <p className="text-gray-500 md:text-md text-xs">Yuk, isi dengan barang-barang impianmu!</p>
                    <Link to="/">
                      <button className="mt-4 hover:bg-green-700 py-1 px-2 text-sm md:text-md bg-green-500 text-white md:px-4 md:py-2 rounded-lg">Mulai Belanja</button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-5 w-full">
                    <div className="flex items-center text-green">
                      <input type="checkbox" className="mr-2 checkbox-green cursor-pointer" checked={selectAll} onChange={() => setSelectAll(!selectAll)} />
                      <p>Pilih Semua</p>
                    </div>
                    {cartData.map((cartItem) => (
                      <div key={cartItem.id} className="flex items-center justify-between p-4 border shadow">
                        <input type="checkbox" className="mr-2 checkbox-green cursor-pointer" checked={selectedItems.includes(cartItem.id)} onChange={() => handleSelectItem(cartItem.id)} />
                        <div className="flex items-center w-full">
                          <img src={cartItem.product.image_url} alt={cartItem.product.name} className="md:w-24 md:h-24 w-20 h-16 object-cover rounded-md mr-4" />
                          <div className="flex flex-col">
                            <p className="md:font-semibold md:text-lg text-xs">{cartItem.product.name}</p>
                            <p className="text-gray-500 md:text-md text-xs">{cartItem.product.merchant}</p>
                          </div>
                          <p className="ml-auto text-right md:text-lg kecil text-red-400">IDR: {cartItem.product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-10">
                  <h1 className="py-3 md:text-2xl text-center font-bold">Alamat</h1>
                  <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native" className="text-xl">
                      Provinsi
                    </InputLabel>
                    <NativeSelect
                      defaultValue={30}
                      inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                      }}
                    >
                      {loadingAlamat ? (
                        <Loader />
                      ) : (
                        alamat.map((addres) => (
                          <option key={addres.id} value={addres.name}>
                            {addres.name}
                          </option>
                        ))
                      )}
                    </NativeSelect>
                  </FormControl>
                  <FormControl fullWidth className="mt-10">
                    <InputLabel variant="standard" htmlFor="uncontrolled-native" className="text-xl">
                      Kabupaten/Kota
                    </InputLabel>
                    <NativeSelect
                      defaultValue={30}
                      inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                      }}
                    >
                      {loadingRegency ? (
                        <Loader />
                      ) : (
                        regency.map((regency) => (
                          <option key={regency.id} value={regency.name}>
                            {regency.name}
                          </option>
                        ))
                      )}
                    </NativeSelect>
                  </FormControl>
                  <FormControl fullWidth className="mt-10">
                    <InputLabel variant="standard" htmlFor="uncontrolled-native" className="text-xl">
                      Kecamatan
                    </InputLabel>
                    <NativeSelect
                      defaultValue={30}
                      inputProps={{
                        name: 'kecamatan',
                        id: 'uncontrolled-native',
                      }}
                    >
                      {loadingKelurahan ? (
                        <Loader />
                      ) : (
                        kelurahan.map((kelurahan) => (
                          <option key={kelurahan.id} value={kelurahan.name}>
                            {kelurahan.name}
                          </option>
                        ))
                      )}
                    </NativeSelect>
                  </FormControl>
                  <FormControl fullWidth className="mt-10">
                    <InputLabel variant="standard" htmlFor="uncontrolled-native" className="text-xl">
                      Kecamatan
                    </InputLabel>
                    <NativeSelect
                      defaultValue={30}
                      inputProps={{
                        name: 'kecamatan',
                        id: 'uncontrolled-native',
                      }}
                    >
                      {loadingKecamatan ? (
                        <Loader />
                      ) : (
                        kecamatan.map((kecamatan) => (
                          <option key={kecamatan.id} value={kecamatan.name}>
                            {kecamatan.name}
                          </option>
                        ))
                      )}
                    </NativeSelect>
                  </FormControl>
                  <div className="my-5">
                    <InputLabel variant="standard" htmlFor="uncontrolled-native" className="text-lg my-10">
                      Kode Pos
                    </InputLabel>
                    <Input fullWidth />
                  </div>
                  <div className="my-5">
                    <InputLabel variant="standard" htmlFor="uncontrolled-native" className="text-lg my-10">
                      Country
                    </InputLabel>
                    <Input fullWidth />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="bg-white lg:fixed md:w-full lg:w-auto lg:right-16 shadow-md rounded-lg p-6 md:max-w-lg w-full">
            <p className="font-semibold text-lg">Ringkasan belanja</p>
            <div className="flex justify-between mt-4">
              <span className="text-gray-500">Total</span>
              <span className="font-semibold">IDR: {total}</span>
            </div>
            <div className="bg-green-100 max-w-full text-green-600 p-1 md:p-4 flex rounded-lg mt-4 items-center">
              <img src={Diskon} alt="Promo" className="w-4 h-4 md:w-6 md:h-6 mr-2 md:mr-2" />
              <span className="text-xs md:text-md">Makin hemat pakai promo</span>
              <span className="ml-auto md:ml-auto">&gt;</span>
            </div>
            <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md w-full" onClick={handleButtonClick} disabled={buttonLoading || isPopupOpen}>
              {buttonLoading ? <Loader /> : 'Bayar'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
