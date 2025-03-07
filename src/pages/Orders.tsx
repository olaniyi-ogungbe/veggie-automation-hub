
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import OrdersList from '@/components/OrdersList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Filter, ChevronDown, Plus, Code } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import NewOrderDialog from '@/components/NewOrderDialog';
import ExportOrdersDialog from '@/components/ExportOrdersDialog';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showBackendDialog, setShowBackendDialog] = useState(false);

  const backendExportCode = `
// server.js - A simple Express.js backend for exporting orders

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Sample data - replace with your database queries
const getOrdersData = (dateRange, status) => {
  // This would be a database query in a real application
  return [
    { id: 'ORD-1001', customer: 'John Doe', date: '2023-04-15', status: 'Delivered', total: 95.60 },
    { id: 'ORD-1002', customer: 'Jane Smith', date: '2023-04-16', status: 'Processing', total: 45.25 },
    // Add more sample data here
  ];
};

app.post('/api/export-orders', (req, res) => {
  try {
    const { format, dateRange, startDate, endDate, status } = req.body;
    
    // Get the data based on filters
    const data = getOrdersData(dateRange, status);
    
    // Handle different export formats
    switch (format) {
      case 'csv':
        return exportCSV(res, data);
      case 'excel':
        return exportExcel(res, data);
      case 'pdf':
        return exportPDF(res, data);
      default:
        return res.json(data);
    }
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Export failed' });
  }
});

// CSV Export
function exportCSV(res, data) {
  try {
    const fields = Object.keys(data[0]);
    const parser = new Parser({ fields });
    const csv = parser.parse(data);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=orders-export.csv');
    return res.send(csv);
  } catch (error) {
    console.error('CSV export error:', error);
    res.status(500).json({ error: 'CSV export failed' });
  }
}

// Excel Export (simple CSV with Excel content type)
function exportExcel(res, data) {
  try {
    const fields = Object.keys(data[0]);
    const parser = new Parser({ fields });
    const csv = parser.parse(data);
    
    res.setHeader('Content-Type', 'application/vnd.ms-excel');
    res.setHeader('Content-Disposition', 'attachment; filename=orders-export.xls');
    return res.send(csv);
  } catch (error) {
    console.error('Excel export error:', error);
    res.status(500).json({ error: 'Excel export failed' });
  }
}

// PDF Export
function exportPDF(res, data) {
  try {
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=orders-export.pdf');
    
    doc.pipe(res);
    
    // Add title
    doc.fontSize(16).text('Orders Export', { align: 'center' });
    doc.moveDown();
    
    // Add table headers
    const fields = Object.keys(data[0]);
    let yPos = doc.y;
    let xPos = 50;
    
    fields.forEach(field => {
      doc.fontSize(10).text(field, xPos, yPos);
      xPos += 100;
    });
    
    doc.moveDown();
    
    // Add table rows
    data.forEach(row => {
      xPos = 50;
      yPos = doc.y;
      
      fields.forEach(field => {
        doc.fontSize(9).text(row[field], xPos, yPos);
        xPos += 100;
      });
      
      doc.moveDown();
    });
    
    doc.end();
  } catch (error) {
    console.error('PDF export error:', error);
    res.status(500).json({ error: 'PDF export failed' });
  }
}

app.listen(PORT, () => {
  console.log(\`Export server running on port \${PORT}\`);
});

// Required packages:
// npm install express cors json2csv pdfkit
`;

  const copyBackendCode = () => {
    navigator.clipboard.writeText(backendExportCode);
    alert('Backend code copied to clipboard!');
  };

  const downloadBackendCode = () => {
    const blob = new Blob([backendExportCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "export-orders-backend.js";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
            <DialogTrigger asChild onClick={() => setShowBackendDialog(true)}>
              <Button variant="outline" className="gap-2">
                <Code className="h-4 w-4" />
                Backend Code
              </Button>
            </DialogTrigger>
            <ExportOrdersDialog />
            <NewOrderDialog />
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
      
      <Dialog open={showBackendDialog} onOpenChange={setShowBackendDialog}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Node.js Backend for Order Exports</DialogTitle>
            <DialogDescription>
              Copy or download this Express.js backend code to implement server-side order exports.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[500px]">
              <pre className="text-sm">{backendExportCode}</pre>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={copyBackendCode}>
                Copy Code
              </Button>
              <Button className="bg-veggie-600 hover:bg-veggie-700" onClick={downloadBackendCode}>
                Download
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <footer className="border-t border-gray-200 bg-white py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          &copy; 2023 Veggie World. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Orders;
