import React from 'react';
import { useForm } from 'react-hook-form';
import { UseMutationProfile } from '../useMutation/useMutationProfile';
//icons
import { Mail } from 'lucide-react';
import { MdPhoneAndroid } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { ImageUp } from 'lucide-react';


export default function Modal({ isVisible, toggleModal, visible, refetch }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { mutate, reset } = UseMutationProfile();

  if (!isVisible) {
    return null;
  }

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('no_telp', data.no_telp);
    formData.append('photo', data.photo[0]);

    mutate(formData, {
      onSuccess: () => {
        refetch();
        reset();
        toggleModal();
      },
      onError: (error) => {
        console.error(error);
        reset();
      },
    });
  };

  const handleFileChange = (e) => {
    setValue('photo', e.target.files);
  };

  return (
    <div className="fixed inset-0 mt-16 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
      <div className="max-w-lg flex flex-col">
        <div className="bg-white p-5 rounded-md my-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="username" className='flex mt-4'> <FaUser className='w-5 mt-1 mr-1'/>Username</label>
              <input className="block bg-gray-100 rounded-md px-2 py-2 cursor-pointer w-full" type="text" id="username" placeholder="Masukkan Nama anda" {...register('username')} />
            </div>
            <div>
              <label htmlFor="email" className='flex mt-4'> <Mail className='w-5 mr-1'/>Email</label>
              <input className="block bg-gray-100 rounded-md px-2 py-2 cursor-pointer w-full" type="email" id="email" placeholder="Masukkan Email anda" {...register('email')} />
            </div>
            <div>
              <label htmlFor="no_telp" className='flex mt-4'><MdPhoneAndroid className='mt-1 w-5'/>No Telepon</label>
              <input className="block bg-gray-100 rounded-md px-2 py-2 cursor-pointer w-full" type="number" inputMode="numeric" id="no_telp" placeholder="Masukkan No Telepon anda" {...register('no_telp')} />
            </div>
            <div>
              <label className='flex mt-4' htmlFor="photo"><ImageUp className='w-5 mr-1'/>Photo</label>
              <input className="block cursor-pointer bg-gray-100 rounded-md px-2 py-2" type="file" id="photo" accept="image/*" onChange={handleFileChange} />
            </div>
            <div className="flex gap-3 mt-4 justify-center">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Save
              </button>
              <button type="button" onClick={toggleModal} className="bg-gray-500 text-white px-4 py-2 rounded-md">
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
