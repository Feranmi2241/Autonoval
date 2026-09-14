import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AutoNovaAudio } from './AudioEngine';
import { 
  ArrowLeft, ArrowRight, CheckCircle2, Zap, Fuel, Sparkles, Clock, Gauge 
} from 'lucide-react';

export const OnboardingFlow = ({
  userName,
  role,
  onComplete,
  showNotification
}) => {
  const [step, setStep] = useState('budget'); // 'budget' | 'bodyType' | 'usageType' | 'fuelType' | 'preparing'
  const [selectedBudget, setSelectedBudget] = useState(60000);
  const [selectedBodies, setSelectedBodies] = useState(['Electric']); // Default to Electric active
  const [selectedUsage, setSelectedUsage] = useState('Family');
  const [selectedFuel, setSelectedFuel] = useState('Electric'); // Default to Electric active
  const [preparingSubtext, setPreparingSubtext] = useState('Our AI is analyzing thousands of listings to find your perfect match.');

  const usageTypes = [
    { id: 'City', label: 'City Commute', desc: 'Tight turns, easy parking, efficient daily driving.' },
    { id: 'Family', label: 'Family', desc: 'Space, safety, and comfort for everyone on board.' },
    { id: 'OffRoad', label: 'Off-Road', desc: 'Built for gravel, trails, and unpredictable terrain.' },
    { id: 'Luxury', label: 'Luxury', desc: 'Premium comfort, presence, and refinement.' },
  ];

  const handleSelectUsage = (usage) => {
    AutoNovaAudio.playClick();
    setSelectedUsage(usage);
  };

  // Body Type data with exact high-fidelity image URLs
  const bodyTypes = [
    {
      id: 'SUV',
      name: 'SUV',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPBkw65wiNXKPRs3vmmUmvpe2-Xs2QGDUJvD9M5ug4I6utJg19XmU9J330O0f5BzjUtNeCQ1WsYU3RPooShTtTPo0O942vESBxWZu5-fvOWNPSLduPD-U9hykKz-DxmNodi2C5aPeDsDhErh27vSunbt7XS8y7jsjBQhmX-VgtAyaGNXOYUxiV39X4Hm3MFsv90VEhDmQN0m_qfBYChdPtBzuuuZgvbhDPuGq_EdFYa0a5kM1uKNPg3mcWTj-p6z4VcTJXnNkXucmo'
    },
    {
      id: 'Sedan',
      name: 'Sedan',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCWoO8PXtOMa4IUcIbfumkdjyQKi9Eai9tYQVMOv8gRgPlt4AlMXMYKZ9gU1kxpPhAzXBppHx7XgoiQP_cIbayJcLWr5Fh7H55HbqxoL0ftLO5EcyNYAeTFayfOYitSUVBdxave-pZe3jaeP0H1Vm5OwIlbuhciWVlTSRnrXI5PtplPhU3IL2UmlRpgZavfHTlbxJk9Bls1BEe0d2zDaic8L1c9t8APRPUP3ymHBuYITT-RIF9q0hd9kfr5JeYwdfq6F-WPYNuQ9k2'
    },
    {
      id: 'Truck',
      name: 'Truck',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA94PE9PIZYnW-7DzsnsLlgblQFMPrAw38F29Jsi9-B4sNppACInl1kDw6iq8urHDGLEJSO3BQvi7Ljod4qAcj77pCEiLHU4zRsNAlx2I5HKPbNlD4WPi7fHQuQNdR7BzFSV25UuXUFvK_-6ieoWTdwYrRjaVASiab2-1PCOuNbq7Gw_96o0B3rO_h7-66wg0ebESbRWeeoBjAW5AJqkDxmjfF4vf4jC9mfCsLuAw4ySSuh_2mm-02VefPuR8bOq8IZmZdujojmxF1Q'
    },
    {
      id: 'Coupe',
      name: 'Coupe',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD14NzOI8m8DtJGVzfbVe4tFhdSzVWKSrh1o2o5kJkl7E-KvLWA1HmWjad7drnaYFWqmpYKBXUovgIoNskUYKKj1EROTIp3XAc8QkAPYZR1F7nWgAs_I2wtfQSt_FHNfQGrwBKkifiyP-hw9X7jPwbiXBqbIb5wujZlSipf93pX9Z0Orcpz5IKquZHnghEsKrOYQfzp4J-mN6H8NHO5rrJRaYdJEii99aB-cepMnCtxq6xQh0s1y-D4n1KKGeJj13T17DrQRd4HU7Pm'
    },
    {
      id: 'Electric',
      name: 'Electric',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt-D5hNpCMNzXVxeTasnym3KzsG1k9UNyEYLlkNRapDn73U7XRyZbMnv6QYlrvVIJYGUzw0rJER_bIev8c4npUpFY6PkG81NAofrCpu4HYJoUBN_arxnzdvbMD8hVO_58Bd85MEuMvdpVLAHR8Ys2dB3sr-AcmPNcHMXJmufNE7WIrCGpkqR1oDc4-QZN7GD1PSt5I1QfrluD0mMWON4KlgMQtkDU1_eiDk8pb66x_dGW4gLQl4VoYyoYnr_Fvv5ikHX9GTirTktMy'
    }
  ];

  const handleToggleBody = (id) => {
    AutoNovaAudio.playClick();
    if (selectedBodies.includes(id)) {
      if (selectedBodies.length > 1) {
        setSelectedBodies(selectedBodies.filter(item => item !== id));
      } else {
        showNotification("Please select at least one body type.", "info");
      }
    } else {
      setSelectedBodies([...selectedBodies, id]);
    }
  };

  const handleSelectFuel = (fuel) => {
    AutoNovaAudio.playClick();
    setSelectedFuel(fuel);
  };

  // Simulated AI loading phases subtext cycling
  useEffect(() => {
    if (step !== 'preparing') return;

    const subtexts = [
      "Our AI is analyzing thousands of listings to find your perfect match.",
      "Synthesizing market data and vehicle history reports...",
      "Matching your preferences with real-time inventory...",
      "Fine-tuning your personalized dealership network..."
    ];
    let currentIdx = 0;

    const interval = setInterval(() => {
      currentIdx = (currentIdx + 1) % subtexts.length;
      setPreparingSubtext(subtexts[currentIdx]);
    }, 1800);

    // Complete preparing flow after 5.5 seconds and proceed to successful entry
    const timeout = setTimeout(() => {
      AutoNovaAudio.playSuccess();
      onComplete({
        selectedBudget,
        selectedBodies,
        selectedUsage,
        selectedFuel
      });
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [step]);

  return (
    <div className="w-full max-w-lg p-1 text-zinc-900 select-none">
      <AnimatePresence mode="wait">

        {/* STEP 1: BUDGET RANGE */}
        {step === 'budget' && (
          <motion.div
            key="budget"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="w-full flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                <span>Step 1 of 4</span>
                <span className="text-teal-700 font-extrabold">25% Complete</span>
              </div>
              <div className="w-full h-1 bg-zinc-200 rounded-full overflow-hidden">
                <div className="h-full bg-teal-700 transition-all duration-500 ease-out" style={{ width: '25%' }}></div>
              </div>
            </div>

            <div className="text-center">
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight leading-none">
                What's your budget?
              </h2>
              <p className="text-xs text-zinc-500 mt-2 font-medium max-w-xs mx-auto leading-relaxed">
                Drag to set your maximum budget — we'll tailor every recommendation around it.
              </p>
            </div>

            <div className="px-2 py-6 rounded-2xl border border-zinc-200/80 bg-zinc-50/50">
              <div className="text-center mb-6">
                <span className="font-display text-3xl font-black text-teal-950">
                  ${selectedBudget.toLocaleString()}
                </span>
                <span className="text-xs text-zinc-400 font-medium ml-1">max</span>
              </div>
              <input
                type="range"
                min="15000"
                max="400000"
                step="5000"
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(Number(e.target.value))}
                onMouseUp={() => AutoNovaAudio.playClick()}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-zinc-200 accent-teal-700"
              />
              <div className="flex justify-between text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-wider mt-2">
                <span>$15K</span>
                <span>$400K+</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
              <button
                type="button"
                onClick={() => { AutoNovaAudio.playClick(); setStep('bodyType'); }}
                className="font-mono text-[9px] tracking-widest font-bold text-zinc-400 hover:text-zinc-900 uppercase cursor-pointer"
              >
                Skip for now
              </button>

              <button
                type="button"
                onClick={() => { AutoNovaAudio.playClick(); setStep('bodyType'); }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono font-extrabold tracking-widest text-[10px] uppercase cursor-pointer shadow-sm"
              >
                <span>Next Step</span>
                <ArrowRight className="h-3 w-3 text-white" />
              </button>
            </div>
          </motion.div>
        )}
        
        {/* STEP 2: SELECT BODY TYPE */}
        {step === 'bodyType' && (
          <motion.div
            key="body-type"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Onboarding Progress */}
            <div className="w-full flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                <span>Step 2 of 4</span>
                <span className="text-teal-700 font-extrabold">50% Complete</span>
              </div>
              <div className="w-full h-1 bg-zinc-200 rounded-full overflow-hidden">
                <div className="h-full bg-teal-700 transition-all duration-500 ease-out" style={{ width: '50%' }}></div>
              </div>
            </div>

            {/* Title & Sub */}
            <div className="text-center">
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight leading-none">
                Select body types
              </h2>
              <p className="text-xs text-zinc-500 mt-2 font-medium max-w-xs mx-auto leading-relaxed">
                Choose one or multiple preferred silhouettes to customize your high-tech showroom experience.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-2 gap-3 max-h-[290px] overflow-y-auto pr-1">
              {bodyTypes.map((body) => {
                const isActive = selectedBodies.includes(body.id);
                return (
                  <button
                    key={body.id}
                    type="button"
                    onClick={() => handleToggleBody(body.id)}
                    onMouseEnter={() => AutoNovaAudio.playHover()}
                    className={`group relative flex flex-col items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'border-teal-700 bg-teal-50/40 shadow-sm' 
                        : 'border-zinc-200/80 bg-zinc-50/50 hover:bg-white hover:border-zinc-300'
                    }`}
                  >
                    <div className="w-full aspect-video overflow-hidden rounded-lg mb-2">
                      <img 
                        src={body.img} 
                        alt={body.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    
                    <span className="font-mono text-[10px] font-bold tracking-widest text-zinc-800 uppercase">
                      {body.name}
                    </span>

                    {isActive && (
                      <div className="absolute top-2.5 right-2.5 text-teal-700">
                        <CheckCircle2 className="h-4 w-4 fill-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Actions Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
              <button
                type="button"
                onClick={() => { AutoNovaAudio.playClick(); setStep('budget'); }}
                className="inline-flex items-center gap-1 font-mono text-[9px] tracking-widest font-bold text-zinc-400 hover:text-zinc-900 uppercase cursor-pointer"
              >
                <ArrowLeft className="h-3 w-3" />
                <span>Back</span>
              </button>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => { AutoNovaAudio.playClick(); showNotification("Default styling selected.", "info"); setStep('usageType'); }}
                  className="font-mono text-[9px] tracking-widest font-bold text-zinc-400 hover:text-zinc-900 uppercase cursor-pointer"
                >
                  Skip for now
                </button>

                <button
                  type="button"
                  onClick={() => { AutoNovaAudio.playClick(); setStep('usageType'); }}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono font-extrabold tracking-widest text-[10px] uppercase cursor-pointer shadow-sm"
                >
                  <span>Next Step</span>
                  <ArrowRight className="h-3 w-3 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 3: USAGE TYPE */}
        {step === 'usageType' && (
          <motion.div
            key="usage-type"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="w-full flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                <span>Step 3 of 4</span>
                <span className="text-teal-700 font-extrabold">75% Complete</span>
              </div>
              <div className="w-full h-1 bg-zinc-200 rounded-full overflow-hidden">
                <div className="h-full bg-teal-700 transition-all duration-500 ease-out" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div className="text-center">
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight leading-none">
                How will you use it?
              </h2>
              <p className="text-xs text-zinc-500 mt-2 font-medium max-w-xs mx-auto leading-relaxed">
                This helps our AI prioritize the right features for your lifestyle.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {usageTypes.map((usage) => (
                <button
                  key={usage.id}
                  type="button"
                  onClick={() => handleSelectUsage(usage.id)}
                  onMouseEnter={() => AutoNovaAudio.playHover()}
                  className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer text-left ${
                    selectedUsage === usage.id
                      ? 'border-teal-700 bg-teal-50/40 shadow-sm'
                      : 'border-zinc-200/80 bg-zinc-50/50 hover:bg-white hover:border-zinc-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                    selectedUsage === usage.id ? 'bg-teal-700/10 text-teal-700' : 'bg-zinc-200/40 text-zinc-500'
                  }`}>
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-extrabold text-zinc-900 leading-none mb-1">{usage.label}</h3>
                    <span className="text-[10px] text-zinc-400 font-medium">{usage.desc}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
              <button
                type="button"
                onClick={() => { AutoNovaAudio.playClick(); setStep('bodyType'); }}
                className="inline-flex items-center gap-1 font-mono text-[9px] tracking-widest font-bold text-zinc-400 hover:text-zinc-900 uppercase cursor-pointer"
              >
                <ArrowLeft className="h-3 w-3" />
                <span>Back</span>
              </button>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => { AutoNovaAudio.playClick(); setStep('fuelType'); }}
                  className="font-mono text-[9px] tracking-widest font-bold text-zinc-400 hover:text-zinc-900 uppercase cursor-pointer"
                >
                  Skip for now
                </button>
                <button
                  type="button"
                  onClick={() => { AutoNovaAudio.playClick(); setStep('fuelType'); }}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono font-extrabold tracking-widest text-[10px] uppercase cursor-pointer shadow-sm"
                >
                  <span>Next Step</span>
                  <ArrowRight className="h-3 w-3 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2: SELECT FUEL TYPE */}
        {step === 'fuelType' && (
          <motion.div
            key="fuel-type"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Onboarding Progress */}
            <div className="w-full flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                <span>Step 4 of 4</span>
                <span className="text-teal-700 font-extrabold">100% Complete</span>
              </div>
              <div className="w-full h-1 bg-zinc-200 rounded-full overflow-hidden">
                <div className="h-full bg-teal-700 transition-all duration-1000 ease-out" style={{ width: '100%' }}></div>
              </div>
            </div>

            {/* Title & Sub */}
            <div className="text-center">
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight leading-none">
                Preferred fuel type?
              </h2>
              <p className="text-xs text-zinc-500 mt-2 font-medium max-w-xs mx-auto leading-relaxed">
                Refine your results by selecting the propulsion technology that fits your style.
              </p>
            </div>

            {/* Fuel Grid */}
            <div className="grid grid-cols-1 gap-3">
              {/* Gas */}
              <button
                type="button"
                onClick={() => handleSelectFuel('Gas')}
                onMouseEnter={() => AutoNovaAudio.playHover()}
                className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  selectedFuel === 'Gas'
                    ? 'border-teal-700 bg-teal-50/40 shadow-sm'
                    : 'border-zinc-200/80 bg-zinc-50/50 hover:bg-white hover:border-zinc-300'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  selectedFuel === 'Gas' ? 'bg-teal-700/10 text-teal-700' : 'bg-zinc-200/40 text-zinc-500'
                }`}>
                  <Fuel className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h3 className="font-display text-sm font-extrabold text-zinc-900 leading-none mb-1">Gas</h3>
                  <span className="font-mono text-[9px] text-zinc-400 font-bold uppercase tracking-wider">INTERNAL COMBUSTION</span>
                </div>
              </button>

              {/* Hybrid */}
              <button
                type="button"
                onClick={() => handleSelectFuel('Hybrid')}
                onMouseEnter={() => AutoNovaAudio.playHover()}
                className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  selectedFuel === 'Hybrid'
                    ? 'border-teal-700 bg-teal-50/40 shadow-sm'
                    : 'border-zinc-200/80 bg-zinc-50/50 hover:bg-white hover:border-zinc-300'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  selectedFuel === 'Hybrid' ? 'bg-teal-700/10 text-teal-700' : 'bg-zinc-200/40 text-zinc-500'
                }`}>
                  <Gauge className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h3 className="font-display text-sm font-extrabold text-zinc-900 leading-none mb-1">Hybrid</h3>
                  <span className="font-mono text-[9px] text-zinc-400 font-bold uppercase tracking-wider">PHEV & MHEV</span>
                </div>
              </button>

              {/* Electric */}
              <button
                type="button"
                onClick={() => handleSelectFuel('Electric')}
                onMouseEnter={() => AutoNovaAudio.playHover()}
                className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  selectedFuel === 'Electric'
                    ? 'border-teal-700 bg-teal-50/40 shadow-sm'
                    : 'border-zinc-200/80 bg-zinc-50/50 hover:bg-white hover:border-zinc-300'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  selectedFuel === 'Electric' ? 'bg-teal-700/10 text-teal-700' : 'bg-zinc-200/40 text-zinc-500'
                }`}>
                  <Zap className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h3 className="font-display text-sm font-extrabold text-zinc-900 leading-none mb-1">Electric</h3>
                  <span className="font-mono text-[9px] text-zinc-400 font-bold uppercase tracking-wider">ZERO EMISSIONS</span>
                </div>
              </button>
            </div>

            {/* Actions Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
              <button
                type="button"
                onClick={() => { AutoNovaAudio.playClick(); setStep('usageType'); }}
                className="inline-flex items-center gap-1 font-mono text-[9px] tracking-widest font-bold text-zinc-400 hover:text-zinc-900 uppercase cursor-pointer"
              >
                <ArrowLeft className="h-3 w-3" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => { AutoNovaAudio.playClick(); setStep('preparing'); }}
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-mono font-extrabold tracking-widest text-[10px] uppercase cursor-pointer shadow-md"
              >
                <span>Finish Onboarding</span>
                <ArrowRight className="h-3 w-3 text-white" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: PREPARING YOUR EXPERIENCE (AI Recommendation simulated animation) */}
        {step === 'preparing' && (
          <motion.div
            key="preparing"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-center py-6"
          >
            {/* Atmospheric Glowing Icon container */}
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-teal-200 rounded-full blur-2xl opacity-45 animate-pulse" />
              
              <div className="relative w-24 h-24 flex items-center justify-center bg-white/60 backdrop-blur-md rounded-full border border-zinc-200 shadow-md">
                <Sparkles className="h-10 w-10 text-teal-700 animate-bounce" />
              </div>

              {/* Orbiting particles */}
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-teal-400 rounded-full blur-[1px] opacity-80 animate-ping" />
              <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-zinc-800 rounded-full opacity-60 animate-pulse" />
            </div>

            {/* Header copy */}
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight leading-none">
              Building recommendations
            </h2>

            <p className="text-xs text-zinc-500 max-w-xs mx-auto font-medium leading-relaxed min-h-[48px] transition-all duration-500">
              {preparingSubtext}
            </p>

            {/* Dynamic loading scanner */}
            <div className="w-full max-w-xs mx-auto bg-zinc-100 rounded-full h-1 overflow-hidden relative border border-zinc-200/50">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-teal-700"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 5.5, ease: 'easeInOut' }}
              />
            </div>

            <div className="text-[9px] font-mono font-bold tracking-widest uppercase text-zinc-400 animate-pulse pt-2">
              AUTO-MATCH PROTOCOLS RUNNING
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};
