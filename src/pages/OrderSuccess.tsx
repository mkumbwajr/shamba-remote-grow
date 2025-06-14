
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-green-600">Order Placed Successfully!</CardTitle>
            <CardDescription className="text-lg">
              Thank you for your purchase. Your order has been received and will be processed soon.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">What's Next?</h3>
              <ul className="text-sm text-green-700 space-y-1 text-left">
                <li>• You will receive a confirmation email shortly</li>
                <li>• Our team will contact you to confirm delivery details</li>
                <li>• Your order will be prepared and shipped within 2-3 business days</li>
                <li>• You can track your order status via email updates</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="flex items-center"
              >
                <Home className="h-4 w-4 mr-2" />
                Go to Dashboard
              </Button>
              <Button
                onClick={() => navigate('/marketplace')}
                className="bg-forest-600 hover:bg-forest-700 flex items-center"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderSuccess;
