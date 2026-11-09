import { GameController, GameCallbacks } from './gameEngineTypes';
import { InputState } from '../types/game';
import { sounds } from '../audio/soundEngine';

export function createStage1Game(levelId: number): GameController {
  switch (levelId) {
    case 1: // LASER DEATH RUN
      return createLaserDeathRun();
    case 2: // INVISIBLE BRIDGE
      return createInvisibleBridge();
    case 3: // SPIKE ESCAPE
      return createSpikeEscape();
    case 4: // FALLING FLOOR
      return createFallingFloor();
    case 5: // FIREBALL SURVIVOR
      return createFireballSurvivor();
    case 6: // ROTATING DEATH WHEEL
      return createRotatingDeathWheel();
    case 7: // SHADOW RUNNER
      return createShadowRunner();
    case 8: // DANGEROUS MAZE
      return createDangerousMaze();
    case 9: // ELECTRIC FLOOR
      return createElectricFloor();
    case 10: // SURVIVAL ARENA
      return createSurvivalArena();
    default:
      return createLaserDeathRun();
  }
}

// -------------------------------------------------------------
// LEVEL 01: LASER DEATH RUN
// -------------------------------------------------------------
function createLaserDeathRun(): GameController {
  let player = { x: 50, y: 300, vx: 0, vy: 0, w: 24, h: 36, onGround: false };
  let lasers: { x: number; y: number; w: number; h: number; vy: number; minY: number; maxY: number }[] = [];
  let barriers: { x: number; y: number; w: number; h: number }[] = [];
  let exitPortal = { x: 920, y: 280, w: 32, h: 50 };
  let gravity = 1200;
  let groundY = 330;
  let won = false;

  return {
    init: (w, h, cb) => {
      groundY = h * 0.75;
      player = { x: 50, y: groundY - 36, vx: 0, vy: 0, w: 24, h: 36, onGround: true };
      exitPortal = { x: w - 70, y: groundY - 50, w: 32, h: 50 };
      won = false;
      cb.setStatus('SPRINT TO PORTAL · DODGE LASERS');

      // Lasers sweeping vertically
      lasers = [
        { x: w * 0.22, y: groundY - 140, w: 8, h: 140, vy: 150, minY: groundY - 160, maxY: groundY - 50 },
        { x: w * 0.42, y: groundY - 90, w: 8, h: 90, vy: -180, minY: groundY - 160, maxY: groundY - 40 },
        { x: w * 0.62, y: groundY - 150, w: 8, h: 150, vy: 220, minY: groundY - 170, maxY: groundY - 50 },
        { x: w * 0.80, y: groundY - 110, w: 8, h: 110, vy: -200, minY: groundY - 170, maxY: groundY - 50 },
      ];

      // Jump barriers
      barriers = [
        { x: w * 0.32, y: groundY - 25, w: 20, h: 25 },
        { x: w * 0.52, y: groundY - 30, w: 22, h: 30 },
        { x: w * 0.72, y: groundY - 28, w: 20, h: 28 },
      ];
    },

    update: (dt, input, cb) => {
      if (won) return;

      // Player Movement
      const speed = 260;
      player.vx = 0;
      if (input.left) player.vx = -speed;
      if (input.right) player.vx = speed;

      // Jump
      if (input.actionA && player.onGround) {
        player.vy = -540;
        player.onGround = false;
      }

      // Physics
      player.vy += gravity * dt;
      player.x += player.vx * dt;
      player.y += player.vy * dt;

      // Ground collision
      if (player.y >= groundY - player.h) {
        player.y = groundY - player.h;
        player.vy = 0;
        player.onGround = true;
      }

      // Bounds
      player.x = Math.max(10, player.x);

      // Move Lasers
      lasers.forEach((l) => {
        l.y += l.vy * dt;
        if (l.y > l.maxY || l.y < l.minY) {
          l.vy *= -1;
        }

        // Laser collision with player
        if (
          player.x < l.x + l.w &&
          player.x + player.w > l.x &&
          player.y < l.y + l.h &&
          player.y + player.h > l.y
        ) {
          sounds.playLaser();
          sounds.playHit();
          cb.loseLife('Vaporized by security laser beam!');
          player.x = Math.max(20, player.x - 120);
        }
      });

      // Barrier collision
      barriers.forEach((b) => {
        if (
          player.x < b.x + b.w &&
          player.x + player.w > b.x &&
          player.y + player.h > b.y
        ) {
          sounds.playHit();
          cb.loseLife('Collided with high-voltage barrier!');
          player.x = b.x - player.w - 10;
        }
      });

      // Check Exit Portal
      if (
        player.x + player.w >= exitPortal.x &&
        player.y + player.h >= exitPortal.y
      ) {
        won = true;
        cb.addScore(1500);
        cb.winGame(500);
      }
    },

    render: (ctx, w, h) => {
      // Dark cyber background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, w, h);

      // Cyber grid lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, groundY);
        ctx.stroke();
      }

      // Metallic Ground
      const groundGrad = ctx.createLinearGradient(0, groundY, 0, h);
      groundGrad.addColorStop(0, '#334155');
      groundGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, groundY, w, h - groundY);

      // Hazard floor stripe
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(0, groundY, w, 4);

      // Jump Barriers
      barriers.forEach((b) => {
        ctx.fillStyle = '#e11d48';
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.fillStyle = '#fb7185';
        ctx.fillRect(b.x + 2, b.y + 2, b.w - 4, 4);
      });

      // Lasers (Glowing red beams)
      lasers.forEach((l) => {
        ctx.save();
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 15;
        ctx.fillStyle = '#f43f5e';
        ctx.fillRect(l.x, l.y, l.w, l.h);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(l.x + 2, l.y, 4, l.h);
        ctx.restore();
      });

      // Exit Portal (Cyan vortex)
      ctx.save();
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 20;
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(exitPortal.x, exitPortal.y, exitPortal.w, exitPortal.h);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(exitPortal.x + 4, exitPortal.y + 4, exitPortal.w - 8, exitPortal.h - 8);
      ctx.restore();

      // Player Sprite (Cyber runner with helmet)
      ctx.save();
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(player.x, player.y + 10, player.w, player.h - 10);
      // Helmet head
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(player.x + 3, player.y, player.w - 6, 12);
      // Glowing visor
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(player.x + 10, player.y + 3, 10, 4);
      ctx.restore();
    },
  };
}

