
import React from 'react';
import { Tractor } from 'lucide-react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import {
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';

const FarmsPageLoading: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
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
};

export default FarmsPageLoading;
