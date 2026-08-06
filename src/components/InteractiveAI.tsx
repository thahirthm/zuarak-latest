import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import aiIcon from "@/assets/ai.png";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function InteractiveAI() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState<any>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check onboarding
    const onboarded = localStorage.getItem('zuarak_ai_onboarded');
    if (!onboarded) {
      const timer = setTimeout(() => setShowOnboarding(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Setup Speech Recognition
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const reco = new SpeechRecognition();
        reco.continuous = false;
        reco.interimResults = true;
        reco.lang = 'en-US';

        reco.onresult = (event: any) => {
          let currentTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
        };

        reco.onend = () => {
          setIsListening(false);
        };

        setRecognition(reco);
      }
    }

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  // When listening stops, process the transcript
  useEffect(() => {
    if (!isListening && transcript) {
      processCommand(transcript.toLowerCase());
    }
  }, [isListening]);

  const startListening = () => {
    if (recognition && !isListening) {
      setTranscript("");
      try {
        recognition.start();
        setIsListening(true);
      } catch (e) {
        console.error("Speech recognition failed to start", e);
      }
    } else if (!recognition) {
      speakAssistantText("Sorry, voice recognition is not supported in this browser.");
    }
  };

  const processCommand = (cmd: string) => {
    let handled = false;
    const isSection = cmd.includes("section") || cmd.includes("home");

    const scrollToOrNav = (id: string) => {
      if (location.pathname === "/") {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else navigate({ to: "/", hash: id }); // fallback
      } else {
        navigate({ to: "/", hash: id });
      }
    };

    if (cmd.includes("work")) {
      if (isSection) {
        speakAssistantText("Scrolling to works section.");
        scrollToOrNav("works");
      } else {
        speakAssistantText("Taking you to the works page.", () => navigate({ to: "/works" }));
      }
      handled = true;
    } else if (cmd.includes("service")) {
      if (isSection) {
        speakAssistantText("Scrolling to services section.");
        scrollToOrNav("services");
      } else {
        speakAssistantText("Taking you to the services page.", () => navigate({ to: "/services" }));
      }
      handled = true;
    } else if (cmd.includes("about")) {
      if (isSection) {
        speakAssistantText("Scrolling to about section.");
        scrollToOrNav("about");
      } else {
        speakAssistantText("Taking you to about us.", () => navigate({ to: "/about" }));
      }
      handled = true;
    } else if (cmd.includes("blog")) {
      if (isSection) {
        speakAssistantText("Scrolling to blog section.");
        scrollToOrNav("blog");
      } else {
        speakAssistantText("Opening the blog.", () => navigate({ to: "/blog" }));
      }
      handled = true;
    } else if (cmd.includes("contact") || cmd.includes("talk") || cmd.includes("message")) {
      speakAssistantText("Let's talk.", () => navigate({ to: "/contact" }));
      handled = true;
    } else if (cmd.includes("faq") || cmd.includes("question")) {
      speakAssistantText("Scrolling to FAQs.");
      scrollToOrNav("faq");
      handled = true;
    } else if (cmd.includes("client")) {
      speakAssistantText("Scrolling to clients.");
      scrollToOrNav("clients");
      handled = true;
    } else if (cmd.includes("testimonial") || cmd.includes("review") || cmd.includes("say")) {
      speakAssistantText("Scrolling to testimonials.");
      scrollToOrNav("testimonials");
      handled = true;
    } else if (cmd.includes("reel") || cmd.includes("video")) {
      speakAssistantText("Scrolling to video reels.");
      scrollToOrNav("reels");
      handled = true;
    } else if (cmd.includes("home")) {
      speakAssistantText("Going home.", () => navigate({ to: "/" }));
      handled = true;
    }

    if (handled) {
      setTimeout(() => setShowAssistant(false), 2000);
    } else {
      speakAssistantText("Sorry, I didn't quite catch that. You can ask me things like: 'Go to Services' or 'Show Our Work'.");
    }
  };

  const speakAssistantText = (text: string, onEnd?: () => void) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      setIsSpeaking(true);

      utterance.onboundary = (e) => {
        setSpokenText(text.slice(0, e.charIndex));
      };

      utterance.onend = () => {
        setSpokenText("");
        setIsSpeaking(false);
        if (onEnd) onEnd();
      };

      const voices = window.speechSynthesis.getVoices();
      const maleVoice = voices.find(voice =>
        voice.name.includes('Male') ||
        voice.name.includes('Alex') ||
        voice.name.includes('Daniel') ||
        voice.name.includes('Fred') ||
        voice.name.includes('David')
      );

      if (maleVoice) {
        utterance.voice = maleVoice;
      }

      utterance.pitch = 0.8;
      utterance.rate = 0.9;

      window.speechSynthesis.speak(utterance);
    }
  };

  const playConnectSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();

      const bufferSize = ctx.sampleRate * 2.0;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1000;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0, ctx.currentTime);
      noiseGain.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 0.1);
      noiseGain.gain.setValueAtTime(0.8, ctx.currentTime + 0.8);
      noiseGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 1.2);
      noiseGain.gain.setValueAtTime(0.2, ctx.currentTime + 1.6);
      noiseGain.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 1.8);
      noiseGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.0);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start();


    } catch (e) { }
  };

  const toggleAssistant = () => {
    const now = Date.now();
    const lastInteractionStr = localStorage.getItem('zuarak_ai_last_interaction');
    const lastInteraction = lastInteractionStr ? parseInt(lastInteractionStr, 10) : 0;
    
    // Record this click to reset the 1-minute inactivity timer
    localStorage.setItem('zuarak_ai_last_interaction', now.toString());

    if (showOnboarding) {
      setShowOnboarding(false);
      localStorage.setItem('zuarak_ai_onboarded', 'true');
    }

    if (showAssistant || isSpeaking) {
      if (isListening && recognition) recognition.stop();
      if (isSpeaking) window.speechSynthesis.cancel();
      setIsListening(false);
      setIsSpeaking(false);
      setSpokenText("");
      setShowAssistant(false);
      return;
    }

    // 4 minutes = 240000 ms
    if (now - lastInteraction > 240000) {
      setIsSpeaking(true);
      setSpokenText("[ INITIALIZING CONNECTION... ]");
      playConnectSound();
      
      setTimeout(() => {
        speakAssistantText(
          "Hi, welcome to Zuarak. Your AI assistant is ready. Ask me anything from our services to navigating the website. How can I help you today?", 
          () => {
            setShowAssistant(true);
          }
        );
      }, 2000);
    } else {
      setShowAssistant(true);
    }
  };

  const handleAssistantOption = (path: string, msg: string) => {
    speakAssistantText(msg, () => {
      navigate({ to: path });
    });
    setShowAssistant(false);
  };

  return (
    <>
      <AnimatePresence>
        {showOnboarding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm flex items-center justify-center pointer-events-auto"
            onClick={() => {
              setShowOnboarding(false);
              localStorage.setItem('zuarak_ai_onboarded', 'true');
            }}
          >
            <div 
              className="absolute bottom-24 right-4 md:bottom-28 md:right-10 w-[calc(100vw-2rem)] max-w-[320px] bg-zinc-900/95 backdrop-blur-xl text-white p-6 md:p-7 rounded-3xl shadow-2xl flex flex-col gap-5 cursor-default border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 border border-primary/20">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                </div>
                <h3 className="font-sans text-sm tracking-wider font-semibold text-white/90">Meet Zuarak AI</h3>
              </div>
              
              <p className="font-sans text-xs md:text-sm leading-relaxed text-white/50 font-light">
                Experience smarter navigation. Use your voice or text to explore ZUARAK, discover our expertise, and access any page in seconds.
              </p>
              
              <div className="bg-black/40 p-3 rounded-2xl border border-white/5 flex gap-3 items-center mt-1">
                <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/70"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                </div>
                <p className="font-sans text-[10px] md:text-xs font-normal text-white/70 leading-snug">Don't forget to turn on your sound—your AI assistant is ready.</p>
              </div>
              
              <button 
                className="mt-2 w-full bg-white text-black py-3.5 rounded-xl font-sans text-xs font-medium tracking-wide hover:bg-white/90 transition-all active:scale-95"
                onClick={() => {
                  setShowOnboarding(false);
                  localStorage.setItem('zuarak_ai_onboarded', 'true');
                }}
              >
                Got it
              </button>
              
              <div className="absolute -bottom-3 right-8 w-6 h-6 bg-zinc-900/95 border-b border-r border-white/10 rotate-45 transform origin-center" style={{ zIndex: -1 }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[100] flex flex-col items-end gap-2 pointer-events-auto">
      <AnimatePresence>
        {showAssistant && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="bg-black/90 text-white border border-white/20 rounded-2xl shadow-2xl p-5 md:p-6 mb-2 flex flex-col gap-4 w-[calc(100vw-2rem)] sm:w-[320px] max-w-[320px] backdrop-blur-xl origin-bottom-right"
          >
            <div className="flex items-center gap-3 mb-2 border-b border-white/10 pb-4">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
              <p className="font-mono text-xs uppercase tracking-widest text-white/60">AI Assistant</p>
            </div>
            
            {/* Voice Control Section */}
            <div className="flex flex-col gap-3 mb-4 bg-[#0a0a0a] p-4 rounded-2xl border border-white/5">
              <button
                onClick={isListening ? () => recognition?.stop() : startListening}
                className={`relative overflow-hidden flex items-center justify-center gap-2.5 py-4 px-4 rounded-xl font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isListening 
                    ? "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20" 
                    : "bg-white/[0.03] text-white/80 border border-white/10 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {isListening ? (
                  <>
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    Stop Listening
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                    Tap to Speak
                  </>
                )}
              </button>

              {transcript && (
                <div className="text-left font-mono text-xs text-white/80 border-t border-white/10 pt-3 mt-1 italic">
                  "{transcript}"
                </div>
              )}
            </div>

            <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">Or Quick Links:</p>
            <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar pb-4">
              <button onClick={() => handleAssistantOption('/about', 'Taking you to about us.')} className="text-left font-mono text-[10px] md:text-xs uppercase tracking-widest bg-white/5 hover:bg-white/10 px-4 py-3 rounded-lg transition-colors border border-transparent hover:border-white/20">About Us</button>
              <button onClick={() => handleAssistantOption('/services', 'Checking out our services.')} className="text-left font-mono text-[10px] md:text-xs uppercase tracking-widest bg-white/5 hover:bg-white/10 px-4 py-3 rounded-lg transition-colors border border-transparent hover:border-white/20">Services</button>
              <button onClick={() => handleAssistantOption('/works', 'Let\'s see the works.')} className="text-left font-mono text-[10px] md:text-xs uppercase tracking-widest bg-white/5 hover:bg-white/10 px-4 py-3 rounded-lg transition-colors border border-transparent hover:border-white/20">Works</button>
              <button onClick={() => handleAssistantOption('/contact', 'Going to contact page.')} className="text-left font-mono text-[10px] md:text-xs uppercase tracking-widest bg-white/5 hover:bg-white/10 px-4 py-3 rounded-lg transition-colors border border-transparent hover:border-white/20">Contact Us</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      


      <button
        onClick={toggleAssistant}
        className="group relative w-16 h-16 flex items-center justify-center hover:scale-105 active:scale-95 transition-all focus:outline-none"
        aria-label="AI Assistant"
      >
        {/* Hover Text */}
        {!showAssistant && !isSpeaking && (
          <div className="absolute right-20 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none text-right">
            <p className="font-mono text-[10px] md:text-xs text-primary uppercase tracking-widest bg-black/80 px-3 py-1.5 rounded-md border border-white/10">[ Initiate AI ]</p>
          </div>
        )}

        {/* Outer glowing blur */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-400 to-cyan-500 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        />
        {/* Inner solid animated ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-400 to-cyan-500"
        />

        {/* Image/Icon Container */}
        <div className="relative z-10 flex items-center justify-center w-[96%] h-[96%] bg-black rounded-full overflow-hidden border border-white/10">
          {showAssistant ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          ) : (
            <img src={aiIcon} alt="AI Assistant" className="w-full h-full object-cover" />
          )}
        </div>
      </button>
      </div>
    </>
  );
}
