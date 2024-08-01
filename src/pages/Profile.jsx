import { useState } from 'react';
import Modal from '../component/Modal';
import Navbar from '../component/NavbarUsers';
import { useFetchProfile } from '../useFetchProfile/useFetchProfile';
import Loading from '../component/Loading';
import { FaClipboardUser } from 'react-icons/fa6';
import { MdPhoneAndroid } from 'react-icons/md';
import { Mail } from 'lucide-react';

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
    return <div className="flex justify-center items-center h-screen text-red-500">{error.message}</div>;
  }

  if (!profile) {
    return <div className="flex justify-center items-center h-screen">No Data Available</div>;
  }

  const admin = `${localStorage.getItem('role')}/Customer`;

  if (admin.includes('admin')) {
    return `${admin}/Pengelola`;
  }

  return (
    <>
      <Navbar />
      <section className="pt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-8/12 lg:w-6/12 px-4 bg-white rounded-xl shadow-xl border">
              <h1 className="text-2xl text-center md:text-left font-semibold mb-8 lg:text-4xl">Biodata Diri</h1>
              <div className="md:flex text-center md:text-left items-center gap-4">
                <div className="md:block inline-block relative ">
                  <img src={`http://127.0.0.1:8000${profile.profiles.photo}`} alt={profile.profiles.username} className="object-cover w-32 h-32 border-slate-800 border-2 lg:w-48 lg:h-48 rounded-full custom-position" />
                </div>
                <div>
                  <h1 className="text-lg font-medium lg:text-3xl">{profile.profiles.username}</h1>
                </div>
              </div>
              <div className="mt-8 font-medium text-lg lg:text-2xl">
                <h1 className="flex items-center justify-center md:justify-start">
                  <FaClipboardUser className="mt-1 mr-3" />
                  {`${admin}`}
                </h1>
                <h2 className="py-2 flex items-center justify-center md:justify-start">
                  <MdPhoneAndroid className="mt-1 mr-3" />
                  {`+${profile.profiles.no_telp}`}
                </h2>
                <h3 className="flex items-center justify-center md:justify-start">
                  <Mail className="mt-1 mr-3 " color="#f60404" />
                  {profile.profiles.email}
                </h3>
              </div>
              <button onClick={toggleModal} className="mt-10 w-full bg-slate-800 py-3 rounded-md font-semibold hover:bg-slate-400 text-white shadow-lg transition duration-300 ease-in-out flex justify-center my-5">
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
