
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, TrendingDown, Target } from 'lucide-react';

const InvestmentOverview = () => {
  const overviewStats = [
    {
      title: 'Total Investment',
      value: '$12,500',
      change: '+15% from last month',
      icon: DollarSign,
      trend: 'up'
    },
    {
      title: 'Total Spent',
      value: '$8,750',
      change: '70% of investment used',
      icon: TrendingDown,
      trend: 'neutral'
    },
    {
      title: 'Available Balance',
      value: '$3,750',
      change: '30% remaining',
      icon: Target,
      trend: 'neutral'
    },
    {
      title: 'ROI Projection',
      value: '24%',
      change: 'Expected annual return',
      icon: TrendingUp,
      trend: 'up'
    }
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {overviewStats.map((stat) => (
        <Card key={stat.title} className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 ${
              stat.trend === 'up' ? 'text-green-500' : 
              stat.trend === 'down' ? 'text-red-500' : 'text-blue-500'
            }`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <p className="text-xs text-gray-500">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default InvestmentOverview;
