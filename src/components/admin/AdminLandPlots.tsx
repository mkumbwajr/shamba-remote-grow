
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tables } from '@/integrations/supabase/types';
import { formatTshAmount } from '@/utils/currency';
import { MapPin, Droplets, Zap, Car } from 'lucide-react';

type LandPlot = Tables<'land_plots'>;

const AdminLandPlots = () => {
  const [landPlots, setLandPlots] = useState<LandPlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLandPlots = async () => {
      try {
        const { data, error } = await supabase
          .from('land_plots')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching land plots:', error);
        } else {
          setLandPlots(data || []);
        }
      } catch (error) {
        console.error('Error fetching land plots:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLandPlots();
  }, []);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'rented':
        return 'bg-yellow-100 text-yellow-800';
      case 'unavailable':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Land Plots Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Land Plots Management</CardTitle>
          <p className="text-sm text-gray-600">
            Manage all land plots available for rental
          </p>
        </div>
        <Button>Add Land Plot</Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plot Details</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Size & Price</TableHead>
                <TableHead>Utilities</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {landPlots.map((plot) => (
                <TableRow key={plot.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{plot.title}</div>
                      <div className="text-sm text-gray-500">
                        {plot.soil_type || 'Soil type not specified'}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{plot.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{plot.size_acres} acres</div>
                      <div className="text-sm text-gray-500">
                        {formatTshAmount(plot.price_per_acre)}/acre
                      </div>
                      <div className="text-xs text-green-600 font-medium">
                        Total: {formatTshAmount(plot.total_price || 0)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {plot.water_access && (
                        <Droplets className="h-4 w-4 text-blue-500" title="Water access" />
                      )}
                      {plot.electricity_access && (
                        <Zap className="h-4 w-4 text-yellow-500" title="Electricity access" />
                      )}
                      {plot.road_access && (
                        <Car className="h-4 w-4 text-gray-600" title="Road access" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(plot.availability_status || 'available')}>
                      {plot.availability_status || 'available'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminLandPlots;
