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
    // console.log("origin :", origin);
    // console.log("destination :" ,destination);
  };

  const resetFetchDirections = () => {
    setFetchDirections(false);
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={libraries}>
      <div className="bg-[#F4F8FA] flex justify-center items-center w-screen h-screen">
        <div className=" w-full h-full">
          <Navbar />
          <div className='flex font-worksans justify-center items-center'>
          <div className='container p-4'>
          <h3 className="text-center text-[#1B31A8] text-xl my-4">Let's calculate <strong>distance</strong>  from Google maps</h3>
          <div className="flex">
            <div className="w-1/2 space-x-1 p-4">
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
        </div>
      </div>
    </LoadScript>
  );
};

export default App;
