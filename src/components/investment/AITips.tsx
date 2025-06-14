
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, TrendingUp, AlertTriangle, Target } from 'lucide-react';

const AITips = () => {
  const tips = [
    {
      id: 1,
      type: 'opportunity',
      title: 'Crop Diversification',
      description: 'Consider investing in beans alongside maize for better soil health and risk distribution.',
      priority: 'high',
      icon: TrendingUp
    },
    {
      id: 2,
      type: 'warning',
      title: 'Spending Alert',
      description: 'You\'ve used 70% of your budget. Consider reviewing remaining expenses.',
      priority: 'medium',
      icon: AlertTriangle
    },
    {
      id: 3,
      type: 'suggestion',
      title: 'Seasonal Timing',
      description: 'Plant maize in the next 2 weeks for optimal rainfall utilization.',
      priority: 'high',
      icon: Target
    },
    {
      id: 4,
      type: 'insight',
      title: 'Cost Optimization',
      description: 'Bulk fertilizer purchases could save you 15% on material costs.',
      priority: 'low',
      icon: Lightbulb
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'text-green-600';
      case 'warning': return 'text-red-600';
      case 'suggestion': return 'text-blue-600';
      case 'insight': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          AI Investment Tips
        </CardTitle>
        <p className="text-sm text-gray-600">Personalized recommendations based on your data</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tips.map((tip) => (
            <div key={tip.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                <tip.icon className={`h-5 w-5 mt-0.5 ${getTypeColor(tip.type)}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-gray-800">{tip.title}</h4>
                    <Badge className={`text-xs ${getPriorityColor(tip.priority)}`}>
                      {tip.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AITips;
