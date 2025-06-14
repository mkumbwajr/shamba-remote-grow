
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, MessageSquare, User, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const existingTickets = [
  {
    id: 1,
    title: 'Crop Matcher not showing results for my region',
    category: 'Technical',
    status: 'Open',
    priority: 'High',
    author: 'John Farmer',
    replies: 3,
    lastActivity: '2 hours ago',
    description: 'The crop matcher seems to be stuck loading when I select my region (Kilimanjaro). I\'ve tried refreshing but the issue persists.'
  },
  {
    id: 2,
    title: 'How to calculate ROI for mixed farming?',
    category: 'General',
    status: 'Answered',
    priority: 'Medium',
    author: 'Mary Agriculture',
    replies: 7,
    lastActivity: '1 day ago',
    description: 'I\'m growing both maize and beans on my farm. How should I calculate the return on investment for this mixed farming approach?'
  },
  {
    id: 3,
    title: 'Payment failed during marketplace checkout',
    category: 'Billing',
    status: 'In Progress',
    priority: 'High',
    author: 'Peter Crops',
    replies: 1,
    lastActivity: '3 hours ago',
    description: 'I was trying to buy seeds worth 50,000 TSH but the payment keeps failing. My M-Pesa has sufficient balance.'
  },
  {
    id: 4,
    title: 'Best practices for hiring seasonal workers',
    category: 'General',
    status: 'Answered',
    priority: 'Low',
    author: 'Grace Farming',
    replies: 12,
    lastActivity: '2 days ago',
    description: 'Looking for advice on how to find and hire reliable seasonal workers for harvest season.'
  },
  {
    id: 5,
    title: 'Mobile app version not syncing with web',
    category: 'Technical',
    status: 'Open',
    priority: 'Medium',
    author: 'Samuel Tech',
    replies: 2,
    lastActivity: '5 hours ago',
    description: 'Changes I make on the mobile app don\'t appear on the web version and vice versa.'
  }
];

const SupportForumSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: '',
    category: '',
    priority: '',
    description: ''
  });

  const categories = ['all', 'Technical', 'General', 'Billing', 'Marketplace', 'Crops'];
  const priorities = ['Low', 'Medium', 'High'];

  const filteredTickets = existingTickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ticket.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateTicket = () => {
    console.log('Creating ticket:', newTicket);
    // In real implementation, this would create a new support ticket
    setIsCreateTicketOpen(false);
    setNewTicket({ title: '', category: '', priority: '', description: '' });
    alert('Support ticket created successfully! Our team will respond within 24 hours.');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Answered':
        return 'bg-green-100 text-green-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-green-800">Support Forum</CardTitle>
              <p className="text-gray-600">Get help from the community and our support team</p>
            </div>
            <Dialog open={isCreateTicketOpen} onOpenChange={setIsCreateTicketOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Ticket
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create Support Ticket</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Brief description of your issue"
                      value={newTicket.title}
                      onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={newTicket.category} onValueChange={(value) => setNewTicket({...newTicket, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={newTicket.priority} onValueChange={(value) => setNewTicket({...newTicket, priority: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map(priority => (
                          <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Detailed description of your issue"
                      rows={4}
                      value={newTicket.description}
                      onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                    />
                  </div>
                  <Button 
                    onClick={handleCreateTicket} 
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={!newTicket.title || !newTicket.category || !newTicket.description}
                  >
                    Create Ticket
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tickets List */}
            <div className="space-y-3">
              {filteredTickets.map((ticket) => (
                <div key={ticket.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{ticket.title}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge className={`text-xs ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </Badge>
                      <Badge className={`text-xs ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{ticket.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {ticket.author}
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        {ticket.replies} replies
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {ticket.category}
                      </Badge>
                    </div>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {ticket.lastActivity}
                    </span>
                  </div>
                </div>
              ))}
              
              {filteredTickets.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No tickets found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportForumSection;
