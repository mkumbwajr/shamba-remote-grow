
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';

interface MarketplaceHeaderProps {
  cartItems: number;
}

const MarketplaceHeader: React.FC<MarketplaceHeaderProps> = ({ cartItems }) => {
  return (
    <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-bold text-forest-800">Marketplace</h2>
        <p className="text-sm sm:text-base text-forest-600 mt-1">Seeds, tools, and services for your farming needs</p>
      </div>
      <div className="flex justify-center sm:justify-end">
        <Button variant="outline" className="border-forest-200 relative w-full sm:w-auto">
          <ShoppingCart className="h-4 w-4 mr-2" />
          <span className="sm:inline">Cart</span>
          {cartItems > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-crop-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {cartItems}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MarketplaceHeader;
