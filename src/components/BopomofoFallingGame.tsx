import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { bopomofoList } from '../data/bopomofo';
import SoundEffects from '../utils/SoundEffects';
import '../styles/BopomofoFallingGame.css';

const GAME_DURATION = 60; // 遊戲時長(秒)
const INITIAL_FALL_SPEED = 0.05; // 初始掉落速度(px/ms)
const MAX_FALL_SPEED = 0.2; // 最快掉落速度(px/ms)
const SPEED_UP_INTERVAL = 10000; // 每10秒增加速度
const SPEED_UP_RATE = 0.05; // 每次增加的速度
const SPAWN_INTERVAL = 3000; // 生成新注音的間隔(ms)
const MAX_FALLING = 3; // 最多同時掉落的注音數量

interface FallingBopomofo {
  id: number;
  symbol: string;
  x: number; // 水平位置(0-1)
  y: number; // 垂直位置(px)
  speed: number; // 掉落速度(px/ms)
  createdAt: number;
}

const getRandomBopomofo = () => {
  const idx = Math.floor(Math.random() * bopomofoList.length);
  return bopomofoList[idx];
};

const BopomofoFallingGame: React.FC = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [miss, setMiss] = useState(0);
  const [falling, setFalling] = useState<FallingBopomofo[]>([]);
  const [fallSpeed, setFallSpeed] = useState(INITIAL_FALL_SPEED);
  const [lastId, setLastId] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const spawnTimerRef = useRef<NodeJS.Timeout | null>(null);
  const speedUpTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);

  // 初始化音效系統
  useEffect(() => {
    SoundEffects.init();
    SoundEffects.toggleSound(soundEnabled);
    SoundEffects.setSoundType('soft');
  }, [soundEnabled]);

  // 遊戲倒數計時和速度提升
  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft <= 0) {
      setIsRunning(false);
      return;
    }
    
    // 倒數計時
    timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    
    return () => { 
      if (timerRef.current) clearTimeout(timerRef.current); 
    };
  }, [isRunning, timeLeft]);
  
  // 定期增加速度
  useEffect(() => {
    if (!isRunning) return;
    
    // 定期增加速度
    const speedUp = () => {
      setFallSpeed(speed => {
        const newSpeed = speed + SPEED_UP_RATE;
        console.log(`Speed increased to: ${newSpeed.toFixed(2)}`);
        return Math.min(MAX_FALL_SPEED, newSpeed);
      });
    };
    
    // 設置定時器，每隔 SPEED_UP_INTERVAL 毫秒增加一次速度
    speedUpTimerRef.current = setInterval(speedUp, SPEED_UP_INTERVAL);
    
    return () => {
      if (speedUpTimerRef.current) clearInterval(speedUpTimerRef.current);
    };
  }, [isRunning]);

  // 生成新注音
  useEffect(() => {
    if (!isRunning) return;
    
    const spawnBopomofo = () => {
      if (falling.length >= MAX_FALLING) return;
      
      setLastId(id => id + 1);
      setFalling(fallings => [
        ...fallings,
        {
          id: lastId + 1,
          symbol: getRandomBopomofo(),
          x: Math.random() * 0.8 + 0.1, // 在 10%-90% 的範圍內隨機生成
          y: 0,
          speed: 0, // 不再使用自身速度，改為使用全局速度
          createdAt: Date.now(),
        },
      ]);
    };

    spawnBopomofo();
    spawnTimerRef.current = setInterval(spawnBopomofo, SPAWN_INTERVAL);
    
    return () => {
      if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
    };
  }, [isRunning, falling.length, lastId]); // 移除 fallSpeed 依賴，避免速度變化導致重新設置生成計時器

  // 注音下落動畫
  useEffect(() => {
    if (!isRunning) return;
    
    const updatePositions = (timestamp: number) => {
      if (!lastUpdateRef.current) {
        lastUpdateRef.current = timestamp;
      }
      
      const deltaTime = timestamp - lastUpdateRef.current;
      lastUpdateRef.current = timestamp;
      
      // 獲取當前遊戲區域高度
      const gameAreaHeight = gameAreaRef.current?.clientHeight || 0;
      
      setFalling(fallings => {
        const newFallings = fallings.map(f => ({
          ...f,
          y: f.y + fallSpeed * deltaTime, // 使用當前全局速度，而不是符號自身的速度
        }));
        
        // 檢查是否掉到底部
        const missed = newFallings.filter(f => f.y >= gameAreaHeight).length;
        if (missed > 0) {
          setMiss(m => m + missed);
        }
        
        return newFallings.filter(f => f.y < gameAreaHeight);
      });
      
      animationFrameRef.current = requestAnimationFrame(updatePositions);
    };
    
    animationFrameRef.current = requestAnimationFrame(updatePositions);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning, fallSpeed]); // 添加 fallSpeed 作為依賴項，確保速度變化時會重新設置動畫

  // 鍵盤輸入
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isRunning) return;
    const key = e.key;
    
    setFalling(fallings => {
      const idx = fallings.findIndex(f => f.symbol === key);
      if (idx !== -1) {
        const f = fallings[idx];
        // 獲取當前遊戲區域高度
        const gameAreaHeight = gameAreaRef.current?.clientHeight || 1;
        // 分數計算：越快按對分數越高
        const base = 10;
        const bonus = Math.max(0, Math.round((1 - f.y / gameAreaHeight) * 20));
        setScore(s => s + base + bonus);
        
        // 播放正確音效
        SoundEffects.playCorrect();
        
        return fallings.filter((_, i) => i !== idx);
      }
      return fallings;
    });
  }, [isRunning]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // 開始遊戲
  const startGame = () => {
    // 先停止遊戲狀態，確保所有相關計時器會被清理
    setIsRunning(false);
    
    // 清除所有計時器
    if (timerRef.current) clearTimeout(timerRef.current);
    if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
    if (speedUpTimerRef.current) clearInterval(speedUpTimerRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    
    // 重置所有狀態
    setTimeLeft(GAME_DURATION);
    setScore(0);
    setMiss(0);
    setFalling([]);
    setFallSpeed(INITIAL_FALL_SPEED);
    setLastId(0);
    lastUpdateRef.current = 0;
    
    // 短暫延遲後啟動遊戲，確保所有清理工作完成
    setTimeout(() => {
      setIsRunning(true);
    }, 50);
  };

  const handleBack = () => {
    navigate('/chinese');
  };

  // 切換音效
  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    SoundEffects.toggleSound(newState);
  };

  return (
    <div className="bopomofo-game-container">
      <div className="bopomofo-game-header">
        <h2>注音快打</h2>
        <div className="header-buttons">
          {isRunning && (
            <button className="restart-button small" onClick={startGame}>
              重新開始
            </button>
          )}
          <button className="sound-button" onClick={toggleSound}>
            {soundEnabled ? '關閉音效' : '開啟音效'}
          </button>
          <button className="back-button" onClick={handleBack}>
            返回中文打字
          </button>
        </div>
      </div>
      <div className="bopomofo-game-info">
        <div className="info-item"><span className="info-label">剩餘時間</span><span className="info-value">{timeLeft}秒</span></div>
        <div className="info-item"><span className="info-label">分數</span><span className="info-value">{score}</span></div>
        <div className="info-item"><span className="info-label">失誤</span><span className="info-value">{miss}</span></div>
      </div>
      <div className="bopomofo-game-area" ref={gameAreaRef}>
        {falling.map(f => (
          <div
            key={f.id}
            className="bopomofo-falling"
            style={{
              left: `${f.x * 100}%`,
              top: `${f.y}px`,
              transform: `translateX(-50%)`,
              animation: `bounce 0.3s ease-in-out`,
            }}
          >
            {f.symbol}
          </div>
        ))}
        {!isRunning && (
          <div className="bopomofo-game-overlay">
            {timeLeft === 0 ? (
              <>
                <div className="game-over-title">遊戲結束！</div>
                <div className="game-over-score">分數：{score}</div>
                <div className="game-over-miss">失誤：{miss}</div>
                <button className="restart-button" onClick={startGame}>再玩一次</button>
              </>
            ) : (
              <>
                <div className="game-start-title">注音快打</div>
                <div className="game-start-desc">看到符號掉落時，用鍵盤輸入對應的注音符號</div>
                <button className="start-button" onClick={startGame}>開始遊戲</button>
              </>
            )}
          </div>
        )}
      </div>
      <div className="bopomofo-game-tip">
        請用鍵盤輸入對應的注音符號
        <br />
        越快按對分數越高！
      </div>
    </div>
  );
};

export default BopomofoFallingGame; 