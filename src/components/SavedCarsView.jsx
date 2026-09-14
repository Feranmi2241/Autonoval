import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { AutoNovaAudio } from './AudioEngine';
import { 
  Heart, Bell, BellOff, ArrowRight, Trash2, ShieldAlert, Sparkles, 
  Car, Eye, ArrowLeftRight, Compass, HelpCircle, CheckCircle2 
} from 'lucide-react';

export const SavedCarsView = ({ 
  allRecommendations, 
  onSelectCar, 
  onBrowse,
  showNotification,
  favoritedCars,
  handleFavoriteToggle,
  onCompareToggle,
  comparedCars
}) => {
  const navigate = useNavigate();
  // Local state to track which car IDs have price notification alerts enabled
  const [notifiedCarIds, setNotifiedCarIds] = useState([
    'lucid-air-sapphire', 
    'model-x-s'
  ]);

  // Tab filter: 'all' | 'drops'
  const [activeTab, setActiveTab] = useState('all');

  const handleNotificationToggle = (carId, carName) => {
    AutoNovaAudio.playClick();
    if (notifiedCarIds.includes(carId)) {
      setNotifiedCarIds(prev => prev.filter(id => id !== carId));
      showNotification(`Price drop notifications deactivated for ${carName}.`, "info");
    } else {
      setNotifiedCarIds(prev => [...prev, carId]);
      showNotification(`Price drop notifications active for ${carName}. We will email you instantly.`, "success");
    }
  };

  // Mock price fluctuations to display beautifully as shown in the Saved Cars mockup
  const getMockPriceChange = (carId) => {
    switch (carId) {
      case 'lucid-air-sapphire':
        return { value: -5000, label: '-$5,000', direction: 'down' };
      case 'porsche-taycan-turbo-s':
        return { value: 1200, label: '+$1,200', direction: 'up' };
      case 'lotus-emeya':
        return { value: -3400, label: '-$3,400', direction: 'down' };
      case 'tesla-model-s-plaid':
        return { value: -1500, label: '-$1,500', direction: 'down' };
      case 'model-x-s':
        return { value: -2500, label: '-$2,500', direction: 'down' };
      case 'kinetic-sport':
        return { value: -800, label: '-$800', direction: 'down' };
      default:
        return null;
    }
  };

  // Filter cars based on favorites
  const savedCars = allRecommendations.filter(car => favoritedCars.includes(car.id));

  // Further filter based on active tab
  const displayedCars = savedCars.filter(car => {
    if (activeTab === 'drops') {
      const change = getMockPriceChange(car.id);
      return change && change.direction === 'down';
    }
    return true;
  });

  return (
    <div className="flex-grow bg-white min-h-[calc(100vh-80px)] overflow-y-auto pb-24">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Page Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-zinc-100 pb-8">
          <div>
            <div className="flex items-center gap-2 text-teal-700 font-mono text-[10px] font-bold uppercase tracking-widest mb-1.5">
              <Sparkles className="h-4 w-4 text-teal-700 animate-pulse" />
              <span>Your Personal Curation Garage</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-black text-teal-950 tracking-tight flex items-baseline gap-3">
              Saved Cars
              <span className="text-sm font-mono font-extrabold text-zinc-400 uppercase">
                ({savedCars.length} {savedCars.length === 1 ? 'Vehicle' : 'Vehicles'})
              </span>
            </h1>
            <p className="text-xs text-zinc-500 font-medium mt-1">
              Track custom price notifications, lock-in Escrow options, and compare performance configs.
            </p>
          </div>

          {savedCars.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  AutoNovaAudio.playClick();
                  savedCars.forEach(car => handleFavoriteToggle(car.id, car.name, { stopPropagation: () => {} }));
                  showNotification("All saved cars removed.", "info");
                }}
                className="font-mono text-[9px] font-bold text-zinc-400 hover:text-red-600 uppercase tracking-widest cursor-pointer whitespace-nowrap"
              >
                Remove All
              </button>
              <div className="flex bg-zinc-100/80 p-1 rounded-xl border border-zinc-200/40">
              <button
                onClick={() => { AutoNovaAudio.playClick(); setActiveTab('all'); }}
                className={`px-4 py-2 font-mono text-[9px] font-black tracking-widest uppercase rounded-lg transition-all cursor-pointer ${
                  activeTab === 'all' 
                    ? 'bg-teal-700 text-white shadow-sm' 
                    : 'text-zinc-500 hover:text-zinc-950'
                }`}
              >
                All Saved
              </button>
              <button
                onClick={() => { AutoNovaAudio.playClick(); setActiveTab('drops'); }}
                className={`px-4 py-2 font-mono text-[9px] font-black tracking-widest uppercase rounded-lg transition-all cursor-pointer ${
                  activeTab === 'drops' 
                    ? 'bg-teal-700 text-white shadow-sm' 
                    : 'text-zinc-500 hover:text-zinc-950'
                }`}
              >
                Price Drops
              </button>
              </div>
            </div>
          )}
        </header>

        {/* Saved Cars Grid */}
        <AnimatePresence mode="popLayout">
          {displayedCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedCars.map((car, index) => {
                const priceChange = getMockPriceChange(car.id);
                const isNotified = notifiedCarIds.includes(car.id);
                const isCompared = comparedCars.includes(car.id);

                return (
                  <motion.div
                    key={car.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="group bg-zinc-50 border border-zinc-200/60 rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300"
                  >
                    {/* Upper Image container */}
                    <div className="relative h-48 bg-zinc-100 overflow-hidden">
                      <img 
                        src={car.image} 
                        alt={car.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                      />

                      {/* Remove Favorite icon */}
                      <button 
                        onClick={(e) => handleFavoriteToggle(car.id, car.name, e)}
                        className="absolute top-3.5 right-3.5 p-2 bg-white/95 backdrop-blur-md rounded-full shadow-sm hover:bg-red-50 text-red-500 transition-colors cursor-pointer"
                        title="Remove Bookmark"
                      >
                        <Heart className="h-4.5 w-4.5 fill-current text-red-500" />
                      </button>

                      {/* Dynamic Mock Price Fluctuations overlay */}
                      {priceChange && (
                        <div className="absolute bottom-3 left-3">
                          <span className={`px-2.5 py-1 text-[9px] font-mono font-black uppercase rounded-full flex items-center gap-1 shadow-sm ${
                            priceChange.direction === 'down' 
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200/50' 
                              : 'bg-red-100 text-red-800 border border-red-200/50'
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {priceChange.direction === 'down' ? 'Drop ' : 'Rise '} 
                            {priceChange.label}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Middle Card Details */}
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2.5 gap-2">
                          <div>
                            <h3 className="font-display font-extrabold text-teal-950 text-sm truncate leading-tight">{car.name}</h3>
                            <p className="font-mono text-[8px] font-black text-zinc-400 uppercase tracking-widest mt-0.5">{car.bodyType} • {car.type}</p>
                          </div>
                          <p className="font-display font-black text-sm text-teal-700 shrink-0">${car.price.toLocaleString()}</p>
                        </div>

                        {/* Price drop alert switch */}
                        <div className="flex items-center justify-between py-3 border-t border-b border-zinc-100 mb-5">
                          <span className="text-[10px] font-bold text-zinc-500">Notify price drop</span>
                          <button
                            onClick={() => handleNotificationToggle(car.id, car.name)}
                            className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out cursor-pointer flex items-center ${
                              isNotified ? 'bg-teal-700 justify-end' : 'bg-zinc-200 justify-start'
                            }`}
                          >
                            <motion.span 
                              layout 
                              className="w-4 h-4 rounded-full bg-white shadow-sm" 
                            />
                          </button>
                        </div>
                      </div>

                      {/* Lower Actions */}
                      <div className="space-y-2">
                        <button 
                          onClick={() => { AutoNovaAudio.playSuccess(); onSelectCar(car); }}
                          className="w-full py-2.5 bg-white hover:bg-zinc-100 text-zinc-700 font-mono text-[9px] tracking-widest font-extrabold uppercase rounded-lg border border-zinc-200 transition-all cursor-pointer text-center"
                        >
                          View Detailed Analysis
                        </button>
                        
                        {/* Compare checkbox styled inside card */}
                        <label className="flex items-center justify-center gap-2 py-1.5 cursor-pointer hover:bg-zinc-100/50 rounded-lg transition-colors">
                          <input 
                            type="checkbox" 
                            checked={isCompared}
                            onChange={(e) => onCompareToggle(car.id, car.name, e)}
                            className="rounded border-zinc-300 text-teal-700 focus:ring-teal-700/20 h-3.5 w-3.5 cursor-pointer"
                          />
                          <span className="font-mono text-[8px] text-zinc-400 hover:text-zinc-600 font-extrabold uppercase tracking-widest">
                            Add to comparison
                          </span>
                        </label>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* Beautiful empty state placeholder when no cars are saved */
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto text-center py-20 flex flex-col items-center space-y-6"
            >
              <div className="w-24 h-24 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 relative">
                <div className="absolute -inset-4 bg-teal-500/5 blur-xl rounded-full" />
                <Car className="h-10 w-10 text-teal-700 relative" />
              </div>

              <div className="space-y-2">
                <h2 className="font-display text-2xl font-black text-teal-950 tracking-tight">Your Saved Garage is empty</h2>
                <p className="text-xs text-zinc-500 max-w-md mx-auto leading-relaxed font-medium">
                  {activeTab === 'drops' 
                    ? "None of your current bookmarked vehicles have active price-fluctuation discounts mapped. Toggle tabs to see all saved vehicles."
                    : "Save your favorite vehicles while browsing the showroom to monitor automatic price-drop alerts, perform parallel comparisons, and coordinate export logistics."
                  }
                </p>
              </div>

              <button 
                onClick={() => { AutoNovaAudio.playClick(); onBrowse(); }}
                className="px-6 py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-mono text-[10px] font-black tracking-widest uppercase rounded-xl transition-all shadow-sm hover:scale-[1.01]"
              >
                Browse showroom cars
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Sticky bulk-action bar — appears once 2+ cars are checked for comparison */}
      <AnimatePresence>
        {comparedCars && comparedCars.length >= 2 && (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white border border-zinc-200 shadow-xl rounded-2xl px-5 py-3 flex items-center gap-4"
          >
            <span className="text-xs font-bold text-teal-950">{comparedCars.length} selected</span>
            <button
              onClick={() => { AutoNovaAudio.playSuccess(); navigate(`/compare?ids=${comparedCars.join(',')}`); }}
              className="px-4 py-2 bg-teal-950 hover:bg-teal-900 text-white font-mono text-[9px] font-extrabold uppercase tracking-widest rounded-xl cursor-pointer transition-all"
            >
              Compare Selected
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
