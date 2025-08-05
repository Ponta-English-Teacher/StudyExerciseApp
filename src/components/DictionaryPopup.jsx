// src/components/DictionaryPopup.jsx
import { useEffect, useState } from 'react';
import { playTTS } from '../utils/tts';
const OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY;


export default function DictionaryPopup({ selection, onClose, voiceName = 'en-GB-LibbyNeural', onAddToGlossary }) {
  const [definition, setDefinition] = useState('');

  useEffect(() => {
    async function fetchDefinition() {
      try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_KEY}`
          },
          body: JSON.stringify({
            model: 'gpt-4',
            messages: [
              {
                role: 'system',
                content: `You are an English learning assistant. When given a word or phrase or sentence, return the result in the following format:


const DictionaryPopup = ({ selectedText, position, onClose }) => {
  const [definition, setDefinition] = useState(null);
  const [translation, setTranslation] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDefinition = async () => {
    if (!selectedText) return;
    setLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful English dictionary. Provide a short, clear learner-style definition in English and a concise Japanese translation for the given word or phrase.'
            },
            {
              role: 'user',
              content: selectedText
            }
          ],
          temperature: 0.3,
          max_tokens: 150
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '';
      const [engDef, jpTrans] = content.split('\n').map(line => line.trim());

      setDefinition(engDef || 'No definition found.');
      setTranslation(jpTrans || '翻訳が見つかりませんでした。');
    } catch (error) {
      console.error('❌ Dictionary fetch error:', error);
      setDefinition('Error fetching definition.');
      setTranslation('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="absolute bg-white border border-gray-300 rounded shadow-lg p-4 z-50"
      style={{ top: position.y + 10, left: position.x + 10 }}
    >
      <button
        onClick={onClose}
        className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
      >
        ✖
      </button>

      <h3 className="font-bold mb-2">📖 Dictionary</h3>
      <p className="italic mb-2">"{selectedText}"</p>

      <button
        onClick={fetchDefinition}
        className="mb-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Get Definition'}
      </button>

      {definition && (
        <div className="mt-2">
          <p><strong>English:</strong> {definition}</p>
          <p><strong>Japanese:</strong> {translation}</p>
        </div>
      )}
    </div>
  );
};

English: [A simple paraphrase or definition in clear English, like a Longman learner dictionary. Use one or two sentences only.]

Japanese: [A concise, direct translation in natural Japanese. DO NOT explain or break down word by word. No grammar or usage commentary.]

Do not include any additional explanation or commentary. Just the two labeled sections: English and Japanese.`
              },
              { role: 'user', content: selection }
            ]
          })
        });

        const data = await res.json();
        setDefinition(data.choices[0].message.content.trim());
      } catch (err) {
        console.error('Error fetching definition:', err);
        setDefinition('エラーが発生しました。');
      }
    }

    if (selection) fetchDefinition();
  }, [selection]);

  return (
    <div style={{ position: 'absolute', bottom: '6rem', left: '1rem', right: '1rem', backgroundColor: '#fff', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', boxShadow: '0 0 8px rgba(0,0,0,0.1)' }}>
      <div style={{ marginBottom: '0.5rem' }}>
        <strong>{selection}</strong>
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <p><strong>English:</strong> {definition.split('Japanese:')[0].trim()}</p>
        <p><strong>Japanese:</strong> {definition.includes('Japanese:') ? definition.split('Japanese:')[1].trim() : ''}</p>
      </div>
      <button onClick={() => playTTS(selection, voiceName)} style={{ marginRight: '0.5rem' }}>🔊 Play</button>
      <button onClick={() => onAddToGlossary(selection, definition)} style={{ marginRight: '0.5rem' }}>➕ Add to Glossary</button>
      <button onClick={onClose}>✖️ Close</button>
    </div>
  );
}