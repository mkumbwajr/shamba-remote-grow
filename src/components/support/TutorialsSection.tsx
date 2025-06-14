
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Clock, User } from 'lucide-react';

const tutorialCategories = [
  {
    title: 'Getting Started',
    tutorials: [
      {
        title: 'Account Setup and Profile Creation',
        duration: '5 min',
        difficulty: 'Beginner',
        description: 'Learn how to create your account and set up your farmer profile',
        videoId: 'tutorial-1',
        thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop'
      },
      {
        title: 'Dashboard Navigation',
        duration: '8 min',
        difficulty: 'Beginner',
        description: 'Complete guide to navigating the Bwana Shamba dashboard',
        videoId: 'tutorial-2',
        thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop'
      },
      {
        title: 'Setting Up Your First Farm',
        duration: '12 min',
        difficulty: 'Beginner',
        description: 'Step-by-step guide to adding your first farm to the platform',
        videoId: 'tutorial-3',
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop'
      }
    ]
  },
  {
    title: 'Crop Management',
    tutorials: [
      {
        title: 'Using the Crop Matcher',
        duration: '10 min',
        difficulty: 'Beginner',
        description: 'How to find the best crops for your location and conditions',
        videoId: 'tutorial-4',
        thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop'
      },
      {
        title: 'Tracking Crop Progress',
        duration: '15 min',
        difficulty: 'Intermediate',
        description: 'Monitor your crops from planting to harvest',
        videoId: 'tutorial-5',
        thumbnail: 'https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=400&h=250&fit=crop'
      },
      {
        title: 'Crop Analytics and Reports',
        duration: '20 min',
        difficulty: 'Advanced',
        description: 'Understanding yield analytics and performance reports',
        videoId: 'tutorial-6',
        thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop'
      }
    ]
  },
  {
    title: 'Marketplace',
    tutorials: [
      {
        title: 'Buying Seeds and Equipment',
        duration: '12 min',
        difficulty: 'Beginner',
        description: 'How to purchase farming supplies through the marketplace',
        videoId: 'tutorial-7',
        thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop'
      },
      {
        title: 'Selling Your Produce',
        duration: '18 min',
        difficulty: 'Intermediate',
        description: 'List and sell your crops on the marketplace',
        videoId: 'tutorial-8',
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop'
      },
      {
        title: 'Managing Orders and Payments',
        duration: '15 min',
        difficulty: 'Intermediate',
        description: 'Handle transactions and track your orders',
        videoId: 'tutorial-9',
        thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop'
      }
    ]
  },
  {
    title: 'Workers and Land',
    tutorials: [
      {
        title: 'Hiring Farm Workers',
        duration: '14 min',
        difficulty: 'Intermediate',
        description: 'Find, hire, and manage farm workers',
        videoId: 'tutorial-10',
        thumbnail: 'https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=400&h=250&fit=crop'
      },
      {
        title: 'Worker Contract Management',
        duration: '16 min',
        difficulty: 'Intermediate',
        description: 'Create contracts and manage worker relationships',
        videoId: 'tutorial-11',
        thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop'
      },
      {
        title: 'Renting Agricultural Land',
        duration: '20 min',
        difficulty: 'Advanced',
        description: 'Find and rent farmland through the platform',
        videoId: 'tutorial-12',
        thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop'
      }
    ]
  }
];

const TutorialsSection = () => {
  const handleWatchTutorial = (videoId: string) => {
    // In a real implementation, this would open a video player or navigate to the tutorial
    console.log(`Playing tutorial: ${videoId}`);
    alert('Tutorial video would play here. In the full implementation, this would open a video player.');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-green-800">How-To Tutorials</CardTitle>
          <p className="text-gray-600">Step-by-step guides to help you master Bwana Shamba</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {tutorialCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.tutorials.map((tutorial, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img 
                          src={tutorial.thumbnail} 
                          alt={tutorial.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      
                      <div className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-gray-900 leading-tight">{tutorial.title}</h4>
                        </div>
                        
                        <p className="text-sm text-gray-600">{tutorial.description}</p>
                        
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {tutorial.duration}
                          </Badge>
                          <Badge className={`text-xs ${getDifficultyColor(tutorial.difficulty)}`}>
                            <User className="w-3 h-3 mr-1" />
                            {tutorial.difficulty}
                          </Badge>
                        </div>
                        
                        <Button
                          onClick={() => handleWatchTutorial(tutorial.videoId)}
                          className="w-full bg-green-600 hover:bg-green-700"
                          size="sm"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Watch Tutorial
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorialsSection;
