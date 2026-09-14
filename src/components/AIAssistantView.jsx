import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AutoNovaAudio } from './AudioEngine';
import { 
  MessageSquare, Sparkles, Send, Mic, Image as ImageIcon, ArrowRight, 
  ArrowLeft, Plus, History, Zap, BatteryCharging, Share2, MoreVertical, 
  Menu, RefreshCw, Star, Info, HelpCircle, Compass, ShieldAlert, CheckCircle2,
  Copy, ThumbsUp, ThumbsDown
} from 'lucide-react';

const PRE_SEEDED_CHATS = [
  { id: 'ev-trends', title: '2024 EV Trends', icon: 'zap' },
  { id: 'porsche-911', title: 'Porsche 911 Search', icon: 'compass' },
  { id: 'family-suv', title: 'Family SUV Match', icon: 'help' }
];

export const AIAssistantView = ({ 
  allRecommendations, 
  onSelectCar, 
  showNotification,
  favoritedCars,
  handleFavoriteToggle
}) => {
  const [messages, setMessages] = useState([]);
  const [messageFeedback, setMessageFeedback] = useState({}); // { [messageIndex]: 'up' | 'down' }
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeChatId, setActiveChatId] = useState(null);
  const [recentChats, setRecentChats] = useState(PRE_SEEDED_CHATS);
  
  const messagesEndRef = useRef(null);

  // Scroll to bottom of chat automatically on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSuggestionClick = (queryText) => {
    AutoNovaAudio.playClick();
    submitQuery(queryText);
  };

  const startNewChat = () => {
    AutoNovaAudio.playClick();
    setMessages([]);
    setActiveChatId(null);
    showNotification("New conversational thread initialized.", "success");
  };

  const selectPreseededChat = (chat) => {
    AutoNovaAudio.playClick();
    setActiveChatId(chat.id);
    
    // Seed chat with custom historical dialogs
    if (chat.id === 'ev-trends') {
      setMessages([
        { sender: 'user', text: "What are the most exciting electric vehicle trends for 2024?" },
        { 
          sender: 'ai', 
          text: "2024 is defined by three massive shifts: ultra-high voltage architecture (900V+), active torque vectoring for sports dynamics, and extreme range platforms. In our catalog, the **Lucid Air Sapphire** and **Lotus Emeya** represent the absolute absolute pinnacle of these trends.",
          carIds: ['lucid-air-sapphire', 'lotus-emeya']
        }
      ]);
    } else if (chat.id === 'porsche-911') {
      setMessages([
        { sender: 'user', text: "Are there any high-performance track-focused sports cars in the catalog?" },
        { 
          sender: 'ai', 
          text: "While our focus centers on cutting-edge high-voltage electric performance, the **Porsche Taycan Turbo S** features incredible Porsche Active Ride dynamics that rival the track capabilities of premium 911 sports models, delivering 938 horsepower and carbon ceramic binders.",
          carIds: ['porsche-taycan-turbo-s']
        }
      ]);
    } else if (chat.id === 'family-suv') {
      setMessages([
        { sender: 'user', text: "Show me a spacious premium option suitable for family road trips." },
        { 
          sender: 'ai', 
          text: "The **Rivian R1S Dual** represents the gold standard for adventure luxury. It has three-row seating for up to seven passengers, a height-adjustable air suspension, and extreme battery capacities.",
          carIds: ['rivian-r1s-dual']
        }
      ]);
    }
  };

  const submitQuery = (textToSubmit) => {
    if (!textToSubmit.trim()) return;

    const userMessage = { sender: 'user', text: textToSubmit };
    setMessages(prev => [...prev, userMessage]);
    setInputVal('');
    setIsTyping(true);

    // Dynamic smart responses based on keywords
    setTimeout(() => {
      setIsTyping(false);
      AutoNovaAudio.playSuccess();

      const query = textToSubmit.toLowerCase();
      let aiText = "";
      let matchedCarIds = [];

      if (query.includes('under 80k') || query.includes('cheap') || query.includes('budget') || query.includes('80')) {
        aiText = "Based on your budget constraint of under $80k, the **Rivian R1S Dual** stands out as an exceptional value proposition. Priced at $78,000, it provides incredible electric luxury, versatile gear configurations, and three-row comfort without exceeding your threshold.";
        matchedCarIds = ['rivian-r1s-dual'];
      } else if (query.includes('porsche') || query.includes('taycan') || query.includes('tesla') || query.includes('plaid') || query.includes('compare')) {
        aiText = "An exciting matchup! Comparing these two high-performance titans reveals distinct masteries:\n\n* **Tesla Model S Plaid ($109,000)**: Raw straight-line dominance with 1,020 HP, carbon-sleeved tri-motor efficiency, and cutting-edge software integration.\n* **Porsche Taycan Turbo S ($215,000)**: Phenomenal chassis engineering, speed yellow carbon-ceramic calipers, active ride height control, and luxurious German luxury finish.\n\nHere are both units currently cataloged in our showroom:";
        matchedCarIds = ['tesla-model-s-plaid', 'porsche-taycan-turbo-s'];
      } else if (query.includes('commuting') || query.includes('city') || query.includes('comfortable') || query.includes('best luxury')) {
        aiText = "For supreme, ultra-quiet urban commuting, the **2024 Lucid Air Sapphire** is unmatched, offering a stunning Glass Canopy roof, Alcantara massage seating, and a quiet luxury cabin. For British GT aerodynamics and dynamic city performance, the **Lotus Emeya** is an incredible executive alternative.";
        matchedCarIds = ['lucid-air-sapphire', 'lotus-emeya'];
      } else if (query.includes('performance') || query.includes('fast') || query.includes('match') || query.includes('sedan')) {
        aiText = "Here are our highest-rated electric performance sedans, featuring record-breaking acceleration metrics and extreme AI matching indices. The tri-motor **Lucid Air Sapphire** and twin-motor **Porsche Taycan Turbo S** lead our dynamic catalog listings:";
        matchedCarIds = ['lucid-air-sapphire', 'porsche-taycan-turbo-s'];
      } else {
        // Fallback search response
        aiText = `I have scanned our dynamic AutoNova curation database for matching credentials related to "${textToSubmit}". Here are the top-tier vehicles from our active luxury listings that best fit your prestige profile:`;
        // Pick top 2 high match rate vehicles as recommended
        matchedCarIds = ['lucid-air-sapphire', 'tesla-model-s-plaid'];
      }

      setMessages(prev => [...prev, {
        sender: 'ai',
        text: aiText,
        carIds: matchedCarIds
      }]);

    }, 1500);
  };

  const handleSendSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    AutoNovaAudio.playClick();
    submitQuery(inputVal);
  };

  return (
    <div className="flex-grow flex h-[calc(100vh-80px)] overflow-hidden bg-white">
      
      {/* Side Navigation panel - Desktop Only */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-zinc-200 bg-zinc-50/50 p-6 shrink-0 justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-teal-50 text-teal-700 shadow-sm">
              <Compass className="h-5 w-5 text-teal-700" />
            </span>
            <div>
              <h4 className="font-display font-extrabold text-teal-950 text-xs uppercase tracking-wider">AI Copilot Engine</h4>
              <p className="text-[9px] font-mono font-bold text-zinc-400">INTELLIGENT CURATION HUD</p>
            </div>
          </div>

          <button 
            onClick={startNewChat}
            className="flex items-center justify-center gap-2 w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-mono text-[10px] font-black tracking-widest uppercase rounded-xl transition-all cursor-pointer shadow-sm hover:scale-[1.01]"
          >
            <Plus className="h-4 w-4" />
            <span>New Chat Session</span>
          </button>

          <div className="space-y-3 pt-2">
            <p className="font-mono text-[8px] font-extrabold text-zinc-400 uppercase tracking-widest px-1">Recent Conversations</p>
            <div className="space-y-1">
              {recentChats.map(chat => (
                <button
                  key={chat.id}
                  onClick={() => selectPreseededChat(chat)}
                  className={`flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-xl transition-all font-mono text-[10px] font-bold uppercase cursor-pointer ${
                    activeChatId === chat.id 
                      ? 'bg-teal-50 text-teal-950 border border-teal-200/50' 
                      : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                  }`}
                >
                  <History className="h-4 w-4 text-zinc-400 shrink-0" />
                  <span className="truncate">{chat.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-teal-950 rounded-2xl text-white space-y-2">
          <div className="flex items-center gap-1.5 text-teal-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="text-[8px] font-mono font-bold uppercase tracking-widest">Nova Core Online</span>
          </div>
          <p className="text-[10px] text-zinc-300 font-medium leading-normal">
            Neural filters are fully calibrated to Nigerian luxury import metrics. Escrow protocols active.
          </p>
        </div>
      </aside>

      {/* Main Conversation Canvas */}
      <main className="flex-1 flex flex-col relative h-full bg-white">
        
        {/* Top bar indicators */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-white/80 backdrop-blur">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
            <span className="font-mono text-[10px] font-extrabold text-teal-950 tracking-wider uppercase">Ask AutoNova Premium AI</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold">SYSTEM STATUS: FULLY SYNCHRONIZED</span>
          </div>
        </div>

        {/* Messages Scrolling Arena */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-[radial-gradient(circle_at_top_right,rgba(15,118,110,0.02),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(147,51,234,0.02),transparent_35%)]">
          
          <AnimatePresence>
            {messages.length === 0 ? (
              /* Beautiful Empty State Prompt Cards */
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-2xl mx-auto text-center space-y-8 py-12"
              >
                <div className="inline-flex relative">
                  <div className="absolute -inset-4 bg-teal-500/10 blur-xl rounded-full animate-pulse" />
                  <div className="w-16 h-16 rounded-2xl bg-teal-700/5 flex items-center justify-center border border-teal-700/10 relative">
                    <Sparkles className="h-8 w-8 text-teal-700" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h2 className="font-display text-3xl font-black text-teal-950 tracking-tight">
                    How can we refine your lifestyle search today?
                  </h2>
                  <p className="text-xs text-zinc-500 max-w-md mx-auto font-medium">
                    Ask anything about electric powertrains, price index analytics, luxury cabin setups, or import logistics to Nigeria.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  {[
                    { text: "Find me an electric SUV under $80k", sub: "Optimized adventure models" },
                    { text: "Compare Porsche Taycan vs Tesla Model S", sub: "Mechanical precision vs straight speed" },
                    { text: "What are the best luxury cars for city commuting?", sub: "Refined quiet-cabin setups" },
                    { text: "Show me performance sedans with high AI match", sub: "Top ranked performance profiles" }
                  ].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion.text)}
                      className="p-5 bg-white border border-zinc-200/60 rounded-2xl hover:border-teal-700 hover:shadow-md transition-all cursor-pointer group hover:scale-[1.01] active:scale-99"
                    >
                      <p className="text-xs font-bold text-teal-950 group-hover:text-teal-700 transition-colors">{suggestion.text}</p>
                      <span className="font-mono text-[9px] text-zinc-400 group-hover:text-zinc-500 block pt-1.5 uppercase font-semibold">{suggestion.sub}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* Chat Message Bubbles */
              <div className="max-w-3xl mx-auto space-y-6">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'ai' && (
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                        <Sparkles className="h-4.5 w-4.5 text-white" />
                      </div>
                    )}

                    <div className="flex flex-col gap-3 max-w-[80%]">
                      <div className={`p-5 rounded-2xl leading-relaxed text-xs font-medium border shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-teal-700 border-teal-800 text-white rounded-tr-none'
                          : 'bg-white border-zinc-200/60 text-zinc-700 rounded-tl-none'
                      }`}>
                        <p className="whitespace-pre-line">{msg.text}</p>
                      </div>

                      {/* Embed matching car cards if AI provides recommendation list */}
                      {msg.sender === 'ai' && msg.carIds && msg.carIds.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                          {msg.carIds.map(carId => {
                            const car = allRecommendations.find(c => c.id === carId);
                            if (!car) return null;
                            const isFav = favoritedCars.includes(car.id);

                            return (
                              <motion.div
                                key={car.id}
                                whileHover={{ y: -4 }}
                                className="bg-white border border-zinc-200/60 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group"
                              >
                                <div className="relative h-40 overflow-hidden bg-zinc-100">
                                  <img 
                                    src={car.image} 
                                    alt={car.name} 
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                                  />
                                  <div className="absolute top-2.5 right-2.5 bg-teal-950/90 backdrop-blur-md text-teal-400 font-mono text-[8px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full border border-teal-800/40">
                                    AI Match {car.match}%
                                  </div>
                                </div>

                                <div className="p-4 space-y-3">
                                  <div>
                                    <h4 className="font-display font-extrabold text-teal-950 text-xs truncate">{car.name}</h4>
                                    <p className="font-mono text-[8px] text-zinc-400 uppercase font-extrabold mt-0.5">{car.year} • {car.mileage}</p>
                                  </div>

                                  <div className="flex items-center justify-between">
                                    <span className="font-display font-black text-sm text-teal-700">${car.price.toLocaleString()}</span>
                                    <span className="font-mono text-[8px] bg-zinc-50 border border-zinc-100 px-2 py-0.5 rounded text-zinc-500 font-bold uppercase">{car.type}</span>
                                  </div>

                                  <button
                                    onClick={() => { AutoNovaAudio.playSuccess(); onSelectCar(car); }}
                                    className="w-full py-2.5 bg-zinc-50 hover:bg-teal-700 text-zinc-600 hover:text-white border border-zinc-200/80 hover:border-teal-800 font-mono text-[9px] tracking-widest font-extrabold uppercase rounded-lg transition-all cursor-pointer text-center"
                                  >
                                    View Detailed Analysis
                                  </button>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      )}

                      {/* Message actions — previously missing entirely */}
                      {msg.sender === 'ai' && (
                        <div className="flex items-center gap-1 -mt-1">
                          <button
                            onClick={() => {
                              AutoNovaAudio.playClick();
                              navigator.clipboard?.writeText(msg.text);
                              showNotification("Copied to clipboard.", "info");
                            }}
                            title="Copy"
                            className="p-1.5 text-zinc-300 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => {
                              AutoNovaAudio.playClick();
                              showNotification("Regenerating response...", "info");
                            }}
                            title="Regenerate"
                            className="p-1.5 text-zinc-300 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <RefreshCw className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => {
                              AutoNovaAudio.playClick();
                              setMessageFeedback(prev => ({ ...prev, [idx]: prev[idx] === 'up' ? null : 'up' }));
                            }}
                            title="Good response"
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${messageFeedback[idx] === 'up' ? 'text-teal-700 bg-teal-50' : 'text-zinc-300 hover:text-teal-700 hover:bg-teal-50'}`}
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => {
                              AutoNovaAudio.playClick();
                              setMessageFeedback(prev => ({ ...prev, [idx]: prev[idx] === 'down' ? null : 'down' }));
                            }}
                            title="Bad response"
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${messageFeedback[idx] === 'down' ? 'text-red-600 bg-red-50' : 'text-zinc-300 hover:text-red-600 hover:bg-red-50'}`}
                          >
                            <ThumbsDown className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Simulated Loading Typing indicator */}
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 justify-start"
                  >
                    <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 shrink-0 border border-teal-100">
                      <Sparkles className="h-4 w-4 text-teal-700 animate-pulse" />
                    </div>
                    <div className="bg-zinc-50 border border-zinc-200/50 p-4 rounded-2xl rounded-tl-none flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Inputs Floating bar */}
        <div className="p-6 bg-white border-t border-zinc-100">
          <div className="max-w-3xl mx-auto">
            <div className={`ai-sparkle-glow rounded-full ${inputVal || isTyping ? 'ai-sparkle-glow--active' : ''}`}>
            <form 
              onSubmit={handleSendSubmit}
              className="relative rounded-full shadow-md transition-all"
            >
              <div className="bg-white rounded-full flex items-center px-4 py-2 gap-2">
                <button 
                  type="button"
                  onClick={() => { AutoNovaAudio.playClick(); showNotification("Voice matching module initializing...", "info"); }}
                  className="p-2.5 text-zinc-400 hover:text-teal-700 transition-colors cursor-pointer"
                >
                  <Mic className="h-4 w-4" />
                </button>
                
                <button 
                  type="button"
                  onClick={() => { AutoNovaAudio.playClick(); showNotification("Image analyzer initializing...", "info"); }}
                  className="p-2.5 text-zinc-400 hover:text-teal-700 transition-colors cursor-pointer"
                >
                  <ImageIcon className="h-4 w-4" />
                </button>

                <input 
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask AutoNova anything about luxury EVs, SUVs, pricing, or shipping..."
                  className="flex-grow bg-transparent border-none focus:outline-none focus:ring-0 text-xs text-zinc-900 placeholder-zinc-400 font-medium px-2 py-3"
                />

                <button 
                  type="submit"
                  disabled={!inputVal.trim()}
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                    inputVal.trim() 
                      ? 'bg-teal-700 text-white shadow-md hover:bg-teal-800' 
                      : 'bg-zinc-100 text-zinc-300 cursor-not-allowed'
                  }`}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
            </div>
            <p className="text-[10px] text-zinc-400 text-center font-mono font-medium pt-3 uppercase tracking-wider">
              AutoNova Copilot Core V1.4 // Nigerian Escrow and Logistics Certified
            </p>
          </div>
        </div>

      </main>

    </div>
  );
};
