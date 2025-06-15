
import React from 'react';
import CartSidebar from './CartSidebar';

interface MarketplaceHeaderProps {
  cartItems: number;
}

const MarketplaceHeader: React.FC<MarketplaceHeaderProps> = ({ cartItems }) => {
  return (
    <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between min-w-0">
      <div className="text-center sm:text-left min-w-0 flex-1">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-forest-800 truncate">Marketplace</h2>
        <p className="text-xs sm:text-sm text-forest-600 mt-1 truncate">Seeds, tools, and services for your farming needs</p>
      </div>
      <div className="flex justify-center sm:justify-end flex-shrink-0">
        <CartSidebar cartItems={cartItems} />
      </div>
    </div>
  );
};

export default MarketplaceHeader;
