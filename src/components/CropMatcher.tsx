
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Leaf, MapPin, TrendingUp, TrendingDown, AlertCircle, Calendar, DollarSign, Droplets, Thermometer, Globe, ArrowUp, ArrowDown } from 'lucide-react';
import { formatTzsAmount } from '@/utils/currency';

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
      marketPrice: 480,
      investment: 250,
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
      marketPrice: 4.20,
      investment: 800,
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
      marketPrice: 650,
      investment: 400,
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
      marketPrice: 850,
      investment: 180,
      roi: '95%',
      description: 'Excellent rotation crop with nitrogen-fixing properties.',
      climate: 'Temperate to tropical',
      rainfall: '400-700mm annually',
      temperature: '16-28°C',
      pros: ['Soil improvement', 'Food security crop', 'Good protein source'],
      cons: ['Market price fluctuation', 'Weather dependent', 'Post-harvest handling']
    }
  ];

  const aiInvestmentRecommendations = [
    {
      crop: 'Quinoa',
      trend: 'rising',
      priceChange: '+24%',
      recommendation: 'STRONG BUY',
      reason: 'Growing health consciousness globally driving demand. Limited supply sources.',
      timeframe: '3-5 years',
      riskLevel: 'Medium',
      potentialReturn: '180-250%'
    },
    {
      crop: 'Avocados',
      trend: 'rising',
      priceChange: '+18%',
      recommendation: 'BUY',
      reason: 'Millennial dietary preferences and export opportunities to Europe/Asia.',
      timeframe: '2-4 years',
      riskLevel: 'Medium-High',
      potentialReturn: '120-180%'
    },
    {
      crop: 'Cocoa',
      trend: 'falling',
      priceChange: '-12%',
      recommendation: 'HOLD/WAIT',
      reason: 'Oversupply from West Africa affecting global prices.',
      timeframe: '1-2 years',
      riskLevel: 'High',
      potentialReturn: '60-90%'
    },
    {
      crop: 'Vanilla',
      trend: 'rising',
      priceChange: '+35%',
      recommendation: 'STRONG BUY',
      reason: 'Supply shortages from Madagascar. High-value specialty crop.',
      timeframe: '4-6 years',
      riskLevel: 'High',
      potentialReturn: '300-500%'
    },
    {
      crop: 'Cashew Nuts',
      trend: 'rising',
      priceChange: '+15%',
      recommendation: 'BUY',
      reason: 'Growing snack market and health food trends. Tanzania well-positioned.',
      timeframe: '3-5 years',
      riskLevel: 'Medium',
      potentialReturn: '140-200%'
    }
  ];

  const exportCountries = [
    { country: 'Brazil', crops: ['Coffee', 'Soybeans', 'Sugar'], volume: '$43.2B', marketShare: '15.2%' },
    { country: 'United States', crops: ['Maize', 'Soybeans', 'Wheat'], volume: '$39.8B', marketShare: '14.1%' },
    { country: 'Argentina', crops: ['Soybeans', 'Wheat', 'Beef'], volume: '$31.5B', marketShare: '11.2%' },
    { country: 'Netherlands', crops: ['Flowers', 'Vegetables', 'Fruits'], volume: '$28.7B', marketShare: '10.1%' },
    { country: 'India', crops: ['Rice', 'Tea', 'Spices'], volume: '$24.3B', marketShare: '8.6%' },
    { country: 'France', crops: ['Wheat', 'Wine', 'Dairy'], volume: '$22.1B', marketShare: '7.8%' }
  ];

  const importCountries = [
    { country: 'China', crops: ['Soybeans', 'Maize', 'Cotton'], volume: '$61.8B', marketShare: '18.5%' },
    { country: 'Germany', crops: ['Coffee', 'Fruits', 'Vegetables'], volume: '$38.4B', marketShare: '11.5%' },
    { country: 'Japan', crops: ['Wheat', 'Maize', 'Soybeans'], volume: '$32.7B', marketShare: '9.8%' },
    { country: 'United Kingdom', crops: ['Fruits', 'Vegetables', 'Wine'], volume: '$29.2B', marketShare: '8.7%' },
    { country: 'Netherlands', crops: ['Cocoa', 'Coffee', 'Spices'], volume: '$27.8B', marketShare: '8.3%' },
    { country: 'Italy', crops: ['Wheat', 'Fruits', 'Coffee'], volume: '$25.1B', marketShare: '7.5%' }
  ];

  const cropDemandByCountry = [
    { country: 'China', primaryDemand: 'Soybeans', secondaryDemand: 'Maize', reason: 'Animal feed for growing meat consumption', growth: '+8.2%' },
    { country: 'India', primaryDemand: 'Pulses', secondaryDemand: 'Rice', reason: 'Population growth and protein demand', growth: '+6.1%' },
    { country: 'Germany', primaryDemand: 'Organic Vegetables', secondaryDemand: 'Coffee', reason: 'Health consciousness and premium products', growth: '+12.4%' },
    { country: 'Japan', primaryDemand: 'Wheat', secondaryDemand: 'Fruits', reason: 'Food security and quality preferences', growth: '+3.8%' },
    { country: 'United States', primaryDemand: 'Organic Produce', secondaryDemand: 'Specialty Grains', reason: 'Health trends and dietary diversity', growth: '+9.7%' },
    { country: 'South Korea', primaryDemand: 'Rice', secondaryDemand: 'Vegetables', reason: 'Traditional diet maintenance', growth: '+4.2%' }
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
                  <SelectItem value="low">TZS 250,000 - 1,250,000</SelectItem>
                  <SelectItem value="medium">TZS 1,250,000 - 5,000,000</SelectItem>
                  <SelectItem value="high">TZS 5,000,000 - 12,500,000</SelectItem>
                  <SelectItem value="premium">TZS 12,500,000+</SelectItem>
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
        <Tabs defaultValue="recommendations" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recommendations">Crop Recommendations</TabsTrigger>
            <TabsTrigger value="investment">AI Investment Insights</TabsTrigger>
            <TabsTrigger value="countries">Global Market Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="space-y-4">
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
                        <p className="font-medium text-forest-800">
                          {crop.name === 'Coffee (Arabica)' ? `${formatTzsAmount(crop.marketPrice)}/kg` : `${formatTzsAmount(crop.marketPrice)}/ton`}
                        </p>
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

                    {/* Investment Cost */}
                    <div className="bg-earth-50 border border-earth-200 rounded-lg p-3">
                      <h4 className="font-medium text-earth-800 mb-2">Investment Required</h4>
                      <p className="text-lg font-bold text-earth-800">{formatTzsAmount(crop.investment)}/acre</p>
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
          </TabsContent>

          <TabsContent value="investment" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-forest-800">AI Investment Insights</h2>
              <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                Market Analysis
              </Badge>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {aiInvestmentRecommendations.map((investment, index) => (
                <Card key={index} className="bg-white border-forest-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-bold text-forest-800">{investment.crop}</h3>
                        <div className="flex items-center space-x-1">
                          {investment.trend === 'rising' ? (
                            <ArrowUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <ArrowDown className="h-4 w-4 text-red-600" />
                          )}
                          <span className={`text-sm font-medium ${investment.trend === 'rising' ? 'text-green-600' : 'text-red-600'}`}>
                            {investment.priceChange}
                          </span>
                        </div>
                      </div>
                      <Badge className={`${
                        investment.recommendation === 'STRONG BUY' ? 'bg-green-100 text-green-800 border-green-300' :
                        investment.recommendation === 'BUY' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                        'bg-yellow-100 text-yellow-800 border-yellow-300'
                      }`}>
                        {investment.recommendation}
                      </Badge>
                    </div>
                    
                    <p className="text-forest-700 mb-4">{investment.reason}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <span className="text-sm text-forest-600">Timeframe</span>
                        <p className="font-medium text-forest-800">{investment.timeframe}</p>
                      </div>
                      <div>
                        <span className="text-sm text-forest-600">Risk Level</span>
                        <p className="font-medium text-forest-800">{investment.riskLevel}</p>
                      </div>
                      <div>
                        <span className="text-sm text-forest-600">Potential Return</span>
                        <p className="font-medium text-green-600">{investment.potentialReturn}</p>
                      </div>
                      <div>
                        <span className="text-sm text-forest-600">Trend</span>
                        <p className={`font-medium ${investment.trend === 'rising' ? 'text-green-600' : 'text-red-600'}`}>
                          {investment.trend === 'rising' ? '↗ Rising' : '↘ Falling'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="countries" className="space-y-6">
            <Tabs defaultValue="exporters" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="exporters">Leading Exporters</TabsTrigger>
                <TabsTrigger value="importers">Leading Importers</TabsTrigger>
                <TabsTrigger value="demand">Crop Demand by Country</TabsTrigger>
              </TabsList>

              <TabsContent value="exporters">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Globe className="h-5 w-5" />
                      <span>Top Agricultural Exporting Countries</span>
                    </CardTitle>
                    <CardDescription>Leading countries in global agricultural exports by volume and value</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Country</TableHead>
                          <TableHead>Primary Crops</TableHead>
                          <TableHead>Export Volume</TableHead>
                          <TableHead>Market Share</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {exportCountries.map((country, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{country.country}</TableCell>
                            <TableCell>{country.crops.join(', ')}</TableCell>
                            <TableCell>{country.volume}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Progress value={parseFloat(country.marketShare)} className="w-16 h-2" />
                                <span className="text-sm">{country.marketShare}</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="importers">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Globe className="h-5 w-5" />
                      <span>Top Agricultural Importing Countries</span>
                    </CardTitle>
                    <CardDescription>Leading countries in global agricultural imports by volume and value</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Country</TableHead>
                          <TableHead>Primary Imports</TableHead>
                          <TableHead>Import Volume</TableHead>
                          <TableHead>Market Share</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {importCountries.map((country, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{country.country}</TableCell>
                            <TableCell>{country.crops.join(', ')}</TableCell>
                            <TableCell>{country.volume}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Progress value={parseFloat(country.marketShare)} className="w-16 h-2" />
                                <span className="text-sm">{country.marketShare}</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="demand">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>Crop Demand by Country</span>
                    </CardTitle>
                    <CardDescription>Countries with highest demand for specific crops and growth trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Country</TableHead>
                          <TableHead>Primary Demand</TableHead>
                          <TableHead>Secondary Demand</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Growth Rate</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cropDemandByCountry.map((demand, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{demand.country}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{demand.primaryDemand}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">{demand.secondaryDemand}</Badge>
                            </TableCell>
                            <TableCell className="max-w-xs">{demand.reason}</TableCell>
                            <TableCell>
                              <span className="text-green-600 font-medium">{demand.growth}</span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default CropMatcher;
