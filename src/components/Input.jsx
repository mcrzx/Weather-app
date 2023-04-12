import React, { useState } from "react";
import {
  UilSearch,
  UilLocationPoint,
  UilHeart,
} from "@iconscout/react-unicons";
import { toast } from "react-toastify";
import Autosuggest from "react-autosuggest";
import { useCityStore, useFavouriteCityStore } from "../utils/ZustandStore";

function Input({ setQuery, units, setUnits }) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleFaveClick = () => {
    toast.info("Added to favourites");
    setFavourites((prevFavourites) => [...prevFavourites, value]);
    useFavouriteCityStore.getState().addFavouriteCity(value);
    console.log(useFavouriteCityStore.getState().favouriteCities);
  };

  const handleSearchClick = () => {
    if (value !== "") {
      setQuery({ q: value });
      toast.success("Successfully fetched weather");
      useCityStore.getState().addCity(value);
    }
  };

  const handleLocationClick = () => {
    toast.info("Fetching user location.");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched!");
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setQuery({ lat, lon });
      });
    }
  };

  const handleSuggestionsFetchRequested = ({ value }) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/find?q=${value}&type=like&sort=population&cnt=10&appid=91ded8148b316886689e7522bee4fc11`
    )
      .then((response) => response.json())
      .then((data) => {
        const suggestions = data.list.map(
          (result) => `${result.name}, ${result.sys.country}`
        );
        setSuggestions([...new Set(suggestions)]);
      });
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = (_, { newValue }) => {
    setValue(newValue);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery({ q: suggestion });
    setValue(suggestion);
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => (
    <button
      className="p-2 w-full text-left text-white text-xl"
      onClick={() => handleSuggestionClick(suggestion)}
    >
      {suggestion}
    </button>
  );

  const inputProps = {
    placeholder: "Enter location",
    value,
    onChange: handleChange,
    style: {
      fontSize: "24px",
      height: "48px",
      borderRadius: "8px",
      paddingLeft: "16px",
    },
    onKeyDown: (e) => {
      if (e.key === "Enter") {
        handleSearchClick();
      }
    },
  };

  return (
    <div className="container mx-auto sm:px-6 md:px-8 lg:px-10">
      <div className="flex flex-col sm:flex-row justify-center my-6">
        <div className="flex flex-col sm:flex-row w-full sm:w-3/4 items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
            onSuggestionsClearRequested={handleSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
          <div className="flex flex-row items-center justify-center space-x-4">
            <UilSearch
              size={25}
              className="text-white cursor-pointer transition ease-out hover:scale-125 "
              onClick={handleSearchClick}
            />
            <UilLocationPoint
              size={25}
              className="text-white cursor-pointer transition ease-out hover:scale-125"
              onClick={handleLocationClick}
            />
            <UilHeart
              size={25}
              className="text-white cursor-pointer transition ease-out hover:scale-125"
              onClick={handleFaveClick}
            />
          </div>
        </div>

        <div className="flex flex-row w-1/4 items-center justify-center md:justify-end">
          <button
            name="metric"
            className="text-xl text-white font-light transition ease-out hover:scale-125 md:inline-block hidden"
            onClick={handleUnitsChange}
          >
            °C{" "}
          </button>
          <p className="text-xl text-white mx-1 hidden md:inline-block">|</p>
          <button
            name="imperial"
            className="text-xl text-white font-light transition ease-out hover:scale-125 md:inline-block hidden"
            onClick={handleUnitsChange}
          >
            °F{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Input;
