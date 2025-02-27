
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, ChevronDown, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Order = {
  id: string;
  customer: string;
  source: string;
  amount: string;
  date: string;
  status: 'processing' | 'packed' | 'awaiting' | 'delivered';
  payment: 'paid' | 'pending' | 'failed';
};

const OrderStatusBadge: React.FC<{ status: Order['status'] }> = ({ status }) => {
  const statusMap = {
    processing: { label: 'Processing', className: 'bg-blue-100 text-blue-800 hover:bg-blue-100' },
    packed: { label: 'Packed', className: 'bg-purple-100 text-purple-800 hover:bg-purple-100' },
    awaiting: { label: 'Awaiting Pickup', className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' },
    delivered: { label: 'Delivered', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
  };

  const { label, className } = statusMap[status];

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
};

const PaymentStatusBadge: React.FC<{ status: Order['payment'] }> = ({ status }) => {
  const statusMap = {
    paid: { label: 'Paid', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
    pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' },
    failed: { label: 'Failed', className: 'bg-red-100 text-red-800 hover:bg-red-100' },
  };

  const { label, className } = statusMap[status];

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
};

const SourceBadge: React.FC<{ source: string }> = ({ source }) => {
  const sourceMap: Record<string, { className: string }> = {
    'WhatsApp': { className: 'bg-green-50 text-green-800 border-green-200' },
    'Shopify': { className: 'bg-purple-50 text-purple-800 border-purple-200' },
    'Chowdeck': { className: 'bg-orange-50 text-orange-800 border-orange-200' },
    'Manual': { className: 'bg-gray-50 text-gray-800 border-gray-200' },
  };

  const { className } = sourceMap[source] || { className: 'bg-gray-50 text-gray-800 border-gray-200' };

  return (
    <Badge variant="outline" className={className}>
      {source}
    </Badge>
  );
};

const OrdersList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const orders: Order[] = [
    { id: 'ORD-7829', customer: 'Chioma Eze', source: 'WhatsApp', amount: '₦12,500', date: '2 mins ago', status: 'processing', payment: 'paid' },
    { id: 'ORD-7828', customer: 'Tunde Bakare', source: 'Shopify', amount: '₦8,750', date: '15 mins ago', status: 'packed', payment: 'paid' },
    { id: 'ORD-7827', customer: 'Fresh Foods Ltd', source: 'Manual', amount: '₦45,200', date: '1 hour ago', status: 'awaiting', payment: 'pending' },
    { id: 'ORD-7826', customer: 'Amaka Restaurants', source: 'WhatsApp', amount: '₦23,450', date: '2 hours ago', status: 'delivered', payment: 'paid' },
    { id: 'ORD-7825', customer: 'Green Grocers', source: 'Chowdeck', amount: '₦16,800', date: '3 hours ago', status: 'delivered', payment: 'paid' },
    { id: 'ORD-7824', customer: 'Folake Adeyemi', source: 'WhatsApp', amount: '₦5,300', date: '5 hours ago', status: 'delivered', payment: 'failed' },
  ];

  const filteredOrders = searchTerm
    ? orders.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : orders;

  return (
    <Card className="animate-fadeIn">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <CardTitle className="text-xl font-bold">Recent Orders</CardTitle>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>All Orders</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Order Status</DropdownMenuLabel>
                <DropdownMenuItem>Processing</DropdownMenuItem>
                <DropdownMenuItem>Packed</DropdownMenuItem>
                <DropdownMenuItem>Awaiting Pickup</DropdownMenuItem>
                <DropdownMenuItem>Delivered</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Payment Status</DropdownMenuLabel>
                <DropdownMenuItem>Paid</DropdownMenuItem>
                <DropdownMenuItem>Pending</DropdownMenuItem>
                <DropdownMenuItem>Failed</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Source</DropdownMenuLabel>
                <DropdownMenuItem>WhatsApp</DropdownMenuItem>
                <DropdownMenuItem>Shopify</DropdownMenuItem>
                <DropdownMenuItem>Chowdeck</DropdownMenuItem>
                <DropdownMenuItem>Manual</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="icon">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto -mx-6">
          <table className="w-full min-w-[800px] text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left font-medium text-gray-500">Order ID</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Customer</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Source</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Amount</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Date</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Payment</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 font-medium">{order.id}</td>
                  <td className="px-6 py-3">{order.customer}</td>
                  <td className="px-6 py-3">
                    <SourceBadge source={order.source} />
                  </td>
                  <td className="px-6 py-3 font-medium">{order.amount}</td>
                  <td className="px-6 py-3 text-gray-500">{order.date}</td>
                  <td className="px-6 py-3">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-3">
                    <PaymentStatusBadge status={order.payment} />
                  </td>
                  <td className="px-6 py-3">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <Button variant="outline" className="text-sm">Load More</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrdersList;
