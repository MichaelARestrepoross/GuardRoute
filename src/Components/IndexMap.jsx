import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import { formatCrashDate } from '../Helpers/AccidentIndexHelper';

function IndexMap({ GOOGLE_MAPS_TOKEN, GOOGLE_MAP_ID, locations }) {
  const navigate = useNavigate();
  const boroughs = {
    Manhattan: { lat: 40.7831, lng: -73.9712 },
    Brooklyn: { lat: 40.6782, lng: -73.9442 },
    Queens: { lat: 40.7282, lng: -73.7949 },
    Bronx: { lat: 40.8448, lng: -73.8648 },
    StatenIsland: { lat: 40.5795, lng: -74.1502 },
  };

  const [center, setCenter] = useState(boroughs.Manhattan);
  const [open, setOpen] = useState(null);
  const [useCenterProp, setUseCenterProp] = useState(true);
  const mapRef = useRef(null);

  const handleBoroughChange = (event) => {
    const newCenter = boroughs[event.target.value];
    setCenter(newCenter);
    setUseCenterProp(true); // Use the center prop when dropdown is selected
  };

  const handleMapClick = () => {
    setUseCenterProp(false); // Disable the center prop on map click
  };

  const handleDisableCenter = () => {
    setUseCenterProp(false); // Disable the center prop on button click
  };

  const handleNavigationClick = (e, id) => {
    e.preventDefault();
    navigate(`/accidents/${id}`);
  };

  useEffect(() => {
    if (useCenterProp && mapRef.current) {
      mapRef.current.panTo(center);
    }
  }, [center, useCenterProp]);

  return (
    <div className='w-100'>
      <p className='w-400 rounded-xl bg-black/70 p-3 text-xl text-white' style={{ fontFamily: 'Silkscreen, sans-serif', fontStyle: 'normal' }}>
        PLOTTED CRASHES
      </p>
      <div>
        <div>
          <label htmlFor="boroughs" style={{ color: 'red', marginRight: '10px', backgroundColor: "white" }}>Select Borough:</label>
          <select id="boroughs" onChange={handleBoroughChange}>
            {Object.keys(boroughs).map((borough) => (
              <option key={borough} value={borough}>{borough}</option>
            ))}
          </select>
          {useCenterProp && (
            <button className="bg-yellow hover:bg-light-navy text-light-navy hover:text-white font-bold py-2 px-4 rounded-full inline-block text-base mt-4 mb-4" onClick={handleDisableCenter} style={{ marginLeft: '10px' }}>Disable Center</button>
          )}
        </div>
      </div>
      <APIProvider apiKey={GOOGLE_MAPS_TOKEN}>
        <div className='flex justify-normal' style={{ height: "400px", width: "70vw" }}>
          {useCenterProp ? (
            <Map
              center={center}
              zoom={13}
              mapId={GOOGLE_MAP_ID}
              onLoad={(map) => { mapRef.current = map; }}
              onClick={handleMapClick}
            >
              {locations.map((location, index) => {
                const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
                return (
                  <AdvancedMarker key={index} position={{ lat: location.lat, lng: location.lng }} onClick={() => setOpen(index)}>
                    <Pin
                      background={"red"}
                      borderColor={"gray"}
                      glyphColor={"white"}
                    />
                    {open === index && (
                      <InfoWindow position={{ lat: location.lat, lng: location.lng }} onCloseClick={() => setOpen(null)}>
                        <div>
                          <p>Crash Date: {formatCrashDate(location.crash_date)}</p>
                          <p>Crash Time: {location.crash_time}</p>
                          <a href={googleMapsUrl} target="_blank" style={{ color: '#1A73E8', textDecoration: 'underline' }}>
                            View on Google Maps
                          </a>
                          <p onClick={(e) => handleNavigationClick(e, location.collision_id)} style={{ cursor: 'pointer', color: '#1A73E8', textDecoration: 'underline' }}>View Accident Details</p>
                        </div>
                      </InfoWindow>
                    )}
                  </AdvancedMarker>
                );
              })}
            </Map>
          ) : (
            <Map
              defaultCenter={center}
              defaultZoom={15}
              mapId={GOOGLE_MAP_ID}
              onLoad={(map) => { mapRef.current = map; }}
              onClick={handleMapClick}
            >
              {locations.map((location, index) => {
                const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
                return (
                  <AdvancedMarker key={index} position={{ lat: location.lat, lng: location.lng }} onClick={() => setOpen(index)}>
                    <Pin
                      background={"red"}
                      borderColor={"gray"}
                      glyphColor={"white"}
                    />
                    {open === index && (
                      <InfoWindow position={{ lat: location.lat, lng: location.lng }} onCloseClick={() => setOpen(null)}>
                        <div>
                          <p>Crash Date: {formatCrashDate(location.crash_date)}</p>
                          <p>Crash Time: {location.crash_time}</p>
                          <a href={googleMapsUrl} target="_blank" style={{ color: '#1A73E8', textDecoration: 'underline' }}>
                            View on Google Maps
                          </a>
                          <p onClick={(e) => handleNavigationClick(e, location.collision_id)} style={{ cursor: 'pointer', color: '#1A73E8', textDecoration: 'underline' }}>View Accident Details</p>
                        </div>
                      </InfoWindow>
                    )}
                  </AdvancedMarker>
                );
              })}
            </Map>
          )}
        </div>
      </APIProvider>
    </div>
  );
}

export default IndexMap;
