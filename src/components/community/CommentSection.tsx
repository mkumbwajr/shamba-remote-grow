
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePostComments, useCreateComment } from '@/hooks/community';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

interface CommentSectionProps {
  postId: string;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const { t } = useLanguage();
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
    <div className="border-t border-gray-100 bg-gray-50">
      {/* Existing Comments */}
      {comments.length > 0 && (
        <div className="px-4 py-3 max-h-96 overflow-y-auto">
          {comments.map((comment) => {
            const userName = getRandomName();
            const userInitial = userName.charAt(0);
            
            return (
              <div key={comment.id} className="flex space-x-3 mb-3 last:mb-0">
                <Avatar className="h-8 w-8 ring-1 ring-gray-200">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-gray-500 text-white text-xs font-semibold">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-white rounded-2xl px-3 py-2 shadow-sm border border-gray-100">
                    <p className="font-semibold text-sm text-gray-900">{userName}</p>
                    <p className="text-gray-800 text-sm leading-relaxed">{comment.content}</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 ml-3">
                    <button className="text-xs font-semibold text-gray-500 hover:text-blue-600 transition-colors">
                      {t('like') as string}
                    </button>
                    <button className="text-xs font-semibold text-gray-500 hover:text-blue-600 transition-colors">
                      Reply
                    </button>
                    <span className="text-xs text-gray-400">
                      {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Comment */}
      <div className="flex items-center space-x-2 p-4 bg-gray-50">
        <Avatar className="h-8 w-8 ring-1 ring-gray-200">
          <AvatarImage src="/placeholder-avatar.jpg" />
          <AvatarFallback className="bg-blue-500 text-white text-xs font-semibold">
            F
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 flex space-x-2">
          <Input
            placeholder={t('writeComment') as string}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
            className="bg-white border-gray-200 rounded-full px-4 py-2 text-sm focus-visible:ring-1 focus-visible:ring-blue-500 border"
          />
          <Button
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || createComment.isPending}
            size="sm"
            className="rounded-full bg-blue-600 hover:bg-blue-700 h-8 w-8 p-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
