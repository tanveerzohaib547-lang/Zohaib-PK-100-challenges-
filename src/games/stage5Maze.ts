import { GameController } from './gameEngineTypes';
import { sounds } from '../audio/soundEngine';

export function createStage5Game(levelId: number): GameController {
  switch (levelId) {
    case 41: return createDarknessEscape();
    case 42: return createTrapDoorMaze();
    case 43: return createMovingWall();
    case 44: return createKeyHunter();
    case 45: return createPrisonBreak();
    case 46: return createUndergroundEscape();
    case 47: return createLaserSecurityHack();
    case 48: return createSecretRoom();
    case 49: return createInfiniteMaze();
    case 50: return createGrandEscape();
    default: return createDarknessEscape();
  }
}

// L41: DARKNESS ESCAPE
function createDarknessEscape(): GameController {
  let player = { x: 80, y: 80 };
  let exit = { x: 600, y: 350 };
  let battery = 100;
  let won = false;

  return {
    init: (w, h, cb) => {
      player = { x: 80, y: 80 };
      exit = { x: w - 100, y: h - 100 };
      battery = 100;
      won = false;
      cb.setStatus('NAVIGATE IN DARKNESS TO EXIT BEACON');
    },
    update: (dt, input, cb) => {
      if (won) return;
      const speed = 190;
      if (input.left) player.x -= speed * dt;
      if (input.right) player.x += speed * dt;
      if (input.up) player.y -= speed * dt;
      if (input.down) player.y += speed * dt;

      battery = Math.max(0, battery - dt * 4);
      if (Math.hypot(player.x - exit.x, player.y - exit.y) < 40) {
        won = true;
        sounds.playVictory();
        cb.winGame(3000);
      }
    },
    render: (ctx, w, h) => {
      // Pitch black
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);

      // Flashlight cone
      const grad = ctx.createRadialGradient(player.x, player.y, 10, player.x, player.y, 120);
      grad.addColorStop(0, 'rgba(255, 255, 200, 0.9)');
      grad.addColorStop(0.8, 'rgba(255, 255, 200, 0.2)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(player.x, player.y, 120, 0, Math.PI * 2);
      ctx.fill();

      // Exit Beacon
      ctx.fillStyle = '#10b981';
      ctx.fillRect(exit.x - 15, exit.y - 15, 30, 30);

      // Player
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(player.x, player.y, 12, 0, Math.PI * 2);
      ctx.fill();
    },
  };
}

// L42: TRAP DOOR MAZE
function createTrapDoorMaze(): GameController {
  let chamber = 1;
  let won = false;
  return {
    init: (w, h, cb) => { chamber = 1; won = false; cb.setStatus('SELECT SAFE DOOR 1, 2, OR 3'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => {
      chamber++;
      sounds.playClick();
      if (chamber > 4) {
        won = true;
        sounds.playVictory();
        cb.winGame(2600);
      }
    },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#f59e0b';
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(150 + i * 150, h * 0.4, 80, 120);
      }
      ctx.fillStyle = '#ffffff';
      ctx.font = '20px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText(`CHAMBER ${chamber}/4`, w / 2, 120);
    },
  };
}

// L43: MOVING WALL LABYRINTH
function createMovingWall(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('TIME CRUSHING CORRIDOR CROSSING'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(2700); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(w / 2 - 40, 0, 80, 180);
      ctx.fillRect(w / 2 - 40, h - 180, 80, 180);
    },
  };
}

// L44: KEY HUNTER
function createKeyHunter(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('GATHER ALL 4 COLOR-CODED KEYS'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(2800); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, w, h);
      const colors = ['#ef4444', '#06b6d4', '#10b981', '#f59e0b'];
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillRect(100 + i * 120, h * 0.5, 30, 30);
      }
    },
  };
}

// L45: PRISON BREAK
function createPrisonBreak(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('SNEAK PAST CCTV SURVEILLANCE'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(2900); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.moveTo(100, 100);
      ctx.lineTo(250, 300);
      ctx.lineTo(50, 300);
      ctx.fill();
    },
  };
}

// L46: UNDERGROUND ESCAPE
function createUndergroundEscape(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('RUNAWAY MINECART DESCENT'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(2900); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#78716c';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.7);
      ctx.lineTo(w, h * 0.7);
      ctx.stroke();
    },
  };
}

// L47: LASER SECURITY HACK
function createLaserSecurityHack(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('REDIRECT OPTICAL PRISM MIRRORS'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(3000); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(100, 200);
      ctx.lineTo(350, 200);
      ctx.lineTo(350, 350);
      ctx.stroke();
    },
  };
}

// L48: SECRET ROOM
function createSecretRoom(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('DISCOVER 3 CONCEALED GLYPHS'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(2500); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(w / 2 - 30, h / 2 - 50, 60, 100);
    },
  };
}

// L49: INFINITE MAZE
function createInfiniteMaze(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('FOLLOW ACOUSTIC BEACON SIGNAL'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(2900); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 80, 0, Math.PI * 2);
      ctx.stroke();
    },
  };
}

// L50: GRAND ESCAPE (STAGE 5 FINALE)
function createGrandEscape(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('STAGE 5 FINALE: 5-TIER ESCAPE'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => { won = true; sounds.playVictory(); cb.winGame(5000); },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#a855f7';
      ctx.font = '24px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText('FACILITY SECURITY SHATTERED', w / 2, h / 2);
    },
  };
}
