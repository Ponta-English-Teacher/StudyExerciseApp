import React from 'react';

export default function SelectionScreen({ passages, onSelect }) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Select a Passage</h1>
      {passages.length === 0 ? (
        <p>Loading passage list...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {passages.map((passage, index) => (
            <div
              key={`passage-${passage?.id ?? 'na'}-${index}`}
              className="passage-card"
              onClick={() => onSelect(passage.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSelect(passage.id);
              }}
            >
              <h2 className="passage-title">{passage.title}</h2>
              <p className="passage-meta">
                Level: {passage.level} | Topic: {passage.topic}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}