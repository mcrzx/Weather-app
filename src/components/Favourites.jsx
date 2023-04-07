import React from "react";
import { formatToLocalTime } from "../services/weatherService";
import Main from "./Main";
import Navbar from "./Navbar";
import { toast, ToastContainer } from 'react-toastify';

import { UilTrashAlt } from "@iconscout/react-unicons";

function Favourites({ weather }) {
  const { dt, timezone } = weather || {};

  
  const handleDeleteClick = () => {
    toast.info('City has been removed succesfully from the list!');
  }
  
  return (
    <div className="mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
      <Main />
      <Navbar />
      <ToastContainer/>
      <div>
        <div className="flex items-center justify-center my-6">
          <p className="text-white text-xl font-extralight">
            {dt && timezone ? formatToLocalTime(dt, timezone) : ""}
          </p>
        </div>
      </div>
      <div className="text-white text-3xl font-medium flex flex-row justify-center my-20">
        Favourite Cities
      </div>
      <div>
        <hr className="my-2" />
        <div className="flex items-center justify-start my-6">
          <p className="text-white font-medium uppercase">Saved cities</p>
          <UilTrashAlt  size={25} className='text-white cursor-pointer 
           transition ease-out hover:scale-125 items-end' onClick={handleDeleteClick} />

        </div>
        <hr className="my-2" />
      </div>
    </div>
  );
}
export default Favourites;
