
'use client'

import React from 'react';
import NavBar from '@/components/NavBar';
import DashboardStats from '@/components/DashboardStats';
import OrdersList from '@/components/OrdersList';
import InventoryStatus from '@/components/InventoryStatus';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Package, MessageSquare, ArrowRight, CreditCard } from 'lucide-react';
import NewOrderDialog from '@/components/NewOrderDialog';
import Link from 'next/link';

const Index = () => {
  const integrations = [
    { name: 'WhatsApp Business API', icon: <MessageSquare className="h-5 w-5 text-white" />, color: 'bg-green-500', status: 'Connected' },
    { name: 'Paystack', icon: <CreditCard className="h-5 w-5 text-white" />, color: 'bg-blue-500', status: 'Connected' },
    { name: 'Shopify', icon: <ShoppingCart className="h-5 w-5 text-white" />, color: 'bg-purple-500', status: 'Connected' },
    { name: 'Chowdeck', icon: <Package className="h-5 w-5 text-white" />, color: 'bg-orange-500', status: 'Not connected' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/reports">
              <Button variant="outline">
                Generate Report
              </Button>
            </Link>
            <NewOrderDialog />
          </div>
        </div>

        <div className="grid gap-6">
          <DashboardStats />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <OrdersList />
            </div>
            
            <div className="space-y-6">
              <Card className="animate-fadeIn">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Integrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {integrations.map((integration, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${integration.color}`}>
                            {integration.icon}
                          </div>
                          <span className="font-medium">{integration.name}</span>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={integration.status === 'Connected' 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : 'bg-gray-50 text-gray-700 border-gray-200'
                          }
                        >
                          {integration.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Link href="/integrations">
                    <Button variant="ghost" className="mt-4 w-full text-veggie-600 hover:text-veggie-700 hover:bg-veggie-50">
                      Manage Integrations <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="animate-fadeIn">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">AI Chatbot Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-md border border-green-100">
                      <p className="text-sm text-green-800 font-medium">24 orders processed via WhatsApp today</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
                      <p className="text-sm text-blue-800 font-medium">12 payment reminders sent automatically</p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-md border border-amber-100">
                      <p className="text-sm text-amber-800 font-medium">3 potential fraud attempts detected</p>
                    </div>
                  </div>
                  <Link href="/chatbot-logs">
                    <Button variant="ghost" className="mt-4 w-full text-veggie-600 hover:text-veggie-700 hover:bg-veggie-50">
                      View Chatbot Logs <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <InventoryStatus />
        </div>
      </main>
      
      <footer className="border-t border-gray-200 bg-white py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          &copy; 2023 Veggie World. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
