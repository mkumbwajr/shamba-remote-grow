
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, DollarSign, HardHat } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { formatTshAmount } from '@/utils/currency';

interface QuickStatsSectionProps {
  activeFarmsCount: number;
  activeWorkersCount: number;
  onActiveFarmsClick: () => void;
  onWorkersHiredClick: () => void;
}

export const QuickStatsSection: React.FC<QuickStatsSectionProps> = ({
  activeFarmsCount,
  activeWorkersCount,
  onActiveFarmsClick,
  onWorkersHiredClick,
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleTotalInvestmentClick = () => {
    navigate('/investment');
  };

  const quickStats = [
    { 
      title: String(t('activeFarms')), 
      value: activeFarmsCount.toString(), 
      icon: BarChart, 
      change: `${activeFarmsCount > 0 ? '+' : ''}${activeFarmsCount} active`,
      onClick: onActiveFarmsClick,
      clickable: true
    },
    { 
      title: String(t('totalInvestment')), 
      value: formatTshAmount(31250000), // 12,500 USD converted to TSH
      icon: DollarSign, 
      change: '+5%',
      onClick: handleTotalInvestmentClick,
      clickable: true
    },
    { 
      title: String(t('workersHired')), 
      value: activeWorkersCount.toString(), 
      icon: HardHat, 
      change: `${activeWorkersCount > 0 ? '+' : ''}${activeWorkersCount} active`,
      onClick: onWorkersHiredClick,
      clickable: true
    },
    { title: String(t('nextHarvest')), value: `30 ${String(t('days'))}`, icon: BarChart, change: 'Maize' },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {quickStats.map((stat) => (
        <Card 
          key={stat.title} 
          className={`shadow-sm hover:shadow-md transition-shadow ${stat.clickable ? 'cursor-pointer hover:bg-gray-50' : ''}`}
          onClick={stat.onClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <stat.icon className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <p className="text-xs text-gray-500">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
