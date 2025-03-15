import React, { useState } from 'react';
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
  Info,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import TeamMemberDialog, { TeamMember } from '@/components/TeamMemberDialog';
import { toast } from "@/components/ui/use-toast";

const Settings = () => {
  // Sample team members data - in a real app, this would come from an API
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@veggieworld.com',
      role: 'admin',
      permissions: ['orders_view', 'orders_create', 'orders_edit', 'inventory_view', 'inventory_manage', 'customers_view', 'customers_manage', 'reports_view', 'settings_view', 'settings_manage', 'team_manage'],
      status: 'active'
    },
    {
      id: '2',
      name: 'Warehouse Manager',
      email: 'warehouse@veggieworld.com',
      role: 'manager',
      permissions: ['orders_view', 'orders_create', 'inventory_view', 'inventory_manage'],
      status: 'active'
    },
    {
      id: '3',
      name: 'Sales Associate',
      email: 'sales@veggieworld.com',
      role: 'staff',
      permissions: ['orders_view', 'customers_view'],
      status: 'invited'
    }
  ]);

  const handleAddTeamMember = (member: Omit<TeamMember, 'id'>) => {
    const newMember: TeamMember = {
      ...member,
      id: `user-${Date.now()}`, // Generate a temporary ID - in a real app, this would come from the backend
    };
    
    setTeamMembers(prev => [...prev, newMember]);
  };

  const handleUpdateTeamMember = (id: string, updatedMember: Omit<TeamMember, 'id'>) => {
    setTeamMembers(prev => 
      prev.map(member => member.id === id ? { ...updatedMember, id } : member)
    );
  };

  const handleDeleteTeamMember = (id: string) => {
    // Don't allow deleting the admin user
    if (id === '1') {
      toast({
        title: "Cannot delete admin",
        description: "The primary administrator account cannot be deleted.",
        variant: "destructive"
      });
      return;
    }
    
    setTeamMembers(prev => prev.filter(member => member.id !== id));
    toast({
      title: "Team member removed",
      description: "The team member has been removed successfully."
    });
  };

  const getStatusBadge = (status: 'active' | 'invited' | 'inactive') => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500"><CheckCircle2 className="h-3 w-3 mr-1" /> Active</Badge>;
      case 'invited':
        return <Badge variant="outline" className="text-amber-500 border-amber-500"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="text-gray-500"><AlertCircle className="h-3 w-3 mr-1" /> Inactive</Badge>;
    }
  };

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
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="permissions">Permissions</TabsTrigger>
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
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium">Team Members</h3>
                          <p className="text-sm text-gray-500">
                            Manage user accounts and access levels
                          </p>
                        </div>
                        <TeamMemberDialog onSave={handleAddTeamMember} />
                      </div>
                      
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {teamMembers.map((member) => (
                            <TableRow key={member.id}>
                              <TableCell className="font-medium">{member.name}</TableCell>
                              <TableCell>{member.email}</TableCell>
                              <TableCell className="capitalize">{member.role}</TableCell>
                              <TableCell>{getStatusBadge(member.status)}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                      <span className="sr-only">Open menu</span>
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem 
                                      onClick={() => {
                                        const memberToEdit = teamMembers.find(m => m.id === member.id);
                                        // This is handled by the TeamMemberDialog component directly
                                      }}
                                    >
                                      <TeamMemberDialog 
                                        trigger={<span className="w-full">Edit</span>}
                                        existingMember={member}
                                        onSave={(updatedMember) => handleUpdateTeamMember(member.id, updatedMember)}
                                      />
                                    </DropdownMenuItem>
                                    {member.status === 'invited' && (
                                      <DropdownMenuItem 
                                        onClick={() => {
                                          // Resend invitation logic would go here
                                          toast({
                                            title: "Invitation Resent",
                                            description: `A new invitation has been sent to ${member.email}`
                                          });
                                        }}
                                      >
                                        Resend Invitation
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem
                                      onClick={() => handleDeleteTeamMember(member.id)}
                                      className="text-red-600 focus:text-red-600"
                                    >
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
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
              
              <TabsContent value="permissions">
                <Card>
                  <CardHeader>
                    <CardTitle>Permission Settings</CardTitle>
                    <CardDescription>Configure role-based permissions for your team</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Default Role Permissions</h4>
                      <p className="text-sm text-gray-500">
                        These are the default permissions assigned to each role. You can customize individual permissions when editing a team member.
                      </p>
                      
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[200px]">Feature</TableHead>
                              <TableHead className="text-center">Administrator</TableHead>
                              <TableHead className="text-center">Manager</TableHead>
                              <TableHead className="text-center">Staff</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Orders</TableCell>
                              <TableCell className="text-center">Full Access</TableCell>
                              <TableCell className="text-center">Create & Edit</TableCell>
                              <TableCell className="text-center">View Only</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Inventory</TableCell>
                              <TableCell className="text-center">Full Access</TableCell>
                              <TableCell className="text-center">Manage</TableCell>
                              <TableCell className="text-center">View Only</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Customers</TableCell>
                              <TableCell className="text-center">Full Access</TableCell>
                              <TableCell className="text-center">Manage</TableCell>
                              <TableCell className="text-center">View Only</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Reports</TableCell>
                              <TableCell className="text-center">Full Access</TableCell>
                              <TableCell className="text-center">View</TableCell>
                              <TableCell className="text-center">Limited</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Settings</TableCell>
                              <TableCell className="text-center">Full Access</TableCell>
                              <TableCell className="text-center">No Access</TableCell>
                              <TableCell className="text-center">No Access</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Team Management</TableCell>
                              <TableCell className="text-center">Full Access</TableCell>
                              <TableCell className="text-center">No Access</TableCell>
                              <TableCell className="text-center">No Access</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
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
