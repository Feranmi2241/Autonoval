import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AutoNovaAudio } from './AudioEngine';
import { 
  Search, Bell, User, Bookmark, ShoppingBag, Calendar, List, 
  MapPin, Clock, ArrowLeft, Plus, ChevronLeft, ChevronRight, 
  Check, X, AlertTriangle, MessageSquare, Star, Trash2, Heart,
  Settings, LogOut, Sparkles, Sliders, Play
} from 'lucide-react';

export const TestDrivesView = ({
  userName = "Alexander Vance",
  role = "Client",
  onNavigateToView,
  onBackToGate,
  showNotification,
  bookingCarId,
  testDrives: testDrivesProp,
  setTestDrives: setTestDrivesProp,
  logActivity,
}) => {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 10, 1)); // November 2024

  // --- Booking flow state (only relevant when bookingCarId is provided) ---
  const [bookingStep, setBookingStep] = useState(bookingCarId ? 'form' : null); // null | 'form' | 'success'
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [locationMode, setLocationMode] = useState('dealer'); // 'dealer' | 'bring-to-me'
  const [bookingAddress, setBookingAddress] = useState('');
  const [bookingContact, setBookingContact] = useState({ name: userName || '', phone: '', email: '' });
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const bookingCarSummary = {
    id: bookingCarId,
    name: bookingCarId ? bookingCarId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOQHi_PEd5ZPsfve2gHNtc9RspSyvOXqwqs6xNqGTWDwpEwEim2bu4gGWdmC4VdWAmTvCa--Ue5HLlHyLmXoYbUdEsDVdt65Ud_ieAeLMGOfujnFDPns5-vOEg4qKlTnwqIjqF5ev3fecEJhFWxI6VCXY2F2iGL5RoszzPyEMkvTvEch3_TgeV6OO-66z072RemQnTsKHau59vkG3NLAr9svqCFZKM9WgSuj67cgw-LiGqIA1cjRS3eV2cx9id8468XFNGHdr-mw1a',
  };

  const next14Days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  });
  const timeSlots = ['9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM'];
  const bookedSlots = ['12:00 PM']; // simple mock of an unavailable slot

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      showNotification("Please select a date and time.", "error");
      return;
    }
    if (locationMode === 'bring-to-me' && !bookingAddress.trim()) {
      showNotification("Please enter an address.", "error");
      return;
    }
    AutoNovaAudio.playSuccess();
    const newBooking = {
      id: `TD-${Math.floor(1000 + Math.random() * 9000)}`,
      carName: bookingCarSummary.name,
      trim: 'Standard Trim',
      center: locationMode === 'dealer' ? 'AutoNova Showroom' : bookingAddress,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      status: 'Confirmed',
      image: bookingCarSummary.image,
    };
    setTestDrives(prev => [newBooking, ...prev]);
    if (logActivity) logActivity('test-drive', `Booked a test drive for ${bookingCarSummary.name}`, 'Calendar');
    setConfirmedBooking(newBooking);
    setBookingStep('success');
    showNotification("Test drive booked!", "success");
  };

  // State for upcoming test drives — falls back to local state only if no global
  // props are passed (previously this was always local, meaning a booking made on
  // /test-drive/:carId never showed up on /dashboard/test-drives since each route
  // mounted a separate, disconnected copy of this component).
  const [localTestDrives, setLocalTestDrives] = useState([
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
  const testDrives = testDrivesProp !== undefined ? testDrivesProp : localTestDrives;
  const setTestDrives = setTestDrivesProp || setLocalTestDrives;

  // Past experiences list
  const [pastDrives, setPastDrives] = useState([
    {
      id: 'TD-1092',
      carName: 'Ferrari Roma',
      date: 'Oct 12, 2024',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ8wwU33oBHkvaqacp5MS9cfFKRfGWHaCINiXf8tfDeiwPaw5rc7yPhlfcd-f9QSBtfHNtOonyWaU_Rcqj25yn87g6tTdH9E1ki3dIVjMEeL_ps99mlAKLocVngpnSyMgSvnL5evOlLVDPikxFfg0BWKQPimxVS_XN9GxJqXuY_zDipZA7bPlWc5tsNIGxReguq-7z9mLWbJyqF9JkLAr3T6or38nHMD7gkEeaSTUiG06VvMGUen8EIi5xFOkWqZFannEeS4j9O_D9'
    },
    {
      id: 'TD-0941',
      carName: 'Audi RS e-tron GT',
      date: 'Sep 28, 2024',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVUnCNKEZ7iWvgltVBTsrioYdug9e0x0yW6GfIA05wHUzubELke8EO0C0mY0kmrVDBKrGYLbWTz2p43Pkel5D6-I9YS8ByMoQfOzyIN8QCe4j7FJwaF6KmPNBhxmnizq_74YIFo12jLdlyZwSE0L1tpQr4Q_Gp8lPoa_zI1Xhd7dloy63IBr5k3Ft43Wte5lIm-15g0pXubp7UbSQlQBO5wZK7zEOd2DuRY6Ysq55CqLsB4kO96VBpFk5KPR0UPnTZzCpMCVVY-3_m'
    },
    {
      id: 'TD-0182',
      carName: 'Rivian R1S',
      date: 'Aug 15, 2024',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCN5DmQw_K_DdW2cLLOkGvD7CF-Ci0MjOt-8ppKB2j-zMZrTbfRCpAp6Y5W6sKG4BhFBN6vLgfskGq9QA9E35uTlYLRODcqd6yiY9wydeJc8etvHCrnMptqrQTbFjeeCEK-s-n1t8XFhvYJxwyh9BO4cukGe9tCc6HrIRsANlvyZte0-7Lpu2Ff3hMdvDssdI4EvrH1Ohsrm-GefZ2BW7nmX_1RKbedk_Zq37ubFpUuYS8l4vHjNxqk0hRVYh8JYaSOTIqQmIj3zXW'
    }
  ]);

  // Schedule Drive modal
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    carName: 'Porsche Taycan Turbo S',
    center: 'Beverly Hills Center',
    date: '2024-11-30',
    time: '11:00 AM'
  });

  // Reschedule state
  const [rescheduleDrive, setRescheduleDrive] = useState(null);
  const [rescheduleForm, setRescheduleForm] = useState({
    date: '',
    time: ''
  });

  const handleOpenSchedule = () => {
    AutoNovaAudio.playClick();
    setScheduleForm({
      carName: 'Porsche Taycan Turbo S',
      center: 'Beverly Hills Center',
      date: '2024-11-30',
      time: '11:00 AM'
    });
    setShowScheduleModal(true);
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    AutoNovaAudio.playSuccess();
    
    const newDrive = {
      id: `TD-${Math.floor(1000 + Math.random() * 9000)}`,
      carName: scheduleForm.carName,
      trim: 'Exclusive Curation',
      center: scheduleForm.center,
      date: scheduleForm.date,
      time: scheduleForm.time,
      status: 'Confirmed',
      image: scheduleForm.carName === 'Lucid Air Sapphire'
        ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOQHi_PEd5ZPsfve2gHNtc9RspSyvOXqwqs6xNqGTWDwpEwEim2bu4gGWdmC4VdWAmTvCa--Ue5HLlHyLmXoYbUdEsDVdt65Ud_ieAeLMGOfujnFDPns5-vOEg4qKlTnwqIjqF5ev3fecEJhFWxI6VCXY2F2iGL5RoszzPyEMkvTvEch3_TgeV6OO-66z072RemQnTsKHau59vkG3NLAr9svqCFZKM9WgSuj67cgw-LiGqIA1cjRS3eV2cx9id8468XFNGHdr-mw1a'
        : 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGOmQgwxQIbZi9RsFzFXYczbZcvkCPv18n2ymEcdpqGoMQqvp4Vk-00FuSTyvu27cxMZyWDYjKKbcMkHvtGidGgcQ6bxLmrvr52cDM2tRGFTLFtbesSybyXJIMDhE2iTDeIyS25dGw6DapRPsmLlIvqdYoQ2J2RyN6nVfUGG9FbhR1pPIAcdNNJW8fNOsNR7e3ejMm7pqkPQhUTCP2hVlxiqGI8FOH3VbBfWrfNJZhvZWL1pe0W8Go9nctfqE2-9Iy08xMSodZO7Hq',
      type: 'Confirmed'
    };

    setTestDrives(prev => [...prev, newDrive]);
    setShowScheduleModal(false);
    showNotification(`Test drive successfully scheduled for the ${scheduleForm.carName}!`, 'success');
  };

  const handleCancelDrive = (driveId, carName) => {
    AutoNovaAudio.playClick();
    if (confirm(`Are you sure you want to cancel your test drive for the ${carName}?`)) {
      setTestDrives(prev => prev.filter(d => d.id !== driveId));
      showNotification(`Test drive for the ${carName} has been cancelled.`, 'success');
    }
  };

  const handleOpenReschedule = (drive) => {
    AutoNovaAudio.playClick();
    setRescheduleDrive(drive);
    setRescheduleForm({
      date: drive.date,
      time: drive.time
    });
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    AutoNovaAudio.playSuccess();
    setTestDrives(prev => prev.map(d => {
      if (d.id === rescheduleDrive.id) {
        return {
          ...d,
          date: rescheduleForm.date,
          time: rescheduleForm.time
        };
      }
      return d;
    }));
    setRescheduleDrive(null);
    showNotification(`Rescheduled test drive successfully!`, 'success');
  };

  const handleBuyThisCar = (carName) => {
    AutoNovaAudio.playClick();
    showNotification(`Added ${carName} to checkout pipeline! Proceeding to configuration.`, 'success');
    onNavigateToView('dashboard');
  };

  const handleBookAgain = (carName) => {
    AutoNovaAudio.playClick();
    setScheduleForm({
      carName: carName,
      center: 'Beverly Hills Center',
      date: '2024-12-10',
      time: '12:00 PM'
    });
    setShowScheduleModal(true);
  };

  // Render Calendar calculations
  const renderCalendarDays = () => {
    const daysInMonth = 30; // November has 30 days
    const startingDayOfWeek = 4; // November 1, 2024 was a Friday (using 1-indexed days Mon-Sun: Mon=0, Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6)
    
    const dayElements = [];

    // Empty spaces for previous month's trailing days
    for (let i = 28; i <= 31; i++) {
      dayElements.push(
        <div key={`empty-${i}`} className="bg-zinc-50/50 h-32 p-4 text-zinc-350 opacity-40 border border-zinc-100 flex flex-col justify-between">
          <span className="font-mono text-[9px] font-bold">{i}</span>
        </div>
      );
    }

    // Days of the actual month (November)
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `2024-11-${day.toString().padStart(2, '0')}`;
      
      // Match drive for this specific day
      const matchedDrive = testDrives.find(d => d.date === dateString);
      // Also match past drives if any
      const matchedPastDrive = day === 12 ? { carName: 'Ferrari Roma' } : null;

      dayElements.push(
        <div 
          key={`day-${day}`} 
          className={`bg-white h-32 p-4 border border-zinc-100 flex flex-col justify-between transition-all group hover:bg-zinc-50 ${
            matchedDrive ? 'ring-2 ring-inset ring-teal-700/20 bg-teal-50/10' : ''
          }`}
        >
          <span className={`font-mono text-xs font-black ${
            matchedDrive ? 'text-teal-800' : 'text-zinc-600'
          }`}>{day}</span>

          {matchedDrive && (
            <div className="mt-1 flex items-center gap-1.5 p-1 bg-teal-50 border border-teal-100 rounded-lg text-[9px] font-extrabold text-teal-950 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
              <div className="truncate flex-1">
                <span className="block text-[8px] uppercase tracking-wider font-bold truncate">{matchedDrive.carName}</span>
                <span className="block text-[7px] text-zinc-400 font-medium font-mono">{matchedDrive.time}</span>
              </div>
            </div>
          )}

          {matchedPastDrive && (
            <div className="mt-1 flex items-center gap-1.5 p-1 bg-purple-50 border border-purple-100 rounded-lg text-[9px] font-extrabold text-purple-950">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
              <div className="truncate flex-1">
                <span className="block text-[8px] uppercase tracking-wider font-bold truncate">{matchedPastDrive.carName}</span>
                <span className="block text-[7px] text-zinc-400 font-medium font-mono">Past Drive</span>
              </div>
            </div>
          )}
        </div>
      );
    }

    return dayElements;
  };

  // --- BOOKING FLOW: /test-drive/:carId — this genuinely didn't exist before;
  // bookingCarId was accepted by the route wrapper but silently ignored, so this
  // page always showed the "My Test Drives" management list regardless of the URL. ---
  if (bookingStep === 'success' && confirmedBooking) {
    return (
      <div className="flex-grow bg-[#fdf8f8] min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl border border-zinc-200/60 shadow-xl p-8 text-center space-y-5"
        >
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 flex items-center justify-center">
            <Check className="h-7 w-7 text-emerald-600" />
          </div>
          <div>
            <h2 className="font-display text-xl font-black text-teal-950">Test Drive Booked!</h2>
            <p className="text-xs text-zinc-500 font-medium mt-1">You're all set — we'll send a reminder before your appointment.</p>
          </div>
          <div className="bg-zinc-50 rounded-2xl p-4 text-left space-y-2 border border-zinc-100">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400 font-mono uppercase tracking-wider text-[9px] font-bold">Vehicle</span>
              <span className="font-bold text-teal-950">{confirmedBooking.carName}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400 font-mono uppercase tracking-wider text-[9px] font-bold">Date</span>
              <span className="font-bold text-teal-950">{confirmedBooking.date}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400 font-mono uppercase tracking-wider text-[9px] font-bold">Time</span>
              <span className="font-bold text-teal-950">{confirmedBooking.time}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400 font-mono uppercase tracking-wider text-[9px] font-bold">Location</span>
              <span className="font-bold text-teal-950 text-right">{confirmedBooking.center}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => {
                AutoNovaAudio.playClick();
                const start = `${confirmedBooking.date.replace(/-/g, '')}T100000`;
                const end = `${confirmedBooking.date.replace(/-/g, '')}T110000`;
                const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Test Drive: ' + confirmedBooking.carName)}&dates=${start}/${end}&location=${encodeURIComponent(confirmedBooking.center)}`;
                window.open(url, '_blank');
              }}
              className="w-full py-3 bg-teal-950 hover:bg-teal-900 text-white font-mono text-[10px] font-extrabold uppercase tracking-widest rounded-xl cursor-pointer transition-all inline-flex items-center justify-center gap-2"
            >
              <Calendar className="h-3.5 w-3.5" />
              Add to Calendar
            </button>
            <button
              onClick={() => { AutoNovaAudio.playClick(); if (onNavigateToView) onNavigateToView('test-drives'); }}
              className="w-full py-3 border border-zinc-200 hover:border-teal-700 text-teal-950 font-mono text-[10px] font-extrabold uppercase tracking-widest rounded-xl cursor-pointer transition-all"
            >
              View My Test Drives
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (bookingStep === 'form') {
    return (
      <div className="flex-grow bg-[#fdf8f8] min-h-[calc(100vh-80px)] pb-16">
        <div className="max-w-2xl mx-auto px-4 pt-10 space-y-6">
          {/* Car summary */}
          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-zinc-200/60 shadow-sm">
            <img src={bookingCarSummary.image} alt={bookingCarSummary.name} referrerPolicy="no-referrer" className="w-16 h-12 rounded-lg object-cover" />
            <div>
              <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-widest font-bold block">Booking a test drive for</span>
              <h2 className="font-display font-black text-teal-950">{bookingCarSummary.name}</h2>
            </div>
          </div>

          {/* Date picker */}
          <div className="bg-white p-5 rounded-2xl border border-zinc-200/60 shadow-sm">
            <h3 className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Choose a Date</h3>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {next14Days.map((d, i) => {
                const isSelected = selectedDate && d.toDateString() === selectedDate.toDateString();
                return (
                  <button
                    key={i}
                    onClick={() => { AutoNovaAudio.playClick(); setSelectedDate(d); }}
                    className={`p-2.5 rounded-xl text-center transition-all cursor-pointer border ${
                      isSelected ? 'bg-teal-950 border-teal-950 text-white' : 'bg-zinc-50 border-zinc-150 text-zinc-600 hover:border-teal-700'
                    }`}
                  >
                    <span className="block text-[8px] font-mono font-bold uppercase opacity-70">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                    <span className="block text-sm font-black">{d.getDate()}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time slots */}
          <div className="bg-white p-5 rounded-2xl border border-zinc-200/60 shadow-sm">
            <h3 className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Choose a Time</h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => {
                const isBooked = bookedSlots.includes(slot);
                const isSelected = selectedTime === slot;
                return (
                  <button
                    key={slot}
                    disabled={isBooked}
                    onClick={() => { AutoNovaAudio.playClick(); setSelectedTime(slot); }}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      isBooked ? 'bg-zinc-100 border-zinc-100 text-zinc-300 cursor-not-allowed line-through' :
                      isSelected ? 'bg-teal-950 border-teal-950 text-white cursor-pointer' :
                      'bg-zinc-50 border-zinc-150 text-zinc-600 hover:border-teal-700 cursor-pointer'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location toggle */}
          <div className="bg-white p-5 rounded-2xl border border-zinc-200/60 shadow-sm space-y-3">
            <h3 className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Location</h3>
            <div className="flex gap-2">
              {[
                { id: 'dealer', label: 'Visit Dealer' },
                { id: 'bring-to-me', label: 'Bring It To Me' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => { AutoNovaAudio.playClick(); setLocationMode(opt.id); }}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    locationMode === opt.id ? 'bg-teal-950 border-teal-950 text-white' : 'bg-zinc-50 border-zinc-150 text-zinc-600 hover:border-teal-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {locationMode === 'dealer' ? (
              <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium bg-zinc-50 p-3 rounded-xl">
                <MapPin className="h-3.5 w-3.5 text-teal-700 shrink-0" />
                AutoNova Showroom — 8500 Sunset Blvd, Beverly Hills, CA
              </div>
            ) : (
              <input
                type="text"
                value={bookingAddress}
                onChange={(e) => setBookingAddress(e.target.value)}
                placeholder="Enter your address"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
              />
            )}
          </div>

          {/* Contact confirmation */}
          <div className="bg-white p-5 rounded-2xl border border-zinc-200/60 shadow-sm space-y-3">
            <h3 className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Your Details</h3>
            <input
              type="text"
              value={bookingContact.name}
              onChange={(e) => setBookingContact({ ...bookingContact, name: e.target.value })}
              placeholder="Full Name"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
            />
            <input
              type="tel"
              value={bookingContact.phone}
              onChange={(e) => setBookingContact({ ...bookingContact, phone: e.target.value })}
              placeholder="Phone Number"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
            />
            <input
              type="email"
              value={bookingContact.email}
              onChange={(e) => setBookingContact({ ...bookingContact, email: e.target.value })}
              placeholder="Email Address"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-700"
            />
          </div>

          <button
            onClick={handleConfirmBooking}
            className="w-full py-4 bg-teal-950 hover:bg-teal-900 text-white font-mono text-[10px] font-extrabold uppercase tracking-widest rounded-xl cursor-pointer transition-all shadow-md"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col lg:flex-row relative bg-zinc-50">
      
      {/* SIDEBAR */}
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
            onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('alerts'); }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <Search className="h-4 w-4" />
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
            onClick={() => { AutoNovaAudio.playClick(); }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-teal-50/80 text-teal-950 border-r-4 border-teal-800 font-bold transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4" />
              <span>Test Drives</span>
            </div>
            <span className="font-mono text-[9px] bg-teal-800 text-white px-1.5 py-0.5 rounded-md">
              {testDrives.length}
            </span>
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
            onClick={() => { AutoNovaAudio.playClick(); onNavigateToView('settings'); }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 transition-all cursor-pointer text-left"
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

      {/* MAIN MAIN AREA */}
      <main className="flex-1 px-4 py-10 md:px-12 max-w-5xl mx-auto w-full">
        
        {/* Breadcrumb & Title */}
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div 
              className="flex items-center gap-3 mb-2 text-zinc-400 hover:text-teal-800 cursor-pointer transition-colors"
              onClick={() => onNavigateToView('portfolio')}
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-mono text-[9px] font-black uppercase tracking-widest">Back to Member Hub</span>
            </div>
            <h1 className="font-display font-black text-2xl md:text-3xl lg:text-4xl text-teal-950 tracking-tight">
              My Test Drives
            </h1>
            <p className="text-xs md:text-sm text-zinc-500 mt-1 font-medium leading-relaxed">
              Manage your upcoming and past high-performance precision driving experiences.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenSchedule}
              className="px-5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white rounded-xl font-mono text-[9px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-sm active:scale-98"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Schedule Drive</span>
            </button>
          </div>
        </header>

        {/* View switching Tabs row */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-200/50">
          <div className="inline-flex p-1 bg-zinc-100 rounded-xl">
            <button
              onClick={() => { AutoNovaAudio.playClick(); setViewMode('list'); }}
              className={`flex items-center gap-2 px-5 py-1.5 rounded-lg font-mono text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-teal-950 shadow-sm border border-zinc-200/30'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <List className="h-3.5 w-3.5" />
              <span>List View</span>
            </button>
            <button
              onClick={() => { AutoNovaAudio.playClick(); setViewMode('calendar'); }}
              className={`flex items-center gap-2 px-5 py-1.5 rounded-lg font-mono text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'calendar'
                  ? 'bg-white text-teal-950 shadow-sm border border-zinc-200/30'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Calendar View</span>
            </button>
          </div>

          <button
            onClick={() => { AutoNovaAudio.playClick(); setRemindersEnabled(prev => !prev); showNotification(remindersEnabled ? "Reminders turned off." : "We'll remind you before each test drive.", "info"); }}
            className="hidden md:flex items-center gap-2 cursor-pointer"
          >
            <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Remind me before test drives</span>
            <span className={`relative w-9 h-5 rounded-full transition-colors ${remindersEnabled ? 'bg-teal-800' : 'bg-zinc-200'}`}>
              <span className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-all shadow-sm ${remindersEnabled ? 'translate-x-4' : ''}`} />
            </span>
          </button>

          <div className="hidden md:flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-800 px-3 py-1.5 rounded-xl">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span className="font-mono text-[8px] font-bold uppercase tracking-wider">
              2 Active bookings synchronized on Ledger
            </span>
          </div>
        </div>

        {/* LIST VIEW */}
        {viewMode === 'list' && (
          <div className="space-y-12">
            
            {/* UPCOMING SECTION */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 bg-teal-700 rounded-full" />
                <h2 className="font-display font-black text-sm text-teal-950 uppercase tracking-wider">
                  Upcoming Bookings
                </h2>
              </div>

              {testDrives.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {testDrives.map((drive) => (
                    <motion.div
                      key={drive.id}
                      layoutId={`drive-card-${drive.id}`}
                      className="bg-white rounded-3xl border border-zinc-200/60 overflow-hidden group hover:border-zinc-350 hover:shadow-md transition-all flex flex-col"
                    >
                      <div className="relative h-44 bg-zinc-50 overflow-hidden border-b border-zinc-100">
                        <img 
                          src={drive.image} 
                          alt={drive.carName} 
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 right-4 bg-teal-950 text-white px-2.5 py-0.5 rounded-full text-[8px] font-mono font-bold uppercase tracking-widest border border-teal-800/20">
                          {drive.status}
                        </div>
                      </div>

                      <div className="p-5 flex-grow flex flex-col justify-between">
                        <div className="mb-4">
                          <h3 className="font-display font-black text-sm text-teal-950 mb-1">
                            {drive.carName}
                          </h3>
                          <p className="font-mono text-[8.5px] font-semibold text-zinc-400 uppercase tracking-widest">
                            {drive.trim}
                          </p>
                          
                          <div className="mt-4 space-y-1.5 text-xs text-zinc-500 font-medium">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3.5 w-3.5 text-teal-700" />
                              <span>{drive.center}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3.5 w-3.5 text-teal-700" />
                              <span className="font-semibold text-zinc-700">
                                {new Date(drive.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-3.5 w-3.5 text-teal-700" />
                              <span>{drive.time}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2.5 pt-4 border-t border-zinc-100">
                          <button
                            onClick={() => handleOpenReschedule(drive)}
                            className="flex-1 py-2 border border-zinc-200 text-zinc-600 hover:text-zinc-800 hover:bg-zinc-50 font-mono text-[9px] font-black uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                          >
                            Reschedule
                          </button>
                          <button
                            onClick={() => handleCancelDrive(drive.id, drive.carName)}
                            className="flex-1 py-2 text-red-700 hover:bg-red-50 font-mono text-[9px] font-black uppercase tracking-wider rounded-xl transition-colors cursor-pointer border border-transparent hover:border-red-100"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-10 text-center rounded-3xl border border-zinc-200/50">
                  <p className="text-zinc-400 text-xs font-semibold">No active bookings scheduled.</p>
                  <button
                    onClick={handleOpenSchedule}
                    className="mt-4 px-6 py-2 bg-teal-800 text-white font-mono text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-teal-900 transition-colors cursor-pointer"
                  >
                    Schedule Now
                  </button>
                </div>
              )}
            </div>

            {/* PAST EXPERIENCES */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 bg-zinc-300 rounded-full" />
                <h2 className="font-display font-black text-sm text-teal-950 uppercase tracking-wider">
                  Past Experiences
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pastDrives.map((drive) => (
                  <div
                    key={drive.id}
                    className="bg-white rounded-3xl border border-zinc-200/40 overflow-hidden flex flex-col group"
                  >
                    <div className="h-32 bg-zinc-50 overflow-hidden">
                      <img 
                        src={drive.image} 
                        alt={drive.carName} 
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className="font-display font-black text-xs text-teal-950 uppercase tracking-wide">
                          {drive.carName}
                        </h4>
                        <p className="font-mono text-[8px] text-zinc-400 uppercase tracking-widest mt-1">
                          Driven {drive.date}
                        </p>
                      </div>

                      <div className="flex gap-2 mt-4 pt-3 border-t border-zinc-100">
                        <button
                          onClick={() => handleBuyThisCar(drive.carName)}
                          className="flex-1 py-1.5 bg-teal-800 hover:bg-teal-900 text-white font-mono text-[8px] font-black uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                        >
                          Buy This Car
                        </button>
                        <button
                          onClick={() => handleBookAgain(drive.carName)}
                          className="px-2.5 py-1.5 border border-zinc-200 text-zinc-600 hover:bg-zinc-50 font-mono text-[8px] font-black uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                        >
                          Book Again
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* CALENDAR VIEW */}
        {viewMode === 'calendar' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl border border-zinc-200/60 p-6 md:p-8 shadow-sm overflow-hidden"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display font-black text-sm text-teal-950 uppercase tracking-wider">
                November 2024
              </h3>
              <div className="flex gap-1.5">
                <button className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-400 transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-400 transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-zinc-200/50 rounded-2xl overflow-hidden border border-zinc-200/40">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="bg-zinc-50 p-3 text-center font-mono text-[8px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-150">
                  {day}
                </div>
              ))}
              {renderCalendarDays()}
            </div>
          </motion.div>
        )}

      </main>

      {/* SCHEDULE DRIVE MODAL */}
      <AnimatePresence>
        {showScheduleModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[180] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl border border-zinc-200 shadow-2xl p-6 md:p-8 w-full max-w-lg text-zinc-900"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-display font-black text-base text-teal-950 uppercase tracking-wide">
                    Schedule Test Drive
                  </h3>
                  <p className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
                    Book an executive trial on our private circuit
                  </p>
                </div>
                <button 
                  onClick={() => { AutoNovaAudio.playClick(); setShowScheduleModal(false); }}
                  className="p-1 rounded-lg hover:bg-zinc-100 text-zinc-400 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleScheduleSubmit} className="space-y-4">
                <div>
                  <label className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
                    SELECT VEHICLE
                  </label>
                  <select
                    value={scheduleForm.carName}
                    onChange={(e) => setScheduleForm(prev => ({ ...prev, carName: e.target.value }))}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:ring-1 focus:ring-teal-700"
                  >
                    <option value="Porsche Taycan Turbo S">Porsche Taycan Turbo S</option>
                    <option value="Lucid Air Sapphire">Lucid Air Sapphire</option>
                    <option value="Ferrari Roma">Ferrari Roma</option>
                    <option value="Audi e-tron GT">Audi e-tron GT</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
                    LOCATIONS
                  </label>
                  <select
                    value={scheduleForm.center}
                    onChange={(e) => setScheduleForm(prev => ({ ...prev, center: e.target.value }))}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:ring-1 focus:ring-teal-700"
                  >
                    <option value="Beverly Hills Center">Beverly Hills Center (LA)</option>
                    <option value="Nova Elite Private Track">Nova Elite Private Track</option>
                    <option value="Lekki Luxury Center">Lekki Luxury Center (Lagos)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
                      DATE
                    </label>
                    <input
                      type="date"
                      required
                      value={scheduleForm.date}
                      onChange={(e) => setScheduleForm(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:ring-1 focus:ring-teal-700"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
                      TIME SLOT
                    </label>
                    <select
                      value={scheduleForm.time}
                      onChange={(e) => setScheduleForm(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:ring-1 focus:ring-teal-700"
                    >
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="02:30 PM">02:30 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => { AutoNovaAudio.playClick(); setShowScheduleModal(false); }}
                    className="flex-1 py-3 border border-zinc-200 text-zinc-500 hover:text-zinc-800 rounded-xl font-mono text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-teal-800 hover:bg-teal-900 text-white rounded-xl font-mono text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-md active:scale-98"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RESCHEDULE MODAL */}
      <AnimatePresence>
        {rescheduleDrive && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[180] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl border border-zinc-200 shadow-2xl p-6 md:p-8 w-full max-w-sm text-zinc-900"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-display font-black text-sm text-teal-950 uppercase tracking-wide">
                    Reschedule Appointment
                  </h3>
                  <p className="font-mono text-[7.5px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
                    Select a new slot for {rescheduleDrive.carName}
                  </p>
                </div>
                <button 
                  onClick={() => { AutoNovaAudio.playClick(); setRescheduleDrive(null); }}
                  className="p-1 rounded-lg hover:bg-zinc-100 text-zinc-400 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleRescheduleSubmit} className="space-y-4">
                <div>
                  <label className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
                    NEW DATE
                  </label>
                  <input
                    type="date"
                    required
                    value={rescheduleForm.date}
                    onChange={(e) => setRescheduleForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:ring-1 focus:ring-teal-700"
                  />
                </div>

                <div>
                  <label className="font-mono text-[8px] font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
                    NEW TIME
                  </label>
                  <select
                    value={rescheduleForm.time}
                    onChange={(e) => setRescheduleForm(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:ring-1 focus:ring-teal-700"
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => { AutoNovaAudio.playClick(); setRescheduleDrive(null); }}
                    className="flex-1 py-2.5 border border-zinc-200 text-zinc-500 hover:text-zinc-800 rounded-xl font-mono text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-teal-800 hover:bg-teal-900 text-white rounded-xl font-mono text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-md"
                  >
                    Update
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
