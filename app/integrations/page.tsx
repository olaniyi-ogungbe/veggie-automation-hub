
'use client'

import React from 'react';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ShoppingCart, Package, MessageSquare, CreditCard, Plus, Settings, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const integrations = [
  { 
    name: 'WhatsApp Business API', 
    icon: <MessageSquare className="h-5 w-5 text-white" />, 
    color: 'bg-green-500', 
    status: 'Connected',
    description: 'Process orders via WhatsApp and automate customer communication.',
    features: [
      'Order processing via chat',
      'Payment link generation',
      'Delivery notifications',
      'AI chatbot integration'
    ]
  },
  { 
    name: 'Paystack', 
    icon: <CreditCard className="h-5 w-5 text-white" />, 
    color: 'bg-blue-500', 
    status: 'Connected',
    description: 'Process payments and generate payment links for customers.',
    features: [
      'Payment processing',
      'Automatic payment links',
      'Transaction history',
      'Payment verification'
    ]
  },
  { 
    name: 'Shopify', 
    icon: <ShoppingCart className="h-5 w-5 text-white" />, 
    color: 'bg-purple-500', 
    status: 'Connected',
    description: 'Sync inventory and orders with your Shopify store.',
    features: [
      'Product sync',
      'Order import',
      'Inventory management',
      'Customer data sync'
    ]
  },
  { 
    name: 'Chowdeck', 
    icon: <Package className="h-5 w-5 text-white" />, 
    color: 'bg-orange-500', 
    status: 'Not connected',
    description: 'Integrate with Chowdeck for delivery and logistics.',
    features: [
      'Auto order forwarding',
      'Delivery tracking',
      'Logistics management',
      'Delivery cost calculation'
    ]
  },
];

const IntegrationCard = ({ integration }: { integration: typeof integrations[0] }) => {
  return (
    <Card className="animate-fadeIn">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${integration.color}`}>
              {integration.icon}
            </div>
            <CardTitle className="text-lg">{integration.name}</CardTitle>
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
        <CardDescription>{integration.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          {integration.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-gray-300"></div>
              <span className="text-sm text-gray-600">{feature}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          {integration.status === 'Connected' ? (
            <>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Settings className="h-4 w-4" /> Configure
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Active</span>
                <Switch checked={true} />
              </div>
            </>
          ) : (
            <Button className="w-full bg-veggie-600 hover:bg-veggie-700">
              Connect
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Integrations = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold">Integrations</h1>
            <p className="text-gray-500">Manage all your third-party integrations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" /> Sync All
            </Button>
            <Button className="bg-veggie-600 hover:bg-veggie-700">
              <Plus className="h-4 w-4 mr-2" /> Add Integration
            </Button>
          </div>
        </div>

        <Tabs defaultValue="active" className="mb-6">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="active">Active Integrations</TabsTrigger>
            <TabsTrigger value="available">Available Integrations</TabsTrigger>
            <TabsTrigger value="settings">API Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {integrations.filter(i => i.status === 'Connected').map((integration, index) => (
                <IntegrationCard key={index} integration={integration} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="available">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {integrations.filter(i => i.status === 'Not connected').map((integration, index) => (
                <IntegrationCard key={index} integration={integration} />
              ))}
              
              <Card className="border-dashed border-2 border-gray-300 bg-gray-50">
                <CardContent className="flex flex-col items-center justify-center h-full py-8">
                  <Plus className="h-8 w-8 text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium text-gray-600 mb-1">Add New Integration</h3>
                  <p className="text-sm text-gray-500 mb-4 text-center">Connect with other services to expand functionality</p>
                  <Button variant="outline">Browse Integration Directory</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>API Settings</CardTitle>
                <CardDescription>Manage your API keys and webhook endpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Webhook URL</h3>
                    <p className="text-sm text-gray-500">Use this URL to receive notifications from integrated services</p>
                    <div className="flex">
                      <div className="flex-1 bg-gray-50 border border-gray-300 rounded-l-md p-2 text-sm font-mono text-gray-700 overflow-x-auto">
                        https://api.veggieworld.com/webhooks/incoming
                      </div>
                      <Button variant="outline" className="rounded-l-none">Copy</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">API Keys</h3>
                    <p className="text-sm text-gray-500">Securely manage your API keys for third-party services</p>
                    <Button>Manage API Keys</Button>
                  </div>
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

export default Integrations;
