import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AutoNovaAudio } from './AudioEngine';
import { 
  Sparkles, ArrowLeft, ArrowRight, Check, Upload, Trash2, Camera, Shield, 
  DollarSign, Sliders, AlertCircle, CheckCircle2, RefreshCw, Layers
} from 'lucide-react';

export const CreateListingView = ({
  userName = "Alexander Sterling",
  role = "Client",
  onNavigateToView,
  showNotification,
  onAddListingToState // Callback if parent manages active listings
}) => {
  // Steps: 1: Vehicle Info, 2: Condition & Photos, 3: Pricing, 4: Summary/Review, 5: Success Portal
  const [currentStep, setCurrentStep] = useState(1);

  // STEP 1: Vehicle Information State
  const [vin, setVin] = useState('');
  const [isVinLoading, setIsVinLoading] = useState(false);
  const [year, setYear] = useState('2025');
  const [make, setMake] = useState('Lucid');
  const [model, setModel] = useState('Air Sapphire');
  const [trim, setTrim] = useState('Grand Touring');
  const [mileage, setMileage] = useState('1200');
  const [bodyType, setBodyType] = useState('Sedan');
  const [fuelType, setFuelType] = useState('Electric');
  const [color, setColor] = useState('Obsidian Shadow');

  // STEP 2: Condition & Photos State
  const [condition, setCondition] = useState('Great'); // Pristine | Great | Good | Fair
  const [keyFeatures, setKeyFeatures] = useState('Executive Seating Pack, Glass Canopy, Ceramic Brakes');
  const [photos, setPhotos] = useState([
    { id: '1', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_1r-3dvO9l2h_MsYeVRt55vlkfyaT0_Zs0rQb0WTzGWKuXk2lj6UCQY9eYN6P1r9wA5catTmEIq3hN1c1isaH0CZ6uLbflioMzjD2uroK1nvhnTTjbwLumxj_vI1NNeAVTOeMULpw8Qd5-pYYjd1bWki4DhA35TwlANCgWxgqCElataauEX3u33wnMp7OG1xVQnpmZmDv0x3pkww4LZPujkjNaTF0NJQ5mDKteXrYgQyIGwPkfJug0HDlBKn_pqB01wJxiTHxly3x' }
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // STEP 3: Pricing & Consignment State
  const [listingPrice, setListingPrice] = useState(145000);
  const [isBoosted, setIsBoosted] = useState(false);
  const [escrowTermAccepted, setEscrowTermAccepted] = useState(true);

  // Simulated VIN Lookup
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
      setTrim('Sapphire Special Edition');
      setMileage('1200');
      setBodyType('Sedan');
      setFuelType('Electric');
      setColor('Obsidian Shadow');
      AutoNovaAudio.playSuccess();
      showNotification("VIN verified! Lucid Air Sapphire specifications loaded.", "success");
    }, 1200);
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelection(files);
    }
  };

  const triggerFileInput = () => {
    AutoNovaAudio.playClick();
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelection(files);
    }
  };

  const handleFileSelection = (files) => {
    AutoNovaAudio.playSuccess();
    const newPhotos = Array.from(files).map((file, idx) => ({
      id: Date.now() + '-' + idx,
      url: URL.createObjectURL(file),
      name: file.name
    }));
    setPhotos([...photos, ...newPhotos]);
    showNotification(`${files.length} photo(s) added successfully!`, "success");
  };

  const removePhoto = (id) => {
    AutoNovaAudio.playClick();
    setPhotos(photos.filter(p => p.id !== id));
    showNotification("Photo removed.", "info");
  };

  // Publish Form Submit
  const handlePublishListing = () => {
    if (!escrowTermAccepted) {
      showNotification("You must accept the Escrow terms to publish.", "error");
      return;
    }

    AutoNovaAudio.playSuccess();
    
    // Construct the new listing payload
    const listingPayload = {
      id: 'custom-' + Date.now(),
      name: `${make} ${model}`,
      trim: trim,
      year: parseInt(year),
      price: listingPrice,
      mileage: parseInt(mileage).toLocaleString() + ' km',
      type: bodyType,
      fuel: fuelType,
      color: color,
      condition: condition,
      image: photos[0]?.url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxq14nz9AAHBcmHOg_6le5vU2TI_zvDWE83ABCO2EE5CiJNd7BU4duqS2qU8-bwoO5ZKRNfCKk4lAn6iZWbX83gkXLinMyVtulpeYe5onWsqJzXUe7JkHEr9mw1s1QHIvhmcIOVQ3oB9iF78_dSUh-oElPCv1SepMes1zEwZYGahyuTjv2nNqwhy46jgEVq1KqhbukNnOlSle7QGErC8d8U-8cwTaWyAXhnfb8nk1aEVoVdciGP7JSNulCKFGdPs7mcA4Vj6I7Cv94',
      status: 'Active',
      views: 0,
      inquiries: 0,
      dateAdded: 'Today'
    };

    if (onAddListingToState) {
      onAddListingToState(listingPayload);
    }

    setCurrentStep(5); // Success step
    showNotification("Listing published to the AutoNova node database successfully!", "success");
  };

  const handleSaveAsDraft = () => {
    AutoNovaAudio.playClick();
    const draftPayload = {
      id: 'draft-' + Date.now(),
      make, model, trim, year, mileage, bodyType, fuelType, color, condition,
      listingPrice, photos: photos.map(p => p.url),
      savedAt: new Date().toISOString(),
      status: 'Draft',
    };
    try {
      const existingDrafts = JSON.parse(localStorage.getItem('autonova_listing_drafts') || '[]');
      localStorage.setItem('autonova_listing_drafts', JSON.stringify([draftPayload, ...existingDrafts]));
      showNotification("Draft saved. You can pick up where you left off anytime.", "success");
    } catch {
      showNotification("Couldn't save draft — please try again.", "error");
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!make || !model) {
        showNotification("Make and Model are required.", "error");
        return;
      }
    }
    if (currentStep === 2) {
      if (photos.length === 0) {
        showNotification("Please upload at least 1 photo for buyer verification.", "error");
        return;
      }
    }

    AutoNovaAudio.playClick();
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    AutoNovaAudio.playClick();
    setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="flex-grow bg-[#fdf8f8] min-h-[calc(100vh-80px)] pb-32">
      {/* Upper Navigation / Stepper header */}
      <div className="border-b border-zinc-200/60 bg-white py-5 px-4 md:px-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('seller-dashboard'); }}
              className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-teal-800 hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <span className="font-mono text-[8px] tracking-widest text-teal-700 font-extrabold uppercase block">
                CONSIGNMENT HUB // DEEP LEDGER
              </span>
              <h1 className="font-display text-xl md:text-2xl font-extrabold text-teal-950 tracking-tight leading-none mt-1">
                Create a Vehicle Listing
              </h1>
            </div>
          </div>

          {/* Steps Horizontal Visualizer */}
          {currentStep < 5 && (
            <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-400">
              {[
                { s: 1, label: "Info" },
                { s: 2, label: "Photos" },
                { s: 3, label: "Pricing" },
                { s: 4, label: "Review" }
              ].map((stepObj) => {
                const isActive = currentStep === stepObj.s;
                const isPassed = currentStep > stepObj.s;
                return (
                  <React.Fragment key={stepObj.s}>
                    {stepObj.s > 1 && <span className="h-0.5 w-6 bg-zinc-200 rounded" />}
                    <div className="flex items-center gap-1.5">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                        isActive 
                          ? 'bg-teal-700 text-white shadow' 
                          : isPassed 
                            ? 'bg-teal-150 text-teal-850' 
                            : 'bg-zinc-100 text-zinc-400'
                      }`}>
                        {isPassed ? <Check className="h-3 w-3" /> : stepObj.s}
                      </span>
                      <span className={`hidden sm:inline ${isActive ? 'text-teal-950' : 'text-zinc-400'}`}>
                        {stepObj.label}
                      </span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
            <button
              onClick={handleSaveAsDraft}
              className="font-mono text-[9px] font-bold text-zinc-400 hover:text-teal-700 uppercase tracking-widest cursor-pointer whitespace-nowrap border-l border-zinc-200 pl-4"
            >
              Save as Draft
            </button>
            </div>
          )}
        </div>
      </div>

      {/* Primary Canvas Container */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: VEHICLE DETAILS */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-3xl border border-zinc-200/60 p-6 md:p-8 space-y-6 shadow-sm"
            >
              <div className="pb-4 border-b border-zinc-100">
                <span className="font-mono text-[8px] tracking-widest text-purple-700 font-extrabold uppercase">STEP 01 OF 04</span>
                <h2 className="font-display text-lg font-extrabold text-teal-950 mt-1">Vehicle Specification Coordinates</h2>
                <p className="text-xs text-zinc-500 font-medium">Input your sovereign vehicle parameters manually or trigger dynamic VIN reading.</p>
              </div>

              {/* VIN Autocompleter */}
              <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-100/80 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-purple-50 text-purple-700">
                    <Sparkles className="h-4 w-4 animate-pulse" />
                  </span>
                  <span className="font-mono text-[8px] font-bold text-purple-950 tracking-wider uppercase">DYNAMIC COGNITIVE DECODER</span>
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter 17-character vehicle VIN..."
                    value={vin}
                    onChange={(e) => setVin(e.target.value)}
                    className="flex-grow bg-white border border-zinc-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-purple-700 placeholder-zinc-400"
                  />
                  <button
                    type="button"
                    onClick={handleVinLookup}
                    disabled={isVinLoading}
                    className="px-5 bg-purple-700 hover:bg-purple-800 disabled:bg-purple-400 text-white rounded-xl font-mono text-[9px] tracking-wider font-extrabold uppercase flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    {isVinLoading ? (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        <span>DECODING...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>AUTO-DECODE</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Form Manual Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <label className="font-mono text-[8px] font-bold text-zinc-400 block uppercase tracking-wider">MAKE</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lucid"
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-700"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[8px] font-bold text-zinc-400 block uppercase tracking-wider">MODEL</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Air Sapphire"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-700"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[8px] font-bold text-zinc-400 block uppercase tracking-wider">TRIM PROFILE</label>
                  <input
                    type="text"
                    placeholder="e.g. Grand Touring"
                    value={trim}
                    onChange={(e) => setTrim(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-700"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[8px] font-bold text-zinc-400 block uppercase tracking-wider">YEAR</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-3 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-700"
                  >
                    {['2026', '2025', '2024', '2023', '2022', '2021', '2020'].map(yr => (
                      <option key={yr} value={yr}>{yr}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[8px] font-bold text-zinc-400 block uppercase tracking-wider">MILEAGE (KM)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 15000"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-700"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[8px] font-bold text-zinc-400 block uppercase tracking-wider">EXTERIOR COLOR</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Obsidian Shadow"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-700"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[8px] font-bold text-zinc-400 block uppercase tracking-wider">BODY STYLE</label>
                  <select
                    value={bodyType}
                    onChange={(e) => setBodyType(e.target.value)}
                    className="w-full px-3 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-700"
                  >
                    {['Sedan', 'SUV', 'Coupe', 'Truck'].map(bt => (
                      <option key={bt} value={bt}>{bt}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[8px] font-bold text-zinc-400 block uppercase tracking-wider">FUEL CONFIGURATION</label>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    className="w-full px-3 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-700"
                  >
                    {['Electric', 'Hybrid', 'Petrol'].map(ft => (
                      <option key={ft} value={ft}>{ft}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Navigation Action Row */}
              <div className="pt-6 border-t border-zinc-100 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-mono text-[10px] tracking-widest font-extrabold uppercase rounded-full shadow transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Continue Step 2</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: CONDITION & PHOTOS */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-3xl border border-zinc-200/60 p-6 md:p-8 space-y-6 shadow-sm"
            >
              <div className="pb-4 border-b border-zinc-100">
                <span className="font-mono text-[8px] tracking-widest text-purple-700 font-extrabold uppercase">STEP 02 OF 04</span>
                <h2 className="font-display text-lg font-extrabold text-teal-950 mt-1">Condition & Visual Verification</h2>
                <p className="text-xs text-zinc-500 font-medium">Be completely honest. Outstanding condition claims generate trust and accelerate liquidity transfers.</p>
              </div>

              {/* Condition Selectors */}
              <div className="space-y-3">
                <label className="font-mono text-[8px] font-bold text-zinc-400 block uppercase tracking-wider">VEHICLE CONDITION CATEGORY</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { val: 'Pristine', desc: 'No wear, showroom quality, flawless' },
                    { val: 'Great', desc: 'Minor cosmetic marks only, well kept' },
                    { val: 'Good', desc: 'Standard wear corresponding to mileage' },
                    { val: 'Fair', desc: 'Noticeable repairs needed, fully functional' }
                  ].map(c => {
                    const active = condition === c.val;
                    return (
                      <button
                        key={c.val}
                        type="button"
                        onClick={() => { AutoNovaAudio.playClick(); setCondition(c.val); }}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          active 
                            ? 'bg-teal-50/50 border-teal-700 ring-2 ring-teal-700/20' 
                            : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300'
                        }`}
                      >
                        <span className={`font-display font-extrabold text-xs ${active ? 'text-teal-950' : 'text-zinc-700'}`}>{c.val}</span>
                        <span className="text-[10px] text-zinc-400 font-medium leading-tight mt-1.5">{c.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Key Features Text field */}
              <div className="space-y-1.5">
                <label className="font-mono text-[8px] font-bold text-zinc-400 block uppercase tracking-wider">KEY PERKS & CUSTOM PACKS</label>
                <input
                  type="text"
                  placeholder="e.g. Glass Canopy, Autopilot Full computer, Sport exhaust..."
                  value={keyFeatures}
                  onChange={(e) => setKeyFeatures(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-700"
                />
              </div>

              {/* Drag & Drop Photo Uploader */}
              <div className="space-y-3">
                <label className="font-mono text-[8px] font-bold text-zinc-400 block uppercase tracking-wider">HIGH RESOLUTION DOSSIER PHOTOS</label>
                
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={triggerFileInput}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-3 ${
                    isDragging 
                      ? 'border-purple-700 bg-purple-50/20' 
                      : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100/50 hover:border-zinc-300'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="p-3 bg-white rounded-full shadow-sm text-zinc-400">
                    <Upload className="h-6 w-6 text-teal-700" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-zinc-700 font-bold">Drag and drop high-tier photos here</p>
                    <p className="text-[10px] text-zinc-400 font-semibold">Or click to search local directory folders (PNG, JPG up to 10MB)</p>
                  </div>
                </div>

                {/* Photo Thumbnail Grid List */}
                {photos.length > 0 && (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3">
                      {photos.map((photo) => (
                        <div key={photo.id} className="relative aspect-video rounded-xl overflow-hidden border border-zinc-200 shadow-sm group bg-zinc-150">
                          <img
                            src={photo.url}
                            alt="Vehicle"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(photo.id)}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* AI photo-quality feedback */}
                    <div className={`flex items-start gap-2.5 p-4 rounded-xl border ${photos.length >= 4 ? 'bg-emerald-50/50 border-emerald-100' : 'bg-purple-50/40 border-purple-100'}`}>
                      <Sparkles className={`h-4 w-4 mt-0.5 shrink-0 ${photos.length >= 4 ? 'text-emerald-600' : 'text-purple-600'}`} />
                      <div>
                        <p className={`text-xs font-bold ${photos.length >= 4 ? 'text-emerald-800' : 'text-purple-800'}`}>
                          {photos.length >= 4 ? 'Photo quality: Great!' : `Photo quality: Good — ${photos.length} of 4+ recommended`}
                        </p>
                        <p className="text-[10px] text-zinc-500 font-medium mt-0.5">
                          {photos.length >= 4
                            ? 'Your listing has enough angles to build buyer confidence.'
                            : 'Tip: add a dashboard shot and a rear 3/4 angle — listings with 4+ photos get noticeably more inquiries.'}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Navigation Action Row */}
              <div className="pt-6 border-t border-zinc-100 flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-3.5 border border-zinc-200 hover:bg-zinc-50 text-zinc-600 rounded-full font-mono text-[10px] tracking-widest font-extrabold uppercase transition-all cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-mono text-[10px] tracking-widest font-extrabold uppercase rounded-full shadow transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Continue Step 3</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: PRICING & TERMS */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-3xl border border-zinc-200/60 p-6 md:p-8 space-y-6 shadow-sm"
            >
              <div className="pb-4 border-b border-zinc-100">
                <span className="font-mono text-[8px] tracking-widest text-purple-700 font-extrabold uppercase">STEP 03 OF 04</span>
                <h2 className="font-display text-lg font-extrabold text-teal-950 mt-1">Appraisal & Pricing Parameters</h2>
                <p className="text-xs text-zinc-500 font-medium">Assign a targeted price. Leverage network appraisal coordinates to guarantee high conversion rates.</p>
              </div>

              {/* Dynamic Price Range Slider */}
              <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-150 space-y-5">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-wider">YOUR INTENDED SELL PRICE</span>
                  <span className="font-display font-black text-2xl text-teal-950">${listingPrice.toLocaleString()}</span>
                </div>

                <div className="relative pt-1">
                  {/* AI-suggested optimal zone, highlighted behind the slider track */}
                  <div
                    className="absolute top-1 h-2 rounded-full bg-gradient-to-r from-purple-300 to-teal-300 opacity-70 pointer-events-none"
                    style={{ left: '23.8%', width: '8.3%' }}
                    title="AI-suggested optimal range"
                  />
                  <input
                    type="range"
                    min="30000"
                    max="450000"
                    step="2500"
                    value={listingPrice}
                    onChange={(e) => { setListingPrice(parseInt(e.target.value)); AutoNovaAudio.playClick(); }}
                    className="relative w-full h-2 bg-zinc-200/60 rounded-lg appearance-none cursor-pointer accent-teal-700 focus:outline-none"
                  />
                </div>

                <div className="flex justify-between font-mono text-[8px] font-bold text-zinc-400 uppercase">
                  <span>Min Recommendation ($30,000)</span>
                  <span className="inline-flex items-center gap-1 text-teal-700 font-bold">
                    <Sparkles className="h-2.5 w-2.5" />
                    AI Optimal Zone: $130K–$165K
                  </span>
                  <span>Max ($450,000)</span>
                </div>
              </div>

              {/* Boost Feature Toggle */}
              <div className="p-5 border border-zinc-150 rounded-2xl bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-purple-50 rounded-xl text-purple-700 mt-0.5">
                    <Sparkles className="h-5 w-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-xs text-teal-950 flex items-center gap-1.5">
                      <span>Nova Engine Direct Broker Boost</span>
                      <span className="text-[7px] font-mono font-bold bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded-full uppercase tracking-widest">PRO ADVANTAGE</span>
                    </h4>
                    <p className="text-[10px] text-zinc-400 font-medium leading-normal mt-1 max-w-md">
                      Amplify your listing visibility by 350%. Exposes your Lucid specifications to priority international sovereign buyers in Nigeria and West Africa instantly.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => { AutoNovaAudio.playClick(); setIsBoosted(!isBoosted); }}
                  className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-all flex items-center ${
                    isBoosted ? 'bg-purple-700 justify-end' : 'bg-zinc-200 justify-start'
                  }`}
                >
                  <motion.div layout className="w-6 h-6 rounded-full bg-white shadow" />
                </button>
              </div>

              {/* Escrow Contract Terms Check */}
              <label className="flex items-start gap-3 p-4 bg-teal-50/50 border border-teal-100 rounded-2xl cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={escrowTermAccepted}
                  onChange={() => { AutoNovaAudio.playClick(); setEscrowTermAccepted(!escrowTermAccepted); }}
                  className="rounded border-zinc-300 text-teal-700 focus:ring-teal-700 h-4 w-4 cursor-pointer mt-0.5 shrink-0"
                />
                <span className="text-[10px] text-teal-950 font-medium leading-normal">
                  I explicitly authorize AutoNova Kinetic Intel to act as my legal escrow coordinator. Payouts are bound strictly to CBR verification nodes and physical custody verification checks at approved regional terminals.
                </span>
              </label>

              {/* Navigation Action Row */}
              <div className="pt-6 border-t border-zinc-100 flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-3.5 border border-zinc-200 hover:bg-zinc-50 text-zinc-600 rounded-full font-mono text-[10px] tracking-widest font-extrabold uppercase transition-all cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-mono text-[10px] tracking-widest font-extrabold uppercase rounded-full shadow transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Continue Step 4</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: SUMMARY & REVIEW */}
          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-3xl border border-zinc-200/60 p-6 md:p-8 space-y-6 shadow-sm"
            >
              <div className="pb-4 border-b border-zinc-100">
                <span className="font-mono text-[8px] tracking-widest text-purple-700 font-extrabold uppercase">STEP 04 OF 04</span>
                <h2 className="font-display text-lg font-extrabold text-teal-950 mt-1">Review & Publish Ledger Contract</h2>
                <p className="text-xs text-zinc-500 font-medium">Verify your vehicle details and pricing coordinates before deployment to our live catalog.</p>
              </div>

              {/* Summary Dossier Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-zinc-100 pb-6">
                
                {/* Photo summary */}
                <div className="md:col-span-5 relative aspect-video md:aspect-auto rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100 shadow-xs">
                  <img
                    src={photos[0]?.url}
                    alt="Vehicle preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-teal-700 text-white px-2.5 py-1 rounded-full text-[8px] font-mono uppercase tracking-wider">
                    {photos.length} DOSSIER PHOTO(S)
                  </div>
                </div>

                {/* Specs list summary */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-teal-700 font-extrabold uppercase block">{bodyType} • {fuelType}</span>
                    <h3 className="font-display text-lg font-black text-teal-950 leading-tight mt-0.5">{make} {model}</h3>
                    <p className="font-mono text-[10px] font-bold text-zinc-400 uppercase mt-0.5">{trim} • {color}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                    <div>
                      <span className="font-mono text-[8px] text-zinc-400 block tracking-widest uppercase">YEAR</span>
                      <span className="font-semibold text-zinc-800">{year}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[8px] text-zinc-400 block tracking-widest uppercase">MILEAGE</span>
                      <span className="font-semibold text-zinc-800">{parseInt(mileage).toLocaleString()} km</span>
                    </div>
                    <div>
                      <span className="font-mono text-[8px] text-zinc-400 block tracking-widest uppercase">CONDITION</span>
                      <span className="font-semibold text-teal-850 font-bold bg-teal-100/40 px-2 py-0.5 rounded-full inline-block mt-0.5">{condition}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[8px] text-zinc-400 block tracking-widest uppercase">INTENDED PRICE</span>
                      <span className="font-display font-black text-teal-950">${listingPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Alert */}
              <div className="bg-amber-50 border border-amber-200/60 p-4 rounded-2xl flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-[10px] text-amber-950 font-semibold leading-normal">
                  Our neural regression systems will finalize indexing after consignment. If we register multiple high-intent purchase offers matching your optimal value, you will be alerted via secure SMS.
                </div>
              </div>

              {/* Navigation Action Row */}
              <div className="pt-6 border-t border-zinc-100 flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-3.5 border border-zinc-200 hover:bg-zinc-50 text-zinc-600 rounded-full font-mono text-[10px] tracking-widest font-extrabold uppercase transition-all cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handlePublishListing}
                  className="px-8 py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-mono text-[10px] tracking-widest font-extrabold uppercase rounded-full shadow transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="h-4 w-4" />
                  <span>Publish Sovereign Listing</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: SUCCESS PORTAL */}
          {currentStep === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl border border-zinc-200/60 p-8 md:p-12 text-center space-y-6 shadow-xl max-w-xl mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 mx-auto animate-bounce">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <div className="space-y-1.5">
                <span className="font-mono text-[8px] text-zinc-400 block uppercase tracking-widest font-bold">LEDGER REGISTRATION COMPLETE</span>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold text-teal-950 tracking-tight">Listing Deployed!</h2>
                <p className="text-xs text-zinc-500 font-medium leading-relaxed max-w-sm mx-auto">
                  Your {year} {make} {model} has been securely synchronized across West African nodes.
                </p>
              </div>

              {/* Recap Box */}
              <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-2xl text-xs font-semibold text-zinc-600 flex justify-between max-w-sm mx-auto">
                <span className="font-mono text-[8px] text-zinc-400 uppercase font-bold">REGISTRY NODE:</span>
                <span className="font-mono text-[10px] text-teal-950">AN-NG-{Math.floor(Math.random() * 900000 + 100000)}</span>
              </div>

              <div className="flex gap-3 pt-4 max-w-sm mx-auto">
                <button
                  type="button"
                  onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('seller-dashboard'); }}
                  className="flex-grow py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-mono text-[9px] tracking-widest uppercase font-extrabold rounded-xl shadow cursor-pointer transition-colors"
                >
                  Seller Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('dashboard'); }}
                  className="flex-grow py-3.5 border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-mono text-[9px] tracking-widest uppercase font-bold rounded-xl cursor-pointer transition-colors"
                >
                  Return Showroom
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};
