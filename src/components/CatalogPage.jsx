import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { AutoNovaAudio } from './AudioEngine';
import { CountUp } from './CountUp';
import { CarDetailView } from './CarDetailView';
import { AIAssistantView } from './AIAssistantView';
import { CompareVehiclesView } from './CompareVehiclesView';
import { SavedCarsView } from './SavedCarsView';
import { FinancingView } from './FinancingView';
import { CartView } from './CartView';
import { CheckoutView } from './CheckoutView';
import { MemberDashboardView } from './MemberDashboardView';
import { OrdersView } from './OrdersView';
import { TestDrivesView } from './TestDrivesView';
import { MessagesView } from './MessagesView';
import { NotificationsView } from './NotificationsView';
import { SettingsView } from './SettingsView';
import { SavedSearchesView } from './SavedSearchesView';
import { ValuationView } from './ValuationView';
import { ReviewsView } from './ReviewsView';
import { SellerDashboardView } from './SellerDashboardView';
import { CreateListingView } from './CreateListingView';
import { BlogView } from './BlogView';
import { AboutView } from './AboutView';
import { HelpCenterView } from './HelpCenterView';
import { TermsOfServiceView } from './TermsOfServiceView';
import { NotFoundView } from './NotFoundView';
import { AdminPortalView } from './AdminPortalView';
import { 
  Search, Mic, Star, ArrowRight, ArrowLeft, Shield, Globe, Landmark,
  Heart, CheckCircle2, ChevronRight, MessageSquare, Info, Sparkles, Sliders,
  Check, Play, Pause, Trash2, Calendar, DollarSign, Settings, Layers, HelpCircle, List, Gauge,
  TrendingUp, Award, ExternalLink, Filter, X, ChevronDown, LogOut, User, Bell,
  ShoppingCart
} from 'lucide-react';

const TypewriterText = ({ phrases, typingSpeed = 55, deletingSpeed = 30, pauseMs = 1800 }) => {
  const [displayed, setDisplayed] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pauseMs);
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length - 1 === 0) {
          setIsDeleting(false);
          setPhraseIndex((phraseIndex + 1) % phrases.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseMs]);

  return (
    <span className="bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-[3px] h-[0.85em] bg-purple-600 ml-1 align-middle rounded-sm"
      />
    </span>
  );
};

export const RECOMMENDATIONS = [
  {
    id: 'lucid-air-sapphire',
    name: 'Lucid Air Sapphire',
    make: 'Lucid',
    model: 'Air Sapphire',
    year: 2024,
    bodyType: 'Sedan',
    color: 'Midnight Stellar',
    price: 249000,
    type: 'Electric',
    mileage: '1,200 mi',
    transmission: 'Single-Speed Automatic',
    features: ['Adaptive Air Suspension', 'Panoramic Glass Roof', 'Surreal Sound Pro Audio', '34" Curved Display'],
    match: 98,
    desc: 'The absolute pinnacle of electric luxury performance. Features a state-of-the-art triple-motor powertrain delivering sub-2 second acceleration, high-fidelity vectoring, and active thermal cooling grids.',
    specs: { zeroToSixty: '1.89s', topSpeed: '330 km/h', range: '684 km', power: '1,234 hp' },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMiA7Ee2bRqJB7jThj9jtySFntQDmdUnWV8BToQr7ZqoIbegFNUk6399zYdywL7KogkG5_KUuUt3fZ23FVE79T-DQeF7_LQu9DGoEntcbTdcjEs7qS49ODj_UicLc8FI3XtnJno792ig12WaNmpXNQBfx8FSjluB45epp_JsLF6I7u0fBwyUleUrLTYHmPWbtbYEgtniSF7dpyR1j2mNsEO4udOn32EJRn066uOyxTriodCWEOxPPjXkQmLatVFNIs3xllYFvqIxA4'
  },
  {
    id: 'rivian-r1s-dual',
    name: 'Rivian R1S Dual',
    make: 'Rivian',
    model: 'R1S Dual',
    year: 2023,
    bodyType: 'SUV',
    color: 'Glacier White',
    price: 89900,
    type: 'Electric',
    mileage: '4,500 mi',
    transmission: 'Single-Speed Automatic',
    features: ['Quad-Motor AWD', 'Off-Road Package', 'Panoramic Roof', 'Camp Mode'],
    match: 94,
    desc: 'Versatile, three-row luxury electric SUV equipped with a high-capacity structural battery pack, standard independent height-adjustable air suspension, and dual-motor AWD.',
    specs: { zeroToSixty: '3.5s', topSpeed: '210 km/h', range: '560 km', power: '600 hp' },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2LiiHj1foWuKHwElPilXwrkqsp0PLxZs5W_fio2JLN91wC2nA0uNsutLLh1HFwnxzZbx7G8MJr-0KJc1kXwNvFx5n8z33VKln3vn5xGyxkCZ2xyBZLdggOEPlyFPpR5nlu3ZCdI-W-G7NpG5lZawLU57caeKn2xH6ijV0-bKSd56X1BRlvbypPn6zBkwXOX6RPK4NU8j92H7UMAZ9x7oIhF_EM0xEtfXzGxstn4Osk7dSzlZvCiJHhniAVhYlPsQZBnjNgJvgNakq'
  },
  {
    id: 'porsche-taycan-turbo-s',
    name: 'Porsche Taycan Turbo S',
    make: 'Porsche',
    model: 'Taycan Turbo S',
    year: 2024,
    bodyType: 'Sedan',
    color: 'Neptune Blue',
    price: 194500,
    type: 'Electric',
    mileage: '820 mi',
    transmission: '2-Speed Automatic',
    features: ['Sport Chrono Package', 'Adaptive Cruise Control', 'Bose Surround Sound', 'Matrix LED Headlights'],
    match: 91,
    desc: 'Uncompromising German luxury engineering merged with high-voltage speed profiles. Incredible cornering dynamics, active anti-roll stabilization, and track-ready power.',
    specs: { zeroToSixty: '2.4s', topSpeed: '260 km/h', range: '512 km', power: '938 hp' },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXeXQAoS4uQ5b6L6RXuQbDOrNOouAh5pnP3pQv9NqrMlwCKhuGtnyW4o_nGOjslRnglfA3Ho1x7BigYrsYcbg5NCOiX4yjCkNd5DHUms9CqS3XnqFT_tdZ1loZZElLw04C3d1ofr-cX6HDKxK_mN1soViYItMefmGcuPYUn-zcXCpm6TlZ0lwLBfmWkcBA_vdKczCu_Tst_K2Li7xeqNrbLzYGbtJon4A6_j2Bb0co9yO1GCzlAAR_84l0T5m5O2QULKie20xiZpa0'
  },
  {
    id: 'lotus-emeya',
    name: 'Lotus Emeya',
    make: 'Lotus',
    model: 'Emeya',
    year: 2024,
    bodyType: 'Sedan',
    color: 'Obsidian Shadow',
    price: 155000,
    type: 'Electric',
    mileage: '150 mi',
    transmission: 'Single-Speed Automatic',
    features: ['Carbon Fiber Trim', 'KEF Premium Audio', 'Active Rear Spoiler', 'Track Mode'],
    match: 89,
    desc: 'A gorgeous electric hyper-GT that blends legendary British ride comfort and dynamics with dual-motor power profiles, active aerodynamics, and carbon ceramic brakes.',
    specs: { zeroToSixty: '2.78s', topSpeed: '256 km/h', range: '610 km', power: '905 hp' },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_9bDjwS1ptNdryZoM7g-uoQX1kWyZ8khm15AP9yTmw_erPxxxnHOBWRT-rhvWQNX1zLxPYyYWXykqRoI2y9KZde03160JFjJUBMdtBwWplsZS2d2NSM1A0IQS-H3Ju9xDsG77vi9ylYit-9K22RwyeRy7vQzgpzeFCmM9iuq7BI7gJ2SlxvSormulnebQfyfaP3Ajn5ixyZnJhaof2laSbUmZlcCkTWKz60D-fkgCodrVRaiTJGPmHIluYn44tCBO0V6TArGcPdZJ'
  },
  {
    id: 'tesla-model-s-plaid',
    name: 'Tesla Model S Plaid',
    make: 'Tesla',
    model: 'Model S Plaid',
    year: 2023,
    bodyType: 'Sedan',
    color: 'Ultra Red',
    price: 92000,
    type: 'Electric',
    mileage: '12,400 mi',
    transmission: 'Single-Speed Automatic',
    features: ['Yoke Steering', 'Full Self-Driving Capable', '17" Cinematic Display', 'Track Mode'],
    match: 87,
    desc: 'The ultimate production daily driver. Unmatched digital cockpit integration with 1,020 horsepower and exceptional battery thermal efficiency.',
    specs: { zeroToSixty: '1.99s', topSpeed: '322 km/h', range: '637 km', power: '1,020 hp' },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8Drvp11H1ypFn_QSmZn7fbx7w4bjgGUBDIL6N5zhaL1gxBTRjqXsBbewr5uOGbdTFQxyNOzCfU5O_3ILW7QsVSDB7kH3mf0zTb2mOMZaNt1q4uN6H6oq-0cvyjYrcPJO1oTOrMvBLHaWMLa5VYHmt8SIM9XHfORL9QeOs5z-42fLCguuqhxIjVym8W2QkFURzZTu6VmHC79s7OgGJw8f3o8z91Zql322cb6O7qaw61F4W1Ikf5uEWI8xroiNyfBlhyhLOjOIfsv3v'
  },
  {
    id: 'model-x-s',
    name: '2024 Model X-S',
    make: 'Tesla',
    model: 'Model X',
    year: 2024,
    bodyType: 'SUV',
    color: 'Cosmic Black',
    price: 89900,
    type: 'Electric',
    mileage: '1,200 mi',
    transmission: 'Single-Speed Automatic',
    features: ['Falcon Wing Doors', 'HEPA Air Filtration', '3rd Row Seating', 'Autopilot'],
    match: 94,
    desc: 'Cutting-edge electric luxury utility vehicle featuring triple-motor dynamic vectoring and an active aero spoiler. Fully updated for supreme range.',
    specs: { zeroToSixty: '2.1s', topSpeed: '322 km/h', range: '710 km', power: '1,020 hp' },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkBS7mw7UaegykHuj-Y-GfqzSPC7hSdaDPgGiNYQs7Yxzm4K45rFD9IhTyZe28YiO3wxzQmNWDjeQ1uSmXEvt7V2e7u-NEHzYVXxrxQmzdk60ZQrXaQ7RqVO81Avvt0-KrtUaP7nKJ8OVLPZCkGVK8yPJ83BgjcaivUTpKkXzX6WbXBRK4zNIlclUjDWJlG4MwQxBVRf1zDlatLUBHjcW3iZhIqlCr59yQdlOJqgn0f5qHpAdPnghiIcH7MEsd-DANnP0PEU_kWL-F'
  },
  {
    id: 'kinetic-sport',
    name: '2024 Kinetic Sport',
    make: 'AutoNova',
    model: 'Kinetic Sport',
    year: 2024,
    bodyType: 'Sedan',
    color: 'Midnight Stellar',
    price: 72500,
    type: 'Hybrid',
    mileage: '500 mi',
    transmission: '7-Speed Manual',
    features: ['Sport Exhaust', 'Racing Seats', 'Limited Slip Differential', 'Carbon Ceramic Brakes'],
    match: 91,
    desc: 'High-performance regenerative sports sedan with a lightweight titanium-alloy exhaust and level-4 driver-assist neural algorithms.',
    specs: { zeroToSixty: '2.9s', topSpeed: '290 km/h', range: '880 km', power: '750 hp' },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXu0VZYjQQp6_8xf42PHIKasiDBnVAARFA_jKMa6cppbI1oxS4jao1t-fDpGdYVh_UThVMYEF0UXIIV0IJxN-QnRnOqN_DzpREoT0Tc0c8DN5R-rS23Zcu0FQNiw0nj6nOv8iAUWERfiHw0aISkDK2n3DkNTbKzmG_7paSZnXGyTlgk6TjJ8tmiQHiTlwFRAPcglszuTCHyAKH9PA34rvms9jEv7b8f72PcoX7TTCeSBcrotxvaXjrcsPs3uZ8oHGuU9WjD8xqWbqdJj'
  },
  {
    id: 'aura-ev',
    name: 'Aura EV Concept',
    make: 'AutoNova',
    model: 'Aura EV',
    year: 2025,
    bodyType: 'Coupe',
    color: 'Glacier White',
    price: 64000,
    type: 'Electric',
    mileage: 'New',
    transmission: 'Single-Speed Automatic',
    features: ['Vegan Leather Interior', 'Solar Roof Panel', 'Wireless Charging', 'Ambient Lighting'],
    match: 88,
    desc: 'Sleek, aerodynamic design concept with a 100% solid-state battery and an ultra-minimalist panoramic glass cockpit. Zero emission future-ready platform.',
    specs: { zeroToSixty: '3.4s', topSpeed: '260 km/h', range: '1,050 km', power: '550 hp' },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFkSbvS00XKSynwb5jgcqH9RtKHPExUlqlbgP4C11o3K01RJTPXjtGb8QHOQhtVC6NHmUCRN5WbcqkzxLu6VkrXpbTi9FJlMmzEsKiNq6XncZaxVYzcS5gCFAjhxeETuHxR2AnhHuo0v2N5IF5LqeVPo8lS1JGmvUbh3Wlq_z2vslRpUqGMib9OqXhagXXFneRxmfwS2KmjCcJ4-kXn48avgCEG8TlBUa9pEiDywqiGk_bTFY2JvBEuNl5EUPHVhN9dZmWPUhTEDMz'
  },
  {
    id: 'nova-trek',
    name: 'Nova Trek Alpha',
    make: 'AutoNova',
    model: 'Trek Alpha',
    year: 2024,
    bodyType: 'Truck',
    color: 'Obsidian Shadow',
    price: 94200,
    type: 'Electric',
    mileage: '150 mi',
    transmission: '8-Speed Automatic',
    features: ['Off-Road Tires', 'Tow Package', 'Skid Plates', 'Roof Rack'],
    match: 85,
    desc: 'Extremely durable dual-motor tactical electric pickup with dynamic independent torque vectoring and built-in remote payload diagnostic monitors.',
    specs: { zeroToSixty: '2.7s', topSpeed: '240 km/h', range: '680 km', power: '840 hp' },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgH1cN3ijGPIra4NNcEHvZirYLkca4D9S8eUz25w71jzs9V9IOn4jopf6SDq3CUsJVLXEkhM6shjbZuLP5PfVUcWsxHLALsxETHNn0uUQfdU50r35wnWHmnAK05AA6kSYlsBdqwQ7s3p-ml7cMqaGuDuavuRyjVQ3MeZsM_yZDzDWy0P8zuzJffL5I4Bz9nKd5aWdRYHqqu7k4MMbozKUABqgHgjbm2WZScjIV7TcF-aPI6dTVayI7AVyvf3PLi1ZglkhV2iinET4R'
  }
];

