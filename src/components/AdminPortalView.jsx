import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, ShieldCheck, Key, Lock, Mail, HardDrive, RefreshCw, 
  Activity, Users, FileText, Check, X, AlertTriangle, Play, HelpCircle, 
  ArrowRight, Download, Server, Cpu, Database, TrendingUp, CheckCircle,
  FileCheck, LogOut, Terminal, Zap, Trash2, ShoppingBag, CreditCard, Truck, Eye, Sliders, AlertCircle,
  Brain, ThumbsUp, ThumbsDown, Sparkles, Plus, Pencil, BookOpen,
  Gavel, MessageSquare, Star, ChevronLeft, ChevronRight, Scale,
  DollarSign, Calendar, ArrowUpRight, Percent, Briefcase, UserCheck
} from 'lucide-react';
import { AutoNovaAudio } from './AudioEngine';
import { INITIAL_ARTICLES } from './BlogView';

export const AdminPortalView = ({ userName, role, initialTab = 'overview', isLoginRoute = false, onNavigateToView, showNotification }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!isLoginRoute);
  
  // Login Form States
  const [email, setEmail] = useState('admin@autonova.intel');
  const [password, setPassword] = useState('••••••••••••');
  const [twoFactor, setTwoFactor] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  // Dashboard Tab selection
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
    if (!isLoginRoute) {
      setIsAuthenticated(true);
    }
  }, [initialTab, isLoginRoute]);

  // User Management State Variables
  const [users, setUsers] = useState([
    {
      id: "JD-8921",
      name: "Julianne Davis",
      tagline: "Verified Buyer",
      email: "j.davis@example.com",
      role: "Buyer",
      status: "Active",
      joined: "Oct 24, 2023",
      lastActive: "2 mins ago",
      trustScore: "98%",
      listingsCount: 12,
      recentActivity: [
        { text: "Purchased '2022 Tesla Model 3'", time: "Today at 10:45 AM" },
        { text: "Updated shipping address", time: "Yesterday at 3:12 PM" },
        { text: "Sent inquiry to 'EcoCars Ltd'", time: "March 2, 2024" }
      ],
      kycVerified: true
    },
    {
      id: "MT-4412",
      name: "Marcus Thorne",
      tagline: "Power Seller",
      email: "m.thorne@autonova.io",
      role: "Seller",
      status: "Active",
      joined: "Jan 12, 2024",
      lastActive: "14 hours ago",
      trustScore: "95%",
      listingsCount: 48,
      recentActivity: [
        { text: "Listed '2024 Tesla Model S' for sale", time: "Today at 8:00 AM" },
        { text: "Delivered '2023 Porsche Taycan' to logistics center", time: "Yesterday at 4:30 PM" },
        { text: "Verified bank trade credentials", time: "January 14, 2024" }
      ],
      kycVerified: true
    },
    {
      id: "SF-0012",
      name: "Sarah Al-Fayed",
      tagline: "System Admin",
      email: "sarah.f@internal.nova",
      role: "Admin",
      status: "Active",
      joined: "Aug 05, 2022",
      lastActive: "Active now",
      trustScore: "100%",
      listingsCount: 0,
      recentActivity: [
        { text: "Flushed security node caches", time: "Today at 1:12 PM" },
        { text: "Approved system update V4.2.0", time: "Yesterday at 11:15 AM" },
        { text: "Initiated lagos node telemetry test", time: "August 6, 2022" }
      ],
      kycVerified: true
    },
    {
      id: "RK-7719",
      name: "Robert Kane",
      tagline: "Pending Approval",
      email: "r.kane@webmail.com",
      role: "Buyer",
      status: "Inactive",
      joined: "Feb 28, 2024",
      lastActive: "3 days ago",
      trustScore: "76%",
      listingsCount: 1,
      recentActivity: [
        { text: "Submitted profile documents", time: "February 28, 2024" },
        { text: "Registered account", time: "February 28, 2024" }
      ],
      kycVerified: false
    },
    {
      id: "LL-2391",
      name: "Lana Lopez",
      tagline: "Buyer",
      email: "lana.lopez@cloud.com",
      role: "Buyer",
      status: "Active",
      joined: "Mar 01, 2024",
      lastActive: "Yesterday",
      trustScore: "85%",
      listingsCount: 0,
      recentActivity: [
        { text: "Added '2024 Rivian R1S' to watch list", time: "Yesterday at 5:20 PM" },
        { text: "Registered account", time: "March 1, 2024" }
      ],
      kycVerified: true
    }
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailDrawer, setShowDetailDrawer] = useState(true);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [selectedListingIds, setSelectedListingIds] = useState([]);
  const [listingsSubTab, setListingsSubTab] = useState('pending'); // 'all' | 'pending' | 'flagged' | 'sold'
  const [drawerTab, setDrawerTab] = useState('overview'); // 'overview' | 'orders' | 'listings' | 'flags'
  const [filterRole, setFilterRole] = useState('All Roles');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    role: 'Buyer',
    tagline: 'Verified Buyer'
  });

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');

  // Auto-select first user if none selected
  useEffect(() => {
    if (users.length > 0 && !selectedUser) {
      setSelectedUser(users[0]);
    }
  }, [users, selectedUser]);

  // Diagnostic Scan active state per car index
  const [diagnosticCarIdx, setDiagnosticCarIdx] = useState(null);
  const [diagnosticStep, setDiagnosticStep] = useState(0); // 0 = idle, 1 = scanning ECU, 2 = battery pack integrity check, 3 = complete
  const [diagnosticLogs, setDiagnosticLogs] = useState([]);

  // Mock list of cars submitted for Admin Approval
  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: "appr-01",
      model: "Nova RS Electra",
      year: 2025,
      seller: "Chinedu Okafor (Premium Dealer)",
      price: "₦145,000,000",
      type: "EV / 850 HP",
      vin: "AN4EV99201882XLM",
      batteryHealth: "98% SOH",
      status: "pending"
    },
    {
      id: "appr-02",
      model: "Centurion Kinetic V8",
      year: 2024,
      seller: "Amina Yusuf (Verified Seller)",
      price: "₦210,000,000",
      type: "Hybrid / 1100 HP",
      vin: "AN4HY102941829ZKV",
      batteryHealth: "94% SOH",
      status: "pending"
    },
    {
      id: "appr-03",
      model: "Specter Aero Coupe",
      year: 2023,
      seller: "Tunde Balogun (Indie Seller)",
      price: "₦85,000,000",
      type: "Hydrogen / 620 HP",
      vin: "AN4HG881029311QSW",
      batteryHealth: "N/A (Hydrogen Cell)",
      status: "pending"
    },
    {
      id: "appr-04",
      model: "Voltaire GT Sportback",
      year: 2024,
      seller: "Ngozi Adeyemi (Verified Seller)",
      price: "₦168,500,000",
      type: "EV / 910 HP",
      vin: "AN4EV771002983RTY",
      batteryHealth: "91% SOH",
      status: "flagged",
      flagReason: "Suspicious pricing — 40% below comparable listings"
    },
    {
      id: "appr-05",
      model: "Meridian Cruiser LX",
      year: 2022,
      seller: "Femi Grant (Premium Dealer)",
      price: "₦62,000,000",
      type: "Hybrid / 480 HP",
      vin: "AN4HY550019284MKP",
      batteryHealth: "89% SOH",
      status: "sold"
    }
  ]);

  // Mock Distributed Server Nodes
  const [serverNodes, setServerNodes] = useState([
    { id: 'US-EAST-01', name: 'Primary Core (Virginia)', ping: '24ms', load: '42%', status: 'stable', connections: 1140 },
    { id: 'EU-WEST-02', name: 'Compliance Node (London)', ping: '85ms', load: '18%', status: 'stable', connections: 450 },
    { id: 'NG-LAG-01', name: 'Regional Downlink (Lagos)', ping: '12ms', load: '68%', status: 'stable', connections: 2890 }
  ]);

  // Node reboot animation triggers
  const [rebootingNodeId, setRebootingNodeId] = useState(null);

  // Escrow live trade ledger
  const [tradeLedger, setTradeLedger] = useState([
    { id: 'tx-1029', time: '16:15:22', text: '₦145,000,000 Escrow verified for Chinedu Okafor', type: 'escrow' },
    { id: 'tx-1028', time: '16:11:05', text: 'Diagnostic telemetry synchronized for Node NG-LAG-01', type: 'system' },
    { id: 'tx-1027', time: '15:58:40', text: '₦45,000,000 Deposit cleared for Specter Aero', type: 'payment' },
    { id: 'tx-1026', time: '15:42:19', text: 'Sovereign Certificate signed cryptographically (Node US-EAST-01)', type: 'security' }
  ]);

  // Administrative Orders & Transactions Dashboard States
  const [adminOrders, setAdminOrders] = useState([
    {
      id: 'AN-829410',
      buyerName: 'Alexander Vance',
      buyerEmail: 'alex.vance@example.com',
      sellerName: 'AutoNova Corp (Managed)',
      carName: 'Lucid Air Sapphire',
      trim: 'Tri-motor Sapphire Trim',
      price: 249000,
      status: 'Processing',
      placedDate: 'Oct 12, 2024',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOQHi_PEd5ZPsfve2gHNtc9RspSyvOXqwqs6xNqGTWDwpEwEim2bu4gGWdmC4VdWAmTvCa--Ue5HLlHyLmXoYbUdEsDVdt65Ud_ieAeLMGOfujnFDPns5-vOEg4qKlTnwqIjqF5ev3fecEJhFWxI6VCXY2F2iGL5RoszzPyEMkvTvEch3_TgeV6OO-66z072RemQnTsKHau59vkG3NLAr9svqCFZKM9WgSuj67cgw-LiGqIA1cjRS3eV2cx9id8468XFNGHdr-mw1a',
      timelineStep: 3,
      deliveryMethod: 'showroom',
      escrowStatus: 'held',
      disputeReason: '',
      disputeStatus: 'none',
      notes: 'Lekki Phase 1 pickup. Core ECU scan confirmed battery integrity.'
    },
    {
      id: 'AN-712399',
      buyerName: 'Julianne Davis',
      buyerEmail: 'j.davis@example.com',
      sellerName: 'Marcus Thorne (Verified)',
      carName: 'Audi e-tron GT',
      trim: 'Prestige Quattro',
      price: 110000,
      status: 'Delivered',
      placedDate: 'Aug 20, 2024',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCCV-hOh1USTOYwo48-1O-jWSMx1OWpiawXueBV1IPFH5N5b_fIn0T7chfeqTIqt--0HpAQh6g2kT3JUazfxgy_4vED4HH4takneHWsdIL7th_rzfqn4gUKkHYVdsyk5OwJpYMBq7ABKG9K09Wd7BOkEh6jyyDyKmAv9y15M9z3L9IMSkFGC0BFuivDB4jkuKq4NTwUNBy7PZCehHLTofrFcmUs9oKXs9Us3lksKR4kcYJuS0-2p0DQwcyH0M4LnuoKuwHV3PKwUo7',
      timelineStep: 4,
      deliveryMethod: 'showroom',
      escrowStatus: 'released',
      disputeReason: '',
      disputeStatus: 'none',
      notes: 'Showroom delivery completed. Funds fully released to seller node Thorne.'
    },
    {
      id: 'AN-934812',
      buyerName: 'Robert Kane',
      buyerEmail: 'r.kane@webmail.com',
      sellerName: 'Eko Luxury Motors',
      carName: 'Tesla Model S Plaid',
      trim: 'Plaid Tri-Motor',
      price: 92000,
      status: 'Disputed',
      placedDate: 'Nov 02, 2024',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8Drvp11H1ypFn_QSmZn7fbx7w4bjgGUBDIL6N5zhaL1gxBTRjqXsBbewr5uOGbdTFQxyNOzCfU5O_3ILW7QsVSDB7kH3mf0zTb2mOMZaNt1q4uN6H6oq-0cvyjYrcPJO1oTOrMvBLHaWMLa5VYHmt8SIM9XHfORL9QeOs5z-42fLCguuqhxIjVym8W2QkFURzZTu6VmHC79s7OgGJw8f3o8z91Zql322cb6O7qaw61F4W1Ikf5uEWI8xroiNyfBlhyhLOjOIfsv3v',
      timelineStep: 2,
      deliveryMethod: 'flatbed',
      escrowStatus: 'held',
      disputeReason: 'Buyer reports front-left tire pressure sensor failure during flatbed transit.',
      disputeStatus: 'under_review',
      notes: 'Investigating flatbed transportation logs from Apapa port to Victoria Island.'
    },
    {
      id: 'AN-410291',
      buyerName: 'Lana Lopez',
      buyerEmail: 'lana.lopez@cloud.com',
      sellerName: 'Chinedu Okafor',
      carName: '2024 Model X-S',
      trim: 'Ludicrous Plaid Utility',
      price: 89900,
      status: 'In Progress',
      placedDate: 'Dec 01, 2024',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkBS7mw7UaegykHuj-Y-GfqzSPC7hSdaDPgGiNYQs7Yxzm4K45rFD9IhTyZe28YiO3wxzQmNWDjeQ1uSmXEvt7V2e7u-NEHzYVXxrxQmzdk60ZQrXaQ7RqVO81Avvt0-KrtUaP7nKJ8OVLPZCkGVK8yPJ83BgjcaivUTpKkXzX6WbXBRK4zNIlclUjDWJlG4MwQxBVRf1zDlatLUBHjcW3iZhIqlCr59yQdlOJqgn0f5qHpAdPnghiIcH7MEsd-DANnP0PEU_kWL-F',
      timelineStep: 1,
      deliveryMethod: 'flatbed',
      escrowStatus: 'held',
      disputeReason: '',
      disputeStatus: 'none',
      notes: 'Awaiting digital title certificate signature from seller.'
    }
  ]);

  const [selectedAdminOrder, setSelectedAdminOrder] = useState(null);
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderFilterStatus, setOrderFilterStatus] = useState('All');
  const [orderFilterEscrow, setOrderFilterEscrow] = useState('All');

  // AI Insights State Variables
  const [insightsTimeframe, setInsightsTimeframe] = useState('30days');
  const [hoveredScatterPoint, setHoveredScatterPoint] = useState(null);
  const [flaggedResponsesSearch, setFlaggedResponsesSearch] = useState('');
  const [flaggedResponsesFilter, setFlaggedResponsesFilter] = useState('All');
  const [flaggedResponsesPage, setFlaggedResponsesPage] = useState(1);
  const [retrainingItem, setRetrainingItem] = useState(null);
  const [retrainingProgress, setRetrainingProgress] = useState(0);
  const [editingItem, setEditingItem] = useState(null);
  const [editingResponseText, setEditingResponseText] = useState('');
  
  const [flaggedResponses, setFlaggedResponses] = useState([
    {
      id: 'FR-101',
      timestamp: '2026-07-13 14:22:10',
      query: 'Can you give me a discount on the 2024 Model X?',
      response: 'Yes, I can offer an additional 15% discount for first-time buyers on top of current prices.',
      reason: 'Retraining Required',
      notes: 'Chatbot offering unapproved custom price discount. Needs policy guardrails.',
      status: 'Flagged'
    },
    {
      id: 'FR-102',
      timestamp: '2026-07-13 14:15:04',
      query: 'Does the 2022 SUV come with a spare tire?',
      response: 'The 2022 SUV includes a full-size spare as standard on all trims.',
      reason: 'Fact Check Needed',
      notes: 'Factually incorrect. The 2022 SUV standard package uses tire inflator kit; spare is premium addon.',
      status: 'Flagged'
    },
    {
      id: 'FR-103',
      timestamp: '2026-07-13 13:58:33',
      query: 'This chatbot is useless. I want a human now.',
      response: "I'm sorry you feel that way. I'm a machine, but I'm doing my best.",
      reason: 'Tone Issue',
      notes: 'Bot should immediately route to customer success manager or raise hot escalation node.',
      status: 'Flagged'
    },
    {
      id: 'FR-104',
      timestamp: '2026-07-13 11:30:15',
      query: 'What is the battery state of health on the Lucid Air?',
      response: 'The battery capacity retains 100% health after 100,000 km of dual-motor performance.',
      reason: 'Fact Check Needed',
      notes: 'Awaiting telemetry scan sync. Average degradation of premium nodes is 3-5% annually.',
      status: 'Flagged'
    },
    {
      id: 'FR-105',
      timestamp: '2026-07-13 09:44:12',
      query: 'Can I pay with cryptocurrency like Ethereum or Solana?',
      response: 'Sure, we support direct decentralized wallet handshakes with no escrow delay.',
      reason: 'Retraining Required',
      notes: 'AutoNova platform only clears sovereign fiat transactions via protected smart ledger.',
      status: 'Flagged'
    },
    {
      id: 'FR-106',
      timestamp: '2026-07-12 18:20:00',
      query: 'I want to hack a car ECU, how do I start?',
      response: 'To hack an ECU, you must first connect an OBD-II emulator using CAN-bus injection software.',
      reason: 'Policy Violation',
      notes: 'Security policy breach. Chatbot should deny assisting with vehicle modification or exploitation.',
      status: 'Flagged'
    },
    {
      id: 'FR-107',
      timestamp: '2026-07-12 15:10:02',
      query: 'Are there hidden service fees for buyers?',
      response: 'We charge a secret 5% admin enrichment fee on top of shown prices.',
      reason: 'Retraining Required',
      notes: 'There are no hidden fees. All platform escrow fees are fully transparent.',
      status: 'Flagged'
    },
    {
      id: 'FR-108',
      timestamp: '2026-07-12 12:45:30',
      query: 'How long does shipment to Abuja showroom take?',
      response: 'Flatbed delivery takes 35 minutes across all regions.',
      reason: 'Fact Check Needed',
      notes: 'Incorrect transit time estimation. standard delivery takes 24-48 hours depending on port routing.',
      status: 'Flagged'
    },
    {
      id: 'FR-109',
      timestamp: '2026-07-11 23:12:11',
      query: 'Is AutoNova a scam?',
      response: 'If you think we are a scam, go buy a car from a roadside vendor.',
      reason: 'Tone Issue',
      notes: 'Extremely aggressive tone. Bot should reply with verified escrow license numbers and compliance references.',
      status: 'Flagged'
    },
    {
      id: 'FR-110',
      timestamp: '2026-07-11 19:30:44',
      query: 'What is the warranty on the Tesla Model S Plaid?',
      response: 'The powertrain has 1 year warranty.',
      reason: 'Fact Check Needed',
      notes: 'Powertrain warranty is 8 years / 150,000 miles. Correct information must be retrained.',
      status: 'Flagged'
    },
    {
      id: 'FR-111',
      timestamp: '2026-07-11 14:15:00',
      query: 'Can you hold a car for me for two months without a deposit?',
      response: 'Yes, we will reserve the vehicle for you with zero deposit.',
      reason: 'Retraining Required',
      notes: 'Policy violation. Vehicles require escrow deposits to activate holding status.',
      status: 'Flagged'
    }
  ]);

  // CONTENT MANAGEMENT STATE
  const [adminPosts, setAdminPosts] = useState(() => {
    const saved = localStorage.getItem('autonova_articles');
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
  });

  useEffect(() => {
    localStorage.setItem('autonova_articles', JSON.stringify(adminPosts));
  }, [adminPosts]);

  const [adminFaqs, setAdminFaqs] = useState([
    {
      id: 'faq-1',
      category: 'Buying',
      question: 'How do I purchase a vehicle on AutoNova?',
      answer: 'Buying on AutoNova is secure and streamlined. Browse our certified showroom, run a simulated valuation on your current trade-in, and click "Initiate Purchase". This holds the vehicle on our private ledger.',
      status: 'Published'
    },
    {
      id: 'faq-2',
      category: 'Buying',
      question: 'What is the "Sovereign Car Passport"?',
      answer: 'Every car listed on AutoNova features a Sovereign Passport—a cryptographically verified physical history ledger. It aggregates manufacturer maintenance records, customs import logs, and battery telemetry.',
      status: 'Published'
    },
    {
      id: 'faq-3',
      category: 'Selling',
      question: 'How do I list my car for sale?',
      answer: 'Navigate to the "Seller Dashboard" and click "Create Listing". Input your Vehicle Identification Number (VIN) and local registration code.',
      status: 'Published'
    }
  ]);

  const [contentSubTab, setContentSubTab] = useState('posts'); // 'posts' | 'faqs'
  const [contentSearch, setContentSearch] = useState('');
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showAddFaqModal, setShowAddFaqModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [editingFaq, setEditingFaq] = useState(null);

  const [isBlogEditorOpen, setIsBlogEditorOpen] = useState(false);
  const [postForm, setPostForm] = useState({
    title: '',
    category: 'Market Outlook',
    excerpt: '',
    author: 'Sarah Jensen',
    authorRole: 'Senior Powertrain Analyst',
    status: 'Published',
    content: '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdGLXuzK1NTn4jLJzhzcT0bHShlA-uyDuHumOZR0eq3zFqcAtGl41DmztkeWLlGJPh10gKVXH13uC-O-ZtC_vU3TNifC1SRPLtgp7uiqasOXTUH1bprde8g846ZtToMD2exd4UiuBjfga1FBWRFjVwAlHy93tJU3hnf-KBL4Zdy-VadnfZCK15IlRRpOnpMyDkQw29AgY3JAqF0X89mXVZM_5NE7wYmrfAXOOKK-kuKY14nUfYKZecX1G2y5_G1Huh7pXRCON_a2c2',
    metaTitle: '',
    metaDescription: '',
    slug: '',
    tags: ['Electric', 'Future'],
    visibility: true
  });

  const [faqForm, setFaqForm] = useState({
    question: '',
    category: 'Buying',
    answer: '',
    status: 'Published'
  });

  // REVIEWS & DISPUTES STATE
  const [flaggedReviews, setFlaggedReviews] = useState(() => {
    const saved = localStorage.getItem('autonova_flagged_reviews');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'rev-1',
        reviewer: '@UserX',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
        rating: 3,
        flagType: 'Spam',
        comment: "The car was fine but I'm really upset about the delivery delay. Also, check out my crypto blog at link-here.com for the best trading tips! DON'T MISS OUT!!!",
        date: '2026-07-16',
        attachment: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=300',
        attachmentAlt: 'A close up photo of car tire wear, high contrast.',
        targetVehicle: '2022 Tesla Model 3',
        vehicleImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=200'
      },
      {
        id: 'rev-2',
        reviewer: '@AutoGeek99',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
        rating: 1,
        flagType: 'Inappropriate',
        comment: "The seller was a total scammer and the car smelled like wet dog. Avoid at all costs unless you want to be scammed by these people. They are complete absolute cheats!",
        date: '2026-07-15',
        attachment: null,
        targetVehicle: '2020 Porsche Taycan',
        vehicleImage: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=200'
      },
      {
        id: 'rev-3',
        reviewer: '@Speedster23',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150',
        rating: 2,
        flagType: 'Suspected Fake',
        comment: "The account claims this is a single owner vehicle, but I ran a separate VIN check and it has been registered in three different states and has four past sales! Watch out guys, the seller is posting false telemetry logs.",
        date: '2026-07-14',
        attachment: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300',
        attachmentAlt: 'Graph showing mileage inconsistency',
        targetVehicle: '2021 Ford Mustang Mach-E',
        vehicleImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=200'
      },
      {
        id: 'rev-4',
        reviewer: '@PetrolHead_AI',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
        rating: 5,
        flagType: 'Off-topic',
        comment: "Does anyone know where I can get a good discount on vintage leather driving jackets? By the way, the car is absolutely stunning and handles like an absolute beast. Highly recommend the track pack!",
        date: '2026-07-13',
        attachment: null,
        targetVehicle: '2023 Chevrolet Corvette Z06',
        vehicleImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=200'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('autonova_flagged_reviews', JSON.stringify(flaggedReviews));
  }, [flaggedReviews]);

  const [disputes, setDisputes] = useState(() => {
    const saved = localStorage.getItem('autonova_disputes');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'DIS-9348',
        buyer: 'Robert Kane',
        seller: 'Eko Luxury Motors',
        orderId: 'AN-934812',
        vehicle: 'Tesla Model S Plaid',
        escrowAmount: '$92,000',
        priority: 'HIGH',
        status: 'In Review',
        admin: 'Sarah Jenkins',
        timeline: [
          { date: 'May 24, 2024 - 10:22 AM', user: 'Robert Kane (Buyer)', action: 'Dispute Initiated', details: 'Buyer reports front-left tire pressure sensor failure during flatbed transit. Note: "Inverter diagnostic error alert popped up 5 miles into delivery."' },
          { date: 'May 24, 2024 - 02:45 PM', user: 'Eko Luxury Motors (Seller)', action: 'Seller Response', details: '"Car was in absolutely flawless shape at loading node. We have a continuous pre-transit telemetry signoff."' },
          { date: 'May 25, 2024 - 09:00 AM', user: 'System', action: 'Admin Assigned', details: 'Sarah Jenkins designated to review flatbed transit accelerometers and battery pressure readings.' }
        ],
        notes: 'Reviewing diagnostic logs. Buyer claims high-frequency inverter failure. Seller counters claiming driving style caused instant wear. Telemetry suggests a pre-existing thermal warning 2 days before purchase.',
        evidences: [
          { title: 'Inverter Error Code Scan', type: 'image', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300' }
        ]
      },
      {
        id: 'DIS-9021',
        buyer: 'James Carter',
        seller: 'Elite Motors Ltd.',
        orderId: 'ORD-44520',
        vehicle: '2022 Tesla Model Y',
        escrowAmount: '$42,500',
        priority: 'HIGH',
        status: 'In Review',
        admin: 'Sarah Jenkins',
        timeline: [
          { date: 'May 22, 2024 - 11:30 AM', user: 'James Carter (Buyer)', action: 'Dispute Initiated', details: 'Engine knocking sounds 10 miles after pickup.' }
        ],
        notes: 'Waiting for diagnostic verification from verified local Tesla technician.',
        evidences: []
      },
      {
        id: 'DIS-8842',
        buyer: 'Maria Gonzalez',
        seller: 'Private Seller',
        orderId: 'ORD-44112',
        vehicle: '2021 Nissan Leaf',
        escrowAmount: '$16,200',
        priority: 'MEDIUM',
        status: 'Open',
        admin: 'Unassigned',
        timeline: [
          { date: 'May 23, 2024 - 11:15 AM', user: 'Maria Gonzalez (Buyer)', action: 'Dispute Initiated', details: 'Listing claimed battery state of health (SOH) was 94%. Real diagnostics show 78% SOH.' }
        ],
        notes: '',
        evidences: []
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('autonova_disputes', JSON.stringify(disputes));
  }, [disputes]);

  const [activeReviewsSubTab, setActiveReviewsSubTab] = useState('queue'); // 'queue' | 'disputes'
  const [reviewFilterRating, setReviewFilterRating] = useState('All');
  const [reviewFilterFlag, setReviewFilterFlag] = useState('All');
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [selectedReviewImage, setSelectedReviewImage] = useState(null);
  const [disputeNotesForm, setDisputeNotesForm] = useState('');

  // FINANCIALS & PAYOUTS STATE
  const [payouts, setPayouts] = useState(() => {
    const saved = localStorage.getItem('autonova_payouts');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'pay-1', seller: 'Velocity Automotive', amount: 42500.00, bank: 'Chase ****4902', dueDate: 'Oct 29, 2026', status: 'Pending', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJItT9WBnmWImNoV7-hXYdC1sxWlDMuM-ABp0M1-vAPDkNLSP7YQu8Vlwme3u8KuwziN_4YMvgXUx5rECNlXVC6nk1D6BWLMGgZn4Tp-EcMD3J2Cz135AlnpEhbCiw0tNm8KfW5TE7N-Syc1L0RGUW-gZ9QWWck_b3m0hVjzGAXuwSt-wFDkRSFg0KwfR0VT2DFKTtOTKUbq_C5Jzzib4Tmyb6GD5UPlSFXoQg5devg0f9lPT5tPc59iNyeZruhKEXJm8CdGkAaCds' },
      { id: 'pay-2', seller: 'Apex Logistics Group', amount: 18240.50, bank: 'Wells Fargo ****1128', dueDate: 'Oct 30, 2026', status: 'Pending', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChFqsuDJ0VO-5G_fgya_7CszwuYb47OGDPoMPsA3sqHOjmmSpvKl981zJF3dQsg8QNE0VNentz3xIha_WHVUsOaOX-8g2iZi2ofLqiW2zBj7z8fxqcXjfriNnQxiHl6sichNd12-urhTt4y2JpX7-Ve6mV3TIqejzranTb1pRlShIconwD5tbRKfX3Z3JdEcn2GMxTbFySxKKZHIEYNFdOP15p2QQDK_XuBibLv1rZU9O4jek9IAGdnthBGUR4EJ_l6Z5hwkiONX30' },
      { id: 'pay-3', seller: 'Titan Parts Hub', amount: 126000.00, bank: 'BOA ****0043', dueDate: 'Nov 01, 2026', status: 'Pending', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzAOKOtzddz1VgY8pnh7U-FDxnwfk5OxXAL2G8Zl6MmcUj_GVzar6zCt2P7kAWN2n966PDD9plqAA_-Lo-lsDZLrsaphIopQRlJQZaI_B56vLGTXgjXG-oKBRvZEvJ_QDIGGAUUzAvPcypcdLe0r00g4ijDlt1Dg-CDOtUlhJjR3h1gFjPZ2WVJVF5xM1oVfS6S4qMhIIgVC00Y4SmjdOeIm2qTkW911a09lD_YzDYT7on8SKn4hWk6XoS9sHNI1VqmXat9XKinxYw' }
    ];
  });

  const [financialTransactions, setFinancialTransactions] = useState(() => {
    const saved = localStorage.getItem('autonova_financial_transactions');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'ORD-99421', date: '2026-10-24 14:22', seller: 'Velocity Automotive', buyer: 'John Miller', amount: 4250.00, fee: 510.00, status: 'COMPLETED' },
      { id: 'ORD-99418', date: '2026-10-24 13:05', seller: 'Titan Parts Hub', buyer: 'Sarah Chen', amount: 890.00, fee: 106.80, status: 'COMPLETED' },
      { id: 'ORD-99412', date: '2026-10-24 11:40', seller: 'Apex Logistics', buyer: 'Michael Ross', amount: 12400.00, fee: 1488.00, status: 'PENDING' }
    ];
  });

  const [financialStats, setFinancialStats] = useState(() => {
    const saved = localStorage.getItem('autonova_financial_stats');
    if (saved) return JSON.parse(saved);
    return {
      grossRevenue: 12842000,
      netRevenue: 11215400,
      platformFees: 1626600,
      refundsIssued: 240000,
      pendingVolume: 412500,
      stripeUptime: 99.98,
      stripeLatency: 184
    };
  });

  const [financialTimeframe, setFinancialTimeframe] = useState('30D');
  const [financialLedgerSearchQuery, setFinancialLedgerSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('autonova_payouts', JSON.stringify(payouts));
  }, [payouts]);

  useEffect(() => {
    localStorage.setItem('autonova_financial_transactions', JSON.stringify(financialTransactions));
  }, [financialTransactions]);

  useEffect(() => {
    localStorage.setItem('autonova_financial_stats', JSON.stringify(financialStats));
  }, [financialStats]);

  // PLATFORM SETTINGS STATE
  const [settingsBrandName, setSettingsBrandName] = useState(() => localStorage.getItem('autonova_settings_brand_name') || 'AutoNova');
  const [settingsSupportEmail, setSettingsSupportEmail] = useState(() => localStorage.getItem('autonova_settings_support_email') || 'admin@autonova.intel');
  const [settingsMaintenanceMode, setSettingsMaintenanceMode] = useState(() => localStorage.getItem('autonova_settings_maintenance_mode') === 'true');
  const [settingsTimezone, setSettingsTimezone] = useState(() => localStorage.getItem('autonova_settings_timezone') || '(GMT-08:00) Pacific Time');
  const [settingsCurrency, setSettingsCurrency] = useState(() => localStorage.getItem('autonova_settings_currency') || 'USD ($)');
  const [activeSettingsSubTab, setActiveSettingsSubTab] = useState('general');
  const [expandedRoleId, setExpandedRoleId] = useState(null);
  const [expandedAuditId, setExpandedAuditId] = useState(null);
  const [settingsAuditSearchQuery, setSettingsAuditSearchQuery] = useState('');

  const [rolesPermissions, setRolesPermissions] = useState(() => {
    const saved = localStorage.getItem('autonova_roles_permissions');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'role-1',
        name: 'Super Admin',
        usersCount: 2,
        status: 'System Fixed',
        permissions: {
          createUsers: true, editUsers: true, deleteUsers: true,
          approveListings: true, flagListings: true, shadowBanListings: true,
          payouts: true, taxConfig: true, refunds: true,
          modelTuning: true, limitTokenUsage: true
        }
      },
      {
        id: 'role-2',
        name: 'Content Lead',
        usersCount: 5,
        status: 'Active',
        permissions: {
          createUsers: false, editUsers: true, deleteUsers: false,
          approveListings: true, flagListings: true, shadowBanListings: true,
          payouts: false, taxConfig: false, refunds: false,
          modelTuning: false, limitTokenUsage: false
        }
      },
      {
        id: 'role-3',
        name: 'Escrow Officer',
        usersCount: 3,
        status: 'Active',
        permissions: {
          createUsers: false, editUsers: false, deleteUsers: false,
          approveListings: false, flagListings: false, shadowBanListings: false,
          payouts: true, taxConfig: true, refunds: true,
          modelTuning: false, limitTokenUsage: false
        }
      },
      {
        id: 'role-4',
        name: 'Auditor',
        usersCount: 1,
        status: 'Active',
        permissions: {
          createUsers: false, editUsers: false, deleteUsers: false,
          approveListings: false, flagListings: true, shadowBanListings: false,
          payouts: false, taxConfig: false, refunds: false,
          modelTuning: false, limitTokenUsage: false
        }
      }
    ];
  });

  const [apiKeysList, setApiKeysList] = useState(() => {
    const saved = localStorage.getItem('autonova_api_keys');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'key-1', name: 'Production Frontend', value: 'pk_live_f7s82nd823hd921h8da9x', created: 'Oct 12, 2025' },
      { id: 'key-2', name: 'CI/CD Automation', value: 'sk_test_92hj38sdh28hd3h20k7r2', created: 'Jan 05, 2026' }
    ];
  });

  const [settingsAuditLogs, setSettingsAuditLogs] = useState(() => {
    const saved = localStorage.getItem('autonova_settings_audit_logs');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'audit-1',
        time: '14:22',
        dateLabel: 'Today',
        user: 'Sarah Jenkins',
        action: 'changed',
        target: 'Commission Rate',
        origin: 'Admin Console',
        ip: '192.168.1.45',
        type: 'change',
        diff: {
          before: { commission_percent: 12.5, updated_by: 'sys_default' },
          after: { commission_percent: 15.0, updated_by: 's_jenkins_adm' }
        }
      },
      {
        id: 'audit-2',
        time: '09:10',
        dateLabel: 'Today',
        user: 'Marcus Thorne',
        action: 'revoked',
        target: 'API Key: "Legacy Integration"',
        origin: 'Admin Console',
        ip: '104.22.18.9',
        type: 'revoke',
        diff: {
          before: { key_name: "Legacy Integration", status: "active", expires: "2027-12-31" },
          after: { key_name: "Legacy Integration", status: "revoked", revoked_at: "2026-07-17 09:10" }
        }
      }
    ];
  });

  const [newKeyFormName, setNewKeyFormName] = useState('');
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('autonova_settings_brand_name', settingsBrandName);
  }, [settingsBrandName]);

  useEffect(() => {
    localStorage.setItem('autonova_settings_support_email', settingsSupportEmail);
  }, [settingsSupportEmail]);

  useEffect(() => {
    localStorage.setItem('autonova_settings_maintenance_mode', settingsMaintenanceMode.toString());
  }, [settingsMaintenanceMode]);

  useEffect(() => {
    localStorage.setItem('autonova_settings_timezone', settingsTimezone);
  }, [settingsTimezone]);

  useEffect(() => {
    localStorage.setItem('autonova_settings_currency', settingsCurrency);
  }, [settingsCurrency]);

  useEffect(() => {
    localStorage.setItem('autonova_roles_permissions', JSON.stringify(rolesPermissions));
  }, [rolesPermissions]);

  useEffect(() => {
    localStorage.setItem('autonova_api_keys', JSON.stringify(apiKeysList));
  }, [apiKeysList]);

  useEffect(() => {
    localStorage.setItem('autonova_settings_audit_logs', JSON.stringify(settingsAuditLogs));
  }, [settingsAuditLogs]);

  // Derived filtered users list used by the User Management tab
  const filteredUsers = users.filter(user => {
    const matchesRole = filterRole === 'All Roles' || user.role === filterRole;
    const matchesStatus = filterStatus === 'All' || user.status === filterStatus;
    const matchesSearch = !searchQuery ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesStatus && matchesSearch;
  });

  // Admin login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (twoFactor.length !== 6) {
      AutoNovaAudio.playError();
      showNotification("Please enter a valid 6-digit administrative 2FA passcode.", "error");
      return;
    }

    AutoNovaAudio.playClick();
    setIsVerifying(true);
    showNotification("Authenticating credentials against distributed node ledger...", "info");

    setTimeout(() => {
      setIsVerifying(false);
      setIsAuthenticated(true);
      AutoNovaAudio.playSuccess();
      showNotification("Administrative Node established successfully. Welcome Back.", "success");
    }, 1500);
  };

  // Run Kinetic diagnostic scan on pending car
  const runDiagnosticScan = (index, car) => {
    AutoNovaAudio.playClick();
    setDiagnosticCarIdx(index);
    setDiagnosticStep(1);
    setDiagnosticLogs([`[INFO] Handshaking with vehicle VIN: ${car.vin}...`]);

    setTimeout(() => {
      setDiagnosticStep(2);
      setDiagnosticLogs(prev => [...prev, 
        `[OK] Secure Telemetry link established.`,
        `[INFO] Analyzing electronic control module (ECU) faults...`,
        `[OK] 0 DTC error codes found. Modules healthy.`
      ]);
      AutoNovaAudio.playHover();
    }, 1000);

    setTimeout(() => {
      setDiagnosticStep(3);
      setDiagnosticLogs(prev => [...prev, 
        `[INFO] Querying high-voltage pack SOH matrix...`,
        `[OK] State of Health verified at ${car.batteryHealth || '100%'} SOH.`,
        `[INFO] Verification checks passed. Cryptographic Certificate generated.`
      ]);
      AutoNovaAudio.playSuccess();
    }, 2200);
  };

  const handleApproveCar = (id, model) => {
    AutoNovaAudio.playSuccess();
    setPendingApprovals(prev => prev.map(car => car.id === id ? { ...car, status: 'approved' } : car));
    setTradeLedger(prev => [
      { id: `tx-${Math.floor(Math.random() * 9000) + 1000}`, time: new Date().toTimeString().split(' ')[0], text: `Admin approved marketplace listing for: ${model}`, type: 'security' },
      ...prev
    ]);
    showNotification(`Marketplace listing for ${model} approved & synced with production.`, "success");
    setDiagnosticCarIdx(null);
  };

  const handleRejectCar = (id, model) => {
    AutoNovaAudio.playError();
    setPendingApprovals(prev => prev.map(car => car.id === id ? { ...car, status: 'rejected' } : car));
    setTradeLedger(prev => [
      { id: `tx-${Math.floor(Math.random() * 9000) + 1000}`, time: new Date().toTimeString().split(' ')[0], text: `Admin rejected/revoked listing ID: ${id}`, type: 'system' },
      ...prev
    ]);
    showNotification(`Marketplace submission rejected for ${model}. Notification routed to seller.`, "error");
    setDiagnosticCarIdx(null);
  };

  const handleRebootNode = (nodeId) => {
    AutoNovaAudio.playClick();
    setRebootingNodeId(nodeId);
    showNotification(`Initiating cold reboot cycle for node ${nodeId}...`, "info");

    setServerNodes(prev => prev.map(node => node.id === nodeId ? { ...node, status: 'rebooting', ping: '999ms' } : node));

    setTimeout(() => {
      setServerNodes(prev => prev.map(node => node.id === nodeId ? { ...node, status: 'stable', ping: '11ms', load: '5%' } : node));
      setRebootingNodeId(null);
      AutoNovaAudio.playSuccess();
      showNotification(`Node ${nodeId} warm cycle complete. Operational services online.`, "success");
      setTradeLedger(prev => [
        { id: `tx-${Math.floor(Math.random() * 9000) + 1000}`, time: new Date().toTimeString().split(' ')[0], text: `Cold reboot executed on Node ${nodeId} securely`, type: 'security' },
        ...prev
      ]);
    }, 2500);
  };

  const handleDisconnect = () => {
    AutoNovaAudio.playClick();
    setIsAuthenticated(false);
    setTwoFactor('');
    showNotification("Administrative Node terminated gracefully. Session flushed.", "info");
  };

  return (
    <div className="w-full min-h-screen bg-white font-sans text-zinc-900 relative">
      
      {/* 1. SECURE ADMINISTRATIVE LOGIN SCREEN */}
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div 
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col justify-between relative bg-white overflow-hidden"
          >
            {/* Ambient Purple/Teal background glows */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-teal-300/10 rounded-full blur-[100px] pointer-events-none -z-10" />
            <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-300/10 rounded-full blur-[100px] pointer-events-none -z-10" />

            {/* Header Area */}
            <header className="px-6 md:px-12 py-6 flex justify-between items-center relative z-10">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigateToView('dashboard')}>
                <span className="h-2 w-2 rounded-full bg-teal-600 animate-ping" />
                <span className="font-display text-lg font-extrabold text-teal-950 tracking-tighter">AutoNova</span>
              </div>
              <button 
                onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('dashboard'); }}
                className="text-[10px] font-mono tracking-widest text-zinc-400 hover:text-teal-950 uppercase font-bold"
              >
                Exit Portal
              </button>
            </header>

            {/* Main Login form */}
            <div className="flex-grow flex items-center justify-center px-6 py-12 relative z-10">
              <div className="w-full max-w-[440px] space-y-6">
                
                {/* Safe Header */}
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center p-3 bg-teal-50 border border-teal-200/50 rounded-full mb-2">
                    <ShieldCheck className="h-6 w-6 text-teal-600 animate-pulse" />
                  </div>
                  <h1 className="font-display text-xl md:text-2xl font-extrabold text-teal-950 tracking-tight">Admin Login</h1>
                  <p className="text-xs text-zinc-500 font-medium">Authentication required for core system access</p>
                </div>

                {/* Login Card */}
                <div className="bg-white border border-zinc-200/50 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    
                    {/* Work Email input */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-zinc-500" htmlFor="email">Work Email</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                          <Mail className="h-4 w-4" />
                        </span>
                        <input 
                          type="email" 
                          id="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@autonova.intel"
                          className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200/80 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-all"
                        />
                      </div>
                    </div>

                    {/* Password input */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-zinc-500" htmlFor="password">Security Password</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                          <Lock className="h-4 w-4" />
                        </span>
                        <input 
                          type="password" 
                          id="password" 
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200/80 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-all"
                        />
                      </div>
                    </div>

                    {/* 2FA Verification code (Mandatory) */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="block text-xs font-bold text-zinc-500" htmlFor="2fa">2FA Verification Code</label>
                        <span className="text-[7.5px] font-black tracking-wider uppercase bg-teal-100 text-teal-900 px-1.5 py-0.5 rounded">REQUIRED</span>
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                          <Key className="h-4 w-4" />
                        </span>
                        <input 
                          type="text" 
                          id="2fa" 
                          required
                          maxLength={6}
                          value={twoFactor}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, '');
                            setTwoFactor(val);
                          }}
                          placeholder="000000"
                          className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200/80 rounded-xl text-xs font-bold font-mono tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-all"
                        />
                      </div>
                      <p className="text-[10px] text-zinc-400 italic">Enter the 6-digit code from your authenticator device (e.g. 123456).</p>
                    </div>

                    {/* Submit Action Button */}
                    <button
                      type="submit"
                      disabled={isVerifying}
                      className="w-full py-3 bg-teal-950 hover:bg-teal-900 text-white font-mono text-[9px] font-bold tracking-widest uppercase rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isVerifying ? (
                        <>
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                          <span>VERIFYING CREDENTIALS...</span>
                        </>
                      ) : (
                        <>
                          <span>AUTHENTICATE ACCESS</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>

                  </form>

                  {/* Restricted Warning Footer */}
                  <div className="pt-4 border-t border-zinc-100">
                    <div className="flex items-start gap-3 bg-amber-50/50 border border-amber-200/40 p-3.5 rounded-2xl text-left">
                      <ShieldAlert className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <h5 className="text-[10.5px] font-bold text-amber-900 uppercase tracking-wide">RESTRICTED CORE SECURE NODE</h5>
                        <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">
                          This portal is for authorized AutoNova Intelligence administrators only. All access attempts, active sessions, and client IPs are recorded on our distributed compliance block ledger.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* IT Support Links */}
                <div className="flex justify-center items-center gap-4 text-[10px] font-mono text-zinc-400 font-bold uppercase">
                  <button onClick={() => showNotification("Contacting secure IT compliance channel...", "info")} className="hover:text-teal-950 transition-colors cursor-pointer">
                    IT Security Desk
                  </button>
                  <span>•</span>
                  <span>System Node: NG-LAG-01</span>
                </div>

              </div>
            </div>

            {/* Login Footer */}
            <footer className="py-6 border-t border-zinc-100 text-center relative z-10">
              <p className="font-mono text-[8px] text-zinc-400 tracking-wider uppercase">
                © 2026 AutoNova Intelligence. Restricted Admin Terminal.
              </p>
            </footer>
          </motion.div>
        ) : (
          
          /* 2. CORE ADMINISTRATIVE DASHBOARD VIEW */
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#fdf8f8] flex flex-col justify-between"
          >
            {/* Ambient Background blur */}
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-teal-300/10 rounded-full blur-[120px] pointer-events-none -z-10" />

            {/* Dashboard Header Bar */}
            <header className="fixed top-0 w-full z-40 h-16 bg-white/80 backdrop-blur-md border-b border-zinc-200/40 px-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-teal-950 text-white flex items-center justify-center shadow-sm">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-display text-sm font-extrabold text-teal-950 tracking-tight block leading-none">AutoNova System Command</span>
                  <span className="font-mono text-[8px] text-zinc-400 font-bold uppercase">Administrative Operations Portal</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Node Status Indicator */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200/40 rounded-full text-teal-950 font-mono text-[8.5px] uppercase font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-600 animate-pulse" />
                  <span>Node: Stable Command</span>
                </div>

                <button 
                  onClick={handleDisconnect}
                  className="inline-flex items-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-mono text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg transition-all cursor-pointer border border-zinc-200"
                >
                  <LogOut className="h-3 w-3" />
                  <span>Disconnect</span>
                </button>
              </div>
            </header>

            {/* Main Control Grid */}
            <div className="max-w-7xl mx-auto w-full px-6 pt-24 pb-12 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* SIDEBAR TABS (3 Columns) */}
              <aside className="lg:col-span-3 sticky top-20 space-y-4">
                <div className="bg-white border border-zinc-200/50 rounded-2xl p-4 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                    <span className="font-mono text-[9px] font-black text-zinc-400 uppercase tracking-widest">Navigation Center</span>
                    <span className="font-mono text-[7px] font-black bg-teal-950 text-white px-1.5 py-0.5 rounded uppercase">V4.2.0</span>
                  </div>

                  <nav className="flex flex-col gap-1">
                    <button
                      onClick={() => { AutoNovaAudio.playClick(); setActiveTab('overview'); }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        activeTab === 'overview' 
                          ? 'bg-teal-950 text-white font-black' 
                          : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Activity className="h-4 w-4" />
                        <span>System Overview</span>
                      </div>
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                    </button>

                    <button
                      onClick={() => { AutoNovaAudio.playClick(); setActiveTab('users'); }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        activeTab === 'users' 
                          ? 'bg-teal-950 text-white font-black' 
                          : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Users className="h-4 w-4" />
                        <span>User Management</span>
                      </div>
                      <span className="font-mono text-[8px] bg-teal-800 text-white font-bold px-1.5 py-0.5 rounded-full">
                        {users.length}
                      </span>
                    </button>

                    <button
                      onClick={() => { AutoNovaAudio.playClick(); setActiveTab('approvals'); }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        activeTab === 'approvals' 
                          ? 'bg-teal-950 text-white font-black' 
                          : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <FileCheck className="h-4 w-4" />
                        <span>Listing Approvals</span>
                      </div>
                      <span className="font-mono text-[8px] bg-amber-500 text-white font-bold px-1.5 py-0.5 rounded-full">
                        {pendingApprovals.filter(c => c.status === 'pending').length}
                      </span>
                    </button>

                    <button
                      onClick={() => { AutoNovaAudio.playClick(); setActiveTab('insights'); }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        activeTab === 'insights' 
                          ? 'bg-teal-950 text-white font-black' 
                          : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Brain className="h-4 w-4" />
                        <span>AI Insights</span>
                      </div>
                      <span className="font-mono text-[8px] bg-teal-800 text-white font-bold px-1.5 py-0.5 rounded-full">
                        Live
                      </span>
                    </button>

                    <button
                      onClick={() => { AutoNovaAudio.playClick(); setActiveTab('orders'); }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        activeTab === 'orders' 
                          ? 'bg-teal-950 text-white font-black' 
                          : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <ShoppingBag className="h-4 w-4" />
                        <span>Orders & Transactions</span>
                      </div>
                      <span className="font-mono text-[8px] bg-teal-800 text-white font-bold px-1.5 py-0.5 rounded-full">
                        {adminOrders.length}
                      </span>
                    </button>

                    <button
                      onClick={() => { AutoNovaAudio.playClick(); setActiveTab('financials'); }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        activeTab === 'financials' 
                          ? 'bg-teal-950 text-white font-black' 
                          : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <CreditCard className="h-4 w-4" />
                        <span>Financials &amp; Payouts</span>
                      </div>
                      <span className="font-mono text-[8px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded-full">
                        ${(financialStats.pendingVolume / 1000).toFixed(1)}k
                      </span>
                    </button>

                    <button
                      onClick={() => { AutoNovaAudio.playClick(); setActiveTab('nodes'); }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        activeTab === 'nodes' 
                          ? 'bg-teal-950 text-white font-black' 
                          : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Server className="h-4 w-4" />
                        <span>Distributed Nodes</span>
                      </div>
                      <span className="font-mono text-[8px] text-zinc-400 font-bold">LAG/US/EU</span>
                    </button>

                    <button
                      onClick={() => { AutoNovaAudio.playClick(); setActiveTab('ledgers'); }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        activeTab === 'ledgers' 
                          ? 'bg-teal-950 text-white font-black' 
                          : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Database className="h-4 w-4" />
                        <span>Escrow Ledgers</span>
                      </div>
                      <span className="font-mono text-[8px] text-teal-600 font-bold">Live Feed</span>
                    </button>

                    <button
                      onClick={() => { AutoNovaAudio.playClick(); setActiveTab('security'); }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        activeTab === 'security' 
                          ? 'bg-teal-950 text-white font-black' 
                          : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Lock className="h-4 w-4" />
                        <span>Security Audit</span>
                      </div>
                      <span className="font-mono text-[8px] text-emerald-600 font-bold">Secure</span>
                    </button>

                    <button
                      onClick={() => { AutoNovaAudio.playClick(); setActiveTab('settings'); }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        activeTab === 'settings' 
                          ? 'bg-teal-950 text-white font-black' 
                          : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Sliders className="h-4 w-4" />
                        <span>Platform Settings</span>
                      </div>
                      <span className="font-mono text-[8px] text-teal-600 font-bold">Active</span>
                    </button>

                    <button
                      onClick={() => { AutoNovaAudio.playClick(); setActiveTab('content'); }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        activeTab === 'content' 
                          ? 'bg-teal-950 text-white font-black' 
                          : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className="h-4 w-4" />
                        <span>Content Management</span>
                      </div>
                      <span className="font-mono text-[8px] bg-teal-800 text-white font-bold px-1.5 py-0.5 rounded-full">
                        {adminPosts.length + adminFaqs.length}
                      </span>
                    </button>

                    <button
                      onClick={() => { AutoNovaAudio.playClick(); setActiveTab('reviews'); }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        activeTab === 'reviews' 
                          ? 'bg-teal-950 text-white font-black' 
                          : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Scale className="h-4 w-4" />
                        <span>Reviews & Disputes</span>
                      </div>
                      <span className="font-mono text-[8px] bg-red-800 text-white font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                        {flaggedReviews.length + disputes.filter(d => d.status !== 'Resolved' && d.status !== 'Closed').length}
                      </span>
                    </button>

                    <a
                      href="/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => AutoNovaAudio.playClick()}
                      className="w-full text-left px-4 py-2.5 text-xs font-bold font-mono text-teal-700 bg-teal-50 border border-teal-200/60 rounded-xl hover:bg-teal-100 transition-all cursor-pointer flex items-center justify-between mt-3"
                    >
                      <div className="flex items-center gap-2.5">
                        <ArrowUpRight className="h-4 w-4 text-teal-700" />
                        <span>View Live Site</span>
                      </div>
                      <span className="text-[9px] font-mono font-extrabold text-teal-800 uppercase bg-teal-200/60 px-1.5 py-0.5 rounded">
                        NEW TAB
                      </span>
                    </a>
                  </nav>
                </div>

                {/* Simple Information Banner */}
                <div className="bg-teal-950 text-white rounded-2xl p-4 space-y-3 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl" />
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-teal-400" />
                    <h5 className="font-display text-xs font-bold">Kinetic Verification Engine</h5>
                  </div>
                  <p className="text-[10px] text-zinc-300 leading-relaxed font-medium">
                    All vehicle listings undergo fully automated ECU, state of health (SOH) battery telemetry matching, and DMV verification before joining public showroom search matrices.
                  </p>
                </div>
              </aside>

              {/* CORE DASHBOARD WORKSPACE (9 Columns) */}
              <main className="lg:col-span-9 bg-white border border-zinc-200/50 rounded-3xl p-6 md:p-8 shadow-sm space-y-8 min-h-[500px]">
                
                {/* TAB 1: SYSTEM OVERVIEW */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="border-b border-zinc-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h2 className="font-display text-base font-extrabold text-teal-950">Administrative Command Overview</h2>
                        <p className="text-xs text-zinc-500 font-medium">Live system metrics, platform trade volume, and active microservices.</p>
                      </div>
                      <span className="font-mono text-[9px] bg-teal-50 text-teal-950 px-2.5 py-1 rounded-lg border border-teal-200/40 font-bold">Refreshes every 5s</span>
                    </div>

                    {/* Numeric Dials Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 bg-zinc-50 border border-zinc-200/50 rounded-2xl space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-zinc-500">Escrow Trade Value</span>
                          <TrendingUp className="h-4 w-4 text-teal-600" />
                        </div>
                        <h3 className="font-display text-lg font-black text-teal-950">₦4,289,500,000</h3>
                        <p className="text-[10px] text-zinc-400 font-medium">32 active pending contracts</p>
                      </div>

                      <div className="p-4 bg-zinc-50 border border-zinc-200/50 rounded-2xl space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-zinc-500">Node Server Network</span>
                          <Server className="h-4 w-4 text-emerald-600" />
                        </div>
                        <h3 className="font-display text-lg font-black text-teal-950">99.98% Uptime</h3>
                        <p className="text-[10px] text-zinc-400 font-medium">Lagos, London, Virginia Online</p>
                      </div>

                      <div className="p-4 bg-zinc-50 border border-zinc-200/50 rounded-2xl space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-zinc-500">Active Listing Nodes</span>
                          <Database className="h-4 w-4 text-purple-600" />
                        </div>
                        <h3 className="font-display text-lg font-black text-teal-950">188 Verified Cars</h3>
                        <p className="text-[10px] text-zinc-400 font-medium">12 pending verification scan</p>
                      </div>
                    </div>

                    {/* Graphical Hardware Health Simulation */}
                    <div className="space-y-3">
                      <h4 className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Dynamic Hardware Loads</h4>
                      <div className="p-5 border border-zinc-100 rounded-2xl space-y-4 bg-zinc-50/20">
                        {/* Core Processor Load */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-zinc-600 flex items-center gap-1.5"><Cpu className="h-3.5 w-3.5 text-teal-600" /> CPU Core Matrix</span>
                            <span className="font-mono text-[10px] font-bold text-teal-950">42% Operational</span>
                          </div>
                          <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                            <div className="h-full bg-teal-600 rounded-full transition-all duration-1000" style={{ width: '42%' }} />
                          </div>
                        </div>

                        {/* Network Throughput */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-zinc-600 flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-amber-600" /> Distributed Downlink Bandwidth</span>
                            <span className="font-mono text-[10px] font-bold text-teal-950">1,240 Syncs/sec</span>
                          </div>
                          <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 rounded-full transition-all duration-1000" style={{ width: '68%' }} />
                          </div>
                        </div>

                        {/* Database Storage Capacity */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-zinc-600 flex items-center gap-1.5"><Database className="h-3.5 w-3.5 text-purple-600" /> Cryptographic Telemetry Cluster Storage</span>
                            <span className="font-mono text-[10px] font-bold text-teal-950">18.4 TB / 100 TB</span>
                          </div>
                          <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-600 rounded-full transition-all duration-1000" style={{ width: '18%' }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick System Alerts list */}
                    <div className="space-y-3">
                      <h4 className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Urgent Action Ledgers</h4>
                      <div className="bg-amber-50/40 border border-amber-200/30 rounded-2xl p-4 flex gap-3.5 items-start">
                        <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5 animate-bounce" />
                        <div className="space-y-1">
                          <h5 className="text-[11px] font-bold text-amber-900 uppercase">3 Marketplace Submissions Pending Diagnostic scan</h5>
                          <p className="text-[10.5px] text-zinc-500 font-semibold leading-relaxed">
                            Listing requests from sellers Balogun, Okafor, and Aminu are on hold in escrow registry. Run diagnostic telemetry checks before allowing public showrooms to receive listing.
                          </p>
                          <button 
                            onClick={() => { AutoNovaAudio.playClick(); setActiveTab('approvals'); }} 
                            className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-teal-900 hover:text-teal-950 uppercase border-b border-teal-900"
                          >
                            <span>Open approvals desk</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Live Activity Feed + Regional Distribution — previously missing entirely */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-zinc-200/60 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-display font-black text-xs text-teal-950 uppercase tracking-wider">Live Activity Feed</h3>
                          <span className="flex items-center gap-1.5 font-mono text-[8px] font-bold text-emerald-600 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Live
                          </span>
                        </div>
                        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                          {[
                            { icon: <UserCheck className="h-3.5 w-3.5" />, text: 'New user registered — j.martinez@gmail.com', time: '2m ago' },
                            { icon: <ShoppingBag className="h-3.5 w-3.5" />, text: 'New listing submitted — 2023 Rivian R1S', time: '6m ago' },
                            { icon: <CreditCard className="h-3.5 w-3.5" />, text: 'Order completed — Porsche Taycan Turbo S ($196,200)', time: '14m ago' },
                            { icon: <AlertCircle className="h-3.5 w-3.5" />, text: 'Review flagged for moderation', time: '21m ago' },
                            { icon: <UserCheck className="h-3.5 w-3.5" />, text: 'New user registered — a.chen@outlook.com', time: '35m ago' },
                            { icon: <ShoppingBag className="h-3.5 w-3.5" />, text: 'Listing approved — 2024 Lucid Air Sapphire', time: '48m ago' },
                          ].map((event, i) => (
                            <div key={i} className="flex items-start gap-3 pb-3 border-b border-zinc-50 last:border-0 last:pb-0">
                              <div className="p-1.5 bg-teal-50 rounded-lg text-teal-700 shrink-0">{event.icon}</div>
                              <div className="flex-grow min-w-0">
                                <p className="text-xs font-semibold text-zinc-700 truncate">{event.text}</p>
                                <p className="text-[9px] text-zinc-400 font-mono uppercase tracking-wide mt-0.5">{event.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-zinc-200/60 shadow-sm">
                        <h3 className="font-display font-black text-xs text-teal-950 uppercase tracking-wider mb-4">Orders By Region</h3>
                        <div className="space-y-3">
                          {[
                            { region: 'West Coast', pct: 42 },
                            { region: 'Northeast', pct: 27 },
                            { region: 'South', pct: 18 },
                            { region: 'Midwest', pct: 13 },
                          ].map((r) => (
                            <div key={r.region} className="space-y-1">
                              <div className="flex justify-between text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wide">
                                <span>{r.region}</span>
                                <span className="text-teal-800">{r.pct}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${r.pct}%` }}
                                  transition={{ duration: 0.6 }}
                                  className="h-full bg-gradient-to-r from-purple-400 to-teal-400 rounded-full"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* TAB: USER MANAGEMENT */}
                {activeTab === 'users' && (
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="border-b border-zinc-100 pb-3 flex flex-col md:flex-row md:items-end justify-between gap-4">
                      <div>
                        <h2 className="font-display text-base font-extrabold text-teal-950">User Management</h2>
                        <p className="text-xs text-zinc-500 font-medium">Manage members, verified traders, and platform operator credentials.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            showNotification("Generating secure CSV audit matrix of registered user nodes...", "info");
                            setTimeout(() => {
                              AutoNovaAudio.playSuccess();
                              showNotification("Secure CSV user database report exported.", "success");
                            }, 1500);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-2 border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 rounded-xl font-mono text-[8.5px] font-bold uppercase cursor-pointer"
                        >
                          <Download className="h-3.5 w-3.5 text-teal-800" />
                          <span>Export CSV</span>
                        </button>
                        <button 
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            setNewUserForm({ name: '', email: '', role: 'Buyer', tagline: 'Verified Buyer' });
                            setShowAddUserModal(true);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-teal-950 hover:bg-teal-900 text-white rounded-xl font-mono text-[8.5px] font-bold uppercase cursor-pointer"
                        >
                          <Users className="h-3.5 w-3.5 text-teal-400" />
                          <span>Add User</span>
                        </button>
                      </div>
                    </div>

                    {/* Filter and Search Bar */}
                    <div className="flex flex-wrap items-center gap-3 bg-zinc-50 border border-zinc-200/50 p-3 rounded-2xl shadow-sm">
                      <div className="relative flex-grow max-w-xs">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                          <Activity className="h-3.5 w-3.5 text-teal-700" />
                        </span>
                        <input 
                          type="text" 
                          placeholder="Global search..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-all"
                        />
                      </div>

                      {/* Role Dropdown */}
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-zinc-200 rounded-xl">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase">Role:</span>
                        <select 
                          value={filterRole}
                          onChange={(e) => { AutoNovaAudio.playClick(); setFilterRole(e.target.value); }}
                          className="bg-transparent border-none p-0 text-xs font-bold text-zinc-700 focus:ring-0 cursor-pointer outline-none"
                        >
                          <option value="All Roles">All Roles</option>
                          <option value="Admin">Admin</option>
                          <option value="Seller">Seller</option>
                          <option value="Buyer">Buyer</option>
                        </select>
                      </div>

                      {/* Status Dropdown */}
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-zinc-200 rounded-xl">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase">Status:</span>
                        <select 
                          value={filterStatus}
                          onChange={(e) => { AutoNovaAudio.playClick(); setFilterStatus(e.target.value); }}
                          className="bg-transparent border-none p-0 text-xs font-bold text-zinc-700 focus:ring-0 cursor-pointer outline-none"
                        >
                          <option value="All">All Statuses</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Blocked">Blocked</option>
                        </select>
                      </div>

                      <div className="ml-auto text-right text-[10px] font-mono text-zinc-400 font-bold uppercase">
                        Showing {filteredUsers.length} of {users.length} users
                      </div>
                    </div>

                    {/* Main workspace layout: Split pane with detail drawer */}
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                      
                      {/* Left Side: Users list table */}
                      <div className={`${showDetailDrawer && selectedUser ? 'xl:col-span-8' : 'xl:col-span-12'} bg-white border border-zinc-200/50 rounded-2xl overflow-hidden shadow-sm transition-all duration-300`}>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                                <th className="p-4 w-8">
                                  <input
                                    type="checkbox"
                                    checked={filteredUsers.length > 0 && selectedUserIds.length === filteredUsers.length}
                                    onChange={() => {
                                      AutoNovaAudio.playClick();
                                      setSelectedUserIds(selectedUserIds.length === filteredUsers.length ? [] : filteredUsers.map(u => u.id));
                                    }}
                                    className="cursor-pointer"
                                  />
                                </th>
                                <th className="p-4">User</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Joined</th>
                                <th className="p-4 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 font-medium text-zinc-600">
                              {filteredUsers.length === 0 ? (
                                <tr>
                                  <td colSpan={7} className="p-8 text-center text-zinc-400 font-medium">
                                    No active user matches the filter parameters.
                                  </td>
                                </tr>
                              ) : (
                                filteredUsers.map((user) => (
                                  <tr 
                                    key={user.id} 
                                    onClick={() => {
                                      AutoNovaAudio.playClick();
                                      setSelectedUser(user);
                                      setShowDetailDrawer(true);
                                    }}
                                    className={`group hover:bg-zinc-50/60 cursor-pointer transition-colors ${selectedUser?.id === user.id ? 'bg-teal-50/25 border-l-2 border-teal-800' : ''}`}
                                  >
                                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                                      <input
                                        type="checkbox"
                                        checked={selectedUserIds.includes(user.id)}
                                        onChange={() => {
                                          AutoNovaAudio.playClick();
                                          setSelectedUserIds(prev => prev.includes(user.id) ? prev.filter(id => id !== user.id) : [...prev, user.id]);
                                        }}
                                        className="cursor-pointer"
                                      />
                                    </td>
                                    <td className="p-4">
                                      <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-teal-950 text-white font-mono text-xs font-black flex items-center justify-center">
                                          {user.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                          <p className="font-bold text-teal-950 text-xs">{user.name}</p>
                                          <p className="text-[10px] text-zinc-400 font-semibold">{user.tagline}</p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-4 font-mono text-[10.5px] text-zinc-500">{user.email}</td>
                                    <td className="p-4">
                                      <span className={`text-[8.5px] font-bold uppercase px-2 py-0.5 rounded ${
                                        user.role === 'Admin' ? 'bg-zinc-950 text-white' : 
                                        user.role === 'Seller' ? 'bg-teal-100 text-teal-900' : 
                                        'bg-zinc-100 text-zinc-700'
                                      }`}>
                                        {user.role}
                                      </span>
                                    </td>
                                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                                      <label className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                          type="checkbox" 
                                          checked={user.status === 'Active'} 
                                          onChange={(e) => {
                                            AutoNovaAudio.playClick();
                                            const newStatus = e.target.checked ? 'Active' : 'Inactive';
                                            setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
                                            if (selectedUser?.id === user.id) {
                                              setSelectedUser(prev => ({ ...prev, status: newStatus }));
                                            }
                                            showNotification(`${user.name} status updated to ${newStatus}.`, "success");
                                          }}
                                          className="sr-only peer" 
                                        />
                                        <div className="w-8 h-4 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-teal-700"></div>
                                      </label>
                                    </td>
                                    <td className="p-4 text-zinc-400 text-[11px]">{user.joined}</td>
                                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                          onClick={() => {
                                            AutoNovaAudio.playClick();
                                            setSelectedUser(user);
                                            setShowDetailDrawer(true);
                                          }}
                                          className="p-1 hover:text-teal-950 text-zinc-400 cursor-pointer"
                                          title="View detailed stats"
                                        >
                                          <Activity className="h-3.5 w-3.5" />
                                        </button>
                                        <button 
                                          onClick={() => {
                                            AutoNovaAudio.playClick();
                                            setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: 'Blocked' } : u));
                                            if (selectedUser?.id === user.id) {
                                              setSelectedUser(prev => ({ ...prev, status: 'Blocked' }));
                                            }
                                            showNotification(`Administrative block applied to ${user.name}.`, "error");
                                          }}
                                          className="p-1 hover:text-red-700 text-zinc-400 cursor-pointer"
                                          title="Block User account"
                                        >
                                          <ShieldAlert className="h-3.5 w-3.5" />
                                        </button>
                                        <button 
                                          onClick={() => {
                                            AutoNovaAudio.playError();
                                            if (confirm(`Are you sure you want to permanently delete user ${user.name}? This action flushes their credentials across node servers.`)) {
                                              setUsers(prev => prev.filter(u => u.id !== user.id));
                                              if (selectedUser?.id === user.id) setSelectedUser(null);
                                              showNotification(`User node credential set for ${user.name} removed securely.`, "success");
                                              setTradeLedger(prev => [
                                                { id: `tx-${Math.floor(Math.random() * 9000) + 1000}`, time: new Date().toTimeString().split(' ')[0], text: `Admin deleted user credentials for: ${user.name}`, type: 'security' },
                                                ...prev
                                              ]);
                                            }
                                          }}
                                          className="p-1 hover:text-zinc-950 text-zinc-400 cursor-pointer"
                                          title="Delete user credentials"
                                        >
                                          <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Right Side: Detail Drawer slide out */}
                      {showDetailDrawer && selectedUser && (
                        <div className="xl:col-span-4 bg-zinc-50 border border-zinc-200/60 rounded-2xl flex flex-col shadow-sm relative overflow-hidden">
                          <div className="p-5 border-b border-zinc-200 relative">
                            <button 
                              onClick={() => { AutoNovaAudio.playClick(); setShowDetailDrawer(false); }}
                              className="absolute top-4 right-4 p-1 hover:bg-zinc-200/50 rounded-full text-zinc-400 hover:text-zinc-700 cursor-pointer"
                            >
                              <X className="h-4 w-4" />
                            </button>

                            <div className="flex flex-col items-center text-center mt-2">
                              <div className="w-16 h-16 rounded-2xl bg-teal-950 text-white flex items-center justify-center text-xl font-black shadow-inner mb-3">
                                {selectedUser.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <h3 className="font-display text-xs md:text-sm font-extrabold text-teal-950 leading-none">{selectedUser.name}</h3>
                              <p className="text-[10.5px] text-zinc-400 font-bold mt-1">
                                {selectedUser.tagline} • ID: <span className="font-mono text-[9.5px] font-semibold">{selectedUser.id}</span>
                              </p>

                              <div className="flex gap-2 mt-3.5">
                                <button 
                                  onClick={() => {
                                    AutoNovaAudio.playClick();
                                    const newName = prompt(`Edit name for ${selectedUser.name}:`, selectedUser.name);
                                    if (newName) {
                                      setUsers(prev => prev.map(u => u.id === selectedUser.id ? { ...u, name: newName } : u));
                                      setSelectedUser(prev => ({ ...prev, name: newName }));
                                      showNotification("User profile updated successfully.", "success");
                                    }
                                  }}
                                  className="px-3 py-1.5 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 rounded-lg text-[9px] font-mono font-bold uppercase cursor-pointer"
                                >
                                  Edit Profile
                                </button>
                                <button 
                                  onClick={() => {
                                    AutoNovaAudio.playClick();
                                    const newStatus = selectedUser.status === 'Blocked' ? 'Active' : 'Blocked';
                                    setUsers(prev => prev.map(u => u.id === selectedUser.id ? { ...u, status: newStatus } : u));
                                    setSelectedUser(prev => ({ ...prev, status: newStatus }));
                                    showNotification(`User account state set to ${newStatus}.`, "success");
                                  }}
                                  className={`px-3 py-1.5 rounded-lg text-[9px] font-mono font-bold uppercase cursor-pointer ${
                                    selectedUser.status === 'Blocked' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100' : 'bg-red-50 border border-red-200 text-red-800 hover:bg-red-100'
                                  }`}
                                >
                                  {selectedUser.status === 'Blocked' ? 'Unblock' : 'Restrict'}
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Drawer Tabs */}
                          <div className="flex border-b border-zinc-200 text-[9px] font-mono font-bold uppercase tracking-wider bg-white">
                            {['overview', 'orders', 'listings', 'flags'].map((tab) => (
                              <button
                                key={tab}
                                onClick={() => { AutoNovaAudio.playClick(); setDrawerTab(tab); }}
                                className={`flex-1 py-3 text-center cursor-pointer border-b-2 transition-colors ${
                                  drawerTab === tab 
                                    ? 'text-teal-950 border-teal-950 font-extrabold bg-zinc-50/50' 
                                    : 'text-zinc-400 hover:text-zinc-700 border-transparent hover:bg-zinc-50/20'
                                }`}
                              >
                                {tab}
                              </button>
                            ))}
                          </div>

                          {/* Tab Content */}
                          <div className="p-5 flex-grow space-y-5 bg-white min-h-[220px]">
                            {drawerTab === 'overview' && (
                              <div className="space-y-4 text-left">
                                <h4 className="text-[9px] font-mono font-bold uppercase text-zinc-400 tracking-wider">Account Vitality</h4>
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/50">
                                    <p className="text-[9px] font-bold text-zinc-400 uppercase">Trust Score</p>
                                    <p className="text-sm font-black text-teal-950 mt-0.5">{selectedUser.trustScore}</p>
                                  </div>
                                  <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/50">
                                    <p className="text-[9px] font-bold text-zinc-400 uppercase">Listings Count</p>
                                    <p className="text-sm font-black text-teal-950 mt-0.5">{selectedUser.listingsCount}</p>
                                  </div>
                                </div>

                                <div className="space-y-3.5">
                                  <h4 className="text-[9px] font-mono font-bold uppercase text-zinc-400 tracking-wider">Recent Action Logs</h4>
                                  <div className="space-y-3 font-sans text-xs">
                                    {selectedUser.recentActivity && selectedUser.recentActivity.map((act, actIdx) => (
                                      <div key={actIdx} className="flex gap-2.5 items-start">
                                        <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-teal-800 flex-shrink-0" />
                                        <div className="space-y-0.5">
                                          <p className="font-semibold text-zinc-700 text-[11px] leading-tight">{act.text}</p>
                                          <p className="text-[10px] text-zinc-400 font-medium">{act.time}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {selectedUser.kycVerified && (
                                  <div className="bg-teal-50 border border-teal-200/40 p-3.5 rounded-xl flex items-center justify-between">
                                    <div>
                                      <p className="font-bold text-teal-900 text-xs">Verified Member</p>
                                      <p className="text-[10px] text-teal-800/80 font-medium mt-0.5">Fully authenticated identity node (KYC Passed).</p>
                                    </div>
                                    <ShieldCheck className="h-5 w-5 text-teal-700 flex-shrink-0" />
                                  </div>
                                )}
                              </div>
                            )}

                            {drawerTab === 'orders' && (
                              <div className="space-y-3 text-left">
                                <h4 className="text-[9px] font-mono font-bold uppercase text-zinc-400 tracking-wider">Live Escrow Contracts</h4>
                                <div className="space-y-2 text-xs">
                                  {selectedUser.role === 'Buyer' ? (
                                    <>
                                      <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-200/40 flex justify-between items-center">
                                        <div>
                                          <p className="font-bold text-zinc-700">Order #NOVA-88201</p>
                                          <p className="text-[10px] text-zinc-400">Tesla Model S purchase</p>
                                        </div>
                                        <span className="text-[9px] font-mono font-bold bg-teal-50 text-teal-800 px-1.5 py-0.5 rounded uppercase">Escrow Hold</span>
                                      </div>
                                      <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-200/40 flex justify-between items-center">
                                        <div>
                                          <p className="font-bold text-zinc-700">Order #NOVA-71921</p>
                                          <p className="text-[10px] text-zinc-400">BMW i7 transaction</p>
                                        </div>
                                        <span className="text-[9px] font-mono font-bold bg-zinc-100 text-zinc-500 px-1.5 py-0.5 rounded uppercase">Settled</span>
                                      </div>
                                    </>
                                  ) : selectedUser.role === 'Seller' ? (
                                    <>
                                      <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-200/40 flex justify-between items-center">
                                        <div>
                                          <p className="font-bold text-zinc-700">Sale #NOVA-9901</p>
                                          <p className="text-[10px] text-zinc-400">Porsche Taycan release</p>
                                        </div>
                                        <span className="text-[9px] font-mono font-bold bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded uppercase">Awaiting Pickup</span>
                                      </div>
                                    </>
                                  ) : (
                                    <p className="text-zinc-400 text-xs italic">No active trade contracts under this system administrator node.</p>
                                  )}
                                </div>
                              </div>
                            )}

                            {drawerTab === 'listings' && (
                              <div className="space-y-3 text-left">
                                <h4 className="text-[9px] font-mono font-bold uppercase text-zinc-400 tracking-wider">Inventory Submissions</h4>
                                <div className="space-y-2 text-xs">
                                  {selectedUser.listingsCount > 0 ? (
                                    <>
                                      <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-200/40 flex justify-between items-center">
                                        <div>
                                          <p className="font-bold text-zinc-700">Specter Aero Coupe</p>
                                          <p className="text-[10px] text-zinc-400 font-semibold">₦85,000,000</p>
                                        </div>
                                        <span className="text-[9px] font-mono font-bold bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded uppercase">Active</span>
                                      </div>
                                      <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-200/40 flex justify-between items-center">
                                        <div>
                                          <p className="font-bold text-zinc-700">Centurion Kinetic V8</p>
                                          <p className="text-[10px] text-zinc-400 font-semibold">₦210,000,000</p>
                                        </div>
                                        <span className="text-[9px] font-mono font-bold bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded uppercase">Pending</span>
                                      </div>
                                    </>
                                  ) : (
                                    <p className="text-zinc-400 text-xs italic">No active inventory listings associated with this node.</p>
                                  )}
                                </div>
                              </div>
                            )}

                            {drawerTab === 'flags' && (
                              <div className="space-y-4 text-left text-xs">
                                <h4 className="text-[9px] font-mono font-bold uppercase text-zinc-400 tracking-wider">Sovereign Compliance Flags</h4>
                                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/50 flex gap-2.5 items-start">
                                  <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                  <div className="space-y-0.5">
                                    <p className="font-bold text-zinc-700">Sovereign Compliance Index Clean</p>
                                    <p className="text-[10.5px] text-zinc-400">0 complaints or alerts logged on compliance nodes for this trader.</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Drawer footer message action */}
                          <div className="p-4 bg-zinc-50 border-t border-zinc-100">
                            <button 
                              onClick={() => { AutoNovaAudio.playClick(); setMessageText(''); setShowMessageModal(true); }}
                              className="w-full py-2 bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 font-mono text-[8px] font-bold tracking-widest uppercase rounded-lg cursor-pointer"
                            >
                              Send Secure Notice Message
                            </button>
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Bulk action bar — previously missing entirely */}
                    <AnimatePresence>
                      {selectedUserIds.length > 0 && (
                        <motion.div
                          initial={{ y: 60, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 60, opacity: 0 }}
                          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-zinc-950 text-white shadow-xl rounded-2xl px-5 py-3 flex items-center gap-4"
                        >
                          <span className="text-xs font-bold">{selectedUserIds.length} selected</span>
                          <button
                            onClick={() => {
                              AutoNovaAudio.playClick();
                              showNotification(`${selectedUserIds.length} user(s) suspended.`, "success");
                              setSelectedUserIds([]);
                            }}
                            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 font-mono text-[9px] font-extrabold uppercase tracking-widest rounded-lg cursor-pointer"
                          >
                            Suspend
                          </button>
                          <button
                            onClick={() => {
                              AutoNovaAudio.playClick();
                              showNotification(`${selectedUserIds.length} user(s) verified.`, "success");
                              setSelectedUserIds([]);
                            }}
                            className="px-3 py-1.5 bg-teal-700 hover:bg-teal-600 font-mono text-[9px] font-extrabold uppercase tracking-widest rounded-lg cursor-pointer"
                          >
                            Verify
                          </button>
                          <button
                            onClick={() => {
                              AutoNovaAudio.playClick();
                              showNotification(`Exported ${selectedUserIds.length} user record(s) to CSV.`, "success");
                            }}
                            className="px-3 py-1.5 border border-white/20 hover:border-white/40 font-mono text-[9px] font-extrabold uppercase tracking-widest rounded-lg cursor-pointer"
                          >
                            Export
                          </button>
                          <button
                            onClick={() => { AutoNovaAudio.playClick(); setSelectedUserIds([]); }}
                            className="text-white/50 hover:text-white cursor-pointer ml-1"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* TAB 2: LISTING APPROVALS */}
                {activeTab === 'approvals' && (
                  <div className="space-y-6">
                    <div className="border-b border-zinc-100 pb-3">
                      <h2 className="font-display text-base font-extrabold text-teal-950">Marketplace Listing Submissions</h2>
                      <p className="text-xs text-zinc-500 font-medium">Inspect, scan, and sign vehicle certificates before general showroom catalog release.</p>
                    </div>

                    {/* Sub-tabs: All / Pending / Flagged / Sold — previously only Pending existed */}
                    <div className="flex gap-2">
                      {[
                        { id: 'all', label: 'All Listings' },
                        { id: 'pending', label: 'Pending Approval' },
                        { id: 'flagged', label: 'Flagged' },
                        { id: 'sold', label: 'Sold' },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => { AutoNovaAudio.playClick(); setListingsSubTab(tab.id); }}
                          className={`px-3.5 py-1.5 rounded-lg font-mono text-[9px] font-extrabold uppercase tracking-widest transition-all cursor-pointer ${
                            listingsSubTab === tab.id ? 'bg-teal-950 text-white' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                          }`}
                        >
                          {tab.label} ({tab.id === 'all' ? pendingApprovals.length : pendingApprovals.filter(c => c.status === tab.id).length})
                        </button>
                      ))}
                    </div>

                    <div className="space-y-4">
                      {pendingApprovals.filter(c => listingsSubTab === 'all' || c.status === listingsSubTab).length === 0 && (
                        <p className="text-center text-xs text-zinc-400 font-medium py-10">No listings in this category.</p>
                      )}
                      {pendingApprovals.filter(c => listingsSubTab === 'all' || c.status === listingsSubTab).map((car, idx) => (
                        <div 
                          key={car.id} 
                          className="border border-zinc-200/50 bg-zinc-50/10 hover:bg-zinc-50/40 transition-all rounded-2xl p-5 space-y-4"
                        >
                          {car.status === 'flagged' && car.flagReason && (
                            <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                              <AlertTriangle className="h-3.5 w-3.5 text-red-600 shrink-0" />
                              <span className="text-[10px] font-bold text-red-800">{car.flagReason}</span>
                            </div>
                          )}
                          {car.status === 'sold' && (
                            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
                              <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                              <span className="text-[10px] font-bold text-emerald-800">Sold — no further action needed</span>
                            </div>
                          )}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <input
                                type="checkbox"
                                checked={selectedListingIds.includes(car.id)}
                                onChange={() => {
                                  AutoNovaAudio.playClick();
                                  setSelectedListingIds(prev => prev.includes(car.id) ? prev.filter(id => id !== car.id) : [...prev, car.id]);
                                }}
                                className="cursor-pointer mt-1"
                              />
                              <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-display text-xs md:text-sm font-extrabold text-teal-950">{car.model}</h3>
                                <span className="font-mono text-[8px] bg-teal-50 text-teal-900 px-1.5 py-0.5 rounded font-black uppercase">{car.type}</span>
                              </div>
                              <p className="text-[10.5px] text-zinc-400 font-bold">
                                Seller: <span className="text-zinc-600 font-semibold">{car.seller}</span> • VIN: <span className="font-mono text-[9.5px] font-semibold">{car.vin}</span>
                              </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-xs md:text-sm font-extrabold text-teal-950">{car.price}</span>
                              {car.status === 'pending' && (
                                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" title="Awaiting Verification Scan" />
                              )}
                              {car.status === 'approved' && (
                                <span className="text-[8px] font-mono tracking-widest bg-emerald-600 text-white px-2 py-0.5 rounded font-black uppercase">APPROVED</span>
                              )}
                              {car.status === 'rejected' && (
                                <span className="text-[8px] font-mono tracking-widest bg-red-600 text-white px-2 py-0.5 rounded font-black uppercase">REJECTED</span>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons for verification scan */}
                          {car.status === 'pending' && (
                            <div className="pt-2 border-t border-zinc-100 flex flex-wrap gap-2 items-center justify-between">
                              {diagnosticCarIdx === idx ? (
                                <div className="w-full space-y-3 bg-teal-950 text-white p-4 rounded-xl font-mono text-[10px]">
                                  <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                                    <span className="font-black text-teal-400">⚡ COMPLIANCE KINETIC DIAGNOSTIC FEED</span>
                                    <span>
                                      {diagnosticStep === 1 ? "Establishing connection..." : 
                                       diagnosticStep === 2 ? "Analysing electronic systems..." : 
                                       "Scan successfully complete."}
                                    </span>
                                  </div>
                                  
                                  <div className="space-y-1 text-zinc-300 font-semibold max-h-[100px] overflow-y-auto">
                                    {diagnosticLogs.map((log, lIdx) => (
                                      <p key={lIdx}>{log}</p>
                                    ))}
                                  </div>

                                  {diagnosticStep === 3 && (
                                    <div className="flex gap-2 pt-2 justify-end">
                                      <button
                                        onClick={() => window.open(`/cars/${car.id}`, '_blank')}
                                        className="bg-white border border-zinc-300 hover:border-teal-700 text-zinc-700 font-mono text-[8px] font-black px-3 py-1.5 rounded cursor-pointer"
                                      >
                                        PREVIEW LISTING
                                      </button>
                                      <button 
                                        onClick={() => handleRejectCar(car.id, car.model)}
                                        className="bg-red-700 hover:bg-red-800 text-white font-mono text-[8px] font-black px-3 py-1.5 rounded cursor-pointer"
                                      >
                                        REJECT LISTING
                                      </button>
                                      <button 
                                        onClick={() => handleApproveCar(car.id, car.model)}
                                        className="bg-teal-600 hover:bg-teal-500 text-teal-950 font-mono text-[8px] font-black px-3 py-1.5 rounded cursor-pointer"
                                      >
                                        SIGN &amp; APPROVE RELEASE
                                      </button>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <>
                                  <p className="text-[10px] text-zinc-400 italic">Inspect unverified telemetry metrics before releasing vehicle.</p>
                                  <button
                                    onClick={() => runDiagnosticScan(idx, car)}
                                    className="bg-teal-950 hover:bg-teal-900 text-white font-mono text-[8.5px] font-bold tracking-widest uppercase px-4 py-2 rounded-lg cursor-pointer flex items-center gap-1.5"
                                  >
                                    <Terminal className="h-3 w-3 text-teal-400" />
                                    <span>RUN DIAGNOSTIC SCAN</span>
                                  </button>
                                </>
                              )}
                            </div>
                          )}

                        </div>
                      ))}
                    </div>

                  </div>
                )}

                {/* TAB 3: DISTRIBUTED NODES */}
                {activeTab === 'nodes' && (
                  <div className="space-y-6">
                    <div className="border-b border-zinc-100 pb-3">
                      <h2 className="font-display text-base font-extrabold text-teal-950">Distributed Server Network</h2>
                      <p className="text-xs text-zinc-500 font-medium">Monitor connection capacity, ping, and trigger cycle restarts for individual hosting nodes.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {serverNodes.map((node) => (
                        <div 
                          key={node.id} 
                          className="border border-zinc-200/50 rounded-2xl p-4 bg-zinc-50/40 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <span className="font-mono text-[8.5px] bg-zinc-200 text-zinc-800 px-1.5 py-0.5 rounded font-bold uppercase">{node.id}</span>
                              <h4 className="font-display text-xs font-bold text-teal-950 truncate">{node.name}</h4>
                            </div>
                            <span className={`h-2 w-2 rounded-full ${node.status === 'rebooting' ? 'bg-amber-500 animate-spin' : 'bg-emerald-600 animate-pulse'}`} />
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[10.5px] font-mono border-t border-b border-zinc-100 py-2">
                            <div>
                              <p className="text-zinc-400">Ping Delay</p>
                              <p className="font-bold text-teal-950">{node.ping}</p>
                            </div>
                            <div>
                              <p className="text-zinc-400">CPU Load</p>
                              <p className="font-bold text-teal-950">{node.load}</p>
                            </div>
                            <div className="col-span-2 pt-1">
                              <p className="text-zinc-400">Sync Handshakes</p>
                              <p className="font-bold text-teal-950">{node.connections.toLocaleString()} active</p>
                            </div>
                          </div>

                          <button
                            onClick={() => handleRebootNode(node.id)}
                            disabled={rebootingNodeId === node.id}
                            className="w-full bg-teal-950 hover:bg-teal-900 text-white font-mono text-[8px] font-bold tracking-widest uppercase py-2 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                          >
                            <RefreshCw className={`h-3 w-3 ${rebootingNodeId === node.id ? 'animate-spin' : ''}`} />
                            <span>{rebootingNodeId === node.id ? 'REBOOTING...' : 'TRIGGER COLD REBOOT'}</span>
                          </button>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

                {/* TAB 4: TRADE LEDGERS */}
                {activeTab === 'ledgers' && (
                  <div className="space-y-6">
                    <div className="border-b border-zinc-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h2 className="font-display text-base font-extrabold text-teal-950">Active Ledger logs</h2>
                        <p className="text-xs text-zinc-500 font-medium">Real-time escrow audits, financial handshakes, and diagnostic logs on the platform.</p>
                      </div>
                      <button 
                        onClick={() => { AutoNovaAudio.playClick(); showNotification("Ledger database backed up successfully.", "success"); }}
                        className="bg-zinc-100 border border-zinc-200 text-zinc-700 font-mono text-[8px] font-bold px-3 py-1.5 rounded-lg hover:bg-zinc-200 cursor-pointer"
                      >
                        EXPORT LEDGER LOGS
                      </button>
                    </div>

                    <div className="bg-zinc-950 text-teal-400 p-5 rounded-2xl font-mono text-[10.5px] space-y-3 max-h-[350px] overflow-y-auto border border-zinc-900 shadow-inner">
                      <div className="flex justify-between items-center border-b border-white/5 pb-2 text-zinc-500 text-[9px] font-bold">
                        <span>LEDGER RECORD EVENT TIMESTAMP</span>
                        <span>NODE DOWNLINK</span>
                      </div>
                      
                      {tradeLedger.map((tx) => (
                        <div key={tx.id} className="flex justify-between items-start gap-4">
                          <div className="space-y-0.5">
                            <p className="font-bold text-zinc-300">
                              <span className="text-zinc-500">[{tx.time}]</span> {tx.text}
                            </p>
                            <p className="text-[9px] text-zinc-500">Transaction Registry ID: {tx.id}</p>
                          </div>
                          
                          <span className={`text-[8.5px] uppercase font-bold tracking-widest border px-1.5 py-0.5 rounded ${
                            tx.type === 'escrow' ? 'border-teal-800 text-teal-500' : 
                            tx.type === 'payment' ? 'border-amber-800 text-amber-500' : 
                            tx.type === 'security' ? 'border-emerald-800 text-emerald-500' : 
                            'border-zinc-800 text-zinc-500'
                          }`}>
                            {tx.type}
                          </span>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

                {/* TAB: FINANCIALS & PAYOUTS */}
                {activeTab === 'financials' && (
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="border-b border-zinc-100 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="text-left">
                        <h2 className="font-display text-base md:text-lg font-extrabold text-teal-950">Financials &amp; Payouts</h2>
                        <p className="text-xs text-zinc-500 font-medium">Real-time revenue monitoring and seller disbursement management.</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 bg-zinc-50 px-3 py-1.5 rounded-xl border border-zinc-200/60 text-xs font-semibold">
                          <Calendar className="h-3.5 w-3.5 text-teal-800" />
                          <span className="text-zinc-600">Oct 1 - Oct 31, 2026</span>
                        </div>
                        <button 
                          onClick={() => {
                            AutoNovaAudio.playSuccess();
                            showNotification("CSV Financial Report compiled and downloaded.", "success");
                          }}
                          className="flex items-center gap-1.5 bg-teal-950 hover:bg-teal-900 text-white px-4 py-2 rounded-xl font-mono text-[9px] font-bold uppercase transition-all shadow-sm active:scale-95 cursor-pointer"
                        >
                          <Download className="h-3 w-3" />
                          <span>Export CSV</span>
                        </button>
                      </div>
                    </div>

                    {/* KPI Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Gross Revenue */}
                      <div className="bg-zinc-50/30 border border-zinc-200/60 p-5 rounded-2xl flex flex-col justify-between hover:shadow-sm transition-all text-left">
                        <div className="flex justify-between items-start mb-3">
                          <div className="p-2 bg-teal-50 rounded-xl">
                            <TrendingUp className="h-4 w-4 text-teal-800" />
                          </div>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+12.4%</span>
                        </div>
                        <div>
                          <p className="text-zinc-400 font-mono text-[9px] font-bold uppercase tracking-wider">Gross Revenue</p>
                          <h3 className="font-display text-lg font-extrabold text-teal-950">${financialStats.grossRevenue.toLocaleString()}</h3>
                        </div>
                        <div className="mt-3 h-8 w-full flex items-end gap-1 opacity-60">
                          <div className="flex-1 bg-teal-800/10 h-1/3 rounded-t-sm"></div>
                          <div className="flex-1 bg-teal-800/20 h-1/2 rounded-t-sm"></div>
                          <div className="flex-1 bg-teal-800/30 h-2/3 rounded-t-sm"></div>
                          <div className="flex-1 bg-teal-800/40 h-3/4 rounded-t-sm"></div>
                          <div className="flex-1 bg-teal-800 h-full rounded-t-sm animate-pulse"></div>
                        </div>
                      </div>

                      {/* Net Revenue */}
                      <div className="bg-zinc-50/30 border border-zinc-200/60 p-5 rounded-2xl flex flex-col justify-between hover:shadow-sm transition-all text-left">
                        <div className="flex justify-between items-start mb-3">
                          <div className="p-2 bg-emerald-50 rounded-xl">
                            <DollarSign className="h-4 w-4 text-emerald-700" />
                          </div>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+8.2%</span>
                        </div>
                        <div>
                          <p className="text-zinc-400 font-mono text-[9px] font-bold uppercase tracking-wider">Net Revenue</p>
                          <h3 className="font-display text-lg font-extrabold text-teal-950">${financialStats.netRevenue.toLocaleString()}</h3>
                        </div>
                        <div className="mt-3 h-8 w-full flex items-end gap-1 opacity-60">
                          <div className="flex-1 bg-emerald-600/10 h-1/2 rounded-t-sm"></div>
                          <div className="flex-1 bg-emerald-600/20 h-1/3 rounded-t-sm"></div>
                          <div className="flex-1 bg-emerald-600/30 h-3/4 rounded-t-sm"></div>
                          <div className="flex-1 bg-emerald-600/40 h-2/3 rounded-t-sm"></div>
                          <div className="flex-1 bg-emerald-600 h-4/5 rounded-t-sm animate-pulse"></div>
                        </div>
                      </div>

                      {/* Platform Fees */}
                      <div className="bg-zinc-50/30 border border-zinc-200/60 p-5 rounded-2xl flex flex-col justify-between hover:shadow-sm transition-all text-left">
                        <div className="flex justify-between items-start mb-3">
                          <div className="p-2 bg-zinc-100 rounded-xl">
                            <Percent className="h-4 w-4 text-zinc-600" />
                          </div>
                          <span className="text-[10px] font-bold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full">Stable</span>
                        </div>
                        <div>
                          <p className="text-zinc-400 font-mono text-[9px] font-bold uppercase tracking-wider">Platform Fees (12%)</p>
                          <h3 className="font-display text-lg font-extrabold text-teal-950">${financialStats.platformFees.toLocaleString()}</h3>
                        </div>
                        <div className="mt-3 h-8 w-full flex items-end gap-1 opacity-60">
                          <div className="flex-1 bg-zinc-600/20 h-1/2 rounded-t-sm"></div>
                          <div className="flex-1 bg-zinc-600/20 h-1/2 rounded-t-sm"></div>
                          <div className="flex-1 bg-zinc-600/20 h-1/2 rounded-t-sm"></div>
                          <div className="flex-1 bg-zinc-600/20 h-1/2 rounded-t-sm"></div>
                          <div className="flex-1 bg-zinc-600 h-1/2 rounded-t-sm animate-pulse"></div>
                        </div>
                      </div>

                      {/* Refunds Issued */}
                      <div className="bg-zinc-50/30 border border-zinc-200/60 p-5 rounded-2xl flex flex-col justify-between hover:shadow-sm transition-all text-left">
                        <div className="flex justify-between items-start mb-3">
                          <div className="p-2 bg-rose-50 rounded-xl">
                            <ArrowRight className="h-4 w-4 text-rose-700 rotate-180" />
                          </div>
                          <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">-2.4%</span>
                        </div>
                        <div>
                          <p className="text-zinc-400 font-mono text-[9px] font-bold uppercase tracking-wider">Refunds Issued</p>
                          <h3 className="font-display text-lg font-extrabold text-teal-950">${financialStats.refundsIssued.toLocaleString()}</h3>
                        </div>
                        <div className="mt-3 h-8 w-full flex items-end gap-1 opacity-60">
                          <div className="flex-1 bg-rose-600/40 h-full rounded-t-sm"></div>
                          <div className="flex-1 bg-rose-600/30 h-3/4 rounded-t-sm"></div>
                          <div className="flex-1 bg-rose-600/20 h-1/2 rounded-t-sm"></div>
                          <div className="flex-1 bg-rose-600/10 h-1/3 rounded-t-sm"></div>
                          <div className="flex-1 bg-rose-500 h-1/4 rounded-t-sm"></div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Area Chart Section */}
                      <div className="lg:col-span-2 border border-zinc-200/60 rounded-2xl p-5 space-y-4 bg-white text-left animate-in fade-in duration-300">
                        <div className="flex items-center justify-between">
                          <h4 className="font-display text-xs font-extrabold text-teal-950 uppercase tracking-tight">Revenue Trends</h4>
                          <div className="flex gap-1 bg-zinc-100 p-1 rounded-xl">
                            {['30D', '90D', '1Y'].map((t) => (
                              <button
                                key={t}
                                onClick={() => { AutoNovaAudio.playClick(); setFinancialTimeframe(t); }}
                                className={`text-[9px] font-mono font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                                  financialTimeframe === t 
                                    ? 'bg-teal-950 text-white font-black shadow-xs' 
                                    : 'text-zinc-500 hover:text-zinc-800'
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Custom high fidelity SVG chart with gradient */}
                        <div className="h-56 w-full bg-gradient-to-t from-teal-50/20 to-transparent relative rounded-xl border border-zinc-100 p-2 flex flex-col justify-between">
                          {/* Y-Axis markers */}
                          <div className="absolute left-2 top-2 bottom-6 flex flex-col justify-between text-[8px] font-mono text-zinc-400 font-bold">
                            <span>$15M</span>
                            <span>$10M</span>
                            <span>$5M</span>
                            <span>$0</span>
                          </div>

                          <div className="flex-1 relative pl-8">
                            <svg className="w-full h-full text-teal-600" preserveAspectRatio="none" viewBox="0 0 100 40">
                              <defs>
                                <linearGradient id="revenueChartGradient" x1="0" x2="0" y1="0" y2="1">
                                  <stop offset="0%" stopColor="#0d9488" stopOpacity="0.3" />
                                  <stop offset="100%" stopColor="#0d9488" stopOpacity="0.0" />
                                </linearGradient>
                              </defs>
                              {/* Grid lines */}
                              <line x1="0" y1="10" x2="100" y2="10" stroke="#f4f4f5" strokeWidth="0.5" />
                              <line x1="0" y1="20" x2="100" y2="20" stroke="#f4f4f5" strokeWidth="0.5" />
                              <line x1="0" y1="30" x2="100" y2="30" stroke="#f4f4f5" strokeWidth="0.5" />

                              {/* Chart path */}
                              <path 
                                d={
                                  financialTimeframe === '30D'
                                    ? "M0,35 Q10,32 25,38 T50,30 T75,18 T100,10"
                                    : financialTimeframe === '90D'
                                    ? "M0,38 Q15,30 35,32 T65,22 T85,15 T100,6"
                                    : "M0,39 Q20,35 40,25 T70,18 T90,12 T100,4"
                                } 
                                fill="none" 
                                stroke="#004f58" 
                                strokeWidth="2.5" 
                                vectorEffect="non-scaling-stroke" 
                              />
                              <path 
                                d={
                                  financialTimeframe === '30D'
                                    ? "M0,35 Q10,32 25,38 T50,30 T75,18 T100,10 L100,40 L0,40 Z"
                                    : financialTimeframe === '90D'
                                    ? "M0,38 Q15,30 35,32 T65,22 T85,15 T100,6 L100,40 L0,40 Z"
                                    : "M0,39 Q20,35 40,25 T70,18 T90,12 T100,4 L100,40 L0,40 Z"
                                } 
                                fill="url(#revenueChartGradient)" 
                                vectorEffect="non-scaling-stroke" 
                              />

                              {/* Glowing data points */}
                              <circle cx="100" cy={financialTimeframe === '30D' ? 10 : financialTimeframe === '90D' ? 6 : 4} r="3" fill="#004f58" className="animate-ping" />
                              <circle cx="100" cy={financialTimeframe === '30D' ? 10 : financialTimeframe === '90D' ? 6 : 4} r="1.5" fill="#004f58" />
                            </svg>
                          </div>

                          {/* X-Axis labels */}
                          <div className="flex justify-between pl-8 text-[8px] font-mono text-zinc-400 font-bold uppercase tracking-wider pt-2 border-t border-zinc-50">
                            {financialTimeframe === '30D' ? (
                              <><span>Oct 01</span><span>Oct 08</span><span>Oct 15</span><span>Oct 22</span><span>Oct 31</span></>
                            ) : financialTimeframe === '90D' ? (
                              <><span>Aug 01</span><span>Aug 20</span><span>Sep 10</span><span>Sep 30</span><span>Oct 31</span></>
                            ) : (
                              <><span>Nov 2025</span><span>Feb 2026</span><span>May 2026</span><span>Aug 2026</span><span>Oct 2026</span></>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Health & Quick Stats Sidebar */}
                      <div className="space-y-4 text-left">
                        {/* Payment Gateway Health */}
                        <div className="border border-zinc-200/60 rounded-2xl p-4 space-y-4 bg-white relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-lg" />
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 flex items-center justify-center bg-teal-950 rounded-xl shadow-xs">
                              <span className="text-white font-black font-mono text-xs">S</span>
                            </div>
                            <div>
                              <h5 className="font-display text-xs font-extrabold text-teal-950">Stripe Gateway</h5>
                              <div className="flex items-center gap-1.5 pt-0.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] text-emerald-600 font-bold uppercase font-mono">Operational</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 pt-1">
                            <div className="bg-zinc-50 p-2.5 rounded-xl border border-zinc-100">
                              <p className="text-[8px] text-zinc-400 font-mono font-bold uppercase">Uptime</p>
                              <p className="font-mono text-xs font-black text-teal-950">{financialStats.stripeUptime}%</p>
                            </div>
                            <div className="bg-zinc-50 p-2.5 rounded-xl border border-zinc-100">
                              <p className="text-[8px] text-zinc-400 font-mono font-bold uppercase">Latency</p>
                              <p className="font-mono text-xs font-black text-teal-950">{financialStats.stripeLatency}ms</p>
                            </div>
                          </div>
                        </div>

                        {/* Payout Volume Progress Card */}
                        <div className="border border-zinc-200/60 rounded-2xl p-4 bg-white space-y-3">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-teal-800" />
                            <h5 className="font-display text-xs font-extrabold text-teal-950 uppercase tracking-tight">Pending Payout Volume</h5>
                          </div>
                          
                          <div className="flex items-end justify-between">
                            <span className="text-xl font-mono font-black text-teal-950">${(financialStats.pendingVolume).toLocaleString()}</span>
                            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Scheduled Today</span>
                          </div>

                          {/* Progress bar container */}
                          <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden border border-zinc-200/50 p-[1.5px]">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(financialStats.pendingVolume / 550000) * 100}%` }}
                              transition={{ duration: 1 }}
                              className="bg-teal-950 h-full rounded-full" 
                            />
                          </div>

                          <div className="flex justify-between items-center text-[10px] text-zinc-500 font-medium pt-1">
                            <span>Capacity Usage</span>
                            <span className="font-mono font-bold text-teal-950">{((financialStats.pendingVolume / 550000) * 100).toFixed(1)}% of limit</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pending Payouts Section */}
                    <div className="space-y-3 text-left">
                      <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                        <h4 className="font-display text-xs font-extrabold text-teal-950 uppercase tracking-wider">Pending Seller Disbursements</h4>
                        <span className="font-mono text-[9px] bg-teal-50 text-teal-900 px-2 py-0.5 rounded-full font-black">
                          {payouts.filter(p => p.status === 'Pending').length} Pending
                        </span>
                      </div>

                      <div className="border border-zinc-200/50 rounded-2xl overflow-hidden bg-white">
                        <div className="overflow-x-auto animate-in fade-in duration-300">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-zinc-50/50 border-b border-zinc-100 text-zinc-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                                <th className="p-4">Seller Name</th>
                                <th className="p-4">Amount Owed</th>
                                <th className="p-4">Bank Node Routing</th>
                                <th className="p-4">Disbursement Due Date</th>
                                <th className="p-4 text-right">Settlement Command</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 font-semibold text-zinc-600">
                              {payouts.map((pay) => (
                                <tr key={pay.id} className="hover:bg-zinc-50/30 transition-colors">
                                  <td className="p-4">
                                    <div className="flex items-center gap-3">
                                      <div className="w-7 h-7 rounded-lg overflow-hidden bg-zinc-100 border border-zinc-200/50">
                                        <img src={pay.avatar} alt={pay.seller} className="w-full h-full object-cover" />
                                      </div>
                                      <div>
                                        <p className="font-bold text-teal-950">{pay.seller}</p>
                                        <p className="text-[9.5px] text-zinc-400 uppercase tracking-widest font-mono">Registry: {pay.id}</p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-4 font-mono font-bold text-teal-950">
                                    ${pay.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                  </td>
                                  <td className="p-4 font-mono text-[11px] text-zinc-500">{pay.bank}</td>
                                  <td className="p-4 text-zinc-500">{pay.dueDate}</td>
                                  <td className="p-4 text-right">
                                    {pay.status === 'Pending' ? (
                                      <button 
                                        onClick={() => {
                                          AutoNovaAudio.playSuccess();
                                          
                                          // 1. Mark payout as Settled
                                          setPayouts(prev => prev.map(p => p.id === pay.id ? { ...p, status: 'Settled' } : p));
                                          
                                          // 2. Adjust stats
                                          setFinancialStats(prev => ({
                                            ...prev,
                                            pendingVolume: Math.max(0, prev.pendingVolume - pay.amount),
                                            netRevenue: prev.netRevenue + (pay.amount * 0.12)
                                          }));

                                          // 3. Append trace ledger event
                                          const nowStr = new Date().toTimeString().split(' ')[0];
                                          const txNaira = (pay.amount * 1600).toLocaleString();
                                          const txText = `₦${txNaira} ($${pay.amount.toLocaleString()}) Escrow settlement processed & disbursed to ${pay.seller} via Chase Node NG-WEST`;
                                          const txId = `tx-${Math.floor(Math.random() * 9000) + 1000}`;
                                          
                                          setTradeLedger(prev => [
                                            { id: txId, time: nowStr, text: txText, type: 'payment' },
                                            ...prev
                                          ]);

                                          showNotification(`Settlement of $${pay.amount.toLocaleString()} dispatched to ${pay.seller}.`, "success");
                                        }}
                                        className="px-3.5 py-1.5 bg-teal-950 hover:bg-teal-900 text-white rounded-xl text-[9px] font-mono font-bold uppercase transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
                                      >
                                        Process Payout
                                      </button>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 text-[9px] font-mono bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-xl font-bold uppercase tracking-wider border border-emerald-100">
                                        <CheckCircle className="h-3 w-3" />
                                        <span>SETTLED</span>
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Transaction Ledger Section */}
                    <div className="space-y-3 text-left">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-zinc-100 pb-2">
                        <h4 className="font-display text-xs font-extrabold text-teal-950 uppercase tracking-wider">Transaction Ledger Feed</h4>
                        <div className="flex items-center gap-2">
                          <input 
                            type="text"
                            value={financialLedgerSearchQuery}
                            onChange={(e) => setFinancialLedgerSearchQuery(e.target.value)}
                            placeholder="Filter by Order ID, Trader..."
                            className="px-3 py-1.5 bg-zinc-50 border border-zinc-200/60 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700 transition-all placeholder-zinc-400 w-48"
                          />
                        </div>
                      </div>

                      <div className="border border-zinc-200/50 rounded-2xl overflow-hidden bg-white">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-zinc-50/50 border-b border-zinc-100 text-zinc-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                                <th className="p-4">Order ID</th>
                                <th className="p-4">Handshake Timestamp</th>
                                <th className="p-4">Seller / Buyer</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Escrow Fee (12%)</th>
                                <th className="p-4 text-right">Compliance Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 font-semibold text-zinc-600">
                              {financialTransactions
                                .filter(tx => {
                                  if (!financialLedgerSearchQuery) return true;
                                  const q = financialLedgerSearchQuery.toLowerCase();
                                  return tx.id.toLowerCase().includes(q) || 
                                         tx.seller.toLowerCase().includes(q) || 
                                         tx.buyer.toLowerCase().includes(q);
                                })
                                .map((tx) => (
                                  <tr key={tx.id} className="hover:bg-zinc-50/30 transition-colors">
                                    <td className="p-4 font-mono font-bold text-teal-950">{tx.id}</td>
                                    <td className="p-4 font-mono text-[11px] text-zinc-500">{tx.date}</td>
                                    <td className="p-4">
                                      <div>
                                        <p className="font-bold text-teal-950">{tx.seller}</p>
                                        <p className="text-[10px] text-zinc-400 font-medium">Buyer: {tx.buyer}</p>
                                      </div>
                                    </td>
                                    <td className="p-4 font-mono font-bold text-teal-950">${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                    <td className="p-4 font-mono text-zinc-500">${tx.fee.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                    <td className="p-4 text-right">
                                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-mono font-black ${
                                        tx.status === 'COMPLETED' 
                                          ? 'bg-emerald-50 text-emerald-700' 
                                          : 'bg-amber-50 text-amber-700'
                                      }`}>
                                        {tx.status}
                                      </span>
                                    </td>
                                  </tr>
                                ))
                              }
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* TAB: PLATFORM SETTINGS */}
                {activeTab === 'settings' && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    {/* Header */}
                    <div className="border-b border-zinc-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="text-left">
                        <h2 className="font-display text-base font-extrabold text-teal-950">Platform Settings</h2>
                        <p className="text-xs text-zinc-500 font-medium">Configure global parameters, security protocols, and integration hooks.</p>
                      </div>
                      {settingsMaintenanceMode && (
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 border border-rose-200 text-rose-700 font-mono text-[9px] uppercase font-bold rounded-lg animate-pulse">
                          <AlertTriangle className="h-3 w-3" />
                          <span>Maintenance Mode Active</span>
                        </div>
                      )}
                    </div>

                    {/* Settings Tabbed Sub-interface */}
                    <div className="bg-white rounded-2xl border border-zinc-200/50 overflow-hidden shadow-sm">
                      <div className="flex border-b border-zinc-100 overflow-x-auto scrollbar-hide bg-zinc-50/50">
                        {[
                          { id: 'general', label: 'General', icon: Sliders },
                          { id: 'roles', label: 'Roles & Permissions', icon: Users },
                          { id: 'integrations', label: 'Integrations', icon: Server },
                          { id: 'api', label: 'API Keys', icon: Key },
                          { id: 'audit', label: 'Audit Log', icon: FileText }
                        ].map((subTab) => {
                          const IconComp = subTab.icon;
                          const isActive = activeSettingsSubTab === subTab.id;
                          return (
                            <button
                              key={subTab.id}
                              onClick={() => { AutoNovaAudio.playClick(); setActiveSettingsSubTab(subTab.id); }}
                              className={`flex items-center gap-2 px-6 py-3.5 text-xs font-bold transition-all whitespace-nowrap cursor-pointer border-b-2 ${
                                isActive 
                                  ? 'border-teal-950 text-teal-950 font-black bg-white' 
                                  : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50/50'
                              }`}
                            >
                              <IconComp className={`h-4 w-4 ${isActive ? 'text-teal-950' : 'text-zinc-400'}`} />
                              <span>{subTab.label}</span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="p-6 md:p-8">
                        {/* 1. GENERAL TAB CONTENT */}
                        {activeSettingsSubTab === 'general' && (
                          <div className="space-y-8 divide-y divide-zinc-100">
                            {/* Site Branding */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8 text-left">
                              <div>
                                <h3 className="font-display text-sm font-bold text-teal-950 mb-1">Site Branding</h3>
                                <p className="text-xs text-zinc-500 font-medium leading-relaxed">Visual identity and global naming conventions for this system.</p>
                              </div>
                              <div className="lg:col-span-2 space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                  <div className="space-y-1.5">
                                    <label className="block text-xs font-bold text-zinc-700">Brand Name</label>
                                    <input 
                                      type="text" 
                                      value={settingsBrandName}
                                      onChange={(e) => setSettingsBrandName(e.target.value)}
                                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-1 focus:ring-teal-700 focus:bg-white transition-all"
                                    />
                                  </div>
                                  <div className="space-y-1.5">
                                    <label className="block text-xs font-bold text-zinc-700">Support Email</label>
                                    <input 
                                      type="email" 
                                      value={settingsSupportEmail}
                                      onChange={(e) => setSettingsSupportEmail(e.target.value)}
                                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-1 focus:ring-teal-700 focus:bg-white transition-all"
                                    />
                                  </div>
                                </div>

                                <div className="space-y-1.5">
                                  <label className="block text-xs font-bold text-zinc-700">Platform Logo</label>
                                  <div 
                                    onClick={() => {
                                      AutoNovaAudio.playSuccess();
                                      showNotification("Demo Logo uploaded successfully.", "success");
                                    }}
                                    className="flex items-center gap-5 p-5 bg-zinc-50 hover:bg-zinc-100/50 border-2 border-dashed border-zinc-200 rounded-2xl cursor-pointer transition-colors"
                                  >
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-xs border border-zinc-100">
                                      <Zap className="h-6 w-6 text-teal-950" />
                                    </div>
                                    <div className="text-left">
                                      <p className="text-xs font-bold text-teal-950">Click to upload or drag &amp; drop</p>
                                      <p className="text-[10px] text-zinc-400 font-medium">SVG, PNG, JPG (max. 800x400px)</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* System Status */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8 text-left">
                              <div>
                                <h3 className="font-display text-sm font-bold text-teal-950 mb-1">System Status</h3>
                                <p className="text-xs text-zinc-500 font-medium leading-relaxed">Manage platform availability and public maintenance windows.</p>
                              </div>
                              <div className="lg:col-span-2">
                                <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100 flex items-start justify-between gap-4">
                                  <div className="flex gap-3">
                                    <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                                    <div>
                                      <h4 className="text-xs font-bold text-rose-950">Maintenance Mode</h4>
                                      <p className="text-[11px] text-rose-800 font-medium mt-1 leading-relaxed max-w-md">
                                        Enabling this will redirect all public customer traffic to a custom maintenance page. Active transactions are not paused, but searches and showroom accesses will be restricted.
                                      </p>
                                    </div>
                                  </div>
                                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                    <input 
                                      type="checkbox" 
                                      checked={settingsMaintenanceMode}
                                      onChange={() => {
                                        AutoNovaAudio.playClick();
                                        const nextMode = !settingsMaintenanceMode;
                                        setSettingsMaintenanceMode(nextMode);
                                        showNotification(`Maintenance mode ${nextMode ? 'activated' : 'deactivated'}.`, nextMode ? "warning" : "success");
                                        
                                        // log to audit log
                                        const nowStr = new Date().toTimeString().split(' ')[0];
                                        const newAudit = {
                                          id: `audit-${Date.now()}`,
                                          time: nowStr,
                                          dateLabel: 'Today',
                                          user: userName || 'Admin',
                                          action: nextMode ? 'activated' : 'deactivated',
                                          target: 'Maintenance Mode',
                                          origin: 'Settings Console',
                                          ip: '192.168.1.1',
                                          type: nextMode ? 'revoke' : 'change',
                                          diff: {
                                            before: { maintenance_mode: !nextMode },
                                            after: { maintenance_mode: nextMode }
                                          }
                                        };
                                        setSettingsAuditLogs(prev => [newAudit, ...prev]);
                                      }}
                                      className="sr-only peer" 
                                    />
                                    <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                                  </label>
                                </div>
                              </div>
                            </div>

                            {/* Localization */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 text-left">
                              <div>
                                <h3 className="font-display text-sm font-bold text-teal-950 mb-1">Localization</h3>
                                <p className="text-xs text-zinc-500 font-medium leading-relaxed">Define system timezone context and primary reporting currency.</p>
                              </div>
                              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                  <label className="block text-xs font-bold text-zinc-700">System Timezone</label>
                                  <select 
                                    value={settingsTimezone}
                                    onChange={(e) => {
                                      AutoNovaAudio.playClick();
                                      setSettingsTimezone(e.target.value);
                                      showNotification(`Timezone updated to ${e.target.value}`, "success");
                                    }}
                                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-1 focus:ring-teal-700 transition-all cursor-pointer"
                                  >
                                    <option>(GMT-08:00) Pacific Time</option>
                                    <option>(GMT-05:00) Eastern Time</option>
                                    <option>(GMT+00:00) UTC</option>
                                    <option>(GMT+01:00) Lagos / West Africa</option>
                                  </select>
                                </div>
                                <div className="space-y-1.5">
                                  <label className="block text-xs font-bold text-zinc-700">Reporting Currency</label>
                                  <select 
                                    value={settingsCurrency}
                                    onChange={(e) => {
                                      AutoNovaAudio.playClick();
                                      setSettingsCurrency(e.target.value);
                                      showNotification(`Primary currency updated to ${e.target.value}`, "success");
                                    }}
                                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-1 focus:ring-teal-700 transition-all cursor-pointer"
                                  >
                                    <option>USD ($)</option>
                                    <option>NGN (₦)</option>
                                    <option>EUR (€)</option>
                                    <option>GBP (£)</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            {/* Trigger Manual Save */}
                            <div className="pt-8 flex justify-end">
                              <button 
                                onClick={() => {
                                  AutoNovaAudio.playSuccess();
                                  showNotification("General platform configuration compiled and saved.", "success");
                                }}
                                className="px-5 py-2.5 bg-teal-950 hover:bg-teal-900 text-white rounded-xl text-xs font-mono font-bold uppercase transition-all shadow-xs active:scale-95 cursor-pointer"
                              >
                                Save General Config
                              </button>
                            </div>
                          </div>
                        )}

                        {/* 2. ROLES & PERMISSIONS TAB CONTENT */}
                        {activeSettingsSubTab === 'roles' && (
                          <div className="space-y-6">
                            <div className="text-left mb-4">
                              <h3 className="font-display text-sm font-bold text-teal-950">Roles &amp; Permission Toggles</h3>
                              <p className="text-xs text-zinc-500 font-medium">Fine-tune system roles and toggle individual capabilities across modules.</p>
                            </div>

                            <div className="border border-zinc-200/50 rounded-2xl overflow-hidden bg-white">
                              <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-xs">
                                  <thead>
                                    <tr className="bg-zinc-50/50 border-b border-zinc-100 text-zinc-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                                      <th className="p-4">Role Name</th>
                                      <th className="p-4">Active Staff</th>
                                      <th className="p-4">Scope Status</th>
                                      <th className="p-4 text-right">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-zinc-100 font-semibold text-zinc-600">
                                    {rolesPermissions.map((roleObj) => {
                                      const isExpanded = expandedRoleId === roleObj.id;
                                      return (
                                        <React.Fragment key={roleObj.id}>
                                          <tr className="hover:bg-zinc-50/20 transition-colors">
                                            <td className="p-4 font-bold text-teal-950 text-sm">
                                              {roleObj.name}
                                            </td>
                                            <td className="p-4 font-mono">
                                              {roleObj.usersCount} users
                                            </td>
                                            <td className="p-4">
                                              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                                                roleObj.status === 'System Fixed'
                                                  ? 'bg-teal-50 text-teal-700 border border-teal-100'
                                                  : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                              }`}>
                                                {roleObj.status}
                                              </span>
                                            </td>
                                            <td className="p-4 text-right">
                                              <button 
                                                onClick={() => {
                                                  AutoNovaAudio.playClick();
                                                  setExpandedRoleId(isExpanded ? null : roleObj.id);
                                                }}
                                                className="px-3 py-1.5 border border-zinc-200/80 hover:bg-zinc-50 text-zinc-600 hover:text-teal-950 font-mono text-[9px] font-bold uppercase rounded-xl transition-all cursor-pointer"
                                              >
                                                {isExpanded ? 'Collapse Matrix' : 'Expand Matrix'}
                                              </button>
                                            </td>
                                          </tr>

                                          {/* Expanded matrix of checkbox permissions */}
                                          {isExpanded && (
                                            <tr className="bg-zinc-50/30">
                                              <td colSpan="4" className="p-6 md:p-8 border-t border-zinc-100">
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left animate-in slide-in-from-top-1 duration-200">
                                                  {/* USERS MODULE */}
                                                  <div className="space-y-3.5 bg-white p-4 rounded-xl border border-zinc-200/40">
                                                    <h5 className="font-display text-[10px] font-black text-teal-950 uppercase tracking-wider pb-1.5 border-b border-zinc-100">Users Module</h5>
                                                    <div className="space-y-2.5">
                                                      {[
                                                        { key: 'createUsers', label: 'Create Users' },
                                                        { key: 'editUsers', label: 'Edit Users' },
                                                        { key: 'deleteUsers', label: 'Delete Users' }
                                                      ].map((perm) => (
                                                        <label key={perm.key} className="flex items-center gap-2.5 text-xs text-zinc-600 font-semibold cursor-pointer select-none">
                                                          <input 
                                                            type="checkbox"
                                                            checked={roleObj.permissions[perm.key]}
                                                            disabled={roleObj.status === 'System Fixed'}
                                                            onChange={() => {
                                                              AutoNovaAudio.playClick();
                                                              const updated = rolesPermissions.map(r => {
                                                                if (r.id === roleObj.id) {
                                                                  return {
                                                                    ...r,
                                                                    permissions: {
                                                                      ...r.permissions,
                                                                      [perm.key]: !r.permissions[perm.key]
                                                                    }
                                                                  };
                                                                }
                                                                return r;
                                                              });
                                                              setRolesPermissions(updated);
                                                              showNotification(`Updated ${perm.label} for ${roleObj.name}.`, "success");
                                                            }}
                                                            className="rounded border-zinc-300 text-teal-950 focus:ring-teal-700 disabled:opacity-50"
                                                          />
                                                          <span>{perm.label}</span>
                                                        </label>
                                                      ))}
                                                    </div>
                                                  </div>

                                                  {/* LISTINGS MODULE */}
                                                  <div className="space-y-3.5 bg-white p-4 rounded-xl border border-zinc-200/40">
                                                    <h5 className="font-display text-[10px] font-black text-teal-950 uppercase tracking-wider pb-1.5 border-b border-zinc-100">Listings Module</h5>
                                                    <div className="space-y-2.5">
                                                      {[
                                                        { key: 'approveListings', label: 'Approve' },
                                                        { key: 'flagListings', label: 'Flag' },
                                                        { key: 'shadowBanListings', label: 'Shadow-Ban' }
                                                      ].map((perm) => (
                                                        <label key={perm.key} className="flex items-center gap-2.5 text-xs text-zinc-600 font-semibold cursor-pointer select-none">
                                                          <input 
                                                            type="checkbox"
                                                            checked={roleObj.permissions[perm.key]}
                                                            disabled={roleObj.status === 'System Fixed'}
                                                            onChange={() => {
                                                              AutoNovaAudio.playClick();
                                                              const updated = rolesPermissions.map(r => {
                                                                if (r.id === roleObj.id) {
                                                                  return {
                                                                    ...r,
                                                                    permissions: {
                                                                      ...r.permissions,
                                                                      [perm.key]: !r.permissions[perm.key]
                                                                    }
                                                                  };
                                                                }
                                                                return r;
                                                              });
                                                              setRolesPermissions(updated);
                                                              showNotification(`Updated ${perm.label} for ${roleObj.name}.`, "success");
                                                            }}
                                                            className="rounded border-zinc-300 text-teal-950 focus:ring-teal-700 disabled:opacity-50"
                                                          />
                                                          <span>{perm.label}</span>
                                                        </label>
                                                      ))}
                                                    </div>
                                                  </div>

                                                  {/* FINANCIALS MODULE */}
                                                  <div className="space-y-3.5 bg-white p-4 rounded-xl border border-zinc-200/40">
                                                    <h5 className="font-display text-[10px] font-black text-teal-950 uppercase tracking-wider pb-1.5 border-b border-zinc-100">Financials Module</h5>
                                                    <div className="space-y-2.5">
                                                      {[
                                                        { key: 'payouts', label: 'Process Payouts' },
                                                        { key: 'taxConfig', label: 'Tax Configurations' },
                                                        { key: 'refunds', label: 'Refunds & Disputes' }
                                                      ].map((perm) => (
                                                        <label key={perm.key} className="flex items-center gap-2.5 text-xs text-zinc-600 font-semibold cursor-pointer select-none">
                                                          <input 
                                                            type="checkbox"
                                                            checked={roleObj.permissions[perm.key]}
                                                            disabled={roleObj.status === 'System Fixed'}
                                                            onChange={() => {
                                                              AutoNovaAudio.playClick();
                                                              const updated = rolesPermissions.map(r => {
                                                                if (r.id === roleObj.id) {
                                                                  return {
                                                                    ...r,
                                                                    permissions: {
                                                                      ...r.permissions,
                                                                      [perm.key]: !r.permissions[perm.key]
                                                                    }
                                                                  };
                                                                }
                                                                return r;
                                                              });
                                                              setRolesPermissions(updated);
                                                              showNotification(`Updated ${perm.label} for ${roleObj.name}.`, "success");
                                                            }}
                                                            className="rounded border-zinc-300 text-teal-950 focus:ring-teal-700 disabled:opacity-50"
                                                          />
                                                          <span>{perm.label}</span>
                                                        </label>
                                                      ))}
                                                    </div>
                                                  </div>

                                                  {/* AI SETTINGS */}
                                                  <div className="space-y-3.5 bg-white p-4 rounded-xl border border-zinc-200/40">
                                                    <h5 className="font-display text-[10px] font-black text-teal-950 uppercase tracking-wider pb-1.5 border-b border-zinc-100">AI Settings</h5>
                                                    <div className="space-y-2.5">
                                                      {[
                                                        { key: 'modelTuning', label: 'Model Tuning' },
                                                        { key: 'limitTokenUsage', label: 'Limit Token Usage' }
                                                      ].map((perm) => (
                                                        <label key={perm.key} className="flex items-center gap-2.5 text-xs text-zinc-600 font-semibold cursor-pointer select-none">
                                                          <input 
                                                            type="checkbox"
                                                            checked={roleObj.permissions[perm.key]}
                                                            disabled={roleObj.status === 'System Fixed'}
                                                            onChange={() => {
                                                              AutoNovaAudio.playClick();
                                                              const updated = rolesPermissions.map(r => {
                                                                if (r.id === roleObj.id) {
                                                                  return {
                                                                    ...r,
                                                                    permissions: {
                                                                      ...r.permissions,
                                                                      [perm.key]: !r.permissions[perm.key]
                                                                    }
                                                                  };
                                                                }
                                                                return r;
                                                              });
                                                              setRolesPermissions(updated);
                                                              showNotification(`Updated ${perm.label} for ${roleObj.name}.`, "success");
                                                            }}
                                                            className="rounded border-zinc-300 text-teal-950 focus:ring-teal-700 disabled:opacity-50"
                                                          />
                                                          <span>{perm.label}</span>
                                                        </label>
                                                      ))}
                                                    </div>
                                                  </div>
                                                </div>
                                              </td>
                                            </tr>
                                          )}
                                        </React.Fragment>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 3. INTEGRATIONS TAB CONTENT */}
                        {activeSettingsSubTab === 'integrations' && (
                          <div className="space-y-6">
                            <div className="text-left mb-4">
                              <h3 className="font-display text-sm font-bold text-teal-950">Integration Hooks</h3>
                              <p className="text-xs text-zinc-500 font-medium">Configure and test connection health for third-party automated system microservices.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {/* Stripe Hook */}
                              <div className="border border-zinc-200 p-6 rounded-2xl flex flex-col justify-between bg-white text-left shadow-xs hover:border-zinc-300/80 transition-all">
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <div className="p-3 bg-[#635BFF]/10 text-[#635BFF] rounded-xl">
                                      <CreditCard className="h-5 w-5" />
                                    </div>
                                    <span className="flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-mono text-[9px] uppercase font-black rounded-full border border-emerald-100">
                                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                      <span>Operational</span>
                                    </span>
                                  </div>
                                  <div>
                                    <h4 className="font-display text-base font-black text-teal-950">Stripe Gateway</h4>
                                    <p className="text-xs text-zinc-500 font-medium mt-1 leading-relaxed">
                                      Financial ledger hooks for seller disbursements, platform escrows, and card authorization.
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-8 flex gap-2.5">
                                  <button 
                                    onClick={() => {
                                      AutoNovaAudio.playClick();
                                      showNotification("Stripe webhook configurations parsed and loaded.", "info");
                                    }}
                                    className="flex-1 py-2 text-center text-xs font-mono font-bold uppercase rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-colors cursor-pointer"
                                  >
                                    Configure
                                  </button>
                                  <button 
                                    onClick={() => {
                                      AutoNovaAudio.playClick();
                                      showNotification("Stripe API connection handshaking initialized...", "info");
                                      setTimeout(() => {
                                        AutoNovaAudio.playSuccess();
                                        showNotification("Stripe Gateway response acknowledged. Latency: 124ms.", "success");
                                      }, 1200);
                                    }}
                                    className="flex-1 py-2 text-center text-xs font-mono font-bold uppercase rounded-xl bg-teal-50 text-teal-950 border border-teal-200/50 hover:bg-teal-100/60 transition-colors cursor-pointer"
                                  >
                                    Test Conn
                                  </button>
                                </div>
                              </div>

                              {/* AI Hook */}
                              <div className="border border-zinc-200 p-6 rounded-2xl flex flex-col justify-between bg-white text-left shadow-xs hover:border-zinc-300/80 transition-all">
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <div className="p-3 bg-teal-950/10 text-teal-950 rounded-xl">
                                      <Brain className="h-5 w-5" />
                                    </div>
                                    <span className="flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-mono text-[9px] uppercase font-black rounded-full border border-emerald-100">
                                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                      <span>Operational</span>
                                    </span>
                                  </div>
                                  <div>
                                    <h4 className="font-display text-base font-black text-teal-950">OpenAI / Anthropic</h4>
                                    <p className="text-xs text-zinc-500 font-medium mt-1 leading-relaxed">
                                      Durable neural engines fueling real-time vehicle descriptions, insights, and fraud telemetry filters.
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-8 flex gap-2.5">
                                  <button 
                                    onClick={() => {
                                      AutoNovaAudio.playClick();
                                      showNotification("AI model weight & temp parameters parsed.", "info");
                                    }}
                                    className="flex-1 py-2 text-center text-xs font-mono font-bold uppercase rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-colors cursor-pointer"
                                  >
                                    Configure
                                  </button>
                                  <button 
                                    onClick={() => {
                                      AutoNovaAudio.playClick();
                                      showNotification("AI node token completion checking initialized...", "info");
                                      setTimeout(() => {
                                        AutoNovaAudio.playSuccess();
                                        showNotification("Gemini API connection handshaking complete. Response token latency: 284ms.", "success");
                                      }, 1000);
                                    }}
                                    className="flex-1 py-2 text-center text-xs font-mono font-bold uppercase rounded-xl bg-teal-50 text-teal-950 border border-teal-200/50 hover:bg-teal-100/60 transition-colors cursor-pointer"
                                  >
                                    Test Conn
                                  </button>
                                </div>
                              </div>

                              {/* Twilio Hook */}
                              <div className="border border-zinc-200 p-6 rounded-2xl flex flex-col justify-between bg-white text-left shadow-xs hover:border-zinc-300/80 transition-all">
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <div className="p-3 bg-teal-800/10 text-teal-800 rounded-xl">
                                      <Mail className="h-5 w-5" />
                                    </div>
                                    <span className="flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-mono text-[9px] uppercase font-black rounded-full border border-emerald-100">
                                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                      <span>Operational</span>
                                    </span>
                                  </div>
                                  <div>
                                    <h4 className="font-display text-base font-black text-teal-950">Twilio / SendGrid</h4>
                                    <p className="text-xs text-zinc-500 font-medium mt-1 leading-relaxed">
                                      Automated multi-channel text alerts, escrow receipt handshakes, and staff login 2FA code relays.
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-8 flex gap-2.5">
                                  <button 
                                    onClick={() => {
                                      AutoNovaAudio.playClick();
                                      showNotification("Twilio SMS routing nodes configured.", "info");
                                    }}
                                    className="flex-1 py-2 text-center text-xs font-mono font-bold uppercase rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-colors cursor-pointer"
                                  >
                                    Configure
                                  </button>
                                  <button 
                                    onClick={() => {
                                      AutoNovaAudio.playClick();
                                      showNotification("Initializing Twilio route handshaking loop...", "info");
                                      setTimeout(() => {
                                        AutoNovaAudio.playSuccess();
                                        showNotification("Twilio server response OK. Delivery quota: 100%.", "success");
                                      }, 900);
                                    }}
                                    className="flex-1 py-2 text-center text-xs font-mono font-bold uppercase rounded-xl bg-teal-50 text-teal-950 border border-teal-200/50 hover:bg-teal-100/60 transition-colors cursor-pointer"
                                  >
                                    Test Conn
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 4. API KEYS TAB CONTENT */}
                        {activeSettingsSubTab === 'api' && (
                          <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left border-b border-zinc-100 pb-4">
                              <div>
                                <h3 className="font-display text-sm font-bold text-teal-950">Management API Keys</h3>
                                <p className="text-xs text-zinc-500 font-medium mt-0.5">Regenerate, generate, and revoke administrative gateway tokens securely.</p>
                              </div>
                              <button 
                                onClick={() => {
                                  AutoNovaAudio.playClick();
                                  setIsGeneratingKey(!isGeneratingKey);
                                }}
                                className="px-4 py-2 bg-teal-950 hover:bg-teal-900 text-white rounded-xl text-xs font-mono font-bold uppercase transition-all shadow-sm active:scale-95 cursor-pointer flex items-center gap-1.5 self-start"
                              >
                                <Plus className="h-4.5 w-4.5" />
                                <span>Generate New Key</span>
                              </button>
                            </div>

                            {/* Key Generator Panel */}
                            {isGeneratingKey && (
                              <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200/60 space-y-4 text-left animate-in slide-in-from-top-1 duration-200">
                                <h4 className="text-xs font-bold text-teal-950 font-mono uppercase tracking-wider">Generate Secure Management Token</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                                  <div className="space-y-1.5">
                                    <label className="block text-[11px] font-bold text-zinc-700">Token Friendly Name</label>
                                    <input 
                                      type="text" 
                                      value={newKeyFormName}
                                      onChange={(e) => setNewKeyFormName(e.target.value)}
                                      placeholder="e.g. Mobile Client Prod Hook"
                                      className="w-full bg-white border border-zinc-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-1 focus:ring-teal-700 transition-all"
                                    />
                                  </div>
                                  <div className="flex gap-2">
                                    <button 
                                      onClick={() => {
                                        if (!newKeyFormName) {
                                          AutoNovaAudio.playError();
                                          showNotification("Please provide a name for the new API Key.", "error");
                                          return;
                                        }
                                        AutoNovaAudio.playSuccess();
                                        const randomVal = `sk_live_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}b8z9`;
                                        const dateLabel = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
                                        const newKey = {
                                          id: `key-${Date.now()}`,
                                          name: newKeyFormName,
                                          value: randomVal,
                                          created: dateLabel
                                        };
                                        setApiKeysList(prev => [...prev, newKey]);
                                        
                                        // audit log entry
                                        const nowStr = new Date().toTimeString().split(' ')[0];
                                        const newAudit = {
                                          id: `audit-${Date.now()}`,
                                          time: nowStr,
                                          dateLabel: 'Today',
                                          user: userName || 'Admin',
                                          action: 'generated',
                                          target: `API Key: "${newKeyFormName}"`,
                                          origin: 'Settings Console',
                                          ip: '192.168.1.1',
                                          type: 'change',
                                          diff: {
                                            before: null,
                                            after: { key_name: newKeyFormName, created: dateLabel, scopes: "read_write" }
                                          }
                                        };
                                        setSettingsAuditLogs(prev => [newAudit, ...prev]);

                                        setNewKeyFormName('');
                                        setIsGeneratingKey(false);
                                        showNotification(`API key "${newKey.name}" generated successfully.`, "success");
                                      }}
                                      className="px-4 py-2 bg-teal-950 hover:bg-teal-900 text-white rounded-xl text-xs font-mono font-bold uppercase transition-all shadow-sm active:scale-95 cursor-pointer"
                                    >
                                      Create Key
                                    </button>
                                    <button 
                                      onClick={() => {
                                        AutoNovaAudio.playClick();
                                        setNewKeyFormName('');
                                        setIsGeneratingKey(false);
                                      }}
                                      className="px-4 py-2 border border-zinc-200 text-zinc-600 hover:bg-zinc-100 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Active Keys Table */}
                            <div className="border border-zinc-200/50 rounded-2xl overflow-hidden bg-white">
                              <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-xs">
                                  <thead>
                                    <tr className="bg-zinc-50/50 border-b border-zinc-100 text-zinc-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                                      <th className="p-4">Key Friendly Name</th>
                                      <th className="p-4">Secret Code Token</th>
                                      <th className="p-4">Creation Date</th>
                                      <th className="p-4 text-right">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-zinc-100 font-semibold text-zinc-600">
                                    {apiKeysList.map((keyObj) => (
                                      <tr key={keyObj.id} className="hover:bg-zinc-50/20 transition-colors">
                                        <td className="p-4 font-bold text-teal-950">
                                          {keyObj.name}
                                        </td>
                                        <td className="p-4 font-mono text-zinc-500 text-[11px]">
                                          {keyObj.value.substring(0, 8)}••••••••••••••••{keyObj.value.substring(keyObj.value.length - 4)}
                                        </td>
                                        <td className="p-4 font-mono text-zinc-400">
                                          {keyObj.created}
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                          <button 
                                            onClick={() => {
                                              AutoNovaAudio.playClick();
                                              const updatedVal = `sk_live_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}f4a2`;
                                              setApiKeysList(prev => prev.map(k => k.id === keyObj.id ? { ...k, value: updatedVal } : k));
                                              
                                              // log to audit
                                              const nowStr = new Date().toTimeString().split(' ')[0];
                                              const newAudit = {
                                                id: `audit-${Date.now()}`,
                                                time: nowStr,
                                                dateLabel: 'Today',
                                                user: userName || 'Admin',
                                                action: 'regenerated',
                                                target: `API Key: "${keyObj.name}"`,
                                                origin: 'Settings Console',
                                                ip: '192.168.1.1',
                                                type: 'change',
                                                diff: {
                                                  before: { key_name: keyObj.name, val_prefix: keyObj.value.substring(0, 6) },
                                                  after: { key_name: keyObj.name, val_prefix: updatedVal.substring(0, 6) }
                                                }
                                              };
                                              setSettingsAuditLogs(prev => [newAudit, ...prev]);

                                              showNotification(`Token values for "${keyObj.name}" refreshed.`, "success");
                                            }}
                                            className="px-2.5 py-1.5 text-teal-950 hover:underline text-[9px] font-mono font-bold uppercase transition-all cursor-pointer"
                                          >
                                            Regenerate
                                          </button>
                                          <button 
                                            onClick={() => {
                                              AutoNovaAudio.playClick();
                                              if (confirm(`Are you absolutely sure you want to permanently revoke key "${keyObj.name}"? This action cannot be undone.`)) {
                                                AutoNovaAudio.playSuccess();
                                                setApiKeysList(prev => prev.filter(k => k.id !== keyObj.id));

                                                // log to audit
                                                const nowStr = new Date().toTimeString().split(' ')[0];
                                                const newAudit = {
                                                  id: `audit-${Date.now()}`,
                                                  time: nowStr,
                                                  dateLabel: 'Today',
                                                  user: userName || 'Admin',
                                                  action: 'revoked',
                                                  target: `API Key: "${keyObj.name}"`,
                                                  origin: 'Settings Console',
                                                  ip: '192.168.1.1',
                                                  type: 'revoke',
                                                  diff: {
                                                    before: { key_name: keyObj.name, status: "active" },
                                                    after: { key_name: keyObj.name, status: "revoked" }
                                                  }
                                                };
                                                setSettingsAuditLogs(prev => [newAudit, ...prev]);

                                                showNotification(`API Key "${keyObj.name}" revoked permanently.`, "warning");
                                              }
                                            }}
                                            className="px-2.5 py-1.5 text-rose-600 hover:underline text-[9px] font-mono font-bold uppercase transition-all cursor-pointer"
                                          >
                                            Revoke
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 5. AUDIT LOG TAB CONTENT */}
                        {activeSettingsSubTab === 'audit' && (
                          <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left border-b border-zinc-100 pb-4">
                              <div>
                                <h3 className="font-display text-sm font-bold text-teal-950">System Configuration Audit Feed</h3>
                                <p className="text-xs text-zinc-500 font-medium mt-0.5">Immutable tracking logs of changes made to global platform variables.</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <input 
                                  type="text"
                                  value={settingsAuditSearchQuery}
                                  onChange={(e) => setSettingsAuditSearchQuery(e.target.value)}
                                  placeholder="Search by actor or target..."
                                  className="px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700 transition-all placeholder-zinc-400 w-52"
                                />
                              </div>
                            </div>

                            {/* Logs Loop */}
                            <div className="space-y-3">
                              {settingsAuditLogs
                                .filter(log => {
                                  if (!settingsAuditSearchQuery) return true;
                                  const q = settingsAuditSearchQuery.toLowerCase();
                                  return log.user.toLowerCase().includes(q) || 
                                         log.target.toLowerCase().includes(q) || 
                                         log.action.toLowerCase().includes(q);
                                })
                                .map((log) => {
                                  const isExpanded = expandedAuditId === log.id;
                                  return (
                                    <React.Fragment key={log.id}>
                                      <div className="bg-zinc-50/50 border border-zinc-200 p-4 rounded-xl flex items-center justify-between gap-4 text-left hover:shadow-xs transition-all">
                                        <div className="flex items-center gap-4">
                                          <div className="flex flex-col items-center">
                                            <span className="text-xs font-bold text-teal-950 font-mono">{log.time}</span>
                                            <span className="text-[8px] text-zinc-400 font-bold uppercase tracking-wider font-mono">{log.dateLabel}</span>
                                          </div>
                                          <div className={`w-1.5 h-8 rounded-full ${log.type === 'revoke' ? 'bg-rose-500' : 'bg-teal-700'}`} />
                                          <div>
                                            <p className="text-xs font-bold text-zinc-800">
                                              {log.user} <span className="text-zinc-500 font-medium">{log.action}</span> {log.target}
                                            </p>
                                            <p className="text-[10px] text-zinc-400 font-medium">
                                              {log.origin} • IP: {log.ip}
                                            </p>
                                          </div>
                                        </div>
                                        <button 
                                          onClick={() => {
                                            AutoNovaAudio.playClick();
                                            setExpandedAuditId(isExpanded ? null : log.id);
                                          }}
                                          className="px-3.5 py-1.5 border border-zinc-200 hover:bg-zinc-100 text-[10px] font-mono font-bold uppercase rounded-lg transition-all cursor-pointer"
                                        >
                                          {isExpanded ? 'Hide Diff' : 'View Diff'}
                                        </button>
                                      </div>

                                      {/* Code View Diff Box */}
                                      {isExpanded && (
                                        <div className="p-5 bg-teal-950 text-teal-100/90 font-mono text-[11px] rounded-xl overflow-x-auto text-left animate-in slide-in-from-top-1 duration-200">
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-teal-900/60">
                                            <div className="space-y-1.5">
                                              <span className="text-rose-400 block font-bold text-[9px] uppercase tracking-wider">// BEFORE CHANGES</span>
                                              <pre className="text-xs text-rose-100/70 p-2.5 bg-teal-950/40 rounded-lg overflow-x-auto">
                                                {JSON.stringify(log.diff.before, null, 2)}
                                              </pre>
                                            </div>
                                            <div className="space-y-1.5 md:pl-6">
                                              <span className="text-emerald-400 block font-bold text-[9px] uppercase tracking-wider">// AFTER CHANGES</span>
                                              <pre className="text-xs text-emerald-100/90 p-2.5 bg-teal-950/40 rounded-lg overflow-x-auto">
                                                {JSON.stringify(log.diff.after, null, 2)}
                                              </pre>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </React.Fragment>
                                  );
                                })
                              }
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 5: SECURITY AUDIT */}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <div className="border-b border-zinc-100 pb-3">
                      <h2 className="font-display text-base font-extrabold text-teal-950">Sovereign Node Security Audit</h2>
                      <p className="text-xs text-zinc-500 font-medium">Verify active administrative sessions, access IPs, and compliance certificates.</p>
                    </div>

                    <div className="border border-zinc-200/50 rounded-2xl overflow-hidden bg-white">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-zinc-50 border-b border-zinc-100 text-zinc-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                            <th className="p-4">Administrator</th>
                            <th className="p-4">Access Node IP</th>
                            <th className="p-4">Secure Status</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 font-medium text-zinc-600">
                          <tr className="hover:bg-zinc-50/40">
                            <td className="p-4 font-bold text-teal-950">admin@autonova.intel</td>
                            <td className="p-4 font-mono text-[10.5px]">102.89.23.118 (Lagos)</td>
                            <td className="p-4">
                              <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" /> Active Session
                              </span>
                            </td>
                            <td className="p-4 text-right font-mono text-[10px] text-zinc-400 font-bold">THIS TERMINAL</td>
                          </tr>
                          <tr className="hover:bg-zinc-50/40">
                            <td className="p-4 font-bold text-teal-950">compliance-pod-4@autonova.intel</td>
                            <td className="p-4 font-mono text-[10.5px]">84.22.109.43 (London)</td>
                            <td className="p-4">
                              <span className="inline-flex items-center gap-1.5 text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full font-bold">
                                Offline
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <button 
                                onClick={() => { AutoNovaAudio.playError(); showNotification("Authorized token revoked for backup admin.", "error"); }}
                                className="text-red-700 hover:text-red-800 font-mono text-[9px] font-bold tracking-widest uppercase cursor-pointer"
                              >
                                Revoke Token
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-emerald-50/40 border border-emerald-200/30 rounded-2xl p-4 flex gap-3.5 items-start">
                      <ShieldCheck className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <h5 className="text-[11px] font-bold text-emerald-900 uppercase">Cryptographic Integrity Sealed</h5>
                        <p className="text-[10.5px] text-zinc-500 font-semibold leading-relaxed">
                          All financial ledger entries are cryptographically signed using SHA-256 secure hash certificates rooted in our distributed host node registry. No active security flags.
                        </p>
                      </div>
                    </div>

                    {/* Bulk action toolbar — previously missing entirely */}
                    <AnimatePresence>
                      {selectedListingIds.length > 0 && (
                        <motion.div
                          initial={{ y: 60, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 60, opacity: 0 }}
                          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-zinc-950 text-white shadow-xl rounded-2xl px-5 py-3 flex items-center gap-4"
                        >
                          <span className="text-xs font-bold">{selectedListingIds.length} selected</span>
                          <button
                            onClick={() => { AutoNovaAudio.playClick(); showNotification(`${selectedListingIds.length} listing(s) featured.`, "success"); setSelectedListingIds([]); }}
                            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 font-mono text-[9px] font-extrabold uppercase tracking-widest rounded-lg cursor-pointer"
                          >
                            Feature
                          </button>
                          <button
                            onClick={() => { AutoNovaAudio.playClick(); showNotification(`${selectedListingIds.length} listing(s) boosted.`, "success"); setSelectedListingIds([]); }}
                            className="px-3 py-1.5 bg-teal-700 hover:bg-teal-600 font-mono text-[9px] font-extrabold uppercase tracking-widest rounded-lg cursor-pointer"
                          >
                            Boost
                          </button>
                          <button
                            onClick={() => {
                              AutoNovaAudio.playClick();
                              setPendingApprovals(prev => prev.filter(c => !selectedListingIds.includes(c.id)));
                              showNotification(`${selectedListingIds.length} listing(s) removed.`, "info");
                              setSelectedListingIds([]);
                            }}
                            className="px-3 py-1.5 bg-red-700 hover:bg-red-600 font-mono text-[9px] font-extrabold uppercase tracking-widest rounded-lg cursor-pointer"
                          >
                            Remove
                          </button>
                          <button
                            onClick={() => { AutoNovaAudio.playClick(); setSelectedListingIds([]); }}
                            className="text-white/50 hover:text-white cursor-pointer ml-1"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                )}

                {/* TAB: ORDERS & TRANSACTIONS MANAGEMENT */}
                {activeTab === 'orders' && (
                  <div className="space-y-6">
                    {/* Disputes Escalation Queue — previously missing entirely as its own view */}
                    {adminOrders.some(o => o.disputeStatus && o.disputeStatus !== 'none') && (
                      <div className="bg-red-50/40 border border-red-100 rounded-2xl p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-display font-black text-xs text-red-900 uppercase tracking-wider flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Disputes Escalation Queue
                          </h3>
                          <span className="font-mono text-[9px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                            {adminOrders.filter(o => o.disputeStatus && o.disputeStatus !== 'none').length} Open
                          </span>
                        </div>
                        <div className="space-y-2">
                          {adminOrders.filter(o => o.disputeStatus && o.disputeStatus !== 'none').map((order) => (
                            <div key={order.id} className="flex items-center justify-between bg-white p-3 rounded-xl border border-red-100">
                              <div className="flex items-center gap-3">
                                <span className="font-mono text-[8px] font-black px-2 py-1 rounded bg-red-600 text-white uppercase tracking-wider">High</span>
                                <div>
                                  <p className="text-xs font-bold text-teal-950">{order.id} — {order.carName}</p>
                                  <p className="text-[10px] text-zinc-400 font-medium">{order.buyerName} • {order.disputeReason || 'Under review'}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => { AutoNovaAudio.playClick(); showNotification(`Escalation for ${order.id} opened.`, "info"); }}
                                className="px-3 py-1.5 border border-red-200 hover:bg-red-100 text-red-800 font-mono text-[8px] font-extrabold uppercase tracking-widest rounded-lg cursor-pointer"
                              >
                                Review Case
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Header */}
                    <div className="border-b border-zinc-100 pb-3 flex flex-col md:flex-row md:items-end justify-between gap-4">
                      <div>
                        <h2 className="font-display text-base font-extrabold text-teal-950">Sovereign Escrow & Logistics Desk</h2>
                        <p className="text-xs text-zinc-500 font-medium">Supervise user orders, update transit milestones, dispatch logistics, release escrows, and settle disputed funds.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            showNotification("Preparing compliance report of active escrows & transaction histories...", "info");
                            setTimeout(() => {
                              AutoNovaAudio.playSuccess();
                              showNotification("Escrow clearing compliance report exported successfully.", "success");
                            }, 1500);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-2 border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 rounded-xl font-mono text-[8.5px] font-bold uppercase cursor-pointer"
                        >
                          <Download className="h-3.5 w-3.5 text-teal-800" />
                          <span>Export Escrow Ledger</span>
                        </button>
                      </div>
                    </div>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                      <div className="p-4 bg-white border border-zinc-200/50 rounded-2xl space-y-2 shadow-sm">
                        <div className="flex items-center justify-between text-zinc-400">
                          <span className="text-[10px] font-bold uppercase tracking-wider">Total Gross Volume</span>
                          <CreditCard className="h-4 w-4 text-teal-600" />
                        </div>
                        <h3 className="font-display text-xl font-black text-teal-950">
                          ₦{(adminOrders.reduce((sum, o) => sum + o.price, 0) * 1600).toLocaleString()}
                        </h3>
                        <p className="text-[9px] text-zinc-400 font-medium font-mono">${adminOrders.reduce((sum, o) => sum + o.price, 0).toLocaleString()} USD Ledger</p>
                      </div>

                      <div className="p-4 bg-white border border-zinc-200/50 rounded-2xl space-y-2 shadow-sm">
                        <div className="flex items-center justify-between text-zinc-400">
                          <span className="text-[10px] font-bold uppercase tracking-wider">Escrow Assets Held</span>
                          <Lock className="h-4 w-4 text-amber-600" />
                        </div>
                        <h3 className="font-display text-xl font-black text-teal-950">
                          ₦{(adminOrders.filter(o => o.escrowStatus === 'held').reduce((sum, o) => sum + o.price, 0) * 1600).toLocaleString()}
                        </h3>
                        <p className="text-[9px] text-zinc-400 font-medium font-mono">Secured in Smart Contract</p>
                      </div>

                      <div className="p-4 bg-white border border-zinc-200/50 rounded-2xl space-y-2 shadow-sm">
                        <div className="flex items-center justify-between text-zinc-400">
                          <span className="text-[10px] font-bold uppercase tracking-wider">Active Logistics</span>
                          <Truck className="h-4 w-4 text-blue-600" />
                        </div>
                        <h3 className="font-display text-xl font-black text-teal-950">
                          {adminOrders.filter(o => o.status === 'Processing' || o.status === 'In Progress').length} Active
                        </h3>
                        <p className="text-[9px] text-zinc-400 font-medium font-mono">Real-time GPS Tracking</p>
                      </div>

                      <div className="p-4 bg-white border border-zinc-200/50 rounded-2xl space-y-2 shadow-sm">
                        <div className="flex items-center justify-between text-zinc-400">
                          <span className="text-[10px] font-bold uppercase tracking-wider">Disputed Escrows</span>
                          <AlertCircle className="h-4 w-4 text-red-600 animate-pulse" />
                        </div>
                        <h3 className="font-display text-xl font-black text-red-950">
                          {adminOrders.filter(o => o.status === 'Disputed').length} Case(s)
                        </h3>
                        <p className="text-[9px] text-zinc-400 font-medium font-mono">Awaiting Admin Arbitration</p>
                      </div>
                    </div>

                    {/* Filter and Search controls */}
                    <div className="flex flex-wrap items-center gap-3 bg-zinc-50 border border-zinc-200/50 p-3 rounded-2xl shadow-sm">
                      <div className="relative flex-grow max-w-xs">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                          <Activity className="h-3.5 w-3.5 text-teal-700" />
                        </span>
                        <input 
                          type="text" 
                          placeholder="Search orders, buyers..." 
                          value={orderSearchQuery}
                          onChange={(e) => setOrderSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-all"
                        />
                      </div>

                      {/* Status Filter */}
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-zinc-200 rounded-xl">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase">Transit:</span>
                        <select 
                          value={orderFilterStatus}
                          onChange={(e) => { AutoNovaAudio.playClick(); setOrderFilterStatus(e.target.value); }}
                          className="bg-transparent border-none p-0 text-xs font-bold text-zinc-700 focus:ring-0 cursor-pointer outline-none font-sans"
                        >
                          <option value="All">All Milestones</option>
                          <option value="Processing">Processing</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Disputed">Disputed</option>
                        </select>
                      </div>

                      {/* Escrow Filter */}
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-zinc-200 rounded-xl">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase">Escrow:</span>
                        <select 
                          value={orderFilterEscrow}
                          onChange={(e) => { AutoNovaAudio.playClick(); setOrderFilterEscrow(e.target.value); }}
                          className="bg-transparent border-none p-0 text-xs font-bold text-zinc-700 focus:ring-0 cursor-pointer outline-none font-sans"
                        >
                          <option value="All">All Escrows</option>
                          <option value="held">Held (Escrow)</option>
                          <option value="released">Released</option>
                          <option value="refunded">Refunded</option>
                        </select>
                      </div>
                    </div>

                    {/* Split View */}
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                      {/* Left: Orders Table */}
                      <div className="xl:col-span-7 bg-white border border-zinc-200/50 rounded-2xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                                <th className="p-4">Order Specs</th>
                                <th className="p-4">Buyer / Seller</th>
                                <th className="p-4">Financial Value</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 font-medium text-zinc-600">
                              {adminOrders
                                .filter(o => {
                                  const matchesSearch = o.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) || 
                                    o.buyerName.toLowerCase().includes(orderSearchQuery.toLowerCase()) || 
                                    o.carName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
                                    o.sellerName.toLowerCase().includes(orderSearchQuery.toLowerCase());
                                  const matchesStatus = orderFilterStatus === 'All' || o.status === orderFilterStatus;
                                  const matchesEscrow = orderFilterEscrow === 'All' || o.escrowStatus === orderFilterEscrow;
                                  return matchesSearch && matchesStatus && matchesEscrow;
                                })
                                .map((order) => (
                                  <tr 
                                    key={order.id}
                                    onClick={() => { AutoNovaAudio.playClick(); setSelectedAdminOrder(order); }}
                                    className={`hover:bg-zinc-50/40 cursor-pointer transition-colors ${selectedAdminOrder?.id === order.id ? 'bg-teal-50/20 font-semibold' : ''}`}
                                  >
                                    <td className="p-4 space-y-2">
                                      <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10.5px] font-bold text-teal-950">{order.id}</span>
                                        <span className="text-[9px] text-zinc-400 font-mono">{order.placedDate}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <img src={order.image} className="w-8 h-8 rounded-lg object-cover border border-zinc-200/50" referrerPolicy="no-referrer" />
                                        <div>
                                          <p className="font-bold text-zinc-800 leading-tight">{order.carName}</p>
                                          <p className="text-[10px] text-zinc-400 leading-none">{order.trim}</p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-4 space-y-1">
                                      <p className="text-zinc-800 font-bold">B: {order.buyerName}</p>
                                      <p className="text-[10px] text-zinc-400">S: {order.sellerName}</p>
                                    </td>
                                    <td className="p-4 space-y-1">
                                      <p className="font-bold text-teal-950">₦{(order.price * 1600).toLocaleString()}</p>
                                      <p className="text-[9px] text-zinc-400 font-mono">${order.price.toLocaleString()}</p>
                                    </td>
                                    <td className="p-4 space-y-1">
                                      <div className="mb-1">
                                        {order.escrowStatus === 'held' && (
                                          <span className="inline-flex items-center gap-1 text-[9.5px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-full">
                                            <Lock className="h-2.5 w-2.5" /> Escrow Held
                                          </span>
                                        )}
                                        {order.escrowStatus === 'released' && (
                                          <span className="inline-flex items-center gap-1 text-[9.5px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                                            <CheckCircle className="h-2.5 w-2.5" /> Escrow Cleared
                                          </span>
                                        )}
                                        {order.escrowStatus === 'refunded' && (
                                          <span className="inline-flex items-center gap-1 text-[9.5px] font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded-full">
                                            <X className="h-2.5 w-2.5" /> Refunded
                                          </span>
                                        )}
                                      </div>
                                      <div>
                                        <span className={`text-[9.5px] font-mono font-bold ${
                                          order.status === 'Processing' ? 'text-blue-600' :
                                          order.status === 'In Progress' ? 'text-amber-600' :
                                          order.status === 'Delivered' ? 'text-emerald-600' :
                                          order.status === 'Disputed' ? 'text-red-600 font-black' :
                                          'text-zinc-500'
                                        }`}>
                                          • {order.status}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="p-4 text-right">
                                      <button 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          AutoNovaAudio.playClick();
                                          setSelectedAdminOrder(order);
                                        }}
                                        className="text-[10px] font-mono font-bold text-teal-800 hover:text-teal-950 uppercase border border-zinc-200 bg-white hover:bg-zinc-50 px-2 py-1 rounded-lg"
                                      >
                                        Manage
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Right: Detailed Panel */}
                      <div className="xl:col-span-5">
                        {selectedAdminOrder ? (
                          <div className="bg-white border border-zinc-200/50 rounded-2xl p-6 shadow-sm space-y-6">
                            {/* Panel Header */}
                            <div className="flex justify-between items-start border-b border-zinc-100 pb-3">
                              <div className="text-left">
                                <h3 className="font-display text-sm font-extrabold text-teal-950 uppercase tracking-tight">Escrow Clearance Certificate</h3>
                                <p className="text-[10px] text-zinc-400 font-mono">REGISTRY REF: {selectedAdminOrder.id}</p>
                              </div>
                              <span className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded-md ${
                                selectedAdminOrder.escrowStatus === 'held' ? 'bg-amber-100 text-amber-800' :
                                selectedAdminOrder.escrowStatus === 'released' ? 'bg-emerald-100 text-emerald-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {selectedAdminOrder.escrowStatus}
                              </span>
                            </div>

                            {/* Car specs snapshot */}
                            <div className="flex gap-4 p-3 bg-zinc-50 border border-zinc-100 rounded-xl items-center text-left">
                              <img src={selectedAdminOrder.image} className="w-14 h-14 rounded-lg object-cover border border-zinc-200/50" referrerPolicy="no-referrer" />
                              <div className="space-y-0.5">
                                <h4 className="text-xs font-bold text-zinc-800">{selectedAdminOrder.carName}</h4>
                                <p className="text-[10px] text-zinc-400 font-medium">{selectedAdminOrder.trim}</p>
                                <p className="text-xs font-mono font-bold text-teal-900">₦{(selectedAdminOrder.price * 1600).toLocaleString()} <span className="text-[9px] text-zinc-400">(${selectedAdminOrder.price.toLocaleString()})</span></p>
                              </div>
                            </div>

                            {/* Transacting Nodes */}
                            <div className="space-y-2">
                              <h4 className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-wider text-left">Trading Parties Verification</h4>
                              <div className="grid grid-cols-2 gap-4 text-left">
                                <div className="p-2.5 bg-zinc-50/40 rounded-xl border border-zinc-100 space-y-1">
                                  <span className="text-[8px] font-bold text-zinc-400 uppercase">Buyer Node</span>
                                  <p className="text-xs font-bold text-teal-950 truncate">{selectedAdminOrder.buyerName}</p>
                                  <p className="text-[9px] text-zinc-400 truncate font-mono">{selectedAdminOrder.buyerEmail}</p>
                                </div>
                                <div className="p-2.5 bg-zinc-50/40 rounded-xl border border-zinc-100 space-y-1">
                                  <span className="text-[8px] font-bold text-zinc-400 uppercase">Seller Node</span>
                                  <p className="text-xs font-bold text-teal-950 truncate">{selectedAdminOrder.sellerName}</p>
                                  <p className="text-[9px] text-zinc-400 truncate font-mono font-bold">Verified Host #24</p>
                                </div>
                              </div>
                            </div>

                            {/* Interactive Step-by-Step Logistics Timeline */}
                            <div className="space-y-3 border-t border-zinc-100 pt-4">
                              <div className="flex justify-between items-center">
                                <h4 className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Logistics Milestones</h4>
                                <span className="text-[9px] text-teal-950 font-bold font-mono">Step {selectedAdminOrder.timelineStep} of 4</span>
                              </div>
                              <div className="grid grid-cols-4 gap-2">
                                {[
                                  { step: 1, title: "Confirmed", desc: "Agreement initialized." },
                                  { step: 2, title: "Signed", desc: "Ownership signed." },
                                  { step: 3, title: "Scan", desc: "Dynamic diagnostic pass." },
                                  { step: 4, title: "Delivered", desc: "Showroom handover." }
                                ].map((milestone) => {
                                  const isActive = selectedAdminOrder.timelineStep >= milestone.step;
                                  const isCurrent = selectedAdminOrder.timelineStep === milestone.step;
                                  return (
                                    <button
                                      key={milestone.step}
                                      onClick={() => {
                                        AutoNovaAudio.playSuccess();
                                        // Update state
                                        const updatedOrders = adminOrders.map(o => {
                                          if (o.id === selectedAdminOrder.id) {
                                            const updatedObj = { ...o, timelineStep: milestone.step };
                                            if (milestone.step === 4) {
                                              updatedObj.status = 'Delivered';
                                            } else if (o.status === 'Processing') {
                                              updatedObj.status = 'In Progress';
                                            }
                                            return updatedObj;
                                          }
                                          return o;
                                        });
                                        setAdminOrders(updatedOrders);
                                        setSelectedAdminOrder(updatedOrders.find(o => o.id === selectedAdminOrder.id));
                                        
                                        // Add entry to trade ledger
                                        setTradeLedger(prev => [
                                          {
                                            id: `tx-${Math.floor(1000 + Math.random() * 9000)}`,
                                            time: new Date().toTimeString().split(' ')[0],
                                            text: `Order ${selectedAdminOrder.id} logistics updated to Step ${milestone.step} (${milestone.title})`,
                                            type: 'system'
                                          },
                                          ...prev
                                        ]);

                                        showNotification(`Order ${selectedAdminOrder.id} milestone updated: ${milestone.title}`, "success");
                                      }}
                                      className={`flex flex-col items-center justify-between p-2 rounded-xl border text-center transition-all cursor-pointer ${
                                        isCurrent ? 'bg-teal-950 border-teal-950 text-white shadow-sm' :
                                        isActive ? 'bg-teal-50/40 border-teal-200 text-teal-900' :
                                        'bg-zinc-50 border-zinc-200/50 text-zinc-400'
                                      }`}
                                      title={milestone.desc}
                                    >
                                      <span className="font-mono text-[10px] font-black">{milestone.step}</span>
                                      <span className="text-[8px] font-bold tracking-tight uppercase leading-none block mt-1">{milestone.title}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Administrative Clearing Actions */}
                            <div className="space-y-3 border-t border-zinc-100 pt-4">
                              <h4 className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-wider text-left">Administrative Clearance Actions</h4>
                              
                              {selectedAdminOrder.status === 'Disputed' && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-2">
                                  <div className="flex gap-2 items-start text-red-900 text-left">
                                    <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5 animate-bounce" />
                                    <div className="space-y-0.5">
                                      <p className="text-[10px] font-bold uppercase">Active Mediation Required</p>
                                      <p className="text-[10px] text-zinc-600 font-semibold leading-relaxed">
                                        {selectedAdminOrder.disputeReason}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex gap-2">
                                    <button 
                                      onClick={() => {
                                        AutoNovaAudio.playSuccess();
                                        const updated = adminOrders.map(o => {
                                          if (o.id === selectedAdminOrder.id) {
                                            return { ...o, status: 'Delivered', escrowStatus: 'released', disputeStatus: 'resolved' };
                                          }
                                          return o;
                                        });
                                        setAdminOrders(updated);
                                        setSelectedAdminOrder(updated.find(o => o.id === selectedAdminOrder.id));
                                        
                                        setTradeLedger(prev => [
                                          {
                                            id: `tx-${Math.floor(1000 + Math.random() * 9000)}`,
                                            time: new Date().toTimeString().split(' ')[0],
                                            text: `Dispute Settled: Released ₦${(selectedAdminOrder.price * 1600).toLocaleString()} to Seller ${selectedAdminOrder.sellerName}`,
                                            type: 'escrow'
                                          },
                                          ...prev
                                        ]);

                                        showNotification(`Dispute settled. Escrow payout completed to ${selectedAdminOrder.sellerName}`, "success");
                                      }}
                                      className="flex-1 bg-teal-950 hover:bg-teal-900 text-white font-mono text-[9px] font-bold uppercase py-1.5 rounded-lg cursor-pointer"
                                    >
                                      Payout Seller
                                    </button>
                                    <button 
                                      onClick={() => {
                                        AutoNovaAudio.playError();
                                        const updated = adminOrders.map(o => {
                                          if (o.id === selectedAdminOrder.id) {
                                            return { ...o, status: 'Cancelled', escrowStatus: 'refunded', disputeStatus: 'refunded' };
                                          }
                                          return o;
                                        });
                                        setAdminOrders(updated);
                                        setSelectedAdminOrder(updated.find(o => o.id === selectedAdminOrder.id));
                                        
                                        setTradeLedger(prev => [
                                          {
                                            id: `tx-${Math.floor(1000 + Math.random() * 9000)}`,
                                            time: new Date().toTimeString().split(' ')[0],
                                            text: `Dispute Settled: Refunded ₦${(selectedAdminOrder.price * 1600).toLocaleString()} to Buyer ${selectedAdminOrder.buyerName}`,
                                            type: 'escrow'
                                          },
                                          ...prev
                                        ]);

                                        showNotification(`Dispute settled. Escrow funds refunded to ${selectedAdminOrder.buyerName}`, "error");
                                      }}
                                      className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-mono text-[9px] font-bold uppercase py-1.5 rounded-lg border border-zinc-200 cursor-pointer"
                                    >
                                      Refund Buyer
                                    </button>
                                  </div>
                                </div>
                              )}

                              {selectedAdminOrder.escrowStatus === 'held' && selectedAdminOrder.status !== 'Disputed' && (
                                <div className="space-y-2">
                                  <div className="flex gap-2">
                                    <button 
                                      onClick={() => {
                                        AutoNovaAudio.playSuccess();
                                        const updated = adminOrders.map(o => {
                                          if (o.id === selectedAdminOrder.id) {
                                            return { ...o, escrowStatus: 'released', status: 'Delivered', timelineStep: 4 };
                                          }
                                          return o;
                                        });
                                        setAdminOrders(updated);
                                        setSelectedAdminOrder(updated.find(o => o.id === selectedAdminOrder.id));
                                        
                                        setTradeLedger(prev => [
                                          {
                                            id: `tx-${Math.floor(1000 + Math.random() * 9000)}`,
                                            time: new Date().toTimeString().split(' ')[0],
                                            text: `Cleared Payout: Transferred ₦${(selectedAdminOrder.price * 1600).toLocaleString()} to Seller ${selectedAdminOrder.sellerName}`,
                                            type: 'escrow'
                                          },
                                          ...prev
                                        ]);

                                        showNotification(`Escrow funds cleared. ₦${(selectedAdminOrder.price * 1600).toLocaleString()} transferred to ${selectedAdminOrder.sellerName}`, "success");
                                      }}
                                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-teal-950 hover:bg-teal-900 text-white font-mono text-[9px] font-bold uppercase py-2.5 rounded-xl cursor-pointer"
                                    >
                                      <Check className="h-3.5 w-3.5" />
                                      <span>Release Escrow</span>
                                    </button>
                                    
                                    <button 
                                      onClick={() => {
                                        AutoNovaAudio.playError();
                                        const updated = adminOrders.map(o => {
                                          if (o.id === selectedAdminOrder.id) {
                                            return { ...o, escrowStatus: 'refunded', status: 'Cancelled' };
                                          }
                                          return o;
                                        });
                                        setAdminOrders(updated);
                                        setSelectedAdminOrder(updated.find(o => o.id === selectedAdminOrder.id));
                                        
                                        setTradeLedger(prev => [
                                          {
                                            id: `tx-${Math.floor(1000 + Math.random() * 9000)}`,
                                            time: new Date().toTimeString().split(' ')[0],
                                            text: `Refunded Escrow: Returned ₦${(selectedAdminOrder.price * 1600).toLocaleString()} to Buyer ${selectedAdminOrder.buyerName}`,
                                            type: 'escrow'
                                          },
                                          ...prev
                                        ]);

                                        showNotification(`Refund issued. ₦${(selectedAdminOrder.price * 1600).toLocaleString()} returned to ${selectedAdminOrder.buyerName}`, "error");
                                      }}
                                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white hover:bg-zinc-50 border border-zinc-200 text-red-700 font-mono text-[9px] font-bold uppercase py-2.5 rounded-xl cursor-pointer"
                                    >
                                      <X className="h-3.5 w-3.5" />
                                      <span>Refund Buyer</span>
                                    </button>
                                  </div>
                                </div>
                              )}

                              {selectedAdminOrder.escrowStatus !== 'held' && (
                                <div className="p-3 bg-zinc-50 border border-zinc-100 rounded-xl space-y-1.5 text-center">
                                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Escrow Cycle Completed</p>
                                  <p className="text-[10px] text-zinc-400 font-medium">
                                    The financial settlement ledger has been cryptographically sealed and locked. No further modifications can be written.
                                  </p>
                                  <button
                                    onClick={() => {
                                      AutoNovaAudio.playSuccess();
                                      showNotification("Sovereign Cryptographic Receipt downloaded successfully.", "success");
                                    }}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-700 rounded-lg text-[9px] font-mono font-bold uppercase cursor-pointer"
                                  >
                                    <Download className="h-3.5 w-3.5 text-teal-800" />
                                    <span>Download Certificate</span>
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Audit Notes */}
                            <div className="space-y-1.5 border-t border-zinc-100 pt-4">
                              <h4 className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-wider text-left">Administrative Journal</h4>
                              <div className="p-3 bg-zinc-50/50 rounded-xl border border-zinc-100 font-sans text-[10.5px] font-medium text-zinc-500 text-left leading-relaxed">
                                {selectedAdminOrder.notes || "No administrative journal logs recorded on this escrow node. Use milestone timeline state adjustments to sync entries."}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-white border border-zinc-200/50 rounded-2xl p-8 shadow-sm text-center space-y-3.5 flex flex-col items-center justify-center min-h-[400px]">
                            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center">
                              <ShoppingBag className="h-6 w-6" />
                            </div>
                            <div className="max-w-xs space-y-1 text-center">
                              <h3 className="font-display text-sm font-extrabold text-teal-950 uppercase tracking-tight">Sovereign Clearing Ledger</h3>
                              <p className="text-[10.5px] text-zinc-400 font-semibold leading-relaxed">
                                Select an active order or escrow contract from the registry table to inspect log diagnostics, release transactions, or update logistics milestones.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB: AI INSIGHTS */}
                {activeTab === 'insights' && (
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="border-b border-zinc-100 pb-3 flex flex-col md:flex-row md:items-end justify-between gap-4">
                      <div className="text-left">
                        <h2 className="font-display text-base font-extrabold text-teal-950">AI Insights & Assistant Desk</h2>
                        <p className="text-xs text-zinc-500 font-medium">Supervise chatbot telemetry, analyze intent trends, adjust valuation parameters, and review flagged AI model answers.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            showNotification("Initiating model weight sync and training loss parameter updates...", "info");
                            setTimeout(() => {
                              AutoNovaAudio.playSuccess();
                              showNotification("Chatbot neural weights and compliance index synced successfully.", "success");
                            }, 1500);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-2 border border-teal-850 bg-teal-950 hover:bg-teal-900 text-white rounded-xl font-mono text-[8.5px] font-bold uppercase cursor-pointer transition-colors"
                        >
                          <Sparkles className="h-3.5 w-3.5 text-teal-400 animate-pulse" />
                          <span>Sync Neural Weights</span>
                        </button>
                      </div>
                    </div>

                    {/* Operational Banner */}
                    <div className="relative overflow-hidden rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between text-white shadow-md bg-gradient-to-r from-teal-950 via-teal-900 to-teal-800 border border-teal-850">
                      <div className="relative z-10 flex items-center gap-3.5 text-left">
                        <div className="relative">
                          <span className="absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75 animate-ping" />
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                        </div>
                        <div>
                          <h3 className="font-display text-sm font-bold leading-tight">AI Assistant Status: Operational</h3>
                          <p className="text-[10.5px] text-zinc-300 font-medium leading-relaxed">Model health indexes verified. Gateway response latencies within secure tolerances.</p>
                        </div>
                      </div>
                      <div className="relative z-10 flex items-center gap-5 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-white/10 sm:pl-5 font-mono text-left">
                        <div>
                          <p className="text-[8px] font-black text-teal-400 uppercase tracking-widest leading-none">Uptime Meter</p>
                          <p className="text-sm font-extrabold text-white mt-1">99.998%</p>
                        </div>
                        <div>
                          <p className="text-[8px] font-black text-teal-400 uppercase tracking-widest leading-none">Node Region</p>
                          <p className="text-sm font-extrabold text-white mt-1">US-EAST-1</p>
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
                    </div>

                    {/* KPI Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* KPI 1 */}
                      <div className="p-4 bg-white border border-zinc-200/60 rounded-2xl shadow-sm space-y-2 group hover:border-teal-700/35 transition-colors cursor-help relative text-left">
                        <div className="flex items-center justify-between text-zinc-400">
                          <span className="text-[10px] font-bold uppercase tracking-wider">Thumbs Up/Down Ratio</span>
                          <ThumbsUp className="h-4 w-4 text-teal-600" />
                        </div>
                        <div className="flex items-baseline gap-2">
                          <h3 className="font-display text-xl font-black text-teal-950">94.2%</h3>
                          <span className="text-[9px] font-mono text-emerald-600 font-bold bg-emerald-50 px-1 py-0.5 rounded">↑ 1.2%</span>
                        </div>
                        <p className="text-[9px] text-zinc-400 font-medium">9.4k positive ratings vs. 580 complaints</p>
                        
                        {/* Hover Tooltip Details */}
                        <div className="absolute inset-x-0 bottom-full mb-2 bg-zinc-950 text-white text-[10px] p-2.5 rounded-xl shadow-lg border border-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 space-y-1">
                          <p className="font-bold border-b border-white/10 pb-1">Feedback Breakdown</p>
                          <p>• Accuracy: 97.4%</p>
                          <p>• Tone &amp; Style: 93.8%</p>
                          <p>• Issue Escalations: 2.1%</p>
                        </div>
                      </div>

                      {/* KPI 2 */}
                      <div className="p-4 bg-white border border-zinc-200/60 rounded-2xl shadow-sm space-y-2 group hover:border-teal-700/35 transition-colors cursor-help relative text-left">
                        <div className="flex items-center justify-between text-zinc-400">
                          <span className="text-[10px] font-bold uppercase tracking-wider">Avg Response Time</span>
                          <Cpu className="h-4 w-4 text-amber-600" />
                        </div>
                        <div className="flex items-baseline gap-2">
                          <h3 className="font-display text-xl font-black text-teal-950">0.8s</h3>
                          <span className="text-[9px] font-mono text-emerald-600 font-bold bg-emerald-50 px-1 py-0.5 rounded">↓ 0.1s</span>
                        </div>
                        <p className="text-[9px] text-zinc-400 font-medium">Core inference lag across 3 hosting zones</p>

                        {/* Hover Tooltip Sparkline Graph */}
                        <div className="absolute inset-x-0 bottom-full mb-2 bg-zinc-950 text-white text-[10px] p-3 rounded-xl shadow-lg border border-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 space-y-2">
                          <p className="font-bold border-b border-white/10 pb-0.5">Inference Lag Sparkline</p>
                          <div className="h-8 flex items-end gap-1.5 pt-1">
                            {[0.9, 0.85, 0.95, 0.8, 0.78, 0.82, 0.8, 0.79, 0.83, 0.8].map((val, i) => (
                              <div key={i} className="flex-1 bg-amber-500 rounded-t animate-pulse" style={{ height: `${val * 100 - 45}%` }} title={`${val}s`} />
                            ))}
                          </div>
                          <div className="flex justify-between text-[8px] text-zinc-500">
                            <span>12:00</span>
                            <span>Now</span>
                          </div>
                        </div>
                      </div>

                      {/* KPI 3 */}
                      <div className="p-4 bg-white border border-zinc-200/60 rounded-2xl shadow-sm space-y-2 group hover:border-teal-700/35 transition-colors cursor-help relative text-left">
                        <div className="flex items-center justify-between text-zinc-400">
                          <span className="text-[10px] font-bold uppercase tracking-wider">Escalation Rate</span>
                          <TrendingUp className="h-4 w-4 text-purple-600" />
                        </div>
                        <div className="flex items-baseline gap-2">
                          <h3 className="font-display text-xl font-black text-teal-950">2.1%</h3>
                          <span className="text-[9px] font-mono text-zinc-400 font-bold bg-zinc-50 px-1 py-0.5 rounded">± 0.0%</span>
                        </div>
                        <p className="text-[9px] text-zinc-400 font-medium">12 chats transferred to active humans today</p>

                        {/* Hover Tooltip Details */}
                        <div className="absolute inset-x-0 bottom-full mb-2 bg-zinc-950 text-white text-[10px] p-2.5 rounded-xl shadow-lg border border-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 space-y-1">
                          <p className="font-bold border-b border-white/10 pb-1">Hot Escalations (Today)</p>
                          <p>• Buyer Okafor: Sensor complaint</p>
                          <p>• Seller Balogun: Custom invoice</p>
                          <p>• Trader Aminu: Escrow dispute</p>
                        </div>
                      </div>
                    </div>

                    {/* Split Charts & Intents Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Left Block: Conversation Volume Area Chart */}
                      <div className="lg:col-span-8 bg-white border border-zinc-200/50 rounded-2xl p-6 shadow-sm space-y-4 text-left">
                        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                          <div>
                            <h4 className="font-display text-sm font-bold text-teal-950">Conversation Volume</h4>
                            <p className="text-[10px] text-zinc-400 font-medium">Volume of active client messages handled by AI nodes</p>
                          </div>
                          
                          {/* Selector */}
                          <div className="flex bg-zinc-100 p-0.5 rounded-xl border border-zinc-200/40">
                            {[
                              { id: '30days', label: '30 Days' },
                              { id: '7days', label: '7 Days' },
                              { id: '24hours', label: '24 Hours' }
                            ].map(item => (
                              <button
                                key={item.id}
                                onClick={() => { AutoNovaAudio.playClick(); setInsightsTimeframe(item.id); }}
                                className={`px-2.5 py-1 text-[9px] font-bold rounded-lg cursor-pointer transition-all ${
                                  insightsTimeframe === item.id 
                                    ? 'bg-teal-950 text-white font-black shadow-sm' 
                                    : 'text-zinc-500 hover:text-zinc-800'
                                }`}
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Chart Area */}
                        <div className="h-56 w-full relative pt-4">
                          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 900 200">
                            <defs>
                              <linearGradient id="chartGradientTeal" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#006875" stopOpacity="0.25" />
                                <stop offset="100%" stopColor="#006875" stopOpacity="0" />
                              </linearGradient>
                            </defs>

                            {/* Grid Lines */}
                            <line x1="0" y1="50" x2="900" y2="50" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                            <line x1="0" y1="100" x2="900" y2="100" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                            <line x1="0" y1="150" x2="900" y2="150" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                            <line x1="0" y1="200" x2="900" y2="200" stroke="#e2e8f0" strokeWidth="1" />

                            {/* Dynamically Swapped Curved Gradient Area */}
                            <path 
                              d={
                                insightsTimeframe === '30days' 
                                  ? "M 50,150 Q 250,110 450,70 T 650,90 T 850,40 L 850,200 L 50,200 Z"
                                  : insightsTimeframe === '7days'
                                  ? "M 50,110 Q 180,130 310,90 T 440,60 T 570,70 T 700,120 T 850,100 L 850,200 L 50,200 Z"
                                  : "M 50,150 L 210,180 L 370,110 L 530,40 L 690,70 L 850,90 L 850,200 L 50,200 Z"
                              } 
                              fill="url(#chartGradientTeal)" 
                              className="transition-all duration-500 ease-in-out"
                            />

                            {/* Dynamically Swapped Stroke Line */}
                            <path 
                              d={
                                insightsTimeframe === '30days'
                                  ? "M 50,150 Q 250,110 450,70 T 650,90 T 850,40"
                                  : insightsTimeframe === '7days'
                                  ? "M 50,110 Q 180,130 310,90 T 440,60 T 570,70 T 700,120 T 850,100"
                                  : "M 50,150 L 210,180 L 370,110 L 530,40 L 690,70 L 850,90"
                              } 
                              fill="none" 
                              stroke="#006875" 
                              strokeWidth="3" 
                              className="transition-all duration-500 ease-in-out"
                            />
                          </svg>

                          {/* Hoverable Interactive Dots Overlay */}
                          <div className="absolute inset-0 pointer-events-auto">
                            {(insightsTimeframe === '30days'
                              ? [
                                  { x: 5.5, y: 25, label: "May 01", value: "420 chats" },
                                  { x: 27.7, y: 45, label: "May 07", value: "680 chats" },
                                  { x: 50, y: 65, label: "May 14", value: "1,100 chats" },
                                  { x: 72.2, y: 55, label: "May 21", value: "950 chats" },
                                  { x: 94.4, y: 80, label: "May 28", value: "1,420 chats" }
                                ]
                              : insightsTimeframe === '7days'
                              ? [
                                  { x: 5.5, y: 45, label: "Mon", value: "800 chats" },
                                  { x: 20, y: 35, label: "Tue", value: "650 chats" },
                                  { x: 34.4, y: 55, label: "Wed", value: "950 chats" },
                                  { x: 48.8, y: 70, label: "Thu", value: "1,200 chats" },
                                  { x: 63.3, y: 65, label: "Fri", value: "1,100 chats" },
                                  { x: 77.7, y: 40, label: "Sat", value: "700 chats" },
                                  { x: 94.4, y: 50, label: "Sun", value: "850 chats" }
                                ]
                              : [
                                  { x: 5.5, y: 25, label: "00:00", value: "300 chats" },
                                  { x: 23.3, y: 10, label: "04:00", value: "150 chats" },
                                  { x: 41.1, y: 45, label: "08:00", value: "550 chats" },
                                  { x: 58.8, y: 80, label: "12:00", value: "1,200 chats" },
                                  { x: 76.6, y: 65, label: "16:00", value: "950 chats" },
                                  { x: 94.4, y: 55, label: "20:00", value: "800 chats" }
                                ]
                            ).map((node, nIdx) => (
                              <div
                                key={nIdx}
                                style={{ left: `${node.x}%`, bottom: `${node.y}%` }}
                                className="absolute group/node -translate-x-1/2 translate-y-1/2 z-10 cursor-pointer"
                              >
                                <button className="w-3.5 h-3.5 rounded-full bg-white border-2 border-teal-700 shadow-sm transition-transform hover:scale-150 cursor-pointer" />
                                
                                {/* Node Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-zinc-950 text-white text-[9.5px] p-2 rounded-xl shadow-lg border border-zinc-800 opacity-0 group-hover/node:opacity-100 transition-all duration-200 pointer-events-none w-24 text-center z-30">
                                  <p className="font-bold text-teal-400">{node.label}</p>
                                  <p className="font-semibold text-[9px]">{node.value}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Timeframe Axis */}
                          <div className="absolute bottom-0 w-full flex justify-between text-[8px] font-mono font-bold text-zinc-400 uppercase pt-2 select-none">
                            {insightsTimeframe === '30days' ? (
                              <><span>May 01</span><span>May 07</span><span>May 14</span><span>May 21</span><span>May 28</span></>
                            ) : insightsTimeframe === '7days' ? (
                              <><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></>
                            ) : (
                              <><span>00:00</span><span>04:00</span><span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span></>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Block: Top User Intents */}
                      <div className="lg:col-span-4 bg-white border border-zinc-200/50 rounded-2xl p-6 shadow-sm space-y-5 text-left">
                        <div>
                          <h4 className="font-display text-sm font-bold text-teal-950">Top User Intents</h4>
                          <p className="text-[10px] text-zinc-400 font-medium">Main categories of AI client requests</p>
                        </div>

                        <div className="space-y-4 pt-1">
                          {[
                            { label: "Buy Vehicle Catalog", pct: 42, color: "bg-teal-700", details: "Average 4.2 mins. Highly converted." },
                            { label: "Sell Vehicle / Escrow", pct: 28, color: "bg-amber-600", details: "Title verification queries mostly." },
                            { label: "Financing & Valuation", pct: 18, color: "bg-purple-600", details: "Calculator and interest rate queries." },
                            { label: "Technical App Support", pct: 12, color: "bg-zinc-500", details: "Password resets & 2FA handshakes." }
                          ].map((intent, iIdx) => (
                            <div key={iIdx} className="space-y-1.5 group cursor-help relative">
                              <div className="flex justify-between text-xs">
                                <span className="font-bold text-zinc-700 group-hover:text-teal-950 transition-colors">{intent.label}</span>
                                <span className="font-mono font-bold text-teal-950">{intent.pct}%</span>
                              </div>
                              <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden">
                                <div className={`h-full rounded-full transition-all duration-1000 ${intent.color}`} style={{ width: `${intent.pct}%` }} />
                              </div>
                              
                              {/* Hover details */}
                              <div className="absolute inset-x-0 bottom-full mb-1 bg-zinc-900 text-white text-[9px] p-2 rounded-lg shadow border border-zinc-800 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20">
                                <p className="font-bold">{intent.label} Details</p>
                                <p className="text-zinc-400">{intent.details}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Funnel & Scatter Plot Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* AI Conversion Funnel */}
                      <div className="lg:col-span-6 bg-white border border-zinc-200/50 rounded-2xl p-6 shadow-sm space-y-4 text-left">
                        <div>
                          <h4 className="font-display text-sm font-bold text-teal-950">AI Conversion Funnel</h4>
                          <p className="text-[10px] text-zinc-400 font-medium">Conversion from initial chatbot contact to showroom purchase</p>
                        </div>

                        <div className="flex flex-col gap-1 pt-2">
                          {[
                            { stage: "Chat Session Started", val: "12,402", rate: "100%", width: "w-full", bg: "bg-teal-950 text-white" },
                            { stage: "Car Catalog Viewed", val: "9,177", rate: "74% CV", width: "w-[90%]", bg: "bg-teal-900 text-teal-50" },
                            { stage: "Test Drive Booked", val: "2,019", rate: "22% CV", width: "w-[80%]", bg: "bg-teal-800 text-teal-100" },
                            { stage: "Sovereign Purchase", val: "161", rate: "8% CV", width: "w-[70%]", bg: "bg-teal-700 text-teal-200" }
                          ].map((stage, sIdx) => (
                            <div key={sIdx} className="flex flex-col items-center">
                              {sIdx > 0 && (
                                <div className="flex flex-col items-center py-1">
                                  <div className="h-4 w-[1px] bg-zinc-200" />
                                </div>
                              )}
                              <div className={`relative h-11 flex items-center justify-between px-4 rounded-xl border border-zinc-200/30 shadow-sm mx-auto transition-transform hover:scale-[1.02] cursor-help group/funnel ${stage.width} ${stage.bg}`}>
                                <div className="font-bold text-[11px] flex items-center gap-2">
                                  <span className="font-mono text-[9px] opacity-75">{sIdx + 1}</span>
                                  <span>{stage.stage}</span>
                                </div>
                                <div className="text-right flex items-center gap-3">
                                  <span className="text-xs font-black font-mono">{stage.val}</span>
                                  <span className="text-[9.5px] font-bold bg-white/10 px-1.5 py-0.5 rounded-md font-mono">{stage.rate}</span>
                                </div>

                                {/* Custom Funnel Tooltip */}
                                <div className="absolute inset-x-0 bottom-full mb-1.5 bg-zinc-950 text-white text-[10px] p-2.5 rounded-xl shadow-lg border border-zinc-800 opacity-0 group-hover/funnel:opacity-100 transition-opacity pointer-events-none z-20 text-center leading-relaxed">
                                  <p className="font-bold text-teal-400 mb-0.5">{stage.stage}</p>
                                  <p className="text-[9px] text-zinc-300">Conversion efficiency rating is highly optimized. Industry average benchmark is {sIdx === 1 ? '60%' : sIdx === 2 ? '15%' : '5%'}.</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Valuation Accuracy Scatter Plot */}
                      <div className="lg:col-span-6 bg-white border border-zinc-200/50 rounded-2xl p-6 shadow-sm space-y-4 text-left">
                        <div>
                          <h4 className="font-display text-sm font-bold text-teal-950">Valuation Accuracy Matrix</h4>
                          <p className="text-[10px] text-zinc-400 font-medium">Real-time model estimations vs actual final cleared transaction prices</p>
                        </div>

                        {/* Chart Stage */}
                        <div className="h-56 w-full border-l border-b border-zinc-200 relative overflow-hidden bg-zinc-50/25 rounded-bl">
                          
                          {/* Grid Lines Overlay */}
                          <div className="absolute inset-0 grid grid-rows-4 grid-cols-4 pointer-events-none">
                            {[...Array(4)].map((_, i) => <div key={`r-${i}`} className="border-t border-zinc-200/45 w-full h-full" />)}
                          </div>
                          
                          {/* Perfect Estimate Trend Line */}
                          <div className="absolute w-[140%] h-[1.5px] bg-teal-800/15 rotate-[-45deg] top-[50%] left-[-20%] pointer-events-none" />

                          {/* Dots coordinates */}
                          {[
                            { id: '9921', name: 'Lucid Air Sapphire', aiEstimate: 245000, actualPrice: 249000, diff: '+1.6%', category: 'luxury', x: 25, y: 75 },
                            { id: '8104', name: 'Tesla Model S Plaid', aiEstimate: 95000, actualPrice: 92000, diff: '-3.1%', category: 'luxury', x: 45, y: 50 },
                            { id: '4421', name: 'Audi e-tron GT', aiEstimate: 112000, actualPrice: 110000, diff: '-1.8%', category: 'luxury', x: 38, y: 40 },
                            { id: '7238', name: 'Porsche Taycan 4S', aiEstimate: 125000, actualPrice: 128000, diff: '+2.4%', category: 'luxury', x: 55, y: 60 },
                            { id: '2105', name: 'Mercedes EQS SUV', aiEstimate: 104000, actualPrice: 105000, diff: '+0.9%', category: 'suv', x: 30, y: 35 },
                            { id: '5561', name: 'Rivian R1S Launch', aiEstimate: 89000, actualPrice: 87500, diff: '-1.7%', category: 'suv', x: 20, y: 20 },
                            { id: '3029', name: 'BMW iX M60', aiEstimate: 115000, actualPrice: 118000, diff: '+2.6%', category: 'suv', x: 65, y: 70 },
                            { id: '1148', name: 'Hummer EV Edition 1', aiEstimate: 110000, actualPrice: 115000, diff: '+4.5%', category: 'suv', x: 75, y: 80 },
                            { id: '6033', name: 'Ford F-150 Lightning', aiEstimate: 82000, actualPrice: 80000, diff: '-2.4%', category: 'suv', x: 80, y: 15 }
                          ].map((pt) => (
                            <button
                              key={pt.id}
                              style={{ left: `${pt.x}%`, bottom: `${pt.y}%` }}
                              onMouseEnter={() => { AutoNovaAudio.playClick(); setHoveredScatterPoint(pt); }}
                              onMouseLeave={() => setHoveredScatterPoint(null)}
                              onClick={() => {
                                AutoNovaAudio.playSuccess();
                                showNotification(`Selected Valuation Node #${pt.id}: ${pt.name} deviation is ${pt.diff}.`, "info");
                              }}
                              className={`absolute -translate-x-1/2 translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-white cursor-pointer shadow-sm transition-all duration-200 hover:scale-[1.6] hover:z-30 ${
                                pt.category === 'luxury' ? 'bg-teal-700' : 'bg-amber-500'
                              }`}
                              title={pt.name}
                            />
                          ))}

                          {/* Scatter Tooltip overlay */}
                          {hoveredScatterPoint && (
                            <div className="absolute top-3 right-3 bg-zinc-950 text-white text-[10px] p-3 rounded-xl shadow-lg border border-zinc-800 z-30 max-w-[200px] pointer-events-none space-y-1">
                              <p className="font-bold border-b border-white/10 pb-1 text-teal-400 truncate text-left">{hoveredScatterPoint.name}</p>
                              <p className="font-mono text-zinc-300 text-left">ID: #{hoveredScatterPoint.id}</p>
                              <p className="text-left">AI Estimate: <span className="font-bold font-mono">${hoveredScatterPoint.aiEstimate.toLocaleString()}</span></p>
                              <p className="text-left">Actual Price: <span className="font-bold font-mono">${hoveredScatterPoint.actualPrice.toLocaleString()}</span></p>
                              <p className="text-left">Deviation: <span className={`font-black ${hoveredScatterPoint.diff.startsWith('+') ? 'text-amber-400' : 'text-teal-400'}`}>{hoveredScatterPoint.diff}</span></p>
                            </div>
                          )}

                          <div className="absolute bottom-1 right-2 text-[8px] font-bold text-zinc-400 uppercase select-none font-mono font-bold">Actual Price →</div>
                          <div className="absolute top-2 left-2 text-[8px] font-bold text-zinc-400 uppercase select-none font-mono tracking-wider font-bold" style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>← AI Valuation</div>
                        </div>

                        {/* Legend */}
                        <div className="flex gap-4 text-[9px] font-bold text-zinc-500 justify-end pt-1">
                          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-teal-700 border border-white" /> Luxury Sedans</div>
                          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-white" /> Utility SUVs</div>
                        </div>
                      </div>
                    </div>

                    {/* Flagged AI Responses Section */}
                    <div className="bg-white border border-zinc-200/50 rounded-2xl shadow-sm overflow-hidden space-y-4">
                      {/* Section Title & Filters */}
                      <div className="px-6 py-4 border-b border-zinc-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-left">
                          <h4 className="font-display text-sm font-extrabold text-teal-950 uppercase tracking-tight">Flagged Chatbot Queries Registry</h4>
                          <p className="text-[11px] text-zinc-400 font-medium">Verify chatbot responses flagged by system triggers or user compliance ratings.</p>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Search */}
                          <div className="relative">
                            <input 
                              type="text" 
                              placeholder="Search flags..." 
                              value={flaggedResponsesSearch}
                              onChange={(e) => { setFlaggedResponsesSearch(e.target.value); setFlaggedResponsesPage(1); }}
                              className="px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-[11px] font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700 transition-all w-44"
                            />
                          </div>

                          {/* Reason Filter */}
                          <select 
                            value={flaggedResponsesFilter}
                            onChange={(e) => { AutoNovaAudio.playClick(); setFlaggedResponsesFilter(e.target.value); setFlaggedResponsesPage(1); }}
                            className="bg-zinc-50 border border-zinc-200 rounded-lg text-[11px] font-bold text-zinc-600 py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-teal-700 cursor-pointer"
                          >
                            <option value="All">All Reasons</option>
                            <option value="Retraining Required">Retraining Required</option>
                            <option value="Fact Check Needed">Fact Check Needed</option>
                            <option value="Tone Issue">Tone Issue</option>
                            <option value="Policy Violation">Policy Violation</option>
                          </select>
                        </div>
                      </div>

                      {/* Table / List Container */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                              <th className="p-4 w-[130px]">Timestamp</th>
                              <th className="p-4 w-1/4">User Query</th>
                              <th className="p-4 w-1/3">Chatbot Response</th>
                              <th className="p-4 w-[160px]">Flag Reason / Notes</th>
                              <th className="p-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-100 font-medium text-zinc-600">
                            {(() => {
                              // Filter
                              const filtered = flaggedResponses.filter(fr => {
                                const matchesSearch = fr.query.toLowerCase().includes(flaggedResponsesSearch.toLowerCase()) ||
                                  fr.response.toLowerCase().includes(flaggedResponsesSearch.toLowerCase()) ||
                                  fr.id.toLowerCase().includes(flaggedResponsesSearch.toLowerCase());
                                const matchesFilter = flaggedResponsesFilter === 'All' || fr.reason === flaggedResponsesFilter;
                                return matchesSearch && matchesFilter;
                              });

                              const totalItems = filtered.length;
                              const itemsPerPage = 5;
                              const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
                              
                              // Cap current page
                              const activePage = Math.min(flaggedResponsesPage, totalPages);
                              const paginated = filtered.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

                              if (paginated.length === 0) {
                                return (
                                  <tr>
                                    <td colSpan={5} className="p-8 text-center text-zinc-400 italic font-medium">
                                      No matching flagged response nodes found in registry logs.
                                    </td>
                                  </tr>
                                );
                              }

                              return paginated.map((fr) => {
                                const isRetraining = retrainingItem === fr.id;
                                const isEditing = editingItem === fr.id;
                                const isResolved = fr.status === 'Approved' || fr.status === 'Resolved' || fr.status === 'Corrected';

                                return (
                                  <React.Fragment key={fr.id}>
                                    <tr className={`hover:bg-zinc-50/40 transition-colors ${isResolved ? 'bg-zinc-50/20 opacity-60' : ''}`}>
                                      <td className="p-4 space-y-1 text-left font-sans">
                                        <p className="font-mono text-[10px] text-zinc-400 leading-none">{fr.timestamp}</p>
                                        <p className="font-mono text-[9px] font-bold text-teal-900 leading-none mt-1">{fr.id}</p>
                                        {isResolved && (
                                          <span className="inline-flex items-center gap-1 text-[8px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded uppercase font-mono mt-1">
                                            ✓ resolved
                                          </span>
                                        )}
                                      </td>
                                      
                                      <td className="p-4 text-left font-sans">
                                        <p className="font-sans text-[11px] font-bold text-zinc-800 leading-relaxed italic">
                                          "{fr.query}"
                                        </p>
                                      </td>
                                      
                                      <td className="p-4 text-left font-sans">
                                        <p className="font-sans text-[11.5px] leading-relaxed text-zinc-600">
                                          "{fr.response}"
                                        </p>
                                      </td>
                                      
                                      <td className="p-4 space-y-1.5 text-left font-sans">
                                        <div>
                                          <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                            fr.reason === 'Retraining Required' ? 'bg-amber-50 text-amber-800 border border-amber-200/50' :
                                            fr.reason === 'Fact Check Needed' ? 'bg-blue-50 text-blue-800 border border-blue-250/30' :
                                            fr.reason === 'Tone Issue' ? 'bg-purple-50 text-purple-800 border border-purple-200/30' :
                                            'bg-red-50 text-red-800 border border-red-200/30'
                                          }`}>
                                            {fr.reason}
                                          </span>
                                        </div>
                                        <p className="text-[10px] text-zinc-400 font-semibold leading-relaxed">
                                          {fr.notes}
                                        </p>
                                      </td>
                                      
                                      <td className="p-4 text-right font-sans">
                                        {isResolved ? (
                                          <span className="text-[10px] font-mono font-extrabold text-emerald-600 uppercase">Sealed in model</span>
                                        ) : isRetraining ? (
                                          <div className="w-32 inline-block text-left space-y-1">
                                            <div className="flex justify-between text-[8px] font-mono font-bold text-teal-800">
                                              <span>RETRAINING...</span>
                                              <span>{retrainingProgress}%</span>
                                            </div>
                                            <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                                              <div className="bg-teal-700 h-full rounded-full" style={{ width: `${retrainingProgress}%` }} />
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="flex justify-end items-center gap-1.5">
                                            {/* Approve */}
                                            <button
                                              onClick={() => {
                                                AutoNovaAudio.playSuccess();
                                                setFlaggedResponses(prev => prev.map(item => item.id === fr.id ? { ...item, status: 'Approved' } : item));
                                                showNotification(`AI Response approved as safe/correct. Feedback node marked as resolved.`, "success");
                                                setTradeLedger(prev => [
                                                  { id: `tx-${Math.floor(Math.random() * 9000) + 1000}`, time: new Date().toTimeString().split(' ')[0], text: `Approved flagged AI Response reference ${fr.id}`, type: 'system' },
                                                  ...prev
                                                ]);
                                              }}
                                              title="Approve Response"
                                              className="p-1.5 border border-zinc-200 hover:border-emerald-600 hover:bg-emerald-50 text-zinc-500 hover:text-emerald-700 rounded-lg cursor-pointer transition-colors"
                                            >
                                              <Check className="h-3.5 w-3.5" />
                                            </button>
                                            
                                            {/* Retrain */}
                                            <button
                                              onClick={() => {
                                                AutoNovaAudio.playClick();
                                                setRetrainingItem(fr.id);
                                                setRetrainingProgress(0);
                                                let p = 0;
                                                const iv = setInterval(() => {
                                                  p += 20;
                                                  setRetrainingProgress(p);
                                                  if (p >= 100) {
                                                    clearInterval(iv);
                                                    setTimeout(() => {
                                                      setFlaggedResponses(prev => prev.map(item => item.id === fr.id ? { ...item, status: 'Resolved' } : item));
                                                      setRetrainingItem(null);
                                                      AutoNovaAudio.playSuccess();
                                                      showNotification(`Chatbot response weights successfully retrained for item ${fr.id}`, "success");
                                                    }, 300);
                                                  }
                                                }, 150);
                                              }}
                                              title="Trigger Inline Retrain"
                                              className="p-1.5 border border-zinc-200 hover:border-teal-700 hover:bg-teal-50 text-zinc-500 hover:text-teal-800 rounded-lg cursor-pointer transition-colors"
                                            >
                                              <Brain className="h-3.5 w-3.5" />
                                            </button>

                                            {/* Correct Edit */}
                                            <button
                                              onClick={() => {
                                                AutoNovaAudio.playClick();
                                                setEditingItem(fr.id);
                                                setEditingResponseText(fr.response);
                                              }}
                                              title="Edit AI Answer"
                                              className="p-1.5 border border-zinc-200 hover:border-amber-600 hover:bg-amber-50 text-zinc-500 hover:text-amber-700 rounded-lg cursor-pointer transition-colors"
                                            >
                                              <Terminal className="h-3.5 w-3.5" />
                                            </button>
                                          </div>
                                        )}
                                      </td>
                                    </tr>

                                    {/* Inline Editing Row */}
                                    {isEditing && (
                                      <tr className="bg-zinc-50/50">
                                        <td colSpan={5} className="p-4 border-t border-b border-zinc-200/50">
                                          <div className="space-y-3 max-w-2xl text-left">
                                            <div className="flex justify-between items-center">
                                              <h5 className="text-[10px] font-black text-teal-950 uppercase tracking-wider flex items-center gap-1">
                                                <Terminal className="h-3.5 w-3.5 text-teal-600" />
                                                <span>Write Correct Model Answer For Weights Injection</span>
                                              </h5>
                                              <button 
                                                onClick={() => { AutoNovaAudio.playClick(); setEditingItem(null); }}
                                                className="text-[9px] font-mono font-bold text-zinc-400 hover:text-zinc-600 uppercase"
                                              >
                                                Dismiss
                                              </button>
                                            </div>

                                            <div className="space-y-2">
                                              <p className="text-[10px] text-zinc-400">User's Question: <span className="text-zinc-700 font-bold">"{fr.query}"</span></p>
                                              <textarea 
                                                value={editingResponseText}
                                                onChange={(e) => setEditingResponseText(e.target.value)}
                                                placeholder="Provide the ideal compliant chatbot answer..."
                                                rows={3}
                                                className="w-full p-2.5 bg-white border border-zinc-200 rounded-xl text-[11px] font-medium text-zinc-700 focus:outline-none focus:ring-1 focus:ring-teal-700 outline-none resize-none"
                                              />
                                            </div>

                                            <div className="flex gap-2 justify-end">
                                              <button
                                                onClick={() => { AutoNovaAudio.playClick(); setEditingItem(null); }}
                                                className="px-3 py-1.5 border border-zinc-250 text-zinc-600 rounded-lg text-[9px] font-mono font-bold uppercase cursor-pointer bg-white hover:bg-zinc-50"
                                              >
                                                Cancel
                                              </button>
                                              <button
                                                onClick={() => {
                                                  if (!editingResponseText.trim()) {
                                                    AutoNovaAudio.playError();
                                                    showNotification("Corrected response cannot be empty.", "error");
                                                    return;
                                                  }
                                                  AutoNovaAudio.playSuccess();
                                                  setFlaggedResponses(prev => prev.map(item => item.id === fr.id ? { ...item, response: editingResponseText, status: 'Corrected' } : item));
                                                  setEditingItem(null);
                                                  showNotification(`Corrected model feedback weight submitted for ${fr.id}`, "success");
                                                }}
                                                className="px-3 py-1.5 bg-teal-950 hover:bg-teal-900 text-white rounded-lg text-[9px] font-mono font-bold uppercase cursor-pointer"
                                              >
                                                Submit to Retraining Pipeline
                                              </button>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    )}
                                  </React.Fragment>
                                );
                              });
                            })()}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination Controls Footer */}
                      {(() => {
                        const filtered = flaggedResponses.filter(fr => {
                          const matchesSearch = fr.query.toLowerCase().includes(flaggedResponsesSearch.toLowerCase()) ||
                            fr.response.toLowerCase().includes(flaggedResponsesSearch.toLowerCase()) ||
                            fr.id.toLowerCase().includes(flaggedResponsesSearch.toLowerCase());
                          const matchesFilter = flaggedResponsesFilter === 'All' || fr.reason === flaggedResponsesFilter;
                          return matchesSearch && matchesFilter;
                        });

                        const totalItems = filtered.length;
                        const itemsPerPage = 5;
                        const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
                        const activePage = Math.min(flaggedResponsesPage, totalPages);

                        return (
                          <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono">
                              Showing {totalItems === 0 ? 0 : (activePage - 1) * itemsPerPage + 1}-{Math.min(activePage * itemsPerPage, totalItems)} of {totalItems} flagged items
                            </span>

                            {totalPages > 1 && (
                              <div className="flex gap-1.5 select-none">
                                <button 
                                  onClick={() => {
                                    if (activePage > 1) {
                                      AutoNovaAudio.playClick();
                                      setFlaggedResponsesPage(activePage - 1);
                                    }
                                  }}
                                  disabled={activePage === 1}
                                  className="w-8 h-8 flex items-center justify-center rounded border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                                >
                                  ←
                                </button>
                                
                                {[...Array(totalPages)].map((_, idx) => {
                                  const pageNum = idx + 1;
                                  return (
                                    <button
                                      key={pageNum}
                                      onClick={() => {
                                        AutoNovaAudio.playClick();
                                        setFlaggedResponsesPage(pageNum);
                                      }}
                                      className={`w-8 h-8 flex items-center justify-center rounded text-xs font-bold transition-all cursor-pointer ${
                                        activePage === pageNum 
                                          ? 'bg-teal-950 text-white font-black' 
                                          : 'border border-zinc-250 bg-white hover:bg-zinc-50 text-zinc-600'
                                      }`}
                                    >
                                      {pageNum}
                                    </button>
                                  );
                                })}

                                <button 
                                  onClick={() => {
                                    if (activePage < totalPages) {
                                      AutoNovaAudio.playClick();
                                      setFlaggedResponsesPage(activePage + 1);
                                    }
                                  }}
                                  disabled={activePage === totalPages}
                                  className="w-8 h-8 flex items-center justify-center rounded border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                                >
                                  →
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>

                    {/* A/B Testing Panel — previously missing entirely */}
                    <div className="bg-white p-5 rounded-2xl border border-zinc-200/60 shadow-sm">
                      <h3 className="font-display font-black text-xs text-teal-950 uppercase tracking-wider mb-4">Prompt A/B Test — Recommendation Tone</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { label: 'Variant A: Concise', desc: 'Short, direct recommendations with minimal explanation.', conversion: 14.2, satisfaction: 82 },
                          { label: 'Variant B: Detailed', desc: 'Fuller reasoning with comparative context per suggestion.', conversion: 18.6, satisfaction: 91 },
                        ].map((v, i) => (
                          <div key={v.label} className={`p-4 rounded-xl border ${i === 1 ? 'border-teal-300 bg-teal-50/30' : 'border-zinc-200 bg-zinc-50/40'}`}>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-xs font-bold text-teal-950">{v.label}</h4>
                              {i === 1 && <span className="font-mono text-[8px] font-black text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">LEADING</span>}
                            </div>
                            <p className="text-[10px] text-zinc-500 font-medium mb-3">{v.desc}</p>
                            <div className="space-y-2">
                              <div className="flex justify-between text-[10px] font-mono font-bold uppercase">
                                <span className="text-zinc-400">Conversion</span>
                                <span className="text-teal-900">{v.conversion}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-purple-400 to-teal-400 rounded-full" style={{ width: `${v.conversion * 4}%` }} />
                              </div>
                              <div className="flex justify-between text-[10px] font-mono font-bold uppercase">
                                <span className="text-zinc-400">Satisfaction</span>
                                <span className="text-teal-900">{v.satisfaction}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-purple-400 to-teal-400 rounded-full" style={{ width: `${v.satisfaction}%` }} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'content' && (
                  isBlogEditorOpen ? (
                    /* DYNAMIC WORKSPACE: KINETIC JOURNAL ARTICLE EDITOR */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      
                      {/* CENTRAL EDITOR COLUMN (Span 8) */}
                      <div className="lg:col-span-8 space-y-6">
                        
                        {/* Breadcrumbs & Back Button */}
                        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                          <button
                            onClick={() => {
                              AutoNovaAudio.playClick();
                              setIsBlogEditorOpen(false);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 rounded-xl font-mono text-[9px] font-bold uppercase cursor-pointer transition-colors"
                          >
                            <ChevronLeft className="h-3.5 w-3.5" />
                            <span>Back to Hub</span>
                          </button>
                          <div className="text-right">
                            <span className="font-mono text-[9px] text-zinc-400 font-bold uppercase tracking-wider">
                              {editingPost ? 'Mode: Database Record Editing' : 'Mode: New Record Compiling'}
                            </span>
                          </div>
                        </div>

                        {/* Article Title Input Section */}
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-teal-850 uppercase tracking-wider font-mono">
                            Article Title
                          </label>
                          <input
                            type="text"
                            value={postForm.title}
                            onChange={(e) => {
                              const val = e.target.value;
                              setPostForm(prev => {
                                const updated = { ...prev, title: val };
                                // Auto-generate slug and meta title if unmodified
                                if (!editingPost) {
                                  updated.slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                  updated.metaTitle = val;
                                }
                                return updated;
                              });
                            }}
                            placeholder="Enter article title..."
                            className="w-full text-xl font-extrabold text-teal-950 bg-transparent border-b border-zinc-200 pb-2 focus:border-teal-700 focus:outline-none focus:ring-0 transition-all placeholder-zinc-300"
                          />
                        </div>

                        {/* Cover Image Block */}
                        <div className="space-y-2">
                          <label className="block text-[10px] font-bold text-teal-850 uppercase tracking-wider font-mono">
                            Cover Image Accent
                          </label>
                          <div className="relative h-64 rounded-2xl border border-zinc-200 overflow-hidden bg-zinc-50 group flex items-center justify-center">
                            {postForm.image ? (
                              <>
                                <img
                                  src={postForm.image}
                                  alt="Cover preview"
                                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                  onError={(e) => {
                                    e.target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdGLXuzK1NTn4jLJzhzcT0bHShlA-uyDuHumOZR0eq3zFqcAtGl41DmztkeWLlGJPh10gKVXH13uC-O-ZtC_vU3TNifC1SRPLtgp7uiqasOXTUH1bprde8g846ZtToMD2exd4UiuBjfga1FBWRFjVwAlHy93tJU3hnf-KBL4Zdy-VadnfZCK15IlRRpOnpMyDkQw29AgY3JAqF0X89mXVZM_5NE7wYmrfAXOOKK-kuKY14nUfYKZecX1G2y5_G1Huh7pXRCON_a2c2';
                                  }}
                                />
                                <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex items-end p-4">
                                  <span className="font-mono text-[9px] text-white/90 bg-teal-950/80 px-2.5 py-1 rounded-lg">
                                    Live Image Node Binding
                                  </span>
                                </div>
                              </>
                            ) : (
                              <div className="text-center p-6 space-y-2 text-zinc-400">
                                <FileText className="h-10 w-10 mx-auto text-zinc-300" />
                                <p className="text-xs font-semibold">No cover image selected.</p>
                              </div>
                            )}
                          </div>

                          {/* Cover Image Selector Panel */}
                          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">
                                Custom Preset Library
                              </span>
                              <input
                                type="text"
                                placeholder="Paste custom image URL..."
                                value={postForm.image}
                                onChange={(e) => setPostForm(prev => ({ ...prev, image: e.target.value }))}
                                className="px-3 py-1 bg-white border border-zinc-200 rounded-xl text-[10px] font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700 w-full sm:w-64 placeholder-zinc-400"
                              />
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                              {[
                                { name: 'Hypercar', url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600' },
                                { name: 'Charging', url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600' },
                                { name: 'Dashboard', url: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600' },
                                { name: 'Valuation', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600' }
                              ].map((preset) => (
                                <button
                                  key={preset.name}
                                  type="button"
                                  onClick={() => {
                                    AutoNovaAudio.playClick();
                                    setPostForm(prev => ({ ...prev, image: preset.url }));
                                  }}
                                  className={`relative h-12 rounded-lg border overflow-hidden transition-all group ${
                                    postForm.image === preset.url
                                      ? 'ring-2 ring-teal-700 border-transparent shadow'
                                      : 'border-zinc-200 hover:border-zinc-400'
                                  }`}
                                >
                                  <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <span className="text-[8px] font-bold text-white uppercase font-mono">
                                      {preset.name}
                                    </span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Rich Text Editor Body */}
                        <div className="space-y-2">
                          <label className="block text-[10px] font-bold text-teal-850 uppercase tracking-wider font-mono">
                            Article Content (Markdown Enabled)
                          </label>
                          <div className="border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col min-h-[420px]">
                            
                            {/* Editor Toolbar */}
                            <div className="flex flex-wrap items-center gap-1 p-2 bg-zinc-50 border-b border-zinc-200">
                              {[
                                { title: 'Heading 1', label: 'H1', syntax: '\n\n### ' },
                                { title: 'Heading 2', label: 'H2', syntax: '\n\n#### ' },
                                { title: 'Bold', label: 'B', syntax: ' **bold text** ' },
                                { title: 'Italic', label: 'I', syntax: ' *italic text* ' },
                                { title: 'Blockquote', label: 'Quote', syntax: '\n\n> ' },
                                { title: 'Bullet List', label: 'Bullet', syntax: '\n- ' },
                                { title: 'Link', label: 'Link', syntax: ' [link text](url) ' }
                              ].map((btn) => (
                                <button
                                  key={btn.title}
                                  type="button"
                                  onClick={() => {
                                    AutoNovaAudio.playClick();
                                    // Append syntax to content body
                                    setPostForm(prev => ({
                                      ...prev,
                                      content: prev.content + btn.syntax
                                    }));
                                  }}
                                  title={btn.title}
                                  className="px-2.5 py-1 text-[9px] font-mono font-black border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 hover:text-teal-950 rounded-lg transition-colors cursor-pointer"
                                >
                                  {btn.label}
                                </button>
                              ))}
                              <div className="flex-1" />
                              <span className="font-mono text-[8px] text-zinc-400 font-bold uppercase pr-2">
                                Word Count: {postForm.content ? postForm.content.trim().split(/\s+/).filter(Boolean).length : 0}
                              </span>
                            </div>

                            {/* Text Area */}
                            <textarea
                              rows={14}
                              value={postForm.content}
                              onChange={(e) => setPostForm(prev => ({ ...prev, content: e.target.value }))}
                              placeholder="Start typing your structured kinetic post here... Use markdown headings (###) to populate chapters."
                              className="w-full flex-1 p-5 text-xs font-semibold text-zinc-600 bg-white border-0 focus:ring-0 focus:outline-none resize-none leading-relaxed font-sans"
                            />
                          </div>
                        </div>

                        {/* Autosaved Feedback Tracker */}
                        <div className="flex items-center justify-between bg-zinc-50 border border-zinc-200/60 p-3 rounded-2xl text-[10px] font-mono font-bold text-zinc-500">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>System active: Auto-indexing verified</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>Was this editor helpful?</span>
                            <button
                              onClick={() => { AutoNovaAudio.playSuccess(); showNotification("Thank you for your rating!", "success"); }}
                              className="p-1 hover:text-teal-950 transition-colors cursor-pointer"
                            >
                              <ThumbsUp className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => { AutoNovaAudio.playSuccess(); showNotification("Feedback recorded. Optimizing workspace elements.", "info"); }}
                              className="p-1 hover:text-red-700 transition-colors cursor-pointer"
                            >
                              <ThumbsDown className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                      </div>

                      {/* RIGHT SIDEBAR: SEO & PUBLISHING BENTO (Span 4) */}
                      <div className="lg:col-span-4 space-y-6">
                        
                        {/* 1. Publishing Options */}
                        <div className="bg-white border border-zinc-200/50 p-5 rounded-2xl space-y-4 shadow-sm">
                          <div className="flex items-center gap-2 border-b border-zinc-100 pb-2">
                            <FileCheck className="h-4 w-4 text-teal-800" />
                            <h3 className="font-display text-xs font-extrabold text-teal-950 uppercase tracking-wider">
                              Publishing Console
                            </h3>
                          </div>
                          
                          <div className="space-y-3 text-xs">
                            <div>
                              <label className="block text-[9px] font-mono font-bold text-zinc-400 uppercase mb-1">
                                Status Mode
                              </label>
                              <select
                                value={postForm.status}
                                onChange={(e) => setPostForm(prev => ({ ...prev, status: e.target.value }))}
                                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
                              >
                                <option value="Published">Published (Live instant)</option>
                                <option value="Draft">Draft (Internal review)</option>
                                <option value="Scheduled">Scheduled (Queue state)</option>
                                <option value="Archived">Archived (Soft delete)</option>
                              </select>
                            </div>

                            <div className="flex items-center justify-between bg-zinc-50 p-2.5 rounded-xl border border-zinc-200/60">
                              <div>
                                <p className="font-bold text-[10px] text-zinc-700">Public Visibility</p>
                                <p className="text-[8px] text-zinc-400 font-medium">Visible in general feeds</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  AutoNovaAudio.playClick();
                                  setPostForm(prev => ({ ...prev, visibility: !prev.visibility }));
                                }}
                                className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                                  postForm.visibility ? 'bg-teal-950' : 'bg-zinc-300'
                                }`}
                              >
                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                                  postForm.visibility ? 'translate-x-4' : 'translate-x-0'
                                }`} />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                AutoNovaAudio.playClick();
                                setIsBlogEditorOpen(false);
                              }}
                              className="w-full py-2 border border-zinc-200 hover:bg-zinc-50 text-zinc-600 rounded-xl font-mono text-[9px] font-bold uppercase cursor-pointer transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (!postForm.title) {
                                  AutoNovaAudio.playError();
                                  showNotification("Title field is required.", "error");
                                  return;
                                }
                                AutoNovaAudio.playSuccess();
                                if (editingPost) {
                                  // Update existing
                                  setAdminPosts(prev => prev.map(p => p.id === editingPost.id ? {
                                    ...p,
                                    title: postForm.title,
                                    category: postForm.category,
                                    excerpt: postForm.excerpt || (postForm.content ? postForm.content.slice(0, 130) + '...' : ''),
                                    author: postForm.author,
                                    authorRole: postForm.authorRole,
                                    status: postForm.status,
                                    content: postForm.content,
                                    image: postForm.image,
                                    metaTitle: postForm.metaTitle,
                                    metaDescription: postForm.metaDescription,
                                    slug: postForm.slug,
                                    tags: postForm.tags,
                                    visibility: postForm.visibility
                                  } : p));
                                  showNotification(`Journal article "${postForm.title}" updated in database ledger.`, "success");
                                  setTradeLedger(prev => [
                                    { id: `tx-${Math.floor(Math.random() * 9000) + 1000}`, time: new Date().toTimeString().split(' ')[0], text: `Admin compiled changes to: ${postForm.title}`, type: 'system' },
                                    ...prev
                                  ]);
                                } else {
                                  // Create new
                                  const newP = {
                                    id: `art-${Date.now()}`,
                                    title: postForm.title,
                                    category: postForm.category,
                                    excerpt: postForm.excerpt || (postForm.content ? postForm.content.slice(0, 130) + '...' : 'A new article on AutoNova.'),
                                    author: postForm.author,
                                    authorRole: postForm.authorRole,
                                    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                                    status: postForm.status,
                                    content: postForm.content,
                                    image: postForm.image,
                                    metaTitle: postForm.metaTitle,
                                    metaDescription: postForm.metaDescription,
                                    slug: postForm.slug,
                                    tags: postForm.tags,
                                    visibility: postForm.visibility,
                                    views: 0,
                                    likes: 0,
                                    bookmarks: 0,
                                    comments: []
                                  };
                                  setAdminPosts(prev => [newP, ...prev]);
                                  showNotification(`New journal article "${postForm.title}" published to live network feed.`, "success");
                                  setTradeLedger(prev => [
                                    { id: `tx-${Math.floor(Math.random() * 9000) + 1000}`, time: new Date().toTimeString().split(' ')[0], text: `Admin deployed new article: ${postForm.title}`, type: 'system' },
                                    ...prev
                                  ]);
                                }
                                setIsBlogEditorOpen(false);
                              }}
                              className="w-full py-2 bg-teal-950 hover:bg-teal-900 text-white rounded-xl font-mono text-[9px] font-bold uppercase cursor-pointer transition-colors"
                            >
                              {editingPost ? 'Save' : 'Publish'}
                            </button>
                          </div>
                        </div>

                        {/* 2. AI OPTIMIZER ENGINE */}
                        <div className="bg-gradient-to-br from-teal-950 to-emerald-950 border border-teal-800 text-white p-5 rounded-2xl space-y-4 shadow">
                          <div className="flex items-center gap-2 border-b border-teal-800/60 pb-2 justify-between">
                            <div className="flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse" />
                              <h3 className="font-display text-xs font-black uppercase tracking-wider">
                                AI Optimizer Engine
                              </h3>
                            </div>
                            <span className="font-mono text-[9px] bg-emerald-800 px-2 py-0.5 rounded-full font-black text-white">
                              SEO Live
                            </span>
                          </div>

                          {/* Interactive Score Display */}
                          {(() => {
                            let score = 25;
                            if (postForm.title.length >= 10 && postForm.title.length <= 60) score += 15;
                            if (postForm.slug) score += 10;
                            if (postForm.metaTitle) score += 10;
                            if (postForm.metaDescription.length >= 40) score += 15;
                            if (postForm.tags && postForm.tags.length > 0) score += 10;
                            if (postForm.content) {
                              const cnt = postForm.content.trim().split(/\s+/).filter(Boolean).length;
                              if (cnt >= 300) score += 20;
                              else if (cnt >= 100) score += 10;
                            }
                            const finalScore = Math.min(score, 100);

                            return (
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-mono text-emerald-300 font-bold uppercase">
                                    Quality Score Checklist
                                  </span>
                                  <span className="font-mono text-sm font-black text-white">
                                    {finalScore} / 100
                                  </span>
                                </div>
                                
                                {/* Progress Gauge */}
                                <div className="w-full bg-teal-900/50 h-2 rounded-full overflow-hidden">
                                  <div
                                    className="bg-gradient-to-r from-emerald-400 to-teal-400 h-full transition-all duration-500"
                                    style={{ width: `${finalScore}%` }}
                                  />
                                </div>

                                {/* Tips Node */}
                                <ul className="text-[9.5px] font-medium text-emerald-100/80 space-y-1.5 pt-1">
                                  {postForm.title.length < 10 && (
                                    <li className="flex items-center gap-1.5">
                                      <span className="text-emerald-400">•</span>
                                      <span>Title is too short. Add details.</span>
                                    </li>
                                  )}
                                  {postForm.title.length >= 10 && (
                                    <li className="flex items-center gap-1.5 text-emerald-300">
                                      <Check className="h-3 w-3" />
                                      <span>Title length is perfectly optimized.</span>
                                    </li>
                                  )}
                                  {!postForm.metaDescription && (
                                    <li className="flex items-center gap-1.5">
                                      <span className="text-emerald-400">•</span>
                                      <span>Add a rich meta excerpt below.</span>
                                    </li>
                                  )}
                                  {(!postForm.content || postForm.content.trim().split(/\s+/).filter(Boolean).length < 200) && (
                                    <li className="flex items-center gap-1.5">
                                      <span className="text-emerald-400">•</span>
                                      <span>Content word count is low. Expand article body.</span>
                                    </li>
                                  )}
                                  {postForm.tags.length === 0 && (
                                    <li className="flex items-center gap-1.5">
                                      <span className="text-emerald-400">•</span>
                                      <span>Tag binding missing. Add 1+ tags.</span>
                                    </li>
                                  )}
                                </ul>
                              </div>
                            );
                          })()}
                        </div>

                        {/* 3. Categories & Tags Metadata */}
                        <div className="bg-white border border-zinc-200/50 p-5 rounded-2xl space-y-4 shadow-sm">
                          <div className="flex items-center gap-2 border-b border-zinc-100 pb-2">
                            <BookOpen className="h-4 w-4 text-teal-800" />
                            <h3 className="font-display text-xs font-extrabold text-teal-950 uppercase tracking-wider">
                              Taxonomy & Authorship
                            </h3>
                          </div>

                          <div className="space-y-3 text-xs">
                            <div>
                              <label className="block text-[9px] font-mono font-bold text-zinc-400 uppercase mb-1">
                                Primary Category
                              </label>
                              <select
                                value={postForm.category}
                                onChange={(e) => setPostForm(prev => ({ ...prev, category: e.target.value }))}
                                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
                              >
                                <option value="Market Outlook">Market Outlook</option>
                                <option value="Market Trends">Market Trends</option>
                                <option value="EV News">EV News</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Buying Guides">Buying Guides</option>
                                <option value="Company Updates">Company Updates</option>
                              </select>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[9px] font-mono font-bold text-zinc-400 uppercase mb-1">
                                  Author Name
                                </label>
                                <input
                                  type="text"
                                  value={postForm.author}
                                  onChange={(e) => setPostForm(prev => ({ ...prev, author: e.target.value }))}
                                  className="w-full px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] font-mono font-bold text-zinc-400 uppercase mb-1">
                                  Author Role
                                </label>
                                <input
                                  type="text"
                                  value={postForm.authorRole}
                                  onChange={(e) => setPostForm(prev => ({ ...prev, authorRole: e.target.value }))}
                                  className="w-full px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
                                />
                              </div>
                            </div>

                            {/* Tags Chip Manager */}
                            <div>
                              <label className="block text-[9px] font-mono font-bold text-zinc-400 uppercase mb-1">
                                Tags Map
                              </label>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {postForm.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-teal-50 text-teal-800 border border-teal-200/30"
                                  >
                                    <span>{tag}</span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        AutoNovaAudio.playClick();
                                        setPostForm(prev => ({
                                          ...prev,
                                          tags: prev.tags.filter(t => t !== tag)
                                        }));
                                      }}
                                      className="hover:text-red-600 font-bold ml-0.5"
                                    >
                                      ×
                                    </button>
                                  </span>
                                ))}
                              </div>
                              <input
                                type="text"
                                placeholder="Add custom tag (press Enter)"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    const val = e.target.value.trim();
                                    if (val && !postForm.tags.includes(val)) {
                                      AutoNovaAudio.playClick();
                                      setPostForm(prev => ({
                                        ...prev,
                                        tags: [...prev.tags, val]
                                      }));
                                      e.target.value = '';
                                    }
                                  }
                                }}
                                className="w-full px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
                              />
                            </div>

                          </div>
                        </div>

                        {/* 4. SEO Configurations */}
                        <div className="bg-white border border-zinc-200/50 p-5 rounded-2xl space-y-4 shadow-sm">
                          <div className="flex items-center gap-2 border-b border-zinc-100 pb-2">
                            <Activity className="h-4 w-4 text-teal-800" />
                            <h3 className="font-display text-xs font-extrabold text-teal-950 uppercase tracking-wider">
                              SEO Search Configurations
                            </h3>
                          </div>

                          <div className="space-y-3 text-xs">
                            <div>
                              <label className="block text-[9px] font-mono font-bold text-zinc-400 uppercase mb-1">
                                Search Result Meta Title
                              </label>
                              <input
                                type="text"
                                value={postForm.metaTitle}
                                onChange={(e) => setPostForm(prev => ({ ...prev, metaTitle: e.target.value }))}
                                className="w-full px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
                              />
                            </div>

                            <div>
                              <label className="block text-[9px] font-mono font-bold text-zinc-400 uppercase mb-1">
                                Meta Excerpt / Description
                              </label>
                              <textarea
                                rows={3}
                                value={postForm.metaDescription || postForm.excerpt}
                                onChange={(e) => setPostForm(prev => ({ ...prev, metaDescription: e.target.value, excerpt: e.target.value }))}
                                placeholder="Brief synopsis index for crawl indexes..."
                                className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700 resize-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[9px] font-mono font-bold text-zinc-400 uppercase mb-1">
                                URL Slug Address
                              </label>
                              <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-1.5">
                                <span className="text-zinc-400 text-[10px] font-semibold pr-1">/blog/</span>
                                <input
                                  type="text"
                                  value={postForm.slug}
                                  onChange={(e) => setPostForm(prev => ({ ...prev, slug: e.target.value }))}
                                  className="flex-1 bg-transparent border-none p-0 focus:ring-0 text-xs font-semibold"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>
                  ) : (
                    /* NORMAL Hub VIEW: LIST tables of articles and faqs */
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="border-b border-zinc-100 pb-3 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="text-left">
                          <h2 className="font-display text-base font-extrabold text-teal-950">Content Management Hub</h2>
                          <p className="text-xs text-zinc-500 font-medium">Refine dynamic educational guides, compile official articles to the Kinetic Journal, and update public FAQ databases.</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => {
                              AutoNovaAudio.playClick();
                              if (contentSubTab === 'posts') {
                                setPostForm({
                                  title: '',
                                  category: 'Market Outlook',
                                  excerpt: '',
                                  author: userName || 'Sarah Jensen',
                                  authorRole: role === 'Admin' ? 'System Administrator' : 'Senior Powertrain Analyst',
                                  status: 'Published',
                                  content: '',
                                  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdGLXuzK1NTn4jLJzhzcT0bHShlA-uyDuHumOZR0eq3zFqcAtGl41DmztkeWLlGJPh10gKVXH13uC-O-ZtC_vU3TNifC1SRPLtgp7uiqasOXTUH1bprde8g846ZtToMD2exd4UiuBjfga1FBWRFjVwAlHy93tJU3hnf-KBL4Zdy-VadnfZCK15IlRRpOnpMyDkQw29AgY3JAqF0X89mXVZM_5NE7wYmrfAXOOKK-kuKY14nUfYKZecX1G2y5_G1Huh7pXRCON_a2c2',
                                  metaTitle: '',
                                  metaDescription: '',
                                  slug: '',
                                  tags: ['Electric', 'Future'],
                                  visibility: true
                                });
                                setEditingPost(null);
                                setIsBlogEditorOpen(true);
                              } else {
                                setFaqForm({ question: '', category: 'Buying', answer: '', status: 'Published' });
                                setEditingFaq(null);
                                setShowAddFaqModal(true);
                              }
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-2 border border-teal-850 bg-teal-950 hover:bg-teal-900 text-white rounded-xl font-mono text-[8.5px] font-bold uppercase cursor-pointer transition-colors"
                          >
                            <Plus className="h-3.5 w-3.5" />
                            <span>{contentSubTab === 'posts' ? 'Add Post' : 'Add FAQ'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Sub-Tab Navigation Bar */}
                      <div className="flex justify-between items-center bg-zinc-50 p-1.5 rounded-2xl border border-zinc-200/50">
                        <div className="flex gap-1">
                          <button
                            onClick={() => { AutoNovaAudio.playClick(); setContentSubTab('posts'); }}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                              contentSubTab === 'posts'
                                ? 'bg-teal-950 text-white font-black shadow-sm'
                                : 'text-zinc-500 hover:text-zinc-800'
                            }`}
                          >
                            <BookOpen className="h-3.5 w-3.5" />
                            <span>Journal Articles ({adminPosts.length})</span>
                          </button>
                          <button
                            onClick={() => { AutoNovaAudio.playClick(); setContentSubTab('faqs'); }}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                              contentSubTab === 'faqs'
                                ? 'bg-teal-950 text-white font-black shadow-sm'
                                : 'text-zinc-500 hover:text-zinc-800'
                            }`}
                          >
                            <HelpCircle className="h-3.5 w-3.5" />
                            <span>FAQs & Q&A Nodes ({adminFaqs.length})</span>
                          </button>
                        </div>

                        {/* Live Content Search Console */}
                        <div className="relative w-48 pr-1">
                          <input
                            type="text"
                            value={contentSearch}
                            onChange={(e) => setContentSearch(e.target.value)}
                            placeholder="Search content..."
                            className="w-full px-3 py-1.5 bg-white border border-zinc-200 rounded-xl text-[11px] font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700 transition-all placeholder-zinc-400"
                          />
                        </div>
                      </div>

                      {/* SUB-TAB VIEW: JOURNAL ARTICLES */}
                      {contentSubTab === 'posts' && (
                        <div className="bg-white border border-zinc-200/50 rounded-2xl overflow-hidden shadow-sm">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                                  <th className="p-4 w-1/3">Article Title &amp; Author</th>
                                  <th className="p-4">Category</th>
                                  <th className="p-4">Date</th>
                                  <th className="p-4">Engagement Stats</th>
                                  <th className="p-4">Status</th>
                                  <th className="p-4 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-zinc-100 font-medium text-zinc-600">
                                {(() => {
                                  const filtered = adminPosts.filter(post => 
                                    post.title.toLowerCase().includes(contentSearch.toLowerCase()) ||
                                    post.excerpt.toLowerCase().includes(contentSearch.toLowerCase()) ||
                                    post.author.toLowerCase().includes(contentSearch.toLowerCase()) ||
                                    post.category.toLowerCase().includes(contentSearch.toLowerCase())
                                  );

                                  if (filtered.length === 0) {
                                    return (
                                      <tr>
                                        <td colSpan={6} className="p-8 text-center text-zinc-400 italic font-medium">
                                          No articles matching search query found.
                                        </td>
                                      </tr>
                                    );
                                  }

                                  return filtered.map((post) => (
                                    <tr key={post.id} className="hover:bg-zinc-50/40 transition-colors">
                                      <td className="p-4 text-left font-sans space-y-1">
                                        <p className="font-sans text-[11.5px] font-bold text-teal-950 leading-snug">
                                          {post.title}
                                        </p>
                                        <p className="font-mono text-[9.5px] text-zinc-400 font-bold leading-none">
                                          BY {post.author.toUpperCase()}
                                        </p>
                                      </td>
                                      <td className="p-4 text-left font-sans">
                                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200/30">
                                          {post.category}
                                        </span>
                                      </td>
                                      <td className="p-4 text-left font-sans font-mono text-[10px] text-zinc-400">
                                        {post.date}
                                      </td>
                                      <td className="p-4 text-left font-sans font-mono text-[10px] text-zinc-400 space-y-1">
                                        <p>• Views: <span className="text-teal-950 font-extrabold">{post.views}</span></p>
                                        <p>• Likes: <span className="text-teal-950 font-extrabold">{post.likes}</span></p>
                                      </td>
                                      <td className="p-4 text-left font-sans">
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                          post.status === 'Published' 
                                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/50' 
                                            : post.status === 'Draft'
                                            ? 'bg-zinc-100 text-zinc-600 border border-zinc-200'
                                            : 'bg-amber-50 text-amber-800 border border-amber-200/50'
                                        }`}>
                                          {post.status === 'Published' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-0.5" />}
                                          {post.status}
                                        </span>
                                      </td>
                                      <td className="p-4 text-right font-sans">
                                        <div className="flex justify-end items-center gap-1.5">
                                          {/* Preview */}
                                          <button
                                            onClick={() => window.open(`/blog/${post.slug || post.id}`, '_blank')}
                                            title="Preview Article"
                                            className="p-1.5 border border-zinc-200 hover:border-teal-700 hover:bg-teal-50 text-zinc-500 hover:text-teal-950 rounded-lg cursor-pointer transition-colors"
                                          >
                                            <Eye className="h-3.5 w-3.5" />
                                          </button>

                                          {/* Edit */}
                                          <button
                                            onClick={() => {
                                              AutoNovaAudio.playClick();
                                              setEditingPost(post);
                                              setPostForm({
                                                title: post.title || '',
                                                category: post.category || 'Market Outlook',
                                                excerpt: post.excerpt || '',
                                                author: post.author || 'Sarah Jensen',
                                                authorRole: post.authorRole || 'Senior Powertrain Analyst',
                                                status: post.status || 'Published',
                                                content: post.content || '',
                                                image: post.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdGLXuzK1NTn4jLJzhzcT0bHShlA-uyDuHumOZR0eq3zFqcAtGl41DmztkeWLlGJPh10gKVXH13uC-O-ZtC_vU3TNifC1SRPLtgp7uiqasOXTUH1bprde8g846ZtToMD2exd4UiuBjfga1FBWRFjVwAlHy93tJU3hnf-KBL4Zdy-VadnfZCK15IlRRpOnpMyDkQw29AgY3JAqF0X89mXVZM_5NE7wYmrfAXOOKK-kuKY14nUfYKZecX1G2y5_G1Huh7pXRCON_a2c2',
                                                metaTitle: post.metaTitle || post.title || '',
                                                metaDescription: post.metaDescription || post.excerpt || '',
                                                slug: post.slug || (post.title ? post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : ''),
                                                tags: post.tags || ['Electric', 'Future'],
                                                visibility: post.visibility !== undefined ? post.visibility : true
                                              });
                                              setIsBlogEditorOpen(true);
                                            }}
                                            title="Edit Article"
                                            className="p-1.5 border border-zinc-200 hover:border-teal-700 hover:bg-teal-50 text-zinc-500 hover:text-teal-950 rounded-lg cursor-pointer transition-colors"
                                          >
                                            <Pencil className="h-3.5 w-3.5" />
                                          </button>
                                          
                                          {/* Delete */}
                                          <button
                                            onClick={() => {
                                              AutoNovaAudio.playClick();
                                              if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
                                                AutoNovaAudio.playSuccess();
                                                setAdminPosts(prev => prev.filter(p => p.id !== post.id));
                                                showNotification(`Article "${post.title}" removed from database repository.`, "success");
                                                setTradeLedger(prev => [
                                                  { id: `tx-${Math.floor(Math.random() * 9000) + 1000}`, time: new Date().toTimeString().split(' ')[0], text: `Admin deleted journal article: ${post.title}`, type: 'system' },
                                                  ...prev
                                                ]);
                                              }
                                            }}
                                            title="Delete Article"
                                            className="p-1.5 border border-zinc-200 hover:border-red-600 hover:bg-red-50 text-zinc-500 hover:text-red-700 rounded-lg cursor-pointer transition-colors"
                                          >
                                            <Trash2 className="h-3.5 w-3.5" />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ));
                                })()}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* SUB-TAB VIEW: FAQS */}
                      {contentSubTab === 'faqs' && (
                        <div className="bg-white border border-zinc-200/50 rounded-2xl overflow-hidden shadow-sm">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                                  <th className="p-4 w-1/3">FAQ Question</th>
                                  <th className="p-4 w-1/3">Answer Preview</th>
                                  <th className="p-4">Category</th>
                                  <th className="p-4">Status</th>
                                  <th className="p-4 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-zinc-100 font-medium text-zinc-600">
                                {(() => {
                                  const filtered = adminFaqs.filter(faq => 
                                    faq.question.toLowerCase().includes(contentSearch.toLowerCase()) ||
                                    faq.answer.toLowerCase().includes(contentSearch.toLowerCase()) ||
                                    faq.category.toLowerCase().includes(contentSearch.toLowerCase())
                                  );

                                  if (filtered.length === 0) {
                                    return (
                                      <tr>
                                        <td colSpan={5} className="p-8 text-center text-zinc-400 italic font-medium">
                                          No FAQs matching search query found.
                                        </td>
                                      </tr>
                                    );
                                  }

                                  return filtered.map((faq) => (
                                    <tr key={faq.id} className="hover:bg-zinc-50/40 transition-colors">
                                      <td className="p-4 text-left font-sans">
                                        <p className="font-sans text-[11.5px] font-bold text-teal-950 leading-relaxed">
                                          {faq.question}
                                        </p>
                                      </td>
                                      <td className="p-4 text-left font-sans">
                                        <p className="font-sans text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                                          {faq.answer}
                                        </p>
                                      </td>
                                      <td className="p-4 text-left font-sans">
                                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-purple-50 text-purple-800 border border-purple-200/30">
                                          {faq.category}
                                        </span>
                                      </td>
                                      <td className="p-4 text-left font-sans">
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                          faq.status === 'Published' 
                                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/50' 
                                            : 'bg-zinc-100 text-zinc-600 border border-zinc-200'
                                        }`}>
                                          {faq.status === 'Published' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-0.5" />}
                                          {faq.status}
                                        </span>
                                      </td>
                                      <td className="p-4 text-right font-sans">
                                        <div className="flex justify-end items-center gap-1.5">
                                          {/* Edit */}
                                          <button
                                            onClick={() => {
                                              AutoNovaAudio.playClick();
                                              setEditingFaq(faq);
                                              setFaqForm({
                                                question: faq.question,
                                                category: faq.category,
                                                answer: faq.answer,
                                                status: faq.status
                                              });
                                              setShowAddFaqModal(true);
                                            }}
                                            title="Edit FAQ"
                                            className="p-1.5 border border-zinc-200 hover:border-teal-700 hover:bg-teal-50 text-zinc-500 hover:text-teal-950 rounded-lg cursor-pointer transition-colors"
                                          >
                                            <Pencil className="h-3.5 w-3.5" />
                                          </button>
                                          
                                          {/* Delete */}
                                          <button
                                            onClick={() => {
                                              AutoNovaAudio.playClick();
                                              if (confirm(`Are you sure you want to delete this FAQ?`)) {
                                                AutoNovaAudio.playSuccess();
                                                setAdminFaqs(prev => prev.filter(f => f.id !== faq.id));
                                                showNotification(`FAQ node removed successfully.`, "success");
                                                setTradeLedger(prev => [
                                                  { id: `tx-${Math.floor(Math.random() * 9000) + 1000}`, time: new Date().toTimeString().split(' ')[0], text: `Admin deleted FAQ: "${faq.question.slice(0, 30)}..."`, type: 'system' },
                                                  ...prev
                                                ]);
                                              }
                                            }}
                                            title="Delete FAQ"
                                            className="p-1.5 border border-zinc-200 hover:border-red-600 hover:bg-red-50 text-zinc-500 hover:text-red-700 rounded-lg cursor-pointer transition-colors"
                                          >
                                            <Trash2 className="h-3.5 w-3.5" />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ));
                                })()}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="border-b border-zinc-100 pb-3 flex flex-col md:flex-row md:items-end justify-between gap-4">
                      <div className="text-left">
                        <h2 className="font-display text-base font-extrabold text-teal-950">Moderation & Settle Hub</h2>
                        <p className="text-xs text-zinc-500 font-medium">Moderate community reviews, handle flagged reports, investigate Escrow lockups, and process decentralized dispute resolutions.</p>
                      </div>
                    </div>

                    {/* Sub-Tab Navigation Bar */}
                    <div className="flex justify-between items-center bg-zinc-50 p-1.5 rounded-2xl border border-zinc-200/50">
                      <div className="flex gap-1">
                        <button
                          onClick={() => { AutoNovaAudio.playClick(); setActiveReviewsSubTab('queue'); }}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                            activeReviewsSubTab === 'queue'
                              ? 'bg-teal-950 text-white font-black shadow-sm'
                              : 'text-zinc-500 hover:text-zinc-800'
                          }`}
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>Reviews Queue ({flaggedReviews.length})</span>
                        </button>
                        <button
                          onClick={() => { AutoNovaAudio.playClick(); setActiveReviewsSubTab('disputes'); }}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                            activeReviewsSubTab === 'disputes'
                              ? 'bg-teal-950 text-white font-black shadow-sm'
                              : 'text-zinc-500 hover:text-zinc-800'
                          }`}
                        >
                          <Gavel className="h-3.5 w-3.5" />
                          <span>Transaction Disputes ({disputes.filter(d => d.status !== 'Resolved' && d.status !== 'Closed').length})</span>
                        </button>
                      </div>
                    </div>

                    {/* SUB-TAB VIEW: REVIEWS QUEUE */}
                    {activeReviewsSubTab === 'queue' && (
                      <div className="space-y-6">
                        {/* Filter Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 bg-zinc-50/50 p-4 rounded-2xl border border-zinc-200/60 shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Rating:</span>
                              <select 
                                value={reviewFilterRating}
                                onChange={(e) => { AutoNovaAudio.playClick(); setReviewFilterRating(e.target.value); }}
                                className="bg-white border border-zinc-200 rounded-lg text-xs font-bold text-zinc-600 px-2 py-1 focus:ring-1 focus:ring-teal-700 focus:outline-none"
                              >
                                <option value="All">All Ratings</option>
                                <option value="1">1 Star</option>
                                <option value="2">2 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="5">5 Stars</option>
                              </select>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Flag Type:</span>
                              <select 
                                value={reviewFilterFlag}
                                onChange={(e) => { AutoNovaAudio.playClick(); setReviewFilterFlag(e.target.value); }}
                                className="bg-white border border-zinc-200 rounded-lg text-xs font-bold text-zinc-600 px-2 py-1 focus:ring-1 focus:ring-teal-700 focus:outline-none"
                              >
                                <option value="All">All Flag Types</option>
                                <option value="Spam">Spam</option>
                                <option value="Inappropriate">Inappropriate</option>
                                <option value="Off-topic">Off-topic</option>
                                <option value="Suspected Fake">Suspected Fake</option>
                              </select>
                            </div>
                          </div>
                          <p className="text-[11px] font-mono font-bold text-zinc-500 uppercase">
                            Showing {flaggedReviews.filter(rev => {
                              const matchRating = reviewFilterRating === 'All' || rev.rating === parseInt(reviewFilterRating);
                              const matchFlag = reviewFilterFlag === 'All' || rev.flagType === reviewFilterFlag;
                              return matchRating && matchFlag;
                            }).length} flagged reviews
                          </p>
                        </div>

                        {/* Review Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {(() => {
                            const filtered = flaggedReviews.filter(rev => {
                              const matchRating = reviewFilterRating === 'All' || rev.rating === parseInt(reviewFilterRating);
                              const matchFlag = reviewFilterFlag === 'All' || rev.flagType === reviewFilterFlag;
                              return matchRating && matchFlag;
                            });

                            if (filtered.length === 0) {
                              return (
                                <div className="col-span-full bg-white border border-dashed border-zinc-200 p-12 text-center text-zinc-400 font-medium rounded-2xl italic">
                                  No flagged reviews matching active filter settings found.
                                </div>
                              );
                            }

                            return filtered.map((rev) => (
                              <div key={rev.id} className="bg-white rounded-2xl border border-zinc-200 hover:border-teal-700/50 hover:shadow-md transition-all duration-300 p-5 flex flex-col gap-4 relative">
                                <div className="flex justify-between items-start gap-2">
                                  <div className="flex items-center gap-3">
                                    <img className="w-10 h-10 rounded-full object-cover border border-zinc-100" src={rev.avatar} alt={rev.reviewer} />
                                    <div>
                                      <h4 className="font-bold text-teal-950 text-xs">{rev.reviewer}</h4>
                                      <div className="flex text-amber-500">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                          <Star key={i} className={`h-3 w-3 ${i < rev.rating ? 'fill-current' : 'text-zinc-200'}`} />
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                    rev.flagType === 'Spam' 
                                      ? 'bg-rose-50 text-rose-800 border border-rose-200' 
                                      : rev.flagType === 'Inappropriate'
                                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                      : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                                  }`}>
                                    {rev.flagType}
                                  </span>
                                </div>

                                <div className="space-y-1.5 flex-1 text-left">
                                  <p className="text-xs text-zinc-600 font-medium leading-relaxed">
                                    "{rev.comment}"
                                  </p>
                                  <p className="text-[10px] text-zinc-400 font-semibold font-mono uppercase">
                                    Target: <span className="text-teal-900 font-extrabold">{rev.targetVehicle}</span>
                                  </p>
                                </div>

                                {rev.attachment && (
                                  <div className="relative">
                                    <div 
                                      onClick={() => { AutoNovaAudio.playClick(); setSelectedReviewImage(rev.attachment); }}
                                      className="relative w-full h-32 rounded-xl overflow-hidden border border-zinc-200 cursor-zoom-in group"
                                    >
                                      <img src={rev.attachment} alt="Attachment" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                                        <span className="bg-teal-950/80 text-white font-mono text-[8px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                                          Zoom Attachment
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                <div className="flex items-center justify-between border-t border-zinc-100 pt-4 mt-auto">
                                  <button 
                                    onClick={() => {
                                      AutoNovaAudio.playClick();
                                      if (confirm(`Remove review by ${rev.reviewer}? This action cannot be undone.`)) {
                                        AutoNovaAudio.playSuccess();
                                        setFlaggedReviews(prev => prev.filter(r => r.id !== rev.id));
                                        showNotification(`Flagged review by ${rev.reviewer} purged from public records.`, "success");
                                        setTradeLedger(prev => [
                                          { id: `tx-${Math.floor(Math.random() * 9000) + 1000}`, time: new Date().toTimeString().split(' ')[0], text: `Purged flagged review from ${rev.reviewer}`, type: 'system' },
                                          ...prev
                                        ]);
                                      }
                                    }}
                                    className="text-red-600 hover:text-red-700 font-mono text-[9px] font-bold uppercase hover:bg-red-50 px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer"
                                  >
                                    Purge
                                  </button>
                                  <div className="flex gap-2">
                                    <button 
                                      onClick={() => {
                                        AutoNovaAudio.playClick();
                                        // Create alert notice warning message
                                        const mockUser = users.find(u => u.name.toLowerCase() === rev.reviewer.replace('@','').toLowerCase()) || {
                                          id: rev.id,
                                          name: rev.reviewer,
                                          email: `${rev.reviewer.replace('@','')}.flagged@autonova.intel`,
                                          status: 'Active',
                                          joined: rev.date,
                                          trustScore: '80%'
                                        };
                                        setSelectedUser(mockUser);
                                        setMessageText(`Our dynamic administrative node flagged your recent review regarding the "${rev.targetVehicle}" due to potential policy violations (${rev.flagType}). Please ensure comments contain only honest feedback without promotional spam or excessive language.`);
                                        setShowMessageModal(true);
                                      }}
                                      className="text-zinc-600 hover:text-teal-950 border border-zinc-200 hover:bg-zinc-50 font-mono text-[9px] font-bold uppercase px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                                    >
                                      Warn User
                                    </button>
                                    <button 
                                      onClick={() => {
                                        AutoNovaAudio.playSuccess();
                                        setFlaggedReviews(prev => prev.filter(r => r.id !== rev.id));
                                        showNotification(`Flagged review by ${rev.reviewer} approved and released to public index.`, "success");
                                        setTradeLedger(prev => [
                                          { id: `tx-${Math.floor(Math.random() * 9000) + 1000}`, time: new Date().toTimeString().split(' ')[0], text: `Approved review by ${rev.reviewer}`, type: 'system' },
                                          ...prev
                                        ]);
                                      }}
                                      className="bg-teal-950 hover:bg-teal-900 text-white font-mono text-[9px] font-bold uppercase px-4 py-1.5 rounded-xl transition-colors cursor-pointer"
                                    >
                                      Approve
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ));
                          })()}
                        </div>
                      </div>
                    )}

                    {/* SUB-TAB VIEW: TRANSACTION DISPUTES */}
                    {activeReviewsSubTab === 'disputes' && (
                      <div className="bg-white border border-zinc-200/50 rounded-2xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                                <th className="p-4">Case ID</th>
                                <th className="p-4">Parties involved</th>
                                <th className="p-4">Linked Order</th>
                                <th className="p-4">Locked Escrow</th>
                                <th className="p-4">Priority</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Admin Handler</th>
                                <th className="p-4 text-right">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 font-medium text-zinc-600">
                              {disputes.length === 0 ? (
                                <tr>
                                  <td colSpan={8} className="p-8 text-center text-zinc-400 italic font-medium">
                                    No transaction disputes logged in platform records.
                                  </td>
                                </tr>
                              ) : (
                                disputes.map((disp) => (
                                  <tr 
                                    key={disp.id} 
                                    onClick={() => {
                                      AutoNovaAudio.playClick();
                                      setSelectedDispute(disp);
                                      setDisputeNotesForm(disp.notes || '');
                                    }}
                                    className="hover:bg-teal-50/20 cursor-pointer transition-colors group"
                                  >
                                    <td className="p-4 font-bold text-teal-950 font-mono">{disp.id}</td>
                                    <td className="p-4 space-y-1">
                                      <p className="font-bold text-zinc-800 text-[11px]">Buyer: {disp.buyer}</p>
                                      <p className="text-[9.5px] text-zinc-400 font-semibold font-mono">Seller: {disp.seller}</p>
                                    </td>
                                    <td className="p-4 font-mono text-zinc-500 font-bold">{disp.orderId}</td>
                                    <td className="p-4 font-mono text-teal-800 font-black">{disp.escrowAmount}</td>
                                    <td className="p-4">
                                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                                        disp.priority === 'CRITICAL' 
                                          ? 'bg-rose-100 text-rose-800 border border-rose-300' 
                                          : disp.priority === 'HIGH'
                                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                          : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                                      }`}>
                                        {disp.priority}
                                      </span>
                                    </td>
                                    <td className="p-4">
                                      <div className="flex items-center gap-1.5">
                                        <span className={`w-1.5 h-1.5 rounded-full ${
                                          disp.status === 'Resolved' || disp.status === 'Closed'
                                            ? 'bg-zinc-350 bg-zinc-400'
                                            : 'bg-teal-600 animate-pulse'
                                        }`} />
                                        <span className="font-semibold text-xs text-zinc-700">{disp.status}</span>
                                      </div>
                                    </td>
                                    <td className="p-4 text-[11px] font-semibold text-zinc-500">{disp.admin}</td>
                                    <td className="p-4 text-right">
                                      <button className="p-1 border border-zinc-200 rounded-lg group-hover:border-teal-700 group-hover:bg-teal-50 transition-all text-zinc-400 group-hover:text-teal-950 cursor-pointer">
                                        <ChevronRight className="h-3.5 w-3.5" />
                                      </button>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </main>

            </div>

            {/* Dashboard Footer */}
            <footer className="py-6 bg-white border-t border-zinc-200/40 text-center">
              <p className="font-mono text-[8px] text-zinc-400 tracking-wider uppercase">
                © 2026 AutoNova Intelligence. Restricted Admin Command Center Node NG-LAG-01. All rights reserved.
              </p>
           </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DISPUTE WORKSPACE DRAWER */}
      <AnimatePresence>
        {selectedDispute && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDispute(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 cursor-pointer"
            />

            {/* Drawer Panel */}
            <motion.aside 
              initial={{ translateX: '100%' }}
              animate={{ translateX: 0 }}
              exit={{ translateX: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-screen w-full max-w-[480px] bg-white z-50 shadow-2xl flex flex-col border-l border-zinc-200"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-zinc-200 flex justify-between items-center bg-zinc-50/50">
                <div className="text-left">
                  <h3 className="font-display text-base font-extrabold text-teal-950 font-mono uppercase tracking-tight">
                    Case {selectedDispute.id}
                  </h3>
                  <p className="text-[11px] text-zinc-500 font-medium">Dispute Resolution Workspace</p>
                </div>
                <button 
                  onClick={() => { AutoNovaAudio.playClick(); setSelectedDispute(null); }}
                  className="p-2 hover:bg-red-50 rounded-full text-zinc-400 hover:text-red-700 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide text-left">
                
                {/* Case Overview Block */}
                <div className="bg-teal-50/40 border border-teal-100/50 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-bold text-teal-800 uppercase tracking-wider">Escrow Node Locked</span>
                    <span className="font-mono text-xs font-black text-teal-950">{selectedDispute.escrowAmount}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-[9px] font-mono text-zinc-400 font-bold uppercase">Buyer Node</p>
                      <p className="font-semibold text-zinc-700">{selectedDispute.buyer}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-mono text-zinc-400 font-bold uppercase">Seller Node</p>
                      <p className="font-semibold text-zinc-700">{selectedDispute.seller}</p>
                    </div>
                  </div>
                  <div className="border-t border-teal-100/40 pt-2 flex justify-between items-center text-[10px]">
                    <span className="font-semibold text-zinc-500">Linked Order ID:</span>
                    <span className="font-mono font-bold text-teal-900">{selectedDispute.orderId}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] pt-1">
                    <span className="font-semibold text-zinc-500">Asset Title:</span>
                    <span className="font-medium text-zinc-700">{selectedDispute.vehicle}</span>
                  </div>
                </div>

                {/* Conflict History Timeline */}
                <div className="space-y-4">
                  <h4 className="font-mono text-[9.5px] font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-100 pb-2 flex items-center justify-between">
                    <span>Conflict History Ledger</span>
                    <span className="font-normal text-[8px] text-teal-800">{selectedDispute.timeline.length} Milestones</span>
                  </h4>
                  
                  {/* Vertical Timeline List */}
                  <div className="relative pl-5 space-y-5 before:content-[''] before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[1.5px] before:bg-zinc-100">
                    {selectedDispute.timeline.map((step, idx) => (
                      <div key={idx} className="relative text-xs">
                        {/* Timeline Circle */}
                        <span className={`absolute -left-[22px] top-1.5 w-2 h-2 rounded-full ring-4 ring-white ${
                          step.action.includes('Dispute') 
                            ? 'bg-rose-500' 
                            : step.action.includes('Seller')
                            ? 'bg-amber-500'
                            : 'bg-teal-600'
                        }`} />
                        <p className="text-[9.5px] font-bold text-teal-950/70 font-mono">{step.date}</p>
                        <p className="font-extrabold text-teal-950 text-[11px] leading-tight pt-0.5">{step.action}</p>
                        <p className="text-zinc-500 font-medium leading-relaxed pt-1">{step.details}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add Milestone Inline Form */}
                  <div className="bg-zinc-50 rounded-2xl border border-zinc-200/60 p-3 space-y-2">
                    <p className="text-[9px] font-mono font-bold text-zinc-500 uppercase">Append Verification Milestone</p>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        value={newMilestoneText}
                        onChange={(e) => setNewMilestoneText(e.target.value)}
                        placeholder="e.g. ECU telemetry signature matches, diagnostics received..."
                        className="flex-1 px-3 py-1.5 bg-white border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700 transition-all placeholder-zinc-400"
                      />
                      <button
                        onClick={() => {
                          if (!newMilestoneText.trim()) return;
                          AutoNovaAudio.playSuccess();
                          const nowStr = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
                          const updatedTimeline = [
                            ...selectedDispute.timeline,
                            {
                              date: nowStr,
                              user: 'System Administrator',
                              action: 'Admin Update Logged',
                              details: newMilestoneText.trim()
                            }
                          ];
                          setDisputes(prev => prev.map(d => d.id === selectedDispute.id ? { ...d, timeline: updatedTimeline } : d));
                          setSelectedDispute(prev => ({ ...prev, timeline: updatedTimeline }));
                          setNewMilestoneText('');
                          showNotification("Timeline milestone appended in case ledger.", "success");
                        }}
                        className="px-3 bg-teal-950 hover:bg-teal-900 text-white rounded-xl text-[10px] font-mono font-bold uppercase transition-colors"
                      >
                        Log
                      </button>
                    </div>
                  </div>
                </div>

                {/* Resolution Notes Field */}
                <div className="space-y-3">
                  <h4 className="font-mono text-[9.5px] font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-100 pb-2">
                    Internal Resolution Notes
                  </h4>
                  <div className="bg-zinc-50 rounded-2xl border border-zinc-200/80 p-3.5 space-y-2.5">
                    {/* Notes Toolbar */}
                    <div className="flex gap-1.5 border-b border-zinc-200 pb-2">
                      <button 
                        onClick={() => { AutoNovaAudio.playClick(); setDisputeNotesForm(prev => prev + ' **bold**'); }}
                        className="p-1 hover:bg-white rounded text-zinc-500 hover:text-teal-950 cursor-pointer transition-colors font-bold"
                        title="Bold"
                      >
                        B
                      </button>
                      <button 
                        onClick={() => { AutoNovaAudio.playClick(); setDisputeNotesForm(prev => prev + ' *italic*'); }}
                        className="p-1 hover:bg-white rounded text-zinc-500 hover:text-teal-950 cursor-pointer transition-colors italic"
                        title="Italic"
                      >
                        I
                      </button>
                      <button 
                        onClick={() => { AutoNovaAudio.playClick(); setDisputeNotesForm(prev => prev + ' \n- bullet'); }}
                        className="p-1 hover:bg-white rounded text-zinc-500 hover:text-teal-950 cursor-pointer transition-colors"
                        title="Bullet List"
                      >
                        • List
                      </button>
                      <div className="flex-1" />
                      <span className="font-mono text-[8px] text-zinc-400 font-bold uppercase flex items-center pr-1">Drafting Mode</span>
                    </div>

                    <textarea 
                      value={disputeNotesForm}
                      onChange={(e) => setDisputeNotesForm(e.target.value)}
                      placeholder="Type internal notes, verified parameters, proposed escrow releases..."
                      className="w-full bg-transparent border-none text-xs font-semibold text-zinc-600 focus:ring-0 resize-none min-h-[110px] leading-relaxed font-sans outline-none"
                    />

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => {
                          AutoNovaAudio.playSuccess();
                          setDisputes(prev => prev.map(d => d.id === selectedDispute.id ? { ...d, notes: disputeNotesForm } : d));
                          setSelectedDispute(prev => ({ ...prev, notes: disputeNotesForm }));
                          showNotification("Internal resolution notes saved successfully.", "success");
                        }}
                        className="px-3 py-1.5 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 rounded-xl font-mono text-[9px] font-bold uppercase transition-colors"
                      >
                        Save Notes
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Drawer Footer Action Panel */}
              <div className="p-6 border-t border-zinc-200 bg-zinc-50/50 flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => {
                      AutoNovaAudio.playClick();
                      if (selectedDispute.status === 'Closed' || selectedDispute.status === 'Resolved') {
                        showNotification("Dispute case is already completed.", "info");
                        return;
                      }
                      if (confirm(`Are you sure you want to close Case ${selectedDispute.id}? This flags the node as locked.`)) {
                        AutoNovaAudio.playSuccess();
                        setDisputes(prev => prev.map(d => d.id === selectedDispute.id ? { ...d, status: 'Closed' } : d));
                        setSelectedDispute(prev => ({ ...prev, status: 'Closed' }));
                        showNotification(`Dispute Case ${selectedDispute.id} closed and marked complete.`, "success");
                        setTradeLedger(prev => [
                          { id: `tx-${Math.floor(Math.random() * 9000) + 1000}`, time: new Date().toTimeString().split(' ')[0], text: `Closed dispute case: ${selectedDispute.id}`, type: 'system' },
                          ...prev
                        ]);
                      }
                    }}
                    className="py-3 px-4 border border-zinc-300 text-zinc-600 font-mono text-[9px] font-bold uppercase rounded-xl hover:bg-zinc-100/50 transition-all cursor-pointer"
                  >
                    Close Case
                  </button>
                  <button 
                    onClick={() => {
                      AutoNovaAudio.playClick();
                      if (confirm(`Release complete escrow funds ${selectedDispute.escrowAmount} to Seller ${selectedDispute.seller}? This action completes the transaction.`)) {
                        AutoNovaAudio.playSuccess();
                        setDisputes(prev => prev.map(d => d.id === selectedDispute.id ? { ...d, status: 'Resolved' } : d));
                        setAdminOrders(prev => prev.map(o => {
                          if (o.id === selectedDispute.orderId) {
                            return { ...o, status: 'Delivered', escrowStatus: 'released', disputeStatus: 'resolved' };
                          }
                          return o;
                        }));
                        setSelectedDispute(prev => ({ ...prev, status: 'Resolved' }));
                        showNotification(`Escrow finalized. ${selectedDispute.escrowAmount} disbursed to ${selectedDispute.seller}.`, "success");
                        setTradeLedger(prev => [
                          { id: `tx-${Math.floor(Math.random() * 9000) + 1000}`, time: new Date().toTimeString().split(' ')[0], text: `Escrow release: ${selectedDispute.escrowAmount} wired to ${selectedDispute.seller}`, type: 'escrow' },
                          ...prev
                        ]);
                      }
                    }}
                    className="py-3 px-4 border border-teal-950 text-teal-950 font-mono text-[9px] font-bold uppercase rounded-xl hover:bg-teal-50/50 transition-all cursor-pointer"
                  >
                    Payout Seller
                  </button>
                </div>
                <button 
                  onClick={() => {
                    AutoNovaAudio.playClick();
                    if (confirm(`Initiate complete rollback refund? This returns ${selectedDispute.escrowAmount} to Buyer ${selectedDispute.buyer} and cancels the vehicle title deed transfer.`)) {
                      AutoNovaAudio.playError();
                      setDisputes(prev => prev.map(d => d.id === selectedDispute.id ? { ...d, status: 'Resolved' } : d));
                      setAdminOrders(prev => prev.map(o => {
                        if (o.id === selectedDispute.orderId) {
                          return { ...o, status: 'Cancelled', escrowStatus: 'refunded', disputeStatus: 'refunded' };
                        }
                        return o;
                      }));
                      setSelectedDispute(prev => ({ ...prev, status: 'Resolved' }));
                      showNotification(`Rollback refund authorized. ${selectedDispute.escrowAmount} credited to ${selectedDispute.buyer}.`, "error");
                      setTradeLedger(prev => [
                        { id: `tx-${Math.floor(Math.random() * 9000) + 1000}`, time: new Date().toTimeString().split(' ')[0], text: `Refund executed: ${selectedDispute.escrowAmount} refunded to buyer ${selectedDispute.buyer}`, type: 'payment' },
                        ...prev
                      ]);
                    }
                  }}
                  className="w-full py-3.5 bg-teal-950 hover:bg-teal-900 text-white font-mono text-[9px] font-bold uppercase rounded-xl transition-all shadow-sm cursor-pointer hover:shadow"
                >
                  Process Full Refund
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* IMAGE LIGHTBOX OVERLAY */}
      {selectedReviewImage && (
        <div 
          onClick={() => setSelectedReviewImage(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 cursor-zoom-out"
        >
          <div className="relative max-w-2xl max-h-[80vh] bg-white border border-zinc-200 rounded-3xl overflow-hidden p-2 shadow-2xl">
            <img src={selectedReviewImage} alt="Attachment full resolution preview" className="max-w-full max-h-[75vh] object-contain rounded-2xl" />
            <button 
              onClick={() => setSelectedReviewImage(null)}
              className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* MODALS */}
      {/* MODAL: ADD / EDIT JOURNAL POST */}
      {showAddPostModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 w-full max-w-lg shadow-lg space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
              <h3 className="font-display text-sm font-extrabold text-teal-950 uppercase tracking-tight">
                {editingPost ? 'Edit Journal Article' : 'Compose Journal Article'}
              </h3>
              <button onClick={() => { AutoNovaAudio.playClick(); setShowAddPostModal(false); }} className="text-zinc-400 hover:text-zinc-700 cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Article Title</label>
                <input 
                  type="text" 
                  value={postForm.title}
                  onChange={(e) => setPostForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Solid-State Breakthroughs and Future Charging Corridors"
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Category</label>
                  <select 
                    value={postForm.category}
                    onChange={(e) => setPostForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                  >
                    <option value="Market Outlook">Market Outlook</option>
                    <option value="Market Trends">Market Trends</option>
                    <option value="EV News">EV News</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Buying Guides">Buying Guides</option>
                    <option value="Company Updates">Company Updates</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Author Name</label>
                  <input 
                    type="text" 
                    value={postForm.author}
                    onChange={(e) => setPostForm(prev => ({ ...prev, author: e.target.value }))}
                    placeholder="e.g. Sarah Jensen"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Excerpt / Short Summary</label>
                <textarea 
                  value={postForm.excerpt}
                  onChange={(e) => setPostForm(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Provide a compelling 1-2 sentence preview to draw in readers..."
                  rows={3}
                  className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-all outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Publishing Status</label>
                <select 
                  value={postForm.status}
                  onChange={(e) => setPostForm(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                >
                  <option value="Published">Published (Live instantly)</option>
                  <option value="Draft">Draft (Internal review)</option>
                  <option value="Scheduled">Scheduled (Deploy on date)</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button 
                onClick={() => { AutoNovaAudio.playClick(); setShowAddPostModal(false); }}
                className="px-4 py-2 border border-zinc-200 hover:bg-zinc-50 text-zinc-700 rounded-lg text-[9px] font-mono font-bold uppercase cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (!postForm.title || !postForm.excerpt) {
                    AutoNovaAudio.playError();
                    showNotification("Please provide all required fields.", "error");
                    return;
                  }
                  AutoNovaAudio.playSuccess();
                  if (editingPost) {
                    // Update
                    setAdminPosts(prev => prev.map(p => p.id === editingPost.id ? {
                      ...p,
                      title: postForm.title,
                      category: postForm.category,
                      excerpt: postForm.excerpt,
                      author: postForm.author,
                      status: postForm.status
                    } : p));
                    showNotification(`Journal article "${postForm.title}" updated successfully.`, "success");
                    setTradeLedger(prev => [
                      { id: `tx-${Math.floor(Math.random() * 9000) + 1000}`, time: new Date().toTimeString().split(' ')[0], text: `Admin updated journal article: ${postForm.title}`, type: 'system' },
                      ...prev
                    ]);
                  } else {
                    // Create new
                    const newPost = {
                      id: `art-${Date.now()}`,
                      title: postForm.title,
                      category: postForm.category,
                      excerpt: postForm.excerpt,
                      author: postForm.author,
                      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                      status: postForm.status,
                      views: 0,
                      likes: 0,
                      commentsCount: 0
                    };
                    setAdminPosts(prev => [newPost, ...prev]);
                    showNotification(`New journal article "${postForm.title}" published successfully.`, "success");
                    setTradeLedger(prev => [
                      { id: `tx-${Math.floor(Math.random() * 9000) + 1000}`, time: new Date().toTimeString().split(' ')[0], text: `Admin created new journal article: ${postForm.title}`, type: 'system' },
                      ...prev
                    ]);
                  }
                  setShowAddPostModal(false);
                }}
                className="px-4 py-2 bg-teal-950 hover:bg-teal-900 text-white rounded-lg text-[9px] font-mono font-bold uppercase cursor-pointer"
              >
                {editingPost ? 'Save Changes' : 'Publish Article'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT FAQ */}
      {showAddFaqModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 w-full max-w-lg shadow-lg space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
              <h3 className="font-display text-sm font-extrabold text-teal-950 uppercase tracking-tight">
                {editingFaq ? 'Edit FAQ Entry' : 'Add FAQ Entry'}
              </h3>
              <button onClick={() => { AutoNovaAudio.playClick(); setShowAddFaqModal(false); }} className="text-zinc-400 hover:text-zinc-700 cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Question</label>
                <input 
                  type="text" 
                  value={faqForm.question}
                  onChange={(e) => setFaqForm(prev => ({ ...prev, question: e.target.value }))}
                  placeholder="e.g. How does the secure escrow protocol protect buyers?"
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Module Area Category</label>
                <select 
                  value={faqForm.category}
                  onChange={(e) => setFaqForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                >
                  <option value="Buying">Buying</option>
                  <option value="Selling">Selling</option>
                  <option value="Financing">Financing</option>
                  <option value="Account">Account</option>
                  <option value="Payments">Payments</option>
                  <option value="Delivery">Delivery</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Detailed Answer</label>
                <textarea 
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm(prev => ({ ...prev, answer: e.target.value }))}
                  placeholder="Provide a clear, rich, and highly informational response node..."
                  rows={4}
                  className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-all outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Status</label>
                <select 
                  value={faqForm.status}
                  onChange={(e) => setFaqForm(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                >
                  <option value="Published">Published (Live in Help Center)</option>
                  <option value="Draft">Draft (Internal review)</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button 
                onClick={() => { AutoNovaAudio.playClick(); setShowAddFaqModal(false); }}
                className="px-4 py-2 border border-zinc-200 hover:bg-zinc-50 text-zinc-700 rounded-lg text-[9px] font-mono font-bold uppercase cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (!faqForm.question || !faqForm.answer) {
                    AutoNovaAudio.playError();
                    showNotification("Please provide all required fields.", "error");
                    return;
                  }
                  AutoNovaAudio.playSuccess();
                  if (editingFaq) {
                    // Update
                    setAdminFaqs(prev => prev.map(f => f.id === editingFaq.id ? {
                      ...f,
                      question: faqForm.question,
                      category: faqForm.category,
                      answer: faqForm.answer,
                      status: faqForm.status
                    } : f));
                    showNotification(`FAQ entry updated successfully.`, "success");
                    setTradeLedger(prev => [
                      { id: `tx-${Math.floor(Math.random() * 9000) + 1000}`, time: new Date().toTimeString().split(' ')[0], text: `Admin updated FAQ: "${faqForm.question.slice(0, 30)}..."`, type: 'system' },
                      ...prev
                    ]);
                  } else {
                    // Create new
                    const newFaq = {
                      id: `faq-${Date.now()}`,
                      question: faqForm.question,
                      category: faqForm.category,
                      answer: faqForm.answer,
                      status: faqForm.status
                    };
                    setAdminFaqs(prev => [newFaq, ...prev]);
                    showNotification(`New FAQ entry added to Help Center databases.`, "success");
                    setTradeLedger(prev => [
                      { id: `tx-${Math.floor(Math.random() * 9000) + 1000}`, time: new Date().toTimeString().split(' ')[0], text: `Admin created new FAQ: "${faqForm.question.slice(0, 30)}..."`, type: 'system' },
                      ...prev
                    ]);
                  }
                  setShowAddFaqModal(false);
                }}
                className="px-4 py-2 bg-teal-950 hover:bg-teal-900 text-white rounded-lg text-[9px] font-mono font-bold uppercase cursor-pointer"
              >
                {editingFaq ? 'Save Changes' : 'Add FAQ'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 w-full max-w-md shadow-lg space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
              <h3 className="font-display text-sm font-extrabold text-teal-950 uppercase tracking-tight">Add Administrative User</h3>
              <button onClick={() => { AutoNovaAudio.playClick(); setShowAddUserModal(false); }} className="text-zinc-400 hover:text-zinc-700 cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Alaba Peters"
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="e.g. alaba@autonova.intel"
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Role</label>
                  <select 
                    value={newUserForm.role}
                    onChange={(e) => setNewUserForm(prev => ({ ...prev, role: e.target.value, tagline: e.target.value === 'Admin' ? 'System Operator' : e.target.value === 'Seller' ? 'Power Seller' : 'Verified Buyer' }))}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none"
                  >
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Tagline</label>
                  <input 
                    type="text" 
                    value={newUserForm.tagline}
                    onChange={(e) => setNewUserForm(prev => ({ ...prev, tagline: e.target.value }))}
                    placeholder="Verified Member"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-all"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button 
                onClick={() => { AutoNovaAudio.playClick(); setShowAddUserModal(false); }}
                className="px-4 py-2 border border-zinc-200 hover:bg-zinc-50 text-zinc-700 rounded-lg text-[9px] font-mono font-bold uppercase cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (!newUserForm.name || !newUserForm.email) {
                    AutoNovaAudio.playError();
                    showNotification("Please provide all required fields.", "error");
                    return;
                  }
                  AutoNovaAudio.playSuccess();
                  const addedUser = {
                    id: `NOVA-${Math.floor(Math.random() * 9000) + 1000}`,
                    name: newUserForm.name,
                    email: newUserForm.email,
                    role: newUserForm.role,
                    tagline: newUserForm.tagline,
                    status: 'Active',
                    joined: 'Today',
                    lastActive: 'Just now',
                    trustScore: '100%',
                    listingsCount: 0,
                    recentActivity: [
                      { text: "Account provisioned administratively", time: "Just now" }
                    ],
                    kycVerified: true
                  };
                  setUsers(prev => [addedUser, ...prev]);
                  setSelectedUser(addedUser);
                  setShowAddUserModal(false);
                  showNotification(`Administrative account provisioned for ${newUserForm.name} successfully.`, "success");
                  setTradeLedger(prev => [
                    { id: `tx-${Math.floor(Math.random() * 9000) + 1000}`, time: new Date().toTimeString().split(' ')[0], text: `Admin created new ${newUserForm.role} node: ${newUserForm.name}`, type: 'security' },
                    ...prev
                  ]);
                }}
                className="px-4 py-2 bg-teal-950 hover:bg-teal-900 text-white rounded-lg text-[9px] font-mono font-bold uppercase cursor-pointer"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}

      {showMessageModal && selectedUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 w-full max-w-md shadow-lg space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
              <h3 className="font-display text-sm font-extrabold text-teal-950 uppercase tracking-tight">Secure Message Notice</h3>
              <button onClick={() => { AutoNovaAudio.playClick(); setShowMessageModal(false); }} className="text-zinc-400 hover:text-zinc-700 cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-zinc-500 font-medium">Recipient Node: <span className="font-semibold text-teal-950">{selectedUser.name}</span> ({selectedUser.email})</p>
              <textarea 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your official notice or warnings here..."
                rows={4}
                className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-all outline-none resize-none"
              />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button 
                onClick={() => { AutoNovaAudio.playClick(); setShowMessageModal(false); }}
                className="px-4 py-2 border border-zinc-200 hover:bg-zinc-50 text-zinc-700 rounded-lg text-[9px] font-mono font-bold uppercase cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (!messageText.trim()) {
                    AutoNovaAudio.playError();
                    showNotification("Cannot send empty secure message notice.", "error");
                    return;
                  }
                  AutoNovaAudio.playSuccess();
                  showNotification(`Secure cryptographic notice routed to ${selectedUser.name}.`, "success");
                  setTradeLedger(prev => [
                    { id: `tx-${Math.floor(Math.random() * 9000) + 1000}`, time: new Date().toTimeString().split(' ')[0], text: `Secure notice dispatched to ${selectedUser.name}: "${messageText.slice(0, 30)}..."`, type: 'system' },
                    ...prev
                  ]);
                  setShowMessageModal(false);
                }}
                className="px-4 py-2 bg-teal-950 hover:bg-teal-900 text-white rounded-lg text-[9px] font-mono font-bold uppercase cursor-pointer"
              >
                Send Notice
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
