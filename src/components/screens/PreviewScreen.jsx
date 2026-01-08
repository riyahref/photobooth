import { useState, useEffect } from 'react';
import { useVibeBooth } from '../../context/VibeBoothContext';
import { createPhotoStrip } from '../../utils/filters';
import { VIBE_COLORS } from '../../types/vibebooth';

const PreviewScreen = () => {
  const {
    photos,
    selectedFilter,
    selectedVibe,
    stripSettings,
    note,
    resetAll,
  } = useVibeBooth();

  const [photoStrip, setPhotoStrip] = useState(null);
  const [isPrinting, setIsPrinting] = useState(true);

  useEffect(() => {
    const generateStrip = async () => {
      const vibeOverlay = selectedVibe ? VIBE_COLORS[selectedVibe].overlay : null;
      
      const strip = await createPhotoStrip(
        photos,
        selectedFilter,
        vibeOverlay,
        stripSettings.borderColor,
        stripSettings.backgroundColor,
        stripSettings.showDate,
        note
      );
      
      setPhotoStrip(strip);
      
      setTimeout(() => {
        setIsPrinting(false);
      }, 2000);
    };

    generateStrip();
  }, [photos, selectedFilter, selectedVibe, stripSettings, note]);

  const handleDownload = () => {
    if (!photoStrip) return;

    const link = document.createElement('a');
    link.download = `photobooth-${Date.now()}.png`;
    link.href = photoStrip;
    link.click();
  };

  const handleRetake = () => {
    resetAll();
  };

  return (
    <section className="screen screen--sketch fade-in">
      <div className="sketch-status">
        <div className={`sketch-status__dot ${isPrinting ? 'sketch-status__dot--printing' : 'sketch-status__dot--ready'}`} />
        <p className="sketch-status__text">
          {isPrinting ? 'printing...' : 'ready to collect!'}
        </p>
      </div>

      <div className={`sketch-strip ${!isPrinting ? 'sketch-strip--ready' : ''}`}>
        {photoStrip ? (
          <img
            src={photoStrip}
            alt="Your photo strip"
            className="sketch-strip__image"
          />
        ) : (
          <div className="sketch-strip__loading">
            <p>generating...</p>
          </div>
        )}
      </div>

      <div className="sketch-actions">
        <button
          className={`sketch-btn sketch-btn--primary ${(isPrinting || !photoStrip) ? 'sketch-btn--disabled' : ''}`}
          onClick={handleDownload}
          disabled={isPrinting || !photoStrip}
        >
          collect photo →
        </button>
        <button
          className="sketch-btn sketch-btn--outline"
          onClick={handleRetake}
        >
          retake
        </button>
      </div>
    </section>
  );
};

export default PreviewScreen;
