
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, MessageSquare } from 'lucide-react';
import { useHiredWorkers } from '@/hooks/useHiredWorkers';
import { useChatMessages } from '@/hooks/useChat';
import { format } from 'date-fns';

interface ContactsListProps {
  selectedWorkerId: string | null;
  onSelectWorker: (workerId: string) => void;
}

const ContactsList = ({ selectedWorkerId, onSelectWorker }: ContactsListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: hiredWorkers } = useHiredWorkers();

  // Filter active workers only
  const activeWorkers = hiredWorkers?.filter(worker => worker.status === 'active') || [];

  // Filter workers based on search term
  const filteredWorkers = activeWorkers.filter(worker =>
    worker.worker_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.worker_specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Search header */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Contacts list */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredWorkers.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-sm">
                {searchTerm ? 'No contacts found' : 'No active workers to chat with'}
              </p>
            </div>
          ) : (
            filteredWorkers.map((worker) => (
              <ContactItem
                key={worker.id}
                worker={worker}
                isSelected={selectedWorkerId === worker.id}
                onSelect={() => onSelectWorker(worker.id)}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

interface ContactItemProps {
  worker: any;
  isSelected: boolean;
  onSelect: () => void;
}

const ContactItem = ({ worker, isSelected, onSelect }: ContactItemProps) => {
  const { data: messages = [] } = useChatMessages(worker.id);
  const lastMessage = messages[messages.length - 1];
  const hasUnreadMessages = messages.some(msg => !msg.read_at && msg.sender_type === 'worker');

  return (
    <div
      onClick={onSelect}
      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
        isSelected
          ? 'bg-forest-100 border border-forest-200'
          : 'hover:bg-gray-50 border border-transparent'
      }`}
    >
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src={`/placeholder-worker-${worker.worker_id}.jpg`} />
          <AvatarFallback className="bg-forest-100 text-forest-800">
            {worker.worker_name.split(' ').map((n: string) => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        {hasUnreadMessages && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900 truncate">
            {worker.worker_name}
          </p>
          {lastMessage && (
            <p className="text-xs text-gray-500">
              {format(new Date(lastMessage.created_at), 'HH:mm')}
            </p>
          )}
        </div>
        
        <p className="text-xs text-gray-500 truncate mb-1">
          {worker.worker_specialization}
        </p>
        
        {lastMessage ? (
          <p className="text-sm text-gray-600 truncate">
            {lastMessage.sender_type === 'user' ? 'You: ' : ''}
            {lastMessage.message}
          </p>
        ) : (
          <p className="text-sm text-gray-400 italic">No messages yet</p>
        )}
      </div>

      <div className="flex flex-col items-end space-y-1">
        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
          Active
        </Badge>
        {hasUnreadMessages && (
          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-medium">
              {messages.filter(msg => !msg.read_at && msg.sender_type === 'worker').length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsList;
