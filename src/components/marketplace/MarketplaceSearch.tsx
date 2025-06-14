
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface MarketplaceSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
}

const MarketplaceSearch: React.FC<MarketplaceSearchProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories
}) => {
  return (
    <Card className="bg-white border-forest-200">
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-forest-400" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-forest-200 text-sm sm:text-base"
            />
          </div>
          <Select value={selectedCategory} onValueChange={(value) => {
            console.log('Marketplace - Category selected:', value);
            setSelectedCategory(value);
          }}>
            <SelectTrigger className="w-full sm:w-48 border-forest-200">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-categories">All Categories</SelectItem>
              {categories.map((category) => {
                console.log('Marketplace - Rendering SelectItem for category:', category, 'length:', category.length, 'type:', typeof category);
                if (!category || typeof category !== 'string' || category.trim() === '') {
                  console.error('Marketplace - Skipping invalid category:', category);
                  return null;
                }
                return (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketplaceSearch;
