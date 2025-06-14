
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export interface ChatMessage {
  id: string;
  user_id: string;
  hired_worker_id: string;
  sender_type: 'user' | 'worker';
  message: string;
  created_at: string;
  read_at?: string;
}

export const useChatMessages = (hiredWorkerId?: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['chat-messages', hiredWorkerId],
    queryFn: async () => {
      if (!hiredWorkerId) return [];
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('hired_worker_id', hiredWorkerId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as ChatMessage[];
    },
    enabled: !!hiredWorkerId,
  });

  // Set up real-time subscription
  useEffect(() => {
    if (!hiredWorkerId) return;

    const channel = supabase
      .channel('chat-messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_messages',
          filter: `hired_worker_id=eq.${hiredWorkerId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['chat-messages', hiredWorkerId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [hiredWorkerId, queryClient]);

  return query;
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      hiredWorkerId,
      message,
    }: {
      hiredWorkerId: string;
      message: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          user_id: user.id,
          hired_worker_id: hiredWorkerId,
          sender_type: 'user',
          message,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: ['chat-messages', variables.hiredWorkerId] 
      });
    },
  });
};
