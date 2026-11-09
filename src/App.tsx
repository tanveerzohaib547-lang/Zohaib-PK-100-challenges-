/**
 * ZOHAIB PK OFFICIAL – ULTIMATE LEGENDARY 100 GAMES CHALLENGE
 * 100 Games. 100 Levels. No Easy Victories.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { GAMES_CATALOG } from './data/gamesCatalog';
import { GameDefinition, LevelProgress, PlayerSettings, Trophy, Achievement } from './types/game';
import {
  loadProgress,
  saveProgress,
  loadSettings,
  saveSettings,
  loadTrophies,
  loadAchievements,
} from './utils/storage';
import { MainMenu } from './components/MainMenu';
import { GameView } from './components/GameView';
import { LevelSelectModal } from './components/LevelSelectModal';
import { TrophyRoom } from './components/TrophyRoom';
import { AchievementsModal } from './components/AchievementsModal';
import { ProfileModal } from './components/ProfileModal';
import { SettingsModal } from './components/SettingsModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { AboutModal } from './components/AboutModal';
import { sounds } from './audio/soundEngine';

export default function App() {
  const [progressMap, setProgressMap] = useState<Record<number, LevelProgress>>(() => loadProgress());
  const [settings, setSettings] = useState<PlayerSettings>(() => loadSettings());
  const [trophies, setTrophies] = useState<Trophy[]>(() => loadTrophies(progressMap));
  const [achievements, setAchievements] = useState<Achievement[]>(() => loadAchievements(progressMap));

  const [activeView, setActiveView] = useState<
    'menu' | 'game' | 'levelSelect' | 'trophyRoom' | 'achievements' | 'profile' | 'settings' | 'howToPlay' | 'about'
  >('menu');

  const [currentLevelId, setCurrentLevelId] = useState<number>(1);

  // Initialize sound settings
  useEffect(() => {
    sounds.setMuted(!settings.soundEnabled);
    sounds.setMusicMuted(!settings.musicEnabled);
  }, [settings]);

  // Support ?autostart=1 or ?level=X query param for ultra mode / testing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const autostart = params.get('autostart');
    const levelParam = params.get('level');

    if (levelParam) {
      const parsedLevel = parseInt(levelParam, 10);
      if (parsedLevel >= 1 && parsedLevel <= 100) {
        setCurrentLevelId(parsedLevel);
        setActiveView('game');
        return;
      }
    }

    if (autostart === '1') {
      setActiveView('game');
    }
  }, []);

  // Sync document.body.dataset.state for ultra mode
  useEffect(() => {
    if (activeView === 'menu') {
      document.body.dataset.state = 'title';
    } else if (activeView === 'game') {
      document.body.dataset.state = 'playing';
    }
  }, [activeView]);

  // Keyboard shortcut to start playing from title screen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeView === 'menu' && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        // Start next incomplete level
        handlePlayNow();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeView, progressMap]);

  // Determine next level to play
  const handlePlayNow = useCallback(() => {
    let nextLvl = 1;
    for (let i = 1; i <= 100; i++) {
      if (!progressMap[i]?.completed) {
        nextLvl = i;
        break;
      }
    }
    setCurrentLevelId(nextLvl);
    setActiveView('game');
  }, [progressMap]);

  // Level Complete Handler
  const handleLevelComplete = useCallback(
    (levelId: number, score: number, stars: number, clearTime: number, isFlawless: boolean) => {
      setProgressMap((prev) => {
        const current = prev[levelId] || {
          unlocked: true,
          completed: false,
          stars: 0,
          highScore: 0,
          bestTime: 0,
          attempts: 0,
          noDeathClear: false,
        };

        const updated: LevelProgress = {
          unlocked: true,
          completed: true,
          stars: Math.max(current.stars, stars),
          highScore: Math.max(current.highScore, score),
          bestTime: current.bestTime > 0 ? Math.min(current.bestTime, clearTime) : clearTime,
          attempts: current.attempts + 1,
          noDeathClear: current.noDeathClear || isFlawless,
        };

        const newMap = { ...prev, [levelId]: updated };

        // Unlock next level if exists
        if (levelId < 100) {
          const nextLvl = newMap[levelId + 1] || {
            unlocked: true,
            completed: false,
            stars: 0,
            highScore: 0,
            bestTime: 0,
            attempts: 0,
            noDeathClear: false,
          };
          newMap[levelId + 1] = { ...nextLvl, unlocked: true };
        }

        saveProgress(newMap);

        // Update trophies and achievements
        const newTrophies = loadTrophies(newMap);
        const newAchievements = loadAchievements(newMap);
        setTrophies(newTrophies);
        setAchievements(newAchievements);

        return newMap;
      });
    },
    []
  );

  const handleNextLevel = useCallback(() => {
    if (currentLevelId < 100) {
      setCurrentLevelId((prev) => prev + 1);
      setActiveView('game');
    } else {
      setActiveView('trophyRoom');
    }
  }, [currentLevelId]);

  const handleSelectLevel = useCallback((game: GameDefinition) => {
    setCurrentLevelId(game.id);
    setActiveView('game');
  }, []);

  const handleToggleSound = useCallback(() => {
    setSettings((prev) => {
      const updated = { ...prev, soundEnabled: !prev.soundEnabled };
      saveSettings(updated);
      sounds.setMuted(!updated.soundEnabled);
      return updated;
    });
  }, []);

  const handleUpdateSettings = useCallback((newSettings: PlayerSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  }, []);

  const handleResetProgress = useCallback(() => {
    localStorage.clear();
    const fresh = loadProgress();
    setProgressMap(fresh);
    setTrophies(loadTrophies(fresh));
    setAchievements(loadAchievements(fresh));
    setCurrentLevelId(1);
    setActiveView('menu');
  }, []);

  const currentGame = GAMES_CATALOG.find((g) => g.id === currentLevelId) || GAMES_CATALOG[0];

  return (
    <div className="w-screen h-screen bg-black overflow-hidden font-sans select-none text-white">
      {/* Active Main View */}
      {activeView === 'game' ? (
        <GameView
          key={currentLevelId}
          game={currentGame}
          soundEnabled={settings.soundEnabled}
          onToggleSound={handleToggleSound}
          onLevelComplete={handleLevelComplete}
          onNextLevel={handleNextLevel}
          onSelectLevel={() => setActiveView('levelSelect')}
          onHome={() => setActiveView('menu')}
          hasNextLevel={currentLevelId < 100}
        />
      ) : (
        <MainMenu
          progressMap={progressMap}
          trophies={trophies}
          settings={settings}
          onPlayNow={handlePlayNow}
          onOpenLevelSelect={() => setActiveView('levelSelect')}
          onOpenTrophyRoom={() => setActiveView('trophyRoom')}
          onOpenAchievements={() => setActiveView('achievements')}
          onOpenProfile={() => setActiveView('profile')}
          onOpenSettings={() => setActiveView('settings')}
          onOpenHowToPlay={() => setActiveView('howToPlay')}
          onOpenAbout={() => setActiveView('about')}
          onToggleSound={handleToggleSound}
        />
      )}

      {/* Navigation Modals */}
      {activeView === 'levelSelect' && (
        <LevelSelectModal
          progressMap={progressMap}
          onSelectLevel={handleSelectLevel}
          onClose={() => setActiveView('menu')}
        />
      )}

      {activeView === 'trophyRoom' && (
        <TrophyRoom
          trophies={trophies}
          onClose={() => setActiveView('menu')}
        />
      )}

      {activeView === 'achievements' && (
        <AchievementsModal
          achievements={achievements}
          onClose={() => setActiveView('menu')}
        />
      )}

      {activeView === 'profile' && (
        <ProfileModal
          progressMap={progressMap}
          onClose={() => setActiveView('menu')}
        />
      )}

      {activeView === 'settings' && (
        <SettingsModal
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          onResetProgress={handleResetProgress}
          onClose={() => setActiveView('menu')}
        />
      )}

      {activeView === 'howToPlay' && (
        <HowToPlayModal onClose={() => setActiveView('menu')} />
      )}

      {activeView === 'about' && (
        <AboutModal onClose={() => setActiveView('menu')} />
      )}
    </div>
  );
}
