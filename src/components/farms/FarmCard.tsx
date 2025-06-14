
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, TrendingUp, DollarSign } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface FarmCardProps {
  farm: Tables<'farms'>;
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {
  const { t } = useLanguage();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'planned': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{farm.name}</CardTitle>
          <Badge className={getStatusColor(farm.status)}>
            {farm.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {farm.location && (
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {farm.location}
          </div>
        )}
        
        {farm.size && (
          <div className="flex items-center text-sm text-gray-600">
            <TrendingUp className="h-4 w-4 mr-2" />
            {farm.size} {farm.size_unit || 'acres'}
          </div>
        )}

        {farm.crop_type && (
          <div className="text-sm">
            <span className="font-medium">{t('crop') as string}:</span> {farm.crop_type}
          </div>
        )}

        {farm.investment_amount && (
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="h-4 w-4 mr-2" />
            ${farm.investment_amount.toLocaleString()}
          </div>
        )}

        {farm.start_date && (
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            Started: {new Date(farm.start_date).toLocaleDateString()}
          </div>
        )}

        {farm.notes && (
          <div className="text-sm text-gray-500 italic">
            {farm.notes.length > 100 ? `${farm.notes.substring(0, 100)}...` : farm.notes}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FarmCard;
