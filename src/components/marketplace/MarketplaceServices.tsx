
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
  image: string;
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
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between space-x-3">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="flex-shrink-0">
                    <img 
                      src={service.image} 
                      alt={service.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-forest-800 text-base sm:text-lg leading-tight">{service.name}</CardTitle>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-forest-600">{service.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg sm:text-2xl font-bold text-forest-800">{formatTshAmount(totalPrice)}</p>
                  <p className="text-xs text-forest-600">per acre (incl. VAT)</p>
                  <p className="text-xs text-gray-500">Base: {formatTshAmount(service.price)}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-forest-600 leading-relaxed">{service.description}</p>
              
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

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
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
