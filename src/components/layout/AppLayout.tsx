
import React, { useState } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import ChatSidebar from '@/components/chat/ChatSidebar';
import {
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
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);

  const handleOpenChat = (workerId?: string) => {
    setIsChatOpen(true);
    if (workerId) {
      setSelectedWorkerId(workerId);
    }
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setSelectedWorkerId(null);
  };

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <AppSidebar userProfile={userProfile} />
      <SidebarInset className="flex-1 min-w-0">
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
      </SidebarInset>
      <ChatSidebar 
        isOpen={isChatOpen} 
        onToggle={() => setIsChatOpen(!isChatOpen)}
        onClose={handleCloseChat}
        initialSelectedWorker={selectedWorkerId}
      />
    </div>
  );
};

export default AppLayout;
