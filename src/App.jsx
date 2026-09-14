/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter, Routes, Route, Navigate, useNavigate, 
  useParams, useSearchParams, useLocation, Link, Outlet 
} from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CarShowroom } from './components/CarShowroom';
import { SignUpForm } from './components/SignUpForm';
import { OnboardingFlow } from './components/OnboardingFlow';
import { CatalogPage, RECOMMENDATIONS as ALL_RECOMMENDATIONS } from './components/CatalogPage';
import { Notification } from './components/Notification';
import { AutoNovaAudio } from './components/AudioEngine';
import { CarDetailView } from './components/CarDetailView';
import { AIAssistantView } from './components/AIAssistantView';
import { CompareVehiclesView } from './components/CompareVehiclesView';
import { SavedCarsView } from './components/SavedCarsView';
import { FinancingView } from './components/FinancingView';
import { ValuationView } from './components/ValuationView';
import { TestDrivesView } from './components/TestDrivesView';
import { CartView } from './components/CartView';
import { CheckoutView } from './components/CheckoutView';
import { MemberDashboardView } from './components/MemberDashboardView';
import { OrdersView } from './components/OrdersView';
import { MessagesView } from './components/MessagesView';
import { NotificationsView } from './components/NotificationsView';
import { SettingsView } from './components/SettingsView';
import { SavedSearchesView } from './components/SavedSearchesView';
import { SellerDashboardView } from './components/SellerDashboardView';
import { CreateListingView } from './components/CreateListingView';
import { ReviewsView } from './components/ReviewsView';
import { BlogView } from './components/BlogView';
import { AboutView } from './components/AboutView';
import { HelpCenterView } from './components/HelpCenterView';
import { TermsOfServiceView } from './components/TermsOfServiceView';
import { NotFoundView } from './components/NotFoundView';
import { AdminPortalView } from './components/AdminPortalView';
import { SuccessPortal } from './components/SuccessPortal';
import { auth, onAuthStateChanged, firebaseSignOut } from './firebase';

import { 
  Shield, Globe, ShoppingCart, Bell, Heart, User, Sparkles, 
  Search, Sliders, ChevronDown, LogOut, ArrowRight, CheckCircle2, 
  HelpCircle, Scale, FileText, Zap, Compass, PhoneCall, Layers, MessageSquare
} from 'lucide-react';


