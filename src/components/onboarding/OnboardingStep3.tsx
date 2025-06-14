
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

interface OnboardingStep3Props {
  data: {
    budget: string;
    investmentGoals: string;
    marketAnalysis?: string;
  };
  farmingInfo: {
    preferredCrop: string;
    farmSize: string;
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const OnboardingStep3: React.FC<OnboardingStep3Props> = ({ data, farmingInfo, onUpdate, onNext, onPrevious }) => {
  const [formData, setFormData] = useState(data);
  const [marketAnalysis, setMarketAnalysis] = useState('');

  const budgetRanges = [
    'Under $1,000', '$1,000 - $5,000', '$5,000 - $10,000',
    '$10,000 - $25,000', '$25,000 - $50,000', 'Over $50,000'
  ];

  const handleChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate({ ...newData, marketAnalysis });
  };

  // Generate market analysis based on inputs
  useEffect(() => {
    if (formData.budget && farmingInfo.preferredCrop) {
      const analysis = generateMarketAnalysis();
      setMarketAnalysis(analysis);
      onUpdate({ ...formData, marketAnalysis: analysis });
    }
  }, [formData.budget, farmingInfo.preferredCrop, farmingInfo.farmSize]);

  const generateMarketAnalysis = () => {
    const { preferredCrop, farmSize } = farmingInfo;
    const { budget } = formData;
    
    let analysis = `Market Analysis for ${preferredCrop}:\n\n`;
    
    // Market trends
    if (preferredCrop.includes('Coffee')) {
      analysis += `📈 Market Trends:\n`;
      analysis += `• Global coffee demand growing 2-3% annually\n`;
      analysis += `• Premium coffee prices: $2.50-4.50/kg\n`;
      analysis += `• Export potential to Europe and North America\n\n`;
    } else if (preferredCrop.includes('Avocados')) {
      analysis += `📈 Market Trends:\n`;
      analysis += `• Avocado demand surging globally (+8% yearly)\n`;
      analysis += `• Premium export price: $1.50-3.00/kg\n`;
      analysis += `• Year-round market opportunity\n\n`;
    } else if (preferredCrop.includes('Maize')) {
      analysis += `📈 Market Trends:\n`;
      analysis += `• Stable local demand for food security\n`;
      analysis += `• Current price: $0.40-0.60/kg\n`;
      analysis += `• Value-addition opportunities available\n\n`;
    }
    
    // Investment breakdown
    analysis += `💰 Investment Breakdown (${budget}):\n`;
    const budgetNum = getBudgetNumber(budget);
    
    if (budgetNum < 5000) {
      analysis += `• Seeds & inputs: 40% ($${Math.round(budgetNum * 0.4)})\n`;
      analysis += `• Tools & equipment: 30% ($${Math.round(budgetNum * 0.3)})\n`;
      analysis += `• Labor costs: 20% ($${Math.round(budgetNum * 0.2)})\n`;
      analysis += `• Contingency: 10% ($${Math.round(budgetNum * 0.1)})\n\n`;
    } else {
      analysis += `• Infrastructure: 35% ($${Math.round(budgetNum * 0.35)})\n`;
      analysis += `• Seeds & inputs: 25% ($${Math.round(budgetNum * 0.25)})\n`;
      analysis += `• Equipment: 25% ($${Math.round(budgetNum * 0.25)})\n`;
      analysis += `• Working capital: 15% ($${Math.round(budgetNum * 0.15)})\n\n`;
    }
    
    // ROI projection
    analysis += `📊 Projected Returns:\n`;
    const sizeMultiplier = getSizeMultiplier(farmSize);
    const expectedRevenue = budgetNum * 1.5 * sizeMultiplier;
    
    analysis += `• First year revenue: $${Math.round(expectedRevenue)}\n`;
    analysis += `• Break-even period: 8-12 months\n`;
    analysis += `• 3-year projected ROI: ${Math.round((expectedRevenue * 3 - budgetNum) / budgetNum * 100)}%\n`;
    
    return analysis;
  };

  const getBudgetNumber = (budget: string): number => {
    if (budget.includes('1,000 - 5,000')) return 3000;
    if (budget.includes('5,000 - 10,000')) return 7500;
    if (budget.includes('10,000 - 25,000')) return 17500;
    if (budget.includes('25,000 - 50,000')) return 37500;
    if (budget.includes('Over 50,000')) return 75000;
    return 500;
  };

  const getSizeMultiplier = (size: string): number => {
    if (size.includes('1-5 acres')) return 1.2;
    if (size.includes('5-10 acres')) return 1.5;
    if (size.includes('10-25 acres')) return 2.0;
    if (size.includes('25-50 acres')) return 2.5;
    return 1.0;
  };

  const isValid = formData.budget && formData.investmentGoals;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <TrendingUp className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Investment Planning</h2>
        <p className="text-gray-600">Let's plan your investment strategy and analyze market opportunities</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <Label htmlFor="budget">Initial Investment Budget *</Label>
          <Select value={formData.budget} onValueChange={(value) => handleChange('budget', value)}>
            <SelectTrigger className="border-gray-200 focus:border-blue-400">
              <SelectValue placeholder="Select your investment budget" />
            </SelectTrigger>
            <SelectContent>
              {budgetRanges.map((range) => (
                <SelectItem key={range} value={range}>{range}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="investmentGoals">Investment Goals & Timeline *</Label>
          <Textarea
            id="investmentGoals"
            value={formData.investmentGoals}
            onChange={(e) => handleChange('investmentGoals', e.target.value)}
            placeholder="Describe your investment goals, expected returns, and timeline (e.g., 'Generate monthly income within 6 months, target 20% annual ROI')"
            className="border-gray-200 focus:border-blue-400 min-h-[100px]"
          />
        </div>
      </div>

      {marketAnalysis && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <BarChart3 className="h-5 w-5" />
              <span>Market Analysis & Investment Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-blue-700 whitespace-pre-line">
              {marketAnalysis}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <DollarSign className="h-5 w-5 text-yellow-600" />
          <span className="font-medium text-yellow-800">Investment Tip</span>
        </div>
        <p className="text-sm text-yellow-700">
          Start with a conservative budget and scale up based on initial results. 
          Our platform provides ongoing market insights and connects you with financing options as you grow.
        </p>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          className="border-gray-200 text-gray-700 hover:bg-gray-50"
        >
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={!isValid}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
        >
          Next: Review & Complete
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStep3;
