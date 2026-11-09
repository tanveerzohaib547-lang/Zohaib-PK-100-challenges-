import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GameDefinition, GameRunState, InputState } from '../types/game';
import { getGameController } from '../games/registry';
import { GameController, GameCallbacks } from '../games/gameEngineTypes';
import { GameHUD } from './GameHUD';
import { PauseModal } from './PauseModal';
import { VictoryModal } from './VictoryModal';
import { GameOverModal } from './GameOverModal';
import { sounds } from '../audio/soundEngine';
import { calculateStars } from '../utils/rules';

interface GameViewProps {
  game: GameDefinition;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onLevelComplete: (levelId: number, score: number, stars: number, clearTime: number, isFlawless: boolean) => void;
  onNextLevel: () => void;
  onSelectLevel: () => void;
  onHome: () => void;
  hasNextLevel: boolean;
}

export const GameView: React.FC<GameViewProps> = ({
  game,
  soundEnabled,
  onToggleSound,
  onLevelComplete,
  onNextLevel,
  onSelectLevel,
  onHome,
  hasNextLevel,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const controllerRef = useRef<GameController | null>(null);

  // High-frequency simulation state stored in refs to avoid React re-renders at 60fps
  const runStateRef = useRef<GameRunState>({
    levelId: game.id,
    score: 0,
    lives: game.initialLives,
    maxLives: game.initialLives,
    timeRemaining: game.timeLimit ?? 60,
    elapsedTime: 0,
    isWon: false,
    isLost: false,
    isPaused: false,
    starsAwarded: 0,
    customStatus: '',
  });

  // UI state for modals only updated on discrete events
  const [hudState, setHudState] = useState<GameRunState>(runStateRef.current);
  const [gameState, setGameState] = useState<'playing' | 'paused' | 'victory' | 'gameover'>('playing');

  // Input state
  const inputRef = useRef<InputState>({
    left: false,
    right: false,
    up: false,
    down: false,
    actionA: false,
    actionB: false,
    pointerX: 0,
    pointerY: 0,
    pointerDown: false,
    pointerJustTapped: false,
    swipeDirection: null,
  });

  const [inputState, setInputState] = useState<InputState>(inputRef.current);

  // Sync document.body.dataset.state
  useEffect(() => {
    document.body.dataset.state = gameState === 'playing' ? 'playing' : gameState === 'paused' ? 'paused' : 'gameover';
  }, [gameState]);

  // Restart level handler
  const handleRestart = useCallback(() => {
    runStateRef.current = {
      levelId: game.id,
      score: 0,
      lives: game.initialLives,
      maxLives: game.initialLives,
      timeRemaining: game.timeLimit ?? 60,
      elapsedTime: 0,
      isWon: false,
      isLost: false,
      isPaused: false,
      starsAwarded: 0,
      customStatus: '',
    };
    setHudState({ ...runStateRef.current });
    setGameState('playing');

    if (canvasRef.current) {
      const controller = getGameController(game.id);
      controllerRef.current = controller;
      controller.init(canvasRef.current.width, canvasRef.current.height, callbacksRef.current);
    }
  }, [game]);

  // Callbacks passed into game controller
  const callbacksRef = useRef<GameCallbacks>({
    addScore: (points: number) => {
      runStateRef.current.score += points;
    },
    loseLife: (reason?: string) => {
      runStateRef.current.lives--;
      if (reason) runStateRef.current.customStatus = reason;
      if (runStateRef.current.lives <= 0 && !runStateRef.current.isWon) {
        runStateRef.current.isLost = true;
        setHudState({ ...runStateRef.current });
        setGameState('gameover');
      }
    },
    winGame: (bonusPoints: number = 0) => {
      if (runStateRef.current.isWon || runStateRef.current.isLost) return;
      runStateRef.current.isWon = true;
      runStateRef.current.score += bonusPoints;

      const starResult = calculateStars(
        runStateRef.current.score,
        game.targetScore ?? 1000,
        runStateRef.current.lives,
        runStateRef.current.maxLives,
        runStateRef.current.timeRemaining,
        game.timeLimit ?? 30
      );

      runStateRef.current.starsAwarded = starResult.stars;
      setHudState({ ...runStateRef.current });
      setGameState('victory');

      onLevelComplete(
        game.id,
        runStateRef.current.score,
        starResult.stars,
        runStateRef.current.elapsedTime,
        starResult.isFlawless
      );
    },
    setStatus: (status: string) => {
      runStateRef.current.customStatus = status;
      setHudState((prev) => ({ ...prev, customStatus: status }));
    },
  });

  // Direction input from mobile D-Pad
  const handleDirectionInput = useCallback((dir: 'left' | 'right' | 'up' | 'down', active: boolean) => {
    inputRef.current[dir] = active;
    setInputState({ ...inputRef.current });
  }, []);

  const handleTriggerActionA = useCallback(() => {
    inputRef.current.actionA = true;
    setInputState({ ...inputRef.current });
    if (controllerRef.current && canvasRef.current) {
      controllerRef.current.handlePointerDown?.(
        canvasRef.current.width / 2,
        canvasRef.current.height / 2,
        callbacksRef.current
      );
    }
    setTimeout(() => {
      inputRef.current.actionA = false;
      setInputState({ ...inputRef.current });
    }, 150);
  }, []);

  const handleTriggerActionB = useCallback(() => {
    inputRef.current.actionB = true;
    setInputState({ ...inputRef.current });
    setTimeout(() => {
      inputRef.current.actionB = false;
      setInputState({ ...inputRef.current });
    }, 150);
  }, []);

  // Main 60fps Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set fixed virtual canvas resolution (e.g. 960x540)
    canvas.width = 960;
    canvas.height = 540;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize the controller
    const controller = getGameController(game.id);
    controllerRef.current = controller;
    controller.init(canvas.width, canvas.height, callbacksRef.current);

    sounds.startMusic(game.stageId);

    let animationFrameId: number;
    let lastTime = performance.now();
    let hudSyncTimer = 0;

    const loop = (time: number) => {
      const rawDt = (time - lastTime) / 1000;
      lastTime = time;
      const dt = Math.min(rawDt, 0.05);

      if (gameState === 'playing' && !runStateRef.current.isWon && !runStateRef.current.isLost) {
        // Countdown timer
        if (game.timeLimit !== undefined) {
          runStateRef.current.timeRemaining = Math.max(0, runStateRef.current.timeRemaining - dt);
          if (runStateRef.current.timeRemaining <= 0) {
            callbacksRef.current.loseLife('Time limit expired!');
          }
        }
        runStateRef.current.elapsedTime += dt;

        // Update active game logic
        controller.update(dt, inputRef.current, callbacksRef.current);

        // Periodically sync HUD display (approx 4 times per second to keep React light)
        hudSyncTimer += dt;
        if (hudSyncTimer > 0.25) {
          hudSyncTimer = 0;
          setHudState({ ...runStateRef.current });
        }
      }

      // Render frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      controller.render(ctx, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      sounds.stopMusic();
      controller.cleanup?.();
    };
  }, [game, gameState]);

  // Global Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') inputRef.current.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') inputRef.current.right = true;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') inputRef.current.up = true;
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') inputRef.current.down = true;
      if (e.key === ' ' || e.key === 'Enter') {
        inputRef.current.actionA = true;
        handleTriggerActionA();
      }
      if (e.key === 'Shift' || e.key === 'j' || e.key === 'J') inputRef.current.actionB = true;

      // Utilities
      if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
        setGameState((prev) => (prev === 'playing' ? 'paused' : prev === 'paused' ? 'playing' : prev));
      }
      if (e.key === 'r' || e.key === 'R') {
        handleRestart();
      }
      if (e.key === 'm' || e.key === 'M') {
        onToggleSound();
      }

      setInputState({ ...inputRef.current });
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') inputRef.current.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') inputRef.current.right = false;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') inputRef.current.up = false;
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') inputRef.current.down = false;
      if (e.key === ' ' || e.key === 'Enter') inputRef.current.actionA = false;
      if (e.key === 'Shift' || e.key === 'j' || e.key === 'J') inputRef.current.actionB = false;

      setInputState({ ...inputRef.current });
    };

    const handleBlur = () => {
      // Clear all keys on blur to prevent sticking
      inputRef.current.left = false;
      inputRef.current.right = false;
      inputRef.current.up = false;
      inputRef.current.down = false;
      inputRef.current.actionA = false;
      inputRef.current.actionB = false;
      setInputState({ ...inputRef.current });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, [handleRestart, handleTriggerActionA, onToggleSound]);

  // Canvas Click/Touch Handler
  const handleCanvasPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !controllerRef.current) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    inputRef.current.pointerX = clickX;
    inputRef.current.pointerY = clickY;
    inputRef.current.pointerDown = true;
    inputRef.current.pointerJustTapped = true;

    controllerRef.current.handlePointerDown?.(clickX, clickY, callbacksRef.current);
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden flex items-center justify-center select-none">
      {/* 60fps Canvas Viewport */}
      <canvas
        ref={canvasRef}
        data-testid="game-canvas"
        onPointerDown={handleCanvasPointerDown}
        className="w-full h-full object-contain max-w-[1920px] max-h-[1080px] bg-slate-950 cursor-crosshair"
      />

      {/* World-Matched Low-Occlusion HUD Overlay */}
      <GameHUD
        game={game}
        runState={hudState}
        soundEnabled={soundEnabled}
        onToggleSound={onToggleSound}
        onPause={() => setGameState('paused')}
        onRestart={handleRestart}
        onHome={onHome}
        onTriggerActionA={handleTriggerActionA}
        onTriggerActionB={handleTriggerActionB}
        onDirectionInput={handleDirectionInput}
        inputState={inputState}
      />

      {/* Modals */}
      {gameState === 'paused' && (
        <PauseModal
          game={game}
          runState={hudState}
          onResume={() => setGameState('playing')}
          onRestart={handleRestart}
          onSelectLevel={onSelectLevel}
          onHome={onHome}
        />
      )}

      {gameState === 'victory' && (
        <VictoryModal
          game={game}
          runState={hudState}
          onNextLevel={onNextLevel}
          onRestart={handleRestart}
          onSelectLevel={onSelectLevel}
          onHome={onHome}
          hasNextLevel={hasNextLevel}
        />
      )}

      {gameState === 'gameover' && (
        <GameOverModal
          game={game}
          runState={hudState}
          onRetry={handleRestart}
          onSelectLevel={onSelectLevel}
          onHome={onHome}
        />
      )}
    </div>
  );
};