// --- PUBLIC MAIN LAYOUT (Navbar + Footer) ---
function MainLayout({ authenticatedUser, cartItems, favoritedCars, onLogout, showNotification }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#fdf8f8] text-zinc-900 flex flex-col font-sans relative overflow-x-hidden select-none">
      
      {/* Top Universal Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-200/80 px-4 md:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Platform Badge */}
          <Link 
            to="/" 
            onClick={() => AutoNovaAudio.playClick()}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-950 text-white flex items-center justify-center font-display font-black text-lg shadow-md group-hover:scale-105 transition-transform">
              A
            </div>
            <div>
              <span className="font-display font-black text-lg text-teal-950 tracking-tight block leading-none">
                AutoNova
              </span>
              <span className="font-mono text-[8px] tracking-widest text-teal-700 font-extrabold uppercase block mt-0.5">
                KINETIC MARKETPLACE
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-mono text-[11px] font-bold tracking-wider uppercase text-zinc-600">
            <Link 
              to="/" 
              className={`px-3 py-1.5 rounded-lg transition-colors hover:text-teal-950 hover:bg-zinc-100/80 ${location.pathname === '/' ? 'bg-teal-50 text-teal-950 font-black' : ''}`}
            >
              Showroom
            </Link>
            <Link 
              to="/browse" 
              className={`px-3 py-1.5 rounded-lg transition-colors hover:text-teal-950 hover:bg-zinc-100/80 ${location.pathname.startsWith('/browse') ? 'bg-teal-50 text-teal-950 font-black' : ''}`}
            >
              Browse
            </Link>
            <Link 
              to="/sell" 
              className={`px-3 py-1.5 rounded-lg transition-colors hover:text-teal-950 hover:bg-zinc-100/80 ${location.pathname.startsWith('/sell') ? 'bg-teal-50 text-teal-950 font-black' : ''}`}
            >
              Sell
            </Link>
            <Link 
              to="/ai-assistant" 
              className={`px-3 py-1.5 rounded-lg transition-colors hover:text-teal-950 hover:bg-zinc-100/80 flex items-center gap-1.5 ${location.pathname === '/ai-assistant' ? 'bg-teal-50 text-teal-950 font-black' : ''}`}
            >
              <Sparkles className="h-3.5 w-3.5 text-purple-600 animate-pulse" />
              <span>AI Assistant</span>
            </Link>
            <Link 
              to="/compare" 
              className={`px-3 py-1.5 rounded-lg transition-colors hover:text-teal-950 hover:bg-zinc-100/80 ${location.pathname === '/compare' ? 'bg-teal-50 text-teal-950 font-black' : ''}`}
            >
              Compare
            </Link>
            <Link 
              to="/wishlist" 
              className={`px-3 py-1.5 rounded-lg transition-colors hover:text-teal-950 hover:bg-zinc-100/80 flex items-center gap-1 ${location.pathname === '/wishlist' ? 'bg-teal-50 text-teal-950 font-black' : ''}`}
            >
              <Heart className="h-3.5 w-3.5 text-teal-700" />
              <span>Saved ({favoritedCars?.length || 0})</span>
            </Link>
            <Link 
              to="/blog" 
              className={`px-3 py-1.5 rounded-lg transition-colors hover:text-teal-950 hover:bg-zinc-100/80 ${location.pathname.startsWith('/blog') ? 'bg-teal-50 text-teal-950 font-black' : ''}`}
            >
              Blog
            </Link>
          </nav>

          {/* User & Cart CTA Actions */}
          <div className="flex items-center gap-3">
            <Link 
              to="/cart" 
              onClick={() => AutoNovaAudio.playClick()}
              className="relative p-2.5 rounded-xl border border-zinc-200/80 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 hover:text-teal-950 transition-all cursor-pointer"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItems?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-700 text-white font-mono text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {authenticatedUser ? (
              <div className="relative">
                <button
                  onClick={() => { AutoNovaAudio.playClick(); setShowUserMenu(!showUserMenu); }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-teal-950 text-white hover:bg-teal-900 transition-colors cursor-pointer text-xs font-mono font-bold"
                >
                  <User className="h-4 w-4 text-teal-400" />
                  <span className="hidden sm:inline">{authenticatedUser.name}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-zinc-200 shadow-xl py-2 z-50 space-y-1 font-mono text-xs">
                    <Link 
                      to="/dashboard" 
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-teal-950 font-bold"
                    >
                      <User className="h-4 w-4 text-teal-700" />
                      <span>My Dashboard</span>
                    </Link>
                    <Link 
                      to="/dashboard/orders" 
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-teal-950 font-bold"
                    >
                      <ShoppingCart className="h-4 w-4 text-teal-700" />
                      <span>My Orders</span>
                    </Link>
                    <Link 
                      to="/dashboard/test-drives" 
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-teal-950 font-bold"
                    >
                      <Zap className="h-4 w-4 text-teal-700" />
                      <span>My Test Drives</span>
                    </Link>
                    <Link 
                      to="/dashboard/messages" 
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-teal-950 font-bold"
                    >
                      <MessageSquare className="h-4 w-4 text-teal-700" />
                      <span>Messages</span>
                    </Link>
                    <Link 
                      to="/dashboard/notifications" 
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-teal-950 font-bold"
                    >
                      <Bell className="h-4 w-4 text-teal-700" />
                      <span>Notifications</span>
                    </Link>
                    <Link 
                      to="/seller/dashboard" 
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-teal-950 font-bold"
                    >
                      <Sliders className="h-4 w-4 text-teal-700" />
                      <span>Seller Portal</span>
                    </Link>
                    <Link 
                      to="/dashboard/settings" 
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-teal-950 font-bold"
                    >
                      <Sliders className="h-4 w-4 text-teal-700" />
                      <span>Account Settings</span>
                    </Link>
                    <hr className="border-zinc-100 my-1" />
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onLogout();
                      }}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-red-600 hover:bg-red-50 font-bold cursor-pointer"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold">
                <Link 
                  to="/signin"
                  className="px-3.5 py-2 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-zinc-700 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup"
                  className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white transition-colors shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Page Render Outlet */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Universal Footer Required on All Public Pages */}
      <footer className="bg-teal-950 text-white pt-16 pb-12 px-4 md:px-8 border-t border-teal-900 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-teal-900/60">
          
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center font-display font-black text-base">
                A
              </div>
              <span className="font-display font-black text-xl text-white tracking-tight">
                AutoNova Platform
              </span>
            </div>
            <p className="text-xs text-zinc-300 max-w-sm leading-relaxed font-medium">
              Sovereign luxury automobile trading platform. Automated ECU telemetry diagnostic verification, instant AI valuation, and secure escrow settlement.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-bold">
              <Shield className="h-4 w-4 text-teal-400" />
              <span>Certified Sovereign Ledger Infrastructure</span>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <h5 className="font-display font-black text-teal-400 uppercase tracking-widest text-[10px]">Marketplace</h5>
            <ul className="space-y-2 text-zinc-300 font-medium">
              <li><Link to="/" className="hover:text-white transition-colors">Showroom Catalog</Link></li>
              <li><Link to="/browse" className="hover:text-white transition-colors">Inventory Matrix</Link></li>
              <li><Link to="/sell" className="hover:text-white transition-colors">Sell Your Vehicle</Link></li>
              <li><Link to="/trade-in" className="hover:text-white transition-colors">Trade-In Appraisal</Link></li>
              <li><Link to="/financing" className="hover:text-white transition-colors">Financing & Amortization</Link></li>
            </ul>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <h5 className="font-display font-black text-teal-400 uppercase tracking-widest text-[10px]">Intelligence</h5>
            <ul className="space-y-2 text-zinc-300 font-medium">
              <li><Link to="/ai-assistant" className="hover:text-white transition-colors">AI Fleet Assistant</Link></li>
              <li><Link to="/compare" className="hover:text-white transition-colors">Matrix Comparison</Link></li>
              <li><Link to="/reviews" className="hover:text-white transition-colors">Verified Reviews</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Automotive Journal & Blog</Link></li>
            </ul>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <h5 className="font-display font-black text-teal-400 uppercase tracking-widest text-[10px]">Trust & Legal</h5>
            <ul className="space-y-2 text-zinc-300 font-medium">
              <li><Link to="/about" className="hover:text-white transition-colors">About AutoNova</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ & Help Center</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-400 gap-4">
          <p>© 2026 AutoNova Systems Inc. All sovereign rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="hover:text-zinc-200">Terms</Link>
            <Link to="/privacy" className="hover:text-zinc-200">Privacy</Link>
            <Link to="/faq" className="hover:text-zinc-200">Security</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- ROUTE WRAPPERS ---

function CarDetailWrapper({ favoritedCars, handleFavoriteToggle, cartItems, setCartItems, showNotification }) {
  const { carId } = useParams();
  const navigate = useNavigate();
  const car = ALL_RECOMMENDATIONS.find(c => c.id === carId) || ALL_RECOMMENDATIONS[0];

  return (
    <CarDetailView 
      car={car}
      onBack={() => navigate('/browse')}
      showNotification={showNotification}
      allRecommendations={ALL_RECOMMENDATIONS}
      onSelectCar={(sibling) => navigate(`/cars/${sibling.id}`)}
      favoritedCars={favoritedCars}
      handleFavoriteToggle={handleFavoriteToggle}
      cartItems={cartItems}
      setCartItems={setCartItems}
    />
  );
}

// Shared mapping from the legacy internal "view" tab names (used by several pages'
// sidebar navigation) to real routes. Reused by any wrapper that still needs to bridge
// onNavigateToView calls to actual React Router navigation.
const VIEW_TO_ROUTE = {
  portfolio: '/dashboard',
  dashboard: '/dashboard',
  saved: '/wishlist',
  alerts: '/dashboard/saved-searches',
  orders: '/dashboard/orders',
  'test-drives': '/dashboard/test-drives',
  messages: '/dashboard/messages',
  notifications: '/dashboard/notifications',
  settings: '/dashboard/settings',
  assistant: '/ai-assistant',
  'seller-dashboard': '/seller/dashboard',
  reviews: '/reviews',
  blog: '/blog',
  help: '/faq',
  finance: '/financing',
  valuation: '/trade-in',
  cart: '/cart',
};

function ValuationWrapper({ authenticatedUser, setAuthenticatedUser, showNotification }) {
  const navigate = useNavigate();
  return (
    <ValuationView
      userName={authenticatedUser?.name}
      role={authenticatedUser?.role}
      showNotification={showNotification}
      onNavigateToView={(view) => navigate(VIEW_TO_ROUTE[view] || '/dashboard')}
      onBackToGate={() => { setAuthenticatedUser(null); navigate('/'); }}
    />
  );
}

function TestDriveWrapper({ authenticatedUser, setAuthenticatedUser, testDrives, setTestDrives, logActivity, showNotification }) {
  const { carId } = useParams();
  const navigate = useNavigate();
  return (
    <TestDrivesView
      bookingCarId={carId}
      userName={authenticatedUser?.name}
      role={authenticatedUser?.role}
      testDrives={testDrives}
      setTestDrives={setTestDrives}
      logActivity={logActivity}
      showNotification={showNotification}
      onNavigateToView={(view) => navigate(VIEW_TO_ROUTE[view] || '/dashboard')}
      onBackToGate={() => { setAuthenticatedUser(null); navigate('/'); }}
    />
  );
}

function MyTestDrivesWrapper({ authenticatedUser, setAuthenticatedUser, testDrives, setTestDrives, showNotification }) {
  const navigate = useNavigate();
  return (
    <TestDrivesView
      userName={authenticatedUser?.name}
      role={authenticatedUser?.role}
      testDrives={testDrives}
      setTestDrives={setTestDrives}
      showNotification={showNotification}
      onNavigateToView={(view) => navigate(VIEW_TO_ROUTE[view] || '/dashboard')}
      onBackToGate={() => { setAuthenticatedUser(null); navigate('/'); }}
    />
  );
}

function BlogSlugWrapper({ showNotification }) {
  const { slug } = useParams();
  return <BlogView articleSlug={slug} showNotification={showNotification} />;
}

function OrderConfirmationWrapper({ showNotification }) {
  const { orderId } = useParams();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fdf8f8] flex items-center justify-center p-4">
      <SuccessPortal
        orderId={orderId}
        showNotification={showNotification}
        onRestart={() => navigate('/')}
        onEnterCatalog={() => navigate('/browse')}
        onChatSeller={() => navigate('/dashboard/messages')}
      />
    </div>
  );
}

