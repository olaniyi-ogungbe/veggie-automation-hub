
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, MessageSquare, User, ChevronDown, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const NavBar: React.FC = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { label: 'Dashboard', href: '/', active: currentPath === '/' },
    { label: 'Orders', href: '/orders', active: currentPath === '/orders' },
    { label: 'Inventory', href: '/inventory', active: currentPath === '/inventory' },
    { label: 'Customers', href: '/customers', active: currentPath === '/customers' },
    { label: 'Reports', href: '/reports', active: currentPath === '/reports' },
    { label: 'Integrations', href: '/integrations', active: currentPath === '/integrations' },
  ];

  const MainMenu = () => (
    <div className="flex items-center space-x-6">
      {menuItems.map((item) => (
        <Link
          key={item.label}
          to={item.href}
          className={`text-sm font-medium transition-colors hover:text-veggie-600 ${
            item.active ? 'text-veggie-600' : 'text-gray-600'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );

  const MobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <div className="flex flex-col space-y-4 pt-6">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-veggie-50 ${
                item.active ? 'bg-veggie-50 text-veggie-600' : 'text-gray-600'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          {isMobile && <MobileMenu />}
          <Link to="/" className="font-bold text-2xl text-veggie-700 mr-8">
            Veggie<span className="text-veggie-500">World</span>
          </Link>
          {!isMobile && <MainMenu />}
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white">
              3
            </span>
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <MessageSquare className="h-5 w-5 text-gray-500" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-veggie-500 rounded-full flex items-center justify-center text-[10px] text-white">
              5
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-veggie-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-veggie-600" />
                </div>
                {!isMobile && (
                  <>
                    <span className="text-sm font-medium">Admin User</span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>System Logs</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
