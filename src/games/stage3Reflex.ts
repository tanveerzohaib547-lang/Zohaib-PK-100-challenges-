import { GameController } from './gameEngineTypes';
import { sounds } from '../audio/soundEngine';

export function createStage3Game(levelId: number): GameController {
  switch (levelId) {
    case 21: return createOnePixelJump();
    case 22: return createSpeedTap();
    case 23: return createBulletDodger();
    case 24: return createMovingPlatformKing();
    case 25: return createGravitySwitch();
    case 26: return createTurboReaction();
    case 27: return createPerfectTiming();
    case 28: return createWallClimber();
    case 29: return createDodgeMeteor();
    case 30: return createReflexNightmare();
    default: return createOnePixelJump();
  }
}

// L21: ONE PIXEL JUMP
function createOnePixelJump(): GameController {
  let player = { x: 50, y: 300, vx: 0, vy: 0, onGround: true };
  let charge = 0;
  let charging = false;
  let won = false;

  return {
    init: (w, h, cb) => {
      player = { x: 50, y: h * 0.7, vx: 0, vy: 0, onGround: true };
      charge = 0;
      charging = false;
      won = false;
      cb.setStatus('HOLD SPACE/ACTION TO CHARGE JUMP');
    },
    update: (dt, input, cb) => {
      if (won) return;
      if (input.actionA && player.onGround) {
        charging = true;
        charge = Math.min(100, charge + dt * 120);
      } else if (charging && !input.actionA) {
        charging = false;
        player.vx = charge * 4.5;
        player.vy = -380;
        player.onGround = false;
        sounds.playJump();
        charge = 0;
      }

      if (!player.onGround) {
        player.vy += 1000 * dt;
        player.x += player.vx * dt;
        player.y += player.vy * dt;

        if (player.y >= 300) {
          player.y = 300;
          player.onGround = true;
          player.vx = 0;

          // Check if landed on narrow needle platform (at x=400 to 440)
          if (player.x >= 390 && player.x <= 450) {
            won = true;
            sounds.playVictory();
            cb.winGame(3000);
          } else if (player.x > 100) {
            sounds.playHit();
            cb.loseLife('Missed microscopic landing ledge!');
            player.x = 50;
          }
        }
      }
    },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);

      // Start platform
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(20, 300, 80, 50);

      // Micro landing pin
      ctx.fillStyle = '#10b981';
      ctx.fillRect(400, 300, 30, 50);

      // Abyss
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(100, 340, w - 100, 10);

      // Player
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(player.x - 10, player.y - 20, 20, 20);

      // Charge bar
      if (charging) {
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(player.x - 20, player.y - 35, charge * 0.4, 6);
      }
    },
  };
}

// L22: SPEED TAP MASTER
function createSpeedTap(): GameController {
  let targets: { x: number; y: number; r: number; isDecoy: boolean }[] = [];
  let score = 0;
  let won = false;

  return {
    init: (w, h, cb) => {
      targets = [];
      for (let i = 0; i < 5; i++) {
        targets.push({
          x: 100 + Math.random() * (w - 200),
          y: 100 + Math.random() * (h - 200),
          r: 25,
          isDecoy: Math.random() < 0.2,
        });
      }
      score = 0;
      won = false;
      cb.setStatus('TAP GREEN TARGETS · AVOID RED DECOYS');
    },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => {
      if (won) return;
      targets.forEach((t, i) => {
        if (Math.hypot(x - t.x, y - t.y) < t.r) {
          if (t.isDecoy) {
            sounds.playHit();
            cb.loseLife('Tapped a decoy node!');
          } else {
            sounds.playCollect();
            score++;
            cb.addScore(200);
            targets.splice(i, 1);
            if (score >= 12) {
              won = true;
              sounds.playVictory();
              cb.winGame(3000);
            }
          }
        }
      });
    },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      targets.forEach((t) => {
        ctx.fillStyle = t.isDecoy ? '#ef4444' : '#10b981';
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
        ctx.fill();
      });
    },
  };
}