function SellerAnalyticsWrapper({ listings, showNotification }) {
  const { listingId } = useParams();
  return <SellerDashboardView analyticsListingId={listingId} listings={listings} showNotification={showNotification} />;
}

// Wrap pages that need real navigation callbacks (onSelectCar, onCompareToggle) —
// these previously received undefined for these props directly from <Route>, which
// crashed the page the moment a user clicked a car card or a compare checkbox.
function AIAssistantWrapper({ favoritedCars, handleFavoriteToggle, showNotification }) {
  const navigate = useNavigate();
  return (
    <AIAssistantView
      allRecommendations={ALL_RECOMMENDATIONS}
      showNotification={showNotification}
      favoritedCars={favoritedCars}
      handleFavoriteToggle={handleFavoriteToggle}
      onSelectCar={(car) => navigate(`/cars/${car.id}`)}
    />
  );
}

function CompareWrapper({ favoritedCars, handleFavoriteToggle, showNotification }) {
  const navigate = useNavigate();
  return (
    <CompareVehiclesView
      allRecommendations={ALL_RECOMMENDATIONS}
      showNotification={showNotification}
      favoritedCars={favoritedCars}
      handleFavoriteToggle={handleFavoriteToggle}
      onSelectCar={(car) => navigate(`/cars/${car.id}`)}
    />
  );
}

