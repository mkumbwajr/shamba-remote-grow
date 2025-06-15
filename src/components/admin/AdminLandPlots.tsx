
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, DollarSign, Ruler, Droplets, Zap, Car } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LandPlot {
  id: string;
  title: string;
  description: string;
  location: string;
  size_acres: number;
  price_per_acre: number;
  total_price: number;
  soil_type: string;
  water_access: boolean;
  electricity_access: boolean;
  road_access: boolean;
  owner_name: string;
  owner_contact: string;
  availability_status: string;
  created_at: string;
}

const AdminLandPlots = () => {
  const [landPlots, setLandPlots] = useState<LandPlot[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLandPlots = async () => {
      try {
        const { data, error } = await supabase
          .from('land_plots')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setLandPlots(data || []);
      } catch (error) {
        console.error('Error fetching land plots:', error);
        toast({
          title: "Error",
          description: "Failed to fetch land plots.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLandPlots();
  }, [toast]);

  const handleStatusChange = async (plotId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('land_plots')
        .update({ availability_status: newStatus })
        .eq('id', plotId);

      if (error) throw error;

      setLandPlots(prev => 
        prev.map(plot => 
          plot.id === plotId 
            ? { ...plot, availability_status: newStatus }
            : plot
        )
      );

      toast({
        title: "Success",
        description: "Land plot status updated successfully."
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update land plot status.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Land Plots Management</h2>
          <p className="text-gray-600">Manage available land plots for rental</p>
        </div>
        <Badge variant="outline" className="text-lg px-3 py-1">
          {landPlots.length} Total Plots
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {landPlots.map((plot) => (
          <Card key={plot.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{plot.title}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {plot.location}
                  </CardDescription>
                </div>
                <Badge 
                  variant={plot.availability_status === 'available' ? 'default' : 'secondary'}
                >
                  {plot.availability_status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Ruler className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{plot.size_acres} acres</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                  <span>${plot.price_per_acre}/acre</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">Total: ${plot.total_price}</span>
                <span className="text-gray-500">Soil: {plot.soil_type}</span>
              </div>

              <div className="flex space-x-2">
                <div className="flex items-center text-xs">
                  <Droplets className={`h-3 w-3 mr-1 ${plot.water_access ? 'text-blue-500' : 'text-gray-400'}`} />
                  <span>Water</span>
                </div>
                <div className="flex items-center text-xs">
                  <Zap className={`h-3 w-3 mr-1 ${plot.electricity_access ? 'text-yellow-500' : 'text-gray-400'}`} />
                  <span>Electric</span>
                </div>
                <div className="flex items-center text-xs">
                  <Car className={`h-3 w-3 mr-1 ${plot.road_access ? 'text-green-500' : 'text-gray-400'}`} />
                  <span>Road</span>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                <p>Owner: {plot.owner_name}</p>
                <p>Contact: {plot.owner_contact}</p>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant={plot.availability_status === 'available' ? 'outline' : 'default'}
                  onClick={() => handleStatusChange(plot.id, plot.availability_status === 'available' ? 'rented' : 'available')}
                >
                  {plot.availability_status === 'available' ? 'Mark Rented' : 'Mark Available'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {landPlots.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MapPin className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No land plots found</h3>
            <p className="text-gray-500 text-center">
              Land plots will appear here once they are added to the platform.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminLandPlots;
