import React, { useState, useEffect } from 'react';
import PassageViewer from './components/PassageViewer';
import SelectionScreen from './components/SelectionScreen';
import readingData from './data/reading.json';

function App() {
  const [selectedPassageId, setSelectedPassageId] = useState(null);
  const [passages, setPassages] = useState([]);

  // NEW: visitor counter state
  const [visitCount, setVisitCount] = useState(null);

  // Existing: load passages (with dummy future passages)
  useEffect(() => {
    const dummyPassages = [
      ...readingData,
      { id: 3, title: "Future Passage 1", level: "B2", topic: "Modern World" },
      { id: 4, title: "Future Passage 2", level: "B1", topic: "Politics" },
      { id: 5, title: "Future Passage 3", level: "B2", topic: "Medicine" }
    ];
    setPassages(dummyPassages);
  }, []);

  // NEW: fetch visitor counter once on mount
  useEffect(() => {
    let cancelled = false;

    async function fetchVisitCount() {
      try {
        const res = await fetch('/api/visit-counter');
        if (!res.ok) {
          console.warn('Visit counter API returned non-OK status:', res.status);
          return;
        }
        const data = await res.json();
        if (!cancelled && typeof data.visits === 'number') {
          setVisitCount(data.visits);
        }
      } catch (err) {
        console.error('Failed to fetch visit counter:', err);
      }
    }

    fetchVisitCount();

    return () => {
      cancelled = true;
    };
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
      {/* Title + Visitor Counter */}
      <div className="flex items-baseline justify-between mb-4">
        <h1 className="text-2xl font-bold text-center flex-1">
          English Reading App
        </h1>
        <div className="text-xs ml-4 whitespace-nowrap">
          Visitors:{' '}
          <span className="font-semibold">
            {visitCount === null ? '–' : visitCount}
          </span>
        </div>
      </div>

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
