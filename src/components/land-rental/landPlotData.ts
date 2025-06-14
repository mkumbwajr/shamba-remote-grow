
export interface LandPlot {
  id: number;
  title: string;
  location: string;
  size: number;
  pricePerAcre: number;
  duration: string;
  soilType: string;
  waterAccess: string;
  elevation: string;
  rainfall: string;
  temperature: string;
  rating: number;
  owner: string;
  features: string[];
  suitableCrops: string[];
  image: string;
  available: boolean;
  coordinates?: { lat: number; lng: number };
  address?: string;
}

export const landPlots: LandPlot[] = [
  {
    id: 1,
    title: 'Kilimanjaro Valley Premium Plot',
    location: 'Kilimanjaro Region',
    size: 5,
    pricePerAcre: 120,
    duration: '1 year',
    soilType: 'Volcanic Loam',
    waterAccess: 'River nearby',
    elevation: '1,200m',
    rainfall: '800-1200mm',
    temperature: '18-26°C',
    rating: 4.9,
    owner: 'Mount Kilimanjaro Farms',
    features: ['Irrigation ready', 'Fertile soil', 'Road access', 'Storage facility'],
    suitableCrops: ['Coffee', 'Maize', 'Beans', 'Bananas'],
    image: '🏔️',
    available: true,
    coordinates: { lat: -3.0674, lng: 37.3556 },
    address: 'Kilimanjaro Valley, Moshi, Tanzania'
  },
  {
    id: 2,
    title: 'Arusha Plains Agricultural Land',
    location: 'Arusha Region',
    size: 10,
    pricePerAcre: 85,
    duration: '2 years',
    soilType: 'Clay Loam',
    waterAccess: 'Borehole',
    elevation: '1,400m',
    rainfall: '600-1000mm',
    temperature: '16-28°C',
    rating: 4.7,
    owner: 'Serengeti Agro Estate',
    features: ['Organic certified', 'Fenced', 'Equipment shed', 'Labor housing'],
    suitableCrops: ['Maize', 'Tomatoes', 'Onions', 'Wheat'],
    image: '🌾',
    available: true,
    coordinates: { lat: -3.3869, lng: 36.6830 },
    address: 'Arusha Plains, Arusha, Tanzania'
  },
  {
    id: 3,
    title: 'Mbeya Highlands Coffee Estate',
    location: 'Mbeya Region',
    size: 8,
    pricePerAcre: 200,
    duration: '3 years',
    soilType: 'Red Clay',
    waterAccess: 'Spring water',
    elevation: '1,800m',
    rainfall: '1200-1800mm',
    temperature: '12-24°C',
    rating: 4.8,
    owner: 'Highland Coffee Cooperative',
    features: ['Coffee trees planted', 'Processing facility', 'Expert support', 'Export connections'],
    suitableCrops: ['Coffee', 'Beans', 'Irish Potatoes'],
    image: '☕',
    available: true,
    coordinates: { lat: -8.9094, lng: 33.4608 },
    address: 'Mbeya Highlands, Mbeya, Tanzania'
  },
  {
    id: 4,
    title: 'Dodoma Central Farmland',
    location: 'Dodoma Region',
    size: 15,
    pricePerAcre: 60,
    duration: '1 year',
    soilType: 'Sandy Loam',
    waterAccess: 'Seasonal rain',
    elevation: '1,100m',
    rainfall: '400-800mm',
    temperature: '20-32°C',
    rating: 4.4,
    owner: 'Central Tanzania Farms',
    features: ['Large plot', 'Drought resistant area', 'Local market access'],
    suitableCrops: ['Sorghum', 'Sunflower', 'Groundnuts', 'Sesame'],
    image: '🌻',
    available: true,
    coordinates: { lat: -6.1622, lng: 35.7516 },
    address: 'Dodoma Central, Dodoma, Tanzania'
  },
  {
    id: 5,
    title: 'Morogoro Valley Rice Fields',
    location: 'Morogoro Region',
    size: 12,
    pricePerAcre: 95,
    duration: '2 years',
    soilType: 'Alluvial Clay',
    waterAccess: 'River irrigation',
    elevation: '500m',
    rainfall: '800-1400mm',
    temperature: '22-30°C',
    rating: 4.6,
    owner: 'Morogoro Rice Growers',
    features: ['Flood irrigation', 'Rice terraces', 'Processing mill nearby', 'Transport access'],
    suitableCrops: ['Rice', 'Vegetables', 'Sugarcane'],
    image: '🌾',
    available: false,
    coordinates: { lat: -6.8269, lng: 37.6564 },
    address: 'Morogoro Valley, Morogoro, Tanzania'
  },
  {
    id: 6,
    title: 'Mwanza Lakeside Gardens',
    location: 'Mwanza Region',
    size: 6,
    pricePerAcre: 110,
    duration: '1 year',
    soilType: 'Black Cotton',
    waterAccess: 'Lake Victoria',
    elevation: '1,134m',
    rainfall: '900-1200mm',
    temperature: '19-29°C',
    rating: 4.5,
    owner: 'Lake Victoria Agro',
    features: ['Lake access', 'Fish farming potential', 'Tourist area', 'Good climate'],
    suitableCrops: ['Cotton', 'Cassava', 'Sweet Potatoes', 'Vegetables'],
    image: '🐟',
    available: true,
    coordinates: { lat: -2.5164, lng: 32.9175 },
    address: 'Mwanza Lakeside, Mwanza, Tanzania'
  }
];
