
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FAQSection from './FAQSection';
import TutorialsSection from './TutorialsSection';
import SupportForumSection from './SupportForumSection';

const HelpCenterSection = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="forum">Support Forum</TabsTrigger>
        </TabsList>

        <TabsContent value="faq">
          <FAQSection />
        </TabsContent>

        <TabsContent value="tutorials">
          <TutorialsSection />
        </TabsContent>

        <TabsContent value="forum">
          <SupportForumSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpCenterSection;
