import React, { useState } from 'react'
import { UilSearch, UilLocationPoint, UilHeart } from '@iconscout/react-unicons'
import { toast } from 'react-toastify';

function Input({setQuery, units, setUnits}) {
  const [city, setCity] = useState('');

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name
    if (units !== selectedUnit) setUnits(selectedUnit);
  } 
  const handleSearchClick = () => {
    if (city !== '') {
      setQuery({q: city})
      toast.success('Successfully fetched weather')
    }
  }

  const handleFaveClick = () => {
    toast.info('Added to favourites')
  }
  const handleLocationClick = () => {
    toast.info ('Fetching users location.')
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success('Location fetched!')
        let lat = position.coords.latitude
        let lon = position.coords.longitude

        setQuery({
          lat,lon,
        })
      })
    }
  }
  return (
    <div className='container mx-auto sm:px-6 md:px-8 lg:px-10'>
      <div className='flex flex-col sm:flex-row justify-center my-6'>
        <div className='flex flex-col sm:flex-row w-full sm:w-3/4 items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4'>
          <input 
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            placeholder='Enter location'
            type='text'
            className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase' />
          <div className='flex flex-row items-center justify-center space-x-4'>
            <UilSearch size={25} className='text-white cursor-pointer transition ease-out hover:scale-125 ' onClick={handleSearchClick}/>
            <UilLocationPoint size={25} className='text-white cursor-pointer transition ease-out hover:scale-125' onClick={handleLocationClick}/>
            <UilHeart size={25} className='text-white cursor-pointer transition ease-out hover:scale-125' onClick={handleFaveClick}/>
          </div>
        </div>

        <div className='flex flex-row w-1/4 items-center justify-center md:justify-end'>
            <button name='metric' className='text-xl text-white font-light transition ease-out hover:scale-125 md:inline-block hidden'
            onClick={handleUnitsChange}>°C </button>
            <p className='text-xl text-white mx-1 hidden md:inline-block'>|</p>
            <button name='imperial' className='text-xl text-white font-light transition ease-out hover:scale-125 md:inline-block hidden'
            onClick={handleUnitsChange}>°F </button>
        </div>
     </div>
     </div>
  );
}

export default Input
