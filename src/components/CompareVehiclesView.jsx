import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AutoNovaAudio } from './AudioEngine';
import { 
  X, Check, Sparkles, AlertCircle, ShoppingCart, HelpCircle, 
  ChevronDown, RefreshCw, Zap, Gauge, Flame, Navigation 
} from 'lucide-react';

export const CompareVehiclesView = ({ 
  allRecommendations, 
  onSelectCar, 
  showNotification,
  favoritedCars,
  handleFavoriteToggle
}) => {
  // Start with the user's requested 3 cars as defaults
  const [selectedCarIds, setSelectedCarIds] = useState([
    'lucid-air-sapphire',
    'tesla-model-s-plaid',
    'porsche-taycan-turbo-s'
  ]);

  const [activeSelectorIndex, setActiveSelectorIndex] = useState(null);

  // Helper to get active car objects
  const selectedCars = selectedCarIds.map(id => 
    allRecommendations.find(car => car.id === id)
  ).filter(Boolean);

  const handleRemoveCar = (indexToRemove) => {
    AutoNovaAudio.playClick();
    setSelectedCarIds(prev => prev.filter((_, idx) => idx !== indexToRemove));
    showNotification("Removed vehicle from comparison.", "info");
  };

  const handleSelectCar = (index, newCarId) => {
    AutoNovaAudio.playClick();
    setSelectedCarIds(prev => {
      const updated = [...prev];
      updated[index] = newCarId;
      return updated;
    });
    setActiveSelectorIndex(null);
    showNotification(`Added ${allRecommendations.find(c => c.id === newCarId)?.name} to comparison matrix.`, "success");
  };

  const handleAddSlot = () => {
    AutoNovaAudio.playClick();
    if (selectedCarIds.length >= 3) {
      showNotification("Maximum comparison slots reached. Remove a vehicle first.", "info");
      return;
    }
    // Find a car that is not currently selected
    const availableCar = allRecommendations.find(car => !selectedCarIds.includes(car.id));
    if (availableCar) {
      setSelectedCarIds(prev => [...prev, availableCar.id]);
      showNotification("Added empty slot. Choose a vehicle to compare.", "info");
    } else {
      showNotification("No more unique vehicles available to add.", "info");
    }
  };

  // Dynamic Verdict Engine to produce tailored executive analysis depending on choices
  const getDynamicVerdict = () => {
    if (selectedCars.length === 0) {
      return "Please select at least one vehicle to generate Nova's digital analysis report.";
    }

    const hasLucid = selectedCars.some(c => c.id === 'lucid-air-sapphire');
    const hasTesla = selectedCars.some(c => c.id === 'tesla-model-s-plaid');
    const hasPorsche = selectedCars.some(c => c.id === 'porsche-taycan-turbo-s');
    const hasRivian = selectedCars.some(c => c.id === 'rivian-r1s-dual' || c.id === 'rivian-r1s');
    const hasLotus = selectedCars.some(c => c.id === 'lotus-emeya');

    let analysis = "Nova's Intelligent Assessment: ";

    if (hasLucid && hasTesla && hasPorsche) {
      return "Nova's Verdict: The Lucid Air Sapphire is the ultimate choice for uncompromising high-voltage power and space-age luxury, whereas the Tesla Model S Plaid offers the most efficient value-to-performance ratio in the triple-motor category. For elite cornering dynamics and traditional German track feel, the Taycan Turbo S remains unmatched.";
    }

    if (hasLucid && hasPorsche) {
      analysis += "Comparing the Lucid and Porsche reveals a clash of philosophies: Lucid focuses on ultimate modern straight-line dominance (1,234 HP) and extreme cabin space, while Porsche's Taycan uses a 2-speed transmission and Active Ride suspension to maximize track carving precision.";
    } else if (hasLucid && hasTesla) {
      analysis += "The Lucid Air Sapphire and Tesla Plaid represent the absolute pinnacle of American triple-motor hyper-engineering. Lucid delivers luxurious material depth and extra range, while Tesla excels in software integration and pricing ergonomics.";
    } else if (hasPorsche && hasLotus) {
      analysis += "A thrilling European GT matchup! The Porsche Taycan emphasizes raw track dynamics and classic race-proven chassis tuning, while the Lotus Emeya showcases next-generation active aerodynamics and spectacular bespoke carbon design cues.";
    } else if (hasRivian) {
      analysis += "The Rivian R1S stands out as a highly versatile multi-passenger adventure utility platform, bringing remarkable overland capability and triple-zone cooling that contrasts beautifully with low-slung performance sedans.";
    } else {
      const bestMatch = [...selectedCars].sort((a,b) => b.match - a.match)[0];
      analysis += `Our algorithm recommends the ${bestMatch.name} with an AI Match Index of ${bestMatch.match}% as the most harmonious configuration for your prestige portfolio, combining outstanding dynamic ranges and elite custom cabins.`;
    }

    return analysis;
  };

  return (
    <div className="flex-grow bg-white min-h-[calc(100vh-80px)] overflow-y-auto pb-20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-100 pb-8">
          <div>
            <div className="flex items-center gap-2 text-teal-700 font-mono text-[10px] font-bold uppercase tracking-widest mb-1.5">
              <Sparkles className="h-4 w-4 text-teal-700 animate-pulse" />
              <span>Hyper-Comparison Matrix</span>
            </div>
            <h1 className="font-display text-3xl font-black text-teal-950 tracking-tight">
              Compare Premium Vehicles
            </h1>
            <p className="text-xs text-zinc-500 font-medium mt-1">
              Analyze mechanical precision and bespoke trim options side-by-side.
            </p>
          </div>

          {selectedCarIds.length < 3 && (
            <button
              onClick={handleAddSlot}
              className="px-5 py-3 border border-dashed border-teal-600/40 hover:border-teal-700 text-teal-700 hover:bg-teal-50/50 rounded-xl font-mono text-[10px] font-extrabold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2"
            >
              <span>+ Add Vehicle to Compare</span>
            </button>
          )}
        </header>

        {/* Comparison Columns Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-${Math.max(selectedCars.length, 1)} gap-6 mb-16`}>
          {selectedCars.map((car, index) => {
            const isFav = favoritedCars.includes(car.id);
            const circumference = 2 * Math.PI * 32;
            const strokeOffset = circumference - (car.match / 100 * circumference);

            return (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white border border-zinc-200/80 rounded-2xl p-6 flex flex-col relative group hover:shadow-md transition-all duration-300"
              >
                {/* Remove slot button */}
                <button 
                  onClick={() => handleRemoveCar(index)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg bg-zinc-50 hover:bg-red-50 text-zinc-400 hover:text-red-600 border border-zinc-100 hover:border-red-100 transition-colors cursor-pointer"
                  title="Remove from comparison"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Change Car Selector Dropdown */}
                <div className="relative mb-5 w-fit">
                  <button
                    onClick={() => {
                      AutoNovaAudio.playClick();
                      setActiveSelectorIndex(activeSelectorIndex === index ? null : index);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50/50 hover:bg-teal-50 border border-teal-200/50 rounded-lg text-[9px] font-mono font-black text-teal-800 uppercase tracking-widest cursor-pointer transition-all"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>Swap Model</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>

                  <AnimatePresence>
                    {activeSelectorIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute left-0 mt-2 w-64 bg-white border border-zinc-200 rounded-xl shadow-lg z-50 py-1.5 max-h-60 overflow-y-auto"
                      >
                        {allRecommendations
                          .filter(c => !selectedCarIds.includes(c.id) || c.id === car.id)
                          .map(availCar => (
                            <button
                              key={availCar.id}
                              onClick={() => handleSelectCar(index, availCar.id)}
                              className={`w-full text-left px-4 py-2.5 hover:bg-teal-50 text-xs font-bold font-mono uppercase flex items-center justify-between cursor-pointer ${
                                availCar.id === car.id ? 'text-teal-700 bg-teal-50/30' : 'text-zinc-600'
                              }`}
                            >
                              <span>{availCar.name}</span>
                              <span className="text-[10px] text-teal-600">${availCar.price.toLocaleString()}</span>
                            </button>
                          ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Vehicle Image Canvas */}
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 relative mb-6">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                </div>

                {/* General Info */}
                <div className="text-center mb-6">
                  <h3 className="font-display font-extrabold text-teal-950 text-lg mb-1">{car.name}</h3>
                  <p className="font-display font-black text-2xl text-teal-700">${car.price.toLocaleString()}</p>
                </div>

                {/* Radial AI Match Progress Ring */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-20 h-20">
                    <svg className="w-20 h-20">
                      <circle 
                        className="text-zinc-100 stroke-current" 
                        cx="40" 
                        cy="40" 
                        fill="transparent" 
                        r="32" 
                        strokeWidth="5"
                      />
                      <motion.circle 
                        className="text-teal-700 stroke-current" 
                        cx="40" 
                        cy="40" 
                        fill="transparent" 
                        r="32" 
                        strokeLinecap="round" 
                        strokeWidth="5"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: strokeOffset }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center font-display font-black text-base text-teal-950">
                      {car.match}%
                    </span>
                  </div>
                  <span className="font-mono text-[8px] font-black text-zinc-400 mt-2 uppercase tracking-widest">Nova AI Match score</span>
                </div>

                {/* Quick actions inside the comparison card */}
                <div className="w-full space-y-2 mt-auto">
                  <button 
                    onClick={() => { AutoNovaAudio.playSuccess(); onSelectCar(car); }}
                    className="w-full py-3 bg-zinc-50 hover:bg-teal-700 text-zinc-600 hover:text-white border border-zinc-200/80 hover:border-teal-800 font-mono text-[9px] tracking-widest font-extrabold uppercase rounded-xl transition-all cursor-pointer text-center"
                  >
                    View Detailed Analysis
                  </button>
                  <button 
                    onClick={() => { AutoNovaAudio.playSuccess(); showNotification(`Secured placeholder booking for ${car.name}. Our escrows team will contact you.`, "success"); }}
                    className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-mono text-[9px] tracking-widest font-extrabold uppercase rounded-xl transition-all cursor-pointer text-center shadow-sm"
                  >
                    Reserve Unit
                  </button>
                </div>

              </motion.div>
            );
          })}

          {selectedCarIds.length === 0 && (
            <div className="col-span-full border border-dashed border-zinc-200 rounded-2xl py-16 text-center space-y-4">
              <AlertCircle className="h-10 w-10 text-zinc-300 mx-auto" />
              <p className="text-zinc-500 font-medium text-xs">No vehicles currently selected in compare view.</p>
              <button 
                onClick={handleAddSlot}
                className="px-4 py-2 bg-teal-700 text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-lg cursor-pointer"
              >
                Add default models
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Comparison Matrix Table */}
        {selectedCars.length > 0 && (
          <div className="border border-zinc-200/80 rounded-2xl overflow-hidden shadow-sm bg-white mb-16">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-zinc-100 bg-zinc-50/50">
                    <th className="py-5 px-6 text-left font-mono text-[9px] font-black text-zinc-400 uppercase tracking-widest w-1/4">Feature Specification</th>
                    {selectedCars.map(car => (
                      <th key={car.id} className="py-5 px-4 text-center font-display font-black text-xs text-teal-950 w-1/4">
                        {car.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-xs font-semibold">
                  {/* Performance Specs */}
                  <tr className="hover:bg-zinc-50/30 transition-colors">
                    <td className="py-4.5 px-6 font-bold text-teal-950">Year Model</td>
                    {selectedCars.map(car => (
                      <td key={car.id} className="py-4.5 px-4 text-center text-zinc-600 font-mono font-bold">{car.year}</td>
                    ))}
                  </tr>

                  <tr className="hover:bg-zinc-50/30 transition-colors">
                    <td className="py-4.5 px-6 font-bold text-teal-950">Odometer / Mileage</td>
                    {selectedCars.map(car => (
                      <td key={car.id} className="py-4.5 px-4 text-center text-zinc-600 font-mono font-bold">{car.mileage}</td>
                    ))}
                  </tr>

                  <tr className="hover:bg-zinc-50/30 transition-colors">
                    <td className="py-4.5 px-6 font-bold text-teal-950">Powertrain</td>
                    {selectedCars.map(car => (
                      <td key={car.id} className="py-4.5 px-4 text-center text-zinc-600">
                        <span className="inline-flex items-center gap-1 bg-zinc-100 px-2.5 py-1 rounded text-[10px] font-mono font-bold text-zinc-500 uppercase">
                          <Zap className="h-3 w-3 text-teal-600" />
                          {car.type}
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-zinc-50/30 transition-colors">
                    <td className="py-4.5 px-6 font-bold text-teal-950">Total Power Output</td>
                    {selectedCars.map(car => (
                      <td key={car.id} className="py-4.5 px-4 text-center text-zinc-600 font-mono font-bold">{car.specs?.power || 'N/A'}</td>
                    ))}
                  </tr>

                  <tr className="hover:bg-zinc-50/30 transition-colors">
                    <td className="py-4.5 px-6 font-bold text-teal-950">Acceleration (0-60 mph)</td>
                    {selectedCars.map(car => (
                      <td key={car.id} className="py-4.5 px-4 text-center text-zinc-600 font-mono font-bold">{car.specs?.zeroToSixty || 'N/A'}</td>
                    ))}
                  </tr>

                  <tr className="hover:bg-zinc-50/30 transition-colors">
                    <td className="py-4.5 px-6 font-bold text-teal-950">Top Velocity</td>
                    {selectedCars.map(car => (
                      <td key={car.id} className="py-4.5 px-4 text-center text-zinc-600 font-mono font-bold">{car.specs?.topSpeed || 'N/A'}</td>
                    ))}
                  </tr>

                  <tr className="hover:bg-zinc-50/30 transition-colors">
                    <td className="py-4.5 px-6 font-bold text-teal-950">EPA Est. Range</td>
                    {selectedCars.map(car => (
                      <td key={car.id} className="py-4.5 px-4 text-center text-zinc-600 font-mono font-bold">{car.specs?.range || 'N/A'}</td>
                    ))}
                  </tr>

                  {/* Tech feature checks */}
                  <tr className="hover:bg-zinc-50/30 transition-colors">
                    <td className="py-4.5 px-6 font-bold text-teal-950">Carbon Interior Trim</td>
                    {selectedCars.map(car => (
                      <td key={car.id} className="py-4.5 px-4 text-center">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr className="hover:bg-zinc-50/30 transition-colors">
                    <td className="py-4.5 px-6 font-bold text-teal-950">Autonomous Drive Pilot</td>
                    {selectedCars.map(car => {
                      const hasPilot = car.id !== 'porsche-taycan-turbo-s';
                      return (
                        <td key={car.id} className="py-4.5 px-4 text-center">
                          {hasPilot ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                              <Check className="h-3.5 w-3.5" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-50 text-red-600 border border-red-100">
                              <X className="h-3.5 w-3.5" />
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  <tr className="hover:bg-zinc-50/30 transition-colors">
                    <td className="py-4.5 px-6 font-bold text-teal-950">Extreme Track Mode</td>
                    {selectedCars.map(car => {
                      const hasTrack = car.id !== 'rivian-r1s-dual' && car.id !== 'rivian-r1s';
                      return (
                        <td key={car.id} className="py-4.5 px-4 text-center">
                          {hasTrack ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                              <Check className="h-3.5 w-3.5" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-50 text-red-600 border border-red-100">
                              <X className="h-3.5 w-3.5" />
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  <tr className="hover:bg-zinc-50/30 transition-colors">
                    <td className="py-4.5 px-6 font-bold text-teal-950">Estimated Financed Plan</td>
                    {selectedCars.map(car => {
                      const baseMonthly = Math.round(car.price / 60);
                      return (
                        <td key={car.id} className="py-4.5 px-4 text-center text-teal-700 font-mono font-black">${baseMonthly.toLocaleString()}/mo</td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Dynamic AI Verdict Container */}
        {selectedCars.length > 0 && (
          <section className="relative p-[1px] rounded-2xl bg-gradient-to-r from-teal-400 via-purple-500 to-teal-400 shadow-md">
            <div className="bg-zinc-950 text-white rounded-[15px] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-tr from-teal-400 to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-lg animate-pulse">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="space-y-1.5 text-center md:text-left">
                <h4 className="font-mono text-[9px] font-black text-teal-400 uppercase tracking-widest">Nova's Intelligent Analysis</h4>
                <p className="font-display font-bold text-base md:text-lg text-zinc-100 leading-relaxed">
                  {getDynamicVerdict()}
                </p>
              </div>
            </div>
          </section>
        )}

      </div>

    </div>
  );
};
