import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons not showing up in React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const truckLocations = [
  { id: 1, name: "Truck T-05", lat: 6.9271, lng: 79.8612, status: "Moving" },
  { id: 2, name: "Truck T-08", lat: 6.9067, lng: 79.8707, status: "Stationary" }
];

export default function LiveMap() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 h-[600px] w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800 text-lg">Live Fleet Tracking</h3>
        <span className="flex items-center gap-2 text-sm text-green-600 font-medium">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          8 Trucks Online
        </span>
      </div>
      
      <MapContainer center={[6.9271, 79.8612]} zoom={13} style={{ height: '90%', width: '100%', borderRadius: '12px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {truckLocations.map(truck => (
          <Marker key={truck.id} position={[truck.lat, truck.lng]}>
            <Popup>
              <div className="font-sans">
                <p className="font-bold">{truck.name}</p>
                <p className="text-xs text-gray-500">Status: {truck.status}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}