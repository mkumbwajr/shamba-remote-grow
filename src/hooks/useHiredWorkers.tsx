
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export const useHiredWorkers = () => {
  return useQuery({
    queryKey: ['hired-workers'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('hired_workers')
        .select('*')
        .eq('user_id', user.id)
        .order('hire_date', { ascending: false });

      if (error) throw error;
      return data as Tables<'hired_workers'>[];
    },
  });
};

export const useHireWorker = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (workerData: {
      worker_id: string;
      worker_name: string;
      worker_specialization: string;
      worker_phone: string;
      rate: number;
      rate_type: string;
      farm_location?: string;
      job_description?: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('hired_workers')
        .insert({
          ...workerData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hired-workers'] });
    },
  });
};
