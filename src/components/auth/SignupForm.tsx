
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

export interface SignupDataForSubmit {
  email_param: string;
  password_param: string;
}

interface SignupFormProps {
  onSignup: (data: SignupDataForSubmit) => Promise<void>;
  isLoading: boolean;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { t } = useLanguage();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error(`${t('confirmPassword') as string} ${t('passwordMismatchError') as string}`);
      return;
    }
    onSignup({ 
        email_param: email, 
        password_param: password
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email-signup-main">{t('email') as string}</Label>
        <Input 
          id="email-signup-main" 
          type="email" 
          placeholder={t('enterEmail') as string} 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-signup-main">{t('password') as string}</Label>
        <Input 
          id="password-signup-main" 
          type="password" 
          placeholder={t('createPassword') as string} 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword-signup-main">{t('confirmPassword') as string}</Label>
        <Input 
          id="confirmPassword-signup-main" 
          type="password" 
          placeholder={t('confirmPasswordPlaceholder') as string} 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required 
        />
      </div>

      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
        {isLoading ? t('creatingAccount') as string : t('createAccount') as string}
      </Button>
    </form>
  );
};
export default SignupForm;