// -------------------------------------------------------------
// LEVEL 02: INVISIBLE BRIDGE
// -------------------------------------------------------------
function createInvisibleBridge(): GameController {
  let player = { x: 40, y: 0, vx: 0, vy: 0, w: 24, h: 32, onGround: true };
  let platforms: { x: number; y: number; w: number; h: number; isSafe: boolean; revealed: number }[] = [];
  let groundY = 320;
  let won = false;

  return {
    init: (w, h, cb) => {
      groundY = h * 0.7;
      player = { x: 40, y: groundY - 32, vx: 0, vy: 0, w: 24, h: 32, onGround: true };
      won = false;
      cb.setStatus('DISCOVER SAFE INVISIBLE PLATFORMS');

      platforms = [];
      const cols = 7;
      const stepW = (w - 200) / cols;

      for (let i = 0; i < cols; i++) {
        // Two paths per column: upper or lower
        const px = 100 + i * stepW;
        const upperSafe = (i % 2 === 0);

        platforms.push({
          x: px,
          y: groundY - 40,
          w: stepW - 15,
          h: 12,
          isSafe: upperSafe,
          revealed: 0,
        });
        platforms.push({
          x: px,
          y: groundY + 15,
          w: stepW - 15,
          h: 12,
          isSafe: !upperSafe,
          revealed: 0,
        });
      }
    },

    update: (dt, input, cb) => {
      if (won) return;

      const speed = 220;
      player.vx = 0;
      if (input.left) player.vx = -speed;
      if (input.right) player.vx = speed;
      if (input.up) player.y -= 180 * dt;
      if (input.down) player.y += 180 * dt;

      player.x += player.vx * dt;

      // Reveal nearby platforms
      platforms.forEach((p) => {
        const dist = Math.hypot(player.x - (p.x + p.w / 2), player.y - p.y);
        if (dist < 90) {
          p.revealed = Math.min(1, p.revealed + dt * 4);
        } else {
          p.revealed = Math.max(0.1, p.revealed - dt * 0.5);
        }

        // Stepping on platform
        if (
          player.x + player.w > p.x &&
          player.x < p.x + p.w &&
          Math.abs((player.y + player.h) - p.y) < 16
        ) {
          if (!p.isSafe) {
            sounds.playHit();
            cb.loseLife('Stepped on a fake trap tile!');
            player.x = 40;
            player.y = groundY - 32;
          } else {
            p.revealed = 1;
            cb.addScore(10);
          }
        }
      });

      // Win Condition: Reached other side
      if (player.x > 850) {
        won = true;
        cb.addScore(2000);
        cb.winGame();
      }
    },

    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);

      // Start & Exit Ledges
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, groundY - 30, 90, 100);
      ctx.fillRect(w - 90, groundY - 30, 90, 100);

      // Target Exit Beacon
      ctx.fillStyle = '#10b981';
      ctx.fillRect(w - 60, groundY - 60, 30, 30);

      // Invisible Platforms
      platforms.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = Math.max(0.08, p.revealed);
        ctx.fillStyle = p.isSafe ? '#38bdf8' : '#f43f5e';
        ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.strokeStyle = '#ffffff';
        ctx.strokeRect(p.x, p.y, p.w, p.h);
        ctx.restore();
      });

      // Player
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(player.x, player.y, player.w, player.h);
    },
  };
}

