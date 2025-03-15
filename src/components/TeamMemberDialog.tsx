
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, UserPlus } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  status: 'active' | 'invited' | 'inactive';
}

interface TeamMemberDialogProps {
  trigger?: React.ReactNode;
  className?: string;
  existingMember?: TeamMember;
  onSave?: (member: Omit<TeamMember, 'id'>) => void;
}

const availablePermissions: Permission[] = [
  { id: 'orders_view', name: 'View Orders', description: 'Can view all orders' },
  { id: 'orders_create', name: 'Create Orders', description: 'Can create new orders' },
  { id: 'orders_edit', name: 'Edit Orders', description: 'Can edit existing orders' },
  { id: 'inventory_view', name: 'View Inventory', description: 'Can view inventory items' },
  { id: 'inventory_manage', name: 'Manage Inventory', description: 'Can add and update inventory' },
  { id: 'customers_view', name: 'View Customers', description: 'Can view customer details' },
  { id: 'customers_manage', name: 'Manage Customers', description: 'Can add and edit customers' },
  { id: 'reports_view', name: 'View Reports', description: 'Can access reports' },
  { id: 'settings_view', name: 'View Settings', description: 'Can view system settings' },
  { id: 'settings_manage', name: 'Manage Settings', description: 'Can modify system settings' },
  { id: 'team_manage', name: 'Manage Team', description: 'Can add and edit team members' },
];

const TeamMemberDialog: React.FC<TeamMemberDialogProps> = ({ 
  trigger, 
  className, 
  existingMember,
  onSave 
}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(existingMember?.name || '');
  const [email, setEmail] = useState(existingMember?.email || '');
  const [role, setRole] = useState(existingMember?.role || 'staff');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    existingMember?.permissions || []
  );

  const isEditing = !!existingMember;

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setSelectedPermissions(prev => [...prev, permissionId]);
    } else {
      setSelectedPermissions(prev => prev.filter(id => id !== permissionId));
    }
  };

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
    
    // Preset permissions based on role
    if (newRole === 'admin') {
      setSelectedPermissions(availablePermissions.map(p => p.id));
    } else if (newRole === 'manager') {
      setSelectedPermissions([
        'orders_view', 'orders_create', 'orders_edit',
        'inventory_view', 'inventory_manage',
        'customers_view', 'customers_manage',
        'reports_view'
      ]);
    } else if (newRole === 'staff') {
      setSelectedPermissions(['orders_view', 'inventory_view', 'customers_view']);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Error",
        description: "Name and email are required fields",
        variant: "destructive"
      });
      return;
    }
    
    const memberData = {
      name,
      email,
      role,
      permissions: selectedPermissions,
      status: isEditing ? existingMember.status : 'invited' as const
    };

    if (onSave) {
      onSave(memberData);
    }
    
    toast({
      title: isEditing ? "Team member updated" : "Team member invited",
      description: `${name} has been ${isEditing ? 'updated' : 'invited'} successfully.`,
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className={`bg-veggie-600 hover:bg-veggie-700 ${className}`}>
            <UserPlus className="h-4 w-4 mr-2" /> {isEditing ? 'Edit Member' : 'Invite Team Member'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Team Member' : 'Invite New Team Member'}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Update details and permissions for this team member.' 
              : 'Send an invitation email and set permissions for a new team member.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Full Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <div className="col-span-3">
                <Select value={role} onValueChange={handleRoleChange}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  {role === 'admin' ? 'Full access to all features' : 
                   role === 'manager' ? 'Can manage orders, inventory, and customers' :
                   'Limited access to view-only features'}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              <Label className="text-right pt-2">
                Permissions
              </Label>
              <div className="col-span-3 space-y-4">
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {availablePermissions.map((permission) => (
                    <div key={permission.id} className="flex items-start space-x-2">
                      <Checkbox 
                        id={permission.id}
                        checked={selectedPermissions.includes(permission.id)}
                        onCheckedChange={(checked) => 
                          handlePermissionChange(permission.id, checked as boolean)
                        }
                      />
                      <div className="grid gap-0.5 leading-none">
                        <Label
                          htmlFor={permission.id}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {permission.name}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {permission.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-veggie-600 hover:bg-veggie-700">
              {isEditing ? 'Save Changes' : 'Send Invitation'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TeamMemberDialog;
