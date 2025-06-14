
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import AppLayout from '@/components/layout/AppLayout';
import { useProfileData } from '@/hooks/useProfileData';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNewsArticles } from '@/hooks/useNews';
import NewsArticleCard from '@/components/news/NewsArticleCard';
import { Loader2 } from 'lucide-react';

const NewsPage = () => {
  const { profile } = useProfileData();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const { data: articles = [], isLoading, error } = useNewsArticles(selectedCategory);

  const categories = [
    { value: 'all', label: String(t('allNews')) },
    { value: 'partnership', label: String(t('partnerships')) },
    { value: 'testimonial', label: String(t('testimonials')) },
    { value: 'update', label: String(t('updates')) },
  ];

  return (
    <AppLayout userProfile={profile}>
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4 shadow-sm">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{String(t('newsAndUpdates'))}</h2>
            <p className="text-gray-500 text-sm">{String(t('stayInformedAboutPlatform'))}</p>
          </div>
          <Avatar className="h-9 w-9 ring-2 ring-gray-100">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="bg-blue-500 text-white font-semibold">
              {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : 'F'}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto py-6 px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {String(t('latestNews'))}
            </h1>
            <p className="text-gray-600">
              {String(t('stayInformedAboutPlatform'))}
            </p>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
            <TabsList className="grid w-full grid-cols-4">
              {categories.map((category) => (
                <TabsTrigger key={category.value} value={category.value}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.value} value={category.value} className="mt-6">
                {isLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">{String(t('loadingNews'))}</span>
                  </div>
                ) : error ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-gray-500">Error loading news articles</p>
                    </CardContent>
                  </Card>
                ) : articles.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-gray-500">{String(t('noNewsFound'))}</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {articles.map((article) => (
                      <NewsArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </AppLayout>
  );
};

export default NewsPage;
