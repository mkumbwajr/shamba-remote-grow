
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface InventoryItem {
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

interface InventoryContextType {
  items: InventoryItem[];
  addPurchaseToInventory: (cartItems: any[]) => void;
  updateItemQuantity: (id: string, quantity: number, usedQuantity: number) => void;
  updateDeliveryStatus: (id: string, status: InventoryItem['deliveryStatus']) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

interface InventoryProviderProps {
  children: ReactNode;
}

export const InventoryProvider: React.FC<InventoryProviderProps> = ({ children }) => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  const addPurchaseToInventory = (cartItems: any[]) => {
    const newInventoryItems: InventoryItem[] = cartItems.map(cartItem => ({
      id: `inv_${Date.now()}_${cartItem.id}`,
      name: cartItem.name,
      type: cartItem.type,
      category: getItemCategory(cartItem.name),
      quantity: cartItem.quantity,
      usedQuantity: 0,
      price: cartItem.price,
      vendor: cartItem.vendor,
      image: cartItem.image,
      purchaseDate: new Date().toISOString().split('T')[0],
      deliveryStatus: cartItem.type === 'service' ? 'delivered' : 'pending',
      estimatedDelivery: cartItem.type === 'product' ? 
        new Date(Date.now() + (Math.random() * 7 + 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : 
        undefined,
      expiryDate: cartItem.type === 'product' && cartItem.name.toLowerCase().includes('seed') ?
        new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] :
        undefined
    }));

    setItems(prev => [...prev, ...newInventoryItems]);
    
    // Simulate delivery status updates
    newInventoryItems.forEach(item => {
      if (item.type === 'product') {
        setTimeout(() => {
          updateDeliveryStatus(item.id, 'shipped');
        }, 2000);
        
        setTimeout(() => {
          updateDeliveryStatus(item.id, 'delivered');
        }, 5000);
      }
    });
  };

  const updateItemQuantity = (id: string, quantity: number, usedQuantity: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity, usedQuantity }
          : item
      )
    );
  };

  const updateDeliveryStatus = (id: string, status: InventoryItem['deliveryStatus']) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, deliveryStatus: status }
          : item
      )
    );
  };

  const getItemCategory = (name: string): string => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('seed')) return 'Seeds';
    if (nameLower.includes('fertilizer')) return 'Fertilizers';
    if (nameLower.includes('tool') || nameLower.includes('hoe')) return 'Tools';
    if (nameLower.includes('service')) return 'Services';
    if (nameLower.includes('equipment') || nameLower.includes('irrigation')) return 'Equipment';
    return 'Other';
  };

  return (
    <InventoryContext.Provider
      value={{
        items,
        addPurchaseToInventory,
        updateItemQuantity,
        updateDeliveryStatus,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
