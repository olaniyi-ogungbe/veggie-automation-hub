
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, ArrowUpDown, Filter, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: string;
  type: 'b2b' | 'b2c';
  status: 'active' | 'inactive';
};

const CustomerTypeTag: React.FC<{ type: Customer['type'] }> = ({ type }) => {
  return (
    <Badge variant="outline" className={type === 'b2b' ? 'bg-blue-50 text-blue-800 border-blue-200' : 'bg-purple-50 text-purple-800 border-purple-200'}>
      {type === 'b2b' ? 'Business' : 'Consumer'}
    </Badge>
  );
};

const CustomerStatusTag: React.FC<{ status: Customer['status'] }> = ({ status }) => {
  return (
    <Badge variant="outline" className={status === 'active' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-gray-50 text-gray-800 border-gray-200'}>
      {status === 'active' ? 'Active' : 'Inactive'}
    </Badge>
  );
};

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const customers: Customer[] = [
    { id: 'CUS-001', name: 'Fresh Foods Ltd', email: 'orders@freshfoods.com', phone: '+234 811 234 5678', orders: 32, totalSpent: '₦578,900', type: 'b2b', status: 'active' },
    { id: 'CUS-002', name: 'Chioma Eze', email: 'chioma.eze@gmail.com', phone: '+234 809 123 4567', orders: 8, totalSpent: '₦42,300', type: 'b2c', status: 'active' },
    { id: 'CUS-003', name: 'Green Grocers', email: 'info@greengrocers.ng', phone: '+234 701 987 6543', orders: 25, totalSpent: '₦392,700', type: 'b2b', status: 'active' },
    { id: 'CUS-004', name: 'Tunde Bakare', email: 'tunde.b@yahoo.com', phone: '+234 803 456 7890', orders: 3, totalSpent: '₦18,500', type: 'b2c', status: 'inactive' },
    { id: 'CUS-005', name: 'Amaka Restaurants', email: 'orders@amaka-restaurants.com', phone: '+234 812 345 6789', orders: 48, totalSpent: '₦875,200', type: 'b2b', status: 'active' },
    { id: 'CUS-006', name: 'Folake Adeyemi', email: 'folake@example.com', phone: '+234 705 678 9012', orders: 5, totalSpent: '₦23,750', type: 'b2c', status: 'active' },
  ];

  const filteredCustomers = searchTerm
    ? customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : customers;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold">Customers</h1>
            <p className="text-gray-500">Manage your B2B and B2C customer relationships</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              Import
            </Button>
            <Button className="bg-veggie-600 hover:bg-veggie-700">
              <Plus className="h-4 w-4 mr-2" /> Add Customer
            </Button>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Customer Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <p className="text-gray-500 text-sm mb-1">Total Customers</p>
                <p className="text-2xl font-bold">142</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <p className="text-gray-500 text-sm mb-1">B2B Customers</p>
                <p className="text-2xl font-bold text-blue-500">38</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <p className="text-gray-500 text-sm mb-1">B2C Customers</p>
                <p className="text-2xl font-bold text-purple-500">104</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <p className="text-gray-500 text-sm mb-1">New This Month</p>
                <p className="text-2xl font-bold text-green-500">17</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fadeIn">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
            <CardTitle className="text-xl font-bold">Customer List</CardTitle>
            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search customers..."
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
                    <DropdownMenuItem>All Customers</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Customer Type</DropdownMenuLabel>
                    <DropdownMenuItem>B2B</DropdownMenuItem>
                    <DropdownMenuItem>B2C</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Status</DropdownMenuLabel>
                    <DropdownMenuItem>Active</DropdownMenuItem>
                    <DropdownMenuItem>Inactive</DropdownMenuItem>
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
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Customer ID</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Name</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Contact</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Type</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Orders</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Total Spent</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Status</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3 font-medium">{customer.id}</td>
                      <td className="px-6 py-3">{customer.name}</td>
                      <td className="px-6 py-3">
                        <div>
                          <div className="text-sm">{customer.email}</div>
                          <div className="text-xs text-gray-500">{customer.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <CustomerTypeTag type={customer.type} />
                      </td>
                      <td className="px-6 py-3 text-center font-medium">{customer.orders}</td>
                      <td className="px-6 py-3 font-medium">{customer.totalSpent}</td>
                      <td className="px-6 py-3">
                        <CustomerStatusTag status={customer.status} />
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
      </main>
      
      <footer className="border-t border-gray-200 bg-white py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          &copy; 2023 Veggie World. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Customers;
