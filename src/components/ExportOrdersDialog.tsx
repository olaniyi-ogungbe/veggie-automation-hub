
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

interface ExportOrdersDialogProps {
  trigger?: React.ReactNode;
  className?: string;
}

const ExportOrdersDialog: React.FC<ExportOrdersDialogProps> = ({ trigger, className }) => {
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState("csv");
  const [dateRange, setDateRange] = useState("last30");
  const [date, setDate] = React.useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the order export logic
    
    // Close the dialog
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className={className}>
            Export Orders
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Export Orders</DialogTitle>
          <DialogDescription>
            Select options to export your orders data.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Export Format</Label>
              <RadioGroup defaultValue="csv" onValueChange={setFormat} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="csv" id="csv" />
                  <Label htmlFor="csv" className="font-normal">CSV</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="excel" id="excel" />
                  <Label htmlFor="excel" className="font-normal">Excel</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pdf" id="pdf" />
                  <Label htmlFor="pdf" className="font-normal">PDF</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label>Date Range</Label>
              <RadioGroup defaultValue="last30" onValueChange={setDateRange} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all" className="font-normal">All Time</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="last30" id="last30" />
                  <Label htmlFor="last30" className="font-normal">Last 30 Days</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="last90" id="last90" />
                  <Label htmlFor="last90" className="font-normal">Last 90 Days</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom" className="font-normal">Custom Date Range</Label>
                </div>
              </RadioGroup>
            </div>
            
            {dateRange === "custom" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="orderStatus">Order Status</Label>
              <Select>
                <SelectTrigger id="orderStatus">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="packed">Packed</SelectItem>
                  <SelectItem value="awaiting">Awaiting Pickup</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-veggie-600 hover:bg-veggie-700">
              Export
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExportOrdersDialog;
