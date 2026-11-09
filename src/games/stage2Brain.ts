import { GameController } from './gameEngineTypes';
import { sounds } from '../audio/soundEngine';

export function createStage2Game(levelId: number): GameController {
  switch (levelId) {
    case 11: return createNumberCode();
    case 12: return createMemoryFlash();
    case 13: return createColorTrap();
    case 14: return createShapeRotation();
    case 15: return createBinaryHacker();
    case 16: return createHiddenPattern();
    case 17: return createMirrorWorld();
    case 18: return createWeightBalancer();
    case 19: return createTimeParadox();
    case 20: return createMasterBrainTest();
    default: return createNumberCode();
  }
}

// L11: IMPOSSIBLE NUMBER CODE
function createNumberCode(): GameController {
  let secret = 4287;
  let currentInput = '';
  let hint = 'INPUT 4 DIGITS';
  let won = false;

  return {
    init: (w, h, cb) => {
      secret = 1000 + Math.floor(Math.random() * 9000);
      currentInput = '';
      hint = 'CRACK 4-DIGIT CIPHER';
      won = false;
      cb.setStatus('ENTER CIPHER ON KEYPAD');
    },
    update: (dt, input, cb) => {
      if (won) return;
    },
    handlePointerDown: (x, y, cb) => {
      if (won) return;
      sounds.playClick();
      // Digital keypad touch grid
      const col = Math.floor((x - 250) / 70);
      const row = Math.floor((y - 200) / 70);
      if (col >= 0 && col < 3 && row >= 0 && row < 4) {
        let digit = row * 3 + col + 1;
        if (row === 3 && col === 1) digit = 0;
        if (digit <= 9 && currentInput.length < 4) {
          currentInput += digit.toString();
          if (currentInput.length === 4) {
            const num = parseInt(currentInput, 10);
            if (num === secret) {
              won = true;
              sounds.playVictory();
              cb.winGame(3000);
            } else {
              sounds.playHit();
              cb.loseLife(num < secret ? 'CODE TOO LOW!' : 'CODE TOO HIGH!');
              hint = num < secret ? 'HIGHER ▲' : 'LOWER ▼';
              currentInput = '';
            }
          }
        }
      }
    },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);

      // Display Screen
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(250, 100, 200, 60);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '24px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText(currentInput.padEnd(4, '_'), 350, 140);
      ctx.font = '14px Orbitron';
      ctx.fillText(hint, 350, 80);

      // Keypad
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 3; c++) {
          const num = r === 3 && c === 1 ? 0 : r * 3 + c + 1;
          if (r === 3 && c !== 1) continue;
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(250 + c * 70, 200 + r * 70, 60, 60);
          ctx.fillStyle = '#f8fafc';
          ctx.font = '20px Orbitron';
          ctx.fillText(num.toString(), 280 + c * 70, 238 + r * 70);
        }
      }
    },
  };
}

// L12: MEMORY FLASH
function createMemoryFlash(): GameController {
  let sequence: number[] = [0, 2, 1, 3];
  let playerSeq: number[] = [];
  let flashIdx = 0;
  let flashTimer = 0;
  let won = false;

  return {
    init: (w, h, cb) => {
      sequence = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4), Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
      playerSeq = [];
      flashIdx = 0;
      flashTimer = 0;
      won = false;
      cb.setStatus('WATCH & REPRODUCE FLASH SEQUENCE');
    },
    update: (dt, input, cb) => {
      flashTimer += dt;
      if (flashTimer > 0.6) {
        flashTimer = 0;
        flashIdx = (flashIdx + 1) % (sequence.length + 2);
      }
    },
    handlePointerDown: (x, y, cb) => {
      if (won) return;
      sounds.playClick();
      const padIdx = Math.floor((x - 200) / 100);
      if (padIdx >= 0 && padIdx < 4) {
        playerSeq.push(padIdx);
        if (playerSeq[playerSeq.length - 1] !== sequence[playerSeq.length - 1]) {
          sounds.playHit();
          cb.loseLife('Incorrect sequence playback!');
          playerSeq = [];
        } else if (playerSeq.length === sequence.length) {
          won = true;
          sounds.playVictory();
          cb.winGame(2500);
        }
      }
    },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);

      const colors = ['#ef4444', '#06b6d4', '#10b981', '#f59e0b'];
      for (let i = 0; i < 4; i++) {
        const isFlashing = flashIdx === i;
        ctx.fillStyle = isFlashing ? '#ffffff' : colors[i];
        ctx.fillRect(200 + i * 100, h * 0.45, 80, 80);
      }
    },
  };
}

// L13: COLOR TRAP MASTER (Stroop Effect)
function createColorTrap(): GameController {
  let score = 0;
  let targetRule = 'MATCH INK COLOR';
  let won = false;

  return {
    init: (w, h, cb) => {
      score = 0;
      won = false;
      cb.setStatus('STROOP TEST: 8 CORRECT IN A ROW');
    },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => {
      if (won) return;
      score++;
      sounds.playClick();
      cb.addScore(300);
      if (score >= 8) {
        won = true;
        sounds.playVictory();
        cb.winGame(2800);
      }
    },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#ffffff';
      ctx.font = '20px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText(targetRule, w / 2, 120);

      // Color stimulus
      ctx.fillStyle = '#38bdf8';
      ctx.font = '42px Orbitron';
      ctx.fillText('RED', w / 2, 220);

      // Choice buttons
      const colors = ['#ef4444', '#38bdf8', '#10b981', '#f59e0b'];
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillRect(w / 2 - 180 + i * 95, 300, 80, 50);
      }
    },
  };
}

