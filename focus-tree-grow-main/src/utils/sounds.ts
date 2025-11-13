// Create simple audio tones using Web Audio API
export const playCompletionSound = () => {
  const audioContext = new AudioContext();
  const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 - major chord
  
  notes.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = "sine";
    
    const startTime = audioContext.currentTime + (index * 0.15);
    gainNode.gain.setValueAtTime(0.3, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.5);
  });
};

export const playTickSound = () => {
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 800;
  oscillator.type = "sine";
  
  gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
  
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.1);
};

export const playBreakSound = () => {
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 400;
  oscillator.type = "sine";
  
  gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
  
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.3);
};

// Ambient sounds
let ambientOscillator: OscillatorNode | null = null;
let ambientGain: GainNode | null = null;
let audioContext: AudioContext | null = null;

export const startAmbientSound = (type: 'rain' | 'forest' | 'ocean') => {
  stopAmbientSound();
  
  audioContext = new AudioContext();
  ambientGain = audioContext.createGain();
  ambientGain.connect(audioContext.destination);
  ambientGain.gain.value = 0.05;

  // Simple ambient noise simulation
  if (type === 'rain') {
    const bufferSize = 4096;
    const whiteNoise = audioContext.createScriptProcessor(bufferSize, 1, 1);
    whiteNoise.onaudioprocess = (e) => {
      const output = e.outputBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
    };
    whiteNoise.connect(ambientGain);
  } else if (type === 'forest' || type === 'ocean') {
    ambientOscillator = audioContext.createOscillator();
    ambientOscillator.type = 'sine';
    ambientOscillator.frequency.value = type === 'forest' ? 200 : 100;
    ambientOscillator.connect(ambientGain);
    ambientOscillator.start();
    
    // Modulation for natural sound
    const lfo = audioContext.createOscillator();
    const lfoGain = audioContext.createGain();
    lfo.frequency.value = 0.5;
    lfoGain.gain.value = 50;
    lfo.connect(lfoGain);
    lfoGain.connect(ambientOscillator.frequency);
    lfo.start();
  }
};

export const stopAmbientSound = () => {
  if (ambientOscillator) {
    ambientOscillator.stop();
    ambientOscillator = null;
  }
  if (ambientGain) {
    ambientGain.disconnect();
    ambientGain = null;
  }
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
};
