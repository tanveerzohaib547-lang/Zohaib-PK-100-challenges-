import React from 'react';
import { OfficialLogo } from './OfficialLogo';
import { LevelProgress, PlayerSettings, Trophy } from '../types/game';
import { calculatePlayerRank } from '../utils/rules';
import {
  Play,
  Grid,
  Trophy as TrophyIcon,
  Award,
  User,
  Settings,
  HelpCircle,
  Info,
  Calendar,
  Flame,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { sounds } from '../audio/soundEngine';

interface MainMenuProps {
  progressMap: Record<number, LevelProgress>;
  trophies: Trophy[];
  settings: PlayerSettings;
  onPlayNow: () => void;
  onOpenLevelSelect: () => void;
  onOpenTrophyRoom: () => void;
  onOpenAchievements: () => void;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onOpenHowToPlay: () => void;
  onOpenAbout: () => void;
  onToggleSound: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  progressMap,
  trophies,
  settings,
  onPlayNow,
  onOpenLevelSelect,
  onOpenTrophyRoom,
  onOpenAchievements,
  onOpenProfile,
  onOpenSettings,
  onOpenHowToPlay,
  onOpenAbout,
  onToggleSound,
}) => {
  const completedCount = Object.values(progressMap).filter((p) => p.completed).length;
  const totalStars = Object.values(progressMap).reduce((sum, p) => sum + p.stars, 0);
  const totalScore = Object.values(progressMap).reduce((sum, p) => sum + p.highScore, 0);
  const unlockedTrophyCount = trophies.filter((t) => t.unlocked).length;

  // Next level to play is first incomplete level or level 1
  let currentLevel = 1;
  for (let i = 1; i <= 100; i++) {
    if (!progressMap[i]?.completed) {
      currentLevel = i;
      break;
    }
  }

  const rankInfo = calculatePlayerRank(completedCount, totalStars);
  const progressPercent = Math.round((completedCount / 100) * 100);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-4 md:p-8 bg-slate-950 text-white overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* Background Animated Cyber Ambiance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Glowing atmospheric energy orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      </div>

      {/* Top Header Bar */}
      <div className="relative z-10 w-full flex items-center justify-between max-w-6xl mx-auto">
        {/* Player Profile Quick Pill */}
        <button
          onClick={() => {
            sounds.playClick();
            onOpenProfile();
          }}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850 transition shadow-lg text-left"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center font-['Orbitron'] text-xs font-black text-white">
            {rankInfo.badge[0]}
          </div>
          <div>
            <div className="text-[10px] text-cyan-400 font-['Orbitron'] font-bold leading-tight">
              {rankInfo.rank}
            </div>
            <div className="text-[9px] text-slate-400 font-mono">
              LEVEL {currentLevel} · {completedCount}/100 CLEARED
            </div>
          </div>
        </button>

        {/* Audio Quick Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sounds.playClick();
              onToggleSound();
            }}
            aria-label="Toggle Sound"
            className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-slate-700 transition"
          >
            {settings.soundEnabled ? <Volume2 className="w-5 h-5 text-cyan-400" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              onOpenSettings();
            }}
            aria-label="Settings"
            className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Center Content Lockup */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto my-auto py-6">
        {/* Official 3D Logo Component */}
        <OfficialLogo size="hero" showTagline={true} className="mb-6 transform hover:scale-[1.02] transition-transform duration-300" />

        {/* Global Progress Bar */}
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 p-3 rounded-2xl mb-7 shadow-xl">
          <div className="flex justify-between items-center text-[11px] font-['Orbitron'] font-bold mb-1.5 px-1">
            <span className="text-slate-400">CHALLENGE PROGRESS</span>
            <span className="text-amber-400 tabular-nums">
              {completedCount} / 100 ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800/80">
            <div
              className="h-full bg-gradient-to-r from-red-500 via-amber-400 to-cyan-400 transition-all duration-700 rounded-full"
              style={{ width: `${Math.max(2, progressPercent)}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mt-2 px-1">
            <span>⭐ {totalStars} STARS</span>
            <span>🏆 {unlockedTrophyCount} TROPHIES</span>
            <span>⚡ {totalScore.toLocaleString()} PTS</span>
          </div>
        </div>

        {/* Primary Play CTA Button */}
        <div className="w-full max-w-sm mb-4">
          <button
            type="button"
            data-start="true"
            onClick={() => {
              sounds.playClick();
              onPlayNow();
            }}
            className="group relative w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-amber-500 to-cyan-500 text-white font-['Orbitron'] font-black text-lg tracking-widest shadow-[0_0_35px_rgba(239,68,68,0.5)] hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] active:scale-95 transition-all duration-200 overflow-hidden flex items-center justify-center gap-3"
          >
            {/* Shimmer sweep effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
            <Play className="w-6 h-6 fill-current" />
            <span>PLAY NOW · LVL {currentLevel.toString().padStart(2, '0')}</span>
          </button>
          <div className="text-[11px] text-slate-400 font-mono mt-1.5">
            PRESS <span className="text-amber-300 font-bold">ENTER</span> OR <span className="text-cyan-300 font-bold">SPACE</span> TO LAUNCH
          </div>
        </div>

        {/* Secondary Menu Buttons Grid */}
        <div className="w-full max-w-xl grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => {
              sounds.playClick();
              onOpenLevelSelect();
            }}
            className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 text-slate-200 text-xs font-['Orbitron'] font-bold transition flex flex-col items-center gap-1.5 shadow-md group"
          >
            <Grid className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>100 GAMES</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onOpenTrophyRoom();
            }}
            className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 text-slate-200 text-xs font-['Orbitron'] font-bold transition flex flex-col items-center gap-1.5 shadow-md group"
          >
            <TrophyIcon className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>TROPHY ROOM</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onOpenAchievements();
            }}
            className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-purple-500/50 text-slate-200 text-xs font-['Orbitron'] font-bold transition flex flex-col items-center gap-1.5 shadow-md group"
          >
            <Award className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
            <span>ACHIEVEMENTS</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onOpenProfile();
            }}
            className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 text-slate-200 text-xs font-['Orbitron'] font-bold transition flex flex-col items-center gap-1.5 shadow-md group"
          >
            <User className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>PROFILE</span>
          </button>
        </div>

        {/* Tertiary Utility Links */}
        <div className="flex items-center gap-4 mt-5 text-xs text-slate-400 font-['Orbitron']">
          <button
            onClick={() => {
              sounds.playClick();
              onOpenHowToPlay();
            }}
            className="hover:text-cyan-400 flex items-center gap-1 transition"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            HOW TO PLAY
          </button>
          <span>·</span>
          <button
            onClick={() => {
              sounds.playClick();
              onOpenAbout();
            }}
            className="hover:text-amber-400 flex items-center gap-1 transition"
          >
            <Info className="w-3.5 h-3.5" />
            ABOUT BRAND
          </button>
        </div>
      </div>

      {/* Bottom Footer Control Hint */}
      <div className="relative z-10 w-full text-center text-[10px] md:text-xs text-slate-500 font-mono flex items-center justify-center gap-2">
        <span>WASD / D-Pad: Move</span>
        <span>·</span>
        <span>Space: Jump / Action</span>
        <span>·</span>
        <span>Esc / P: Pause</span>
        <span>·</span>
        <span className="text-slate-400">© ZOHAIB PK OFFICIAL</span>
      </div>
    </div>
  );
};
