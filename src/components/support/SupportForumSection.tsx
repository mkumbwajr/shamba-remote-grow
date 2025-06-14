
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, ThumbsUp, Clock, User, Plus } from 'lucide-react';

const forumTopics = [
  {
    id: 1,
    title: 'Best practices for maize farming in Arusha region',
    author: 'John Mwalimu',
    category: 'Crop Management',
    replies: 15,
    likes: 23,
    lastActivity: '2 hours ago',
    preview: 'I\'ve been farming maize for 5 years and wanted to share some techniques that have worked well...'
  },
  {
    id: 2,
    title: 'Soil testing services in Dar es Salaam',
    author: 'Mary Kimathi',
    category: 'Soil & Fertilizers',
    replies: 8,
    likes: 12,
    lastActivity: '5 hours ago',
    preview: 'Can anyone recommend reliable soil testing services in Dar es Salaam area?'
  },
  {
    id: 3,
    title: 'Hiring reliable farm workers - tips and experiences',
    author: 'Peter Njau',
    category: 'Workers',
    replies: 22,
    likes: 31,
    lastActivity: '1 day ago',
    preview: 'After hiring several workers through the platform, here are some tips I\'ve learned...'
  },
  {
    id: 4,
    title: 'Tomato market prices - current trends',
    author: 'Grace Mushi',
    category: 'Marketplace',
    replies: 6,
    likes: 9,
    lastActivity: '2 days ago',
    preview: 'Has anyone noticed the recent changes in tomato prices? What are your predictions...'
  }
];

const categories = ['All', 'Crop Management', 'Soil & Fertilizers', 'Workers', 'Marketplace', 'Equipment', 'Weather'];

const SupportForumSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTopic, setNewTopic] = useState({ title: '', category: '', content: '' });

  const filteredTopics = selectedCategory === 'All' 
    ? forumTopics 
    : forumTopics.filter(topic => topic.category === selectedCategory);

  const handleCreateTopic = () => {
    // In a real implementation, this would create a new forum topic
    console.log('Creating new topic:', newTopic);
    setShowCreateForm(false);
    setNewTopic({ title: '', category: '', content: '' });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Crop Management': 'bg-green-100 text-green-800',
      'Soil & Fertilizers': 'bg-brown-100 text-brown-800',
      'Workers': 'bg-blue-100 text-blue-800',
      'Marketplace': 'bg-purple-100 text-purple-800',
      'Equipment': 'bg-orange-100 text-orange-800',
      'Weather': 'bg-cyan-100 text-cyan-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-green-800">Community Support Forum</CardTitle>
              <p className="text-gray-600">Connect with other farmers and share knowledge</p>
            </div>
            <Button 
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Topic
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Create Topic Form */}
          {showCreateForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Create New Topic</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Topic title"
                  value={newTopic.title}
                  onChange={(e) => setNewTopic({...newTopic, title: e.target.value})}
                />
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newTopic.category}
                  onChange={(e) => setNewTopic({...newTopic, category: e.target.value})}
                >
                  <option value="">Select Category</option>
                  {categories.slice(1).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <Textarea
                  placeholder="Describe your question or share your knowledge..."
                  value={newTopic.content}
                  onChange={(e) => setNewTopic({...newTopic, content: e.target.value})}
                  rows={4}
                />
                <div className="flex space-x-2">
                  <Button onClick={handleCreateTopic} className="bg-green-600 hover:bg-green-700">
                    Create Topic
                  </Button>
                  <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Forum Topics */}
          <div className="space-y-4">
            {filteredTopics.map((topic) => (
              <div key={topic.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{topic.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{topic.preview}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{topic.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{topic.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getCategoryColor(topic.category)}>
                    {topic.category}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{topic.replies} replies</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{topic.likes} likes</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Discussion
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportForumSection;
