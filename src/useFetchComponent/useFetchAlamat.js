import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useFetchAlamat = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['alamat'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8000/api/shipments/location/provinces');
      return response.data;
    },
  });

  return {
    data, 
    isLoading,
  };
};

export const useFetchRegencies = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['regency'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8000/api/shipments/location/regencies/32');
      return response.data;
    },
  });

  return {
    data,
    isLoading,
  };
};

export const useFetchKecamatan = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['kecamatan'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8000/api/shipments/location/districts/3201');
      return response.data;
    },
  });

  return {
    data,
    isLoading,
  };
};

export const useFetchKelurahan = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['kelurahan'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8000/api/shipments/location/villages/3201070');
      console.log(response.data);
      return response.data;
    },
  });

  return {
    data,
    isLoading,
  };
};
