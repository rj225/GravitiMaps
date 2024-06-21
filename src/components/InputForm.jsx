import React, { useState, useRef, useEffect } from "react";
import {  FaTrash, FaCircle } from "react-icons/fa";
import { Autocomplete } from "@react-google-maps/api";
import { BsPlusCircle } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import destinationactivelogo from './assests/destination.png'
const InputForm = ({
  setOrigin,
  setDestination,
  waypoints,
  setWaypoints,
  handleSearch,
  originDisplay,
  destinationDisplay,
  kmDisplay,
  timeDisplay,
  routeNameDisplay,
}) => {
  const [waypointInput, setWaypointInput] = useState("");
  const originRef = useRef(null);
  const destinationRef = useRef(null);
  const waypointRefs = useRef(null);
  const waypointInputRef = useRef(null);


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
      setWaypointInput(""); 
      waypointInputRef.current.value = "";
    }
  };

  return (
    <div className="font-ibmsans w-full md:flex p-4 md:p-0 flex-col md:justify-center md:items-center md:h-full md:pb-4">
      <div className="flex w-full md:flex-row flex-col md:h-4/6 items-center md:space-x-2 justify-center">
      <div className="md:w-1/2 w-full md:h-fit md:px-3 md:p-0">
      <div className="md:mb-4 mb-2 relative">
      <label htmlFor="origin" className=" hidden md:block my-2"> Origin </label>
        <Autocomplete
          onLoad={(autocomplete) => (originRef.current = autocomplete)}
          onPlaceChanged={() => handleOriginSelect(originRef.current)}
        >
          <input
            type="text"
            placeholder="Add origin"
            className="border p-2 pl-8 rounded w-full"
            // onClick={setFetchDirections(false)}
          />
        </Autocomplete>
        <FaCircle className="absolute border-black rounded-full border-2 p-[0.8px] text-green-500 md:top-9 top-3 left-3" />
      </div>
      <div className="mb-1 relative">
      <label htmlFor="stops" className=" my-2 hidden md:block"> Stops </label>
      <Autocomplete
          onLoad={(autocomplete) => (waypointRefs.current = autocomplete)}
          onPlaceChanged={() => handleWaypointSelect(waypointRefs.current)}
        >
          
          <input
            type="text"
            placeholder="Add stops"
            ref={waypointInputRef}
            className="border p-2 pl-8 rounded w-full"
          />
        </Autocomplete>
        <img src={destinationactivelogo} alt="none" className="absolute md:top-9 top-3 left-3" />
        <div
          onClick={handleAddWaypoint}
          className="flex text-sm justify-end cursor-pointer mt-2 text-right items-center"
        >
          <BsPlusCircle className="mr-2" /> Add another stops
        </div>
      </div>
      <ul className="overflow-y-auto mb-1 md:h-16 h-10">
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
      <div className="md:mb-2 mb-1 relative">
      <label htmlFor="destination" className=" my-2 hidden md:block"> Destination </label>
        <Autocomplete
          onLoad={(autocomplete) => (destinationRef.current = autocomplete)}
          onPlaceChanged={() => handleDestinationSelect(destinationRef.current)}
        >
          <input
            type="text"
            placeholder="Destination"
            className="border p-2 pl-8 rounded w-full"
            // onClick={setFetchDirections(false)}
          />
          
        </Autocomplete>
        <FaLocationDot className="absolute rounded-full text-green-950 md:top-9 top-3 left-3" />
      </div>
      </div>
      <div className=" flex justify-center items-center mt-1 md:w-1/2">
      <button
        onClick={handleSearch}
        className="md:mt-4 bg-[#1B31A8] px-5 py-2 md:px-7 md:py-4 md:text-xl text-lg rounded-full text-white"
      >
        Calculate
      </button>
      </div>
      </div>
      
      <div className="w-full md:h-2/6 md:mt-0 mt-2 shadow-md rounded-xl overflow-hidden">
        <div className="md:text-2xl text-base items-center flex font-extrabold px-2 py-3 md:px-3 md:py-6 bg-white h-1/2">
        <div  className=" flex justify-around items-center w-1/2">
        <span>Distance</span>
        <span className=" text-[#0079FF] text-base md:text-2xl">{kmDisplay}</span>
        </div>
        <div className=" flex justify-around items-center w-1/2">
        <span>Time</span>
        <span className=" text-[#0079FF] text-base md:text-2xl">{timeDisplay}</span>
        </div>
        </div>
        <div className="md:text-sm text-xs h-1/2 flex justify-center items-center px-4 py-2 overflow-auto">
        <div>The distance between <span className=" font-bold">{originDisplay}</span>  and <span className=" font-bold">{destinationDisplay}</span>  via ({routeNameDisplay}) the seleted route is <span className=" font-bold">{kmDisplay}</span></div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
