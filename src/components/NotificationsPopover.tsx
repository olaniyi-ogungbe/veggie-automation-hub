
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell, ShoppingCart, CreditCard, MessageSquare, AlertTriangle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { ScrollArea } from "@/components/ui/scroll-area";

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'payment' | 'message' | 'alert';
};

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'order':
      return <ShoppingCart className="h-4 w-4 text-blue-500" />;
    case 'payment':
      return <CreditCard className="h-4 w-4 text-green-500" />;
    case 'message':
      return <MessageSquare className="h-4 w-4 text-purple-500" />;
    case 'alert':
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
  }
};

const NotificationsPopover = () => {
  const notifications: Notification[] = [
    {
      id: 'n1',
      title: 'New Order',
      message: 'Order #ORD-7829 has been placed by Chioma Eze',
      time: '2 mins ago',
      read: false,
      type: 'order'
    },
    {
      id: 'n2',
      title: 'Payment Successful',
      message: 'Payment of ₦12,500 received for order #ORD-7829',
      time: '3 mins ago',
      read: false,
      type: 'payment'
    },
    {
      id: 'n3',
      title: 'Inventory Alert',
      message: 'Tomatoes stock is critically low (35 units)',
      time: '15 mins ago',
      read: false,
      type: 'alert'
    },
    {
      id: 'n4',
      title: 'New Message',
      message: 'You have a new message from Fresh Foods Ltd',
      time: '1 hour ago',
      read: true,
      type: 'message'
    },
    {
      id: 'n5',
      title: 'Order Updated',
      message: 'Order #ORD-7825 status changed to "Delivered"',
      time: '2 hours ago',
      read: true,
      type: 'order'
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-500" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h4 className="font-medium text-sm">Notifications</h4>
          <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-gray-900">
            Mark all as read
          </Button>
        </div>
        <ScrollArea className="h-[300px]">
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-4 ${notification.read ? '' : 'bg-gray-50'}`}
              >
                <div className="flex items-start">
                  <div className="p-1.5 rounded-full bg-gray-100 mr-3 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">
                        {notification.title}
                        {!notification.read && (
                          <Badge 
                            variant="outline" 
                            className="ml-2 bg-blue-50 text-blue-700 border-blue-200 text-[10px] py-0 px-1.5"
                          >
                            New
                          </Badge>
                        )}
                      </p>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-2 border-t border-gray-100">
          <Button variant="outline" className="w-full text-xs">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
