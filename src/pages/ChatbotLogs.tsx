
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, Calendar, ChevronDown, Download, RefreshCw } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type LogEntry = {
  id: string;
  timestamp: string;
  customer: string;
  phone: string;
  type: 'order' | 'inquiry' | 'payment' | 'fraud' | 'other';
  message: string;
  status: 'success' | 'warning' | 'error';
};

const LogTypeTag: React.FC<{ type: LogEntry['type'] }> = ({ type }) => {
  const typeMap: Record<LogEntry['type'], { label: string, className: string }> = {
    'order': { label: 'Order', className: 'bg-green-50 text-green-800 border-green-200' },
    'inquiry': { label: 'Inquiry', className: 'bg-blue-50 text-blue-800 border-blue-200' },
    'payment': { label: 'Payment', className: 'bg-purple-50 text-purple-800 border-purple-200' },
    'fraud': { label: 'Fraud Alert', className: 'bg-red-50 text-red-800 border-red-200' },
    'other': { label: 'Other', className: 'bg-gray-50 text-gray-800 border-gray-200' },
  };

  const { label, className } = typeMap[type];

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
};

const LogStatusTag: React.FC<{ status: LogEntry['status'] }> = ({ status }) => {
  const statusMap: Record<LogEntry['status'], { className: string }> = {
    'success': { className: 'bg-green-50 text-green-800 border-green-200' },
    'warning': { className: 'bg-yellow-50 text-yellow-800 border-yellow-200' },
    'error': { className: 'bg-red-50 text-red-800 border-red-200' },
  };

  const { className } = statusMap[status];
  const label = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
};

const ChatbotLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const logs: LogEntry[] = [
    { 
      id: 'LOG-9823', 
      timestamp: 'Today, 10:32 AM', 
      customer: 'Chioma Eze', 
      phone: '+234 809 123 4567',
      type: 'order', 
      message: 'Order placed via WhatsApp for ₦12,500',
      status: 'success'
    },
    { 
      id: 'LOG-9822', 
      timestamp: 'Today, 09:45 AM', 
      customer: 'Tunde Bakare', 
      phone: '+234 803 456 7890',
      type: 'payment', 
      message: 'Payment reminder sent for order #ORD-7820',
      status: 'success'
    },
    { 
      id: 'LOG-9821', 
      timestamp: 'Today, 09:15 AM', 
      customer: 'Unknown User', 
      phone: '+234 812 345 6789',
      type: 'fraud', 
      message: 'Suspicious order attempt detected and blocked',
      status: 'warning'
    },
    { 
      id: 'LOG-9820', 
      timestamp: 'Today, 08:22 AM', 
      customer: 'Fresh Foods Ltd', 
      phone: '+234 811 234 5678',
      type: 'inquiry', 
      message: 'Stock availability inquiry for tomatoes and carrots',
      status: 'success'
    },
    { 
      id: 'LOG-9819', 
      timestamp: 'Yesterday, 4:45 PM', 
      customer: 'Amaka Restaurants', 
      phone: '+234 812 345 6789',
      type: 'order', 
      message: 'Order modified via WhatsApp chat',
      status: 'success'
    },
    { 
      id: 'LOG-9818', 
      timestamp: 'Yesterday, 2:10 PM', 
      customer: 'Unknown User', 
      phone: '+234 705 678 9012',
      type: 'fraud', 
      message: 'Multiple failed payment attempts detected',
      status: 'error'
    },
    { 
      id: 'LOG-9817', 
      timestamp: 'Yesterday, 11:30 AM', 
      customer: 'Green Grocers', 
      phone: '+234 701 987 6543',
      type: 'other', 
      message: 'Delivery time inquiry processed by AI',
      status: 'success'
    },
  ];

  const filteredLogs = searchTerm
    ? logs.filter(
        (log) =>
          log.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : logs;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold">AI Chatbot Logs</h1>
            <p className="text-gray-500">Monitor conversations and interactions with customers</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Today
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button className="bg-veggie-600 hover:bg-veggie-700 flex items-center gap-2">
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Chatbot Activity Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <p className="text-gray-500 text-sm mb-1">Total Interactions</p>
                <p className="text-2xl font-bold">128</p>
                <p className="text-xs text-green-600">Today</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <p className="text-gray-500 text-sm mb-1">Orders Processed</p>
                <p className="text-2xl font-bold text-green-600">24</p>
                <p className="text-xs text-green-600">↑ 8% vs yesterday</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <p className="text-gray-500 text-sm mb-1">Payment Reminders</p>
                <p className="text-2xl font-bold text-blue-600">12</p>
                <p className="text-xs text-green-600">100% delivery rate</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <p className="text-gray-500 text-sm mb-1">Fraud Alerts</p>
                <p className="text-2xl font-bold text-red-600">3</p>
                <p className="text-xs text-green-600">All blocked successfully</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fadeIn">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
            <CardTitle className="text-xl font-bold">Recent Chatbot Logs</CardTitle>
            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search logs..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
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
                  <DropdownMenuItem>All Logs</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Log Type</DropdownMenuLabel>
                  <DropdownMenuItem>Orders</DropdownMenuItem>
                  <DropdownMenuItem>Inquiries</DropdownMenuItem>
                  <DropdownMenuItem>Payments</DropdownMenuItem>
                  <DropdownMenuItem>Fraud Alerts</DropdownMenuItem>
                  <DropdownMenuItem>Other</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Status</DropdownMenuLabel>
                  <DropdownMenuItem>Success</DropdownMenuItem>
                  <DropdownMenuItem>Warning</DropdownMenuItem>
                  <DropdownMenuItem>Error</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-6">
              <table className="w-full min-w-[800px] text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Log ID</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Timestamp</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Customer</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Type</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Message</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Status</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3 font-medium">{log.id}</td>
                      <td className="px-6 py-3 text-gray-500">{log.timestamp}</td>
                      <td className="px-6 py-3">
                        <div>
                          <div className="text-sm">{log.customer}</div>
                          <div className="text-xs text-gray-500">{log.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <LogTypeTag type={log.type} />
                      </td>
                      <td className="px-6 py-3">{log.message}</td>
                      <td className="px-6 py-3">
                        <LogStatusTag status={log.status} />
                      </td>
                      <td className="px-6 py-3">
                        <Button variant="ghost" size="sm">
                          View Details
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
      </main>
      
      <footer className="border-t border-gray-200 bg-white py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          &copy; 2023 Veggie World. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ChatbotLogs;
