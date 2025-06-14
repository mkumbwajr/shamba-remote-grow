
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';

// Mock data for global crop prices over the last 7 days
const generateMockData = () => {
  const crops = ['Maize', 'Rice', 'Beans', 'Coffee', 'Tea'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return days.map(day => {
    const data: any = { day };
    crops.forEach(crop => {
      // Generate realistic price fluctuations
      const basePrice = {
        'Maize': 250,
        'Rice': 180,
        'Beans': 320,
        'Coffee': 450,
        'Tea': 380
      }[crop] || 200;
      
      data[crop] = basePrice + (Math.random() - 0.5) * 50;
    });
    return data;
  });
};

const chartConfig = {
  Maize: {
    label: "Maize",
    color: "#22c55e",
  },
  Rice: {
    label: "Rice", 
    color: "#3b82f6",
  },
  Beans: {
    label: "Beans",
    color: "#f59e0b",
  },
  Coffee: {
    label: "Coffee",
    color: "#8b5cf6",
  },
  Tea: {
    label: "Tea",
    color: "#ef4444",
  },
};

const MarketIntelligenceChart: React.FC = () => {
  const { t } = useLanguage();
  const data = generateMockData();

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">
          Global Crop Prices - Last 7 Days (USD/Ton)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              {Object.keys(chartConfig).map((crop) => (
                <Line
                  key={crop}
                  type="monotone"
                  dataKey={crop}
                  stroke={chartConfig[crop as keyof typeof chartConfig].color}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(chartConfig).map(([crop, config]) => {
            const latestPrice = data[data.length - 1][crop];
            const previousPrice = data[data.length - 2][crop];
            const change = ((latestPrice - previousPrice) / previousPrice) * 100;
            
            return (
              <div key={crop} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-600">{config.label}</div>
                <div className="text-lg font-bold text-gray-800">
                  ${latestPrice.toFixed(0)}
                </div>
                <div className={`text-xs ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {change >= 0 ? '↗' : '↘'} {Math.abs(change).toFixed(1)}%
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketIntelligenceChart;
