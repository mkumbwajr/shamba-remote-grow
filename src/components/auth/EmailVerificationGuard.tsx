
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface EmailVerificationGuardProps {
  children: React.ReactNode;
  userEmail?: string;
  isEmailVerified?: boolean;
}

const EmailVerificationGuard: React.FC<EmailVerificationGuardProps> = ({ 
  children, 
  userEmail, 
  isEmailVerified 
}) => {
  const navigate = useNavigate();

  const handleResendVerification = async () => {
    if (!userEmail) return;
    
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: userEmail,
      options: {
        emailRedirectTo: `${window.location.origin}/profile`,
      }
    });

    if (error) {
      toast.error('Failed to send verification email');
    } else {
      toast.success('Verification email sent! Check your inbox.');
    }
  };

  const handleGoToProfile = () => {
    navigate('/profile');
  };

  if (isEmailVerified === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-orange-200">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-orange-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-orange-800 flex items-center justify-center gap-2">
              <AlertCircle className="w-6 h-6" />
              Email Verification Required
            </CardTitle>
            <CardDescription className="text-orange-700">
              Please verify your email address to access all features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-sm text-orange-800 mb-3">
                We've sent a verification email to: 
                <span className="font-medium block mt-1">{userEmail}</span>
              </p>
              <p className="text-xs text-orange-600">
                Click the link in the email to verify your account and unlock all features.
              </p>
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={handleResendVerification}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                Resend Verification Email
              </Button>
              <Button 
                variant="outline" 
                onClick={handleGoToProfile}
                className="w-full border-orange-200 text-orange-700 hover:bg-orange-50"
              >
                Go to Profile Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default EmailVerificationGuard;
