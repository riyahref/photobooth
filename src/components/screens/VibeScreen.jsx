import React from 'react';
import { useVibeBooth } from '../../context/VibeBoothContext';
import { VIBE_COLORS } from '../../types/vibebooth';

const VIBES = ['romantic', 'energetic', 'cozy', 'dreamy', 'peaceful', 'bright'];

const VibeScreen = () => {
  const { selectedVibe, setVibe, setScreen } = useVibeBooth();

  const handleContinue = () => {
    if (selectedVibe) {
      setScreen('filter');
    }
  };

  return (
    <section className="screen screen--sketch fade-in">
      <h1 className="sketch-title">choose your vibe</h1>

      <div className="sketch-grid sketch-grid--vibes">
        {VIBES.map((vibe) => (
          <button
            key={vibe}
            onClick={() => setVibe(vibe)}
            className={`sketch-option ${selectedVibe === vibe ? 'sketch-option--selected' : ''}`}
          >
            <div
              className="sketch-option__color"
              style={{ backgroundColor: VIBE_COLORS[vibe].overlay.replace('0.1', '0.6').replace('0.12', '0.6').replace('0.15', '0.6') }}
            />
            <span className="sketch-option__label">{VIBE_COLORS[vibe].name}</span>
          </button>
        ))}
      </div>

      <button
        className={`sketch-btn sketch-btn--primary ${!selectedVibe ? 'sketch-btn--disabled' : ''}`}
        onClick={handleContinue}
        disabled={!selectedVibe}
      >
        continue →
      </button>
    </section>
  );
};

export default VibeScreen;
