import { useState } from 'react';

export default function HowToUse() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        onClick={() => setShow(true)}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          zIndex: 1000,
          fontSize: '0.9rem',
        }}
      >
        📘 使い方
      </button>

      {show && (
        <div
          style={{
            position: 'fixed',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '600px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '12px',
            padding: '1.5rem',
            zIndex: 1001,
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            fontSize: '0.95rem',
            lineHeight: '1.6',
          }}
        >
          <h2>このアプリの使い方</h2>
          <p>このアプリは、英語の読解力・語彙力・リスニング力を高めることを目的としています。</p>
          <ul>
            <li>難しい場合は「Show Easier Version」で簡単な文章に切り替えられます。</li>
            <li>問題に答えるとすぐに正誤が表示され、ヒントも表示されます。</li>
            <li>わからない語やフレーズを<strong>選択</strong>すると、意味と日本語訳がポップアップ表示されます。</li>
            <li>「Add to Glossary」を押すと、語彙リストに追加されます。</li>
            <li>画面下の「🧾 Glossary」で追加した単語をいつでも復習できます。</li>
            <li>🔊 ボタンで英語の発音を再生できます。</li>
          </ul>
          <div style={{ textAlign: 'right', marginTop: '1rem' }}>
            <button
              onClick={() => setShow(false)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '20px',
              }}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </>
  );
}