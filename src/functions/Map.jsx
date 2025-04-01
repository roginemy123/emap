import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function Map() {
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [currentGuide, setCurrentGuide] = useState(null);
  const markersRef = useRef([]);
  const routeControlRef = useRef(null);
  const markerInstancesRef = useRef({});

  // Function to fetch location name
  const getLocationName = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      if (data.address) {
        const { town, city, village, municipality, state, country } = data.address;
        const locationName = town || city || village || municipality || "Unknown Location";
        return `${locationName}, ${municipality || ""}, ${state || ""} ${country || ""}`.trim();
      }
      return "Unknown Location";
    } catch (error) {
      console.error("Error fetching location name:", error);
      return "Unknown Location";
    }
  };

  // Initialize map and get user location
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([10.3157, 123.8854], 10);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapRef.current);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          mapRef.current.setView([latitude, longitude], 13);
          setUserLocation({ lat: latitude, lng: longitude });
          L.marker([latitude, longitude])
            .addTo(mapRef.current)
            .bindPopup("You are here!")
            .openPopup();
        },
        (error) => console.error("Error getting location:", error)
      );
    }
  }, []);

  return (
    <>
      <div id="map" style={{ height: "400px", width: "100%" }}></div>
    </>
  );
}

export default Map;
