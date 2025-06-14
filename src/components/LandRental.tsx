
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LandRentalHeader from '@/components/land-rental/LandRentalHeader';
import LandRentalFilters from '@/components/land-rental/LandRentalFilters';
import LandPlotCard from '@/components/land-rental/LandPlotCard';
import { landPlots } from '@/components/land-rental/landPlotData';

const LandRental = () => {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState([50, 500]);
  const [sizeRange, setSizeRange] = useState([1, 50]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [soilType, setSoilType] = useState('');

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
      <LandRentalHeader />

      <LandRentalFilters
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sizeRange={sizeRange}
        setSizeRange={setSizeRange}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        soilType={soilType}
        setSoilType={setSoilType}
      />

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
            <LandPlotCard
              key={plot.id}
              plot={plot}
              onShowMap={handleShowMap}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandRental;
