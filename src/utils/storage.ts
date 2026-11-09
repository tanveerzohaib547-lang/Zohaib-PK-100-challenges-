import { LevelProgress, PlayerSettings, Trophy, Achievement } from '../types/game';
import { INITIAL_TROPHIES, INITIAL_ACHIEVEMENTS } from '../data/trophies';
import { evaluateTrophies, evaluateAchievements } from './rules';

const STORAGE_KEY_PROGRESS = 'zpk_100_progress_v1';
const STORAGE_KEY_SETTINGS = 'zpk_100_settings_v1';
const STORAGE_KEY_TROPHIES = 'zpk_100_trophies_v1';
const STORAGE_KEY_ACHIEVEMENTS = 'zpk_100_achievements_v1';

export function getInitialProgress(): Record<number, LevelProgress> {
  const map: Record<number, LevelProgress> = {};
  for (let i = 1; i <= 100; i++) {
    map[i] = {
      unlocked: i === 1, // Level 1 unlocked by default
      completed: false,
      stars: 0,
      highScore: 0,
      bestTime: 0,
      attempts: 0,
      noDeathClear: false,
    };
  }
  return map;
}

export function loadProgress(): Record<number, LevelProgress> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Ensure all 100 levels exist
      const initial = getInitialProgress();
      return { ...initial, ...parsed };
    }
  } catch (e) {
    console.warn('Could not load progress from localStorage', e);
  }
  return getInitialProgress();
}

export function saveProgress(progress: Record<number, LevelProgress>) {
  try {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
  } catch (e) {
    console.warn('Could not save progress to localStorage', e);
  }
}

export function loadSettings(): PlayerSettings {
  const defaultSettings: PlayerSettings = {
    soundEnabled: true,
    musicEnabled: true,
    volume: 0.8,
    haptics: true,
    controlMode: 'touch',
  };
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (raw) {
      return { ...defaultSettings, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.warn('Could not load settings', e);
  }
  return defaultSettings;
}

export function saveSettings(settings: PlayerSettings) {
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.warn('Could not save settings', e);
  }
}

export function loadTrophies(progressMap: Record<number, LevelProgress>): Trophy[] {
  let trophies = INITIAL_TROPHIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TROPHIES);
    if (raw) {
      const parsed: Trophy[] = JSON.parse(raw);
      trophies = INITIAL_TROPHIES.map((t) => {
        const found = parsed.find((p) => p.id === t.id);
        return found ? { ...t, unlocked: found.unlocked, progress: found.progress } : t;
      });
    }
  } catch (e) {
    console.warn('Could not load trophies', e);
  }

  const completedCount = Object.values(progressMap).filter((p) => p.completed).length;
  const flawlessCount = Object.values(progressMap).filter((p) => p.completed && p.noDeathClear).length;
  const evaluated = evaluateTrophies(completedCount, flawlessCount, trophies);
  saveTrophies(evaluated);
  return evaluated;
}

export function saveTrophies(trophies: Trophy[]) {
  try {
    localStorage.setItem(STORAGE_KEY_TROPHIES, JSON.stringify(trophies));
  } catch (e) {
    console.warn('Could not save trophies', e);
  }
}

export function loadAchievements(progressMap: Record<number, LevelProgress>): Achievement[] {
  let achievements = INITIAL_ACHIEVEMENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ACHIEVEMENTS);
    if (raw) {
      const parsed: Achievement[] = JSON.parse(raw);
      achievements = INITIAL_ACHIEVEMENTS.map((a) => {
        const found = parsed.find((p) => p.id === a.id);
        return found ? { ...a, unlocked: found.unlocked, unlockedAt: found.unlockedAt } : a;
      });
    }
  } catch (e) {
    console.warn('Could not load achievements', e);
  }

  const evaluated = evaluateAchievements(progressMap, achievements);
  saveAchievements(evaluated);
  return evaluated;
}

export function saveAchievements(achievements: Achievement[]) {
  try {
    localStorage.setItem(STORAGE_KEY_ACHIEVEMENTS, JSON.stringify(achievements));
  } catch (e) {
    console.warn('Could not save achievements', e);
  }
}
