
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { formatTshAmount, calculateTotalPrice } from '@/utils/currency';

interface Service {
  id: number;
  name: string;
  provider: string;
  price: number;
  duration: string;
  rating: number;
  description: string;
  location: string;
}

interface MarketplaceServicesProps {
  services: Service[];
  onAddToCart?: (service: Service) => void;
}

const MarketplaceServices: React.FC<MarketplaceServicesProps> = ({ services, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
      {services.map((service) => {
        const totalPrice = calculateTotalPrice(service.price);
        
        return (
          <Card key={service.id} className="bg-white border-forest-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-forest-800 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <span className="text-base sm:text-lg leading-tight">{service.name}</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-forest-600">{service.rating}</span>
                </div>
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-forest-600">Provider:</span>
                  <span className="text-forest-800 font-medium text-right">{service.provider}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-forest-600">Duration:</span>
                  <span className="text-forest-800">{service.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-forest-600">Coverage:</span>
                  <span className="text-forest-800">{service.location}</span>
                </div>
              </div>

              <div className="bg-crop-50 border border-crop-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-crop-800 font-medium text-sm">Price per acre (incl. VAT)</span>
                  <span className="text-xl sm:text-2xl font-bold text-crop-800">{formatTshAmount(totalPrice)}</span>
                </div>
                <div className="text-xs text-gray-500 text-right">Base: {formatTshAmount(service.price)}</div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                {onAddToCart && (
                  <Button 
                    onClick={() => onAddToCart({ ...service, price: totalPrice })}
                    className="flex-1 bg-forest-600 hover:bg-forest-700 text-sm"
                  >
                    Add to Cart
                  </Button>
                )}
                <Button variant="outline" className="border-forest-200 sm:w-auto text-sm">
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MarketplaceServices;
