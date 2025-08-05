import React from 'react';

const SelectionScreen = ({ passages, onSelect }) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">📚 Select a Passage</h2>
      <ul className="space-y-2">
        {passages.map((p) => (
          <li key={p.id}>
            <button
              className="w-full text-left border p-3 rounded-lg shadow hover:bg-gray-100"
              onClick={() => {
                if (!p.original || !p.questions) {
                  alert("🚧 This passage will be available soon.");
                  return;
                }
                onSelect(p.id);
              }}
            >
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-gray-600">Level: {p.level} | Topic: {p.topic}</div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectionScreen;