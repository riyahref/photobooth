import React, { useState } from 'react';
import { useVibeBooth } from '../../context/VibeBoothContext';

const MAX_CHARS = 50;

const NoteScreen = () => {
  const { note, setNote, setScreen } = useVibeBooth();
  const [localNote, setLocalNote] = useState(note);

  const handleContinue = () => {
    setNote(localNote);
    setScreen('preview');
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setLocalNote(value);
    }
  };

  return (
    <section className="screen screen--sketch fade-in">
      <h1 className="sketch-title">add a note</h1>

      <div className="sketch-note">
        <textarea
          value={localNote}
          onChange={handleChange}
          placeholder="write something memorable..."
          className="sketch-note__textarea"
        />
        <p className="sketch-note__count">
          {localNote.length}/{MAX_CHARS}
        </p>
      </div>

      <button
        className="sketch-btn sketch-btn--primary"
        onClick={handleContinue}
      >
        continue →
      </button>
    </section>
  );
};

export default NoteScreen;
