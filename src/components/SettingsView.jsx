import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AutoNovaAudio } from './AudioEngine';
import { 
  User, Shield, Bell, CreditCard, Brain, Trash2, ArrowLeft, Bookmark, 
  ShoppingBag, Calendar, MessageSquare, LogOut, Sparkles, Check, 
  Phone, Video, Info, Lock, Key, Laptop, Smartphone, Plus, 
  RefreshCw, HelpCircle, Settings, Camera, Mail, ShieldAlert, 
  AlertTriangle, CreditCard as CardIcon
} from 'lucide-react';

export const SettingsView = ({
  userName = "Alexander Vance",
  role = "Client",
  onNavigateToView,
  onBackToGate,
  showNotification
}) => {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'security' | 'notifications' | 'payment' | 'ai' | 'danger'
  
  // Profile state
  const [profileData, setProfileData] = useState({
    fullName: userName,
    displayName: "alexander_vance_kinetic",
    email: "alexander.vance@autonova-kinetic.com",
    phone: "+1 (555) 012-3456"
  });

  // Password state
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  // Toggles state
  const [twoFactor, setTwoFactor] = useState(true);
  const [notificationPreferences, setNotificationPreferences] = useState({
    priceDrops: true,
    aiRecommendations: true,
    newMessages: true,
    accountSecurity: true
  });

  // Cards state
  const [cards, setCards] = useState([
    {
      id: 'card-1',
      type: 'Visa',
      last4: '4242',
      holder: 'ALEXANDER VANCE',
      expiry: '12/28',
      color: 'from-[#002a2d] to-[#004f54]'
    },
    {
      id: 'card-2',
      type: 'Mastercard',
      last4: '8888',
      holder: 'ALEXANDER VANCE',
      expiry: '09/27',
      color: 'from-zinc-800 to-zinc-950'
    }
  ]);

  const [newCard, setNewCard] = useState({
    number: "",
    holder: "",
    expiry: "",
    cvv: ""
  });
  const [showAddCard, setShowAddCard] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleProfileSave = (e) => {
    e.preventDefault();
    AutoNovaAudio.playSuccess();
    showNotification("Profile credentials synchronized to secure ledger.", "success");
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      showNotification("Please complete all password fields.", "error");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      showNotification("New password confirmations do not match.", "error");
      return;
    }
    AutoNovaAudio.playSuccess();
    setPasswords({ current: "", new: "", confirm: "" });
    showNotification("Cryptographic passcode updated successfully.", "success");
  };

  const handleAddCardSubmit = (e) => {
    e.preventDefault();
    if (!newCard.number || !newCard.holder || !newCard.expiry) {
      showNotification("Please fill in card details.", "error");
      return;
    }
    AutoNovaAudio.playSuccess();
    const last4 = newCard.number.slice(-4) || "4321";
    setCards([
      ...cards,
      {
        id: `card-${Date.now()}`,
        type: newCard.number.startsWith('5') ? 'Mastercard' : 'Visa',
        last4,
        holder: newCard.holder.toUpperCase(),
        expiry: newCard.expiry,
        color: 'from-teal-900 to-teal-950'
      }
    ]);
    setNewCard({ number: "", holder: "", expiry: "", cvv: "" });
    setShowAddCard(false);
    showNotification("New secure payment gateway registered.", "success");
  };

  const handleDeleteCard = (id) => {
    AutoNovaAudio.playClick();
    setCards(cards.filter(c => c.id !== id));
    showNotification("Payment credential removed safely.", "info");
  };

  return (
    <div className="flex-grow flex flex-col lg:flex-row relative bg-zinc-50">
      
      {/* SIDEBAR FOR DESKTOP USER INFO */}
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
            onClick={() => { AutoNovaAudio.playClick(); }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-teal-50/80 text-teal-950 border-r-4 border-teal-800 font-bold transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </div>
          </button>
        </nav>

        <div className="pt-6 mt-6 border-t border-zinc-100 space-y-4">
          <button 
            onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('assistant'); }}
            className="w-full py-3 bg-teal-950 hover:bg-teal-900 text-white rounded-xl font-mono text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
          >
            <Sparkles className="h-3.5 w-3.5 text-teal-400" />
            <span>AI Concierge</span>
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

      {/* CORE SETTINGS HUB */}
      <main className="flex-grow px-4 py-10 md:px-12 max-w-5xl mx-auto w-full flex flex-col md:flex-row gap-10">
        
        {/* INNER NAVIGATION TABS (Sidebar Shell) */}
        <nav className="w-full md:w-64 flex flex-col gap-1.5 py-4 shrink-0">
          <div className="mb-6">
            <div 
              className="flex items-center gap-3 mb-2 text-zinc-400 hover:text-teal-800 cursor-pointer transition-colors"
              onClick={() => onNavigateToView('portfolio')}
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-mono text-[9px] font-black uppercase tracking-widest">Back to Member Hub</span>
            </div>
            <h2 className="font-display font-black text-xl text-teal-950 leading-tight">Settings</h2>
            <p className="text-xs text-zinc-500 mt-1 font-medium">Manage your precision experience</p>
          </div>

          <button 
            onClick={() => { AutoNovaAudio.playClick(); setActiveTab('profile'); }}
            className={`flex items-center gap-3.5 py-3.5 px-4 rounded-xl text-left font-mono text-[9.5px] font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-teal-950 text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100/50'
            }`}
          >
            <User className="h-4 w-4" />
            <span>Profile Info</span>
          </button>

          <button 
            onClick={() => { AutoNovaAudio.playClick(); setActiveTab('security'); }}
            className={`flex items-center gap-3.5 py-3.5 px-4 rounded-xl text-left font-mono text-[9.5px] font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'bg-teal-950 text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100/50'
            }`}
          >
            <Shield className="h-4 w-4" />
            <span>Security Ledger</span>
          </button>

          <button 
            onClick={() => { AutoNovaAudio.playClick(); setActiveTab('notifications'); }}
            className={`flex items-center gap-3.5 py-3.5 px-4 rounded-xl text-left font-mono text-[9.5px] font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'notifications'
                ? 'bg-teal-950 text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100/50'
            }`}
          >
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </button>

          <button 
            onClick={() => { AutoNovaAudio.playClick(); setActiveTab('payment'); }}
            className={`flex items-center gap-3.5 py-3.5 px-4 rounded-xl text-left font-mono text-[9.5px] font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'payment'
                ? 'bg-teal-950 text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100/50'
            }`}
          >
            <CreditCard className="h-4 w-4" />
            <span>Payment Methods</span>
          </button>

          <button 
            onClick={() => { AutoNovaAudio.playClick(); setActiveTab('ai'); }}
            className={`flex items-center gap-3.5 py-3.5 px-4 rounded-xl text-left font-mono text-[9.5px] font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'ai'
                ? 'bg-teal-950 text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100/50'
            }`}
          >
            <Brain className="h-4 w-4" />
            <span>AI Preferences</span>
          </button>

          <div className="my-4 h-px bg-zinc-200/50" />

          <button 
            onClick={() => { AutoNovaAudio.playClick(); setActiveTab('danger'); }}
            className={`flex items-center gap-3.5 py-3.5 px-4 rounded-xl text-left font-mono text-[9.5px] font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'danger'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'text-zinc-400 hover:text-red-700 hover:bg-red-50/50'
            }`}
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Danger Zone</span>
          </button>
        </nav>

        {/* MAIN PANEL CONTENT */}
        <div className="flex-1 bg-white rounded-3xl border border-zinc-200/60 shadow-sm p-6 md:p-10 min-h-[550px] overflow-hidden">
          
          <AnimatePresence mode="wait">
            
            {/* PROFILE TABS PANEL */}
            {activeTab === 'profile' && (
              <motion.div
                key="profile-tab"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-8"
              >
                <div className="flex flex-col sm:flex-row items-center gap-8 pb-6 border-b border-zinc-100">
                  <div className="relative group cursor-pointer shrink-0">
                    <div className="w-28 h-28 rounded-3xl overflow-hidden ring-4 ring-teal-700/10">
                      <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCP5Tf4DtOB_yO-7KuXFToKz-AVlE5p7Xczay0r7Z8qSlqknOvzvlSmJ83Tn0I7ZpEPFMC0Su0hEporaDqsm4pkrypgm7TZK-ZRKIZKj5FajonuNjbzAqWh929i8hyI0lsmvYmvgTnYsCjwkv8Mu501oWdjEKTiJgi6N8PGBzgnT3avNebJvINZ8RD6-bK_cX2OZHeb1EyjExG4dUx1uKS4m_gG-FiJESYkk9_-UsrHgNsobB_Jpsdbmo6dTXKZjNeNbl2jDSNjMLu"
                        alt={userName}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-teal-950/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl">
                      <Camera className="h-5 w-5 text-teal-400" />
                    </div>
                  </div>
                  
                  <div className="text-center sm:text-left">
                    <h3 className="font-display font-black text-teal-950 text-base">Profile Photo</h3>
                    <p className="text-xs text-zinc-500 mt-1 max-w-xs leading-relaxed">
                      Update your digital face. Authenticated biometric ledger synchronization active.
                    </p>
                    <div className="flex gap-2.5 mt-4 justify-center sm:justify-start">
                      <button 
                        type="button"
                        onClick={() => { AutoNovaAudio.playClick(); showNotification("Scanning local storage for portfolio assets...", "info"); }}
                        className="px-4 py-2.5 bg-teal-950 hover:bg-teal-900 text-white rounded-xl font-mono text-[8.5px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-xs active:scale-98"
                      >
                        Upload custom file
                      </button>
                      <button 
                        type="button"
                        onClick={() => { AutoNovaAudio.playClick(); showNotification("Default silhouette loaded.", "info"); }}
                        className="px-4 py-2.5 border border-zinc-200 hover:border-zinc-300 text-zinc-600 rounded-xl font-mono text-[8.5px] font-black uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleProfileSave} className="space-y-6 max-w-xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[8px] font-black text-zinc-400 uppercase tracking-widest">Full Name</label>
                      <input 
                        type="text" 
                        value={profileData.fullName}
                        onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-200 focus:ring-1 focus:ring-teal-700/30 rounded-xl px-4 py-2.5 text-xs font-semibold text-zinc-800"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[8px] font-black text-zinc-400 uppercase tracking-widest">Display Username</label>
                      <input 
                        type="text" 
                        value={profileData.displayName}
                        onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-200 focus:ring-1 focus:ring-teal-700/30 rounded-xl px-4 py-2.5 text-xs font-semibold text-zinc-800"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[8px] font-black text-zinc-400 uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 focus:ring-1 focus:ring-teal-700/30 rounded-xl px-4 py-2.5 text-xs font-semibold text-zinc-800"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[8px] font-black text-zinc-400 uppercase tracking-widest">Phone Number</label>
                    <input 
                      type="tel" 
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 focus:ring-1 focus:ring-teal-700/30 rounded-xl px-4 py-2.5 text-xs font-semibold text-zinc-800"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-teal-800 hover:bg-teal-900 text-white rounded-xl font-mono text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer shadow-md active:scale-98 flex items-center gap-1.5"
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* SECURITY TABS PANEL */}
            {activeTab === 'security' && (
              <motion.div
                key="security-tab"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="font-display font-black text-teal-950 text-base mb-1">Passcode Ledger</h3>
                  <p className="text-xs text-zinc-400 font-medium mb-6">Upgrade your cryptographic ledger entry keys.</p>
                  
                  <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-md">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[8px] font-black text-zinc-400 uppercase tracking-widest">Current Key</label>
                      <input 
                        type="password" 
                        placeholder="••••••••••••••"
                        value={passwords.current}
                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-200 focus:ring-1 focus:ring-teal-700/30 rounded-xl px-4 py-2.5 text-xs font-semibold"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[8px] font-black text-zinc-400 uppercase tracking-widest">New Passphrase</label>
                      <input 
                        type="password" 
                        placeholder="Enter premium complex passphrase"
                        value={passwords.new}
                        onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-200 focus:ring-1 focus:ring-teal-700/30 rounded-xl px-4 py-2.5 text-xs font-semibold"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[8px] font-black text-zinc-400 uppercase tracking-widest">Confirm New Passphrase</label>
                      <input 
                        type="password" 
                        placeholder="Re-enter for security parity"
                        value={passwords.confirm}
                        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-200 focus:ring-1 focus:ring-teal-700/30 rounded-xl px-4 py-2.5 text-xs font-semibold"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-teal-950 hover:bg-teal-900 text-white rounded-xl font-mono text-[8.5px] font-black uppercase tracking-widest transition-all cursor-pointer shadow-xs"
                    >
                      Update Passcode
                    </button>
                  </form>
                </div>

                <div className="pt-6 border-t border-zinc-100">
                  <div className="flex items-center justify-between p-5 bg-zinc-50 rounded-2xl border border-zinc-200/50">
                    <div>
                      <h4 className="font-display font-black text-teal-950 text-sm">Two-Factor Biometrics</h4>
                      <p className="text-xs text-zinc-400 font-medium mt-0.5">Enforce SMS or physical security keys on high-value bidding locks.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => { AutoNovaAudio.playClick(); setTwoFactor(prev => !prev); showNotification(twoFactor ? "Two-factor authentication disabled." : "Two-factor authentication enabled.", "info"); }}
                      className={`relative w-12 h-6.5 rounded-full transition-colors cursor-pointer shrink-0 ${twoFactor ? 'bg-teal-800' : 'bg-zinc-200'}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 bg-white w-5.5 h-5.5 rounded-full transition-all shadow-sm ${twoFactor ? 'translate-x-5.5' : ''}`} />
                    </button>
                  </div>

                  <AnimatePresence>
                    {twoFactor && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 p-5 bg-teal-50/40 border border-teal-100 rounded-2xl space-y-4">
                          <p className="text-xs font-semibold text-teal-900">Choose your second verification method:</p>
                          <div className="grid grid-cols-2 gap-3">
                            {['SMS Code', 'Authenticator App'].map((method) => (
                              <button
                                key={method}
                                type="button"
                                onClick={() => { AutoNovaAudio.playClick(); showNotification(`${method} set as your verification method.`, "success"); }}
                                className="p-3 rounded-xl border border-teal-200 bg-white hover:bg-teal-50 text-xs font-bold text-teal-950 cursor-pointer transition-all text-left"
                              >
                                {method}
                              </button>
                            ))}
                          </div>
                          <p className="text-[10px] text-zinc-400 font-medium">You'll be asked for this code any time you sign in from a new device.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <h4 className="font-display font-black text-teal-950 text-sm mb-4">Active Node Ledger</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-zinc-50 border border-zinc-200/60 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
                          <Laptop className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold text-xs text-zinc-800">Chrome on macOS Monterey</p>
                          <p className="font-mono text-[7.5px] text-zinc-400 font-extrabold uppercase tracking-wider mt-0.5">San Francisco, CA • Active Now</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 bg-teal-50 border border-teal-100 text-teal-800 rounded-full font-mono text-[7.5px] font-extrabold uppercase tracking-widest">
                        Current Node
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-zinc-50 border border-zinc-200/60 rounded-xl opacity-60">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-500 flex items-center justify-center">
                          <Smartphone className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold text-xs text-zinc-800">AutoNova iOS Secure Mobile App</p>
                          <p className="font-mono text-[7.5px] text-zinc-400 font-extrabold uppercase tracking-wider mt-0.5">Beverly Hills, CA • 2h ago</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => { AutoNovaAudio.playClick(); showNotification("Disassociated mobile node token.", "success"); }}
                        className="text-zinc-400 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 cursor-pointer"
                        title="De-authorize node"
                      >
                        <LogOut className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Linked Accounts — previously missing entirely */}
                <div className="pt-6 border-t border-zinc-100">
                  <h4 className="font-display font-black text-teal-950 text-sm mb-1">Linked Accounts</h4>
                  <p className="text-xs text-zinc-400 font-medium mb-4">Connect social accounts for faster sign-in.</p>
                  <div className="space-y-2.5">
                    {[
                      { id: 'google', label: 'Google', connected: true },
                      { id: 'apple', label: 'Apple', connected: false },
                      { id: 'facebook', label: 'Facebook', connected: false },
                    ].map((acct) => (
                      <div key={acct.id} className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-200/50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-[10px] font-black text-teal-950">
                            {acct.label.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-teal-950">{acct.label}</p>
                            <p className="text-[10px] text-zinc-400 font-medium">{acct.connected ? 'Connected' : 'Not connected'}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => { AutoNovaAudio.playClick(); showNotification(acct.connected ? `${acct.label} disconnected.` : `${acct.label} connected.`, "success"); }}
                          className={`px-3.5 py-2 rounded-xl font-mono text-[9px] font-extrabold uppercase tracking-widest cursor-pointer transition-all ${
                            acct.connected ? 'border border-zinc-200 text-zinc-500 hover:border-red-300 hover:text-red-600' : 'bg-teal-950 hover:bg-teal-900 text-white'
                          }`}
                        >
                          {acct.connected ? 'Disconnect' : 'Connect'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* NOTIFICATION PREFERENCES */}
            {activeTab === 'notifications' && (
              <motion.div
                key="notifications-tab"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-display font-black text-teal-950 text-base mb-1">Subscribed Broadcasts</h3>
                  <p className="text-xs text-zinc-400 font-medium mb-6">Coordinate how telemetry changes trigger device push hooks.</p>
                </div>

                <div className="divide-y divide-zinc-100 space-y-4">
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <p className="font-bold text-xs text-zinc-800">Market Price Action Changes</p>
                      <p className="text-xs text-zinc-400 font-medium mt-0.5">Alert me when saved garage configurations see pricing corrections.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => { AutoNovaAudio.playClick(); setNotificationPreferences(prev => ({ ...prev, priceDrops: !prev.priceDrops })); }}
                      className={`relative w-12 h-6.5 rounded-full transition-colors cursor-pointer shrink-0 ${notificationPreferences.priceDrops ? 'bg-teal-800' : 'bg-zinc-200'}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 bg-white w-5.5 h-5.5 rounded-full transition-all shadow-sm ${notificationPreferences.priceDrops ? 'translate-x-5.5' : ''}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <div>
                      <p className="font-bold text-xs text-zinc-800">AI Curator Allocations</p>
                      <p className="text-xs text-zinc-400 font-medium mt-0.5">When premium vehicles matching my telemetry profile arrive at port.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => { AutoNovaAudio.playClick(); setNotificationPreferences(prev => ({ ...prev, aiRecommendations: !prev.aiRecommendations })); }}
                      className={`relative w-12 h-6.5 rounded-full transition-colors cursor-pointer shrink-0 ${notificationPreferences.aiRecommendations ? 'bg-teal-800' : 'bg-zinc-200'}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 bg-white w-5.5 h-5.5 rounded-full transition-all shadow-sm ${notificationPreferences.aiRecommendations ? 'translate-x-5.5' : ''}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <div>
                      <p className="font-bold text-xs text-zinc-800">Broker Direct Messages</p>
                      <p className="text-xs text-zinc-400 font-medium mt-0.5">Notification of real-time showroom chats and custom pricing agreements.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => { AutoNovaAudio.playClick(); setNotificationPreferences(prev => ({ ...prev, newMessages: !prev.newMessages })); }}
                      className={`relative w-12 h-6.5 rounded-full transition-colors cursor-pointer shrink-0 ${notificationPreferences.newMessages ? 'bg-teal-800' : 'bg-zinc-200'}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 bg-white w-5.5 h-5.5 rounded-full transition-all shadow-sm ${notificationPreferences.newMessages ? 'translate-x-5.5' : ''}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <div>
                      <p className="font-bold text-xs text-zinc-800">Security Ledger Signings</p>
                      <p className="text-xs text-zinc-400 font-medium mt-0.5">Mandatory updates concerning digital escrow bindings or contract lockups.</p>
                    </div>
                    <button
                      type="button"
                      disabled
                      className="relative w-12 h-6.5 rounded-full bg-teal-800/40 cursor-not-allowed shrink-0"
                    >
                      <span className="absolute top-0.5 left-0.5 bg-white w-5.5 h-5.5 rounded-full translate-x-5.5 shadow-sm opacity-90" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PAYMENT METHODS PANEL */}
            {activeTab === 'payment' && (
              <motion.div
                key="payment-tab"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center pb-4 border-b border-zinc-100">
                  <div>
                    <h3 className="font-display font-black text-teal-950 text-base mb-1">Escrow Credentials</h3>
                    <p className="text-xs text-zinc-400 font-medium">Verify or allocate luxury wire cards.</p>
                  </div>
                  <button 
                    onClick={() => { AutoNovaAudio.playClick(); setShowAddCard(prev => !prev); }}
                    className="px-3.5 py-2.5 bg-teal-850 hover:bg-teal-900 text-white font-mono text-[8px] font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    {showAddCard ? 'Back' : 'Add New Card'}
                  </button>
                </div>

                {/* Conditional show of add card form */}
                {showAddCard ? (
                  <form onSubmit={handleAddCardSubmit} className="space-y-4 max-w-md p-6 bg-zinc-50 rounded-2xl border border-zinc-200/60 shadow-xs">
                    <h4 className="font-mono text-[8px] font-black uppercase tracking-widest text-zinc-400 mb-2">Configure Secure Vault Card</h4>
                    
                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[7px] font-black text-zinc-400 uppercase tracking-widest">Card Number</label>
                      <input 
                        type="text" 
                        placeholder="4242 4242 4242 4242"
                        maxLength="16"
                        value={newCard.number}
                        onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                        className="bg-white border border-zinc-200 focus:ring-1 focus:ring-teal-700/30 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-800"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-mono text-[7px] font-black text-zinc-400 uppercase tracking-widest">Card Holder Name</label>
                      <input 
                        type="text" 
                        placeholder="ALEXANDER VANCE"
                        value={newCard.holder}
                        onChange={(e) => setNewCard({ ...newCard, holder: e.target.value })}
                        className="bg-white border border-zinc-200 focus:ring-1 focus:ring-teal-700/30 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-800"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="font-mono text-[7px] font-black text-zinc-400 uppercase tracking-widest">Expiry Date</label>
                        <input 
                          type="text" 
                          placeholder="MM/YY"
                          maxLength="5"
                          value={newCard.expiry}
                          onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                          className="bg-white border border-zinc-200 focus:ring-1 focus:ring-teal-700/30 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-800"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-mono text-[7px] font-black text-zinc-400 uppercase tracking-widest">CVV Shield</label>
                        <input 
                          type="password" 
                          placeholder="•••"
                          maxLength="3"
                          value={newCard.cvv}
                          onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                          className="bg-white border border-zinc-200 focus:ring-1 focus:ring-teal-700/30 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-800"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full mt-2 py-3 bg-teal-800 hover:bg-teal-900 text-white font-mono text-[8.5px] font-black uppercase tracking-wider rounded-xl transition-all shadow-xs cursor-pointer"
                    >
                      Authorize secure gateway
                    </button>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {cards.map(c => (
                      <div 
                        key={c.id}
                        className={`relative overflow-hidden p-6 bg-gradient-to-br ${c.color} text-white rounded-2xl shadow-sm hover:shadow-md transition-all group border border-teal-950/10`}
                      >
                        <div className="relative z-10 flex flex-col h-full justify-between">
                          <div className="flex justify-between items-start mb-10">
                            <span className="w-10 h-7 rounded bg-white/10 border border-white/15 block" />
                            <span className="font-display font-black text-sm italic tracking-tight">{c.type.toUpperCase()}</span>
                          </div>

                          <div>
                            <p className="font-mono text-base tracking-widest font-black text-white/95">•••• •••• •••• {c.last4}</p>
                            
                            <div className="flex justify-between items-end mt-6">
                              <div>
                                <span className="block font-mono text-[6.5px] text-white/40 uppercase tracking-widest">Card Holder</span>
                                <span className="font-mono text-[10px] font-black tracking-wide">{c.holder}</span>
                              </div>
                              <div className="flex items-end gap-5">
                                <div>
                                  <span className="block font-mono text-[6.5px] text-white/40 uppercase tracking-widest">Expires</span>
                                  <span className="font-mono text-[10px] font-black tracking-wide">{c.expiry}</span>
                                </div>
                                
                                <button 
                                  onClick={() => handleDeleteCard(c.id)}
                                  className="p-1.5 rounded-lg bg-red-900/40 hover:bg-red-900 text-red-200 hover:text-white transition-colors cursor-pointer group-hover:opacity-100 opacity-0"
                                  title="Remove card"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Subtle background graphic */}
                        <div className="absolute right-[-20px] bottom-[-20px] w-36 h-36 bg-white/5 rounded-full pointer-events-none" />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* AI PREFERENCES PANEL */}
            {activeTab === 'ai' && (
              <motion.div
                key="ai-tab"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-display font-black text-teal-950 text-base mb-1">AI Recommendation Intelligence</h3>
                  <p className="text-xs text-zinc-400 font-medium mb-6">Customize how Nova-AI parses market opportunities to curate your bespoke catalog.</p>
                </div>

                <div className="bg-zinc-50 border border-teal-700/10 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-36 h-36 bg-teal-600/5 rounded-full blur-2xl" />
                  
                  <div className="flex items-start gap-5 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 border border-teal-100 flex items-center justify-center shrink-0">
                      <Sparkles className="h-5.5 w-5.5 animate-pulse" />
                    </div>

                    <div>
                      <h4 className="font-display font-black text-xs text-teal-950 uppercase tracking-wide">Telemetry Style: Performance Enthusiast</h4>
                      <p className="text-xs text-zinc-500 mt-1 leading-relaxed max-w-md">
                        Your current curation is heavily optimized for ultra-performance luxury electric sedans, track telemetry diagnostics, and hyper-premium hypercars.
                      </p>

                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="p-3 bg-white rounded-xl border border-zinc-150 shadow-xs">
                          <span className="block font-mono text-[7px] text-zinc-400 font-extrabold uppercase">Primary Segment</span>
                          <span className="block text-xs font-bold text-teal-950 mt-0.5">High Performance Electric</span>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-zinc-150 shadow-xs">
                          <span className="block font-mono text-[7px] text-zinc-400 font-extrabold uppercase">Telemetry Style</span>
                          <span className="block text-xs font-bold text-teal-950 mt-0.5">Track Speed Calibration</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => { AutoNovaAudio.playSuccess(); onNavigateToView('onboarding'); }}
                        className="mt-6 px-4 py-2.5 bg-teal-950 hover:bg-teal-900 text-white rounded-xl font-mono text-[8.5px] font-black uppercase tracking-widest transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                      >
                        <RefreshCw className="h-3.5 w-3.5 animate-spin-slow" />
                        <span>Retake Calibration Quiz</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* DANGER ZONE PANEL */}
            {activeTab === 'danger' && (
              <motion.div
                key="danger-tab"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-display font-black text-red-900 text-base mb-1">Danger Zone</h3>
                  <p className="text-xs text-zinc-400 font-medium mb-6">Irreversible operations on your secure digital node.</p>
                </div>

                <div className="border border-red-200 bg-red-50/30 p-6 rounded-2xl flex flex-col items-start gap-5">
                  <div className="flex items-center gap-3 text-red-800">
                    <ShieldAlert className="h-5.5 w-5.5 text-red-600" />
                    <h4 className="font-display font-black text-sm">Disassociate Portal Node Permanently</h4>
                  </div>
                  
                  <p className="text-xs text-zinc-600 leading-relaxed max-w-lg">
                    Once you sever this portal node, there is no retrieval fallback. All active biddings, secure communication escrow codes, private garage allocations, and test drives will be wiped from our Beverly Hills physical ledger completely.
                  </p>

                  <button 
                    onClick={() => { AutoNovaAudio.playClick(); setShowDeleteConfirm(true); }}
                    className="px-5 py-3 border-2 border-red-700 hover:bg-red-700 text-red-700 hover:text-white rounded-xl font-mono text-[8.5px] font-black uppercase tracking-widest transition-all cursor-pointer active:scale-98"
                  >
                    Permanently Sever Portal Node
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* Styled delete confirmation modal — replaces the native browser confirm() dialog */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteConfirm(false)}
              className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl"
              >
                <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
                  <ShieldAlert className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-black text-zinc-900">Delete your account?</h3>
                  <p className="text-xs text-zinc-500 font-medium mt-2 leading-relaxed">
                    This is permanent and cannot be undone. All saved cars, orders, test drives, and messages will be deleted.
                  </p>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => { AutoNovaAudio.playClick(); setShowDeleteConfirm(false); }}
                    className="flex-1 py-3 border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-mono text-[10px] font-extrabold uppercase tracking-widest rounded-xl cursor-pointer transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      AutoNovaAudio.playSuccess();
                      setShowDeleteConfirm(false);
                      onBackToGate();
                    }}
                    className="flex-1 py-3 bg-red-700 hover:bg-red-800 text-white font-mono text-[10px] font-extrabold uppercase tracking-widest rounded-xl cursor-pointer transition-all"
                  >
                    Delete Account
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

    </div>
  );
};
