
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Leaf, MapPin, Users, TrendingUp } from 'lucide-react';

interface UserData {
  name: string;
  country: string;
  preferredCrop: string;
  experience: string;
  budget: string;
}

interface UserOnboardingProps {
  onComplete: (userData: UserData) => void;
}

const UserOnboarding: React.FC<UserOnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    country: '',
    preferredCrop: '',
    experience: '',
    budget: ''
  });

  const countries = [
    'Kenya', 'Uganda', 'Rwanda', 'Burundi', 'South Sudan', 'Ethiopia', 
    'Somalia', 'Democratic Republic of Congo', 'United States', 'United Kingdom',
    'Canada', 'Australia', 'Germany', 'France', 'Netherlands', 'Other'
  ];

  const crops = [
    'Maize (Corn)', 'Coffee', 'Tea', 'Rice', 'Beans', 'Cassava', 
    'Sweet Potatoes', 'Bananas', 'Tomatoes', 'Onions', 'Cabbage',
    'Carrots', 'Avocados', 'Mangoes', 'Pineapples'
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete(userData);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateUserData = (field: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return userData.name.trim() !== '';
      case 2: return userData.country !== '';
      case 3: return userData.preferredCrop !== '';
      case 4: return userData.experience !== '' && userData.budget !== '';
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-50 via-crop-50 to-earth-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-gradient-to-br from-forest-600 to-crop-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-forest-800 mb-2">Welcome to Bwana Shamba AI</h1>
          <p className="text-forest-600">Farm remotely from anywhere in the world, starting with Tanzania</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-forest-600 mb-2">
            <span>Step {step} of 4</span>
            <span>{Math.round((step / 4) * 100)}% Complete</span>
          </div>
          <Progress value={(step / 4) * 100} className="h-2" />
        </div>

        <Card className="bg-white border-forest-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-forest-800">
              {step === 1 && "Let's get to know you"}
              {step === 2 && "Where are you from?"}
              {step === 3 && "What would you like to grow?"}
              {step === 4 && "Tell us about your farming goals"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "We'll personalize your farming experience"}
              {step === 2 && "This helps us understand your background"}
              {step === 3 && "We'll match you with the best farming opportunities"}
              {step === 4 && "Help us recommend the right options for you"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={userData.name}
                    onChange={(e) => updateUserData('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="border-forest-200 focus:border-forest-400"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Country of Origin</Label>
                  <Select value={userData.country} onValueChange={(value) => updateUserData('country', value)}>
                    <SelectTrigger className="border-forest-200 focus:border-forest-400">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="bg-crop-50 border border-crop-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-5 w-5 text-crop-600" />
                    <span className="font-medium text-crop-800">Why we ask</span>
                  </div>
                  <p className="text-sm text-crop-700">
                    Understanding your location helps us provide relevant market insights and connect you with familiar crops.
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Preferred Crop Type</Label>
                  <Select value={userData.preferredCrop} onValueChange={(value) => updateUserData('preferredCrop', value)}>
                    <SelectTrigger className="border-forest-200 focus:border-forest-400">
                      <SelectValue placeholder="Choose a crop to start with" />
                    </SelectTrigger>
                    <SelectContent>
                      {crops.map((crop) => (
                        <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="bg-forest-50 border border-forest-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Leaf className="h-5 w-5 text-forest-600" />
                    <span className="font-medium text-forest-800">AI Matching</span>
                  </div>
                  <p className="text-sm text-forest-700">
                    Our AI will suggest the best farming locations and techniques for your chosen crop based on soil, climate, and market conditions.
                  </p>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Farming Experience</Label>
                  <Select value={userData.experience} onValueChange={(value) => updateUserData('experience', value)}>
                    <SelectTrigger className="border-forest-200 focus:border-forest-400">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner - New to farming</SelectItem>
                      <SelectItem value="intermediate">Intermediate - Some farming knowledge</SelectItem>
                      <SelectItem value="experienced">Experienced - Familiar with farming</SelectItem>
                      <SelectItem value="expert">Expert - Professional farming background</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Initial Investment Budget</Label>
                  <Select value={userData.budget} onValueChange={(value) => updateUserData('budget', value)}>
                    <SelectTrigger className="border-forest-200 focus:border-forest-400">
                      <SelectValue placeholder="Select your budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-1000">Under $1,000</SelectItem>
                      <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                      <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
                      <SelectItem value="over-25000">Over $25,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="bg-earth-50 border border-earth-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-earth-600" />
                    <span className="font-medium text-earth-800">Smart Recommendations</span>
                  </div>
                  <p className="text-sm text-earth-700">
                    We'll recommend farm sizes, crop varieties, and investment strategies that match your budget and experience level.
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={step === 1}
                className="border-forest-200 text-forest-700 hover:bg-forest-50"
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="bg-forest-600 hover:bg-forest-700 text-white"
              >
                {step === 4 ? 'Start Farming' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="text-center">
            <div className="h-12 w-12 bg-forest-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Leaf className="h-6 w-6 text-forest-600" />
            </div>
            <h3 className="font-medium text-forest-800 mb-1">AI Crop Matching</h3>
            <p className="text-sm text-forest-600">Smart recommendations for optimal yields</p>
          </div>
          <div className="text-center">
            <div className="h-12 w-12 bg-crop-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <MapPin className="h-6 w-6 text-crop-600" />
            </div>
            <h3 className="font-medium text-forest-800 mb-1">Remote Monitoring</h3>
            <p className="text-sm text-forest-600">Real-time updates from your farms</p>
          </div>
          <div className="text-center">
            <div className="h-12 w-12 bg-earth-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-earth-600" />
            </div>
            <h3 className="font-medium text-forest-800 mb-1">Expert Workers</h3>
            <p className="text-sm text-forest-600">Vetted agricultural professionals</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOnboarding;
