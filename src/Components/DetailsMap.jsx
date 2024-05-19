import React from 'react';
import {
  APIProvider, 
  Map, 
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import { formatCrashDate } from '../Helpers/AccidentIndexHelper';

function DetailsMap({GOOGLE_MAPS_TOKEN, GOOGLE_MAP_ID, location, open, setOpen }) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;

  return (
    <div className='w-100'>
      <p className='w-400 rounded-xl bg-black/70 p-3 text-xl text-white' style={{ fontFamily: 'Silkscreen, sans-serif', fontStyle: 'normal' }}>LAST SPOTTED</p> 
      <APIProvider apiKey={GOOGLE_MAPS_TOKEN}> 
        <div style={{ height: "400px", width: "70vw" }}>
          <Map defaultZoom={15} defaultCenter={{ lat: location.lat, lng: location.lng }} mapId={GOOGLE_MAP_ID}>
            <AdvancedMarker position={{ lat: location.lat, lng: location.lng }} onClick={() => setOpen(true)}>
              <Pin
                background={"red"} 
                borderColor={"gray"} 
                glyphColor={"white"}
              />
            </AdvancedMarker>
            {open && (
              <InfoWindow position={{ lat: location.lat, lng: location.lng }} onCloseClick={() => setOpen(false)}>
                <p style={{ fontWeight: 'bold' }}>CRASH SITE</p>
                <p>Crash Date: {formatCrashDate(location.crash_date)}</p>
                <p>Crash Time: {location.crash_time}</p>
                <a href={googleMapsUrl} target="_blank" style={{ color: '#1A73E8', textDecoration: 'underline' }}>View on Google Maps</a>
              </InfoWindow>
            )}
          </Map> 
        </div>
      </APIProvider>
    </div>
  );
}

export default DetailsMap;
