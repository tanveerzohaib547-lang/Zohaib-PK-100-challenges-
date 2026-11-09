import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateScore, calculateStars, calculatePlayerRank, evaluateTrophies, evaluateAchievements } from './rules';
import { GAMES_CATALOG } from '../data/gamesCatalog';
import { INITIAL_TROPHIES, INITIAL_ACHIEVEMENTS } from '../data/trophies';
import { LevelProgress } from '../types/game';

test('100 games catalog integrity: exactly 100 unique games', () => {
  assert.equal(GAMES_CATALOG.length, 100, 'Catalog must contain exactly 100 games');
  const ids = new Set(GAMES_CATALOG.map((g) => g.id));
  assert.equal(ids.size, 100, 'All 100 games must have unique IDs from 1 to 100');

  // Verify all 10 stages each have 10 games
  for (let stage = 1; stage <= 10; stage++) {
    const stageGames = GAMES_CATALOG.filter((g) => g.stageId === stage);
    assert.equal(stageGames.length, 10, `Stage ${stage} must have exactly 10 games`);
  }
});

test('calculateScore awards bonus for remaining time and remaining lives', () => {
  const base = 1000;
  const score = calculateScore(base, 10, 3, 3);
  // 1000 + (10 * 50) + 500 = 2000
  assert.equal(score, 2000);

  const lowScore = calculateScore(base, 0, 1, 3);
  // 1000 + 0 + floor(1/3 * 500) = 1166
  assert.equal(lowScore, 1166);
});

test('calculateStars awards 3 stars for flawless victory or high score', () => {
  const starResult = calculateStars(1500, 1000, 3, 3, 20, 30);
  assert.equal(starResult.stars, 3);
  assert.equal(starResult.isFlawless, true);

  const tightResult = calculateStars(800, 1000, 1, 3, 2, 30);
  assert.equal(tightResult.stars >= 1, true);
});

test('calculatePlayerRank advances with completed levels', () => {
  const recruit = calculatePlayerRank(0, 0);
  assert.equal(recruit.rank, 'NEW CHALLENGER');

  const stage1Rank = calculatePlayerRank(10, 25);
  assert.equal(stage1Rank.rank, 'LOGIC SPECIALIST');

  const halfWayRank = calculatePlayerRank(50, 130);
  assert.equal(halfWayRank.rank, 'APEX COMMANDER');

  const supremeRank = calculatePlayerRank(100, 300);
  assert.equal(supremeRank.rank, 'ZOHAIB PK SUPREME OVERLORD');
});

test('evaluateTrophies accurately updates trophy unlocks', () => {
  const updated = evaluateTrophies(100, 35, INITIAL_TROPHIES);
  const bronze = updated.find((t) => t.id === 'bronze');
  const diamond = updated.find((t) => t.id === 'diamond');
  const legendary = updated.find((t) => t.id === 'legendary');
  const perfect = updated.find((t) => t.id === 'perfect_medal');

  assert.equal(bronze?.unlocked, true);
  assert.equal(diamond?.unlocked, true);
  assert.equal(legendary?.unlocked, true);
  assert.equal(perfect?.unlocked, true);
});

test('evaluateAchievements unlocks Stage 1 and First Blood achievements', () => {
  const sampleProgress: Record<number, LevelProgress> = {};
  for (let i = 1; i <= 10; i++) {
    sampleProgress[i] = {
      unlocked: true,
      completed: true,
      stars: 3,
      highScore: 2000,
      bestTime: 15,
      attempts: 1,
      noDeathClear: true,
    };
  }

  const updated = evaluateAchievements(sampleProgress, INITIAL_ACHIEVEMENTS);
  const firstBlood = updated.find((a) => a.id === 'first_victory');
  const survivalMaster = updated.find((a) => a.id === 'survival_master');

  assert.equal(firstBlood?.unlocked, true);
  assert.equal(survivalMaster?.unlocked, true);
});
