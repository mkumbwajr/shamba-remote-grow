
import React from 'react';

const MapLoadingSpinner: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest-600 mx-auto mb-2"></div>
        <p className="text-sm text-gray-600">Loading map...</p>
      </div>
    </div>
  );
};

export default MapLoadingSpinner;