export const CatalogPage = ({ userName, role, onBackToGate, showNotification, initialView = 'showroom', cartItems = [], favoritedCars: favoritedCarsProp, onFavoriteToggle }) => {
  // Route-driven starting view: "/" passes initialView="showroom" (Home), "/browse" passes
  // initialView="search" (Browse/Search Results with filters). Previously this prop was
  // ignored and both routes always rendered the same 'dashboard' view.
  const [currentView, setCurrentView] = useState(initialView === 'search' ? 'search' : 'dashboard'); // 'dashboard' | 'search'
  const navigate = useNavigate();
  const [checkoutDetails, setCheckoutDetails] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchParamsUrl] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParamsUrl.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParamsUrl.get('bodyType') || searchParamsUrl.get('type') || 'All'); // 'All' | 'Sedan' | 'Electric' | 'SUV' | 'Luxury' | 'Truck'
  const [localFavoritedCars, setLocalFavoritedCars] = useState(['model-x-s']); // fallback only, used if no global prop is passed
  const favoritedCars = favoritedCarsProp !== undefined ? favoritedCarsProp : localFavoritedCars;
  const [activeDetailCar, setActiveDetailCar] = useState(null);

  // Live orders tracker
  const [orders, setOrders] = useState([
    {
      id: 'AN-829410',
      carName: 'Lucid Air Sapphire',
      trim: 'Tri-motor Sapphire Trim',
      price: 249000,
      status: 'Processing',
      placedDate: 'Oct 12, 2024',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOQHi_PEd5ZPsfve2gHNtc9RspSyvOXqwqs6xNqGTWDwpEwEim2bu4gGWdmC4VdWAmTvCa--Ue5HLlHyLmXoYbUdEsDVdt65Ud_ieAeLMGOfujnFDPns5-vOEg4qKlTnwqIjqF5ev3fecEJhFWxI6VCXY2F2iGL5RoszzPyEMkvTvEch3_TgeV6OO-66z072RemQnTsKHau59vkG3NLAr9svqCFZKM9WgSuj67cgw-LiGqIA1cjRS3eV2cx9id8468XFNGHdr-mw1a',
      timelineStep: 3, // 1: Confirmed, 2: Docs Signed, 3: Quality Check (Active), 4: Delivered
      deliveryMethod: 'showroom',
    },
    {
      id: 'AN-712399',
      carName: 'Audi e-tron GT',
      trim: 'Prestige Quattro',
      price: 110000,
      status: 'Delivered',
      placedDate: 'Aug 20, 2024',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCCV-hOh1USTOYwo48-1O-jWSMx1OWpiawXueBV1IPFH5N5b_fIn0T7chfeqTIqt--0HpAQh6g2kT3JUazfxgy_4vED4HH4takneHWsdIL7th_rzfqn4gUKkHYVdsyk5OwJpYMBq7ABKG9K09Wd7BOkEh6jyyDyKmAv9y15M9z3L9IMSkFGC0BFuivDB4jkuKq4NTwUNBy7PZCehHLTofrFcmUs9oKXs9Us3lksKR4kcYJuS0-2p0DQwcyH0M4LnuoKuwHV3PKwUo7',
      timelineStep: 4, // Completed
      deliveryMethod: 'showroom',
    }
  ]);

  const handleOrderSuccess = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
  };
  
  // New Filter panel states
  const [selectedMake, setSelectedMake] = useState('All');
  const [selectedModel, setSelectedModel] = useState('All');
  const [priceRange, setPriceRange] = useState(500000);
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [selectedBodyTypes, setSelectedBodyTypes] = useState([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState(['Electric']); // starts with Electric active
  const [selectedColor, setSelectedColor] = useState('All');
  const [maxMileage, setMaxMileage] = useState(50000);
  const [selectedTransmission, setSelectedTransmission] = useState('All');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [sortBy, setSortBy] = useState('Newest');
  const [resultsViewMode, setResultsViewMode] = useState('grid'); // 'grid' | 'list'
  
  // Comparison state
  const [comparedCars, setComparedCars] = useState([]);
  const [showCompareDetail, setShowCompareDetail] = useState(false);

  // Newsletter subscription
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // AI Valuation tool modal states
  const [showValuationModal, setShowValuationModal] = useState(false);
  const [valuationMake, setValuationMake] = useState('AutoNova');
  const [valuationModel, setValuationModel] = useState('Eko GT');
  const [valuationYear, setValuationYear] = useState('2023');
  const [valuationMileage, setValuationMileage] = useState('5000');
  const [valuationResult, setValuationResult] = useState(null);
  const [isCalculatingValuation, setIsCalculatingValuation] = useState(false);

  // Seller Listings State
  const [sellerListings, setSellerListings] = useState([
    {
      id: 'custom-1',
      name: 'Rimac Nevera',
      trim: 'Standard Edition',
      year: 2025,
      price: 2400000,
      mileage: '250 km',
      type: 'Coupe',
      fuel: 'Electric',
      color: 'Midnight Stellar',
      condition: 'Pristine',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_1r-3dvO9l2h_MsYeVRt55vlkfyaT0_Zs0rQb0WTzGWKuXk2lj6UCQY9eYN6P1r9wA5catTmEIq3hN1c1isaH0CZ6uLbflioMzjD2uroK1nvhnTTjbwLumxj_vI1NNeAVTOeMULpw8Qd5-pYYjd1bWki4DhA35TwlANCgWxgqCElataauEX3u33wnMp7OG1xVQnpmZmDv0x3pkww4LZPujkjNaTF0NJQ5mDKteXrYgQyIGwPkfJug0HDlBKn_pqB01wJxiTHxly3x',
      status: 'Active',
      views: 142,
      inquiries: 3,
      dateAdded: '2 days ago'
    }
  ]);

  const handleAddListing = (newListing) => {
    setSellerListings(prev => [newListing, ...prev]);
  };

  const handleDeleteListing = (id) => {
    setSellerListings(prev => prev.filter(l => l.id !== id));
  };

  const handleDeactivateListing = (id) => {
    setSellerListings(prev => prev.map(l => {
      if (l.id === id) {
        return { ...l, status: l.status === 'Active' ? 'Pending' : 'Active' };
      }
      return l;
    }));
  };

  const handleFavoriteToggle = (id, carName, e) => {
    e.stopPropagation();
    AutoNovaAudio.playClick();
    const isCurrentlyFavorited = favoritedCars.includes(id);
    if (onFavoriteToggle) {
      // Route through the real global wishlist state, shared with /wishlist, /dashboard, etc.
      onFavoriteToggle(id);
    } else {
      // Fallback for standalone use only
      setLocalFavoritedCars(prev => isCurrentlyFavorited ? prev.filter(item => item !== id) : [...prev, id]);
    }
    if (isCurrentlyFavorited) {
      showNotification(`${carName} removed from your saved list.`, "info");
    } else {
      showNotification(`${carName} successfully bookmarked to your Saved Garages!`, "success");
    }
  };

  const handleSubscribeNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    AutoNovaAudio.playSuccess();
    setIsSubscribed(true);
    showNotification("Subscription successful! Check your inbox for custom AI insights.", "success");
  };

  // Run mock AI Valuation algorithm
  const handleCalculateValuation = (e) => {
    e.preventDefault();
    AutoNovaAudio.playClick();
    setIsCalculatingValuation(true);
    
    setTimeout(() => {
      let baseVal = 120000;
      if (valuationModel.toLowerCase().includes('gt')) baseVal = 180000;
      if (valuationModel.toLowerCase().includes('zuma')) baseVal = 145000;
      if (valuationModel.toLowerCase().includes('obudu')) baseVal = 95000;

      const yearFactor = Math.max(0.6, 1 - (2026 - parseInt(valuationYear)) * 0.08);
      const mileFactor = Math.max(0.5, 1 - (parseInt(valuationMileage) / 100000) * 0.4);
      
      const calculatedQuote = Math.round(baseVal * yearFactor * mileFactor);
      
      setValuationResult(calculatedQuote);
      setIsCalculatingValuation(false);
      AutoNovaAudio.playSuccess();
      showNotification("Sovereign AI valuation quote calculated successfully.", "success");
    }, 2200);
  };

  // Dynamic values based on selected Make
  const availableModels = selectedMake === 'All' 
    ? [] 
    : [...new Set(RECOMMENDATIONS.filter(car => car.make === selectedMake).map(car => car.model))];

  // Compare Checkbox Toggle
  const handleCompareToggle = (id, carName, e) => {
    e.stopPropagation();
    AutoNovaAudio.playClick();
    if (comparedCars.includes(id)) {
      setComparedCars(comparedCars.filter(item => item !== id));
    } else {
      if (comparedCars.length >= 3) {
        showNotification("Maximum 3 vehicles can be compared concurrently.", "warning");
        return;
      }
      setComparedCars([...comparedCars, id]);
    }
  };

  const resetCompare = () => {
    AutoNovaAudio.playClick();
    setComparedCars([]);
  };

  // Filter recommendations based on search text and category selection (for Dashboard View)
  const filteredRecommendations = RECOMMENDATIONS.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          car.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          car.desc.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'All') return matchesSearch;
    if (selectedCategory === 'SUV' && car.bodyType === 'SUV') return matchesSearch;
    if (selectedCategory === 'Sedan' && car.bodyType === 'Sedan') return matchesSearch;
    if (selectedCategory === 'Electric' && car.type === 'Electric') return matchesSearch;
    if (selectedCategory === 'Truck' && car.bodyType === 'Truck') return matchesSearch;
    if (selectedCategory === 'Luxury' && car.price > 80000) return matchesSearch;
    return matchesSearch;
  });

  // Detailed Filter for the main Search/Inventory list view
  const filteredInventory = RECOMMENDATIONS.filter(car => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' || 
                          car.name.toLowerCase().includes(query) ||
                          car.make.toLowerCase().includes(query) ||
                          car.type.toLowerCase().includes(query) ||
                          car.desc.toLowerCase().includes(query);
    
    const matchesMake = selectedMake === 'All' || car.make === selectedMake;
    const matchesModel = selectedModel === 'All' || car.model === selectedModel;
    const matchesPrice = car.price <= priceRange;
    
    const matchesYearFrom = yearFrom === '' || car.year >= parseInt(yearFrom);
    const matchesYearTo = yearTo === '' || car.year <= parseInt(yearTo);
    
    const matchesBodyType = selectedBodyTypes.length === 0 || selectedBodyTypes.includes(car.bodyType);
    const matchesFuelType = selectedFuelTypes.length === 0 || selectedFuelTypes.includes(car.type);
    const matchesColor = selectedColor === 'All' || car.color === selectedColor;

    const carMileageNum = car.mileage === 'New' ? 0 : parseInt(String(car.mileage).replace(/[^\d]/g, ''), 10) || 0;
    const matchesMileage = carMileageNum <= maxMileage;
    const matchesTransmission = selectedTransmission === 'All' || car.transmission === selectedTransmission;
    const matchesFeatures = selectedFeatures.length === 0 || selectedFeatures.every(f => (car.features || []).includes(f));
    
    return matchesSearch && matchesMake && matchesModel && matchesPrice && matchesYearFrom && matchesYearTo && matchesBodyType && matchesFuelType && matchesColor && matchesMileage && matchesTransmission && matchesFeatures;
  });

  // Sort function for inventory
  const sortedInventory = [...filteredInventory].sort((a, b) => {
    if (sortBy === 'Newest') {
      return b.year - a.year;
    }
    if (sortBy === 'Price Low-High') {
      return a.price - b.price;
    }
    if (sortBy === 'Price High-Low') {
      return b.year - a.year; // fallback
    }
    if (sortBy === 'Match Rate') {
      return b.match - a.match;
    }
    return 0;
  });

  return (
    <div className="w-full bg-[#fdf8f8] text-zinc-900 select-none min-h-screen flex flex-col font-sans transition-all duration-300">
      
      {/* Dynamic Header */}
      <header className="sticky top-0 w-full z-40 bg-[#fdf8f8]/80 backdrop-blur-xl border-b border-zinc-200/60 shadow-sm">
        <div className="flex justify-between items-center px-4 md:px-8 py-4 max-w-7xl mx-auto h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setActiveDetailCar(null); setCurrentView('dashboard'); AutoNovaAudio.playClick(); }}>
            <span className="p-1.5 rounded-xl bg-teal-700/10 text-teal-700">
              <Sparkles className="h-6 w-6 text-teal-700" />
            </span>
            <span className="font-display text-xl font-extrabold tracking-tighter text-teal-700">AutoNova</span>
          </div>

          <div className="hidden md:flex gap-8 items-center">
            <button 
              onClick={() => { AutoNovaAudio.playClick(); navigate('/browse'); }}
              className="font-mono text-[10px] font-bold tracking-widest uppercase pb-1 border-b-2 border-transparent text-zinc-400 hover:text-zinc-900 hover:border-teal-700 transition-colors cursor-pointer"
            >
              Buy
            </button>
            <button 
              onClick={() => { AutoNovaAudio.playClick(); navigate('/sell'); }}
              className="font-mono text-[10px] font-bold tracking-widest uppercase pb-1 border-b-2 border-transparent text-zinc-400 hover:text-zinc-900 hover:border-teal-700 transition-colors cursor-pointer"
            >
              Sell
            </button>
            <button 
              onClick={() => { AutoNovaAudio.playClick(); navigate('/financing'); }}
              className="font-mono text-[10px] font-bold tracking-widest uppercase pb-1 border-b-2 border-transparent text-zinc-400 hover:text-zinc-900 hover:border-teal-700 transition-colors cursor-pointer"
            >
              Finance
            </button>
            <button 
              onClick={() => { AutoNovaAudio.playClick(); navigate('/ai-assistant'); }}
              className="font-mono text-[10px] font-bold tracking-widest uppercase pb-1 border-b-2 border-transparent text-zinc-400 hover:text-zinc-900 hover:border-teal-700 transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <Sparkles className="h-3 w-3" />
              AI Assistant
            </button>
            <button 
              onClick={() => { AutoNovaAudio.playClick(); navigate('/blog'); }}
              className="font-mono text-[10px] font-bold tracking-widest uppercase pb-1 border-b-2 border-transparent text-zinc-400 hover:text-zinc-900 hover:border-teal-700 transition-colors cursor-pointer"
            >
              Blog
            </button>
          </div>

          <div className="flex items-center gap-3.5 relative">
            {/* Shopping Cart */}
            <button
              onClick={() => { AutoNovaAudio.playClick(); navigate('/cart'); }}
              className="p-2 rounded-xl transition-all scale-95 active:scale-90 cursor-pointer text-zinc-400 hover:text-teal-700 hover:bg-teal-50 relative"
              title="Cart"
            >
              <ShoppingCart className="h-4.5 w-4.5" />
              {cartItems && cartItems.length > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-teal-700 text-white text-[7px] font-mono font-black w-3.5 h-3.5 flex items-center justify-center rounded-full border border-white">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => { AutoNovaAudio.playClick(); navigate('/wishlist'); }}
              className="p-2 rounded-xl transition-all scale-95 active:scale-90 cursor-pointer text-zinc-400 hover:text-teal-700 hover:bg-teal-50 relative"
              title="Wishlist"
            >
              <Heart className="h-4.5 w-4.5" />
              {favoritedCars && favoritedCars.length > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-teal-700 text-white text-[7px] font-mono font-black w-3.5 h-3.5 flex items-center justify-center rounded-full border border-white">
                  {favoritedCars.length}
                </span>
              )}
            </button>



            {/* Notification Bell */}
            <button
              onClick={() => {
                AutoNovaAudio.playClick();
                setActiveDetailCar(null);
                setCurrentView('notifications');
              }}
              className={`p-2 rounded-xl transition-all scale-95 active:scale-90 cursor-pointer relative ${
                currentView === 'notifications' ? 'text-teal-700 bg-teal-50' : 'text-zinc-400 hover:text-teal-700 hover:bg-teal-50'
              }`}
              title="Notifications"
            >
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-0.5 right-0.5 bg-red-600 text-white text-[7px] font-mono font-black w-3.5 h-3.5 flex items-center justify-center rounded-full border border-white">
                4
              </span>
            </button>

            {/* Settings Gear */}
            <button
              onClick={() => {
                AutoNovaAudio.playClick();
                setActiveDetailCar(null);
                setCurrentView('settings');
              }}
              className={`p-2 rounded-xl transition-all scale-95 active:scale-90 cursor-pointer ${
                currentView === 'settings' ? 'text-teal-700 bg-teal-50' : 'text-zinc-400 hover:text-teal-700 hover:bg-teal-50'
              }`}
              title="Settings"
            >
              <Settings className="h-4.5 w-4.5" />
            </button>

            {/* Profile Avatar Trigger */}
            <div className="relative">
              <button
                onClick={() => {
                  AutoNovaAudio.playClick();
                  setShowProfileMenu(!showProfileMenu);
                }}
                className="flex items-center gap-1.5 focus:outline-none rounded-full p-0.5 cursor-pointer hover:opacity-90 transition-opacity"
                aria-expanded={showProfileMenu}
              >
                <div className="w-9 h-9 rounded-full bg-zinc-200 overflow-hidden border border-zinc-200/80 shadow-sm">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk_NCHuOPjTASHBWR2qhaYLQUDdgA28EKXW2Mxnc17zAdTIielHZKo-oYh4OJMJAr325Oww9yRBzNbIC3chSQBWwywWYwqApCJURfo7retYKEgw2Wm-IZgSZOf4Qp3SuCXV-vVjwWMMtKIqGUBRBRkVeuRIqGKlx6kQeGOJHqjv2qe-UpcdkyxP_iEjixngRfIJJ-gW9EHnRB4VtxdfAmdVsbp8HLL0IDvz-mnjU8nv2evIt7bx7a7RBb7nyiUAqjNu3V8IRgt00hS"
                    alt={userName}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <ChevronDown className={`h-3 w-3 text-zinc-400 transition-transform duration-200 hidden sm:block ${showProfileMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Interactive Premium Dropdown Menu */}
              <AnimatePresence>
                {showProfileMenu && (
                  <>
                    {/* Background click handler to close dropdown */}
                    <div 
                      className="fixed inset-0 z-40 cursor-default" 
                      onClick={() => setShowProfileMenu(false)} 
                    />
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3.5 w-72 bg-white border border-zinc-200 rounded-2xl shadow-xl py-4.5 z-50 overflow-hidden"
                    >
                      {/* User Bio Header */}
                      <div className="px-5 pb-3 border-b border-zinc-100 flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-zinc-100 overflow-hidden border border-zinc-200/60">
                          <img
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk_NCHuOPjTASHBWR2qhaYLQUDdgA28EKXW2Mxnc17zAdTIielHZKo-oYh4OJMJAr325Oww9yRBzNbIC3chSQBWwywWYwqApCJURfo7retYKEgw2Wm-IZgSZOf4Qp3SuCXV-vVjwWMMtKIqGUBRBRkVeuRIqGKlx6kQeGOJHqjv2qe-UpcdkyxP_iEjixngRfIJJ-gW9EHnRB4VtxdfAmdVsbp8HLL0IDvz-mnjU8nv2evIt7bx7a7RBb7nyiUAqjNu3V8IRgt00hS"
                            alt={userName}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-display font-black text-xs text-teal-950 truncate leading-tight">{userName || 'AutoNova Client'}</p>
                          <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-[8px] font-mono font-bold text-teal-800 uppercase">
                            <span className="w-1 h-1 rounded-full bg-teal-600 animate-pulse" />
                            {role === 'Dealer' ? 'ADMIN' : role === 'Seller' ? 'LIQUIDATOR' : 'PREMIUM'}
                          </span>
                        </div>
                      </div>

                      {/* Dynamic Stats Overview */}
                      <div className="px-5 py-3 bg-zinc-50/80 border-b border-zinc-100 grid grid-cols-2 gap-2 text-center text-[10px]">
                        <div className="bg-white p-2 border border-zinc-200/40 rounded-xl">
                          <p className="font-mono font-bold text-zinc-400 uppercase tracking-wider text-[7.5px]">Saved Garages</p>
                          <p className="font-display font-black text-xs text-teal-950 mt-0.5">{favoritedCars.length}</p>
                        </div>
                        <div className="bg-white p-2 border border-zinc-200/40 rounded-xl">
                          <p className="font-mono font-bold text-zinc-400 uppercase tracking-wider text-[7.5px]">Comparison Grid</p>
                          <p className="font-display font-black text-xs text-teal-950 mt-0.5">{comparedCars.length}</p>
                        </div>
                      </div>

                      {/* Navigation Actions inside Menu */}
                      <div className="py-2 border-b border-zinc-100 text-[11px] font-semibold text-zinc-600">
                        <button
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            setActiveDetailCar(null);
                            setCurrentView('portfolio');
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-5 py-2 hover:bg-zinc-50 hover:text-teal-950 transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <span>Member Dashboard</span>
                          <span className="font-mono text-[7.5px] font-bold text-teal-700 uppercase">Personalized</span>
                        </button>
                        <button
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            setActiveDetailCar(null);
                            setCurrentView('seller-dashboard');
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-5 py-2 hover:bg-zinc-50 hover:text-teal-950 transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <span>Seller Dashboard</span>
                          <span className="font-mono text-[7.5px] font-bold text-teal-750 uppercase">Seller Hub</span>
                        </button>
                        <button
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            navigate('/reviews');
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-5 py-2 hover:bg-zinc-50 hover:text-teal-950 transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <span>Reviews Ledger</span>
                          <span className="font-mono text-[7.5px] font-bold text-amber-600 uppercase">Ratings</span>
                        </button>
                        <button
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            navigate('/blog');
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-5 py-2 hover:bg-zinc-50 hover:text-teal-950 transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <span>Sovereign Blog</span>
                          <span className="font-mono text-[7.5px] font-bold text-purple-600 uppercase">Insights</span>
                        </button>
                        <button
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            navigate('/about');
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-5 py-2 hover:bg-zinc-50 hover:text-teal-950 transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <span>About AutoNova</span>
                          <span className="font-mono text-[7.5px] font-bold text-teal-600 uppercase">Mission</span>
                        </button>
                        <button
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            navigate('/faq');
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-5 py-2 hover:bg-zinc-50 hover:text-teal-950 transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <span>Help Center</span>
                          <span className="font-mono text-[7.5px] font-bold text-sky-600 uppercase">Support</span>
                        </button>
                        <button
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            setActiveDetailCar(null);
                            setCurrentView('terms');
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-5 py-2 hover:bg-zinc-50 hover:text-teal-950 transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <span>Terms of Service</span>
                          <span className="font-mono text-[7.5px] font-bold text-teal-800 uppercase">Legal</span>
                        </button>

                        <button
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            setActiveDetailCar(null);
                            setCurrentView('dashboard');
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-5 py-2 hover:bg-zinc-50 hover:text-teal-950 transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <span>Showroom Curation</span>
                          <span className="font-mono text-[7.5px] font-bold text-zinc-400 uppercase">Interactive</span>
                        </button>
                        <button
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            setActiveDetailCar(null);
                            setCurrentView('saved');
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-5 py-2 hover:bg-zinc-50 hover:text-teal-950 transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <span>My Bookmarks</span>
                          <span className="font-mono text-[7.5px] font-bold text-teal-700 uppercase">({favoritedCars.length})</span>
                        </button>
                        <button
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            setActiveDetailCar(null);
                            setCurrentView('finance');
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-5 py-2 hover:bg-zinc-50 hover:text-teal-950 transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <span>Escrow Analytics</span>
                          <span className="font-mono text-[7.5px] font-bold text-teal-700 uppercase">Active</span>
                        </button>
                        <button
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            setActiveDetailCar(null);
                            setCurrentView('test-drives');
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-5 py-2 hover:bg-zinc-50 hover:text-teal-950 transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <span>Test Drive Bookings</span>
                          <span className="font-mono text-[7.5px] font-bold text-teal-700 uppercase">Track</span>
                        </button>
                        <button
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            setActiveDetailCar(null);
                            setCurrentView('messages');
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-5 py-2 hover:bg-zinc-50 hover:text-teal-950 transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <span>Secure Messages</span>
                          <span className="font-mono text-[7.5px] font-bold text-teal-700 uppercase">1 Chat</span>
                        </button>
                        <button
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            setActiveDetailCar(null);
                            setCurrentView('notifications');
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-5 py-2 hover:bg-zinc-50 hover:text-teal-950 transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <span>Secure Notifications</span>
                          <span className="font-mono text-[7.5px] font-bold text-red-600 uppercase font-black">4 New</span>
                        </button>
                        <button
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            setActiveDetailCar(null);
                            setCurrentView('cart');
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-5 py-2 hover:bg-zinc-50 hover:text-teal-950 transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <span>Curation Cart</span>
                          <span className="font-mono text-[7.5px] font-bold text-teal-700 uppercase">Review (1)</span>
                        </button>
                        <button
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            setActiveDetailCar(null);
                            setCurrentView('alerts');
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-5 py-2 hover:bg-zinc-50 hover:text-teal-950 transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <span>Saved Searches</span>
                          <span className="font-mono text-[7.5px] font-bold text-teal-700 uppercase">Alerts (2)</span>
                        </button>
                        <button
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            setActiveDetailCar(null);
                            setCurrentView('valuation');
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-5 py-2 hover:bg-zinc-50 hover:text-teal-950 transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <span>AI Car Valuation</span>
                          <span className="font-mono text-[7.5px] font-bold text-teal-700 uppercase">Appraise</span>
                        </button>
                        <button
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            setActiveDetailCar(null);
                            setCurrentView('settings');
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-5 py-2 hover:bg-zinc-50 hover:text-teal-950 transition-colors cursor-pointer flex items-center justify-between font-semibold text-teal-950"
                        >
                          <span>Account Settings</span>
                          <span className="font-mono text-[7.5px] font-bold text-teal-700 uppercase">Manage</span>
                        </button>
                      </div>

                      {/* Disconnect Trigger */}
                      <div className="px-4.5 pt-3">
                        <button
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            setShowProfileMenu(false);
                            onBackToGate();
                          }}
                          className="w-full py-2 bg-teal-950 hover:bg-teal-900 text-white font-mono text-[9px] tracking-widest font-extrabold uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <LogOut className="h-3 w-3 text-teal-400" />
                          <span>Disconnect node</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Sub-Navigation */}
      <div className="flex md:hidden bg-zinc-50 border-b border-zinc-200/60 overflow-x-auto hide-scrollbar px-4 py-3 gap-5 sticky top-20 z-30">
        <button 
          onClick={() => { setActiveDetailCar(null); setCurrentView('dashboard'); AutoNovaAudio.playClick(); }}
          className={`font-mono text-[9px] font-black tracking-widest uppercase pb-0.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
            currentView === 'dashboard' && !activeDetailCar ? 'border-teal-700 text-teal-700' : 'border-transparent text-zinc-400'
          }`}
        >
          Showroom
        </button>
        <button 
          onClick={() => { setActiveDetailCar(null); setCurrentView('search'); AutoNovaAudio.playClick(); }}
          className={`font-mono text-[9px] font-black tracking-widest uppercase pb-0.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
            currentView === 'search' && !activeDetailCar ? 'border-teal-700 text-teal-700' : 'border-transparent text-zinc-400'
          }`}
        >
          Inventory
        </button>
        <button 
          onClick={() => { setActiveDetailCar(null); setCurrentView('compare'); AutoNovaAudio.playClick(); }}
          className={`font-mono text-[9px] font-black tracking-widest uppercase pb-0.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
            currentView === 'compare' && !activeDetailCar ? 'border-teal-700 text-teal-700' : 'border-transparent text-zinc-400'
          }`}
        >
          Compare
        </button>
        <button 
          onClick={() => { setActiveDetailCar(null); setCurrentView('saved'); AutoNovaAudio.playClick(); }}
          className={`font-mono text-[9px] font-black tracking-widest uppercase pb-0.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
            currentView === 'saved' && !activeDetailCar ? 'border-teal-700 text-teal-700' : 'border-transparent text-zinc-400'
          }`}
        >
          Saved
        </button>
        <button 
          onClick={() => { setActiveDetailCar(null); setCurrentView('alerts'); AutoNovaAudio.playClick(); }}
          className={`font-mono text-[9px] font-black tracking-widest uppercase pb-0.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
            currentView === 'alerts' && !activeDetailCar ? 'border-teal-700 text-teal-700' : 'border-transparent text-zinc-400'
          }`}
        >
          Alerts
        </button>
        <button 
          onClick={() => { setActiveDetailCar(null); setCurrentView('valuation'); AutoNovaAudio.playClick(); }}
          className={`font-mono text-[9px] font-black tracking-widest uppercase pb-0.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
            currentView === 'valuation' && !activeDetailCar ? 'border-teal-700 text-teal-700' : 'border-transparent text-zinc-400'
          }`}
        >
          Valuation
        </button>
        <button 
          onClick={() => { setActiveDetailCar(null); setCurrentView('finance'); AutoNovaAudio.playClick(); }}
          className={`font-mono text-[9px] font-black tracking-widest uppercase pb-0.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
            currentView === 'finance' && !activeDetailCar ? 'border-teal-700 text-teal-700' : 'border-transparent text-zinc-400'
          }`}
        >
          Finance
        </button>
        <button 
          onClick={() => { setActiveDetailCar(null); setCurrentView('assistant'); AutoNovaAudio.playClick(); }}
          className={`font-mono text-[9px] font-black tracking-widest uppercase pb-0.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
            currentView === 'assistant' && !activeDetailCar ? 'border-teal-700 text-teal-700' : 'border-transparent text-zinc-400'
          }`}
        >
          AI Assistant
        </button>
        <button 
          onClick={() => { setActiveDetailCar(null); setCurrentView('settings'); AutoNovaAudio.playClick(); }}
          className={`font-mono text-[9px] font-black tracking-widest uppercase pb-0.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
            currentView === 'settings' && !activeDetailCar ? 'border-teal-700 text-teal-700' : 'border-transparent text-zinc-400'
          }`}
        >
          Settings
        </button>
      </div>

      {activeDetailCar ? (
        <CarDetailView 
          car={activeDetailCar}
          onBack={() => { AutoNovaAudio.playClick(); setActiveDetailCar(null); }}
          onSelectCar={(siblingCar) => { setActiveDetailCar(siblingCar); }}
          showNotification={showNotification}
          favoritedCars={favoritedCars}
          handleFavoriteToggle={handleFavoriteToggle}
          allRecommendations={RECOMMENDATIONS}
        />
      ) : currentView === 'portfolio' ? (
        <MemberDashboardView 
          userName={userName}
          role={role}
          favoritedCars={favoritedCars}
          comparedCars={comparedCars}
          onNavigateToView={(view) => { setActiveDetailCar(null); setCurrentView(view); }}
          onSelectCar={(car) => { setActiveDetailCar(car); }}
          onBackToGate={onBackToGate}
          showNotification={showNotification}
          handleFavoriteToggle={handleFavoriteToggle}
          onOpenValuationModal={() => { setShowValuationModal(true); }}
        />
      ) : currentView === 'orders' ? (
        <OrdersView 
          userName={userName}
          role={role}
          orders={orders}
          onNavigateToView={(view) => { setActiveDetailCar(null); setCurrentView(view); }}
          onBackToGate={onBackToGate}
          showNotification={showNotification}
        />
      ) : currentView === 'test-drives' ? (
        <TestDrivesView 
          userName={userName}
          role={role}
          onNavigateToView={(view) => { setActiveDetailCar(null); setCurrentView(view); }}
          onBackToGate={onBackToGate}
          showNotification={showNotification}
        />
      ) : currentView === 'messages' ? (
        <MessagesView 
          userName={userName}
          role={role}
          onNavigateToView={(view) => { setActiveDetailCar(null); setCurrentView(view); }}
          onBackToGate={onBackToGate}
          showNotification={showNotification}
          onSelectCar={(car) => { setActiveDetailCar(car); }}
        />
      ) : currentView === 'notifications' ? (
        <NotificationsView 
          userName={userName}
          role={role}
          onNavigateToView={(view) => { setActiveDetailCar(null); setCurrentView(view); }}
          onBackToGate={onBackToGate}
          showNotification={showNotification}
          onSelectCar={(car) => { setActiveDetailCar(car); }}
        />
      ) : currentView === 'settings' ? (
        <SettingsView 
          userName={userName}
          role={role}
          onNavigateToView={(view) => { setActiveDetailCar(null); setCurrentView(view); }}
          onBackToGate={onBackToGate}
          showNotification={showNotification}
        />
      ) : currentView === 'alerts' ? (
        <SavedSearchesView 
          userName={userName}
          role={role}
          onNavigateToView={(view) => { setActiveDetailCar(null); setCurrentView(view); }}
          onBackToGate={onBackToGate}
          showNotification={showNotification}
        />
      ) : currentView === 'valuation' ? (
        <ValuationView 
          userName={userName}
          role={role}
          onNavigateToView={(view) => { setActiveDetailCar(null); setCurrentView(view); }}
          onBackToGate={onBackToGate}
          showNotification={showNotification}
        />
      ) : currentView === 'seller-dashboard' ? (
        <SellerDashboardView 
          userName={userName}
          role={role}
          onNavigateToView={(view) => { setActiveDetailCar(null); setCurrentView(view); }}
          showNotification={showNotification}
          listings={sellerListings}
          onDeleteListing={handleDeleteListing}
          onDeactivateListing={handleDeactivateListing}
        />
      ) : currentView === 'create-listing' ? (
        <CreateListingView 
          userName={userName}
          role={role}
          onNavigateToView={(view) => { setActiveDetailCar(null); setCurrentView(view); }}
          showNotification={showNotification}
          onAddListingToState={handleAddListing}
        />
      ) : currentView === 'reviews' ? (
        <ReviewsView 
          userName={userName}
          role={role}
          onNavigateToView={(view) => { setActiveDetailCar(null); setCurrentView(view); }}
          showNotification={showNotification}
        />
      ) : currentView === 'blog' ? (
        <BlogView 
          userName={userName}
          role={role}
          onNavigateToView={(view) => { setActiveDetailCar(null); setCurrentView(view); }}
          showNotification={showNotification}
        />
      ) : currentView === 'about' ? (
        <AboutView 
          userName={userName}
          role={role}
          onNavigateToView={(view) => { setActiveDetailCar(null); setCurrentView(view); }}
          showNotification={showNotification}
        />
      ) : currentView === 'help' ? (
        <HelpCenterView 
          userName={userName}
          role={role}
          onNavigateToView={(view) => { setActiveDetailCar(null); setCurrentView(view); }}
          showNotification={showNotification}
        />
      ) : currentView === 'terms' ? (
        <TermsOfServiceView 
          userName={userName}
          role={role}
          onNavigateToView={(view) => { setActiveDetailCar(null); setCurrentView(view); }}
          showNotification={showNotification}
        />
      ) : currentView === 'admin' ? (
        <AdminPortalView 
          userName={userName}
          role={role}
          onNavigateToView={(view) => { setActiveDetailCar(null); setCurrentView(view); }}
          showNotification={showNotification}
        />
      ) : (currentView === 'notFound' || currentView === '404') ? (
        <NotFoundView 
          userName={userName}
          role={role}
          onNavigateToView={(view) => { setActiveDetailCar(null); setCurrentView(view); }}
          showNotification={showNotification}
        />
      ) : currentView === 'dashboard' ? (
        <>
          {/* Hero Catalog Search Canvas */}
          <section className="relative pt-12 pb-16 text-center px-4 overflow-hidden border-b border-zinc-200/50">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-purple-200/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-200/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-4xl mx-auto space-y-6">
          <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
            ACCELERATED BY NEURAL MATCHING SYSTEMS
          </span>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-teal-900 leading-none">
            Find your perfect car, <br />
            <TypewriterText
              phrases={[
                'Powered by AutoNova AI',
                'Matched to Your Lifestyle',
                'Curated by Neural Engines',
                'Delivered with Precision',
              ]}
            />
          </h1>
          
          <p className="text-xs md:text-sm text-zinc-500 max-w-xl mx-auto font-medium leading-relaxed">
            Experience the absolute pinnacle of luxury vehicle matching. Our intelligent algorithms curate precise inventory items tailored for your lifestyle.
          </p>

          {/* Functional Search input */}
          <div className="w-full max-w-2xl mx-auto pt-2">
            <div className={`ai-sparkle-glow rounded-2xl ${searchQuery ? 'ai-sparkle-glow--active' : ''}`}>
              <div className="relative group rounded-2xl border border-zinc-300 bg-white p-1.5 flex items-center shadow-lg focus-within:ring-2 focus-within:ring-teal-700/20 focus-within:border-teal-700 transition-all">
                <span className="text-zinc-400 pl-3">
                  <Search className="h-5 w-5" />
                </span>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search premium models, power configurations, or body types..."
                  className="flex-grow bg-transparent border-none focus:outline-none focus:ring-0 px-4 py-3.5 text-xs text-zinc-900 placeholder-zinc-400 font-medium"
                />
                <button 
                  type="button"
                  onClick={() => { AutoNovaAudio.playClick(); showNotification("Voice matching module initializing...", "info"); }}
                  className="p-3 text-zinc-400 hover:text-teal-700 transition-colors cursor-pointer"
                >
                  <Mic className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Filter Tags */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {['SUV', 'Sedan', 'Electric', 'Under $80k', 'Luxury'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  AutoNovaAudio.playClick();
                  if (tag === 'Under $80k') {
                    setSearchQuery('');
                    setSelectedCategory('Luxury'); // This has custom filter criteria
                    showNotification("Filtering for economic luxury tiers.", "info");
                  } else {
                    setSelectedCategory(tag);
                    setSearchQuery('');
                  }
                }}
                className={`px-4 py-1.5 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === tag 
                    ? 'bg-teal-700 text-white shadow-sm' 
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Grid Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full flex-grow">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-teal-900 tracking-tight leading-none">
              Recommended for you
            </h2>
            <p className="text-xxs text-zinc-400 uppercase tracking-widest font-mono font-bold mt-1">
              {filteredRecommendations.length} AI matches matched to your profile
            </p>
          </div>

          <button 
            onClick={() => { AutoNovaAudio.playClick(); showNotification("Loading all 2,400 global listings...", "info"); }}
            className="font-mono text-[9px] font-bold tracking-widest text-purple-700 hover:text-purple-900 uppercase flex items-center gap-1 group transition-all"
          >
            <span>VIEW ALL LISTINGS</span>
            <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Dynamic Cards Grid */}
        {filteredRecommendations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredRecommendations.map((car) => {
              const isFav = favoritedCars.includes(car.id);
              return (
                <motion.div
                  key={car.id}
                  layoutId={`card-${car.id}`}
                  onClick={() => { AutoNovaAudio.playClick(); setActiveDetailCar(car); }}
                  className="bg-white rounded-2xl border border-zinc-200/60 overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  {/* Photo area */}
                  <div className="h-44 overflow-hidden relative bg-zinc-100">
                    <img 
                      src={car.image} 
                      alt={car.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* AI Match badge */}
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-teal-400 text-white px-2.5 py-1 rounded-full text-[8px] font-mono tracking-wider font-extrabold shadow-sm flex items-center gap-1">
                      <Sparkles className="h-2.5 w-2.5" />
                      <span>AI MATCH {car.match}%</span>
                    </div>

                    {/* Favorite heart button */}
                    <button
                      type="button"
                      onClick={(e) => handleFavoriteToggle(car.id, car.name, e)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all cursor-pointer"
                    >
                      <Heart className={`h-4 w-4 transition-colors ${isFav ? 'text-rose-500 fill-rose-500' : 'text-zinc-400'}`} />
                    </button>
                  </div>

                  {/* Body description */}
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-1">
                      <h3 className="font-display text-sm font-extrabold text-zinc-900 group-hover:text-teal-700 transition-colors">
                        {car.name}
                      </h3>
                      <p className="text-[10px] text-zinc-400 font-medium line-clamp-2">
                        {car.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 flex items-center justify-between mt-3">
                      <div>
                        <span className="font-mono text-[7px] text-zinc-400 block tracking-widest uppercase font-bold">VALUATION PRICE</span>
                        <span className="font-display font-extrabold text-sm text-teal-950">
                          ${car.price.toLocaleString()}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-[7px] text-zinc-400 block tracking-widest uppercase font-bold">SPEC PROFILE</span>
                        <span className="font-mono text-[9px] font-bold text-zinc-700">
                          {car.type} • {car.mileage}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-zinc-50 rounded-2xl border border-zinc-200/50">
            <Info className="h-8 w-8 text-zinc-300 mx-auto mb-2" />
            <p className="text-xs text-zinc-500 font-medium">No AutoNova recommendations match your query currently.</p>
            <button 
              type="button" 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); AutoNovaAudio.playClick(); }}
              className="mt-3 text-xs font-mono font-bold text-teal-700 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* The AutoNova Advantage section */}
      <section className="py-16 bg-white border-y border-zinc-200/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-teal-900 tracking-tight leading-none">
              The AutoNova Advantage
            </h2>
            <p className="text-xs text-zinc-500 mt-2 font-medium">
              We leverage the absolute finest machine learning models to maximize utility for our users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Personalized Curation */}
            <div className="p-6 rounded-2xl border border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50/50 transition-all text-center space-y-3 group">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-700 mx-auto transition-transform group-hover:scale-105">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-display text-sm font-extrabold text-zinc-900">Personalized Curation</h3>
              <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                Our neural engine analyzes thousands of real-time listings to locate the premium vehicle perfectly matched to your lifestyle.
              </p>
            </div>

            {/* Instant Valuation */}
            <div className="p-6 rounded-2xl border border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50/50 transition-all text-center space-y-3 group">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-700 mx-auto transition-transform group-hover:scale-105">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="font-display text-sm font-extrabold text-zinc-900">Instant Valuation</h3>
              <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                Receive instant comparative valuations calculated directly against sovereign vehicle registries using AI precision algorithms.
              </p>
            </div>

            {/* Seamless Financing */}
            <div className="p-6 rounded-2xl border border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50/50 transition-all text-center space-y-3 group">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-700 mx-auto transition-transform group-hover:scale-105">
                <Landmark className="h-6 w-6" />
              </div>
              <h3 className="font-display text-sm font-extrabold text-zinc-900">Seamless Financing</h3>
              <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                Interact with high-tier financial nodes automatically to obtain premium interest rates in minutes instead of tedious weeks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <h2 className="font-display text-2xl font-extrabold text-teal-900 text-center mb-8">
          Browse by Category
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { id: 'Sedan', icon: 'directions_car', label: 'Sedan' },
            { id: 'Electric', icon: 'bolt', label: 'Electric' },
            { id: 'SUV', icon: 'airport_shuttle', label: 'SUV' },
            { id: 'Luxury', icon: 'workspace_premium', label: 'Luxury' },
            { id: 'Truck', icon: 'construction', label: 'Trucks' }
          ].map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); AutoNovaAudio.playClick(); setSearchQuery(''); }}
                onMouseEnter={() => AutoNovaAudio.playHover()}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all cursor-pointer text-center group ${
                  isActive 
                    ? 'bg-teal-700 border-teal-700 text-white shadow-md' 
                    : 'bg-white border-zinc-200/60 hover:border-zinc-300 text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-zinc-100/50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <span className={`material-symbols-outlined text-xl ${isActive ? 'text-teal-900' : 'text-zinc-600'}`}>
                    {cat.icon}
                  </span>
                </div>
                <span className="font-mono text-[9px] tracking-widest uppercase font-bold">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Selling Banner Section with functional interactive valuation calculator */}
      <section className="px-4 md:px-8 mb-16 max-w-7xl mx-auto w-full">
        <div className="relative rounded-3xl overflow-hidden min-h-[340px] flex items-center shadow-xl p-8 md:p-12">
          {/* Background blurred illustration */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKo8PIVqsb607ujZIfKQP8XaBkWcC3PQqchzXzy58HUV91Yb8ptBRuSv2UNzsDoOwsRLRMD023ytut8184qFDM5EDIdLG13HVpiFrbOdZFxTbwuXguuE5tKM0wVGyCEDAor9PHFOzYZRqOn9F4zKR_jZWhRkYmXEDl_T_CK4OsRes5DYe0T77KyQ6FQFKppfgV3t7IUbTQt6vcjZ34HZLAY8bYsYTQItNL0ZFfBf1CkzSuGwcoPyoHY1LczDH7AZuBZiOCL-VBzdsI" 
              alt="Futuristic city light trails at night representing high-speed data transmission" 
              className="w-full h-full object-cover filter brightness-[0.45] saturate-150"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 to-purple-900/50 backdrop-blur-xxs" />
          </div>

          <div className="relative z-10 max-w-lg space-y-5 text-white">
            <span className="font-mono text-[8px] tracking-widest uppercase font-bold text-teal-300">
              SECURE VEHICLE LIQUIDATION PROTOCOL
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
              Selling? Get the absolute best value.
            </h2>
            <p className="text-xs text-zinc-300 font-medium leading-relaxed">
              Unlock real-time comparative valuation pricing using our neural network appraisal models to coordinate transactions with approved luxury purchasers.
            </p>
            <button
              onClick={() => { setShowValuationModal(true); AutoNovaAudio.playClick(); }}
              className="inline-flex items-center gap-1.5 px-6 py-3.5 bg-teal-400 hover:bg-teal-300 text-teal-950 font-mono text-[10px] tracking-widest font-extrabold uppercase rounded-full transition-all cursor-pointer shadow-md"
            >
              <TrendingUp className="h-4 w-4" />
              <span>Get Instant AI Valuation</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-zinc-100 border-y border-zinc-200/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-1">
              <p className="font-display text-3xl md:text-4xl font-extrabold text-teal-900">
                <CountUp value={15000} suffix="+" />
              </p>
              <p className="font-mono text-[8px] tracking-widest text-zinc-500 uppercase font-bold">PREMIUM LUXURY CARS SOLD</p>
            </div>
            <div className="space-y-1 border-y md:border-y-0 md:border-x border-zinc-200 py-6 md:py-0">
              <p className="font-display text-3xl md:text-4xl font-extrabold text-teal-900">
                <CountUp value={1200} suffix="+" />
              </p>
              <p className="font-mono text-[8px] tracking-widest text-zinc-500 uppercase font-bold">APPROVED NIGERIAN DEALERS</p>
            </div>
            <div className="space-y-1">
              <p className="font-display text-3xl md:text-4xl font-extrabold text-teal-900">
                <CountUp value={4.9} decimals={1} suffix="/5" />
              </p>
              <p className="font-mono text-[8px] tracking-widest text-zinc-500 uppercase font-bold">AVERAGE HIGH-TIER USER RATING</p>
            </div>
          </div>
        </div>
      </section>

      {/* What Our Drivers Say */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-teal-900 text-center mb-12">
          What Our Drivers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quote 1 */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/60 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex gap-1 text-teal-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-zinc-600 italic font-medium leading-relaxed">
                "AutoNova completely changed how I look at car buying. The AI matches were eerily accurate to my preferences. Found my dream car in minutes."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-6 border-t border-zinc-100 mt-6">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6r_GNsIZ3yflsbQl0oxw4VDmYQ7MGEFFfu1QT_wcfm1ngcbR6JdBv4ogV8KFa_Oskyl9X9rCY9Vh-nVC0NbcrObSfGKhgZRAjQDAi_pYyMx1JA9gPG60MsawcQ1O8WAe6VxZ8R60J8WpWpswog54gG72OzmFOs7HqQUL5fG4ei6tKnb1WnCeKEPgrIUrr4GO7ZumUyAAmMRLdkN1ZKM9C9bX2s-kCFGH7SmQz6yQZZzGEVBpFG0UJ1dZhp-z2sDFD_54qapHErCes" 
                alt="Marcus Vance" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-display font-bold text-xs text-teal-950">Marcus Vance</p>
                <p className="font-mono text-[8px] tracking-wider text-zinc-400 font-bold uppercase">VERIFIED OWNER</p>
              </div>
            </div>
          </div>

          {/* Quote 2 */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/60 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex gap-1 text-teal-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-zinc-600 italic font-medium leading-relaxed">
                "Selling my vehicle through AutoNova was incredibly smooth. The AI valuation was spot on, and I had serious offers within 48 hours. Best experience ever."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-6 border-t border-zinc-100 mt-6">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeykEuWgCWC3av4iENx0L7bToQlDBawTlOMPG7npvTlkcPFZs3PZKAVYde73yVxtSDo8GU_Mq9qpv1wwz7KGyW65DrgXcSbAw-DrOsKGLFZmsCZLsUlQmC3Nh1fix_FQoW_8JfbmMcoBXVxEFQca76YKAstwudYaOcdJPmaOrVToNIcE7QoyUy5ZzTxT9E61wIFP4oSQP0ZfUkAATvmGETkdaMd5vwq-ZHXjAkmlw-EwEJTtUsKZkKbT-E8PAyF7vyBagvfo0vLJoz" 
                alt="Elena Rodriguez" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-display font-bold text-xs text-teal-950">Elena Rodriguez</p>
                <p className="font-mono text-[8px] tracking-wider text-zinc-400 font-bold uppercase">VERIFIED SELLER</p>
              </div>
            </div>
          </div>

          {/* Quote 3 */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/60 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex gap-1 text-teal-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-zinc-600 italic font-medium leading-relaxed">
                "The financing tools are next level. I secured a better rate than my own bank offered in just a few clicks. The transparency is refreshing."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-6 border-t border-zinc-100 mt-6">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSYXTXXCl3GvwxnzUiwBTQTSRUcI1nkTAO4Ciz3Eu-fFNqZRPzP3PYBXnEzHsJ1dQ4cblaGYPQRgh_nnCmiEm4ZGq94T76ptMoINO9c0PHoQhTLqbtBdBIpP2h7y_WQi9Zknv3OxRk6DWZBn5BW4VFuvODb56kX_d20wU53d4fN9sOzVdcgDWAeASAc7SSg960W6_MOHyd8mrJGAHinqpF6xVdR_Ss3y8WMU7Oc3HGUafsY_8Ct89l3OdnXplCS06v2LiVqu1FKVP9" 
                alt="Julian Chen" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-display font-bold text-xs text-teal-950">Julian Chen</p>
                <p className="font-mono text-[8px] tracking-wider text-zinc-400 font-bold uppercase">VERIFIED OWNER</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AutoNova Insights Blog section */}
      <section className="py-16 bg-zinc-100/50 border-t border-zinc-200/60">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-teal-900 tracking-tight leading-none">
                AutoNova Insights
              </h2>
              <p className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase font-bold mt-1">
                LATEST SCIENTIFIC AUTOMOTIVE REPORTS
              </p>
            </div>
            <button 
              onClick={() => { AutoNovaAudio.playClick(); navigate('/blog'); }}
              className="text-xxs font-mono font-bold tracking-widest text-teal-700 hover:underline uppercase"
            >
              ALL ARTICLES
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Post 1 */}
            <div className="group cursor-pointer flex flex-col justify-between" onClick={() => { AutoNovaAudio.playClick(); navigate('/blog'); }}>
              <div>
                <div className="rounded-2xl overflow-hidden aspect-video bg-zinc-200 mb-4">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUKoR4ymfHj4c6JBXU2J6AIcsrUEgJHuZbqhPLByltwEt46Z1huwtYLMhr5UMq2FYHkOto4VX2GsHMsmfj3JetBQD8kcxip6KbaCfzpcABDUGxldX1jw2zrHCYoBhbfiyI6oMmEii0uFtH2TyusKtqCopWthLJEpJ9Qq94OrASRa3ILB_EevgFZU2dZ2q7462QGBWWr-kKMLmLnSQJveujPrGtG-sbEikDWqPT51ML9bfG3jKdiTRImPWbeSdLXni1gg9Ri5DFlSzS" 
                    alt="Charging station at dawn" 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                </div>
                <span className="font-mono text-[8px] text-purple-700 font-bold uppercase tracking-wider block mb-1">
                  TECH • JUNE 12, 2024
                </span>
                <h3 className="font-display font-extrabold text-sm text-teal-950 group-hover:text-purple-700 transition-colors leading-snug">
                  The Future of AI in Automotive Personalization
                </h3>
              </div>
              <span className="text-[10px] text-teal-700 font-bold inline-flex items-center gap-1 mt-3">
                Read More <ArrowRight className="h-3 w-3" />
              </span>
            </div>

            {/* Post 2 */}
            <div className="group cursor-pointer flex flex-col justify-between" onClick={() => { AutoNovaAudio.playClick(); navigate('/blog'); }}>
              <div>
                <div className="rounded-2xl overflow-hidden aspect-video bg-zinc-200 mb-4">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQeki8K-NYY97WRbwmrE7rs6ufOeLEzv2alXfif7YoQVJzgzzw9qT9m-cWgSz9ttd8bfe8eXbWRe7HgOu-3sKJta-KsswdSDiTtekAHASKLPswc-EaMRHC9sUZuTWMdkXKvr79uXkEWkTM9xPdVwqDOQhrmNu2y8WRiNe8qZsFm-vYqgH0HRwSab9kn_-_z7nA8f0rIJeGEOAX-JdFmHBzjkU3tKEGPkoDZy42CVVzZd5RXZP3_PR2lZW0tXbKdjUR6igjDex8ANa-" 
                    alt="Coastal road drive" 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                </div>
                <span className="font-mono text-[8px] text-purple-700 font-bold uppercase tracking-wider block mb-1">
                  GUIDE • JUNE 08, 2024
                </span>
                <h3 className="font-display font-extrabold text-sm text-teal-950 group-hover:text-purple-700 transition-colors leading-snug">
                  Top 10 Electric Vehicles to Watch in 2025
                </h3>
              </div>
              <span className="text-[10px] text-teal-700 font-bold inline-flex items-center gap-1 mt-3">
                Read More <ArrowRight className="h-3 w-3" />
              </span>
            </div>

            {/* Post 3 */}
            <div className="group cursor-pointer flex flex-col justify-between" onClick={() => { AutoNovaAudio.playClick(); navigate('/blog'); }}>
              <div>
                <div className="rounded-2xl overflow-hidden aspect-video bg-zinc-200 mb-4">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaMSRCaCHSlWeFgpN72EUs6wGVh8TerMb-0uOlarADk8D8Kpp6SkRwpSpg5RRMMvTRO2ZIqssT1DOTLNaxRJnXnuOTosqYx0GmipJRhhaALR5GzRhA8jptCm5rtWfWeB9Jquir9PsA-mE6kbgEahaD5pBoc-hKNsxi3ZxSguIaYmCqIJIbmxwLzTxqeVHwHOBW33aHhiXf1JvFBWcbb_JKZ9U6zPeDUdbsSAkZkVjNjctBPGU04wVkqSTVU0Gm1D-ffiHBIEsb-qMW" 
                    alt="Holographic dashboard" 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                </div>
                <span className="font-mono text-[8px] text-purple-700 font-bold uppercase tracking-wider block mb-1">
                  MARKET • JUNE 05, 2024
                </span>
                <h3 className="font-display font-extrabold text-sm text-teal-950 group-hover:text-purple-700 transition-colors leading-snug">
                  Understanding Vehicle Depreciation in the AI Age
                </h3>
              </div>
              <span className="text-[10px] text-teal-700 font-bold inline-flex items-center gap-1 mt-3">
                Read More <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter signup area */}
      <section className="py-20 px-4 md:px-8 bg-white border-t border-zinc-200/50">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-teal-900 tracking-tight">
            Stay Ahead of the Curve
          </h2>
          <p className="text-xs text-zinc-500 font-medium leading-relaxed max-w-md mx-auto">
            Get the latest AI-curated listings, real-time appraisal indexes, and premium West African inventory reports delivered straight to your terminal.
          </p>

          <AnimatePresence mode="wait">
            {!isSubscribed ? (
              <motion.form 
                onSubmit={handleSubscribeNewsletter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col sm:flex-row gap-3 p-1.5 bg-zinc-100 rounded-2xl md:rounded-full max-w-xl mx-auto border border-zinc-200"
              >
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="flex-grow bg-transparent border-none focus:outline-none focus:ring-0 px-5 py-3 text-xs text-zinc-900 placeholder-zinc-400 font-medium"
                />
                <button
                  type="submit"
                  onMouseEnter={() => AutoNovaAudio.playHover()}
                  className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-3 rounded-xl md:rounded-full font-mono text-[10px] tracking-widest font-extrabold uppercase cursor-pointer transition-all shadow-sm"
                >
                  Subscribe
                </button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-teal-50 border border-teal-200/60 rounded-2xl text-center max-w-sm mx-auto"
              >
                <Check className="h-5 w-5 text-teal-700 mx-auto mb-1 animate-bounce" />
                <p className="text-xs text-teal-900 font-bold">You are subscribed to the AutoNova ledger.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
        </>
      ) : currentView === 'assistant' ? (
        <AIAssistantView 
          allRecommendations={RECOMMENDATIONS}
          onSelectCar={(car) => { setActiveDetailCar(car); }}
          showNotification={showNotification}
          favoritedCars={favoritedCars}
          handleFavoriteToggle={handleFavoriteToggle}
        />
      ) : currentView === 'compare' ? (
        <CompareVehiclesView 
          allRecommendations={RECOMMENDATIONS}
          onSelectCar={(car) => { setActiveDetailCar(car); }}
          showNotification={showNotification}
          favoritedCars={favoritedCars}
          handleFavoriteToggle={handleFavoriteToggle}
        />
      ) : currentView === 'saved' ? (
        <SavedCarsView 
          allRecommendations={RECOMMENDATIONS}
          onSelectCar={(car) => { setActiveDetailCar(car); }}
          onBrowse={() => { setCurrentView('dashboard'); }}
          showNotification={showNotification}
          favoritedCars={favoritedCars}
          handleFavoriteToggle={handleFavoriteToggle}
          onCompareToggle={handleCompareToggle}
          comparedCars={comparedCars}
        />
      ) : currentView === 'finance' ? (
        <FinancingView 
          showNotification={showNotification}
          selectedCarPrice={activeDetailCar ? activeDetailCar.price : 55000}
          selectedCarName={activeDetailCar ? activeDetailCar.name : ""}
        />
      ) : currentView === 'cart' ? (
        <CartView 
          userName={userName}
          role={role}
          activeCar={activeDetailCar}
          onBackToShowroom={() => { setCurrentView('dashboard'); }}
          showNotification={showNotification}
          favoritedCarsCount={favoritedCars.length}
          comparedCarsCount={comparedCars.length}
          onProceedToCheckout={(data) => {
            setCheckoutDetails(data);
            setCurrentView('checkout');
          }}
        />
      ) : currentView === 'checkout' ? (
        <CheckoutView 
          userName={userName}
          role={role}
          activeCar={activeDetailCar}
          checkoutData={checkoutDetails}
          onBackToCart={() => { setCurrentView('cart'); }}
          onBackToShowroom={() => { setCheckoutDetails(null); setCurrentView('dashboard'); }}
          showNotification={showNotification}
          onOrderSuccess={handleOrderSuccess}
        />
      ) : (
        <div className="flex-grow flex flex-col md:flex-row relative">
          {/* SideNavBar / Filter Panel */}
          <aside className="w-full md:w-80 flex flex-col bg-zinc-50 border-r border-zinc-200 p-6 space-y-8 md:sticky md:top-20 md:h-[calc(100vh-80px)] overflow-y-auto">
            <div>
              <h2 className="font-display text-lg font-black text-teal-950">Precision Filters</h2>
              <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Refine Your Neural Search</p>
            </div>

            <div className="space-y-6">
              {/* Price Range */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-teal-950 font-mono text-[9px] font-bold uppercase tracking-wider">
                  <Sliders className="h-3.5 w-3.5 text-teal-700" /> Price Range
                </div>
                <input 
                  type="range" 
                  min="20000" 
                  max="500000" 
                  step="5000"
                  value={priceRange} 
                  onChange={(e) => { setPriceRange(parseInt(e.target.value)); AutoNovaAudio.playClick(); }}
                  className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-teal-700 focus:outline-none"
                />
                <div className="flex justify-between text-[9px] font-mono text-zinc-400 font-bold">
                  <span>$20,000</span>
                  <span className="text-teal-700">${priceRange.toLocaleString()}</span>
                  <span>$500,000</span>
                </div>
              </div>

              {/* Make & Model */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-teal-950 font-mono text-[9px] font-bold uppercase tracking-wider">
                  <Award className="h-3.5 w-3.5 text-teal-700" /> Make & Model
                </div>
                <div className="space-y-2">
                  <select 
                    value={selectedMake} 
                    onChange={(e) => { setSelectedMake(e.target.value); setSelectedModel('All'); AutoNovaAudio.playClick(); }}
                    className="w-full bg-white border border-zinc-200 rounded-xl py-2 px-3 text-xs font-semibold focus:outline-none focus:border-teal-700 cursor-pointer"
                  >
                    <option value="All">All Makes</option>
                    <option value="Lucid">Lucid</option>
                    <option value="Porsche">Porsche</option>
                    <option value="Tesla">Tesla</option>
                    <option value="Rivian">Rivian</option>
                    <option value="Lotus">Lotus</option>
                    <option value="AutoNova">AutoNova</option>
                  </select>

                  <select 
                    value={selectedModel} 
                    onChange={(e) => { setSelectedModel(e.target.value); AutoNovaAudio.playClick(); }}
                    disabled={selectedMake === 'All'}
                    className="w-full bg-white border border-zinc-200 rounded-xl py-2 px-3 text-xs font-semibold focus:outline-none focus:border-teal-700 disabled:opacity-50 cursor-pointer"
                  >
                    <option value="All">All Models</option>
                    {availableModels.map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Year Range */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-teal-950 font-mono text-[9px] font-bold uppercase tracking-wider">
                  <Calendar className="h-3.5 w-3.5 text-teal-700" /> Year Range
                </div>
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    placeholder="Min Year" 
                    value={yearFrom}
                    onChange={(e) => { setYearFrom(e.target.value); AutoNovaAudio.playClick(); }}
                    className="w-1/2 bg-white border border-zinc-200 rounded-xl py-2 px-3 text-xs font-semibold focus:outline-none focus:border-teal-700"
                  />
                  <input 
                    type="number" 
                    placeholder="Max Year" 
                    value={yearTo}
                    onChange={(e) => { setYearTo(e.target.value); AutoNovaAudio.playClick(); }}
                    className="w-1/2 bg-white border border-zinc-200 rounded-xl py-2 px-3 text-xs font-semibold focus:outline-none focus:border-teal-700"
                  />
                </div>
              </div>

              {/* Body Type */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-teal-950 font-mono text-[9px] font-bold uppercase tracking-wider">
                  <Layers className="h-3.5 w-3.5 text-teal-700" /> Body Type
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {['Sedan', 'SUV', 'Coupe', 'Truck'].map((body) => {
                    const isChecked = selectedBodyTypes.includes(body);
                    return (
                      <label key={body} className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={isChecked}
                          onChange={() => {
                            AutoNovaAudio.playClick();
                            if (isChecked) {
                              setSelectedBodyTypes(selectedBodyTypes.filter(b => b !== body));
                            } else {
                              setSelectedBodyTypes([...selectedBodyTypes, body]);
                            }
                          }}
                          className="rounded border-zinc-300 text-teal-700 focus:ring-teal-700 h-4 w-4 cursor-pointer"
                        />
                        <span className="font-mono text-[9px] font-bold text-zinc-500 group-hover:text-teal-950 transition-colors uppercase">{body}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Fuel Type */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-teal-950 font-mono text-[9px] font-bold uppercase tracking-wider">
                  <Globe className="h-3.5 w-3.5 text-teal-700" /> Fuel Configuration
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Electric', 'Hybrid', 'Petrol'].map((fuel) => {
                    const isActive = selectedFuelTypes.includes(fuel);
                    return (
                      <button 
                        key={fuel}
                        onClick={() => {
                          AutoNovaAudio.playClick();
                          if (isActive) {
                            setSelectedFuelTypes(selectedFuelTypes.filter(f => f !== fuel));
                          } else {
                            setSelectedFuelTypes([...selectedFuelTypes, fuel]);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-full font-mono text-[8px] font-extrabold uppercase tracking-widest transition-all cursor-pointer ${
                          isActive 
                            ? 'bg-teal-700 text-white shadow-sm' 
                            : 'bg-zinc-150 hover:bg-zinc-200 text-zinc-500'
                        }`}
                      >
                        {fuel}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Exterior Colors */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-teal-950 font-mono text-[9px] font-bold uppercase tracking-wider">
                  <Shield className="h-3.5 w-3.5 text-teal-700" /> Exterior Color
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'All', colorClass: 'bg-gradient-to-r from-red-500 via-green-500 to-blue-500 border-zinc-300' },
                    { id: 'Midnight Stellar', colorClass: 'bg-zinc-900 border-zinc-800' },
                    { id: 'Glacier White', colorClass: 'bg-zinc-100 border-zinc-300' },
                    { id: 'Neptune Blue', colorClass: 'bg-blue-600 border-blue-500' },
                    { id: 'Ultra Red', colorClass: 'bg-red-600 border-red-500' },
                    { id: 'Obsidian Shadow', colorClass: 'bg-zinc-850 border-zinc-700' }
                  ].map((colorItem) => (
                    <button
                      key={colorItem.id}
                      title={colorItem.id}
                      onClick={() => { setSelectedColor(colorItem.id); AutoNovaAudio.playClick(); }}
                      className={`w-7 h-7 rounded-full border-2 cursor-pointer transition-all hover:scale-110 ${colorItem.colorClass} ${
                        selectedColor === colorItem.id 
                          ? 'ring-2 ring-teal-700 ring-offset-2 scale-105' 
                          : 'border-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Mileage — previously missing entirely */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-teal-950 font-mono text-[9px] font-bold uppercase tracking-wider">
                    <Gauge className="h-3.5 w-3.5 text-teal-700" /> Max Mileage
                  </div>
                  <span className="font-mono text-[9px] font-bold text-teal-700">{maxMileage.toLocaleString()} mi</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={maxMileage}
                  onChange={(e) => setMaxMileage(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-teal-700"
                />
              </div>

              {/* Transmission — previously missing entirely */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-teal-950 font-mono text-[9px] font-bold uppercase tracking-wider">
                  <Settings className="h-3.5 w-3.5 text-teal-700" /> Transmission
                </div>
                <div className="flex flex-wrap gap-2">
                  {['All', 'Single-Speed Automatic', '2-Speed Automatic', '8-Speed Automatic', '7-Speed Manual'].map((t) => (
                    <button
                      key={t}
                      onClick={() => { AutoNovaAudio.playClick(); setSelectedTransmission(t); }}
                      className={`px-2.5 py-1.5 rounded-lg font-mono text-[8px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                        selectedTransmission === t ? 'bg-teal-700 text-white border-teal-700' : 'bg-white text-zinc-500 border-zinc-200 hover:border-teal-300'
                      }`}
                    >
                      {t === 'All' ? 'All' : t.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features — previously missing entirely */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-teal-950 font-mono text-[9px] font-bold uppercase tracking-wider">
                  <CheckCircle2 className="h-3.5 w-3.5 text-teal-700" /> Features
                </div>
                <div className="space-y-1.5">
                  {['Panoramic Roof', 'Full Self-Driving Capable', 'Sport Exhaust', 'Tow Package', 'Wireless Charging'].map((feat) => (
                    <label key={feat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFeatures.includes(feat)}
                        onChange={() => {
                          AutoNovaAudio.playClick();
                          setSelectedFeatures(prev => prev.includes(feat) ? prev.filter(f => f !== feat) : [...prev, feat]);
                        }}
                        className="cursor-pointer"
                      />
                      <span className="text-[10px] font-medium text-zinc-600">{feat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Listings Grid */}
          <div className="flex-grow p-6 md:p-8 space-y-8 bg-[#fdf8f8] max-h-[calc(100vh-80px)] overflow-y-auto pb-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-zinc-200/60">
              <div>
                <h1 className="font-display text-2xl font-extrabold text-teal-950 tracking-tight">Curated Inventory</h1>
                <p className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
                  {sortedInventory.length} precision listings match your neural filters
                </p>
              </div>

              {/* Sort controls */}
              <div className="flex items-center gap-3 self-start md:self-auto">
                <div className="flex bg-zinc-100/80 p-1 rounded-lg border border-zinc-200/40">
                  <button
                    onClick={() => { AutoNovaAudio.playClick(); setResultsViewMode('grid'); }}
                    title="Grid view"
                    className={`p-1.5 rounded-md transition-all cursor-pointer ${resultsViewMode === 'grid' ? 'bg-white shadow-sm text-teal-700' : 'text-zinc-400 hover:text-zinc-700'}`}
                  >
                    <Layers className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => { AutoNovaAudio.playClick(); setResultsViewMode('list'); }}
                    title="List view"
                    className={`p-1.5 rounded-md transition-all cursor-pointer ${resultsViewMode === 'list' ? 'bg-white shadow-sm text-teal-700' : 'text-zinc-400 hover:text-zinc-700'}`}
                  >
                    <List className="h-3.5 w-3.5" />
                  </button>
                </div>
                <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Sort By:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => { setSortBy(e.target.value); AutoNovaAudio.playClick(); }}
                  className="bg-white border border-zinc-200 rounded-xl py-1.5 px-3 text-xs font-semibold focus:outline-none focus:border-teal-700 cursor-pointer"
                >
                  <option value="Newest">Newest Year</option>
                  <option value="Price Low-High">Price: Low-High</option>
                  <option value="Price High-Low">Price: High-Low</option>
                  <option value="Match Rate">AI Match Rate</option>
                </select>
              </div>
            </div>

            {/* List results */}
            {sortedInventory.length > 0 ? (
              <div className={resultsViewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
                {sortedInventory.map((car) => {
                  const isFav = favoritedCars.includes(car.id);
                  const isCompared = comparedCars.includes(car.id);
                  return (
                    <div 
                      key={car.id} 
                      onClick={() => { AutoNovaAudio.playClick(); setActiveDetailCar(car); }}
                      className={`bg-white rounded-2xl border border-zinc-200/60 overflow-hidden group hover:shadow-xl hover:border-zinc-300 transition-all duration-300 cursor-pointer ${
                        resultsViewMode === 'list' ? 'flex flex-row items-stretch' : 'flex flex-col justify-between h-full'
                      }`}
                    >
                      {/* Photo Area */}
                      <div className={resultsViewMode === 'list' ? "w-52 shrink-0 overflow-hidden relative bg-zinc-100" : "h-44 overflow-hidden relative bg-zinc-100"}>
                        <img 
                          src={car.image} 
                          alt={car.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                        />
                        {/* AI Match rate badge */}
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-teal-400 text-white px-2.5 py-1 rounded-full text-[8px] font-mono tracking-widest font-black shadow-sm flex items-center gap-1">
                          <Sparkles className="h-2.5 w-2.5 animate-pulse" />
                          <span>AI MATCH {car.match}%</span>
                        </div>
                        {/* Favorite icon trigger */}
                        <button
                          type="button"
                          onClick={(e) => handleFavoriteToggle(car.id, car.name, e)}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all cursor-pointer"
                        >
                          <Heart className={`h-4 w-4 transition-colors ${isFav ? 'text-rose-500 fill-rose-500' : 'text-zinc-400'}`} />
                        </button>
                      </div>

                      {/* Content block */}
                      <div className="p-5 flex-grow flex flex-col justify-between">
                        <div className="space-y-1">
                          <h3 className="font-display text-sm font-extrabold text-zinc-900 group-hover:text-teal-700 transition-colors">
                            {car.name}
                          </h3>
                          <p className="text-[9px] text-zinc-400 font-bold uppercase font-mono tracking-wider">
                            {car.year} • {car.color}
                          </p>
                          <p className="text-[11px] text-zinc-500 font-medium line-clamp-2 leading-relaxed pt-1">
                            {car.desc}
                          </p>
                        </div>

                        {/* Specs grid */}
                        <div className="py-2.5 border-y border-zinc-100 grid grid-cols-3 gap-2 my-3">
                          <div className="text-center">
                            <span className="font-mono text-[7px] text-zinc-400 block tracking-wider uppercase font-extrabold">MILEAGE</span>
                            <span className="font-mono text-[9px] font-bold text-zinc-700">{car.mileage}</span>
                          </div>
                          <div className="text-center border-x border-zinc-100">
                            <span className="font-mono text-[7px] text-zinc-400 block tracking-wider uppercase font-extrabold">POWER</span>
                            <span className="font-mono text-[9px] font-bold text-zinc-700">{car.specs.power}</span>
                          </div>
                          <div className="text-center">
                            <span className="font-mono text-[7px] text-zinc-400 block tracking-wider uppercase font-extrabold">ACCEL</span>
                            <span className="font-mono text-[9px] font-bold text-zinc-700">{car.specs.zeroToSixty}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-mono text-[7px] text-zinc-400 block tracking-widest uppercase font-extrabold">ASK PRICE</span>
                            <span className="font-display font-extrabold text-sm text-teal-950">
                              ${car.price.toLocaleString()}
                            </span>
                          </div>

                          <label className="flex items-center gap-1.5 cursor-pointer select-none" onClick={(e) => e.stopPropagation()}>
                            <input 
                              type="checkbox" 
                              checked={isCompared}
                              onChange={(e) => handleCompareToggle(car.id, car.name, e)}
                              className="rounded border-zinc-300 text-teal-700 focus:ring-teal-700 h-4 w-4 cursor-pointer"
                            />
                            <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Compare</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-zinc-200/50">
                <Info className="h-10 w-10 text-zinc-300 mx-auto mb-3" />
                <p className="text-sm text-zinc-600 font-bold">No premium models matched your current selection.</p>
                <p className="text-xs text-zinc-400 mt-1">Try broad filters or hit reset to return to standard parameters.</p>
                <button 
                  onClick={() => {
                    setSelectedMake('All');
                    setSelectedModel('All');
                    setPriceRange(500000);
                    setYearFrom('');
                    setYearTo('');
                    setSelectedBodyTypes([]);
                    setSelectedFuelTypes(['Electric']);
                    setSelectedColor('All');
                    setSearchQuery('');
                    AutoNovaAudio.playClick();
                  }}
                  className="mt-4 px-5 py-2.5 bg-teal-700 text-white font-mono text-[10px] font-extrabold tracking-widest uppercase rounded-xl shadow-sm hover:bg-teal-800 transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* AI Banner inside list */}
            <div className="pt-6">
              <div className="relative rounded-3xl overflow-hidden p-[1px] bg-gradient-to-r from-teal-400 via-purple-500 to-teal-400 shadow-xl">
                <div className="relative bg-white/95 backdrop-blur-md rounded-[23px] px-8 py-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 shadow-sm">
                        <Sparkles className="h-5 w-5 text-teal-700 animate-pulse" />
                      </span>
                      <span className="font-mono text-[9px] font-bold text-teal-700 tracking-wider uppercase">Nova Intelligence Engine</span>
                    </div>
                    <h2 className="font-display text-2xl lg:text-3xl font-extrabold text-teal-950">AI Curated Match of the Week</h2>
                    <p className="text-xs text-zinc-500 font-medium leading-relaxed max-w-xl">
                      Based on your interest in high-voltage powertrains and luxury ride mechanics, our neural matching recommender features a special edition <strong>2025 Rimac Nevera</strong> arriving for certification.
                    </p>
                    <div className="flex gap-3 pt-2">
                      <button 
                        onClick={() => { AutoNovaAudio.playSuccess(); showNotification("Rimac Nevera private file request logged.", "success"); }}
                        className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-mono text-[10px] tracking-widest font-extrabold uppercase transition-all cursor-pointer shadow-sm"
                      >
                        Request Private File
                      </button>
                      <button 
                        onClick={() => { AutoNovaAudio.playClick(); showNotification("Dossier request postponed.", "info"); }}
                        className="px-6 py-3 border border-zinc-200 hover:bg-zinc-50 text-zinc-600 rounded-xl font-mono text-[10px] tracking-widest font-extrabold uppercase transition-all cursor-pointer"
                      >
                        Postpone Request
                      </button>
                    </div>
                  </div>

                  <div className="relative w-full lg:w-80 aspect-video rounded-2xl overflow-hidden shadow-lg border border-zinc-200">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_1r-3dvO9l2h_MsYeVRt55vlkfyaT0_Zs0rQb0WTzGWKuXk2lj6UCQY9eYN6P1r9wA5catTmEIq3hN1c1isaH0CZ6uLbflioMzjD2uroK1nvhnTTjbwLumxj_vI1NNeAVTOeMULpw8Qd5-pYYjd1bWki4DhA35TwlANCgWxgqCElataauEX3u33wnMp7OG1xVQnpmZmDv0x3pkww4LZPujkjNaTF0NJQ5mDKteXrYgQyIGwPkfJug0HDlBKn_pqB01wJxiTHxly3x" 
                      alt="Rimac Nevera Cockpit" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Compare Bottom Bar */}
          <AnimatePresence>
            {comparedCars.length > 0 && (
              <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-teal-700 shadow-[0_-10px_25px_rgba(0,0,0,0.1)] px-4 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto md:rounded-t-3xl"
              >
                <div className="flex items-center gap-4 mb-3 md:mb-0">
                  <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
                    <Sliders className="h-5 w-5 text-teal-700 animate-spin-slow" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-extrabold text-teal-950">Fleet Comparative Dashboard</h4>
                    <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">
                      {comparedCars.length} of 3 premium vehicles active for appraisal
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <button 
                    onClick={resetCompare}
                    className="px-4 py-2 border border-zinc-200 hover:bg-zinc-50 text-zinc-600 rounded-xl font-mono text-[10px] tracking-widest font-extrabold uppercase transition-all cursor-pointer"
                  >
                    Clear All
                  </button>
                  <button 
                    onClick={() => { AutoNovaAudio.playSuccess(); setShowCompareDetail(true); }}
                    className="px-6 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-mono text-[10px] tracking-widest font-extrabold uppercase transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
                  >
                    <span>Generate Analysis</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Comparative Detail Fullscreen Overlay Modal */}
          <AnimatePresence>
            {showCompareDetail && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
              >
                <motion.div 
                  initial={{ scale: 0.98, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.98, opacity: 0 }}
                  className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col h-[90vh]"
                >
                  {/* Header */}
                  <div className="px-6 py-5 border-b border-zinc-150 flex items-center justify-between bg-zinc-50">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-teal-700 animate-pulse" />
                      <div>
                        <h2 className="font-display text-lg font-black text-teal-950">Sovereign Fleet Analysis dossier</h2>
                        <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Comparative appraisal parameters & performance indexes</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => { AutoNovaAudio.playClick(); setShowCompareDetail(false); }}
                      className="p-2 rounded-full bg-zinc-200 hover:bg-zinc-300 transition-colors text-zinc-600 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Body columns */}
                  <div className="flex-grow overflow-y-auto p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {comparedCars.map(id => {
                      const car = RECOMMENDATIONS.find(c => c.id === id);
                      if (!car) return null;
                      return (
                        <div key={car.id} className="border border-zinc-200 rounded-2xl overflow-hidden bg-[#fdf8f8] flex flex-col justify-between p-5 space-y-4 shadow-sm hover:shadow-md transition-all">
                          <div className="space-y-3">
                            <div className="aspect-video rounded-xl overflow-hidden bg-zinc-100">
                              <img src={car.image} alt={car.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <span className="font-mono text-[8px] font-extrabold bg-gradient-to-r from-purple-100 to-teal-100 text-teal-900 px-2.5 py-0.5 rounded-full tracking-wider uppercase">
                                AI MATCH {car.match}%
                              </span>
                              <h3 className="font-display text-sm font-extrabold text-teal-950 mt-1.5">{car.name}</h3>
                              <p className="font-mono text-[9px] font-bold text-zinc-400 uppercase">{car.year} • {car.type}</p>
                            </div>
                          </div>

                          {/* Metric checklist */}
                          <div className="space-y-2 py-3 border-y border-zinc-200/60 text-xs font-medium text-zinc-600">
                            <div className="flex justify-between">
                              <span className="text-zinc-400 font-mono text-[9px] uppercase font-bold">Appraisal Price</span>
                              <span className="font-display font-extrabold text-teal-950">${car.price.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-400 font-mono text-[9px] uppercase font-bold">0-60 Accel</span>
                              <span className="font-mono font-bold text-zinc-700">{car.specs.zeroToSixty}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-400 font-mono text-[9px] uppercase font-bold">Max Power</span>
                              <span className="font-mono font-bold text-zinc-700">{car.specs.power}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-400 font-mono text-[9px] uppercase font-bold">Battery Range</span>
                              <span className="font-mono font-bold text-zinc-700">{car.specs.range}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-zinc-400 font-mono text-[9px] uppercase font-bold">Top Speed</span>
                              <span className="font-mono font-bold text-zinc-700">{car.specs.topSpeed}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <button 
                              onClick={() => { AutoNovaAudio.playSuccess(); showNotification(`Priority buy offer submitted for ${car.name}.`, "success"); }}
                              className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-mono text-[9px] font-extrabold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-sm text-center"
                            >
                              Submit Buy Offer
                            </button>
                            <button 
                              onClick={() => { AutoNovaAudio.playClick(); showNotification(`Securing virtual test ride for ${car.name}...`, "info"); }}
                              className="w-full py-2.5 border border-zinc-200 hover:bg-zinc-50 text-zinc-600 font-mono text-[9px] font-extrabold uppercase tracking-wider rounded-xl transition-colors cursor-pointer text-center"
                            >
                              Virtual Ride
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary CTA */}
                  <div className="px-6 py-4 border-t border-zinc-150 flex flex-col sm:flex-row items-center justify-between bg-zinc-50 gap-4">
                    <p className="text-[11px] text-zinc-500 font-medium leading-relaxed max-w-lg">
                      Appraisals generated from sovereign neural indexing are secure. Values reflect regional import taxes, battery condition metrics, and certified luxury indexes.
                    </p>
                    <button 
                      onClick={() => { AutoNovaAudio.playSuccess(); showNotification("Consolidated comparative dossier emailed.", "success"); }}
                      className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-[9px] font-extrabold uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-sm text-center whitespace-nowrap"
                    >
                      Export Dossier PDF
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Shared Footer component */}
      <footer className="bg-zinc-100 border-t border-zinc-200 text-zinc-500 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="p-1 rounded-lg bg-teal-700/5 text-teal-700">
                <Sparkles className="h-4 w-4 text-teal-700" />
              </span>
              <span className="font-display text-lg font-black tracking-tighter text-teal-700">AutoNova</span>
            </div>
            <p className="text-xs text-zinc-400 font-medium max-w-xs leading-relaxed">
              Redefining luxury automotive curation across the West African region via secure neural intelligence networks.
            </p>
            <div className="text-[10px] font-mono tracking-widest font-bold text-zinc-400">
              LEDGER SYNC: ACTIVE // PORT 3000
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[9px] tracking-widest uppercase font-extrabold text-teal-950 mb-3">COMPANY</h4>
            <ul className="space-y-1.5 text-xs font-medium text-zinc-500">
              <li><button onClick={() => { AutoNovaAudio.playClick(); navigate('/about'); }} className="hover:text-teal-700 cursor-pointer">About Us</button></li>
              <li><button onClick={() => { AutoNovaAudio.playClick(); navigate('/about'); }} className="hover:text-teal-700 cursor-pointer">Careers</button></li>
              <li><button onClick={() => { AutoNovaAudio.playClick(); navigate('/contact'); }} className="hover:text-teal-700 cursor-pointer">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[9px] tracking-widest uppercase font-extrabold text-teal-950 mb-3">RESOURCES</h4>
            <ul className="space-y-1.5 text-xs font-medium text-zinc-500">
              <li><button onClick={() => { AutoNovaAudio.playClick(); navigate('/blog'); }} className="hover:text-teal-700 cursor-pointer">Blog</button></li>
              <li><button onClick={() => { AutoNovaAudio.playClick(); navigate('/faq'); }} className="hover:text-teal-700 cursor-pointer">Help Center</button></li>
              <li><button onClick={() => { AutoNovaAudio.playClick(); navigate('/faq'); }} className="hover:text-teal-700 cursor-pointer">FAQ</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[9px] tracking-widest uppercase font-extrabold text-teal-950 mb-3">LEGAL</h4>
            <ul className="space-y-1.5 text-xs font-medium text-zinc-500">
              <li><button onClick={() => { AutoNovaAudio.playClick(); navigate('/privacy'); }} className="hover:text-teal-700 cursor-pointer">Privacy Policy</button></li>
              <li><button onClick={() => { AutoNovaAudio.playClick(); navigate('/terms'); }} className="hover:text-teal-700 cursor-pointer">Terms of Service</button></li>
              <li><button onClick={() => { AutoNovaAudio.playClick(); navigate('/privacy'); }} className="hover:text-teal-700 cursor-pointer">Cookie Settings</button></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 pt-6 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono font-bold text-zinc-400">
          <p>© 2026 AUTONOVA KINETIC INTEL. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4">
            <span>ENGLISH (NG)</span>
            <span>•</span>
            <span>NGN (₦) / USD ($)</span>
          </div>
        </div>
      </footer>

      {/* DETAIL MODAL OVERLAY */}
      <AnimatePresence>
        {activeDetailCar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveDetailCar(null)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full border border-zinc-200/80 shadow-2xl"
            >
              <div className="relative h-64 bg-zinc-100">
                <img 
                  src={activeDetailCar.image} 
                  alt={activeDetailCar.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setActiveDetailCar(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center shadow-md cursor-pointer transition-colors border border-white/10"
                >
                  <span className="font-display font-bold text-sm">✕</span>
                </button>

                <div className="absolute bottom-4 left-4 bg-gradient-to-r from-purple-500 to-teal-400 text-white px-3 py-1 rounded-full text-xxs font-mono font-extrabold shadow-md flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3" />
                  <span>AI SPEC PROFILE MATCH: {activeDetailCar.match}%</span>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-5">
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-teal-700 font-extrabold uppercase">
                    {activeDetailCar.type} HYBRID PLATFORM
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-extrabold text-teal-950 leading-none mt-1">
                    {activeDetailCar.name}
                  </h3>
                </div>

                <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                  {activeDetailCar.desc}
                </p>

                {/* Specs list */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-zinc-100">
                  <div className="space-y-1">
                    <span className="font-mono text-[8px] text-zinc-400 block tracking-wider uppercase font-bold">0-100 KM/H</span>
                    <span className="font-display font-extrabold text-base text-teal-950">{activeDetailCar.specs.zeroToSixty}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[8px] text-zinc-400 block tracking-wider uppercase font-bold">TOP SPEED</span>
                    <span className="font-display font-extrabold text-base text-teal-950">{activeDetailCar.specs.topSpeed}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[8px] text-zinc-400 block tracking-wider uppercase font-bold">RANGE RATE</span>
                    <span className="font-display font-extrabold text-base text-teal-950">{activeDetailCar.specs.range}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[8px] text-zinc-400 block tracking-wider uppercase font-bold">POWER OUTPUT</span>
                    <span className="font-display font-extrabold text-base text-teal-950">{activeDetailCar.specs.power}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="font-mono text-[8px] text-zinc-400 block tracking-widest uppercase font-bold">ESTIMATED DIRECT BUY PRICE</span>
                    <span className="font-display font-extrabold text-xl text-teal-950">${activeDetailCar.price.toLocaleString()}</span>
                  </div>

                  <button
                    onClick={() => {
                      AutoNovaAudio.playSuccess();
                      showNotification(`Buy request for ${activeDetailCar.name} registered on the ledger!`, "success");
                      setActiveDetailCar(null);
                    }}
                    className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-mono text-[10px] tracking-widest uppercase font-extrabold rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    Place Purchase Order
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI VALUATION MODAL */}
      <AnimatePresence>
        {showValuationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setShowValuationModal(false); setValuationResult(null); }}
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
                  <span className="font-mono text-[8px] tracking-widest text-purple-700 font-extrabold uppercase block">
                    NEURAL APPRAISAL ENGINE
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-extrabold text-teal-950 tracking-tight">
                    Instant AI Valuation
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => { setShowValuationModal(false); setValuationResult(null); }}
                  className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 flex items-center justify-center cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>

              {!valuationResult ? (
                <form onSubmit={handleCalculateValuation} className="space-y-4">
                  <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                    Input your vehicle coordinates. Our deep regression model evaluates live demand patterns to calculate an optimal valuation.
                  </p>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="font-mono text-[8px] font-bold text-zinc-400 block uppercase tracking-wider">MAKE</label>
                      <input 
                        type="text" 
                        required 
                        value={valuationMake} 
                        onChange={(e) => setValuationMake(e.target.value)}
                        className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-700"
                        placeholder="e.g. AutoNova"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[8px] font-bold text-zinc-400 block uppercase tracking-wider">MODEL</label>
                      <input 
                        type="text" 
                        required 
                        value={valuationModel} 
                        onChange={(e) => setValuationModel(e.target.value)}
                        className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-700"
                        placeholder="e.g. Eko GT"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-mono text-[8px] font-bold text-zinc-400 block uppercase tracking-wider">YEAR</label>
                        <select 
                          value={valuationYear} 
                          onChange={(e) => setValuationYear(e.target.value)}
                          className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-700"
                        >
                          {['2026', '2025', '2024', '2023', '2022', '2021', '2020'].map(yr => (
                            <option key={yr} value={yr}>{yr}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="font-mono text-[8px] font-bold text-zinc-400 block uppercase tracking-wider">MILEAGE</label>
                        <input 
                          type="number" 
                          required 
                          value={valuationMileage} 
                          onChange={(e) => setValuationMileage(e.target.value)}
                          className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-purple-700"
                          placeholder="e.g. 15000"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isCalculatingValuation}
                    className="w-full py-3.5 bg-purple-700 hover:bg-purple-800 text-white font-mono text-[10px] tracking-widest font-extrabold uppercase rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isCalculatingValuation ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>PROCESSING METRICS...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 text-white animate-pulse" />
                        <span>RUN RECURRENT REGRESSION</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-5 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 mx-auto animate-bounce">
                    <Award className="h-8 w-8" />
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[8px] text-zinc-400 block uppercase tracking-widest font-bold">ESTIMATED NETWORK LIQUID VALUE</span>
                    <h4 className="font-display text-3xl font-black text-purple-950">
                      ${valuationResult.toLocaleString()}
                    </h4>
                    <span className="font-mono text-[8px] tracking-widest text-teal-700 uppercase font-bold block bg-teal-50 px-2 py-0.5 rounded-full inline-block mt-1">
                      98.2% APPRAISAL CONFIDENCE
                    </span>
                  </div>

                  <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                    Valuation holds for {valuationMake} {valuationModel} ({valuationYear}) in local nodes for 14 days.
                  </p>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => { setValuationResult(null); AutoNovaAudio.playClick(); }}
                      className="flex-1 py-3 border border-zinc-200 rounded-xl text-zinc-700 font-mono text-[9px] tracking-wider uppercase font-bold hover:bg-zinc-50 cursor-pointer"
                    >
                      Recalculate
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        AutoNovaAudio.playSuccess();
                        showNotification(`Consignment offer for $${valuationResult.toLocaleString()} submitted!`, "success");
                        setShowValuationModal(false);
                        setValuationResult(null);
                      }}
                      className="flex-1 py-3 bg-teal-700 hover:bg-teal-800 text-white font-mono text-[9px] tracking-wider uppercase font-extrabold rounded-xl shadow-md cursor-pointer"
                    >
                      Consign Vehicle
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CatalogPage;
