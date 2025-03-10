
'use client'

import React from 'react';
import NavBar from '@/components/NavBar';
import InventoryStatus from '@/components/InventoryStatus';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FileDown, BarChart3 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Inventory = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold">Inventory Management</h1>
            <p className="text-gray-500">Track and manage your stock levels and suppliers</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileDown className="h-4 w-4 mr-2" /> Export
            </Button>
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" /> Analytics
            </Button>
            <Button className="bg-veggie-600 hover:bg-veggie-700">
              <Plus className="h-4 w-4 mr-2" /> Add Item
            </Button>
          </div>
        </div>

        <Tabs defaultValue="items" className="mb-6">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="items">Inventory Items</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="purchase">Purchase Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="items">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Inventory Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <p className="text-gray-500 text-sm mb-1">Total Items</p>
                    <p className="text-2xl font-bold">245</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <p className="text-gray-500 text-sm mb-1">Low Stock</p>
                    <p className="text-2xl font-bold text-amber-500">24</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <p className="text-gray-500 text-sm mb-1">Out of Stock</p>
                    <p className="text-2xl font-bold text-red-500">7</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <p className="text-gray-500 text-sm mb-1">Overstocked</p>
                    <p className="text-2xl font-bold text-blue-500">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <InventoryStatus />
          </TabsContent>
          
          <TabsContent value="suppliers">
            <Card>
              <CardHeader>
                <CardTitle>Suppliers Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4">Manage your suppliers and vendor relationships.</p>
                <Button>Add New Supplier</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="purchase">
            <Card>
              <CardHeader>
                <CardTitle>Purchase Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4">Create and manage purchase orders for inventory restocking.</p>
                <Button>Create Purchase Order</Button>
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

export default Inventory;
