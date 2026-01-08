import { useVibeBooth } from '../../context/VibeBoothContext';

const LandingScreen = () => {
  const { setScreen } = useVibeBooth();

  return (
    <section className="screen landing fade-in">
      <div className="landing__container">
        {/* Main Photobooth Illustration */}
        <div className="booth">
          {/* Marquee Sign */}
          <div className="booth__marquee">
            <span className="booth__marquee-text">PHOTOBOOTH</span>
          </div>

          {/* Main Booth Structure */}
          <div className="booth__frame">
            {/* Left side - Featured strips with annotation */}
            <div className="booth__left-section">
              <div className="booth__annotation">
                
                <svg className="booth__annotation-arrow" viewBox="0 0 60 40" fill="none">
                  <path d="M55 5 C 40 5, 20 10, 10 35" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  <path d="M5 30 L 10 35 L 15 30" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              <div className="booth__strips-display">
                <div className="booth__strip">
                  <div className="booth__strip-frame"></div>
                  <div className="booth__strip-frame"></div>
                  <div className="booth__strip-frame"></div>
                </div>
                <div className="booth__strip">
                  <div className="booth__strip-frame"></div>
                  <div className="booth__strip-frame"></div>
                  <div className="booth__strip-frame"></div>
                </div>
              </div>

              {/* Coin dispenser */}
              <div className="booth__dispenser">
                <div className="booth__dispenser-slot"></div>
                <div className="booth__dispenser-tray"></div>
              </div>
            </div>

            {/* Center - Curtain area */}
            <div className="booth__center-section">
              <div className="booth__curtain">
                <div className="booth__curtain-rod"></div>
                <div className="booth__curtain-fabric">
                  <div className="booth__curtain-fold"></div>
                  <div className="booth__curtain-fold"></div>
                  <div className="booth__curtain-fold"></div>
                  <div className="booth__curtain-fold"></div>
                  <div className="booth__curtain-fold"></div>
                </div>
              </div>

              {/* Enter button */}
              <button
                className="booth__enter-btn"
                onClick={() => setScreen('permission')}
              >
                enter →
              </button>
            </div>

            {/* Right side - Stool */}
            <div className="booth__right-section">
              <div className="booth__stool">
                <div className="booth__stool-seat"></div>
                <div className="booth__stool-leg"></div>
                <div className="booth__stool-base"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LandingScreen;
