import React from 'react';
import { useVibeBooth } from '../../context/VibeBoothContext';

const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
    <circle cx="12" cy="13" r="3"/>
  </svg>
);

const PermissionScreen = () => {
  const { setScreen, setCameraStream } = useVibeBooth();

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
        },
        audio: false,
      });
      setCameraStream(stream);
      setScreen('capture');
    } catch (error) {
      console.error('Camera permission denied:', error);
      alert('Camera permission is required to use the photobooth. Please allow camera access and try again.');
    }
  };

  return (
    <section className="screen screen--sketch fade-in">
      <div className="sketch-card">
        <div className="sketch-card__icon">
          <CameraIcon />
        </div>
        
        <h2 className="sketch-card__title">camera permission</h2>
        
        <p className="sketch-card__text">
          we need access to your camera to capture your photos. your photos stay on your device!
        </p>

        <button
          className="sketch-btn sketch-btn--primary"
          onClick={requestCameraPermission}
        >
          enable camera →
        </button>

        <button
          onClick={() => setScreen('landing')}
          className="sketch-link"
        >
          ← go back
        </button>
      </div>
    </section>
  );
};

export default PermissionScreen;
