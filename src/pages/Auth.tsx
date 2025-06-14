
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import LanguageToggle from '@/components/LanguageToggle';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm, { SignupDataForSubmit } from '@/components/auth/SignupForm';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
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

  const handleSignInSubmit = async (email_param: string, password_param: string) => {
    setIsLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email_param,
      password: password_param,
    });

    if (signInError) {
      toast.error(signInError.message);
    } else {
      navigate('/');
    }
    setIsLoading(false);
  };
  
  const handleSignUpSubmit = async (data: SignupDataForSubmit) => {
    setIsLoading(true);
    const { email_param, password_param } = data;

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: email_param,
      password: password_param,
      options: {
        data: {
          is_new_user: true, // Flag to identify new users for onboarding
        },
        emailRedirectTo: `${window.location.origin}/onboarding`,
      },
    });

    if (signUpError) {
      toast.error(signUpError.message);
    } else if (signUpData.user && signUpData.user.identities && signUpData.user.identities.length > 0) {
       // Check if email confirmation is required
      const emailConfirmationRequired = signUpData.user.identities.some(id => id.identity_data?.email && !signUpData.session);

      if (emailConfirmationRequired) {
        toast.success(t('createAccountSucceededCheckEmail') as string || 'Account created! Please check your email to verify.'); 
      } else {
        toast.success(t('createAccountSucceeded') as string || 'Account created successfully!'); 
        navigate('/onboarding'); // Redirect new users to onboarding
      }
    } else if (!signUpData.session && !signUpData.user) {
      toast.info(t('checkEmailOrSignIn') as string || "Please check your email to verify your account or try signing in if already verified."); 
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
            {isSignUp ? t('joinBwanaShamba') as string : t('welcomeBack') as string}
          </CardTitle>
          <CardDescription>
            {isSignUp ? t('createAccountToStart') as string : t('signInToAccess') as string}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSignUp ? (
            <SignupForm onSignup={handleSignUpSubmit} isLoading={isLoading} />
          ) : (
            <LoginForm onLogin={handleSignInSubmit} isLoading={isLoading} />
          )}
          <p className="mt-6 text-center text-sm">
            {isSignUp ? t('alreadyHaveAccount') as string : t('dontHaveAccount') as string}{' '}
            <Button variant="link" onClick={() => setIsSignUp(!isSignUp)} className="text-green-600 hover:text-green-700 p-0">
              {isSignUp ? t('signIn') as string : t('createAccount') as string}
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