function WishlistWrapper({ favoritedCars, handleFavoriteToggle, comparedCars, handleCompareToggle, showNotification }) {
  const navigate = useNavigate();
  return (
    <SavedCarsView
      favoritedCars={favoritedCars}
      handleFavoriteToggle={handleFavoriteToggle}
      allRecommendations={ALL_RECOMMENDATIONS}
      showNotification={showNotification}
      onSelectCar={(car) => navigate(`/cars/${car.id}`)}
      onBrowse={() => navigate('/browse')}
      comparedCars={comparedCars}
      onCompareToggle={handleCompareToggle}
    />
  );
}

function CheckoutWrapper({ cartItems, setCartItems, setOrders, logActivity, showNotification }) {
  const navigate = useNavigate();
  const car = cartItems?.[0] || null;

  if (!car) {
    return (
      <div className="min-h-screen bg-[#fdf8f8] flex flex-col items-center justify-center text-center px-4 font-sans">
        <h2 className="font-display text-xl font-black text-zinc-900 mb-2">Your cart is empty</h2>
        <p className="text-sm text-zinc-500 max-w-sm mb-6">Add a car to your cart before checking out.</p>
        <button
          onClick={() => navigate('/browse')}
          className="px-6 py-3 bg-teal-950 hover:bg-teal-900 text-white rounded-xl font-bold text-sm transition-all cursor-pointer"
        >
          Browse Cars
        </button>
      </div>
    );
  }

  return (
    <CheckoutView
      activeCar={car}
      showNotification={showNotification}
      onBackToCart={() => navigate('/cart')}
      onBackToShowroom={() => navigate('/')}
      onOrderSuccess={(orderData) => {
        if (setOrders) setOrders(prev => [orderData, ...prev]);
        if (setCartItems) setCartItems([]);
        if (logActivity) logActivity('order', `Placed an order for ${orderData.carName}`, 'ShoppingBag');
        navigate(`/order-confirmation/${orderData.id}`);
      }}
    />
  );
}

function SignUpRouteWrapper({ setAuthenticatedUser, showNotification }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fdf8f8] flex items-center justify-center p-4">
      <SignUpForm
        mode="signup"
        onAuthenticationSuccess={(n, r) => { setAuthenticatedUser({ name: n, role: r }); navigate('/verify-otp'); }}
        showNotification={showNotification}
      />
    </div>
  );
}

function SignInRouteWrapper({ setAuthenticatedUser, showNotification }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fdf8f8] flex items-center justify-center p-4">
      <SignUpForm
        mode="signin"
        onAuthenticationSuccess={(n, r) => { setAuthenticatedUser({ name: n, role: r }); navigate('/dashboard'); }}
        showNotification={showNotification}
      />
    </div>
  );
}

function OtpRouteWrapper({ showNotification }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fdf8f8] flex items-center justify-center p-4">
      <SignUpForm mode="verify-otp" onAuthenticationSuccess={() => navigate('/onboarding')} showNotification={showNotification} />
    </div>
  );
}

function OnboardingRouteWrapper({ authenticatedUser, setUserPreferences, showNotification }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fdf8f8] flex items-center justify-center p-4">
      <OnboardingFlow
        userName={authenticatedUser?.name || "User"}
        showNotification={showNotification}
        onComplete={(prefs) => {
          if (setUserPreferences) {
            setUserPreferences(prefs);
            try { localStorage.setItem('autonova_user_preferences', JSON.stringify(prefs)); } catch {}
          }
          navigate('/dashboard');
        }}
      />
    </div>
  );
}

function OrdersWrapper({ authenticatedUser, setAuthenticatedUser, orders, showNotification }) {
  const navigate = useNavigate();
  return (
    <OrdersView
      userName={authenticatedUser?.name}
      role={authenticatedUser?.role}
      orders={orders}
      showNotification={showNotification}
      onNavigateToView={(view) => navigate(VIEW_TO_ROUTE[view] || '/dashboard')}
      onBackToGate={() => { setAuthenticatedUser(null); navigate('/'); }}
    />
  );
}

