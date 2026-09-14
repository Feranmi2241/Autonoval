import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AutoNovaAudio } from './AudioEngine';
import { 
  Star, ChevronDown, ThumbsUp, MessageSquare, Plus, Check, X, Sparkles, Filter, 
  ArrowLeft, ShoppingBag, ArrowRight, UserCheck, ShieldCheck, Bookmark
} from 'lucide-react';

export const ReviewsView = ({
  userName = "Alexander Sterling",
  role = "Client",
  onNavigateToView,
  showNotification
}) => {
  const [activeFilter, setActiveFilter] = useState('All'); // 'All' | 'Buyer' | 'Seller' | '5-Star' | 'Recent'
  const [showWriteModal, setShowWriteModal] = useState(false);
  
  // New Review Form State
  const [newRating, setNewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewRole, setNewReviewRole] = useState('Buyer'); // 'Buyer' | 'Seller'
  const [newVehicleModel, setNewVehicleModel] = useState('');
  const [newReviewPhotos, setNewReviewPhotos] = useState([]);

  // Initial Reviews Database
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Marcus Vance",
      role: "Verified Buyer",
      vehicle: "Lucid Air Sapphire (2025)",
      rating: 5,
      date: "June 12, 2026",
      title: "Mind-blowing AI accuracy and fast delivery",
      text: "AutoNova completely changed how I look at car buying. The AI matches were eerily accurate to my preferences. Found my dream car in minutes, secured financing, and the Apapa Fast-Track clearing saved me at least 3 weeks of port delays.",
      helpfulCount: 24,
      isUpvoted: false,
      response: "AutoNova Concierge: Thank you Marcus! We are glad our deep matching algorithms and Apapa port partnership delivered a seamless handover experience."
    },
    {
      id: 2,
      name: "Elena Rodriguez",
      role: "Verified Seller",
      vehicle: "Porsche Taycan Turbo S (2024)",
      rating: 5,
      date: "June 08, 2026",
      title: "Sold within 48 hours above appraisal price!",
      text: "Selling my vehicle through AutoNova was incredibly smooth. The AI valuation was spot on, and I had three serious, verified offers within 48 hours. The secure escrow system gave me total peace of mind.",
      helpfulCount: 18,
      isUpvoted: false,
      response: "AutoNova Concierge: Brilliant outcome, Elena! Our network regression models actively coordinate with high-intent luxury buyers to ensure top-tier valuations represent real asset liquidity."
    },
    {
      id: 3,
      name: "Julian Chen",
      role: "Verified Buyer",
      vehicle: "Tesla Model S Plaid (2024)",
      rating: 5,
      date: "May 29, 2026",
      title: "Financing tools are next-level",
      text: "The financing tools are next level. I secured a better interest rate than my own private bank offered, in just a few clicks. Totally transparent, no hidden broker markups. Five stars!",
      helpfulCount: 12,
      isUpvoted: false,
      response: null
    },
    {
      id: 4,
      name: "Chinedu Okafor",
      role: "Verified Seller",
      vehicle: "Rivian R1S Launch Edition (2024)",
      rating: 4,
      date: "May 15, 2026",
      title: "Excellent service and escrow coordination",
      text: "Excellent service. Got a great valuation on my Rivian. The physical inspection at the Lekki node was fast and the escrow payout cleared within an hour of title transfer. Docked one star only because the uploader took a couple tries on my mobile connection.",
      helpfulCount: 9,
      isUpvoted: false,
      response: "AutoNova Concierge: Thank you for the feedback, Chinedu! We have optimized our mobile image compression engine to facilitate faster uploader response speeds in low-coverage zones."
    },
    {
      id: 5,
      name: "Tariq Al-Mansoor",
      role: "Verified Buyer",
      vehicle: "Lotus Eletre R (2025)",
      rating: 5,
      date: "April 24, 2026",
      title: "Absolute masterpiece of premium concierge buying",
      text: "AutoNova's Black Label Elite upgrade is worth every single naira. The personalized curation matched me with a certified, low-mileage Lotus Eletre R. They handled international freight, sovereign duty documentation, and home delivery in Abuja. Phenomenal.",
      helpfulCount: 31,
      isUpvoted: false,
      response: "AutoNova Concierge: We are honored, Tariq! Our Abuja and Lagos logistics terminals are dedicated to delivering absolute excellence to our Black Label patrons."
    }
  ]);

  // Statistics
  const totalReviewsCount = reviews.length;
  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviewsCount).toFixed(1);
  
  // Count counts of each star
  const starCounts = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length
  };

  // Upvote Review helper
  const handleUpvote = (id) => {
    AutoNovaAudio.playSuccess();
    setReviews(reviews.map(r => {
      if (r.id === id) {
        return {
          ...r,
          helpfulCount: r.isUpvoted ? r.helpfulCount - 1 : r.helpfulCount + 1,
          isUpvoted: !r.isUpvoted
        };
      }
      return r;
    }));
    showNotification("Feedback logged on the ledger!", "success");
  };

  // Submit Review helper
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReviewTitle || !newReviewText || !newVehicleModel) {
      showNotification("Please fill in all review fields.", "error");
      return;
    }

    AutoNovaAudio.playSuccess();
    const newReview = {
      id: reviews.length + 1,
      name: userName,
      role: `Verified ${newReviewRole}`,
      vehicle: newVehicleModel,
      rating: newRating,
      date: "Today",
      title: newReviewTitle,
      text: newReviewText,
      helpfulCount: 0,
      isUpvoted: false,
      response: null,
      photos: newReviewPhotos
    };

    setReviews([newReview, ...reviews]);
    setShowWriteModal(false);
    setNewReviewPhotos([]);
    
    // Reset Form fields
    setNewRating(5);
    setNewReviewTitle('');
    setNewReviewText('');
    setNewVehicleModel('');
    showNotification("Thank you! Your verified review has been published to the AutoNova ledger.", "success");
  };

  // Filter Reviews
  const filteredReviews = reviews.filter(r => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Buyer') return r.role.includes('Buyer');
    if (activeFilter === 'Seller') return r.role.includes('Seller');
    if (activeFilter === '5-Star') return r.rating === 5;
    if (activeFilter === 'Recent') return r.date === "Today" || r.date.includes("June");
    return true;
  });

  return (
    <div className="flex-grow bg-[#fdf8f8] min-h-[calc(100vh-80px)] pb-32">
      {/* Upper Navigation Banner */}
      <div className="border-b border-zinc-200/60 bg-white py-5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('dashboard'); }}
              className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-teal-800 hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <span className="font-mono text-[8px] tracking-widest text-teal-700 font-extrabold uppercase block">
                MEMBERSHIP & LEDGER INTEGRITY
              </span>
              <h1 className="font-display text-xl md:text-2xl font-extrabold text-teal-950 tracking-tight leading-none mt-1">
                Reviews & Ratings
              </h1>
            </div>
          </div>

          <button
            onClick={() => { AutoNovaAudio.playClick(); setShowWriteModal(true); }}
            className="px-5 py-3 bg-teal-700 hover:bg-teal-800 text-white font-mono text-[9px] tracking-widest font-extrabold uppercase rounded-full shadow-sm cursor-pointer transition-all flex items-center gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Write a Review</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Aggregates Summary */}
        <section className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-zinc-200/60 p-6 md:p-8 space-y-6 shadow-sm">
            <h3 className="font-display font-extrabold text-sm text-teal-950 uppercase tracking-wider pb-3 border-b border-zinc-100 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-teal-700" />
              <span>Sovereign Ratings Summary</span>
            </h3>

            {/* Massive Star Rating Card */}
            <div className="text-center bg-zinc-50 py-6 rounded-2xl border border-zinc-100">
              <p className="font-display text-5xl font-black text-teal-950 leading-none">
                {averageRating}
              </p>
              <div className="flex justify-center gap-1.5 text-amber-500 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-[10px] text-zinc-400 font-mono tracking-wider font-extrabold uppercase mt-2">
                Based on {totalReviewsCount} sovereign transactions
              </p>
            </div>

            {/* Progress Bar Breakdown */}
            <div className="space-y-3 pt-2 text-xs font-semibold text-zinc-600">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = starCounts[stars] || 0;
                const percentage = totalReviewsCount > 0 ? (count / totalReviewsCount) * 100 : 0;
                return (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="w-3 font-mono text-[10px] font-bold text-zinc-400">{stars}</span>
                    <Star className="h-3.5 w-3.5 text-amber-500 fill-current shrink-0" />
                    
                    {/* Background Bar */}
                    <div className="flex-grow h-2 bg-zinc-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-teal-700 rounded-full transition-all duration-500" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <span className="w-8 text-right font-mono text-[9px] font-bold text-zinc-500">
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Core App Shield Badge */}
          <div className="bg-teal-950 text-white rounded-3xl p-6 md:p-8 space-y-4 shadow-md relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-teal-800/10 rounded-full blur-2xl" />
            <div className="p-3 bg-teal-800/20 rounded-2xl text-teal-300 w-fit">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h4 className="font-display font-bold text-sm tracking-tight text-white leading-none">
              Verified Transaction Ledger
            </h4>
            <p className="text-[11px] text-teal-150 font-medium leading-relaxed">
              Every single review on AutoNova stems exclusively from authenticated owners and sellers who completed legal custody and escrow transfer on our digital ledger node. Zero spam. Absolute transparency.
            </p>
          </div>
        </section>

        {/* Right Column: Active Feedbacks & Reviews */}
        <section className="lg:col-span-8 space-y-6">
          
          {/* Filters Bar */}
          <div className="bg-white p-2 border border-zinc-200/60 rounded-2xl shadow-sm flex flex-wrap gap-1.5 items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'All', label: 'All Reviews' },
                { id: 'Buyer', label: 'Verified Buyers' },
                { id: 'Seller', label: 'Verified Sellers' },
                { id: '5-Star', label: '5-Star Rating' },
                { id: 'Recent', label: 'Recent Transactions' }
              ].map(filter => {
                const isActive = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => { AutoNovaAudio.playClick(); setActiveFilter(filter.id); }}
                    className={`px-4 py-1.5 rounded-xl font-mono text-[9px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-teal-700 text-white shadow-sm' 
                        : 'bg-transparent text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 font-mono text-[9px] font-bold text-zinc-400">
              <Filter className="h-3 w-3" />
              <span>{filteredReviews.length} RESULT(S)</span>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review, idx) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, delay: idx * 0.05 }}
                    className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-200/60 shadow-sm space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Top Author Details Row */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-800 font-bold text-xs uppercase">
                            {review.name.substring(0, 2)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-display font-black text-xs text-teal-950 leading-none">{review.name}</h4>
                              <span className={`inline-flex items-center gap-1 text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                review.role.includes('Buyer') 
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' 
                                  : 'bg-purple-50 text-purple-800 border border-purple-100'
                              }`}>
                                <UserCheck className="h-2.5 w-2.5" />
                                <span>{review.role}</span>
                              </span>
                            </div>
                            <p className="text-[9px] font-mono font-bold text-zinc-400 uppercase mt-0.5">
                              {review.vehicle} • {review.date}
                            </p>
                          </div>
                        </div>

                        {/* Stars Indicator */}
                        <div className="flex gap-0.5 text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3.5 w-3.5 ${i < review.rating ? 'fill-current' : 'text-zinc-200'}`} 
                            />
                          ))}
                        </div>
                      </div>

                      {/* Title & Body */}
                      <div className="space-y-1.5">
                        <h3 className="font-display font-bold text-sm text-teal-950 leading-tight">
                          {review.title}
                        </h3>
                        <p className="text-xs text-zinc-600 font-medium leading-relaxed">
                          {review.text}
                        </p>
                        {review.photos && review.photos.length > 0 && (
                          <div className="flex gap-2 pt-1">
                            {review.photos.map((url, i) => (
                              <img
                                key={i}
                                src={url}
                                alt="Review attachment"
                                referrerPolicy="no-referrer"
                                className="w-16 h-16 rounded-xl object-cover border border-zinc-200 cursor-pointer hover:opacity-90 transition-opacity"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Developer Response Box if present */}
                    {review.response && (
                      <div className="bg-zinc-50 border-l-4 border-teal-700 rounded-r-xl p-4 text-[11px] font-medium text-zinc-600 leading-relaxed mt-2">
                        {review.response}
                      </div>
                    )}

                    {/* Bottom Action Row (Thumbs up) */}
                    <div className="pt-4 border-t border-zinc-100/60 mt-3 flex justify-between items-center text-xs">
                      <button
                        onClick={() => handleUpvote(review.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono text-[9px] font-extrabold uppercase transition-all cursor-pointer ${
                          review.isUpvoted 
                            ? 'bg-teal-50 border-teal-200 text-teal-800' 
                            : 'bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-500 hover:text-zinc-800'
                        }`}
                      >
                        <ThumbsUp className={`h-3 w-3 ${review.isUpvoted ? 'fill-current' : ''}`} />
                        <span>HELPFUL ({review.helpfulCount})</span>
                      </button>

                      <span className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1">
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span>LEDGER VERIFIED NODE</span>
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-16 bg-white rounded-3xl border border-zinc-200/50">
                  <Star className="h-10 w-10 text-zinc-300 mx-auto mb-3" />
                  <p className="text-sm text-zinc-600 font-bold">No verified reviews found.</p>
                  <p className="text-xs text-zinc-400 mt-1">Try resetting the filter tabs or write a review to get started.</p>
                  <button
                    onClick={() => { AutoNovaAudio.playClick(); setActiveFilter('All'); }}
                    className="mt-4 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-mono text-[9px] tracking-widest font-extrabold uppercase rounded-xl shadow-sm transition-colors cursor-pointer"
                  >
                    Reset Filter Tabs
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>

      {/* WRITE A REVIEW OVERLAY MODAL */}
      <AnimatePresence>
        {showWriteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { AutoNovaAudio.playClick(); setShowWriteModal(false); }}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden max-w-lg w-full border border-zinc-200 shadow-2xl p-6 md:p-8 space-y-6"
            >
              {/* Header */}
              <div className="flex justify-between items-start pb-4 border-b border-zinc-150">
                <div>
                  <span className="font-mono text-[8px] tracking-widest text-teal-700 font-extrabold uppercase block">
                    BLOCK LABEL COGNIZANCE
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-black text-teal-950 tracking-tight">
                    Write a Verified Review
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => { AutoNovaAudio.playClick(); setShowWriteModal(false); }}
                  className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Form body */}
              <form onSubmit={handleSubmitReview} className="space-y-4">
                
                {/* 1. Star Selection Row */}
                <div className="space-y-2 text-center py-2 bg-zinc-50 rounded-2xl border border-zinc-100/50">
                  <label className="font-mono text-[8px] font-bold text-zinc-400 block uppercase tracking-wider">
                    CLICK TO VALUE YOUR EXPERIENCE
                  </label>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((num) => {
                      const active = num <= newRating;
                      return (
                        <button
                          key={num}
                          type="button"
                          onMouseEnter={() => AutoNovaAudio.playHover()}
                          onClick={() => { AutoNovaAudio.playClick(); setNewRating(num); }}
                          className={`p-1.5 transition-transform hover:scale-115 cursor-pointer ${
                            active ? 'text-amber-500' : 'text-zinc-200 hover:text-amber-300'
                          }`}
                        >
                          <Star className="h-7 w-7 fill-current" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Title / Role */}
                  <div className="space-y-1">
                    <label className="font-mono text-[8px] font-bold text-zinc-400 block uppercase tracking-wider">YOUR ROLE</label>
                    <div className="grid grid-cols-2 gap-1 p-1 bg-zinc-100 rounded-xl">
                      <button
                        type="button"
                        onClick={() => { AutoNovaAudio.playClick(); setNewReviewRole('Buyer'); }}
                        className={`py-1.5 font-mono text-[8px] font-extrabold uppercase rounded-lg cursor-pointer ${
                          newReviewRole === 'Buyer' ? 'bg-white shadow-xs text-teal-950 font-bold' : 'text-zinc-500'
                        }`}
                      >
                        Buyer
                      </button>
                      <button
                        type="button"
                        onClick={() => { AutoNovaAudio.playClick(); setNewReviewRole('Seller'); }}
                        className={`py-1.5 font-mono text-[8px] font-extrabold uppercase rounded-lg cursor-pointer ${
                          newReviewRole === 'Seller' ? 'bg-white shadow-xs text-teal-950 font-bold' : 'text-zinc-500'
                        }`}
                      >
                        Seller
                      </button>
                    </div>
                  </div>

                  {/* Vehicle Name */}
                  <div className="space-y-1">
                    <label className="font-mono text-[8px] font-bold text-zinc-400 block uppercase tracking-wider">VEHICLE DETAILS</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rimac Nevera (2025)"
                      value={newVehicleModel}
                      onChange={(e) => setNewVehicleModel(e.target.value)}
                      className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-700"
                    />
                  </div>
                </div>

                {/* Review Headline */}
                <div className="space-y-1">
                  <label className="font-mono text-[8px] font-bold text-zinc-400 block uppercase tracking-wider">REVIEW HEADLINE</label>
                  <input
                    type="text"
                    required
                    placeholder="Summarize your ledger transaction..."
                    value={newReviewTitle}
                    onChange={(e) => setNewReviewTitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-700"
                  />
                </div>

                {/* Detailed Feedback Textarea */}
                <div className="space-y-1">
                  <label className="font-mono text-[8px] font-bold text-zinc-400 block uppercase tracking-wider">YOUR VERIFIED FEEDBACK</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Please describe your comparative appraisal, logistics speed, or concierge assistance experience..."
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-700"
                  />
                </div>

                {/* Photo upload — previously missing entirely */}
                <div>
                  <label className="font-mono text-[8px] font-bold text-zinc-400 block uppercase tracking-wider mb-2">
                    Add Photos (Optional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {newReviewPhotos.map((url, i) => (
                      <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-zinc-200 group">
                        <img src={url} alt="Review upload" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setNewReviewPhotos(prev => prev.filter((_, idx) => idx !== i))}
                          className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/60 text-white flex items-center justify-center cursor-pointer"
                        >
                          <X className="h-2.5 w-2.5" />
                        </button>
                      </div>
                    ))}
                    {newReviewPhotos.length < 4 && (
                      <label className="w-16 h-16 rounded-xl border-2 border-dashed border-zinc-200 hover:border-teal-700 flex items-center justify-center cursor-pointer transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = URL.createObjectURL(file);
                              setNewReviewPhotos(prev => [...prev, url]);
                            }
                          }}
                        />
                        <Plus className="h-4 w-4 text-zinc-300" />
                      </label>
                    )}
                  </div>
                </div>

                {/* Action Row */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => { AutoNovaAudio.playClick(); setShowWriteModal(false); }}
                    className="flex-1 py-3 border border-zinc-200 rounded-xl text-zinc-700 font-mono text-[9px] tracking-wider uppercase font-bold hover:bg-zinc-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-teal-700 hover:bg-teal-800 text-white font-mono text-[9px] tracking-wider uppercase font-extrabold rounded-xl shadow-md cursor-pointer transition-colors"
                  >
                    Publish Ledger Review
                  </button>
                </div>

              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
