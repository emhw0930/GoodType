import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useTimer from '../hooks/useTimer';
import useLocalStorage from '../hooks/useLocalStorage';
import { chineseWords, ChineseWord } from '../data/chineseWords';
import '../styles/TypingTest.css';
import '../styles/ChineseTypingTest.css';

interface ChineseTypingTestProps {
  // 移除 onBack prop
}

interface TestResults {
  wpm: number;
  accuracy: number;
}

const ChineseTypingTest: React.FC<ChineseTypingTestProps> = () => {
  const navigate = useNavigate(); // 使用navigate代替onBack
  
  const [wordList, setWordList] = useState<ChineseWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [results, setResults] = useState<TestResults | null>(null);
  const [lastScore, setLastScore] = useLocalStorage<TestResults | null>('lastChineseScore', null);
  const [highScore, setHighScore] = useLocalStorage<TestResults | null>('highestChineseScore', null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [hanziStatus, setHanziStatus] = useState<Array<'correct' | 'incorrect' | null>>([]);
  const [inputValue, setInputValue] = useState(''); // 使用受控組件以確保輸入框能正確清空
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const { timeLeft, isActive, isFinished, startTimer, resetTimer } = useTimer(60);

  // Generate a random selection of words for the test
  useEffect(() => {
    generateWordList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFinished) {
      const wpm = Math.round(totalChars); // Count of Chinese characters typed
      const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
      
      const currentResults = { wpm, accuracy };
      setResults(currentResults);
      setLastScore(currentResults);
      
      if (!highScore || wpm > highScore.wpm) {
        setHighScore(currentResults);
      }
    }
  }, [isFinished, correctChars, totalChars, setLastScore, setHighScore, highScore]);

  const generateWordList = () => {
    // Shuffle and select random words
    const shuffled = [...chineseWords].sort(() => 0.5 - Math.random());
    setWordList(shuffled.slice(0, 200)); // Show 200 words at a time
    setCurrentIndex(0);
    setHanziStatus(Array(200).fill(null));
  };

  const moveToNextWord = () => {
    setCurrentIndex(prev => {
      if (prev < wordList.length - 1) {
        return prev + 1;
      } else {
        // Generate new word list if we reached the end
        generateWordList();
        return 0;
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive && !isFinished) {
      startTimer();
    }
    setInputValue(e.target.value);
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
      }, 0);
    } else {
      setInputValue(''); // 如果ref不存在，直接清空
    }
  };

  const handleSubmit = () => {
    // 額外的安全檢查
    if (isFinished || !wordList.length || currentIndex >= wordList.length) {
      return;
    }
    
    const currentWord = wordList[currentIndex].word;
    if (!currentWord) {
      return;
    }
    
    if (!inputValue.trim()) {
      return;
    }
    
    // 檢查輸入是否正確
    const isCorrect = inputValue === currentWord;
    
    // 更新統計數據
    setTotalChars(prev => prev + 2); // 每個詞是2個漢字
    if (isCorrect) {
      setCorrectChars(prev => prev + 2);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
    
    // 更新漢字狀態以顯示視覺反饋
    const newStatus = [...hanziStatus];
    newStatus[currentIndex] = isCorrect ? 'correct' : 'incorrect';
    setHanziStatus(newStatus);
    
    // 清空輸入框，必須在移動到下一個詞之前執行
    clearInput();
    
    // 隔一小段時間後清除反饋
    setTimeout(() => setFeedback(null), 300);
    
    // 確保輸入框完全清空後再移動到下一個詞
    setTimeout(() => {
      moveToNextWord();
    }, 0);
  };

  // 防止重複處理Enter鍵事件
  const [isProcessingEnter, setIsProcessingEnter] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // 防止重複處理Enter
      if (isProcessingEnter) return;
      
      setIsProcessingEnter(true);
      handleSubmit();
      
      // 重置處理狀態
      setTimeout(() => {
        setIsProcessingEnter(false);
      }, 0);
    }
  };

  const handleReset = () => {
    generateWordList();
    setCurrentIndex(0);
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

  // 確保在渲染前有有效的 wordList
  useEffect(() => {
    if (wordList.length === 0) {
      generateWordList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // 如果沒有 wordList 或 currentIndex 超出範圍，不要渲染輸入部分
  const shouldRenderInput = wordList.length > 0 && currentIndex < wordList.length;

  // 更新返回功能使用navigate
  const handleBack = () => {
    navigate('/');
  };

  // 更新切換到英文功能使用navigate
  const switchToEnglish = () => {
    navigate('/english');
  };

  const toggleTimer = () => {
    setShowTimer(!showTimer);
  };

  return (
    <div className="typing-test chinese-test">
      <div className="header">
        <button className="back-button" onClick={handleBack}>← 返回</button>
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
            
            <div className="words-container">
              {wordList.slice(currentIndex, currentIndex + 10).map((wordObj, idx) => (
                <div 
                  key={`word-${currentIndex + idx}`} 
                  className={`chinese-word ${idx === 0 ? 'current' : ''}`}
                >
                  <div 
                    className={`hanzi ${
                      hanziStatus[currentIndex + idx] 
                        ? `${hanziStatus[currentIndex + idx]}-hanzi` 
                        : ''
                    }`}
                  >
                    {wordObj.word}
                  </div>
                  <div className="zhuyin-container">
                    {wordObj.zhuyin.map((zhuyin, zhuyinIdx) => (
                      <span key={`zhuyin-${zhuyinIdx}`}>
                        {zhuyin}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {shouldRenderInput && (
            <div className={`input-container ${feedback ? `feedback-${feedback}` : ''}`}>
              <div className="display-container">
                <div className="current-hanzi-display">
                  目前詞語: {wordList[currentIndex]?.word || '載入中...'}
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
            </div>
          )}
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