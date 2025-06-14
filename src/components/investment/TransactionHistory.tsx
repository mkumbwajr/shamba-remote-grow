
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownLeft, Calendar, DollarSign } from 'lucide-react';
import { formatTshAmount, convertUsdToTzs } from '@/utils/currency';

const TransactionHistory = () => {
  const transactions = [
    {
      id: 1,
      type: 'investment',
      description: 'Initial Farm Investment',
      amount: convertUsdToTzs(5000), // Convert 5000 USD to TSH
      date: '2024-06-10',
      category: 'Capital Investment',
      status: 'completed'
    },
    {
      id: 2,
      type: 'expense',
      description: 'Seeds Purchase - Maize',
      amount: convertUsdToTzs(850), // Convert 850 USD to TSH
      date: '2024-06-08',
      category: 'Seeds & Materials',
      status: 'completed'
    },
    {
      id: 3,
      type: 'expense',
      description: 'Farm Equipment Rental',
      amount: convertUsdToTzs(1200), // Convert 1200 USD to TSH
      date: '2024-06-05',
      category: 'Equipment',
      status: 'completed'
    },
    {
      id: 4,
      type: 'investment',
      description: 'Additional Funding',
      amount: convertUsdToTzs(3000), // Convert 3000 USD to TSH
      date: '2024-06-01',
      category: 'Capital Investment',
      status: 'completed'
    },
    {
      id: 5,
      type: 'expense',
      description: 'Worker Wages - Week 1',
      amount: convertUsdToTzs(450), // Convert 450 USD to TSH
      date: '2024-05-28',
      category: 'Labor',
      status: 'completed'
    },
    {
      id: 6,
      type: 'expense',
      description: 'Fertilizer Purchase',
      amount: convertUsdToTzs(320), // Convert 320 USD to TSH
      date: '2024-05-25',
      category: 'Seeds & Materials',
      status: 'completed'
    }
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Transaction History
        </CardTitle>
        <p className="text-sm text-gray-600">Complete record of all investments and expenses</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'investment' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'investment' ? (
                    <ArrowDownLeft className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{transaction.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {transaction.category}
                    </Badge>
                    <span className="text-xs text-gray-500">{transaction.date}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === 'investment' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'investment' ? '+' : '-'}{formatTshAmount(transaction.amount)}
                </p>
                <Badge 
                  variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {transaction.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
