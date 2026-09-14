import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Clock, ArrowRight, BookOpen, Heart, Bookmark, 
  MessageSquare, Share2, Send, Sparkles, ChevronLeft, 
  User, Check, AlertCircle, BookmarkCheck, ThumbsUp, HelpCircle
} from 'lucide-react';
import { AutoNovaAudio } from './AudioEngine';

// Rich mock data for the blog articles with complete structured reading content
export const INITIAL_ARTICLES = [
  {
    id: 'art-1',
    title: 'The Future of Kinetic Mobility: 2025 EV Outlook',
    category: 'Market Outlook',
    excerpt: 'As the automotive landscape shifts towards complete electrification, AutoNova explores the upcoming breakthroughs in solid-state batteries and autonomous AI integration arriving in 2025.',
    content: `As we cross the threshold into 2025, the automotive industry is no longer just transitioning to electric; it's evolving into a sophisticated ecosystem of kinetic intelligence. The "2025 EV Outlook" reveals a landscape where software-defined vehicles and hardware innovations converge to solve the long-standing friction points of range, charging, and ownership value.

At AutoNova, we've analyzed the trajectory of over 40 global manufacturers and emerging battery startups. The results point toward a singular conclusion: the electric vehicle is moving away from being a product and toward becoming a seamless node in a wider technological network.

### Solid-State Breakthroughs
The "Holy Grail" of battery technology—solid-state electrolytes—is finally moving from laboratory curiosity to pilot production. Unlike traditional lithium-ion cells that use liquid electrolytes, solid-state batteries offer higher energy density, faster charging times, and enhanced safety.

Traditional batteries cap out around 250-300 Wh/kg. The newly tested solid electrolyte cells at AutoNova's partner labs are pushing past 500 Wh/kg. In practical terms, this translates to luxury electric sedans achieving a real-world driving range of over 850 miles on a single charge—without adding weight or compromising passenger cabin space.

### AI Integration
Artificial Intelligence is now the central nervous system of the 2025 EV. Predictive thermal management algorithms are increasing effective winter range by up to 15%, while AI-driven valuation models are helping owners understand the real-time health and resale value of their battery packs with unprecedented accuracy.

### Charging Infrastructure
The roll-out of next-generation megawatt-level charging interfaces is transforming public long-distance corridors. These systems deliver up to 400 kW of continuous current, supported by AI-driven grid optimization that prevents thermal peak stress on local distribution nodes while delivering up to 180 miles of range in just under 5 minutes.

### Conclusion
In conclusion, the 2025 electric vehicle landscape is defined by the absolute convergence of material breakthroughs and ambient artificial intelligence. At AutoNova, we believe that the true luxury of tomorrow's transportation is not merely speed or style, but the complete elimination of friction.`,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLtNe-X2uvF2oXeKHrx1rc7DBAVwyA2uCjWSjWX_9P5FqvIDX0z1sloMfvWeFiLhhojeMbUBxLVdp8Vq925rU3P_2SwTAR4Z5CfDB1xwPX_zeqOYW0-VQgAjFqEaXFjUkG_XuEUHgr1CKxuFi4IrNWkMsP_bzdUtrU3szVQeCL0N6TnZhVgGSwpoxgQzyTwyrsoHtZXmJPS0mpfZkEmyXxywJzX80ULxRuqcYeVdh87Xnr52TAY0ChP2zTZw',
    author: 'Sarah Jensen',
    authorRole: 'Head of Powertrain Research',
    date: 'Jan 15, 2024',
    readTime: '8 min read',
    views: 1240,
    likes: 342,
    bookmarks: 88,
    comments: [
      { id: 'c1', user: 'Alex Sterling', text: 'This is the breakthrough we have all been waiting for. The weight savings alone will completely change sports EV handling.', date: '1 day ago' },
      { id: 'c2', user: 'Dr. Linda Vane', text: 'Excellent summary. However, we still need to address the low-temperature conductivity of ceramic-based electrolytes before full commercialization.', date: '12 hours ago' }
    ]
  },
  {
    id: 'art-2',
    title: "AI Valuation: How We Predict Your Car's Worth",
    category: 'Market Trends',
    excerpt: "Behind the scenes of AutoNova's proprietary algorithm that analyzes 140+ data points to give you the most accurate quote.",
    content: `When you request a valuation on AutoNova, the price you receive isn't a mere average of recent sales. It is the output of a sophisticated neural matching system that analyzes the global automotive market in real time. We look past the standard make, model, and mileage to understand the precise gravity of your asset.

### The 140+ Point Dynamic Vector Matrix
Our machine learning models digest live data across hundreds of data vectors, including:
1. **Regional Demand Fluctuations:** Is a specific convertible trending in coastal hubs?
2. **Micro-Condition Indicators:** How does a rare paint code or trim option affect the velocity of sale?
3. **Macroeconomic Indicators:** Real-time interest rates, luxury index benchmarks, and transport fuel pricing trends.
4. **Historical Auction Yields:** Scraping global physical and digital wholesale platforms to determine raw residual strength.

### Eliminating the Guesswork
Historically, selling a luxury car meant negotiating against arbitrary dealership appraisals. Our system introduces absolute transparency, calculating a certified market index value that is backed by real capital. This ensures that both buyers and sellers operate with complete informational symmetry.`,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi-f3o3aOlgbe-bu0b-Wq3Es5IDxu03RlaqIv8yfIUQPxev4-qNfgNIg0vqVFN_Z67EFJjpTSDF22jQSTrJUo3qeEzcFuJjrZqrZzJ4wBd-ozjZptgElVZSSYcet6YvXHaaxMam_N7KsNpPENNZH3RykN-MtwgEioAEfYC4hkIuYKjvPxfZJbPYjt3v6NBIPgVGxiNgysP7QcQ1lRP4TCDFRB7kzqi2lO-ANRmKshfE4WfMlFNYx_CrwT_LAaGaEpV9y9-q5t7wToz',
    author: 'Marcus Chen',
    authorRole: 'Chief Data Scientist',
    date: 'July 09, 2026',
    readTime: '5 min read',
    views: 948,
    likes: 198,
    bookmarks: 45,
    comments: [
      { id: 'c1', user: 'Ngozi Obi', text: 'I tried the valuation tool yesterday and was shocked at how accurate it was compared to physical dealership offers.', date: '2 days ago' }
    ]
  },
  {
    id: 'art-3',
    title: 'Charging Best Practices for Battery Longevity',
    category: 'Maintenance',
    excerpt: "Maximize your EV's life with our expert guide on charging cycles, thermal management, and home setup optimizations.",
    content: `Electric vehicle battery packs are highly engineered chemical systems. To keep them operating at maximum efficiency over hundreds of thousands of miles, owners can adopt a few key charging habits that drastically reduce degradation rates.

### The 80/20 Golden Rule
Lithium-ion cells experience the highest amount of physical stress when they are at extreme states of charge. Keeping your battery sitting at 100% or letting it drop below 10% causes microscopic fractures in the electrode material over time. For daily commuting, setting your vehicle's charge limit to 80% is the single best way to prolong its operational life.

### Dynamic Thermal Conditioning
Fast charging a "cold" or "excessively hot" battery causes accelerated wear. AutoNova vehicles are equipped with active thermal pre-conditioning systems. When navigating to a high-speed DC fast charger via the onboard computer, the vehicle will automatically heat or cool the battery pack to its optimal electrochemical temperature (around 30-35°C) before arrival, ensuring ultra-fast charging without damaging the lithium lattice structure.

### AC vs. DC Balance
While DC fast chargers are wonderful for road trips, relying on them exclusively puts higher thermal stress on the cells. Utilizing standard Level 2 AC chargers overnight allows the battery management system to perform cell balancing—a vital process where weaker cells are gently brought to parity with stronger ones.`,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoubeNxa5Ot1nQekASJl1nzcYSa8fCpNuRVrLj2rz_YS5IigXVLcNl602JkZNmIarfkeg5PBXaBwIoifPM52SoaGTA0FLk4ApTqC1L3lUPR1NbMJxnjCbo0V2-qe55H4_T5VvNTDr3ZWlO5jcN8j3UFyV3r9bEyp5CIprXxPgjTuYtiSlhvNhQGmCKJC-qkGxDOLryNXcPdBLcQnBPjAWGlJ9VSb-gtb7Zaug4K5pTXig0lrTg2WI8baa7aiVArK_9b1fEldM8hRu7',
    author: 'David Miller',
    authorRole: 'Director of Customer Experience',
    date: 'July 05, 2026',
    readTime: '6 min read',
    views: 1102,
    likes: 289,
    bookmarks: 104,
    comments: [
      { id: 'c1', user: 'Tariq Al-Mansoor', text: 'Excellent guide. I have followed the 80% rule on my Eko GT for two years and my battery health indicator is still at 99%.', date: '3 days ago' }
    ]
  },
  {
    id: 'art-4',
    title: 'Why Luxury Resale Values are Stabilizing',
    category: 'Market Trends',
    excerpt: 'A detailed analysis of the high-end automotive market and why premium brands are holding value better than expected.',
    content: `After several years of intense volatility, the premium and luxury automotive resale market is entering a highly stabilized plateau. While mass-market vehicles are experiencing standard depreciation slopes, high-end performance cars, limited-edition grand tourers, and exotic hypercars are holding value remarkably well.

### Scarcity and Tailored Options
Luxury car manufacturers have significantly adapted their supply models, focusing on built-to-order models rather than bulk dealership inventories. This means that pre-owned luxury vehicles are highly customized, often carrying bespoke paint-to-sample (PTS) colors or customized carbon fiber packages that cannot be easily replicated or ordered today.

### The Rise of Modern Collectibles
We are witnessing a profound generational shift in what constitutes a "collectible" car. High-tech, first-generation luxury electric vehicles and highly refined hybrid hypercars are becoming incredibly sought after by younger tech entrepreneurs who view physical engineering marvels as dynamic sculpture.

### Buying Smart with Certified Inspection
To capitalize on this stabilization, securing a vehicle with an absolute digital paper trail is crucial. AutoNova's blockchain-backed verification system ensures that every luxury vehicle traded on our platform is completely authenticated, which immediately preserves its resale index by 12-15% compared to anonymous auction listings.`,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwgbVdwiLDk72NezUVA7qJ92tvjGG_T770JR899S6fBvtuV2hB8wuQli_PN6_z5ONF_A2yrjyAZilrR26TSMq0jx0nnRTuxm5upZ1wd_cEdV2nNaCUCWFt8hlulv9p6ioASq9p3Tfi_vJEw5tqPJ8E2zLvYpSqewN4C0Tjt-DdDC8zdGrDsf9pocy6RLVhympK4CzeuG2Lx6_ol5peui97o8ed1Sg9RQXZD4NWPkrdihbRRqXyF5qrsxUmwb4t3nGDDiYI92vgQlrX',
    author: 'Elena Rodriguez',
    authorRole: 'Senior Market Analyst',
    date: 'June 28, 2026',
    readTime: '10 min read',
    views: 843,
    likes: 154,
    bookmarks: 32,
    comments: []
  },
  {
    id: 'art-5',
    title: 'AutoNova Expands: New Tech Hub in Munich',
    category: 'Company Updates',
    excerpt: "We're bringing our AI-driven car trading platform to Europe with a new R&D center focused on sustainable logistics.",
    content: `We are thrilled to officially announce the opening of the AutoNova European Research and Development Headquarters in Munich, Germany. Located in the heart of Bavaria's automotive epicenter, this state-of-the-art facility will house over 200 software engineers, AI researchers, and sustainable logistics coordinators.

### Engineering the Future of Global Trade
The Munich hub will lead several of AutoNova's critical future initiatives:
1. **Transnational Logistic AI:** Optimizing marine and rail freight pathways for secure international delivery of bespoke collector vehicles.
2. **Next-Generation Telemetry Interfacing:** Researching advanced HUD (Head-Up Display) integrations that interface directly with our customer mobile applications.
3. **Decarbonized Transit Pathways:** Developing carbon-neutral container transportation methods to guarantee zero-emissions delivery for every vehicle in our premium catalog.

### Bridging Silicon Valley with Bavarian Craft
Munich represents the perfect marriage between meticulous traditional manufacturing craftsmanship and futuristic software capabilities. By establishing a physical footprint alongside Europe's leading engineering universities, we are securing a continuous stream of elite design talent.`,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPUv9YdrSnansij3teBCMYfMANcU8UA70_AHbFm8bLFE1lXDxYavhfAfcTNngxDDrQF8gKSzkambi6uDHMTSqexpJ9KKpO2_zRhil0cY3eKU0fJrEDEA3uKwH8V6A2pH9lR7C06M0goq_1qK1ZNV5GnMWsd4h5yUD3gcr_-P1jCE-uj63wyan5MGEl121LlKaVtzDQDhCK2wmKNtMfoct1L4z7XVCR_2nguZmQ663Y4NlAXbxTFZiXL9V6DdwSLE2kFR7yyA4pd0T0',
    author: 'AutoNova Team',
    authorRole: 'Corporate Communications',
    date: 'June 18, 2026',
    readTime: '3 min read',
    views: 732,
    likes: 112,
    bookmarks: 14,
    comments: [
      { id: 'c1', user: 'Hans Keller', text: 'Herzlich willkommen in München! This is a massive win for the local engineering ecosystem.', date: '2 weeks ago' }
    ]
  },
  {
    id: 'art-6',
    title: 'The Best AWD SUVs for Winter 2024',
    category: 'Buying Guides',
    excerpt: 'Our rigorous test of the latest all-wheel drive systems to find the ultimate performance in treacherous conditions.',
    content: `Winter driving demands a level of active feedback and mechanical confidence that standard vehicles simply cannot deliver. Our engineering team took four premium all-wheel drive SUVs up to the Arctic Circle Testing Grounds in northern Sweden to evaluate their torque-vectoring response, chassis stability control, and cabin thermal performance under sustained sub-zero temperatures.

### The Physics of Modern Traction
Traditional all-wheel-drive systems rely on mechanical differentials that shift power *after* a wheel starts to slip. In contrast, modern electric and hybrid SUVs employ intelligent proactive torque vectoring. By using dedicated electric motors on each axle—and in some luxury trim lines, on each wheel—the vehicle can adjust power output in microseconds based on yaw sensors and throttle angle.

### Cabin Insulation and Efficiency
Electric vehicles often lose substantial driving range in winter due to cabin heating demands. We thoroughly evaluated heat pump efficiency. The top-performing SUVs on our list utilized advanced scavenged-heat systems, routing excess heat generated by the electric drive inverters into the cabin heating loop, saving up to 25% battery energy compared to standard resistance heaters.`,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMDAxsMoFg-iCurpIy-nUWgT8tXPiACAPosKqG64Vlftib1eRSvb6xvv0eDtvM-TQAD7H1V9M0VKCIWiyS0pHMAe1ZU0dmEOCDyliFdUd05VTGiUb9ad79h-KKI9lAx57V8HGeq3cvkUNMX-4XIphDziYh0ZHVtTXQ3JS9BFZdSAQsSz_mFn0hI0wYLsC8WvpaVqtmwa7fwXAHMK3Jg4DmDsU2jNiufgGAXenn0d-KDqtdKBFySgXzfOyFGGdj9mCvlbiwsVjHEh3v',
    author: 'James Wilson',
    authorRole: 'Chief Vehicle Testing Editor',
    date: 'December 15, 2024',
    readTime: '12 min read',
    views: 1421,
    likes: 412,
    bookmarks: 98,
    comments: []
  },
  // Load More extra articles to show active interaction!
  {
    id: 'art-7',
    title: 'The Physics of Active Aerodynamics',
    category: 'EV News',
    excerpt: 'How variable flaps, extending wings, and dynamic ride height maximize range and stability at high speeds.',
    content: `Wind resistance is the primary enemy of electric vehicle range. At freeway speeds, over 60% of battery energy is spent pushing air out of the way. Active aerodynamics are transitioning from high-end hypercars down to daily luxury cruisers, turning the chassis into a living, responsive entity that reshapes itself based on velocity.

### Variable Venting
When driving at moderate speeds or stuck in urban traffic, batteries need cooling. Front bumper flaps open to guide air into cooling modules. However, once the highway is reached, the computer automatically seals these openings to create a smooth, uninterrupted boundary layer flow, significantly lowering the coefficient of drag.

### Dynamic Underbody Diffusers
Air traveling underneath the car is just as critical as air traveling over it. Actively lowering the suspension by as little as 10mm changes the ground effect, channeling fast-moving air into optimized rear diffusers to produce high-velocity downforce without inducing extra aerodynamic drag.`,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoubeNxa5Ot1nQekASJl1nzcYSa8fCpNuRVrLj2rz_YS5IigXVLcNl602JkZNmIarfkeg5PBXaBwIoifPM52SoaGTA0FLk4ApTqC1L3lUPR1NbMJxnjCbo0V2-qe55H4_T5VvNTDr3ZWlO5jcN8j3UFyV3r9bEyp5CIprXxPgjTuYtiSlhvNhQGmCKJC-qkGxDOLryNXcPdBLcQnBPjAWGlJ9VSb-gtb7Zaug4K5pTXig0lrTg2WI8baa7aiVArK_9b1fEldM8hRu7',
    author: 'Sarah Jensen',
    authorRole: 'Head of Powertrain Research',
    date: 'May 10, 2026',
    readTime: '7 min read',
    views: 654,
    likes: 120,
    bookmarks: 25,
    comments: []
  },
  {
    id: 'art-8',
    title: 'Bespoke Customization and the Collector Mindset',
    category: 'Market Trends',
    excerpt: 'An investigation into the rapid rise of tailor-made factory options and how personalization affects collector value.',
    content: `In the modern age of luxury motoring, luxury is no longer defined by what is expensive, but by what is unique. High-net-worth collectors are increasingly ignoring off-the-lot premium cars in favor of complete design customization programs like Porsche Exclusive Manufaktur, Bentley Mulliner, or our proprietary AutoNova Infinite Customization pipeline.

### The Provenance Coefficient
Personalizing a vehicle with a rare paint color or custom hand-stitched leather may seem like a high-risk venture for resale value. However, statistics demonstrate that vehicles with highly documented bespoke configurations hold an average of 18% higher premium indexes over standard factory configurations when sold in the secondary market.

### Crafting a Heritage File
The key to preserving custom vehicle value is documenting the artistic journey. Every bespoke vehicle delivered through AutoNova receives a high-fidelity digital design ledger. This file details the selection of sustainable materials, raw aluminum block milling videos, and signatures of the master craftsmen who built the car, preserving its historic value forever.`,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi-f3o3aOlgbe-bu0b-Wq3Es5IDxu03RlaqIv8yfIUQPxev4-qNfgNIg0vqVFN_Z67EFJjpTSDF22jQSTrJUo3qeEzcFuJjrZqrZzJ4wBd-ozjZptgElVZSSYcet6YvXHaaxMam_N7KsNpPENNZH3RykN-MtwgEioAEfYC4hkIuYKjvPxfZJbPYjt3v6NBIPgVGxiNgysP7QcQ1lRP4TCDFRB7kzqi2lO-ANRmKshfE4WfMlFNYx_CrwT_LAaGaEpV9y9-q5t7wToz',
    author: 'Marcus Chen',
    authorRole: 'Chief Data Scientist',
    date: 'April 02, 2026',
    readTime: '9 min read',
    views: 521,
    likes: 98,
    bookmarks: 18,
    comments: []
  }
];

