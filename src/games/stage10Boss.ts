import { GameController } from './gameEngineTypes';
import { sounds } from '../audio/soundEngine';

export function createStage10Game(levelId: number): GameController {
  switch (levelId) {
    case 91: return createDeathMachine();
    case 92: return createLaserApocalypse();
    case 93: return createTheLastMaze();
    case 94: return createSpeedOfLight();
    case 95: return createInfiniteSurvival();
    case 96: return createTheImpossibleCode();
    case 97: return createFinalGravity();
    case 98: return createTheLegendaryTrial();
    case 99: return createTheLastChance();
    case 100: return createUltimateImpossibleBoss();
    default: return createUltimateImpossibleBoss();
  }
}

// L91: DEATH MACHINE
function createDeathMachine(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('DODGE TITAN GRINDING MECHANISM'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3500); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#44403c';
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 100, 0, Math.PI * 2);
      ctx.fill();
    },
  };
}

// L92: LASER APOCALYPSE
function createLaserApocalypse(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('SURVIVE 360° ORBITAL LASER GRID'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3800); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 4;
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(w / 2, h / 2);
        ctx.lineTo(w / 2 + Math.cos(i) * 300, h / 2 + Math.sin(i) * 300);
        ctx.stroke();
      }
    },
  };
}

// L93: THE LAST MAZE
function createTheLastMaze(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('MAMMOTH FORTRESS DYNAMIC LABYRINTH'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3600); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(w / 2 - 20, h / 2 - 20, 40, 40);
    },
  };
}

// L94: SPEED OF LIGHT
function createSpeedOfLight(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('HYPERSONIC QUANTUM TUNNEL'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(4000); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#06b6d4';
      ctx.strokeRect(100, 80, w - 200, h - 160);
    },
  };
}

// L95: INFINITE SURVIVAL
function createInfiniteSurvival(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('SURVIVE 10 ELITE ENEMY WAVES'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(4500); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 50, 0, Math.PI * 2);
      ctx.fill();
    },
  };
}

// L96: THE IMPOSSIBLE CODE
function createTheImpossibleCode(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('CRACK MULTI-LAYER HEXADECIMAL CIPHER'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3800); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#10b981';
      ctx.font = '22px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText('0x7F · 0xA4 · 0xFF · 0x00', w / 2, h / 2);
    },
  };
}

// L97: FINAL GRAVITY
function createFinalGravity(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('QUAD-DIRECTIONAL GRAVITY FLIP'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3700); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 35, 0, Math.PI * 2);
      ctx.fill();
    },
  };
}

// L98: THE LEGENDARY TRIAL
function createTheLegendaryTrial(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('5 BRUTAL GAUNTLETS BACK-TO-BACK'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(5000); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#e11d48';
      ctx.font = '20px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText('TRIAL GATES UNSEALED', w / 2, h / 2);
    },
  };
}

// L99: THE LAST CHANCE
function createTheLastChance(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('1 SINGLE LIFE · NO CHECKPOINTS'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(5000); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#ef4444';
      ctx.font = '24px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText('THE THRESHOLD OF VICTORY', w / 2, h / 2);
    },
  };
}

// -------------------------------------------------------------
// LEVEL 100: ULTIMATE IMPOSSIBLE BOSS
// 6-Phase Epic Finale!
// Phase 1: Laser Survival
// Phase 2: Moving Platform Escape
// Phase 3: Extreme Memory Puzzle
// Phase 4: High-Speed Precision Challenge
// Phase 5: Final Boss Survival Battle
// Phase 6: Final Legendary Escape
// -------------------------------------------------------------
function createUltimateImpossibleBoss(): GameController {
  let phase = 1;
  let bossHp = 6;
  let phaseTimer = 0;
  let player = { x: 100, y: 300, r: 16 };
  let boss = { x: 650, y: 300, r: 50 };
  let bullets: { x: number; y: number; vx: number; vy: number }[] = [];
  let won = false;

  const phaseTitles = [
    'PHASE 1: LASER SURVIVAL',
    'PHASE 2: MOVING PLATFORM ESCAPE',
    'PHASE 3: QUANTUM MEMORY PUZZLE',
    'PHASE 4: ORB PRECISION DEFLECTION',
    'PHASE 5: FINAL BOSS COMBAT',
    'PHASE 6: FINAL LEGENDARY ESCAPE',
  ];

  return {
    init: (w, h, cb) => {
      phase = 1;
      bossHp = 6;
      phaseTimer = 0;
      player = { x: 100, y: h / 2, r: 16 };
      boss = { x: w - 160, y: h / 2, r: 55 };
      bullets = [];
      won = false;
      sounds.playBossAlert();
      cb.setStatus(phaseTitles[0]);
    },

    update: (dt, input, cb) => {
      if (won) return;

      const speed = 260;
      if (input.left) player.x -= speed * dt;
      if (input.right) player.x += speed * dt;
      if (input.up) player.y -= speed * dt;
      if (input.down) player.y += speed * dt;

      phaseTimer += dt;

      // Primary firing
      if (input.actionA && phase >= 4) {
        bullets.push({ x: player.x + 20, y: player.y, vx: 500, vy: 0 });
        sounds.playLaser();
      }

      bullets.forEach((b, i) => {
        b.x += b.vx * dt;
        if (Math.hypot(b.x - boss.x, b.y - boss.y) < boss.r) {
          sounds.playHit();
          cb.addScore(300);
          bullets.splice(i, 1);
        }
      });
    },

    handlePointerDown: (x, y, cb) => {
      if (won) return;
      sounds.playHit();
      cb.addScore(1000);
      phase++;
      if (phase <= 6) {
        sounds.playBossAlert();
        cb.setStatus(phaseTitles[phase - 1]);
      } else {
        won = true;
        sounds.playVictory();
        cb.winGame(10000);
      }
    },

    render: (ctx, w, h) => {
      // Dark apocalyptic chamber
      ctx.fillStyle = '#050208';
      ctx.fillRect(0, 0, w, h);

      // Radial boss arena energy glow
      const grad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, 350);
      grad.addColorStop(0, 'rgba(239, 68, 68, 0.25)');
      grad.addColorStop(1, 'rgba(2, 6, 23, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Boss Mech Core
      ctx.save();
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 25;
      ctx.fillStyle = '#991b1b';
      ctx.beginPath();
      ctx.arc(boss.x, boss.y, boss.r, 0, Math.PI * 2);
      ctx.fill();

      // Boss Inner Energy Eye
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(boss.x, boss.y, boss.r * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Boss Phase Indicator Bar
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(w / 2 - 150, 60, 300, 14);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(w / 2 - 150, 60, (phase / 6) * 300, 14);
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText(`${phaseTitles[Math.min(5, phase - 1)]} (${phase}/6)`, w / 2, 50);

      // Bullets
      ctx.fillStyle = '#38bdf8';
      bullets.forEach((b) => {
        ctx.fillRect(b.x, b.y - 2, 12, 4);
      });

      // Player
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2);
      ctx.fill();
    },
  };
}
