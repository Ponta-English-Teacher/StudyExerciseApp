import React, { useState } from 'react';

const QuestionBlock = ({ question }) => {
  if (!question) return null; // ✅ Prevent crash if question is undefined

  const { question: text, answer, hint, type } = question;
  const options = question.options && question.options.length > 0
    ? question.options
    : type === "true_false"
      ? ["True", "False"]
      : null;

  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    setShowAnswer(true);
  };

  return (
    <div className="mb-6 p-4 border rounded bg-white shadow">
      <p className="font-medium mb-2">{text}</p>

      {options ? (
        <ul className="space-y-2">
          {options.map((option, index) => (
            <li key={index}>
              <button
                onClick={() => handleSelect(option)}
                className={`w-full text-left px-3 py-2 rounded border ${
                  showAnswer
                    ? option === answer
                      ? 'border-green-500 bg-green-100'
                      : option === selected
                      ? 'border-red-500 bg-red-100'
                      : 'border-gray-300'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="italic text-gray-500">No options available.</p>
      )}

      {showAnswer && (
        <div className="mt-2 text-sm text-gray-700">
          ✅ Correct Answer: <strong>{answer}</strong>
          <br />
          💡 Hint: {hint}
        </div>
      )}
    </div>
  );
};

export default QuestionBlock;