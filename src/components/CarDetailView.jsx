import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { AutoNovaAudio } from './AudioEngine';
import { 
  Heart, Share2, MapPin, CheckCircle2, Award, Sliders, Calendar, 
  Settings, Layers, Palette, Sparkles, Star, MessageSquare, 
  X, ChevronRight, ChevronLeft, ArrowRight, Gauge, Zap, Globe, Shield, HelpCircle
} from 'lucide-react';

const CAR_DETAILS_MAP = {
  'lucid-air-sapphire': {
    location: 'Lekki Phase 1, Lagos',
    transmission: 'Automatic',
    drivetrain: 'AWD',
    features: [
      'Triple-motor high-voltage powertrain with 1,234 horsepower',
      'Active torque vectoring & advanced thermal cooling matrices',
      'Glass Canopy panoramic roof with heat-blocking thermal glaze',
      'Plush sapphire blue Alcantara sport seating with heating & massage',
      'DreamDrive Pro ADAS with 32 onboard sensor grids & LiDAR telemetry',
      'Ultra-high voltage 900V+ fast charging capability'
    ],
    history: {
      accidentFree: true,
      owners: 1,
      serviceRecords: 'Full Digital Ledger Sync',
      conditionReport: '99/100 Certification Grade'
    },
    insight: 'This Lucid Air Sapphire matches your preference for extreme-performance electric luxury and fits perfectly within your prestige profile. Currently valued 4.2% below peak regional market index.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDkJ0zwwxlwrwslVTMfs8c3QrcRpLiqUwApeEhRuvAkLe2OM_eSsC9cr7rf2LVAN-z55D0EE-6pDpGa4FJUNoMOlZ8UxDrACojFw0kelOBr-wjKEszUNTtzh94ZfMW_I6gR0liK-B9VmuXD-Sx-5RX5mupOpzw7KBtVrZg9Cgh7_HUK7bFGxl3Ae1wV8qoIKqnFIdVn6e-Iuxl7icVxrK2Zk0XAkh4sLHprjLFPk6LpCGP6-TCbiI4sz2jICpK92zAgXyCdTrcLcVSw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDGtBMkBCNR_kS8rPCx-yXePc3GNWtiGwan09l6ckMYfMNkJ_Zz-XeBOh6xDStp1G4_DePOwIO9NrHrZw_rJ_GfTN4-GmerYQ-T29fROJ8HTM0RFEuWBTkryeBWmJbaT8H3tW33rraZLjmkEV0w7Gh4P3MqORjbWAZmrVDJ4Fp_BdLjKDQ7eWyA6QL7d-eACgZrHzzpW9yfWFDfs5fk6XWWuKd04RBd_mSkONd_3ya5wFzn0Hf1-D8gTgErET9dmEfL12Xtbnb6CMVc',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDnVlshgD2oICOARmvNR2tCatWwNtDXuuWN6wowqblc2FNZlUfQArNv2KL8wRbNKdYt1gE8UtE8B5eMxjXj92-QqB9OVfHlHaWb8Q3-qH6F9WaPbPuDiBAweizou7s9WKpZHX1RTEw96fF744XVahoSBWvZUpQgFdf_tLZbg25zCdoSEG1YAsPyZ24Prm_ow1yDeOG4xdoBUIqPAAtpdewTj2zrBVMAbRo1if9cGD5HSw_k7ZtzTqwkY-Ufl6-CJnAHhQdy2Ry1FydK',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDLmvVpJ-V9UaZqbD60d16rpeAZNrcjBudX2_VAANAgci0BoTqrZOH7YVtaML1cJrQ_3pu2DclI6i_eOuhPDHnha6cFrEiPxMdMKO_pOvVA7VvQ8tH0HK-jozbZV10GrwXu692bKBoJV1kCI3zda5ormtRsJRSCdsDDp6XlbxI5d-cNF_jIntuagvzZ1l7Ll3DpDXzErFgYtqc-XFYq6ZK6udpfiBAXhzqDfnNoFbpXEt_sU2uSGHqd737Yj2HbcDWi5UmdDsPp70Jf',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCe0dbUtyWbUnaK1Rw3774j1OUPhQT2mjNk7bxlie2ZAJnCRiz-JJa5TdvrFUz1S9wZBd9p6_0WMk7eB-q9NHlXZaeEePyesGqAqh2Ug0VyWKHHw2P3tsa8ItWlG1pO3aLeZXDfy_xDwVZvFlbmQKXTUm8PFZQPmp5UeHawBcsnsY9qPC_3iFgL7St6tZ1yHmJNSqkpAIz1vVJQLQtX_6be-fJ-57rCtupRklxrrHCbpl0CMUeIf4aKcg9PBzNQC5bcy_SYjYyZevaC',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDvRq98RKFmt5dd5ouRn8iDfoyFlFpl7bZQTtczYx6oEdrv_1QyWsDmYACAq8dx9CsKx8Mc4wdZxDEIKV_caa5iENkmPIPequfI7D4DMtFmQyFbsH4C6g9Zk2F4DSamJgAzwpWusTIZClj28AwFyaTjgsROSXW_nVEji4RDntU0qnB3vZvd5HTTASJwUBJbhg-DHuLkliMSPWg_XvxpF66Pz9ojugKuB5_NXYP43cdeETAwuAxLiG-W6gP87msmrmZP_1KLo5aQW8Nj'
    ]
  },
  'porsche-taycan-turbo-s': {
    location: 'Victoria Island, Lagos',
    transmission: 'Automatic',
    drivetrain: 'AWD',
    features: [
      'High-voltage 800V battery architecture with 938 hp output',
      'Porsche Active Ride adaptive air suspension system',
      'Carbon Ceramic Braking System (PCCB) with speed yellow calipers',
      'Full premium leather interior with Neptune Blue contrast stitching',
      'Panoramic roof with intelligent light control liquid crystal grids',
      'Sport Chrono package with premium dial dashboard timers'
    ],
    history: {
      accidentFree: true,
      owners: 1,
      serviceRecords: 'Porsche Certified Digital Logbook',
      conditionReport: '98/100 Showroom Grade'
    },
    insight: 'Uncompromising German precision meets absolute high-voltage tracking. Its current valuation matches the median pricing index for premium European performance imports.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDXeXQAoS4uQ5b6L6RXuQbDOrNOouAh5pnP3pQv9NqrMlwCKhuGtnyW4o_nGOjslRnglfA3Ho1x7BigYrsYcbg5NCOiX4yjCkNd5DHUms9CqS3XnqFT_tdZ1loZZElLw04C3d1ofr-cX6HDKxK_mN1soViYItMefmGcuPYUn-zcXCpm6TlZ0lwLBfmWkcBA_vdKczCu_Tst_K2Li7xeqNrbLzYGbtJon4A6_j2Bb0co9yO1GCzlAAR_84l0T5m5O2QULKie20xiZpa0',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCx9zwVABtxNpxHJnIRD0ABO213wD--vZD4zKb9KDxsvsvJVeK4JeQemlcuuIIoYna2RRL_px2QkSvdq80EULBGKbccLFtJW5YEsaK9dRSKRSiTpImOMu49fTSEB_jnCms10UnwE191lBJgHomqrDF-ublMPQEASING91m5IhdN_qTmyCp4VTJY2nrSqz0rk8ELajyJ3-pCTnxg8sAbrYd4_2dQxVvLNFr6SAmiSTSqafOdwOo_ATJ5hGiSezz1dxYoNC4ebtciERnx'
    ]
  },
  'rivian-r1s-dual': {
    location: 'Maitama, Abuja',
    transmission: 'Automatic',
    drivetrain: 'AWD',
    features: [
      'Dual-motor performance AWD with 600 horsepower output',
      'Dynamic Height-Adjustable Quad-Air Suspension',
      'Three-row adventure luxury seating configurations (7 passengers)',
      'Expandable modular gear tunnel & onboard air compressor system',
      'Rivian Elevation audio by Meridian with removable camp speaker',
      'Stellar panoramic glass roof paneling'
    ],
    history: {
      accidentFree: true,
      owners: 1,
      serviceRecords: 'Rivian Network Records',
      conditionReport: '96/100 Adventure Certified'
    },
    insight: 'This three-row electric SUV represents maximum luxury utility. Perfect for coastal adventures, with standard AWD and adaptive height-adjustable safety profiles.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD2LiiHj1foWuKHwElPilXwrkqsp0PLxZs5W_fio2JLN91wC2nA0uNsutLLh1HFwnxzZbx7G8MJr-0KJc1kXwNvFx5n8z33VKln3vn5xGyxkCZ2xyBZLdggOEPlyFPpR5nlu3ZCdI-W-G7NpG5lZawLU57caeKn2xH6ijV0-bKSd56X1BRlvbypPn6zBkwXOX6RPK4NU8j92H7UMAZ9x7oIhF_EM0xEtfXzGxstn4Osk7dSzlZvCiJHhniAVhYlPsQZBnjNgJvgNakq'
    ]
  },
  'lotus-emeya': {
    location: 'Ikeja GRA, Lagos',
    transmission: 'Automatic',
    drivetrain: 'AWD',
    features: [
      'Dual-motor hyper-GT powertrain delivering 905 horsepower',
      'Active aerodynamics with rear wing and front air dams',
      'Carbon Ceramic high-end braking system',
      'Intelligent high-fidelity audio system from KEF',
      'Luxurious sustainable alcantara upholstery with yellow accents',
      'Ultra-fast DC charging supporting up to 350kW'
    ],
    history: {
      accidentFree: true,
      owners: 1,
      serviceRecords: 'Lotus Official Warranty Tracked',
      conditionReport: '100/100 Showroom Pristine'
    },
    insight: 'A breathtaking electric GT that combines British legacy ride comfort with incredible speed. Highly recommended for executive luxury drivers seeking exclusive styling.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD_9bDjwS1ptNdryZoM7g-uoQX1kWyZ8khm15AP9yTmw_erPxxxnHOBWRT-rhvWQNX1zLxPYyYWXykqRoI2y9KZde03160JFjJUBMdtBwWplsZS2d2NSM1A0IQS-H3Ju9xDsG77vi9ylYit-9K22RwyeRy7vQzgpzeFCmM9iuq7BI7gJ2SlxvSormulnebQfyfaP3Ajn5ixyZnJhaof2laSbUmZlcCkTWKz60D-fkgCodrVRaiTJGPmHIluYn44tCBO0V6TArGcPdZJ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuALiF2rwUZMJSg6ofHzjHefvsz0yP8nV1r2pCDaTFwtoGYiPCgnV09IbD83tAGgKaNzNb4JM4umPXSGeWNMd6YyhQk7_uxXJLFhRkyU6ZWQnBxfFFOjbH1558EZom6vsfQRNpUIHgGOJL7BaJMYqiLD-XTDxa_lemlcqUAzEhSyTXed1wXw68Zvzl8DMBXYpvFxgVVqh5jb1gX725WIxI5qArSx8wC2jItZv7ML9GlyGRKvq6O8I9C12soDWA7YHI4SE2f-CZDOKaBs'
    ]
  },
  'tesla-model-s-plaid': {
    location: 'Ikoyi, Lagos',
    transmission: 'Automatic',
    drivetrain: 'AWD',
    features: [
      'Tri-motor powertrain with carbon-sleeved rotors and 1,020 HP',
      'Yoke steering with ultra-high resolution center infotainment',
      'Active Road Noise Reduction audio with 22 surround-sound speakers',
      'Rear seat entertainment display with custom gaming capability',
      'Full self-driving hardware computer suite (HW4)',
      'Integrated heat pump for extreme winter efficiency'
    ],
    history: {
      accidentFree: true,
      owners: 1,
      serviceRecords: 'Tesla OTA Service Log',
      conditionReport: '95/100 Excellent Grade'
    },
    insight: 'The ultimate production daily driver. Offering matching 1.99s acceleration and exceptional digital integration. One of the best performance-value propositions.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC8Drvp11H1ypFn_QSmZn7fbx7w4bjgGUBDIL6N5zhaL1gxBTRjqXsBbewr5uOGbdTFQxyNOzCfU5O_3ILW7QsVSDB7kH3mf0zTb2mOMZaNt1q4uN6H6oq-0cvyjYrcPJO1oTOrMvBLHaWMLa5VYHmt8SIM9XHfORL9QeOs5z-42fLCguuqhxIjVym8W2QkFURzZTu6VmHC79s7OgGJw8f3o8z91Zql322cb6O7qaw61F4W1Ikf5uEWI8xroiNyfBlhyhLOjOIfsv3v',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBL10v49dyQDfsIrmpct4nt_YvEI10UrGhbHoRY1UkrEjJjFryrbU2i7IGkbMAXfZcjIc55oRirvU6ZUQhFocpeBz8u_N_oB_aG55knBDz8yuojPh9y90sqJBNKwGbLuvK5Sm7TvvIZRwga99maeTZpjHJ5w9tSh3_TUiFOO1QIp6CGUrqjDsMYuZJKY95ltxONbcwAabxl9noxRtKTitULzjfoo39Jxa9zU6_H0aSriXqfP92TfBWnhXRTYj-yk5qviVjrUUPHBe_J'
    ]
  }
};

