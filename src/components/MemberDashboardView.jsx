import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AutoNovaAudio } from './AudioEngine';
import { CountUp } from './CountUp';
import { RECOMMENDATIONS } from './CatalogPage';
import { 
  Check, ArrowRight, Star, Heart, Calendar, ShoppingBag, 
  MessageSquare, History, Bookmark, Sliders, Settings, 
  LogOut, User, DollarSign, Award, ArrowUpRight, Zap,
  TrendingUp, ShieldCheck, ChevronRight, Download, Info, X, Clock, HelpCircle, Eye, Bell, Search, BookOpen, Globe, Sparkles
} from 'lucide-react';

export const MemberDashboardView = ({ 
  userName = "Alex Sterling", 
  role = "Client", 
  favoritedCars = [], 
  comparedCars = [],
  orders = [],
  userPreferences = null,
  activityLog = [],
  onNavigateToView, // Callback to set currentView in parent CatalogPage
  onSelectCar, // Callback to view details of a car
  onBackToGate,
  showNotification,
  handleFavoriteToggle,
  onOpenValuationModal
}) => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'bids' | 'trends'
  
  // Test Drive Modal states
  const [showTestDriveModal, setShowTestDriveModal] = useState(false);
  const [selectedDriveCar, setSelectedDriveCar] = useState('Lucid Air Sapphire');
  const [selectedLocation, setSelectedLocation] = useState('Lekki Showroom, Lagos');
  const [selectedDate, setSelectedDate] = useState('2026-07-11');
  const [selectedTime, setSelectedTime] = useState('11:00');

  // Order tracking states
  const [showOrderTracker, setShowOrderTracker] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('AN-NG-849204');
  
  // Market Trends mock data for charts/visualizations
  const trendsData = [
    { name: 'Lucid Sapphire', delta: '+12.4%', value: '₦438,400,000', direction: 'up', demand: 'Extremely High' },
    { name: 'Rivian R1S', delta: '+5.8%', value: '₦147,200,000', direction: 'up', demand: 'High' },
    { name: 'Porsche Taycan', delta: '-2.1%', value: '₦299,200,000', direction: 'down', demand: 'Stable' },
    { name: 'Tesla Model S Plaid', delta: '+8.3%', value: '₦143,984,000', direction: 'up', demand: 'Very High' }
  ];

  // AI Picks For You — genuinely computed from real inventory and the user's actual
  // onboarding preferences (previously this was 3 hardcoded cars with fake IDs that
  // didn't even exist in the real catalog, so clicking them silently showed the wrong car).
  const scoredCars = RECOMMENDATIONS.map(car => {
    let score = 0;
    if (userPreferences?.selectedBodies?.includes(car.bodyType)) score += 3;
    if (userPreferences?.selectedFuel && car.type === userPreferences.selectedFuel) score += 2;
    if (userPreferences?.selectedBudget && car.price <= userPreferences.selectedBudget) score += 1;
    return { car, score };
  });
  const hasPreferences = !!userPreferences;
  const topScored = [...scoredCars].sort((a, b) => b.score - a.score);
  const aiPicks = (hasPreferences ? topScored : scoredCars)
    .slice(0, 3)
    .map(({ car }) => ({
      id: car.id,
      name: car.name,
      trim: car.model,
      price: car.price,
      specs: car.specs,
      image: car.image,
    }));
  const aiPicksIntro = hasPreferences
    ? `Based on the ${userPreferences.selectedBodies?.[0] || 'vehicle type'} and ${userPreferences.selectedFuel || ''} preferences from your onboarding, plus your recent activity, here's what we think you'll love.`
    : `Based on your recent searches and saved vehicles, we think these three matches align closely with the performance, range, and price range you've been exploring.`;

  // Recently Viewed slider cars
  const recentlyViewed = [
    {
      id: 'porsche-taycan',
      name: 'Porsche Taycan',
      trim: 'Turbo S',
      price: 187000,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWoBnQfVhdLeN9JZxcpegPbYCpb1IJITDH-8wFgN6YYIHNQEeuTYD-u8-ij_32nMixS5LoZU6eVGPKGpKNqcsq7IYg7Mk_LyqEsr2Jul46tRVMA1iyuEXlGAeMmjBQfq2trRGJAS0rq1yveKCdK6STnNMIFDnr5Jq7m4FcfRtMmGndynyo343Y4XJ-g-dWa7u7030PIkn2iM8faKJhUnIW4SXeNZvGOoXgs8qeY_cqU5AoTHAVJ4OZcGNazUQmLnzC2RSpTcW8RlWl'
    },
    {
      id: 'tesla-model-s-plaid',
      name: 'Tesla Model S Plaid',
      trim: 'Tri-Motor',
      price: 89990,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjAeq0wiMvjlk0pbEc4E_b11cV2HBwg50p4dzteDITuGjHl2PV3oAD5-FaR8rb9bPLyHdg5oyxxsJgKVlmOxAwnUFzue0vI7PpnDNfHGYHQm4XpkaUGNDjrZxpJMmkpe4zFNMMV84oz0L5QJf8Y0w8wVXxA0KClYArqyCJWKek1tM8o0ZX07WOjDvE0NaP_Timz2AuU-eKWFfWT6yuc7oAhD75hhmQFQ-hBS7SHInyrMPm6LPT3n42R7zWwsbnuTc49CSRu4ujbhHF'
    },
    {
      id: 'mercedes-eqs',
      name: 'Mercedes EQS',
      trim: '580 4MATIC',
      price: 125000,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBj8iw8_ElAp_JNJpc8B71kNlFJljvZoIYBYAzLc5kB1XWJwBhkS7PlSIPvHSbk3TUyZZAiQlXdBP3WfEfb_d2kHEXWWG-zEVsK6nrm6HpfRcp4pMfYiMsYEFBQsP3SoOqbULooWQGzSz-UvZGAerOZ6_3JKpkvL7B8DXT984VIDEqWVxRbBf6scbNVD7tAy-HtrgoNUJW5UCwOHurXA1NO9GHmthHwIpChXzAtJbun0p3BVEMLBQmmBnUICW4SDny8JJ_xeJ83AnrP'
    },
    {
      id: 'bmw-i7',
      name: 'BMW i7',
      trim: 'M70 xDrive',
      price: 168500,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAX8iWg50a6m4Vbb_yjA3qjgPmWkxDqOwHpeVNRs6AhhnAgAcW2_OfPwTiOc18xfilIeVgtW3J4k3TnluLBGkf2bTX1CBUCfqQT1a5_NwhW7frH07t-IDSXPDrzH4tzXoCXtIO-gZYRC-Oc_6oSJKZMvQqsx78--NuuV0WPj8LedPHd2HYsZTj3wFAa9_SNWN6NU8YjgScebn8cLxvnSBv1y5-u_SvCDG8GcXK5G409dQil9OVoeh12nl-fgE5ZfG3aUWbJ1NTEy8wf'
    }
  ];

  const handleBookTestDrive = (e) => {
    e?.preventDefault();
    AutoNovaAudio.playSuccess();
    showNotification(`Test drive booked successfully for ${selectedDriveCar} at ${selectedLocation}!`, "success");
    setShowTestDriveModal(false);
  };

  const handleUpgradeToPro = () => {
    AutoNovaAudio.playSuccess();
    showNotification("You are now upgraded to AutoNova Black Label Elite. Dynamic high-frequency trading active.", "success");
  };

  return (
    <div className="flex-grow flex flex-col md:flex-row relative bg-zinc-50/50">
      
      {/* 1. Left Sidebar Navigation (Desktop) */}
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
            onClick={() => { AutoNovaAudio.playClick(); setActiveTab('overview'); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer text-left ${
              activeTab === 'overview' 
                ? 'bg-teal-50/80 text-teal-950 border-r-4 border-teal-800 font-bold' 
                : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
            }`}
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
              <History className="h-4 w-4" />
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

          <button 
            onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('seller-dashboard'); }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-all cursor-pointer text-left border border-dashed border-teal-600/30 bg-teal-50/10"
          >
            <div className="flex items-center gap-3 text-teal-800">
              <TrendingUp className="h-4 w-4" />
              <span className="font-bold">Seller Hub</span>
            </div>
            <span className="font-mono text-[7px] bg-teal-800 text-white px-1.5 py-0.5 rounded font-black uppercase">PORTAL</span>
          </button>

          <button 
            onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('reviews'); }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <Star className="h-4 w-4 text-amber-500 fill-current" />
              <span>Reviews Ledger</span>
            </div>
            <span className="font-mono text-[7px] bg-amber-500 text-white px-1.5 py-0.5 rounded font-black uppercase">4.9</span>
          </button>

          <button 
            onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('blog'); }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-purple-500" />
              <span>Sovereign Blog</span>
            </div>
            <span className="font-mono text-[7px] bg-purple-600 text-white px-1.5 py-0.5 rounded font-black uppercase">NEW</span>
          </button>

          <button 
            onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('about'); }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-teal-600" />
              <span>About AutoNova</span>
            </div>
            <span className="font-mono text-[7px] bg-teal-600 text-white px-1.5 py-0.5 rounded font-black uppercase">CORE</span>
          </button>

          <button 
            onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('help'); }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="h-4 w-4 text-sky-600" />
              <span>Help Center</span>
            </div>
            <span className="font-mono text-[7px] bg-sky-600 text-white px-1.5 py-0.5 rounded font-black uppercase">FAQ</span>
          </button>

          <button 
            onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('terms'); }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Terms of Service</span>
            </div>
            <span className="font-mono text-[7px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-black uppercase">Legal</span>
          </button>

          <button 
            onClick={() => { AutoNovaAudio.playClick(); setActiveTab('bids'); }}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all cursor-pointer text-left ${
              activeTab === 'bids' 
                ? 'bg-teal-50/80 text-teal-950 border-r-4 border-teal-800 font-bold' 
                : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-4 w-4" />
              <span>Active Bids</span>
            </div>
            <span className="font-mono text-[9px] bg-teal-800 text-white px-1.5 py-0.5 rounded-md">1</span>
          </button>

          <button 
            onClick={() => { AutoNovaAudio.playClick(); setActiveTab('trends'); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer text-left ${
              activeTab === 'trends' 
                ? 'bg-teal-50/80 text-teal-950 border-r-4 border-teal-800 font-bold' 
                : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            <span>Market Trends</span>
          </button>
        </nav>

        <div className="pt-6 mt-6 border-t border-zinc-100 space-y-4">
          <button 
            onClick={handleUpgradeToPro}
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

      {/* 2. Main Scrollable Panel Canvas */}
      <main className="flex-grow p-4 md:p-8 overflow-y-auto max-w-5xl mx-auto w-full">
        
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            {/* Header / Welcome greeting */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="font-display font-black text-xl md:text-2xl text-teal-950 tracking-tight">
                  Welcome back, {userName.split(' ')[0]}
                </h1>
                <p className="text-[11px] font-medium text-zinc-500 mt-1">
                  Your luxury curated automotive ledger and portfolio is active and synchronized.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-teal-50 p-2.5 rounded-2xl shadow-sm border border-teal-100 shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-1/2 animate-shimmer" />
                <div className="flex -space-x-2.5">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-purple-500 to-teal-400 flex items-center justify-center">
                      <Star className="h-3.5 w-3.5 text-white fill-current" />
                    </div>
                  ))}
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-mono font-black bg-gradient-to-r from-purple-700 to-teal-700 bg-clip-text text-transparent uppercase tracking-wide">Gold Member</p>
                  <p className="text-[8px] font-mono font-bold text-zinc-400 mt-0.5 uppercase tracking-widest">Apapa Port Concierge Fast-Track</p>
                </div>
              </div>
            </div>

            {/* Stat Cards Grid Row */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div 
                onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('saved'); }}
                className="bg-white p-5 rounded-2xl border border-zinc-200/50 shadow-sm cursor-pointer hover:border-teal-700/20 hover:shadow transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-teal-50 rounded-xl text-teal-800">
                    <Bookmark className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-widest group-hover:text-teal-800 transition-colors">View All</span>
                </div>
                <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Saved Garage</p>
                <h3 className="font-display font-black text-xl md:text-2xl text-teal-950 mt-1"><CountUp value={favoritedCars.length} /></h3>
              </div>

              <div 
                onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('orders'); }}
                className="bg-white p-5 rounded-2xl border border-zinc-200/50 shadow-sm cursor-pointer hover:border-teal-700/20 hover:shadow transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-teal-50 rounded-xl text-teal-800">
                    <ShoppingBag className="h-4.5 w-4.5" />
                  </div>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-teal-50 border border-teal-100 text-[7px] font-mono font-bold text-teal-800 uppercase tracking-wider">
                    Lagos Port
                  </span>
                </div>
                <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Active Orders</p>
                <h3 className="font-display font-black text-xl md:text-2xl text-teal-950 mt-1"><CountUp value={orders.length} /></h3>
              </div>

              <div 
                onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('test-drives'); }}
                className="bg-white p-5 rounded-2xl border border-zinc-200/50 shadow-sm cursor-pointer hover:border-teal-700/20 hover:shadow transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-teal-50 rounded-xl text-teal-800">
                    <Calendar className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-widest group-hover:text-teal-800 transition-colors">Book</span>
                </div>
                <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Test Drives</p>
                <h3 className="font-display font-black text-xl md:text-2xl text-teal-950 mt-1"><CountUp value={2} /></h3>
              </div>

              <div 
                onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('messages'); }}
                className="bg-white p-5 rounded-2xl border border-zinc-200/50 shadow-sm cursor-pointer hover:border-teal-700/20 hover:shadow transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-teal-50 rounded-xl text-teal-800">
                    <MessageSquare className="h-4.5 w-4.5" />
                  </div>
                  <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
                </div>
                <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Secure Messages</p>
                <h3 className="font-display font-black text-xl md:text-2xl text-teal-950 mt-1"><CountUp value={1} /></h3>
              </div>

            </section>

            {/* AI Picks For You Panel */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-200/60 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-2.5 mb-6">
                <span className="p-1.5 rounded-lg bg-teal-50 text-teal-800">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </span>
                <div>
                  <h2 className="font-display font-black text-xs md:text-sm text-teal-950 uppercase tracking-wider">AI Picks For You</h2>
                  <p className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest mt-0.5">High Performance & High Efficiency Selection</p>
                </div>
              </div>

              <p className="text-xs text-zinc-500 font-medium leading-relaxed mb-6 -mt-3">
                {aiPicksIntro}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {aiPicks.map((carItem) => {
                  const isSaved = favoritedCars.includes(carItem.id);
                  return (
                    <div 
                      key={carItem.id} 
                      className="group border border-zinc-100 hover:border-teal-700/10 rounded-2xl overflow-hidden bg-zinc-50/50 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        {/* Aspect Ratio Box with zoom */}
                        <div className="aspect-[16/10] overflow-hidden bg-zinc-200 relative">
                          <img 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            src={carItem.image} 
                            alt={carItem.name} 
                            referrerPolicy="no-referrer"
                          />
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFavoriteToggle(carItem.id, carItem.name, e);
                            }}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow-sm flex items-center justify-center text-zinc-500 hover:text-red-600 transition-colors cursor-pointer"
                          >
                            <Heart className={`h-4.5 w-4.5 ${isSaved ? 'fill-red-600 text-red-600' : ''}`} />
                          </button>
                        </div>

                        {/* Title Trim Spec */}
                        <div className="p-4">
                          <h4 className="font-display font-black text-xs text-teal-950">{carItem.name}</h4>
                          <p className="font-mono text-[8px] font-extrabold text-zinc-400 uppercase tracking-widest mt-1">
                            {carItem.trim} • ₦{(carItem.price * 1600).toLocaleString()}
                          </p>

                          <div className="mt-3.5 flex gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 bg-white border border-zinc-200/50 text-[7px] font-mono font-bold rounded text-zinc-500 uppercase">
                              {carItem.specs.power}
                            </span>
                            <span className="px-2 py-0.5 bg-white border border-zinc-200/50 text-[7px] font-mono font-bold rounded text-zinc-500 uppercase">
                              {carItem.specs.range}
                            </span>
                            <span className="px-2 py-0.5 bg-white border border-zinc-200/50 text-[7px] font-mono font-bold rounded text-zinc-500 uppercase">
                              {carItem.specs.zeroToSixty}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quick Interactive button row */}
                      <div className="p-4 pt-0 border-t border-zinc-100/50 flex gap-2">
                        <button 
                          onClick={() => { AutoNovaAudio.playClick(); onSelectCar(carItem); }}
                          className="flex-1 py-2 bg-teal-800 hover:bg-teal-900 text-white font-mono text-[8px] font-extrabold uppercase tracking-widest rounded-lg transition-colors cursor-pointer text-center"
                        >
                          Explore Specs
                        </button>
                        <button 
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            setSelectedDriveCar(`${carItem.name} (${carItem.trim})`);
                            setShowTestDriveModal(true);
                          }}
                          className="p-2 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-lg text-zinc-500 hover:text-teal-800 transition-colors cursor-pointer"
                          title="Schedule Test Drive"
                        >
                          <Calendar className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Bottom Section: Activities + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Recent Activity Timeline Log — now genuinely reflects real actions instead of hardcoded fake events */}
              <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-zinc-200/60">
                <h3 className="font-display font-black text-xs text-teal-950 uppercase tracking-wider mb-5 flex items-center gap-2">
                  <History className="h-4 w-4 text-teal-800" />
                  <span>Recent Activity</span>
                </h3>

                <div className="space-y-4 text-xs font-semibold text-zinc-600">
                  {(!activityLog || activityLog.length === 0) ? (
                    <div className="text-center py-8">
                      <p className="text-zinc-400 font-medium">No activity yet — start browsing, saving cars, or booking a test drive.</p>
                    </div>
                  ) : (
                    activityLog.slice(0, 5).map((event) => {
                      const iconMap = { Heart: Heart, ShoppingBag: ShoppingBag, Calendar: Calendar };
                      const EventIcon = iconMap[event.icon] || Check;
                      const timeAgo = (() => {
                        const diffMs = Date.now() - new Date(event.timestamp).getTime();
                        const mins = Math.floor(diffMs / 60000);
                        if (mins < 1) return 'Just now';
                        if (mins < 60) return `${mins}m ago`;
                        const hrs = Math.floor(mins / 60);
                        if (hrs < 24) return `${hrs}h ago`;
                        return `${Math.floor(hrs / 24)}d ago`;
                      })();
                      return (
                        <div key={event.id} className="flex gap-4 items-center p-3 hover:bg-zinc-50 rounded-xl transition-all border border-zinc-100/30">
                          <div className="w-9 h-9 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-800 shrink-0">
                            <EventIcon className="h-4 w-4" />
                          </div>
                          <div className="flex-grow min-w-0">
                            <p className="text-teal-950 font-bold leading-normal truncate">{event.text}</p>
                            <p className="text-[9px] font-mono font-bold text-zinc-400 mt-0.5 uppercase tracking-wide">
                              {timeAgo}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-zinc-200/60">
                <h3 className="font-display font-black text-xs text-teal-950 uppercase tracking-wider mb-5">
                  Quick Actions Panel
                </h3>

                <div className="grid grid-cols-2 gap-3.5">
                  <button 
                    onClick={() => { AutoNovaAudio.playClick(); setShowOrderTracker(true); }}
                    className="flex flex-col items-center justify-center p-4 border border-zinc-100/80 bg-zinc-50/50 hover:bg-teal-50/30 hover:border-teal-700/10 rounded-2xl cursor-pointer transition-all active:scale-98"
                  >
                    <ShoppingBag className="h-6 w-6 text-teal-800 mb-1.5" />
                    <span className="font-mono text-[8px] font-bold tracking-widest text-zinc-500 uppercase">My Orders</span>
                  </button>

                  <button 
                    onClick={() => { AutoNovaAudio.playClick(); setShowTestDriveModal(true); }}
                    className="flex flex-col items-center justify-center p-4 border border-zinc-100/80 bg-zinc-50/50 hover:bg-teal-50/30 hover:border-teal-700/10 rounded-2xl cursor-pointer transition-all active:scale-98"
                  >
                    <Calendar className="h-6 w-6 text-teal-800 mb-1.5" />
                    <span className="font-mono text-[8px] font-bold tracking-widest text-zinc-500 uppercase">Test Drives</span>
                  </button>

                  <button 
                    onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('assistant'); }}
                    className="flex flex-col items-center justify-center p-4 border border-zinc-100/80 bg-zinc-50/50 hover:bg-teal-50/30 hover:border-teal-700/10 rounded-2xl cursor-pointer transition-all active:scale-98"
                  >
                    <MessageSquare className="h-6 w-6 text-teal-800 mb-1.5" />
                    <span className="font-mono text-[8px] font-bold tracking-widest text-zinc-500 uppercase">Messages</span>
                  </button>

                  <button 
                    onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('saved'); }}
                    className="flex flex-col items-center justify-center p-4 border border-zinc-100/80 bg-zinc-50/50 hover:bg-teal-50/30 hover:border-teal-700/10 rounded-2xl cursor-pointer transition-all active:scale-98"
                  >
                    <Bookmark className="h-6 w-6 text-teal-800 mb-1.5" />
                    <span className="font-mono text-[8px] font-bold tracking-widest text-zinc-500 uppercase">Wishlist</span>
                  </button>

                  <button 
                    onClick={() => { AutoNovaAudio.playClick(); onOpenValuationModal(); }}
                    className="flex flex-col items-center justify-center p-4 border border-zinc-100/80 bg-zinc-50/50 hover:bg-teal-50/30 hover:border-teal-700/10 rounded-2xl cursor-pointer transition-all active:scale-98 col-span-2"
                  >
                    <DollarSign className="h-6 w-6 text-teal-800 mb-1.5" />
                    <span className="font-mono text-[8px] font-bold tracking-widest text-zinc-500 uppercase">Sell/Value Your Car</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Recently Viewed (Continue Browsing) Slider */}
            <section className="space-y-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-display font-black text-xs text-teal-950 uppercase tracking-wider">Continue Browsing</h3>
                <button 
                  onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('dashboard'); }}
                  className="font-mono text-[8px] font-black text-teal-800 hover:text-teal-950 uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                >
                  <span>View All Showroom</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recentlyViewed.map((carItem) => (
                  <div 
                    key={carItem.id} 
                    onClick={() => { AutoNovaAudio.playClick(); onSelectCar(carItem); }}
                    className="bg-white rounded-2xl border border-zinc-200/50 overflow-hidden shadow-sm group cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="h-32 bg-zinc-100 overflow-hidden relative">
                      <img 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        src={carItem.image} 
                        alt={carItem.name} 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-3.5 text-xs">
                      <h4 className="font-display font-black text-teal-950 leading-tight truncate">{carItem.name}</h4>
                      <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase mt-1">
                        {carItem.trim} • ₦{(carItem.price * 1600).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Protect Your Investment Section */}
            <section className="bg-zinc-50 border border-zinc-200/40 rounded-2xl p-6">
              <h3 className="font-display font-black text-xs text-teal-950 uppercase tracking-wider mb-4">Protect Your Investment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option 1 */}
                <div 
                  onClick={() => {
                    AutoNovaAudio.playClick();
                    showNotification("Elite Insurance coverage option added to consultation portfolio.", "success");
                  }}
                  className="group bg-white border border-zinc-200/50 p-5 rounded-xl flex gap-4 items-center hover:border-teal-700/15 cursor-pointer transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-800 shrink-0 group-hover:scale-105 transition-transform">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-display font-black text-xs text-teal-950 mb-0.5">Elite Port Protection Insurance</p>
                    <p className="text-[10px] text-zinc-400 font-semibold leading-normal">
                      Comprehensive custom insurance starting at ₦398,400/mo, underwritten by AXA Mansard (CBN Compliant).
                    </p>
                  </div>
                </div>

                {/* Option 2 */}
                <div 
                  onClick={() => {
                    AutoNovaAudio.playClick();
                    showNotification("Laser-measured custom floor mats option added to showroom cart.", "success");
                  }}
                  className="group bg-white border border-zinc-200/50 p-5 rounded-xl flex gap-4 items-center hover:border-teal-700/15 cursor-pointer transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-800 shrink-0 group-hover:scale-105 transition-transform">
                    <Sliders className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-display font-black text-xs text-teal-950 mb-0.5">Custom Laser floor Liners</p>
                    <p className="text-[10px] text-zinc-400 font-semibold leading-normal">
                      Tailor-made floor protection precisely mapped to your vehicle dimensions. Instant flatbed delivery.
                    </p>
                  </div>
                </div>
              </div>
            </section>

          </motion.div>
        )}

        {/* 2b. Bids Tab */}
        {activeTab === 'bids' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-baseline mb-4">
              <div>
                <h2 className="font-display font-black text-base text-teal-950 uppercase tracking-wider">Your Active Escrow Bids</h2>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Pending Curation liquidations</p>
              </div>
              <button 
                onClick={() => { AutoNovaAudio.playClick(); setActiveTab('overview'); }}
                className="font-mono text-[9px] font-black text-zinc-500 hover:text-zinc-800 uppercase tracking-widest cursor-pointer"
              >
                Back to overview
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/3 aspect-[16/10] bg-zinc-100 rounded-xl overflow-hidden">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuChSHTYG1fVEn51XrratM392c2DGk5YhV69dRhzAsrX0VqUVRyPwh4t0Bc3Z1yqbuHM1iwCp1z3F1f2DFYcCnQBaF58dNsRz04FGkjaacH__aGBqktgyHMoGXzkjfrEpWVM1mq6iJDyKim3w30TIK9fh70WRI94sb_sCrpZUR9ab7tTWzIn61C0M7HfPfQXrEP8HmgAqtxraak9I2UUN-nInEHsShMMWbj7SBUZHDhmnv_Y94yq_foA5JHq6JxTan8scFr1UuOAgUUh" 
                  alt="Lucid Air Sapphire" 
                />
              </div>

              <div className="w-full md:w-2/3 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-50 border border-yellow-200 text-[8px] font-mono font-bold text-yellow-800 uppercase">
                      <Clock className="w-2.5 h-2.5 animate-pulse" />
                      Pending Port Inspection
                    </span>
                    <h4 className="font-display font-black text-sm text-teal-950 mt-1.5">Lucid Air Sapphire</h4>
                    <p className="text-[10px] text-zinc-400 font-semibold uppercase mt-0.5">Tri-motor Sapphire Trim</p>
                  </div>

                  <div className="text-right">
                    <p className="text-[8px] font-mono font-bold text-zinc-400 uppercase">Your Escrow Locked</p>
                    <p className="font-display font-black text-sm text-teal-950 mt-0.5">₦398,400,000</p>
                    <p className="text-[9px] font-mono text-zinc-400">$249,000 USD</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => {
                      AutoNovaAudio.playClick();
                      showNotification("Message transmitted to customs transit inspector.", "info");
                    }}
                    className="flex-1 py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-mono text-[9px] font-black uppercase tracking-widest rounded-xl transition-colors cursor-pointer text-center"
                  >
                    Contact Transit Inspector
                  </button>
                  <button 
                    onClick={() => {
                      AutoNovaAudio.playClick();
                      showNotification("Escrow locked invoice downloaded.", "success");
                    }}
                    className="py-2.5 px-4 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-500 hover:text-zinc-800 font-mono text-[9px] font-black uppercase tracking-widest rounded-xl transition-colors cursor-pointer text-center"
                  >
                    Download Escrow Spec
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2c. Market Trends Tab */}
        {activeTab === 'trends' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-baseline mb-4">
              <div>
                <h2 className="font-display font-black text-base text-teal-950 uppercase tracking-wider">Nigerian Port Valuation Trends</h2>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Real-time custom duty indexing</p>
              </div>
              <button 
                onClick={() => { AutoNovaAudio.playClick(); setActiveTab('overview'); }}
                className="font-mono text-[9px] font-black text-zinc-500 hover:text-zinc-800 uppercase tracking-widest cursor-pointer"
              >
                Back to overview
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trendsData.map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-zinc-200/50 shadow-sm flex justify-between items-center">
                  <div>
                    <h4 className="font-display font-black text-xs text-teal-950">{item.name}</h4>
                    <p className="text-[10px] text-zinc-400 font-semibold mt-1">Sovereign demand: <span className="text-teal-800 font-bold">{item.demand}</span></p>
                    <p className="text-[9px] font-mono font-bold text-zinc-400 uppercase mt-0.5">Est. Port Duty Index: {item.value}</p>
                  </div>

                  <div className="text-right">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-mono text-[9px] font-black ${
                      item.direction === 'up' 
                        ? 'bg-teal-50 text-teal-800 border border-teal-100' 
                        : 'bg-red-50 text-red-800 border border-red-100'
                    }`}>
                      {item.delta}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* AI recommendation alert */}
            <div className="p-5 bg-teal-50/50 border border-teal-100/40 rounded-2xl flex gap-3">
              <Sparkles className="h-5 w-5 text-teal-800 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-teal-950">AI Market Insight</h4>
                <p className="text-[10px] text-zinc-500 font-medium leading-relaxed mt-1">
                  High-performance electric sedans are experiencing a 12.4% valuation increase in West African ports due to lowered customs clearing tariffs on zero-emission curations. We recommend lock-in bids immediately before high-frequency port adjustments.
                </p>
              </div>
            </div>
          </motion.div>
        )}

      </main>

      {/* 3. Interactive Modal: Schedule Test Drive */}
      <AnimatePresence>
        {showTestDriveModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTestDriveModal(false)}
              className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-zinc-200/60 shadow-2xl p-6 md:p-8 max-w-md w-full relative z-10"
            >
              <button 
                onClick={() => setShowTestDriveModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2.5 mb-6">
                <Calendar className="h-5 w-5 text-teal-800" />
                <h3 className="font-display font-black text-sm text-teal-950 uppercase tracking-wider">Book VIP Test Drive</h3>
              </div>

              <form onSubmit={handleBookTestDrive} className="space-y-4">
                
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Selected Curation</label>
                  <input 
                    type="text" 
                    value={selectedDriveCar} 
                    onChange={(e) => setSelectedDriveCar(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Showroom Hub</label>
                  <select 
                    value={selectedLocation} 
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
                  >
                    <option value="Lekki Showroom, Lagos">Lekki Showroom, Lagos (Plot 14, Admiralty Way)</option>
                    <option value="Central Area Hub, Abuja">Central Area Hub, Abuja</option>
                    <option value="Port Harcourt Tech Node">Port Harcourt Tech Node</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Curation Date</label>
                    <input 
                      type="date" 
                      value={selectedDate} 
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700 text-center"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Hour Node</label>
                    <input 
                      type="time" 
                      value={selectedTime} 
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700 text-center"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full bg-teal-800 hover:bg-teal-900 text-white font-mono text-[9px] font-black tracking-widest uppercase py-3.5 rounded-xl shadow-lg transition-colors cursor-pointer text-center"
                  >
                    Confirm VIP Reservation
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Interactive Modal: Order Tracker popup */}
      <AnimatePresence>
        {showOrderTracker && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOrderTracker(false)}
              className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-zinc-200/60 shadow-2xl p-6 md:p-8 max-w-md w-full relative z-10"
            >
              <button 
                onClick={() => setShowOrderTracker(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2.5 mb-5">
                <ShoppingBag className="h-5 w-5 text-teal-800" />
                <h3 className="font-display font-black text-sm text-teal-950 uppercase tracking-wider">Live Escrow Curation Status</h3>
              </div>

              <div className="space-y-5 text-xs">
                <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200/40 flex justify-between items-center">
                  <div>
                    <span className="font-mono text-[8px] font-bold text-zinc-400 block uppercase">Order Reference</span>
                    <span className="font-mono font-black text-teal-950 text-xs tracking-wider block mt-0.5">{trackingNumber}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-[8px] font-mono font-bold text-teal-800 uppercase">
                    <Clock className="w-2.5 h-2.5 animate-pulse text-teal-600" />
                    Pending Clearing
                  </span>
                </div>

                {/* Steps */}
                <div className="relative pl-6 space-y-6">
                  {/* Vertical Line */}
                  <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-zinc-200" />

                  <div className="relative">
                    <div className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-teal-700 ring-4 ring-teal-700/15" />
                    <div>
                      <h4 className="font-bold text-teal-950">Apapa Port Arrival & Escrow Lodging</h4>
                      <p className="text-[10px] text-zinc-400 font-semibold mt-0.5">COMPLETED • FUNDS SECURED IN ESCROW</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-teal-700 ring-4 ring-teal-700/15 animate-pulse" />
                    <div>
                      <h4 className="font-bold text-teal-950">Customs Duty Documentation</h4>
                      <p className="text-[10px] text-zinc-400 font-semibold mt-0.5">IN PROGRESS • AUDITING SOVEREIGN REDUCTION</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-zinc-200" />
                    <div>
                      <h4 className="font-bold text-zinc-400">Flatbed Dispatch departing Lagos</h4>
                      <p className="text-[10px] text-zinc-400 font-semibold mt-0.5">UPCOMING • ASSIGNED TRANSIT INSPECTOR</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <button 
                    onClick={() => {
                      AutoNovaAudio.playClick();
                      showNotification("Syncing with Apapa port satellite locator.", "info");
                    }}
                    className="w-full py-3 bg-teal-850 hover:bg-teal-900 text-white font-mono text-[8px] font-black tracking-widest uppercase rounded-xl transition-colors cursor-pointer text-center"
                  >
                    Sync Satellite Location
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
