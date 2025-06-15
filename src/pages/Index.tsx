
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { QuickStatsSection } from '@/components/dashboard/QuickStatsSection';
import { MarketIntelligenceCard } from '@/components/dashboard/MarketIntelligenceCard';
import { FarmUpdatesCard } from '@/components/dashboard/FarmUpdatesCard';
import EmailVerificationGuard from '@/components/auth/EmailVerificationGuard';

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      setUser(session.user);
      setUserEmail(session.user.email || null);
      setIsEmailVerified(session.user.email_confirmed_at !== null);
      
      // Fetch user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      setUserProfile(profile);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          navigate('/auth');
        } else if (session) {
          setUser(session.user);
          setUserEmail(session.user.email || null);
          setIsEmailVerified(session.user.email_confirmed_at !== null);
          
          // Fetch user profile when session changes
          setTimeout(async () => {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            setUserProfile(profile);
            setLoading(false);
          }, 0);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <EmailVerificationGuard userEmail={userEmail} isEmailVerified={isEmailVerified}>
      <AppLayout userProfile={userProfile}>
        <DashboardHeader userProfile={userProfile} />
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <QuickStatsSection 
              activeFarmsCount={0}
              activeWorkersCount={0}
              onActiveFarmsClick={() => navigate('/farms')}
              onWorkersHiredClick={() => navigate('/workers')}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MarketIntelligenceCard 
                showMarketChart={false}
                onToggleChart={() => {}}
              />
              <FarmUpdatesCard />
            </div>
          </div>
        </div>
      </AppLayout>
    </EmailVerificationGuard>
  );
};

export default Index;
