export type Pincode = {
  pincode: string;
  area: string;
  zone: string;
  distanceKm: number;
  volume: number;
};

export const PINCODES: Pincode[] = [
  { pincode: "110020", area: "Okhla", zone: "South", distanceKm: 2, volume: 180 },
  { pincode: "110019", area: "Kalkaji", zone: "South", distanceKm: 4, volume: 150 },
  { pincode: "110017", area: "Green Park", zone: "South", distanceKm: 6, volume: 135 },
  { pincode: "110025", area: "Jamia Nagar", zone: "South", distanceKm: 5, volume: 90 },
  { pincode: "110024", area: "Nizamuddin", zone: "Central", distanceKm: 7, volume: 130 },
  { pincode: "110016", area: "Hauz Khas", zone: "South", distanceKm: 8, volume: 140 },
  { pincode: "110049", area: "Vasant Vihar", zone: "South", distanceKm: 11, volume: 105 },
  { pincode: "110003", area: "Chanakyapuri", zone: "Central", distanceKm: 10, volume: 60 },
  { pincode: "110001", area: "Connaught Place", zone: "Central", distanceKm: 12, volume: 200 },
  { pincode: "110002", area: "Daryaganj", zone: "Central", distanceKm: 13, volume: 85 },
  { pincode: "110006", area: "Sadar Bazar", zone: "Central", distanceKm: 14, volume: 70 },
  { pincode: "110044", area: "Badarpur", zone: "South East", distanceKm: 9, volume: 70 },
  { pincode: "110076", area: "Sarita Vihar", zone: "South East", distanceKm: 6, volume: 100 },
  { pincode: "110096", area: "Mayur Vihar", zone: "East", distanceKm: 15, volume: 110 },
  { pincode: "110091", area: "Preet Vihar", zone: "East", distanceKm: 17, volume: 95 },
  { pincode: "110092", area: "Anand Vihar", zone: "East", distanceKm: 18, volume: 85 },
  { pincode: "110005", area: "Karol Bagh", zone: "Central", distanceKm: 16, volume: 120 },
  { pincode: "110008", area: "Patel Nagar", zone: "West", distanceKm: 15, volume: 95 },
  { pincode: "110015", area: "Rajouri Garden", zone: "West", distanceKm: 18, volume: 105 },
  { pincode: "110026", area: "Tilak Nagar", zone: "West", distanceKm: 19, volume: 80 },
  { pincode: "110034", area: "Model Town", zone: "North", distanceKm: 20, volume: 65 },
  { pincode: "110009", area: "Kamla Nagar", zone: "North", distanceKm: 19, volume: 90 },
  { pincode: "110033", area: "Ashok Vihar", zone: "North", distanceKm: 21, volume: 60 },
  { pincode: "110058", area: "Janakpuri", zone: "West", distanceKm: 22, volume: 75 },
  { pincode: "110059", area: "Uttam Nagar", zone: "West", distanceKm: 24, volume: 65 },
  { pincode: "110062", area: "Dwarka", zone: "South West", distanceKm: 25, volume: 100 },
  { pincode: "110045", area: "Palam", zone: "South West", distanceKm: 23, volume: 70 },
  { pincode: "110085", area: "Rohini", zone: "North West", distanceKm: 27, volume: 80 },
];

/** Compass bearing in degrees (0 = North / up, clockwise) per zone. */
export const ZONE_BEARING: Record<string, number> = {
  North: 0,
  "North West": 315,
  West: 270,
  "South West": 225,
  South: 180,
  "South East": 135,
  East: 90,
  Central: 45,
};
