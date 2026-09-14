import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AutoNovaAudio } from './AudioEngine';
import { 
  Bell, BellOff, TrendingDown, Sparkles, Truck, MessageSquare, 
  Check, CheckSquare, Trash2, ArrowLeft, Settings, LogOut, 
  User, Bookmark, ShoppingBag, Calendar, ArrowRight, RefreshCw, 
  ShieldAlert, Info, HelpCircle, Search
} from 'lucide-react';

export const NotificationsView = ({
  userName = "Alexander Vance",
  role = "Client",
  onNavigateToView,
  onBackToGate,
  showNotification,
  onSelectCar
}) => {
  // Initialize notification state based on mockup details
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      type: 'price_drop',
      title: 'Price Drop: Lucid Air Sapphire',
      desc: 'The Lucid Air Sapphire you saved just dropped by $5,000. This vehicle is now at its lowest price since tracking began.',
      time: '2h ago',
      unread: true,
      category: 'Price Drops',
      icon: <TrendingDown className="h-5 w-5 text-teal-500" />,
      linkedCarId: 'lucid-air-sapphire'
    },
    {
      id: 'notif-2',
      type: 'recommendation',
      title: 'AI Curator Recommendation',
      desc: 'Based on your preference for performance sedans, we\'ve found a rare 2024 Porsche Taycan Turbo GT arriving at our North dealer tomorrow.',
      time: '5h ago',
      unread: true,
      category: 'Recommendations',
      icon: <Sparkles className="h-5 w-5 text-purple-500 animate-pulse" />,
      linkedCarId: 'porsche-taycan-turbo-s'
    },
    {
      id: 'notif-3',
      type: 'order',
      title: 'Order Dispatched',
      desc: 'Your paperwork for the Audi e-tron GT has been processed and is currently en route to your residence via secure courier.',
      time: 'Yesterday',
      linkToView: 'orders',
      unread: true,
      category: 'Orders',
      icon: <Truck className="h-5 w-5 text-indigo-500" />
    },
    {
      id: 'notif-4',
      type: 'message',
      title: 'Message from Julian (Specialist)',
      desc: '"Hello Alexander, I\'ve synchronized our slot ledger and prepared your private track package..."',
      time: '2 days ago',
      unread: true,
      category: 'Messages',
      icon: <MessageSquare className="h-5 w-5 text-amber-500" />,
      linkToView: 'messages'
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('All'); // 'All' | 'Price Drops' | 'Recommendations' | 'Orders'
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    priceAlerts: true,
    curatorAlerts: true,
    deliveryAlerts: true,
    soundEffects: true
  });

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkAllRead = () => {
    AutoNovaAudio.playSuccess();
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    showNotification("All kinetic notifications marked as read.", "success");
  };

  const handleMarkSingleRead = (id) => {
    setNotifications(prev => prev.map(n => {
      if (n.id === id) {
        if (n.unread) {
          AutoNovaAudio.playClick();
          return { ...n, unread: false };
        }
      }
      return n;
    }));
  };

  const handleDeleteNotification = (id, title, e) => {
    e.stopPropagation();
    AutoNovaAudio.playClick();
    setNotifications(prev => prev.filter(n => n.id !== id));
    showNotification(`Notification deleted: "${title}"`, "info");
  };

  const handleClearAll = () => {
    AutoNovaAudio.playClick();
    if (notifications.length === 0) return;
    setNotifications([]);
    showNotification("Cleared all notification records from secure session cache.", "info");
  };

  const handleRestoreDefaults = () => {
    AutoNovaAudio.playSuccess();
    setNotifications([
      {
        id: 'notif-1',
        type: 'price_drop',
        title: 'Price Drop: Lucid Air Sapphire',
        desc: 'The Lucid Air Sapphire you saved just dropped by $5,000. This vehicle is now at its lowest price since tracking began.',
        time: '2h ago',
        unread: true,
        category: 'Price Drops',
        icon: <TrendingDown className="h-5 w-5 text-teal-500" />,
        linkedCarId: 'lucid-air-sapphire'
      },
      {
        id: 'notif-2',
        type: 'recommendation',
        title: 'AI Curator Recommendation',
        desc: 'Based on your preference for performance sedans, we\'ve found a rare 2024 Porsche Taycan Turbo GT arriving at our North dealer tomorrow.',
        time: '5h ago',
        unread: true,
        category: 'Recommendations',
        icon: <Sparkles className="h-5 w-5 text-purple-500 animate-pulse" />,
        linkedCarId: 'porsche-taycan-turbo-s'
      },
      {
        id: 'notif-3',
        type: 'order',
        title: 'Order Dispatched',
        desc: 'Your paperwork for the Audi e-tron GT has been processed and is currently en route to your residence via secure courier.',
        time: 'Yesterday',
        unread: true,
        category: 'Orders',
        icon: <Truck className="h-5 w-5 text-indigo-500" />
      },
      {
        id: 'notif-4',
        type: 'message',
        title: 'Message from Julian (Specialist)',
        desc: '"Hello Alexander, I\'ve synchronized our slot ledger and prepared your private track package..."',
        time: '2 days ago',
        unread: true,
        category: 'Messages',
        icon: <MessageSquare className="h-5 w-5 text-amber-500" />,
        linkToView: 'messages'
      }
    ]);
    showNotification("Notification ledger synchronized successfully.", "success");
  };

  const handleNotificationAction = (notif) => {
    handleMarkSingleRead(notif.id);

    if (notif.linkedCarId && onSelectCar) {
      AutoNovaAudio.playSuccess();
      showNotification(`Redirecting to spec board for ${notif.title}...`, "success");
      // Simulate selecting the car
      const mockCar = {
        id: notif.linkedCarId,
        name: notif.linkedCarId === 'lucid-air-sapphire' ? 'Lucid Air Sapphire' : 'Porsche Taycan Turbo S',
        make: notif.linkedCarId === 'lucid-air-sapphire' ? 'Lucid' : 'Porsche',
        model: notif.linkedCarId === 'lucid-air-sapphire' ? 'Air Sapphire' : 'Taycan Turbo S',
        year: 2024,
        price: notif.linkedCarId === 'lucid-air-sapphire' ? 249000 : 194900,
        type: 'Electric',
        mileage: 'New',
        match: 99,
        image: notif.linkedCarId === 'lucid-air-sapphire' 
          ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOQHi_PEd5ZPsfve2gHNtc9RspSyvOXqwqs6xNqGTWDwpEwEim2bu4gGWdmC4VdWAmTvCa--Ue5HLlHyLmXoYbUdEsDVdt65Ud_ieAeLMGOfujnFDPns5-vOEg4qKlTnwqIjqF5ev3fecEJhFWxI6VCXY2F2iGL5RoszzPyEMkvTvEch3_TgeV6OO-66z072RemQnTsKHau59vkG3NLAr9svqCFZKM9WgSuj67cgw-LiGqIA1cjRS3eV2cx9id8468XFNGHdr-mw1a'
          : 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGOmQgwxQIbZi9RsFzFXYczbZcvkCPv18n2ymEcdpqGoMQqvp4Vk-00FuSTyvu27cxMZyWDYjKKbcMkHvtGidGgcQ6bxLmrvr52cDM2tRGFTLFtbesSybyXJIMDhE2iTDeIyS25dGw6DapRPsmLlIvqdYoQ2J2RyN6nVfUGG9FbhR1pPIAcdNNJW8fNOsNR7e3ejMm7pqkPQhUTCP2hVlxiqGI8FOH3VbBfWrfNJZhvZWL1pe0W8Go9nctfqE2-9Iy08xMSodZO7Hq'
      };
      onSelectCar(mockCar);
    } else if (notif.linkToView) {
      AutoNovaAudio.playSuccess();
      onNavigateToView(notif.linkToView);
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'All') return true;
    return n.category === activeFilter;
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
            onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('messages'); }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="h-4 w-4" />
              <span>Secure Messages</span>
            </div>
            <span className="font-mono text-[9px] bg-teal-800 text-white px-1.5 py-0.5 rounded-md">1</span>
          </button>

          <button 
            onClick={() => { AutoNovaAudio.playClick(); }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-teal-50/80 text-teal-950 border-r-4 border-teal-800 font-bold transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </div>
            <span className="font-mono text-[9px] bg-teal-800 text-white px-1.5 py-0.5 rounded-md">
              {unreadCount}
            </span>
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
            onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('assistant'); }}
            className="w-full py-3 bg-teal-950 hover:bg-teal-900 text-white rounded-xl font-mono text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
          >
            <Sparkles className="h-3.5 w-3.5 text-teal-400" />
            <span>AI Concierge</span>
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

      {/* CORE ALERTS WINDOW */}
      <main className="flex-grow px-4 py-10 md:px-12 max-w-4xl mx-auto w-full">
        
        {/* Header toolbar */}
        <header className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div 
              className="flex items-center gap-3 mb-2 text-zinc-400 hover:text-teal-800 cursor-pointer transition-colors"
              onClick={() => onNavigateToView('portfolio')}
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-mono text-[9px] font-black uppercase tracking-widest">Back to Member Hub</span>
            </div>
            <h1 className="font-display font-black text-2xl md:text-3xl lg:text-4xl text-teal-950 tracking-tight flex items-center gap-3">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <span className="text-xs bg-teal-800 text-white font-mono font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {unreadCount} New
                </span>
              )}
            </h1>
            <p className="text-xs md:text-sm text-zinc-500 mt-1 font-medium leading-relaxed">
              Real-time telemetry reports, price action changes, and AI concierge-vetted recommendations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="px-4 py-2 border border-zinc-200 hover:border-zinc-300 text-zinc-700 bg-white hover:bg-zinc-50 rounded-xl font-mono text-[9px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-xs"
              >
                <CheckSquare className="h-3.5 w-3.5 text-teal-700" />
                <span>Mark all read</span>
              </button>
            )}
            <button
              onClick={() => { AutoNovaAudio.playClick(); setShowSettings(prev => !prev); }}
              className={`p-2.5 rounded-xl border transition-all ${
                showSettings 
                  ? 'bg-teal-950 border-teal-950 text-white' 
                  : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
              }`}
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Dynamic settings panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-2xl border border-zinc-200 overflow-hidden mb-8 shadow-xs"
            >
              <div className="p-5 space-y-4">
                <h3 className="font-mono text-[9px] font-black uppercase tracking-widest text-zinc-400">
                  Notification Channel Subscriptions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl cursor-pointer hover:bg-zinc-100/50 transition-colors">
                    <span className="text-xs font-semibold text-zinc-700">Price Drops &amp; Market Alerts</span>
                    <input 
                      type="checkbox" 
                      checked={settings.priceAlerts} 
                      onChange={(e) => { AutoNovaAudio.playClick(); setSettings(prev => ({ ...prev, priceAlerts: e.target.checked })); }}
                      className="rounded text-teal-800 focus:ring-teal-700 h-4 w-4" 
                    />
                  </label>
                  <label className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl cursor-pointer hover:bg-zinc-100/50 transition-colors">
                    <span className="text-xs font-semibold text-zinc-700">AI Curator Recommendations</span>
                    <input 
                      type="checkbox" 
                      checked={settings.curatorAlerts} 
                      onChange={(e) => { AutoNovaAudio.playClick(); setSettings(prev => ({ ...prev, curatorAlerts: e.target.checked })); }}
                      className="rounded text-teal-800 focus:ring-teal-700 h-4 w-4" 
                    />
                  </label>
                  <label className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl cursor-pointer hover:bg-zinc-100/50 transition-colors">
                    <span className="text-xs font-semibold text-zinc-700">Delivery &amp; Paperwork Progress</span>
                    <input 
                      type="checkbox" 
                      checked={settings.deliveryAlerts} 
                      onChange={(e) => { AutoNovaAudio.playClick(); setSettings(prev => ({ ...prev, deliveryAlerts: e.target.checked })); }}
                      className="rounded text-teal-800 focus:ring-teal-700 h-4 w-4" 
                    />
                  </label>
                  <label className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl cursor-pointer hover:bg-zinc-100/50 transition-colors">
                    <span className="text-xs font-semibold text-zinc-700">Sound Effects &amp; Audio Handshake</span>
                    <input 
                      type="checkbox" 
                      checked={settings.soundEffects} 
                      onChange={(e) => { AutoNovaAudio.playClick(); setSettings(prev => ({ ...prev, soundEffects: e.target.checked })); }}
                      className="rounded text-teal-800 focus:ring-teal-700 h-4 w-4" 
                    />
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter categories bar */}
        <div className="flex items-center justify-between border-b border-zinc-200/50 pb-4 mb-6 overflow-x-auto gap-4 scrollbar-none">
          <div className="flex gap-2">
            {['All', 'Price Drops', 'Recommendations', 'Orders', 'Messages'].map(filter => (
              <button
                key={filter}
                onClick={() => { AutoNovaAudio.playClick(); setActiveFilter(filter); }}
                className={`px-4 py-2 rounded-xl font-mono text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-teal-950 text-white'
                    : 'bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-800'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="flex gap-2 shrink-0">
            {notifications.length > 0 ? (
              <button
                onClick={handleClearAll}
                className="text-zinc-400 hover:text-red-700 flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear session</span>
              </button>
            ) : (
              <button
                onClick={handleRestoreDefaults}
                className="text-teal-800 hover:text-teal-950 flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5 animate-spin-slow" />
                <span>Sync Ledger</span>
              </button>
            )}
          </div>
        </div>

        {/* NOTIFICATION FEED BODY */}
        <AnimatePresence mode="popLayout">
          {filteredNotifications.length > 0 ? (
            <div className="space-y-4">
              {filteredNotifications.map(notif => (
                <motion.div
                  key={notif.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => handleNotificationAction(notif)}
                  className={`group relative p-5 bg-white rounded-2xl border border-zinc-200/60 shadow-xs hover:border-teal-700/20 hover:shadow-md transition-all cursor-pointer flex gap-5 overflow-hidden ${
                    notif.unread ? 'bg-gradient-to-r from-teal-50/10 to-white' : ''
                  }`}
                >
                  {/* High contrast left dynamic border for unread alerts */}
                  {notif.unread && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-teal-700" />
                  )}

                  {/* Icon wrapper */}
                  <div className="w-12 h-12 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-102 transition-transform">
                    {notif.icon}
                  </div>

                  {/* Core description content */}
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start gap-3 mb-1.5">
                      <h4 className="font-display font-black text-sm text-teal-950 group-hover:text-teal-800 transition-colors">
                        {notif.title}
                      </h4>
                      <span className="font-mono text-[8px] font-extrabold text-zinc-400 uppercase tracking-wider shrink-0 mt-0.5">
                        {notif.time}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 font-medium leading-relaxed pr-6">
                      {notif.desc}
                    </p>

                    {/* Conditional link visual cue */}
                    {(notif.linkedCarId || notif.linkToView) && (
                      <div className="flex items-center gap-1.5 mt-3 text-teal-800 font-mono text-[8px] font-black uppercase tracking-widest">
                        <span>Activate connection</span>
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </div>

                  {/* Interactive actions */}
                  <div className="flex flex-col justify-between items-end shrink-0 pl-2">
                    {notif.unread ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkSingleRead(notif.id);
                          showNotification("Telemetry marked as read.", "info");
                        }}
                        className="w-5 h-5 rounded-full bg-teal-50 hover:bg-teal-800 text-teal-800 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs border border-teal-100"
                        title="Mark read"
                      >
                        <Check className="h-3 w-3" />
                      </button>
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-200" title="Read alert" />
                    )}

                    <button
                      onClick={(e) => handleDeleteNotification(notif.id, notif.title, e)}
                      className="p-1.5 rounded-lg text-zinc-300 hover:text-red-700 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                      title="Discard report"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-16 text-center rounded-3xl border border-zinc-200/50 flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center mb-4 border border-teal-100">
                <BellOff className="h-6 w-6 animate-pulse" />
              </div>
              <h3 className="font-display font-black text-sm text-teal-950 uppercase tracking-wider mb-1">
                Security Ledger Clear
              </h3>
              <p className="text-xs text-zinc-400 font-medium max-w-xs mx-auto leading-relaxed">
                No active notifications found. You are completely caught up with all telemetry tracking.
              </p>
              <button
                onClick={handleRestoreDefaults}
                className="mt-6 px-5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white rounded-xl font-mono text-[9px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Resynchronize ledger</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

    </div>
  );
};
