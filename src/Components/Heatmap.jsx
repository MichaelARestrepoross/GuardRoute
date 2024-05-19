import React, { useState, useEffect, useRef } from 'react';
import { LoadScript, GoogleMap, HeatmapLayer } from '@react-google-maps/api';

const libraries = ['visualization'];
const mapContainerStyle = { height: "100%", width: "100%" };

const GOOGLE_MAPS_TOKEN = import.meta.env.VITE_GOOGLE_MAPS_TOKEN;
const GOOGLE_MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID;

function Heatmap() {
  const defaultCenter = { lat: 40.7831, lng: -73.9712 };
  const [heatmapData, setHeatmapData] = useState([]);
  const heatmapLayerRef = useRef(null);
  const [collisions, setCollisions] = useState([]);
  const [showHeatmap, setShowHeatmap] = useState(true);

  useEffect(() => {
    const fetchCollisions = async () => {
      try {
        const response = await fetch(`https://data.cityofnewyork.us/resource/h9gi-nx95.json?$where=location IS NOT NULL&$$app_token=mvRU6FX2wx4oFsgNJ5gRsXas1`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // Log the fetched data to ensure it contains valid location data
        console.log('Fetched data:', data);
        setCollisions(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCollisions();
  }, []);

  // Derive locations from collisions
  const locations = collisions && collisions.length > 0
    ? collisions.map(collision => ({
        lat: parseFloat(collision.location.latitude),
        lng: parseFloat(collision.location.longitude),
        collision_id: collision.collision_id,
        crash_date: collision.crash_date,
        crash_time: collision.crash_time,
      }))
    : [];

  useEffect(() => {
    if (locations.length > 0 && window.google && window.google.maps) {
      const data = locations.map(location => ({ location: new window.google.maps.LatLng(location.lat, location.lng) }));
      setHeatmapData(data);
    }
  }, [collisions]);

  useEffect(() => {
    if (heatmapLayerRef.current) {
      heatmapLayerRef.current.setMap(showHeatmap ? heatmapLayerRef.current.getMap() : null);
    }
  }, [showHeatmap]);

  return (
    <div className='w-100'>
      <p className='w-400 rounded-xl bg-black/70 p-3 text-xl text-white' style={{ fontFamily: 'Silkscreen, sans-serif', fontStyle: 'normal' }}>
        PLOTTED CRASHES
      </p>
      <LoadScript
        googleMapsApiKey={GOOGLE_MAPS_TOKEN}
        libraries={libraries}
        version="weekly"
        loadingElement={<div style={{ height: '100%' }} />}
      >
        <div style={{ height: "400px", width: "70vw" }}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={15}
            center={defaultCenter}
            options={{ mapId: GOOGLE_MAP_ID }}
          >
            {heatmapData.length > 0 && (
              <HeatmapLayer 
                data={heatmapData} 
                options={{ 
                  opacity: 1, // Full opacity
                  radius: 25, // Increased radius for better visibility
                  maxIntensity: 3, // Adjust max intensity for better visibility
                }} 
                onLoad={heatmapLayer => {
                  heatmapLayerRef.current = heatmapLayer;
                }}
              />
            )}
          </GoogleMap>
        </div>
      </LoadScript>
    </div>
  );
}

export default Heatmap;
