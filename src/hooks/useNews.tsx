
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  category: string;
  author_name: string;
  image_url: string | null;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface NewsComment {
  id: string;
  article_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const useNewsArticles = (category?: string) => {
  return useQuery({
    queryKey: ['news-articles', category],
    queryFn: async (): Promise<NewsArticle[]> => {
      let query = supabase
        .from('news_articles')
        .select('*')
        .order('published_at', { ascending: false });

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching news articles:', error);
        throw error;
      }

      return data || [];
    },
  });
};

export const useNewsComments = (articleId: string) => {
  return useQuery({
    queryKey: ['news-comments', articleId],
    queryFn: async (): Promise<NewsComment[]> => {
      const { data, error } = await supabase
        .from('news_comments')
        .select('*')
        .eq('article_id', articleId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching news comments:', error);
        throw error;
      }

      return data || [];
    },
  });
};

export const useCreateNewsComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ articleId, content }: { articleId: string; content: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User must be authenticated to comment');
      }

      const { data, error } = await supabase
        .from('news_comments')
        .insert({
          article_id: articleId,
          user_id: user.id,
          content: content.trim(),
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating news comment:', error);
        throw error;
      }

      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['news-comments', variables.articleId] });
      toast.success('Comment posted successfully!');
    },
    onError: (error) => {
      console.error('Error posting comment:', error);
      toast.error('Failed to post comment');
    },
  });
};
