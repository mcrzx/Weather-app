import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopPageButtons from './components/TopPageButtons';
import Input from './components/Input';
import LocationAndTime from './components/LocationAndTime';
import DetailsAndTemperature from './components/DetailsAndTemperature';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

const [query, setQuery] = useState({q:'Oradea'})
const [units, setUnits] = useState('metric')
const [weather, setWeather] = useState(null)

useEffect (() => {
  const fetchWeather = async () => {
    const message = query.q ? query.q: 'current location.';
    toast.info('Fetching weather for ' + message);
    await getFormattedWeatherData({...query, units}).then((data) =>
      {
        toast.success(`Successfully fetched weather for ${data.name}, ${data.country}`)
        setWeather(data);
      });
  };
fetchWeather();
}, [query, units])

const formatBackground = () => {
  if (!weather) return "from-cyan-700 to-blue-700";
  const threshold = units === "metric" ? 20 : 60;
  if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

  return "from-yellow-700 to-orange-700";
};

  return (
    <div className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
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

<ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;