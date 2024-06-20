import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";

const Map = ({
  origin,
  destination,
  waypoints,
  fetchDirections,
  resetFetchDirections,
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
      setDirections(response);
    } else {
      console.error("Directions request failed:", response);
    }
  };

  return (
    <GoogleMap
      mapContainerStyle={{ height: "50vh", width: "100%" }}
      center={{ lat: 12.9716, lng: 77.5946 }}
      zoom={14}
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
            travelMode: "DRIVING",
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

      {origin && <Marker position={origin} />}
      {destination && <Marker position={destination} />}
    </GoogleMap>
  );
};

export default Map;
