import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Leaf } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    country: '',
    phone: '',
    preferredCrop: '',
    farmingExperience: '',
    farmSize: ''
  });

  const countries = [
    'Kenya', 'Tanzania', 'Uganda', 'Rwanda', 'Burundi', 'Ethiopia', 'South Sudan'
  ];

  const crops = [
    'Maize', 'Rice', 'Beans', 'Tomatoes', 'Onions', 'Carrots', 'Cabbage', 'Coffee', 'Tea'
  ];

  const experienceLevels = [
    'Beginner (0-2 years)', 'Intermediate (3-5 years)', 'Advanced (6-10 years)', 'Expert (10+ years)'
  ];

  const farmSizes = [
    'Small (0-2 acres)', 'Medium (3-10 acres)', 'Large (11-50 acres)', 'Very Large (50+ acres)'
  ];

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Successfully logged in!');
        navigate('/');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (signupData.password !== signupData.confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: signupData.fullName,
            country: signupData.country,
          }
        }
      });

      if (error) {
        toast.error(error.message);
      } else {
        // Create profile with additional information
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: user.id,
              full_name: signupData.fullName,
              country: signupData.country,
              phone: signupData.phone,
              preferred_crop: signupData.preferredCrop,
              farming_experience: signupData.farmingExperience,
              farm_size: signupData.farmSize,
            });

          if (profileError) {
            console.error('Profile creation error:', profileError);
          }
        }

        toast.success('Account created successfully! Please check your email to verify your account.');
        setIsLogin(true);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-50 via-crop-50 to-earth-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-end mb-4">
            <LanguageToggle />
          </div>
          <div className="h-16 w-16 bg-gradient-to-br from-forest-600 to-crop-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Leaf className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-forest-800">Bwana Shamba</h1>
          <p className="text-forest-600 mt-2">{t('remoteFarmingPlatform')}</p>
        </div>

        <Card className="bg-white border-forest-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-forest-800">
              {isLogin ? t('welcomeBack') : t('joinBwanaShamba')}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? t('signInToAccess') 
                : t('createAccountToStart')
              }
            </CardDescription>
          </CardHeader>

          <CardContent>
            {isLogin ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('enterEmail')}
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{t('password')}</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={t('enterPassword')}
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-forest-600 hover:bg-forest-700"
                  disabled={isLoading}
                >
                  {isLoading ? t('signingIn') : t('signIn')}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t('fullName')}</Label>
                    <Input
                      id="fullName"
                      placeholder={t('yourFullName')}
                      value={signupData.fullName}
                      onChange={(e) => setSignupData(prev => ({ ...prev, fullName: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">{t('country')}</Label>
                    <Select 
                      value={signupData.country} 
                      onValueChange={(value) => setSignupData(prev => ({ ...prev, country: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectCountry')} />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {t(`countries.${country}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('enterEmail')}
                    value={signupData.email}
                    onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t('phone')}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t('yourPhoneNumber')}
                    value={signupData.phone}
                    onChange={(e) => setSignupData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="preferredCrop">{t('preferredCrop')}</Label>
                    <Select 
                      value={signupData.preferredCrop} 
                      onValueChange={(value) => setSignupData(prev => ({ ...prev, preferredCrop: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectCrop')} />
                      </SelectTrigger>
                      <SelectContent>
                        {crops.map((crop) => (
                          <SelectItem key={crop} value={crop}>
                            {t(`crops.${crop}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="farmSize">{t('farmSize')}</Label>
                    <Select 
                      value={signupData.farmSize} 
                      onValueChange={(value) => setSignupData(prev => ({ ...prev, farmSize: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectSize')} />
                      </SelectTrigger>
                      <SelectContent>
                        {farmSizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {t(`farmSizes.${size}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">{t('farmingExperience')}</Label>
                  <Select 
                    value={signupData.farmingExperience} 
                    onValueChange={(value) => setSignupData(prev => ({ ...prev, farmingExperience: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectExperience')} />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {t(`experienceLevels.${level}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">{t('password')}</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder={t('createPassword')}
                      value={signupData.password}
                      onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder={t('confirmPasswordPlaceholder')}
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-crop-600 hover:bg-crop-700"
                  disabled={isLoading}
                >
                  {isLoading ? t('creatingAccount') : t('createAccount')}
                </Button>
              </form>
            )}

            <div className="mt-6 text-center">
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-forest-600 hover:text-forest-700"
              >
                {isLogin ? t('dontHaveAccount') : t('alreadyHaveAccount')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
