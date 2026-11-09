import React, { useEffect } from 'react';
import { GameDefinition, GameRunState } from '../types/game';
import { OfficialLogo } from './OfficialLogo';
import { AlertOctagon, RotateCcw, Grid, Home } from 'lucide-react';
import { sounds } from '../audio/soundEngine';

interface GameOverModalProps {
  game: GameDefinition;
  runState: GameRunState;
  onRetry: () => void;
  onSelectLevel: () => void;
  onHome: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  game,
  runState,
  onRetry,
  onSelectLevel,
  onHome,
}) => {
  useEffect(() => {
    sounds.playDefeat();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
      <div className="w-full max-w-md bg-slate-950 border-2 border-red-600/80 rounded-2xl p-6 shadow-[0_0_60px_rgba(239,68,68,0.4)] text-center relative overflow-hidden">
        {/* Red warning border */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 animate-pulse" />

        <OfficialLogo size="sm" showTagline={false} className="mb-2" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/80 border border-red-700/60 text-red-400 font-['Orbitron'] text-xs font-black rounded-full mb-3">
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>CHALLENGE FAILED · LEVEL {game.id}</span>
        </div>

        <h2 className="font-['Orbitron'] text-2xl font-black text-rose-500 tracking-wide mb-1">
          {game.title}
        </h2>
        <p className="text-xs text-slate-400 mb-5 font-mono">
          NO EASY VICTORIES. ANALYZE YOUR ERROR & RETRY!
        </p>

        {/* Objective Clue */}
        <div className="bg-red-950/30 border border-red-800/40 p-3 rounded-xl mb-5 text-left text-xs text-slate-300">
          <span className="font-['Orbitron'] text-[11px] font-bold text-red-400 block mb-1">
            TARGET OBJECTIVE:
          </span>
          <p>{game.objective}</p>
          <div className="text-[10px] text-amber-300 font-mono mt-1.5">
            TIP: {game.controlsHint}
          </div>
        </div>

        {/* Attempt Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Score Reached</div>
            <div className="font-['Orbitron'] text-base md:text-lg font-black text-amber-400 tabular-nums">
              {Math.round(runState.score)}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Time Survived</div>
            <div className="font-['Orbitron'] text-base md:text-lg font-black text-cyan-400 tabular-nums">
              {Math.round(runState.elapsedTime)}s
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            data-start="true"
            onClick={() => {
              sounds.playClick();
              onRetry();
            }}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white font-['Orbitron'] font-black text-sm tracking-wider shadow-[0_0_25px_rgba(239,68,68,0.6)] hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>TRY AGAIN NOW</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onSelectLevel();
              }}
              className="py-2.5 px-3 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-xs font-['Orbitron'] font-bold hover:text-white transition flex items-center justify-center gap-1.5"
            >
              <Grid className="w-3.5 h-3.5" />
              100 LEVELS
            </button>
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onHome();
              }}
              className="py-2.5 px-3 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-xs font-['Orbitron'] font-bold hover:text-rose-400 transition flex items-center justify-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5" />
              MAIN MENU
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
