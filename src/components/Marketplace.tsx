import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Search, MapPin, Star, Package, Truck, Leaf, Settings } from 'lucide-react';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all-categories');
  const [cartItems, setCartItems] = useState(0);

  console.log('Marketplace - selectedCategory:', selectedCategory);

  const categories = [
    'Seeds', 'Fertilizers', 'Tools', 'Pesticides', 'Equipment', 'Services'
  ];

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

  const addToCart = (product: any) => {
    setCartItems(prev => prev + 1);
    console.log(`Added ${product.name} to cart`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-forest-800">Marketplace</h2>
          <p className="text-forest-600">Seeds, tools, and services for your farming needs</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="border-forest-200 relative">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart
            {cartItems > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-crop-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {cartItems}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white border-forest-200">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-forest-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-forest-200"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-40 border-forest-200">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-categories">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="products" className="space-y-4">
        <TabsList className="bg-white border border-forest-200">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="bg-white border-forest-200 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{product.image}</div>
                      <div>
                        <CardTitle className="text-forest-800 text-lg">{product.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="bg-crop-50 border-crop-300 text-crop-700">
                            {product.category}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-forest-600">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-forest-800">${product.price}</p>
                      <p className="text-xs text-forest-600">per unit</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-forest-600">{product.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-forest-600">Vendor:</span>
                      <span className="text-forest-800 font-medium">{product.vendor}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-forest-600 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        Location:
                      </span>
                      <span className="text-forest-800">{product.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-forest-600 flex items-center">
                        <Package className="h-3 w-3 mr-1" />
                        Stock:
                      </span>
                      <span className="text-forest-800">{product.stock} units</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-forest-600 flex items-center">
                        <Truck className="h-3 w-3 mr-1" />
                        Delivery:
                      </span>
                      <span className="text-forest-800">{product.delivery}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-forest-600 hover:bg-forest-700"
                    >
                      Add to Cart
                    </Button>
                    <Button variant="outline" className="border-forest-200">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="services">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="bg-white border-forest-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-forest-800 flex items-center justify-between">
                    <span>{service.name}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-forest-600">{service.rating}</span>
                    </div>
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-forest-600">Provider:</span>
                      <span className="text-forest-800 font-medium">{service.provider}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-forest-600">Duration:</span>
                      <span className="text-forest-800">{service.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-forest-600">Coverage:</span>
                      <span className="text-forest-800">{service.location}</span>
                    </div>
                  </div>

                  <div className="bg-crop-50 border border-crop-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-crop-800 font-medium">Price per acre</span>
                      <span className="text-2xl font-bold text-crop-800">${service.price}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-forest-600 hover:bg-forest-700">
                      Book Service
                    </Button>
                    <Button variant="outline" className="border-forest-200">
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Marketplace;
