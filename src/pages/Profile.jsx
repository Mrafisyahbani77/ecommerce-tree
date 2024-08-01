import { useState } from 'react';
import Modal from '../component/Modal';
import Navbar from '../component/NavbarUsers';
import { useFetchProfile } from '../useFetchProfile/useFetchProfile';
import Loading from '../component/Loading';

export default function Profile() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const { data: profile, isFetching, isLoading, error, refetch } = useFetchProfile();

  if (isLoading || isFetching) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!profile) {
    return <div>No Available</div>;
  }

  const admin = `${localStorage.getItem('role')}/Customer`;

  if (admin.includes('admin')) {
    return `${admin}/Pengelola`;
  }

  return (
    <>
      <Navbar />
      <section className="pt-12">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full px-4">
              <h1 className="text-xl font-semibold mb-10 lg:text-4xl">Biodata Diri</h1>
              <div className="flex items-center gap-4">
                <div className="block relative">
                  <img src={`http://127.0.0.1:8000${profile.profiles.photo}`} alt={profile.profiles.username} className="object-cover w-32 h-32 border-slate-800 border-2 lg:w-48 lg:h-48 rounded-full custom-position" />
                </div>
                <div>
                  <h1 className="text-lg font-medium lg:text-3xl">{profile.profiles.username}</h1>
                </div>
              </div>
              <div className="mt-8 font-medium text-lg lg:text-2xl">
                <h1>{`${admin}`}</h1>
                <h2 className="py-2">{`+${profile.profiles.no_telp}`}</h2>
                <h3>{profile.profiles.email}</h3>
              </div>
              <button
                onClick={toggleModal}
                className="mt-10 w-full max-w-lg md:w-full mx-auto bg-slate-800 py-3 rounded-md font-semibold hover:bg-slate-400 text-white shadow-slate-300 shadow-2xl transition duration-300 ease-in-out flex justify-center my-5"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </section>
      <Modal isVisible={isVisible} visible={setIsVisible} toggleModal={toggleModal} refetch={refetch} />
    </>
  );
}
