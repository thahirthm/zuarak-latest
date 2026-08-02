import { useState, useEffect } from 'react';

type Listener = (state: boolean) => void;

let isSoundEnabled = false;
const listeners = new Set<Listener>();

export const toggleSound = () => {
  isSoundEnabled = !isSoundEnabled;
  listeners.forEach((listener) => listener(isSoundEnabled));
};

export const getSoundState = () => isSoundEnabled;

export const useSoundStore = () => {
  const [soundEnabled, setSoundEnabled] = useState(isSoundEnabled);

  useEffect(() => {
    listeners.add(setSoundEnabled);
    return () => {
      listeners.delete(setSoundEnabled);
    };
  }, []);

  return { isSoundEnabled: soundEnabled, toggleSound };
};
