
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import MarketplaceSearch from '@/components/marketplace/MarketplaceSearch';
import MarketplaceProducts from '@/components/marketplace/MarketplaceProducts';
import MarketplaceServices from '@/components/marketplace/MarketplaceServices';
import { useCart } from '@/contexts/CartContext';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all-categories');
  const { addToCart, getTotalItems } = useCart();

  console.log('Marketplace - selectedCategory:', selectedCategory);

  const categories = [
    'Seeds', 'Fertilizers', 'Tools', 'Pesticides', 'Equipment', 'Services'
  ].filter(category => {
    const isValid = category && typeof category === 'string' && category.trim() !== '' && category.length > 0;
    console.log('Marketplace - Filtering category:', category, 'isValid:', isValid, 'type:', typeof category, 'length:', category?.length);
    return isValid;
  });

  console.log('Marketplace - Final categories after filter:', categories);

  const products = [
    {
      id: 1,
      name: 'Hybrid Maize Seeds (10kg)',
      category: 'Seeds',
      price: 45,
      vendor: 'Kilimo Seeds Ltd',
      location: 'Arusha',
      rating: 4.8,
      stock: 150,
      image: '🌽',
      description: 'High-yield drought-resistant hybrid maize seeds',
      delivery: '2-3 days'
    },
    {
      id: 2,
      name: 'Organic Fertilizer (50kg)',
      category: 'Fertilizers',
      price: 35,
      vendor: 'Green Valley Agro',
      location: 'Moshi',
      rating: 4.6,
      stock: 80,
      image: '🌱',
      description: 'Premium organic compost fertilizer',
      delivery: '1-2 days'
    },
    {
      id: 3,
      name: 'Hand Hoe Set',
      category: 'Tools',
      price: 25,
      vendor: 'Shamba Tools Co',
      location: 'Dar es Salaam',
      rating: 4.7,
      stock: 200,
      image: '🔨',
      description: 'Durable hand tools for planting and weeding',
      delivery: '3-5 days'
    },
    {
      id: 4,
      name: 'Coffee Seedlings (100 pcs)',
      category: 'Seeds',
      price: 120,
      vendor: 'Mountain Coffee Nursery',
      location: 'Kilimanjaro',
      rating: 4.9,
      stock: 50,
      image: '☕',
      description: 'Premium Arabica coffee seedlings',
      delivery: '1-2 days'
    },
    {
      id: 5,
      name: 'NPK Fertilizer (25kg)',
      category: 'Fertilizers',
      price: 28,
      vendor: 'Agro Supplies TZ',
      location: 'Mwanza',
      rating: 4.5,
      stock: 120,
      image: '🧪',
      description: 'Balanced NPK fertilizer 20-10-10',
      delivery: '2-4 days'
    },
    {
      id: 6,
      name: 'Irrigation Sprinkler System',
      category: 'Equipment',
      price: 280,
      vendor: 'WaterWise Irrigation',
      location: 'Dodoma',
      rating: 4.8,
      stock: 30,
      image: '💧',
      description: 'Complete sprinkler system for 1 acre',
      delivery: '5-7 days'
    }
  ];

  const services = [
    {
      id: 1,
      name: 'Soil Testing Service',
      provider: 'AgriLab Tanzania',
      price: 25,
      duration: '2-3 days',
      rating: 4.9,
      description: 'Comprehensive soil analysis with recommendations',
      location: 'Mobile Service'
    },
    {
      id: 2,
      name: 'Crop Spraying Service',
      provider: 'PestControl Pro',
      price: 15,
      duration: '1 day',
      rating: 4.7,
      description: 'Professional pesticide application per acre',
      location: 'Arusha Region'
    },
    {
      id: 3,
      name: 'Harvesting Team',
      provider: 'Harvest Masters',
      price: 50,
      duration: '1-2 days',
      rating: 4.8,
      description: 'Professional harvesting team per acre',
      location: 'Northern Tanzania'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all-categories' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addProductToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      vendor: product.vendor,
      image: product.image,
      type: 'product'
    });
    console.log(`Added ${product.name} to cart`);
  };

  const addServiceToCart = (service: any) => {
    addToCart({
      id: service.id + 1000, // Offset service IDs to avoid conflicts
      name: service.name,
      price: service.price,
      vendor: service.provider,
      image: '🛠️',
      type: 'service'
    });
    console.log(`Added ${service.name} to cart`);
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      <MarketplaceHeader cartItems={getTotalItems()} />
      
      <MarketplaceSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      <Tabs defaultValue="products" className="space-y-4">
        <div className="flex justify-center sm:justify-start">
          <TabsList className="bg-white border border-forest-200 w-full sm:w-auto">
            <TabsTrigger value="products" className="flex-1 sm:flex-none">Products</TabsTrigger>
            <TabsTrigger value="services" className="flex-1 sm:flex-none">Services</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="products">
          <MarketplaceProducts products={filteredProducts} onAddToCart={addProductToCart} />
        </TabsContent>

        <TabsContent value="services">
          <MarketplaceServices services={services} onAddToCart={addServiceToCart} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Marketplace;