// L23: BULLET DODGER
function createBulletDodger(): GameController {
  let player = { x: 400, y: 300 };
  let bullets: { x: number; y: number; vx: number; vy: number }[] = [];
  let timer = 0;
  let won = false;

  return {
    init: (w, h, cb) => {
      player = { x: w / 2, y: h / 2 };
      bullets = [];
      timer = 0;
      won = false;
      cb.setStatus('EVADE DENSE HYPERSONIC BULLETS');
    },
    update: (dt, input, cb) => {
      const speed = 260;
      if (input.left) player.x -= speed * dt;
      if (input.right) player.x += speed * dt;
      if (input.up) player.y -= speed * dt;
      if (input.down) player.y += speed * dt;

      timer += dt;
      if (timer > 0.15) {
        timer = 0;
        bullets.push({
          x: Math.random() * 800,
          y: 0,
          vx: (Math.random() - 0.5) * 100,
          vy: 220 + Math.random() * 150,
        });
      }

      bullets.forEach((b, i) => {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        if (Math.hypot(player.x - b.x, player.y - b.y) < 14) {
          sounds.playHit();
          cb.loseLife('Hit by bullet projectile!');
          bullets.splice(i, 1);
        }
      });
    },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#f43f5e';
      bullets.forEach((b) => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(player.x, player.y, 10, 0, Math.PI * 2);
      ctx.fill();
    },
  };
}

// L24: MOVING PLATFORM KING
function createMovingPlatformKing(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('LEAP ACROSS MOVING ELEVATORS'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(2400); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(200, 250, 100, 15);
      ctx.fillRect(450, 200, 100, 15);
    },
  };
}

// L25: GRAVITY SWITCH
function createGravitySwitch(): GameController {
  let playerY = 100;
  let gravityDir = 1;
  let won = false;
  return {
    init: (w, h, cb) => { playerY = 100; gravityDir = 1; won = false; cb.setStatus('INVERT GRAVITY (TAP/SPACE)'); },
    update: (dt, input, cb) => {
      playerY += gravityDir * 350 * dt;
      if (playerY > 400 || playerY < 60) {
        // Safe bounce
        playerY = Math.max(60, Math.min(400, playerY));
      }
    },
    handlePointerDown: (x, y, cb) => {
      gravityDir *= -1;
      sounds.playJump();
    },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(0, 0, w, 20);
      ctx.fillRect(0, h - 20, w, 20);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(200, playerY, 25, 25);
    },
  };
}

// L26: TURBO REACTION
function createTurboReaction(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('SUB-200MS REACTION FLASH'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3000); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#10b981';
      ctx.font = '32px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText('STRIKE NOW!', w / 2, h / 2);
    },
  };
}

// L27: PERFECT TIMING
function createPerfectTiming(): GameController {
  let needleX = 100;
  let needleVx = 350;
  let won = false;
  return {
    init: (w, h, cb) => { needleX = 100; needleVx = 350; won = false; cb.setStatus('STOP NEEDLE IN GOLDEN ZONE'); },
    update: (dt, input, cb) => {
      needleX += needleVx * dt;
      if (needleX > 600 || needleX < 150) needleVx *= -1;
    },
    handlePointerDown: (x, y, cb) => {
      // Golden sweet spot is 360-400
      if (needleX >= 360 && needleX <= 400) {
        won = true;
        sounds.playVictory();
        cb.winGame(3200);
      } else {
        sounds.playHit();
        cb.loseLife('Missed timing sweet spot!');
      }
    },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(150, h / 2 - 20, 450, 40);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(360, h / 2 - 20, 40, 40);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(needleX - 3, h / 2 - 30, 6, 60);
    },
  };
}

// L28: WALL CLIMBER
function createWallClimber(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('WALL-KICK UP CHASM'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(2600); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#334155';
      ctx.fillRect(80, 0, 30, h);
      ctx.fillRect(w - 110, 0, 30, h);
    },
  };
}

// L29: DODGE METEOR
function createDodgeMeteor(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('DODGE FALLING METEOR IMPACTS'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3000); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 60, 0, Math.PI * 2);
      ctx.stroke();
    },
  };
}

// L30: REFLEX NIGHTMARE (STAGE 3 FINALE)
function createReflexNightmare(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('STAGE 3 FINALE: SUPREME REFLEX'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(5000); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#10b981';
      ctx.font = '24px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText('STAGE 3 CLIMAX CONQUERED', w / 2, h / 2);
    },
  };
}
