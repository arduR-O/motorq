// src/components/MapSelector.js
"use client"
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customMarkerIcon = L.icon({
  iconUrl: "/images/marker.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const roundLocation = (location) => {
  return {
    lat: parseFloat(location.lat.toFixed(2)),
    lng: parseFloat(location.lng.toFixed(2)),
  };
};

const LocationMarker = ({ setPosition }) => {
  useMapEvents({
    click(e) {
      const roundedLatLng = roundLocation(e.latlng);
      setPosition(roundedLatLng);
    },
  });

  return null;
};

const MapSelector = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);
  const [userLocation, setUserLocation] = useState([51.51, -0.09]); // Default location
  const [mapKey, setMapKey] = useState(0); // Key to force re-render of MapContainer

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const roundedCoords = {
            lat: parseFloat(latitude.toFixed(2)),
            lng: parseFloat(longitude.toFixed(2)),
          };
          setUserLocation([roundedCoords.lat, roundedCoords.lng]);
          setPosition(roundedCoords); // Set initial position
          setMapKey(prev => prev + 1); // Force MapContainer to re-render
          console.log("User location:", roundedCoords.lat, roundedCoords.lng);
        },
        (error) => {
          console.error("Error fetching user location:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (position) {
      onLocationSelect(position);
    }
  }, [position, onLocationSelect]);

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer 
        key={mapKey}
        center={userLocation} 
        zoom={13} 
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && <Marker position={position} icon={customMarkerIcon} />}
        <LocationMarker setPosition={setPosition} />
      </MapContainer>
    </div>
  );
};

export default MapSelector;
