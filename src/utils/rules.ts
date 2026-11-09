import { Trophy, Achievement, LevelProgress } from '../types/game';

export interface StarCalculationResult {
  stars: number;
  isFlawless: boolean;
  score: number;
}

export function calculateScore(
  baseScore: number,
  timeRemaining: number = 0,
  livesLeft: number = 1,
  maxLives: number = 3
): number {
  const timeBonus = Math.max(0, Math.floor(timeRemaining * 50));
  const lifeBonus = Math.floor((livesLeft / Math.max(1, maxLives)) * 500);
  return baseScore + timeBonus + lifeBonus;
}

export function calculateStars(
  score: number,
  targetScore: number = 1000,
  livesLeft: number = 1,
  maxLives: number = 3,
  timeRemaining: number = 0,
  timeLimit: number = 30
): StarCalculationResult {
  const isFlawless = livesLeft === maxLives;
  let stars = 1; // 1 star for clearing the objective

  // 2 stars for good score or good remaining time
  const timeRatio = timeLimit > 0 ? timeRemaining / timeLimit : 0.5;
  if (score >= targetScore * 0.8 || timeRatio >= 0.3 || isFlawless) {
    stars = 2;
  }

  // 3 stars for excellent performance (high score + good lives or flawless)
  if ((score >= targetScore && (livesLeft >= 2 || isFlawless)) || (isFlawless && timeRatio >= 0.2)) {
    stars = 3;
  }

  return {
    stars: Math.min(3, Math.max(1, stars)),
    isFlawless,
    score,
  };
}

export function calculatePlayerRank(completedCount: number, totalStars: number): {
  rank: string;
  badge: string;
  tier: number;
  nextThreshold: number;
} {
  if (completedCount >= 100) {
    return { rank: 'ZOHAIB PK SUPREME OVERLORD', badge: 'LEGEND', tier: 10, nextThreshold: 100 };
  }
  if (completedCount >= 90) {
    return { rank: 'TITAN OF THE APOCALYPSE', badge: 'TITAN', tier: 9, nextThreshold: 100 };
  }
  if (completedCount >= 75) {
    return { rank: 'NIGHTMARE CONQUEROR', badge: 'MASTER', tier: 8, nextThreshold: 90 };
  }
  if (completedCount >= 60) {
    return { rank: 'GRAND STRATEGIST', badge: 'ELITE', tier: 7, nextThreshold: 75 };
  }
  if (completedCount >= 50) {
    return { rank: 'APEX COMMANDER', badge: 'APEX', tier: 6, nextThreshold: 60 };
  }
  if (completedCount >= 40) {
    return { rank: 'MASTER INFILTRATOR', badge: 'PRO', tier: 5, nextThreshold: 50 };
  }
  if (completedCount >= 30) {
    return { rank: 'KINETIC ENGINEER', badge: 'EXPERT', tier: 4, nextThreshold: 40 };
  }
  if (completedCount >= 20) {
    return { rank: 'REFLEX WARRIOR', badge: 'VETERAN', tier: 3, nextThreshold: 30 };
  }
  if (completedCount >= 10) {
    return { rank: 'LOGIC SPECIALIST', badge: 'ADEPT', tier: 2, nextThreshold: 20 };
  }
  if (completedCount >= 1) {
    return { rank: 'SURVIVAL RECRUIT', badge: 'NOVICE', tier: 1, nextThreshold: 10 };
  }
  return { rank: 'NEW CHALLENGER', badge: 'RECRUIT', tier: 0, nextThreshold: 1 };
}

export function evaluateTrophies(
  completedCount: number,
  flawlessCount: number,
  trophies: Trophy[]
): Trophy[] {
  return trophies.map((trophy) => {
    let progress = 0;
    if (trophy.id === 'bronze') progress = Math.min(10, completedCount);
    else if (trophy.id === 'silver') progress = Math.min(25, completedCount);
    else if (trophy.id === 'gold') progress = Math.min(50, completedCount);
    else if (trophy.id === 'diamond') progress = Math.min(75, completedCount);
    else if (trophy.id === 'legendary') progress = Math.min(100, completedCount);
    else if (trophy.id === 'perfect_medal') progress = Math.min(30, flawlessCount);
    else if (trophy.id === 'champion_award') progress = Math.min(100, completedCount);

    return {
      ...trophy,
      progress,
      unlocked: progress >= trophy.maxProgress,
    };
  });
}

export function evaluateAchievements(
  progressMap: Record<number, LevelProgress>,
  achievements: Achievement[]
): Achievement[] {
  const completedIds = Object.entries(progressMap)
    .filter(([_, p]) => p.completed)
    .map(([id]) => Number(id));

  const flawlessCount = Object.values(progressMap).filter((p) => p.completed && p.noDeathClear).length;

  return achievements.map((ach) => {
    let unlocked = ach.unlocked;

    if (ach.id === 'first_victory' && completedIds.includes(1)) unlocked = true;
    if (ach.id === 'survival_master' && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].every((id) => completedIds.includes(id))) unlocked = true;
    if (ach.id === 'brain_genius' && [11, 12, 13, 14, 15, 16, 17, 18, 19, 20].every((id) => completedIds.includes(id))) unlocked = true;
    if (ach.id === 'reflex_god' && [21, 22, 23, 24, 25, 26, 27, 28, 29, 30].every((id) => completedIds.includes(id))) unlocked = true;
    if (ach.id === 'master_engineer' && [31, 32, 33, 34, 35, 36, 37, 38, 39, 40].every((id) => completedIds.includes(id))) unlocked = true;
    if (ach.id === 'escape_artist' && [41, 42, 43, 44, 45, 46, 47, 48, 49, 50].every((id) => completedIds.includes(id))) unlocked = true;
    if (ach.id === 'apex_pilot' && [51, 52, 53, 54, 55, 56, 57, 58, 59, 60].every((id) => completedIds.includes(id))) unlocked = true;
    if (ach.id === 'grand_general' && [61, 62, 63, 64, 65, 66, 67, 68, 69, 70].every((id) => completedIds.includes(id))) unlocked = true;
    if (ach.id === 'nightmare_slayer' && [71, 72, 73, 74, 75, 76, 77, 78, 79, 80].every((id) => completedIds.includes(id))) unlocked = true;
    if (ach.id === 'impossible_defier' && [81, 82, 83, 84, 85, 86, 87, 88, 89, 90].every((id) => completedIds.includes(id))) unlocked = true;
    if (ach.id === 'boss_slayer' && completedIds.includes(100)) unlocked = true;
    if (ach.id === 'flawless_run' && flawlessCount >= 10) unlocked = true;

    return {
      ...ach,
      unlocked,
    };
  });
}
