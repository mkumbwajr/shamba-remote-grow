
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { usePostLikes, usePostComments, useToggleLike } from '@/hooks/useCommunity';
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
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        {/* Post Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-green-100 text-green-800">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-gray-900">{userName}</p>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Post Content */}
        {post.content && (
          <div className="px-4 pb-4">
            <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
          </div>
        )}

        {/* Post Image */}
        {post.image_url && (
          <div className="w-full">
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
        <div className="px-4 py-2 border-b border-gray-100">
          <div className="flex justify-between text-sm text-gray-500">
            <span>{likes.length} {likes.length === 1 ? 'like' : 'likes'}</span>
            <span>{comments.length} {comments.length === 1 ? 'comment' : 'comments'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between px-4 py-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex-1 ${isLiked ? 'text-red-600 hover:text-red-700' : 'text-gray-600 hover:text-gray-700'}`}
          >
            <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
            Like
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="flex-1 text-gray-600 hover:text-gray-700"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Comment
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="flex-1 text-gray-600 hover:text-gray-700"
          >
            <Share2 className="h-4 w-4 mr-2" />
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
