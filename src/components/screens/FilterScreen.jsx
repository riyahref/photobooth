import { useEffect, useRef } from 'react';
import { useVibeBooth } from '../../context/VibeBoothContext';
import { VIBE_COLORS } from '../../types/vibebooth';
import { applyFilter, applyVibeOverlay } from '../../utils/filters';

const FILTERS = [
  { value: 'original', label: 'original' },
  { value: 'warm', label: 'warm' },
  { value: 'cool', label: 'cool' },
  { value: 'matte', label: 'matte' },
  { value: 'mono', label: 'mono' },
];

const FilterScreen = () => {
  const { photos, selectedFilter, setFilter, selectedVibe, setScreen } = useVibeBooth();
  const canvasRef = useRef(null);
  const latestPhoto = photos[photos.length - 1];

  useEffect(() => {
    if (!canvasRef.current || !latestPhoto) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = 280;
      canvas.height = 200;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      applyFilter(ctx, canvas.width, canvas.height, selectedFilter);
      
      if (selectedVibe) {
        applyVibeOverlay(ctx, canvas.width, canvas.height, VIBE_COLORS[selectedVibe].overlay);
      }
    };
    img.src = latestPhoto;
  }, [latestPhoto, selectedFilter, selectedVibe]);

  return (
    <section className="screen screen--sketch fade-in">
      <h1 className="sketch-title">choose a filter</h1>

      <div className="sketch-preview">
        <canvas ref={canvasRef} />
      </div>

      <div className="sketch-pills">
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setFilter(filter.value)}
            className={`sketch-pill ${selectedFilter === filter.value ? 'sketch-pill--selected' : ''}`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <button
        className="sketch-btn sketch-btn--primary"
        onClick={() => setScreen('customize')}
      >
        continue →
      </button>
    </section>
  );
};

export default FilterScreen;
