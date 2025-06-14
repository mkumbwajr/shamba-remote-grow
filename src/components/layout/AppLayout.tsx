
import React, { useState } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import ChatSidebar from '@/components/chat/ChatSidebar';
import {
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';

interface UserProfileData {
  full_name?: string | null;
}

interface AppLayoutProps {
  userProfile: UserProfileData | null;
  children: React.ReactNode;
}

const AppLayout = ({ userProfile, children }: AppLayoutProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar userProfile={userProfile} />
        <SidebarInset className="flex-1">
          {children}
        </SidebarInset>
        <ChatSidebar 
          isOpen={isChatOpen} 
          onToggle={() => setIsChatOpen(!isChatOpen)} 
        />
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