function DashboardWrapper({ authenticatedUser, setAuthenticatedUser, favoritedCars, handleFavoriteToggle, comparedCars, orders, userPreferences, activityLog, showNotification }) {
  const navigate = useNavigate();
  return (
    <MemberDashboardView
      userName={authenticatedUser?.name}
      role={authenticatedUser?.role}
      favoritedCars={favoritedCars}
      comparedCars={comparedCars}
      orders={orders}
      userPreferences={userPreferences}
      activityLog={activityLog}
      showNotification={showNotification}
      handleFavoriteToggle={handleFavoriteToggle}
      onSelectCar={(car) => navigate(`/cars/${car.id}`)}
      onNavigateToView={(view) => navigate(VIEW_TO_ROUTE[view] || '/dashboard')}
      onBackToGate={() => { setAuthenticatedUser(null); navigate('/'); }}
      onOpenValuationModal={() => navigate('/trade-in')}
    />
  );
}

function MessagesWrapper({ authenticatedUser, setAuthenticatedUser, showNotification }) {
  const navigate = useNavigate();
  return (
    <MessagesView
      userName={authenticatedUser?.name}
      role={authenticatedUser?.role}
      showNotification={showNotification}
      onSelectCar={(car) => navigate(`/cars/${car.id}`)}
      onNavigateToView={(view) => navigate(VIEW_TO_ROUTE[view] || '/dashboard')}
      onBackToGate={() => { setAuthenticatedUser(null); navigate('/'); }}
    />
  );
}

function NotificationsWrapper({ authenticatedUser, setAuthenticatedUser, showNotification }) {
  const navigate = useNavigate();
  return (
    <NotificationsView
      userName={authenticatedUser?.name}
      role={authenticatedUser?.role}
      showNotification={showNotification}
      onSelectCar={(car) => navigate(`/cars/${car.id}`)}
      onNavigateToView={(view) => navigate(VIEW_TO_ROUTE[view] || '/dashboard')}
      onBackToGate={() => { setAuthenticatedUser(null); navigate('/'); }}
    />
  );
}

function SettingsWrapper({ authenticatedUser, setAuthenticatedUser, showNotification }) {
  const navigate = useNavigate();
  return (
    <SettingsView
      userName={authenticatedUser?.name}
      role={authenticatedUser?.role}
      showNotification={showNotification}
      onNavigateToView={(view) => navigate(VIEW_TO_ROUTE[view] || '/dashboard')}
      onBackToGate={() => { setAuthenticatedUser(null); navigate('/'); }}
    />
  );
}

function SavedSearchesWrapper({ authenticatedUser, setAuthenticatedUser, showNotification }) {
  const navigate = useNavigate();
  return (
    <SavedSearchesView
      userName={authenticatedUser?.name}
      role={authenticatedUser?.role}
      showNotification={showNotification}
      onNavigateToView={(view) => navigate(VIEW_TO_ROUTE[view] || '/dashboard')}
      onBackToGate={() => { setAuthenticatedUser(null); navigate('/'); }}
    />
  );
}

function SellLandingWrapper({ showNotification }) {
  const navigate = useNavigate();
  return (
    <SellerDashboardView
      isLandingMode={true}
      showNotification={showNotification}
      onStartSelling={() => navigate('/sell/create-listing')}
      onGoToValuation={() => navigate('/trade-in')}
    />
  );
}

function CreateListingWrapper({ authenticatedUser, listings, setListings, showNotification }) {
  const navigate = useNavigate();
  return (
    <CreateListingView
      userName={authenticatedUser?.name}
      role={authenticatedUser?.role}
      showNotification={showNotification}
      onNavigateToView={(view) => navigate(VIEW_TO_ROUTE[view] || '/seller/dashboard')}
      onAddListingToState={(listing) => {
        setListings(prev => [listing, ...prev]);
        navigate('/seller/dashboard');
      }}
    />
  );
}

function SellerDashboardWrapper({ authenticatedUser, listings, setListings, logActivity, showNotification }) {
  const navigate = useNavigate();
  return (
    <SellerDashboardView
      userName={authenticatedUser?.name}
      role={authenticatedUser?.role}
      listings={listings}
      showNotification={showNotification}
      onNavigateToView={(view) => navigate(view === 'create-listing' ? '/sell/create-listing' : (VIEW_TO_ROUTE[view] || '/dashboard'))}
      onDeleteListing={(id) => setListings(prev => prev.filter(l => l.id !== id))}
      onDeactivateListing={(id) => setListings(prev => prev.map(l => l.id === id ? { ...l, status: l.status === 'Active' ? 'Paused' : 'Active' } : l))}
      onAcceptOffer={(inquiryId, vehicleName) => {
        setListings(prev => prev.map(l => 
          vehicleName && l.name && vehicleName.includes(l.name) ? { ...l, status: 'Sold' } : l
        ));
        if (logActivity) logActivity('sale', `Accepted an offer${vehicleName ? ` for ${vehicleName}` : ''}`, 'ShoppingBag');
      }}
    />
  );
}

