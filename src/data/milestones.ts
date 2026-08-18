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
  { id: "b1c1", mile: 0, title: "Bag End", description: "Bilbo's 111th birthday party.", latLng: [75, 30], region: "The Shire", book: "Book I", chapter: "Chapter 1: A Long-expected Party" },
  { id: "b1c2", mile: 5, title: "The Shadow of the Past", description: "Gandalf reveals the truth of the Ring.", latLng: [74.8, 30.2], region: "The Shire", book: "Book I", chapter: "Chapter 2: The Shadow of the Past" },
  { id: "b1c3", mile: 18, title: "Three is Company", description: "Frodo, Sam, and Pippin set out and dodge a Black Rider.", latLng: [74.5, 31], region: "The Shire", book: "Book I", chapter: "Chapter 3: Three is Company" },
  { id: "b1c4", mile: 30, title: "A Shortcut to Mushrooms", description: "Meeting Farmer Maggot.", latLng: [74.2, 32], region: "The Shire", book: "Book I", chapter: "Chapter 4: A Shortcut to Mushrooms" },
  { id: "b1c5", mile: 40, title: "Crickhollow", description: "Merry reveals they know about the Ring.", latLng: [74.0, 33.5], region: "Buckland", book: "Book I", chapter: "Chapter 5: A Conspiracy Unmasked" },
  { id: "b1c6", mile: 55, title: "The Old Forest", description: "Trapped by Old Man Willow.", latLng: [73.5, 35], region: "The Old Forest", book: "Book I", chapter: "Chapter 6: The Old Forest" },
  { id: "b1c7", mile: 65, title: "House of Tom Bombadil", description: "Resting with Tom and Goldberry.", latLng: [73.2, 36.5], region: "The Old Forest", book: "Book I", chapter: "Chapter 7: In the House of Tom Bombadil" },
  { id: "b1c8", mile: 85, title: "The Barrow-downs", description: "Captured by a Barrow-wight.", latLng: [72.5, 39], region: "Barrow-downs", book: "Book I", chapter: "Chapter 8: Fog on the Barrow-downs" },
  { id: "b1c9", mile: 135, title: "The Prancing Pony", description: "Meeting Strider.", latLng: [72, 43], region: "Bree", book: "Book I", chapter: "Chapter 9: At the Sign of the Prancing Pony" },
  { id: "b1c10", mile: 136, title: "Strider's Offer", description: "Aragorn offers his guidance.", latLng: [72, 43.1], region: "Bree", book: "Book I", chapter: "Chapter 10: Strider" },
  { id: "b1c11", mile: 210, title: "Weathertop", description: "Frodo is stabbed by the Witch-king.", latLng: [71, 52], region: "Eriador", book: "Book I", chapter: "Chapter 11: A Knife in the Dark" },
  { id: "b1c12", mile: 450, title: "Ford of Bruinen", description: "Glorfindel and the flood defeat the Nazgûl.", latLng: [73, 66], region: "Rivendell Valley", book: "Book I", chapter: "Chapter 12: Flight to the Ford" },

  // BOOK II
  { id: "b2c1", mile: 460, title: "Rivendell", description: "Frodo heals and reunites with Bilbo.", latLng: [73, 67], region: "Rivendell", book: "Book II", chapter: "Chapter 1: Many Meetings" },
  { id: "b2c2", mile: 461, title: "Council of Elrond", description: "The Fellowship is formed.", latLng: [73, 67.1], region: "Rivendell", book: "Book II", chapter: "Chapter 2: The Council of Elrond" },
  { id: "b2c3", mile: 600, title: "Caradhras", description: "The Fellowship is defeated by snow.", latLng: [67, 65], region: "Misty Mountains", book: "Book II", chapter: "Chapter 3: The Ring Goes South" },
  { id: "b2c4", mile: 745, title: "West-gate", description: "Speak friend and enter.", latLng: [64, 66], region: "Moria", book: "Book II", chapter: "Chapter 4: A Journey in the Dark" },
  { id: "b2c5", mile: 785, title: "Bridge of Khazad-dûm", description: "Gandalf falls with the Balrog.", latLng: [62, 69], region: "Moria", book: "Book II", chapter: "Chapter 5: The Bridge of Khazad-dûm" },
  { id: "b2c6", mile: 820, title: "Nimrodel", description: "Entering the golden wood.", latLng: [61, 71], region: "Lothlórien", book: "Book II", chapter: "Chapter 6: Lothlórien" },
  { id: "b2c7", mile: 860, title: "Caras Galadhon", description: "Galadriel's test and the Mirror.", latLng: [59, 73], region: "Lothlórien", book: "Book II", chapter: "Chapter 7: The Mirror of Galadriel" },
  { id: "b2c8", mile: 865, title: "Leaving Lórien", description: "Gifts from the Elves.", latLng: [58.5, 73], region: "Lothlórien", book: "Book II", chapter: "Chapter 8: Farewell to Lórien" },
  { id: "b2c9", mile: 1100, title: "The Great River", description: "Paddling down the Anduin.", latLng: [48, 73.5], region: "Anduin", book: "Book II", chapter: "Chapter 9: The Great River" },
  { id: "b2c10", mile: 1250, title: "Amon Hen", description: "Boromir's madness and the Fellowship breaks.", latLng: [41, 75], region: "Rohan / Emyn Muil", book: "Book II", chapter: "Chapter 10: The Breaking of the Fellowship" },

  // BOOK IV
  { id: "b4c1", mile: 1280, title: "Emyn Muil", description: "Gollum is captured and tamed.", latLng: [41, 78], region: "Emyn Muil", book: "Book IV", chapter: "Chapter 1: The Taming of Sméagol" },
  { id: "b4c2", mile: 1380, title: "The Dead Marshes", description: "Don't follow the lights.", latLng: [41, 88], region: "Dead Marshes", book: "Book IV", chapter: "Chapter 2: The Passage of the Marshes" },
  { id: "b4c3", mile: 1450, title: "The Black Gate", description: "The Morannon is closed.", latLng: [41, 95], region: "Mordor Border", book: "Book IV", chapter: "Chapter 3: The Black Gate is Closed" },
  { id: "b4c4", mile: 1480, title: "Ithilien", description: "Sam cooks stewed rabbit.", latLng: [38, 93.5], region: "Ithilien", book: "Book IV", chapter: "Chapter 4: Of Herbs and Stewed Rabbit" },
  { id: "b4c5", mile: 1500, title: "Henneth Annûn", description: "Meeting Faramir.", latLng: [36, 93], region: "Ithilien", book: "Book IV", chapter: "Chapter 5: The Window on the West" },
  { id: "b4c6", mile: 1505, title: "The Forbidden Pool", description: "Gollum's life is spared.", latLng: [35.8, 93], region: "Ithilien", book: "Book IV", chapter: "Chapter 6: The Forbidden Pool" },
  { id: "b4c7", mile: 1550, title: "Cross-roads", description: "The fallen king's statue.", latLng: [31, 92.5], region: "Ithilien", book: "Book IV", chapter: "Chapter 7: Journey to the Cross-roads" },
  { id: "b4c8", mile: 1570, title: "Minas Morgul", description: "Climbing the steep stairs.", latLng: [29, 93], region: "Ephel Dúath", book: "Book IV", chapter: "Chapter 8: The Stairs of Cirith Ungol" },
  { id: "b4c9", mile: 1585, title: "Shelob's Lair", description: "Frodo is poisoned.", latLng: [28.5, 94], region: "Ephel Dúath", book: "Book IV", chapter: "Chapter 9: Shelob's Lair" },
  { id: "b4c10", mile: 1590, title: "Sam's Choice", description: "Sam takes the Ring.", latLng: [28.2, 94.5], region: "Ephel Dúath", book: "Book IV", chapter: "Chapter 10: The Choices of Master Samwise" },

  // BOOK VI
  { id: "b6c1", mile: 1620, title: "Tower of Cirith Ungol", description: "Sam rescues Frodo.", latLng: [28, 96], region: "Mordor", book: "Book VI", chapter: "Chapter 1: The Tower of Cirith Ungol" },
  { id: "b6c2", mile: 1710, title: "The Land of Shadow", description: "Marching in disguise.", latLng: [30, 100], region: "Mordor", book: "Book VI", chapter: "Chapter 2: The Land of Shadow" },
  { id: "b6c3", mile: 1800, title: "Mount Doom", description: "The Ring is destroyed.", latLng: [32, 103], region: "Mordor", book: "Book VI", chapter: "Chapter 3: Mount Doom" }
];

