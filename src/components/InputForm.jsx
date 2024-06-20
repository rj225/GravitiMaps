import React, { useState, useRef, useEffect } from "react";
import { FaPlus, FaTrash, FaCircle } from "react-icons/fa";
import { Autocomplete } from "@react-google-maps/api";

const InputForm = ({
  setOrigin,
  setDestination,
  waypoints,
  setWaypoints,
  handleSearch,
}) => {
  const [waypointInput, setWaypointInput] = useState("");
  const originRef = useRef(null);
  const destinationRef = useRef(null);
  const waypointRefs = useRef(null);
  const waypointInputRef = useRef(null)

  //   const handlePlaceSelect = (autocomplete, setInput) => {
  //     const place = autocomplete.formattedPrediction;
  //     console.log("palces",place);
  //     if (place) {
  //       setInput(place);
  //     }
  //   };

  const handleOriginSelect = (place) => {
    // console.log(place);
    if (place) {
      const values = Object.values(place.gm_accessors_.place);
      // console.log("origin worked", values[0].formattedPrediction);
      setOrigin(values[0].formattedPrediction);
    }
  };

  const handleDestinationSelect = (place) => {
    if (place) {
      // console.log("destinaton worked" , place.gm_accessors_.place.As.formattedPrediction);
      const values = Object.values(place.gm_accessors_.place);
      setDestination(values[0].formattedPrediction);
    }
  };

  const handleWaypointSelect = (place) => {
    const values = Object.values(place.gm_accessors_.place);
    if (values !== null) {
      setWaypointInput(values[0].formattedPrediction);
      // console.log(values[0].formattedPrediction);
    }
  }

  const handleAddWaypoint = () => {
    if (waypointInput !== '' || waypointInput !== null) {
      setWaypoints([...waypoints, waypointInput]);
      // setWaypointInput(""); 
      waypointInputRef.current.value = "";
    }
  };

  return (
    <div className="p-4 font-ibmsans flex items-center space-x-2 justify-center">
      <div className=" w-1/2">
      <div className="mb-4 relative">
        <Autocomplete
          onLoad={(autocomplete) => (originRef.current = autocomplete)}
          onPlaceChanged={() => handleOriginSelect(originRef.current)}
        >
          <input
            type="text"
            placeholder="Origin"
            className="border p-2 rounded w-full"
            // onClick={setFetchDirections(false)}
          />
        </Autocomplete>
        <FaCircle className="absolute text-green-500 top-3 left-3" />
      </div>
      <div className="mb-4">
        <Autocomplete
          onLoad={(autocomplete) => (destinationRef.current = autocomplete)}
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
      <Autocomplete
          onLoad={(autocomplete) => (waypointRefs.current = autocomplete)}
          onPlaceChanged={() => handleWaypointSelect(waypointRefs.current)}
        >
          <input
            type="text"
            placeholder="Add Waypoint"
            ref={waypointInputRef}
            className="border p-2 rounded w-full"
          />
        </Autocomplete>
        <button
          onClick={handleAddWaypoint}
          className="mt-2 btn-primary flex items-center"
        >
          <FaPlus /> Add Waypoint
        </button>
      </div>
      <ul className="mt-4">
        {waypoints.map((waypoint, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span>{waypoint}</span>
            <button
              onClick={() =>
                setWaypoints(waypoints.filter((_, i) => i !== index))
              }
              className="text-red-500"
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
      </div>
      <div className=" w-1/2">
      <button
        onClick={handleSearch}
        className="mt-4 w-full bg-green-500 text-white p-2 rounded"
      >
        Search
      </button>
      </div>
    </div>
  );
};

export default InputForm;
