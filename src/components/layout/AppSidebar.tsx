
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BarChart, 
  Home, 
  MapPinned, 
  Settings, 
  ShoppingCart, 
  Tractor, 
  Users, 
  Wheat, 
  LogOut 
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import { supabase } from '@/integrations/supabase/client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

interface UserProfileData {
  full_name?: string | null;
}

interface AppSidebarProps {
  userProfile: UserProfileData | null;
}

export function AppSidebar({ userProfile }: AppSidebarProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { state } = useSidebar();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const menuItems = [
    { name: t('dashboard') as string, icon: Home, path: '/' },
    { name: t('crops') as string, icon: Wheat, path: '/crop-matcher' },
    { name: t('marketplace') as string, icon: ShoppingCart, path: '/marketplace' },
    { name: t('land') as string, icon: MapPinned, path: '/land-rental' },
    { name: t('workers') as string, icon: Users, path: '/workers' },
  ];

  return (
    <Sidebar className="border-r border-green-200">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Tractor className="w-4 h-4 text-white" />
          </div>
          {state === "expanded" && (
            <div className="min-w-0">
              <h1 className="text-lg font-semibold text-green-800 truncate">
                {t('remoteFarmingPlatform') as string}
              </h1>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-green-700">
            {state === "expanded" ? t('navigation') : ''}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.path)}
                    tooltip={state === "collapsed" ? item.name : undefined}
                    className="hover:bg-green-50 hover:text-green-700 data-[active=true]:bg-green-100 data-[active=true]:text-green-800"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 space-y-2">
        {state === "expanded" && (
          <div className="mb-2">
            <LanguageToggle />
          </div>
        )}
        
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => navigate('/profile')}
              tooltip={state === "collapsed" ? t('profile') as string : undefined}
              className="hover:bg-green-50 hover:text-green-700"
            >
              <Settings className="h-5 w-5" />
              <span>{t('profile') as string}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleSignOut}
              tooltip={state === "collapsed" ? t('signOut') as string : undefined}
              className="hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-5 w-5" />
              <span>{t('signOut') as string}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {state === "expanded" && (
          <div className="flex items-center gap-3 p-2 rounded-lg bg-green-50 mt-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-green-600 text-white">
                {userProfile?.full_name ? userProfile.full_name.charAt(0).toUpperCase() : 'F'}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-green-800 truncate">
                {userProfile?.full_name || 'Farmer'}
              </p>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
