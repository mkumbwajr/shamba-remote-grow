
import React from 'react';
import CartSidebar from './CartSidebar';

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
        <CartSidebar cartItems={cartItems} />
      </div>
    </div>
  );
};

export default MarketplaceHeader;
