import React, { useState } from 'react';
import QuestionBlock from './QuestionBlock';
import GlossaryViewer from './GlossaryViewer';
import SelectionListener from './SelectionListener';
import DictionaryPopup from './DictionaryPopup';
import { playTTS } from '../utils/tts';

const PassageViewer = ({ passage, onBack }) => {
  const [showGlossary, setShowGlossary] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [showSimplified, setShowSimplified] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('en-GB-LibbyNeural');

  if (!passage) return <p>Loading passage...</p>;

  const toggleGlossary = () => {
    setShowGlossary(prev => !prev);
  };

  const handleTextSelect = (text, position) => {
    setSelectedText(text);
    setPopupPosition(position);
  };

  const clearSelectedText = () => {
    setSelectedText('');
  };

  const playPassage = () => {
    const textToRead = showSimplified ? passage.simplified : passage.original;
    if (!textToRead) {
      alert("No passage text available for TTS.");
      return;
    }
    playTTS(textToRead, selectedVoice);
  };

  return (
    <div className="passage-viewer max-w-4xl relative mx-auto p-4">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="text-sm text-blue-600 underline hover:text-blue-800 mb-4"
      >
        ← Back to Selection
      </button>

      <div
  className="px-6 md:px-12 max-w-3xl mx-auto"
  style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
>
        {/* Passage Title */}
        <h2 className="text-2xl font-bold mb-4">{passage.title}</h2>

        {/* Controls Row */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <button
            onClick={() => setShowSimplified(prev => !prev)}
            className="px-4 py-2 bg-gray-200 rounded shadow hover:bg-gray-300"
          >
            {showSimplified ? 'Show Original Version' : 'Show Simplified Version'}
          </button>

          <select
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="en-GB-LibbyNeural">🇬🇧 British Female (Libby)</option>
            <option value="en-GB-RyanNeural">🇬🇧 British Male (Ryan)</option>
            <option value="en-US-JennyNeural">🇺🇸 American Female (Jenny)</option>
            <option value="en-US-GuyNeural">🇺🇸 American Male (Guy)</option>
          </select>

          <button
            onClick={playPassage}
            className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 flex items-center gap-2"
          >
            🎙️ Play Passage
          </button>
        </div>

        {/* Passage Text & Questions in a frame */}
        <div className="bg-white border border-gray-300 rounded-lg shadow p-6 md:p-10">
          <p
            className="mb-6 whitespace-pre-line"
            style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
          >
            {showSimplified ? passage.simplified : passage.original}
          </p>

          {/* Questions */}
          {Array.isArray(passage.questions) &&
            passage.questions.map((q, index) => (
              <QuestionBlock key={index} question={q} />
            ))}
        </div>
      </div>

      {/* Toggle Glossary Button */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <button
          onClick={toggleGlossary}
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        >
          {showGlossary ? '📕 Close Glossary' : '📘 Open Glossary'}
        </button>
      </div>

      {/* Glossary Viewer */}
      {showGlossary && (
        <div className="fixed bottom-16 left-0 right-0 bg-white shadow-inner border-t max-h-64 overflow-y-auto z-50 p-4">
          <GlossaryViewer />
        </div>
      )}

      {/* Dictionary Popup */}
      {selectedText && (
        <DictionaryPopup
          text={selectedText}
          position={popupPosition}
          onClose={clearSelectedText}
        />
      )}

      {/* Selection Listener */}
      <SelectionListener onTextSelect={handleTextSelect} />
    </div>
  );
};

export default PassageViewer;