function ReviewsWrapper({ authenticatedUser, showNotification }) {
  const navigate = useNavigate();
  return (
    <ReviewsView
      userName={authenticatedUser?.name}
      role={authenticatedUser?.role}
      showNotification={showNotification}
      onNavigateToView={(view) => navigate(VIEW_TO_ROUTE[view] || '/dashboard')}
    />
  );
}

function BlogWrapper({ showNotification }) {
  const navigate = useNavigate();
  return <BlogView showNotification={showNotification} onNavigateToView={(view) => navigate(VIEW_TO_ROUTE[view] || '/dashboard')} />;
}

function AboutWrapper({ showNotification }) {
  return <AboutView showNotification={showNotification} />;
}

function ContactWrapper({ showNotification }) {
  const navigate = useNavigate();
  return <HelpCenterView initialTab="contact" showNotification={showNotification} onNavigateToView={(view) => navigate(VIEW_TO_ROUTE[view] || '/dashboard')} />;
}

function FaqWrapper({ showNotification }) {
  const navigate = useNavigate();
  return <HelpCenterView initialTab="faq" showNotification={showNotification} onNavigateToView={(view) => navigate(VIEW_TO_ROUTE[view] || '/dashboard')} />;
}

function NotFoundWrapper({ showNotification }) {
  const navigate = useNavigate();
  return <NotFoundView showNotification={showNotification} onNavigateToView={(view) => navigate(VIEW_TO_ROUTE[view] || '/dashboard')} />;
}

