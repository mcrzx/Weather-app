import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopPageButtons from './components/TopPageButtons';
import Input from './components/Input';
import LocationAndTime from './components/LocationAndTime';
import DetailsAndTemperature from './components/DetailsAndTemperature';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';

function App() {

const [query, setQuery] = useState({q:'Oradea'})
const [units, setUnits] = useState('metric')
const [weather, setWeather] = useState(null)

useEffect (() => {
  const fetchWeather = async () => {
    await getFormattedWeatherData({...query, units}).then((data) =>
      {
        setWeather(data);
      });
  };
fetchWeather();
}, [query, units])

  return (
    <div className="mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
     <TopPageButtons setQuery={setQuery}/>
     <Input setQuery={setQuery} units={units} setUnits={setUnits}/>

     {weather && (
      <div> 
        <LocationAndTime weather= {weather}/>
     <DetailsAndTemperature weather = {weather}/>
     <Forecast title='hourly forecast' items={weather.hourly}/>
     <Forecast title='daily forecast' items={weather.daily}/>
      </div>
     )}
     
    </div>
  );
}

export default App;
