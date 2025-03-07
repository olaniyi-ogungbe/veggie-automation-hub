
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format as formatDate } from "date-fns";
import { Calendar as CalendarIcon, Download } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ExportOrdersDialogProps {
  trigger?: React.ReactNode;
  className?: string;
}

const ExportOrdersDialog: React.FC<ExportOrdersDialogProps> = ({ trigger, className }) => {
  const [open, setOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState("csv");
  const [dateRange, setDateRange] = useState("last30");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [orderStatus, setOrderStatus] = useState("all");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsExporting(true);

    try {
      // Format the dates for the API request
      const formattedStartDate = startDate ? formatDate(startDate, "yyyy-MM-dd") : "";
      const formattedEndDate = endDate ? formatDate(endDate, "yyyy-MM-dd") : "";
      
      // Normally we'd call a real API here, but for demo purposes we'll generate sample data
      const exportData = generateSampleOrderData(20);
      
      // Create and download the file based on the selected format
      downloadExportFile(exportData, exportFormat);
      
      toast({
        title: "Export Successful",
        description: `Orders exported in ${exportFormat.toUpperCase()} format.`,
      });
      
      // Close the dialog after successful export
      setOpen(false);
    } catch (error) {
      console.error("Export failed:", error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your orders. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const generateSampleOrderData = (count: number) => {
    // Generate sample order data for demonstration
    const statuses = ["Processing", "Packed", "Awaiting Pickup", "Delivered"];
    const products = ["Spinach", "Carrots", "Tomatoes", "Cucumbers", "Lettuce"];
    
    return Array.from({ length: count }, (_, i) => ({
      orderId: `ORD-${1000 + i}`,
      customer: `Customer ${i + 1}`,
      date: formatDate(new Date(Date.now() - Math.random() * 7776000000), "yyyy-MM-dd"), // Random date in last 90 days
      status: statuses[Math.floor(Math.random() * statuses.length)],
      total: (Math.random() * 100 + 10).toFixed(2),
      items: Math.floor(Math.random() * 5) + 1,
      products: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
        products[Math.floor(Math.random() * products.length)]
      ).join(", ")
    }));
  };

  const downloadExportFile = (data: any[], format: string) => {
    let content = "";
    let mimeType = "";
    let fileExtension = "";
    
    switch (format) {
      case "csv":
        content = convertToCSV(data);
        mimeType = "text/csv";
        fileExtension = "csv";
        break;
      case "excel":
        // For Excel, we use CSV with specific Excel encoding
        content = convertToCSV(data);
        mimeType = "application/vnd.ms-excel";
        fileExtension = "xls";
        break;
      case "pdf":
        // PDF isn't easy to generate client-side, so we just show a placeholder message
        alert("PDF generation requires server-side processing. This is a demo only.");
        return;
      default:
        content = JSON.stringify(data, null, 2);
        mimeType = "application/json";
        fileExtension = "json";
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-export-${formatDate(new Date(), "yyyy-MM-dd")}.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return "";
    
    const headers = Object.keys(data[0]);
    const headerRow = headers.join(",");
    
    const rows = data.map(obj => {
      return headers.map(header => {
        const value = obj[header];
        // Handle values with commas by wrapping in quotes
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      }).join(",");
    });
    
    return [headerRow, ...rows].join("\n");
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
        <form onSubmit={handleExport}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Export Format</Label>
              <RadioGroup defaultValue="csv" onValueChange={setExportFormat} className="flex flex-col space-y-1">
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
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? formatDate(startDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
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
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? formatDate(endDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="orderStatus">Order Status</Label>
              <Select value={orderStatus} onValueChange={setOrderStatus}>
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
            <Button 
              type="submit" 
              className="bg-veggie-600 hover:bg-veggie-700"
              disabled={isExporting}
            >
              {isExporting ? "Exporting..." : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExportOrdersDialog;
