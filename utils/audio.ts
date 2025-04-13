export class AudioPlayer {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;
  private lastToneTime = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        // Just create the context, but don't start anything until user interaction
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.audioContext = new AudioContextClass();
        }
      } catch (error) {
        console.warn('AudioContext initialization failed:', error);
      }
    }
  }

  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    
    // Resume audio context on user interaction (when enabling sound)
    if (enabled && this.audioContext && this.audioContext.state === 'suspended') {
      try {
        this.audioContext.resume();
      } catch (error) {
        console.warn('Failed to resume audio context:', error);
      }
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public playToneForValue(value: number, maxValue: number): void {
    if (!this.enabled || !this.audioContext) return;
    
    // Map the value to a frequency between 220Hz (A3) and 880Hz (A5)
    const minFreq = 220;
    const maxFreq = 880;
    const normalizedValue = value / maxValue;
    const frequency = minFreq + normalizedValue * (maxFreq - minFreq);
    
    // Rate limit tones to avoid overwhelming the audio system
    const now = Date.now();
    if (now - this.lastToneTime < 30) return;
    this.lastToneTime = now;
    
    try {
      // Create oscillator node for tone
      const oscillator = this.audioContext.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      
      // Create gain node for volume control
      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = 0.1; // Low volume
      
      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // Play tone with fade out
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.05);
      oscillator.stop(this.audioContext.currentTime + 0.05);
      
      // Clean up
      oscillator.onended = () => {
        oscillator.disconnect();
        gainNode.disconnect();
      };
    } catch (error) {
      console.warn('Error playing tone:', error);
    }
  }

  public cleanup(): void {
    if (this.audioContext) {
      try {
        if (this.audioContext.state !== 'closed') {
          this.audioContext.close();
        }
      } catch (e) {
        // Ignore errors on cleanup
      }
      this.audioContext = null;
    }
  }
}