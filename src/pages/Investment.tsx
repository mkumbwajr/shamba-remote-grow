
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import { AppSidebar } from '@/components/layout/AppSidebar';
import InvestmentOverview from '@/components/investment/InvestmentOverview';
import TransactionHistory from '@/components/investment/TransactionHistory';
import SpendingChart from '@/components/investment/SpendingChart';
import AITips from '@/components/investment/AITips';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';

interface UserProfileData {
  full_name?: string | null;
}

const InvestmentPage = () => {
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profileData, error } = await (supabase.from('profiles') as any)
          .select('full_name')
          .eq('id', user.id)
          .single();
        
        if (error) {
          console.error("Error fetching profile:", error.message);
        } else if (profileData) {
          setUserProfile(profileData as UserProfileData);
        }
      } else {
        navigate('/auth');
      }
    };
    fetchUserProfile();
  }, [navigate]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar userProfile={userProfile} />
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Investment Dashboard
                </h2>
                <p className="text-gray-600 text-sm">Track your farming investments and spending</p>
              </div>
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>{userProfile?.full_name ? userProfile.full_name.charAt(0).toUpperCase() : 'F'}</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 p-6 space-y-6">
            {/* Investment Overview */}
            <InvestmentOverview />

            {/* Charts and AI Tips Row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <SpendingChart />
              </div>
              <div className="xl:col-span-1">
                <AITips />
              </div>
            </div>

            {/* Transaction History */}
            <TransactionHistory />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default InvestmentPage;
