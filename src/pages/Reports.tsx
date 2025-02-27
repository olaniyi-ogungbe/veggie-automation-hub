
import React from 'react';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, FileDown, Calendar, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Reports = () => {
  const salesData = [
    { name: 'Jan', revenue: 120000 },
    { name: 'Feb', revenue: 150000 },
    { name: 'Mar', revenue: 135000 },
    { name: 'Apr', revenue: 180000 },
    { name: 'May', revenue: 220000 },
    { name: 'Jun', revenue: 195000 },
    { name: 'Jul', revenue: 250000 },
    { name: 'Aug', revenue: 235000 },
    { name: 'Sep', revenue: 280000 },
    { name: 'Oct', revenue: 300000 },
    { name: 'Nov', revenue: 340000 },
    { name: 'Dec', revenue: 380000 },
  ];

  const inventoryData = [
    { name: 'Tomatoes', stock: 35, capacity: 500 },
    { name: 'Carrots', stock: 128, capacity: 400 },
    { name: 'Lettuce', stock: 250, capacity: 300 },
    { name: 'Bell Peppers', stock: 420, capacity: 400 },
    { name: 'Cucumbers', stock: 210, capacity: 350 },
  ];

  const customerData = [
    { name: 'Jan', customers: 10 },
    { name: 'Feb', customers: 15 },
    { name: 'Mar', customers: 8 },
    { name: 'Apr', customers: 12 },
    { name: 'May', customers: 18 },
    { name: 'Jun', customers: 14 },
    { name: 'Jul', customers: 22 },
    { name: 'Aug', customers: 16 },
    { name: 'Sep', customers: 20 },
    { name: 'Oct', customers: 25 },
    { name: 'Nov', customers: 19 },
    { name: 'Dec', customers: 28 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold">Reports & Analytics</h1>
            <p className="text-gray-500">Gain insights into your business performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              This Year
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <FileDown className="h-4 w-4 mr-2" /> Export
            </Button>
            <Button className="bg-veggie-600 hover:bg-veggie-700">
              <BarChart className="h-4 w-4 mr-2" /> Generate Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="sales" className="mb-6">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="sales">Sales Reports</TabsTrigger>
            <TabsTrigger value="inventory">Inventory Reports</TabsTrigger>
            <TabsTrigger value="customers">Customer Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Sales Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <p className="text-gray-500 text-sm mb-1">Total Revenue</p>
                    <p className="text-2xl font-bold">₦5.7M</p>
                    <p className="text-xs text-green-600">↑ 12% from last year</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <p className="text-gray-500 text-sm mb-1">Orders</p>
                    <p className="text-2xl font-bold">2,458</p>
                    <p className="text-xs text-green-600">↑ 8% from last year</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <p className="text-gray-500 text-sm mb-1">Average Order Value</p>
                    <p className="text-2xl font-bold">₦23,500</p>
                    <p className="text-xs text-green-600">↑ 3% from last year</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <p className="text-gray-500 text-sm mb-1">Sales Growth</p>
                    <p className="text-2xl font-bold text-green-600">+12.4%</p>
                    <p className="text-xs text-green-600">Year-over-year</p>
                  </div>
                </div>
                
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={salesData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
                      <Bar dataKey="revenue" fill="#22c55e" name="Revenue" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex justify-between mt-4">
                  <p className="text-sm text-gray-500">Monthly Revenue - 2023</p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <FileDown className="h-4 w-4 mr-2" /> Export
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                      <DropdownMenuItem>Export as Excel</DropdownMenuItem>
                      <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inventory">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Inventory Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <p className="text-gray-500 text-sm mb-1">Total Items</p>
                    <p className="text-2xl font-bold">245</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <p className="text-gray-500 text-sm mb-1">Stock Value</p>
                    <p className="text-2xl font-bold">₦3.2M</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <p className="text-gray-500 text-sm mb-1">Low Stock Items</p>
                    <p className="text-2xl font-bold text-amber-500">24</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <p className="text-gray-500 text-sm mb-1">Restocking Cost</p>
                    <p className="text-2xl font-bold">₦850K</p>
                  </div>
                </div>
                
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={inventoryData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="stock" fill="#22c55e" name="Current Stock" />
                      <Bar dataKey="capacity" fill="#e2e8f0" name="Capacity" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="customers">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Customer Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <p className="text-gray-500 text-sm mb-1">Total Customers</p>
                    <p className="text-2xl font-bold">142</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <p className="text-gray-500 text-sm mb-1">New Customers</p>
                    <p className="text-2xl font-bold text-blue-500">38</p>
                    <p className="text-xs text-gray-500">This year</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <p className="text-gray-500 text-sm mb-1">Repeat Customers</p>
                    <p className="text-2xl font-bold text-green-500">78%</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <p className="text-gray-500 text-sm mb-1">Customer Growth</p>
                    <p className="text-2xl font-bold text-green-600">+22%</p>
                    <p className="text-xs text-green-600">Year-over-year</p>
                  </div>
                </div>
                
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={customerData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="customers" fill="#3b82f6" name="New Customers" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex justify-between mt-4">
                  <p className="text-sm text-gray-500">New Customers Acquisition - 2023</p>
                  <Button variant="outline" size="sm">
                    View Detailed Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="border-t border-gray-200 bg-white py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          &copy; 2023 Veggie World. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Reports;
