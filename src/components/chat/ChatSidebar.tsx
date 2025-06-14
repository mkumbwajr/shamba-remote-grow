
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useHiredWorkers } from '@/hooks/useHiredWorkers';
import { useChatMessages, useSendMessage } from '@/hooks/useChat';
import { format } from 'date-fns';

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ChatSidebar = ({ isOpen, onToggle }: ChatSidebarProps) => {
  const { data: hiredWorkers } = useHiredWorkers();
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter active workers only
  const activeWorkers = hiredWorkers?.filter(worker => worker.status === 'active') || [];

  const { data: messages = [] } = useChatMessages(selectedWorker || undefined);
  const sendMessage = useSendMessage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedWorker) return;

    try {
      await sendMessage.mutateAsync({
        hiredWorkerId: selectedWorker,
        message: newMessage.trim(),
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectedWorkerData = activeWorkers.find(w => w.id === selectedWorker);

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={onToggle}
          size="lg"
          className="rounded-full shadow-lg bg-forest-600 hover:bg-forest-700"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b bg-forest-50 rounded-t-lg">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4 text-forest-600" />
            <span className="font-medium text-forest-800">Worker Chat</span>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" onClick={onToggle}>
              {selectedWorker ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={onToggle}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        {!selectedWorker ? (
          // Worker selection
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-2">
              <p className="text-sm text-gray-600 mb-3">Select a worker to chat with:</p>
              {activeWorkers.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  No active workers to chat with
                </p>
              ) : (
                activeWorkers.map((worker) => (
                  <div
                    key={worker.id}
                    onClick={() => setSelectedWorker(worker.id)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-100"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder-worker-${worker.worker_id}.jpg`} />
                      <AvatarFallback className="bg-forest-100 text-forest-800 text-xs">
                        {worker.worker_name.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {worker.worker_name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {worker.worker_specialization}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        ) : (
          // Chat interface
          <>
            {/* Selected worker header */}
            <div className="flex items-center space-x-3 p-3 border-b bg-gray-50">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`/placeholder-worker-${selectedWorkerData?.worker_id}.jpg`} />
                <AvatarFallback className="bg-forest-100 text-forest-800 text-xs">
                  {selectedWorkerData?.worker_name.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {selectedWorkerData?.worker_name}
                </p>
                <p className="text-xs text-gray-500">
                  {selectedWorkerData?.worker_specialization}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedWorker(null)}
              >
                ←
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-3">
              <div className="space-y-3">
                {messages.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No messages yet. Start a conversation!
                  </p>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender_type === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-2 text-sm ${
                          message.sender_type === 'user'
                            ? 'bg-forest-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="break-words">{message.message}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender_type === 'user'
                              ? 'text-forest-100'
                              : 'text-gray-500'
                          }`}
                        >
                          {format(new Date(message.created_at), 'HH:mm')}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message input */}
            <div className="p-3 border-t">
              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1"
                  disabled={sendMessage.isPending}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || sendMessage.isPending}
                  size="sm"
                  className="bg-forest-600 hover:bg-forest-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
