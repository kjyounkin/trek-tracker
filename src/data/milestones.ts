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

// 35 Chapters following Frodo's journey exactly
export const MILESTONES: Milestone[] = [
  // BOOK I
  { id: "b1c1", mile: 0, title: "Bag End", description: "Bilbo's 111th birthday party.", latLng: [72.05, 58.12], region: "The Shire", book: "Book I", chapter: "Chapter 1: A Long-expected Party" },
  { id: "b1c2", mile: 5, title: "The Shadow of the Past", description: "Gandalf reveals the truth of the Ring.", latLng: [71.86, 58.29], region: "The Shire", book: "Book I", chapter: "Chapter 2: The Shadow of the Past" },
  { id: "b1c3", mile: 18, title: "Three is Company", description: "Frodo, Sam, and Pippin set out and dodge a Black Rider.", latLng: [71.57, 58.98], region: "The Shire", book: "Book I", chapter: "Chapter 3: Three is Company" },
  { id: "b1c4", mile: 30, title: "A Shortcut to Mushrooms", description: "Meeting Farmer Maggot.", latLng: [71.28, 59.83], region: "The Shire", book: "Book I", chapter: "Chapter 4: A Shortcut to Mushrooms" },
  { id: "b1c5", mile: 40, title: "Crickhollow", description: "Merry reveals they know about the Ring.", latLng: [71.09, 61.11], region: "Buckland", book: "Book I", chapter: "Chapter 5: A Conspiracy Unmasked" },
  { id: "b1c6", mile: 55, title: "The Old Forest", description: "Trapped by Old Man Willow.", latLng: [70.61, 62.40], region: "The Old Forest", book: "Book I", chapter: "Chapter 6: The Old Forest" },
  { id: "b1c7", mile: 65, title: "House of Tom Bombadil", description: "Resting with Tom and Goldberry.", latLng: [70.33, 63.68], region: "The Old Forest", book: "Book I", chapter: "Chapter 7: In the House of Tom Bombadil" },
  { id: "b1c8", mile: 85, title: "The Barrow-downs", description: "Captured by a Barrow-wight.", latLng: [69.66, 65.82], region: "Barrow-downs", book: "Book I", chapter: "Chapter 8: Fog on the Barrow-downs" },
  { id: "b1c9", mile: 135, title: "The Prancing Pony", description: "Meeting Strider.", latLng: [69.18, 69.24], region: "Bree", book: "Book I", chapter: "Chapter 9: At the Sign of the Prancing Pony" },
  { id: "b1c10", mile: 136, title: "Strider's Offer", description: "Aragorn offers his guidance.", latLng: [69.18, 69.32], region: "Bree", book: "Book I", chapter: "Chapter 10: Strider" },
  { id: "b1c11", mile: 210, title: "Weathertop", description: "Frodo is stabbed by the Witch-king.", latLng: [68.22, 76.93], region: "Eriador", book: "Book I", chapter: "Chapter 11: A Knife in the Dark" },
  { id: "b1c12", mile: 450, title: "Ford of Bruinen", description: "Glorfindel and the flood defeat the Nazgûl.", latLng: [70.14, 88.91], region: "Rivendell Valley", book: "Book I", chapter: "Chapter 12: Flight to the Ford" },

  // BOOK II
  { id: "b2c1", mile: 460, title: "Rivendell", description: "Frodo heals and reunites with Bilbo.", latLng: [70.14, 89.76], region: "Rivendell", book: "Book II", chapter: "Chapter 1: Many Meetings" },
  { id: "b2c2", mile: 461, title: "Council of Elrond", description: "The Fellowship is formed.", latLng: [70.14, 89.85], region: "Rivendell", book: "Book II", chapter: "Chapter 2: The Council of Elrond" },
  { id: "b2c3", mile: 600, title: "Caradhras", description: "The Fellowship is defeated by snow.", latLng: [64.40, 88.05], region: "Misty Mountains", book: "Book II", chapter: "Chapter 3: The Ring Goes South" },
  { id: "b2c4", mile: 745, title: "West-gate", description: "Speak friend and enter.", latLng: [61.53, 88.91], region: "Moria", book: "Book II", chapter: "Chapter 4: A Journey in the Dark" },
  { id: "b2c5", mile: 785, title: "Bridge of Khazad-dûm", description: "Gandalf falls with the Balrog.", latLng: [59.61, 91.47], region: "Moria", book: "Book II", chapter: "Chapter 5: The Bridge of Khazad-dûm" },
  { id: "b2c6", mile: 820, title: "Nimrodel", description: "Entering the golden wood.", latLng: [58.66, 93.18], region: "Lothlórien", book: "Book II", chapter: "Chapter 6: Lothlórien" },
  { id: "b2c7", mile: 860, title: "Caras Galadhon", description: "Galadriel's test and the Mirror.", latLng: [56.74, 94.89], region: "Lothlórien", book: "Book II", chapter: "Chapter 7: The Mirror of Galadriel" },
  { id: "b2c8", mile: 865, title: "Leaving Lórien", description: "Gifts from the Elves.", latLng: [56.26, 94.89], region: "Lothlórien", book: "Book II", chapter: "Chapter 8: Farewell to Lórien" },
  { id: "b2c9", mile: 1100, title: "The Great River", description: "Paddling down the Anduin.", latLng: [46.22, 95.32], region: "Anduin", book: "Book II", chapter: "Chapter 9: The Great River" },
  { id: "b2c10", mile: 1250, title: "Amon Hen", description: "Boromir's madness and the Fellowship breaks.", latLng: [39.52, 96.60], region: "Rohan / Emyn Muil", book: "Book II", chapter: "Chapter 10: The Breaking of the Fellowship" },

  // BOOK IV
  { id: "b4c1", mile: 1280, title: "Emyn Muil", description: "Gollum is captured and tamed.", latLng: [39.52, 99.17], region: "Emyn Muil", book: "Book IV", chapter: "Chapter 1: The Taming of Sméagol" },
  { id: "b4c2", mile: 1380, title: "The Dead Marshes", description: "Don't follow the lights.", latLng: [39.52, 107.72], region: "Dead Marshes", book: "Book IV", chapter: "Chapter 2: The Passage of the Marshes" },
  { id: "b4c3", mile: 1450, title: "The Black Gate", description: "The Morannon is closed.", latLng: [39.52, 113.71], region: "Mordor Border", book: "Book IV", chapter: "Chapter 3: The Black Gate is Closed" },
  { id: "b4c4", mile: 1480, title: "Ithilien", description: "Sam cooks stewed rabbit.", latLng: [36.65, 112.43], region: "Ithilien", book: "Book IV", chapter: "Chapter 4: Of Herbs and Stewed Rabbit" },
  { id: "b4c5", mile: 1500, title: "Henneth Annûn", description: "Meeting Faramir.", latLng: [34.74, 112.00], region: "Ithilien", book: "Book IV", chapter: "Chapter 5: The Window on the West" },
  { id: "b4c6", mile: 1505, title: "The Forbidden Pool", description: "Gollum's life is spared.", latLng: [34.55, 112.00], region: "Ithilien", book: "Book IV", chapter: "Chapter 6: The Forbidden Pool" },
  { id: "b4c7", mile: 1550, title: "Cross-roads", description: "The fallen king's statue.", latLng: [29.95, 111.57], region: "Ithilien", book: "Book IV", chapter: "Chapter 7: Journey to the Cross-roads" },
  { id: "b4c8", mile: 1570, title: "Minas Morgul", description: "Climbing the steep stairs.", latLng: [28.04, 112.00], region: "Ephel Dúath", book: "Book IV", chapter: "Chapter 8: The Stairs of Cirith Ungol" },
  { id: "b4c9", mile: 1585, title: "Shelob's Lair", description: "Frodo is poisoned.", latLng: [27.56, 112.85], region: "Ephel Dúath", book: "Book IV", chapter: "Chapter 9: Shelob's Lair" },
  { id: "b4c10", mile: 1590, title: "Sam's Choice", description: "Sam takes the Ring.", latLng: [27.27, 113.28], region: "Ephel Dúath", book: "Book IV", chapter: "Chapter 10: The Choices of Master Samwise" },

  // BOOK VI
  { id: "b6c1", mile: 1620, title: "Tower of Cirith Ungol", description: "Sam rescues Frodo.", latLng: [27.08, 114.56], region: "Mordor", book: "Book VI", chapter: "Chapter 1: The Tower of Cirith Ungol" },
  { id: "b6c2", mile: 1710, title: "The Land of Shadow", description: "Marching in disguise.", latLng: [29.00, 117.98], region: "Mordor", book: "Book VI", chapter: "Chapter 2: The Land of Shadow" },
  { id: "b6c3", mile: 1800, title: "Mount Doom", description: "The Ring is destroyed.", latLng: [30.91, 120.55], region: "Mordor", book: "Book VI", chapter: "Chapter 3: Mount Doom" }
];

