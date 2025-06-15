
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Package, Truck } from 'lucide-react';
import { formatTshAmount, calculateTotalPrice } from '@/utils/currency';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  vendor: string;
  location: string;
  rating: number;
  stock: number;
  image: string;
  description: string;
  delivery: string;
}

interface MarketplaceProductsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const MarketplaceProducts: React.FC<MarketplaceProductsProps> = ({ products, onAddToCart }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
      {products.map((product) => {
        const totalPrice = calculateTotalPrice(product.price);
        
        return (
          <Card key={product.id} className="bg-white border-forest-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between space-x-3">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="flex-shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-forest-800 text-base sm:text-lg leading-tight">{product.name}</CardTitle>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mt-1">
                      <Badge variant="outline" className="bg-crop-50 border-crop-300 text-crop-700 text-xs w-fit">
                        {product.category}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-forest-600">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg sm:text-2xl font-bold text-forest-800">{formatTshAmount(totalPrice)}</p>
                  <p className="text-xs text-forest-600">per unit (incl. VAT)</p>
                  <p className="text-xs text-gray-500">Base: {formatTshAmount(product.price)}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-forest-600 leading-relaxed">{product.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-forest-600">Vendor:</span>
                  <span className="text-forest-800 font-medium text-right">{product.vendor}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-forest-600 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    Location:
                  </span>
                  <span className="text-forest-800">{product.location}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-forest-600 flex items-center">
                    <Package className="h-3 w-3 mr-1" />
                    Stock:
                  </span>
                  <span className="text-forest-800">{product.stock} units</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-forest-600 flex items-center">
                    <Truck className="h-3 w-3 mr-1" />
                    Delivery:
                  </span>
                  <span className="text-forest-800">{product.delivery}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
                <Button
                  onClick={() => onAddToCart({ ...product, price: totalPrice })}
                  className="flex-1 bg-forest-600 hover:bg-forest-700 text-sm"
                >
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  className="border-forest-200 sm:w-auto text-sm"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MarketplaceProducts;
