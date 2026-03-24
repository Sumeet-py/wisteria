"use client";

import { useRef, useState } from "react";
import { FileUp, Target } from "lucide-react";

export default function Home() {
  const [resume, setResume] = useState<File | null>(null);
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleCardClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // placeholder for submit logic
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      {/* HEADER */}
      <header className="flex items-center h-16 px-8 border-b border-slate-800">
        <div className="text-2xl tracking-widest font-bold text-[#BDB5D5] select-none">
          WISTERIA
        </div>
      </header>

      {/* HERO */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-xl text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-5 leading-tight text-[#BDB5D5] drop-shadow-[0_4px_24px_rgba(189,181,213,0.28)]">
            Optimizing Growth
          </h1>
          <p className="text-slate-300 tracking-wide text-lg md:text-xl font-light">
            The AI engine for matching your resume to the world’s best roles—uncover insights, close skill gaps, and supercharge your career trajectory.
          </p>
        </div>

        {/* FEATURES */}
        <form
          className="flex flex-col md:flex-row gap-8 md:gap-14 items-stretch w-full max-w-3xl"
          onSubmit={handleSubmit}
        >
          {/* RESUME CARD */}
          <div
            className="flex flex-1 flex-col items-center justify-center bg-slate-900/60 border border-slate-800 rounded-2xl py-8 px-6 cursor-pointer hover:border-[#BDB5D5] group transition-all"
            onClick={handleCardClick}
          >
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center">
              <span className="rounded-full h-14 w-14 flex items-center justify-center bg-slate-800 group-hover:bg-[#BDB5D5]/10 mb-3 transition-all">
                <FileUp size={32} className="text-[#BDB5D5]" />
              </span>
              <div className="text-lg font-medium mb-1">Resume</div>
              <div className="text-slate-400 text-sm">
                {resume ? (
                  <span className="text-[#BDB5D5]">{resume.name}</span>
                ) : (
                  <>Click to upload (.pdf, .doc, .docx)</>
                )}
              </div>
            </div>
          </div>

          {/* ROLE CARD */}
          <div className="flex flex-1 flex-col items-center justify-center bg-slate-900/60 border border-slate-800 rounded-2xl py-8 px-6">
            <span className="rounded-full h-14 w-14 flex items-center justify-center bg-slate-800 mb-3">
              <Target size={32} className="text-[#BDB5D5]" />
            </span>
            <div className="text-lg font-medium mb-1">Target Role</div>
            <input
              type="text"
              required
              placeholder="e.g. Senior Product Manager"
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full mt-2 px-3 py-2 text-base rounded-md bg-slate-950 border border-slate-800 focus:border-[#BDB5D5] focus:ring-2 focus:ring-[#BDB5D5]/25 outline-none placeholder-slate-500 transition-all"
              style={{ maxWidth: 320 }}
            />
          </div>
        </form>

        <button
          type="submit"
          onClick={handleSubmit}
          className={`mt-10 px-7 py-3 rounded-xl font-semibold text-base bg-[#BDB5D5] shadow-[0_2px_30px_0_rgba(189,181,213,0.23)] text-slate-950 transition-all
            ${
              isLoading
                ? "opacity-60 cursor-not-allowed animate-pulse"
                : "hover:bg-[#A99BC2] hover:shadow-[0_2px_48px_0_rgba(189,181,213,0.38)] focus:ring-2 focus:ring-[#BDB5D5]"
            } glow-btn`}
          disabled={isLoading || !resume || !role}
        >
          {isLoading ? (
            <span>
              <svg
                className="inline-block mr-2 w-5 h-5 animate-spin text-slate-800"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#615686"
                  strokeWidth="4"
                  className="opacity-25"
                />
                <path
                  d="M22 12a10 10 0 0 1-10 10"
                  stroke="#BDB5D5"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="opacity-75"
                />
              </svg>
              Generating...
            </span>
          ) : (
            <>Generate Match Insights</>
          )}
        </button>
      </main>

      {/* CSS for glow */}
      <style jsx global>{`
        .glow-btn {
          box-shadow: 0 0 20px 0 #bdb5d577, 0 0 60px 0 #bdb5d50e;
        }
        .glow-btn:hover {
          box-shadow: 0 0 32px 5px #bdb5d5cc, 0 0 80px 15px #bdb5d523;
        }
      `}</style>
    </div>
  );
}