export const WAYPOINTS: { mile: number, latLng: [number, number] }[] = [
  { mile: 0, latLng: [75, 30] },
  { mile: 45, latLng: [75, 35] },
  { mile: 90, latLng: [74, 39] },
  { mile: 135, latLng: [72, 43] },
  { mile: 170, latLng: [72, 48] },
  { mile: 210, latLng: [71, 52] },
  { mile: 260, latLng: [71, 56] },
  { mile: 320, latLng: [71, 60] },
  { mile: 380, latLng: [72, 63] },
  { mile: 460, latLng: [73, 67] },
  { mile: 550, latLng: [69, 66] },
  { mile: 650, latLng: [66, 65] },
  { mile: 745, latLng: [64, 66] },
  { mile: 760, latLng: [63, 67.5] },
  { mile: 785, latLng: [62, 69] },
  { mile: 820, latLng: [61, 71] },
  { mile: 860, latLng: [59, 73] },
  { mile: 950, latLng: [53, 73] },
  { mile: 1050, latLng: [49, 73.5] },
  { mile: 1150, latLng: [45, 74] },
  { mile: 1250, latLng: [41, 75] },
  { mile: 1300, latLng: [41, 80] },
  { mile: 1340, latLng: [42, 84] },
  { mile: 1380, latLng: [41, 88] },
  { mile: 1420, latLng: [42, 92] },
  { mile: 1450, latLng: [41, 95] },
  { mile: 1490, latLng: [37, 93] },
  { mile: 1530, latLng: [33, 92] },
  { mile: 1570, latLng: [29, 93] },
  { mile: 1590, latLng: [28, 94.5] },
  { mile: 1620, latLng: [28, 96] },
  { mile: 1680, latLng: [29, 99] },
  { mile: 1740, latLng: [31, 101] },
  { mile: 1800, latLng: [32, 103] }
];

export const TOTAL_MILES = 1800;
