
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Wheat, MapPin, Sparkles } from 'lucide-react';

interface OnboardingStep2Props {
  data: {
    preferredCrop: string;
    farmLocation: string;
    farmSize: string;
    aiRecommendations?: string;
  };
  personalInfo: {
    country: string;
    experience: string;
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const OnboardingStep2: React.FC<OnboardingStep2Props> = ({ data, personalInfo, onUpdate, onNext, onPrevious }) => {
  const [formData, setFormData] = useState(data);
  const [aiRecommendations, setAiRecommendations] = useState('');

  const crops = [
    'Maize (Corn)', 'Coffee', 'Tea', 'Rice', 'Beans', 'Cassava',
    'Sweet Potatoes', 'Bananas', 'Tomatoes', 'Onions', 'Cabbage',
    'Carrots', 'Avocados', 'Mangoes', 'Sunflower'
  ];

  const locations = [
    'Arusha', 'Dar es Salaam', 'Dodoma', 'Mwanza', 'Mbeya',
    'Tanga', 'Morogoro', 'Kilimanjaro', 'Tabora', 'Iringa',
    'Other Location'
  ];

  const farmSizes = [
    'Less than 1 acre', '1-5 acres', '5-10 acres', '10-25 acres',
    '25-50 acres', '50-100 acres', 'More than 100 acres'
  ];

  const handleChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate({ ...newData, aiRecommendations });
  };

  // Generate AI recommendations based on inputs
  useEffect(() => {
    if (formData.preferredCrop && formData.farmLocation && personalInfo.country) {
      const recommendations = generateAIRecommendations();
      setAiRecommendations(recommendations);
      onUpdate({ ...formData, aiRecommendations: recommendations });
    }
  }, [formData.preferredCrop, formData.farmLocation, personalInfo.country]);

  const generateAIRecommendations = () => {
    const { preferredCrop, farmLocation } = formData;
    const { country, experience } = personalInfo;
    
    let recommendations = `Based on your selection of ${preferredCrop} in ${farmLocation}, ${country}:\n\n`;
    
    // Crop-specific recommendations
    if (preferredCrop.includes('Coffee')) {
      recommendations += `• Coffee grows best at altitudes of 1,200-2,000m with well-drained soil\n`;
      recommendations += `• Consider arabica varieties for premium market prices\n`;
      recommendations += `• Intercropping with shade trees can improve yield and sustainability\n`;
    } else if (preferredCrop.includes('Maize')) {
      recommendations += `• Choose drought-resistant varieties for reliable harvests\n`;
      recommendations += `• Plant at the beginning of rainy season for optimal growth\n`;
      recommendations += `• Consider value-addition through processing for higher profits\n`;
    } else if (preferredCrop.includes('Tomatoes')) {
      recommendations += `• Greenhouse farming can triple your yield and extend seasons\n`;
      recommendations += `• Focus on disease-resistant varieties to reduce crop loss\n`;
      recommendations += `• Direct market access can increase profits by 40-60%\n`;
    }
    
    // Location-specific advice
    if (farmLocation === 'Arusha' || farmLocation === 'Kilimanjaro') {
      recommendations += `\n• Your region's climate is excellent for high-value crops\n`;
      recommendations += `• Consider export market opportunities\n`;
    }
    
    // Experience-based advice
    if (experience === 'beginner') {
      recommendations += `\n• Start with a smaller plot to gain experience\n`;
      recommendations += `• Consider mentorship from local successful farmers\n`;
    }
    
    return recommendations;
  };

  const isValid = formData.preferredCrop && formData.farmLocation && formData.farmSize;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <Wheat className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Farming Preferences</h2>
        <p className="text-gray-600">Let's choose the best crops and location for your farming goals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="preferredCrop">Preferred Crop *</Label>
          <Select value={formData.preferredCrop} onValueChange={(value) => handleChange('preferredCrop', value)}>
            <SelectTrigger className="border-gray-200 focus:border-green-400">
              <SelectValue placeholder="Choose your main crop" />
            </SelectTrigger>
            <SelectContent>
              {crops.map((crop) => (
                <SelectItem key={crop} value={crop}>{crop}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="farmLocation">Farm Location *</Label>
          <Select value={formData.farmLocation} onValueChange={(value) => handleChange('farmLocation', value)}>
            <SelectTrigger className="border-gray-200 focus:border-green-400">
              <SelectValue placeholder="Select farming region" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="farmSize">Farm Size *</Label>
          <Select value={formData.farmSize} onValueChange={(value) => handleChange('farmSize', value)}>
            <SelectTrigger className="border-gray-200 focus:border-green-400">
              <SelectValue placeholder="Select your farm size" />
            </SelectTrigger>
            <SelectContent>
              {farmSizes.map((size) => (
                <SelectItem key={size} value={size}>{size}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {aiRecommendations && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800">AI Recommendations</span>
            </div>
            <div className="text-sm text-green-700 whitespace-pre-line">
              {aiRecommendations}
            </div>
          </CardContent>
        </Card>
      )}

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
          className="bg-green-600 hover:bg-green-700 text-white px-8"
        >
          Next: Investment Planning
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStep2;
