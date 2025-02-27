
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, Calendar, ChevronDown, Download, RefreshCw } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type LogEntry = {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  ip: string;
  details: string;
  level: 'info' | 'warning' | 'error';
};

const LogLevelBadge: React.FC<{ level: LogEntry['level'] }> = ({ level }) => {
  const levelMap: Record<LogEntry['level'], { label: string, className: string }> = {
    'info': { label: 'Info', className: 'bg-blue-50 text-blue-800 border-blue-200' },
    'warning': { label: 'Warning', className: 'bg-yellow-50 text-yellow-800 border-yellow-200' },
    'error': { label: 'Error', className: 'bg-red-50 text-red-800 border-red-200' },
  };

  const { label, className } = levelMap[level];

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
};

const SystemLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const logs: LogEntry[] = [
    { 
      id: 'LOG-9001', 
      timestamp: 'Today, 10:32:45 AM', 
      action: 'User Login', 
      user: 'admin@veggieworld.com', 
      ip: '192.168.1.1',
      details: 'Successful login',
      level: 'info'
    },
    { 
      id: 'LOG-9000', 
      timestamp: 'Today, 09:45:12 AM', 
      action: 'Order Created', 
      user: 'admin@veggieworld.com', 
      ip: '192.168.1.1',
      details: 'Created order #ORD-7829',
      level: 'info'
    },
    { 
      id: 'LOG-8999', 
      timestamp: 'Today, 09:15:33 AM', 
      action: 'Failed Payment', 
      user: 'system', 
      ip: '10.0.0.5',
      details: 'Payment failed for order #ORD-7820',
      level: 'warning'
    },
    { 
      id: 'LOG-8998', 
      timestamp: 'Today, 08:22:17 AM', 
      action: 'API Key Updated', 
      user: 'admin@veggieworld.com', 
      ip: '192.168.1.1',
      details: 'Updated WhatsApp API key',
      level: 'info'
    },
    { 
      id: 'LOG-8997', 
      timestamp: 'Yesterday, 16:45:55 PM', 
      action: 'Database Backup', 
      user: 'system', 
      ip: '10.0.0.5',
      details: 'Automatic database backup completed',
      level: 'info'
    },
    { 
      id: 'LOG-8996', 
      timestamp: 'Yesterday, 14:10:22 PM', 
      action: 'Security Alert', 
      user: 'system', 
      ip: '10.0.0.5',
      details: 'Multiple failed login attempts detected',
      level: 'error'
    },
    { 
      id: 'LOG-8995', 
      timestamp: 'Yesterday, 11:30:09 AM', 
      action: 'User Created', 
      user: 'admin@veggieworld.com', 
      ip: '192.168.1.1',
      details: 'Created new user account sales@veggieworld.com',
      level: 'info'
    },
  ];

  const filteredLogs = searchTerm
    ? logs.filter(
        (log) =>
          log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : logs;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold">System Logs</h1>
            <p className="text-gray-500">Track and analyze system activities and events</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Today
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button className="bg-veggie-600 hover:bg-veggie-700 flex items-center gap-2">
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Logs Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <p className="text-gray-500 text-sm mb-1">Total Logs</p>
                <p className="text-2xl font-bold">2,458</p>
                <p className="text-xs text-gray-500">Last 30 days</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <p className="text-gray-500 text-sm mb-1">Info Logs</p>
                <p className="text-2xl font-bold text-blue-600">2,105</p>
                <p className="text-xs text-gray-500">85.6% of total</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <p className="text-gray-500 text-sm mb-1">Warning Logs</p>
                <p className="text-2xl font-bold text-yellow-600">287</p>
                <p className="text-xs text-gray-500">11.7% of total</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <p className="text-gray-500 text-sm mb-1">Error Logs</p>
                <p className="text-2xl font-bold text-red-600">66</p>
                <p className="text-xs text-gray-500">2.7% of total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fadeIn">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
            <CardTitle className="text-xl font-bold">Recent System Logs</CardTitle>
            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search logs..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Filter</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>All Logs</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Log Level</DropdownMenuLabel>
                  <DropdownMenuItem>Info</DropdownMenuItem>
                  <DropdownMenuItem>Warning</DropdownMenuItem>
                  <DropdownMenuItem>Error</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>User</DropdownMenuLabel>
                  <DropdownMenuItem>All Users</DropdownMenuItem>
                  <DropdownMenuItem>System</DropdownMenuItem>
                  <DropdownMenuItem>Admin</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-6">
              <table className="w-full min-w-[800px] text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Log ID</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Timestamp</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Action</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">User</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Details</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Level</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3 font-medium">{log.id}</td>
                      <td className="px-6 py-3 text-gray-500">{log.timestamp}</td>
                      <td className="px-6 py-3">{log.action}</td>
                      <td className="px-6 py-3">
                        <div>
                          <div className="text-sm">{log.user}</div>
                          <div className="text-xs text-gray-500">{log.ip}</div>
                        </div>
                      </td>
                      <td className="px-6 py-3">{log.details}</td>
                      <td className="px-6 py-3">
                        <LogLevelBadge level={log.level} />
                      </td>
                      <td className="px-6 py-3">
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-4">
              <Button variant="outline" className="text-sm">Load More</Button>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <footer className="border-t border-gray-200 bg-white py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          &copy; 2023 Veggie World. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default SystemLogs;
