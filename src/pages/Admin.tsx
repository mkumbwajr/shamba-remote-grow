
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import AdminOverview from '@/components/admin/AdminOverview';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminWorkers from '@/components/admin/AdminWorkers';
import AdminLandPlots from '@/components/admin/AdminLandPlots';
import AdminRevenue from '@/components/admin/AdminRevenue';

interface UserProfileData {
  full_name?: string | null;
}

const AdminPage = () => {
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/auth');
          return;
        }

        // Check if user has admin or super_admin role
        const { data: roleData } = await supabase
          .rpc('get_user_role', { _user_id: user.id });

        if (!roleData || (roleData !== 'admin' && roleData !== 'super_admin')) {
          toast({
            title: "Access Denied",
            description: "You don't have permission to access the admin dashboard.",
            variant: "destructive"
          });
          navigate('/');
          return;
        }

        setUserRole(roleData);

        // Fetch user profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();
        
        setUserProfile(profileData);
      } catch (error) {
        console.error("Error checking admin access:", error);
        toast({
          title: "Error",
          description: "Failed to verify admin access.",
          variant: "destructive"
        });
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, [navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <AppLayout userProfile={userProfile}>
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </h2>
            <p className="text-gray-600 text-sm">Platform management and analytics</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 capitalize">{userRole}</span>
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback>{userProfile?.full_name ? userProfile.full_name.charAt(0).toUpperCase() : 'A'}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="workers">Workers</TabsTrigger>
            <TabsTrigger value="land-plots">Land Plots</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AdminOverview />
          </TabsContent>

          <TabsContent value="users">
            <AdminUsers />
          </TabsContent>

          <TabsContent value="workers">
            <AdminWorkers />
          </TabsContent>

          <TabsContent value="land-plots">
            <AdminLandPlots />
          </TabsContent>

          <TabsContent value="revenue">
            <AdminRevenue />
          </TabsContent>
        </Tabs>
      </main>
    </AppLayout>
  );
};

export default AdminPage;
