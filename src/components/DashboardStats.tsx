
import React from 'react';
import { TrendingUp, TrendingDown, Package, ShoppingCart, DollarSign, PieChart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type StatCardProps = {
  title: string;
  value: string;
  change: {
    value: string;
    positive: boolean;
  };
  icon: React.ReactNode;
  color: string;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md animate-fadeIn">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h4 className="text-2xl font-bold mt-1">{value}</h4>
            <div className={`flex items-center mt-1 text-sm ${change.positive ? 'text-green-600' : 'text-red-600'}`}>
              {change.positive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              <span>{change.value}</span>
            </div>
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardStats: React.FC = () => {
  const stats = [
    {
      title: "Today's Orders",
      value: "128",
      change: { value: "+12% vs yesterday", positive: true },
      icon: <ShoppingCart className="w-5 h-5 text-white" />,
      color: "bg-blue-500"
    },
    {
      title: "Total Revenue",
      value: "₦1,248,390",
      change: { value: "+8% vs last week", positive: true },
      icon: <DollarSign className="w-5 h-5 text-white" />,
      color: "bg-veggie-500"
    },
    {
      title: "Low Stock Items",
      value: "24",
      change: { value: "+3 since yesterday", positive: false },
      icon: <Package className="w-5 h-5 text-white" />,
      color: "bg-amber-500"
    },
    {
      title: "Pending Deliveries",
      value: "42",
      change: { value: "-7% vs yesterday", positive: true },
      icon: <PieChart className="w-5 h-5 text-white" />,
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default DashboardStats;
