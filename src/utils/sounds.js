import click from '../assets/sounds/click.wav';
import flip from '../assets/sounds/flip.mp3';
import backgroundMusic from '../assets/sounds/background-music.mp3';

const sounds = {
  click: new Audio(click),
  flip: new Audio(flip),
  backgroundMusic: new Audio(backgroundMusic),
};

sounds.click.volume = 0.2;
sounds.flip.volume = 0.5;
sounds.backgroundMusic.volume = 0.2;
sounds.backgroundMusic.loop = true;

let musicMuted = true;
let effectsMuted = false;

export function playSound(soundName) {
  const sound = sounds[soundName];

  if (!sound || (soundName !== 'backgroundMusic' && effectsMuted)) return;

  if (soundName !== 'backgroundMusic') sound.currentTime = 0;

  sound.muted = soundName === 'backgroundMusic' ? musicMuted : false;

  sound.play();
}

export function toggleMusic() {
  musicMuted = !musicMuted;

  if (musicMuted) {
    sounds.backgroundMusic.muted = true;
  } else {
    sounds.backgroundMusic.muted = false;
    sounds.backgroundMusic.play();
  }
}

export function toggleSoundEffects() {
  effectsMuted = !effectsMuted;
}
