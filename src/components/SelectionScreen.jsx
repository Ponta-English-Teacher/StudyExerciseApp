import React from 'react';

const SelectionScreen = ({ passages, onSelect }) => {
  return (
    <div className="selection-screen max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">📚 Select a Passage</h1>

      {/* Author & Developer Credit (friendly + copyright) */}
      <p className="text-xs text-gray-500 mb-6">
        All passages written and app developed by Hitoshi Eguchi @ Hokusei Gakuen University. © 2025 All rights reserved.
      </p>

      <div className="grid gap-4">
        {passages.map((passage) => (
          <div
            key={passage.id}
            className="border border-gray-300 rounded-lg shadow p-4 hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelect(passage)}
          >
            <h2 className="text-lg font-semibold">{passage.title}</h2>
            <p className="text-sm text-gray-600">
              Level: {passage.level} | Topic: {passage.topic}
            </p>
          </div>
        ))}
      </div>

      {/* Footer (small, centered) */}
      <footer className="mt-8 text-center text-xs text-gray-400">
        © 2025 Hitoshi Eguchi. All rights reserved.
      </footer>
    </div>
  );
};

export default SelectionScreen;