// --- MAIN APP COMPONENT WITH ALL 47 ROUTES ---
export default function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  // Sync with Firebase auth state on app load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setAuthenticatedUser({
          name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
          role: 'Verified Buyer',
          email: firebaseUser.email,
          uid: firebaseUser.uid,
        });
      } else {
        setAuthenticatedUser(null);
      }
    });
    return () => unsubscribe();
  }, []);
  const [notification, setNotification] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [listings, setListings] = useState([]);
  const [testDrives, setTestDrives] = useState([
    {
      id: 'TD-9081',
      carName: 'Lucid Air Sapphire',
      trim: 'Tri-motor Sapphire Trim',
      center: 'Beverly Hills Center',
      date: '2024-11-24',
      time: '10:00 AM',
      status: 'Confirmed',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOQHi_PEd5ZPsfve2gHNtc9RspSyvOXqwqs6xNqGTWDwpEwEim2bu4gGWdmC4VdWAmTvCa--Ue5HLlHyLmXoYbUdEsDVdt65Ud_ieAeLMGOfujnFDPns5-vOEg4qKlTnwqIjqF5ev3fecEJhFWxI6VCXY2F2iGL5RoszzPyEMkvTvEch3_TgeV6OO-66z072RemQnTsKHau59vkG3NLAr9svqCFZKM9WgSuj67cgw-LiGqIA1cjRS3eV2cx9id8468XFNGHdr-mw1a',
      type: 'Confirmed'
    },
    {
      id: 'TD-4412',
      carName: 'Porsche Taycan Turbo S',
      trim: 'Prestige Edition',
      center: 'Nova Elite Private Track',
      date: '2024-12-02',
      time: '02:30 PM',
      status: 'VIP Event',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGOmQgwxQIbZi9RsFzFXYczbZcvkCPv18n2ymEcdpqGoMQqvp4Vk-00FuSTyvu27cxMZyWDYjKKbcMkHvtGidGgcQ6bxLmrvr52cDM2tRGFTLFtbesSybyXJIMDhE2iTDeIyS25dGw6DapRPsmLlIvqdYoQ2J2RyN6nVfUGG9FbhR1pPIAcdNNJW8fNOsNR7e3ejMm7pqkPQhUTCP2hVlxiqGI8FOH3VbBfWrfNJZhvZWL1pe0W8Go9nctfqE2-9Iy08xMSodZO7Hq',
      type: 'VIP Event'
    }
  ]);
  const [activityLog, setActivityLog] = useState([]);
  const logActivity = (type, text, icon) => {
    setActivityLog(prev => [{ id: Date.now() + Math.random(), type, text, icon, timestamp: new Date().toISOString() }, ...prev].slice(0, 20));
  };
  const [userPreferences, setUserPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem('autonova_user_preferences');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [favoritedCars, setFavoritedCars] = useState(['lucid-air-sapphire', 'porsche-taycan-turbo-s']);
  const [comparedCars, setComparedCars] = useState([]);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const handleFavoriteToggle = (carId) => {
    AutoNovaAudio.playClick();
    const carName = ALL_RECOMMENDATIONS.find(c => c.id === carId)?.name || 'a vehicle';
    if (favoritedCars.includes(carId)) {
      setFavoritedCars(prev => prev.filter(id => id !== carId));
      showNotification("Removed from saved favorites.", "info");
      logActivity('favorite', `Removed ${carName} from saved favorites`, 'Heart');
    } else {
      setFavoritedCars(prev => [...prev, carId]);
      showNotification("Added vehicle to saved favorites.", "success");
      logActivity('favorite', `Saved ${carName} to favorites`, 'Heart');
    }
  };

  const handleCompareToggle = (carId, carName) => {
    AutoNovaAudio.playClick();
    setComparedCars(prev => {
      if (prev.includes(carId)) {
        showNotification(`${carName || 'Car'} removed from comparison.`, "info");
        return prev.filter(id => id !== carId);
      }
      if (prev.length >= 3) {
        showNotification("You can compare up to 3 cars at a time.", "error");
        return prev;
      }
      showNotification(`${carName || 'Car'} added to comparison.`, "success");
      return [...prev, carId];
    });
  };

  return (
    <BrowserRouter>
      {/* Dynamic Toast Alerts */}
      <AnimatePresence>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </AnimatePresence>

      <Routes>
        
        {/* --- AUTH ROUTES --- */}
        <Route 
          path="/signup" 
          element={<SignUpRouteWrapper setAuthenticatedUser={setAuthenticatedUser} showNotification={showNotification} />} 
        />
        <Route 
          path="/signin" 
          element={<SignInRouteWrapper setAuthenticatedUser={setAuthenticatedUser} showNotification={showNotification} />} 
        />
        <Route 
          path="/forgot-password" 
          element={
            <div className="min-h-screen bg-[#fdf8f8] flex items-center justify-center p-4">
              <SignUpForm mode="forgot-password" showNotification={showNotification} />
            </div>
          } 
        />
        <Route 
          path="/reset-password" 
          element={
            <div className="min-h-screen bg-[#fdf8f8] flex items-center justify-center p-4">
              <SignUpForm mode="reset-password" showNotification={showNotification} />
            </div>
          } 
        />
        <Route 
          path="/verify-otp" 
          element={<OtpRouteWrapper showNotification={showNotification} />} 
        />
        <Route 
          path="/onboarding" 
          element={<OnboardingRouteWrapper authenticatedUser={authenticatedUser} setUserPreferences={setUserPreferences} showNotification={showNotification} />} 
        />

        {/* --- ADMIN ROUTES (Isolated Sidebar, No Main Public Layout) --- */}
        <Route 
          path="/admin/login" 
          element={<AdminPortalView isLoginRoute={true} showNotification={showNotification} />} 
        />
        <Route 
          path="/admin/dashboard" 
          element={<AdminPortalView initialTab="overview" showNotification={showNotification} />} 
        />
        <Route 
          path="/admin/users" 
          element={<AdminPortalView initialTab="users" showNotification={showNotification} />} 
        />
        <Route 
          path="/admin/listings" 
          element={<AdminPortalView initialTab="approvals" showNotification={showNotification} />} 
        />
        <Route 
          path="/admin/orders" 
          element={<AdminPortalView initialTab="orders" showNotification={showNotification} />} 
        />
        <Route 
          path="/admin/ai-insights" 
          element={<AdminPortalView initialTab="insights" showNotification={showNotification} />} 
        />
        <Route 
          path="/admin/content" 
          element={<AdminPortalView initialTab="content" showNotification={showNotification} />} 
        />
        <Route 
          path="/admin/reviews" 
          element={<AdminPortalView initialTab="reviews" showNotification={showNotification} />} 
        />
        <Route 
          path="/admin/financials" 
          element={<AdminPortalView initialTab="financials" showNotification={showNotification} />} 
        />
        <Route 
          path="/admin/settings" 
          element={<AdminPortalView initialTab="settings" showNotification={showNotification} />} 
        />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

        {/* --- PUBLIC SHOPPING & ACCOUNT ROUTES (Wrapped in MainLayout) --- */}
        <Route element={
          <MainLayout 
            authenticatedUser={authenticatedUser} 
            cartItems={cartItems} 
            favoritedCars={favoritedCars}
            onLogout={async () => {
              try { await firebaseSignOut(); } catch {}
              setAuthenticatedUser(null);
              showNotification("Signed out successfully.", "info");
            }}
            showNotification={showNotification}
          />
        }>
          {/* Core Shopping Pages */}
          <Route path="/" element={<CatalogPage initialView="showroom" userName={authenticatedUser?.name} role={authenticatedUser?.role} cartItems={cartItems} favoritedCars={favoritedCars} onFavoriteToggle={handleFavoriteToggle} showNotification={showNotification} onBackToGate={() => { setAuthenticatedUser(null); showNotification("Signed out successfully.", "info"); }} />} />
          <Route path="/browse" element={<CatalogPage initialView="search" userName={authenticatedUser?.name} role={authenticatedUser?.role} cartItems={cartItems} favoritedCars={favoritedCars} onFavoriteToggle={handleFavoriteToggle} showNotification={showNotification} onBackToGate={() => { setAuthenticatedUser(null); showNotification("Signed out successfully.", "info"); }} />} />
          <Route path="/cars/:carId" element={<CarDetailWrapper favoritedCars={favoritedCars} handleFavoriteToggle={handleFavoriteToggle} cartItems={cartItems} setCartItems={setCartItems} showNotification={showNotification} />} />
          <Route path="/ai-assistant" element={<AIAssistantWrapper favoritedCars={favoritedCars} handleFavoriteToggle={handleFavoriteToggle} showNotification={showNotification} />} />
          <Route path="/compare" element={<CompareWrapper favoritedCars={favoritedCars} handleFavoriteToggle={handleFavoriteToggle} showNotification={showNotification} />} />
          <Route path="/wishlist" element={<WishlistWrapper favoritedCars={favoritedCars} handleFavoriteToggle={handleFavoriteToggle} comparedCars={comparedCars} handleCompareToggle={handleCompareToggle} showNotification={showNotification} />} />
          <Route path="/financing" element={<FinancingView showNotification={showNotification} />} />
          <Route path="/trade-in" element={<ValuationWrapper authenticatedUser={authenticatedUser} setAuthenticatedUser={setAuthenticatedUser} showNotification={showNotification} />} />
          <Route path="/test-drive/:carId" element={<TestDriveWrapper authenticatedUser={authenticatedUser} setAuthenticatedUser={setAuthenticatedUser} testDrives={testDrives} setTestDrives={setTestDrives} logActivity={logActivity} showNotification={showNotification} />} />
          <Route path="/cart" element={<CartView cartItems={cartItems} setCartItems={setCartItems} showNotification={showNotification} />} />
          <Route path="/checkout" element={<CheckoutWrapper cartItems={cartItems} setCartItems={setCartItems} setOrders={setOrders} logActivity={logActivity} showNotification={showNotification} />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmationWrapper showNotification={showNotification} />} />

          {/* User Account Dashboard Section */}
          <Route path="/dashboard" element={<DashboardWrapper authenticatedUser={authenticatedUser} setAuthenticatedUser={setAuthenticatedUser} favoritedCars={favoritedCars} handleFavoriteToggle={handleFavoriteToggle} comparedCars={comparedCars} orders={orders} userPreferences={userPreferences} activityLog={activityLog} showNotification={showNotification} />} />
          <Route path="/dashboard/orders" element={<OrdersWrapper authenticatedUser={authenticatedUser} setAuthenticatedUser={setAuthenticatedUser} orders={orders} showNotification={showNotification} />} />
          <Route path="/dashboard/test-drives" element={<MyTestDrivesWrapper authenticatedUser={authenticatedUser} setAuthenticatedUser={setAuthenticatedUser} testDrives={testDrives} setTestDrives={setTestDrives} showNotification={showNotification} />} />
          <Route path="/dashboard/messages" element={<MessagesWrapper authenticatedUser={authenticatedUser} setAuthenticatedUser={setAuthenticatedUser} showNotification={showNotification} />} />
          <Route path="/dashboard/notifications" element={<NotificationsWrapper authenticatedUser={authenticatedUser} setAuthenticatedUser={setAuthenticatedUser} showNotification={showNotification} />} />
          <Route path="/dashboard/settings" element={<SettingsWrapper authenticatedUser={authenticatedUser} setAuthenticatedUser={setAuthenticatedUser} showNotification={showNotification} />} />
          <Route path="/dashboard/saved-searches" element={<SavedSearchesWrapper authenticatedUser={authenticatedUser} setAuthenticatedUser={setAuthenticatedUser} showNotification={showNotification} />} />

          {/* Seller Section */}
          <Route path="/sell" element={<SellLandingWrapper showNotification={showNotification} />} />
          <Route path="/sell/create-listing" element={<CreateListingWrapper authenticatedUser={authenticatedUser} listings={listings} setListings={setListings} showNotification={showNotification} />} />
          <Route path="/seller/dashboard" element={<SellerDashboardWrapper authenticatedUser={authenticatedUser} listings={listings} setListings={setListings} logActivity={logActivity} showNotification={showNotification} />} />
          <Route path="/seller/listings/:listingId/analytics" element={<SellerAnalyticsWrapper listings={listings} showNotification={showNotification} />} />

          {/* Content & Trust Section */}
          <Route path="/reviews" element={<ReviewsWrapper authenticatedUser={authenticatedUser} showNotification={showNotification} />} />
          <Route path="/blog" element={<BlogWrapper showNotification={showNotification} />} />
          <Route path="/blog/:slug" element={<BlogSlugWrapper showNotification={showNotification} />} />
          <Route path="/about" element={<AboutWrapper showNotification={showNotification} />} />
          <Route path="/contact" element={<ContactWrapper showNotification={showNotification} />} />
          <Route path="/faq" element={<FaqWrapper showNotification={showNotification} />} />
          <Route path="/terms" element={<TermsOfServiceView initialTab="terms" showNotification={showNotification} />} />
          <Route path="/privacy" element={<TermsOfServiceView initialTab="privacy" showNotification={showNotification} />} />

          {/* Fallback Catch-All 404 Route */}
          <Route path="*" element={<NotFoundWrapper showNotification={showNotification} />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
