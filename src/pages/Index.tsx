
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import QuickStatsSection from '@/components/dashboard/QuickStatsSection';
import MarketIntelligenceCard from '@/components/dashboard/MarketIntelligenceCard';
import FarmUpdatesCard from '@/components/dashboard/FarmUpdatesCard';
import EmailVerificationGuard from '@/components/auth/EmailVerificationGuard';

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean | null>(null);
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
          setLoading(false);
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
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50">
          <AppSidebar />
          <main className="flex-1 flex flex-col overflow-hidden">
            <DashboardHeader />
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-7xl mx-auto space-y-6">
                <QuickStatsSection />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <MarketIntelligenceCard />
                  <FarmUpdatesCard />
                </div>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </EmailVerificationGuard>
  );
};

export default Index;
