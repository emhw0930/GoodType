import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useTimer from '../hooks/useTimer';
import useLocalStorage from '../hooks/useLocalStorage';
import { englishWords } from '../data/englishWords';
import '../styles/TypingTest.css';
import '../styles/ChineseTypingTest.css';

interface EnglishTypingTestProps {
  // 移除 onBack prop
}

interface TestResults {
  wpm: number;
  accuracy: number;
}

const EnglishTypingTest: React.FC<EnglishTypingTestProps> = () => {
  const navigate = useNavigate(); // 使用navigate代替onBack
  
  const [wordList, setWordList] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [correctWords, setCorrectWords] = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [results, setResults] = useState<TestResults | null>(null);
  const [lastScore, setLastScore] = useLocalStorage<TestResults | null>('lastEnglishScore', null);
  const [highScore, setHighScore] = useLocalStorage<TestResults | null>('highestEnglishScore', null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [wordStatus, setWordStatus] = useState<Array<'correct' | 'incorrect' | null>>([]);
  const [hasTypingError, setHasTypingError] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const { timeLeft, isActive, isFinished, startTimer, resetTimer } = useTimer(60);

  const LINES_ON_SCREEN = 2;
  const WORDS_PER_LINE = 5;
  const [currentLine, setCurrentLine] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // 生成隨機單詞列表
  useEffect(() => {
    generateWordList();
  }, []);

  const toggleTimer = () => {
    setShowTimer(!showTimer);
  };

  useEffect(() => {
    if (isFinished) {
      const wpm = Math.round(totalChars / 4.7); // 使用字符數除以4.7計算WPM
      const accuracy = totalWords > 0 ? Math.round((correctWords / totalWords) * 100) : 0;
      
      const currentResults = { wpm, accuracy };
      setResults(currentResults);
      setLastScore(currentResults);
      
      if (!highScore || wpm > highScore.wpm) {
        setHighScore(currentResults);
      }
    }
  }, [isFinished, correctWords, totalWords, totalChars, setLastScore, setHighScore, highScore]);

  const generateWordList = () => {
    // 打亂並選擇隨機單詞
    const shuffled = [...englishWords].sort(() => 0.5 - Math.random());
    setWordList(shuffled.slice(0, 200)); // 顯示200個單詞
    setCurrentIndex(0);
    setWordStatus(Array(200).fill(null));
    setHasTypingError(false);
  };

  const moveToNextWord = () => {
    setCurrentIndex(prev => {
      if (prev < wordList.length - 1) {
        return prev + 1;
      } else {
        // 生成新的單詞列表
        generateWordList();
        return 0;
      }
    });
    setHasTypingError(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive && !isFinished) {
      startTimer();
    }
    
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // 檢查是否有錯誤
    if (wordList[currentIndex]) {
      const currentWord = wordList[currentIndex].toLowerCase();
      const typedPart = newValue.toLowerCase();
      
      // 僅在有輸入內容時進行檢查
      if (typedPart.length > 0) {
        // 檢查到目前為止輸入的部分是否與單詞的開頭部分匹配
        const isCorrectSoFar = currentWord.startsWith(typedPart);
        setHasTypingError(!isCorrectSoFar);
      } else {
        // 無輸入時，重置錯誤狀態
        setHasTypingError(false);
      }
    }
  };

  // 防止重複處理Enter鍵事件
  const [isProcessingEnter, setIsProcessingEnter] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      
      // 防止重複處理
      if (isProcessingEnter) return;
      
      setIsProcessingEnter(true);
      handleSubmit();
      
      // 重置處理狀態
      setTimeout(() => {
        setIsProcessingEnter(false);
      }, 100);
    }
  };

  const clearInput = () => {
    // 先模擬發送ESC鍵事件以強制清除輸入法緩衝區
    if (inputRef.current) {
      // 創建ESC鍵事件
      const escEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        which: 27,
        bubbles: true,
        cancelable: true
      });
      
      // 發送ESC鍵事件
      inputRef.current.dispatchEvent(escEvent);
      
      // 確保輸入框失去焦點後再重新獲得焦點，以清除輸入法狀態
      inputRef.current.blur();
      
      // 延遲設置輸入值和重新聚焦，確保輸入法緩衝區已清空
      setTimeout(() => {
        setInputValue(''); // 使用狀態清空輸入框
        
        // 確保輸入框獲得焦點
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 10);
    } else {
      setInputValue(''); // 如果ref不存在，直接清空
    }
  };

  const getLineWords = (line: number) => {
    const start = line * WORDS_PER_LINE;
    return wordList.slice(start, start + WORDS_PER_LINE);
  };

  const handleSubmit = () => {
    if (isFinished || !wordList.length) return;
    const globalIdx = currentLine * WORDS_PER_LINE + currentWordIndex;
    const currentWord = wordList[globalIdx];
    if (!currentWord || !inputValue.trim()) return;
    const isCorrect = inputValue.toLowerCase().trim() === currentWord.toLowerCase();
    setTotalWords(prev => prev + 1);
    setTotalChars(prev => prev + currentWord.length);
    if (isCorrect) {
      setCorrectWords(prev => prev + 1);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
    const newStatus = [...wordStatus];
    newStatus[globalIdx] = isCorrect ? 'correct' : 'incorrect';
    setWordStatus(newStatus);
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

  const handleReset = () => {
    generateWordList();
    setCurrentIndex(0);
    setCurrentLine(0);
    setCurrentWordIndex(0);
    setCorrectWords(0);
    setTotalWords(0);
    setTotalChars(0);
    setResults(null);
    setWordStatus(Array(200).fill(null));
    setInputValue('');
    setHasTypingError(false);
    resetTimer();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // 確保在渲染前有有效的 wordList
  useEffect(() => {
    if (wordList.length === 0) {
      generateWordList();
    }
  }, [wordList]);

  // 確保 currentIndex 不超出範圍
  useEffect(() => {
    if (wordList.length > 0 && currentIndex >= wordList.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, wordList]);

  // 確保在詞語改變時輸入框被清空
  useEffect(() => {
    clearInput();
    setHasTypingError(false);
  }, [currentIndex]);

  // 如果沒有 wordList 或 currentIndex 超出範圍，不要渲染輸入部分
  const shouldRenderInput = wordList.length > 0 && currentIndex < wordList.length;

  // 更新返回功能使用navigate
  const handleBack = () => {
    navigate('/');
  };

  // 更新切換到中文功能使用navigate
  const switchToChinese = () => {
    navigate('/chinese');
  };

  return (
    <div className="typing-test english-test">
      <div className="header">
        <button className="back-button" onClick={handleBack}>← Back</button>
        <h2 className="title">English Typing Practice</h2>
        <button className="language-button" onClick={switchToChinese}>
          切換到中文
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
                  {words.map((word, idx) => {
                    const globalIdx = lineNum * WORDS_PER_LINE + idx;
                    const isCurrent = lineOffset === 0 && idx === currentWordIndex;
                    return (
                      <div
                        key={`word-${globalIdx}`}
                        className={`english-word${isCurrent ? ' current' : ''}`}
                      >
                        <div
                          className={`hanzi ${
                            wordStatus[globalIdx]
                              ? `${wordStatus[globalIdx]}-hanzi`
                              : ''
                          }`}
                        >
                          {word}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {shouldRenderInput && (
            <div className={`input-container ${feedback ? `feedback-${feedback}` : ''}`}>
              <div className="display-container">
                <div className="current-hanzi-display">
                  Current Word: {wordList[currentIndex] || 'Loading...'}
                </div>
                <div className="records-container">
                  {lastScore && lastScore !== highScore && (
                    <div className="last-score-display">
                      Last: {lastScore.wpm} WPM
                    </div>
                  )}
                  {highScore && (
                    <div className="high-score-display">
                      Best: {highScore.wpm} WPM
                    </div>
                  )}
                </div>
              </div>
              
              <div className="input-controls-container">
                <input
                  ref={inputRef}
                  type="text"
                  className="typing-input"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Type the word and press Space..."
                  disabled={isFinished}
                  autoFocus
                />
                <div className="typing-controls">
                  <div className="timer" onClick={toggleTimer}>
                    {showTimer ? `Time: ${timeLeft}s` : 'Time: --'}
                  </div>
                  <button className="restart-button" onClick={handleReset}>Restart</button>
                </div>
              </div>
              
              <div className="typing-hint">
                Type the complete word and press Space to continue
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="results">
          <h3>Test Completed!</h3>
          
          <div className="result-summary">
            <div className="result-item">
              <div className="result-icon">🏆</div>
              <div className="result-value">{results?.wpm}</div>
              <div className="result-label">Words Per Minute</div>
            </div>
            
            <div className="result-item">
              <div className="result-icon">📊</div>
              <div className="result-value">{results?.accuracy}%</div>
              <div className="result-label">Accuracy</div>
            </div>
          </div>
          
          <div className="high-score">
            <h4>High Score:</h4>
            <div>WPM: {highScore?.wpm}</div>
            <div>Accuracy: {highScore?.accuracy}%</div>
          </div>
          
          <button className="reset-button" onClick={handleReset}>Try Again</button>
        </div>
      )}
    </div>
  );
};

export default EnglishTypingTest; 