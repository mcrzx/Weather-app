import React from "react";
import { formatToLocalTime } from "../services/weatherService";
import Main from "./Main";
import Navbar from "./Navbar";
import { toast, ToastContainer } from "react-toastify";
import { useFavouriteCities } from "../utils/ZustandStore";
import { UilTrashAlt } from "@iconscout/react-unicons";
import { useEffect } from "react";
import { useRemoveFavouriteCity } from "../utils/ZustandStore";
import { useState } from "react";

function Favourites({ weather }) {
  const { dt, timezone } = weather || {};
  const favouriteCities = useFavouriteCities();
  const removeFavouriteCity = useRemoveFavouriteCity();

  const [selectedCities, setSelectedCities] = useState([]);

  const handleDeleteClick = () => {
    if (selectedCities.length === 0) {
      return;
    }
    const cityNames = selectedCities.join(", ");
    toast.info(`${cityNames} have been removed successfully from the list!`);
    selectedCities.forEach(removeFavouriteCity);
    setSelectedCities([]);
  };

  const handleCheckboxChange = (event, city) => {
    if (event.target.checked) {
      setSelectedCities([...selectedCities, city]);
      localStorage.setItem("selectedCity", city);
    } else {
      setSelectedCities(selectedCities.filter((c) => c !== city));
      localStorage.removeItem("selectedCity");
    }
  };

  return (
    <div className= 'videocomponent'>      <Main />
    <div className = 'navbar'>
            <Navbar />

   
    <div className="mx-auto max-w-screen-lg mt-4 py-5 px-4 md:px-16 lg:px-24 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
     
      <ToastContainer />

      <div className="my-6 flex justify-center">
        <p className="text-white text-xl font-extralight">
          {dt && timezone ? formatToLocalTime(dt, timezone) : ""}
        </p>
      </div>
      <div className="text-white text-3xl font-medium text-center my-8">
        Favorite Cities
      </div>
      <div>
        <hr className="my-2" />
        <div className="flex justify-center my-6">
          {/* <hr className="my-2" /> */}
        </div>
        <div className="flex flex-col justify-center">
          {favouriteCities?.map((city, index) => (
            <div
            className="flex flex-col md:flex-row items-center justify-between my-6"
            key={index}
            >
      <div className="flex items-center justify-start mb-4 md:mb-0">
                <input
                  type="checkbox"
                  checked={selectedCities.includes(city)}
                  onChange={(event) => handleCheckboxChange(event, city)}
                />
        <p className="text-white text-xl md:text-2xl font-medium ml-3">{city}</p>
              </div>
            </div>
          ))}
          {selectedCities.length > 0 && (
            <div className="flex justify-center my-4">
              <button
                onClick={handleDeleteClick}
                className="text-white font-medium px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition ease-out"
                >
                <UilTrashAlt className="inline-block mr-1" size="20" />
                Delete 
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
    </div>

  );

}

export default Favourites;
