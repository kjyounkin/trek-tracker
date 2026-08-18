import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
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

// Map bounds based on the 10000x5455 aspect ratio of the 10K Reddit map
const MAP_BOUNDS: L.LatLngBoundsExpression = [[0, 0], [100, 183.32]];

// Component to handle auto-panning to current location
function MapController({ center, disableAutoPan }: { center: [number, number], disableAutoPan: boolean }) {
  const map = useMap();
  React.useEffect(() => {
    if (!disableAutoPan) {
      map.setView(center, map.getZoom(), { animate: true });
    }
  }, [center, map, disableAutoPan]);
  return null;
}

// Component to handle calibration clicks
function CalibrationEvents({ enabled }: { enabled: boolean }) {
  useMapEvents({
    click(e) {
      if (enabled) {
        const lat = parseFloat(e.latlng.lat.toFixed(2));
        const lng = parseFloat(e.latlng.lng.toFixed(2));
        const coords = `[${lat}, ${lng}]`;
        navigator.clipboard.writeText(coords).then(() => {
          alert(`Copied to clipboard: ${coords}`);
        }).catch(() => {
          alert(`Coordinates: ${coords}`);
        });
        console.log(`latLng: [${lat}, ${lng}]`);
      }
    },
  });
  return null;
}

export function MapView() {
  const { totalMiles } = useJourney();
  const [calibrationMode, setCalibrationMode] = useState(false);

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
    <div className="relative w-full h-[calc(100vh-120px)] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
      
      {/* Calibration Mode Toggle */}
      <div className="absolute top-4 right-4 z-[1000] bg-white p-2 rounded-lg shadow-md border border-slate-200">
        <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
          <input 
            type="checkbox" 
            checked={calibrationMode} 
            onChange={(e) => setCalibrationMode(e.target.checked)}
            className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
          />
          Calibration Mode
        </label>
        {calibrationMode && (
          <p className="text-xs text-slate-500 mt-1 max-w-[150px]">
            Click anywhere on the map to copy its coordinates.
          </p>
        )}
      </div>

      <MapContainer 
        crs={L.CRS.Simple}
        bounds={MAP_BOUNDS} 
        style={{ height: '100%', width: '100%' }}
        minZoom={-1}
        maxZoom={4}
        zoom={1}
      >
        <MapController center={currentPos} disableAutoPan={calibrationMode} />
        <CalibrationEvents enabled={calibrationMode} />
        <TileLayer
          url="/tiles/{z}/{x}/{y}.jpg"
          noWrap={true}
          bounds={MAP_BOUNDS}
          maxNativeZoom={6}
          minZoom={2}
          maxZoom={7}
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
              <div className="font-sans min-w-[200px]">
                <strong className="text-sm">{milestone.title}</strong><br />
                <span className="text-xs text-emerald-700 font-semibold uppercase tracking-wider">{milestone.region}</span><br />
                <span className="text-xs text-slate-400 block mt-1 pb-1 border-b border-slate-100">Mile: {milestone.mile}</span>
                <p className="text-sm mt-2 leading-relaxed text-slate-600">{milestone.description}</p>
                <em className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mt-2">{milestone.book} &bull; {milestone.chapter.split(': ')[0]}</em>
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
