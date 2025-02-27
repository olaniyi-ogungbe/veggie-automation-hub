
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus } from 'lucide-react';

interface AddCustomerDialogProps {
  trigger?: React.ReactNode;
  className?: string;
}

const AddCustomerDialog: React.FC<AddCustomerDialogProps> = ({ trigger, className }) => {
  const [open, setOpen] = useState(false);
  const [customerType, setCustomerType] = useState("b2c");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the customer creation logic
    
    // Close the dialog
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className={`bg-veggie-600 hover:bg-veggie-700 ${className}`}>
            <Plus className="h-4 w-4 mr-2" /> Add Customer
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
          <DialogDescription>
            Enter customer details to add a new customer to your database.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Customer Type</Label>
              <RadioGroup defaultValue="b2c" onValueChange={setCustomerType} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="b2c" id="b2c" />
                  <Label htmlFor="b2c" className="font-normal">Consumer (B2C)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="b2b" id="b2b" />
                  <Label htmlFor="b2b" className="font-normal">Business (B2B)</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                {customerType === "b2b" ? "Business Name" : "Full Name"}
              </Label>
              <Input
                id="name"
                placeholder={customerType === "b2b" ? "Enter business name" : "Enter full name"}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                placeholder="Enter phone number"
                className="col-span-3"
              />
            </div>
            
            {customerType === "b2b" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contactPerson" className="text-right">
                  Contact Person
                </Label>
                <Input
                  id="contactPerson"
                  placeholder="Enter contact person name"
                  className="col-span-3"
                />
              </div>
            )}
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                placeholder="Enter address"
                className="col-span-3"
              />
            </div>
            
            {customerType === "b2b" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="taxId" className="text-right">
                  Tax ID
                </Label>
                <Input
                  id="taxId"
                  placeholder="Enter business tax ID"
                  className="col-span-3"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-veggie-600 hover:bg-veggie-700">
              Add Customer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomerDialog;
