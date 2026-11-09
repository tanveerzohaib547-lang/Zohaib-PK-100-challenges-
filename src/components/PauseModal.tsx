import React from 'react';
import { GameDefinition, GameRunState } from '../types/game';
import { OfficialLogo } from './OfficialLogo';
import { Play, RotateCcw, Grid, Home } from 'lucide-react';
import { sounds } from '../audio/soundEngine';

interface PauseModalProps {
  game: GameDefinition;
  runState: GameRunState;
  onResume: () => void;
  onRestart: () => void;
  onSelectLevel: () => void;
  onHome: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  game,
  runState,
  onResume,
  onRestart,
  onSelectLevel,
  onHome,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-950 border-2 border-cyan-500/60 rounded-2xl p-6 shadow-[0_0_50px_rgba(6,182,212,0.3)] text-center relative overflow-hidden">
        {/* Subtle decorative energy lines */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-400 to-cyan-500" />

        <OfficialLogo size="sm" showTagline={false} className="mb-3" />

        <div className="inline-block px-3 py-1 bg-cyan-950/80 border border-cyan-800 text-cyan-300 font-['Orbitron'] text-xs font-bold rounded-full mb-2">
          STAGE {game.stageId} · LEVEL {game.id.toString().padStart(2, '0')}
        </div>

        <h2 className="font-['Orbitron'] text-xl font-black text-white tracking-wide mb-1">
          {game.title}
        </h2>
        <p className="text-xs text-slate-400 mb-6 font-mono">
          CHALLENGE PAUSED · RESUME WHEN READY
        </p>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Current Score</div>
            <div className="font-['Orbitron'] text-lg font-black text-amber-400 tabular-nums">
              {Math.round(runState.score)}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Lives Left</div>
            <div className="font-['Orbitron'] text-lg font-black text-rose-400 tabular-nums">
              {runState.lives} / {runState.maxLives}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            data-start="true"
            onClick={() => {
              sounds.playClick();
              onResume();
            }}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-['Orbitron'] font-black text-sm tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            RESUME CHALLENGE
          </button>

          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onRestart();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700 font-['Orbitron'] font-bold text-xs tracking-wider transition flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            RESTART LEVEL
          </button>

          <div className="grid grid-cols-2 gap-2 mt-1">
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onSelectLevel();
              }}
              className="py-2 px-3 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-xs font-['Orbitron'] font-semibold hover:text-white transition flex items-center justify-center gap-1.5"
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
              className="py-2 px-3 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-xs font-['Orbitron'] font-semibold hover:text-rose-400 transition flex items-center justify-center gap-1.5"
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
