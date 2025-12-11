import React, { useState, useEffect, useMemo } from 'react';
import PassageViewer from './components/PassageViewer';
import SelectionScreen from './components/SelectionScreen';
import HowToUse from './components/HowToUse';
import readingData from './data/reading.json';

function App() {
  const [selectedPassageId, setSelectedPassageId] = useState(null);
  const [passages, setPassages] = useState([]);
  const [showHowToUse, setShowHowToUse] = useState(false);

  // NEW: visitor counter state
  const [visitCount, setVisitCount] = useState(null);

  // Load passages directly from the JSON (no dummy items)
  useEffect(() => {
    setPassages(readingData);
  }, []);

  // Dev helper: warn if there are duplicate IDs
  useEffect(() => {
    if (!passages?.length) return;
    const counts = passages.reduce(
      (m, p) => m.set(p.id, (m.get(p.id) || 0) + 1),
      new Map()
    );
    const dups = [...counts.entries()]
      .filter(([, c]) => c > 1)
      .map(([id]) => id);
    if (dups.length) {
      console.warn(
        `[ReadingApp] Duplicate passage IDs detected: ${dups.join(', ')}. ` +
          `Please ensure each "id" in src/data/reading.json is unique.`
      );
    }
  }, [passages]);

  // Quick lookup by id (stable reference)
  const passageById = useMemo(() => {
    const map = new Map();
    passages.forEach((p) => {
      // If duplicates exist, the first one wins; better to keep IDs unique.
      if (!map.has(p.id)) map.set(p.id, p);
    });
    return map;
  }, [passages]);

  const selectedPassage =
    selectedPassageId != null ? passageById.get(selectedPassageId) : null;

  const handleSelect = (id) => setSelectedPassageId(id);
  const handleBack = () => setSelectedPassageId(null);

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

      {/* NEW: simple visitor counter badge (top-right) */}
      <div className="fixed top-4 right-4 z-40 text-xs">
        <div className="bg-white bg-opacity-80 px-3 py-1 rounded shadow border border-gray-200">
          Visitors:{' '}
          <span className="font-semibold">
            {visitCount === null ? '–' : visitCount}
          </span>
        </div>
      </div>

      {/* How to Use Modal */}
      {showHowToUse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <HowToUse onClose={() => setShowHowToUse(false)} />
        </div>
      )}

      {/* Shared centered container for both pages */}
      <div className="max-w-4xl mx-auto p-4">
        {selectedPassage ? (
          <PassageViewer passage={selectedPassage} onBack={handleBack} />
        ) : (
          <SelectionScreen passages={passages} onSelect={handleSelect} />
        )}
      </div>
    </div>
  );
}

export default App;
