import { GameController } from './gameEngineTypes';
import { createStage1Game } from './stage1Survival';
import { createStage2Game } from './stage2Brain';
import { createStage3Game } from './stage3Reflex';
import { createStage4Game } from './stage4Physics';
import { createStage5Game } from './stage5Maze';
import { createStage6Game } from './stage6Skill';
import { createStage7Game } from './stage7Strategy';
import { createStage8Game } from './stage8Nightmare';
import { createStage9Game } from './stage9Impossible';
import { createStage10Game } from './stage10Boss';

export function getGameController(levelId: number): GameController {
  if (levelId >= 1 && levelId <= 10) return createStage1Game(levelId);
  if (levelId >= 11 && levelId <= 20) return createStage2Game(levelId);
  if (levelId >= 21 && levelId <= 30) return createStage3Game(levelId);
  if (levelId >= 31 && levelId <= 40) return createStage4Game(levelId);
  if (levelId >= 41 && levelId <= 50) return createStage5Game(levelId);
  if (levelId >= 51 && levelId <= 60) return createStage6Game(levelId);
  if (levelId >= 61 && levelId <= 70) return createStage7Game(levelId);
  if (levelId >= 71 && levelId <= 80) return createStage8Game(levelId);
  if (levelId >= 81 && levelId <= 90) return createStage9Game(levelId);
  if (levelId >= 91 && levelId <= 100) return createStage10Game(levelId);

  return createStage1Game(1);
}
