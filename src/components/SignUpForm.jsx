import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { firebaseSignUp, firebaseSignIn, firebaseForgotPassword } from '../firebase';

// Simultaneous letter-by-letter reveal — all chars animate at page load, same speed, no letter faster than another
const RevealText = ({ text, className = '', charDelay = 0.04 }) => (
  <span className={className} aria-label={text}>
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: i * charDelay, ease: 'easeOut' }}
        style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </span>
);
import { AutoNovaAudio } from './AudioEngine';
import { 
  User, Mail, Phone, Lock, Eye, EyeOff, ShieldAlert, ArrowRight, ArrowLeft,
  Fingerprint, ShieldCheck, CheckCircle2, Smartphone, Cpu, Send
} from 'lucide-react';

export const SignUpForm = ({ mode = 'signup', onSuccess, onAuthenticationSuccess, showNotification, onModeChange }) => {
  const initialIsSignUp = mode !== 'signin';
  const initialIsForgotPassword = mode === 'forgot-password' || mode === 'reset-password';
  const initialIsResettingPasswordForm = mode === 'reset-password';
  const initialIsOtpVerification = mode === 'verify-otp';

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hasResetToken = !!searchParams.get('token');
  const [isSignUp, setIsSignUp] = useState(initialIsSignUp);
  const [rememberMe, setRememberMe] = useState(false);
  const [otpShake, setOtpShake] = useState(false);
  const [resetTokenExpired] = useState(mode === 'reset-password' && !hasResetToken); // true when no/invalid token is present in the URL
  const [role, setRole] = useState('Buyer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyText, setVerifyText] = useState('Verifying your details...');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Password reset states
  const [isForgotPassword, setIsForgotPassword] = useState(initialIsForgotPassword);
  const [resetEmailOrPhone, setResetEmailOrPhone] = useState('');
  const [isResetVerifying, setIsResetVerifying] = useState(false);
  const [resetVerifyText, setResetVerifyText] = useState('SEARCHING SATELLITE SUBSCRIBER REGISTRY...');
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const [isResettingPasswordForm, setIsResettingPasswordForm] = useState(initialIsResettingPasswordForm);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  // OTP States
  const [isOtpVerification, setIsOtpVerification] = useState(initialIsOtpVerification);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(29);
  const [canResend, setCanResend] = useState(false);
  const otpRefs = useRef([]);

  // Timer Effect for OTP Verification
  useEffect(() => {
    let interval;
    if (isOtpVerification && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOtpVerification, otpTimer]);

  const startOtpFlow = () => {
    setOtpValues(['', '', '', '', '', '']);
    setOtpTimer(29);
    setCanResend(false);
    setIsOtpVerification(true);
  };

  const handleOtpChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return;
    const newValues = [...otpValues];
    newValues[index] = value;
    setOtpValues(newValues);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otpValues[index] && index > 0) {
        const newValues = [...otpValues];
        newValues[index - 1] = '';
        setOtpValues(newValues);
        otpRefs.current[index - 1]?.focus();
      } else {
        const newValues = [...otpValues];
        newValues[index] = '';
        setOtpValues(newValues);
      }
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newValues = [...otpValues];
      for (let i = 0; i < pastedData.length; i++) {
        newValues[i] = pastedData[i];
      }
      setOtpValues(newValues);
      const targetIndex = Math.min(pastedData.length, 5);
      otpRefs.current[targetIndex]?.focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    AutoNovaAudio.playClick();
    const code = otpValues.join('');
    if (code.length < 6) {
      AutoNovaAudio.playClick();
      setOtpShake(true);
      setTimeout(() => setOtpShake(false), 500);
      showNotification("Please enter the complete 6-digit verification code.", "error");
      return;
    }
    showNotification("Identity signature successfully validated.", "success");
    AutoNovaAudio.playSuccess();
    setIsOtpVerification(false);
    const successCallback = onAuthenticationSuccess || onSuccess;
    if (successCallback) {
      successCallback(isSignUp ? fullName : email.split('@')[0], role);
    }
  };

  const handleResendCode = () => {
    if (!canResend) return;
    AutoNovaAudio.playClick();
    setOtpTimer(29);
    setCanResend(false);
    showNotification("New 6-digit verification handshake transmitted.", "info");
  };

  // Floating label active tracking
  const [focusedField, setFocusedField] = useState(null);

  // Password criteria tracker
  const criteria = {
    length: password.length >= 8,
    capital: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password)
  };

  const getStrength = () => {
    let met = 0;
    if (criteria.length) met++;
    if (criteria.capital) met++;
    if (criteria.number) met++;
    if (criteria.symbol) met++;
    return met; // 0 to 4
  };

  const handleRoleChange = (newRole) => {
    AutoNovaAudio.playClick();
    setRole(newRole);
  };

  const handleModeSwitch = (mode) => {
    AutoNovaAudio.playClick();
    setIsSignUp(mode);
    onModeChange?.(mode);
    // Reset inputs when switching modes
    setPassword('');
    setConfirmPassword('');
    setIsForgotPassword(false);
  };

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  const isValidPhone = (value) => {
    const digitsOnly = value.replace(/[\s\-().]/g, '').replace(/^\+/, '');
    return /^\d{7,15}$/.test(digitsOnly);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    AutoNovaAudio.playClick();

    if (isSignUp) {
      if (!fullName) {
        showNotification("Please enter your full name.", "error");
        return;
      }
      if (!email) {
        showNotification("Please enter your email.", "error");
        return;
      }
      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address.", "error");
        return;
      }
      if (!phone) {
        showNotification("Please enter your phone number.", "error");
        return;
      }
      if (!isValidPhone(phone)) {
        showNotification("Please enter a valid phone number.", "error");
        return;
      }
      if (password !== confirmPassword) {
        showNotification("Passwords do not match.", "error");
        return;
      }
      if (getStrength() < 3) {
        showNotification("Password is not secure enough. Please complete more criteria.", "error");
        return;
      }
      if (!agreeToTerms) {
        showNotification("You must accept the Terms & Conditions.", "error");
        return;
      }
    } else {
      if (!email || !password) {
        showNotification("Please fill in all credentials.", "error");
        return;
      }
      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address.", "error");
        return;
      }
    }

    // Trigger stunning biometric neural scanning phase
    setIsVerifying(true);
    AutoNovaAudio.playHover();

    // Staggered cyber text simulation (Nigeria localized)
    const steps = [
      { text: 'VERIFYING WITH NIGERIAN CENTRAL IDENTITY REGISTRY...', delay: 600 },
      { text: 'ENCRYPTING AUTONOVA SMART ESCROW CONTRACTS...', delay: 1300 },
      { text: 'RESOLVING PORT LOGISTICS HANDSHAKE (APAPA NODE)...', delay: 2000 },
      { text: 'SECURING MULTI-SIGNATURE NAIRA-DOLLAR LIQUIDITY CORES...', delay: 2700 }
    ];

    steps.forEach((step) => {
      setTimeout(() => {
        setVerifyText(step.text);
        AutoNovaAudio.playHover();
      }, step.delay);
    });

    // After the scanning animation completes, call Firebase
    setTimeout(async () => {
      try {
        if (isSignUp) {
          await firebaseSignUp(fullName, email, password);
        } else {
          const user = await firebaseSignIn(email, password);
          // Sign-in goes straight through — skip OTP, call success immediately
          setIsVerifying(false);
          AutoNovaAudio.playSuccess();
          const successCallback = onAuthenticationSuccess || onSuccess;
          if (successCallback) successCallback(user.displayName || email.split('@')[0], role);
          return;
        }
        setIsVerifying(false);
        AutoNovaAudio.playSuccess();
        startOtpFlow();
      } catch (err) {
        setIsVerifying(false);
        const msg = err.code === 'auth/email-already-in-use'
          ? 'This email is already registered. Please sign in.'
          : err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential'
          ? 'Invalid email or password. Please try again.'
          : err.code === 'auth/too-many-requests'
          ? 'Too many attempts. Please wait a moment and try again.'
          : err.message || 'Authentication failed. Please try again.';
        showNotification(msg, 'error');
      }
    }, 3400);
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    AutoNovaAudio.playClick();

    if (!resetEmailOrPhone) {
      showNotification("Please enter your email or phone number.", "error");
      return;
    }

    setIsResetVerifying(true);
    AutoNovaAudio.playHover();

    const steps = [
      { text: 'SEARCHING SATELLITE SUBSCRIBER REGISTRY...', delay: 600 },
      { text: 'GENERATING ONE-TIME-PASSCODE SECURE METRICS...', delay: 1300 },
      { text: 'BROADCASTING ENCRYPTED ACCESS PAYLOAD...', delay: 2000 }
    ];

    steps.forEach((step) => {
      setTimeout(() => {
        setResetVerifyText(step.text);
        AutoNovaAudio.playHover();
      }, step.delay);
    });

    setTimeout(async () => {
      try {
        // Firebase only supports email-based password reset
        const emailToReset = isValidEmail(resetEmailOrPhone) ? resetEmailOrPhone : null;
        if (emailToReset) {
          await firebaseForgotPassword(emailToReset);
        }
        setIsResetVerifying(false);
        setIsResetSuccess(true);
        AutoNovaAudio.playSuccess();
        showNotification("Sovereign link dispatched. Check your device matrix.", "success");
      } catch (err) {
        setIsResetVerifying(false);
        const msg = err.code === 'auth/user-not-found'
          ? 'No account found with that email address.'
          : err.message || 'Failed to send reset link. Please try again.';
        showNotification(msg, 'error');
      }
    }, 2700);
  };

  const getNewPasswordStrength = (val) => {
    let strength = 0;
    if (val.length > 0) strength = 10;
    if (val.length > 5) strength = 33;
    if (val.length > 8 && /[A-Z]/.test(val) && /[0-9]/.test(val)) strength = 66;
    if (val.length > 12 && /[^A-Za-z0-9]/.test(val)) strength = 100;
    return strength;
  };

  const newStrength = getNewPasswordStrength(newPassword);

  const handleNewPasswordSubmit = (e) => {
    e.preventDefault();
    AutoNovaAudio.playClick();

    if (!newPassword) {
      showNotification("Please enter a new password.", "error");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      showNotification("Passwords do not match.", "error");
      return;
    }
    if (newStrength <= 33) {
      showNotification("Please use a stronger password.", "error");
      return;
    }

    showNotification("Credentials successfully updated in the Nigerian Node registry.", "success");
    AutoNovaAudio.playSuccess();
    
    setIsResettingPasswordForm(false);
    setIsForgotPassword(false);
    setIsSignUp(false); // Mode set to sign in
    setPassword('');
    setConfirmPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const roleBenefits = {
    Buyer: [
      "Access premium Lagos & Abuja inventory with free direct transit",
      "0% custom neural finance matching with Sterling & GTBank",
      "Sovereign pricing model with guaranteed escrow insurance"
    ],
    Seller: [
      "Instant evaluation via local Nigerian market indices",
      "Verified title clearing with automated custom documentation",
      "Direct settlement into any commercial Nigerian bank in 15 mins"
    ],
    Dealer: [
      "Manage imported fleets directly from Apapa Port logistics hub",
      "Synchronized dealership API, inventory charts & SMS lead bots",
      "Direct dealer bidding channels on national verified trade-ins"
    ]
  };

  return (
    <div id="signup-form-card" className="relative w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 border border-zinc-200/80 shadow-[0_10px_40px_rgba(0,0,0,0.06)] overflow-hidden text-zinc-900">
      
      <AnimatePresence mode="wait">
        {isVerifying ? (
          /* High-Tech Biometric simulated neural scanner layout */
          <motion.div
            key="scanning-handshake"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-12"
          >
            {/* Spinning orbital geometric rings */}
            <div className="relative w-40 h-40 flex items-center justify-center mb-8">
              <div className="absolute inset-0 rounded-full border border-dashed border-zinc-200 animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute inset-2 rounded-full border border-zinc-100 animate-reverse-spin" style={{ animationDuration: '10s' }} />
              <div className="absolute inset-5 rounded-full border-2 border-zinc-300 border-t-zinc-800 animate-spin" style={{ animationDuration: '4s' }} />
              
              {/* Central glowing fingerprint icon */}
              <div className="relative z-10 w-24 h-24 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center shadow-sm">
                <Fingerprint className="h-12 w-12 text-zinc-800 animate-pulse" />
              </div>

              {/* Horizontal sliding lasers scan effect */}
              <motion.div
                animate={{
                  top: ['15%', '85%', '15%'],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute left-6 right-6 h-[1.5px] bg-zinc-900 shadow-[0_0_12px_rgba(0,0,0,0.2)] pointer-events-none"
              />
            </div>

            <div className="flex flex-col items-center text-center gap-2 max-w-xs">
              <Cpu className="h-5 w-5 text-zinc-700 animate-spin" />
              <div className="font-mono text-xs tracking-widest text-zinc-900 font-bold uppercase">
                BIOMETRIC SECURE GATEWAY RUNNING
              </div>
              <p className="font-mono text-[9px] tracking-wider text-zinc-500 animate-pulse min-h-[24px]">
                {verifyText}
              </p>
            </div>
          </motion.div>
        ) : isOtpVerification ? (
          /* "Verify Identity" OTP View (New Screen) */
          <motion.div
            key="verify-otp"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header / Icon section */}
            <div className="flex flex-col items-center mb-6 text-center">
              <div className="relative mb-4 group cursor-pointer">
                <div className="absolute inset-0 rounded-full bg-zinc-100 blur opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-14 h-14 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-zinc-800 animate-pulse" />
                </div>
              </div>

              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight leading-none">
                <RevealText text="Verify your identity" />
              </h2>
              <p className="text-xs text-zinc-500 mt-2 font-medium max-w-xs mx-auto">
                We've sent a 6-digit code to your registered email <span className="font-semibold text-zinc-800">{email || 'coordinate'}</span>.
              </p>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-6">
              {/* OTP Inputs Grid */}
              <motion.div
                animate={otpShake ? { x: [0, -8, 8, -8, 8, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center gap-2 sm:gap-3 my-8" onPaste={handleOtpPaste}>
                {otpValues.map((val, i) => (
                  <input
                    key={i}
                    ref={(el) => (otpRefs.current[i] = el)}
                    type="text"
                    maxLength={1}
                    value={val}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="w-11 h-13 md:w-12 md:h-14 text-center text-xl md:text-2xl font-bold bg-zinc-50 border border-zinc-200 rounded-xl transition-all duration-300 focus:outline-none focus:border-zinc-950 focus:bg-white focus:ring-1 focus:ring-zinc-950/10 hover:border-zinc-300"
                    placeholder="•"
                    autoFocus={i === 0}
                  />
                ))}
              </motion.div>

              {/* Timer & Resend code segment */}
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex items-center gap-2 text-zinc-400 font-mono text-[10px] tracking-wider font-bold">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>RESEND IN <span className="text-zinc-900 font-extrabold">00:{otpTimer < 10 ? `0${otpTimer}` : otpTimer}</span></span>
                </div>
                
                <button
                  type="button"
                  disabled={!canResend}
                  onClick={handleResendCode}
                  className={`font-mono text-[10px] tracking-widest font-extrabold uppercase transition-colors duration-300 ${
                    canResend 
                      ? 'text-zinc-800 hover:text-zinc-950 cursor-pointer' 
                      : 'text-zinc-300 cursor-not-allowed'
                  }`}
                >
                  Resend Code
                </button>
              </div>

              {/* Verify Primary Action Button */}
              <button
                type="submit"
                onMouseEnter={() => AutoNovaAudio.playHover()}
                className="w-full relative group mt-4 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono font-extrabold tracking-widest text-xs uppercase cursor-pointer shadow-md transition-all border border-zinc-950 overflow-hidden"
              >
                <span>Verify Node Code</span>
                <ArrowRight className="h-4 w-4 text-white animate-pulse" />
              </button>

              {/* Back to Sign In option */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => { AutoNovaAudio.playClick(); setIsOtpVerification(false); setIsForgotPassword(false); }}
                  className="inline-flex items-center gap-1.5 font-mono text-xxs tracking-wider text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="h-3 w-3" />
                  <span>Back to Sign In</span>
                </button>
              </div>
            </form>
          </motion.div>
        ) : isResetVerifying ? (
          /* Satellite secure reset transmitter scanner */
          <motion.div
            key="reset-scanning"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <div className="relative w-40 h-40 flex items-center justify-center mb-8">
              <div className="absolute inset-0 rounded-full border border-dashed border-zinc-200 animate-spin" style={{ animationDuration: '15s' }} />
              <div className="absolute inset-3 rounded-full border border-zinc-100 animate-reverse-spin" style={{ animationDuration: '8s' }} />
              <div className="absolute inset-6 rounded-full border-2 border-zinc-300 border-t-zinc-800 animate-spin" style={{ animationDuration: '3s' }} />
              
              <div className="relative z-10 w-24 h-24 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center shadow-sm">
                <Cpu className="h-10 w-10 text-zinc-800 animate-pulse" />
              </div>

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-10 rounded-full bg-zinc-900/5 pointer-events-none"
              />
            </div>

            <div className="flex flex-col items-center text-center gap-2 max-w-xs">
              <Send className="h-5 w-5 text-zinc-700 animate-bounce" />
              <div className="font-mono text-xs tracking-widest text-zinc-900 font-bold uppercase">
                DISPATCHING SECURE PAYLOAD
              </div>
              <p className="font-mono text-[9px] tracking-wider text-zinc-500 animate-pulse min-h-[24px]">
                {resetVerifyText}
              </p>
            </div>
          </motion.div>
        ) : isResetSuccess ? (
          /* Success Reset Link Handshake Dispatched card */
          <motion.div
            key="reset-success"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col items-center text-center py-8"
          >
            <div className="w-16 h-16 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center shadow-sm mb-6">
              <ShieldCheck className="h-8 w-8 text-zinc-800" />
            </div>

            <h3 className="font-display text-xl md:text-2xl font-extrabold text-zinc-900 tracking-tight uppercase mb-2">
              <RevealText text="Handshake Dispatched" />
            </h3>
            <div className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase font-bold mb-4">
              SECURE SATELLITE COMMS LINK ESTABLISHED
            </div>
            
            <p className="text-xs text-zinc-600 max-w-sm mx-auto leading-relaxed mb-8">
              An encrypted password re-authorization link has been transmitted successfully to your digital registry coordinate. Check your interface payload to complete the credentials reset.
            </p>

            <div className="w-full space-y-3">
              <button
                type="button"
                onClick={() => { AutoNovaAudio.playClick(); setIsResetSuccess(false); setIsResettingPasswordForm(true); }}
                onMouseEnter={() => AutoNovaAudio.playHover()}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-950 rounded-xl font-mono text-xs font-extrabold tracking-wider text-white transition-all cursor-pointer shadow-md"
              >
                <span>OPEN PASSWORD RESET PAGE</span>
                <ArrowRight className="h-4 w-4 text-white" />
              </button>

              <button
                type="button"
                onClick={() => { AutoNovaAudio.playClick(); setIsResetSuccess(false); setIsForgotPassword(false); setResetEmailOrPhone(''); }}
                onMouseEnter={() => AutoNovaAudio.playHover()}
                className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-xl font-mono text-xs font-bold tracking-wider text-zinc-700 hover:text-zinc-900 transition-all cursor-pointer shadow-sm"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>RETURN TO GATEWAY</span>
              </button>
            </div>
          </motion.div>
        ) : isResettingPasswordForm && resetTokenExpired ? (
          /* Expired/Invalid Reset Link error state — previously missing entirely */
          <motion.div
            key="reset-link-expired"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-5"
          >
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
              <ShieldAlert className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h2 className="font-display text-xl font-extrabold text-zinc-900"><RevealText text="This link has expired" /></h2>
              <p className="text-xs text-zinc-500 mt-2 font-medium max-w-xs mx-auto">
                Password reset links are only valid for 30 minutes. Request a new one to continue.
              </p>
            </div>
            <button
              type="button"
              onClick={() => { AutoNovaAudio.playClick(); navigate('/forgot-password'); }}
              className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white font-mono font-extrabold tracking-widest text-xs uppercase rounded-xl cursor-pointer transition-all"
            >
              Request a New Link
            </button>
            <button
              type="button"
              onClick={() => { AutoNovaAudio.playClick(); navigate('/signin'); }}
              className="inline-flex items-center gap-1.5 font-mono text-xxs tracking-wider text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Back to Sign In</span>
            </button>
          </motion.div>
        ) : isResettingPasswordForm ? (
          /* "Reset Password Form" View (The new page requested by the user) */
          <motion.div
            key="reset-password-form"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header branding */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4 group cursor-pointer">
                <div className="absolute inset-0 rounded-full bg-zinc-100 blur opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-14 h-14 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center">
                  <svg className="w-8 h-8 text-zinc-800 transition-transform group-hover:rotate-12 duration-500" viewBox="0 0 24 24" fill="none">
                    <path d="M4 17h16M4 13h16M8 9h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="2" fill="#fff" />
                    <path d="M12 10V4l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <div className="text-center">
                <h2 className="font-display text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight leading-none">
                  <RevealText text="Reset Password" />
                </h2>
                <p className="text-xs text-zinc-500 mt-2 font-medium max-w-xs mx-auto">
                  Enter your new password below.
                </p>
              </div>
            </div>

            <form onSubmit={handleNewPasswordSubmit} className="space-y-5">
              {/* New Password Field */}
              <div className="space-y-2 relative group">
                <span className="absolute left-3.5 top-[38px] -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 transition-colors z-10">
                  <Lock className="h-4 w-4" />
                </span>
                <label className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase font-bold block ml-1" htmlFor="new_password">
                  NEW PASSWORD
                </label>
                <div className="relative">
                  <input
                    id="new_password"
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => { setNewPassword(e.target.value); AutoNovaAudio.playHover(); }}
                    className="w-full pl-11 pr-10 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 focus:bg-white focus:ring-1 focus:ring-zinc-900/10 hover:border-zinc-300 transition-all relative z-1"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => { setShowNewPassword(!showNewPassword); AutoNovaAudio.playClick(); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-800 z-10 cursor-pointer animate-none"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                
                {/* Dynamic Password Strength Meter */}
                <div className="h-1 w-full bg-zinc-100 rounded-full overflow-hidden mt-2 border border-zinc-200/50">
                  <div 
                    className={`strength-meter h-full transition-all duration-300 ${
                      newStrength <= 33 
                        ? 'bg-rose-500' 
                        : newStrength <= 66 
                        ? 'bg-amber-500' 
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${newStrength}%` }}
                  />
                </div>
                <p className={`font-mono text-[9px] tracking-widest uppercase text-right font-bold mt-1 ${
                  newStrength <= 33 ? 'text-rose-500' : newStrength <= 66 ? 'text-amber-500' : 'text-emerald-500'
                }`}>
                  {newStrength === 0 ? 'Too Weak' : newStrength <= 33 ? 'Weak' : newStrength <= 66 ? 'Moderate' : 'Strong'}
                </p>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2 relative group">
                <span className="absolute left-3.5 top-[38px] -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 transition-colors z-10">
                  <Lock className="h-4 w-4" />
                </span>
                <label className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase font-bold block ml-1" htmlFor="confirm_password">
                  CONFIRM PASSWORD
                </label>
                <div className="relative">
                  <input
                    id="confirm_password"
                    type={showConfirmNewPassword ? 'text' : 'password'}
                    required
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full pl-11 pr-10 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 focus:bg-white focus:ring-1 focus:ring-zinc-900/10 hover:border-zinc-300 transition-all relative z-1"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => { setShowConfirmNewPassword(!showConfirmNewPassword); AutoNovaAudio.playClick(); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-800 z-10 cursor-pointer animate-none"
                  >
                    {showConfirmNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Reset Password submit button */}
              <button
                type="submit"
                onMouseEnter={() => AutoNovaAudio.playHover()}
                className="w-full relative group mt-4 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono font-extrabold tracking-widest text-xs uppercase cursor-pointer shadow-md transition-all border border-zinc-950 overflow-hidden"
              >
                <span>Reset Password</span>
                <ArrowRight className="h-4 w-4 text-white animate-pulse" />
              </button>

              {/* Back to Sign In option */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => { AutoNovaAudio.playClick(); setIsResettingPasswordForm(false); setIsForgotPassword(false); }}
                  className="inline-flex items-center gap-1.5 font-mono text-xxs tracking-wider text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="h-3 w-3" />
                  <span>Back to Sign In</span>
                </button>
              </div>
            </form>
          </motion.div>
        ) : isForgotPassword ? (
          /* "Reset your password" View */
          <motion.div
            key="forgot-password"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header branding */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4 group cursor-pointer">
                <div className="absolute inset-0 rounded-full bg-zinc-100 blur opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-14 h-14 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center">
                  <svg className="w-8 h-8 text-zinc-800 transition-transform group-hover:rotate-12 duration-500" viewBox="0 0 24 24" fill="none">
                    <path d="M4 17h16M4 13h16M8 9h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="2" fill="#fff" />
                    <path d="M12 10V4l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <div className="text-center">
                <h2 className="font-display text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight leading-none">
                  <RevealText text="Reset your password" />
                </h2>
                <p className="text-xs text-zinc-500 mt-2 font-medium max-w-xs mx-auto">
                  Enter your email or phone number and we'll send you a link to reset your password.
                </p>
              </div>
            </div>

            <form onSubmit={handleResetSubmit} className="space-y-5">
              <div className="relative group">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 transition-colors z-10">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  required
                  value={resetEmailOrPhone}
                  onChange={(e) => setResetEmailOrPhone(e.target.value)}
                  onFocus={() => { setFocusedField('resetContact'); AutoNovaAudio.playHover(); }}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 focus:bg-white focus:ring-1 focus:ring-zinc-900/10 hover:border-zinc-300 transition-all relative z-1"
                  placeholder="hello@autonova.ai"
                />
                <label className={`absolute left-11 font-mono text-[9px] tracking-wider pointer-events-none transition-all ${
                  focusedField === 'resetContact' || resetEmailOrPhone ? '-top-2 bg-white px-1.5 text-zinc-900 scale-90 z-10 font-bold' : 'top-1/2 -translate-y-1/2 text-zinc-400'
                }`}>
                  EMAIL OR PHONE
                </label>
              </div>

              {/* Glowing Send Reset Link button */}
              <button
                type="submit"
                onMouseEnter={() => AutoNovaAudio.playHover()}
                className="w-full relative group mt-4 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono font-extrabold tracking-widest text-xs uppercase cursor-pointer shadow-md transition-all border border-zinc-950 overflow-hidden"
              >
                <span>Send Reset Link</span>
                <Send className="h-4 w-4 text-white animate-pulse" />
              </button>

              {/* Back to Sign In option */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => { AutoNovaAudio.playClick(); setIsForgotPassword(false); }}
                  className="inline-flex items-center gap-1.5 font-mono text-xxs tracking-wider text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="h-3 w-3" />
                  <span>Back to Sign In</span>
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          /* Standard Sign Up or Sign In views */
          <motion.div
            key="form-content"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Upper: Small Logo and Segment Toggle */}
            <div className="flex flex-col items-center mb-6">
              {/* Logo with futuristic spinning vector rings */}
              <div className="relative mb-4 group cursor-pointer">
                <div className="absolute inset-0 rounded-full bg-zinc-100 blur opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-14 h-14 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center">
                  <svg className="w-8 h-8 text-zinc-800 transition-transform group-hover:rotate-12 duration-500" viewBox="0 0 24 24" fill="none">
                    <path d="M4 17h16M4 13h16M8 9h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="2" fill="#fff" />
                    <path d="M12 10V4l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* View Switcher Toggle */}
              <div className="flex bg-zinc-100 p-1 rounded-full border border-zinc-200/60 relative w-64">
                <button
                  type="button"
                  onClick={() => handleModeSwitch(true)}
                  className={`relative flex-1 py-1.5 text-xs font-mono font-bold tracking-wider rounded-full transition-all duration-300 ${
                    isSignUp ? 'text-zinc-900 font-extrabold' : 'text-zinc-400 hover:text-zinc-800'
                  }`}
                >
                  {isSignUp && (
                    <motion.div
                      layoutId="authTabBg"
                      className="absolute inset-0 bg-white rounded-full shadow-sm border border-zinc-200/40"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">SIGN UP</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleModeSwitch(false)}
                  className={`relative flex-1 py-1.5 text-xs font-mono font-bold tracking-wider rounded-full transition-all duration-300 ${
                    !isSignUp ? 'text-zinc-900 font-extrabold' : 'text-zinc-400 hover:text-zinc-800'
                  }`}
                >
                  {!isSignUp && (
                    <motion.div
                      layoutId="authTabBg"
                      className="absolute inset-0 bg-white rounded-full shadow-sm border border-zinc-200/40"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">SIGN IN</span>
                </button>
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight leading-none">
                <RevealText key={isSignUp ? 'signup' : 'signin'} text={isSignUp ? 'Create your Account' : 'Welcome Back'} />
              </h2>
              <p className="text-xs text-zinc-500 mt-1.5 font-medium">
                {isSignUp ? 'Initialize your sovereign digital automotive node in Nigeria' : 'Provide keys to decrypt secure West African portal'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Role Select Matrix (Only on SignUp) */}
              {isSignUp && (
                <div className="space-y-2">
                  <span className="block font-mono text-[10px] tracking-widest text-zinc-400 uppercase font-bold px-1">
                    01 // SELECT PLATFORM ACCESS PORTAL
                  </span>
                  <div className="flex p-1 bg-zinc-100 rounded-xl border border-zinc-200/60 gap-1">
                    {['Buyer', 'Seller', 'Dealer'].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => handleRoleChange(r)}
                        className={`relative flex-1 py-2 text-center rounded-lg font-mono text-xs font-bold transition-all ${
                          role === r ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-800'
                        }`}
                      >
                        {role === r && (
                          <motion.div
                            layoutId="rolePillBg"
                            className="absolute inset-0 bg-white rounded-lg shadow-sm border border-zinc-200/40"
                            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                          />
                        )}
                        <span className="relative z-10">{r}</span>
                      </button>
                    ))}
                  </div>

                  {/* Micro list of dynamic role privileges */}
                  <motion.div 
                    layout
                    className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/60 text-[11px] font-medium text-zinc-600 flex flex-col gap-2"
                  >
                    {roleBenefits[role].map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-zinc-700 mt-0.5 flex-shrink-0" />
                        <span className="leading-tight">{benefit}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              )}

              {/* Form Input Matrix */}
              <div className="space-y-3">
                {isSignUp && (
                  <div className="relative group">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 transition-colors z-10">
                      <User className="h-4 w-4" />
                    </span>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      onFocus={() => { setFocusedField('name'); AutoNovaAudio.playHover(); }}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 focus:bg-white focus:ring-1 focus:ring-zinc-900/10 hover:border-zinc-300 transition-all relative z-1"
                      placeholder="e.g. Chukwuma Alabi"
                    />
                    <label className={`absolute left-11 font-mono text-[9px] tracking-wider pointer-events-none transition-all ${
                      focusedField === 'name' || fullName ? '-top-2 bg-white px-1.5 text-zinc-900 scale-90 z-10 font-bold' : 'top-1/2 -translate-y-1/2 text-zinc-400'
                    }`}>
                      FULL NAME
                    </label>
                  </div>
                )}

                <div className="relative group">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 transition-colors z-10">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => { setFocusedField('email'); AutoNovaAudio.playHover(); }}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 focus:bg-white focus:ring-1 focus:ring-zinc-900/10 hover:border-zinc-300 transition-all relative z-1"
                    placeholder="chukwuma@autonova.ng"
                  />
                  <label className={`absolute left-11 font-mono text-[9px] tracking-wider pointer-events-none transition-all ${
                    focusedField === 'email' || email ? '-top-2 bg-white px-1.5 text-zinc-900 scale-90 z-10 font-bold' : 'top-1/2 -translate-y-1/2 text-zinc-400'
                  }`}>
                    EMAIL ADDRESS
                  </label>
                </div>

                {isSignUp && (
                  <div className="relative group">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 transition-colors z-10">
                      <Phone className="h-4 w-4" />
                    </span>
                    <div className="absolute left-11 top-1/2 -translate-y-1/2 flex items-center gap-1 font-mono text-xs font-bold text-zinc-800 border-r border-zinc-200 pr-2 z-10">
                      <span>🇳🇬</span>
                      <span>+234</span>
                    </div>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onFocus={() => { setFocusedField('phone'); AutoNovaAudio.playHover(); }}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-28 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 focus:bg-white focus:ring-1 focus:ring-zinc-900/10 hover:border-zinc-300 transition-all relative z-1"
                      placeholder="803 123 4567"
                    />
                    <label className={`absolute left-28 font-mono text-[9px] tracking-wider pointer-events-none transition-all ${
                      focusedField === 'phone' || phone ? '-top-2 bg-white px-1.5 text-zinc-900 scale-90 z-10 font-bold' : 'top-1/2 -translate-y-1/2 text-zinc-400'
                    }`}>
                      PHONE NUMBER
                    </label>
                  </div>
                )}

                {/* Password field with optional Toggle Vis */}
                <div className="relative group">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 transition-colors z-10">
                    <Lock className="h-4 w-4" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => { setFocusedField('password'); AutoNovaAudio.playHover(); }}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-11 pr-10 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 focus:bg-white focus:ring-1 focus:ring-zinc-900/10 hover:border-zinc-300 transition-all relative z-1"
                    placeholder="••••••••"
                  />
                  <label className={`absolute left-11 font-mono text-[9px] tracking-wider pointer-events-none transition-all ${
                    focusedField === 'password' || password ? '-top-2 bg-white px-1.5 text-zinc-900 scale-90 z-10 font-bold' : 'top-1/2 -translate-y-1/2 text-zinc-400'
                  }`}>
                    PASSWORD
                  </label>
                  <button
                    type="button"
                    onClick={() => { setShowPassword(!showPassword); AutoNovaAudio.playClick(); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-800 z-10 cursor-pointer animate-none"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Forgot Password link (Sign In Mode only) */}
                {!isSignUp && (
                  <div className="flex items-center justify-between px-1">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => { AutoNovaAudio.playClick(); setRememberMe(prev => !prev); }}
                        className="cursor-pointer"
                      />
                      <span className="font-mono text-[10px] tracking-wider text-zinc-400">REMEMBER ME</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => { AutoNovaAudio.playClick(); setIsForgotPassword(true); }}
                      className="font-mono text-[10px] tracking-wider text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
                    >
                      FORGOT PASSWORD?
                    </button>
                  </div>
                )}

                {/* Multi-criteria Security nodes */}
                {isSignUp && password && (
                  <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2.5">
                    <div className="flex items-center justify-between text-[10px] font-mono tracking-wider">
                      <span className="text-zinc-400 font-bold">PASSWORD INTEGRITY STATUS:</span>
                      <span className={`font-bold uppercase ${
                        getStrength() <= 1 ? 'text-red-500' : getStrength() <= 3 ? 'text-amber-500' : 'text-emerald-500'
                      }`}>
                        {['INSECURE', 'WEAK', 'STABLE', 'OPTIMAL', 'S-TIER SECURE'][getStrength()]}
                      </span>
                    </div>

                    {/* Atomic security matrix indicators */}
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                      <div className={`flex items-center gap-1.5 p-1 px-2 rounded-md ${criteria.length ? 'text-emerald-600 bg-emerald-50 border border-emerald-200' : 'text-zinc-400 bg-zinc-100 border-transparent'}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${criteria.length ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-300'}`} />
                        <span>MIN 8 CHARS</span>
                      </div>
                      <div className={`flex items-center gap-1.5 p-1 px-2 rounded-md ${criteria.capital ? 'text-emerald-600 bg-emerald-50 border border-emerald-200' : 'text-zinc-400 bg-zinc-100 border-transparent'}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${criteria.capital ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-300'}`} />
                        <span>UPPER CASE</span>
                      </div>
                      <div className={`flex items-center gap-1.5 p-1 px-2 rounded-md ${criteria.number ? 'text-emerald-600 bg-emerald-50 border border-emerald-200' : 'text-zinc-400 bg-zinc-100 border-transparent'}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${criteria.number ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-300'}`} />
                        <span>NUMERIC DIGIT</span>
                      </div>
                      <div className={`flex items-center gap-1.5 p-1 px-2 rounded-md ${criteria.symbol ? 'text-emerald-600 bg-emerald-50 border border-emerald-200' : 'text-zinc-400 bg-zinc-100 border-transparent'}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${criteria.symbol ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-300'}`} />
                        <span>SPECIAL SYMBOL</span>
                      </div>
                    </div>
                  </div>
                )}

                {isSignUp && (
                  <div className="relative group">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 transition-colors z-10">
                      <Lock className="h-4 w-4" />
                    </span>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onFocus={() => { setFocusedField('confirmPassword'); AutoNovaAudio.playHover(); }}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-11 pr-10 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 focus:bg-white focus:ring-1 focus:ring-zinc-900/10 hover:border-zinc-300 transition-all relative z-1"
                      placeholder="••••••••"
                    />
                    <label className={`absolute left-11 font-mono text-[9px] tracking-wider pointer-events-none transition-all ${
                      focusedField === 'confirmPassword' || confirmPassword ? '-top-2 bg-white px-1.5 text-zinc-900 scale-90 z-10 font-bold' : 'top-1/2 -translate-y-1/2 text-zinc-400'
                    }`}>
                      CONFIRM PASSWORD
                    </label>
                    <button
                      type="button"
                      onClick={() => { setShowConfirmPassword(!showConfirmPassword); AutoNovaAudio.playClick(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-800 z-10 cursor-pointer animate-none"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                )}
              </div>

              {/* Dynamic Checkbox Terms */}
              {isSignUp && (
                <div className="flex items-start gap-2.5 px-1 pt-1">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreeToTerms}
                      onChange={(e) => { setAgreeToTerms(e.target.checked); AutoNovaAudio.playClick(); }}
                      className="h-4.5 w-4.5 rounded border-zinc-300 bg-zinc-50 text-zinc-900 focus:ring-zinc-900 cursor-pointer"
                    />
                  </div>
                  <label htmlFor="terms" className="text-[11px] text-zinc-500 font-sans leading-tight cursor-pointer hover:text-zinc-900 transition-colors select-none">
                    I agree to the <span onClick={(e) => { e.preventDefault(); navigate('/terms'); }} className="text-zinc-900 font-bold hover:underline cursor-pointer">Terms of Service</span> and the <span onClick={(e) => { e.preventDefault(); navigate('/privacy'); }} className="text-zinc-900 font-bold hover:underline cursor-pointer">Privacy Policy</span>.
                  </label>
                </div>
              )}

              {/* Glowing primary action button */}
              <button
                type="submit"
                onMouseEnter={() => AutoNovaAudio.playHover()}
                className="w-full relative group mt-3 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono font-extrabold tracking-widest text-xs uppercase cursor-pointer shadow-md transition-all border border-zinc-950 overflow-hidden"
              >
                <span>{isSignUp ? 'SIGN UP' : 'SIGN IN'}</span>
                <ArrowRight className="h-4 w-4 text-white animate-pulse" />
              </button>

              {/* Visual Divider block */}
              <div className="flex items-center gap-3 py-1">
                <div className="h-[1px] flex-grow bg-zinc-200" />
                <span className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase font-semibold">SECURE HANDSHAKE OPTIONS</span>
                <div className="h-[1px] flex-grow bg-zinc-200" />
              </div>

              {/* Social Login nodes */}
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => { AutoNovaAudio.playClick(); showNotification("Initiating Google Secure Handshake...", "info"); }}
                  onMouseEnter={() => AutoNovaAudio.playHover()}
                  title="Continue with Google"
                  className="flex items-center justify-center gap-2 py-2.5 border border-zinc-200 hover:border-zinc-300 rounded-xl bg-zinc-50 hover:bg-zinc-100 font-mono text-xxs text-zinc-600 hover:text-zinc-900 transition-all cursor-pointer shadow-sm"
                >
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => { AutoNovaAudio.playClick(); showNotification("Initiating Apple Secure Handshake...", "info"); }}
                  onMouseEnter={() => AutoNovaAudio.playHover()}
                  title="Continue with Apple"
                  className="flex items-center justify-center gap-2 py-2.5 border border-zinc-200 hover:border-zinc-300 rounded-xl bg-zinc-50 hover:bg-zinc-100 font-mono text-xxs text-zinc-600 hover:text-zinc-900 transition-all cursor-pointer shadow-sm"
                >
                  <svg className="w-4.5 h-4.5 fill-current text-zinc-600" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.96.95-2.12 2.72-3.8 2.72-1.63 0-2.21-1-3.95-1-1.74 0-2.42 1-3.95 1-1.63 0-2.84-1.77-3.8-2.72C.2 18.06-1.02 14.13.91 10.74c.96-1.68 2.68-2.72 4.54-2.72 1.45 0 2.45.82 3.46.82.96 0 2.21-.82 3.75-.82 1.34 0 2.59.54 3.41 1.43-3.32 1.95-2.79 6.42.38 7.83-.6 1.47-1.52 2.88-2.4 3.02zM12.03 7.25c-.02-3.8 3.16-6.9 3.26-7.01.12-.13.29-.2.47-.19.18 0 .34.09.43.25.04.07.1.18.1.34 0 1.9-.78 3.82-2.16 5.17-1.32 1.29-3.23 1.6-3.46 1.62-.16 0-.31-.07-.41-.21-.08-.13-.11-.27-.08-.41.05-.28.18-.58.35-.9z"></path>
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => { AutoNovaAudio.playClick(); showNotification("Initiating Facebook Secure Handshake...", "info"); }}
                  onMouseEnter={() => AutoNovaAudio.playHover()}
                  title="Continue with Facebook"
                  className="flex items-center justify-center gap-2 py-2.5 border border-zinc-200 hover:border-zinc-300 rounded-xl bg-zinc-50 hover:bg-zinc-100 font-mono text-xxs text-zinc-600 hover:text-zinc-900 transition-all cursor-pointer shadow-sm"
                >
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                  </svg>
                </button>
              </div>

              {/* Secondary redirect helper */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => handleModeSwitch(!isSignUp)}
                  className="font-mono text-xxs tracking-wider text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
                >
                  {isSignUp ? "ALREADY SIGNED UP? ACCESS YOUR PORTAL" : "NEW TO THE GATEWAY? SECURE A NEW NODE"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignUpForm;
