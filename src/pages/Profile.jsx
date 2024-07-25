import Navbar from '../component/NavbarUsers';
import { useFetchProfile } from '../useFetchProfile/useFetchProfile';

export default function Profile() {
  const { data: profile, isFetching, isLoading, error } = useFetchProfile();

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!profile) {
    return <div>No Available</div>;
  }

    
  return (
    <>
      <Navbar />
      <section className="pt-12">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="flex items-center gap-3 w-full">
              <div className="w-32 px-4">
                <img src={`http://127.0.0.1:8000${profile.photo}`} alt="Sample Image" className="rounded-full" />
              </div>
              <h1 className="text-xl font-medium">Muhammad Hafidz</h1>
            </div>
            <div className="px-4">
              <h1 className="text-2xl font-bold pt-10">Biodata Diri :</h1>
              <div className="pt-5 flex gap-2 items-center justify-center">
                <div className="font-medium">
                  <h2 className="text-lg">Nama :</h2>
                  <h3 className="text-lg py-3">No_Telephone :</h3>
                  <h4 className="text-lg">Email :</h4>
                </div>
                <div className="font-medium">
                  <h2 className="text-lg">Muhammad Hafidz</h2>
                  <h3 className="text-lg py-3">6289518001464</h3>
                  <h4 className="text-lg">hafidz@gmail.com</h4>
                </div>
              </div>
            </div>
            <button onClick={() => alert("Profile Edited")} type="submit" className="w-full bg-slate-800 mt-10 py-5 font-semibold text-xl rounded-lg text-white">
              Edit Profile
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
