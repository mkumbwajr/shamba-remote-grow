
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Plus, BarChart, DollarSign, HardHat, Home, LogOut, MapPinned, Settings, ShoppingCart, Tractor, Users, Wheat } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFarms } from '@/hooks/useFarms';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { AppSidebar } from '@/components/layout/AppSidebar';
import FarmCard from './FarmCard';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';

interface FarmsPageProps {
  onBack: () => void;
}

interface UserProfileData {
  full_name?: string | null;
}

const FarmsPage = ({ onBack }: FarmsPageProps) => {
  const { t } = useLanguage();
  const { data: farms, isLoading } = useFarms();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = React.useState<UserProfileData | null>(null);

  React.useEffect(() => {
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
      }
    };
    fetchUserProfile();
  }, []);

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const activeFarms = farms?.filter(farm => farm.status === 'active') || [];
  const newFarms = activeFarms.filter(farm => 
    farm.created_at && new Date(farm.created_at) > thirtyDaysAgo
  );
  const oldFarms = activeFarms.filter(farm => 
    farm.created_at && new Date(farm.created_at) <= thirtyDaysAgo
  );
  const historicalFarms = farms?.filter(farm => 
    farm.status === 'completed' || farm.status === 'inactive'
  ) || [];

  if (isLoading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gray-50">
          <AppSidebar userProfile={userProfile} />
          <SidebarInset className="flex-1">
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <Tractor className="h-12 w-12 text-green-500 mx-auto mb-4 animate-pulse" />
                <p className="text-lg text-gray-600">Loading farms...</p>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }

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
                <h2 className="text-2xl font-bold text-gray-800">My Farms</h2>
                <p className="text-gray-600 text-sm">Manage your farming operations</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => navigate('/land-rental')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Farm
                </Button>
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>{userProfile?.full_name ? userProfile.full_name.charAt(0).toUpperCase() : 'F'}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 p-6">
            <div className="space-y-8">
              {/* New Farms Section */}
              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Tractor className="h-5 w-5 mr-2 text-green-500" />
                  New Farms (Last 30 days)
                </h3>
                {newFarms.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newFarms.map((farm) => (
                      <FarmCard key={farm.id} farm={farm} />
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-gray-500">No new farms created in the last 30 days</p>
                  </Card>
                )}
              </section>

              {/* Active Farms Section */}
              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-blue-500" />
                  Active Farms
                </h3>
                {oldFarms.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {oldFarms.map((farm) => (
                      <FarmCard key={farm.id} farm={farm} />
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-gray-500">No active farms found</p>
                  </Card>
                )}
              </section>

              {/* Historical Farms Section */}
              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-purple-500" />
                  Farm History
                </h3>
                {historicalFarms.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {historicalFarms.map((farm) => (
                      <FarmCard key={farm.id} farm={farm} />
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-gray-500">No historical farms found</p>
                  </Card>
                )}
              </section>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default FarmsPage;
