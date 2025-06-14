
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

const SpendingChart = () => {
  // Convert USD amounts to TSH (1 USD = 2500 TSH)
  const spendingData = [
    { month: 'Jan', spending: 3000000, investment: 5000000 }, // 1200 USD -> 3M TSH, 2000 USD -> 5M TSH
    { month: 'Feb', spending: 4500000, investment: 6250000 }, // 1800 USD -> 4.5M TSH, 2500 USD -> 6.25M TSH
    { month: 'Mar', spending: 3750000, investment: 5500000 }, // 1500 USD -> 3.75M TSH, 2200 USD -> 5.5M TSH
    { month: 'Apr', spending: 5500000, investment: 7500000 }, // 2200 USD -> 5.5M TSH, 3000 USD -> 7.5M TSH
    { month: 'May', spending: 4750000, investment: 7000000 }, // 1900 USD -> 4.75M TSH, 2800 USD -> 7M TSH
    { month: 'Jun', spending: 6000000, investment: 8000000 }  // 2400 USD -> 6M TSH, 3200 USD -> 8M TSH
  ];

  const chartConfig = {
    spending: {
      label: "Spending",
      color: "#ef4444",
    },
    investment: {
      label: "Investment",
      color: "#22c55e",
    },
  };

  const formatTSH = (value: number) => {
    return new Intl.NumberFormat('sw-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: 'compact',
      compactDisplay: 'short'
    }).format(value);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Investment vs Spending Trends
        </CardTitle>
        <p className="text-sm text-gray-600">Monthly comparison of investments and actual spending</p>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={spendingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatTSH} />
              <ChartTooltip 
                content={<ChartTooltipContent />} 
                formatter={(value: number) => [formatTSH(value), '']}
              />
              <Bar dataKey="investment" fill="var(--color-investment)" name="Investment" />
              <Bar dataKey="spending" fill="var(--color-spending)" name="Spending" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SpendingChart;
