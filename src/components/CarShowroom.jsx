import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AutoNovaAudio } from './AudioEngine';
import { Shield, Zap, Compass, Cpu, Activity, Volume2, VolumeX, Sparkles, Star, Milestone } from 'lucide-react';

const VEHICLES = [
  {
    id: 'eko_gt',
    name: 'AutoNova Eko GT',
    subName: 'Neural Grand Tourer (Lagos Spec)',
    zeroToSixty: '1.82s',
    topSpeed: '420 km/h',
    range: '950 km',
    power: '1,450 hp',
    dragCoeff: '0.18 Cd',
    imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-car-headlights-shining-through-fog-at-night-41549-large.mp4',
    quote: "Cruising down the Third Mainland Bridge in the Eko GT feels like piloting a starship. It is the gold standard of luxury and performance in Lagos.",
    author: "Tunde Alabi — FinTech Founder, Ikoyi",
    accentColor: '#00f2ff',
    violetAccent: '#821dda',
    telemetryPattern: [30, 45, 35, 60, 40, 85, 55, 95, 70, 110, 80, 120]
  },
  {
    id: 'zuma_cruiser',
    name: 'AutoNova Zuma',
    subName: 'All-Terrain Sovereign Cruiser (Abuja Spec)',
    zeroToSixty: '2.1s',
    topSpeed: '380 km/h',
    range: '1,100 km',
    power: '1,600 hp',
    dragCoeff: '0.20 Cd',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgADAPhNIuU6GAyGFe8s3J_kTYxDokUPjzivkA7DbbN3DNzRZ_1zhyPICm9-I03cMDf3ADi2A9VDHghbzjGHBNNp1DRa6w-6gaiGYj4nYneBI6fh7QJzq2zfrZTA1hmC6IxN43hFm3Pq-0wjSYbz1I9z1bvbNxDEdFvlFOlU69mHmMwVuX74sB6XPX1eUsBCzqg6SFImHEYJ9VJVIJN1SCVsGTQd3q6X_e1fBKYRiaVaIpkeIr99dioW_9c0I0c_JXdw4qUgcXVZoi',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-car-headlights-in-the-night-41550-large.mp4',
    quote: "With custom high-ground clearance active suspension and level-4 neural guidance, navigating from Maitama to the airport is incredibly majestic.",
    author: "Dr. Fatima Bello — Infrastructure Partner, Maitama",
    accentColor: '#821dda',
    violetAccent: '#00f2ff',
    telemetryPattern: [20, 60, 45, 90, 75, 115, 90, 130, 105, 140, 120, 160]
  },
  {
    id: 'obudu_storm',
    name: 'AutoNova Obudu',
    subName: 'Dual-Motor Adventure SUV (Obudu Edition)',
    zeroToSixty: '2.4s',
    topSpeed: '350 km/h',
    range: '1,250 km',
    power: '1,200 hp',
    dragCoeff: '0.22 Cd',
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-white-luxury-car-driving-on-the-road-41553-large.mp4',
    quote: "Flew up the winding roads of the Obudu Cattle Ranch effortlessly. The solid-state battery system thrives perfectly in our climate.",
    author: "Chidi Okafor — Energy Director, Port Harcourt",
    accentColor: '#fed83a',
    violetAccent: '#00696f',
    telemetryPattern: [15, 25, 20, 35, 30, 50, 45, 65, 55, 80, 70, 95]
  }
];

