import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import { toast } from 'react-toastify';

const Map = ({
  origin,
  destination,
  waypoints,
  fetchDirections,
  resetFetchDirections,
  setDestinationDisplay,
  setOriginDisplay,
  setKmDisplay,
  setTimeDisplay,
  setRouteNameDisplay,
  travelMode
}) => {
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (fetchDirections) {
      console.log("Fetching directions...");
      console.log("Origin:", origin);
      console.log("Destination:", destination);
      console.log("Waypoints:", waypoints);

      if (origin && destination) {
        setDirections(null); // Reset directions before fetching new ones
        resetFetchDirections();
      }
    }
  }, [fetchDirections, origin, destination, waypoints, resetFetchDirections]);

  const directionsCallback = (response) => {
    if (response !== null && response.status === "OK") {
      console.log("Directions response:", response);
      setOriginDisplay(response.request.origin.query)
      setDestinationDisplay(response.request.destination.query)
      setTimeDisplay(response.routes[0].legs[0].duration.text)
      setKmDisplay(response.routes[0].legs[0].distance.text)
      setRouteNameDisplay(response.routes[0].summary)
      setDirections(response);
      toast.success("Search Complete")
    } else {
      console.error("Directions request failed:", response);
    }
  };

  return (
    <GoogleMap
      mapContainerStyle={{ height: "100%", width: "100%" }}
      center={{ lat: 12.9716, lng: 77.5946 }}
      zoom={17}
    >
      {origin && destination && fetchDirections && (
        <DirectionsService
          options={{
            origin: origin,
            destination: destination,
            waypoints: waypoints.map((location) => ({
              location,
              stopover: true,
            })),
            travelMode: travelMode,
          }}
          callback={directionsCallback}
        />
      )}
      {directions && (
        <DirectionsRenderer
          options={{
            directions: directions,
          }}
        />
      )}

      {/* {origin && destination && directions && <Marker position={origin} />}
      {origin && destination && directions &&  <Marker position={destination} />} */}
    </GoogleMap>
  );
};

export default Map;
