
import React from 'react';
import { usePosts } from '@/hooks/community';
import PostCard from './PostCard';
import { Skeleton } from '@/components/ui/skeleton';

const PostFeed = () => {
  const { data: posts, isLoading } = usePosts();

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-4">
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

  return (
    <div className="space-y-6">
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      
      {posts?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-2">No posts yet</p>
          <p className="text-gray-400">Be the first to share something with the community!</p>
        </div>
      )}
    </div>
  );
};

export default PostFeed;
