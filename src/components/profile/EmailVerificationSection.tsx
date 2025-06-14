
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Check, AlertCircle, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface EmailVerificationSectionProps {
  userEmail: string | null;
  isEmailVerified: boolean;
}

const EmailVerificationSection: React.FC<EmailVerificationSectionProps> = ({
  userEmail,
  isEmailVerified
}) => {
  const [isResending, setIsResending] = useState(false);

  const handleResendVerification = async () => {
    if (!userEmail) return;
    
    setIsResending(true);
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
    setIsResending(false);
  };

  return (
    <Card className={`${isEmailVerified ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Email Verification
          <Badge 
            variant={isEmailVerified ? "default" : "destructive"}
            className={isEmailVerified ? "bg-green-600" : "bg-orange-600"}
          >
            {isEmailVerified ? (
              <>
                <Check className="h-3 w-3 mr-1" />
                Verified
              </>
            ) : (
              <>
                <AlertCircle className="h-3 w-3 mr-1" />
                Unverified
              </>
            )}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Email Address:</p>
            <p className="font-medium">{userEmail}</p>
          </div>
          
          {!isEmailVerified && (
            <div className="space-y-3">
              <div className="bg-orange-100 border border-orange-200 rounded-lg p-3">
                <p className="text-sm text-orange-800">
                  Your email address is not verified. Please check your inbox and click the verification link 
                  to access all features of the platform.
                </p>
              </div>
              
              <Button 
                onClick={handleResendVerification}
                disabled={isResending}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Resend Verification Email
                  </>
                )}
              </Button>
            </div>
          )}
          
          {isEmailVerified && (
            <div className="bg-green-100 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-800">
                Your email address has been verified. You have full access to all platform features.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailVerificationSection;
