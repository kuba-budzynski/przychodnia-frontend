import React from 'react'
import { useUser } from '@auth0/nextjs-auth0';
import Navbar from '../components/Navbar'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Loader } from '../components/utils';
import Footer from '../components/Footer';

function profile() {
    const { user, error, isLoading } = useUser();

  if (isLoading || error) return <div className="w-screen min-h-screen max-w-full bg-gray-50 py-32 flex justify-center justify-items-center  flex-col">
    <Navbar />
    <div className="min-h-screen py-64">
      <Loader color="text-indigo-400"></Loader>
    </div>
    <Footer />
  </div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div className="relative w-screen min-h-screen max-w-full bg-gray-50 flex justify-center justify-items-center flex-col">
        <Navbar />
        <div className="min-h-screen py-16 w-full max-w-5xl mx-auto px-4">
          <div className="flex space-x-8 my-24">
            <div className="w-36 h-36 bg-cover">
              <img src={user.picture} className="rounded-full h-full w-full overflow-hidden shadow-xl" alt={user.email} />
            </div>
            <div className="flex flex-col self-center space-y-2">
              <h1 className="text-5xl text-gray-400 font-semibold">Profil użytkownika:</h1>
              <h2 className="text-xl text-indigo-400">{user.name ? user.name : user.nickname}</h2>
              <button className="py-2 bg-emerald-400 hover:bg-emerald-500 text-white text-base font-bold rounded-md">Zapisz zmiany</button>
            </div>
          </div>
          
          <div className="w-full px-3 space-y-4 py-2 divide-y-2 divide-trueGray-100 max-w-2xl mx-auto">

            <div className="flex flex-col px-4">
              <p className="text-xl text-gray-500 font-semibold mb-1 px-2">Identyfikator użytkownika</p>
              <input className="w-full px-3 py-2 text-sm text-gray-400 font-normal leading-none bg-white outline-none rounded-md"
                type="text" name="id" value={user.sub} readOnly/>
            </div>

            <div className="flex flex-col px-4 pt-4">
              <p className="text-xl text-gray-500 font-semibold mb-1 px-2">Email</p>
              <input className="w-full px-3 py-2 text-sm text-gray-400 font-normal leading-none bg-white outline-none rounded-md"
                type="text" name="id" value={user.email} readOnly/>
            </div>

            <div className="flex flex-col px-4 pt-4">
              <p className="text-xl text-gray-500 font-semibold mb-1 px-2">Imię</p>
              <input className="w-full px-3 py-2 text-sm text-gray-400 font-normal leading-none bg-white outline-none rounded-md"
                type="text" name="id" value={"Adam"} readOnly/>
            </div>

            <div className="flex flex-col px-4 pt-4">
              <p className="text-xl text-gray-500 font-semibold mb-1 px-2">Nazwisko</p>
              <input className="w-full px-3 py-2 text-sm text-gray-400 font-normal leading-none bg-white outline-none rounded-md"
                type="text" name="id" value={"Kowalski"} readOnly/>
            </div>

            <div className="flex flex-col px-4 pt-4">
              <p className="text-xl text-gray-500 font-semibold mb-1 px-2">Data urodzenia</p>
              <input className="w-full px-3 py-2 text-sm text-gray-400 font-normal leading-none bg-white outline-none rounded-md"
                type="text" name="id" value={"01-01-1950"} readOnly/>
            </div>

            <div className="flex flex-col px-4 pt-4">
              <p className="text-xl text-gray-500 font-semibold mb-1 px-2">Pesel</p>
              <input className="w-full px-3 py-2 text-sm text-gray-400 font-normal leading-none bg-white outline-none rounded-md"
                type="text" name="id"/>
            </div>

            <div className="flex flex-col px-4 pt-4">
              <p className="text-xl text-gray-500 font-semibold mb-1 px-2">Number telefonu</p>
              <input className="w-full px-3 py-2 text-sm text-gray-400 font-normal leading-none bg-white outline-none rounded-md"
                type="text" name="id" value={"882573600"}/>
            </div>

          </div>

        </div>
        <Footer />
      </div>
    )
  );
}

export default withPageAuthRequired(profile)
