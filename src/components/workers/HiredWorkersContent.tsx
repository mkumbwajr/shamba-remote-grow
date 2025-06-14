
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, Calendar, DollarSign, Phone, MessageSquare, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useHiredWorkers } from '@/hooks/useHiredWorkers';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

const HiredWorkersContent = () => {
  const { data: hiredWorkers, isLoading, refetch } = useHiredWorkers();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEndContract = async (workerId: string) => {
    navigate(`/end-contract/${workerId}`);
  };

  const handleApproveWorker = async (workerId: string) => {
    try {
      const { error } = await supabase
        .from('hired_workers')
        .update({ status: 'active' })
        .eq('id', workerId);

      if (error) throw error;

      toast({
        title: "Worker Approved!",
        description: "The worker has been approved and added to your active workers.",
      });

      refetch();
    } catch (error) {
      console.error('Error approving worker:', error);
      toast({
        title: "Error",
        description: "There was an error approving the worker.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Clock className="h-12 w-12 text-green-500 mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-gray-600">Loading hired workers...</p>
        </div>
      </div>
    );
  }

  if (!hiredWorkers || hiredWorkers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Clock className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Workers Hired Yet</h3>
        <p className="text-gray-600 mb-6">You haven't hired any workers yet. Start by browsing our worker directory.</p>
        <Button 
          className="bg-green-600 hover:bg-green-700"
          onClick={() => navigate('/workers')}
        >
          Browse Workers
        </Button>
      </div>
    );
  }

  // Categorize workers by status
  const pendingWorkers = hiredWorkers.filter(worker => worker.status === 'pending_worker_approval');
  const pendingUserApproval = hiredWorkers.filter(worker => worker.status === 'pending_user_approval');
  const activeWorkers = hiredWorkers.filter(worker => worker.status === 'active');
  const pendingTermination = hiredWorkers.filter(worker => worker.status === 'pending_termination');
  const historicalWorkers = hiredWorkers.filter(worker => 
    worker.status === 'completed' || worker.status === 'terminated'
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending_worker_approval':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'pending_user_approval':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending_termination':
        return <Clock className="h-4 w-4 text-red-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'terminated':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_worker_approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending_user_approval':
        return 'bg-orange-100 text-orange-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending_termination':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'terminated':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending_worker_approval':
        return 'Pending Worker Approval';
      case 'pending_user_approval':
        return 'Pending Your Approval';
      case 'active':
        return 'Active';
      case 'pending_termination':
        return 'Pending Termination';
      case 'completed':
        return 'Completed';
      case 'terminated':
        return 'Terminated';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const WorkerCard = ({ worker }: { worker: any }) => (
    <Card className="bg-white border-forest-200 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={`/placeholder-worker-${worker.worker_id}.jpg`} />
            <AvatarFallback className="bg-forest-100 text-forest-800">
              {worker.worker_name.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-forest-800 text-lg">{worker.worker_name}</CardTitle>
                <p className="text-forest-600 text-sm">{worker.worker_specialization}</p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(worker.status)}
                <Badge className={getStatusColor(worker.status)}>
                  {getStatusText(worker.status)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {worker.job_description && (
          <p className="text-sm text-forest-700">{worker.job_description}</p>
        )}

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-3 w-3 text-forest-600" />
              <span className="text-forest-600">Hired:</span>
              <span className="font-medium text-forest-800">
                {format(new Date(worker.hire_date), 'MMM dd, yyyy')}
              </span>
            </div>
            {worker.end_date && (
              <div className="flex items-center space-x-2">
                <Calendar className="h-3 w-3 text-forest-600" />
                <span className="text-forest-600">End Date:</span>
                <span className="font-medium text-forest-800">
                  {format(new Date(worker.end_date), 'MMM dd, yyyy')}
                </span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-3 w-3 text-forest-600" />
              <span className="text-forest-600">Rate:</span>
              <span className="font-medium text-forest-800">
                ${worker.rate}/{worker.rate_type}
              </span>
            </div>
            {worker.farm_location && (
              <div className="flex items-center space-x-2">
                <MapPin className="h-3 w-3 text-forest-600" />
                <span className="text-forest-600">Location:</span>
                <span className="font-medium text-forest-800">{worker.farm_location}</span>
              </div>
            )}
          </div>
        </div>

        {worker.notes && (
          <div className="border-t border-forest-100 pt-3">
            <p className="text-sm text-forest-700">
              <strong>Notes:</strong> {worker.notes}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="border-t border-forest-100 pt-3">
          <div className="flex items-center justify-between text-sm text-forest-600 mb-3">
            <div className="flex items-center space-x-2">
              <Phone className="h-3 w-3" />
              <span>{worker.worker_phone}</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1 border-forest-200">
              <MessageSquare className="h-4 w-4 mr-1" />
              Contact
            </Button>
            
            {worker.status === 'pending_user_approval' && (
              <Button 
                onClick={() => handleApproveWorker(worker.id)}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Approve Worker
              </Button>
            )}
            
            {worker.status === 'active' && (
              <Button 
                variant="outline" 
                className="border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => handleEndContract(worker.id)}
              >
                End Contract
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Pending Worker Approval */}
      {pendingWorkers.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-yellow-500" />
            Pending Worker Approval - {pendingWorkers.length}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pendingWorkers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>
        </section>
      )}

      {/* Pending User Approval */}
      {pendingUserApproval.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
            Pending Your Approval - {pendingUserApproval.length}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pendingUserApproval.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>
        </section>
      )}

      {/* Active Workers */}
      {activeWorkers.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
            Active Workers - {activeWorkers.length}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeWorkers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>
        </section>
      )}

      {/* Pending Termination */}
      {pendingTermination.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-red-500" />
            Pending Termination - {pendingTermination.length}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pendingTermination.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>
        </section>
      )}

      {/* Historical Workers */}
      {historicalWorkers.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-purple-500" />
            Worker History - {historicalWorkers.length}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {historicalWorkers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default HiredWorkersContent;
