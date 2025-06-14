
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ImageIcon, Smile, MapPin } from 'lucide-react';
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
    <Card className="mb-4 bg-white rounded-xl shadow-sm border border-gray-200">
      <CardContent className="p-4">
        <div className="flex space-x-3">
          <Avatar className="h-10 w-10 ring-2 ring-gray-100">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="bg-blue-500 text-white font-semibold">
              {userProfile?.full_name ? userProfile.full_name.charAt(0).toUpperCase() : 'F'}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <Textarea
              placeholder={`What's on your mind, ${userProfile?.full_name?.split(' ')[0] || 'there'}?`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border-0 resize-none focus-visible:ring-0 text-base placeholder:text-gray-500 bg-gray-50 rounded-3xl px-4 py-3 min-h-[48px]"
              rows={1}
              style={{ resize: 'none' }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = Math.max(48, target.scrollHeight) + 'px';
              }}
            />
            
            {showImageInput && (
              <div className="mt-3">
                <Input
                  placeholder="Paste image URL here..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="border border-gray-200 rounded-lg"
                />
              </div>
            )}
            
            <div className="flex justify-between items-center mt-3">
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => setShowImageInput(!showImageInput)}
                  className="text-gray-600 hover:bg-gray-100 rounded-lg px-3 py-2 h-9"
                >
                  <ImageIcon className="h-5 w-5 mr-2 text-green-600" />
                  <span className="text-sm font-medium">Photo</span>
                </Button>
                
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:bg-gray-100 rounded-lg px-3 py-2 h-9"
                  disabled
                >
                  <Smile className="h-5 w-5 mr-2 text-yellow-600" />
                  <span className="text-sm font-medium">Feeling</span>
                </Button>
                
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:bg-gray-100 rounded-lg px-3 py-2 h-9"
                  disabled
                >
                  <MapPin className="h-5 w-5 mr-2 text-red-600" />
                  <span className="text-sm font-medium">Location</span>
                </Button>
              </div>
              
              <Button
                onClick={handleSubmit}
                disabled={createPost.isPending || (!content.trim() && !imageUrl.trim())}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2 h-9 text-sm font-medium disabled:opacity-50"
              >
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
