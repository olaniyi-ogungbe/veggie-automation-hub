
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MessageSquare, User, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type Chat = {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread: number;
};

const ChatPopover = () => {
  const chats: Chat[] = [
    {
      id: 'c1',
      name: 'Chioma Eze',
      lastMessage: 'Thank you for the swift delivery!',
      time: '5m',
      unread: 2
    },
    {
      id: 'c2',
      name: 'Fresh Foods Ltd',
      lastMessage: 'Can we place another order for tomorrow?',
      time: '15m',
      unread: 1
    },
    {
      id: 'c3',
      name: 'Tunde Bakare',
      lastMessage: "I'd like to modify my order",
      time: '30m',
      unread: 0
    },
    {
      id: 'c4',
      name: 'Green Grocers',
      lastMessage: "Thanks for the update. We'll be expecting the delivery.",
      time: '2h',
      unread: 0
    },
    {
      id: 'c5',
      name: 'Amaka Restaurants',
      lastMessage: 'Please send the delivery address again',
      time: '1d',
      unread: 0
    }
  ];

  const totalUnread = chats.reduce((sum, chat) => sum + chat.unread, 0);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <MessageSquare className="h-5 w-5 text-gray-500" />
          {totalUnread > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-veggie-500 rounded-full flex items-center justify-center text-[10px] text-white">
              {totalUnread}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Tabs defaultValue="chats" className="w-full">
          <div className="flex items-center justify-between p-2 border-b border-gray-100">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chats">Chats</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="chats" className="m-0">
            <ScrollArea className="h-[350px]">
              <div className="divide-y divide-gray-100">
                {chats.map((chat) => (
                  <div key={chat.id} className="p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9 mr-3">
                        {chat.avatar ? (
                          <AvatarImage src={chat.avatar} alt={chat.name} />
                        ) : (
                          <AvatarFallback className="bg-veggie-100 text-veggie-800">
                            {chat.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium truncate">{chat.name}</p>
                          <span className="text-xs text-gray-500">{chat.time}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                          {chat.unread > 0 && (
                            <span className="ml-2 h-4 w-4 bg-veggie-500 rounded-full flex items-center justify-center text-[10px] text-white">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-2 border-t border-gray-100">
              <div className="flex gap-2">
                <Input 
                  placeholder="Type a message..." 
                  className="h-9 text-sm"
                />
                <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="contacts" className="m-0">
            <div className="p-4 text-center text-sm text-gray-500">
              <User className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p>Your contacts will appear here</p>
              <Button variant="outline" className="mt-2 text-xs" size="sm">
                Import contacts
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default ChatPopover;
