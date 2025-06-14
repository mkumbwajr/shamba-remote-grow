
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import OnboardingStep1 from '@/components/onboarding/OnboardingStep1';
import OnboardingStep2 from '@/components/onboarding/OnboardingStep2';
import OnboardingStep3 from '@/components/onboarding/OnboardingStep3';
import OnboardingPreview from '@/components/onboarding/OnboardingPreview';
import { Progress } from '@/components/ui/progress';
import { Leaf } from 'lucide-react';

export interface OnboardingData {
  personalInfo: {
    fullName: string;
    country: string;
    phone: string;
    experience: string;
  };
  farmingInfo: {
    preferredCrop: string;
    farmLocation: string;
    farmSize: string;
    aiRecommendations?: string;
  };
  investmentInfo: {
    budget: string;
    investmentGoals: string;
    marketAnalysis?: string;
  };
}

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    personalInfo: {
      fullName: '',
      country: '',
      phone: '',
      experience: '',
    },
    farmingInfo: {
      preferredCrop: '',
      farmLocation: '',
      farmSize: '',
    },
    investmentInfo: {
      budget: '',
      investmentGoals: '',
    },
  });

  const updateOnboardingData = (step: keyof OnboardingData, data: any) => {
    setOnboardingData(prev => ({
      ...prev,
      [step]: { ...prev[step], ...data }
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      // Wait a bit and retry getting user if not found initially
      let user = null;
      let attempts = 0;
      const maxAttempts = 3;

      while (!user && attempts < maxAttempts) {
        const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
        if (userError) {
          console.warn('Error getting user:', userError);
        }
        user = currentUser;
        
        if (!user && attempts < maxAttempts - 1) {
          // Wait 1 second before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        attempts++;
      }

      if (!user) {
        toast.error('Authentication session expired. Please sign in again.');
        navigate('/auth');
        return;
      }

      console.log('User found:', user.id);

      // Update the user's profile with onboarding data
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: onboardingData.personalInfo.fullName,
          country: onboardingData.personalInfo.country,
          phone: onboardingData.personalInfo.phone,
          farming_experience: onboardingData.personalInfo.experience,
          preferred_crop: onboardingData.farmingInfo.preferredCrop,
          farm_location: onboardingData.farmingInfo.farmLocation,
          farm_size: onboardingData.farmingInfo.farmSize,
          investment_budget: onboardingData.investmentInfo.budget,
          farming_goals: onboardingData.investmentInfo.investmentGoals,
        });

      if (error) {
        console.error('Profile update error:', error);
        throw error;
      }

      // Update user metadata to mark onboarding as complete
      const { error: updateError } = await supabase.auth.updateUser({
        data: { 
          is_new_user: false,
          onboarding_completed: true 
        }
      });

      if (updateError) {
        console.warn('Failed to update user metadata:', updateError);
        // Don't throw here as the profile was saved successfully
      }

      toast.success('Onboarding completed successfully!');
      
      // Check if email is verified, if not, show appropriate message
      const isEmailVerified = user.email_confirmed_at !== null;
      if (!isEmailVerified) {
        toast.info('Please verify your email to access all features');
      }
      
      navigate('/');
    } catch (error: any) {
      console.error('Onboarding completion error:', error);
      toast.error('Failed to complete onboarding: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    'Personal Information',
    'Farming Preferences',
    'Investment Planning',
    'Review & Complete'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Welcome to Bwana Shamba
          </h1>
          <p className="text-green-600 text-lg">
            Let's set up your farming journey in just a few steps
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-green-600 mb-2">
            <span>Step {currentStep} of 4: {steps[currentStep - 1]}</span>
            <span>{Math.round((currentStep / 4) * 100)}% Complete</span>
          </div>
          <Progress value={(currentStep / 4) * 100} className="h-3" />
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          {currentStep === 1 && (
            <OnboardingStep1
              data={onboardingData.personalInfo}
              onUpdate={(data) => updateOnboardingData('personalInfo', data)}
              onNext={handleNext}
            />
          )}
          
          {currentStep === 2 && (
            <OnboardingStep2
              data={onboardingData.farmingInfo}
              personalInfo={onboardingData.personalInfo}
              onUpdate={(data) => updateOnboardingData('farmingInfo', data)}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          )}
          
          {currentStep === 3 && (
            <OnboardingStep3
              data={onboardingData.investmentInfo}
              farmingInfo={onboardingData.farmingInfo}
              onUpdate={(data) => updateOnboardingData('investmentInfo', data)}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          )}
          
          {currentStep === 4 && (
            <OnboardingPreview
              data={onboardingData}
              onComplete={handleComplete}
              onPrevious={handlePrevious}
              isLoading={isLoading}
            />
          )}
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index + 1 <= currentStep
                  ? 'bg-green-600'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
