
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OnboardingData } from '@/pages/Onboarding';
import { User, Wheat, TrendingUp, CheckCircle } from 'lucide-react';

interface OnboardingPreviewProps {
  data: OnboardingData;
  onComplete: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

const OnboardingPreview: React.FC<OnboardingPreviewProps> = ({ data, onComplete, onPrevious, isLoading }) => {
  const { personalInfo, farmingInfo, investmentInfo } = data;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Review Your Information</h2>
        <p className="text-gray-600">Please review your details before completing the onboarding process</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Information */}
        <Card className="border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <User className="h-5 w-5" />
              <span>Personal Info</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="font-medium text-gray-700">Name:</span>
              <p className="text-gray-600">{personalInfo.fullName}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Country:</span>
              <p className="text-gray-600">{personalInfo.country}</p>
            </div>
            {personalInfo.phone && (
              <div>
                <span className="font-medium text-gray-700">Phone:</span>
                <p className="text-gray-600">{personalInfo.phone}</p>
              </div>
            )}
            <div>
              <span className="font-medium text-gray-700">Experience:</span>
              <Badge variant="secondary" className="mt-1">
                {personalInfo.experience.charAt(0).toUpperCase() + personalInfo.experience.slice(1)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Farming Information */}
        <Card className="border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-green-800">
              <Wheat className="h-5 w-5" />
              <span>Farming Setup</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="font-medium text-gray-700">Crop:</span>
              <p className="text-gray-600">{farmingInfo.preferredCrop}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Location:</span>
              <p className="text-gray-600">{farmingInfo.farmLocation}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Farm Size:</span>
              <Badge variant="outline" className="mt-1">
                {farmingInfo.farmSize}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Investment Information */}
        <Card className="border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-purple-800">
              <TrendingUp className="h-5 w-5" />
              <span>Investment Plan</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="font-medium text-gray-700">Budget:</span>
              <Badge variant="default" className="mt-1 bg-purple-600">
                {investmentInfo.budget}
              </Badge>
            </div>
            <div>
              <span className="font-medium text-gray-700">Goals:</span>
              <p className="text-gray-600 text-sm line-clamp-3">
                {investmentInfo.investmentGoals}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations Summary */}
      {farmingInfo.aiRecommendations && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-800">Your Personalized Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-green-700 whitespace-pre-line max-h-32 overflow-y-auto">
              {farmingInfo.aiRecommendations}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Market Analysis Summary */}
      {investmentInfo.marketAnalysis && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-800">Market Analysis Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-blue-700 whitespace-pre-line max-h-32 overflow-y-auto">
              {investmentInfo.marketAnalysis}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Ready to Start Your Farming Journey?</h3>
        <p className="text-gray-600 mb-4">
          You're all set! Our platform will now customize your experience based on your preferences. 
          You can always update this information in your profile settings.
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
          <span>✓ Personalized dashboard</span>
          <span>✓ Market insights</span>
          <span>✓ Expert recommendations</span>
          <span>✓ Progress tracking</span>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isLoading}
          className="border-gray-200 text-gray-700 hover:bg-gray-50"
        >
          Previous
        </Button>
        <Button
          onClick={onComplete}
          disabled={isLoading}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8"
        >
          {isLoading ? 'Setting up your account...' : "Let's Get Started!"}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingPreview;
