export interface Milestone {
  id: string;
  mile: number;
  title: string;
  description: string;
  latLng: [number, number];
}

// Map coordinates for lotrproject.com are approximately:
// x: longitude, y: latitude (usually negative for South)
// Hobbiton: ~ (-1315, 1500) based on URL `lat=-1315.5&lon=1500`
// This coordinate system isn't standard lat/lng, so we'll approximate map positions on a scale of 0 to 1 for x and y,
// then map them to the image overlay bounds.

export const MILESTONES: Milestone[] = [
  {
    id: "shire",
    mile: 0,
    title: "The Shire",
    description: "Frodo and Sam depart from Bag End.",
    latLng: [80, 25],
  },
  {
    id: "bree",
    mile: 135,
    title: "Bree",
    description: "Meeting Strider at The Prancing Pony.",
    latLng: [75, 30],
  },
  {
    id: "weathertop",
    mile: 210,
    title: "Weathertop",
    description: "Frodo is stabbed by the Witch-king.",
    latLng: [72, 35],
  },
  {
    id: "rivendell",
    mile: 460,
    title: "Rivendell",
    description: "The Council of Elrond and formation of the Fellowship.",
    latLng: [70, 45],
  },
  {
    id: "moria_gate",
    mile: 745,
    title: "West-gate of Moria",
    description: "Speak friend and enter.",
    latLng: [60, 48],
  },
  {
    id: "moria_bridge",
    mile: 785,
    title: "Bridge of Khazad-dûm",
    description: "Gandalf faces the Balrog.",
    latLng: [58, 49],
  },
  {
    id: "lothlorien",
    mile: 860,
    title: "Lothlórien",
    description: "Meeting Galadriel and Celeborn.",
    latLng: [55, 50],
  },
  {
    id: "amon_hen",
    mile: 1250,
    title: "Amon Hen",
    description: "The breaking of the Fellowship.",
    latLng: [45, 55],
  },
  {
    id: "dead_marshes",
    mile: 1380,
    title: "The Dead Marshes",
    description: "Don't follow the lights.",
    latLng: [40, 65],
  },
  {
    id: "black_gate",
    mile: 1450,
    title: "The Black Gate",
    description: "The Morannon is closed.",
    latLng: [38, 70],
  },
  {
    id: "minas_morgul",
    mile: 1570,
    title: "Minas Morgul",
    description: "The Stairs of Cirith Ungol.",
    latLng: [30, 72],
  },
  {
    id: "cirith_ungol",
    mile: 1620,
    title: "Tower of Cirith Ungol",
    description: "Sam rescues Frodo.",
    latLng: [28, 75],
  },
  {
    id: "mount_doom",
    mile: 1800,
    title: "Mount Doom",
    description: "The Ring is destroyed.",
    latLng: [25, 80],
  }
];

export const TOTAL_MILES = 1800;
