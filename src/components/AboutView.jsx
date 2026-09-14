import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, Cpu, BookOpen, ShieldCheck, Zap, Target, Mail, Globe, 
  ArrowRight, X, Play, Clock, Sparkles, User, FileText, UploadCloud, CheckCircle2,
  Lock, ArrowUpRight, Palette, Award, Terminal
} from 'lucide-react';
import { AutoNovaAudio } from './AudioEngine';

// Mock Team Members data with extended bios
const TEAM_MEMBERS = [
  {
    id: 'alex',
    name: 'Alex Rivera',
    role: 'CEO & Founder',
    specialty: 'Sovereign Mobility Strategy',
    bio: 'Alex Rivera has spent the last 15 years breaking and rebuilding dealership business models. Formerly a quantitative researcher at Bloomberg, he founded AutoNova with a singular mission: to strip away the asymmetry of used vehicle valuation using pure kinetic metrics.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhqHHUDc9e3blF4M-llO7OTNhuRZNwfc4zTTBRP7HLKhHEfQsXp-lX0J4_as3ME787wW3PVeJdcbLmvXjKZWrZBFodJgFZL3xfne8TlWuOmcju9zq9fmFWkLw9F0F4LLOhpYDWg2Q7EKJn038lUqSgZn1V4J0BMwskr7FEdMvcWkZA9j3QWNrWUMRmPCDK_kaQ52WL7VKjyy87-5dNI2e7zk0_cD_9U92LxtM7zlbkZd1OvyON2YoLT7VMK_JAupDeB4A5whHfPPsD',
    quote: "The car is no longer an appliance; it is an active ledger of economic and energetic potential.",
    favoriteCar: "Lucid Air Sapphire",
    icon: Rocket
  },
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    role: 'Chief Technology Officer',
    specialty: 'Neural Network Architect',
    bio: 'Sarah Chen is an astrophysicist-turned-engineer who developed NovaCore™, the predictive valuation system that powers the entire AutoNova platform. She specializes in 4D kinetic mapping, mapping vehicle wear based on topographic vibration telemetry.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAy8OTk_Zr_LJkYYKN_dc0sk5Atjsjyu-Omn5L2uIhwTImJP9YkvnI2LR760GSrs2HtBP0tWZ4e0RG9mNZ0tfWYgchuH7Bm_3gF_t2tRbPKc6hqIxM4bsC0QbnXacTCae1uXMr_pCZJzQab32Qp71QC376ayXwbhqa3A19Bi6vC64_y2LGmHCp3iDLuv5LnrQsmtkjZiSYj9tRNndfY8zapoExrd7TA9hBjamS7Za7ev2ArAZo9hiF-MwRDnQB1JPnIjDFaETAdyTgl',
    quote: "Every vehicle generates a unique vibrational signature. The data is there; we simply learned how to translate it.",
    favoriteCar: "Rimac Nevera Time Attack",
    icon: Cpu
  },
  {
    id: 'sarah-jensen',
    name: 'Sarah Jensen',
    role: 'Senior Tech Analyst',
    specialty: 'Powertrain Curation',
    bio: 'Sarah has spent over 12 years covering the intersection of automotive hardware and software. As the lead editor of AutoNova Dispatches, she translates raw battery supply chain metrics and telemetry analytics into actionable buyer intelligence.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc9YELlvdd6w8XRER15t_EmZQAMrH76tfamNvzmDLl6zUTnf29yMT6MrmQN8MorVCoDvNScWypr0SX2Pv2hvHQydloJiuddKARHbvcdKQkB8UxDRf23UCdVzY1BlnrD_vOcJ6bQ0pbzt6Z1Q0XH9FyVsPRbMWvRCe6kdNiHaxjwEuSe0EdSwfO7mDun5ttauP2rYsO4OP8dnRliL_JgnkpZFXJTzo1TB51Uu-TrB23PQmtTxR34FN3cNyFntuDBqk8IQoWiFDJEB9R',
    quote: "The transition to electric is trivial; the transition to ambient automotive intelligence is revolutionary.",
    favoriteCar: "Porsche Taycan Turbo GT",
    icon: BookOpen
  },
  {
    id: 'marcus',
    name: 'Marcus Vance',
    role: 'Head of Experience Design',
    specialty: 'Kinetic UI Systems',
    bio: 'Marcus Vance crafted the visual language of the AutoNova portal. Rejecting boring static spreadsheets, Marcus believes luxury data should feel like organic liquid light, reacting seamlessly to mouse gestures and acoustic frequencies.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxlYcMR6bEHkUdRHA0UjR9RHj1vCJeDKLGCka0kKrsBzLnNxpGRPPOuNUtg1tzTMlJArPuXhzeyM_ty9iCjOcqlMZFaGivhUa9mzgZO9y9jmI1ErXNABN88BrFhXSRMTck13xZ1fPJ3mlVcVQQ-ze1SAtR71qZZYAesAS20ylzkGTxjjHOJpBw783BEITs6fuOF6Xn2mY_9i9mkNDkU48wb8eR5D4XsJzqE5cg8rV9we7DUokTGTcR2atSFfIq_dhP4d0cYcjQJqoH',
    quote: "If a digital interface doesn't feel alive under your fingertips, it's just a dead document.",
    favoriteCar: "DeLorean Alpha5",
    icon: Palette
  }
];

