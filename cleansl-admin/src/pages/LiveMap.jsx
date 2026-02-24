import React from 'react';
import Map from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MOCK_TRUCKS } from '../data/mockData';

const LiveMap = () => {
  return (
    <div className="h-full w-full rounded-xl overflow-hidden border border-slate-200">
      <Map
        initialViewState={{
          longitude: 79.8612, // Colombo Longitude
          latitude: 6.9271,   // Colombo Latitude
          zoom: 12
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken="YOUR_MAPBOX_TOKEN_HERE"
      >
        {/* We will add Truck Markers here in the next sub-step */}
      </Map>
    </div>
  );
};

export default LiveMap;