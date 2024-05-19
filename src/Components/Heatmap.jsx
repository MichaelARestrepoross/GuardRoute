import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';

const GOOGLE_MAPS_TOKEN = import.meta.env.VITE_GOOGLE_MAPS_TOKEN;
const GOOGLE_MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID;

const HeatmapLayerComponent = ({ data }) => {
  const map = useMap();

  const heatmapLayer = useMemo(() => new HeatmapLayer({
    id: 'heatmapLayer',
    data: data,
    getPosition: d => d.position,
    getWeight: d => 1,
    radiusPixels: 60,
  }), [data]);

  useEffect(() => {
    if (map) {
      const overlay = new GoogleMapsOverlay({
        layers: [heatmapLayer],
      });
      overlay.setMap(map);
      return () => overlay.setMap(null);
    }
  }, [map, heatmapLayer]);

  return null;
};

const Heatmap = () => {
  const navigate = useNavigate();
  const defaultCenter = { lat: 40.7831, lng: -73.9712 };
  const [collisions, setCollisions] = useState([]);

  useEffect(() => {
    const fetchCollisions = async () => {
      try {
        const response = await fetch(`https://data.cityofnewyork.us/resource/h9gi-nx95.json?$where=location IS NOT NULL&$$app_token=mvRU6FX2wx4oFsgNJ5gRsXas1`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCollisions(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCollisions();
  }, []);

  const heatmapData = useMemo(() => 
    collisions.map(collision => ({
      position: [parseFloat(collision.location.longitude), parseFloat(collision.location.latitude)],
    })), 
    [collisions]
  );

  return (
    <APIProvider apiKey={GOOGLE_MAPS_TOKEN}>
      <div className='flex flex-col items-center w-full'>
        <p className='w-400 rounded-xl bg-black/70 p-3 text-xl text-white mb-4' style={{ fontFamily: 'Silkscreen, sans-serif', fontStyle: 'normal' }}>
          CRASHES HEATMAP
        </p>
        <div style={{ height: "600px", width: "80vw" }} className='mb-4'>
          <Map
            defaultCenter={defaultCenter}
            defaultZoom={15}
            options={{ mapId: GOOGLE_MAP_ID }}
          >
            <HeatmapLayerComponent data={heatmapData} />
          </Map>
        </div>
        <div>
          <button onClick={() => navigate(-1)} className='w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Go Back
          </button>
        </div>
      </div>
    </APIProvider>
  );
};

export default Heatmap;
