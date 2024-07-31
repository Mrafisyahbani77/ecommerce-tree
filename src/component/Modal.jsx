import React from 'react';
import { useForm } from 'react-hook-form';
import { UseMutationProfile } from '../useMutation/useMutationProfile';

export default function Modal({ isVisible, toggleModal, refetch , visible}) {
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
    // Create a new FormData object
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('no_telp', data.no_telp);
    formData.append('photo', data.photo[0]); // Ensure the

    mutate(formData, refetch);
    isVisible;
    reset();
    visible()
  };

  const handleFileChange = (e) => {
    setValue('photo', e.target.files); // Setting files instead of a single file
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
      <div className="max-w-lg flex flex-col">
        <div className="bg-white p-5 rounded-md my-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="username">Username</label>
              <input className="block" type="text" id="username" placeholder="Masukkan Nama anda" {...register('username')} />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input className="block" type="email" id="email" placeholder="Masukkan Email anda" {...register('email')} />
            </div>
            <div>
              <label htmlFor="no_telp">No Telepon</label>
              <input className="block" type="number" inputMode="numeric" id="no_telp" placeholder="Masukkan No Telepon anda" {...register('no_telp')} />
            </div>
            <div>
              <label htmlFor="photo">Photo</label>
              <input className="block" type="file" id="photo" accept="image/*" onChange={handleFileChange} />
            </div>
            <div className="flex gap-3 mt-4">
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
