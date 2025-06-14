
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Truck, CheckCircle, AlertTriangle, Plus, Minus } from 'lucide-react';
import { formatTshAmount } from '@/utils/currency';
import { useToast } from '@/hooks/use-toast';

interface InventoryItem {
  id: string;
  name: string;
  type: 'product' | 'service';
  category: string;
  quantity: number;
  usedQuantity: number;
  price: number;
  vendor: string;
  image: string;
  purchaseDate: string;
  deliveryStatus: 'pending' | 'shipped' | 'delivered' | 'used';
  estimatedDelivery?: string;
  expiryDate?: string;
  notes?: string;
}

const InventoryContent = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();

  // Mock data - in real app this would come from a database
  useEffect(() => {
    const mockInventory: InventoryItem[] = [
      {
        id: '1',
        name: 'Hybrid Maize Seeds (10kg)',
        type: 'product',
        category: 'Seeds',
        quantity: 3,
        usedQuantity: 1,
        price: 45000,
        vendor: 'Kilimo Seeds Ltd',
        image: '🌽',
        purchaseDate: '2024-06-10',
        deliveryStatus: 'delivered',
        expiryDate: '2025-06-10',
        notes: 'Store in cool, dry place'
      },
      {
        id: '2',
        name: 'Organic Fertilizer (50kg)',
        type: 'product',
        category: 'Fertilizers',
        quantity: 2,
        usedQuantity: 0,
        price: 35000,
        vendor: 'Green Valley Agro',
        image: '🌱',
        purchaseDate: '2024-06-12',
        deliveryStatus: 'shipped',
        estimatedDelivery: '2024-06-15'
      },
      {
        id: '3',
        name: 'Soil Testing Service',
        type: 'service',
        category: 'Services',
        quantity: 1,
        usedQuantity: 1,
        price: 25000,
        vendor: 'AgriLab Tanzania',
        image: '🛠️',
        purchaseDate: '2024-06-08',
        deliveryStatus: 'used',
        notes: 'pH 6.5, needs potassium supplement'
      },
      {
        id: '4',
        name: 'Hand Hoe Set',
        type: 'product',
        category: 'Tools',
        quantity: 1,
        usedQuantity: 0,
        price: 25000,
        vendor: 'Shamba Tools Co',
        image: '🔨',
        purchaseDate: '2024-06-14',
        deliveryStatus: 'pending',
        estimatedDelivery: '2024-06-18'
      }
    ];

    setInventoryItems(mockInventory);
  }, []);

  const updateQuantity = (id: string, newQuantity: number, newUsedQuantity: number) => {
    setInventoryItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: newQuantity, usedQuantity: newUsedQuantity }
          : item
      )
    );
    
    toast({
      title: "Inventory Updated",
      description: "Stock levels have been updated successfully.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><AlertTriangle className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'shipped':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><Truck className="h-3 w-3 mr-1" />Shipped</Badge>;
      case 'delivered':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Delivered</Badge>;
      case 'used':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800"><Package className="h-3 w-3 mr-1" />Used</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredItems = inventoryItems.filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'products') return item.type === 'product';
    if (activeTab === 'services') return item.type === 'service';
    if (activeTab === 'low-stock') return item.quantity - item.usedQuantity <= 1;
    return true;
  });

  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = inventoryItems.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = inventoryItems.filter(item => item.quantity - item.usedQuantity <= 1).length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatTshAmount(totalValue)}</div>
            <p className="text-xs text-muted-foreground">Across {totalItems} items</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Items</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryItems.filter(item => item.deliveryStatus === 'delivered').length}</div>
            <p className="text-xs text-muted-foreground">Ready to use</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">Items need restocking</p>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="bg-white border-forest-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{item.image}</div>
                      <div>
                        <CardTitle className="text-lg text-forest-800">{item.name}</CardTitle>
                        <CardDescription>{item.vendor}</CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(item.deliveryStatus)}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Category:</span>
                      <p className="font-medium">{item.category}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Purchase Date:</span>
                      <p className="font-medium">{new Date(item.purchaseDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Quantity:</span>
                      <p className="font-medium">{item.quantity}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Available:</span>
                      <p className="font-medium text-green-600">{item.quantity - item.usedQuantity}</p>
                    </div>
                  </div>

                  {item.estimatedDelivery && item.deliveryStatus === 'shipped' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-800">
                        <Truck className="h-4 w-4 inline mr-1" />
                        Expected delivery: {new Date(item.estimatedDelivery).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {item.expiryDate && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <p className="text-sm text-orange-800">
                        Expires: {new Date(item.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {item.notes && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <p className="text-sm text-gray-700">{item.notes}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-lg font-bold text-forest-800">
                      {formatTshAmount(item.price * item.quantity)}
                    </div>
                    
                    {item.type === 'product' && item.deliveryStatus === 'delivered' && (
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity, Math.max(0, item.usedQuantity - 1))}
                          disabled={item.usedQuantity <= 0}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium">Used: {item.usedQuantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity, Math.min(item.quantity, item.usedQuantity + 1))}
                          disabled={item.usedQuantity >= item.quantity}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
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

export default InventoryContent;
