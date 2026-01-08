import { useVibeBooth } from '../../context/VibeBoothContext';
import { STRIP_COLORS, BACKGROUND_COLORS } from '../../types/vibebooth';

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const CustomizeScreen = () => {
  const { stripSettings, updateStripSettings, setScreen } = useVibeBooth();

  return (
    <section className="screen screen--sketch fade-in">
      <h1 className="sketch-title">customize your strip</h1>

      <div className="sketch-sections">
        <div className="sketch-section">
          <h3 className="sketch-section__title">strip color</h3>
          <div className="sketch-colors">
            {STRIP_COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => updateStripSettings({ borderColor: color.value })}
                className={`sketch-color ${stripSettings.borderColor === color.value ? 'sketch-color--selected' : ''}`}
                style={{ backgroundColor: color.value }}
              >
                {stripSettings.borderColor === color.value && <CheckIcon />}
              </button>
            ))}
          </div>
        </div>

        <div className="sketch-section">
          <h3 className="sketch-section__title">background</h3>
          <div className="sketch-colors">
            {BACKGROUND_COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => updateStripSettings({ backgroundColor: color.value })}
                className={`sketch-color ${stripSettings.backgroundColor === color.value ? 'sketch-color--selected' : ''}`}
                style={{ backgroundColor: color.value }}
              >
                {stripSettings.backgroundColor === color.value && <CheckIcon />}
              </button>
            ))}
          </div>
        </div>

        <div className="sketch-section sketch-section--row">
          <h3 className="sketch-section__title">show date stamp</h3>
          <button
            onClick={() => updateStripSettings({ showDate: !stripSettings.showDate })}
            className={`sketch-toggle ${stripSettings.showDate ? 'sketch-toggle--active' : ''}`}
          >
            <div className="sketch-toggle__handle" />
          </button>
        </div>
      </div>

      <button
        className="sketch-btn sketch-btn--primary"
        onClick={() => setScreen('note')}
      >
        continue →
      </button>
    </section>
  );
};

export default CustomizeScreen;
