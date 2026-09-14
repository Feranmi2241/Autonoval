import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { AutoNovaAudio } from './AudioEngine';
import { 
  User, Bookmark, ShoppingBag, Calendar, MessageSquare, Bell, Settings, 
  Search, Plus, Trash2, Edit2, CheckCircle2, ChevronDown, Sparkles, 
  Car, Eye, HelpCircle, RefreshCw, Sliders, Globe, Filter, X
} from 'lucide-react';

export const SavedSearchesView = ({
  userName = "Alexander Sterling",
  role = "Client",
  onNavigateToView,
  onBackToGate,
  showNotification
}) => {
  const navigate = useNavigate();
  // Initial saved searches
  const [searches, setSearches] = useState([
    {
      id: 'search-1',
      title: 'Family Luxury SUV',
      bodyType: 'SUV',
      priceRange: '$80k-$120k',
      location: 'San Francisco',
      type: 'Electric',
      frequency: 'Daily',
      newCount: 12,
      updatedAt: '2 hours ago'
    },
    {
      id: 'search-2',
      title: 'Classic Roadster Project',
      bodyType: 'Convertible',
      priceRange: 'Under $50k',
      location: 'Anywhere',
      type: 'Manual/Vintage',
      frequency: 'Weekly',
      newCount: 0,
      updatedAt: '3 days ago'
    }
  ]);

  // Insights State
  const [insightText, setInsightText] = useState('Our Kinetic engine is tracking 2,400+ luxury listings matching your "Family SUV" search.');
  const [loadingInsight, setLoadingInsight] = useState(false);

  // Form State for creating/editing alert
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSearch, setEditingSearch] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formBodyType, setFormBodyType] = useState('SUV');
  const [formPriceRange, setFormPriceRange] = useState('$80k-$120k');
  const [formLocation, setFormLocation] = useState('San Francisco');
  const [formType, setFormType] = useState('Electric');
  const [formFrequency, setFormFrequency] = useState('Daily');

  // Triggering fresh AI Insight report
  const handleGenerateInsight = () => {
    AutoNovaAudio.playClick();
    setLoadingInsight(true);
    showNotification("Contacting neural grid for updated matchmaking index...", "info");
    
    setTimeout(() => {
      const insights = [
        "Kinetic Engine Warning: Audi e-tron GT price drop imminent in the San Francisco region.",
        "Hypercar matching index up by 4.2% today. Manual gear classic models seeing increased premium bids.",
        "AutoNova AI prediction: Luxury SUV demand is projected to spike by 15% next week due to high seasonal demand.",
        "Matchmaker suggestion: Based on your 'Classic Roadster' search, view the Lotus Emeya spec-config in Midnight Slate."
      ];
      const randomInsight = insights[Math.floor(Math.random() * insights.length)];
      setInsightText(randomInsight);
      setLoadingInsight(false);
      showNotification("Neural matching report regenerated successfully.", "success");
    }, 1200);
  };

  // Open modal for new alert
  const handleOpenNewModal = () => {
    AutoNovaAudio.playClick();
    setEditingSearch(null);
    setFormTitle('');
    setFormBodyType('SUV');
    setFormPriceRange('$80k-$120k');
    setFormLocation('San Francisco');
    setFormType('Electric');
    setFormFrequency('Daily');
    setIsModalOpen(true);
  };

  // Open modal for edit
  const handleOpenEditModal = (search) => {
    AutoNovaAudio.playClick();
    setEditingSearch(search);
    setFormTitle(search.title);
    setFormBodyType(search.bodyType);
    setFormPriceRange(search.priceRange);
    setFormLocation(search.location);
    setFormType(search.type);
    setFormFrequency(search.frequency);
    setIsModalOpen(true);
  };

  // Delete search alert
  const handleDeleteSearch = (id, title) => {
    AutoNovaAudio.playClick();
    setSearches(prev => prev.filter(s => s.id !== id));
    showNotification(`Alert search group "${title}" removed from your neural ledger.`, "info");
  };

  // Save Search Alert
  const handleSaveSearch = (e) => {
    e.preventDefault();
    AutoNovaAudio.playClick();

    if (!formTitle.trim()) {
      showNotification("Please specify a descriptive title for this alert.", "error");
      return;
    }

    if (editingSearch) {
      // Update
      setSearches(prev => prev.map(s => s.id === editingSearch.id ? {
        ...s,
        title: formTitle,
        bodyType: formBodyType,
        priceRange: formPriceRange,
        location: formLocation,
        type: formType,
        frequency: formFrequency,
        updatedAt: 'Just now'
      } : s));
      showNotification(`Search alert "${formTitle}" updated.`, "success");
    } else {
      // Create new
      const newSearch = {
        id: `search-${Date.now()}`,
        title: formTitle,
        bodyType: formBodyType,
        priceRange: formPriceRange,
        location: formLocation,
        type: formType,
        frequency: formFrequency,
        newCount: Math.floor(Math.random() * 5),
        updatedAt: 'Just now'
      };
      setSearches(prev => [newSearch, ...prev]);
      showNotification(`Search alert "${formTitle}" added to your portfolio.`, "success");
    }

    setIsModalOpen(false);
  };

  const handleFrequencyChange = (id, newFreq, title) => {
    AutoNovaAudio.playClick();
    setSearches(prev => prev.map(s => s.id === id ? { ...s, frequency: newFreq } : s));
    showNotification(`Alert frequency for "${title}" set to ${newFreq}.`, "success");
  };

  return (
    <div className="flex-grow flex flex-col lg:flex-row relative bg-zinc-50 min-h-[calc(100vh-80px)]">
      
      {/* SIDEBAR */}
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
            onClick={() => { AutoNovaAudio.playClick(); }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-teal-50/80 text-teal-950 border-r-4 border-teal-800 font-bold transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <Search className="h-4 w-4 text-teal-800" />
              <span>Saved Searches</span>
            </div>
            <span className="font-mono text-[9px] bg-teal-800 text-white px-1.5 py-0.5 rounded-md">
              {searches.length}
            </span>
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
          <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
            <h4 className="font-mono text-[8px] font-bold text-teal-900 uppercase tracking-wider mb-1">Black Label Hotline</h4>
            <p className="text-[10px] text-zinc-500 leading-normal font-medium mb-2.5">Instant private concierge routing with dedicated agent.</p>
            <button 
              onClick={() => { AutoNovaAudio.playClick(); showNotification("Routing encrypted connection to concierge...", "info"); }}
              className="w-full py-2 bg-teal-950 text-white font-mono text-[8px] font-black uppercase tracking-widest rounded-lg hover:bg-teal-900 transition-colors cursor-pointer"
            >
              Initialize call
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-grow p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-teal-700 font-mono text-[10px] font-bold uppercase tracking-widest mb-1.5">
              <Sparkles className="h-4 w-4 text-teal-700 animate-pulse" />
              <span>Saved Searches & Alerts</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-black text-teal-950 tracking-tight">
              Curated Feeds
            </h1>
            <p className="text-xs text-zinc-500 font-medium mt-1">
              Manage your saved filter grids and customize instantly notified push signals.
            </p>
          </div>
          
          <button 
            onClick={handleOpenNewModal}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-teal-700 text-white font-mono text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-teal-800 active:scale-98 transition-all cursor-pointer shadow-md shadow-teal-950/10"
          >
            <Plus className="h-4 w-4" />
            Create New Alert
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Saved Searches list */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {searches.length > 0 ? (
                searches.map((search) => (
                  <motion.div
                    key={search.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-2xl p-6 border border-zinc-200/60 shadow-sm hover:shadow-md transition-all group relative border-l-4 border-l-teal-700"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-display font-bold text-teal-950 text-lg">{search.title}</h3>
                          {search.newCount > 0 && (
                            <span className="px-2.5 py-0.5 bg-teal-50 border border-teal-100 text-[8px] font-mono font-bold text-teal-800 uppercase rounded-full flex items-center gap-1">
                              <Sparkles className="h-3 w-3 text-teal-700 animate-pulse" />
                              {search.newCount} New Match{search.newCount > 1 ? 'es' : ''}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-zinc-400 font-mono font-semibold mt-1 flex items-center gap-1">
                          <span>Updated {search.updatedAt}</span>
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleOpenEditModal(search)}
                          className="p-2 rounded-xl text-zinc-400 hover:text-teal-700 hover:bg-zinc-50 transition-colors cursor-pointer"
                          title="Edit search alert parameters"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteSearch(search.id, search.title)}
                          className="p-2 rounded-xl text-zinc-400 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete search alert"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Meta tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-2.5 py-1 bg-zinc-50 hover:bg-zinc-100 rounded-lg font-mono text-[9px] font-bold text-zinc-500 border border-zinc-200/40">{search.bodyType}</span>
                      <span className="px-2.5 py-1 bg-zinc-50 hover:bg-zinc-100 rounded-lg font-mono text-[9px] font-bold text-zinc-500 border border-zinc-200/40">{search.priceRange}</span>
                      <span className="px-2.5 py-1 bg-zinc-50 hover:bg-zinc-100 rounded-lg font-mono text-[9px] font-bold text-zinc-500 border border-zinc-200/40">{search.location}</span>
                      <span className="px-2.5 py-1 bg-zinc-50 hover:bg-zinc-100 rounded-lg font-mono text-[9px] font-bold text-zinc-500 border border-zinc-200/40">{search.type}</span>
                    </div>

                    <div className="flex items-center justify-between pt-5 border-t border-zinc-100">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest">Alerts:</span>
                        <div className="relative">
                          <select 
                            value={search.frequency}
                            onChange={(e) => handleFrequencyChange(search.id, e.target.value, search.title)}
                            className="appearance-none bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-1.5 pr-8 font-mono text-[9.5px] font-black uppercase tracking-wider text-teal-850 focus:ring-2 focus:ring-teal-700/10 focus:border-teal-700 outline-none cursor-pointer"
                          >
                            <option value="Instant">Instant</option>
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                          </select>
                          <ChevronDown className="h-3 w-3 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400" />
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          AutoNovaAudio.playClick();
                          const params = new URLSearchParams();
                          if (search.bodyType) params.set('bodyType', search.bodyType);
                          if (search.type) params.set('type', search.type);
                          if (search.priceRange) params.set('price', search.priceRange);
                          navigate(`/browse?${params.toString()}`);
                          showNotification(`Loading inventory matching "${search.title}".`, "info");
                        }}
                        className="text-teal-700 font-mono text-[9.5px] font-black uppercase tracking-widest hover:text-teal-900 transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        View Matches
                        <Sparkles className="h-3 w-3 text-teal-700 animate-pulse" />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-3xl p-10 border border-dashed border-zinc-200/80 flex flex-col items-center text-center py-16"
                >
                  <div className="w-16 h-16 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6">
                    <Search className="h-6 w-6 text-zinc-300" />
                  </div>
                  <h3 className="font-display font-black text-teal-950 text-lg">No saved searches</h3>
                  <p className="text-zinc-400 text-xs mt-2 max-w-sm leading-relaxed font-medium">
                    You have not configured any search alerts yet. Generate alerts to track live inventories matching custom specifications.
                  </p>
                  <button 
                    onClick={handleOpenNewModal}
                    className="mt-6 px-5 py-3.5 bg-teal-50 text-teal-800 hover:bg-teal-100/80 rounded-xl font-mono text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Setup First Alert
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* AI Insights & Info Column */}
          <div className="space-y-8">
            
            {/* Empty state / Inspiration bento */}
            <div className="bg-zinc-900 text-white rounded-3xl p-8 relative overflow-hidden group border border-zinc-800">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl -mr-10 -mt-10" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -ml-10 -mb-10" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-2 text-teal-400 font-mono text-[9px] font-bold uppercase tracking-widest mb-4">
                    <Sparkles className="h-4 w-4 text-teal-400 animate-spin" />
                    <span>Live Neural Engine</span>
                  </div>
                  <h4 className="font-display font-black text-xl tracking-tight mb-2">AI Matchmaking Match</h4>
                  
                  <div className="min-h-[80px] flex items-center">
                    {loadingInsight ? (
                      <div className="flex items-center gap-3">
                        <RefreshCw className="h-4 w-4 text-teal-400 animate-spin" />
                        <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">Recalculating matching space...</span>
                      </div>
                    ) : (
                      <p className="text-xs text-zinc-300 leading-relaxed font-medium font-mono">
                        {insightText}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-800 mt-6 flex justify-between items-center">
                  <button 
                    onClick={handleGenerateInsight}
                    disabled={loadingInsight}
                    className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-750 text-white font-mono text-[8.5px] font-black uppercase tracking-widest rounded-lg transition-colors cursor-pointer disabled:opacity-40"
                  >
                    Refresh Index
                  </button>
                  <Car className="h-6 w-6 text-zinc-700" />
                </div>
              </div>
            </div>

            {/* General Help & Guidelines */}
            <div className="bg-white rounded-3xl p-6 border border-zinc-200/60 shadow-sm">
              <h4 className="font-display font-bold text-teal-950 text-sm mb-3">Matching Index Guidelines</h4>
              <div className="space-y-4 text-xs text-zinc-500 font-medium leading-relaxed">
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                  <p><strong className="text-zinc-800 font-semibold">Instant alerts</strong> send cellular push signals within 120 seconds of dealership listing clearance.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                  <p><strong className="text-zinc-800 font-semibold">Daily Digests</strong> bundle match changes and are emailed precisely at 08:00 UTC.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                  <p><strong className="text-zinc-800 font-semibold">Curation Grids</strong> can be modified at any time to re-train the AI Assistant's automated suggestions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL DIALOG - CREATE/EDIT ALERT */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-teal-950/40 backdrop-blur-sm"
              />

              {/* Form Window */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden border border-zinc-100 relative z-10"
              >
                <div className="px-6 py-5 bg-zinc-50 border-b border-zinc-200/60 flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-black text-teal-950 text-base">
                      {editingSearch ? 'Modify Alert Parameters' : 'Setup Curated Alert'}
                    </h3>
                    <p className="text-[10px] text-zinc-400 font-medium">AutoNova Neural Grid matchmaking filters</p>
                  </div>
                  <button 
                    onClick={() => { AutoNovaAudio.playClick(); setIsModalOpen(false); }}
                    className="p-1.5 rounded-xl hover:bg-zinc-150 text-zinc-400 transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveSearch} className="p-6 space-y-4">
                  {/* Title field */}
                  <div>
                    <label className="block font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Alert Descriptive Title</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Electric Hypercar Commuter"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-700/10 focus:border-teal-700"
                    />
                  </div>

                  {/* Grid Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Body Type</label>
                      <select 
                        value={formBodyType}
                        onChange={(e) => setFormBodyType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-teal-700/10 focus:border-teal-700"
                      >
                        <option value="SUV">SUV</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Convertible">Convertible</option>
                        <option value="Coupe">Coupe</option>
                        <option value="Truck">Truck</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Price Range</label>
                      <select 
                        value={formPriceRange}
                        onChange={(e) => setFormPriceRange(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-teal-700/10 focus:border-teal-700"
                      >
                        <option value="Under $50k">Under $50k</option>
                        <option value="$50k-$80k">$50k - $80k</option>
                        <option value="$80k-$120k">$80k - $120k</option>
                        <option value="$120k-$200k">$120k - $200k</option>
                        <option value="$200k+">$200k+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Location</label>
                      <input 
                        type="text"
                        placeholder="e.g. San Francisco or Anywhere"
                        value={formLocation}
                        onChange={(e) => setFormLocation(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-700/10 focus:border-teal-700"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Fuel Type / Engine</label>
                      <input 
                        type="text"
                        placeholder="e.g. Electric or Vintage"
                        value={formType}
                        onChange={(e) => setFormType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-700/10 focus:border-teal-700"
                      />
                    </div>
                  </div>

                  {/* Alert Frequency */}
                  <div>
                    <label className="block font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Alert Frequency</label>
                    <div className="flex gap-3">
                      {['Instant', 'Daily', 'Weekly'].map((freq) => (
                        <button
                          key={freq}
                          type="button"
                          onClick={() => { AutoNovaAudio.playClick(); setFormFrequency(freq); }}
                          className={`flex-1 py-2.5 rounded-xl font-mono text-[9px] font-black uppercase tracking-widest border transition-all cursor-pointer ${
                            formFrequency === freq 
                              ? 'bg-teal-950 border-teal-950 text-white shadow-sm' 
                              : 'bg-zinc-50 border-zinc-200 text-zinc-500 hover:text-zinc-800'
                          }`}
                        >
                          {freq}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => { AutoNovaAudio.playClick(); setIsModalOpen(false); }}
                      className="flex-1 py-3.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-xl font-mono text-[9px] font-black uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-mono text-[9px] font-black uppercase tracking-widest transition-colors cursor-pointer shadow-md shadow-teal-950/10"
                    >
                      {editingSearch ? 'Save Changes' : 'Confirm Alert'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
