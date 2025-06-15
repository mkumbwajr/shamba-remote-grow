
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, MapPin, DollarSign, Briefcase, ShoppingCart } from 'lucide-react';
import { formatTshAmount } from '@/utils/currency';

interface OverviewStats {
  totalUsers: number;
  activeWorkers: number;
  availableLandPlots: number;
  totalRevenue: number;
  activeProducts: number;
  activeServices: number;
}

const AdminOverview = () => {
  const [stats, setStats] = useState<OverviewStats>({
    totalUsers: 0,
    activeWorkers: 0,
    availableLandPlots: 0,
    totalRevenue: 0,
    activeProducts: 0,
    activeServices: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverviewStats = async () => {
      try {
        // Fetch total users
        const { count: usersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // Fetch active workers
        const { count: workersCount } = await supabase
          .from('workers')
          .select('*', { count: 'exact', head: true })
          .eq('availability_status', 'available');

        // Fetch available land plots
        const { count: landPlotsCount } = await supabase
          .from('land_plots')
          .select('*', { count: 'exact', head: true })
          .eq('availability_status', 'available');

        // Fetch total revenue from service charges
        const { data: revenueData } = await supabase
          .from('service_charges')
          .select('commission_amount')
          .eq('status', 'completed');

        const totalRevenue = revenueData?.reduce((sum, charge) => sum + (charge.commission_amount || 0), 0) || 0;

        // Fetch active products
        const { count: productsCount } = await supabase
          .from('marketplace_products')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true);

        // Fetch active services
        const { count: servicesCount } = await supabase
          .from('marketplace_services')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true);

        setStats({
          totalUsers: usersCount || 0,
          activeWorkers: workersCount || 0,
          availableLandPlots: landPlotsCount || 0,
          totalRevenue,
          activeProducts: productsCount || 0,
          activeServices: servicesCount || 0
        });
      } catch (error) {
        console.error('Error fetching overview stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const overviewCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toString(),
      icon: Users,
      description: 'Registered platform users',
      color: 'text-blue-600'
    },
    {
      title: 'Active Workers',
      value: stats.activeWorkers.toString(),
      icon: UserCheck,
      description: 'Available for hire',
      color: 'text-green-600'
    },
    {
      title: 'Available Land Plots',
      value: stats.availableLandPlots.toString(),
      icon: MapPin,
      description: 'Ready for rental',
      color: 'text-orange-600'
    },
    {
      title: 'Platform Revenue',
      value: formatTshAmount(stats.totalRevenue),
      icon: DollarSign,
      description: 'Total commission earned',
      color: 'text-emerald-600'
    },
    {
      title: 'Active Products',
      value: stats.activeProducts.toString(),
      icon: ShoppingCart,
      description: 'Available in marketplace',
      color: 'text-purple-600'
    },
    {
      title: 'Active Services',
      value: stats.activeServices.toString(),
      icon: Briefcase,
      description: 'Service offerings',
      color: 'text-indigo-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Platform Overview</h3>
        <p className="text-gray-600">Key metrics and statistics for the platform</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {overviewCards.map((card) => (
          <Card key={card.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {card.value}
              </div>
              <p className="text-xs text-gray-500">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;
