
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ImageIcon, Send } from 'lucide-react';
import { useCreatePost } from '@/hooks/community';
import { toast } from 'sonner';

interface PostCreatorProps {
  userProfile: { full_name?: string | null } | null;
}

const PostCreator = ({ userProfile }: PostCreatorProps) => {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const createPost = useCreatePost();

  const handleSubmit = async () => {
    if (!content.trim() && !imageUrl.trim()) {
      toast.error('Please add some content or an image to your post');
      return;
    }

    try {
      await createPost.mutateAsync({
        content: content.trim() || null,
        image_url: imageUrl.trim() || null,
      });
      
      setContent('');
      setImageUrl('');
      setShowImageInput(false);
      toast.success('Post created successfully!');
    } catch (error) {
      toast.error('Failed to create post');
    }
  };

  return (
    <Card className="mb-6 shadow-sm">
      <CardContent className="p-4">
        <div className="flex space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="bg-blue-100 text-blue-800">
              {userProfile?.full_name ? userProfile.full_name.charAt(0).toUpperCase() : 'F'}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border-0 resize-none focus-visible:ring-0 text-lg placeholder:text-gray-500"
              rows={3}
            />
            
            {showImageInput && (
              <div className="mt-3">
                <Input
                  placeholder="Enter image URL..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="border border-gray-200"
                />
              </div>
            )}
            
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
              <Button
                variant="ghost"
                onClick={() => setShowImageInput(!showImageInput)}
                className="text-gray-600 hover:bg-gray-50"
              >
                <ImageIcon className="h-5 w-5 mr-2" />
                Photo
              </Button>
              
              <Button
                onClick={handleSubmit}
                disabled={createPost.isPending || (!content.trim() && !imageUrl.trim())}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4 mr-2" />
                Post
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCreator;
