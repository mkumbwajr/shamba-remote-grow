
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Images } from 'lucide-react';

const FarmPicturesGallery: React.FC = () => {
  const farmImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop',
      alt: 'Green wheat field landscape'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
      alt: 'Corn field with blue sky'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      alt: 'Rows of vegetable crops'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      alt: 'Sunflower field in bloom'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&h=300&fit=crop',
      alt: 'Agricultural terraced farmland'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Images className="h-5 w-5" />
          Farm Pictures
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {farmImages.map((image) => (
            <div
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FarmPicturesGallery;
