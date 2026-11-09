import { GameController } from './gameEngineTypes';
import { sounds } from '../audio/soundEngine';

export function createStage8Game(levelId: number): GameController {
  switch (levelId) {
    case 71: return createInvisibleEnemy();
    case 72: return createVanishingPlatform();
    case 73: return createDoubleGravity();
    case 74: return createChaosButton();
    case 75: return createNoCheckpointRun();
    case 76: return createTimeFreezeMaster();
    case 77: return createMirrorReflex();
    case 78: return createLaserMatrix();
    case 79: return createFinalSurvivor();
    case 80: return createNightmareOverlord();
    default: return createInvisibleEnemy();
  }
}

// L71: INVISIBLE ENEMY
function createInvisibleEnemy(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('TRACK INVISIBLE PHANTOM FOOTSTEPS'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3200); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#ef4444';
      ctx.strokeRect(w / 2 - 20, h / 2 - 20, 40, 40);
    },
  };
}

// L72: VANISHING PLATFORM
function createVanishingPlatform(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('FAITH LEAPS ON FLICKERING TILES'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(2800); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(150, 250, 80, 15);
      ctx.fillRect(350, 250, 80, 15);
    },
  };
}

// L73: DOUBLE GRAVITY
function createDoubleGravity(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('DUAL CONFLICTING GRAVITATIONAL PULL'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3000); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#e11d48';
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 20, 0, Math.PI * 2);
      ctx.fill();
    },
  };
}

// L74: CHAOS BUTTON
function createChaosButton(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('TAP CONSTANTLY SCRAMBLING BUTTONS'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3400); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(w / 2 - 80, h / 2 - 30, 160, 60);
      ctx.fillStyle = '#000000';
      ctx.font = '16px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText('CHAOS HIT', w / 2, h / 2 + 6);
    },
  };
}

// L75: NO CHECKPOINT RUN
function createNoCheckpointRun(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('100M RUN · ZERO CHECKPOINTS'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3500); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(0, h * 0.7, w, 6);
    },
  };
}

// L76: TIME FREEZE MASTER
function createTimeFreezeMaster(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('TRIGGER TIME-FREEZE CHARGES'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3100); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 70, 0, Math.PI * 2);
      ctx.stroke();
    },
  };
}

// L77: MIRROR REFLEX
function createMirrorReflex(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('SPLIT REFLEX DODGING'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3300); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(200, 200, 20, 20);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(500, 200, 20, 20);
    },
  };
}

// L78: LASER MATRIX
function createLaserMatrix(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('360° ANGULAR LASER SWEEPER'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3200); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(100, 100);
      ctx.lineTo(w - 100, h - 100);
      ctx.stroke();
    },
  };
}

// L79: FINAL SURVIVOR
function createFinalSurvivor(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('SHRINKING ORBITAL COLLAPSE ARENA'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3500); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#1c0a0a';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#f97316';
      ctx.strokeRect(150, 100, w - 300, h - 200);
    },
  };
}

// L80: NIGHTMARE OVERLORD (STAGE 8 FINALE)
function createNightmareOverlord(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('STAGE 8 FINALE: 1-LIFE NIGHTMARE OVERLORD'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(5000); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#e11d48';
      ctx.font = '24px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText('NIGHTMARE OVERLORD VANQUISHED', w / 2, h / 2);
    },
  };
}
