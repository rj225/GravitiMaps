import React, { useState } from 'react';
import Map from './components/Map';
import InputForm from './components/InputForm';
import Navbar from './components/Navbar';
import { LoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const App = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [waypoints, setWaypoints] = useState([]);
  const [fetchDirections, setFetchDirections] = useState(false);

  const handleSearch = () => {
    setFetchDirections(true);
    console.log("origin :", origin);
    console.log("destination :" ,destination);
  };

  const resetFetchDirections = () => {
    setFetchDirections(false);
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={libraries}>
      <div className="bg-[#F4F8FA] flex justify-center items-center h-screen">
        <div className="container border-2">
          <Navbar />
          <h3 className="font-bold text-center text-2xl my-4">Let's calculate distance from Google maps</h3>
          <div className="flex">
            <div className="w-1/2 p-4">
              <InputForm
                setOrigin={setOrigin}
                setDestination={setDestination}
                waypoints={waypoints}
                setWaypoints={setWaypoints}
                handleSearch={handleSearch}
                setFetchDirections={setFetchDirections}
              />
            </div>
            <div className="w-1/2">
              <Map 
                origin={origin} 
                destination={destination} 
                waypoints={waypoints} 
                fetchDirections={fetchDirections} 
                resetFetchDirections={resetFetchDirections} 
              />
            </div>
          </div>
        </div>
      </div>
    </LoadScript>
  );
};

export default App;
