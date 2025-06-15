import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { useToast } from '@/hooks/use-toast';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { MapPin, DollarSign, Calendar, FileText, AlertTriangle, XCircle } from 'lucide-react';
import { formatTshPrice } from '@/utils/currency';

interface UserProfileData {
  full_name?: string | null;
}

const EndContractPage = () => {
  const { workerId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [worker, setWorker] = useState<any>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Fetch user profile
        const { data: profileData, error: profileError } = await (supabase.from('profiles') as any)
          .select('full_name')
          .eq('id', user.id)
          .single();
        
        if (profileError) {
          console.error("Error fetching profile:", profileError.message);
        } else if (profileData) {
          setUserProfile(profileData as UserProfileData);
        }

        // Fetch worker data
        const { data: workerData, error: workerError } = await supabase
          .from('hired_workers')
          .select('*')
          .eq('id', workerId)
          .eq('user_id', user.id)
          .single();

        if (workerError) {
          console.error("Error fetching worker:", workerError.message);
          toast({
            title: "Error",
            description: "Worker not found or you don't have permission to access this worker.",
            variant: "destructive",
          });
          navigate('/hired-workers');
        } else if (workerData) {
          setWorker(workerData);
        }
      } else {
        navigate('/auth');
      }
      setLoading(false);
    };
    fetchData();
  }, [workerId, navigate, toast]);

  const handleSubmit = async () => {
    if (!agreedToTerms) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the termination terms.",
        variant: "destructive",
      });
      return;
    }

    if (!reason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for ending the contract.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('hired_workers')
        .update({ 
          status: 'pending_termination',
          notes: reason,
          end_date: new Date().toISOString().split('T')[0]
        })
        .eq('id', workerId);

      if (error) throw error;

      toast({
        title: "Contract Termination Submitted!",
        description: "Your termination request has been sent to the worker for review.",
      });

      navigate('/hired-workers');
    } catch (error) {
      console.error('Error submitting termination request:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your termination request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Worker not found</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800">End Contract</h2>
              <p className="text-gray-600 text-sm">Terminate worker contract</p>
            </div>
          </header>

          <main className="flex-1 p-6 max-w-4xl mx-auto">
            <div className="space-y-6">
              {/* Worker Info Card */}
              <Card className="bg-white border-forest-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={`/placeholder-worker-${worker.worker_id}.jpg`} />
                      <AvatarFallback className="bg-forest-100 text-forest-800 text-lg">
                        {worker.worker_name.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold text-forest-800">{worker.worker_name}</h3>
                      <p className="text-forest-600">{worker.worker_specialization}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-forest-600">
                        <span className="flex items-center"><MapPin className="h-3 w-3 mr-1" />{worker.farm_location}</span>
                        <span className="flex items-center"><DollarSign className="h-3 w-3 mr-1" />{formatTshPrice(worker.rate)}/{worker.rate_type}</span>
                        <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" />Hired: {new Date(worker.hire_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>

              {/* Termination Reason */}
              <Card className="bg-white border-forest-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Termination Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="reason">Reason for Termination *</Label>
                    <Textarea
                      id="reason"
                      placeholder="Please provide a reason for ending this contract..."
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Termination Terms */}
              <Card className="bg-white border-forest-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-forest-800">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Termination Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-sm">
                    <h4 className="font-semibold mb-2">Contract Termination Agreement:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• All outstanding payments must be settled before termination</li>
                      <li>• Worker must be given reasonable notice unless terminated for cause</li>
                      <li>• Both parties agree to maintain confidentiality of work performed</li>
                      <li>• Any equipment or materials provided must be returned</li>
                      <li>• Final payment will be processed within 5 business days</li>
                      <li>• Both parties release each other from future obligations</li>
                      <li>• This termination is subject to platform mediation if disputes arise</li>
                    </ul>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the termination terms and conditions
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Buttons */}
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/hired-workers')}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!agreedToTerms || isSubmitting || !reason.trim()}
                  variant="destructive"
                  className="flex-1"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Termination Request'}
                </Button>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default EndContractPage;
