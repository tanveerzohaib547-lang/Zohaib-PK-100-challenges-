import React from 'react';
import { GameDefinition, GameRunState, InputState } from '../types/game';
import { Volume2, VolumeX, Pause, RotateCcw, Home, Info, Heart, Clock, Award } from 'lucide-react';
import { sounds } from '../audio/soundEngine';

interface GameHUDProps {
  game: GameDefinition;
  runState: GameRunState;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onPause: () => void;
  onRestart: () => void;
  onHome: () => void;
  onTriggerActionA: () => void;
  onTriggerActionB?: () => void;
  onDirectionInput: (dir: 'left' | 'right' | 'up' | 'down', active: boolean) => void;
  inputState: InputState;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  game,
  runState,
  soundEnabled,
  onToggleSound,
  onPause,
  onRestart,
  onHome,
  onTriggerActionA,
  onTriggerActionB,
  onDirectionInput,
  inputState,
}) => {
  const [showInstructions, setShowInstructions] = React.useState(false);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-2 md:p-4 select-none">
      {/* TOP BAR CLUSTER */}
      <div className="w-full flex items-start justify-between gap-2">
        {/* Left: Level Info & Brand Tag */}
        <div className="pointer-events-auto flex items-center gap-2 bg-slate-950/80 border border-slate-800/80 px-2.5 py-1.5 rounded-lg shadow-lg">
          {/* Mini ZP Emblem */}
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-red-600 to-cyan-600 flex items-center justify-center font-['Orbitron'] text-[11px] font-black text-white shadow-inner">
            ZP
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-['Orbitron'] text-xs font-black text-amber-400">
                LVL {game.id.toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider bg-rose-950/60 text-rose-400 border border-rose-800/50">
                {game.difficulty}
              </span>
            </div>
            <h1 className="font-['Orbitron'] text-xs md:text-sm font-bold text-slate-100 truncate max-w-[140px] md:max-w-[220px]">
              {game.title}
            </h1>
          </div>
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              setShowInstructions(!showInstructions);
            }}
            aria-label="Game Instructions"
            className="p-1 text-slate-400 hover:text-cyan-400 transition"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Objective & Timer */}
        <div className="flex flex-col items-center">
          {game.timeLimit !== undefined && (
            <div
              className={`pointer-events-auto flex items-center gap-1.5 px-3 py-1 rounded-full border shadow-md font-['Orbitron'] font-black tabular-nums transition-colors ${
                runState.timeRemaining <= 5
                  ? 'bg-red-950/90 border-red-500 text-red-400 animate-pulse'
                  : 'bg-slate-950/80 border-slate-800 text-cyan-400'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span className="text-sm md:text-base">
                {Math.max(0, Math.ceil(runState.timeRemaining))}s
              </span>
            </div>
          )}
          {runState.customStatus && (
            <div className="mt-1 px-2.5 py-0.5 bg-black/75 rounded text-[11px] font-['Orbitron'] text-amber-300 font-semibold border border-amber-500/40">
              {runState.customStatus}
            </div>
          )}
        </div>

        {/* Right: Score, Lives & Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Score & Lives Cluster */}
          <div className="bg-slate-950/80 border border-slate-800/80 px-2.5 py-1.5 rounded-lg flex flex-col items-end shadow-lg">
            <div className="flex items-center gap-1 font-['Orbitron'] text-xs md:text-sm font-extrabold text-white tabular-nums">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{Math.round(runState.score)}</span>
            </div>
            {/* Lives Pips */}
            <div className="flex items-center gap-1 mt-0.5">
              {Array.from({ length: Math.min(6, runState.maxLives) }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-3 h-3 ${
                    i < runState.lives
                      ? 'fill-red-500 text-red-500 filter drop-shadow-[0_0_4px_rgba(239,68,68,0.7)]'
                      : 'text-slate-600 fill-transparent'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Quick Actions Cluster */}
          <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800/80 p-1 rounded-lg shadow-lg">
            <button
              type="button"
              onClick={onToggleSound}
              aria-label="Toggle Sound"
              className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
            <button
              type="button"
              onClick={onRestart}
              aria-label="Restart Level"
              className="p-1.5 rounded text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onPause}
              aria-label="Pause Game"
              className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <Pause className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onHome}
              aria-label="Return to Main Menu"
              className="p-1.5 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
            >
              <Home className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* EXPANDABLE INSTRUCTIONS OVERLAY BANNER */}
      {showInstructions && (
        <div className="pointer-events-auto self-center max-w-md w-full bg-slate-950/95 border border-cyan-500/40 p-3 rounded-xl shadow-2xl text-slate-200 mt-2 animate-in fade-in zoom-in-95">
          <div className="flex justify-between items-center mb-1">
            <span className="font-['Orbitron'] text-xs font-bold text-cyan-400 uppercase tracking-wider">
              {game.title} · MISSION INTEL
            </span>
            <button
              onClick={() => setShowInstructions(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-slate-300 mb-2">{game.description}</p>
          <div className="text-[11px] bg-cyan-950/40 p-2 rounded border border-cyan-800/40 text-cyan-200">
            <strong>OBJECTIVE:</strong> {game.objective}
          </div>
          <div className="text-[11px] text-amber-300 mt-1.5 flex items-center gap-1 font-mono">
            <span>🎮 {game.controlsHint}</span>
          </div>
        </div>
      )}

      {/* BOTTOM MOBILE TOUCH CONTROLS (Only visible on touch devices or smaller viewports) */}
      <div className="w-full flex items-end justify-between px-2 pb-2">
        {/* D-Pad Controls (Left side) */}
        {(game.controlType === 'platformer' ||
          game.controlType === 'dpad' ||
          game.controlType === 'steer' ||
          game.controlType === 'hybrid') && (
          <div className="pointer-events-auto grid grid-cols-3 gap-1.5 p-2 bg-slate-950/80 border border-slate-800/70 rounded-2xl shadow-2xl">
            <div />
            <button
              type="button"
              onPointerDown={() => onDirectionInput('up', true)}
              onPointerUp={() => onDirectionInput('up', false)}
              onPointerLeave={() => onDirectionInput('up', false)}
              className={`w-11 h-11 rounded-lg flex items-center justify-center font-['Orbitron'] font-bold text-sm border transition active:scale-95 ${
                inputState.up ? 'bg-cyan-500 text-black border-cyan-300' : 'bg-slate-800/90 text-cyan-400 border-slate-700'
              }`}
            >
              ▲
            </button>
            <div />

            <button
              type="button"
              onPointerDown={() => onDirectionInput('left', true)}
              onPointerUp={() => onDirectionInput('left', false)}
              onPointerLeave={() => onDirectionInput('left', false)}
              className={`w-11 h-11 rounded-lg flex items-center justify-center font-['Orbitron'] font-bold text-sm border transition active:scale-95 ${
                inputState.left ? 'bg-cyan-500 text-black border-cyan-300' : 'bg-slate-800/90 text-cyan-400 border-slate-700'
              }`}
            >
              ◀
            </button>
            <button
              type="button"
              onPointerDown={() => onDirectionInput('down', true)}
              onPointerUp={() => onDirectionInput('down', false)}
              onPointerLeave={() => onDirectionInput('down', false)}
              className={`w-11 h-11 rounded-lg flex items-center justify-center font-['Orbitron'] font-bold text-sm border transition active:scale-95 ${
                inputState.down ? 'bg-cyan-500 text-black border-cyan-300' : 'bg-slate-800/90 text-cyan-400 border-slate-700'
              }`}
            >
              ▼
            </button>
            <button
              type="button"
              onPointerDown={() => onDirectionInput('right', true)}
              onPointerUp={() => onDirectionInput('right', false)}
              onPointerLeave={() => onDirectionInput('right', false)}
              className={`w-11 h-11 rounded-lg flex items-center justify-center font-['Orbitron'] font-bold text-sm border transition active:scale-95 ${
                inputState.right ? 'bg-cyan-500 text-black border-cyan-300' : 'bg-slate-800/90 text-cyan-400 border-slate-700'
              }`}
            >
              ▶
            </button>
          </div>
        )}

        {/* Center Control Hint for Desktop Keyboard */}
        <div className="hidden md:flex flex-col items-center bg-black/60 px-3 py-1 rounded border border-slate-800/60">
          <span className="font-mono text-[11px] text-slate-400 tracking-wider">
            {game.controlsHint} · [P] Pause · [R] Restart · [M] Mute
          </span>
        </div>

        {/* Action Buttons (Right side) */}
        <div className="pointer-events-auto flex items-center gap-2">
          {onTriggerActionB && (
            <button
              type="button"
              onPointerDown={() => {
                sounds.playClick();
                onTriggerActionB();
              }}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 to-red-600 text-white font-['Orbitron'] font-black text-xs border-2 border-amber-400/80 shadow-[0_0_15px_rgba(245,158,11,0.5)] active:scale-90 transition flex flex-col items-center justify-center"
            >
              <span>ACTION</span>
              <span className="text-[9px] opacity-75">B</span>
            </button>
          )}

          <button
            type="button"
            onPointerDown={() => {
              sounds.playJump();
              onTriggerActionA();
            }}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-['Orbitron'] font-black text-sm border-2 border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.6)] active:scale-90 transition flex flex-col items-center justify-center"
          >
            <span>{game.controlType === 'platformer' ? 'JUMP' : game.controlType === 'tap' ? 'TAP' : 'FIRE'}</span>
            <span className="text-[10px] opacity-80">A</span>
          </button>
        </div>
      </div>
    </div>
  );
};
