
import React from 'react';
import { Card } from '@/components/ui/card';

interface FarmsEmptyStateProps {
  message: string;
}

const FarmsEmptyState: React.FC<FarmsEmptyStateProps> = ({ message }) => {
  return (
    <Card className="p-8 text-center">
      <p className="text-gray-500">{message}</p>
    </Card>
  );
};

export default FarmsEmptyState;
