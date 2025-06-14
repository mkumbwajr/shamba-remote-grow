import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNewsComments, useCreateNewsComment } from '@/hooks/useNews';
import { formatDistanceToNow } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';

interface NewsCommentSectionProps {
  articleId: string;
}

const NewsCommentSection = ({ articleId }: NewsCommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { t } = useLanguage();
  const { data: comments = [], isLoading } = useNewsComments(articleId);
  const createComment = useCreateNewsComment();

  React.useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    };
    checkAuth();
  }, []);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    if (!isAuthenticated) {
      alert('Please log in to comment');
      return;
    }

    try {
      await createComment.mutateAsync({
        articleId,
        content: newComment.trim(),
      });
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const getRandomName = () => {
    const names = ['John Farmer', 'Mary Smith', 'David Johnson', 'Sarah Wilson', 'Mike Brown'];
    return names[Math.floor(Math.random() * names.length)];
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">
        {String(t('comments'))} ({comments.length})
      </h4>

      {/* Existing Comments */}
      {comments.length > 0 ? (
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {comments.map((comment) => {
            const userName = getRandomName();
            const userInitial = userName.charAt(0);
            
            return (
              <div key={comment.id} className="flex space-x-3">
                <Avatar className="h-8 w-8 ring-1 ring-gray-200 flex-shrink-0">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-gray-500 text-white text-xs font-semibold">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <p className="font-semibold text-sm text-gray-900 mb-1">{userName}</p>
                    <p className="text-gray-800 text-sm leading-relaxed">{comment.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-3">
                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <p>{String(t('noComments'))}</p>
          <p className="text-sm">{String(t('beFirstToComment'))}</p>
        </div>
      )}

      {/* Add Comment */}
      {isAuthenticated ? (
        <div className="flex space-x-3">
          <Avatar className="h-8 w-8 ring-1 ring-gray-200 flex-shrink-0">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="bg-blue-500 text-white text-xs font-semibold">
              F
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder={String(t('writeComment'))}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px] resize-none border-gray-200 focus-visible:ring-1 focus-visible:ring-blue-500"
            />
            <div className="flex justify-end">
              <Button
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || createComment.isPending}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                {createComment.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                {String(t('postComment'))}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          <p>Please log in to comment</p>
        </div>
      )}
    </div>
  );
};

export default NewsCommentSection;
