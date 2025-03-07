
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
<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use App\\Models\\Order;
use Illuminate\\Support\\Facades\\Response;
use PDF;

class OrderExportController extends Controller
{
    /**
     * Export orders based on filters
     *
     * @param  \\Illuminate\\Http\\Request  $request
     * @return \\Illuminate\\Http\\Response
     */
    public function export(Request $request)
    {
        // Validate the request
        $request->validate([
            'format' => 'required|in:json,csv,excel,pdf',
            'dateRange' => 'nullable|string',
            'startDate' => 'nullable|date',
            'endDate' => 'nullable|date',
            'status' => 'nullable|string',
        ]);

        // Get filter parameters
        $format = $request->input('format');
        $dateRange = $request->input('dateRange');
        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');
        $status = $request->input('status');

        // Build the query with filters
        $query = Order::query();
        
        // Apply date filter
        if ($startDate && $endDate) {
            $query->whereBetween('created_at', [$startDate, $endDate]);
        }
        
        // Apply status filter
        if ($status && $status !== 'all') {
            $query->where('status', $status);
        }
        
        // Get data
        $orders = $query->get();
        
        // Handle different export formats
        switch ($format) {
            case 'json':
                return $this->exportJson($orders);
            case 'csv':
                return $this->exportCsv($orders);
            case 'excel':
                return $this->exportExcel($orders);
            case 'pdf':
                return $this->exportPdf($orders);
            default:
                return response()->json(['error' => 'Invalid format'], 400);
        }
    }

    /**
     * Export as JSON
     */
    private function exportJson($orders)
    {
        return response()->json($orders);
    }

    /**
     * Export as CSV
     */
    private function exportCsv($orders)
    {
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename=orders-export.csv',
        ];

        $callback = function() use ($orders) {
            $file = fopen('php://output', 'w');
            
            // Add headers
            fputcsv($file, ['ID', 'Customer', 'Date', 'Status', 'Total']);
            
            // Add rows
            foreach ($orders as $order) {
                fputcsv($file, [
                    $order->id,
                    $order->customer_name,
                    $order->created_at->format('Y-m-d'),
                    $order->status,
                    $order->total
                ]);
            }
            
            fclose($file);
        };

        return Response::stream($callback, 200, $headers);
    }

    /**
     * Export as Excel (using Laravel Excel package)
     */
    private function exportExcel($orders)
    {
        // Requires maatwebsite/excel package
        // composer require maatwebsite/excel
        
        return (new \\App\\Exports\\OrdersExport($orders))
            ->download('orders-export.xlsx');
    }

    /**
     * Export as PDF (using Laravel DomPDF)
     */
    private function exportPdf($orders)
    {
        // Requires barryvdh/laravel-dompdf package
        // composer require barryvdh/laravel-dompdf
        
        $pdf = PDF::loadView('exports.orders', ['orders' => $orders]);
        return $pdf->download('orders-export.pdf');
    }
}

/*
Route definition (routes/web.php or routes/api.php):

Route::post('/api/export-orders', [OrderExportController::class, 'export']);

Additional files required:

1. For Excel exports:
- Create app/Exports/OrdersExport.php class
- Install: composer require maatwebsite/excel

2. For PDF exports:
- Create resources/views/exports/orders.blade.php template
- Install: composer require barryvdh/laravel-dompdf

3. Order Model:
- Create database migrations and Order model
- Run: php artisan make:model Order -m
*/`;

  const copyBackendCode = () => {
    navigator.clipboard.writeText(backendExportCode);
    alert('Laravel backend code copied to clipboard!');
  };

  const downloadBackendCode = () => {
    const blob = new Blob([backendExportCode], { type: 'text/x-php' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "OrderExportController.php";
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
                Laravel Backend
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
            <DialogTitle>Laravel Backend for Order Exports</DialogTitle>
            <DialogDescription>
              Copy or download this Laravel controller code to implement server-side order exports.
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
