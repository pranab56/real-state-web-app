'use client';

import { CheckCheck, MessageSquare, MoreVertical, Pin, Search, Send } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const pinnedContacts = [
  {
    id: 1,
    name: 'Jhon Deo',
    message: 'Victor is typing ...',
    time: '10m',
    unread: 12,
    typing: true,
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Jhon Deo',
    message: 'ok, thanks!',
    time: '10m',
    read: true,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Jhon Deo',
    message: 'Your application...',
    time: '10m',
    unread: 12,
    avatar: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=150&auto=format&fit=crop',
  },
];

const allContacts = [
  {
    id: 4,
    name: 'Jhon Deo',
    message: 'Victor is typing ...',
    time: '10m',
    unread: 12,
    typing: true,
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Jhon Deo',
    message: 'ok, thanks!',
    time: '10m',
    read: true,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Jhon Deo',
    message: 'ok, thanks!',
    time: '10m',
    read: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 7,
    name: 'Jhon Deo',
    message: 'Your application...',
    time: '10m',
    unread: 12,
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 8,
    name: 'Jhon Deo',
    message: 'ok, thanks!',
    time: '10m',
    read: true,
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 9,
    name: 'Jhon Deo',
    message: 'Your application...',
    time: '10m',
    unread: 12,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 10,
    name: 'Jhon Deo',
    message: 'ok, thanks!',
    time: '10m',
    read: true,
    avatar: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?q=80&w=150&auto=format&fit=crop',
  },
];

