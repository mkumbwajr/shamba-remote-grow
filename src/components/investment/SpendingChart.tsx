
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

const SpendingChart = () => {
  const spendingData = [
    { month: 'Jan', spending: 1200, investment: 2000 },
    { month: 'Feb', spending: 1800, investment: 2500 },
    { month: 'Mar', spending: 1500, investment: 2200 },
    { month: 'Apr', spending: 2200, investment: 3000 },
    { month: 'May', spending: 1900, investment: 2800 },
    { month: 'Jun', spending: 2400, investment: 3200 }
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
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
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
