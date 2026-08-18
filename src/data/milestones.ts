export interface Milestone {
  id: string;
  mile: number;
  title: string;
  description: string;
  latLng: [number, number];
  region: string;
  book: string;
  chapter: string;
}

export const MILESTONES: Milestone[] = [
  {
    id: "shire",
    mile: 0,
    title: "Bag End",
    description: "Frodo and Sam depart from the Shire.",
    latLng: [75, 30],
    region: "Eriador",
    book: "The Fellowship of the Ring",
    chapter: "Book I, Chapter 3: Three is Company"
  },
  {
    id: "bree",
    mile: 135,
    title: "Bree",
    description: "Meeting Strider at The Prancing Pony.",
    latLng: [72, 43],
    region: "Eriador",
    book: "The Fellowship of the Ring",
    chapter: "Book I, Chapter 9: At the Sign of the Prancing Pony"
  },
  {
    id: "weathertop",
    mile: 210,
    title: "Weathertop",
    description: "Frodo is stabbed by the Witch-king.",
    latLng: [71, 52],
    region: "Eriador",
    book: "The Fellowship of the Ring",
    chapter: "Book I, Chapter 11: A Knife in the Dark"
  },
  {
    id: "rivendell",
    mile: 460,
    title: "Rivendell",
    description: "The Council of Elrond and formation of the Fellowship.",
    latLng: [73, 67],
    region: "Eriador",
    book: "The Fellowship of the Ring",
    chapter: "Book II, Chapter 2: The Council of Elrond"
  },
  {
    id: "moria_gate",
    mile: 745,
    title: "West-gate of Moria",
    description: "Speak friend and enter.",
    latLng: [64, 66],
    region: "Rhovanion",
    book: "The Fellowship of the Ring",
    chapter: "Book II, Chapter 4: A Journey in the Dark"
  },
  {
    id: "moria_bridge",
    mile: 785,
    title: "Bridge of Khazad-dûm",
    description: "Gandalf faces the Balrog.",
    latLng: [62, 69],
    region: "Rhovanion",
    book: "The Fellowship of the Ring",
    chapter: "Book II, Chapter 5: The Bridge of Khazad-dûm"
  },
  {
    id: "lothlorien",
    mile: 860,
    title: "Lothlórien",
    description: "Meeting Galadriel and Celeborn.",
    latLng: [59, 73],
    region: "Rhovanion",
    book: "The Fellowship of the Ring",
    chapter: "Book II, Chapter 7: The Mirror of Galadriel"
  },
  {
    id: "amon_hen",
    mile: 1250,
    title: "Amon Hen",
    description: "The breaking of the Fellowship.",
    latLng: [41, 75],
    region: "Rohan",
    book: "The Fellowship of the Ring",
    chapter: "Book II, Chapter 10: The Breaking of the Fellowship"
  },
  {
    id: "dead_marshes",
    mile: 1380,
    title: "The Dead Marshes",
    description: "Don't follow the lights.",
    latLng: [41, 88],
    region: "Gondor / Mordor border",
    book: "The Two Towers",
    chapter: "Book IV, Chapter 2: The Passage of the Marshes"
  },
  {
    id: "black_gate",
    mile: 1450,
    title: "The Black Gate",
    description: "The Morannon is closed.",
    latLng: [41, 95],
    region: "Mordor",
    book: "The Two Towers",
    chapter: "Book IV, Chapter 3: The Black Gate is Closed"
  },
  {
    id: "minas_morgul",
    mile: 1570,
    title: "Minas Morgul",
    description: "The Stairs of Cirith Ungol.",
    latLng: [29, 93],
    region: "Mordor",
    book: "The Two Towers",
    chapter: "Book IV, Chapter 8: The Stairs of Cirith Ungol"
  },
  {
    id: "cirith_ungol",
    mile: 1620,
    title: "Tower of Cirith Ungol",
    description: "Sam rescues Frodo.",
    latLng: [28, 96],
    region: "Mordor",
    book: "The Return of the King",
    chapter: "Book VI, Chapter 1: The Tower of Cirith Ungol"
  },
  {
    id: "mount_doom",
    mile: 1800,
    title: "Mount Doom",
    description: "The Ring is destroyed.",
    latLng: [32, 103],
    region: "Mordor",
    book: "The Return of the King",
    chapter: "Book VI, Chapter 3: Mount Doom"
  }
];

// Waypoints define the actual path the line takes (curves, roads, rivers).
// The first element is mile, the second is latLng.
export const WAYPOINTS: { mile: number, latLng: [number, number] }[] = [
  // Shire to Bree
  { mile: 0, latLng: [75, 30] },
  { mile: 45, latLng: [75, 35] },
  { mile: 90, latLng: [74, 39] },
  { mile: 135, latLng: [72, 43] }, // Bree
  
  // Bree to Weathertop
  { mile: 170, latLng: [72, 48] },
  { mile: 210, latLng: [71, 52] }, // Weathertop
  
  // Weathertop to Rivendell
  { mile: 260, latLng: [71, 56] },
  { mile: 320, latLng: [71, 60] },
  { mile: 380, latLng: [72, 63] },
  { mile: 460, latLng: [73, 67] }, // Rivendell
  
  // Rivendell to Moria (Going South along Misty Mountains)
  { mile: 550, latLng: [69, 66] },
  { mile: 650, latLng: [66, 65] },
  { mile: 745, latLng: [64, 66] }, // Moria Gate
  
  // Through Moria
  { mile: 760, latLng: [63, 67.5] },
  { mile: 785, latLng: [62, 69] }, // Moria Bridge
  
  // To Lothlorien
  { mile: 820, latLng: [61, 71] },
  { mile: 860, latLng: [59, 73] }, // Lothlorien
  
  // Down the Anduin River
  { mile: 950, latLng: [53, 73] },
  { mile: 1050, latLng: [49, 73.5] },
  { mile: 1150, latLng: [45, 74] },
  { mile: 1250, latLng: [41, 75] }, // Amon Hen
  
  // East towards Dead Marshes
  { mile: 1300, latLng: [41, 80] },
  { mile: 1340, latLng: [42, 84] },
  { mile: 1380, latLng: [41, 88] }, // Dead Marshes
  
  // North towards Black Gate
  { mile: 1420, latLng: [42, 92] },
  { mile: 1450, latLng: [41, 95] }, // Black Gate
  
  // South through Ithilien
  { mile: 1490, latLng: [37, 93] },
  { mile: 1530, latLng: [33, 92] },
  { mile: 1570, latLng: [29, 93] }, // Minas Morgul
  
  // Up into Mordor
  { mile: 1590, latLng: [28, 94.5] },
  { mile: 1620, latLng: [28, 96] }, // Cirith Ungol
  
  // To Mount Doom
  { mile: 1680, latLng: [29, 99] },
  { mile: 1740, latLng: [31, 101] },
  { mile: 1800, latLng: [32, 103] }  // Mount Doom
];

export const TOTAL_MILES = 1800;
