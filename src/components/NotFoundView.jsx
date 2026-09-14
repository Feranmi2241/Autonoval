import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Search, Home, Compass, Key, HelpCircle, ArrowRight, AlertOctagon,
  Sparkles, ShieldCheck, CornerDownLeft, Star, Car
} from 'lucide-react';
import { AutoNovaAudio } from './AudioEngine';

export const NotFoundView = ({ userName, role, onNavigateToView, showNotification }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      AutoNovaAudio.playError();
      showNotification("Please enter a valid search term.", "error");
      return;
    }
    
    AutoNovaAudio.playSuccess();
    navigate(`/browse?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleLinkClick = (view, message) => {
    AutoNovaAudio.playClick();
    showNotification(message || `Routing to ${view} module...`, "info");
    onNavigateToView(view);
  };

  // Popular routes/suggestions
  const popularVehicles = [
    { name: "Nova RS Electra", power: "EV / 850 HP", path: "search" },
    { name: "Centurion Kinetic V8", power: "Hybrid / 1100 HP", path: "search" },
    { name: "Specter Aero Coupe", power: "Hydrogen / 620 HP", path: "search" }
  ];

  return (
    <div className="w-full bg-[#fdf8f8] min-h-[85vh] py-12 px-6 flex items-center justify-center font-sans text-zinc-900 overflow-hidden relative">
      {/* Immersive backdrop blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-teal-300/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-purple-300/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-2xl w-full text-center space-y-8 relative z-10">
        
        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/40 text-amber-900 font-mono text-[8px] font-black tracking-widest uppercase"
        >
          <AlertOctagon className="h-3 w-3 text-amber-600 animate-pulse" />
          <span>ROUTING EXCEPTION // CODE 404</span>
        </motion.div>

        {/* Hero Illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative group max-w-md mx-auto"
        >
          {/* Neon Cyan Accent Backdrop Blur Glow */}
          <div className="absolute -inset-4 bg-teal-300/10 blur-3xl rounded-full opacity-50 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none" />
          
          <img 
            className="relative mx-auto w-full max-w-sm object-contain drop-shadow-2xl transform transition-transform duration-700 hover:scale-[1.02]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4bj0XDriQjm5a4ewCzLEcT1OYvfdJz5N9Bmv4F0aYEDbNBAA5nKQx5iTvEPSopUY-AJIJiJ2KjSmcdco6MDdHales5fbFREU-G4SVIfRt62ylKYc2XStvuc5_uqbC_U4w4u7KdZqxkXy1YeqgELlxsNIUun4J_eJpT7cUe7tM7JpK0ttHBloDPpXMAwUDdsR1tEMOrS2cyoAL_HruimBnwfZf1FwBgCcfvNZ96q6l6S4etVQXd1mI-fgh9Moz5vbzJzKrhAc2XhZU"
            alt="AutoNova Detour Route 404"
          />
        </motion.div>

        {/* Messaging Container */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="space-y-3"
        >
          <h1 className="font-display text-2xl md:text-4xl font-extrabold text-teal-950 tracking-tight leading-tight">
            Looks like this road doesn't exist.
          </h1>
          <p className="text-xs md:text-sm text-zinc-500 max-w-md mx-auto font-medium leading-relaxed">
            The page you're looking for has taken a detour. Let's get you back on track in the AutoNova system.
          </p>
        </motion.div>

        {/* Interactive Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-md mx-auto w-full"
        >
          <form 
            onSubmit={handleSearchSubmit}
            className={`flex items-center bg-white border rounded-2xl p-1.5 shadow-md transition-all duration-300 ${
              isFocused ? 'ring-2 ring-teal-700/25 border-teal-700 scale-[1.01]' : 'border-zinc-200'
            }`}
          >
            <span className="text-teal-700 pl-3">
              <Search className="h-4 w-4" />
            </span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => { setIsFocused(true); AutoNovaAudio.playHover(); }}
              onBlur={() => setIsFocused(false)}
              placeholder="Search AutoNova models, features, specs..."
              className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-xs px-3 py-2.5 placeholder-zinc-400 font-semibold"
            />
            <button 
              type="submit"
              className="bg-teal-950 hover:bg-teal-900 text-white px-5 py-2 rounded-xl text-[10px] font-mono tracking-widest uppercase font-bold transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>
        </motion.div>

        {/* Primary Action Button Row */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <button 
            onClick={() => handleLinkClick('dashboard', "Handshaking with primary AutoNova neural network...")}
            className="group flex items-center gap-2 px-6 py-3.5 bg-teal-950 hover:bg-teal-900 text-white rounded-xl text-[10px] font-mono tracking-widest uppercase font-extrabold transition-all duration-300 shadow-sm cursor-pointer"
          >
            <Home className="h-4 w-4" />
            <span>Back to Home</span>
          </button>
          
          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-xs font-bold text-zinc-500">
            <button 
              onClick={() => handleLinkClick('search', "Opening comprehensive vehicle showroom index...")}
              className="hover:text-teal-700 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Compass className="h-3.5 w-3.5" />
              <span>Browse Cars</span>
            </button>
            <span className="hidden sm:inline text-zinc-300">•</span>
            <button 
              onClick={() => handleLinkClick('create-listing', "Establishing connection to seller creation pod...")}
              className="hover:text-teal-700 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Key className="h-3.5 w-3.5" />
              <span>Sell Your Car</span>
            </button>
            <span className="hidden sm:inline text-zinc-300">•</span>
            <button 
              onClick={() => handleLinkClick('help', "Opening digital compliance and help center ledger...")}
              className="hover:text-teal-700 transition-colors cursor-pointer flex items-center gap-1"
            >
              <HelpCircle className="h-3.5 w-3.5" />
              <span>Help Center</span>
            </button>
          </div>
        </motion.div>

        {/* Recommended paths */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="pt-6 border-t border-zinc-200/50 max-w-md mx-auto space-y-3"
        >
          <p className="text-[10px] font-mono tracking-wider font-bold text-zinc-400 uppercase">
            Suggested Operational Roads
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {popularVehicles.map((car, idx) => (
              <button
                key={idx}
                onClick={() => handleLinkClick(car.path, `Routing to specified target: ${car.name}`)}
                className="p-3 bg-white border border-zinc-200/40 rounded-xl hover:border-teal-700/50 hover:bg-teal-50/25 transition-all text-left space-y-1 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <Car className="h-3.5 w-3.5 text-teal-700" />
                  <ArrowRight className="h-3 w-3 text-zinc-400 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h4 className="text-[11px] font-black text-teal-950 truncate">{car.name}</h4>
                <p className="font-mono text-[8px] text-zinc-400 font-bold">{car.power}</p>
              </button>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};
