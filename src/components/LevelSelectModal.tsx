import React, { useState } from 'react';
import { GameDefinition, LevelProgress } from '../types/game';
import { STAGES } from '../data/stages';
import { GAMES_CATALOG } from '../data/gamesCatalog';
import { OfficialLogo } from './OfficialLogo';
import { Star, Lock, Play, X, ChevronRight, Trophy } from 'lucide-react';
import { sounds } from '../audio/soundEngine';

interface LevelSelectModalProps {
  progressMap: Record<number, LevelProgress>;
  onSelectLevel: (game: GameDefinition) => void;
  onClose: () => void;
}

export const LevelSelectModal: React.FC<LevelSelectModalProps> = ({
  progressMap,
  onSelectLevel,
  onClose,
}) => {
  const [activeStageId, setActiveStageId] = useState<number>(1);

  const activeStage = STAGES.find((s) => s.id === activeStageId) || STAGES[0];
  const stageGames = GAMES_CATALOG.filter((g) => g.stageId === activeStageId);

  const totalCompleted = Object.values(progressMap).filter((p) => p.completed).length;
  const totalStars = Object.values(progressMap).reduce((sum, p) => sum + p.stars, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6 bg-black/90 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-5xl h-[92vh] bg-slate-950 border border-slate-800 rounded-3xl flex flex-col overflow-hidden shadow-2xl relative">
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <OfficialLogo size="sm" showTagline={false} />
            <div className="hidden sm:block">
              <span className="text-xs font-['Orbitron'] font-bold text-amber-400">
                100 MISSIONS VAULT
              </span>
              <div className="text-[11px] text-slate-400">
                COMPLETED: {totalCompleted}/100 · STARS: {totalStars}/300
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-300 font-['Orbitron'] text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{totalStars}</span>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              aria-label="Close Level Selection"
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 10 Stages Selector Tabs Bar */}
        <div className="flex overflow-x-auto gap-2 p-3 bg-slate-950 border-b border-slate-800/80 scrollbar-thin">
          {STAGES.map((stage) => {
            const isActive = stage.id === activeStageId;
            const stageCompletedCount = stageGames.filter(
              (g) => progressMap[g.id]?.completed
            ).length;

            return (
              <button
                key={stage.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveStageId(stage.id);
                }}
                className={`flex-shrink-0 px-3 py-2 rounded-xl border text-left transition ${
                  isActive
                    ? 'bg-gradient-to-r ' + stage.color + ' text-white border-white/40 shadow-lg scale-102'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-850 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-['Orbitron'] text-[10px] font-black opacity-80">
                    STAGE {stage.id.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[9px] px-1 py-0.2 rounded font-mono bg-black/40">
                    L{stage.levelRange[0]}-{stage.levelRange[1]}
                  </span>
                </div>
                <div className="font-['Orbitron'] text-xs font-bold truncate max-w-[150px]">
                  {stage.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Description Banner */}
        <div className="px-4 py-2.5 bg-slate-900/40 border-b border-slate-800/60 flex items-center justify-between">
          <div>
            <span className="font-['Orbitron'] text-xs font-black text-cyan-400 uppercase tracking-wider mr-2">
              STAGE {activeStage.id}: {activeStage.name}
            </span>
            <span className="text-xs text-slate-400">{activeStage.description}</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
            THEME: {activeStage.theme}
          </span>
        </div>

        {/* 10 Level Cards Grid */}
        <div className="flex-1 overflow-y-auto p-3 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {stageGames.map((game) => {
            const progress = progressMap[game.id] || {
              unlocked: game.id === 1,
              completed: false,
              stars: 0,
              highScore: 0,
            };
            const isUnlocked = progress.unlocked || game.id === 1;

            return (
              <div
                key={game.id}
                className={`relative flex flex-col justify-between p-3.5 rounded-2xl border transition-all duration-200 ${
                  isUnlocked
                    ? progress.completed
                      ? 'bg-slate-900/90 border-cyan-500/40 hover:border-cyan-400 shadow-md hover:shadow-cyan-500/10 hover:-translate-y-0.5'
                      : 'bg-slate-900/70 border-slate-700 hover:border-amber-400 shadow-sm hover:-translate-y-0.5'
                    : 'bg-slate-950/60 border-slate-850 opacity-60'
                }`}
              >
                <div>
                  {/* Card Top: Level # & Difficulty */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-['Orbitron'] text-xs font-black text-amber-400">
                      LVL {game.id.toString().padStart(2, '0')}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        game.difficulty === 'Impossible'
                          ? 'bg-purple-950 text-purple-300 border border-purple-800'
                          : game.difficulty === 'Legendary'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : game.difficulty === 'Nightmare'
                          ? 'bg-red-950 text-red-300 border border-red-800'
                          : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                      }`}
                    >
                      {game.difficulty}
                    </span>
                  </div>

                  {/* Game Name */}
                  <h3 className="font-['Orbitron'] text-sm font-bold text-slate-100 line-clamp-1 mb-1">
                    {game.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mb-3">
                    {game.description}
                  </p>
                </div>

                <div>
                  {/* Stars & High Score Display */}
                  <div className="flex items-center justify-between py-1.5 px-2 bg-black/40 rounded-lg mb-2.5">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3].map((s) => (
                        <Star
                          key={s}
                          className={`w-3 h-3 ${
                            s <= progress.stars
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-700 fill-transparent'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 tabular-nums">
                      {progress.highScore > 0 ? `${progress.highScore} PTS` : 'NO SCORE'}
                    </span>
                  </div>

                  {/* Play or Locked Button */}
                  {isUnlocked ? (
                    <button
                      onClick={() => {
                        sounds.playClick();
                        onSelectLevel(game);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-['Orbitron'] text-xs font-bold tracking-wider shadow-md active:scale-95 transition flex items-center justify-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{progress.completed ? 'PLAY AGAIN' : 'START GAME'}</span>
                    </button>
                  ) : (
                    <div className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 font-['Orbitron'] text-xs font-semibold flex items-center justify-center gap-1.5 select-none">
                      <Lock className="w-3.5 h-3.5" />
                      <span>LOCKED</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
