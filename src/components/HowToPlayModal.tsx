import React from 'react';
import { X, BookOpen, Compass, Award, Smartphone, Monitor } from 'lucide-react';
import { sounds } from '../audio/soundEngine';

interface HowToPlayModalProps {
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/90 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl max-h-[90vh] bg-slate-950 border border-slate-800 rounded-3xl flex flex-col overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-['Orbitron'] text-lg font-black text-white">
                CHALLENGER FIELD MANUAL
              </h2>
              <p className="text-xs text-slate-400">Mastering the 100 Games Challenge</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            aria-label="Close Field Manual"
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-slate-300 text-xs leading-relaxed">
          <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
            <h3 className="font-['Orbitron'] text-sm font-bold text-cyan-400 mb-2 flex items-center gap-2">
              <Compass className="w-4 h-4" />
              100 UNIQUE MINI-GAMES · 10 THEMATIC STAGES
            </h3>
            <p className="text-slate-300">
              Every single level in this application is a completely distinct game with its own mechanics, rules, win conditions, and obstacles. Progress through all 10 stages:
            </p>
            <ul className="mt-2 grid grid-cols-2 gap-1 text-[11px] font-mono text-slate-400">
              <li>• Stage 1: Extreme Survival</li>
              <li>• Stage 2: Brain & Logic</li>
              <li>• Stage 3: Precision & Reflex</li>
              <li>• Stage 4: Physics & Engineering</li>
              <li>• Stage 5: Maze & Escape</li>
              <li>• Stage 6: Extreme Skill Games</li>
              <li>• Stage 7: Strategy & Tactics</li>
              <li>• Stage 8: Nightmare Challenges</li>
              <li>• Stage 9: Legendary Impossible</li>
              <li>• Stage 10: Final Boss Challenges</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <h4 className="font-['Orbitron'] text-xs font-bold text-amber-400 mb-2 flex items-center gap-1.5">
                <Monitor className="w-4 h-4" />
                DESKTOP CONTROLS
              </h4>
              <p className="text-slate-400 text-[11px]">
                • <strong className="text-white">WASD / Arrow Keys</strong>: Move / Steer / Navigate<br />
                • <strong className="text-white">Space / W</strong>: Jump / Primary Action<br />
                • <strong className="text-white">Shift / J</strong>: Secondary Action / Slide / Dash<br />
                • <strong className="text-white">P or Esc</strong>: Pause game<br />
                • <strong className="text-white">R</strong>: Quick restart level
              </p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <h4 className="font-['Orbitron'] text-xs font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4" />
                MOBILE TOUCH CONTROLS
              </h4>
              <p className="text-slate-400 text-[11px]">
                • <strong className="text-white">Virtual D-Pad</strong>: Bottom-left directional buttons<br />
                • <strong className="text-white">Action A Button</strong>: Jump / Tap / Fire<br />
                • <strong className="text-white">Action B Button</strong>: Secondary action / Dash<br />
                • <strong className="text-white">Direct Touch</strong>: Interactive puzzle items and taps
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
            <h3 className="font-['Orbitron'] text-sm font-bold text-yellow-400 mb-2 flex items-center gap-2">
              <Award className="w-4 h-4" />
              STAR RATINGS & TROPHY REWARDS
            </h3>
            <p className="text-slate-300">
              Earn up to 3 stars per level based on your clear time, high score, and remaining lives. Completing a level with 0 damage awards a <strong className="text-amber-300">Flawless Clear Badge</strong> and counts towards the prestigious <em>Perfect Completion Medal</em>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
