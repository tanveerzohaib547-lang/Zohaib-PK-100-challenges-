import React from 'react';
import { LevelProgress } from '../types/game';
import { calculatePlayerRank } from '../utils/rules';
import { OfficialLogo } from './OfficialLogo';
import { X, User, Trophy, Star, ShieldCheck, Zap, Award } from 'lucide-react';
import { sounds } from '../audio/soundEngine';

interface ProfileModalProps {
  progressMap: Record<number, LevelProgress>;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ progressMap, onClose }) => {
  const completedCount = Object.values(progressMap).filter((p) => p.completed).length;
  const totalStars = Object.values(progressMap).reduce((sum, p) => sum + p.stars, 0);
  const totalScore = Object.values(progressMap).reduce((sum, p) => sum + p.highScore, 0);
  const flawlessCount = Object.values(progressMap).filter(
    (p) => p.completed && p.noDeathClear
  ).length;

  const rankInfo = calculatePlayerRank(completedCount, totalStars);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/90 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-3xl flex flex-col overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-['Orbitron'] text-lg font-black text-white">
                PLAYER COMBAT DOSSIER
              </h2>
              <p className="text-xs text-slate-400">Official Zohaib PK Challenger Profile</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            aria-label="Close Profile Dossier"
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {/* Player Rank Hero Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950/60 via-slate-900 to-cyan-950/60 border border-cyan-500/30 flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center font-['Orbitron'] text-2xl font-black text-white shadow-[0_0_20px_rgba(245,158,11,0.5)]">
              {rankInfo.badge[0]}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-widest">
                  COMBAT DESIGNATION
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                  TIER {rankInfo.tier}/10
                </span>
              </div>
              <h3 className="font-['Orbitron'] text-xl font-black text-white">
                {rankInfo.rank}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {completedCount >= 100
                  ? 'Maximum possible rank attained! You have conquered the 100 Games Challenge.'
                  : `Next designation unlocks at ${rankInfo.nextThreshold} completed games.`}
              </p>
            </div>
          </div>

          {/* Core Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-center">
              <Trophy className="w-5 h-5 text-amber-400 mx-auto mb-1" />
              <div className="font-['Orbitron'] text-xl font-black text-white tabular-nums">
                {completedCount} <span className="text-xs text-slate-500">/100</span>
              </div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                Games Cleared
              </div>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-center">
              <Star className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
              <div className="font-['Orbitron'] text-xl font-black text-yellow-400 tabular-nums">
                {totalStars} <span className="text-xs text-slate-500">/300</span>
              </div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                Stars Earned
              </div>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-center">
              <Zap className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
              <div className="font-['Orbitron'] text-xl font-black text-cyan-400 tabular-nums">
                {totalScore.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                Total Score
              </div>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
              <div className="font-['Orbitron'] text-xl font-black text-emerald-400 tabular-nums">
                {flawlessCount}
              </div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                Flawless Clears
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
