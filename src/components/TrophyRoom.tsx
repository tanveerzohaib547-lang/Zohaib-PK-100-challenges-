import React from 'react';
import { Trophy } from '../types/game';
import { OfficialLogo } from './OfficialLogo';
import { X, Trophy as TrophyIcon, Award, Shield, Star, Lock } from 'lucide-react';
import { sounds } from '../audio/soundEngine';

interface TrophyRoomProps {
  trophies: Trophy[];
  onClose: () => void;
}

export const TrophyRoom: React.FC<TrophyRoomProps> = ({ trophies, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/90 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-4xl max-h-[90vh] bg-slate-950 border border-slate-800 rounded-3xl flex flex-col overflow-hidden shadow-2xl">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <TrophyIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-['Orbitron'] text-lg font-black text-white">
                HALL OF LEGENDARY TROPHIES
              </h2>
              <p className="text-xs text-slate-400">
                Official awards of Zohaib PK Official 100 Games Challenge
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            aria-label="Close Trophy Room"
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Trophies Grid */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {trophies.map((trophy) => {
            const pct = Math.round((trophy.progress / trophy.maxProgress) * 100);

            return (
              <div
                key={trophy.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                  trophy.unlocked
                    ? 'bg-slate-900/90 border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                    : 'bg-slate-950/60 border-slate-850 opacity-70'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    trophy.unlocked
                      ? trophy.tier === 'legendary'
                        ? 'bg-gradient-to-br from-amber-400 to-red-600 text-white shadow-lg'
                        : trophy.tier === 'diamond'
                        ? 'bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg'
                        : trophy.tier === 'gold'
                        ? 'bg-gradient-to-br from-yellow-300 to-amber-500 text-slate-950 shadow-md'
                        : trophy.tier === 'silver'
                        ? 'bg-gradient-to-br from-slate-200 to-slate-400 text-slate-900 shadow-md'
                        : 'bg-gradient-to-br from-amber-700 to-stone-800 text-amber-200'
                      : 'bg-slate-900 text-slate-600 border border-slate-800'
                  }`}
                >
                  {trophy.unlocked ? <TrophyIcon className="w-7 h-7" /> : <Lock className="w-6 h-6" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-['Orbitron'] text-sm font-bold text-slate-100 truncate">
                      {trophy.title}
                    </h3>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                        trophy.unlocked
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {trophy.tier}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-3">{trophy.description}</p>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span>PROGRESS</span>
                      <span>
                        {trophy.progress} / {trophy.maxProgress} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          trophy.unlocked
                            ? 'bg-gradient-to-r from-amber-400 to-yellow-300'
                            : 'bg-cyan-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
