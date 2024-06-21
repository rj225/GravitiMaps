import React, { useState, useRef, useEffect } from "react";
import {  FaTrash, FaCircle } from "react-icons/fa";
import { Autocomplete } from "@react-google-maps/api";
import { BsPlusCircle } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { FaCar, FaBicycle, FaWalking } from "react-icons/fa";
import destinationactivelogo from './assests/destination.png'
import { toast } from 'react-toastify';

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
  setTravelMode
}) => {
  const [waypointInput, setWaypointInput] = useState("");
  const [selectedMode, setSelectedMode] = useState("DRIVING");
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
    if (waypointInput && waypointInput.trim() !== '') {
      setWaypoints([...waypoints, waypointInput]);
      setWaypointInput("");
      waypointInputRef.current.value = "";
    } else {
      toast.error("Please enter a stop first");
    }
  };

  const handleModeChange = (mode) => {
    setSelectedMode(mode);
    setTravelMode(mode);
    toast.info(`Travel mode changed to ${mode}`);
  };


  return (
    <div className="font-ibmsans w-full md:flex p-4 md:p-0 flex-col md:justify-between md:items-center md:h-full">
      <div className="flex w-full md:flex-row flex-col md:h-4/6 items-center md:mb-5 md:space-x-2 justify-center">
      <div className="md:w-1/2 w-full md:h-full relative md:p-0">
      <div className="md:mb-4 mb-2 relative">
      <label htmlFor="origin" className=" hidden md:block mb-2"> Origin </label>
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
        <FaCircle className="absolute border-black rounded-full border-2 p-[0.8px] text-green-500 md:top-11 top-3 left-3" />
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
        <img src={destinationactivelogo} alt="none" className="absolute md:top-11 top-3 left-3" />
        <div
          onClick={handleAddWaypoint}
          className="flex text-sm justify-end cursor-pointer mt-2 text-right items-center"
        >
          <BsPlusCircle className="mr-2" /> Add another stops
        </div>
      </div>
      <ul className="overflow-y-auto mb-1 md:h-12 h-10">
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
        <FaLocationDot className="absolute rounded-full text-green-950 md:top-11 top-3 left-3" />
      </div>
      </div>
      <div className=" flex flex-col justify-center items-center mt-1 md:w-1/2">
      <div className="text-xs italic my-1">Note: <span className=" text-blue-800">Click <span className=" font-bold">"Calculate"</span> after changing the mode</span></div>
      <div className="md:w-5/6 w-2/3 border-2 space-x-1 bg-white p-2 shadow-xl rounded-xl md:h-auto flex justify-around mb-4">
        <button
          onClick={() => handleModeChange("DRIVING")}
          className={`flex items-center md:px-3 p-2 md:py-3 rounded-full ${selectedMode === "DRIVING" ? "bg-blue-600 text-white ring-2 duration-500 ring-blue-200" : "bg-gray-200 text-gray-800"}`}
        >
          <FaCar className=" xl:text-2xl lg:text-lg text-sm" />
        </button>
        <button
          onClick={() => handleModeChange("TWO_WHEELER")}
          className={`flex items-center md:px-3 p-2 md:py-3 rounded-full ${selectedMode === "TWO_WHEELER" ? "bg-blue-600 text-white ring-2 duration-500 ring-blue-200" : "bg-gray-200 text-gray-800"}`}
        >
          <FaBicycle className=" xl:text-2xl lg:text-lg text-sm" />
        </button>
        <button
          onClick={() => handleModeChange("WALKING")}
          className={`flex items-center md:px-3 p-2 md:py-3 rounded-full ${selectedMode === "WALKING" ? "bg-blue-600 text-white ring-2 duration-500 ring-blue-200" : "bg-gray-200 text-gray-800"}`}
        >
          <FaWalking className="xl:text-2xl lg:text-lg text-sm" />
        </button>
      </div>
      <button
        onClick={handleSearch}
        className="md:mt-4 bg-[#1B31A8] px-5 py-2 lg:px-7 lg:py-4 md:px-6 md:py-3 md:text-xl text-lg rounded-full text-white"
      >
        Calculate
      </button>
      </div>
      </div>

      
      <div className="w-full md:h-2/6 md:mt-0 mt-2 shadow-md rounded-xl overflow-hidden">
        <div className="lg:text-2xl text-base items-center md:flex-row flex-col flex font-extrabold px-2 py-3 md:px-3 md:py-6 bg-white h-1/2">
        <div  className=" flex md:justify-around justify-between md:border-0 md:pb-0 pb-1 border-b-[0.5px] border-gray-400 w-full items-center md:w-1/2">
        <span>Distance</span>
        <span className=" text-[#0079FF] text-base lg:text-2xl">{kmDisplay}</span>
        </div>
        <div className=" flex md:justify-around justify-between md:mt-0 mt-1 items-center w-full md:w-1/2">
        <span>Time</span>
        <span className=" text-[#0079FF] text-base lg:text-2xl">{timeDisplay}</span>
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
