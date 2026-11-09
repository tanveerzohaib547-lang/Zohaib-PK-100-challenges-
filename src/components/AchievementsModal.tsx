import React from 'react';
import { Achievement } from '../types/game';
import { X, Award, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import { sounds } from '../audio/soundEngine';

interface AchievementsModalProps {
  achievements: Achievement[];
  onClose: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({ achievements, onClose }) => {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalXp = achievements
    .filter((a) => a.unlocked)
    .reduce((sum, a) => sum + a.xp, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/90 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-4xl max-h-[90vh] bg-slate-950 border border-slate-800 rounded-3xl flex flex-col overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-['Orbitron'] text-lg font-black text-white">
                OFFICIAL ACHIEVEMENTS
              </h2>
              <p className="text-xs text-slate-400">
                UNLOCKED: {unlockedCount} / {achievements.length} · EARNED XP: {totalXp} XP
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            aria-label="Close Achievements"
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-3.5 rounded-2xl border flex items-center gap-3.5 transition-all ${
                ach.unlocked
                  ? 'bg-slate-900/90 border-cyan-500/40 shadow-sm'
                  : 'bg-slate-950/50 border-slate-850 opacity-60'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  ach.unlocked
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-600 border border-slate-800'
                }`}
              >
                {ach.unlocked ? <CheckCircle2 className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="font-['Orbitron'] text-xs md:text-sm font-bold text-slate-100 truncate">
                    {ach.title}
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                    +{ach.xp} XP
                  </span>
                </div>
                <p className="text-xs text-slate-400">{ach.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
