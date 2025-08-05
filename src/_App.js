import React, { useState, useEffect } from 'react';
import PassageViewer from './components/PassageViewer';
import SelectionScreen from './components/SelectionScreen';
import readingData from './data/reading.json';

function App() {
  const [selectedPassageId, setSelectedPassageId] = useState(null);
  const [passages, setPassages] = useState([]);

  useEffect(() => {
    const dummyPassages = [
      ...readingData,
      { id: 3, title: "Future Passage 1", level: "B2", topic: "Modern World" },
      { id: 4, title: "Future Passage 2", level: "B1", topic: "Politics" },
      { id: 5, title: "Future Passage 3", level: "B2", topic: "Medicine" }
    ];
    setPassages(dummyPassages);
  }, []);

  const handleSelect = (id) => {
    setSelectedPassageId(id);
  };

  const handleBack = () => {
    setSelectedPassageId(null);
  };

  const selectedPassage = passages.find((p) => p.id === selectedPassageId);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">English Reading App</h1>

      {!selectedPassage && (
        <SelectionScreen passages={passages} onSelect={handleSelect} />
      )}

      {selectedPassage && selectedPassage.original && selectedPassage.questions ? (
        <PassageViewer passage={selectedPassage} onBack={handleBack} />
      ) : selectedPassage ? (
        <>
          <button
            onClick={handleBack}
            className="text-sm text-blue-600 underline hover:text-blue-800 mb-4"
          >
            ← Back to Selection
          </button>
          <p>🚧 This passage is coming soon.</p>
        </>
      ) : null}
    </div>
  );
}

export default App;