import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AutoNovaAudio } from './AudioEngine';
import { 
  Zap, CheckCircle2, ShieldCheck, Users, Scale, ChevronLeft, ChevronRight, 
  ChevronDown, Lock, Star, Sparkles, RefreshCw, Car, ArrowRight, HelpCircle,
  TrendingUp, Award, Mail, Phone, DollarSign, ArrowUpRight, User, Bookmark, 
  ShoppingBag, Calendar, MessageSquare, Bell, Settings, ArrowLeft, Upload, Trash2, Camera
} from 'lucide-react';

export const ValuationView = ({
  userName = "Alexander Sterling",
  role = "Client",
  onNavigateToView,
  onBackToGate,
  showNotification
}) => {
  // Navigation & Step state
  // step: 'start' (main landing/fast appraisal) | 1 (Vehicle Info) | 2 (Condition & Photos) | 3 (Pricing) | 4 (Review) | 'success' (glorious publish success)
  const [step, setStep] = useState('start');

  // Step 1: Vehicle Details State
  const [vin, setVin] = useState('');
  const [year, setYear] = useState('2024');
  const [make, setMake] = useState('Tesla');
  const [model, setModel] = useState('Model 3');
  const [trim, setTrim] = useState('Long Range');
  const [mileage, setMileage] = useState('15000');
  const [isVinLoading, setIsVinLoading] = useState(false);

  // Step 2: Condition & Photos State
  const [condition, setCondition] = useState('Great'); // 'Excellent' | 'Great' | 'Good' | 'Fair'
  const [issues, setIssues] = useState('');
  const [photos, setPhotos] = useState([]); // Array of local object URLs or pre-loaded assets
  const fileInputRef = useRef(null);

  // Step 3: Pricing State
  const [listingPrice, setListingPrice] = useState(88500);
  const [targetDate, setTargetDate] = useState('');
  const [isBoosted, setIsBoosted] = useState(false);

  // Landing page / fast appraisal state
  const [isAppraising, setIsAppraising] = useState(false);
  const [appraisalResult, setAppraisalResult] = useState(null);

  // FAQs & Testimonials states
  const [activeFaq, setActiveFaq] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const formRef = useRef(null);

  const testimonials = [
    {
      name: "Sarah J.",
      car: "Audi Q5",
      price: "$34,200",
      rating: 5,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoDkPv9EF_uzPzmAjkBZa32k0VqjGj1CamSAOiOIHrDT7ETRYv3wsmhJ3LgpKe2pzFAwdcNsyG86JKkrQ2jJANYjyKKiFy1-uhN4pfi5WKP2AOXJ3EOQ2tLQW7mJkz2ilUKl5kDZgLSEhk78iZCJF-D6wI_va7BoTYczBwc1XAHHobklHyplFQXL3UyaVcCnJkFeT5S-jc7ScBXCN0gKEM4WQWXcFTZBVx-Ggq1zwMS5exZ2V577Wu7psuG1ObJKevEjHhf-2ZZudH",
      text: "AutoNova's AI price was exactly what I expected. The transaction was seamless, and the money arrived in my account instantly after the handover."
    },
    {
      name: "Marcus R.",
      car: "Tesla Model 3",
      price: "$41,500",
      rating: 5,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDawbhg7sGl4j2E5D5HRps6sfhNyQJoMb89cvJZ-gyoulxLOzhS_cVIQ6njdsnuRXC78_kBveeQvwlrsxr_EdhunTM16cNF1fcaQtyhzGsMMgnM5qt_ze0HDc7-BIPjOplKtZylP2PasOrZ9FSE4s_oHciD06FG3MJ_CjAaWcApg0PFHXK6d7zzGGxal6XGTyP2RFxKBAZdJeVpc46Me0oqPc4sXv0hl0Xr6efdPfp6AWA2mgnS9PQ2SM55KqjONCllqfK-cPPaOolW",
      text: "I was skeptical about AI pricing, but AutoNova delivered. I got $2,000 more than the dealership offered, and I didn't have to deal with 50 random callers."
    },
    {
      name: "David L.",
      car: "BMW 5 Series",
      price: "$28,900",
      rating: 5,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXFDC6-HuQEBSBFbqh8EAbdjxehI26QZtrt-gtAU7Cll4KYvjZC_TG7YRq2Ab7lDWVzovbAyqOZfYBLOYKnrNz-82cSQ683tJH_YjrzC4Jrz5wkxjjc9M9zUHqwVHKUNzbhUWQrbTuEbmB2AIIsmgsr6_3UvHQENNvHQmopErDTNMZk27Myb37_oj9IuYl29wmd7MLW6P6EhOcTOzz3amJNtQ2Nkz55yK1I-7gF_sseQ8kpIV4aO29vCmAI-wM7ZSK5qJifq7jPh5n",
      text: "The escrow system gave me total peace of mind. Hands down the safest way to sell a high-value car in the current market."
    }
  ];

  const faqs = [
    {
      q: "How accurate is the AI valuation?",
      a: "Our AI analyzes millions of real-time market data points, including auction results, private sales, and dealership listings. We factor in local demand, vehicle condition, and specific trim options to provide a price typically within 2% of actual sale value."
    },
    {
      q: "Are there any hidden fees for sellers?",
      a: "Transparency is our core value. AutoNova charges a flat 1.5% transaction fee only when the sale is completed. There are no listing fees or upfront costs to get your AI valuation."
    },
    {
      q: "How does the secure escrow system work?",
      a: "Once a price is agreed upon, the buyer sends funds to our secure escrow partner. We verify the funds are present and hold them. Only after both parties confirm the vehicle and title transfer at handover do we release the funds to your chosen bank account."
    },
    {
      q: "Can I sell a car that still has a loan?",
      a: "Yes! Our team specializes in facilitating title releases and loan payoffs. We work directly with your lender to ensure the debt is settled and you receive any remaining equity from the sale."
    }
  ];

  // Lookup VIN animation and pre-fill
  const handleVinLookup = () => {
    AutoNovaAudio.playClick();
    if (!vin || vin.trim().length < 5) {
      showNotification("Please enter a valid 17-digit VIN pattern", "error");
      return;
    }
    setIsVinLoading(true);
    showNotification("Contacting federal security ledger & vehicle database...", "info");

    setTimeout(() => {
      setIsVinLoading(false);
      setYear('2025');
      setMake('Lucid');
      setModel('Air Sapphire');
      setTrim('Sapphire Edition');
      setMileage('1200');
      AutoNovaAudio.playSuccess();
      showNotification("VIN successfully verified! Lucid Air Sapphire specs loaded.", "success");
    }, 1500);
  };

  // Instant Appraisal trigger
  const handleFastAppraise = (e) => {
    e.preventDefault();
    AutoNovaAudio.playClick();
    setIsAppraising(true);
    showNotification("Running regression valuation models...", "info");

    setTimeout(() => {
      let base = 42000;
      if (make === 'Porsche') base = 95000;
      if (make === 'Tesla') base = 38000;
      if (make === 'Audi') base = 52000;
      if (make === 'BMW') base = 48000;
      if (make === 'Lucid') base = 180000;

      const yearFactor = (parseInt(year) - 2020) * 5500;
      const mileageFactor = Math.max(0, (50000 - parseInt(mileage)) * 0.45);
      
      const finalVal = Math.floor(base + yearFactor + mileageFactor);
      setAppraisalResult(finalVal);
      setListingPrice(finalVal);
      setIsAppraising(false);
      AutoNovaAudio.playSuccess();
      showNotification(`AI successfully appraised your ${year} ${make}!`, "success");
    }, 1200);
  };

  // Photo uploading simulation and integration
  const handlePhotoUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    AutoNovaAudio.playClick();

    const newPhotos = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const localUrl = URL.createObjectURL(file);
      newPhotos.push({
        url: localUrl,
        name: file.name
      });
    }

    setPhotos([...photos, ...newPhotos]);
    AutoNovaAudio.playSuccess();
    showNotification(`Successfully attached ${files.length} custom photo(s)!`, "success");
  };

  const removePhoto = (idxToRemove) => {
    AutoNovaAudio.playClick();
    setPhotos(photos.filter((_, idx) => idx !== idxToRemove));
    showNotification("Photo removed", "info");
  };

  // Get Suggested AI Price Range
  const getSuggestedRange = () => {
    let mid = 45000;
    if (make === 'Porsche') mid = 98000;
    if (make === 'Tesla') mid = 39000;
    if (make === 'Audi') mid = 54000;
    if (make === 'BMW') mid = 50000;
    if (make === 'Lucid') mid = 185000;

    const yearFactor = (parseInt(year) - 2020) * 5000;
    const mileageFactor = Math.max(0, (50000 - parseInt(mileage)) * 0.4);
    
    let combined = mid + yearFactor + mileageFactor;
    if (condition === 'Excellent') combined *= 1.08;
    if (condition === 'Fair') combined *= 0.82;

    const low = Math.floor((combined * 0.95) / 100) * 100;
    const high = Math.floor((combined * 1.05) / 100) * 100;
    return { low, high };
  };

  const range = getSuggestedRange();

  // Dynamic stock photos matching selection if custom ones aren't uploaded
  const getHeroPhoto = () => {
    if (photos.length > 0) return photos[0].url;

    if (make === 'Porsche') {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXeXQAoS4uQ5b6L6RXuQbDOrNOouAh5pnP3pQv9NqrMlwCKhuGtnyW4o_nGOjslRnglfA3Ho1x7BigYrsYcbg5NCOiX4yjCkNd5DHUms9CqS3XnqFT_tdZ1loZZElLw04C3d1ofr-cX6HDKxK_mN1soViYItMefmGcuPYUn-zcXCpm6TlZ0lwLBfmWkcBA_vdKczCu_Tst_K2Li7xeqNrbLzYGbtJon4A6_j2Bb0co9yO1GCzlAAR_84l0T5m5O2QULKie20xiZpa0';
    }
    if (make === 'Tesla') {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuDawbhg7sGl4j2E5D5HRps6sfhNyQJoMb89cvJZ-gyoulxLOzhS_cVIQ6njdsnuRXC78_kBveeQvwlrsxr_EdhunTM16cNF1fcaQtyhzGsMMgnM5qt_ze0HDc7-BIPjOplKtZylP2PasOrZ9FSE4s_oHciD06FG3MJ_CjAaWcApg0PFHXK6d7zzGGxal6XGTyP2RFxKBAZdJeVpc46Me0oqPc4sXv0hl0Xr6efdPfp6AWA2mgnS9PQ2SM55KqjONCllqfK-cPPaOolW';
    }
    if (make === 'Lucid') {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMiA7Ee2bRqJB7jThj9jtySFntQDmdUnWV8BToQr7ZqoIbegFNUk6399zYdywL7KogkG5_KUuUt3fZ23FVE79T-DQeF7_LQu9DGoEntcbTdcjEs7qS49ODj_UicLc8FI3XtnJno792ig12WaNmpXNQBfx8FSjluB45epp_JsLF6I7u0fBwyUleUrLTYHmPWbtbYEgtniSF7dpyR1j2mNsEO4udOn32EJRn066uOyxTriodCWEOxPPjXkQmLatVFNIs3xllYFvqIxA4';
    }
    if (make === 'Audi') {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoDkPv9EF_uzPzmAjkBZa32k0VqjGj1CamSAOiOIHrDT7ETRYv3wsmhJ3LgpKe2pzFAwdcNsyG86JKkrQ2jJANYjyKKiFy1-uhN4pfi5WKP2AOXJ3EOQ2tLQW7mJkz2ilUKl5kDZgLSEhk78iZCJF-D6wI_va7BoTYczBwc1XAHHobklHyplFQXL3UyaVcCnJkFeT5S-jc7ScBXCN0gKEM4WQWXcFTZBVx-Ggq1zwMS5exZ2V577Wu7psuG1ObJKevEjHhf-2ZZudH';
    }
    // general sedan/SUV placeholder
    return 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg3uOji9cfKSN37Ip6XgjjtVohfsIiM-h2IAoo9LEWE3pw8x7INBmrSQu8REUIivZcYljbowozADOozKj-ucNVnydd0xXHQguJqXbabrJk9VRT7QEqG_beODdKYDGRGBWY2Na2g-RwQUdJnmYeveKOEBPD1m-jabVlKc9sttNd-t5zyintilqK0uVranWWEJkl2IhCxRbCqrtyKcrHVC_IpWJSTHBeMIVawZ3j8BxJd_KxUzIhtswxNxW5egzByh8o1bdoWAmXt51-';
  };

  // Publish final listing
  const [isPublishing, setIsPublishing] = useState(false);
  const handlePublishListing = () => {
    AutoNovaAudio.playClick();
    setIsPublishing(true);
    showNotification("Publishing secured node to buyer grids...", "info");

    setTimeout(() => {
      setIsPublishing(false);
      setStep('success');
      AutoNovaAudio.playSuccess();
      showNotification("Hooray! Your luxury vehicle listing is officially LIVE!", "success");
    }, 2000);
  };

  // Nav actions
  const nextTestimonial = () => {
    AutoNovaAudio.playClick();
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    AutoNovaAudio.playClick();
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleScrollToForm = () => {
    AutoNovaAudio.playClick();
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex-grow flex flex-col lg:flex-row relative bg-zinc-50 min-h-[calc(100vh-80px)]">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="hidden lg:flex w-64 flex-col py-8 px-6 bg-white border-r border-zinc-200/60 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto shrink-0 z-10">
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
            onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('alerts'); }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <Zap className="h-4 w-4 text-zinc-400" />
              <span>Saved Searches</span>
            </div>
            <span className="font-mono text-[9px] bg-teal-800 text-white px-1.5 py-0.5 rounded-md">2</span>
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
            onClick={() => { AutoNovaAudio.playClick(); setStep('1'); }}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all cursor-pointer text-left ${
              step !== 'start' && step !== 'success'
                ? 'bg-teal-50/80 text-teal-950 border-r-4 border-teal-800 font-bold' 
                : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Car className="h-4 w-4 text-teal-700" />
              <span>Create Listing</span>
            </div>
            {step !== 'start' && step !== 'success' && (
              <span className="font-mono text-[9px] bg-teal-900 text-white px-1.5 py-0.5 rounded-md">Step {step}</span>
            )}
          </button>
        </nav>

        <div className="pt-6 mt-6 border-t border-zinc-100 space-y-4">
          <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
            <h4 className="font-mono text-[8px] font-bold text-teal-900 uppercase tracking-wider mb-1">Black Label Hotline</h4>
            <p className="text-[10px] text-zinc-500 leading-normal font-medium mb-2.5">Instant private concierge routing with dedicated agent.</p>
            <button 
              onClick={() => { AutoNovaAudio.playClick(); showNotification("Routing encrypted connection to concierge...", "info"); }}
              className="w-full py-2 bg-teal-950 text-white font-mono text-[8px] font-black uppercase tracking-widest rounded-lg hover:bg-teal-900 transition-colors cursor-pointer"
            >
              Initialize call
            </button>
          </div>
        </div>
      </aside>

      {/* CORE FORM FLOW VIEWPORT */}
      <div className="flex-grow flex flex-col min-w-0" ref={formRef}>
        
        {/* STEPPER COMPONENT FOR STEPS 1-4 */}
        {(step === '1' || step === '2' || step === '3' || step === '4') && (
          <div className="bg-white border-b border-zinc-200/60 py-6 px-4 md:px-8">
            <div className="max-w-3xl mx-auto flex items-center justify-between relative">
              
              {/* Stepper active track line background */}
              <div className="absolute top-5 left-0 w-full h-[2px] bg-zinc-200 -z-10" />
              <div 
                className="absolute top-5 left-0 h-[2px] bg-teal-700 transition-all duration-300 -z-10" 
                style={{ 
                  width: step === '1' ? '0%' : step === '2' ? '33.33%' : step === '3' ? '66.66%' : '100%' 
                }}
              />

              {/* Step 1 indicator */}
              <button 
                onClick={() => { AutoNovaAudio.playClick(); setStep('1'); }}
                className="flex flex-col items-center gap-2 focus:outline-none cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-black text-xs transition-all ${
                  step === '1' 
                    ? 'bg-teal-700 text-white ring-4 ring-teal-700/15' 
                    : 'bg-teal-50 text-teal-800 border border-teal-100'
                }`}>
                  {parseInt(step) > 1 ? <CheckCircle2 className="h-5 w-5" /> : "01"}
                </div>
                <span className={`text-[10px] font-mono font-bold tracking-widest uppercase ${step === '1' ? 'text-teal-950 font-black' : 'text-zinc-400'}`}>
                  Vehicle
                </span>
              </button>

              {/* Step 2 indicator */}
              <button 
                disabled={step === '1'}
                onClick={() => { AutoNovaAudio.playClick(); setStep('2'); }}
                className="flex flex-col items-center gap-2 focus:outline-none disabled:opacity-70 cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-black text-xs transition-all ${
                  step === '2' 
                    ? 'bg-teal-700 text-white ring-4 ring-teal-700/15' 
                    : parseInt(step) > 2
                      ? 'bg-teal-50 text-teal-800 border border-teal-100'
                      : 'bg-zinc-100 text-zinc-400 border border-zinc-200'
                }`}>
                  {parseInt(step) > 2 ? <CheckCircle2 className="h-5 w-5" /> : "02"}
                </div>
                <span className={`text-[10px] font-mono font-bold tracking-widest uppercase ${step === '2' ? 'text-teal-950 font-black' : 'text-zinc-400'}`}>
                  Condition
                </span>
              </button>

              {/* Step 3 indicator */}
              <button 
                disabled={step === '1' || step === '2'}
                onClick={() => { AutoNovaAudio.playClick(); setStep('3'); }}
                className="flex flex-col items-center gap-2 focus:outline-none disabled:opacity-70 cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-black text-xs transition-all ${
                  step === '3' 
                    ? 'bg-teal-700 text-white ring-4 ring-teal-700/15' 
                    : parseInt(step) > 3
                      ? 'bg-teal-50 text-teal-800 border border-teal-100'
                      : 'bg-zinc-100 text-zinc-400 border border-zinc-200'
                }`}>
                  {parseInt(step) > 3 ? <CheckCircle2 className="h-5 w-5" /> : "03"}
                </div>
                <span className={`text-[10px] font-mono font-bold tracking-widest uppercase ${step === '3' ? 'text-teal-950 font-black' : 'text-zinc-400'}`}>
                  Pricing
                </span>
              </button>

              {/* Step 4 indicator */}
              <button 
                disabled={step === '1' || step === '2' || step === '3'}
                onClick={() => { AutoNovaAudio.playClick(); setStep('4'); }}
                className="flex flex-col items-center gap-2 focus:outline-none disabled:opacity-70 cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-black text-xs transition-all ${
                  step === '4' 
                    ? 'bg-teal-700 text-white ring-4 ring-teal-700/15' 
                    : 'bg-zinc-100 text-zinc-400 border border-zinc-200'
                }`}>
                  "04"
                </div>
                <span className={`text-[10px] font-mono font-bold tracking-widest uppercase ${step === '4' ? 'text-teal-950 font-black' : 'text-zinc-400'}`}>
                  Review
                </span>
              </button>

            </div>
          </div>
        )}

        <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full flex-grow">
          <AnimatePresence mode="wait">
            
            {/* -------------------- STEP: START (LANDING / FAST APPRAISAL) -------------------- */}
            {step === 'start' && (
              <motion.div 
                key="start"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-12"
              >
                {/* Main Titles */}
                <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-[10px] font-mono font-bold text-teal-800 uppercase tracking-widest">
                    <Sparkles className="h-3 w-3 text-teal-700 animate-pulse" />
                    Trusted by 50k+ Sellers Worldwide
                  </span>
                  <h1 className="text-4xl md:text-5xl font-display font-black text-teal-950 tracking-tight leading-none">
                    Sell Your Car in Minutes — <span className="bg-gradient-to-r from-teal-700 to-purple-600 bg-clip-text text-transparent italic">Priced by AI</span>
                  </h1>
                  <p className="text-xs md:text-sm text-zinc-500 font-medium leading-relaxed max-w-xl mx-auto">
                    Experience the absolute future of vehicle valuation. Get an instant, data-driven appraisal estimate, then easily create a formal listing with our secure seller tools.
                  </p>
                </div>

                {/* Main Interactive Valuation Card */}
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-200/60 shadow-lg max-w-4xl mx-auto">
                  {!appraisalResult ? (
                    <form onSubmit={handleFastAppraise} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                        
                        {/* Year */}
                        <div className="space-y-1.5 text-left">
                          <label className="block font-mono text-[8.5px] font-bold text-zinc-400 uppercase tracking-widest">Year</label>
                          <select 
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="w-full h-12 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-800 px-3.5 focus:outline-none focus:ring-2 focus:ring-teal-700/10 focus:border-teal-700 transition-all"
                          >
                            {['2026', '2025', '2024', '2023', '2022', '2021', '2020'].map(yr => (
                              <option key={yr} value={yr}>{yr}</option>
                            ))}
                          </select>
                        </div>

                        {/* Make */}
                        <div className="space-y-1.5 text-left">
                          <label className="block font-mono text-[8.5px] font-bold text-zinc-400 uppercase tracking-widest">Make</label>
                          <select 
                            value={make}
                            onChange={(e) => {
                              setMake(e.target.value);
                              if (e.target.value === 'Tesla') setModel('Model 3');
                              if (e.target.value === 'Porsche') setModel('911 Carrera');
                              if (e.target.value === 'Audi') setModel('E-Tron GT');
                              if (e.target.value === 'BMW') setModel('i7 xDrive60');
                              if (e.target.value === 'Lucid') setModel('Air Sapphire');
                            }}
                            className="w-full h-12 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-800 px-3.5 focus:outline-none focus:ring-2 focus:ring-teal-700/10 focus:border-teal-700 transition-all"
                          >
                            {['Tesla', 'Porsche', 'Audi', 'BMW', 'Lucid', 'Mercedes'].map(mk => (
                              <option key={mk} value={mk}>{mk}</option>
                            ))}
                          </select>
                        </div>

                        {/* Model */}
                        <div className="space-y-1.5 text-left">
                          <label className="block font-mono text-[8.5px] font-bold text-zinc-400 uppercase tracking-widest">Model</label>
                          <select 
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="w-full h-12 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-800 px-3.5 focus:outline-none focus:ring-2 focus:ring-teal-700/10 focus:border-teal-700 transition-all"
                          >
                            {make === 'Tesla' && ['Model 3', 'Model S Plaid', 'Model X', 'Model Y'].map(md => (
                              <option key={md} value={md}>{md}</option>
                            ))}
                            {make === 'Porsche' && ['911 Carrera', 'Taycan Turbo S', 'Cayenne Coupe', 'Panamera'].map(md => (
                              <option key={md} value={md}>{md}</option>
                            ))}
                            {make === 'Audi' && ['E-Tron GT', 'Q8 E-Tron', 'RS7 Sportback', 'R8 V10'].map(md => (
                              <option key={md} value={md}>{md}</option>
                            ))}
                            {make === 'BMW' && ['i7 xDrive60', 'M8 Gran Coupe', 'X7 M60i', 'i4 M50'].map(md => (
                              <option key={md} value={md}>{md}</option>
                            ))}
                            {make === 'Lucid' && ['Air Sapphire', 'Air Touring', 'Air Pure'].map(md => (
                              <option key={md} value={md}>{md}</option>
                            ))}
                            {['Mercedes'].includes(make) && ['EQS Sedan', 'AMG GT63', 'G63 AMG'].map(md => (
                              <option key={md} value={md}>{md}</option>
                            ))}
                          </select>
                        </div>

                        {/* Mileage */}
                        <div className="space-y-1.5 text-left">
                          <label className="block font-mono text-[8.5px] font-bold text-zinc-400 uppercase tracking-widest">Mileage</label>
                          <input 
                            type="number"
                            required
                            value={mileage}
                            onChange={(e) => setMileage(e.target.value)}
                            placeholder="e.g. 15000"
                            className="w-full h-12 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-800 px-4 focus:outline-none focus:ring-2 focus:ring-teal-700/10 focus:border-teal-700 transition-all placeholder-zinc-300"
                          />
                        </div>

                        {/* Trigger button */}
                        <div className="lg:col-span-1">
                          <button
                            type="submit"
                            disabled={isAppraising}
                            className="w-full h-12 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-mono text-[9px] font-black uppercase tracking-widest rounded-xl transition-all shadow-md shadow-teal-950/10 flex items-center justify-center gap-2 cursor-pointer"
                          >
                            {isAppraising ? (
                              <>
                                <RefreshCw className="h-4 w-4 animate-spin text-white" />
                                <span>ANALYZING...</span>
                              </>
                            ) : (
                              <>
                                <Zap className="h-4 w-4 text-teal-300 fill-teal-300" />
                                <span>Get My Price</span>
                              </>
                            )}
                          </button>
                        </div>

                      </div>

                      {/* Alternates or direct path link */}
                      <div className="pt-2 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                        <span className="text-zinc-400 font-medium">Have a specific trim & photos ready to publish?</span>
                        <button
                          type="button"
                          onClick={() => { AutoNovaAudio.playClick(); setStep('1'); }}
                          className="px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200/80 text-teal-950 font-mono text-[9px] font-black uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
                        >
                          Skip Appraisal & List Vehicle
                        </button>
                      </div>
                    </form>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-6 space-y-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 mx-auto animate-bounce">
                        <Award className="h-8 w-8" />
                      </div>

                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-zinc-400 block uppercase tracking-widest font-black">AI APPRAISED NETWORK VALUE</span>
                        <h2 className="font-display text-4xl md:text-5xl font-black text-teal-950">
                          ${appraisalResult.toLocaleString()}
                        </h2>
                      </div>

                      <div className="max-w-xs mx-auto space-y-1.5">
                        <div className="flex items-center justify-between text-[9px] font-mono font-bold uppercase tracking-widest">
                          <span className="inline-flex items-center gap-1 text-teal-700">
                            <Sparkles className="h-3 w-3" />
                            Confidence Index
                          </span>
                          <span className="text-teal-950">98.4%</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '98.4%' }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-teal-400"
                          />
                        </div>
                      </div>

                      <p className="text-xs text-zinc-500 font-medium max-w-md mx-auto leading-relaxed">
                        Valuation holds for your <strong className="text-teal-950">{year} {make} {model}</strong> for exactly 14 days in local AutoNova network nodes. Ready to publish to vetted buyers?
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-3">
                        <button
                          onClick={() => { AutoNovaAudio.playClick(); setAppraisalResult(null); }}
                          className="flex-1 py-3.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-mono text-[9px] font-black uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
                        >
                          Reset Appraisal
                        </button>
                        <button
                          onClick={() => { AutoNovaAudio.playSuccess(); setStep('1'); }}
                          className="flex-1 py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-mono text-[9px] font-black uppercase tracking-widest rounded-xl transition-colors shadow-md shadow-teal-950/10 cursor-pointer"
                        >
                          Accept & Complete Listing
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Image studio banner */}
                <div className="relative h-[240px] md:h-[420px] w-full overflow-hidden rounded-3xl border border-zinc-200/40 shadow-sm max-w-5xl mx-auto">
                  <img 
                    className="w-full h-full object-cover select-none" 
                    referrerPolicy="no-referrer"
                    alt="Sleek silver futuristic sports car in high tech minimal lighting" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqO4ErAqC3bqnO85NmbRt7QN0-JOBztaiKPHlIAKUk25ORFNxn1_JCLEgE-AysPQiOJ8s-YyKZfZv7ihYsEvS92jWl2YpSrF8Yva02CxrfJZg2kL6_Edg35I2ssGeHstSVua59Dww3Bd_mDDb3_oC4cQszc1H7VCKZCbI4AfCXFQlI9APuV2fsBPpDWqsDP6eggbc7g0_l4gQlDYzupmWb46DgTa2z9ZzL1UWFE-pp_0PdMhXqRZiH7R29q4qytllVdz64tbRnIBwf"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-zinc-200/50 max-w-xs md:max-w-sm shadow-md">
                    <span className="font-mono text-[8px] font-bold text-teal-800 uppercase tracking-widest block mb-1">LIVE TELEMETRY ACTIVE</span>
                    <p className="text-[11px] text-zinc-600 font-medium leading-relaxed">
                      Automated regression algorithms continuously index private transactions and wholesale ledgers to guarantee optimized pricing points.
                    </p>
                  </div>
                </div>

                {/* PROCESS ROW SECTION (3 Easy Steps) */}
                <div className="py-12 border-t border-zinc-200/40 max-w-5xl mx-auto">
                  <div className="text-center mb-12 space-y-2">
                    <span className="font-mono text-[8.5px] font-bold text-teal-800 uppercase tracking-widest block">Seamless Integration</span>
                    <h2 className="font-display font-black text-2xl md:text-3xl text-teal-950 tracking-tight">Sell in 3 Easy Steps</h2>
                    <p className="text-xs text-zinc-400 font-medium max-w-md mx-auto">
                      AutoNova eliminates third-party friction and awkward price haggling completely.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Step 1 */}
                    <div className="bg-white rounded-2xl p-6 border border-zinc-200/50 relative hover:shadow-md transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center font-mono font-black text-teal-800 text-sm mb-5 group-hover:scale-105 transition-transform">
                        01
                      </div>
                      <h3 className="font-display font-bold text-teal-950 text-base mb-2">Value It</h3>
                      <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                        Enter key specifications, location, and condition coordinates. Our AI engine computes optimal real market liquidation pricing instantly.
                      </p>
                      <button 
                        onClick={handleScrollToForm}
                        className="mt-5 font-mono text-[9px] font-black uppercase text-teal-700 hover:text-teal-950 flex items-center gap-1 cursor-pointer"
                      >
                        Start Valuation
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white rounded-2xl p-6 border border-zinc-200/50 relative hover:shadow-md transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center font-mono font-black text-teal-800 text-sm mb-5 group-hover:scale-105 transition-transform">
                        02
                      </div>
                      <h3 className="font-display font-bold text-teal-950 text-base mb-2">List It</h3>
                      <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                        Confirm parameters to securely publish your vehicle specifications to vetted luxury collectors, institutional buyers, and dealers.
                      </p>
                      <button 
                        onClick={() => { AutoNovaAudio.playClick(); setStep('1'); }}
                        className="mt-5 font-mono text-[9px] font-black uppercase text-teal-700 hover:text-teal-950 flex items-center gap-1 cursor-pointer"
                      >
                        Create Listing Form
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white rounded-2xl p-6 border border-zinc-200/50 relative hover:shadow-md transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center font-mono font-black text-teal-800 text-sm mb-5 group-hover:scale-105 transition-transform">
                        03
                      </div>
                      <h3 className="font-display font-bold text-teal-950 text-base mb-2">Get Paid Safely</h3>
                      <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                        Utilize our private digital escrow system. Transaction funds clear securely, protecting titles and funds for both counterparties.
                      </p>
                      <button 
                        onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('orders'); }}
                        className="mt-5 font-mono text-[9px] font-black uppercase text-teal-700 hover:text-teal-950 flex items-center gap-1 cursor-pointer"
                      >
                        View Escrow Guides
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* TRUST BADGES SECTION */}
                <div className="py-10 bg-white rounded-3xl border border-zinc-200/50 p-8 max-w-5xl mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-zinc-100">
                    <div className="space-y-3 p-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-50 text-teal-700 mb-2">
                        <ShieldCheck className="h-6 w-6" />
                      </div>
                      <h4 className="font-display font-bold text-teal-950 text-sm">Secure Escrow Protection</h4>
                      <p className="text-[11px] text-zinc-500 font-medium max-w-xs mx-auto leading-relaxed">
                        Funds clear in institutional secure custody accounts. Releases happen securely upon vehicle transfer verification.
                      </p>
                    </div>

                    <div className="space-y-3 p-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-50 text-teal-700 mb-2">
                        <Users className="h-6 w-6" />
                      </div>
                      <h4 className="font-display font-bold text-teal-950 text-sm">Verified Premium Buyers</h4>
                      <p className="text-[11px] text-zinc-500 font-medium max-w-xs mx-auto leading-relaxed">
                        Every counterparty completes extensive financial verification to eliminate speculative or fake offers.
                      </p>
                    </div>

                    <div className="space-y-3 p-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-50 text-teal-700 mb-2">
                        <Scale className="h-6 w-6" />
                      </div>
                      <h4 className="font-display font-bold text-teal-950 text-sm">Strict Zero-Haggle Policy</h4>
                      <p className="text-[11px] text-zinc-500 font-medium max-w-xs mx-auto leading-relaxed">
                        Prices are generated relative to true market regressions, removing unnecessary dealer friction and negotiations.
                      </p>
                    </div>
                  </div>
                </div>

                {/* TESTIMONIALS */}
                <div className="py-8 bg-zinc-900 text-white rounded-3xl p-8 md:p-12 border border-zinc-800 relative overflow-hidden max-w-5xl mx-auto">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/5 rounded-full blur-3xl -mr-10 -mt-10" />
                  <div className="relative z-10 flex flex-col md:flex-row items-center md:items-stretch justify-between gap-8">
                    <div className="max-w-md flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[8px] font-bold text-teal-400 uppercase tracking-widest block mb-1">CUSTOMER SUCCESS</span>
                        <h2 className="font-display font-black text-2xl md:text-3xl tracking-tight mb-3">What Our Sellers Say</h2>
                        <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                          Read transparent feedback from high-end vehicle owners who successfully liquidated assets through the AutoNova matchmaking protocol.
                        </p>
                      </div>

                      <div className="flex gap-2.5 mt-8 md:mt-0">
                        <button 
                          onClick={prevTestimonial}
                          className="w-10 h-10 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-850 hover:bg-zinc-800 flex items-center justify-center transition-all cursor-pointer"
                        >
                          <ChevronLeft className="h-5 w-5 text-zinc-300" />
                        </button>
                        <button 
                          onClick={nextTestimonial}
                          className="w-10 h-10 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-850 hover:bg-zinc-800 flex items-center justify-center transition-all cursor-pointer"
                        >
                          <ChevronRight className="h-5 w-5 text-zinc-300" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-zinc-850 border border-zinc-800 rounded-2xl p-6 md:p-8 flex-grow max-w-xl flex flex-col justify-between space-y-6">
                      <div>
                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-teal-400 fill-teal-400" />
                          ))}
                        </div>
                        <p className="text-xs md:text-sm text-zinc-300 font-mono italic leading-relaxed">
                          "{testimonials[testimonialIndex].text}"
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-zinc-700">
                          <img 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                            alt={testimonials[testimonialIndex].name} 
                            src={testimonials[testimonialIndex].image}
                          />
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-white text-xs">{testimonials[testimonialIndex].name}</h4>
                          <p className="text-[10px] text-teal-400 font-semibold font-mono uppercase tracking-wider">
                            Sold {testimonials[testimonialIndex].car} • {testimonials[testimonialIndex].price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ ACCORDION SECTION */}
                <div className="py-8 max-w-3xl mx-auto space-y-6">
                  <div className="text-center space-y-2 mb-8">
                    <span className="font-mono text-[8.5px] font-bold text-teal-800 uppercase tracking-widest block">Clear Documentation</span>
                    <h2 className="font-display font-black text-2xl md:text-3xl text-teal-950 tracking-tight">Common Questions</h2>
                    <p className="text-xs text-zinc-400 font-medium max-w-md mx-auto">
                      Discover specifications and guidelines for the AutoNova AI liquid appraisal protocols.
                    </p>
                  </div>

                  <div className="space-y-3.5">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="bg-white rounded-2xl border border-zinc-200/50 overflow-hidden shadow-sm">
                        <button
                          type="button"
                          onClick={() => { AutoNovaAudio.playClick(); setActiveFaq(activeFaq === idx ? -1 : idx); }}
                          className="w-full text-left px-6 py-5 flex items-center justify-between font-display font-extrabold text-xs md:text-sm text-teal-950 focus:outline-none cursor-pointer"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform ${activeFaq === idx ? 'rotate-180 text-teal-700' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {activeFaq === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.15 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 pt-1 text-xs text-zinc-500 font-medium leading-relaxed border-t border-zinc-50/80">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

            {/* -------------------- STEP 1: VEHICLE INFO -------------------- */}
            {step === '1' && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-4xl mx-auto space-y-8"
              >
                <div className="text-left space-y-2">
                  <span className="font-mono text-[8.5px] text-teal-800 uppercase tracking-widest block font-black">STEP 01 OF 04</span>
                  <h1 className="text-3xl font-display font-black text-teal-950 tracking-tight leading-none">Vehicle details</h1>
                  <p className="text-xs text-zinc-500 font-medium">Start with the basics to get an instant AI-powered valuation.</p>
                </div>

                <div className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-200/60 shadow-lg space-y-6">
                  
                  {/* VIN Lookup container */}
                  <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-200/60 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex-grow w-full text-left">
                      <label className="block font-mono text-[8.5px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                        Vehicle Identification Number (VIN)
                      </label>
                      <input 
                        type="text"
                        maxLength={17}
                        value={vin}
                        onChange={(e) => setVin(e.target.value.toUpperCase())}
                        placeholder="Enter 17-digit VIN"
                        className="w-full h-12 bg-white border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-800 px-4 focus:outline-none focus:ring-2 focus:ring-teal-700/10 focus:border-teal-700 transition-all uppercase"
                      />
                    </div>
                    <button 
                      type="button"
                      disabled={isVinLoading}
                      onClick={handleVinLookup}
                      className="w-full md:w-auto h-12 px-6 bg-teal-950 text-white font-mono text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-teal-900 transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isVinLoading ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                      <span>VIN Lookup</span>
                    </button>
                  </div>

                  {/* Year, Make, Model, Trim Selection inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* Year select */}
                    <div className="text-left space-y-1.5">
                      <label className="block font-mono text-[8.5px] font-bold text-zinc-400 uppercase tracking-widest">Year</label>
                      <select 
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full h-12 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-800 px-3.5 focus:outline-none focus:ring-2 focus:ring-teal-700/10 focus:border-teal-700 transition-all"
                      >
                        {['2026', '2025', '2024', '2023', '2022', '2021', '2020'].map(yr => (
                          <option key={yr} value={yr}>{yr}</option>
                        ))}
                      </select>
                    </div>

                    {/* Make select */}
                    <div className="text-left space-y-1.5">
                      <label className="block font-mono text-[8.5px] font-bold text-zinc-400 uppercase tracking-widest">Make</label>
                      <select 
                        value={make}
                        onChange={(e) => {
                          setMake(e.target.value);
                          if (e.target.value === 'Tesla') { setModel('Model 3'); setTrim('Long Range'); }
                          if (e.target.value === 'Porsche') { setModel('911 Carrera'); setTrim('Carrera 4S'); }
                          if (e.target.value === 'Audi') { setModel('E-Tron GT'); setTrim('Premium Plus'); }
                          if (e.target.value === 'BMW') { setModel('i7 xDrive60'); setTrim('M Sport'); }
                          if (e.target.value === 'Lucid') { setModel('Air Sapphire'); setTrim('Sapphire Edition'); }
                          if (e.target.value === 'Mercedes') { setModel('EQS Sedan'); setTrim('EQS 450+'); }
                        }}
                        className="w-full h-12 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-800 px-3.5 focus:outline-none focus:ring-2 focus:ring-teal-700/10 focus:border-teal-700 transition-all"
                      >
                        {['Tesla', 'Porsche', 'Audi', 'BMW', 'Lucid', 'Mercedes'].map(mk => (
                          <option key={mk} value={mk}>{mk}</option>
                        ))}
                      </select>
                    </div>

                    {/* Model input/select */}
                    <div className="text-left space-y-1.5">
                      <label className="block font-mono text-[8.5px] font-bold text-zinc-400 uppercase tracking-widest">Model</label>
                      <select 
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="w-full h-12 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-800 px-3.5 focus:outline-none focus:ring-2 focus:ring-teal-700/10 focus:border-teal-700 transition-all"
                      >
                        {make === 'Tesla' && ['Model 3', 'Model S Plaid', 'Model X', 'Model Y'].map(md => (
                          <option key={md} value={md}>{md}</option>
                        ))}
                        {make === 'Porsche' && ['911 Carrera', 'Taycan Turbo S', 'Cayenne Coupe', 'Panamera'].map(md => (
                          <option key={md} value={md}>{md}</option>
                        ))}
                        {make === 'Audi' && ['E-Tron GT', 'Q8 E-Tron', 'RS7 Sportback', 'R8 V10'].map(md => (
                          <option key={md} value={md}>{md}</option>
                        ))}
                        {make === 'BMW' && ['i7 xDrive60', 'M8 Gran Coupe', 'X7 M60i', 'i4 M50'].map(md => (
                          <option key={md} value={md}>{md}</option>
                        ))}
                        {make === 'Lucid' && ['Air Sapphire', 'Air Touring', 'Air Pure'].map(md => (
                          <option key={md} value={md}>{md}</option>
                        ))}
                        {['Mercedes'].includes(make) && ['EQS Sedan', 'AMG GT63', 'G63 AMG'].map(md => (
                          <option key={md} value={md}>{md}</option>
                        ))}
                      </select>
                    </div>

                    {/* Trim Input */}
                    <div className="text-left space-y-1.5">
                      <label className="block font-mono text-[8.5px] font-bold text-zinc-400 uppercase tracking-widest">Trim</label>
                      <input 
                        type="text"
                        required
                        value={trim}
                        onChange={(e) => setTrim(e.target.value)}
                        placeholder="e.g. Long Range, Grand Touring"
                        className="w-full h-12 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-800 px-4 focus:outline-none focus:ring-2 focus:ring-teal-700/10 focus:border-teal-700 transition-all placeholder-zinc-350"
                      />
                    </div>

                    {/* Current Mileage */}
                    <div className="md:col-span-2 text-left space-y-1.5">
                      <label className="block font-mono text-[8.5px] font-bold text-zinc-400 uppercase tracking-widest">Current Mileage</label>
                      <div className="relative">
                        <input 
                          type="number"
                          required
                          value={mileage}
                          onChange={(e) => setMileage(e.target.value)}
                          placeholder="e.g. 24500"
                          className="w-full h-12 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-800 px-4 pr-16 focus:outline-none focus:ring-2 focus:ring-teal-700/10 focus:border-teal-700 transition-all placeholder-zinc-300"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] font-bold text-zinc-400 uppercase">
                          miles
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Actions row */}
                  <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-zinc-100 gap-4">
                    <button 
                      type="button"
                      onClick={() => { AutoNovaAudio.playClick(); setStep('start'); }}
                      className="w-full sm:w-auto px-6 py-3 border border-zinc-200 text-zinc-500 hover:text-zinc-800 rounded-xl font-mono text-[9px] font-black uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      Cancel Listing
                    </button>
                    <button 
                      type="button"
                      onClick={() => { AutoNovaAudio.playSuccess(); setStep('2'); }}
                      className="w-full sm:w-auto px-8 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-mono text-[9px] font-black uppercase tracking-widest shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Next Step</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                </div>
              </motion.div>
            )}

            {/* -------------------- STEP 2: CONDITION & PHOTOS -------------------- */}
            {step === '2' && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-5xl mx-auto space-y-8"
              >
                <div className="text-left space-y-2">
                  <span className="font-mono text-[8.5px] text-teal-800 uppercase tracking-widest block font-black">STEP 02 OF 04</span>
                  <h1 className="text-3xl font-display font-black text-teal-950 tracking-tight leading-none">Condition & Photos</h1>
                  <p className="text-xs text-zinc-500 font-medium">Describe the physical grade and upload gorgeous daylight media assets.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Grades & Issues */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-200/60 shadow-lg space-y-6 text-left">
                      
                      {/* Grade Selector */}
                      <div className="space-y-3">
                        <label className="block font-mono text-[8.5px] font-bold text-zinc-400 uppercase tracking-widest">
                          Overall Condition Grade
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {['Excellent', 'Great', 'Good', 'Fair'].map((gr) => (
                            <button
                              key={gr}
                              type="button"
                              onClick={() => { AutoNovaAudio.playClick(); setCondition(gr); }}
                              className={`py-3.5 px-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                                condition === gr 
                                  ? 'border-teal-700 bg-teal-50/40 text-teal-950' 
                                  : 'border-zinc-200 bg-zinc-50 text-zinc-500 hover:border-teal-600/20 hover:bg-white'
                              }`}
                            >
                              <Star className={`h-4.5 w-4.5 ${condition === gr ? 'text-teal-700 fill-teal-700' : 'text-zinc-400'}`} />
                              <span className="font-sans text-[11px] font-extrabold">{gr}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Mechanical issues textbox */}
                      <div className="space-y-1.5">
                        <label className="block font-mono text-[8.5px] font-bold text-zinc-400 uppercase tracking-widest">
                          Any known mechanical issues or cosmetic blemishes?
                        </label>
                        <textarea
                          value={issues}
                          onChange={(e) => setIssues(e.target.value)}
                          placeholder="Please describe any minor scratches, paint chips, custom services, and maintenance history clearly to ensure client confidence..."
                          className="w-full h-32 bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-teal-700/10 focus:border-teal-700 transition-all placeholder-zinc-300"
                        />
                      </div>

                    </div>

                    {/* Back/Next action block */}
                    <div className="flex justify-between items-center">
                      <button 
                        type="button"
                        onClick={() => { AutoNovaAudio.playClick(); setStep('1'); }}
                        className="px-6 py-3 border border-zinc-200 text-zinc-500 hover:text-zinc-800 rounded-xl font-mono text-[9px] font-black uppercase tracking-widest transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => { AutoNovaAudio.playSuccess(); setStep('3'); }}
                        className="px-8 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-mono text-[9px] font-black uppercase tracking-widest shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Next: Pricing</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>

                  </div>

                  {/* Right Column: Photos Dropzone & previews */}
                  <div className="lg:col-span-5 space-y-6">
                    
                    <div className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-200/60 shadow-lg space-y-6 text-left">
                      
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-black text-sm text-teal-950">Vehicle Media Gallery</h3>
                        <span className="font-mono text-[9px] font-bold bg-teal-50 text-teal-800 border border-teal-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {photos.length}/15 Photos
                        </span>
                      </div>

                      {/* AI protip badge */}
                      <div className="p-4 bg-purple-50/60 border border-purple-100 rounded-2xl flex items-start gap-3">
                        <Sparkles className="h-5 w-5 text-purple-700 animate-pulse shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <h4 className="font-display font-extrabold text-[11px] text-purple-950">Pro Tip: Natural Golden Hour Lighting</h4>
                          <p className="text-[10px] text-purple-700 font-medium leading-relaxed">
                            Our AI matches listings with natural daytime sunlight at 2.4x higher conversion index thresholds!
                          </p>
                        </div>
                      </div>

                      {/* Interactive File Dropzone */}
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-zinc-200 hover:border-teal-700 hover:bg-teal-50/20 rounded-2xl p-6 text-center transition-all cursor-pointer group"
                      >
                        <input 
                          type="file"
                          ref={fileInputRef}
                          multiple
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                        <div className="w-12 h-12 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 mx-auto mb-3 group-hover:scale-105 transition-transform">
                          <Camera className="h-6 w-6" />
                        </div>
                        <p className="text-xs font-bold text-zinc-700">Click or drag & drop photos here</p>
                        <p className="text-[10px] text-zinc-400 font-medium mt-1">Supports high-res JPG, PNG (Max 15MB)</p>
                      </div>

                      {/* Previews / list of attached photos */}
                      {photos.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 pt-2">
                          {photos.map((ph, idx) => (
                            <div key={idx} className="relative group rounded-xl overflow-hidden aspect-video border border-zinc-150">
                              <img src={ph.url} alt="attached car" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); removePhoto(idx); }}
                                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-lg shadow transition-transform active:scale-90 cursor-pointer"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                              <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded tracking-wider">
                                Uploaded #{idx + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Fallback mock/pre-loaded thumbnail placeholders */}
                      {photos.length === 0 && (
                        <div className="space-y-2 pt-2">
                          <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Aesthetic Preview Grids</p>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="relative rounded-xl overflow-hidden aspect-video border border-zinc-150 bg-zinc-100 grayscale opacity-40">
                              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHweBDl7p5ObXD-rvag1qV-9RVYsDCAcZj6VfgJi9i6sCZkJoFKh5g8LQzrUR4Kdd2joErnTEteU1YQvcudbHv-2kxBtTlZR4l0KX5RTdgg9qAqQlTc8aAyojTc1JbzzPxTTrg5h416aqUWKFYSNGwEv4H9irLd9-f2Oq7mUkLDN8YE1yR8kEd_gMQ6NSdjyg17Wymx0w66yNUc4lZUeXMJOLoCuOp-XybbSlctzNPiy-ckZ9QxiM3RedFOmVwJ7QRTNeKGz4NU6hH" className="w-full h-full object-cover" alt="exterior" />
                              <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[8px] font-mono uppercase px-1.5 py-0.5 rounded tracking-wider">Exterior</div>
                            </div>
                            <div className="relative rounded-xl overflow-hidden aspect-video border border-zinc-150 bg-zinc-100 grayscale opacity-40">
                              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFZBvmwM7F3G2CuHwHR2feqGLo8z9-bhDmVKi4o7A8Ckyn8f2o6PkWDz3v4SIsyc_A4m9xmlcdYKwyLbhwk0BhnaJT3zKFJ3_zw82fZuPWPjzdEra-JoKO4Rh9-wY6Myu9L7JEN99yxJi8C-hMx3gNecBUdQbjii2pUGySZmV-wydT60NkB0VlfC-1kA-_m3Jh4cdgDKxN1Vr5F8mDXI0hVvW7ohQ5_U6BjhlYnB7hs2ecUu3AxVfIAnZPuE1DsvGnK_eMOdnT9-yf" className="w-full h-full object-cover" alt="interior" />
                              <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[8px] font-mono uppercase px-1.5 py-0.5 rounded tracking-wider">Interior</div>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>

                  </div>

                </div>
              </motion.div>
            )}

            {/* -------------------- STEP 3: PRICING -------------------- */}
            {step === '3' && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-5xl mx-auto space-y-8"
              >
                <div className="text-left space-y-2">
                  <span className="font-mono text-[8.5px] text-teal-800 uppercase tracking-widest block font-black">STEP 03 OF 04</span>
                  <h1 className="text-3xl font-display font-black text-teal-950 tracking-tight leading-none">Set Your Price</h1>
                  <p className="text-xs text-zinc-500 font-medium">Fine-tune your asset valuation parameters and set targeted sale metrics.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left: Range and inputs */}
                  <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white rounded-3xl p-6 md:p-8 border border-zinc-200/60 shadow-lg space-y-6 text-left">
                      
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-teal-700 animate-pulse" />
                        <h2 className="font-display font-black text-sm text-teal-950 uppercase tracking-wider">Priced by AI Intelligence</h2>
                      </div>

                      {/* Suggested range banner */}
                      <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-200/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <p className="font-mono text-[8.5px] font-bold text-zinc-400 uppercase tracking-widest">AI SUGGESTED LISTING RANGE</p>
                          <p className="font-display text-2xl font-black text-teal-950 mt-1">
                            ${range.low.toLocaleString()} — ${range.high.toLocaleString()}
                          </p>
                        </div>
                        <div className="sm:text-right">
                          <p className="font-mono text-[8.5px] font-bold text-zinc-400 uppercase tracking-widest">ESTIMATED SALE DURATION</p>
                          <p className="font-sans text-xs font-extrabold text-teal-800 mt-1 uppercase">4 - 7 Business Days</p>
                        </div>
                      </div>

                      {/* Range slider */}
                      <div className="space-y-4 pt-4">
                        <div className="flex justify-between items-center text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                          <span>Low Price Profile</span>
                          <span>AutoNova Optimal</span>
                          <span>High Spec Margin</span>
                        </div>
                        
                        <input 
                          type="range"
                          min={range.low * 0.8}
                          max={range.high * 1.2}
                          step={500}
                          value={listingPrice}
                          onChange={(e) => setListingPrice(parseInt(e.target.value))}
                          className="w-full accent-teal-700 cursor-pointer h-2 bg-zinc-100 rounded-lg appearance-none"
                        />

                        <div className="flex justify-between text-[9px] font-mono text-zinc-400">
                          <span>${Math.floor(range.low * 0.8).toLocaleString()}</span>
                          <span className="text-teal-700 font-bold">Optimal AI Zone: ${Math.floor((range.low + range.high)/2).toLocaleString()}</span>
                          <span>${Math.floor(range.high * 1.2).toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Manual inputs fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
                        
                        {/* Final listing price */}
                        <div className="text-left space-y-1.5">
                          <label className="block font-mono text-[8.5px] font-bold text-zinc-400 uppercase tracking-widest">Your Listing Price</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans font-black text-zinc-400 text-sm">$</span>
                            <input 
                              type="number"
                              required
                              value={listingPrice}
                              onChange={(e) => setListingPrice(parseInt(e.target.value) || 0)}
                              className="w-full h-12 pl-8 pr-4 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-extrabold text-teal-950 focus:outline-none focus:ring-2 focus:ring-teal-700/10 focus:border-teal-700 transition-all"
                            />
                          </div>
                        </div>

                        {/* Target sale date */}
                        <div className="text-left space-y-1.5">
                          <label className="block font-mono text-[8.5px] font-bold text-zinc-400 uppercase tracking-widest">Target Sale Date (Optional)</label>
                          <input 
                            type="date"
                            value={targetDate}
                            onChange={(e) => setTargetDate(e.target.value)}
                            className="w-full h-12 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-800 px-4 focus:outline-none focus:ring-2 focus:ring-teal-700/10 focus:border-teal-700 transition-all"
                          />
                        </div>

                      </div>

                    </div>

                    {/* Back / Next action button list */}
                    <div className="flex justify-between items-center">
                      <button 
                        type="button"
                        onClick={() => { AutoNovaAudio.playClick(); setStep('2'); }}
                        className="px-6 py-3 border border-zinc-200 text-zinc-500 hover:text-zinc-800 rounded-xl font-mono text-[9px] font-black uppercase tracking-widest transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => { AutoNovaAudio.playSuccess(); setStep('4'); }}
                        className="px-8 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-mono text-[9px] font-black uppercase tracking-widest shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Next: Review Listing</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>

                  </div>

                  {/* Right column: Upsell booster, preview card, security badges */}
                  <div className="lg:col-span-4 space-y-6">
                    
                    {/* limited boost upsell card */}
                    <div className="p-[2px] rounded-3xl bg-gradient-to-r from-teal-500 to-purple-600 shadow-md">
                      <div className="bg-zinc-900 rounded-[22px] p-6 text-white text-left space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="p-1 rounded bg-teal-500 text-zinc-900">
                            <Zap className="h-3.5 w-3.5 fill-current" />
                          </span>
                          <span className="font-mono text-[8px] font-bold tracking-widest uppercase text-teal-400">LIMITED TIME BOOST</span>
                        </div>

                        <h3 className="font-display font-black text-base leading-snug">Reach 3x more buyers</h3>
                        <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
                          Our Premium Algorithm prioritizes boosted assets in decentralized collector search views and priority targeted media channels.
                        </p>

                        <div className="space-y-2 text-[10px] text-zinc-300 font-semibold">
                          <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-teal-400" /> Top of Collector Search results</div>
                          <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-teal-400" /> Professional photo editing rebate</div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            AutoNovaAudio.playSuccess();
                            setIsBoosted(!isBoosted);
                            showNotification(isBoosted ? "Premium boost removed" : "Premium algorithmic boost applied!", "success");
                          }}
                          className={`w-full py-3 rounded-xl font-mono text-[9px] font-black uppercase tracking-widest cursor-pointer transition-all ${
                            isBoosted 
                              ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg ring-2 ring-white/10' 
                              : 'bg-teal-500 hover:bg-teal-600 text-zinc-950 font-black shadow-md'
                          }`}
                        >
                          {isBoosted ? "Boost Active! ($49.00)" : "Add Boost for $49.00"}
                        </button>
                      </div>
                    </div>

                    {/* Security widget card */}
                    <div className="bg-white rounded-3xl p-6 border border-zinc-200/60 shadow-sm text-left flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                        <Lock className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-display font-extrabold text-xs text-teal-950">Encrypted Transactions</h4>
                        <p className="text-[10px] font-medium text-zinc-500 leading-relaxed">
                          All financial transactions and escrow parameters are monitored in secured institutional digital accounts.
                        </p>
                      </div>
                    </div>

                  </div>

                </div>
              </motion.div>
            )}

            {/* -------------------- STEP 4: REVIEW & PREVIEW -------------------- */}
            {step === '4' && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-5xl mx-auto space-y-8"
              >
                <div className="text-left space-y-2">
                  <span className="font-mono text-[8.5px] text-teal-800 uppercase tracking-widest block font-black">STEP 04 OF 04</span>
                  <h1 className="text-3xl font-display font-black text-teal-950 tracking-tight leading-none">Final Review</h1>
                  <p className="text-xs text-zinc-500 font-medium">Verify how your luxury vehicle listing card will render live to counterparties.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Live High-fidelity card layout */}
                  <div className="lg:col-span-8 space-y-6">
                    
                    <div className="flex justify-between items-center text-left">
                      <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">LIVE APP PREVIEW</p>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-100/60 border border-teal-200 text-[8px] font-mono font-bold text-teal-800 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
                        PREVIEW ENGINE ACTIVE
                      </span>
                    </div>

                    {/* Preview listing frame */}
                    <div className="bg-white rounded-3xl border border-zinc-200/60 shadow-lg overflow-hidden text-left">
                      
                      {/* Image frame */}
                      <div className="relative h-64 md:h-80 bg-zinc-150">
                        <img 
                          src={getHeroPhoto()} 
                          alt="live vehicle preview" 
                          className="w-full h-full object-cover select-none"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        
                        {/* Floating elements inside image */}
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button
                            type="button"
                            onClick={() => { AutoNovaAudio.playClick(); setStep('2'); }}
                            className="bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl font-mono text-[8px] font-black uppercase tracking-widest text-zinc-700 hover:bg-white shadow transition-all cursor-pointer"
                          >
                            Edit Media
                          </button>
                        </div>

                        <div className="absolute bottom-6 left-6 text-white space-y-1">
                          <h2 className="font-display font-black text-xl md:text-2xl tracking-tight">
                            {year} {make} {model}
                          </h2>
                          <p className="text-[10px] font-semibold font-mono uppercase tracking-widest text-zinc-300">
                            {trim} • {condition} Grade
                          </p>
                        </div>
                      </div>

                      {/* Pricing, Mileage, condition pills row */}
                      <div className="p-6 md:p-8 grid grid-cols-3 gap-4 border-b border-zinc-100">
                        <div className="space-y-0.5">
                          <span className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest block">LISTING PRICE</span>
                          <p className="font-display text-xl md:text-2xl font-black text-teal-950">${listingPrice.toLocaleString()}</p>
                          <span className="text-[8px] font-semibold text-teal-800 uppercase tracking-wider bg-teal-50 border border-teal-100 px-1.5 py-0.5 rounded-md inline-block">AI Suggested Optimal</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest block">MILEAGE</span>
                          <p className="font-display text-xl md:text-2xl font-black text-teal-950">{parseInt(mileage).toLocaleString()} mi</p>
                          <span className="text-[8px] font-medium text-zinc-400 block mt-1 uppercase tracking-widest">Low usage index</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest block">GRADE STATUS</span>
                          <p className="font-display text-xl md:text-2xl font-black text-teal-950">{condition}</p>
                          <span className="text-[8px] font-medium text-zinc-400 block mt-1 uppercase tracking-widest">Excellent interior</span>
                        </div>
                      </div>

                      {/* Detailed technical specs bento box */}
                      <div className="p-6 md:p-8 space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-display font-black text-xs md:text-sm text-teal-950 uppercase tracking-wider">Estimated Tech specs</h3>
                          <button
                            type="button"
                            onClick={() => { AutoNovaAudio.playClick(); setStep('1'); }}
                            className="font-mono text-[8px] font-black uppercase text-teal-700 hover:text-teal-950 flex items-center gap-1"
                          >
                            Edit Details
                          </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-150">
                            <span className="text-[9px] font-mono font-bold text-zinc-400 block uppercase tracking-widest">DRIVETRAIN</span>
                            <span className="font-extrabold text-teal-950 mt-1 block text-[11px]">{make === 'Tesla' || make === 'Lucid' ? 'Dual-Motor AWD' : 'RWD Premium'}</span>
                          </div>
                          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-150">
                            <span className="text-[9px] font-mono font-bold text-zinc-400 block uppercase tracking-widest">PROPULSION</span>
                            <span className="font-extrabold text-teal-950 mt-1 block text-[11px]">{make === 'Tesla' || make === 'Lucid' ? 'Electric AC' : 'Gasoline Twin Turbo'}</span>
                          </div>
                          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-150">
                            <span className="text-[9px] font-mono font-bold text-zinc-400 block uppercase tracking-widest">0-60 MPH</span>
                            <span className="font-extrabold text-teal-950 mt-1 block text-[11px]">{make === 'Lucid' ? '1.89s' : '2.8s'}</span>
                          </div>
                          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-150">
                            <span className="text-[9px] font-mono font-bold text-zinc-400 block uppercase tracking-widest">ESCROW VERIFIED</span>
                            <span className="font-extrabold text-teal-950 mt-1 block text-[11px]">Level 3 Ready</span>
                          </div>
                        </div>
                      </div>

                      {/* Seller's note */}
                      {issues && (
                        <div className="p-6 md:p-8 bg-zinc-50/50 border-t border-zinc-100">
                          <h3 className="font-display font-black text-xs text-teal-950 uppercase tracking-wider mb-2">Seller's notes</h3>
                          <p className="text-xs text-zinc-600 font-medium leading-relaxed font-sans">{issues}</p>
                        </div>
                      )}

                    </div>

                  </div>

                  {/* Right Column: Actions sidebar */}
                  <div className="lg:col-span-4 space-y-6">
                    
                    <div className="bg-white rounded-3xl p-6 border border-zinc-200/60 shadow-lg space-y-6 text-left">
                      <h3 className="font-display font-black text-sm text-teal-950 uppercase tracking-wider">Publish listing</h3>
                      
                      <div className="space-y-3 text-xs">
                        <div className="flex gap-2.5 p-3.5 bg-teal-50 border border-teal-100 rounded-2xl">
                          <CheckCircle2 className="h-4.5 w-4.5 text-teal-700 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-extrabold text-teal-950">Verified specifications</p>
                            <p className="text-[10px] text-zinc-500 font-medium leading-normal mt-0.5">
                              Our AI has matched your specs against regulatory frameworks for immediate listing confidence.
                            </p>
                          </div>
                        </div>

                        {isBoosted && (
                          <div className="flex gap-2.5 p-3.5 bg-purple-50 border border-purple-100 rounded-2xl">
                            <Zap className="h-4.5 w-4.5 text-purple-700 shrink-0 mt-0.5 fill-current" />
                            <div>
                              <p className="font-extrabold text-purple-950">Premium Boost applied</p>
                              <p className="text-[10px] text-zinc-500 font-medium leading-normal mt-0.5">
                                Prioritized listing reach will begin immediately upon publishing approval.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Core Trigger Buttons */}
                      <div className="space-y-3">
                        <button
                          type="button"
                          disabled={isPublishing}
                          onClick={handlePublishListing}
                          className="w-full h-12 bg-teal-700 hover:bg-teal-800 text-white font-mono text-[9px] font-black uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {isPublishing ? (
                            <>
                              <RefreshCw className="h-4.5 w-4.5 animate-spin" />
                              <span>PUBLISHING LEDGER...</span>
                            </>
                          ) : (
                            <>
                              <Zap className="h-4.5 w-4.5 text-teal-300 fill-teal-300" />
                              <span>Publish Listing Now</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            showNotification("Listing saved safely in local member draft vaults", "success");
                            onNavigateToView('portfolio');
                          }}
                          className="w-full h-11 border border-zinc-200 text-zinc-500 hover:text-zinc-800 rounded-xl font-mono text-[9px] font-black uppercase tracking-widest transition-colors cursor-pointer"
                        >
                          Save as Draft
                        </button>
                      </div>

                      <p className="text-[10px] text-zinc-400 font-medium leading-normal text-center">
                        By publishing, you approve the AutoNova secure escrow <a href="#" className="text-teal-700 font-bold hover:underline">Sellers Agreement</a>.
                      </p>
                    </div>

                    {/* advisor help widget card */}
                    <div className="bg-zinc-900 text-white rounded-3xl p-6 space-y-3 text-left">
                      <div className="flex items-center gap-2.5">
                        <HelpCircle className="h-5 w-5 text-teal-400" />
                        <h4 className="font-display font-black text-xs uppercase tracking-wider">Expert review available</h4>
                      </div>
                      <p className="text-[10px] text-zinc-400 leading-relaxed font-medium">
                        Our pricing specialists are active 24/7 on private chats to audit specifications before listing approval.
                      </p>
                      <button 
                        onClick={() => { AutoNovaAudio.playClick(); showNotification("Connecting to private advisor channels...", "info"); }}
                        className="text-teal-400 hover:text-teal-300 text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-1"
                      >
                        <span>Chat with Advisor</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>

                  </div>

                </div>
              </motion.div>
            )}

            {/* -------------------- STEP: SUCCESS CELEBRATION -------------------- */}
            {step === 'success' && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-2xl mx-auto py-12 text-center space-y-8"
              >
                <div className="w-20 h-20 bg-teal-50 border border-teal-100 rounded-full flex items-center justify-center text-teal-700 mx-auto animate-bounce shadow-md">
                  <CheckCircle2 className="h-10 w-10" />
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-[9px] text-teal-700 block uppercase tracking-widest font-black">TRANSACTION APPROVAL GRANTED</span>
                  <h1 className="text-4xl font-display font-black text-teal-950 tracking-tight leading-none">
                    Listing Published Live!
                  </h1>
                  <p className="text-sm text-zinc-500 font-medium max-w-md mx-auto leading-relaxed">
                    Hooray! Your <strong className="text-teal-950">{year} {make} {model}</strong> has been successfully registered in our decentralized active node marketplace.
                  </p>
                </div>

                {/* mini card layout summary */}
                <div className="bg-white rounded-3xl p-6 border border-zinc-200/60 shadow-lg text-left divide-y divide-zinc-100 max-w-md mx-auto">
                  <div className="pb-4 flex justify-between items-center">
                    <div>
                      <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">ASSET</p>
                      <p className="font-sans text-xs font-extrabold text-teal-950 mt-0.5">{year} {make} {model}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">MILEAGE</p>
                      <p className="font-sans text-xs font-extrabold text-teal-950 mt-0.5">{parseInt(mileage).toLocaleString()} mi</p>
                    </div>
                  </div>

                  <div className="pt-4 pb-4 flex justify-between items-center">
                    <div>
                      <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">PRICE POINT</p>
                      <p className="font-sans text-xs font-extrabold text-teal-950 mt-0.5">${listingPrice.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">BOOST METRIC</p>
                      <p className="font-sans text-xs font-extrabold text-teal-950 mt-0.5 uppercase">
                        {isBoosted ? "Premium 3x reach active" : "Standard reach"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <div>
                      <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">NODE HASH CODE</p>
                      <p className="font-mono text-[9px] text-zinc-500 mt-0.5 uppercase font-medium">AN-LGT-{Math.floor(Math.random() * 900000 + 100000)}</p>
                    </div>
                    <span className="font-mono text-[8px] font-bold bg-teal-50 text-teal-800 border border-teal-100 px-2 py-0.5 rounded-full uppercase">
                      ACTIVE & SECURED
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-4">
                  <button
                    onClick={() => { AutoNovaAudio.playClick(); setStep('start'); setAppraisalResult(null); setPhotos([]); setIssues(''); }}
                    className="flex-1 py-3.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-mono text-[9px] font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                  >
                    List Another Car
                  </button>
                  <button
                    onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('portfolio'); }}
                    className="flex-1 py-3.5 bg-teal-950 hover:bg-teal-900 text-white font-mono text-[9px] font-black uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
