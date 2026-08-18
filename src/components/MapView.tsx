import React, { useMemo } from 'react';
import { MapContainer, ImageOverlay, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useJourney } from '../hooks/useJourney';
import { MILESTONES, TOTAL_MILES } from '../data/milestones';

// Fix Leaflet's default icon path issues in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MAP_BOUNDS: L.LatLngBoundsExpression = [[0, 0], [100, 100]];

// Component to handle auto-panning to current location
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export function MapView() {
  const { totalMiles } = useJourney();

  // Calculate current position
  const currentPos = useMemo(() => {
    if (totalMiles >= TOTAL_MILES) return MILESTONES[MILESTONES.length - 1].latLng;
    if (totalMiles <= 0) return MILESTONES[0].latLng;

    for (let i = 0; i < MILESTONES.length - 1; i++) {
      const current = MILESTONES[i];
      const next = MILESTONES[i + 1];
      
      if (totalMiles >= current.mile && totalMiles < next.mile) {
        // We are between current and next
        const segmentProgress = (totalMiles - current.mile) / (next.mile - current.mile);
        const lat = current.latLng[0] + (next.latLng[0] - current.latLng[0]) * segmentProgress;
        const lng = current.latLng[1] + (next.latLng[1] - current.latLng[1]) * segmentProgress;
        return [lat, lng] as [number, number];
      }
    }
    return MILESTONES[0].latLng;
  }, [totalMiles]);

  const pathCoordinates = MILESTONES.map(m => m.latLng);

  return (
    <div className="w-full h-[calc(100vh-120px)] bg-slate-900 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative">
      <MapContainer 
        crs={L.CRS.Simple}
        bounds={MAP_BOUNDS} 
        style={{ height: '100%', width: '100%' }}
        minZoom={-1}
        maxZoom={2}
        zoom={0}
      >
        <MapController center={currentPos} />
        <ImageOverlay
          url="/middle-earth-map.jpg"
          bounds={MAP_BOUNDS}
        />
        
        {/* Draw the full path */}
        <Polyline 
          positions={pathCoordinates} 
          pathOptions={{ color: 'rgba(255, 255, 255, 0.4)', weight: 3, dashArray: '5, 10' }} 
        />
        
        {/* Draw the completed path */}
        <Polyline 
          positions={pathCoordinates.filter((_, i) => MILESTONES[i].mile <= totalMiles)} 
          pathOptions={{ color: '#10b981', weight: 4 }} 
        />
        
        {/* Draw milestones */}
        {MILESTONES.map((milestone) => (
          <Marker 
            key={milestone.id} 
            position={milestone.latLng}
            icon={new L.Icon({
              iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
              iconSize: [15, 25],
              iconAnchor: [7, 25]
            })}
            opacity={totalMiles >= milestone.mile ? 1 : 0.5}
          >
            <Popup>
              <strong>{milestone.title}</strong><br />
              Mile: {milestone.mile}<br />
              {milestone.description}
            </Popup>
          </Marker>
        ))}

        {/* Current position marker */}
        <Marker position={currentPos} icon={customIcon} zIndexOffset={1000}>
          <Popup>
            <strong>Your Location</strong><br />
            Total Miles: {totalMiles.toFixed(1)}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
