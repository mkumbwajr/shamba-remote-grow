
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { formatTshAmount } from '@/utils/currency';

interface RevenueData {
  month: string;
  service_type: string;
  transaction_count: number;
  total_revenue: number;
  total_commission: number;
  avg_transaction_value: number;
}

interface ServiceChargeData {
  id: string;
  amount: number;
  commission_amount: number;
  service_type: string;
  status: string;
  created_at: string;
  description: string;
}

const AdminRevenue = () => {
  const [revenueAnalytics, setRevenueAnalytics] = useState<RevenueData[]>([]);
  const [serviceCharges, setServiceCharges] = useState<ServiceChargeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        // Fetch revenue analytics
        const { data: analyticsData, error: analyticsError } = await supabase
          .from('revenue_analytics')
          .select('*')
          .limit(12);

        if (analyticsError) {
          console.error('Error fetching revenue analytics:', analyticsError);
        } else {
          setRevenueAnalytics(analyticsData || []);
        }

        // Fetch recent service charges
        const { data: chargesData, error: chargesError } = await supabase
          .from('service_charges')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20);

        if (chargesError) {
          console.error('Error fetching service charges:', chargesError);
        } else {
          setServiceCharges(chargesData || []);
        }
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, []);

  // Prepare chart data
  const monthlyRevenueData = revenueAnalytics.reduce((acc: any[], item) => {
    const monthKey = new Date(item.month).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const existing = acc.find(a => a.month === monthKey);
    
    if (existing) {
      existing.revenue += item.total_commission;
      existing.transactions += item.transaction_count;
    } else {
      acc.push({
        month: monthKey,
        revenue: item.total_commission,
        transactions: item.transaction_count
      });
    }
    
    return acc;
  }, []);

  // Prepare service type distribution for pie chart
  const serviceTypeData = revenueAnalytics.reduce((acc: any[], item) => {
    const existing = acc.find(a => a.name === item.service_type);
    
    if (existing) {
      existing.value += item.total_commission;
    } else {
      acc.push({
        name: item.service_type.replace('_', ' '),
        value: item.total_commission
      });
    }
    
    return acc;
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const totalRevenue = serviceCharges.reduce((sum, charge) => sum + (charge.commission_amount || 0), 0);
  const totalTransactions = serviceCharges.length;
  const avgTransactionValue = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Revenue Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-600">Total Commission</div>
            <div className="text-2xl font-bold text-green-600">
              {formatTshAmount(totalRevenue)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-600">Total Transactions</div>
            <div className="text-2xl font-bold text-blue-600">
              {totalTransactions}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-600">Avg Commission/Transaction</div>
            <div className="text-2xl font-bold text-purple-600">
              {formatTshAmount(avgTransactionValue)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    name === 'revenue' ? formatTshAmount(value) : value,
                    name === 'revenue' ? 'Commission' : 'Transactions'
                  ]}
                />
                <Bar dataKey="revenue" fill="#059669" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Service Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {serviceTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatTshAmount(value)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {serviceCharges.map((charge) => (
                  <TableRow key={charge.id}>
                    <TableCell>
                      <span className="capitalize">
                        {charge.service_type.replace('_', ' ')}
                      </span>
                    </TableCell>
                    <TableCell>
                      {charge.description || 'No description'}
                    </TableCell>
                    <TableCell>
                      {formatTshAmount(charge.amount)}
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-green-600">
                        {formatTshAmount(charge.commission_amount)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`capitalize px-2 py-1 rounded-full text-xs ${
                        charge.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : charge.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {charge.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(charge.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRevenue;
