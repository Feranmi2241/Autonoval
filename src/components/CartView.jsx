import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { AutoNovaAudio } from './AudioEngine';
import { 
  ShoppingCart, Shield, CheckCircle2, MapPin, 
  Trash2, CreditCard, Award, ArrowRight, Check,
  ChevronDown, LogOut, Bell, Settings, Star
} from 'lucide-react';

export const CartView = ({ 
  userName, 
  role, 
  activeCar, 
  onBackToShowroom, 
  showNotification,
  favoritedCarsCount = 0,
  comparedCarsCount = 0,
  onProceedToCheckout,
  cartItems = [],
  setCartItems
}) => {
  const navigate = useNavigate();
  // Use real cart state (passed from the app-wide cartItems) rather than a hardcoded car.
  // Falls back to `activeCar` for any legacy caller, then to an empty-cart state.
  const car = cartItems?.[0] || activeCar || null;

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [hasWarranty, setHasWarranty] = useState(false);
  const [hasInsurance, setHasInsurance] = useState(true);
  const [hasDelivery, setHasDelivery] = useState(false);
  
  // Nigeria state & delivery options
  const [deliveryMethod, setDeliveryMethod] = useState('showroom'); // 'showroom' | 'delivery'
  const [deliveryState, setDeliveryState] = useState('Lagos');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  
  // Promo code states
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null); // 'PRECISION24' or null
  
  // Order checkout modal overlay
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Financial calculations
  const basePrice = car?.price || 0;
  const warrantyCost = 3500;
  const insuranceCost = 2800;
  const deliveryCost = 1200;
  const destinationFee = 1500;

  const addOnTotal = 
    (hasWarranty ? warrantyCost : 0) + 
    (hasInsurance ? insuranceCost : 0) + 
    (hasDelivery ? deliveryCost : 0);

  const discountAmount = appliedPromo === 'PRECISION24' ? Math.round(basePrice * 0.05) : 0;
  const totalEstimatedPrice = basePrice + addOnTotal + destinationFee - discountAmount;

  const handleApplyPromo = () => {
    AutoNovaAudio.playClick();
    if (promoInput.trim().toUpperCase() === 'PRECISION24') {
      setAppliedPromo('PRECISION24');
      AutoNovaAudio.playSuccess();
      showNotification('Promo code applied successfully: 5% off base vehicle price!', 'success');
    } else {
      showNotification('Invalid coupon code. Try "PRECISION24"', 'error');
    }
  };

  const handleCheckboxToggle = (type, value) => {
    AutoNovaAudio.playClick();
    if (type === 'warranty') setHasWarranty(value);
    if (type === 'insurance') setHasInsurance(value);
    if (type === 'delivery') setHasDelivery(value);
  };

  const handleCheckoutSubmit = () => {
    AutoNovaAudio.playClick();
    if (onProceedToCheckout) {
      onProceedToCheckout({
        basePrice,
        addOnTotal,
        destinationFee,
        discountAmount,
        totalEstimatedPrice,
        hasWarranty,
        hasInsurance,
        hasDelivery,
        deliveryMethod,
        deliveryState,
        deliveryAddress,
        appliedPromo
      });
    } else {
      AutoNovaAudio.playSuccess();
      navigate('/checkout');
    }
  };

  if (!car) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center text-center px-4 font-sans">
        <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center mb-5">
          <ShoppingCart className="h-7 w-7 text-teal-700" />
        </div>
        <h2 className="font-display text-xl font-black text-zinc-900 mb-2">Your cart is empty</h2>
        <p className="text-sm text-zinc-500 max-w-sm mb-6">Browse our collection and add a car to get started.</p>
        <button
          onClick={() => { AutoNovaAudio.playClick(); navigate('/browse'); }}
          className="px-6 py-3 bg-teal-950 hover:bg-teal-900 text-white rounded-xl font-bold text-sm transition-all cursor-pointer"
        >
          Browse Cars
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col text-zinc-900 font-sans select-none">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/70 border-b border-zinc-200/60 shadow-sm h-20">
        <div className="flex justify-between items-center h-full px-4 md:px-12 max-w-7xl mx-auto">
          <div 
            onClick={onBackToShowroom}
            className="font-display text-lg md:text-xl font-black tracking-tight text-teal-950 cursor-pointer flex items-center gap-2"
          >
            <span>AutoNova Kinetic</span>
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-teal-50 border border-teal-100 text-teal-800">
              Nigeria
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-[11px] font-mono font-bold tracking-widest uppercase text-zinc-400">
            <button onClick={onBackToShowroom} className="hover:text-teal-950 transition-colors cursor-pointer">Showroom</button>
            <button onClick={onBackToShowroom} className="hover:text-teal-950 transition-colors cursor-pointer">AI Curator</button>
            <button onClick={onBackToShowroom} className="hover:text-teal-950 transition-colors cursor-pointer">Inventory</button>
            <button onClick={onBackToShowroom} className="hover:text-teal-950 transition-colors cursor-pointer">Concierge</button>
          </div>

          <div className="flex items-center gap-4 relative">
            <div className="relative flex items-center p-2 rounded-full bg-teal-50 text-teal-900 shadow-inner">
              <ShoppingCart className="h-4.5 w-4.5" />
              <span className="absolute -top-1 -right-1 bg-teal-800 text-white text-[9px] font-mono font-black w-4.5 h-4.5 flex items-center justify-center rounded-full border border-white">
                1
              </span>
            </div>

            {/* Profile Avatar Trigger */}
            <div className="relative">
              <button
                onClick={() => {
                  AutoNovaAudio.playClick();
                  setShowProfileMenu(!showProfileMenu);
                }}
                className="flex items-center gap-1.5 focus:outline-none rounded-full p-0.5 cursor-pointer hover:opacity-90 transition-opacity"
              >
                <div className="w-9 h-9 rounded-full bg-zinc-200 overflow-hidden border border-zinc-200/80 shadow-sm">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk_NCHuOPjTASHBWR2qhaYLQUDdgA28EKXW2Mxnc17zAdTIielHZKo-oYh4OJMJAr325Oww9yRBzNbIC3chSQBWwywWYwqApCJURfo7retYKEgw2Wm-IZgSZOf4Qp3SuCXV-vVjwWMMtKIqGUBRBRkVeuRIqGKlx6kQeGOJHqjv2qe-UpcdkyxP_iEjixngRfIJJ-gW9EHnRB4VtxdfAmdVsbp8HLL0IDvz-mnjU8nv2evIt7bx7a7RBb7nyiUAqjNu3V8IRgt00hS"
                    alt={userName}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <ChevronDown className="h-3 w-3 text-zinc-400 hidden sm:block" />
              </button>

              {/* Interactive Dropdown */}
              <AnimatePresence>
                {showProfileMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3.5 w-72 bg-white border border-zinc-200 rounded-2xl shadow-xl py-4 z-50 overflow-hidden"
                    >
                      <div className="px-5 pb-3 border-b border-zinc-100 flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-zinc-100 overflow-hidden border border-zinc-200/60">
                          <img
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk_NCHuOPjTASHBWR2qhaYLQUDdgA28EKXW2Mxnc17zAdTIielHZKo-oYh4OJMJAr325Oww9yRBzNbIC3chSQBWwywWYwqApCJURfo7retYKEgw2Wm-IZgSZOf4Qp3SuCXV-vVjwWMMtKIqGUBRBRkVeuRIqGKlx6kQeGOJHqjv2qe-UpcdkyxP_iEjixngRfIJJ-gW9EHnRB4VtxdfAmdVsbp8HLL0IDvz-mnjU8nv2evIt7bx7a7RBb7nyiUAqjNu3V8IRgt00hS"
                            alt={userName}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <p className="font-display font-black text-xs text-teal-950 truncate leading-tight">{userName || 'AutoNova Client'}</p>
                          <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-[8px] font-mono font-bold text-teal-800 uppercase">
                            <span className="w-1 h-1 rounded-full bg-teal-600 animate-pulse" />
                            {role || 'PREMIUM'}
                          </span>
                        </div>
                      </div>

                      <div className="py-2 border-b border-zinc-100 text-[11px] font-semibold text-zinc-600">
                        <button
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            setShowProfileMenu(false);
                            onBackToShowroom();
                          }}
                          className="w-full text-left px-5 py-2 hover:bg-zinc-50 hover:text-teal-950 transition-colors flex items-center justify-between"
                        >
                          <span>Showroom Curation</span>
                        </button>
                      </div>

                      <div className="px-4.5 pt-3">
                        <button
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            setShowProfileMenu(false);
                            onBackToShowroom();
                          }}
                          className="w-full py-2 bg-teal-950 hover:bg-teal-900 text-white font-mono text-[9px] tracking-widest font-extrabold uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <LogOut className="h-3 w-3 text-teal-400" />
                          <span>Exit Cart view</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="pt-32 pb-20 px-4 md:px-12 max-w-7xl mx-auto flex-grow w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Cart Content */}
          <div className="lg:w-2/3 flex flex-col gap-10">
            <div>
              <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100/50">
                Secured Purchase Gateway
              </span>
              <h1 className="font-display text-2xl md:text-4xl font-black text-teal-950 mt-3 tracking-tight">
                Review Your Curation
              </h1>
              <p className="text-zinc-500 font-medium text-xs md:text-sm mt-1">
                Every detail refined for premium delivery. Backed by local escrow clearing.
              </p>
            </div>

            {/* Cart Item Card */}
            <div className="group bg-white rounded-2xl p-5 md:p-6 flex flex-col md:flex-row gap-6 border border-zinc-200/60 hover:border-teal-700/20 transition-all shadow-sm">
              <div className="w-full md:w-52 h-36 rounded-xl overflow-hidden bg-zinc-100 shrink-0">
                <img 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                  src={car.image} 
                  alt={car.name} 
                />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="font-mono text-[8px] font-black uppercase text-zinc-400 tracking-wider">
                        {car.make} // {car.year} Model
                      </span>
                      <h2 className="font-display font-black text-lg text-teal-950 leading-tight">
                        {car.name}
                      </h2>
                    </div>
                    <button 
                      onClick={() => {
                        AutoNovaAudio.playClick();
                        if (setCartItems) setCartItems([]);
                        showNotification("Removed from cart.", "info");
                        navigate('/browse');
                      }}
                      className="text-red-600 font-mono text-[9px] font-black tracking-wider uppercase hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-zinc-500 font-medium text-xs mt-2 leading-relaxed max-w-md">
                    {car.desc}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest block">
                      Vehicle Price
                    </span>
                    <span className="font-display font-black text-lg text-teal-950">
                      ₦{(car.price * 1600).toLocaleString()}
                      <span className="text-[10px] text-zinc-400 font-medium font-sans ml-1.5">
                        (Est. ${car.price.toLocaleString()})
                      </span>
                    </span>
                  </div>

                  <div className="bg-teal-50/50 border border-teal-100/60 px-3 py-1.5 rounded-xl text-right">
                    <span className="font-mono text-[8px] font-bold text-teal-800 uppercase tracking-wider block">
                      Spec Matrix
                    </span>
                    <span className="font-mono text-[9px] font-black text-teal-950">
                      {car.specs.power} • {car.specs.zeroToSixty}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhance Your Purchase */}
            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-display font-black text-sm text-teal-950 uppercase tracking-wider">
                  Enhance Your Purchase
                </h3>
                <span className="font-mono text-[8px] text-zinc-400 font-bold uppercase tracking-widest">
                  Precise Protection & Clearing
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Option 1: Extended Warranty */}
                <div 
                  onClick={() => handleCheckboxToggle('warranty', !hasWarranty)}
                  className={`bg-white p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                    hasWarranty ? 'border-teal-700 ring-1 ring-teal-700/10' : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div>
                    <div className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center mb-4 text-teal-800">
                      <Shield className="h-4 w-4" />
                    </div>
                    <h4 className="font-display font-black text-xs text-teal-950 uppercase tracking-wider">
                      Extended Warranty
                    </h4>
                    <p className="text-[10px] text-zinc-500 font-medium leading-relaxed mt-1.5">
                      7 years of bumper-to-bumper protection certified for Nigeria's environmental profile.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-zinc-100 flex justify-between items-center">
                    <span className="font-display font-black text-xs text-teal-950">
                      ₦{(warrantyCost * 1600).toLocaleString()}
                    </span>
                    <div className={`w-4.5 h-4.5 rounded flex items-center justify-center transition-all ${
                      hasWarranty ? 'bg-teal-800 text-white' : 'border border-zinc-300'
                    }`}>
                      {hasWarranty && <Check className="h-3 w-3" />}
                    </div>
                  </div>
                </div>

                {/* Option 2: Insurance Bundle */}
                <div 
                  onClick={() => handleCheckboxToggle('insurance', !hasInsurance)}
                  className={`bg-white p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                    hasInsurance ? 'border-teal-700 ring-1 ring-teal-700/10' : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div>
                    <div className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center mb-4 text-teal-800">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <h4 className="font-display font-black text-xs text-teal-950 uppercase tracking-wider">
                      Insurance Bundle
                    </h4>
                    <p className="text-[10px] text-zinc-500 font-medium leading-relaxed mt-1.5">
                      Bespoke Nigerian comprehensive luxury transit & road damage insurance with local underwriting.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-zinc-100 flex justify-between items-center">
                    <span className="font-display font-black text-xs text-teal-950">
                      ₦{(insuranceCost * 1600).toLocaleString()}
                    </span>
                    <div className={`w-4.5 h-4.5 rounded flex items-center justify-center transition-all ${
                      hasInsurance ? 'bg-teal-800 text-white' : 'border border-zinc-300'
                    }`}>
                      {hasInsurance && <Check className="h-3 w-3" />}
                    </div>
                  </div>
                </div>

                {/* Option 3: Flatbed Onboarding */}
                <div 
                  onClick={() => handleCheckboxToggle('delivery', !hasDelivery)}
                  className={`bg-white p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                    hasDelivery ? 'border-teal-700 ring-1 ring-teal-700/10' : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div>
                    <div className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center mb-4 text-teal-800">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <h4 className="font-display font-black text-xs text-teal-950 uppercase tracking-wider">
                      White-Glove Delivery
                    </h4>
                    <p className="text-[10px] text-zinc-500 font-medium leading-relaxed mt-1.5">
                      Enclosed flatbed transport with VIP delivery directly to your home address.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-zinc-100 flex justify-between items-center">
                    <span className="font-display font-black text-xs text-teal-950">
                      ₦{(deliveryCost * 1600).toLocaleString()}
                    </span>
                    <div className={`w-4.5 h-4.5 rounded flex items-center justify-center transition-all ${
                      hasDelivery ? 'bg-teal-800 text-white' : 'border border-zinc-300'
                    }`}>
                      {hasDelivery && <Check className="h-3 w-3" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Logistics Options */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-200/60 shadow-sm space-y-6">
              <h3 className="font-display font-black text-sm text-teal-950 uppercase tracking-wider">
                Logistics & Receiving Route
              </h3>
              
              <div className="bg-zinc-100 p-1 rounded-xl flex">
                <button 
                  onClick={() => { AutoNovaAudio.playClick(); setDeliveryMethod('showroom'); }}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    deliveryMethod === 'showroom' ? 'bg-white text-teal-950 shadow-sm' : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  Visit Showroom
                </button>
                <button 
                  onClick={() => { AutoNovaAudio.playClick(); setDeliveryMethod('delivery'); }}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    deliveryMethod === 'delivery' ? 'bg-white text-teal-950 shadow-sm' : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  Bring It To Me
                </button>
              </div>

              {deliveryMethod === 'showroom' ? (
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 bg-zinc-50 border border-zinc-200/60 p-4 rounded-xl flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-teal-700 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-teal-950">Lagos Main Hub</p>
                        <p className="text-[10px] text-zinc-500 font-semibold">Plot 12, Admirality Way, Lekki Phase 1, Lagos</p>
                      </div>
                    </div>
                    <div className="flex-1 bg-zinc-50 border border-zinc-200/60 p-4 rounded-xl flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-zinc-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-zinc-500">Abuja Experience Suite</p>
                        <p className="text-[10px] text-zinc-500 font-semibold">Maitama Luxury Strip, Garki, Abuja</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] text-zinc-400 italic bg-zinc-50 p-3 rounded-lg border border-zinc-100 font-mono">
                    Note: Direct luxury showroom pickups do not incur clearing flatbed fees.
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-wider">
                        DELIVERY STATE
                      </label>
                      <select 
                        value={deliveryState}
                        onChange={(e) => { AutoNovaAudio.playClick(); setDeliveryState(e.target.value); }}
                        className="bg-zinc-50 border border-zinc-200/60 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
                      >
                        <option value="Lagos">Lagos State</option>
                        <option value="Abuja">FCT Abuja</option>
                        <option value="Rivers">Rivers State (Port Harcourt)</option>
                        <option value="Kano">Kano State</option>
                        <option value="Oyo">Oyo State (Ibadan)</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-wider">
                        STREET ADDRESS
                      </label>
                      <input 
                        type="text" 
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="e.g. Banana Island, Ikoyi, Lagos"
                        className="bg-zinc-50 border border-zinc-200/60 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary (Sticky) */}
          <aside className="lg:w-1/3">
            <div className="sticky top-24 flex flex-col gap-6">
              
              {/* Summary Card */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200/60 shadow-lg relative overflow-hidden">
                <h3 className="font-display font-black text-lg text-teal-950 mb-6 uppercase tracking-wider">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-xs font-medium text-zinc-500">
                    <span>Base Vehicle Price</span>
                    <span className="font-bold text-teal-950">
                      ₦{(basePrice * 1600).toLocaleString()}
                    </span>
                  </div>

                  {addOnTotal > 0 && (
                    <div className="flex justify-between text-xs font-medium text-zinc-500">
                      <span>Add-on Customizations</span>
                      <span className="font-bold text-teal-950">
                        ₦{(addOnTotal * 1600).toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-xs font-medium text-zinc-500">
                    <span>Lagos Port Logistics & Customs</span>
                    <span className="font-bold text-teal-950">
                      ₦{(destinationFee * 1600).toLocaleString()}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-xs font-medium text-teal-700 bg-teal-50/50 p-2 rounded-lg border border-teal-100/50">
                      <span>Promo Discount (5%)</span>
                      <span className="font-bold">
                        - ₦{(discountAmount * 1600).toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-zinc-100 flex justify-between items-baseline">
                    <span className="font-display font-black text-xs text-teal-950 uppercase tracking-widest">
                      Total Escrow Value
                    </span>
                    <div className="text-right">
                      <span className="font-display font-black text-xl text-teal-950 block">
                        ₦{(totalEstimatedPrice * 1600).toLocaleString()}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-medium block">
                        Est. ${totalEstimatedPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="mb-6">
                  <label className="font-mono text-[9px] font-black text-zinc-400 uppercase tracking-widest block mb-2">
                    PROMO CODE
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="e.g. PRECISION24"
                      className="flex-grow bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
                    />
                    <button 
                      onClick={handleApplyPromo}
                      className="px-4 py-2.5 bg-teal-950 text-white font-mono text-[9px] font-extrabold uppercase tracking-widest rounded-xl hover:bg-teal-900 transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedPromo && (
                    <p className="text-[10px] text-teal-700 font-semibold mt-2 flex items-center gap-1">
                      <Check className="h-3 w-3" /> Active coupon: 5% Off base price applied
                    </p>
                  )}
                </div>

                <button 
                  onClick={handleCheckoutSubmit}
                  className="w-full bg-teal-700 hover:bg-teal-800 text-white font-mono text-[10px] tracking-widest font-black uppercase py-4 rounded-xl shadow-lg hover:shadow-teal-700/10 active:scale-99 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4.5 w-4.5" />
                </button>

                <p className="text-[10px] text-zinc-400 text-center leading-normal mt-4">
                  Final clearance registration & custom duties calculations will sync automatically through Nigeria Customs service ledger.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-zinc-200/60 shadow-sm">
                  <CreditCard className="h-5 w-5 text-teal-800 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-teal-950">Secure CBN Escrow System</h4>
                    <p className="text-[10px] text-zinc-500 font-medium leading-relaxed mt-0.5">
                      Fully backed by secure certified banking channels.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-zinc-200/60 shadow-sm">
                  <Award className="h-5 w-5 text-teal-800 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-teal-950">Port Clearance Guarantee</h4>
                    <p className="text-[10px] text-zinc-500 font-medium leading-relaxed mt-0.5">
                      Includes luxury import clearing, port handling & mechanical inspections.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200/50 py-12 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="font-display text-lg font-black text-teal-950">AutoNova Kinetic</div>
            <p className="text-[10px] font-mono font-medium text-zinc-400 uppercase tracking-widest">
              © 2026 AutoNova Nigeria Ltd. Precision Engineered Curation.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-mono font-bold uppercase text-zinc-400">
            <button onClick={onBackToShowroom} className="hover:text-teal-950 transition-colors">Privacy Policy</button>
            <button onClick={onBackToShowroom} className="hover:text-teal-950 transition-colors">Terms of Service</button>
            <button onClick={onBackToShowroom} className="hover:text-teal-950 transition-colors">Shipping ledger</button>
            <button onClick={onBackToShowroom} className="hover:text-teal-950 transition-colors">Support Node</button>
          </div>
        </div>
      </footer>

      {/* Success Modal Overlay */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-teal-950/40 backdrop-blur-md"
              onClick={() => setShowSuccessModal(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative bg-white rounded-3xl p-6 md:p-10 max-w-lg w-full text-center shadow-2xl overflow-hidden border border-zinc-100"
            >
              <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6 text-teal-800">
                <CheckCircle2 className="h-10 w-10 text-teal-700" />
              </div>

              <h2 className="font-display font-black text-xl md:text-2xl text-teal-950 mb-3 tracking-tight">
                Escrow Transaction Initiated
              </h2>
              <p className="text-zinc-500 font-medium text-xs md:text-sm mb-8 px-4">
                Your luxury curation request for the {car.name} has been broadcast to the AutoNova Secure Ledger.
              </p>

              <div className="bg-zinc-50 border border-zinc-200/50 p-5 rounded-2xl text-left mb-8 space-y-3.5">
                <div className="flex justify-between text-xs">
                  <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-wider">CURATION</span>
                  <span className="font-bold text-teal-950">{car.name}</span>
                </div>
                
                <div className="flex justify-between text-xs">
                  <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-wider">DISPATCH ROUTE</span>
                  <span className="font-bold text-teal-950">
                    {deliveryMethod === 'showroom' ? 'Lekki Showroom Pickup' : `Enclosed Flatbed to ${deliveryState}`}
                  </span>
                </div>

                <div className="flex justify-between text-xs pt-3.5 border-t border-zinc-200/50">
                  <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-wider">TRANSACTION TOTAL</span>
                  <span className="font-display font-black text-teal-950">
                    ₦{(totalEstimatedPrice * 1600).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => {
                    AutoNovaAudio.playClick();
                    showNotification("Escrow contract details added to calendar node.", "success");
                  }}
                  className="flex-1 py-3.5 bg-teal-50 hover:bg-teal-100 text-teal-950 font-mono text-[9px] font-black uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Save Contract Invoice
                </button>
                <button 
                  onClick={() => {
                    AutoNovaAudio.playClick();
                    setShowSuccessModal(false);
                    onBackToShowroom();
                  }}
                  className="flex-1 py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-mono text-[9px] font-black uppercase tracking-wider rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  Return to Showroom
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
