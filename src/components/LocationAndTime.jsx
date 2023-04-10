import React from 'react';
import { formatToLocalTime } from '../services/weatherService';

function LocationAndTime({ weather: { dt, timezone, name, country } }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="hidden sm:block my-6">
        <p className="text-white text-xl font-extralight">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center my-3">
        <p className="text-white text-3xl font-medium text-center">
          {`${name}, ${country}`}
        </p>
      </div>
    </div>
  );
}

export default LocationAndTime;
