
import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatTshAmount } from '@/utils/currency';
import { useNavigate } from 'react-router-dom';

interface CartSidebarProps {
  cartItems: number;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ cartItems }) => {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="border-forest-200 relative">
          <ShoppingCart className="h-4 w-4 mr-2" />
          <span className="sm:inline">Cart</span>
          {cartItems > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-crop-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {cartItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {items.length === 0 ? 'Your cart is empty' : `${items.length} item(s) in your cart`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-4 max-h-96 overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
              <div className="text-2xl">{item.image}</div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                <p className="text-xs text-gray-500">{item.vendor}</p>
                <p className="text-sm font-bold text-forest-800">{formatTshAmount(item.price)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="h-6 w-6 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="h-6 w-6 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeFromCart(item.id)}
                  className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-forest-800">{formatTshAmount(getTotalPrice())}</span>
              </div>
            </div>
            <Button 
              onClick={handleCheckout}
              className="w-full bg-forest-600 hover:bg-forest-700"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