export const CarDetailView = ({ 
  car, 
  onBack, 
  onSelectCar, 
  showNotification, 
  favoritedCars, 
  handleFavoriteToggle,
  allRecommendations,
  cartItems,
  setCartItems
}) => {
  const navigate = useNavigate();
  const details = CAR_DETAILS_MAP[car.id] || {
    location: 'Lagos, Nigeria',
    transmission: 'Automatic',
    drivetrain: 'AWD',
    features: [
      'High-capacity lithium battery modular system',
      'Intelligent drive cockpit with dynamic control UI',
      'Sovereign safety alert diagnostics with 360 view support',
      'Premium sound design with sound dampening technology',
      'High performance multi-link adaptive suspension setup'
    ],
    history: {
      accidentFree: true,
      owners: 1,
      serviceRecords: 'AutoNova Virtual Ledger Sync',
      conditionReport: '97/100 Pre-Owned Certified'
    },
    insight: `This ${car.name} is optimized specifically for elite performance. Fits beautifully within luxury commuting routes with certified battery packs.`,
    images: [car.image]
  };

  const images = details.images && details.images.length > 0 ? details.images : [car.image];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'features' | 'history' | 'seller' | 'reviews'
  
  // Interactive finance calculator state
  const [downPayment, setDownPayment] = useState(Math.round(car.price * 0.1)); // 10% default
  const [loanTerm, setLoanTerm] = useState(60); // 60 months default
  
  // Virtual booking modal
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDate, setBookingDate] = useState('2026-07-15');
  const [bookingTime, setBookingTime] = useState('14:00');
  const [bookingSubmitting, setBookingSubmitting] = useState(false);

  // Chat with Elite Motors Seller tray state
  const [showChatTray, setShowChatTray] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'seller', text: `Greetings! I am Julian from Elite Motors, representing this exquisite ${car.name}. How can I assist with your acquisition plans today?` }
  ]);
  const [chatInput, setChatInput] = useState('');

  // 360 virtual viewer simulation
  const [is360Active, setIs360Active] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  const calculateMonthlyPayment = () => {
    const principal = car.price - downPayment;
    const monthlyRate = 0.049 / 12; // 4.9% APR
    const term = loanTerm;
    if (principal <= 0) return 0;
    
    // Standard amortization formula
    const payment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
    return Math.round(payment);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    AutoNovaAudio.playClick();
    setBookingSubmitting(true);
    
    setTimeout(() => {
      setBookingSubmitting(false);
      setShowBookingModal(false);
      AutoNovaAudio.playSuccess();
      showNotification(`Private test drive confirmed for ${bookingDate} at ${bookingTime}. Elite Motors counselor assigned!`, "success");
    }, 1500);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    AutoNovaAudio.playClick();
    const userMsg = { sender: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    // Dynamic smart response logic
    setTimeout(() => {
      AutoNovaAudio.playSuccess();
      let responseText = "Excellent question. The certified battery module has undergone exhaustive diagnostic audits and registers at 98.7% health capacity. Would you like me to reserve a digital workspace for virtual inspection?";
      
      const query = chatInput.toLowerCase();
      if (query.includes('price') || query.includes('discount') || query.includes('cost')) {
        responseText = `Our asking price of $${car.price.toLocaleString()} is calibrated to regional certified indices. Elite Motors offers bespoke finance routes or cash deposit rewards.`;
      } else if (query.includes('deliver') || query.includes('shipping') || query.includes('lagos') || query.includes('nigeria')) {
        responseText = `We coordinate direct container logistics to Lagos, Abuja, Port Harcourt, and Kano, backed by fully secured customs documentation and transport insurance.`;
      } else if (query.includes('speed') || query.includes('performance') || query.includes('hp') || query.includes('power')) {
        responseText = `This unit features a peak power rating of ${car.specs.power} allowing zero to sixty acceleration in a thrilling ${car.specs.zeroToSixty}. Pure mechanical poetry.`;
      }
      
      setChatMessages(prev => [...prev, { sender: 'seller', text: responseText }]);
    }, 1200);
  };

  const isFav = favoritedCars.includes(car.id);

  // Filter recommendations of similar body types or electric vehicles
  const similarCars = allRecommendations
    .filter(c => c.id !== car.id && (c.type === car.type || c.bodyType === car.bodyType))
    .slice(0, 3);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex-grow"
    >
      {/* Back breadcrumb navigation row */}
      <div className="flex items-center justify-between pb-6">
        <button 
          onClick={() => { AutoNovaAudio.playClick(); onBack(); }}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-teal-800 hover:text-teal-950 uppercase cursor-pointer"
        >
          <span className="font-sans">←</span> Back to Inventory
        </button>
        <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest">
          SYSTEM REF: {car.id.toUpperCase()} // REGIONAL INDEX 401
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Media Showcase & Car Detail Content */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Photo Card */}
          <div className="relative rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 aspect-[16/10] shadow-sm group">
            {is360Active ? (
              <div 
                className="w-full h-full relative flex flex-col items-center justify-center bg-zinc-950 overflow-hidden cursor-ew-resize select-none"
                onMouseMove={(e) => {
                  if (e.buttons === 1) {
                    setRotationAngle(prev => (prev + e.movementX) % 360);
                  }
                }}
              >
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-100"
                  style={{ 
                    backgroundImage: `url(${images[activeImageIndex]})`,
                    transform: `rotateY(${rotationAngle}deg) scale(1.03)`
                  }}
                />
                <div className="absolute top-4 left-4 bg-teal-500/90 text-teal-950 px-2.5 py-1 rounded-full text-[8px] font-mono font-black tracking-widest uppercase">
                  ACTIVE 360° SPATIAL ENGINE
                </div>
                <div className="absolute bottom-4 inset-x-4 text-center">
                  <p className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">Drag horizontally to rotate vehicle workspace coordinates</p>
                </div>
              </div>
            ) : (
              <img 
                src={images[activeImageIndex]} 
                alt={car.name} 
                referrerPolicy="no-referrer"
                onClick={() => { AutoNovaAudio.playClick(); setIsLightboxOpen(true); }}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-102 cursor-zoom-in"
              />
            )}

            {/* Quick-action Overlay Buttons */}
            <div className="absolute top-5 right-5 flex flex-col gap-3">
              <button 
                onClick={(e) => handleFavoriteToggle(car.id, car.name, e)}
                className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-zinc-700 hover:text-rose-500 hover:scale-105 shadow-md flex items-center justify-center transition-all cursor-pointer"
              >
                <Heart className={`h-4.5 w-4.5 ${isFav ? 'text-rose-500 fill-rose-500' : ''}`} />
              </button>
              <button 
                onClick={() => {
                  AutoNovaAudio.playClick();
                  navigator.clipboard.writeText(window.location.href);
                  showNotification("Vehicle catalog link copied to transfer clipboard.", "success");
                }}
                className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-zinc-700 hover:text-teal-700 hover:scale-105 shadow-md flex items-center justify-center transition-all cursor-pointer"
              >
                <Share2 className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* 360 Button HUD */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
              <button 
                onClick={() => { AutoNovaAudio.playClick(); setIs360Active(!is360Active); }}
                className={`px-5 py-2.5 rounded-full font-mono text-[9px] font-black uppercase tracking-wider shadow-xl border flex items-center gap-2 transition-all cursor-pointer hover:scale-103 ${
                  is360Active 
                    ? 'bg-teal-700 text-white border-teal-800' 
                    : 'bg-white/90 backdrop-blur-md text-teal-950 border-zinc-200 hover:bg-white'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${is360Active ? 'bg-teal-300 animate-pulse' : 'bg-teal-700'}`} />
                {is360Active ? 'Exit Spatial' : 'Simulate 360° View'}
              </button>
            </div>
          </div>

          {/* Gallery Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => { AutoNovaAudio.playClick(); setActiveImageIndex(idx); setIs360Active(false); }}
                  className={`flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all hover:scale-102 ${
                    activeImageIndex === idx && !is360Active
                      ? 'border-teal-700 ring-2 ring-teal-700/20 shadow-md' 
                      : 'border-zinc-200/80 grayscale opacity-80 hover:grayscale-0 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Primary Name & Info Header Block */}
          <div className="p-6 md:p-8 bg-white border border-zinc-200/60 rounded-2xl shadow-sm">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[8px] bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full font-extrabold tracking-widest uppercase">
                    {car.type} PERFORMANCE
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] text-zinc-400 font-mono font-bold uppercase">
                    <MapPin className="h-3 w-3 text-zinc-400" /> {details.location}
                  </span>
                </div>
                
                <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold text-teal-950 tracking-tight">
                  {car.name}
                </h1>

                <div className="flex items-center gap-2 pt-1">
                  <div className="flex items-center gap-1.5 bg-teal-500/10 border border-teal-500/20 text-teal-800 px-3 py-1 rounded-full">
                    <CheckCircle2 className="h-3.5 w-3.5 text-teal-700" />
                    <span className="text-[9px] font-mono font-extrabold uppercase tracking-wider">Verified Nigerian Stock</span>
                  </div>
                </div>
              </div>

              <div className="md:text-right space-y-2 w-full md:w-auto">
                <span className="font-mono text-[8px] text-zinc-400 block tracking-widest uppercase font-extrabold">ACQUISITION VALUE</span>
                <p className="font-display font-black text-2xl md:text-3xl text-teal-950">
                  ${car.price.toLocaleString()}
                </p>
                
                <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-teal-400/10 to-purple-500/10 border border-teal-400/20 text-teal-800 px-3.5 py-1.5 rounded-full shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 text-teal-700 animate-pulse" />
                  <span className="text-[9px] font-mono font-extrabold tracking-wider uppercase">AI SPEC MATCH {car.match}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid of Key Mechanical Parameters */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            
            <div className="bg-white p-5 rounded-2xl border border-zinc-200/60 shadow-sm flex flex-col gap-1.5 hover:shadow-md transition-shadow">
              <Calendar className="h-4.5 w-4.5 text-teal-700" />
              <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-wider font-extrabold">RELEASE YEAR</span>
              <span className="font-display font-extrabold text-teal-950 text-sm">{car.year}</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200/60 shadow-sm flex flex-col gap-1.5 hover:shadow-md transition-shadow">
              <Gauge className="h-4.5 w-4.5 text-teal-700" />
              <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-wider font-extrabold">MILEAGE RANGE</span>
              <span className="font-display font-extrabold text-teal-950 text-sm">{car.mileage}</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200/60 shadow-sm flex flex-col gap-1.5 hover:shadow-md transition-shadow">
              <Zap className="h-4.5 w-4.5 text-teal-700" />
              <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-wider font-extrabold">POWER SOURCE</span>
              <span className="font-display font-extrabold text-teal-950 text-sm">{car.type}</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200/60 shadow-sm flex flex-col gap-1.5 hover:shadow-md transition-shadow">
              <Settings className="h-4.5 w-4.5 text-teal-700" />
              <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-wider font-extrabold">TRANSMISSION TYPE</span>
              <span className="font-display font-extrabold text-teal-950 text-sm">{details.transmission}</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200/60 shadow-sm flex flex-col gap-1.5 hover:shadow-md transition-shadow">
              <Layers className="h-4.5 w-4.5 text-teal-700" />
              <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-wider font-extrabold">DRIVETRAIN ASSEMBLY</span>
              <span className="font-display font-extrabold text-teal-950 text-sm">{details.drivetrain}</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200/60 shadow-sm flex flex-col gap-1.5 hover:shadow-md transition-shadow">
              <Palette className="h-4.5 w-4.5 text-teal-700" />
              <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-wider font-extrabold">COLOR METRICS</span>
              <span className="font-display font-extrabold text-teal-950 text-sm">{car.color}</span>
            </div>

          </div>

          {/* AI Neural Insights Callout Box */}
          <div className="relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-r from-teal-400 via-purple-500 to-teal-400 shadow-md">
            <div className="relative bg-teal-950 text-white p-6 md:p-8 rounded-[15px] space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-teal-800 flex items-center justify-center text-teal-400 shadow-sm">
                  <Sparkles className="h-5 w-5 text-teal-400 animate-pulse" />
                </span>
                <span className="font-mono text-[8px] tracking-widest text-teal-400 font-extrabold uppercase">Nova Intelligence Ledger</span>
              </div>
              
              <h3 className="font-display text-xl font-extrabold">Deep Curation Insights</h3>
              <p className="text-xs text-zinc-300 font-medium leading-relaxed max-w-2xl">
                "{details.insight}"
              </p>
            </div>
          </div>

          {/* Interactive Specification Tabs Panel */}
          <div className="space-y-6 pt-4">
            
            {/* Tabs Selector Navigation Header */}
            <div className="flex border-b border-zinc-200 gap-6 md:gap-8 overflow-x-auto pb-1 scrollbar-hide">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'features', label: 'Advanced Features' },
                { id: 'history', label: 'Vehicle Integrity' },
                { id: 'seller', label: 'Appraisal Counsel' },
                { id: 'reviews', label: 'Dossier Reviews' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { AutoNovaAudio.playClick(); setActiveTab(tab.id); }}
                  className={`pb-4 text-[10px] font-mono tracking-widest font-extrabold uppercase transition-all whitespace-nowrap cursor-pointer relative ${
                    activeTab === tab.id 
                      ? 'text-teal-700' 
                      : 'text-zinc-400 hover:text-zinc-800'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-700" 
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Contents Frame */}
            <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 md:p-8 min-h-[220px] flex flex-col justify-between shadow-sm">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  
                  {activeTab === 'overview' && (
                    <div className="space-y-4">
                      <h4 className="font-display font-extrabold text-teal-950 text-base">Curation Appraisal Report</h4>
                      <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                        {car.desc}
                      </p>
                      <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                        Every system on this vehicle has undergone certified diagnostic ledger sweeps. AutoNova guarantees clean battery modules, software integrations, and precision drive mechanical calibrations.
                      </p>
                    </div>
                  )}

                  {activeTab === 'features' && (
                    <div className="space-y-4">
                      <h4 className="font-display font-extrabold text-teal-950 text-base">Advanced Technical Assembly</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-zinc-500 font-medium">
                        {details.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="p-0.5 rounded bg-teal-50 text-teal-700 mt-0.5">
                              <CheckCircle2 className="h-3.5 w-3.5 text-teal-700" />
                            </span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'history' && (
                    <div className="space-y-4">
                      <h4 className="font-display font-extrabold text-teal-950 text-base">Sovereign Integrity Audit</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-[#fdf8f8] rounded-xl border border-zinc-100 flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                            <Shield className="h-4.5 w-4.5 text-teal-700" />
                          </span>
                          <div>
                            <span className="font-mono text-[7px] text-zinc-400 block font-bold tracking-wider">ACCIDENT METRIC</span>
                            <span className="text-xs font-bold text-teal-950">{details.history.accidentFree ? 'Accident-Free Certified' : 'Repaired Certificate'}</span>
                          </div>
                        </div>

                        <div className="p-4 bg-[#fdf8f8] rounded-xl border border-zinc-100 flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                            <Award className="h-4.5 w-4.5 text-teal-700" />
                          </span>
                          <div>
                            <span className="font-mono text-[7px] text-zinc-400 block font-bold tracking-wider">VEHICLE OWNER COUNT</span>
                            <span className="text-xs font-bold text-teal-950">{details.history.owners} Previous Owner</span>
                          </div>
                        </div>

                        <div className="p-4 bg-[#fdf8f8] rounded-xl border border-zinc-100 flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                            <Sliders className="h-4.5 w-4.5 text-teal-700" />
                          </span>
                          <div>
                            <span className="font-mono text-[7px] text-zinc-400 block font-bold tracking-wider">SERVICE RECORDS STATUS</span>
                            <span className="text-xs font-bold text-teal-950">{details.history.serviceRecords}</span>
                          </div>
                        </div>

                        <div className="p-4 bg-[#fdf8f8] rounded-xl border border-zinc-100 flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                            <Sparkles className="h-4.5 w-4.5 text-teal-700" />
                          </span>
                          <div>
                            <span className="font-mono text-[7px] text-zinc-400 block font-bold tracking-wider">OVERALL CONDITION</span>
                            <span className="text-xs font-bold text-teal-950">{details.history.conditionReport}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'seller' && (
                    <div className="space-y-4">
                      <h4 className="font-display font-extrabold text-teal-950 text-base">Elite Motors Representation</h4>
                      <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-teal-700/20 shadow-md">
                          <img 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-gu_A6zzKD7W7SE0KYdw8WhkpZbw8QCxKAFSE80VlDUAuQcVxW_NASTgXXiaNsYZQwMZhZpjlfJ1AZEAASZ9-R0eTGRsjX6cP0CinROjxIa0gq9Sj7peXCgrovgcFTw9JVW3z3kthUiUfDpYkdThfX07DtiQ2Rdga6FujHvdmtVEys8Hk1pi7Plavob3XYylP56u0F0hcabG_j7n_qknjv7r_iK_KGBweX-Dbd5ctXcRC4JA50pRYRJcyQSsgsSTIBP3GvehP_JHk" 
                            alt="Elite Motors Rep Julian" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-1.5 flex-grow text-center md:text-left">
                          <div className="flex items-center gap-2 justify-center md:justify-start">
                            <span className="font-display font-black text-teal-950 text-base">Elite Motors Ltd</span>
                            <span className="inline-flex items-center gap-1 bg-teal-100 text-teal-800 text-[8px] font-mono px-2 py-0.5 rounded-full font-bold">TOP DECORATED</span>
                          </div>
                          <p className="text-xs text-zinc-500 font-medium">AutoNova certified dealer representation with a response index of &lt; 15 minutes.</p>
                          <div className="flex gap-4 text-[10px] font-mono text-zinc-400 font-bold justify-center md:justify-start">
                            <span className="text-teal-700">★ 4.9/5.0 (248 appraisals)</span>
                            <span>•</span>
                            <span>Secure Escrow Support</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-5">
                      <div className="flex justify-between items-center border-b border-zinc-100 pb-3">
                        <h4 className="font-display font-extrabold text-teal-950 text-base">Verified Community Dossiers</h4>
                        <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">14 ACTIVE REVIEWS</span>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-teal-700 text-white font-mono font-extrabold text-xs flex items-center justify-center">JD</div>
                              <div>
                                <span className="font-display font-extrabold text-teal-950 text-xs block">Julian D.</span>
                                <span className="text-[8px] font-mono text-zinc-400 font-bold uppercase">VERIFIED BUYER • JUNE 2026</span>
                              </div>
                            </div>
                            <div className="flex text-teal-600 gap-0.5">
                              {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-teal-600 text-teal-600" />)}
                            </div>
                          </div>
                          <p className="text-xs text-zinc-500 font-medium italic leading-relaxed">
                            "The acquisition process was pure poetry. Extreme acceleration, spotless engineering, and AutoNova's pricing analytics mapped exactly to the certified condition values."
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>

            </div>

            {/* Interactive Market Comparative Chart Visualization */}
            <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 md:p-8 space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
                <div>
                  <h4 className="font-display font-extrabold text-teal-950 text-base">Real-time Market Valuation Comparison</h4>
                  <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">Comparing this unit value against regional market indexes</p>
                </div>
                <span className="text-[10px] font-mono font-extrabold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full uppercase self-start sm:self-auto">
                  PRICED -4.2% BELOW MARKET AVG
                </span>
              </div>

              {/* Chart bars layout */}
              <div className="space-y-4 pt-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono font-bold uppercase">
                    <span className="text-zinc-500">Average Regional Import Value</span>
                    <span className="text-zinc-600">${Math.round(car.price * 1.042).toLocaleString()}</span>
                  </div>
                  <div className="w-full h-4 bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200/40 relative">
                    <div className="h-full bg-zinc-400 rounded-lg" style={{ width: '92%' }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono font-bold uppercase">
                    <span className="text-teal-950 font-extrabold">AutoNova Listed Curation Unit</span>
                    <span className="text-teal-700 font-black">${car.price.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-5 bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200/40 relative">
                    <div className="h-full bg-teal-700 rounded-lg flex items-center px-3" style={{ width: '84%' }}>
                      <span className="text-[8px] font-mono text-white font-extrabold tracking-wider">OPTIMAL VALVE BUY</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono font-bold uppercase">
                    <span className="text-zinc-500">Premium Franchise Value Peak</span>
                    <span className="text-zinc-600">${Math.round(car.price * 1.15).toLocaleString()}</span>
                  </div>
                  <div className="w-full h-4 bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200/40 relative">
                    <div className="h-full bg-purple-400/80 rounded-lg" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Interactive Acquisition Controls & Dealer Profiles */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 md:p-8 space-y-6 shadow-md md:sticky md:top-24">
            
            {/* Primary Action Buttons */}
            <div className="space-y-3">
              <button 
                onClick={() => {
                  AutoNovaAudio.playSuccess();
                  if (setCartItems) setCartItems([car]);
                  showNotification(`${car.name} added to cart — heading to checkout.`, "success");
                  navigate('/checkout');
                }}
                className="w-full py-4 bg-teal-700 hover:bg-teal-800 text-white font-mono text-[10px] font-black tracking-widest uppercase rounded-xl transition-all cursor-pointer shadow-md text-center hover:scale-[1.01] active:scale-99"
              >
                Buy Now
              </button>
              
              <button 
                onClick={() => {
                  AutoNovaAudio.playClick();
                  if (setCartItems) setCartItems([car]);
                  showNotification(`${car.name} added to your cart.`, "info");
                  navigate('/cart');
                }}
                className="w-full py-3 border border-zinc-200 hover:bg-zinc-50 text-zinc-600 font-mono text-[10px] tracking-widest font-extrabold uppercase rounded-xl transition-all cursor-pointer text-center"
              >
                Add to Cart
              </button>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button 
                  onClick={() => { AutoNovaAudio.playClick(); navigate(`/test-drive/${car.id}`); }}
                  className="py-3 px-2 border border-zinc-200 hover:border-teal-700 hover:bg-teal-50/10 text-zinc-600 hover:text-teal-950 font-mono text-[9px] tracking-wider font-extrabold uppercase rounded-xl transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-1"
                >
                  <Calendar className="h-4 w-4 text-teal-700" />
                  <span>Book Test Drive</span>
                </button>
                <button 
                  onClick={() => { AutoNovaAudio.playClick(); navigate('/dashboard/messages'); }}
                  className="py-3 px-2 border border-zinc-200 hover:border-teal-700 hover:bg-teal-50/10 text-zinc-600 hover:text-teal-950 font-mono text-[9px] tracking-wider font-extrabold uppercase rounded-xl transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-1"
                >
                  <MessageSquare className="h-4 w-4 text-teal-700" />
                  <span>Chat Seller</span>
                </button>
              </div>

              <button
                onClick={() => { AutoNovaAudio.playClick(); navigate(`/compare?ids=${car.id}`); }}
                className="w-full py-2.5 text-teal-700 hover:text-teal-900 font-mono text-[9px] tracking-widest font-extrabold uppercase rounded-xl transition-all cursor-pointer text-center"
              >
                Add to Comparison →
              </button>
            </div>

            <hr className="border-zinc-100" />

            {/* Dynamic Financing Amortization Widget */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h5 className="font-mono text-[9px] text-zinc-400 font-black tracking-widest uppercase">Est. Monthly Payment</h5>
                <span className="font-display font-black text-lg text-teal-950">${calculateMonthlyPayment().toLocaleString()}/mo</span>
              </div>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-500 font-bold">
                    <span>Deposit: ${downPayment.toLocaleString()}</span>
                    <span>10% Required</span>
                  </div>
                  <input 
                    type="range" 
                    min={Math.round(car.price * 0.1)} 
                    max={Math.round(car.price * 0.8)} 
                    step={Math.round(car.price * 0.05)}
                    value={downPayment} 
                    onChange={(e) => { setDownPayment(parseInt(e.target.value)); AutoNovaAudio.playClick(); }}
                    className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-teal-700 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-500 font-bold">
                    <span>Term Duration</span>
                    <span className="text-teal-700 font-extrabold">{loanTerm} Months</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[36, 48, 60].map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => { AutoNovaAudio.playClick(); setLoanTerm(m); }}
                        className={`py-1.5 border font-mono text-[9px] font-black uppercase rounded-lg transition-all ${
                          loanTerm === m 
                            ? 'bg-teal-700 border-teal-800 text-white' 
                            : 'border-zinc-200 hover:bg-zinc-50 text-zinc-500'
                        }`}
                      >
                        {m} Mo
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-zinc-400 leading-normal font-medium pt-1">
                Calibrated against standard regional luxury indexes. Estimated fixed APR rate 4.9%. Subject to secure approval.
              </p>

              <button
                onClick={() => { AutoNovaAudio.playClick(); navigate(`/financing?price=${car.price}&name=${encodeURIComponent(car.name)}`); }}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 text-teal-700 hover:text-teal-900 font-mono text-[9px] tracking-widest font-extrabold uppercase transition-all cursor-pointer"
              >
                Open Full Financing Calculator <ArrowRight className="h-3 w-3" />
              </button>
            </div>

          </div>

          {/* Quick Seller Representative card */}
          <div 
            onClick={() => { AutoNovaAudio.playClick(); setActiveTab('seller'); }}
            className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/60 shadow-sm flex items-center justify-between gap-3 cursor-pointer hover:shadow-md hover:border-zinc-300 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden border border-white shadow-sm flex-shrink-0">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-gu_A6zzKD7W7SE0KYdw8WhkpZbw8QCxKAFSE80VlDUAuQcVxW_NASTgXXiaNsYZQwMZhZpjlfJ1AZEAASZ9-R0eTGRsjX6cP0CinROjxIa0gq9Sj7peXCgrovgcFTw9JVW3z3kthUiUfDpYkdThfX07DtiQ2Rdga6FujHvdmtVEys8Hk1pi7Plavob3XYylP56u0F0hcabG_j7n_qknjv7r_iK_KGBweX-Dbd5ctXcRC4JA50pRYRJcyQSsgsSTIBP3GvehP_JHk" 
                  alt="Julian headshot" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h5 className="font-display font-extrabold text-teal-950 text-xs">Julian from Elite Motors</h5>
                <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-zinc-400 mt-0.5">
                  <span className="text-teal-700 font-extrabold">★ 4.9/5</span>
                  <span>(248 reviews)</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); AutoNovaAudio.playClick(); navigate('/browse?q=Elite Motors'); }}
                  className="text-[9px] font-mono font-bold text-teal-700 hover:text-teal-900 uppercase tracking-wider mt-1 cursor-pointer"
                >
                  View all listings →
                </button>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-zinc-400" />
          </div>

        </div>

      </div>

      {/* Sibling Curated Recommendations section */}
      {similarCars.length > 0 && (
        <section className="mt-16 pt-12 border-t border-zinc-200/60">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="font-mono text-[8px] font-extrabold text-teal-700 tracking-wider uppercase block mb-1">
                Curated Alternative Selections
              </span>
              <h2 className="font-display text-xl md:text-2xl font-black text-teal-950">
                Similar High-Performance Vehicles
              </h2>
            </div>
            
            <button 
              onClick={() => { AutoNovaAudio.playClick(); onBack(); }}
              className="font-mono text-[9px] font-black uppercase tracking-wider text-teal-700 hover:underline cursor-pointer inline-flex items-center gap-1"
            >
              <span>Explore All</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarCars.map(sibling => (
              <div 
                key={sibling.id}
                onClick={() => { AutoNovaAudio.playClick(); onSelectCar(sibling); setActiveImageIndex(0); setIs360Active(false); }}
                className="bg-white rounded-2xl border border-zinc-200/60 overflow-hidden group hover:shadow-lg hover:border-zinc-300 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full"
              >
                <div className="h-44 overflow-hidden relative bg-zinc-100">
                  <img src={sibling.image} alt={sibling.name} referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" />
                  <div className="absolute top-3 left-3 bg-teal-400 text-teal-950 px-2 py-0.5 rounded-full text-[8px] font-mono tracking-widest font-black shadow-sm">
                    AI MATCH {sibling.match}%
                  </div>
                </div>

                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-display text-sm font-extrabold text-zinc-900 group-hover:text-teal-700 transition-colors">
                      {sibling.name}
                    </h3>
                    <p className="text-[9px] text-zinc-400 font-bold uppercase font-mono tracking-wider">
                      {sibling.year} • {sibling.color}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-50">
                    <div>
                      <span className="font-mono text-[7px] text-zinc-400 block uppercase font-bold">VALUED FROM</span>
                      <span className="font-display font-extrabold text-sm text-teal-950">
                        ${sibling.price.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono font-black uppercase text-teal-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      View File <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Booking Modal Dialog Overlay */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBookingModal(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden max-w-md w-full border border-zinc-200/80 shadow-2xl p-6 md:p-8 space-y-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-[8px] tracking-widest text-teal-700 font-extrabold uppercase block">
                    FLEET ACQUISITION SCHEDULER
                  </span>
                  <h3 className="font-display text-lg md:text-xl font-extrabold text-teal-950">
                    Book Private Test Drive
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="w-8 h-8 rounded-full bg-zinc-150 hover:bg-zinc-250 text-zinc-500 flex items-center justify-center cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                  Select your preferred coordination time. Elite Motors will prepare the vehicle and assign an expert acquisition counselor.
                </p>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="font-mono text-[8px] font-bold text-zinc-400 block uppercase tracking-wider">PREFERRED DATE</label>
                    <input 
                      type="date" 
                      required 
                      value={bookingDate} 
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[8px] font-bold text-zinc-400 block uppercase tracking-wider">PREFERRED TIME</label>
                    <input 
                      type="time" 
                      required 
                      value={bookingTime} 
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-700"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={bookingSubmitting}
                  className="w-full py-3 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-mono text-[10px] tracking-widest uppercase font-extrabold rounded-xl transition-colors cursor-pointer text-center"
                >
                  {bookingSubmitting ? 'Securing Calendar...' : 'Confirm Secure Booking'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat representative Drawer Frame */}
      <AnimatePresence>
        {showChatTray && (
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="fixed top-20 right-0 bottom-0 z-40 bg-white border-l border-zinc-200 shadow-2xl w-full max-w-sm flex flex-col"
          >
            {/* Tray Header */}
            <div className="p-5 border-b border-zinc-150 flex items-center justify-between bg-zinc-50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-teal-700/20">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-gu_A6zzKD7W7SE0KYdw8WhkpZbw8QCxKAFSE80VlDUAuQcVxW_NASTgXXiaNsYZQwMZhZpjlfJ1AZEAASZ9-R0eTGRsjX6cP0CinROjxIa0gq9Sj7peXCgrovgcFTw9JVW3z3kthUiUfDpYkdThfX07DtiQ2Rdga6FujHvdmtVEys8Hk1pi7Plavob3XYylP56u0F0hcabG_j7n_qknjv7r_iK_KGBweX-Dbd5ctXcRC4JA50pRYRJcyQSsgsSTIBP3GvehP_JHk" 
                    alt="Julian headshot" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-teal-950 text-xs">Julian • Elite Motors</h4>
                  <span className="text-[8px] font-mono text-emerald-600 font-extrabold uppercase animate-pulse">● Active Online</span>
                </div>
              </div>

              <button 
                onClick={() => { AutoNovaAudio.playClick(); setShowChatTray(false); }}
                className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 cursor-pointer transition-colors"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Chat Body messages area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-[#fdf8f8]">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-teal-700 text-white rounded-tr-none shadow-sm'
                      : 'bg-white border border-zinc-200 text-zinc-800 rounded-tl-none shadow-sm'
                  }`}>
                    <p className="font-medium">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Inputs */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-zinc-150 bg-white flex gap-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask Julian about this vehicle..."
                className="flex-grow bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-teal-700 focus:bg-white"
              />
              <button 
                type="submit"
                className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-mono text-[9px] font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-sm"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Lightbox — previously missing entirely */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveImageIndex(prev => (prev - 1 + images.length) % images.length); }}
              className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <motion.img
              key={activeImageIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              src={images[activeImageIndex]}
              alt={car.name}
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
            />
            <button
              onClick={(e) => { e.stopPropagation(); setActiveImageIndex(prev => (prev + 1) % images.length); }}
              className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="absolute bottom-6 font-mono text-[10px] text-white/60 uppercase tracking-widest">
              {activeImageIndex + 1} / {images.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
