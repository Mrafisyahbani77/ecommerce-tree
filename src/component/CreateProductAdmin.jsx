import { Button, FormLabel, Input } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutationProdcut } from '../useMutation/useMutationProduct';
import Loader from './Loader';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateProductAdmin = () => {
  const { register, handleSubmit } = useForm();
  const { mutate, isPending } = useMutationProdcut();
  const navigate = useNavigate();

  const handleSubmited = (data) => {
    const fd = new FormData();

    fd.append('name', data.name);
    fd.append('merchants_id', data.merchants_id);
    fd.append('status', data.status);
    fd.append('price', data.price);
    fd.append('image', data.image[0]);

    mutate(fd, {
      onSuccess: () => {
        navigate('/adminDashboard');
        toast.success('Product Created Success');
      },
      onError: (error) => {
        console.error(error);
      },
    });
    console.log(data);
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-10">Create Product Pages</h1>
      <div className="flex items-center justify-center mt-10">
        <form onSubmit={handleSubmit(handleSubmited)}>
          <div className="flex flex-col my-5 ">
            <FormLabel>Masukan Nama Product</FormLabel>
            <Input name="name" type="text" className="min-w-72" {...register('name')} />
          </div>
          <div className="flex flex-col my-5 ">
            <FormLabel>Kategori</FormLabel>
            <Input name="merchants_id" type="text" className="min-w-72" {...register('merchants_id')} />
          </div>
          <div className="flex flex-col my-5 ">
            <FormLabel>Harga</FormLabel>
            <Input name="price" type="text" inputMode="numeric" className="min-w-72" {...register('price')} />
          </div>
          <div className="flex flex-col my-5 ">
            <FormLabel>Status</FormLabel>
            <Input name="status" type="text" className="min-w-72" {...register('status')} />
          </div>
          <div className="flex flex-col my-5 ">
            <FormLabel>Gambar</FormLabel>
            <Input name="image" className="min-w-72 p-5" type="file" {...register('image')} />
          </div>
          {isPending ? (
            <Loader />
          ) : (
            <>
              <Button variant="contained" type="submit">
                Submit Product
              </Button>
              <Link to="/adminDashboard">
                <Button className="ml-3" variant="contained" type="submit">
                  Back
                </Button>
              </Link>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default CreateProductAdmin;
