import React from 'react';
import { PlayerSettings } from '../types/game';
import { X, Settings, Volume2, VolumeX, Music, Smartphone, RotateCcw } from 'lucide-react';
import { sounds } from '../audio/soundEngine';

interface SettingsModalProps {
  settings: PlayerSettings;
  onUpdateSettings: (newSettings: PlayerSettings) => void;
  onResetProgress: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onResetProgress,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/90 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-3xl flex flex-col overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-800 text-cyan-400">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-['Orbitron'] text-lg font-black text-white">GAME SETTINGS</h2>
              <p className="text-xs text-slate-400">Audio, controls, and challenge preferences</p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Sound FX Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-950/80 text-cyan-400 rounded-xl">
                {settings.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
              </div>
              <div>
                <div className="font-['Orbitron'] text-sm font-bold text-white">Sound Effects (SFX)</div>
                <div className="text-xs text-slate-400">Lasers, jumps, explosions, and UI clicks</div>
              </div>
            </div>
            <button
              onClick={() => {
                const newVal = !settings.soundEnabled;
                sounds.setMuted(!newVal);
                onUpdateSettings({ ...settings, soundEnabled: newVal });
              }}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                settings.soundEnabled ? 'bg-cyan-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Music Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-950/80 text-purple-400 rounded-xl">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <div className="font-['Orbitron'] text-sm font-bold text-white">Cyberpunk Music</div>
                <div className="text-xs text-slate-400">Atmospheric synthwave background tracks</div>
              </div>
            </div>
            <button
              onClick={() => {
                const newVal = !settings.musicEnabled;
                sounds.setMusicMuted(!newVal);
                onUpdateSettings({ ...settings, musicEnabled: newVal });
              }}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                settings.musicEnabled ? 'bg-purple-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.musicEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Mobile Controls Style */}
          <div className="p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span className="font-['Orbitron'] text-sm font-bold text-white">
                Mobile Controls Layout
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['touch', 'dpad', 'joystick'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    sounds.playClick();
                    onUpdateSettings({ ...settings, controlMode: mode });
                  }}
                  className={`py-2 px-3 rounded-xl border text-xs font-['Orbitron'] font-bold capitalize transition ${
                    settings.controlMode === mode
                      ? 'bg-cyan-500 text-black border-cyan-400'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Progress Button */}
          <div className="pt-2 border-t border-slate-850">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Are you sure you want to reset all game progress?')) {
                  sounds.playClick();
                  onResetProgress();
                }
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-red-950/40 hover:bg-red-950/70 text-red-400 border border-red-800/50 text-xs font-['Orbitron'] font-bold tracking-wider transition flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              RESET ALL 100 LEVELS PROGRESS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