// Interactive Milestones
const MILESTONES = [
  {
    year: '2020',
    title: 'Garage Founding',
    subtitle: 'London, UK',
    description: 'AutoNova was born in a converted industrial warehouse in London. The goal was simple: to create a cryptographic proof database of car service histories to permanently eliminate odometer tampering and undeclared collisions.',
    metrics: { vehicles: '120 test-beds', nodes: '3 regional', accuracy: 'N/A' },
    details: 'Our first product was a simple hardware logger that plugged into the OBD-II diagnostic port and securely streamed telemetry packets to a local private ledger.'
  },
  {
    year: '2022',
    title: 'NovaCore™ AI Launch',
    subtitle: 'Neural Valuation Deployment',
    description: 'We deployed NovaCore™ v1, training neural networks on 14 years of regional auction indices, manufacturer repair logs, and live port imports. This replaced static paper valuation tables with our 4D pricing engine.',
    metrics: { vehicles: '450,000 processed', nodes: '45 partner hubs', accuracy: '96.4%' },
    details: 'By incorporating ambient climate metrics, state of charge degradation logs, and macro tire wear, the valuation engine achieved unprecedented local stability.'
  },
  {
    year: '2024',
    title: 'Global Expansion',
    subtitle: '14 Core Countries Joined',
    description: 'Expanding outside the UK, AutoNova established data integration licenses with major European registries, West African ports, and Japanese exporter groups, allowing live cross-continental tracking.',
    metrics: { vehicles: '2.4M active syncs', nodes: '112 validated nodes', accuracy: '99.2%' },
    details: 'This cross-border expansion pioneered the Sovereign Car Ledger, allowing local West African buyers to instantly see the pristine origin logs of imported luxury vehicles.'
  },
  {
    year: '2026',
    title: 'Sovereign Ledger Sync',
    subtitle: 'Real-Time Neural Integration',
    description: 'Now, AutoNova fully integrates generative buyer search, localized finance amortization modules, and real-time decentralized transaction clearance on the proprietary Sovereign Node ledger.',
    metrics: { vehicles: '8.2M total database', nodes: '540 high-perf nodes', accuracy: '99.85%' },
    details: 'Every car listed on our showroom is backed by an unalterable, cryptographically signed ledger passport, providing true security in secondary market trades.'
  }
];

// Mock Careers Board
const CAREER_OPENINGS = [
  {
    id: 'neural-arch',
    title: 'Senior Neural Valuation Architect',
    department: 'AI & Data Science',
    location: 'Hybrid / London Hub',
    salary: '£120k - £150k + Equity',
    description: 'We are seeking an expert in transformer models and regression trees to lead the next generation of NovaCore™. You will design models that parse raw acoustic engine files and physical chassis vibration telemetry to assess hidden structural fatigue.',
    requirements: [
      'PhD or equivalent in Astrophysics, Quantitative Physics, or Deep Learning.',
      'Strong portfolio of production models processing multi-modal time-series sensor data.',
      'Deep fluency with high-performance C++ modeling wrappers and Python scientific stacks.',
      'A passionate obsession with mechanical or battery hardware.'
    ]
  },
  {
    id: 'kinetic-ux',
    title: 'Lead Kinetic UI/UX Strategist',
    department: 'Product & Design',
    location: 'Remote / Global',
    salary: '£90k - £115k',
    description: 'AutoNova UI rejects static boxes. We want an interaction wizard who can translate real-time vehicle physics, pricing fluctuations, and acoustic hums into gorgeous, responsive browser states using custom canvas rendering and motion systems.',
    requirements: [
      '5+ years leading high-end digital agency or luxury marketplace interaction design.',
      'Proficiency in Web Audio API, WebGL, Tailwind, and custom React motion pipelines.',
      'Obsessive eye for microscopic typographic pairings, negative space, and transitions.',
      'Fluent knowledge of sound-assisted digital design paradigms.'
    ]
  },
  {
    id: 'ledger-dev',
    title: 'Decentralized Ledger Sync Engineer',
    department: 'Core Infrastructure',
    location: 'On-site / Lagos Hub',
    salary: '₦32M - ₦45M base equivalent',
    description: 'Join our regional ledger engineering pod. You will optimize the synchronization latency of vehicle ownership records across West African port customs databases and domestic regulatory registries using high-throughput secure sockets.',
    requirements: [
      'Expertise in private blockchain consensus mechanisms (e.g., Hyperledger, Tendermint).',
      'Advanced skills in Go, Rust, or Elixir with focus on high-concurrency TCP networking.',
      'Experience working alongside customs clearance, port manifest, or maritime software APIs.',
      'Firm belief in radical structural honesty and anti-corruption design.'
    ]
  }
];