export function BlogView({ userName, role, onNavigateToView, showNotification, articleSlug }) {
  const navigate = useNavigate();
  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem('autonova_articles');
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
  });

  useEffect(() => {
    localStorage.setItem('autonova_articles', JSON.stringify(articles));
  }, [articles]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeSection, setActiveSection] = useState('introduction');

  // Load the correct article when arriving via /blog/:slug — previously this prop
  // was completely ignored, so every article URL silently showed the generic hub instead.
  useEffect(() => {
    if (articleSlug) {
      const match = articles.find(a => a.id === articleSlug);
      if (match) {
        setSelectedArticle(match);
      } else {
        showNotification && showNotification("That article couldn't be found.", "error");
        navigate('/blog');
      }
    } else {
      setSelectedArticle(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleSlug]);

  // Keep the URL in sync whenever an article is opened/closed from within the page,
  // so individual articles are properly shareable/bookmarkable.
  const openArticle = (article) => {
    setSelectedArticle(article);
    navigate(`/blog/${article.id}`);
  };
  const closeArticle = () => {
    setSelectedArticle(null);
    navigate('/blog');
  };

  // Dynamic Headings for the Table of Contents (TOC)
  const articleHeadings = useMemo(() => {
    if (!selectedArticle) return [];
    const headings = [{ id: 'introduction', text: 'Introduction' }];
    selectedArticle.content.split('\n\n').forEach(para => {
      if (para.startsWith('###')) {
        const text = para.replace('###', '').trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        headings.push({ id, text });
      }
    });
    return headings;
  }, [selectedArticle]);

  // Scroll listener to update active TOC section
  useEffect(() => {
    if (!selectedArticle) return;
    const handleScroll = () => {
      let current = 'introduction';
      for (let i = 0; i < articleHeadings.length; i++) {
        const el = document.getElementById(articleHeadings[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            current = articleHeadings[i].id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedArticle, articleHeadings]);
  
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // Bookmarks / Likes state (Local session storage logic)
  const [likedArticles, setLikedArticles] = useState({});
  const [bookmarkedArticles, setBookmarkedArticles] = useState({});

  // Interactive AI Assistant chat inside Article View
  const [aiChatQuery, setAiChatQuery] = useState('');
  const [aiChatResponses, setAiChatResponses] = useState([]);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  // New Comment state
  const [newCommentText, setNewCommentText] = useState('');
  const [commentAuthorName, setCommentAuthorName] = useState(userName || 'Anonymous Client');

  // Filter and Search logic
  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
      const matchesSearch = 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  // Handle newsletter signup
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    AutoNovaAudio.playSuccess();
    setIsSubscribed(true);
    showNotification(`Subscribed successfully! Custom briefings will be dispatched to ${newsletterEmail}`, "success");
    setNewsletterEmail('');
  };

  // Toggle Like
  const handleToggleLike = (artId, e) => {
    if (e) e.stopPropagation();
    AutoNovaAudio.playClick();
    const wasLiked = likedArticles[artId];
    
    setLikedArticles(prev => ({
      ...prev,
      [artId]: !wasLiked
    }));

    setArticles(prev => prev.map(art => {
      if (art.id === artId) {
        return {
          ...art,
          likes: wasLiked ? art.likes - 1 : art.likes + 1
        };
      }
      return art;
    }));

    showNotification(
      wasLiked ? "Removed recommendation from digital hub" : "Article recommended to your global matching network",
      "success"
    );
  };

  // Toggle Bookmark
  const handleToggleBookmark = (artId, e) => {
    if (e) e.stopPropagation();
    AutoNovaAudio.playClick();
    const wasBookmarked = bookmarkedArticles[artId];

    setBookmarkedArticles(prev => ({
      ...prev,
      [artId]: !wasBookmarked
    }));

    setArticles(prev => prev.map(art => {
      if (art.id === artId) {
        return {
          ...art,
          bookmarks: wasBookmarked ? art.bookmarks - 1 : art.bookmarks + 1
        };
      }
      return art;
    }));

    showNotification(
      wasBookmarked ? "Article removed from secure briefing vault" : "Saved to your private briefing vault",
      "success"
    );
  };

  // Add Comment
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    AutoNovaAudio.playSuccess();

    const newComment = {
      id: `comment-${Date.now()}`,
      user: commentAuthorName.trim() || 'Anonymous Client',
      text: newCommentText.trim(),
      date: 'Just now'
    };

    setArticles(prev => prev.map(art => {
      if (art.id === selectedArticle.id) {
        const updatedArt = {
          ...art,
          comments: [...art.comments, newComment]
        };
        // Also update selectedArticle state
        setSelectedArticle(updatedArt);
        return updatedArt;
      }
      return art;
    }));

    setNewCommentText('');
    showNotification("Scientific peer comment published to article ledger.", "success");
  };

  // Ask AI about this article
  const handleAskAiAboutArticle = (e) => {
    e.preventDefault();
    if (!aiChatQuery.trim()) return;

    AutoNovaAudio.playClick();
    const userQuery = aiChatQuery;
    setAiChatQuery('');
    setAiChatResponses(prev => [...prev, { sender: 'user', text: userQuery }]);
    setIsAiGenerating(true);

    setTimeout(() => {
      AutoNovaAudio.playSuccess();
      let aiText = `I have scanned this article regarding "${selectedArticle.title}". Based on our telemetry systems, `;
      
      // Smart contextual replies based on article words
      const lowerQuery = userQuery.toLowerCase();
      if (lowerQuery.includes('summary') || lowerQuery.includes('summarize') || lowerQuery.includes('points')) {
        aiText += `here are the primary key takeaways:
1. **Pristine Innovation**: Technologies mentioned here represent the next 2-3 years of high-performance automotive blueprints.
2. **Optimal Performance**: Adhering to the outlined operational parameters will yield up to 15-20% lifetime efficiency gains.
3. **Asset Protection**: AutoNova integrates these indicators to preserve your collector resale valuation index by up to 18%.`;
      } else if (lowerQuery.includes('battery') || lowerQuery.includes('charging') || lowerQuery.includes('solid-state')) {
        aiText += `solid-state battery integration avoids traditional thermal volatility and optimizes charge latency down to 8 minutes. We recommend daily charging limiting of 80% to maintain a degradation gradient of less than 0.2% per 10,000 km.`;
      } else if (lowerQuery.includes('market') || lowerQuery.includes('price') || lowerQuery.includes('valuation') || lowerQuery.includes('resale')) {
        aiText += `market values are stabilizing due to the scarcity coefficient. The premium customization (Mulliner, PTS, or custom carbon fiber) remains highly resilient against traditional asset depreciation.`;
      } else {
        aiText += `the integration of this technology directly impacts vehicle longevity and ride quality. If you would like AutoNova to configure custom active notification thresholds for your owned garage assets, please coordinate with your concierge team in the Settings portal.`;
      }

      setAiChatResponses(prev => [...prev, { sender: 'ai', text: aiText }]);
      setIsAiGenerating(false);
    }, 1200);
  };

  const categories = ['All', 'Market Outlook', 'Buying Guides', 'EV News', 'Maintenance', 'Market Trends', 'Company Updates'];

  return (
    <div className="w-full bg-[#fdf8f8] min-h-screen pb-16 font-sans">
      <AnimatePresence mode="wait">
        {!selectedArticle ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            {/* Elegant Header Area */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-200/50 gap-4">
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-extrabold text-teal-950 tracking-tight">
                  AutoNova Insights
                </h1>
                <p className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase font-bold mt-1">
                  KINETIC JOURNAL • NEWS, ENGINEERING &amp; LUXURY VALUATIONS
                </p>
              </div>
              <div className="flex items-center gap-3 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100">
                <Sparkles className="h-4 w-4 text-purple-600 animate-pulse" />
                <span className="text-[10px] font-mono text-teal-800 font-bold uppercase tracking-wider">
                  AI-Optimized Briefings Active
                </span>
              </div>
            </div>

            {/* Featured Article Hero Section */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-8">
              <div 
                className="relative w-full h-[460px] rounded-3xl overflow-hidden shadow-lg group cursor-pointer"
                onClick={() => {
                  AutoNovaAudio.playClick();
                  // Open first article (Solid-State Batteries) or special article
                  const featured = articles[0];
                  setSelectedArticle(featured);
                  setAiChatResponses([]);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-103" 
                  style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida/AP1WRLtNe-X2uvF2oXeKHrx1rc7DBAVwyA2uCjWSjWX_9P5FqvIDX0z1sloMfvWeFiLhhojeMbUBxLVdp8Vq925rU3P_2SwTAR4Z5CfDB1xwPX_zeqOYW0-VQgAjFqEaXFjUkG_XuEUHgr1CKxuFi4IrNWkMsP_bzdUtrU3szVQeCL0N6TnZhVgGSwpoxgQzyTwyrsoHtZXmJPS0mpfZkEmyXxywJzX80ULxRuqcYeVdh87Xnr52TAY0ChP2zTZw')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-zinc-950/45 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-3xl z-10">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 mb-4 rounded-full bg-purple-500/20 border border-purple-400 text-purple-200 text-[9px] font-mono font-bold uppercase tracking-widest">
                    <Sparkles className="h-3 w-3 text-purple-300 animate-spin" /> FEATURED DISPATCH
                  </span>
                  <h2 className="text-white font-display text-2xl md:text-4xl font-extrabold mb-3 tracking-tight leading-tight group-hover:text-purple-200 transition-colors">
                    The Future of Kinetic Mobility: 2025 EV Outlook
                  </h2>
                  <p className="text-zinc-200/90 font-body-md text-xs md:text-sm mb-6 max-w-2xl leading-relaxed font-medium">
                    As the automotive landscape shifts towards complete electrification, AutoNova explores the upcoming breakthroughs in solid-state batteries and autonomous AI integration arriving in 2025.
                  </p>
                  <div className="flex items-center gap-6">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-mono text-[10px] font-black uppercase tracking-widest transition-all scale-100 active:scale-95 shadow-lg shadow-purple-900/30">
                      Read Blueprint
                    </button>
                    <span className="text-[10px] text-zinc-300 font-mono flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> 8 MIN READ • BY SARAH JENSEN
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Filter Categories & Live Search Bar */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-4 border-b border-zinc-200/40">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Horizontal scrollable categories */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        AutoNovaAudio.playClick();
                        setSelectedCategory(cat);
                      }}
                      className={`px-4 py-2 rounded-full font-mono text-[9px] font-extrabold tracking-wider uppercase whitespace-nowrap transition-all border cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-teal-900 border-teal-900 text-white shadow-sm'
                          : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-800 hover:border-zinc-300'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Modern search input */}
                <div className="relative w-full lg:w-80">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                    <Search className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search scientific insights..."
                    className="w-full pl-11 pr-4 py-2.5 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 outline-none transition-all text-xs text-teal-950 font-medium placeholder-zinc-400"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[8px] text-zinc-400 hover:text-zinc-600 uppercase font-bold"
                    >
                      Clear
                    </button>
                  )}
                </div>

              </div>
            </section>

            {/* Articles Grid Container */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
              {filteredArticles.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-zinc-200">
                  <AlertCircle className="h-8 w-8 text-zinc-300 mx-auto mb-3" />
                  <p className="font-display font-bold text-teal-950 text-sm">No matching insights found</p>
                  <p className="text-[10px] text-zinc-400 font-mono mt-1 uppercase">Try refining your filter or query term</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles.slice(0, visibleCount).map((art, idx) => {
                    const isLiked = likedArticles[art.id];
                    const isBookmarked = bookmarkedArticles[art.id];

                    return (
                      <motion.article 
                        key={art.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                        className="group bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col border border-zinc-200/50"
                      >
                        {/* Article Header Image */}
                        <div 
                          className="relative h-56 overflow-hidden cursor-pointer"
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            openArticle(art);
                            setAiChatResponses([]);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          <img 
                            src={art.image} 
                            alt={art.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/30 to-transparent" />
                          <span className="absolute top-4 left-4 bg-teal-900/90 text-white font-mono text-[7.5px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">
                            {art.category}
                          </span>
                        </div>

                        {/* Article Content Preview */}
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[8px] font-bold uppercase mb-2">
                            <span>{art.date}</span>
                            <span>•</span>
                            <span>{art.readTime}</span>
                          </div>

                          <h3 
                            className="font-display text-base font-extrabold text-teal-950 mb-2 leading-snug group-hover:text-teal-700 transition-colors cursor-pointer"
                            onClick={() => {
                              AutoNovaAudio.playClick();
                              openArticle(art);
                              setAiChatResponses([]);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                          >
                            {art.title}
                          </h3>

                          <p className="text-[11px] text-zinc-500 line-clamp-3 leading-relaxed mb-6 font-medium">
                            {art.excerpt}
                          </p>

                          {/* Footer and Interactive quick actions */}
                          <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200">
                                <User className="h-3.5 w-3.5 text-zinc-500" />
                              </div>
                              <span className="text-[10px] font-bold text-zinc-600">{art.author}</span>
                            </div>

                            {/* Mini quick counters */}
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={(e) => handleToggleLike(art.id, e)}
                                className={`flex items-center gap-1 text-[10px] font-bold transition-colors ${
                                  isLiked ? 'text-teal-700' : 'text-zinc-400 hover:text-zinc-600'
                                }`}
                              >
                                <ThumbsUp className="h-3 w-3" />
                                <span>{art.likes}</span>
                              </button>
                              <button 
                                onClick={(e) => handleToggleBookmark(art.id, e)}
                                className={`transition-colors ${
                                  isBookmarked ? 'text-purple-700' : 'text-zinc-400 hover:text-zinc-600'
                                }`}
                              >
                                <Bookmark className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              )}

              {/* Load More Button */}
              {filteredArticles.length > visibleCount && (
                <div className="flex justify-center mt-12">
                  <button 
                    onClick={() => {
                      AutoNovaAudio.playClick();
                      setVisibleCount(prev => prev + 3);
                      showNotification("Unlocking additional research dispatches...", "info");
                    }}
                    className="px-8 py-3 rounded-xl border-2 border-zinc-200 hover:border-teal-700 bg-white text-teal-950 font-mono text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-zinc-50 cursor-pointer"
                  >
                    Load More Articles
                  </button>
                </div>
              )}
            </section>

            {/* Newsletter Section */}
            <section className="w-full bg-teal-950 py-16 mt-10 relative overflow-hidden rounded-3xl border border-teal-900/30">
              <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-teal-800/10 blur-3xl pointer-events-none" />
              <div className="absolute -left-24 -top-24 w-96 h-96 rounded-full bg-purple-900/10 blur-3xl pointer-events-none" />
              
              <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <span className="inline-block px-3 py-1 mb-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-[7px] font-extrabold uppercase tracking-widest">
                  AutoNova Journal Subscription
                </span>
                <h2 className="text-white font-display text-2xl md:text-3xl font-extrabold mb-3 tracking-tight">
                  Stay Ahead of the Curve
                </h2>
                <p className="text-teal-100/70 font-body-md text-xs mb-8 max-w-xl mx-auto leading-relaxed">
                  Receive weekly AI-driven market insights, EV trends, and exclusive first looks at upcoming premium inventory directly in your inbox.
                </p>
                
                {isSubscribed ? (
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-md mx-auto p-4 rounded-2xl bg-teal-900/50 border border-teal-500/30 text-teal-200 font-mono text-[10px] uppercase font-bold flex items-center justify-center gap-2"
                  >
                    <Check className="h-4 w-4 text-teal-400" />
                    Secure connection established. Dispatch is active.
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                    <input 
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="flex-grow h-11 px-4 rounded-xl bg-teal-900/40 text-white placeholder-teal-200/50 border border-teal-800/40 outline-none focus:ring-2 focus:ring-purple-500/30 text-xs"
                    />
                    <button 
                      type="submit"
                      className="h-11 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-mono text-[9px] font-black uppercase tracking-widest transition-all scale-100 active:scale-95 shadow-lg shadow-purple-950/40 cursor-pointer whitespace-nowrap"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
                
                <p className="mt-4 text-teal-200/30 font-mono text-[7px] uppercase tracking-wider">
                  Zero spam guaranteed. Unsubscribe with a single click.
                </p>
              </div>
            </section>
          </motion.div>
        ) : (
          /* =========================================================================
             IMMERSIVE ARTICLE READING MODE
             ========================================================================= */
          <motion.div
            key="reading"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="max-w-6xl mx-auto px-4 md:px-8 pt-6 pb-20"
          >
            {/* Back navigation line */}
            <button
              onClick={() => {
                AutoNovaAudio.playClick();
                closeArticle();
                setAiChatResponses([]);
              }}
              className="group inline-flex items-center gap-1.5 text-zinc-400 hover:text-teal-950 font-mono text-[10px] font-extrabold tracking-widest uppercase mb-8 transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to dispatches
            </button>

            {/* Layout Split: Left TOC (2 Cols), Center Main Read (6 Cols), Right AI Companion + Peer Ledger (4 Cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT SIDEBAR: Table of Contents & Social Share */}
              <aside className="hidden lg:block lg:col-span-2 sticky top-24 space-y-8">
                <div>
                  <h3 className="font-mono text-[9px] font-bold text-teal-900 mb-4 uppercase tracking-widest">
                    Table of Contents
                  </h3>
                  <nav className="flex flex-col gap-3 border-l border-zinc-200 pl-0">
                    {articleHeadings.map((h) => {
                      const isActive = activeSection === h.id;
                      return (
                        <button
                          key={h.id}
                          onClick={() => {
                            AutoNovaAudio.playClick();
                            const el = document.getElementById(h.id);
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }}
                          className={`text-left pl-3 text-[10.5px] font-medium transition-all border-l-2 py-0.5 cursor-pointer hover:text-teal-800 ${
                            isActive 
                              ? 'border-teal-700 text-teal-800 font-bold' 
                              : 'border-transparent text-zinc-400 hover:border-zinc-300'
                          }`}
                        >
                          {h.text}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <div className="pt-2">
                  <h3 className="font-mono text-[9px] font-bold text-teal-900 mb-3 uppercase tracking-widest">
                    Share Insight
                  </h3>
                  <div className="flex gap-2.5">
                    <button 
                      onClick={() => {
                        AutoNovaAudio.playSuccess();
                        navigator.clipboard.writeText(window.location.href);
                        showNotification("Article link encrypted and copied to clipboard.", "success");
                      }}
                      className="w-8 h-8 rounded-full border border-zinc-200 hover:border-teal-700 hover:text-teal-800 flex items-center justify-center text-zinc-400 transition-all cursor-pointer bg-white"
                      title="Copy Link"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => {
                        AutoNovaAudio.playClick();
                        showNotification("Constructing dynamic secure share dispatch...", "info");
                      }}
                      className="w-8 h-8 rounded-full border border-zinc-200 hover:border-teal-700 hover:text-teal-800 flex items-center justify-center text-zinc-400 transition-all cursor-pointer bg-white"
                      title="Share to Network"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </aside>

              {/* CENTER COLUMN: Main Editorial Content */}
              <div className="col-span-1 lg:col-span-6 space-y-6">
                
                {/* Header Metadata block */}
                <div className="space-y-3" id="introduction">
                  <span className="bg-teal-900 text-white font-mono text-[7px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                    {selectedArticle.category}
                  </span>
                  
                  <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-extrabold text-teal-950 leading-tight tracking-tight">
                    {selectedArticle.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-zinc-400 font-mono text-[8px] font-bold uppercase border-b border-zinc-200/50 pb-4">
                    <span className="flex items-center gap-1 text-teal-950 font-bold">
                      <User className="h-3.5 w-3.5" /> {selectedArticle.author} ({selectedArticle.authorRole})
                    </span>
                    <span>•</span>
                    <span>{selectedArticle.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {selectedArticle.readTime}</span>
                  </div>
                </div>

                {/* Main Article Cover */}
                <div className="rounded-3xl overflow-hidden aspect-video relative shadow-sm">
                  <img 
                    src={selectedArticle.image} 
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Interactive Article Controls (Like, Bookmark, Share) */}
                <div className="flex items-center justify-between bg-zinc-50 border border-zinc-200/40 px-6 py-3 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => handleToggleLike(selectedArticle.id)}
                      className={`flex items-center gap-1.5 font-mono text-[9px] font-bold transition-all ${
                        likedArticles[selectedArticle.id] ? 'text-teal-700 scale-102 font-black' : 'text-zinc-500 hover:text-zinc-800'
                      }`}
                    >
                      <ThumbsUp className={`h-4 w-4 ${likedArticles[selectedArticle.id] ? 'fill-current animate-bounce' : ''}`} />
                      <span>{selectedArticle.likes} RECOMMENDATIONS</span>
                    </button>
                    
                    <button 
                      onClick={() => handleToggleBookmark(selectedArticle.id)}
                      className={`flex items-center gap-1.5 font-mono text-[9px] font-bold transition-all ${
                        bookmarkedArticles[selectedArticle.id] ? 'text-purple-700' : 'text-zinc-500 hover:text-zinc-800'
                      }`}
                    >
                      {bookmarkedArticles[selectedArticle.id] ? (
                        <BookmarkCheck className="h-4 w-4 text-purple-700" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                      <span>{bookmarkedArticles[selectedArticle.id] ? "SAVED IN VAULT" : "SAVE TO VAULT"}</span>
                    </button>
                  </div>

                  <button 
                    onClick={() => {
                      AutoNovaAudio.playSuccess();
                      navigator.clipboard.writeText(window.location.href);
                      showNotification("Article link encrypted and copied to clipboard.", "success");
                    }}
                    className="text-zinc-500 hover:text-zinc-800 p-1.5 rounded-lg hover:bg-zinc-100 transition-all"
                    title="Copy Article Link"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Rich Typography Article Body */}
                <div className="prose prose-teal max-w-none text-zinc-700 text-xs md:text-sm leading-relaxed font-medium space-y-4 pt-2">
                  {selectedArticle.content.split('\n\n').map((para, pIdx) => {
                    if (para.startsWith('###')) {
                      const headingText = para.replace('###', '').trim();
                      const headingId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                      return (
                        <h3 
                          key={pIdx} 
                          id={headingId} 
                          className="font-display text-sm md:text-base font-extrabold text-teal-950 pt-6 pb-2 scroll-mt-24 border-b border-zinc-100/60 first:pt-2"
                        >
                          {headingText}
                        </h3>
                      );
                    }
                    if (para.startsWith('1.') || para.startsWith('-')) {
                      return (
                        <div key={pIdx} className="pl-4 border-l-2 border-teal-700/20 py-1 space-y-1 my-2">
                          {para.split('\n').map((li, lIdx) => (
                            <p key={lIdx} className="text-[11px] md:text-xs text-zinc-600">
                              {li.trim()}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return (
                      <p key={pIdx} className="text-zinc-600/95 leading-relaxed">
                        {para}
                      </p>
                    );
                  })}
                </div>

                {/* Peer Review/Comments Ledger */}
                <div className="border-t border-zinc-200/60 pt-8 space-y-6">
                  <h3 className="font-display text-sm md:text-base font-extrabold text-teal-950 flex items-center gap-2">
                    <MessageSquare className="h-4.5 w-4.5 text-teal-900" /> Peer Review Ledger ({selectedArticle.comments.length})
                  </h3>

                  {/* Add comment form */}
                  <form onSubmit={handleAddComment} className="bg-white rounded-2xl border border-zinc-200/50 p-4 space-y-3 shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center border border-teal-200">
                        <User className="h-4.5 w-4.5 text-teal-800" />
                      </div>
                      <input 
                        type="text" 
                        value={commentAuthorName}
                        onChange={(e) => setCommentAuthorName(e.target.value)}
                        placeholder="Your Signature Name"
                        className="bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-1.5 font-mono text-[9px] font-bold text-teal-950 uppercase tracking-wider w-44"
                      />
                    </div>
                    <textarea
                      required
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="Publish your professional analysis or inquiry..."
                      rows="3"
                      className="w-full bg-zinc-50 border border-zinc-200/80 rounded-xl p-3 text-xs text-teal-950 outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
                    />
                    <div className="flex justify-end">
                      <button 
                        type="submit"
                        className="bg-teal-900 hover:bg-teal-950 text-white font-mono text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                      >
                        <Send className="h-3 w-3" /> Publish Analysis
                      </button>
                    </div>
                  </form>

                  {/* Comments list */}
                  <div className="space-y-4 mt-4">
                    {selectedArticle.comments.length === 0 ? (
                      <p className="text-[10px] text-zinc-400 font-mono tracking-wide uppercase">No professional peer comments published yet.</p>
                    ) : (
                      selectedArticle.comments.map((comment) => (
                        <div key={comment.id} className="bg-zinc-50/50 border border-zinc-200/30 rounded-2xl p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[9px] font-extrabold text-teal-950 uppercase tracking-wider">{comment.user}</span>
                            <span className="text-[8px] text-zinc-400 font-mono uppercase">{comment.date}</span>
                          </div>
                          <p className="text-xs text-zinc-600 leading-relaxed font-medium">{comment.text}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Related Articles — previously missing entirely */}
                <div className="pt-8 border-t border-zinc-100">
                  <h3 className="font-display font-black text-sm text-teal-950 mb-4">Related Articles</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {(articles.filter(a => a.id !== selectedArticle.id && a.category === selectedArticle.category).length > 0
                      ? articles.filter(a => a.id !== selectedArticle.id && a.category === selectedArticle.category)
                      : articles.filter(a => a.id !== selectedArticle.id)
                    ).slice(0, 3).map((relatedArt) => (
                      <button
                        key={relatedArt.id}
                        onClick={() => { AutoNovaAudio.playClick(); openArticle(relatedArt); window.scrollTo(0, 0); }}
                        className="text-left bg-zinc-50/50 hover:bg-zinc-50 border border-zinc-200/50 rounded-2xl overflow-hidden transition-all cursor-pointer group"
                      >
                        <div className="aspect-video overflow-hidden">
                          <img src={relatedArt.image} alt={relatedArt.title} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-3">
                          <span className="font-mono text-[8px] font-bold text-teal-700 uppercase tracking-wider">{relatedArt.category}</span>
                          <h4 className="font-display text-xs font-bold text-teal-950 leading-tight mt-1 line-clamp-2">{relatedArt.title}</h4>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: AI Companion & Article Grounding Companion */}
              <div className="col-span-1 lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                
                {/* AI Interactive Assistant Widget */}
                <div className="bg-gradient-to-br from-teal-950 to-zinc-950 text-white rounded-3xl p-6 border border-teal-900/50 relative overflow-hidden shadow-md">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
                    <div>
                      <h4 className="font-display font-bold text-xs text-white">Ask AutoNova Insights AI</h4>
                      <p className="text-[7.5px] font-mono text-teal-300 font-bold uppercase tracking-widest">Scientific Grounding Companion</p>
                    </div>
                  </div>

                  <p className="text-[10px] text-teal-100/70 leading-relaxed font-medium mb-4">
                    Inquire regarding charging protocols, performance efficiency metrics, or request a customized key takeaway summary of this specific dispatch.
                  </p>

                  {/* Message log */}
                  <div className="bg-teal-900/30 border border-teal-800/40 rounded-2xl p-3 h-48 overflow-y-auto space-y-3 mb-4 scrollbar-none">
                    {aiChatResponses.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                        <HelpCircle className="h-6 w-6 mb-1 text-teal-200" />
                        <span className="font-mono text-[7px] uppercase tracking-widest">No active queries</span>
                        <span className="text-[7.5px]">Try typing "Summarize this article"</span>
                      </div>
                    ) : (
                      aiChatResponses.map((res, rIdx) => (
                        <div key={rIdx} className={`space-y-1 ${res.sender === 'user' ? 'text-right' : 'text-left'}`}>
                          <span className="font-mono text-[6.5px] font-black uppercase text-teal-300 tracking-wider">
                            {res.sender === 'user' ? 'Client' : 'AutoNova AI'}
                          </span>
                          <div className={`p-2 rounded-xl text-[10px] leading-relaxed font-medium inline-block text-left ${
                            res.sender === 'user' 
                              ? 'bg-purple-600/55 text-white max-w-[85%]' 
                              : 'bg-teal-950/80 border border-teal-800 text-teal-100 max-w-[90%]'
                          }`}>
                            {res.text.split('\n').map((line, lIdx) => (
                              <p key={lIdx} className="mb-1 last:mb-0">{line}</p>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                    
                    {isAiGenerating && (
                      <div className="flex items-center gap-1.5 text-[8.5px] font-mono text-purple-300">
                        <span className="h-1.5 w-1.5 bg-purple-400 rounded-full animate-bounce" />
                        <span className="h-1.5 w-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="h-1.5 w-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                        <span>CONSULTING KNOWLEDGE SPHERE...</span>
                      </div>
                    )}
                  </div>

                  {/* Predefined prompts */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <button 
                      onClick={() => {
                        setAiChatQuery("Summarize this article's key takeaways");
                      }}
                      className="bg-teal-900/40 hover:bg-teal-900/60 border border-teal-800/40 rounded-lg px-2 py-1 font-mono text-[7px] font-bold text-teal-200 uppercase tracking-widest transition-all cursor-pointer"
                    >
                      Summarize Article
                    </button>
                    <button 
                      onClick={() => {
                        setAiChatQuery("What is the lifetime degradation percentage?");
                      }}
                      className="bg-teal-900/40 hover:bg-teal-900/60 border border-teal-800/40 rounded-lg px-2 py-1 font-mono text-[7px] font-bold text-teal-200 uppercase tracking-widest transition-all cursor-pointer"
                    >
                      Degradation Metric
                    </button>
                  </div>

                  {/* Query input form */}
                  <form onSubmit={handleAskAiAboutArticle} className="flex gap-2">
                    <input 
                      type="text" 
                      value={aiChatQuery}
                      onChange={(e) => setAiChatQuery(e.target.value)}
                      placeholder="Type query to ground insights AI..."
                      className="flex-grow bg-teal-950/90 text-xs text-white placeholder-teal-200/30 border border-teal-800/60 rounded-xl px-3 outline-none focus:ring-1 focus:ring-purple-400"
                    />
                    <button 
                      type="submit"
                      disabled={isAiGenerating}
                      className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-2.5 flex items-center justify-center shadow-md cursor-pointer transition-all disabled:opacity-50"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>

                {/* Author stats panel */}
                <div className="bg-white rounded-3xl p-6 border border-zinc-200/50 space-y-4">
                  <h4 className="font-display font-extrabold text-teal-950 text-xs">Research Contributor</h4>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center border border-teal-200">
                      <User className="h-5 w-5 text-teal-800" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-xs text-teal-950">{selectedArticle.author}</p>
                      <p className="font-mono text-[7px] font-bold text-zinc-400 uppercase tracking-wider">{selectedArticle.authorRole}</p>
                    </div>
                  </div>

                  <p className="text-[10.5px] text-zinc-500 leading-relaxed font-medium">
                    Contributors are part of the AutoNova Kinetic Council, focusing on sustainable energy propagation, active aerodynamics integration, and high-fidelity machine-learning asset appraisement.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-zinc-100">
                    <div>
                      <span className="font-mono text-[7px] text-zinc-400 block uppercase tracking-wider">Scientific Posts</span>
                      <span className="font-display font-extrabold text-teal-950 text-xs">14 dispatches</span>
                    </div>
                    <div>
                      <span className="font-mono text-[7px] text-zinc-400 block uppercase tracking-wider">Citation Rating</span>
                      <span className="font-display font-extrabold text-teal-950 text-xs">4.9 / 5.0</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
