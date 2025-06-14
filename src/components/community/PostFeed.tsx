
import React from 'react';
import { usePosts } from '@/hooks/community';
import { useLanguage } from '@/contexts/LanguageContext';
import PostCard from './PostCard';
import { Skeleton } from '@/components/ui/skeleton';

// Fake posts data for demonstration
const fakePosts = [
  {
    id: 'fake-1',
    user_id: 'user-1',
    content: 'Just harvested my first batch of tomatoes this season! 🍅 The weather has been perfect and the yield is better than expected. Any tips for preserving them?',
    image_url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    id: 'fake-2',
    user_id: 'user-2', 
    content: 'Looking for advice on crop rotation. I\'ve been growing maize for 3 seasons straight on the same plot. What should I plant next to restore soil nutrients?',
    image_url: null,
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
  },
  {
    id: 'fake-3',
    user_id: 'user-3',
    content: 'Beautiful sunrise over the coffee plantation this morning! There\'s nothing quite like the peace of early morning farm work. Hope everyone has a productive day! ☀️',
    image_url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
  },
  {
    id: 'fake-4',
    user_id: 'user-4',
    content: 'Successfully implemented drip irrigation on my 2-acre plot. Water consumption reduced by 40% and crop yield increased by 25%. Investment paid off in just one season!',
    image_url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800',
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
  },
  {
    id: 'fake-5',
    user_id: 'user-5',
    content: 'Market prices for avocados are looking great this week! Managed to sell my entire harvest at 30% above last month\'s prices. Timing is everything in farming. 🥑',
    image_url: null,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: 'fake-6',
    user_id: 'user-6',
    content: 'Dealing with pest issues on my cabbage farm. These little green worms are everywhere! Tried organic neem oil spray but need more solutions. Any recommendations?',
    image_url: 'https://images.unsplash.com/photo-1498579809087-ef1e558fd1da?w=800',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  }
];

const PostFeed = () => {
  const { data: posts, isLoading } = usePosts();
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-20 w-full mb-4" />
            <div className="flex space-x-4">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Use real posts if available, otherwise show fake posts
  const postsToShow = posts && posts.length > 0 ? posts : fakePosts;

  return (
    <div className="space-y-4">
      {postsToShow.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      
      {posts && posts.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.477 8-10 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.477-8 10-8s10 3.582 10 8z" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg mb-2 font-medium">{t('noPostsYet') as string}</p>
          <p className="text-gray-400">{t('beFirstToShare') as string}</p>
        </div>
      )}
    </div>
  );
};

export default PostFeed;
