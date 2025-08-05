import React, { useState, useEffect } from 'react';
import PassageViewer from './components/PassageViewer';
import SelectionScreen from './components/SelectionScreen';
import HowToUse from './components/HowToUse';
import readingData from './data/reading.json';

function App() {
  const [selectedPassageId, setSelectedPassageId] = useState(null);
  const [passages, setPassages] = useState([]);
  const [showHowToUse, setShowHowToUse] = useState(false);

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
    <div className="min-h-screen bg-gray-100 relative">
      {/* Always-visible How to Use Button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => setShowHowToUse(true)}
          className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
        >
          📘 使い方
        </button>
      </div>

      {/* How to Use Modal */}
      {showHowToUse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <HowToUse onClose={() => setShowHowToUse(false)} />
        </div>
      )}

      {/* Shared centered container for both pages */}
      <div className="max-w-4xl mx-auto p-4">
        {selectedPassageId ? (
          <PassageViewer passage={selectedPassage} onBack={handleBack} />
        ) : (
          <SelectionScreen passages={passages} onSelect={handleSelect} />
        )}
      </div>
    </div>
  );
}

export default App;