export default function MessagesPage() {
  const [messageInput, setMessageInput] = useState('');

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
              className="bg-transparent border-none outline-none w-full h-full ml-3 text-sm font-medium text-[#2C2E33] placeholder:text-[#A1A1A1]"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">

          {/* Pinned Section */}
          <div className="pt-4">
            <div className="px-5 mb-2 flex items-center gap-2 text-[#6C757D]">
              <Pin size={16} strokeWidth={2.5} className="text-[#6C757D]" />
              <span className="text-[13px] font-bold uppercase tracking-wide">Pinned</span>
            </div>

            <div className="flex flex-col">
              {pinnedContacts.map((contact, idx) => (
                <div key={idx} className="flex items-center justify-between px-5 py-3 hover:bg-[#F9F9F9] cursor-pointer transition-colors border-b border-[#F9F9F9] last:border-0 border-opacity-50">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      <Image src={contact.avatar} alt={contact.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="font-bold text-[#2C2E33] text-[15px]">{contact.name}</span>
                      <span className={`text-[13px] font-medium leading-tight mt-0.5 ${contact.typing ? 'text-[#2B9724]' : 'text-[#6C757D]'}`}>{contact.message}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-center min-w-[30px]">
                    <span className="text-[12px] font-semibold text-[#A1A1A1] mb-1">{contact.time}</span>
                    {contact.unread && (
                      <span className="flex items-center justify-center bg-[#DC3545] text-white text-[11px] font-bold h-[20px] min-w-[20px] rounded-full px-1">
                        {contact.unread}
                      </span>
                    )}
                    {contact.read && (
                      <CheckCheck size={16} strokeWidth={2.5} className="text-[#F1913D]" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#F2F2F2] my-2" />

          {/* All Messages */}
          <div className="py-2">
            <div className="px-5 mb-2 flex items-center gap-2 text-[#6C757D]">
              <MessageSquare size={16} strokeWidth={2.5} className="text-[#6C757D]" />
              <span className="text-[13px] font-bold uppercase tracking-wide">All Messages</span>
            </div>

            <div className="flex flex-col">
              {allContacts.map((contact, idx) => (
                <div key={idx} className="flex items-center justify-between px-5 py-3 hover:bg-[#F9F9F9] cursor-pointer transition-colors border-b border-[#F9F9F9] last:border-0 border-opacity-50">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      <Image src={contact.avatar} alt={contact.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="font-bold text-[#2C2E33] text-[15px]">{contact.name}</span>
                      <span className={`text-[13px] font-medium leading-tight mt-0.5 ${contact.typing ? 'text-[#2B9724]' : 'text-[#6C757D]'}`}>{contact.message}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-center min-w-[30px]">
                    <span className="text-[12px] font-semibold text-[#A1A1A1] mb-1">{contact.time}</span>
                    {contact.unread && (
                      <span className="flex items-center justify-center bg-[#DC3545] text-white text-[11px] font-bold h-[20px] min-w-[20px] rounded-full px-1">
                        {contact.unread}
                      </span>
                    )}
                    {contact.read && (
                      <CheckCheck size={16} strokeWidth={2.5} className="text-[#F1913D]" />
                    )}
                  </div>
                </div>
              ))}
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
              <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" alt="Sarah Jenkins" fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-[20px] font-bold text-[#2C2E33] leading-tight">Sarah Jenkins</h2>
              <p className="text-[#6C757D] text-[12px] font-bold mt-0.5 uppercase tracking-wide">Online . Luxury Property Specialist</p>
            </div>
          </div>
          <button className="text-[#A1A1A1] hover:text-[#2C2E33] transition-colors p-2 rounded-full hover:bg-gray-100">
            <MoreVertical size={24} strokeWidth={2} />
          </button>
        </div>

        {/* Messages History */}
        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 relative z-0">

          <div className="flex justify-center w-full mb-4">
            <span className="bg-white px-4 py-1.5 rounded-lg text-[13px] font-bold text-[#6C757D] shadow-sm shadow-gray-200/50">
              Today, March 12
            </span>
          </div>

          {/* Incoming Message 1 */}
          <div className="flex flex-col items-start max-w-[70%]">
            <div className="flex items-end gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 shadow-sm mb-4">
                <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" alt="Sarah Jenkins" fill className="object-cover" />
              </div>
              <div>
                <div className="bg-white p-5 rounded-[16px] rounded-bl-sm shadow-sm border border-gray-100 text-[#2C2E33] text-[15px] font-medium leading-relaxed">
                  Hello Alex! I've confirmed the viewing for the Midtown Penthouse tomorrow at 2:00 PM. Does that time still work for you?
                </div>
                <div className="text-[12px] font-bold text-[#A1A1A1] mt-2 ml-1">
                  01:20 AM
                </div>
              </div>
            </div>
          </div>

          {/* Outgoing Message 1 */}
          <div className="flex flex-col items-end max-w-[70%] self-end">
            <div className="flex items-end gap-3 justify-end">
              <div className="flex flex-col items-end">
                <div className="bg-[#F1913D] p-5 rounded-[16px] rounded-br-sm shadow-md shadow-[#F1913D]/20 text-white text-[15px] font-medium leading-relaxed">
                  Hello Alex! I've confirmed the viewing for the Midtown Penthouse tomorrow at 2:00 PM. Does that time still work for you?
                </div>
                <div className="text-[12px] font-bold text-[#A1A1A1] mt-2 mr-1">
                  01:20 AM
                </div>
              </div>
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 shadow-sm mb-4 border-2 border-white">
                <Image src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop" alt="Alex" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Incoming Message 2 */}
          <div className="flex flex-col items-start max-w-[70%]">
            <div className="flex items-end gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 shadow-sm mb-4">
                <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" alt="Sarah Jenkins" fill className="object-cover" />
              </div>
              <div>
                <div className="bg-white p-5 rounded-[16px] rounded-bl-sm shadow-sm border border-gray-100 text-[#2C2E33] text-[15px] font-medium leading-relaxed">
                  Please meet me at the main entrance. I'll have the access cards ready. I'm also bringing the updated floor plan we discussed.
                </div>
                <div className="text-[12px] font-bold text-[#A1A1A1] mt-2 ml-1">
                  01:20 AM
                </div>
              </div>
            </div>
          </div>

          {/* Outgoing Message 2 */}
          <div className="flex flex-col items-end max-w-[70%] self-end">
            <div className="flex items-end gap-3 justify-end">
              <div className="flex flex-col items-end">
                <div className="bg-[#F1913D] p-5 rounded-[16px] rounded-br-sm shadow-md shadow-[#F1913D]/20 text-white text-[15px] font-medium leading-relaxed">
                  That's great, Sarah! Yes, 2:00 PM works perfectly. Should I meet you at the main entrance or at the sales office?
                </div>
                <div className="text-[12px] font-bold text-[#A1A1A1] mt-2 mr-1">
                  01:20 AM
                </div>
              </div>
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 shadow-sm mb-4 border-2 border-white">
                <Image src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop" alt="Alex" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Incoming Message 3 */}
          <div className="flex flex-col items-start max-w-[70%]">
            <div className="flex items-end gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 shadow-sm mb-4">
                <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" alt="Sarah Jenkins" fill className="object-cover" />
              </div>
              <div>
                <div className="bg-white p-5 rounded-[16px] rounded-bl-sm shadow-sm border border-gray-100 text-[#2C2E33] text-[15px] font-medium leading-relaxed">
                  Please meet me at the main entrance. I'll have the access cards ready. I'm also bringing the updated floor plan we discussed.
                </div>
                <div className="text-[12px] font-bold text-[#A1A1A1] mt-2 ml-1">
                  01:20 AM
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Chat Input */}
        <div className="bg-white p-6 border-t border-[#F2F2F2] flex items-center gap-4">
          <input
            type="text"
            placeholder="Type your message ..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-1 h-[52px] bg-[#F5F5F5] border-none rounded-xl px-6 text-[#2C2E33] font-medium text-[15px] placeholder:text-[#A1A1A1] outline-none shadow-inner"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && messageInput.trim()) {
                setMessageInput('');
                // Normally handle send logic here
              }
            }}
          />
          <button
            className="h-[52px] px-8 bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-bold rounded-xl flex items-center gap-2 shadow-sm transition-colors text-[16px]"
            onClick={() => setMessageInput('')}
          >
            <Send size={18} strokeWidth={2.5} /> Send
          </button>
        </div>

      </main>
    </div>
  );
}