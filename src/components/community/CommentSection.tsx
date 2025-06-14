
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send } from 'lucide-react';
import { usePostComments, useCreateComment } from '@/hooks/community';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

interface CommentSectionProps {
  postId: string;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const { data: comments = [] } = usePostComments(postId);
  const createComment = useCreateComment();

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    try {
      await createComment.mutateAsync({
        postId,
        content: newComment.trim(),
      });
      setNewComment('');
    } catch (error) {
      toast.error('Failed to post comment');
    }
  };

  const getRandomName = () => {
    const names = ['John Farmer', 'Mary Smith', 'David Johnson', 'Sarah Wilson', 'Mike Brown'];
    return names[Math.floor(Math.random() * names.length)];
  };

  return (
    <div className="border-t border-gray-100">
      {/* Existing Comments */}
      <div className="px-4 py-2 max-h-96 overflow-y-auto">
        {comments.map((comment) => {
          const userName = getRandomName();
          const userInitial = userName.charAt(0);
          
          return (
            <div key={comment.id} className="flex space-x-3 mb-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-blue-100 text-blue-800 text-xs">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-2xl px-3 py-2">
                  <p className="font-semibold text-sm text-gray-900">{userName}</p>
                  <p className="text-gray-800">{comment.content}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-3">
                  {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Comment */}
      <div className="flex items-center space-x-2 p-4 bg-gray-50">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder-avatar.jpg" />
          <AvatarFallback className="bg-green-100 text-green-800 text-xs">
            F
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 flex space-x-2">
          <Input
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
            className="bg-white border-gray-200 rounded-full"
          />
          <Button
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || createComment.isPending}
            size="sm"
            className="rounded-full bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
