import React, { useState, useRef, useEffect } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { Autocomplete } from '@react-google-maps/api';

const InputForm = ({ setOrigin, setDestination, waypoints, setWaypoints, handleSearch}) => {
  const [waypointInput, setWaypointInput] = useState('');
  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const handleAddWaypoint = () => {
    setWaypoints([...waypoints, waypointInput]);
    setWaypointInput('');
  };

//   const handlePlaceSelect = (autocomplete, setInput) => {
//     const place = autocomplete.formattedPrediction;
//     console.log("palces",place);
//     if (place) {
//       setInput(place);
//     }
//   };


  const handleOriginSelect = (place) => {
    console.log(place);
    if (place) {
        console.log("origin worked" , place.gm_accessors_.place.Cs.formattedPrediction);
      setOrigin(place.gm_accessors_.place.Cs.formattedPrediction);
    }
  };

  const handleDestinationSelect = (place) => {
    if (place) {
        // console.log("destinaton worked" , place.gm_accessors_.place.As.formattedPrediction);
      setDestination(place.gm_accessors_.place.Cs.formattedPrediction);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <Autocomplete
          onLoad={(autocomplete) => originRef.current = autocomplete}
          onPlaceChanged={() => handleOriginSelect(originRef.current)}
        >
          <input
            type="text"
            placeholder="Origin"
            className="border p-2 rounded w-full"
            // onClick={setFetchDirections(false)}
          />
        </Autocomplete>
      </div>
      <div className="mb-4">
        <Autocomplete
          onLoad={(autocomplete) => destinationRef.current = autocomplete}
          onPlaceChanged={() => handleDestinationSelect(destinationRef.current)}
        >
          <input
            type="text"
            placeholder="Destination"
            className="border p-2 rounded w-full"
            // onClick={setFetchDirections(false)}
          />
        </Autocomplete>
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={waypointInput}
          onChange={(e) => setWaypointInput(e.target.value)}
          placeholder="Add Waypoint"
          className="border p-2 rounded w-full"
        //   onClick={setFetchDirections(false)}
        />
        <button onClick={handleAddWaypoint} className="mt-2 btn-primary flex items-center">
          <FaPlus /> Add Waypoint
        </button>
      </div>
      <ul className="mt-4">
        {waypoints.map((waypoint, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            {waypoint}
            <button onClick={() => setWaypoints(waypoints.filter((_, i) => i !== index))} className="text-red-500">
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleSearch} className="mt-4 w-full bg-green-500 text-white p-2 rounded">
        Search
      </button>
    </div>
  );
};

export default InputForm;