// -------------------------------------------------------------
// LEVEL 03: SPIKE ESCAPE
// -------------------------------------------------------------
function createSpikeEscape(): GameController {
  let player = { x: 50, y: 280, vx: 0, vy: 0, w: 24, h: 32, onGround: true };
  let spikes: { x: number; y: number; w: number; h: number; vy: number; minH: number; maxH: number }[] = [];
  let groundY = 320;
  let won = false;

  return {
    init: (w, h, cb) => {
      groundY = h * 0.72;
      player = { x: 50, y: groundY - 32, vx: 0, vy: 0, w: 24, h: 32, onGround: true };
      won = false;
      cb.setStatus('TIME YOUR JUMPS OVER RHYTHMIC SPIKES');

      spikes = [];
      for (let i = 0; i < 5; i++) {
        spikes.push({
          x: 180 + i * 140,
          y: groundY,
          w: 36,
          h: 20,
          vy: 60 * (i % 2 === 0 ? 1 : -1),
          minH: 10,
          maxH: 55,
        });
      }
    },

    update: (dt, input, cb) => {
      if (won) return;

      const speed = 240;
      player.vx = 0;
      if (input.left) player.vx = -speed;
      if (input.right) player.vx = speed;

      if (input.actionA && player.onGround) {
        player.vy = -520;
        player.onGround = false;
      }

      player.vy += 1200 * dt;
      player.x += player.vx * dt;
      player.y += player.vy * dt;

      if (player.y >= groundY - player.h) {
        player.y = groundY - player.h;
        player.vy = 0;
        player.onGround = true;
      }

      // Moving spikes
      spikes.forEach((s) => {
        s.h += s.vy * dt;
        if (s.h > s.maxH || s.h < s.minH) s.vy *= -1;

        // Collision
        if (
          player.x + player.w > s.x &&
          player.x < s.x + s.w &&
          player.y + player.h > groundY - s.h
        ) {
          sounds.playHit();
          cb.loseLife('Impaled by moving spikes!');
          player.x = Math.max(30, player.x - 90);
        }
      });

      if (player.x > 880) {
        won = true;
        cb.addScore(1800);
        cb.winGame();
      }
    },

    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);

      // Floor
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, groundY, w, h - groundY);

      // Spikes
      spikes.forEach((s) => {
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(s.x, groundY);
        ctx.lineTo(s.x + s.w / 2, groundY - s.h);
        ctx.lineTo(s.x + s.w, groundY);
        ctx.fill();
      });

      // Exit Door
      ctx.fillStyle = '#10b981';
      ctx.fillRect(w - 70, groundY - 50, 30, 50);

      // Player
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(player.x, player.y, player.w, player.h);
    },
  };
}