export const WAYPOINTS: { mile: number, latLng: [number, number] }[] = [
  { mile: 0, latLng: [72.05, 58.12] },
  { mile: 45, latLng: [72.05, 62.40] },
  { mile: 90, latLng: [71.09, 65.82] },
  { mile: 135, latLng: [69.18, 69.24] },
  { mile: 170, latLng: [69.18, 73.51] },
  { mile: 210, latLng: [68.22, 76.93] },
  { mile: 260, latLng: [68.22, 80.36] },
  { mile: 320, latLng: [68.22, 83.78] },
  { mile: 380, latLng: [69.18, 86.34] },
  { mile: 460, latLng: [70.14, 89.76] },
  { mile: 550, latLng: [66.31, 88.91] },
  { mile: 650, latLng: [63.44, 88.05] },
  { mile: 745, latLng: [61.53, 88.91] },
  { mile: 760, latLng: [60.57, 90.19] },
  { mile: 785, latLng: [59.61, 91.47] },
  { mile: 820, latLng: [58.66, 93.18] },
  { mile: 860, latLng: [56.74, 94.89] },
  { mile: 950, latLng: [51.00, 94.89] },
  { mile: 1050, latLng: [47.17, 95.32] },
  { mile: 1150, latLng: [43.35, 95.75] },
  { mile: 1250, latLng: [39.52, 96.60] },
  { mile: 1300, latLng: [39.52, 100.88] },
  { mile: 1340, latLng: [40.48, 104.30] },
  { mile: 1380, latLng: [39.52, 107.72] },
  { mile: 1420, latLng: [40.48, 111.14] },
  { mile: 1450, latLng: [39.52, 113.71] },
  { mile: 1490, latLng: [35.69, 112.00] },
  { mile: 1530, latLng: [31.87, 111.14] },
  { mile: 1570, latLng: [28.04, 112.00] },
  { mile: 1590, latLng: [27.08, 113.28] },
  { mile: 1620, latLng: [27.08, 114.56] },
  { mile: 1680, latLng: [28.04, 117.13] },
  { mile: 1740, latLng: [29.95, 118.84] },
  { mile: 1800, latLng: [30.91, 120.55] }
];

export const TOTAL_MILES = 1800;
