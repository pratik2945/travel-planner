import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box } from '@mui/material';
import { Destination } from '../types';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface RouteMapProps {
  destinations: Destination[];
}

const RouteMap: React.FC<RouteMapProps> = ({ destinations }) => {
  const center: [number, number] = destinations.length > 0 
    ? [destinations[0].latitude, destinations[0].longitude]
    : [51.505, -0.09]; // Default to London

  const positions = destinations.map(dest => [dest.latitude, dest.longitude] as [number, number]);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <MapContainer 
        center={center} 
        zoom={13} 
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {destinations.map((destination) => (
          <Marker 
            key={destination.id}
            position={[destination.latitude, destination.longitude]}
          >
            <Popup>
              <strong>{destination.name}</strong>
              <br />
              {destination.address}
            </Popup>
          </Marker>
        ))}

        {positions.length > 1 && (
          <Polyline 
            positions={positions}
            color="#1976d2"
            weight={3}
            opacity={0.7}
          />
        )}
      </MapContainer>
    </Box>
  );
};

export default RouteMap; 