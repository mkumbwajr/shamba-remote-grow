
import React from 'react';

const LandPlotNotFound: React.FC = () => {
  return (
    <div className="text-center py-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Land Plot Not Found</h3>
      <p className="text-gray-600">The requested land plot could not be found.</p>
    </div>
  );
};

export default LandPlotNotFound;
