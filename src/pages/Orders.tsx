
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import OrdersList from '@/components/OrdersList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Filter, ChevronDown, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold">Orders</h1>
            <p className="text-gray-500">Manage all customer orders in one place</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              Export Orders
            </Button>
            <Button className="bg-veggie-600 hover:bg-veggie-700">
              <Plus className="h-4 w-4 mr-2" /> New Order
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Filter Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search by order ID, customer..."
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-1">
                        <Filter className="h-4 w-4" />
                        <span>Status</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Order Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>All Orders</DropdownMenuItem>
                      <DropdownMenuItem>Processing</DropdownMenuItem>
                      <DropdownMenuItem>Packed</DropdownMenuItem>
                      <DropdownMenuItem>Awaiting Pickup</DropdownMenuItem>
                      <DropdownMenuItem>Delivered</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-1">
                        <Filter className="h-4 w-4" />
                        <span>Payment</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Payment Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>All Payments</DropdownMenuItem>
                      <DropdownMenuItem>Paid</DropdownMenuItem>
                      <DropdownMenuItem>Pending</DropdownMenuItem>
                      <DropdownMenuItem>Failed</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-1">
                        <Filter className="h-4 w-4" />
                        <span>Source</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Order Source</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>All Sources</DropdownMenuItem>
                      <DropdownMenuItem>WhatsApp</DropdownMenuItem>
                      <DropdownMenuItem>Shopify</DropdownMenuItem>
                      <DropdownMenuItem>Chowdeck</DropdownMenuItem>
                      <DropdownMenuItem>Manual</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <OrdersList />
      </main>
      
      <footer className="border-t border-gray-200 bg-white py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          &copy; 2023 Veggie World. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Orders;
