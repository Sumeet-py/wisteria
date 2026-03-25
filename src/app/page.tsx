"use client";
import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { 
  FaUserTie, FaCode, FaStethoscope, FaUtensils, 
  FaUserSecret, FaPencilRuler, FaToolbox, FaMusic 
} from "react-icons/fa";

// --- 🐟 1. THE HIRING OCEAN (BACKGROUND) ---
const ProfessionFish = memo(({ icon: Icon, label, x, y, delay }: any) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0.15, 0.4, 0.15], 
      y: ["0vh", "3vh", "0vh"],
      x: ["0vw", "1vw", "0vw"]
    }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay }}
    className="absolute flex items-center gap-2 text-cyan-400/40 pointer-events-none select-none mix-blend-screen"
    style={{ left: x, top: y }}
  >
    <Icon className="text-3xl" />
    <span className="font-mono text-[9px] font-black tracking-[0.5em] uppercase text-white/60">{label}</span>
  </motion.div>
));

// --- 🫧 2. BUBBLE PHYSICS (UP & DOWN) ---
const Bubble = memo(({ x, size, delay, direction }: any) => (
  <motion.div
    initial={{ y: direction === "up" ? "110vh" : "-20vh", x, scale: 0 }}
    animate={{ y: direction === "up" ? "-20vh" : "110vh", scale: [1, 1.3, 1] }}
    transition={{ duration: 1.5, ease: "linear", repeat: Infinity, delay }}
    className="fixed pointer-events-none z-[9999] bg-white rounded-full shadow-[0_0_15px_white]"
    style={{ width: size, height: size }}
  />
));

// --- ⌨️ 3. TYPEWRITER ENGINE ---
const Typewriter = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    setDisplayedText(""); 
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        setDisplayedText(text); // Safety net to show 100% of text
        clearInterval(interval);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="space-y-6 font-mono text-xs">
      {displayedText.split('\n').map((line, i) => {
        const isHeader = line.includes("ASSETS") || line.includes("VULNERABILITIES");
        const isRed = line.includes("VULNERABILITIES");
        return (
          <p key={i} className={`
            ${isHeader ? 'text-xs font-black tracking-[0.4em] mb-2 mt-6' : 'text-lg font-bold italic border-l-4 border-black/10 pl-4'}
            ${isRed ? 'text-red-600' : isHeader ? 'text-cyan-600' : 'text-black'}
          `}>
            {line}
          </p>
        );
      })}
    </div>
  );
};

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [surfacing, setSurfacing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [probability, setProbability] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  const [fishes] = useState(() => {
    const icons = [FaUserTie, FaCode, FaStethoscope, FaUtensils, FaUserSecret, FaPencilRuler, FaToolbox, FaMusic];
    const labels = ["CEO", "DEV", "DOCTOR", "CHEF", "AGENT", "DESIGNER", "MECHANIC", "ARTIST"];
    return Array.from({ length: 35 }).map((_, i) => ({
      id: i, icon: icons[i % icons.length], label: labels[i % labels.length],
      x: `${Math.random() * 95}%`, y: `${Math.random() * 95}%`, delay: Math.random() * 6
    }));
  });

  const [bubbles] = useState(() => 
    Array.from({ length: 50 }).map((_, i) => ({
      id: i, x: `${Math.random() * 100}vw`, size: Math.random() * 30 + 10, delay: Math.random() * 1
    }))
  );

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput || loading) return;
    setLoading(true);
    setShowResult(false);
    setProbability(Math.floor(Math.random() * 95) + 5);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: userInput }),
      });
      const data = await res.json();
      setTimeout(() => {
        setResult(data.text);
        setLoading(false);
        setShowResult(true);
      }, 3000);
    } catch (err) {
      setLoading(false);
      setResult("SYSTEM ERROR: BREACH IN HULL.");
      setShowResult(true);
    }
  };

  const handleResurface = () => {
    setSurfacing(true);
    setTimeout(() => {
      setSurfacing(false);
      setShowResult(false);
      setUserInput("");
    }, 2000);
  };

  return (
    <main 
      onMouseMove={(e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); }}
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden cursor-none p-6"
    >
      {/* 🌊 BACKGROUND OCEAN */}
      <div className="absolute inset-0 z-0">
        {fishes.map(f => <ProfessionFish key={f.id} {...f} />)}
      </div>

      {/* 🚢 SUBMARINE CURSOR */}
      <motion.div style={{ x: springX, y: springY }} className="fixed top-0 left-0 z-[1001] -ml-12 -mt-8 pointer-events-none mix-blend-difference">
        <svg width="100" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <path d="M2 12c0-3 4-5 10-5s10 2 10 5-4 5-10 5-10-2-10-5Z" />
          <path d="M12 7V4h3" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* 🫧 LOADING / SURFACING OVERLAYS */}
      <AnimatePresence>
        {(loading || surfacing) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9998] bg-[#000814]">
            {bubbles.map(b => <Bubble key={b.id} {...b} direction={loading ? "up" : "down"} />)}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className="text-white font-black text-6xl tracking-[0.5em] animate-pulse italic uppercase">
                {loading ? "Descending" : "Surfacing"}
              </h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🖥️ MAIN UI */}
      <div className="relative z-[100] w-full max-w-lg">
        <AnimatePresence mode="wait">
          {!loading && !showResult && !surfacing && (
            <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <h1 className="text-8xl font-black italic mb-2 tracking-tighter uppercase text-white opacity-80">Wisteria</h1>
              <p className="text-[10px] text-cyan-500 font-mono tracking-[0.9em] mb-20 uppercase">Abyssal Terminal</p>
              <form onSubmit={handleScan}>
                <input 
                  autoFocus value={userInput} onChange={(e) => setUserInput(e.target.value)}
                  placeholder="ID PROFESSION..."
                  className="w-full bg-transparent border-b-2 border-white/20 pb-4 text-center text-3xl font-black outline-none focus:border-cyan-500 text-white uppercase transition-all"
                />
              </form>
            </motion.div>
          )}

          {showResult && !surfacing && (
            <motion.div 
            key="result" 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="bg-white text-black p-12 rounded-[3rem] shadow-2xl w-full border-t-[16px] border-cyan-500 h-auto min-h-[500px] mb-10 z-20"
          >
              <div className="flex justify-between items-start mb-8 border-b border-black/5 pb-6">
                <div>
                  <h3 className="text-3xl font-black italic uppercase mb-1">{userInput}</h3>
                  <p className="text-[9px] font-mono opacity-40 uppercase tracking-widest">Hadal Zone Scan Success</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black uppercase mb-1">Survival Odds</p>
                  <p className={`text-4xl font-black italic ${probability < 30 ? 'text-red-600' : 'text-black'}`}>{probability}%</p>
                </div>
              </div>

              <Typewriter text={result} />

              <div className="mt-12 flex items-center justify-between pt-6 border-t border-black/5">
                <span className="text-[7px] font-mono opacity-30 uppercase tracking-[0.3em]">Status: 10,000M_STABLE</span>
                <button 
                  onClick={handleResurface}
                  className="px-10 py-3 bg-black text-white font-black text-[10px] uppercase tracking-widest hover:bg-cyan-600 transition-all rounded-full"
                >
                  RE-SURFACE
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-900/10 to-black pointer-events-none" />
    </main>
  );
}