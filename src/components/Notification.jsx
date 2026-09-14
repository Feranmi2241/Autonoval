import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, ShieldCheck, ShieldAlert, X } from 'lucide-react';

export const Notification = ({
  message,
  type,
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const config = {
    success: {
      color: 'border-emerald-200 bg-white/95 text-zinc-900 shadow-[0_10px_40px_rgba(16,185,129,0.15)]',
      icon: <ShieldCheck className="h-4 w-4 text-emerald-500" />,
      tag: 'Success'
    },
    error: {
      color: 'border-red-200 bg-white/95 text-zinc-900 shadow-[0_10px_40px_rgba(239,68,68,0.15)]',
      icon: <ShieldAlert className="h-4 w-4 text-red-500" />,
      tag: 'Something went wrong'
    },
    info: {
      color: 'border-teal-200 bg-white/95 text-zinc-900 shadow-[0_10px_40px_rgba(0,229,255,0.15)]',
      icon: <Terminal className="h-4 w-4 text-teal-600" />,
      tag: 'Notice'
    }
  }[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-6 right-6 z-50 flex items-start gap-3 rounded-xl border p-4 backdrop-blur-xl ${config.color} max-w-sm w-full`}
    >
      <div className="flex-shrink-0 mt-0.5">{config.icon}</div>
      <div className="flex-grow">
        <div className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase leading-none mb-1 font-bold">
          {config.tag}
        </div>
        <p className="text-xs font-sans font-semibold leading-relaxed">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="text-zinc-400 hover:text-zinc-800 transition-colors flex-shrink-0 cursor-pointer"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
};
