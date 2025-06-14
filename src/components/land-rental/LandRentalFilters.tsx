
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Filter } from 'lucide-react';

interface LandRentalFiltersProps {
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  sizeRange: number[];
  setSizeRange: (range: number[]) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  soilType: string;
  setSoilType: (type: string) => void;
}

const LandRentalFilters: React.FC<LandRentalFiltersProps> = ({
  priceRange,
  setPriceRange,
  sizeRange,
  setSizeRange,
  selectedRegion,
  setSelectedRegion,
  soilType,
  setSoilType
}) => {
  const regions = [
    'Arusha', 'Dar es Salaam', 'Dodoma', 'Iringa', 'Kagera', 'Kilimanjaro',
    'Manyara', 'Mara', 'Mbeya', 'Morogoro', 'Mtwara', 'Mwanza', 'Pwani',
    'Rukwa', 'Ruvuma', 'Shinyanga', 'Singida', 'Tabora', 'Tanga'
  ];

  return (
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
  );
};

export default LandRentalFilters;