// L14: SHAPE ROTATION
function createShapeRotation(): GameController {
  let angle = 0;
  let targetAngle = 180;
  let won = false;

  return {
    init: (w, h, cb) => {
      angle = 0;
      won = false;
      cb.setStatus('ROTATE SHAPE TO MATCH SILHOUETTE');
    },
    update: (dt, input, cb) => {
      if (input.left) angle -= 90 * dt;
      if (input.right) angle += 90 * dt;
      if (Math.abs(angle - targetAngle) < 15) {
        won = true;
        sounds.playVictory();
        cb.winGame(2400);
      }
    },
    handlePointerDown: (x, y, cb) => {
      angle = (angle + 90) % 360;
      sounds.playClick();
    },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);

      // Target outline
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 3;
      ctx.strokeRect(w / 2 - 50, h / 2 - 50, 100, 100);

      // Rotating shape
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(-50, -50, 100, 100);
      ctx.restore();
    },
  };
}

// L15: BINARY HACKER
function createBinaryHacker(): GameController {
  let bits = [0, 0, 0, 0, 0, 0, 0, 0];
  let target = 165;
  let won = false;

  return {
    init: (w, h, cb) => {
      bits = [0, 0, 0, 0, 0, 0, 0, 0];
      target = 42 + Math.floor(Math.random() * 180);
      won = false;
      cb.setStatus(`FLIP BITS TO SUM: ${target}`);
    },
    update: (dt, input, cb) => {
      const current = bits.reduce((sum, b, i) => sum + (b ? Math.pow(2, 7 - i) : 0), 0);
      if (current === target && !won) {
        won = true;
        sounds.playVictory();
        cb.winGame(2600);
      }
    },
    handlePointerDown: (x, y, cb) => {
      const idx = Math.floor((x - 100) / 60);
      if (idx >= 0 && idx < 8) {
        bits[idx] = bits[idx] ? 0 : 1;
        sounds.playClick();
      }
    },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '22px Orbitron';
      ctx.textAlign = 'center';
      const current = bits.reduce((sum, b, i) => sum + (b ? Math.pow(2, 7 - i) : 0), 0);
      ctx.fillText(`TARGET: ${target} · CURRENT: ${current}`, w / 2, 140);

      for (let i = 0; i < 8; i++) {
        ctx.fillStyle = bits[i] ? '#10b981' : '#1e293b';
        ctx.fillRect(100 + i * 60, h * 0.45, 50, 60);
        ctx.fillStyle = '#ffffff';
        ctx.font = '20px Orbitron';
        ctx.fillText(bits[i].toString(), 125 + i * 60, h * 0.45 + 38);
      }
    },
  };
}

// L16: HIDDEN PATTERN
function createHiddenPattern(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('DISCOVER THE MISSING GLYPH'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => {
      won = true;
      sounds.playVictory();
      cb.winGame(2200);
    },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '20px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText('PATTERN: 2 · 4 · 8 · 16 · [ ? ]', w / 2, 180);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(w / 2 - 60, 240, 120, 50);
      ctx.fillStyle = '#000000';
      ctx.fillText('32', w / 2, 272);
    },
  };
}

// L17: MIRROR WORLD
function createMirrorWorld(): GameController {
  let p1 = { x: 200, y: 300 };
  let p2 = { x: 600, y: 300 };
  let won = false;
  return {
    init: (w, h, cb) => { p1 = { x: 200, y: h / 2 }; p2 = { x: w - 200, y: h / 2 }; won = false; cb.setStatus('DUAL MIRRORED AVATARS'); },
    update: (dt, input, cb) => {
      const speed = 200;
      if (input.left) { p1.x -= speed * dt; p2.x += speed * dt; }
      if (input.right) { p1.x += speed * dt; p2.x -= speed * dt; }
      if (p1.x < 100 && p2.x > 700 && !won) {
        won = true;
        sounds.playVictory();
        cb.winGame(2600);
      }
    },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#38bdf8';
      ctx.strokeRect(w / 2, 0, 1, h);
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(p1.x - 12, p1.y - 12, 24, 24);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(p2.x - 12, p2.y - 12, 24, 24);
    },
  };
}

// L18: WEIGHT BALANCER
function createWeightBalancer(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('LEVEL THE SCALE TO ZERO TORQUE'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => {
      won = true;
      sounds.playVictory();
      cb.winGame(2400);
    },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(w / 2 - 150, h / 2);
      ctx.lineTo(w / 2 + 150, h / 2);
      ctx.stroke();
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.moveTo(w / 2, h / 2);
      ctx.lineTo(w / 2 - 20, h / 2 + 40);
      ctx.lineTo(w / 2 + 20, h / 2 + 40);
      ctx.fill();
    },
  };
}

// L19: TIME PARADOX
function createTimeParadox(): GameController {
  let won = false;
  return {
    init: (w, h, cb) => { won = false; cb.setStatus('SYNCHRONIZE HARMONIC TIMELINE'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => {
      won = true;
      sounds.playVictory();
      cb.winGame(2700);
    },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#a855f7';
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 70, 0, Math.PI * 2);
      ctx.stroke();
    },
  };
}

// L20: MASTER BRAIN TEST (STAGE 2 FINALE)
function createMasterBrainTest(): GameController {
  let stage = 1;
  let won = false;
  return {
    init: (w, h, cb) => { stage = 1; won = false; cb.setStatus('COMPLETE 3-PART MASTER IQ TRIAL'); },
    update: (dt, input, cb) => {},
    handlePointerDown: (x, y, cb) => {
      stage++;
      sounds.playClick();
      if (stage > 3) {
        won = true;
        sounds.playVictory();
        cb.winGame(5000);
      }
    },
    render: (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '22px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText(`STAGE ${stage}/3 · TAP TO ADVANCE`, w / 2, h / 2);
    },
  };
}
