import React from 'react';
import { OfficialLogo } from './OfficialLogo';
import { X, ShieldCheck, Sparkles, Smartphone, Award, Cpu } from 'lucide-react';
import { sounds } from '../audio/soundEngine';

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/90 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl max-h-[90vh] bg-slate-950 border border-slate-800 rounded-3xl flex flex-col overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-['Orbitron'] text-lg font-black text-white">
                ABOUT ZOHAIB PK OFFICIAL
              </h2>
              <p className="text-xs text-slate-400">Official Production & Technical Overview</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            aria-label="Close Brand Overview"
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 text-slate-300 text-xs leading-relaxed">
          <div className="text-center py-2">
            <OfficialLogo size="md" showTagline={true} />
          </div>

          <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
            <h3 className="font-['Orbitron'] text-sm font-bold text-amber-400 mb-2">
              THE VISION: 100 REAL GAMES IN ONE PLATFORM
            </h3>
            <p className="text-slate-300">
              <strong>ZOHAIB PK OFFICIAL – ULTIMATE LEGENDARY 100 GAMES CHALLENGE</strong> was engineered to push mobile web and canvas gaming to its pinnacle. Unlike generic apps that simply recolor sprites or increase timers, this challenge platform features <strong>100 completely distinct playable mini-games</strong> across 10 epic thematic stages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <h4 className="font-['Orbitron'] text-xs font-bold text-cyan-400 mb-2 flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                TECHNICAL ARCHITECTURE
              </h4>
              <p className="text-slate-400 text-[11px]">
                • 100% Offline with zero external asset dependencies<br />
                • Procedural Web Audio API sound synthesis<br />
                • High-performance 60 FPS HTML5 Canvas engine<br />
                • LocalStorage state persistence with automatic recovery<br />
                • Zero-latency responsive touch & keyboard controls
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <h4 className="font-['Orbitron'] text-xs font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4" />
                ANDROID APK CONVERSION
              </h4>
              <p className="text-slate-400 text-[11px]">
                Ready for one-click compilation via Capacitor, Cordova, or Website2APK:<br />
                1. Run <code>npm run build</code> to produce the static <code>/dist</code> folder.<br />
                2. Point Android WebView wrapper to <code>dist/index.html</code>.<br />
                3. Full-screen Android gaming with hardware acceleration.
              </p>
            </div>
          </div>

          <div className="text-center pt-2 text-[11px] text-slate-500 font-mono">
            OFFICIAL BRAND: ZOHAIB PK OFFICIAL · ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </div>
  );
};
