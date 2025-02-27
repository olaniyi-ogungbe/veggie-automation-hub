
import React from 'react';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Mail, 
  MessageSquare, 
  CreditCard, 
  Globe, 
  Users, 
  Lock, 
  Info 
} from 'lucide-react';

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-gray-500">Configure application settings and preferences</p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-veggie-600 hover:bg-veggie-700">
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <SettingsIcon className="h-5 w-5 mr-2 text-veggie-600" />
                  <h3 className="text-lg font-medium">Settings</h3>
                </div>
                
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Bell className="h-4 w-4 mr-2" /> Notifications
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Mail className="h-4 w-4 mr-2" /> Email
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" /> Messaging
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <CreditCard className="h-4 w-4 mr-2" /> Billing
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Globe className="h-4 w-4 mr-2" /> Integrations
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Users className="h-4 w-4 mr-2" /> Team Members
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Lock className="h-4 w-4 mr-2" /> Security
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Info className="h-4 w-4 mr-2" /> About
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <Tabs defaultValue="notifications" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Configure how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Email Notifications</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="new-orders" className="flex-1">New orders</Label>
                          <Switch id="new-orders" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="order-updates" className="flex-1">Order status updates</Label>
                          <Switch id="order-updates" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="inventory-alerts" className="flex-1">Inventory alerts</Label>
                          <Switch id="inventory-alerts" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="payment-notifications" className="flex-1">Payment notifications</Label>
                          <Switch id="payment-notifications" defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">System Notifications</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="app-notifications" className="flex-1">In-app notifications</Label>
                          <Switch id="app-notifications" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="fraud-alerts" className="flex-1">Fraud alerts</Label>
                          <Switch id="fraud-alerts" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="chatbot-reports" className="flex-1">Chatbot daily reports</Label>
                          <Switch id="chatbot-reports" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="integrations">
                <Card>
                  <CardHeader>
                    <CardTitle>Integration Settings</CardTitle>
                    <CardDescription>Manage your third-party integrations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">WhatsApp Business API</h4>
                      <div className="space-y-2">
                        <Label htmlFor="whatsapp-api-key">API Key</Label>
                        <div className="flex gap-2">
                          <Input id="whatsapp-api-key" type="password" defaultValue="••••••••••••••••" />
                          <Button variant="outline">Update</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Paystack</h4>
                      <div className="space-y-2">
                        <Label htmlFor="paystack-secret-key">Secret Key</Label>
                        <div className="flex gap-2">
                          <Input id="paystack-secret-key" type="password" defaultValue="••••••••••••••••" />
                          <Button variant="outline">Update</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Shopify</h4>
                      <div className="space-y-2">
                        <Label htmlFor="shopify-api-key">API Key</Label>
                        <div className="flex gap-2">
                          <Input id="shopify-api-key" type="password" defaultValue="••••••••••••••••" />
                          <Button variant="outline">Update</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="team">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Settings</CardTitle>
                    <CardDescription>Manage your team members and permissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button>Invite Team Member</Button>
                      <p className="text-sm text-gray-500">
                        You currently have 5 team members with various permission levels.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm">Enhance your account security with 2FA</p>
                          <p className="text-xs text-gray-500">
                            You'll be asked for an additional authentication code when you sign in.
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Session Management</h4>
                      <Button variant="outline">Sign out from all devices</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
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

export default Settings;
