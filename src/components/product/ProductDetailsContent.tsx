
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, MapPin, Package, Truck } from 'lucide-react';
import { formatTshAmount, calculateTotalPrice } from '@/utils/currency';
import { useCart } from '@/contexts/CartContext';
import ProductRating from './ProductRating';
import ProductComments from './ProductComments';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  vendor: string;
  location: string;
  rating: number;
  stock: number;
  image: string;
  description: string;
  delivery: string;
}

interface ProductDetailsContentProps {
  productId: string;
}

const ProductDetailsContent: React.FC<ProductDetailsContentProps> = ({ productId }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);

  // Mock products data - in a real app, this would come from an API
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
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop',
      description: 'High-yield drought-resistant hybrid maize seeds specially developed for East African growing conditions. These seeds offer excellent resistance to common pests and diseases while maintaining high nutritional value.',
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
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop',
      description: 'Premium organic compost fertilizer made from decomposed plant matter and animal manure. Rich in essential nutrients and beneficial microorganisms.',
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
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop',
      description: 'Durable hand tools for planting and weeding. Made from high-quality steel with comfortable ergonomic handles.',
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
      image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=400&h=400&fit=crop',
      description: 'Premium Arabica coffee seedlings ready for transplanting. Grown in ideal mountain conditions for optimal quality.',
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
      image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop',
      description: 'Balanced NPK fertilizer 20-10-10 for optimal plant growth and development.',
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
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop',
      description: 'Complete sprinkler system for 1 acre including all necessary components and installation guide.',
      delivery: '5-7 days'
    }
  ];

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(productId));
    setProduct(foundProduct || null);
  }, [productId]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto">
        <Button
          variant="outline"
          onClick={() => navigate('/marketplace')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Marketplace
        </Button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const totalPrice = calculateTotalPrice(product.price);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: totalPrice,
      vendor: product.vendor,
      image: product.image,
      type: 'product'
    });
    console.log(`Added ${product.name} to cart`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Button
        variant="outline"
        onClick={() => navigate('/marketplace')}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Marketplace
      </Button>

      {/* Product Details */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image and Basic Info */}
            <div>
              <div className="text-center mb-6">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-64 h-64 mx-auto object-cover rounded-lg mb-4"
                />
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-medium">{product.rating}</span>
                  <span className="text-gray-500">({product.stock} in stock)</span>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Vendor:</span>
                  <span className="font-medium">{product.vendor}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Location:
                  </span>
                  <span className="font-medium">{product.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center">
                    <Package className="h-4 w-4 mr-1" />
                    Stock:
                  </span>
                  <span className="font-medium">{product.stock} units</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center">
                    <Truck className="h-4 w-4 mr-1" />
                    Delivery:
                  </span>
                  <span className="font-medium">{product.delivery}</span>
                </div>
              </div>

              {/* Price and Actions */}
              <div className="bg-crop-50 border border-crop-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-crop-800 font-medium">Price per unit (incl. VAT)</span>
                  <span className="text-3xl font-bold text-crop-800">{formatTshAmount(totalPrice)}</span>
                </div>
                <div className="text-sm text-gray-500 text-right">Base: {formatTshAmount(product.price)}</div>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-forest-600 hover:bg-forest-700"
                >
                  Add to Cart
                </Button>
                <Button variant="outline" className="border-forest-200">
                  Contact Vendor
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Section */}
      <div className="mb-8">
        <ProductRating productId={productId} />
      </div>

      {/* Comments Section */}
      <div>
        <ProductComments productId={productId} />
      </div>
    </div>
  );
};

export default ProductDetailsContent;
