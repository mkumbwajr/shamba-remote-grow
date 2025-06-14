import React, { useState, useNavigate } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { MapPin, Calendar, DollarSign, Ruler, Droplets, Thermometer, Star, Filter, Map } from 'lucide-react';

const LandRental = () => {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState([50, 500]);
  const [sizeRange, setSizeRange] = useState([1, 50]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [soilType, setSoilType] = useState('');

  const landPlots = [
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
      available: true
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
      available: true
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
      available: true
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
      available: true
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
      available: false
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
      available: true
    }
  ];

  const regions = [
    'Arusha', 'Dar es Salaam', 'Dodoma', 'Iringa', 'Kagera', 'Kilimanjaro',
    'Manyara', 'Mara', 'Mbeya', 'Morogoro', 'Mtwara', 'Mwanza', 'Pwani',
    'Rukwa', 'Ruvuma', 'Shinyanga', 'Singida', 'Tabora', 'Tanga'
  ];

  const filteredPlots = landPlots.filter(plot => {
    const matchesRegion = selectedRegion === 'all-regions' || !selectedRegion || plot.location.includes(selectedRegion);
    const matchesSoil = soilType === 'all-types' || !soilType || plot.soilType.toLowerCase().includes(soilType.toLowerCase());
    const matchesPrice = plot.pricePerAcre >= priceRange[0] && plot.pricePerAcre <= priceRange[1];
    const matchesSize = plot.size >= sizeRange[0] && plot.size <= sizeRange[1];
    return matchesRegion && matchesSoil && matchesPrice && matchesSize;
  });

  const handleShowMap = (plotId: number) => {
    navigate(`/land-plot-map/${plotId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-forest-800">Land Rental</h2>
        <p className="text-forest-600">Find and rent fertile farmland across Tanzania</p>
      </div>

      {/* Filters */}
      <Card className="bg-white border-forest-200">
        <CardHeader>
          <CardTitle className="text-forest-800 flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filter Land Plots</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-forest-800">Region</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="border-forest-200">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-regions">All Regions</SelectItem>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-forest-800">Soil Type</label>
              <Select value={soilType} onValueChange={setSoilType}>
                <SelectTrigger className="border-forest-200">
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">All Types</SelectItem>
                  <SelectItem value="loam">Loam</SelectItem>
                  <SelectItem value="clay">Clay</SelectItem>
                  <SelectItem value="sandy">Sandy</SelectItem>
                  <SelectItem value="volcanic">Volcanic</SelectItem>
                  <SelectItem value="alluvial">Alluvial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-forest-800">
                Price Range: TSh {(priceRange[0] * 2800).toLocaleString()} - TSh {(priceRange[1] * 2800).toLocaleString()} per acre/year
              </label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={500}
                min={50}
                step={10}
                className="w-full"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-forest-800">
                Size Range: {sizeRange[0]} - {sizeRange[1]} acres
              </label>
              <Slider
                value={sizeRange}
                onValueChange={setSizeRange}
                max={50}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-forest-800">
            Available Land Plots ({filteredPlots.length})
          </h3>
          <Select defaultValue="rating">
            <SelectTrigger className="w-40 border-forest-200">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="size">Size: Large to Small</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPlots.map((plot) => (
            <Card key={plot.id} className={`bg-white border-forest-200 hover:shadow-lg transition-shadow ${!plot.available ? 'opacity-75' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{plot.image}</div>
                    <div>
                      <CardTitle className="text-forest-800">{plot.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="h-3 w-3 text-forest-600" />
                        <span className="text-sm text-forest-600">{plot.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-forest-600">{plot.rating}</span>
                    </div>
                    {!plot.available && (
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        Rented
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Key Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Ruler className="h-4 w-4 text-crop-600" />
                      <span className="text-sm text-forest-600">Size</span>
                    </div>
                    <p className="font-medium text-forest-800">{plot.size} acres</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-crop-600" />
                      <span className="text-sm text-forest-600">Price/acre</span>
                    </div>
                    <p className="font-medium text-forest-800">TSh {(plot.pricePerAcre * 2800).toLocaleString()}/year</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-crop-600" />
                      <span className="text-sm text-forest-600">Duration</span>
                    </div>
                    <p className="font-medium text-forest-800">{plot.duration}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Droplets className="h-4 w-4 text-crop-600" />
                      <span className="text-sm text-forest-600">Water</span>
                    </div>
                    <p className="font-medium text-forest-800">{plot.waterAccess}</p>
                  </div>
                </div>

                {/* Environmental Info */}
                <div className="bg-crop-50 border border-crop-200 rounded-lg p-3">
                  <h4 className="font-medium text-crop-800 mb-2">Land Characteristics</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-crop-600">Soil Type:</span>
                      <span className="text-crop-800 ml-1">{plot.soilType}</span>
                    </div>
                    <div>
                      <span className="text-crop-600">Elevation:</span>
                      <span className="text-crop-800 ml-1">{plot.elevation}</span>
                    </div>
                    <div>
                      <span className="text-crop-600">Rainfall:</span>
                      <span className="text-crop-800 ml-1">{plot.rainfall}</span>
                    </div>
                    <div>
                      <span className="text-crop-600">Temperature:</span>
                      <span className="text-crop-800 ml-1">{plot.temperature}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-medium text-forest-800 mb-2">Features</h4>
                  <div className="flex flex-wrap gap-1">
                    {plot.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="bg-earth-50 border-earth-300 text-earth-700 text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Suitable Crops */}
                <div>
                  <h4 className="font-medium text-forest-800 mb-2">Suitable Crops</h4>
                  <div className="flex flex-wrap gap-1">
                    {plot.suitableCrops.map((crop, index) => (
                      <Badge key={index} variant="outline" className="bg-forest-50 border-forest-300 text-forest-700 text-xs">
                        {crop}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Owner and Total */}
                <div className="border-t border-forest-100 pt-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-forest-600">Owner: {plot.owner}</span>
                    <span className="text-lg font-bold text-forest-800">
                      Total: TSh {((plot.pricePerAcre * plot.size) * 2800).toLocaleString()}/year
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      className="flex-1 bg-forest-600 hover:bg-forest-700"
                      disabled={!plot.available}
                    >
                      {plot.available ? 'Rent This Land' : 'Currently Rented'}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-forest-200"
                      onClick={() => handleShowMap(plot.id)}
                    >
                      <Map className="h-4 w-4 mr-1" />
                      Show Map
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandRental;
