import React, { createContext, useContext, useState } from 'react';

const initialState = {
  currentScreen: 'landing',
  photos: [],
  selectedVibe: null,
  selectedFilter: 'original',
  stripSettings: {
    borderColor: '#F5F5DC',
    backgroundColor: '#F5F5DC',
    showDate: true,
  },
  note: '',
  cameraStream: null,
  faceLandmarks: null,
};

const VibeBoothContext = createContext(undefined);

export const VibeBoothProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const setScreen = (screen) => {
    setState(prev => ({ ...prev, currentScreen: screen }));
  };

  const addPhoto = (photo) => {
    setState(prev => ({ ...prev, photos: [...prev.photos, photo] }));
  };

  const clearPhotos = () => {
    setState(prev => ({ ...prev, photos: [] }));
  };

  const setVibe = (vibe) => {
    setState(prev => ({ ...prev, selectedVibe: vibe }));
  };

  const setFilter = (filter) => {
    setState(prev => ({ ...prev, selectedFilter: filter }));
  };

  const updateStripSettings = (settings) => {
    setState(prev => ({
      ...prev,
      stripSettings: { ...prev.stripSettings, ...settings },
    }));
  };

  const setNote = (note) => {
    setState(prev => ({ ...prev, note }));
  };

  const setCameraStream = (stream) => {
    setState(prev => ({ ...prev, cameraStream: stream }));
  };

  const setFaceLandmarks = (landmarks) => {
    setState(prev => ({ ...prev, faceLandmarks: landmarks }));
  };

  const resetAll = () => {
    if (state.cameraStream) {
      state.cameraStream.getTracks().forEach(track => track.stop());
    }
    setState(initialState);
  };

  return (
    <VibeBoothContext.Provider
      value={{
        ...state,
        setScreen,
        addPhoto,
        clearPhotos,
        setVibe,
        setFilter,
        updateStripSettings,
        setNote,
        setCameraStream,
        setFaceLandmarks,
        resetAll,
      }}
    >
      {children}
    </VibeBoothContext.Provider>
  );
};

export const useVibeBooth = () => {
  const context = useContext(VibeBoothContext);
  if (!context) {
    throw new Error('useVibeBooth must be used within a VibeBoothProvider');
  }
  return context;
};
