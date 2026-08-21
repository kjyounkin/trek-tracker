const fs = require('fs');

// The 8 anchors provided by user (Lat, Lng)
const anchors = [
  { mile: 0, latLng: [-72.57, 55.67] }, // Hobbiton
  { mile: 135, latLng: [-72.89, 67.16] }, // Bree
  { mile: 458, latLng: [-71.54, 94.34] }, // Rivendell
  { mile: 680, latLng: [-87.54, 90.22] }, // Gates of Moria
  { mile: 850, latLng: [-94.14, 104.09] }, // Leaving Lothlorien
  { mile: 1150, latLng: [-116.98, 123.47] }, // Dead Marshes
  { mile: 1570, latLng: [-130.17, 128.4] }, // Minas Morgul
  { mile: 1800, latLng: [-126.26, 135.9] } // Mount doom
];

// Load original LotrProject points (which are [Lng, Lat])
const d = JSON.parse(fs.readFileSync('path.json', 'utf8'));
const rawCoords = d.features[0].geometry.coordinates;

// Convert to [Lat, Lng] for consistency, dividing by 16 because of LotrProject's map scale
const lotrPoints = rawCoords.map(c => [c[1]/16, c[0]/16]);

// Calculate cumulative distances for LotrProject points
let lotrDists = [0];
let totalLotrDist = 0;
for (let i = 1; i < lotrPoints.length; i++) {
  const prev = lotrPoints[i-1];
  const curr = lotrPoints[i];
  const dist = Math.sqrt(Math.pow(curr[0]-prev[0], 2) + Math.pow(curr[1]-prev[1], 2));
  totalLotrDist += dist;
  lotrDists.push(totalLotrDist);
}

// Map each lotrPoint to a "mile" from 0 to 1800
const lotrMiles = lotrDists.map(d => (d / totalLotrDist) * 1800);

function getAnchorSegment(mile) {
  for (let i = 0; i < anchors.length - 1; i++) {
    if (mile >= anchors[i].mile && mile <= anchors[i+1].mile) {
      return { start: anchors[i], end: anchors[i+1] };
    }
  }
  return { start: anchors[anchors.length-2], end: anchors[anchors.length-1] };
}

// Function to find exact LotrProject point at a specific mile
function getLotrPointAtMile(mile) {
  if (mile <= 0) return lotrPoints[0];
  if (mile >= 1800) return lotrPoints[lotrPoints.length-1];
  
  for (let i = 0; i < lotrMiles.length - 1; i++) {
    if (mile >= lotrMiles[i] && mile <= lotrMiles[i+1]) {
      const frac = (mile - lotrMiles[i]) / (lotrMiles[i+1] - lotrMiles[i]);
      const p1 = lotrPoints[i];
      const p2 = lotrPoints[i+1];
      return [
        p1[0] + (p2[0] - p1[0]) * frac,
        p1[1] + (p2[1] - p1[1]) * frac
      ];
    }
  }
  return lotrPoints[lotrPoints.length-1];
}

// Transform a point using 2D similarity transform based on its segment
function transformPoint(p_old, mile) {
  const seg = getAnchorSegment(mile);
  
  const oldA1 = getLotrPointAtMile(seg.start.mile);
  const oldA2 = getLotrPointAtMile(seg.end.mile);
  
  const A1 = seg.start.latLng;
  const A2 = seg.end.latLng;
  
  const v_old = [oldA2[0] - oldA1[0], oldA2[1] - oldA1[1]];
  const v_new = [A2[0] - A1[0], A2[1] - A1[1]];
  
  const len_old = Math.sqrt(v_old[0]*v_old[0] + v_old[1]*v_old[1]);
  const len_new = Math.sqrt(v_new[0]*v_new[0] + v_new[1]*v_new[1]);
  
  const s = len_old === 0 ? 1 : len_new / len_old;
  
  const angle_old = Math.atan2(v_old[0], v_old[1]);
  const angle_new = Math.atan2(v_new[0], v_new[1]);
  const theta = angle_new - angle_old;
  
  const p_rel = [p_old[0] - oldA1[0], p_old[1] - oldA1[1]];
  
  // Rotate p_rel
  const cosT = Math.cos(theta);
  const sinT = Math.sin(theta);
  // Note: standard 2D rotation matrix for [y, x] where x is horizontal, y is vertical
  // p_rel[0] is Lat (Y), p_rel[1] is Lng (X)
  const rx = p_rel[1] * cosT - p_rel[0] * sinT;
  const ry = p_rel[1] * sinT + p_rel[0] * cosT;
  
  return [
    parseFloat((A1[0] + s * ry).toFixed(3)),
    parseFloat((A1[1] + s * rx).toFixed(3))
  ];
}

// 1. Generate new WAYPOINTS
let waypoints = [];
for (let i = 0; i < lotrPoints.length; i++) {
  const mile = lotrMiles[i];
  waypoints.push({
    mile: parseFloat(mile.toFixed(2)),
    latLng: transformPoint(lotrPoints[i], mile)
  });
}

// 2. Read milestones.ts
let milestonesStr = fs.readFileSync('src/data/milestones.ts', 'utf8');

// Replace WAYPOINTS
let newWaypointsStr = 'export const WAYPOINTS: { mile: number, latLng: [number, number] }[] = [\n';
waypoints.forEach((w, i) => {
  newWaypointsStr += '  { mile: ' + w.mile + ', latLng: [' + w.latLng[0] + ', ' + w.latLng[1] + '] }' + (i < waypoints.length - 1 ? ',\n' : '\n');
});
newWaypointsStr += '];';
milestonesStr = milestonesStr.replace(/export const WAYPOINTS.*?\];/s, newWaypointsStr);

// 3. Update all MILESTONES coordinates
// We need to parse the file to extract the `mile` for each milestone, transform the lotrPoint at that mile, and replace it!
milestonesStr = milestonesStr.replace(/\{ id: "[^"]+", mile: ([\d\.]+).*?latLng:\s*\[([\d\.\-]+),\s*([\d\.\-]+)\].*?\}/g, (match, mileStr) => {
  const mile = parseFloat(mileStr);
  const oldP = getLotrPointAtMile(mile);
  const newP = transformPoint(oldP, mile);
  return match.replace(/latLng:\s*\[[\d\.\-]+,\s*[\d\.\-]+\]/, `latLng: [${newP[0]}, ${newP[1]}]`);
});

fs.writeFileSync('src/data/milestones.ts', milestonesStr);
console.log('Successfully recalibrated path and milestones!');
