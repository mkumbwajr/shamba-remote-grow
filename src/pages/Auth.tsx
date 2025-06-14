import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import LanguageToggle from '@/components/LanguageToggle';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [phone, setPhone] = useState('');
  const [preferredCrop, setPreferredCrop] = useState<string | undefined>(undefined);
  const [farmSize, setFarmSize] = useState<string | undefined>(undefined);
  const [farmingExperience, setFarmingExperience] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkUser();
  }, [navigate]);

  // Using a helper to get object keys, t function expects string for object path
  const getObjectKeys = (path: string) => Object.keys(t(path, { returnObjects: true } as any) || {});

  const countries = getObjectKeys('countries');
  const crops = getObjectKeys('cropsList');
  const experienceLevels = getObjectKeys('experienceLevels');
  const farmSizes = getObjectKeys('farmSizes');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isSignUp) {
      if (password !== confirmPassword) {
        toast.error(t('confirmPassword') + ' ' + t('notProvided'));
        setIsLoading(false);
        return;
      }
      // Data for signUp options is user_metadata, handled by backend trigger
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            country: country || null, // Ensure null if undefined
            phone: phone || null,
            preferred_crop: preferredCrop || null,
            farming_experience: farmingExperience || null,
            farm_size: farmSize || null,
          },
        },
      });

      if (signUpError) {
        toast.error(signUpError.message);
      } else if (signUpData.user) {
        toast.success(t('createAccount') + ' ' + t('save') + 'd! Please check your email to verify.');
      } else if (!signUpData.session && !signUpData.user) {
        // This case can happen if email confirmation is required and already exists but not confirmed.
        // Supabase returns { data: { session: null, user: null }, error: null }
        toast.info("Please check your email to verify your account or try signing in if already verified.");
      }
    } else { // Sign In
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        toast.error(signInError.message);
      } else {
        navigate('/');
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <img src="/placeholder.svg" alt="Bwana Shamba" className="w-20 h-20 mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold text-green-700">
            {isSignUp ? t('joinBwanaShamba') : t('welcomeBack')}
          </CardTitle>
          <CardDescription>
            {isSignUp ? t('createAccountToStart') : t('signInToAccess')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input id="email" type="email" placeholder={t('enterEmail')} value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('password')}</Label>
              <Input id="password" type="password" placeholder={isSignUp ? t('createPassword') : t('enterPassword')} value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {isSignUp && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
                  <Input id="confirmPassword" type="password" placeholder={t('confirmPasswordPlaceholder')} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t('fullName')}</Label>
                  <Input id="fullName" placeholder={t('yourFullName')} value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">{t('country')}</Label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectCountry')} />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((cKey) => (
                        <SelectItem key={cKey} value={cKey}>{t(`countries.${cKey}`)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('phone')}</Label>
                  <Input id="phone" placeholder={t('yourPhoneNumber')} value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredCrop">{t('preferredCrop')}</Label>
                  <Select value={preferredCrop} onValueChange={setPreferredCrop}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectCrop')} />
                    </SelectTrigger>
                    <SelectContent>
                      {crops.map((cropKey) => (
                        <SelectItem key={cropKey} value={cropKey}>{t(`cropsList.${cropKey}`)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmSize">{t('farmSize')}</Label>
                  <Select value={farmSize} onValueChange={setFarmSize}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectSize')} />
                    </SelectTrigger>
                    <SelectContent>
                      {farmSizes.map((sizeKey) => (
                        <SelectItem key={sizeKey} value={sizeKey}>{t(`farmSizes.${sizeKey}`)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmingExperience">{t('farmingExperience')}</Label>
                  <Select value={farmingExperience} onValueChange={setFarmingExperience}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectExperience')} />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((levelKey) => (
                        <SelectItem key={levelKey} value={levelKey}>{t(`experienceLevels.${levelKey}`)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading ? (isSignUp ? t('creatingAccount') : t('signingIn')) : (isSignUp ? t('createAccount') : t('signIn'))}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm">
            {isSignUp ? t('alreadyHaveAccount') : t('dontHaveAccount')}{' '}
            <Button variant="link" onClick={() => setIsSignUp(!isSignUp)} className="text-green-600 hover:text-green-700 p-0">
              {isSignUp ? t('signIn') : t('createAccount')}
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
