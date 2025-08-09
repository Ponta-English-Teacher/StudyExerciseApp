import React from 'react';

const SelectionScreen = ({ passages, onSelect }) => {
  return (
    <div className="selection-screen max-w-4xl mx-auto p-4 pb-16">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">📚 Select a Passage</h1>

      {/* Passage list */}
      <div className="space-y-4">
        {passages.map((passage) => (
          <button
            key={passage.id}
            onClick={() => onSelect(passage)}
            className="block w-full text-left p-4 bg-white border rounded shadow hover:bg-gray-100"
          >
            <h2 className="text-lg font-semibold">{passage.title}</h2>
            <p className="text-sm text-gray-600">
              Level: {passage.level || 'N/A'} | Topic: {passage.topic || 'N/A'}
            </p>
          </button>
        ))}
      </div>

      {/* Fixed footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t p-2 text-center text-sm text-gray-600">
        Developed and written by Hitoshi Eguchi © {new Date().getFullYear()} Hokusei Gakuen University
      </footer>
    </div>
  );
};

export default SelectionScreen;