'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Ban, CheckCheck, MessageSquare, MoreVertical, Pin, Search, Send, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

// Initial Mock Data
const initialContacts = [
  {
    id: 1,
    name: 'Jhon Deo',
    lastMessage: 'Victor is typing ...',
    time: '10m',
    unread: 12,
    typing: true,
    category: 'pinned',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop',
    role: 'Guest . Deluxe Suite',
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    lastMessage: 'ok, thanks!',
    time: '1h',
    read: true,
    category: 'pinned',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
    role: 'Luxury Property Specialist',
  },
  {
    id: 3,
    name: 'Michael Ross',
    lastMessage: 'Your application...',
    time: '2h',
    unread: 3,
    category: 'pinned',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&fit=crop',
    role: 'Guest . Standard Room',
  },
  {
    id: 4,
    name: 'Amelia Chen',
    lastMessage: 'Can you check the...',
    time: '5m',
    unread: 1,
    typing: false,
    category: 'all',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    role: 'Guest . Family Villa',
  },
  {
    id: 5,
    name: 'David Kim',
    lastMessage: 'The check-in was...',
    time: 'Yesterday',
    read: true,
    category: 'all',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    role: 'Guest . Ocean Front',
  },
];

const initialMessages = {
  1: [
    { id: 101, text: "Hello! Is the apartment available?", sender: 'them', time: '10:00 AM' },
    { id: 102, text: "Yes it is! When are you planning to visit?", sender: 'me', time: '10:05 AM' },
  ],
  2: [
    { id: 201, text: "Hello Alex! I've confirmed the viewing for the Midtown Penthouse tomorrow at 2:00 PM. Does that time still work for you?", sender: 'them', time: '01:20 AM' },
    { id: 202, text: "That's great, Sarah! Yes, 2:00 PM works perfectly. Should I meet you at the main entrance or at the sales office?", sender: 'me', time: '01:22 AM' },
    { id: 203, text: "Please meet me at the main entrance. I'll have the access cards ready. I'm also bringing the updated floor plan we discussed.", sender: 'them', time: '01:25 AM' },
  ],
  3: [
    { id: 301, text: "Hi, I have a question about the parking space.", sender: 'them', time: 'Yesterday' },
  ],
  4: [
    { id: 401, text: "Hi Amelia, how can I help you today?", sender: 'me', time: '09:00 AM' },
    { id: 402, text: "Can you check if the early check-in is supported for my booking?", sender: 'them', time: '09:05 AM' },
  ],
  5: [
    { id: 501, text: "The check-in was very smooth, thank you!", sender: 'them', time: 'Yesterday' },
    { id: 502, text: "Glad to hear that, David! Enjoy your stay.", sender: 'me', time: 'Yesterday' },
  ],
};

