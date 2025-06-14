
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { useToast } from '@/hooks/use-toast';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { MapPin, DollarSign, Calendar, FileText, AlertTriangle } from 'lucide-react';
import { formatTshPrice } from '@/utils/currency';

interface UserProfileData {
  full_name?: string | null;
}

const HireWorkerPage = () => {
  const { workerId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToContract, setAgreedToContract] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [farmLocation, setFarmLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock worker data - in real app this would come from API
  const worker = {
    id: workerId,
    name: 'Joseph Mwalimu',
    specialization: 'Farm Supervisor',
    rating: 4.9,
    location: 'Arusha Region',
    rate: 62500, // 25 USD converted to TSH
    rateType: 'per day',
    phone: '+255 123 456 789',
    experience: '8 years',
    image: 'JM'
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profileData, error } = await (supabase.from('profiles') as any)
          .select('full_name')
          .eq('id', user.id)
          .single();
        
        if (error) {
          console.error("Error fetching profile:", error.message);
        } else if (profileData) {
          setUserProfile(profileData as UserProfileData);
        }
      } else {
        navigate('/auth');
      }
    };
    fetchUserProfile();
  }, [navigate]);

  const handleSubmit = async () => {
    if (!agreedToTerms || !agreedToContract) {
      toast({
        title: "Agreement Required",
        description: "Please agree to both terms and conditions and the contract.",
        variant: "destructive",
      });
      return;
    }

    if (!jobDescription || !farmLocation || !startDate) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('hired_workers')
        .insert({
          user_id: user.id,
          worker_id: worker.id,
          worker_name: worker.name,
          worker_specialization: worker.specialization,
          worker_phone: worker.phone,
          rate: worker.rate,
          rate_type: worker.rateType,
          farm_location: farmLocation,
          job_description: jobDescription,
          hire_date: startDate,
          end_date: endDate || null,
          status: 'pending_worker_approval',
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Hiring Request Submitted!",
        description: "Your hiring request has been sent to the worker for review.",
      });

      navigate('/hired-workers');
    } catch (error) {
      console.error('Error submitting hiring request:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your hiring request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar userProfile={userProfile} />
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800">Hire Worker</h2>
              <p className="text-gray-600 text-sm">Complete the hiring process</p>
            </div>
          </header>

          <main className="flex-1 p-6 max-w-4xl mx-auto">
            <div className="space-y-6">
              {/* Worker Info Card */}
              <Card className="bg-white border-forest-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={`/placeholder-worker-${worker.id}.jpg`} />
                      <AvatarFallback className="bg-forest-100 text-forest-800 text-lg">
                        {worker.image}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold text-forest-800">{worker.name}</h3>
                      <p className="text-forest-600">{worker.specialization}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-forest-600">
                        <span className="flex items-center"><MapPin className="h-3 w-3 mr-1" />{worker.location}</span>
                        <span className="flex items-center"><DollarSign className="h-3 w-3 mr-1" />{formatTshPrice(worker.rate)}/{worker.rateType}</span>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>

              {/* Job Details */}
              <Card className="bg-white border-forest-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Job Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="job-description">Job Description *</Label>
                    <Textarea
                      id="job-description"
                      placeholder="Describe the work you need done..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="farm-location">Farm Location *</Label>
                    <Input
                      id="farm-location"
                      placeholder="Enter your farm location"
                      value={farmLocation}
                      onChange={(e) => setFarmLocation(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start-date">Start Date *</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-date">End Date (Optional)</Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <Card className="bg-white border-forest-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-forest-800">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Terms and Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto text-sm">
                    <h4 className="font-semibold mb-2">Platform Terms:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• All payments must be made through the platform</li>
                      <li>• Workers are independent contractors, not employees</li>
                      <li>• Both parties must maintain professional conduct</li>
                      <li>• Any disputes will be handled through platform mediation</li>
                      <li>• Platform charges a 10% service fee on all transactions</li>
                      <li>• Cancellations must be made 24 hours in advance</li>
                      <li>• Both parties are responsible for following local labor laws</li>
                    </ul>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the terms and conditions
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* Contract */}
              <Card className="bg-white border-forest-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-forest-800">
                    <FileText className="h-5 w-5 mr-2" />
                    Work Contract
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto text-sm">
                    <h4 className="font-semibold mb-2">Contract Agreement:</h4>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Employer:</strong> {userProfile?.full_name || 'User'}</p>
                      <p><strong>Worker:</strong> {worker.name}</p>
                      <p><strong>Position:</strong> {worker.specialization}</p>
                      <p><strong>Rate:</strong> {formatTshPrice(worker.rate)} {worker.rateType}</p>
                      <p><strong>Work Location:</strong> {farmLocation || 'To be specified'}</p>
                      <p><strong>Start Date:</strong> {startDate || 'To be specified'}</p>
                      {endDate && <p><strong>End Date:</strong> {endDate}</p>}
                      <div className="mt-3">
                        <p className="font-semibold">Responsibilities:</p>
                        <p>{jobDescription || 'To be specified'}</p>
                      </div>
                      <div className="mt-3">
                        <p className="font-semibold">Payment Terms:</p>
                        <p>Payment will be made {worker.rateType} at the agreed rate. All payments are subject to platform service charges and applicable taxes.</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="contract"
                      checked={agreedToContract}
                      onCheckedChange={(checked) => setAgreedToContract(checked as boolean)}
                    />
                    <Label htmlFor="contract" className="text-sm">
                      I agree to this work contract
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Buttons */}
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!agreedToTerms || !agreedToContract || isSubmitting}
                  className="flex-1 bg-forest-600 hover:bg-forest-700"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Hiring Request'}
                </Button>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default HireWorkerPage;
