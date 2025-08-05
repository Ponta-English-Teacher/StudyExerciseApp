
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
                content: `You are an English learning assistant. 
When given a word, phrase, or sentence, return the result in the following format:

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
