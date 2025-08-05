// src/components/SelectionListener.jsx
import { useEffect, useState } from 'react';
import DictionaryPopup from './DictionaryPopup';

export default function SelectionListener({ voiceName }) {
  const [selectedText, setSelectedText] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleMouseUp = () => {
      const text = window.getSelection().toString().trim();
      if (text && text.length <= 50) {
        setSelectedText(text);
        setShowPopup(true);
      }
    };
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const handleAddToGlossary = (word, meaning) => {
    const saved = JSON.parse(localStorage.getItem('glossary') || '[]');
    const updated = [...saved, { word, meaning, addedAt: new Date().toISOString() }];
    localStorage.setItem('glossary', JSON.stringify(updated));
    alert(`"${word}" を用語集に追加しました。`);
  };

  return showPopup ? (
    <DictionaryPopup
      selection={selectedText}
      voiceName={voiceName}
      onAddToGlossary={handleAddToGlossary}
      onClose={() => setShowPopup(false)}
    />
  ) : null;
}