export const CarShowroom = ({ isSignUp = true }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [muted, setMuted] = useState(true);
  const [telemetryWave, setTelemetryWave] = useState(VEHICLES[0].telemetryPattern);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const activeCar = VEHICLES[activeIdx];

  // Callback ref to guarantee autoplay works on dynamic mounts & transitions
  const handleVideoRef = (el) => {
    videoRef.current = el;
    if (el) {
      el.defaultMuted = true;
      el.muted = true;
      el.load();
      el.play().catch((err) => {
        console.warn("Autoplay block bypass triggered:", err);
      });
    }
  };

  // Dynamic telemetry wave generation
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetryWave((prev) => {
        const next = [...prev.slice(1), prev[0]];
        const randomIdx = Math.floor(Math.random() * next.length);
        next[randomIdx] = Math.max(10, Math.min(110, next[randomIdx] + (Math.random() * 8 - 4)));
        return next;
      });
    }, 150);
    return () => clearInterval(timer);
  }, []);

  // Sync telemetry wave and video when selected car changes
  useEffect(() => {
    setTelemetryWave(activeCar.telemetryPattern);
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [activeIdx, activeCar]);

  const handleCarChange = (index) => {
    if (index === activeIdx) return;
    AutoNovaAudio.playClick();
    setActiveIdx(index);
  };

  const handleToggleMute = () => {
    const isMuted = AutoNovaAudio.toggleMute();
    setMuted(isMuted);
    AutoNovaAudio.playClick();
  };

  const handleMouseMove = (e) => {
    if (containerRef.current && !muted) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const speedFactor = Math.sqrt(x * x + y * y);
      AutoNovaAudio.modulateHum(speedFactor);
    }
  };

  const handleMouseEnter = () => {
    if (!muted) {
      AutoNovaAudio.startDrivetrainHum();
    }
  };

  const handleMouseLeave = () => {
    AutoNovaAudio.stopDrivetrainHum();
  };

  return (
    <div
      id="showroom-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col justify-between h-full w-full overflow-hidden bg-black p-6 md:p-8 lg:p-10 select-none min-h-[45vh] lg:min-h-screen"
    >
      {/* Immersive Video and Fallback Image Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCar.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* High-definition automotive looping background video */}
            <video
              ref={handleVideoRef}
              src={activeCar.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.78] saturate-[1.2] contrast-[1.1]"
              poster={activeCar.imageUrl}
            >
              <img src={activeCar.imageUrl} alt={activeCar.name} className="w-full h-full object-cover" />
            </video>
          </motion.div>
        </AnimatePresence>

        {/* Cinematic dark radial gradients for perfect spec list legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/80 z-1" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/80 z-1" />
        
        {/* Abstract futuristic grid aligner */}
        <div className="absolute inset-0 grid-bg opacity-30 z-1" />
        
        {/* Scanning telemetry lasers */}
        <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-40 scanner-line pointer-events-none z-2" />
      </div>

      {/* Header telemetry HUD readouts */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse glow-cyan" />
          <span className="font-mono text-[10px] tracking-widest text-zinc-300 font-bold">
            HQ BROADCAST // AUTONOVA NIGERIA PORTAL
          </span>
        </div>

        <button
          id="audio-mute-button"
          onClick={handleToggleMute}
          className="flex items-center gap-1.5 rounded-full border border-zinc-700/60 bg-black/50 px-3 py-1 font-mono text-[9px] text-zinc-300 backdrop-blur-md hover:border-brand-cyan hover:text-white transition-all cursor-pointer"
        >
          {muted ? (
            <>
              <VolumeX className="h-3 w-3 text-zinc-400" />
              <span>MUTED</span>
            </>
          ) : (
            <>
              <Volume2 className="h-3 w-3 text-brand-cyan animate-pulse" />
              <span className="text-brand-cyan font-bold glow-text-cyan">LIVE AUDIO ENGINE PLAYING</span>
            </>
          )}
        </button>
      </div>

      {isSignUp ? (
        <>
          {/* Main Nigerian models specifications */}
          <div className="relative z-10 my-auto flex flex-col max-w-xl pt-4 lg:pt-0">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-3.5 w-3.5" style={{ color: activeCar.accentColor }} />
              <span className="font-mono text-[10px] tracking-widest uppercase font-bold" style={{ color: activeCar.accentColor }}>
                RE-ENGINEERED FOR WEST AFRICAN ROADWAYS // SERIES VII
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCar.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
                  {activeCar.name.split(' ').slice(0, -1).join(' ')}
                  <span className="block mt-1 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                    {activeCar.name.split(' ').pop()}
                  </span>
                </h2>
                
                <p className="font-mono text-xs tracking-wide text-zinc-300 mt-2 font-medium">
                  {activeCar.subName}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Automotive specs grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mt-6">
              <div className="border-l-2 border-zinc-800 hover:border-brand-cyan pl-3.5 py-1.5 transition-colors group">
                <span className="font-mono text-[9px] tracking-wider text-zinc-500 block uppercase">0-100 KM/H</span>
                <span className="font-display font-bold text-lg md:text-xl text-white group-hover:text-brand-cyan transition-colors">
                  {activeCar.zeroToSixty}
                </span>
              </div>
              <div className="border-l-2 border-zinc-800 hover:border-brand-cyan pl-3.5 py-1.5 transition-colors group">
                <span className="font-mono text-[9px] tracking-wider text-zinc-500 block uppercase">TOP SPEED</span>
                <span className="font-display font-bold text-lg md:text-xl text-white group-hover:text-brand-cyan transition-colors">
                  {activeCar.topSpeed}
                </span>
              </div>
              <div className="border-l-2 border-zinc-800 hover:border-brand-cyan pl-3.5 py-1.5 transition-colors group">
                <span className="font-mono text-[9px] tracking-wider text-zinc-500 block uppercase">CAPACITY</span>
                <span className="font-display font-bold text-lg md:text-xl text-white group-hover:text-brand-cyan transition-colors">
                  {activeCar.power}
                </span>
              </div>
              <div className="border-l-2 border-zinc-800 hover:border-brand-cyan pl-3.5 py-1.5 transition-colors group">
                <span className="font-mono text-[9px] tracking-wider text-zinc-500 block uppercase">BATTERY RANGE</span>
                <span className="font-display font-bold text-lg md:text-xl text-white group-hover:text-brand-cyan transition-colors">
                  {activeCar.range}
                </span>
              </div>
              <div className="border-l-2 border-zinc-800 hover:border-brand-cyan pl-3.5 py-1.5 transition-colors group">
                <span className="font-mono text-[9px] tracking-wider text-zinc-500 block uppercase">AERO DRAG</span>
                <span className="font-display font-bold text-lg md:text-xl text-white group-hover:text-brand-cyan transition-colors">
                  {activeCar.dragCoeff}
                </span>
              </div>
              <div className="border-l-2 border-zinc-800 hover:border-brand-cyan pl-3.5 py-1.5 transition-colors group">
                <span className="font-mono text-[9px] tracking-wider text-zinc-500 block uppercase">TERRAIN SYNC</span>
                <span className="font-display font-bold text-lg md:text-xl text-white group-hover:text-brand-cyan transition-colors">
                  Adaptive Air
                </span>
              </div>
            </div>

            {/* Model quick selections */}
            <div className="flex flex-wrap gap-2 mt-6">
              {VEHICLES.map((car, idx) => (
                <button
                  key={car.id}
                  onClick={() => handleCarChange(idx)}
                  onMouseEnter={() => AutoNovaAudio.playHover()}
                  className={`relative flex items-center gap-2 rounded-lg px-3 py-2 transition-all font-mono text-[11px] font-semibold tracking-wider ${
                    activeIdx === idx
                      ? 'bg-white/10 text-white shadow-lg border border-white/20'
                      : 'bg-black/40 text-zinc-400 hover:text-white border border-zinc-800/40 hover:border-zinc-700'
                  }`}
                >
                  {activeIdx === idx && (
                    <motion.div
                      layoutId="activeModelIndicator"
                      className="absolute inset-0 rounded-lg -z-1"
                      style={{ background: `linear-gradient(135deg, ${car.accentColor}25, ${car.violetAccent}25)` }}
                    />
                  )}
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: activeIdx === idx ? car.accentColor : '#52525b' }}
                  />
                  {car.name.replace('AutoNova ', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom telemetry sweep and localized testimonials */}
          <div className="relative z-10 mt-auto grid grid-cols-1 md:grid-cols-12 gap-4 items-end pt-4 border-t border-zinc-800/40">
            
            {/* Testimonial block */}
            <div className="col-span-1 md:col-span-7 glass-panel p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-1.5 mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current text-brand-cyan animate-pulse" />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeCar.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.4 }}
                  className="text-xxs sm:text-xs text-zinc-200 italic font-medium leading-relaxed"
                >
                  "{activeCar.quote}"
                </motion.p>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeCar.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  className="text-[9px] uppercase font-mono tracking-widest text-zinc-400 mt-2"
                >
                  {activeCar.author}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Telemetry live line chart */}
            <div className="col-span-1 md:col-span-5 hidden md:flex flex-col gap-1.5 p-3 rounded-xl bg-black/50 border border-zinc-800/60">
              <div className="flex items-center justify-between text-[8px] font-mono tracking-widest text-zinc-400">
                <span className="flex items-center gap-1"><Activity className="h-2.5 w-2.5 text-brand-cyan animate-pulse" /> SUSPENSION SWEEP</span>
                <span className="text-zinc-500">99.2% CALIBRATED</span>
              </div>

              <div className="h-14 w-full flex items-end">
                <svg viewBox="0 0 300 100" className="w-full h-full text-brand-cyan overflow-visible">
                  <defs>
                    <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={activeCar.accentColor} stopOpacity="0.4" />
                      <stop offset="100%" stopColor={activeCar.accentColor} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`M 0,100 ${telemetryWave.map((val, i) => `L ${(i * 300) / (telemetryWave.length - 1)},${100 - val}`).join(' ')} L 300,100 Z`}
                    fill="url(#waveGrad)"
                    className="transition-all duration-300 ease-out"
                  />
                  <path
                    d={telemetryWave.map((val, i) => `${i === 0 ? 'M' : 'L'} ${(i * 300) / (telemetryWave.length - 1)},${100 - val}`).join(' ')}
                    fill="none"
                    stroke={activeCar.accentColor}
                    strokeWidth="1.5"
                    className="transition-all duration-300 ease-out"
                  />
                  <circle
                    cx="300"
                    cy={100 - telemetryWave[telemetryWave.length - 1]}
                    r="3"
                    fill={activeCar.accentColor}
                    className="glow-cyan animate-ping"
                  />
                </svg>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Stunning centered Marcus Chen quote card overlay */
        <div className="relative z-10 my-auto flex flex-col items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="backdrop-blur-md bg-zinc-950/45 border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 max-w-md w-full shadow-2xl text-center flex flex-col items-center justify-center"
          >
            <span className="text-brand-cyan font-serif text-6xl leading-none select-none opacity-90 mb-3 animate-pulse">“</span>
            <p className="text-sm sm:text-base md:text-lg text-white font-medium leading-relaxed italic font-sans">
              "The future of driving is already here with AutoNova. Every journey feels like a leap into the next century."
            </p>
            <div className="w-12 h-[2px] bg-brand-cyan mx-auto my-5 rounded-full shadow-[0_0_8px_rgba(0,242,255,0.8)]" />
            <p className="text-xs uppercase font-mono tracking-widest text-brand-cyan font-bold">
              — Marcus Chen, Tech Lead
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};
export default CarShowroom;
