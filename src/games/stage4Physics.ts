import { GameController } from './gameEngineTypes';
import { sounds } from '../audio/soundEngine';

export function createStage4Game(levelId: number): GameController {
  switch (levelId) {
    case 31: return createBridgeBuilder();
    case 32: return createDominoChaos();
    case 33: return createMagneticForce();
    case 34: return createWaterFlow();
    case 35: return createBallPhysics();
    case 36: return createGearConnection();
    case 37: return createCraneOperator();
    case 38: return createGravityPuzzle();
    case 39: return createCollapsingTower();
    case 40: return createPhysicsNightmare();
    default: return createBridgeBuilder();
  }
}

// L31: BRIDGE BUILDER
function createBridgeBuilder(): GameController {
  let nodes = [{ x: 100, y: 300 }, { x: 300, y: 300 }, { x: 500, y: 300 }];
  let truckX = 50;
  let testing = false;
  let won = false;

  return {
    init: (w, h, cb) => {
      nodes = [{ x: 100, y: 300 }, { x: 300, y: 300 }, { x: 500, y: 300 }];
      truckX = 50;
      testing = false;
      won = false;
      cb.setStatus('TAP TO TEST TRUCK CROSSING');
    },
    update: (dt, input, cb) => {
      if (testing && !won) {
        truckX += 160 * dt;
        if (truckX >= 520) {
          won = true;
          sounds.playVictory();
          cb.winGame(3000);
        }
      }
    },
    handlePointerDown: (x, y, cb) => {
      testing = true;
      sounds.playClick();
    },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);

      // Gorge
      ctx.fillStyle = '#020617';
      ctx.fillRect(100, 320, 400, h - 320);

      // Truss beams
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(100, 300);
      ctx.lineTo(300, 300);
      ctx.lineTo(500, 300);
      ctx.stroke();

      // Truck
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(truckX, 275, 45, 25);
    },
  };
}

// L32: DOMINO CHAOS
function createDominoChaos(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('TRIGGER DOMINO CASCADE'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(2400); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#ef4444';
      for (let i = 0; i < 8; i++) {
        ctx.fillRect(150 + i * 50, h * 0.6, 12, 45);
      }
    },
  };
}

// L33: MAGNETIC FORCE
function createMagneticForce(): GameController {
  let polarity = 1;
  let won = false;
  return {
    init: (w, h, cb) => { polarity = 1; won = false; cb.setStatus('TOGGLE POLARITY (+ / -)'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => {
      polarity *= -1;
      sounds.playClick();
      won = true;
      sounds.playVictory();
      cb.winGame(2600);
    },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = polarity > 0 ? '#ef4444' : '#3b82f6';
      ctx.font = '32px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText(polarity > 0 ? 'POLARITY: NORTH (+)' : 'POLARITY: SOUTH (-)', w / 2, h / 2);
    },
  };
}

// L34: WATER FLOW MASTER
function createWaterFlow(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('ROTATE PIPE JUNCTIONS'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(2500); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(200, h / 2 - 15, 300, 30);
    },
  };
}

// L35: BALL PHYSICS
function createBallPhysics(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('PINBALL FLIPPER TRAJECTORY'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(2800); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 16, 0, Math.PI * 2);
      ctx.fill();
    },
  };
}

// L36: GEAR CONNECTION
function createGearConnection(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('ENGAGE TRANSMISSION GEAR TRAIN'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(2600); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 45, 0, Math.PI * 2);
      ctx.stroke();
    },
  };
}

// L37: CRANE OPERATOR
function createCraneOperator(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('LOWER CRANE & STACK CARGO'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(2700); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(w / 2 - 2, 40, 4, 180);
    },
  };
}

// L38: GRAVITY PUZZLE
function createGravityPuzzle(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('SLIDE CUBES TO PRESSURE PLATES'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(2900); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#a855f7';
      ctx.fillRect(w / 2 - 30, h / 2 - 30, 60, 60);
    },
  };
}

// L39: COLLAPSING TOWER
function createCollapsingTower(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('EXTRACT STRUCTURAL BLOCKS'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3000); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#f43f5e';
      ctx.fillRect(w / 2 - 40, 150, 80, 160);
    },
  };
}

// L40: PHYSICS NIGHTMARE (STAGE 4 FINALE)
function createPhysicsNightmare(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('STAGE 4 FINALE: KINETIC GAUNTLET'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(5000); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#f59e0b';
      ctx.font = '24px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText('PHYSICS MASTER CERTIFICATION', w / 2, h / 2);
    },
  };
}
