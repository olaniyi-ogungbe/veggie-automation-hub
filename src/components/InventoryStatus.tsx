
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

type InventoryItem = {
  id: string;
  name: string;
  category: string;
  stock: number;
  capacity: number;
  status: 'critical' | 'low' | 'normal' | 'overstocked';
};

const StockStatusBadge: React.FC<{ status: InventoryItem['status'] }> = ({ status }) => {
  const statusMap = {
    critical: { label: 'Critical', className: 'bg-red-100 text-red-800 hover:bg-red-100' },
    low: { label: 'Low', className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' },
    normal: { label: 'Normal', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
    overstocked: { label: 'Overstocked', className: 'bg-blue-100 text-blue-800 hover:bg-blue-100' },
  };

  const { label, className } = statusMap[status];

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
};

const StockProgressBar: React.FC<{ stock: number; capacity: number; status: InventoryItem['status'] }> = ({ 
  stock, 
  capacity, 
  status 
}) => {
  const percentage = Math.round((stock / capacity) * 100);
  
  const colorMap = {
    critical: 'bg-red-500',
    low: 'bg-yellow-500',
    normal: 'bg-green-500',
    overstocked: 'bg-blue-500',
  };

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>{stock} units</span>
        <span>{percentage}%</span>
      </div>
      <Progress value={percentage} className={`h-2 ${colorMap[status]}`} />
    </div>
  );
};

const InventoryStatus: React.FC = () => {
  const inventoryItems: InventoryItem[] = [
    { id: '001', name: 'Fresh Tomatoes', category: 'Vegetables', stock: 35, capacity: 500, status: 'critical' },
    { id: '002', name: 'Carrots', category: 'Vegetables', stock: 128, capacity: 400, status: 'low' },
    { id: '003', name: 'Lettuce', category: 'Vegetables', stock: 250, capacity: 300, status: 'normal' },
    { id: '004', name: 'Bell Peppers', category: 'Vegetables', stock: 420, capacity: 400, status: 'overstocked' },
    { id: '005', name: 'Cucumbers', category: 'Vegetables', stock: 210, capacity: 350, status: 'normal' },
  ];

  const criticalItems = inventoryItems.filter(item => item.status === 'critical').length;
  const lowItems = inventoryItems.filter(item => item.status === 'low').length;

  return (
    <Card className="animate-fadeIn">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          <CardTitle className="text-xl font-bold">Inventory Status</CardTitle>
          {(criticalItems > 0 || lowItems > 0) && (
            <div className="ml-3 flex items-center">
              <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
              <span className="text-sm text-amber-500 font-medium">
                {criticalItems} critical, {lowItems} low stock items
              </span>
            </div>
          )}
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          View All <ArrowRight className="h-3.5 w-3.5 ml-1" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto -mx-6">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left font-medium text-gray-500">Item</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Category</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 w-1/3">Stock Level</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 font-medium">{item.name}</td>
                  <td className="px-6 py-3">{item.category}</td>
                  <td className="px-6 py-3">
                    <StockStatusBadge status={item.status} />
                  </td>
                  <td className="px-6 py-3">
                    <StockProgressBar 
                      stock={item.stock} 
                      capacity={item.capacity} 
                      status={item.status} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryStatus;
