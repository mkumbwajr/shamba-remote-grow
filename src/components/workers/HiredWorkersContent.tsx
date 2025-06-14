
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, Calendar, DollarSign, Phone, MessageSquare, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useHiredWorkers } from '@/hooks/useHiredWorkers';
import { format } from 'date-fns';

const HiredWorkersContent = () => {
  const { data: hiredWorkers, isLoading } = useHiredWorkers();

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
        <Button className="bg-green-600 hover:bg-green-700">
          Browse Workers
        </Button>
      </div>
    );
  }

  // Categorize workers
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const activeWorkers = hiredWorkers.filter(worker => worker.status === 'active');
  const newWorkers = activeWorkers.filter(worker => 
    worker.created_at && new Date(worker.created_at) > thirtyDaysAgo
  );
  const oldActiveWorkers = activeWorkers.filter(worker => 
    worker.created_at && new Date(worker.created_at) <= thirtyDaysAgo
  );
  const historicalWorkers = hiredWorkers.filter(worker => 
    worker.status === 'completed' || worker.status === 'terminated'
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
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
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'terminated':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
                  {worker.status.charAt(0).toUpperCase() + worker.status.slice(1)}
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

        {/* Contact Info */}
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
            {worker.status === 'active' && (
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
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
      {/* New Workers Section */}
      {newWorkers.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-green-500" />
            Recently Hired (Last 30 days) - {newWorkers.length}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newWorkers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>
        </section>
      )}

      {/* Active Workers Section */}
      {oldActiveWorkers.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-blue-500" />
            Active Workers - {oldActiveWorkers.length}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {oldActiveWorkers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>
        </section>
      )}

      {/* Historical Workers Section */}
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
