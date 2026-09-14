import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AutoNovaAudio } from './AudioEngine';
import { 
  Search, Bell, User, Bookmark, ShoppingBag, TrendingUp, Zap, LogOut, 
  Download, MessageSquare, Check, ChevronDown, ChevronUp, Star, 
  ArrowLeft, FileText, Truck, ShieldCheck, Wrench, Sparkles, HelpCircle, AlertCircle,
  Settings
} from 'lucide-react';

export const OrdersView = ({
  userName = "Alexander Vance",
  role = "Client",
  orders = [],
  onNavigateToView,
  onBackToGate,
  showNotification,
}) => {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'progress' | 'completed' | 'cancelled'
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrders, setExpandedOrders] = useState({ 'AN-829410': true }); // Default expand first order
  
  // Review Modal state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewCar, setReviewCar] = useState(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  // Support Chat Drawer state
  const [showSupportChat, setShowSupportChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'support', text: 'Hello! I am your AutoNova concierge agent. How can I assist you with your vehicle tracking today?' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Toggle order expanded state
  const toggleExpand = (orderId) => {
    AutoNovaAudio.playClick();
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  // Filter orders based on tab and search query
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.carName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (activeTab === 'progress') {
      return order.status === 'Processing' || order.status === 'In Progress' || order.status === 'Confirmed';
    }
    if (activeTab === 'completed') {
      return order.status === 'Delivered' || order.status === 'Completed';
    }
    if (activeTab === 'cancelled') {
      return order.status === 'Cancelled';
    }
    return true; // 'all'
  });

  const handleDownloadInvoice = (order) => {
    AutoNovaAudio.playClick();
    showNotification(`Downloading electronic ledger invoice for order ${order.id}...`, "success");
    
    const invoiceData = {
      institution: "AutoNova Intelligence Group",
      invoiceNumber: `INV-${order.id}`,
      client: userName,
      vehicle: order.carName,
      priceUSD: order.price,
      currencyExchange: "1 USD = 1,600 NGN",
      totalPaidNGN: order.price * 1600,
      clearanceRoute: order.deliveryMethod === 'showroom' ? "Lekki Showroom Pickup" : "Custom Flatbed Dispatch",
      timestamp: new Date().toISOString()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(invoiceData, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `Invoice_${order.id}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
  };

  const handleOpenReview = (order) => {
    AutoNovaAudio.playClick();
    setReviewCar(order);
    setRating(5);
    setReviewText('');
    setShowReviewModal(true);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    AutoNovaAudio.playSuccess();
    showNotification(`Thank you! Your ${rating}-star review for the ${reviewCar.carName} has been recorded on the ledger.`, "success");
    setShowReviewModal(false);
    setReviewCar(null);
  };

  const handleOpenSupport = (order) => {
    AutoNovaAudio.playClick();
    setShowSupportChat(true);
    setChatMessages([
      { sender: 'support', text: `Greetings Alexander. I see you are inquiring about order ${order.id} for the ${order.carName}. Our Lekki Port operations team is currently executing a level-4 quality validation check.` }
    ]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    AutoNovaAudio.playClick();
    const userMsg = { sender: 'user', text: newMessage };
    setChatMessages(prev => [...prev, userMsg]);
    setNewMessage('');

    // Concierge response simulation
    setTimeout(() => {
      AutoNovaAudio.playSuccess();
      setChatMessages(prev => [
        ...prev,
        { sender: 'support', text: 'Understood. I have flagged your query directly to our port dispatch manager. We will notify you via secure alert once the trailer leaves Apapa port.' }
      ]);
    }, 1200);
  };

  return (
    <div className="flex-grow flex flex-col lg:flex-row relative bg-zinc-50">
      
      {/* LEFT SIDEBAR (Consistent with Member Dashboard) */}
      <aside className="hidden lg:flex w-64 flex-col py-8 px-6 bg-white border-r border-zinc-200/60 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto shrink-0">
        <div className="mb-8">
          <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Member Account</p>
          <h2 className="font-display font-black text-sm text-teal-950 leading-tight truncate">{userName}</h2>
          <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-[8px] font-mono font-bold text-teal-800 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
            {role === 'Dealer' ? 'BLACK LABEL ELITE' : role === 'Seller' ? 'LIQUIDATOR' : 'ELITE MEMBER'}
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
            onClick={() => { AutoNovaAudio.playClick(); }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-teal-50/80 text-teal-950 border-r-4 border-teal-800 font-bold transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-4 w-4" />
              <span>Purchase History</span>
            </div>
            <span className="font-mono text-[9px] bg-teal-800 text-white px-1.5 py-0.5 rounded-md">
              {orders.filter(o => o.status === 'Processing').length}
            </span>
          </button>

          <button 
            onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('portfolio'); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-all cursor-pointer text-left"
          >
            <Truck className="h-4 w-4" />
            <span>Vehicle Tracking</span>
          </button>

          <button 
            onClick={() => { AutoNovaAudio.playClick(); showNotification("Accessing secure cloud dokument folder.", "success"); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-all cursor-pointer text-left"
          >
            <FileText className="h-4 w-4" />
            <span>Documents</span>
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
            onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('assistant'); }}
            className="w-full py-3 bg-teal-950 hover:bg-teal-900 text-white rounded-xl font-mono text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
          >
            <Zap className="h-3.5 w-3.5 text-teal-400" />
            <span>Upgrade to Pro</span>
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

      {/* MAIN ORDERS SECTION */}
      <main className="flex-1 px-4 py-10 md:px-12 max-w-5xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2 text-zinc-400 hover:text-teal-800 cursor-pointer transition-colors" onClick={() => onNavigateToView('portfolio')}>
            <ArrowLeft className="h-4 w-4" />
            <span className="font-mono text-[9px] font-black uppercase tracking-widest">Back to Member Hub</span>
          </div>
          <h1 className="font-display font-black text-2xl md:text-3xl lg:text-4xl text-teal-950 tracking-tight">
            My Orders
          </h1>
          <p className="text-xs md:text-sm text-zinc-500 mt-1 font-medium leading-relaxed">
            Track your precision-curated vehicle acquisitions, order milestones, and delivery logistics.
          </p>
        </header>

        {/* Search & Filter bar row */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 pb-4 border-b border-zinc-200/50">
          {/* Tabs */}
          <div className="flex overflow-x-auto gap-1.5 p-1 bg-zinc-100 rounded-xl w-full md:w-auto shrink-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Orders' },
              { id: 'progress', label: 'In Progress' },
              { id: 'completed', label: 'Completed' },
              { id: 'cancelled', label: 'Cancelled' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { AutoNovaAudio.playClick(); setActiveTab(tab.id); }}
                className={`px-4 py-1.5 rounded-lg font-mono text-[9px] font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-teal-950 shadow-sm font-bold border border-zinc-200/30'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by order ID or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-xl py-1.5 pl-9 pr-4 text-xs font-medium placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-teal-700/30 focus:border-teal-700 transition-all"
            />
          </div>
        </div>

        {/* Orders list block */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, idx) => {
                const isExpanded = !!expandedOrders[order.id];
                return (
                  <motion.div
                    key={order.id}
                    layoutId={`order-card-${order.id}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="bg-white rounded-2xl border border-zinc-200/60 shadow-sm overflow-hidden group hover:border-zinc-300 transition-all"
                  >
                    {/* Header Row (click to expand) */}
                    <div 
                      onClick={() => toggleExpand(order.id)}
                      className="p-5 md:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-5 select-none"
                    >
                      <div className="flex gap-4 items-center">
                        <div className="w-20 h-14 md:w-24 md:h-16 rounded-xl bg-zinc-50 border border-zinc-100 overflow-hidden shrink-0">
                          <img 
                            src={order.image} 
                            alt={order.carName} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-display font-black text-xs md:text-sm text-teal-950 group-hover:text-teal-800 transition-colors">
                              {order.carName}
                            </h3>
                            <span className="font-mono text-[8px] font-bold text-zinc-400 tracking-wider">
                              {order.trim}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-zinc-500 font-medium">
                            <span className="font-mono text-[9px] text-zinc-400">Order <span className="font-bold text-zinc-600">#{order.id}</span></span>
                            <span>Placed <span className="font-bold text-zinc-600">{order.placedDate}</span></span>
                            <span className="text-teal-800 font-extrabold">₦{(order.price * 1600).toLocaleString('en-NG')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-zinc-100">
                        {/* Status tag */}
                        <div className={`px-2.5 py-1 rounded-full text-[8px] font-mono font-black uppercase tracking-wider inline-flex items-center gap-1.5 ${
                          order.status === 'Processing' || order.status === 'Confirmed'
                            ? 'bg-teal-50 text-teal-800 border border-teal-100'
                            : order.status === 'Delivered' || order.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-100'
                              : 'bg-zinc-100 text-zinc-500'
                        }`}>
                          {(order.status === 'Processing' || order.status === 'Confirmed') && (
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
                          )}
                          {order.status}
                        </div>

                        <div className="p-1.5 rounded-lg hover:bg-zinc-50 transition-colors">
                          {isExpanded ? <ChevronUp className="h-4 w-4 text-zinc-400" /> : <ChevronDown className="h-4 w-4 text-zinc-400" />}
                        </div>
                      </div>
                    </div>

                    {/* Expandable Body */}
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-zinc-100 bg-zinc-50/50"
                      >
                        <div className="p-6 space-y-6">
                          
                          {/* Timeline Tracking */}
                          <div>
                            <h4 className="font-mono text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-6">
                              ORDER DELIVERY TIMELINE (NEURAL DISPATCH STATUS)
                            </h4>
                            
                            <div className="grid grid-cols-4 gap-2 relative max-w-3xl mx-auto">
                              
                              {/* Connector Lines */}
                              <div className="absolute top-4 left-[12.5%] right-[12.5%] h-0.5 bg-zinc-200 -z-10" />
                              <div 
                                className="absolute top-4 left-[12.5%] h-0.5 bg-teal-700 -z-10 transition-all duration-500" 
                                style={{ width: `${(Math.min(order.timelineStep - 1, 3) / 3) * 75}%` }}
                              />

                              {/* Step 1 */}
                              <div className="flex flex-col items-center text-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-[10px] font-black transition-all ${
                                  order.timelineStep >= 1
                                    ? 'bg-teal-700 text-white ring-4 ring-teal-50'
                                    : 'bg-zinc-200 text-zinc-400'
                                }`}>
                                  {order.timelineStep > 1 ? <Check className="h-4 w-4" /> : '1'}
                                </div>
                                <p className={`mt-2 font-display font-extrabold text-[10px] ${order.timelineStep >= 1 ? 'text-teal-950' : 'text-zinc-400'}`}>
                                  Confirmed
                                </p>
                                <p className="text-[8px] font-mono font-medium text-zinc-400 mt-0.5">Customs Escrow OK</p>
                              </div>

                              {/* Step 2 */}
                              <div className="flex flex-col items-center text-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-[10px] font-black transition-all ${
                                  order.timelineStep >= 2
                                    ? 'bg-teal-700 text-white ring-4 ring-teal-50'
                                    : 'bg-zinc-200 text-zinc-400'
                                }`}>
                                  {order.timelineStep > 2 ? <Check className="h-4 w-4" /> : '2'}
                                </div>
                                <p className={`mt-2 font-display font-extrabold text-[10px] ${order.timelineStep >= 2 ? 'text-teal-950' : 'text-zinc-400'}`}>
                                  Docs Signed
                                </p>
                                <p className="text-[8px] font-mono font-medium text-zinc-400 mt-0.5">Title & Duties Cleared</p>
                              </div>

                              {/* Step 3 */}
                              <div className="flex flex-col items-center text-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-[10px] font-black transition-all ${
                                  order.timelineStep === 3
                                    ? 'bg-teal-50 text-teal-800 border-2 border-teal-700 animate-pulse ring-4 ring-teal-50'
                                    : order.timelineStep > 3
                                      ? 'bg-teal-700 text-white'
                                      : 'bg-zinc-200 text-zinc-400'
                                }`}>
                                  {order.timelineStep > 3 ? <Check className="h-4 w-4" /> : <Wrench className="h-3.5 w-3.5" />}
                                </div>
                                <p className={`mt-2 font-display font-extrabold text-[10px] ${order.timelineStep >= 3 ? 'text-teal-950' : 'text-zinc-400'}`}>
                                  Quality Check
                                </p>
                                <p className="text-[8px] font-mono font-medium text-zinc-400 mt-0.5">Lekki Center Audit</p>
                              </div>

                              {/* Step 4 */}
                              <div className="flex flex-col items-center text-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-[10px] font-black transition-all ${
                                  order.timelineStep >= 4
                                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                                    : 'bg-zinc-200 text-zinc-400'
                                }`}>
                                  <Truck className="h-3.5 w-3.5" />
                                </div>
                                <p className={`mt-2 font-display font-extrabold text-[10px] ${order.timelineStep >= 4 ? 'text-emerald-950 font-black' : 'text-zinc-400'}`}>
                                  Delivered
                                </p>
                                <p className="text-[8px] font-mono font-medium text-zinc-400 mt-0.5">Handover Complete</p>
                              </div>

                            </div>
                          </div>

                          {/* Detail summary callouts */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-200/40">
                            <div className="bg-white p-4 rounded-xl border border-zinc-150/80">
                              <span className="font-mono text-[7px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                                LOGISTICS ROUTING DETAILS
                              </span>
                              <p className="text-xs text-zinc-800 font-bold leading-normal">
                                {order.deliveryMethod === 'showroom' 
                                  ? "Self-Pickup at AutoNova Luxury Showroom, Lekki Phase 1, Lagos"
                                  : "Enclosed Flatbed Delivery directly to Secure Private Compound"}
                              </p>
                              <span className="font-mono text-[7.5px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded mt-2 inline-block uppercase">
                                Port: Apapa Complex, Lagos, Nigeria
                              </span>
                            </div>

                            <div className="bg-white p-4 rounded-xl border border-zinc-150/80 flex flex-col justify-between">
                              <div>
                                <span className="font-mono text-[7px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                                  FINANCIAL STATUS
                                </span>
                                <p className="text-xs text-zinc-800 font-bold">
                                  CBN Escrow Payment: <span className="text-emerald-700 font-black">FULLY CLEARING</span>
                                </p>
                              </div>
                              <p className="text-[9px] text-zinc-400 font-medium mt-1">
                                Electronic certificate generated under Central Bank of Nigeria escrow guidelines.
                              </p>
                            </div>
                          </div>

                          {/* Expanded Action buttons */}
                          <div className="flex flex-wrap items-center gap-3 pt-2">
                            <button
                              onClick={() => handleDownloadInvoice(order)}
                              className="inline-flex items-center gap-1.5 text-teal-800 hover:text-teal-950 font-mono text-[9px] font-black uppercase tracking-wider cursor-pointer"
                            >
                              <Download className="h-3.5 w-3.5" />
                              <span>Download Invoice</span>
                            </button>
                            
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />

                            <button
                              onClick={() => handleOpenSupport(order)}
                              className="inline-flex items-center gap-1.5 text-teal-800 hover:text-teal-950 font-mono text-[9px] font-black uppercase tracking-wider cursor-pointer"
                            >
                              <MessageSquare className="h-3.5 w-3.5" />
                              <span>Concierge Support Chat</span>
                            </button>

                            {(order.status === 'Delivered' || order.status === 'Completed' || order.timelineStep === 4) && (
                              <>
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                                <button
                                  onClick={() => handleOpenReview(order)}
                                  className="inline-flex items-center gap-1.5 text-purple-700 hover:text-purple-900 font-mono text-[9px] font-black uppercase tracking-wider cursor-pointer ml-auto bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-xl border border-purple-100 transition-all"
                                >
                                  <Star className="h-3.5 w-3.5 fill-purple-700" />
                                  <span>Write Owner Review</span>
                                </button>
                              </>
                            )}
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white border border-zinc-200/60 rounded-3xl"
              >
                <div className="p-4 bg-teal-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4 text-teal-800">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <h3 className="font-display font-black text-sm text-teal-950 uppercase tracking-wide">No Matches Found</h3>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto mt-2 font-medium leading-relaxed">
                  We found no acquisitions under the "{activeTab}" filter. Begin your curation in the showroom!
                </p>
                <button
                  onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('dashboard'); }}
                  className="mt-6 px-6 py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-mono text-[9px] font-black uppercase tracking-widest rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Browse Showroom Inventory
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* SUPPORT CHAT DRAWER */}
      <AnimatePresence>
        {showSupportChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[150] flex justify-end"
            onClick={() => setShowSupportChat(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white h-screen shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-zinc-150 flex items-center justify-between bg-teal-950 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-800 border-2 border-teal-400/50 flex items-center justify-center font-mono font-black text-xs">
                    AN
                  </div>
                  <div>
                    <h3 className="font-display font-black text-sm uppercase tracking-wide">Lekki Concierge</h3>
                    <p className="text-[8px] font-mono font-bold tracking-widest text-teal-300">SECURE PORTAL ONLINE</p>
                  </div>
                </div>
                <button 
                  onClick={() => { AutoNovaAudio.playClick(); setShowSupportChat(false); }}
                  className="p-1.5 bg-teal-900/50 hover:bg-teal-900 text-white rounded-lg transition-colors cursor-pointer"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              {/* Chat Message Scroll list */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-zinc-50">
                {chatMessages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`p-4 rounded-2xl max-w-[85%] text-xs shadow-sm font-medium leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-teal-700 text-white rounded-tr-none'
                        : 'bg-white border border-zinc-200 text-zinc-800 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-zinc-150 bg-white flex gap-2">
                <input
                  type="text"
                  placeholder="Inquire about custom clearings..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 border border-zinc-200 rounded-xl px-4 py-2 text-xs font-medium placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-teal-700"
                />
                <button
                  type="submit"
                  className="bg-teal-800 hover:bg-teal-900 text-white px-4 py-2 rounded-xl font-mono text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Send
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WRITE REVIEW MODAL */}
      <AnimatePresence>
        {showReviewModal && reviewCar && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[160] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl border border-zinc-200 shadow-2xl p-6 md:p-8 w-full max-w-lg text-zinc-900"
            >
              <h3 className="font-display font-black text-lg text-teal-950 mb-1 uppercase tracking-wide">
                Write Owner Review
              </h3>
              <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest mb-6">
                Record your real-world driving observations on the ledger
              </p>

              <form onSubmit={handleSubmitReview} className="space-y-5">
                <div>
                  <label className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">
                    RATE YOUR {reviewCar.carName.toUpperCase()}
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => { AutoNovaAudio.playClick(); setRating(star); }}
                        className="p-1 cursor-pointer transition-transform hover:scale-110"
                      >
                        <Star className={`h-6 w-6 ${star <= rating ? 'text-purple-600 fill-purple-600' : 'text-zinc-200'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">
                    YOUR VERDICT & FEEDBACK
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the torque vectoring, solid-state efficiency, or cabin isolation on Nigeria's highways..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-teal-700 transition-all"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => { AutoNovaAudio.playClick(); setShowReviewModal(false); setReviewCar(null); }}
                    className="flex-1 py-3 border border-zinc-200 text-zinc-500 hover:text-zinc-800 rounded-xl font-mono text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-mono text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-md active:scale-98"
                  >
                    Submit Ledger Review
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
