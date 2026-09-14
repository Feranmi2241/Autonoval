import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AutoNovaAudio } from './AudioEngine';
import { 
  Search, Phone, Video, Info, Send, PlusCircle, Paperclip, 
  CheckCheck, Smile, HelpCircle, User, Shield, Sparkles, 
  MapPin, Clock, ArrowLeft, Bookmark, ShoppingBag, Calendar, 
  LogOut, Star, ArrowRight, ExternalLink, FileText, Download,
  CheckCircle2, Bell, Settings
} from 'lucide-react';

export const MessagesView = ({
  userName = "Alexander Vance",
  role = "Client",
  onNavigateToView,
  onBackToGate,
  showNotification,
  onSelectCar
}) => {
  const [activeChatId, setActiveChatId] = useState('julian');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All'); // 'All' | 'Sellers' | 'Support' | 'Unread'
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Core database of conversations
  const [conversations, setConversations] = useState([
    {
      id: 'julian',
      name: 'Julian (Lucid Specialist)',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdPuu5KO5d6vYputRHEijiKGWbf689MlbX2Gb1FBQ778ZbnQLaV3R9vo1bnqydNfeA8FFH8WkJz1SVIVTROHFCVQ_iELbXM9YlZLUNuNsnN3IO14JKCLxBO7Bn1d5fETzYtulco0wHp9Qf3Jim5V_Ug1gCWiNwdvpX91pvP307ExdkSuLlj2512YpM6DifenD76vgFmtzLDNZYo69OJGplVAfN2GEqCf1U1uVBaRZEwDj0HWQLKP71bc47jm-NMWlI08qAByqjmje2',
      online: true,
      role: 'Seller',
      lastSeen: 'Online',
      unread: true,
      lastMessageTime: '2m ago',
      typingText: 'Julian is typing...',
      messages: [
        {
          id: 'm1',
          sender: 'me',
          text: "Hello Julian, I'm interested in the Lucid Air Sapphire.",
          time: '10:42 AM',
          status: 'read'
        },
        {
          id: 'm2',
          sender: 'partner',
          text: "Absolutely! It's a precision-engineered masterpiece. Here are the active listing details for the Sapphire curated specially for your portfolio:",
          time: '10:45 AM'
        },
        {
          id: 'm3',
          sender: 'partner',
          type: 'attachment',
          carName: 'Lucid Air Sapphire',
          price: 249000,
          specs: { zeroToSixty: '1.89s', topSpeed: '330 km/h', power: '1,234 hp' },
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOQHi_PEd5ZPsfve2gHNtc9RspSyvOXqwqs6xNqGTWDwpEwEim2bu4gGWdmC4VdWAmTvCa--Ue5HLlHyLmXoYbUdEsDVdt65Ud_ieAeLMGOfujnFDPns5-vOEg4qKlTnwqIjqF5ev3fecEJhFWxI6VCXY2F2iGL5RoszzPyEMkvTvEch3_TgeV6OO-66z072RemQnTsKHau59vkG3NLAr9svqCFZKM9WgSuj67cgw-LiGqIA1cjRS3eV2cx9id8468XFNGHdr-mw1a',
          time: '10:45 AM'
        }
      ]
    },
    {
      id: 'concierge',
      name: 'Concierge Support',
      avatar: 'support_agent', // use icon
      online: true,
      role: 'Support',
      lastSeen: 'Online',
      unread: false,
      lastMessageTime: '1h ago',
      messages: [
        {
          id: 'c1',
          sender: 'partner',
          text: "Hello Alexander, I am your AutoNova Concierge. Your upcoming test drive appointment is officially locked onto our Beverly Hills ledger.",
          time: '09:15 AM'
        },
        {
          id: 'c2',
          sender: 'me',
          text: "Excellent! Do I need to bring any specific documentation?",
          time: '09:20 AM',
          status: 'read'
        },
        {
          id: 'c3',
          sender: 'partner',
          text: "Just your valid driver's license. We have handled all secondary customs waivers and track permits internally.",
          time: '09:22 AM'
        }
      ]
    },
    {
      id: 'sarah',
      name: 'Sarah Mitchell (Seller)',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZOG4QGwua8ORoOZVhm83NszpTf6fxGsRvjYiH2_SLHAQng7b-g49A4jr8-3Du7fV4p_li7ik9X9PIzmut-5fA0f9ZKgiYm6J2u5wCP5utFHDgARwEQbHRn77KxU48ejvfIj685Nkq9dodQgCTnvewYYrE9dDnRUvguiKibkPxcwJVZ5RtTVNIVrtaQbuXT3T89EK0589j_nId9-RVSBCM7uCQnh2I9oj_G3TVu4p3AQVcEOSSzKKfs4mr6Us_0OOW07dfEG0Ch_e3',
      online: false,
      role: 'Seller',
      lastSeen: 'Yesterday',
      unread: false,
      lastMessageTime: 'Yesterday',
      messages: [
        {
          id: 's1',
          sender: 'me',
          text: "Hi Sarah, does the Porsche Taycan include the high-capacity mobile charger unit?",
          time: 'Yesterday',
          status: 'read'
        },
        {
          id: 's2',
          sender: 'partner',
          text: "Yes, Alexander. The original 22kW mobile charging pedestal along with the active subscription card are both included in the glove box.",
          time: 'Yesterday'
        }
      ]
    }
  ]);

  // Handle auto scroll
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations, isTyping, activeChatId]);

  // Mark active chat as read
  useEffect(() => {
    setConversations(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        return { ...chat, unread: false };
      }
      return chat;
    }));
  }, [activeChatId]);

  // Julian dynamic automatic reply simulation
  const simulateJulianResponse = (userText) => {
    setIsTyping(true);
    AutoNovaAudio.playClick();

    setTimeout(() => {
      setIsTyping(false);
      AutoNovaAudio.playSuccess();

      let replyText = "That's a very interesting point, Alexander. Let me review our latest catalog allocations and check on the telemetry status of that specific chassis.";
      const lower = userText.toLowerCase();

      if (lower.includes('sapphire') || lower.includes('lucid')) {
        replyText = "The Sapphire is truly breathtaking. With 1,234 horsepower, it outperforms almost anything on the road. Would you like me to reserve a priority private track session for you?";
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('how much')) {
        replyText = "The Sapphire lists at $249,000, inclusive of the custom carbon aero pack and concierge track calibration. We also have competitive financing and customs escrow pathways ready.";
      } else if (lower.includes('test') || lower.includes('drive') || lower.includes('schedule')) {
        replyText = "I would be honored to host you! I've synchronized our slot ledger. You can use our 'Schedule Drive' button at the top to lock in a time instantly.";
      } else if (lower.includes('buy') || lower.includes('purchase') || lower.includes('order')) {
        replyText = "Incredible decision. Our Nigerian Customs Escrow channel is ready to authorize the transfer securely. Let me know if you would like me to prep the digital signing package.";
      } else if (lower.includes('hello') || lower.includes('hi')) {
        replyText = "Greetings Alexander! It is always a pleasure speaking with you. What high-performance curation can I assist you with today?";
      }

      setConversations(prev => prev.map(chat => {
        if (chat.id === 'julian') {
          return {
            ...chat,
            lastMessageTime: 'Just now',
            messages: [
              ...chat.messages,
              {
                id: `m-${Date.now()}`,
                sender: 'partner',
                text: replyText,
                time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
              }
            ]
          };
        }
        return chat;
      }));
      
      showNotification("New message from Julian!", "success");
    }, 2500);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    AutoNovaAudio.playClick();
    const userMsgText = newMessage;
    const sentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    setConversations(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          lastMessageTime: 'Just now',
          messages: [
            ...chat.messages,
            {
              id: `m-${Date.now()}`,
              sender: 'me',
              text: userMsgText,
              time: sentTime,
              status: 'sent'
            }
          ]
        };
      }
      return chat;
    }));

    setNewMessage('');

    // Trigger auto response for Julian
    if (activeChatId === 'julian') {
      simulateJulianResponse(userMsgText);
    }
  };

  // Mock document/file attachment selection
  const [uploadingFile, setUploadingFile] = useState(false);
  const handleAttachFile = () => {
    AutoNovaAudio.playClick();
    setUploadingFile(true);
    showNotification("Uploading specification worksheet...", "success");

    setTimeout(() => {
      setUploadingFile(false);
      AutoNovaAudio.playSuccess();
      
      const sentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

      setConversations(prev => prev.map(chat => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            messages: [
              ...chat.messages,
              {
                id: `doc-${Date.now()}`,
                sender: 'me',
                type: 'document',
                fileName: 'AutoNova_Customs_Declaration.pdf',
                fileSize: '1.4 MB',
                time: sentTime,
                status: 'sent'
              }
            ]
          };
        }
        return chat;
      }));
      showNotification("Document uploaded and shared successfully!", "success");
    }, 2000);
  };

  const handleSelectCarAttachment = () => {
    AutoNovaAudio.playClick();
    // Simulate navigating to Lucid Air Sapphire detail page
    const mockLucidCar = {
      id: 'lucid-air-sapphire',
      name: 'Lucid Air Sapphire',
      make: 'Lucid',
      model: 'Air Sapphire',
      year: 2024,
      bodyType: 'Sedan',
      color: 'Sapphire Blue Metallic',
      price: 249000,
      type: 'Electric',
      mileage: 'New',
      match: 99,
      desc: 'Tri-motor ultra-performance luxury sedan. The pinnacle of electric vehicle technology, offering record-shattering acceleration combined with grand touring luxury.',
      specs: { zeroToSixty: '1.89s', topSpeed: '330 km/h', range: '687 km', power: '1,234 hp' },
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOQHi_PEd5ZPsfve2gHNtc9RspSyvOXqwqs6xNqGTWDwpEwEim2bu4gGWdmC4VdWAmTvCa--Ue5HLlHyLmXoYbUdEsDVdt65Ud_ieAeLMGOfujnFDPns5-vOEg4qKlTnwqIjqF5ev3fecEJhFWxI6VCXY2F2iGL5RoszzPyEMkvTvEch3_TgeV6OO-66z072RemQnTsKHau59vkG3NLAr9svqCFZKM9WgSuj67cgw-LiGqIA1cjRS3eV2cx9id8468XFNGHdr-mw1a'
    };
    onSelectCar(mockLucidCar);
    showNotification("Loading Lucid Air Sapphire specification board...", "success");
  };

  // Get active conversation details
  const activeChat = conversations.find(c => c.id === activeChatId) || conversations[0];

  // Filtering & searching logic
  const filteredConversations = conversations.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === 'All') return matchesSearch;
    if (activeFilter === 'Sellers') return matchesSearch && chat.role === 'Seller';
    if (activeFilter === 'Support') return matchesSearch && chat.role === 'Support';
    if (activeFilter === 'Unread') return matchesSearch && chat.unread;
    return matchesSearch;
  });

  return (
    <div className="flex-grow flex flex-col lg:flex-row relative bg-zinc-50">
      
      {/* SIDEBAR FOR DESKTOP USER INFO */}
      <aside className="hidden lg:flex w-64 flex-col py-8 px-6 bg-white border-r border-zinc-200/60 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto shrink-0">
        <div className="mb-8">
          <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Member Account</p>
          <h2 className="font-display font-black text-sm text-teal-950 leading-tight truncate">{userName}</h2>
          <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-[8px] font-mono font-bold text-teal-800 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
            {role === 'Dealer' ? 'BLACK LABEL ELITE' : 'ELITE MEMBER'}
          </span>
        </div>

        <nav className="space-y-1.5 flex-grow text-xs font-semibold">
          <button 
            onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('portfolio'); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-all cursor-pointer text-left"
          >
            <User className="h-4 w-4" />
            <span>Dashboard</span>
          </button>

          <button 
            onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('saved'); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-all cursor-pointer text-left"
          >
            <Bookmark className="h-4 w-4" />
            <span>Saved Garage</span>
          </button>

          <button 
            onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('alerts'); }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <Search className="h-4 w-4" />
              <span>Saved Searches</span>
            </div>
            <span className="font-mono text-[9px] bg-teal-800 text-white px-1.5 py-0.5 rounded-md">2</span>
          </button>

          <button 
            onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('orders'); }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-4 w-4" />
              <span>Purchase History</span>
            </div>
            <span className="font-mono text-[9px] bg-teal-800 text-white px-1.5 py-0.5 rounded-md">1</span>
          </button>

          <button 
            onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('test-drives'); }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4" />
              <span>Test Drives</span>
            </div>
            <span className="font-mono text-[9px] bg-teal-800 text-white px-1.5 py-0.5 rounded-md">2</span>
          </button>

          <button 
            onClick={() => { AutoNovaAudio.playClick(); }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-teal-50/80 text-teal-950 border-r-4 border-teal-800 font-bold transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="h-4 w-4" />
              <span>Secure Messages</span>
            </div>
            <span className="font-mono text-[9px] bg-teal-800 text-white px-1.5 py-0.5 rounded-md">1</span>
          </button>

          <button 
            onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('notifications'); }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </div>
            <span className="font-mono text-[9px] bg-teal-800 text-white px-1.5 py-0.5 rounded-md">4</span>
          </button>

          <button 
            onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('settings'); }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </div>
          </button>
        </nav>

        <div className="pt-6 mt-6 border-t border-zinc-100 space-y-4">
          <button 
            onClick={() => { AutoNovaAudio.playClick(); }}
            className="w-full py-3 bg-teal-50 border border-teal-100 text-teal-950 rounded-xl font-mono text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-teal-600" />
            <span>Secure Messenger</span>
          </button>
          
          <button 
            onClick={() => { AutoNovaAudio.playClick(); onBackToGate(); }}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-zinc-400 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors font-mono text-[9px] font-bold uppercase tracking-widest cursor-pointer border border-transparent hover:border-red-100"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Disconnect Node</span>
          </button>
        </div>
      </aside>

      {/* MESSAGES CORE HUB: LEFT CONVO LIST, RIGHT ACTIVE CHAT */}
      <div className="flex-grow flex flex-col md:flex-row bg-white border border-zinc-200/40 rounded-3xl overflow-hidden m-4 lg:m-8 shadow-sm h-[calc(100vh-140px)]">
        
        {/* LEFT COLUMN: CONVERSATION INDEX */}
        <div className="w-full md:w-80 border-r border-zinc-150 flex flex-col h-1/2 md:h-full bg-white shrink-0">
          <div className="p-4 border-b border-zinc-100 space-y-3.5">
            <h2 className="font-display font-black text-sm text-teal-950 uppercase tracking-wide flex items-center gap-2">
              <span>Secure Logs</span>
              <span className="text-[9px] bg-teal-50 text-teal-800 border border-teal-100 px-1.5 py-0.5 rounded-md font-mono">LIVE</span>
            </h2>
            
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search encrypted chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-150 focus:ring-1 focus:ring-teal-700/30 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold"
              />
            </div>

            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {['All', 'Sellers', 'Support', 'Unread'].map(filter => (
                <button
                  key={filter}
                  onClick={() => { AutoNovaAudio.playClick(); setActiveFilter(filter); }}
                  className={`px-3 py-1 text-[9px] font-mono font-black uppercase tracking-wider rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    activeFilter === filter
                      ? 'bg-teal-950 text-white'
                      : 'bg-zinc-50 text-zinc-500 hover:text-zinc-800 border border-zinc-100'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-zinc-50">
            {filteredConversations.length > 0 ? (
              filteredConversations.map(chat => (
                <div
                  key={chat.id}
                  onClick={() => { AutoNovaAudio.playClick(); setActiveChatId(chat.id); }}
                  className={`p-4 flex gap-3 cursor-pointer transition-colors relative ${
                    activeChatId === chat.id 
                      ? 'bg-teal-50/30 border-l-4 border-teal-700' 
                      : 'hover:bg-zinc-50'
                  }`}
                >
                  <div className="relative shrink-0">
                    {chat.avatar === 'support_agent' ? (
                      <div className="w-11 h-11 rounded-full bg-teal-950 text-teal-400 flex items-center justify-center border border-teal-900/10">
                        <Shield className="h-5 w-5" />
                      </div>
                    ) : (
                      <img
                        src={chat.avatar}
                        alt={chat.name}
                        className="w-11 h-11 rounded-full object-cover border border-zinc-100"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>

                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h4 className="font-semibold text-xs text-teal-950 truncate">
                        {chat.name}
                      </h4>
                      <span className="font-mono text-[8px] text-zinc-400">
                        {chat.lastMessageTime}
                      </span>
                    </div>
                    
                    <p className={`text-xs truncate ${chat.unread ? 'text-teal-800 font-bold' : 'text-zinc-500 font-medium'}`}>
                      {chat.id === 'julian' && isTyping ? (
                        <span className="italic text-teal-700 animate-pulse">Julian is typing...</span>
                      ) : (
                        chat.messages[chat.messages.length - 1]?.text || "Shared an attachment"
                      )}
                    </p>
                  </div>

                  {chat.unread && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-teal-700 rounded-full" />
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-zinc-400 text-xs font-semibold">No secure connections found.</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: SECURE CHAT CANVAS */}
        <div className="flex-1 flex flex-col h-1/2 md:h-full bg-zinc-50/30 relative">
          
          {/* Active Header */}
          <div className="px-6 py-4 bg-white border-b border-zinc-150 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                {activeChat.avatar === 'support_agent' ? (
                  <div className="w-10 h-10 rounded-full bg-teal-950 text-teal-400 flex items-center justify-center">
                    <Shield className="h-4.5 w-4.5" />
                  </div>
                ) : (
                  <img
                    src={activeChat.avatar}
                    alt={activeChat.name}
                    className="w-10 h-10 rounded-full object-cover border border-zinc-100"
                    referrerPolicy="no-referrer"
                  />
                )}
                {activeChat.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>

              <div>
                <h3 className="font-bold text-xs text-teal-950">
                  {activeChat.name}
                </h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${activeChat.online ? 'bg-green-500 animate-pulse' : 'bg-zinc-400'}`} />
                  <span className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">
                    {activeChat.online ? 'Online Secure Node' : `Last seen ${activeChat.lastSeen}`}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button 
                onClick={() => { AutoNovaAudio.playClick(); showNotification("Initiating secure satellite voice link...", "success"); }}
                className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-500 hover:text-teal-950 transition-colors cursor-pointer"
              >
                <Phone className="h-4 w-4" />
              </button>
              <button 
                onClick={() => { AutoNovaAudio.playClick(); showNotification("Connecting peer-to-peer video terminal...", "success"); }}
                className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-500 hover:text-teal-950 transition-colors cursor-pointer"
              >
                <Video className="h-4 w-4" />
              </button>
              <button 
                onClick={() => { AutoNovaAudio.playClick(); showNotification("Verifying end-to-end cryptographic signature...", "success"); }}
                className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-500 hover:text-teal-950 transition-colors cursor-pointer"
              >
                <Info className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Flow Canvas */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            
            <div className="text-center">
              <span className="px-3 py-1 bg-zinc-200/50 border border-zinc-300/30 rounded-full font-mono text-[8px] font-black text-zinc-400 uppercase tracking-widest">
                Crypto Session Established
              </span>
            </div>

            {activeChat.messages.map((msg, idx) => {
              const isMe = msg.sender === 'me';
              return (
                <div
                  key={msg.id || idx}
                  className={`flex gap-3 max-w-[85%] ${isMe ? 'ml-auto justify-end' : 'mr-auto justify-start'}`}
                >
                  {!isMe && (
                    <div className="shrink-0 mt-1">
                      {activeChat.avatar === 'support_agent' ? (
                        <div className="w-8 h-8 rounded-full bg-teal-950 text-teal-400 flex items-center justify-center">
                          <Shield className="h-3.5 w-3.5" />
                        </div>
                      ) : (
                        <img
                          src={activeChat.avatar}
                          alt={activeChat.name}
                          className="w-8 h-8 rounded-full object-cover border border-zinc-100"
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </div>
                  )}

                  <div className="space-y-1">
                    
                    {/* Render Text message */}
                    {!msg.type && (
                      <div className={`p-4 rounded-3xl text-xs font-semibold leading-relaxed shadow-xs ${
                        isMe 
                          ? 'bg-teal-950 text-white rounded-tr-none' 
                          : 'bg-white text-zinc-800 rounded-tl-none border border-zinc-200/60'
                      }`}>
                        <p>{msg.text}</p>
                      </div>
                    )}

                    {/* Render Lucid Car Attachment */}
                    {msg.type === 'attachment' && (
                      <div className="bg-white rounded-2xl border border-zinc-200/80 overflow-hidden shadow-xs max-w-xs group">
                        <div className="h-32 bg-zinc-100 relative overflow-hidden">
                          <img 
                            src={msg.image} 
                            alt={msg.carName} 
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2.5 right-2.5 bg-teal-950 text-white px-2 py-0.5 rounded-md font-mono text-[8px] font-bold uppercase tracking-widest">
                            SPECIAL SELECTION
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-display font-black text-xs text-teal-950 uppercase tracking-wide">
                            {msg.carName}
                          </h4>
                          <p className="font-mono text-[9px] text-teal-700 font-extrabold mt-1">
                            ${msg.price.toLocaleString('en-US')} USD
                          </p>
                          
                          <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3.5 border-t border-zinc-100 text-center text-zinc-500">
                            <div>
                              <span className="block text-[7px] font-mono text-zinc-400 font-bold uppercase">POWER</span>
                              <span className="block text-[9px] font-black text-teal-950 font-mono">{msg.specs.power}</span>
                            </div>
                            <div>
                              <span className="block text-[7px] font-mono text-zinc-400 font-bold uppercase">0-60 MPH</span>
                              <span className="block text-[9px] font-black text-teal-950 font-mono">{msg.specs.zeroToSixty}</span>
                            </div>
                            <div>
                              <span className="block text-[7px] font-mono text-zinc-400 font-bold uppercase">V-MAX</span>
                              <span className="block text-[9px] font-black text-teal-950 font-mono">{msg.specs.topSpeed}</span>
                            </div>
                          </div>

                          <button
                            onClick={handleSelectCarAttachment}
                            className="w-full mt-4 py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-mono text-[8.5px] font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98"
                          >
                            <span>View details board</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Render Shared Document Attachment */}
                    {msg.type === 'document' && (
                      <div className="bg-white p-4 rounded-2xl border border-zinc-200/85 shadow-xs flex items-center gap-3.5 max-w-xs">
                        <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-grow">
                          <h4 className="font-semibold text-xs text-zinc-800 truncate">{msg.fileName}</h4>
                          <p className="font-mono text-[8px] text-zinc-400 mt-0.5 uppercase tracking-wider">{msg.fileSize} • Sealed PDF</p>
                        </div>
                        <button 
                          onClick={() => { AutoNovaAudio.playSuccess(); showNotification("Downloading document safely...", "success"); }}
                          className="p-1.5 rounded-lg hover:bg-zinc-50 text-zinc-400 hover:text-teal-950 shrink-0 cursor-pointer"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 px-1 justify-end">
                      <span className="font-mono text-[7.5px] text-zinc-400 font-medium">
                        {msg.time}
                      </span>
                      {isMe && (
                        <CheckCheck className="h-3 w-3 text-teal-600 shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Julian Typing indicator */}
            {activeChatId === 'julian' && isTyping && (
              <div className="flex gap-3 max-w-[85%] mr-auto justify-start">
                <div className="shrink-0 mt-1">
                  <img
                    src={activeChat.avatar}
                    alt={activeChat.name}
                    className="w-8 h-8 rounded-full object-cover border border-zinc-100"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-4 py-3 bg-white border border-zinc-200/60 rounded-3xl rounded-tl-none">
                    <div className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 bg-teal-800 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-teal-800 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-teal-800 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="font-mono text-[8.5px] font-bold text-zinc-400 uppercase tracking-widest italic">Julian is analyzing...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Upload progress mock bar */}
            {uploadingFile && (
              <div className="flex justify-end gap-3 max-w-[85%] ml-auto">
                <div className="bg-white p-4 rounded-2xl border border-zinc-150 shadow-xs w-64 space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase tracking-wide">
                    <span>Uploading worksheet...</span>
                    <span className="font-mono">74%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-700 rounded-full animate-pulse" style={{ width: '74%' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Message Input Bottom Bar */}
          <div className="p-4 bg-white border-t border-zinc-150 shrink-0">
            <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex items-center gap-2">
              <button
                type="button"
                onClick={handleAttachFile}
                className="p-2.5 rounded-xl text-zinc-400 hover:text-teal-950 hover:bg-zinc-50 transition-colors shrink-0 cursor-pointer"
                title="Secure Customs Encrypted Escrow Attachment"
              >
                <Paperclip className="h-4.5 w-4.5" />
              </button>
              
              <button
                type="button"
                onClick={() => { AutoNovaAudio.playClick(); showNotification("Keyboard emojis synchronized.", "success"); }}
                className="p-2.5 rounded-xl text-zinc-400 hover:text-teal-950 hover:bg-zinc-50 transition-colors shrink-0 cursor-pointer"
              >
                <Smile className="h-4.5 w-4.5" />
              </button>

              <input
                type="text"
                placeholder={`Encrypt message for ${activeChat.name}...`}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 bg-zinc-50 border border-zinc-200 focus:ring-1 focus:ring-teal-700/30 rounded-2xl px-4 py-3 text-xs font-semibold"
              />

              <button
                type="submit"
                disabled={!newMessage.trim()}
                className={`p-3 rounded-2xl transition-all shrink-0 cursor-pointer ${
                  newMessage.trim() 
                    ? 'bg-teal-950 text-white shadow-md hover:bg-teal-900 active:scale-95' 
                    : 'bg-zinc-100 text-zinc-400'
                }`}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
};
