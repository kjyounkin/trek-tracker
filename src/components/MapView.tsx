import React, { useMemo } from 'react';
import { MapContainer, ImageOverlay, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useJourney } from '../hooks/useJourney';
import { MILESTONES, WAYPOINTS, TOTAL_MILES } from '../data/milestones';

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

// Map bounds based on the 13334x10000 aspect ratio of the new SVG map
const MAP_BOUNDS: L.LatLngBoundsExpression = [[0, 0], [100, 133.34]];

// Component to handle auto-panning to current location
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);
  return null;
}

export function MapView() {
  const { totalMiles } = useJourney();

  // Calculate current position exactly along the waypoints
  const currentPos = useMemo(() => {
    if (totalMiles >= TOTAL_MILES) return WAYPOINTS[WAYPOINTS.length - 1].latLng;
    if (totalMiles <= 0) return WAYPOINTS[0].latLng;

    for (let i = 0; i < WAYPOINTS.length - 1; i++) {
      const current = WAYPOINTS[i];
      const next = WAYPOINTS[i + 1];
      
      if (totalMiles >= current.mile && totalMiles < next.mile) {
        const segmentProgress = (totalMiles - current.mile) / (next.mile - current.mile);
        const lat = current.latLng[0] + (next.latLng[0] - current.latLng[0]) * segmentProgress;
        const lng = current.latLng[1] + (next.latLng[1] - current.latLng[1]) * segmentProgress;
        return [lat, lng] as [number, number];
      }
    }
    return WAYPOINTS[0].latLng;
  }, [totalMiles]);

  // Generate the coordinates for the completed path
  const completedPathCoordinates = useMemo(() => {
    const coords: [number, number][] = [];
    for (let i = 0; i < WAYPOINTS.length; i++) {
      if (WAYPOINTS[i].mile <= totalMiles) {
        coords.push(WAYPOINTS[i].latLng);
      } else {
        break;
      }
    }
    // Add current position to make the line continuous to exactly where they are
    if (totalMiles > 0 && totalMiles < TOTAL_MILES) {
      coords.push(currentPos);
    }
    return coords;
  }, [totalMiles, currentPos]);

  const allPathCoordinates = WAYPOINTS.map(w => w.latLng);

  return (
    <div className="w-full h-[calc(100vh-120px)] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative">
      <MapContainer 
        crs={L.CRS.Simple}
        bounds={MAP_BOUNDS} 
        style={{ height: '100%', width: '100%' }}
        minZoom={-1}
        maxZoom={3}
        zoom={0}
      >
        <MapController center={currentPos} />
        <ImageOverlay
          url="/middle-earth-map.svg"
          bounds={MAP_BOUNDS}
        />
        
        {/* Draw the full path (faded background line) */}
        <Polyline 
          positions={allPathCoordinates} 
          pathOptions={{ color: 'rgba(0, 0, 0, 0.2)', weight: 3, dashArray: '5, 10' }} 
        />
        
        {/* Draw the completed path (solid green line) */}
        <Polyline 
          positions={completedPathCoordinates} 
          pathOptions={{ color: '#10b981', weight: 4 }} 
        />
        
        {/* Draw major milestones */}
        {MILESTONES.map((milestone) => (
          <Marker 
            key={milestone.id} 
            position={milestone.latLng}
            icon={new L.Icon({
              iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
              iconSize: [15, 25],
              iconAnchor: [7, 25],
              className: totalMiles >= milestone.mile ? 'opacity-100' : 'opacity-40 grayscale'
            })}
          >
            <Popup>
              <div className="font-sans">
                <strong className="text-sm">{milestone.title}</strong><br />
                <span className="text-xs text-slate-500 uppercase tracking-wider">{milestone.region}</span><br />
                <span className="text-xs text-slate-400 block mt-1 pb-1 border-b border-slate-100">Mile: {milestone.mile}</span>
                <p className="text-xs mt-2">{milestone.description}</p>
                <em className="text-[10px] text-slate-400 block mt-2">{milestone.chapter}</em>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Current position marker */}
        <Marker position={currentPos} icon={customIcon} zIndexOffset={1000}>
          <Popup>
            <div className="font-sans">
              <strong className="text-emerald-700">Your Location</strong><br />
              <span className="text-sm font-medium">Total Miles: {totalMiles.toFixed(1)}</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
