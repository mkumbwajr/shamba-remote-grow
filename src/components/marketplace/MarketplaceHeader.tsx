
import React from 'react';
import CartSidebar from './CartSidebar';

interface MarketplaceHeaderProps {
  cartItems: number;
}

const MarketplaceHeader: React.FC<MarketplaceHeaderProps> = ({ cartItems }) => {
  return (
    <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-forest-800 truncate">Marketplace</h2>
      </div>
      <div className="flex justify-center sm:justify-end">
        <CartSidebar cartItems={cartItems} />
      </div>
    </div>
  );
};

export default MarketplaceHeader;
