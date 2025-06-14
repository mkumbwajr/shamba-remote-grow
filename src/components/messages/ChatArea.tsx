
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, MessageSquare, Phone, Video, MoreVertical } from 'lucide-react';
import { useChatMessages, useSendMessage } from '@/hooks/useChat';
import { useHiredWorkers } from '@/hooks/useHiredWorkers';
import { format } from 'date-fns';

interface ChatAreaProps {
  selectedWorkerId: string | null;
}

const ChatArea = ({ selectedWorkerId }: ChatAreaProps) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: hiredWorkers } = useHiredWorkers();
  const { data: messages = [] } = useChatMessages(selectedWorkerId || undefined);
  const sendMessage = useSendMessage();

  const selectedWorker = hiredWorkers?.find(w => w.id === selectedWorkerId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedWorkerId) return;

    try {
      await sendMessage.mutateAsync({
        hiredWorkerId: selectedWorkerId,
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

  if (!selectedWorkerId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Select a contact to start messaging
          </h3>
          <p className="text-gray-500">
            Choose a worker from the list to begin your conversation
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`/placeholder-worker-${selectedWorker?.worker_id}.jpg`} />
            <AvatarFallback className="bg-forest-100 text-forest-800">
              {selectedWorker?.worker_name.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-gray-900">
              {selectedWorker?.worker_name}
            </h3>
            <p className="text-sm text-gray-500">
              {selectedWorker?.worker_specialization}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No messages yet. Start a conversation with {selectedWorker?.worker_name}!
              </p>
            </div>
          ) : (
            messages.map((message, index) => {
              const isCurrentUser = message.sender_type === 'user';
              const showAvatar = index === 0 || messages[index - 1].sender_type !== message.sender_type;
              
              return (
                <div
                  key={message.id}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} ${
                    showAvatar ? 'mt-4' : 'mt-1'
                  }`}
                >
                  <div className={`flex max-w-[70%] ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
                    {!isCurrentUser && showAvatar && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder-worker-${selectedWorker?.worker_id}.jpg`} />
                        <AvatarFallback className="bg-forest-100 text-forest-800 text-xs">
                          {selectedWorker?.worker_name.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    {!isCurrentUser && !showAvatar && <div className="w-8" />}
                    
                    <div
                      className={`rounded-2xl px-4 py-2 max-w-full ${
                        isCurrentUser
                          ? 'bg-forest-600 text-white rounded-br-sm'
                          : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                      }`}
                    >
                      <p className="break-words">{message.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          isCurrentUser ? 'text-forest-100' : 'text-gray-500'
                        }`}
                      >
                        {format(new Date(message.created_at), 'HH:mm')}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${selectedWorker?.worker_name}...`}
              className="pr-12"
              disabled={sendMessage.isPending}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || sendMessage.isPending}
            className="bg-forest-600 hover:bg-forest-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
