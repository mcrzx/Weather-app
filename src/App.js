import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopPageButtons from './components/TopPageButtons';
import Input from './components/Input';
import LocationAndTime from './components/LocationAndTime';
import DetailsAndTemperature from './components/DetailsAndTemperature';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';

function App() {
  const fetchWeather = async () => {
     const data = await getFormattedWeatherData( {q:'london'})
     console.log(data);
  }
fetchWeather();
  return (
    <div className="mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
     <TopPageButtons/>
     <Input/>
     <LocationAndTime/>
     <DetailsAndTemperature/>
     <Forecast title='hourly forecast'/>
     <Forecast title='daily forecast'/>
    </div>
  );
}

export default App;
