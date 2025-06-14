
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { usePostLikes, usePostComments, useToggleLike } from '@/hooks/community';
import CommentSection from './CommentSection';
import { toast } from 'sonner';

interface PostCardProps {
  post: {
    id: string;
    user_id: string;
    content: string | null;
    image_url: string | null;
    created_at: string;
  };
}

const PostCard = ({ post }: PostCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const { data: likes = [] } = usePostLikes(post.id);
  const { data: comments = [] } = usePostComments(post.id);
  const toggleLike = useToggleLike();

  // Mock user data (in real app, you'd fetch this from profiles)
  const getRandomName = () => {
    const names = ['John Farmer', 'Mary Smith', 'David Johnson', 'Sarah Wilson', 'Mike Brown'];
    return names[Math.floor(Math.random() * names.length)];
  };

  const userName = getRandomName();
  const userInitial = userName.charAt(0);

  const handleLike = async () => {
    try {
      await toggleLike.mutateAsync(post.id);
    } catch (error) {
      toast.error('Failed to update like');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const isLiked = likes.length > 0; // Simplified for demo

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-0">
        {/* Post Header */}
        <div className="flex items-center justify-between p-4 pb-3">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 ring-2 ring-gray-100">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-blue-500 text-white font-semibold">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{userName}</p>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>

        {/* Post Content */}
        {post.content && (
          <div className="px-4 pb-3">
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{post.content}</p>
          </div>
        )}

        {/* Post Image */}
        {post.image_url && (
          <div className="w-full bg-gray-50">
            <img
              src={post.image_url}
              alt="Post content"
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Engagement Stats */}
        {(likes.length > 0 || comments.length > 0) && (
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                {likes.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <Heart className="w-3 h-3 text-white fill-current" />
                    </div>
                    <span>{likes.length}</span>
                  </div>
                )}
              </div>
              {comments.length > 0 && (
                <button 
                  onClick={() => setShowComments(!showComments)}
                  className="hover:underline"
                >
                  {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex px-2 py-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex-1 h-10 rounded-lg mx-1 ${
              isLiked 
                ? 'text-blue-600 hover:text-blue-700 hover:bg-blue-50' 
                : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Heart className={`h-5 w-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
            Like
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="flex-1 h-10 rounded-lg mx-1 text-gray-600 hover:text-gray-700 hover:bg-gray-100"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Comment
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="flex-1 h-10 rounded-lg mx-1 text-gray-600 hover:text-gray-700 hover:bg-gray-100"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && <CommentSection postId={post.id} />}
      </CardContent>
    </Card>
  );
};

export default PostCard;
