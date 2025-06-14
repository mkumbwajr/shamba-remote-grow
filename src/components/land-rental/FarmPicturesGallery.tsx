
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Images } from 'lucide-react';

const FarmPicturesGallery: React.FC = () => {
  const farmImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=400&h=300&fit=crop',
      alt: 'Farm landscape with animals grazing'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=400&h=300&fit=crop',
      alt: 'Cattle on mountain farmland'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=400&h=300&fit=crop',
      alt: 'Cattle in forest area'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=400&h=300&fit=crop',
      alt: 'Deer on farmland near trees'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=400&h=300&fit=crop',
      alt: 'Camels on open field'
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
