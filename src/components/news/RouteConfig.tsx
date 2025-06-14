
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NewsPage from '@/pages/News';

// This component shows how to add the News route to your existing App.tsx
// Add this route to your existing Routes component:
// <Route path="/news" element={<NewsPage />} />

const NewsRouteExample = () => {
  return (
    <Routes>
      <Route path="/news" element={<NewsPage />} />
    </Routes>
  );
};

export default NewsRouteExample;