export default function MessagesPage() {
  const [activeContactId, setActiveContactId] = useState(2);
  const [messagesByContact, setMessagesByContact] = useState(initialMessages);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeContact = useMemo(() =>
    initialContacts.find(c => c.id === activeContactId) || initialContacts[0]
    , [activeContactId]);

  const filteredContacts = useMemo(() => {
    return initialContacts.filter(c =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const pinnedContacts = filteredContacts.filter(c => c.category === 'pinned');
  const otherContacts = filteredContacts.filter(c => c.category === 'all');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeContactId, messagesByContact]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: messageInput.trim(),
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessagesByContact(prev => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId as keyof typeof prev] || []), newMessage]
    }));
    setMessageInput('');
  };

  return (
    <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 flex overflow-hidden h-[calc(100vh-140px)] max-h-[900px]">

      {/* LEFT SIDEBAR - CONTACTS */}
      <aside className="w-full max-w-[340px] flex flex-col border-r border-[#F2F2F2] bg-white">
        {/* Search */}
        <div className="p-5 border-b border-[#F2F2F2]">
          <div className="relative flex items-center w-full h-12 bg-[#F5F5F5] rounded-xl px-4 text-[#A1A1A1]">
            <Search size={20} strokeWidth={2} />
            <input
              type="text"
              placeholder="Search Now"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none w-full h-full ml-3 text-sm font-medium text-[#2C2E33] placeholder:text-[#A1A1A1]"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pb-10">
          {/* Pinned Section */}
          {pinnedContacts.length > 0 && (
            <div className="pt-4">
              <div className="px-5 mb-2 flex items-center gap-2 text-[#6C757D]">
                <Pin size={16} strokeWidth={2.5} className="text-[#6C757D]" />
                <span className="text-[13px] font-bold uppercase tracking-wide">Pinned</span>
              </div>
              <div className="flex flex-col">
                {pinnedContacts.map((contact) => (
                  <ContactItem
                    key={contact.id}
                    contact={contact}
                    isActive={activeContactId === contact.id}
                    onClick={() => setActiveContactId(contact.id)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="w-full h-[1px] bg-[#F2F2F2] my-2" />

          {/* All Messages */}
          <div className="py-2">
            <div className="px-5 mb-2 flex items-center gap-2 text-[#6C757D]">
              <MessageSquare size={16} strokeWidth={2.5} className="text-[#6C757D]" />
              <span className="text-[13px] font-bold uppercase tracking-wide">All Messages</span>
            </div>
            <div className="flex flex-col">
              {otherContacts.length > 0 ? otherContacts.map((contact) => (
                <ContactItem
                  key={contact.id}
                  contact={contact}
                  isActive={activeContactId === contact.id}
                  onClick={() => setActiveContactId(contact.id)}
                />
              )) : (
                <div className="px-5 py-4 text-center text-[#6C757D] text-[13px] font-medium">No results found</div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* RIGHT MAIN AREA - CHAT */}
      <main className="flex-1 flex flex-col bg-[#FAFAFA]">
        {/* Chat Header */}
        <div className="h-[90px] flex items-center justify-between px-8 bg-white border-b border-[#F2F2F2] flex-shrink-0 relative z-10 shadow-sm shadow-[#1E2024]/[0.02]">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200 shadow-sm border-2 border-white">
              <Image src={activeContact.avatar} alt={activeContact.name} fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-[20px] font-bold text-[#2C2E33] leading-tight">{activeContact.name}</h2>
              <p className="text-[#6C757D] text-[12px] font-bold mt-0.5 uppercase tracking-wide">
                Online . {activeContact.role}
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="text-[#A1A1A1] hover:text-[#2C2E33] transition-colors p-2 rounded-full hover:bg-gray-100 cursor-pointer outline-none ring-0">
              <MoreVertical size={24} strokeWidth={2} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] bg-white rounded-xl shadow-xl border-[#F2F2F2] p-1.5 animate-in fade-in zoom-in-95 duration-200">

              <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 text-[14px] font-semibold text-[#DC3545] hover:bg-red-50 rounded-lg cursor-pointer transition-colors focus:bg-red-50 outline-none">
                <Trash2 size={18} />
                Clear Chat
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 text-[14px] font-semibold text-[#DC3545] hover:bg-red-50 rounded-lg cursor-pointer transition-colors focus:bg-red-50 outline-none">
                <Ban size={18} />
                Block Contact
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Messages History */}
        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 relative z-0 custom-scrollbar">
          <div className="flex justify-center w-full mb-4">
            <span className="bg-white px-4 py-1.5 rounded-lg text-[13px] font-bold text-[#6C757D] shadow-sm shadow-gray-200/50">
              Today, March 12
            </span>
          </div>

          {messagesByContact[activeContactId as keyof typeof messagesByContact]?.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'me' ? 'items-end self-end' : 'items-start'} max-w-[70%]`}
            >
              <div className={`flex items-end gap-3 ${msg.sender === 'me' ? 'flex-row-reverse' : ''}`}>
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 shadow-sm mb-4 border-2 border-white">
                  <Image
                    src={msg.sender === 'me' ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150' : activeContact.avatar}
                    alt={msg.sender}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <div className={`p-4 rounded-[16px] shadow-sm border ${msg.sender === 'me'
                    ? 'bg-[#F1913D] border-[#F1913D] rounded-br-sm text-white'
                    : 'bg-white border-gray-100 rounded-bl-sm text-[#2C2E33]'
                    } text-[15px] font-medium leading-relaxed`}>
                    {msg.text}
                  </div>
                  <div className={`text-[11px] font-bold text-[#A1A1A1] mt-1.5 ${msg.sender === 'me' ? 'text-right mr-1' : 'ml-1'}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="bg-white p-6 border-t border-[#F2F2F2] flex items-center gap-4">
          <input
            type="text"
            placeholder="Type your message ..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-1 h-[52px] bg-[#F5F5F5] border-none rounded-xl px-6 text-[#2C2E33] font-medium text-[15px] placeholder:text-[#A1A1A1] outline-none shadow-inner focus-visible:ring-1 focus-visible:ring-[#F1913D]/20 transition-all"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            className="h-[52px] px-8 bg-[#F1913D] hover:bg-[#F1913D]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all text-[16px] cursor-pointer active:scale-95"
          >
            <Send size={18} strokeWidth={2.5} /> Send
          </button>
        </div>
      </main>
    </div>
  );
}

function ContactItem({ contact, isActive, onClick }: { contact: { id: number, name: string, lastMessage: string, time: string, unread?: number, read?: boolean, typing?: boolean, category: string, avatar: string, role: string }, isActive: boolean, onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between px-5 py-4 cursor-pointer transition-all border-b border-[#F9F9F9] last:border-0 ${isActive ? 'bg-[#FFF4ED] border-r-4 border-r-[#F1913D]' : 'hover:bg-[#F9F9F9]'
        }`}
    >
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 shadow-sm">
          <Image src={contact.avatar} alt={contact.name} fill className="object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <span className={`font-bold text-[15px] transition-colors ${isActive ? 'text-[#F1913D]' : 'text-[#2C2E33]'}`}>
            {contact.name}
          </span>
          <span className={`text-[13px] font-medium leading-tight mt-0.5 truncate max-w-[140px] ${contact.typing ? 'text-[#2B9724]' : 'text-[#6C757D]'}`}>
            {contact.lastMessage}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center min-w-[30px]">
        <span className="text-[11px] font-bold text-[#A1A1A1] mb-1">{contact.time}</span>
        {contact.unread ? (
          <span className="flex items-center justify-center bg-[#DC3545] text-white text-[10px] font-black h-[18px] min-w-[18px] rounded-full px-1 shadow-sm">
            {contact.unread}
          </span>
        ) : contact.read ? (
          <CheckCheck size={16} strokeWidth={2.5} className="text-[#F1913D]" />
        ) : null}
      </div>
    </div>
  );
}