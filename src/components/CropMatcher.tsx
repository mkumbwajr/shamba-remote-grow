
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Leaf, MapPin, TrendingUp, AlertCircle, Calendar, DollarSign, Droplets, Thermometer } from 'lucide-react';

const CropMatcher = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [soilType, setSoilType] = useState('');
  const [budget, setBudget] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);

  const tanzanianRegions = [
    'Arusha', 'Dar es Salaam', 'Dodoma', 'Geita', 'Iringa', 'Kagera',
    'Katavi', 'Kigoma', 'Kilimanjaro', 'Lindi', 'Manyara', 'Mara',
    'Mbeya', 'Morogoro', 'Mtwara', 'Mwanza', 'Njombe', 'Pemba North',
    'Pemba South', 'Pwani', 'Rukwa', 'Ruvuma', 'Shinyanga', 'Simiyu',
    'Singida', 'Tabora', 'Tanga', 'Zanzibar Central/South', 'Zanzibar North', 'Zanzibar Urban/West'
  ];

  const cropRecommendations = [
    {
      id: 1,
      name: 'Maize (Yellow Corn)',
      suitability: 95,
      expectedYield: '2.5 tons/acre',
      growthPeriod: '120 days',
      marketPrice: '$480/ton',
      investment: '$250/acre',
      roi: '85%',
      description: 'Highly suitable for your selected region with excellent market demand.',
      climate: 'Suitable for tropical/subtropical',
      rainfall: '600-1000mm annually',
      temperature: '18-32°C',
      pros: ['High market demand', 'Well-established supply chain', 'Drought tolerant varieties available'],
      cons: ['Price volatility', 'Storage requirements', 'Pest management needed']
    },
    {
      id: 2,
      name: 'Coffee (Arabica)',
      suitability: 88,
      expectedYield: '800 kg/acre',
      growthPeriod: '365 days',
      marketPrice: '$4.20/kg',
      investment: '$800/acre',
      roi: '120%',
      description: 'Excellent long-term investment with premium export potential.',
      climate: 'Highland tropical',
      rainfall: '1200-1800mm annually',
      temperature: '15-24°C',
      pros: ['High value export crop', 'Premium pricing', 'Sustainable income'],
      cons: ['Long maturation period', 'Climate sensitive', 'High initial investment']
    },
    {
      id: 3,
      name: 'Tomatoes',
      suitability: 82,
      expectedYield: '15 tons/acre',
      growthPeriod: '90 days',
      marketPrice: '$650/ton',
      investment: '$400/acre',
      roi: '165%',
      description: 'Fast growing with multiple harvests per year possible.',
      climate: 'Warm temperate to tropical',
      rainfall: '400-600mm annually',
      temperature: '20-30°C',
      pros: ['Quick returns', 'Multiple harvests/year', 'Local market demand'],
      cons: ['Perishable product', 'Disease susceptible', 'Labor intensive']
    },
    {
      id: 4,
      name: 'Beans (Common)',
      suitability: 78,
      expectedYield: '1.2 tons/acre',
      growthPeriod: '75 days',
      marketPrice: '$850/ton',
      investment: '$180/acre',
      roi: '95%',
      description: 'Excellent rotation crop with nitrogen-fixing properties.',
      climate: 'Temperate to tropical',
      rainfall: '400-700mm annually',
      temperature: '16-28°C',
      pros: ['Soil improvement', 'Food security crop', 'Good protein source'],
      cons: ['Market price fluctuation', 'Weather dependent', 'Post-harvest handling']
    }
  ];

  const handleGetRecommendations = () => {
    setShowRecommendations(true);
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card className="bg-white border-forest-200">
        <CardHeader>
          <CardTitle className="text-forest-800 flex items-center space-x-2">
            <Leaf className="h-5 w-5" />
            <span>AI Crop Matcher</span>
          </CardTitle>
          <CardDescription>
            Get personalized crop recommendations based on location, soil, and market conditions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-forest-800">Region in Tanzania</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="border-forest-200">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {tanzanianRegions.map((region) => (
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
                  <SelectItem value="clay">Clay Soil</SelectItem>
                  <SelectItem value="sandy">Sandy Soil</SelectItem>
                  <SelectItem value="loam">Loamy Soil</SelectItem>
                  <SelectItem value="rocky">Rocky Soil</SelectItem>
                  <SelectItem value="unknown">Not Sure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-forest-800">Budget Range</label>
              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger className="border-forest-200">
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">$100 - $500</SelectItem>
                  <SelectItem value="medium">$500 - $2,000</SelectItem>
                  <SelectItem value="high">$2,000 - $5,000</SelectItem>
                  <SelectItem value="premium">$5,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button 
            onClick={handleGetRecommendations}
            disabled={!selectedRegion || !soilType || !budget}
            className="w-full bg-forest-600 hover:bg-forest-700"
          >
            Get AI Recommendations
          </Button>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {showRecommendations && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-forest-800">Recommended Crops for {selectedRegion}</h2>
            <Badge className="bg-crop-100 text-crop-800 border-crop-300">
              AI Powered
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cropRecommendations.map((crop) => (
              <Card key={crop.id} className="bg-white border-forest-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-forest-800">{crop.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-forest-600">Match</span>
                      <div className="flex items-center space-x-1">
                        <Progress value={crop.suitability} className="w-16 h-2" />
                        <span className="text-sm font-medium text-forest-800">{crop.suitability}%</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription>{crop.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-crop-600" />
                        <span className="text-sm text-forest-600">Expected Yield</span>
                      </div>
                      <p className="font-medium text-forest-800">{crop.expectedYield}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-crop-600" />
                        <span className="text-sm text-forest-600">Growth Period</span>
                      </div>
                      <p className="font-medium text-forest-800">{crop.growthPeriod}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-crop-600" />
                        <span className="text-sm text-forest-600">Market Price</span>
                      </div>
                      <p className="font-medium text-forest-800">{crop.marketPrice}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-crop-600" />
                        <span className="text-sm text-forest-600">Expected ROI</span>
                      </div>
                      <p className="font-medium text-green-600">{crop.roi}</p>
                    </div>
                  </div>

                  {/* Climate Requirements */}
                  <div className="bg-crop-50 border border-crop-200 rounded-lg p-3">
                    <h4 className="font-medium text-crop-800 mb-2">Climate Requirements</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Thermometer className="h-3 w-3 text-crop-600" />
                        <span className="text-crop-700">Temperature: {crop.temperature}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Droplets className="h-3 w-3 text-crop-600" />
                        <span className="text-crop-700">Rainfall: {crop.rainfall}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pros and Cons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-green-800 mb-2">Advantages</h4>
                      <ul className="space-y-1">
                        {crop.pros.map((pro, index) => (
                          <li key={index} className="text-sm text-green-700 flex items-start space-x-1">
                            <span className="text-green-500 mt-1">•</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-orange-800 mb-2">Considerations</h4>
                      <ul className="space-y-1">
                        {crop.cons.map((con, index) => (
                          <li key={index} className="text-sm text-orange-700 flex items-start space-x-1">
                            <span className="text-orange-500 mt-1">•</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button className="flex-1 bg-forest-600 hover:bg-forest-700">
                      Select This Crop
                    </Button>
                    <Button variant="outline" className="border-forest-200">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CropMatcher;