export const AboutView = ({ userName, role, onNavigateToView, showNotification }) => {
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(3);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  
  // Mission Video Overlay State
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [currentCaption, setCurrentCaption] = useState("Establishing quantum uplink with NovaCore v2...");

  // Blueprint Interactive State
  const [hoveredBlueprintNode, setHoveredBlueprintNode] = useState(null);

  // Apply Form State
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [applyForm, setApplyForm] = useState({
    name: userName || '',
    email: '',
    pitch: '',
    resumeUploaded: false,
    resumeName: ''
  });
  const [applySubmitted, setApplySubmitted] = useState(false);

  // Mission Video Playback Simulation
  useEffect(() => {
    let interval;
    if (videoPlaying && isVideoOpen) {
      interval = setInterval(() => {
        setVideoProgress(prev => {
          if (prev >= 100) {
            setVideoPlaying(false);
            setCurrentCaption("Uplink successful. Core broadcast concluded.");
            return 100;
          }
          const next = prev + 1.5;
          // Dynamically change captions based on progress
          if (next < 25) {
            setCurrentCaption("Broadcasting Founder's Address: Garage beginnings in Shoreditch...");
          } else if (next < 50) {
            setCurrentCaption("Scanning physical assets. Accelerating 4D mechanical valuation algorithms...");
          } else if (next < 75) {
            setCurrentCaption("Connecting Lagos, London, Tokyo. Decoupling price asymmetry globally...");
          } else if (next < 95) {
            setCurrentCaption("The Sovereign Car Passport: Complete physical honesty, permanently synchronized.");
          }
          return next;
        });
      }, 250);
    }
    return () => clearInterval(interval);
  }, [videoPlaying, isVideoOpen]);

  const handleOpenVideo = () => {
    AutoNovaAudio.playSuccess();
    setIsVideoOpen(true);
    setVideoPlaying(true);
    setVideoProgress(0);
  };

  const handleCloseVideo = () => {
    AutoNovaAudio.playClick();
    setIsVideoOpen(false);
    setVideoPlaying(false);
  };

  const handleBlueprintNodeHover = (node) => {
    if (node) {
      AutoNovaAudio.playHover();
    }
    setHoveredBlueprintNode(node);
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applyForm.email || !applyForm.pitch) {
      showNotification("Please populate all application matrices to proceed.", "error");
      return;
    }
    AutoNovaAudio.playSuccess();
    setApplySubmitted(true);
    showNotification("Application ledger written. Uplinking candidate profile...", "success");
    setTimeout(() => {
      setIsApplyOpen(false);
      setApplySubmitted(false);
      setSelectedJob(null);
      setApplyForm({
        name: userName || '',
        email: '',
        pitch: '',
        resumeUploaded: false,
        resumeName: ''
      });
    }, 3000);
  };

  return (
    <div className="w-full bg-[#fdf8f8] min-h-screen pb-24 font-sans text-zinc-900 overflow-x-hidden">
      
      {/* 1. HERO SECTION: Vision & Mission */}
      <section className="relative pt-20 pb-24 text-center px-6 overflow-hidden border-b border-zinc-200/40">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-purple-300/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-teal-300/10 rounded-full blur-[120px] -z-10" />

        <div className="max-w-4xl mx-auto space-y-8 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200/50 text-teal-950 font-mono text-[9px] tracking-widest uppercase font-extrabold"
          >
            <Sparkles className="h-3 w-3 text-teal-600 animate-pulse" />
            <span>EST. 2020 • THE FUTURE OF AUTO</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-teal-950 leading-tight max-w-3xl mx-auto"
          >
            Shaping Tomorrow's Mobility through <span className="text-teal-700 italic font-serif">Kinetic Intelligence.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-zinc-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium"
          >
            AutoNova AI is re-engineering the automotive lifecycle. By combining deep neural prediction with synchronized international ledger validation, we bring absolute transparency to luxury car owners, buyers, and sellers worldwide.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <button 
              onClick={() => {
                AutoNovaAudio.playClick();
                const el = document.getElementById('blueprint-canvas');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                showNotification("Scanning blueprint diagnostic systems...", "info");
              }}
              className="bg-teal-950 hover:bg-teal-900 text-white font-mono text-xs font-bold tracking-wider px-8 py-3.5 rounded-2xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Cpu className="h-4 w-4 text-teal-400" />
              EXPLORE OUR TECH
            </button>
            <button 
              onClick={handleOpenVideo}
              className="border border-zinc-200 hover:border-teal-700 hover:bg-teal-50 text-teal-950 font-mono text-xs font-bold tracking-wider px-8 py-3.5 rounded-2xl transition-all flex items-center gap-2 cursor-pointer bg-white"
            >
              <Play className="h-4 w-4 fill-current text-teal-700" />
              WATCH MISSION VIDEO
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. PRESS MENTIONS SECTION */}
      <section className="py-12 bg-zinc-50 border-b border-zinc-200/30">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center font-mono text-[8.5px] tracking-widest font-black text-zinc-400 uppercase mb-8">
            As Featured and Validated In
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {/* TechCrunch Logo simulation */}
            <span className="font-display font-black text-lg md:text-xl text-zinc-700 hover:text-teal-950 transition-colors">Tech<span className="text-teal-600">Crunch</span></span>
            {/* Bloomberg Logo simulation */}
            <span className="font-display font-bold tracking-tighter text-lg md:text-xl text-zinc-700 hover:text-teal-950 transition-colors">Bloomberg</span>
            {/* Wired Logo simulation */}
            <span className="font-sans font-extrabold tracking-widest text-base md:text-lg text-zinc-700 hover:text-teal-950 transition-colors">WIRED</span>
            {/* Forbes Logo simulation */}
            <span className="font-serif font-black text-lg md:text-xl text-zinc-700 hover:text-teal-950 transition-colors">Forbes</span>
            {/* Quartz Logo simulation */}
            <span className="font-mono font-bold text-base md:text-lg text-zinc-700 hover:text-teal-950 transition-colors">QZ.com</span>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE CHASSIS BLUEPRINT EXPLORER */}
      <section id="blueprint-canvas" className="py-20 px-6 max-w-7xl mx-auto border-b border-zinc-200/30">
        <div className="text-center space-y-4 mb-12">
          <span className="bg-teal-50 text-teal-800 border border-teal-200/40 font-mono text-[7px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
            Interactive Diagnostics
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-teal-950">
            NovaCore™ 4D Kinetic Vectoring
          </h2>
          <p className="text-xs md:text-sm text-zinc-500 max-w-2xl mx-auto font-medium">
            Hover over the vital sensory telemetry nodes to visualize how our predictive network aggregates absolute chassis integrity and real-time ledger valuations.
          </p>
        </div>

        {/* Blueprint Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-teal-950 to-teal-900 rounded-[32px] p-8 md:p-12 text-white relative overflow-hidden border border-teal-900/50 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[80px]" />
          
          {/* Diagnostic Display Left */}
          <div className="col-span-1 lg:col-span-4 space-y-6">
            <div className="space-y-1">
              <span className="font-mono text-[8px] font-black text-teal-400 tracking-wider">SYSTEM DIAGNOSTIC</span>
              <h3 className="font-display text-lg font-bold text-teal-100">Sensor Matrix Overview</h3>
            </div>
            
            <p className="text-zinc-400 text-xs leading-relaxed font-medium">
              Traditional marketplaces estimate value based on year and static mileage. NovaCore™ scans the underlying acoustic signatures of drivetrain hums, electric motor resistance, and regional degradation coefficients to compute a real-time, zero-variance passport.
            </p>

            {/* Active Node Detail */}
            <div className="bg-zinc-900/80 rounded-2xl p-5 border border-zinc-800/80 min-h-[160px] flex flex-col justify-between">
              {hoveredBlueprintNode ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={hoveredBlueprintNode.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-2.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 bg-teal-950 text-teal-400 rounded-lg border border-teal-900">
                        {React.createElement(hoveredBlueprintNode.icon, { className: 'h-4 w-4' })}
                      </span>
                      <div>
                        <h4 className="font-display text-xs font-bold text-white">{hoveredBlueprintNode.name}</h4>
                        <p className="font-mono text-[7px] text-teal-400 font-bold uppercase tracking-wider">{hoveredBlueprintNode.protocol}</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {hoveredBlueprintNode.description}
                    </p>
                    <div className="pt-1 flex items-center justify-between font-mono text-[8px] font-bold text-zinc-500 border-t border-zinc-800/50">
                      <span>TELEMETRY STABILITY:</span>
                      <span className="text-teal-400">{hoveredBlueprintNode.stability}%</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-6 space-y-2 text-zinc-500">
                  <Terminal className="h-6 w-6 text-zinc-600 animate-pulse" />
                  <p className="font-mono text-[9px] font-black uppercase tracking-wider">Awaiting Sensor Probe Hover</p>
                  <p className="text-[10px] text-zinc-600 max-w-xs">Move your cursor over the highlighted chassis points to establish a diagnostic stream.</p>
                </div>
              )}
            </div>
          </div>

          {/* Visual Canvas Center-Right */}
          <div className="col-span-1 lg:col-span-8 flex flex-col items-center justify-center relative">
            
            {/* Grid Coordinates */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.03] border border-zinc-800 pointer-events-none">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className="border-t border-l border-zinc-700" />
              ))}
            </div>

            {/* Simulated Vector Wireframe Chassis */}
            <div className="relative w-full aspect-[2/1] max-w-lg select-none py-8">
              
              {/* Sleek Vector Car Side View Overlay */}
              <svg viewBox="0 0 600 240" className="w-full h-full text-zinc-800 fill-none stroke-current stroke-[1.5] opacity-35">
                <path d="M40 180 h10 l15 -25 h40 l15 25 h200 l15 -25 h40 l15 25 h160 v-20 l-30 -15 h-90 l-50 -60 h-180 l-40 60 h-120 l-25 15 v20 Z" />
                {/* Wheels */}
                <circle cx="105" cy="180" r="30" />
                <circle cx="105" cy="180" r="10" />
                <circle cx="380" cy="180" r="30" />
                <circle cx="380" cy="180" r="10" />
                {/* Cabin glass */}
                <path d="M170 120 h120 l35 40 h-190 Z" />
              </svg>

              {/* Interactive Telemetry Nodes */}
              {[
                {
                  id: 'batt',
                  name: 'Acoustic Solid State Battery Monitor',
                  protocol: 'PROTOCOL // BATT-79X',
                  stability: 99.8,
                  icon: Cpu,
                  description: 'Streams continuous heat expansion and dendrite formation coefficients. NovaCore uses this to estimate exact future SOH (State of Health) curves.',
                  x: '46%',
                  y: '72%'
                },
                {
                  id: 'drive',
                  name: 'Dual Kinetic Traction Vectoring',
                  protocol: 'PROTOCOL // DRIVE-SYNC-3A',
                  stability: 99.4,
                  icon: Rocket,
                  description: 'Measures continuous rotor torque lag to capture micro-slippages. Analyzes motor resistance anomalies indicating mechanical fatigue.',
                  x: '78%',
                  y: '74%'
                },
                {
                  id: 'chassis',
                  name: 'Chassis Structural Telemetry Node',
                  protocol: 'PROTOCOL // BEAM-SENSE-4D',
                  stability: 100,
                  icon: ShieldCheck,
                  description: 'Using high-frequency audio wave mapping to identify hidden structural stress fractures from previous impact occurrences.',
                  x: '24%',
                  y: '68%'
                },
                {
                  id: 'lidar',
                  name: 'Spatial Laser Array & AI Hub',
                  protocol: 'PROTOCOL // VISION-CORE-0',
                  stability: 98.9,
                  icon: Target,
                  description: 'Syncs localized spatial telemetry maps to trace historical regional road conditions where the vehicle spent its operating lifetime.',
                  x: '55%',
                  y: '32%'
                }
              ].map((node) => {
                const isActive = hoveredBlueprintNode?.id === node.id;
                return (
                  <button
                    key={node.id}
                    onMouseEnter={() => handleBlueprintNodeHover(node)}
                    onMouseLeave={() => handleBlueprintNodeHover(null)}
                    style={{ left: node.x, top: node.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 p-2 focus:outline-none cursor-pointer group"
                  >
                    <span className="absolute inset-0 rounded-full bg-teal-400/20 animate-ping duration-1000" />
                    <span className={`relative flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-300 ${
                      isActive 
                        ? 'bg-teal-400 border-white text-teal-950 scale-125' 
                        : 'bg-zinc-900 border-teal-500/80 text-teal-400 group-hover:scale-110'
                    }`}>
                      {React.createElement(node.icon, { className: 'h-2.5 w-2.5' })}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="w-full flex justify-between items-center px-4 font-mono text-[9px] text-zinc-500 border-t border-zinc-900/50 pt-4">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 bg-teal-400 rounded-full animate-ping" />
                ACTIVE UPLINK STATE: SYNCED // LAG: 8.2MS
              </span>
              <span>UPLINK: ACTIVE // PORT 3000</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPANY STORY TIMELINE ("OUR EVOLUTION") */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-b border-zinc-200/30">
        <div className="text-center space-y-4 mb-16">
          <span className="bg-teal-50 text-teal-800 border border-teal-200/40 font-mono text-[7px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
            Our Timeline
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-teal-950">
            Our Evolution
          </h2>
          <p className="text-xs md:text-sm text-zinc-500 max-w-2xl mx-auto font-medium">
            Click on the epoch milestones below to unpack the deep technology dispatches and core metric snapshots of each phase.
          </p>
        </div>

        {/* Dynamic Timeline Component */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Milestone Selection (Left 4 cols) */}
          <div className="col-span-1 lg:col-span-4 flex flex-col gap-4">
            {MILESTONES.map((m, idx) => {
              const isActive = activeTimelineIdx === idx;
              return (
                <button
                  key={m.year}
                  onClick={() => {
                    AutoNovaAudio.playClick();
                    setActiveTimelineIdx(idx);
                  }}
                  className={`w-full p-5 rounded-2xl text-left border cursor-pointer transition-all flex items-center justify-between ${
                    isActive 
                      ? 'bg-white border-teal-600 shadow-md ring-1 ring-teal-600/35 scale-[1.02]' 
                      : 'bg-zinc-50/50 border-zinc-200/60 hover:bg-zinc-50 hover:border-zinc-300'
                  }`}
                >
                  <div className="space-y-1">
                    <span className={`font-mono text-xs font-black px-2 py-0.5 rounded ${
                      isActive ? 'bg-teal-900 text-white' : 'bg-zinc-200 text-zinc-700'
                    }`}>
                      {m.year}
                    </span>
                    <h3 className="font-display text-xs font-bold text-teal-950 pt-1">{m.title}</h3>
                    <p className="text-[10px] text-zinc-400 font-medium">{m.subtitle}</p>
                  </div>
                  <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${
                    isActive ? 'text-teal-700 translate-x-1' : 'text-zinc-300'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Expanded Showcase Display (Right 8 cols) */}
          <div className="col-span-1 lg:col-span-8 bg-white rounded-3xl p-6 md:p-8 border border-zinc-200/50 shadow-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTimelineIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 pb-4">
                  <div>
                    <span className="font-mono text-[9px] font-black text-teal-700 tracking-widest uppercase">
                      EPOCH DISPATCH STATE
                    </span>
                    <h3 className="font-display text-lg md:text-xl font-extrabold text-teal-950">
                      {MILESTONES[activeTimelineIdx].title} — {MILESTONES[activeTimelineIdx].year}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] bg-teal-50 text-teal-900 font-black px-2.5 py-1 rounded">
                    {MILESTONES[activeTimelineIdx].subtitle}
                  </span>
                </div>

                <div className="space-y-4">
                  <p className="text-zinc-600 text-xs md:text-sm leading-relaxed font-medium">
                    {MILESTONES[activeTimelineIdx].description}
                  </p>
                  <p className="text-zinc-500 text-[11px] md:text-xs leading-relaxed bg-zinc-50 rounded-xl p-4 border border-zinc-100">
                    <span className="font-bold text-zinc-700 font-mono text-[9px] block mb-1 uppercase tracking-wider">HISTORIC DETAIL:</span>
                    {MILESTONES[activeTimelineIdx].details}
                  </p>
                </div>

                {/* Metrics bento */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-100">
                  <div className="bg-teal-50/50 rounded-2xl p-4 border border-teal-100/40">
                    <span className="font-mono text-[8px] font-black text-teal-700 block uppercase">SYSTEM BASE</span>
                    <span className="font-display text-xs md:text-sm font-extrabold text-teal-950">
                      {MILESTONES[activeTimelineIdx].metrics.vehicles}
                    </span>
                  </div>
                  <div className="bg-purple-50/50 rounded-2xl p-4 border border-purple-100/40">
                    <span className="font-mono text-[8px] font-black text-purple-700 block uppercase">LEDGER NODES</span>
                    <span className="font-display text-xs md:text-sm font-extrabold text-purple-950">
                      {MILESTONES[activeTimelineIdx].metrics.nodes}
                    </span>
                  </div>
                  <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200/50">
                    <span className="font-mono text-[8px] font-black text-zinc-500 block uppercase">MODEL ACCURACY</span>
                    <span className="font-display text-xs md:text-sm font-extrabold text-zinc-800">
                      {MILESTONES[activeTimelineIdx].metrics.accuracy}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 5. TEAM GRID KEY VISUAL: Built by Visionaries */}
      <section className="py-24 bg-zinc-50 border-b border-zinc-200/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Header copy and mini bento (Left 5 cols) */}
            <div className="col-span-1 lg:col-span-5 space-y-6">
              <span className="bg-teal-900 text-white font-mono text-[7px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                Founding Partners
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-teal-950 leading-tight">
                Built by Visionaries
              </h2>
              <p className="text-xs md:text-sm text-zinc-600 leading-relaxed font-medium">
                Our core pod is not made of traditional car salesmen. We are astrophysicists, algorithmic quantitative researchers, and product interaction architects who view cars as active ledger nodes.
              </p>

              {/* Grid of team selectors */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {TEAM_MEMBERS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      AutoNovaAudio.playSuccess();
                      setSelectedMember(t);
                    }}
                    className="p-4 bg-white hover:bg-teal-50 border border-zinc-200 hover:border-teal-600 rounded-2xl text-left transition-all duration-200 cursor-pointer shadow-sm group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3 group-hover:bg-teal-900 group-hover:text-white transition-all">
                      {React.createElement(t.icon, { className: 'h-4 w-4' })}
                    </div>
                    <h4 className="font-display text-[11px] font-bold text-teal-950">{t.name}</h4>
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">{t.role}</p>
                    <span className="text-[8px] font-mono font-bold text-teal-700 hover:underline flex items-center gap-1 mt-2">
                      BIO PROTOCOL <ArrowUpRight className="h-2 w-2" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cinematic Team Illustration Frame (Right 7 cols) */}
            <div className="col-span-1 lg:col-span-7 relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/10 to-purple-900/10 rounded-[32px] pointer-events-none" />
              <div className="rounded-[32px] overflow-hidden border border-zinc-200 shadow-xl aspect-[16/10] bg-zinc-200 relative">
                <img 
                  alt="AutoNova Leadership Team in modern office" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhqHHUDc9e3blF4M-llO7OTNhuRZNwfc4zTTBRP7HLKhHEfQsXp-lX0J4_as3ME787wW3PVeJdcbLmvXjKZWrZBFodJgFZL3xfne8TlWuOmcju9zq9fmFWkLw9F0F4LLOhpYDWg2Q7EKJn038lUqSgZn1V4J0BMwskr7FEdMvcWkZA9j3QWNrWUMRmPCDK_kaQ52WL7VKjyy87-5dNI2e7zk0_cD_9U92LxtM7zlbkZd1OvyON2YoLT7VMK_JAupDeB4A5whHfPPsD"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-teal-950/90 to-transparent p-6 text-white flex flex-col justify-end space-y-1">
                  <span className="font-mono text-[7px] text-teal-300 font-bold tracking-widest uppercase">AUTONOVA GENERAL POD</span>
                  <p className="font-display text-xs font-bold">The team in our Shoreditch development workshop compiling NovaCore v2.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. THE AUTONOVA CODE (OUR VALUES) */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-b border-zinc-200/30">
        <div className="text-center mb-16">
          <span className="bg-teal-50 text-teal-800 border border-teal-200/40 font-mono text-[7px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
            Our DNA
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-teal-950">
            The AutoNova Code
          </h2>
          <p className="text-xs md:text-sm text-zinc-500 max-w-xl mx-auto font-medium pt-2">
            The foundation of high-velocity automotive intelligence remains absolute.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Integrity */}
          <div className="p-8 bg-white rounded-3xl border border-zinc-200/50 hover:border-teal-700 text-center hover:scale-[1.03] transition-all duration-300 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div className="w-14 h-14 bg-teal-950 text-teal-400 rounded-full flex items-center justify-center mx-auto border border-teal-900 shadow-inner">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-sm md:text-base font-extrabold text-teal-950">Integrity</h3>
                <p className="font-body-md text-xs text-zinc-500 leading-relaxed font-medium">
                  We believe truth shouldn't be a premium subscription feature. Data integrity is the uncompromised default state of our ledger network.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-zinc-100/80 mt-4 font-mono text-[8px] text-zinc-400 font-bold uppercase tracking-wider">
              PROTOCOL // ZERO-ASYMMETRY
            </div>
          </div>

          {/* Innovation */}
          <div className="p-8 bg-white rounded-3xl border border-teal-600/50 hover:border-teal-700 text-center hover:scale-[1.03] transition-all duration-300 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-teal-600 text-white font-mono text-[6px] font-black tracking-widest px-2 py-0.5 rounded-bl uppercase">
              ACTIVE
            </div>
            <div className="space-y-6">
              <div className="w-14 h-14 bg-teal-50 text-teal-700 rounded-full flex items-center justify-center mx-auto border border-teal-100 shadow-md">
                <Zap className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-sm md:text-base font-extrabold text-teal-950">Innovation</h3>
                <p className="font-body-md text-xs text-zinc-500 leading-relaxed font-medium">
                  The status quo is our sole competitor. We build and release functional micro-features weekly that permanently redefine what is possible in automotive commerce.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-zinc-100/80 mt-4 font-mono text-[8px] text-teal-700 font-bold uppercase tracking-wider">
              PROTOCOL // VELOCITY-SPEED
            </div>
          </div>

          {/* Precision */}
          <div className="p-8 bg-white rounded-3xl border border-zinc-200/50 hover:border-teal-700 text-center hover:scale-[1.03] transition-all duration-300 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div className="w-14 h-14 bg-purple-50 text-purple-700 rounded-full flex items-center justify-center mx-auto border border-purple-100 shadow-inner">
                <Target className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-sm md:text-base font-extrabold text-teal-950">Precision</h3>
                <p className="font-body-md text-xs text-zinc-500 leading-relaxed font-medium">
                  "Near enough" is a failure state. Our valuation networks process over 35 sensory telemetry matrices to keep errors near complete mathematical zero.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-zinc-100/80 mt-4 font-mono text-[8px] text-zinc-400 font-bold uppercase tracking-wider">
              PROTOCOL // ZERO-VARIANCE
            </div>
          </div>

        </div>
      </section>

      {/* 7. CAREERS SECTION: Sandbox Job openings and mock application */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="bg-teal-950 text-white rounded-[32px] p-8 md:p-12 relative overflow-hidden border border-teal-900 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/5 rounded-full blur-[90px]" />
          
          <div className="max-w-3xl space-y-8 relative">
            <div className="space-y-3">
              <span className="font-mono text-[8.5px] font-black text-teal-400 tracking-widest uppercase">
                WE ARE EXPANDING
              </span>
              <h2 className="font-display text-2xl md:text-4xl font-extrabold tracking-tight">
                Join the Kinetic Revolution
              </h2>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-xl font-medium">
                We are actively looking for exceptional engineers, interaction designers, and quantitative researchers to expand our global pods in London, Lagos, and Tokyo.
              </p>
            </div>

            {/* Jobs List accordion */}
            <div className="space-y-3">
              {CAREER_OPENINGS.map((job) => {
                const isOpen = selectedJob?.id === job.id;
                return (
                  <div 
                    key={job.id} 
                    className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => {
                        AutoNovaAudio.playClick();
                        setSelectedJob(isOpen ? null : job);
                      }}
                      className="w-full px-5 py-4 text-left flex justify-between items-center cursor-pointer hover:bg-zinc-900/90 transition-all"
                    >
                      <div>
                        <h4 className="font-display text-xs md:text-sm font-bold text-white">{job.title}</h4>
                        <div className="flex gap-4 pt-1 text-[9px] text-zinc-400 font-mono font-bold uppercase">
                          <span>{job.department}</span>
                          <span>•</span>
                          <span className="text-teal-400">{job.location}</span>
                        </div>
                      </div>
                      <span className={`font-mono text-[10px] text-teal-400 font-bold uppercase transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        [ {isOpen ? 'CLOSE' : 'VIEW'} ]
                      </span>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 border-t border-zinc-800/80 space-y-4 text-xs">
                            <div className="space-y-1">
                              <span className="font-mono text-[8px] font-bold text-zinc-500 block">BASE COMPMATRIX:</span>
                              <p className="text-teal-300 font-bold font-mono">{job.salary}</p>
                            </div>
                            
                            <div className="space-y-1">
                              <span className="font-mono text-[8px] font-bold text-zinc-500 block">ROLE PROFILE:</span>
                              <p className="text-zinc-400 leading-relaxed font-medium">{job.description}</p>
                            </div>

                            <div className="space-y-2">
                              <span className="font-mono text-[8px] font-bold text-zinc-500 block uppercase">Requirements Metrics:</span>
                              <ul className="list-disc pl-4 space-y-1 text-zinc-400 font-medium">
                                {job.requirements.map((req, rIdx) => (
                                  <li key={rIdx}>{req}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="pt-2">
                              <button
                                onClick={() => {
                                  AutoNovaAudio.playSuccess();
                                  setIsApplyOpen(true);
                                }}
                                className="w-full bg-teal-500 hover:bg-teal-400 text-teal-950 font-mono text-[10px] font-bold tracking-wider py-2.5 rounded-xl transition-all cursor-pointer"
                              >
                                TRANSMIT PROFILE TO POD
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 8. MODALS & SUB-COMPONENTS */}

      {/* WATCH VIDEO DIALOG */}
      <AnimatePresence>
        {isVideoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-900 border border-zinc-800 rounded-[32px] w-full max-w-3xl overflow-hidden shadow-2xl relative"
            >
              <div className="p-5 flex justify-between items-center border-b border-zinc-800 bg-zinc-950/50">
                <div className="flex items-center gap-2">
                  <span className="p-1 bg-teal-950 text-teal-400 rounded-lg border border-teal-900">
                    <Rocket className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-display text-xs font-bold text-white">AutoNova: Kinetic Uplink</h3>
                    <p className="font-mono text-[7px] text-zinc-500 font-black uppercase tracking-widest">MISSION BRIEF // 2026</p>
                  </div>
                </div>
                <button 
                  onClick={handleCloseVideo}
                  className="p-1.5 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Simulated Video Broadcast Screen */}
              <div className="aspect-video bg-zinc-950 flex flex-col justify-between p-6 relative overflow-hidden group">
                {/* Visual Scanner Grid overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 via-transparent to-purple-500/5 pointer-events-none" />
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-red-600/90 text-white font-mono text-[7px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                  <span className="h-1.5 w-1.5 bg-white rounded-full animate-ping" />
                  BROADCASTING
                </div>

                {/* Simulated Visual Waveform */}
                <div className="flex-1 flex items-center justify-center">
                  {videoPlaying ? (
                    <div className="flex items-end gap-1 h-12">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div 
                          key={i} 
                          style={{ height: `${Math.random() * 100}%` }}
                          className="w-1 bg-gradient-to-t from-teal-500 to-purple-500 rounded-full animate-pulse transition-all duration-300"
                        />
                      ))}
                    </div>
                  ) : (
                    <button 
                      onClick={() => {
                        AutoNovaAudio.playSuccess();
                        setVideoPlaying(true);
                      }}
                      className="w-16 h-16 rounded-full bg-teal-500 text-teal-950 flex items-center justify-center shadow-lg hover:scale-110 hover:bg-teal-400 transition-all cursor-pointer"
                    >
                      <Play className="h-6 w-6 fill-current translate-x-0.5 text-teal-950" />
                    </button>
                  )}
                </div>

                {/* Caption Subtitles Block */}
                <div className="bg-zinc-900/95 border border-zinc-800 rounded-2xl p-4 text-center">
                  <p className="font-mono text-[10px] text-teal-400 font-bold uppercase tracking-wider mb-1">
                    [ SUBTITLES SYNCED ]
                  </p>
                  <p className="text-xs text-white leading-relaxed font-medium">
                    "{currentCaption}"
                  </p>
                </div>
              </div>

              {/* Progress and controls bar */}
              <div className="p-5 border-t border-zinc-800/80 bg-zinc-950/50 flex flex-col gap-3">
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${videoProgress}%` }}
                    className="h-full bg-gradient-to-r from-teal-500 to-purple-600 transition-all duration-300"
                  />
                </div>
                <div className="flex justify-between items-center font-mono text-[9px] text-zinc-500">
                  <div className="flex gap-4">
                    <button 
                      onClick={() => {
                        AutoNovaAudio.playClick();
                        setVideoPlaying(!videoPlaying);
                      }}
                      className="text-teal-400 hover:underline font-bold cursor-pointer"
                    >
                      {videoPlaying ? 'PAUSE BROADCAST' : 'RESUME BROADCAST'}
                    </button>
                    <button 
                      onClick={() => {
                        AutoNovaAudio.playClick();
                        setVideoProgress(0);
                        setVideoPlaying(true);
                      }}
                      className="hover:underline cursor-pointer"
                    >
                      RESTART
                    </button>
                  </div>
                  <span>PROGRESS TRACKING // {Math.round(videoProgress)}% COMPLETE</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TEAM MEMBER DETAIL MODAL */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-zinc-200 rounded-[32px] w-full max-w-xl overflow-hidden shadow-2xl relative"
            >
              <button 
                onClick={() => {
                  AutoNovaAudio.playClick();
                  setSelectedMember(null);
                }}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-zinc-100 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-200 transition-all cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="p-6 md:p-8 space-y-6">
                
                {/* Header Profile Info */}
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-100 overflow-hidden shrink-0 border border-zinc-200">
                    <img 
                      src={selectedMember.avatar} 
                      alt={selectedMember.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-mono text-[8px] bg-teal-50 text-teal-800 font-black px-2 py-0.5 rounded uppercase tracking-wider">
                      {selectedMember.specialty}
                    </span>
                    <h3 className="font-display text-base font-extrabold text-teal-950 pt-1">
                      {selectedMember.name}
                    </h3>
                    <p className="font-mono text-[10px] text-zinc-400 font-black uppercase tracking-wider">
                      {selectedMember.role}
                    </p>
                  </div>
                </div>

                {/* Inspirational Quote */}
                <blockquote className="border-l-2 border-teal-600 pl-4 py-1 italic text-teal-950 font-medium text-xs md:text-sm bg-teal-50/20 rounded-r-xl pr-3">
                  "{selectedMember.quote}"
                </blockquote>

                {/* Bio text */}
                <div className="space-y-4">
                  <span className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest block">
                    BIOGRAPHY LOGS
                  </span>
                  <p className="text-zinc-600 text-xs leading-relaxed font-medium">
                    {selectedMember.bio}
                  </p>
                </div>

                {/* Mini details list */}
                <div className="grid grid-cols-2 gap-4 border-t border-zinc-100 pt-4 font-mono text-[9px] font-bold text-zinc-500">
                  <div>
                    <span className="text-[7.5px] text-zinc-400 block uppercase">Curated Machine Choice:</span>
                    <span className="text-teal-950 font-bold">{selectedMember.favoriteCar}</span>
                  </div>
                  <div>
                    <span className="text-[7.5px] text-zinc-400 block uppercase">Protocol Clearance:</span>
                    <span className="text-purple-600">LEVEL_5_ADMIN</span>
                  </div>
                </div>

                {/* Connect Buttons */}
                <div className="pt-2 flex gap-3">
                  <button 
                    onClick={() => {
                      AutoNovaAudio.playSuccess();
                      showNotification(`Compiling encrypted dispatch link to ${selectedMember.name}...`, "info");
                    }}
                    className="flex-1 bg-teal-950 hover:bg-teal-900 text-white font-mono text-[10px] font-bold tracking-wider py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    CONTACT PROTOCOL
                  </button>
                  <button 
                    onClick={() => {
                      AutoNovaAudio.playClick();
                      showNotification("Redirecting to external publication vault...", "info");
                    }}
                    className="flex-1 border border-zinc-200 hover:border-teal-700 hover:bg-teal-50 text-teal-950 font-mono text-[10px] font-bold tracking-wider py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Globe className="h-3.5 w-3.5 text-teal-700" />
                    RESEARCH VAULT
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* JOB APPLICATION MODAL OVERLAY */}
      <AnimatePresence>
        {isApplyOpen && selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-zinc-200 rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl relative"
            >
              <div className="p-5 flex justify-between items-center border-b border-zinc-100 bg-zinc-50/50">
                <div className="flex items-center gap-2">
                  <span className="p-1 bg-teal-950 text-teal-400 rounded-lg border border-teal-900">
                    <FileText className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-display text-xs font-bold text-teal-950">Neural Ingress Protocol</h3>
                    <p className="font-mono text-[7px] text-zinc-500 font-black uppercase tracking-widest">Job Application Ledger Entry</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    AutoNovaAudio.playClick();
                    setIsApplyOpen(false);
                  }}
                  className="p-1.5 rounded-full bg-zinc-100 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-200 transition-all cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {applySubmitted ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto border border-teal-100 shadow-md">
                    <CheckCircle2 className="h-8 w-8 animate-bounce" />
                  </div>
                  <h3 className="font-display text-base font-extrabold text-teal-950">Ingress Sequence Initialized!</h3>
                  <p className="text-xs text-zinc-500 max-w-xs mx-auto leading-relaxed font-medium">
                    Your candidate profile has been cryptographically compiled and broadcasted to the AutoNova Talent Pod.
                  </p>
                  <div className="font-mono text-[9px] text-zinc-400 bg-zinc-50 rounded-xl p-3 border border-zinc-100 uppercase tracking-widest">
                    LEDGER RECEIPT: ANT-JOB-{Math.floor(Math.random() * 10000000)}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="p-6 md:p-8 space-y-4">
                  
                  <div className="bg-teal-50 border border-teal-100/50 rounded-xl p-4 text-[11px] text-teal-950 leading-relaxed font-medium">
                    <span className="font-bold font-mono text-[8px] block uppercase text-teal-800">Target Role:</span>
                    {selectedJob.title} — <span className="font-mono font-bold text-[9px] uppercase">{selectedJob.location}</span>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[8px] font-bold text-zinc-500 block uppercase">Candidate Identity Name</label>
                    <input 
                      type="text" 
                      required
                      value={applyForm.name}
                      onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                      className="w-full text-xs bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
                      placeholder="e.g. Alex Mercer"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[8px] font-bold text-zinc-500 block uppercase">Uplink Electronic Mail</label>
                    <input 
                      type="email" 
                      required
                      value={applyForm.email}
                      onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                      className="w-full text-xs bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-teal-600"
                      placeholder="e.g. alex@neural.io"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[8px] font-bold text-zinc-500 block uppercase">Chassis Pitch Statement (Cover Pitch)</label>
                    <textarea 
                      required
                      rows={3}
                      value={applyForm.pitch}
                      onChange={(e) => setApplyForm({ ...applyForm, pitch: e.target.value })}
                      className="w-full text-xs bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-teal-600 resize-none"
                      placeholder="e.g. Briefly describe why you are excited to optimize predictive valuation or kinetic user experiences..."
                    />
                  </div>

                  {/* Mock resume upload */}
                  <div className="space-y-1">
                    <label className="font-mono text-[8px] font-bold text-zinc-500 block uppercase">CV / Biography Ledger File</label>
                    <button
                      type="button"
                      onClick={() => {
                        AutoNovaAudio.playSuccess();
                        setApplyForm({
                          ...applyForm,
                          resumeUploaded: true,
                          resumeName: 'curriculum_vitae_sealed_envelope.pdf'
                        });
                        showNotification("Encrypted ledger attachment locked.", "success");
                      }}
                      className="w-full bg-zinc-50 hover:bg-zinc-100 border border-dashed border-zinc-300 rounded-xl py-4 text-center cursor-pointer flex flex-col items-center justify-center space-y-1"
                    >
                      {applyForm.resumeUploaded ? (
                        <>
                          <CheckCircle2 className="h-5 w-5 text-teal-600" />
                          <span className="text-xs font-bold text-teal-950">{applyForm.resumeName}</span>
                          <span className="font-mono text-[7px] text-zinc-400 uppercase font-black">CLICK TO ENCRYPT AGAIN</span>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="h-5 w-5 text-zinc-400" />
                          <span className="text-[11px] font-bold text-zinc-600">Simulate Resume Ingress Upload</span>
                          <span className="font-mono text-[7px] text-zinc-400 uppercase">SUPPORTED MATRICES: PDF, MD, ZIP</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-teal-950 hover:bg-teal-900 text-white font-mono text-xs font-bold tracking-wider py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Lock className="h-3.5 w-3.5 text-teal-400" />
                    BROADCAST APPLICATIONS SECURELY
                  </button>

                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