// -------------------------------------------------------------
// LEVEL 04: FALLING FLOOR
// -------------------------------------------------------------
function createFallingFloor(): GameController {
  let tiles: { x: number; y: number; w: number; h: number; state: 'solid' | 'crumbling' | 'fallen'; timer: number }[] = [];
  let player = { col: 0, row: 0, x: 0, y: 0 };
  let cellsCollected = 0;
  let powerCells: { x: number; y: number; col: number; row: number; collected: boolean }[] = [];
  let won = false;

  return {
    init: (w, h, cb) => {
      tiles = [];
      cellsCollected = 0;
      won = false;
      cb.setStatus('KEEP MOVING! TILES FALL IN 0.6s');

      const cols = 8;
      const rows = 5;
      const tileW = Math.min(80, (w - 40) / cols);
      const tileH = 50;
      const startX = (w - cols * tileW) / 2;
      const startY = h * 0.25;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          tiles.push({
            x: startX + c * tileW,
            y: startY + r * tileH,
            w: tileW - 4,
            h: tileH - 4,
            state: 'solid',
            timer: 0.6,
          });
        }
      }

      player = { col: 0, row: 2, x: startX + 15, y: startY + 2 * tileH + 10 };

      powerCells = [
        { col: 2, row: 1, x: startX + 2 * tileW + tileW / 2, y: startY + 1 * tileH + tileH / 2, collected: false },
        { col: 4, row: 3, x: startX + 4 * tileW + tileW / 2, y: startY + 3 * tileH + tileH / 2, collected: false },
        { col: 6, row: 0, x: startX + 6 * tileW + tileW / 2, y: startY + 0 * tileH + tileH / 2, collected: false },
        { col: 7, row: 4, x: startX + 7 * tileW + tileW / 2, y: startY + 4 * tileH + tileH / 2, collected: false },
      ];
    },

    update: (dt, input, cb) => {
      if (won) return;

      // Handle step moves
      const speed = 200;
      if (input.left) player.x -= speed * dt;
      if (input.right) player.x += speed * dt;
      if (input.up) player.y -= speed * dt;
      if (input.down) player.y += speed * dt;

      // Check current tile under player
      tiles.forEach((t) => {
        if (
          player.x >= t.x &&
          player.x <= t.x + t.w &&
          player.y >= t.y &&
          player.y <= t.y + t.h
        ) {
          if (t.state === 'solid') {
            t.state = 'crumbling';
          } else if (t.state === 'crumbling') {
            t.timer -= dt;
            if (t.timer <= 0) {
              t.state = 'fallen';
              sounds.playExplosion();
            }
          } else if (t.state === 'fallen') {
            sounds.playHit();
            cb.loseLife('Stepped into the void!');
            player.x = tiles[0].x + 10;
            player.y = tiles[0].y + 10;
          }
        }
      });

      // Collect power cells
      powerCells.forEach((c) => {
        if (!c.collected && Math.hypot(player.x - c.x, player.y - c.y) < 25) {
          c.collected = true;
          cellsCollected++;
          sounds.playCollect();
          cb.addScore(500);
          cb.setStatus(`CELLS: ${cellsCollected} / ${powerCells.length}`);
        }
      });

      if (cellsCollected === powerCells.length) {
        won = true;
        cb.winGame(1000);
      }
    },

    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);

      // Render Tiles
      tiles.forEach((t) => {
        if (t.state === 'fallen') {
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(t.x, t.y, t.w, t.h);
        } else if (t.state === 'crumbling') {
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(t.x, t.y, t.w, t.h);
        } else {
          ctx.fillStyle = '#0284c7';
          ctx.fillRect(t.x, t.y, t.w, t.h);
        }
      });

      // Power cells
      powerCells.forEach((c) => {
        if (!c.collected) {
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.arc(c.x, c.y, 10, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Player
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(player.x, player.y, 12, 0, Math.PI * 2);
      ctx.fill();
    },
  };
}

// -------------------------------------------------------------
// LEVEL 05: FIREBALL SURVIVOR
// -------------------------------------------------------------
function createFireballSurvivor(): GameController {
  let player = { x: 400, y: 300, radius: 14 };
  let fireballs: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
  let spawnTimer = 0;
  let won = false;

  return {
    init: (w, h, cb) => {
      player = { x: w / 2, y: h / 2, radius: 14 };
      fireballs = [];
      spawnTimer = 0;
      won = false;
      cb.setStatus('DODGE FIREBALLS FROM ALL SIDES');
    },

    update: (dt, input, cb) => {
      if (won) return;

      const speed = 280;
      if (input.left) player.x -= speed * dt;
      if (input.right) player.x += speed * dt;
      if (input.up) player.y -= speed * dt;
      if (input.down) player.y += speed * dt;

      cb.addScore(Math.floor(dt * 100));

      spawnTimer += dt;
      if (spawnTimer > 0.4) {
        spawnTimer = 0;
        // Spawn from random screen boundary
        const side = Math.floor(Math.random() * 4);
        let fx = 0, fy = 0;
        if (side === 0) { fx = Math.random() * 800; fy = -20; }
        else if (side === 1) { fx = 820; fy = Math.random() * 600; }
        else if (side === 2) { fx = Math.random() * 800; fy = 620; }
        else { fx = -20; fy = Math.random() * 600; }

        const angle = Math.atan2(player.y - fy, player.x - fx);
        const fSpeed = 220 + Math.random() * 140;

        fireballs.push({
          x: fx,
          y: fy,
          vx: Math.cos(angle) * fSpeed,
          vy: Math.sin(angle) * fSpeed,
          r: 12 + Math.random() * 6,
        });
      }

      fireballs.forEach((fb, i) => {
        fb.x += fb.vx * dt;
        fb.y += fb.vy * dt;

        // Collision
        if (Math.hypot(player.x - fb.x, player.y - fb.y) < player.radius + fb.r) {
          sounds.playExplosion();
          cb.loseLife('Scorched by high-temp fireball!');
          fireballs.splice(i, 1);
        }
      });
    },

    render: (ctx, w, h) => {
      ctx.fillStyle = '#1c0a0a';
      ctx.fillRect(0, 0, w, h);

      // Arena boundary glow
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 4;
      ctx.strokeRect(10, 10, w - 20, h - 20);

      // Fireballs
      fireballs.forEach((fb) => {
        ctx.save();
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = 15;
        ctx.fillStyle = '#ea580c';
        ctx.beginPath();
        ctx.arc(fb.x, fb.y, fb.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(fb.x, fb.y, fb.r * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Player orb
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
      ctx.fill();
    },
  };
}

// -------------------------------------------------------------
// LEVEL 06: ROTATING DEATH WHEEL
// -------------------------------------------------------------
function createRotatingDeathWheel(): GameController {
  let angle = 0;
  let playerDist = 200;
  let won = false;

  return {
    init: (w, h, cb) => {
      angle = 0;
      playerDist = 180;
      won = false;
      cb.setStatus('INFILTRATE CORE · AVOID ROTATING BLADES');
    },

    update: (dt, input, cb) => {
      if (won) return;

      angle += dt * 1.5;

      if (input.up) playerDist = Math.max(20, playerDist - 120 * dt);
      if (input.down) playerDist = Math.min(220, playerDist + 120 * dt);

      // Blade collision checks
      const normAngle = (angle % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
      if (playerDist > 60 && playerDist < 160) {
        if (normAngle > 0.5 && normAngle < 1.2) {
          sounds.playHit();
          cb.loseLife('Sliced by rotating death blade!');
          playerDist = 200;
        }
      }

      if (playerDist <= 30) {
        won = true;
        cb.winGame(2000);
      }
    },

    render: (ctx, w, h) => {
      const cx = w / 2;
      const cy = h / 2;

      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);

      // Concentric circular arenas
      ctx.strokeStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(cx, cy, 180, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating blades
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(-10, -160, 20, 120);
      ctx.fillRect(-10, 40, 20, 120);
      ctx.restore();

      // Core Target
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(cx, cy, 25, 0, Math.PI * 2);
      ctx.fill();

      // Player
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(cx, cy + playerDist, 12, 0, Math.PI * 2);
      ctx.fill();
    },
  };
}

// -------------------------------------------------------------
// LEVEL 07: SHADOW RUNNER
// -------------------------------------------------------------
function createShadowRunner(): GameController {
  let playerX = 150;
  let shadowX = 30;
  let distRun = 0;
  let won = false;

  return {
    init: (w, h, cb) => {
      playerX = 150;
      shadowX = 30;
      distRun = 0;
      won = false;
      cb.setStatus('OUTRUN THE SHADOW ENTITY (500M)');
    },

    update: (dt, input, cb) => {
      if (won) return;

      const runSpeed = input.right ? 280 : 180;
      distRun += runSpeed * dt;
      cb.addScore(Math.floor(dt * 150));

      shadowX += 190 * dt;
      playerX = Math.min(600, playerX + (input.right ? 100 : -50) * dt);

      if (shadowX >= playerX) {
        sounds.playHit();
        cb.loseLife('Consumed by the shadow creature!');
        shadowX = 30;
        playerX = 150;
      }

      if (distRun >= 500) {
        won = true;
        cb.winGame(2500);
      }
    },

    render: (ctx, w, h) => {
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, w, h);

      // Floor
      ctx.fillStyle = '#27272a';
      ctx.fillRect(0, h * 0.7, w, h * 0.3);

      // Shadow Entity
      ctx.fillStyle = '#7f1d1d';
      ctx.beginPath();
      ctx.arc(shadowX, h * 0.65, 30, 0, Math.PI * 2);
      ctx.fill();

      // Player
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(playerX, h * 0.65 - 20, 20, 35);
    },
  };
}

// -------------------------------------------------------------
// LEVEL 08: DANGEROUS MAZE
// -------------------------------------------------------------
function createDangerousMaze(): GameController {
  let player = { x: 50, y: 50 };
  let hasKey = false;
  let keyPos = { x: 500, y: 150 };
  let exitPos = { x: 750, y: 400 };
  let won = false;

  return {
    init: (w, h, cb) => {
      player = { x: 60, y: 60 };
      hasKey = false;
      keyPos = { x: w * 0.7, y: h * 0.3 };
      exitPos = { x: w * 0.88, y: h * 0.75 };
      won = false;
      cb.setStatus('COLLECT KEYCARD AND ESCAPE MAZE');
    },

    update: (dt, input, cb) => {
      if (won) return;

      const speed = 220;
      if (input.left) player.x -= speed * dt;
      if (input.right) player.x += speed * dt;
      if (input.up) player.y -= speed * dt;
      if (input.down) player.y += speed * dt;

      if (!hasKey && Math.hypot(player.x - keyPos.x, player.y - keyPos.y) < 25) {
        hasKey = true;
        sounds.playCollect();
        cb.setStatus('KEYCARD ACQUIRED! HEAD TO EXIT');
      }

      if (hasKey && Math.hypot(player.x - exitPos.x, player.y - exitPos.y) < 35) {
        won = true;
        cb.winGame(2200);
      }
    },

    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);

      // Walls
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(150, 0, 20, h * 0.6);
      ctx.fillRect(350, h * 0.4, 20, h * 0.6);
      ctx.fillRect(550, 0, 20, h * 0.7);

      // Key
      if (!hasKey) {
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(keyPos.x - 10, keyPos.y - 10, 20, 20);
      }

      // Exit
      ctx.fillStyle = hasKey ? '#10b981' : '#64748b';
      ctx.fillRect(exitPos.x - 15, exitPos.y - 15, 30, 30);

      // Player
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(player.x - 10, player.y - 10, 20, 20);
    },
  };
}

// -------------------------------------------------------------
// LEVEL 09: ELECTRIC FLOOR
// -------------------------------------------------------------
function createElectricFloor(): GameController {
  let player = { col: 0, row: 2 };
  let phaseTimer = 0;
  let electricWave = 0;
  let safeRow = 2;
  let won = false;

  return {
    init: (w, h, cb) => {
      player = { col: 0, row: 2 };
      phaseTimer = 0;
      electricWave = 0;
      safeRow = 2;
      won = false;
      cb.setStatus('CROSS ON BLUE SAFE TILES');
    },

    update: (dt, input, cb) => {
      if (won) return;

      phaseTimer += dt;
      if (phaseTimer > 1.8) {
        phaseTimer = 0;
        electricWave++;
        safeRow = Math.floor(Math.random() * 4);
      }

      if (player.col >= 6) {
        won = true;
        cb.winGame(2500);
      }
    },

    handlePointerDown: (x, y, cb) => {
      if (player.col < 6) player.col++;
      sounds.playJump();
    },

    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);

      // 6 columns of tiles
      for (let c = 0; c < 6; c++) {
        for (let r = 0; r < 4; r++) {
          const isSafe = (r === safeRow);
          ctx.fillStyle = isSafe ? '#0284c7' : '#ef4444';
          ctx.fillRect(80 + c * 80, 100 + r * 70, 70, 60);
        }
      }

      // Player
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(80 + player.col * 80 + 20, 100 + player.row * 70 + 15, 30, 30);
    },
  };
}

// -------------------------------------------------------------
// LEVEL 10: SURVIVAL ARENA (STAGE 1 FINALE)
// -------------------------------------------------------------
function createSurvivalArena(): GameController {
  let player = { x: 100, y: 300 };
  let boss = { x: 650, y: 300, hp: 10, maxHp: 10 };
  let bullets: { x: number; y: number; vx: number; vy: number }[] = [];
  let won = false;

  return {
    init: (w, h, cb) => {
      player = { x: 100, y: h / 2 };
      boss = { x: w - 150, y: h / 2, hp: 10, maxHp: 10 };
      bullets = [];
      won = false;
      cb.setStatus('DEFEAT STAGE 1 GOLIATH MECH');
    },

    update: (dt, input, cb) => {
      if (won) return;

      const speed = 250;
      if (input.up) player.y -= speed * dt;
      if (input.down) player.y += speed * dt;
      if (input.left) player.x -= speed * dt;
      if (input.right) player.x += speed * dt;

      if (input.actionA) {
        bullets.push({ x: player.x + 20, y: player.y, vx: 500, vy: 0 });
        sounds.playLaser();
      }

      bullets.forEach((b, i) => {
        b.x += b.vx * dt;
        if (Math.hypot(b.x - boss.x, b.y - boss.y) < 40) {
          boss.hp--;
          sounds.playHit();
          cb.addScore(200);
          bullets.splice(i, 1);
        }
      });

      if (boss.hp <= 0) {
        won = true;
        sounds.playVictory();
        cb.winGame(5000);
      }
    },

    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);

      // Boss
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(boss.x - 35, boss.y - 35, 70, 70);

      // Boss HP bar
      ctx.fillStyle = '#334155';
      ctx.fillRect(boss.x - 40, boss.y - 50, 80, 8);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(boss.x - 40, boss.y - 50, (boss.hp / boss.maxHp) * 80, 8);

      // Bullets
      ctx.fillStyle = '#38bdf8';
      bullets.forEach((b) => {
        ctx.fillRect(b.x, b.y - 2, 10, 4);
      });

      // Player
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(player.x, player.y, 16, 0, Math.PI * 2);
      ctx.fill();
    },
  };
}
