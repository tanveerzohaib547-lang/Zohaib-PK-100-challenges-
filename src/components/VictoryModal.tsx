import React, { useEffect } from 'react';
import { GameDefinition, GameRunState } from '../types/game';
import { OfficialLogo } from './OfficialLogo';
import { Trophy, Star, ArrowRight, RotateCcw, Grid, Home, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../audio/soundEngine';

interface VictoryModalProps {
  game: GameDefinition;
  runState: GameRunState;
  onNextLevel: () => void;
  onRestart: () => void;
  onSelectLevel: () => void;
  onHome: () => void;
  hasNextLevel: boolean;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  game,
  runState,
  onNextLevel,
  onRestart,
  onSelectLevel,
  onHome,
  hasNextLevel,
}) => {
  useEffect(() => {
    sounds.playVictory();
    // Colorful victory confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#f59e0b', '#ef4444', '#10b981', '#fbbf24'],
      });
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
      <div className="w-full max-w-md bg-slate-950 border-2 border-amber-500/80 rounded-2xl p-6 shadow-[0_0_60px_rgba(245,158,11,0.4)] text-center relative overflow-hidden">
        {/* Golden energy beam header */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />

        <OfficialLogo size="sm" showTagline={false} className="mb-2" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-950/80 border border-amber-600/60 text-amber-300 font-['Orbitron'] text-xs font-black rounded-full mb-3">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>VICTORY ACHIEVED · LEVEL {game.id}</span>
        </div>

        <h2 className="font-['Orbitron'] text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 tracking-wide mb-1">
          {game.title}
        </h2>
        <p className="text-xs text-slate-300 mb-4 font-mono">
          CHALLENGE COMPLETED SUCCESSFULLY!
        </p>

        {/* 3-Star Rating Animation */}
        <div className="flex items-center justify-center gap-3 my-4">
          {[1, 2, 3].map((starIdx) => {
            const isEarned = starIdx <= runState.starsAwarded;
            return (
              <div
                key={starIdx}
                className={`p-2 rounded-xl border transition-all duration-300 transform ${
                  isEarned
                    ? 'bg-amber-500/20 border-amber-400 text-amber-400 scale-110 drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]'
                    : 'bg-slate-900 border-slate-800 text-slate-700 scale-95'
                }`}
              >
                <Star className={`w-8 h-8 ${isEarned ? 'fill-amber-400' : 'fill-transparent'}`} />
              </div>
            );
          })}
        </div>

        {/* Flawless Clear Badge if 0 lives lost */}
        {runState.lives === runState.maxLives && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/70 border border-red-500/60 rounded-full text-[11px] font-['Orbitron'] font-bold text-red-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>UNTOUCHABLE · FLAWLESS 0-DAMAGE CLEAR!</span>
          </div>
        )}

        {/* Performance Metrics */}
        <div className="grid grid-cols-3 gap-2 mb-6 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Final Score</div>
            <div className="font-['Orbitron'] text-base md:text-lg font-black text-amber-400 tabular-nums">
              {Math.round(runState.score)}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Clear Time</div>
            <div className="font-['Orbitron'] text-base md:text-lg font-black text-cyan-400 tabular-nums">
              {Math.round(runState.elapsedTime)}s
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Lives Left</div>
            <div className="font-['Orbitron'] text-base md:text-lg font-black text-rose-400 tabular-nums">
              {runState.lives} / {runState.maxLives}
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col gap-2.5">
          {hasNextLevel ? (
            <button
              type="button"
              data-start="true"
              onClick={() => {
                sounds.playClick();
                onNextLevel();
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white font-['Orbitron'] font-black text-sm tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.6)] hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2"
            >
              <span>NEXT MISSION: LEVEL {(game.id + 1).toString().padStart(2, '0')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              data-start="true"
              onClick={() => {
                sounds.playClick();
                onHome();
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-['Orbitron'] font-black text-sm tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.6)] hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2"
            >
              <span>CLAIM CHAMPIONSHIP TROPHY</span>
              <Trophy className="w-4 h-4" />
            </button>
          )}

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onRestart();
              }}
              className="py-2.5 px-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-xs font-['Orbitron'] font-bold hover:text-amber-400 transition flex items-center justify-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              REPLAY
            </button>
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onSelectLevel();
              }}
              className="py-2.5 px-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-xs font-['Orbitron'] font-bold hover:text-white transition flex items-center justify-center gap-1"
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
              className="py-2.5 px-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-xs font-['Orbitron'] font-bold hover:text-rose-400 transition flex items-center justify-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              MENU
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
