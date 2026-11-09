import { GameController } from './gameEngineTypes';
import { sounds } from '../audio/soundEngine';

export function createStage6Game(levelId: number): GameController {
  switch (levelId) {
    case 51: return createKnifeEdgeBalance();
    case 52: return createRopeSwing();
    case 53: return createParkourNightmare();
    case 54: return createHelicopterControl();
    case 55: return createSpeedRacer();
    case 56: return createDriftMaster();
    case 57: return createFlappyExtreme();
    case 58: return createRocketLanding();
    case 59: return createBalloonSurvival();
    case 60: return createUltimateSkillTest();
    default: return createKnifeEdgeBalance();
  }
}

// L51: KNIFE EDGE BALANCE
function createKnifeEdgeBalance(): GameController {
  let angle = 0;
  let angleV = 0;
  let won = false;
  return {
    init: (w, h, cb) => { angle = 0; angleV = 0; won = false; cb.setStatus('COUNTER-BALANCE RAZOR POLE (LEFT/RIGHT)'); },
    update: (dt, input, cb) => {
      if (won) return;
      if (input.left) angleV -= 45 * dt;
      if (input.right) angleV += 45 * dt;
      angleV += (Math.random() - 0.5) * 20 * dt;
      angle += angleV * dt;
      if (Math.abs(angle) > 35) {
        sounds.playHit();
        cb.loseLife('Knife-edge balance toppled!');
        angle = 0;
        angleV = 0;
      }
    },
    handlePointerDown: (x, y, cb) => {
      won = true;
      sounds.playVictory();
      cb.winGame(3000);
    },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h * 0.7);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(-4, -140, 8, 140);
      ctx.restore();
    },
  };
}

// L52: ROPE SWING MASTER
function createRopeSwing(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('RELEASE AT APEX OF GRAPPLE SWING'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(2700); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(w / 2, 50);
      ctx.lineTo(w / 2 + 80, 220);
      ctx.stroke();
    },
  };
}

// L53: PARKOUR NIGHTMARE
function createParkourNightmare(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('WALL-RUN & VAULT ACROSS ROOFTOPS'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(2800); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#334155';
      ctx.fillRect(100, 280, 200, 150);
      ctx.fillRect(400, 240, 220, 190);
    },
  };
}

// L54: HELICOPTER CONTROL
function createHelicopterControl(): GameController {
  let copterY = 200;
  let won = false;
  return {
    init: (w, h, cb) => { copterY = 200; won = false; cb.setStatus('HOLD TO ASCEND · RELEASE TO DESCEND'); },
    update: (dt, input, cb) => {
      if (input.actionA || input.up) copterY -= 180 * dt;
      else copterY += 160 * dt;
    },
    handlePointerDown: (x, y, cb) => {
      won = true;
      sounds.playVictory();
      cb.winGame(3000);
    },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(180, copterY, 35, 18);
    },
  };
}

// L55: SPEED RACER
function createSpeedRacer(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('WEAVE THROUGH 8-LANE EXPRESSWAY'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3200); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(w / 2 - 15, h * 0.7, 30, 50);
    },
  };
}

// L56: DRIFT MASTER
function createDriftMaster(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('COUNTER-STEER HAIRPIN SLIP'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3000); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 12;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 90, 0, Math.PI);
      ctx.stroke();
    },
  };
}

// L57: FLAPPY EXTREME
function createFlappyExtreme(): GameController {
  let birdY = 200;
  let vy = 0;
  let won = false;
  return {
    init: (w, h, cb) => { birdY = 200; vy = 0; won = false; cb.setStatus('PULSE JET FLAP THROUGH LASER GATES'); },
    update: (dt, input, cb) => {
      vy += 900 * dt;
      birdY += vy * dt;
    },
    handlePointerDown: (x, y, cb) => {
      vy = -340;
      sounds.playJump();
      won = true;
      sounds.playVictory();
      cb.winGame(3500);
    },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(350, 0, 30, 160);
      ctx.fillRect(350, 280, 30, h - 280);
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(150, birdY, 14, 0, Math.PI * 2);
      ctx.fill();
    },
  };
}

// L58: ROCKET LANDING
function createRocketLanding(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('LUNAR LANDER TOUCHDOWN RADAR'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(2800); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(w / 2 - 40, h * 0.8, 80, 10);
    },
  };
}

// L59: BALLOON SURVIVAL
function createBalloonSurvival(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('BURN & VENT ALTITUDE CONTROL'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(2700); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 35, 0, Math.PI * 2);
      ctx.fill();
    },
  };
}

// L60: ULTIMATE SKILL TEST (STAGE 6 FINALE)
function createUltimateSkillTest(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('STAGE 6 FINALE: APEX PILOT TRIATHLON'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(5000); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '24px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText('APEX GOLD WINGS AWARDED', w / 2, h / 2);
    },
  };
}
