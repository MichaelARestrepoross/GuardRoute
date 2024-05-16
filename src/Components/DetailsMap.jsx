import React from 'react';
import {
  APIProvider, 
  Map, 
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';

function SquirrelMap({GOOGLE_MAPS_TOKEN, GOOGLE_MAP_ID, position, open, setOpen, squirrelName}) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${position.lat},${position.lng}`;

  return (
    <div className='w-100'>
      <p className='w-400 rounded-xl bg-black/70 p-3 text-xl text-white' style={{ fontFamily: 'Silkscreen, sans-serif', fontStyle: 'normal' }}>LAST SPOTTED</p> 
      <APIProvider apiKey={GOOGLE_MAPS_TOKEN}> 
        <div style={{ height: "400px", width: "70vw" }}>
          <Map defaultZoom={15} defaultCenter={position} mapId={GOOGLE_MAP_ID}>
            <AdvancedMarker position={position} onClick={() => setOpen(true)}>
              <Pin
                background={"red"} 
                borderColor={"gray"} 
                glyphColor={"white"}
              />
            </AdvancedMarker>
            {open && (
              <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                <p style={{ fontWeight: 'bold' }}>{squirrelName}'s Last Sighting</p>
                <p>Lat: {position.lat}</p>
                <p>Lng: {position.lng}</p>
                <a href={googleMapsUrl} target="_blank" style={{ color: '#1A73E8', textDecoration: 'underline' }}>View on Google Maps</a>
              </InfoWindow>
            )}
          </Map> 
        </div>
      </APIProvider>
    </div>
  );
}

export default SquirrelMap;
