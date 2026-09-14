import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { AutoNovaAudio } from './AudioEngine';
import { 
  Sparkles, Check, Key, Share2, Award, ArrowRight, ShieldCheck, 
  ChevronRight, RefreshCw, Smartphone, Layers, Terminal, FileText
} from 'lucide-react';

export const SuccessPortal = ({
  userName,
  role,
  orderId,
  onRestart,
  showNotification,
  onEnterCatalog,
  onChatSeller,
}) => {
  const cardRef = useRef(null);
  
  // States for 3D card tilt
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shineX, setShineX] = useState(50);
  const [shineY, setShineY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  // Generate a mock secure hash token
  const [secureToken] = useState(() => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = 'AN-';
    for (let i = 0; i < 4; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    result += '-';
    for (let i = 0; i < 4; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    return result;
  });

  // Calculate 3D tilt vectors based on cursor offset on the card bounds
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    
    // Relative coordinates
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Percentage from center
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;
    
    // Rotation constraints (tilt angle)
    const maxRot = 16; 
    setRotateX(-(dy / yc) * maxRot);
    setRotateY((dx / xc) * maxRot);
    
    // Glow sheen position
    setShineX((x / rect.width) * 100);
    setShineY((y / rect.height) * 100);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    AutoNovaAudio.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleDownloadKey = () => {
    AutoNovaAudio.playClick();
    
    // Build secure credentials file content
    const credentialData = {
      agency: "AutoNova Intelligence Group",
      nodeToken: secureToken,
      clientKey: userName.toUpperCase().replace(/\s+/g, '_') + "_SECURE_NODE",
      clearanceLevel: role === 'Dealer' ? 'S-CLASS ADMIN' : role === 'Seller' ? 'VERIFIED LIQUIDATOR' : 'PREMIUM CLIENT',
      quantumSignature: "SHA256_00F2FF821DDA"
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(credentialData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `AutoNova_Node_${secureToken}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showNotification("Decrypted secure access keys downloaded.", "success");
  };

  const handleDownloadReceipt = () => {
    AutoNovaAudio.playClick();
    const receiptText = [
      'AUTONOVA — ORDER RECEIPT',
      '========================',
      `Order ID: ${orderId || 'N/A'}`,
      `Customer: ${userName || 'N/A'}`,
      `Date: ${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}`,
      '',
      'Thank you for your purchase.',
      'This receipt confirms your order has been placed and is being processed.',
    ].join('\n');
    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(receiptText);
    const anchor = document.createElement('a');
    anchor.setAttribute("href", dataStr);
    anchor.setAttribute("download", `AutoNova_Receipt_${orderId || 'order'}.txt`);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    showNotification("Receipt downloaded.", "success");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg p-6 md:p-8 text-center select-none bg-white rounded-3xl border border-zinc-200/80 shadow-[0_10px_40px_rgba(0,0,0,0.06)] text-zinc-900">
      
      {/* Decorative success glowing particles */}
      <div className="relative mb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-16 h-16 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center shadow-sm animate-pulse"
        >
          <ShieldCheck className="h-8 w-8 text-zinc-800" />
        </motion.div>
        
        {/* Absolute float spark rings */}
        <div className="absolute -top-1 -left-1 w-18 h-18 rounded-full border border-dashed border-zinc-200 animate-spin" style={{ animationDuration: '6s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2 mb-8"
      >
        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight uppercase leading-none">
          Access Granted
        </h2>
        <div className="font-mono text-xxs tracking-widest text-zinc-400 uppercase font-bold">
          NIGERIAN NODE MATRIX HANDSHAKE SYNCED
        </div>
        <p className="text-xs text-zinc-500 max-w-xs mx-auto font-medium leading-relaxed">
          Your unique digital automotive node has been validated and authorized on the sovereign AutoNova West Africa network.
        </p>
      </motion.div>

      {/* 3D Holographic Parallax Card */}
      <div className="perspective-1000 w-full max-w-sm mb-8 flex justify-center">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: isHovered 
              ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`
              : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transition: isHovered ? 'none' : 'transform 0.5s ease-out',
          }}
          className="relative w-80 h-48 rounded-2xl bg-zinc-950 text-left p-5 border border-zinc-800 shadow-xl overflow-hidden cursor-pointer"
        >
          {/* Speckled Holographic sheen gloss effect */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.25 : 0.05,
              background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)`,
            }}
          />

          {/* Glowing brand accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          {/* Card Top: Branding Header */}
          <div className="flex justify-between items-start">
            <div>
              <span className="font-display text-sm font-black tracking-widest text-white block">
                AUTONOVA NIGERIA
              </span>
              <span className="font-mono text-[8px] tracking-widest text-zinc-500 uppercase">
                WEST AFRICA NODE
              </span>
            </div>
            
            {/* Embedded Micro chip graphic */}
            <div className="h-7 w-9 rounded-md bg-gradient-to-br from-yellow-500/20 via-yellow-600/30 to-yellow-500/10 border border-yellow-500/40 relative flex items-center justify-center">
              <div className="grid grid-cols-3 gap-0.5 w-6 h-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="border-t border-r border-yellow-500/30 h-1" />
                ))}
              </div>
            </div>
          </div>

          {/* Card Center: Quantum token readout */}
          <div className="mt-6 flex justify-between items-end">
            <div>
              <span className="font-mono text-[7px] tracking-widest text-zinc-500 block uppercase">
                SECURE ACCESS TOKEN
              </span>
              <span className="font-mono text-xs font-bold text-white tracking-wider">
                {secureToken}
              </span>
            </div>
            <div className="text-right">
              <span className="font-mono text-[7px] tracking-widest text-zinc-500 block uppercase">
                CLEARANCE PROTOCOL
              </span>
              <span className="font-mono text-xxs font-bold text-white tracking-widest uppercase">
                {role === 'Dealer' ? 'D-CLASS NODE' : role === 'Seller' ? 'SOVEREIGN LIQUIDATOR' : 'SECURED BUYER'}
              </span>
            </div>
          </div>

          {/* Card Bottom: Holder Name */}
          <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
            <div>
              <span className="font-mono text-[7px] tracking-widest text-zinc-500 block uppercase">
                VERIFIED KEY HOLDER
              </span>
              <span className="font-display font-bold text-sm text-white tracking-tight uppercase">
                {userName || 'MEMBER NODE'}
              </span>
            </div>
            <div className="text-right flex items-center gap-1 font-mono text-[8px] text-zinc-400">
              <Award className="h-3.5 w-3.5 text-white animate-pulse" />
              <span>SERIES VII</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Next Steps Timeline — previously missing entirely */}
      <div className="w-full mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-zinc-100 -z-0" />
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '50%' }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-4 left-0 h-0.5 bg-teal-700 -z-0"
          />
          {[
            { label: 'Processing', icon: <Check className="h-3.5 w-3.5" />, done: true },
            { label: 'Documentation', icon: <FileText className="h-3.5 w-3.5" />, done: false, current: true },
            { label: 'Delivery / Pickup', icon: <Award className="h-3.5 w-3.5" />, done: false },
          ].map((step) => (
            <div key={step.label} className="relative z-10 flex flex-col items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step.done ? 'bg-teal-700 border-teal-700 text-white'
                : step.current ? 'bg-white border-teal-700 text-teal-700 animate-pulse'
                : 'bg-white border-zinc-200 text-zinc-300'
              }`}>
                {step.icon}
              </div>
              <span className={`font-mono text-[8px] font-bold uppercase tracking-wider text-center ${step.done || step.current ? 'text-teal-950' : 'text-zinc-300'}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Primary actions list */}
      <div className="w-full space-y-3">
        <button
          onClick={() => { AutoNovaAudio.playSuccess(); onEnterCatalog(); }}
          onMouseEnter={() => AutoNovaAudio.playHover()}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-teal-700 hover:bg-teal-800 border border-teal-950 rounded-xl font-mono text-xs font-extrabold tracking-wider text-white transition-all cursor-pointer shadow-md glow-cyan hover:scale-[1.01]"
        >
          <Sparkles className="h-4 w-4 text-teal-200 animate-pulse" />
          <span>ENTER CATALOG SHOWROOM</span>
        </button>

        <button
          onClick={handleDownloadReceipt}
          onMouseEnter={() => AutoNovaAudio.playHover()}
          className="w-full flex items-center justify-center gap-2 py-3 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-xl font-mono text-[11px] font-bold tracking-wider text-teal-950 transition-all cursor-pointer shadow-sm"
        >
          <FileText className="h-3.5 w-3.5 text-teal-700" />
          <span>DOWNLOAD RECEIPT</span>
        </button>

        <button
          onClick={() => { AutoNovaAudio.playClick(); if (onChatSeller) onChatSeller(); }}
          onMouseEnter={() => AutoNovaAudio.playHover()}
          className="w-full flex items-center justify-center gap-2 py-3 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-xl font-mono text-[11px] font-bold tracking-wider text-teal-950 transition-all cursor-pointer shadow-sm"
        >
          <Smartphone className="h-3.5 w-3.5 text-teal-700" />
          <span>CHAT WITH SELLER</span>
        </button>

        <button
          onClick={handleDownloadKey}
          onMouseEnter={() => AutoNovaAudio.playHover()}
          className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-950 rounded-xl font-mono text-[11px] font-bold tracking-wider text-white transition-all cursor-pointer shadow-md"
        >
          <Key className="h-3.5 w-3.5 text-zinc-300" />
          <span>DECRYPT & DOWNLOAD CREDENTIALS</span>
        </button>

        <button
          onClick={onRestart}
          onMouseEnter={() => AutoNovaAudio.playHover()}
          className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-xl font-mono text-[11px] font-bold tracking-wider text-zinc-600 hover:text-zinc-900 transition-all cursor-pointer shadow-sm"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>RE-ESTABLISH CONNECTION</span>
        </button>
      </div>

      {/* Post-purchase suggestions — previously missing entirely */}
      <div className="w-full grid grid-cols-2 gap-2.5 pt-1">
        <button
          onClick={() => { AutoNovaAudio.playClick(); showNotification("Insurance quotes coming soon.", "info"); }}
          className="py-2.5 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/70 rounded-xl font-mono text-[9px] font-bold tracking-wider text-zinc-500 hover:text-teal-950 transition-all cursor-pointer"
        >
          + Add Insurance
        </button>
        <button
          onClick={() => { AutoNovaAudio.playClick(); if (onEnterCatalog) onEnterCatalog(); }}
          className="py-2.5 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/70 rounded-xl font-mono text-[9px] font-bold tracking-wider text-zinc-500 hover:text-teal-950 transition-all cursor-pointer"
        >
          Browse Accessories
        </button>
      </div>

      {/* Tiny compliance telemetry */}
      <div className="mt-6 flex justify-center items-center gap-2.5 text-[9px] font-mono text-zinc-400 font-semibold">
        <span>LEDGER ANCHOR: ETH_SHA256</span>
        <span>•</span>
        <span>GATEWAY: ACCREDITED NIGERIA</span>
      </div>
    </div>
  );
};

export default SuccessPortal;
