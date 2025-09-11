// src/components/GlossaryViewer.jsx
import { useState, useEffect } from 'react';
import { playTTS } from '../utils/tts';

export default function GlossaryViewer({ voiceName, onClose }) {
  const [glossary, setGlossary] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('glossary') || '[]');
    setGlossary(saved);
  }, []);

  const handleRemove = (index) => {
    const updated = [...glossary];
    updated.splice(index, 1);
    setGlossary(updated);
    localStorage.setItem('glossary', JSON.stringify(updated));
  };

  return (
    <div style={{ position: 'fixed', bottom: '4rem', left: 0, right: 0, backgroundColor: '#fff', borderTop: '1px solid #ccc', padding: '1rem', maxHeight: '50vh', overflowY: 'auto', zIndex: 1000 }}>
      <h3>📘 あなたの用語集</h3>
      <ul style={{ padding: 0, listStyle: 'none' }}>
        {glossary.map((entry, index) => (
          <li key={index} style={{ marginBottom: '1rem' }}>
            <strong>{entry.word}</strong><br />
            <span>{entry.meaning}</span><br />
            <button onClick={() => playTTS(entry.word, voiceName)}>🔊</button>
            <button onClick={() => handleRemove(index)} style={{ marginLeft: '0.5rem' }}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
