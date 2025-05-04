// 音效管理工具
class SoundEffects {
  private static audioContext: AudioContext | null = null;
  private static correctSound: AudioBuffer | null = null;
  private static correctSoundSoft: AudioBuffer | null = null;
  private static isSoundEnabled: boolean = true;
  private static soundType: 'normal' | 'soft' = 'soft'; // 預設使用柔和音效

  // 初始化音效系統
  static init(): void {
    try {
      // 創建音頻上下文
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      // 創建正確按鍵的音效
      if (!this.correctSound) {
        this.generateCorrectSound();
      }
      
      // 創建柔和的正確按鍵音效
      if (!this.correctSoundSoft) {
        this.generateCorrectSoundSoft();
      }
    } catch (error) {
      console.error('無法初始化音效系統:', error);
    }
  }

  // 生成正確按鍵的音效
  private static generateCorrectSound(): void {
    if (!this.audioContext) return;

    // 創建一個短暫的音頻緩衝區
    const sampleRate = this.audioContext.sampleRate;
    const duration = 0.2; // 音效持續時間增加，單位：秒
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const channelData = buffer.getChannelData(0);

    // 生成一個簡單的音調 - 降低頻率
    const baseFreq = 440; // 基本頻率降低到 440Hz (A4)
    for (let i = 0; i < buffer.length; i++) {
      // 創建一個衰減的正弦波
      const t = i / sampleRate;
      const decay = Math.exp(-8 * t); // 降低衰減率，使聲音更柔和
      channelData[i] = Math.sin(2 * Math.PI * baseFreq * t) * decay * 0.4; // 降低音量
    }

    this.correctSound = buffer;
  }
  
  // 生成柔和的正確按鍵音效
  private static generateCorrectSoundSoft(): void {
    if (!this.audioContext) return;

    const sampleRate = this.audioContext.sampleRate;
    const duration = 0.25;
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const channelData = buffer.getChannelData(0);

    // 使用更低的頻率和更柔和的衰減
    const baseFreq = 330; // 降至 330Hz (E4)
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      
      // 使用柔和的ADSR包絡
      let amplitude = 0;
      const attackTime = 0.01;
      const decayTime = 0.05;
      const sustainLevel = 0.3;
      const releaseTime = 0.19;
      
      if (t < attackTime) {
        // 漸入
        amplitude = (t / attackTime) * 0.4;
      } else if (t < attackTime + decayTime) {
        // 衰減
        const decayProgress = (t - attackTime) / decayTime;
        amplitude = 0.4 - (0.4 - sustainLevel) * decayProgress;
      } else if (t < duration - releaseTime) {
        // 持續
        amplitude = sustainLevel;
      } else {
        // 釋放
        const releaseProgress = (t - (duration - releaseTime)) / releaseTime;
        amplitude = sustainLevel * (1 - releaseProgress);
      }
      
      // 添加輕微的泛音豐富音色
      channelData[i] = (
        Math.sin(2 * Math.PI * baseFreq * t) * 0.7 + 
        Math.sin(2 * Math.PI * baseFreq * 2 * t) * 0.2 + 
        Math.sin(2 * Math.PI * baseFreq * 3 * t) * 0.1
      ) * amplitude;
    }

    this.correctSoundSoft = buffer;
  }

  // 播放正確按鍵的音效
  static playCorrect(): void {
    if (!this.audioContext || (!this.correctSound && !this.correctSoundSoft) || !this.isSoundEnabled) return;
    
    try {
      const source = this.audioContext.createBufferSource();
      
      // 選擇要播放的音效
      if (this.soundType === 'soft' && this.correctSoundSoft) {
        source.buffer = this.correctSoundSoft;
      } else if (this.correctSound) {
        source.buffer = this.correctSound;
      } else {
        return;
      }
      
      // 創建增益節點控制音量
      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = 0.7; // 音量
      
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      source.start();
    } catch (error) {
      console.error('播放音效失敗:', error);
    }
  }

  // 開啟/關閉音效
  static toggleSound(enabled: boolean): void {
    this.isSoundEnabled = enabled;
    
    // 如果開啟音效但尚未初始化，則進行初始化
    if (enabled && !this.audioContext) {
      this.init();
    }
  }

  // 切換音效類型
  static setSoundType(type: 'normal' | 'soft'): void {
    this.soundType = type;
  }

  // 取得當前音效類型
  static getSoundType(): 'normal' | 'soft' {
    return this.soundType;
  }

  // 檢查音效是否已啟用
  static isSoundOn(): boolean {
    return this.isSoundEnabled;
  }
}

export default SoundEffects; 