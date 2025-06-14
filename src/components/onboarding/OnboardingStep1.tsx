
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, MapPin } from 'lucide-react';

interface OnboardingStep1Props {
  data: {
    fullName: string;
    country: string;
    phone: string;
    experience: string;
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
}

const OnboardingStep1: React.FC<OnboardingStep1Props> = ({ data, onUpdate, onNext }) => {
  const [formData, setFormData] = useState(data);

  const countries = [
    'Tanzania', 'Kenya', 'Uganda', 'Rwanda', 'Burundi', 'Ethiopia',
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Other'
  ];

  const experienceLevels = [
    'beginner', 'intermediate', 'experienced', 'expert'
  ];

  const handleChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const isValid = formData.fullName && formData.country && formData.experience;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <User className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Personal Information</h2>
        <p className="text-gray-600">Tell us a bit about yourself to personalize your experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="Enter your full name"
            className="border-gray-200 focus:border-green-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Select value={formData.country} onValueChange={(value) => handleChange('country', value)}>
            <SelectTrigger className="border-gray-200 focus:border-green-400">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="Enter your phone number"
            className="border-gray-200 focus:border-green-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Farming Experience *</Label>
          <Select value={formData.experience} onValueChange={(value) => handleChange('experience', value)}>
            <SelectTrigger className="border-gray-200 focus:border-green-400">
              <SelectValue placeholder="Select your experience level" />
            </SelectTrigger>
            <SelectContent>
              {experienceLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <MapPin className="h-5 w-5 text-green-600" />
          <span className="font-medium text-green-800">Why we ask</span>
        </div>
        <p className="text-sm text-green-700">
          This information helps us provide relevant market insights, connect you with local opportunities, 
          and recommend the best farming practices for your region and experience level.
        </p>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onNext}
          disabled={!isValid}
          className="bg-green-600 hover:bg-green-700 text-white px-8"
        >
          Next: Farming Preferences
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStep1;
