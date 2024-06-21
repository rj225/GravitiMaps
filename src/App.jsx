import React, { useState } from "react";
import Map from "./components/Map";
import InputForm from "./components/InputForm";
import Navbar from "./components/Navbar";
import { LoadScript } from "@react-google-maps/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const libraries = ["places"];

const App = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [waypoints, setWaypoints] = useState([]);
  const [fetchDirections, setFetchDirections] = useState(false);
  const [originDisplay, setOriginDisplay] = useState("origin");
  const [destinationDisplay, setDestinationDisplay] = useState("destination");
  const [kmDisplay, setKmDisplay] = useState("NA");
  const [timeDisplay, setTimeDisplay] = useState("NA");
  const [routeNameDisplay, setRouteNameDisplay] = useState("route");
  const [travelMode, setTravelMode] = useState("DRIVING");

  const handleSearch = () => {
    setFetchDirections(true);
    // console.log("origin :", origin);
    // console.log("destination :" ,destination);
  };

  const resetFetchDirections = () => {
    setFetchDirections(false);
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <div className="bg-[#F4F8FA] flex justify-center items-center w-screen h-full md:h-screen">
        <div className=" w-full h-full">
          <Navbar />
          <div className="flex font-worksans justify-center items-center">
            <div className="container w-full md:p-4">
              <h3 className="text-center text-[#1B31A8] md:block hidden md:text-xl text-base my-4">
                Let's calculate <strong>distance</strong> from Google maps
              </h3>
              <div className="flex md:flex-row h-full w-full flex-col-reverse md:h-[70vh] md:space-x-12">
                <div className="md:w-1/2 md:mt-0 mt-1 w-full md:space-x-1">
                  <InputForm
                    setOrigin={setOrigin}
                    setDestination={setDestination}
                    waypoints={waypoints}
                    setWaypoints={setWaypoints}
                    handleSearch={handleSearch}
                    setFetchDirections={setFetchDirections}
                    originDisplay={originDisplay}
                    destinationDisplay={destinationDisplay}
                    timeDisplay={timeDisplay}
                    kmDisplay={kmDisplay}
                    routeNameDisplay={routeNameDisplay}
                    setTravelMode={setTravelMode}
                  />
                </div>
                <div className="md:w-1/2 w-full h-[38vh] md:h-full">
                  <Map
                    origin={origin}
                    destination={destination}
                    waypoints={waypoints}
                    fetchDirections={fetchDirections}
                    resetFetchDirections={resetFetchDirections}
                    setDestinationDisplay={setDestinationDisplay}
                    setOriginDisplay={setOriginDisplay}
                    setKmDisplay={setKmDisplay}
                    setTimeDisplay={setTimeDisplay}
                    setRouteNameDisplay={setRouteNameDisplay}
                    travelMode={travelMode}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer pauseOnHover={false} theme="colored" pauseOnFocusLoss={false}/>
      </div>
    </LoadScript>
  );
};

export default App;
