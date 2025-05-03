import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useTimer from '../hooks/useTimer';
import useLocalStorage from '../hooks/useLocalStorage';
import { chineseWords, ChineseWord } from '../data/chineseWords';
import '../styles/TypingTest.css';
import '../styles/ChineseTypingTest.css';

interface ChineseTypingTestProps {}

interface TestResults {
  wpm: number;
  accuracy: number;
}

const LINES_ON_SCREEN = 2;
const WORDS_PER_LINE = 5;

const ChineseTypingTest: React.FC<ChineseTypingTestProps> = () => {
  const navigate = useNavigate();
  
  const [wordList, setWordList] = useState<ChineseWord[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [results, setResults] = useState<TestResults | null>(null);
  const [lastScore, setLastScore] = useLocalStorage<TestResults | null>('lastChineseScore', null);
  const [highScore, setHighScore] = useLocalStorage<TestResults | null>('highestChineseScore', null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [hanziStatus, setHanziStatus] = useState<Array<'correct' | 'incorrect' | null>>([]);
  const [inputValue, setInputValue] = useState('');
  const [showTimer, setShowTimer] = useState(true);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const { timeLeft, isActive, isFinished, startTimer, resetTimer } = useTimer(60);

  useEffect(() => {
    generateWordList();
  }, []);

  useEffect(() => {
    if (isFinished) {
      const wpm = Math.round(totalChars);
      const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
      const currentResults = { wpm, accuracy };

      if (!results || results.wpm !== wpm || results.accuracy !== accuracy) {
        setResults(currentResults);
      }
      if (!lastScore || lastScore.wpm !== wpm || lastScore.accuracy !== accuracy) {
        setLastScore(currentResults);
      }
      if (!highScore || wpm > highScore.wpm) {
        setHighScore(currentResults);
      }
    }
  }, [isFinished, correctChars, totalChars, setLastScore, setHighScore, lastScore, highScore, results]);

  const generateWordList = () => {
    const shuffled = [...chineseWords].sort(() => 0.5 - Math.random());
    setWordList(shuffled.slice(0, 200));
    setCurrentLine(0);
    setCurrentWordIndex(0);
    setHanziStatus(Array(200).fill(null));
  };

  const getLineWords = (line: number) => {
    const start = line * WORDS_PER_LINE;
    return wordList.slice(start, start + WORDS_PER_LINE);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive && !isFinished) {
      startTimer();
    }
    setInputValue(e.target.value);
  };

  const clearInput = () => {
    if (inputRef.current) {
      const escEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        which: 27,
        bubbles: true,
        cancelable: true
      });
      
      inputRef.current.dispatchEvent(escEvent);
      inputRef.current.blur();
      
      setTimeout(() => {
        setInputValue('');
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    } else {
      setInputValue('');
    }
  };

  const handleSubmit = () => {
    if (isFinished || !wordList.length) return;
    const globalIdx = currentLine * WORDS_PER_LINE + currentWordIndex;
    const currentWord = wordList[globalIdx]?.word;
    if (!currentWord || !inputValue.trim()) return;
    const isCorrect = inputValue === currentWord;
    setTotalChars(prev => prev + 2);
    if (isCorrect) {
      setCorrectChars(prev => prev + 2);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
    const newStatus = [...hanziStatus];
    newStatus[globalIdx] = isCorrect ? 'correct' : 'incorrect';
    setHanziStatus(newStatus);
    clearInput();
    setTimeout(() => setFeedback(null), 300);
    setTimeout(() => {
      if (currentWordIndex < WORDS_PER_LINE - 1) {
        setCurrentWordIndex(prev => prev + 1);
      } else {
        setCurrentLine(prev => prev + 1);
        setCurrentWordIndex(0);
      }
    }, 0);
  };

  const [isProcessingEnter, setIsProcessingEnter] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      if (isProcessingEnter) return;
      
      setIsProcessingEnter(true);
      handleSubmit();
      
      setTimeout(() => {
        setIsProcessingEnter(false);
      }, 0);
    }
  };

  const handleReset = () => {
    generateWordList();
    setCorrectChars(0);
    setTotalChars(0);
    setResults(null);
    setHanziStatus(Array(200).fill(null));
    setInputValue('');
    resetTimer();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const switchToEnglish = () => {
    navigate('/english');
  };

  const toggleTimer = () => {
    setShowTimer(!showTimer);
  };

  return (
    <div className="typing-test chinese-test">
      <div className="header">
        <h2 className="title">中文打字練習</h2>
        <button className="language-button" onClick={switchToEnglish}>
          Switch to English
        </button>
      </div>

      {!isFinished ? (
        <>
          <div className="chinese-display">
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: `${Math.max(0, (60 - timeLeft) / 60 * 100)}%` }}
              ></div>
            </div>
            
            {[...Array(LINES_ON_SCREEN)].map((_, lineOffset) => {
              const lineNum = currentLine + lineOffset;
              const words = getLineWords(lineNum);
              return (
                <div className="words-container" key={lineNum}>
                  {words.map((wordObj, idx) => {
                    const globalIdx = lineNum * WORDS_PER_LINE + idx;
                    const isCurrent = lineOffset === 0 && idx === currentWordIndex;
                    return (
                      <div
                        key={`word-${globalIdx}`}
                        className={`chinese-word${isCurrent ? ' current' : ''}`}
                      >
                        <div
                          className={`hanzi ${
                            hanziStatus[globalIdx]
                              ? `${hanziStatus[globalIdx]}-hanzi`
                              : ''
                          }`}
                        >
                          {wordObj?.word}
                        </div>
                        <div className="zhuyin-container">
                          {wordObj?.zhuyin?.map((zhuyin, zhuyinIdx) => (
                            <span key={`zhuyin-${zhuyinIdx}`}>{zhuyin}</span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className={`input-container ${feedback ? `feedback-${feedback}` : ''}`}>
            <div className="input-controls-container">
              <input
                ref={inputRef}
                type="text"
                className="typing-input"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="輸入中文詞..."
                disabled={isFinished}
                autoFocus
              />
              <div className="typing-controls">
                <div className="timer" onClick={toggleTimer}>時間: {showTimer ? `${timeLeft}秒` : '--'}</div>
                <button className="restart-button" onClick={handleReset}>重新開始</button>
              </div>
            </div>
            
            <div className="typing-hint">
              輸入完整的中文詞後按 Enter 繼續
            </div>

            <div className="records-container">
              {lastScore && lastScore !== highScore && (
                <div className="last-score-display">
                  上次: {lastScore.wpm} 字
                </div>
              )}
              {highScore && (
                <div className="high-score-display">
                  最高紀錄: {highScore.wpm} 字
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="results">
          <h3>測試完成！</h3>
          
          <div className="result-summary">
            <div className="result-item">
              <div className="result-icon">🏆</div>
              <div className="result-value">{results?.wpm}</div>
              <div className="result-label">每分鐘字數</div>
            </div>
            
            <div className="result-item">
              <div className="result-icon">📊</div>
              <div className="result-value">{results?.accuracy}%</div>
              <div className="result-label">準確率</div>
            </div>
          </div>
          
          {lastScore && lastScore !== results && (
            <div className="previous-score">
              <h4>上一次分數:</h4>
              <div>每分鐘字數: {lastScore.wpm}</div>
              <div>準確率: {lastScore.accuracy}%</div>
            </div>
          )}
          
          {highScore && (
            <div className="high-score">
              <h4>最高分數:</h4>
              <div>每分鐘字數: {highScore.wpm}</div>
              <div>準確率: {highScore.accuracy}%</div>
            </div>
          )}
          
          <button className="reset-button" onClick={handleReset}>再試一次</button>
        </div>
      )}
    </div>
  );
};

export default ChineseTypingTest; 