import { useState } from 'react';

// 画面仕様と状態遷移（GameState）の型定義
type GameState = 'START' | 'STOP' | 'RESULT';

function App() {
  const [gameState, setGameState] = useState<GameState>('START');

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '40px 20px', 
      maxWidth: '600px', 
      margin: '0 auto' 
    }}>
      <h1>⏱️ 10秒ストップゲーム</h1>

      {/* START（トップ画面） */}
      {gameState === 'START' && (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
          <p style={{ fontSize: '1.2rem' }}>自身の感覚のみを頼りにぴったり10秒を目指せ！</p>
          <button 
            onClick={() => setGameState('STOP')}
            style={{ 
              fontSize: '1.5rem', 
              padding: '12px 24px', 
              cursor: 'pointer',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            スタートする
          </button>
        </div>
      )}

      {/* STOP（カウント中） */}
      {gameState === 'STOP' && (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff4d4d' }}>[ カウント中... ]</p>
          <button 
            onClick={() => setGameState('RESULT')}
            style={{ 
              fontSize: '1.5rem', 
              padding: '12px 24px', 
              cursor: 'pointer',
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            ストップ！
          </button>
        </div>
      )}

      {/* RESULT（結果画面） */}
      {gameState === 'RESULT' && (
        <div style={{ padding: '20px', border: '2px solid #333', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h2>📊 結果発表</h2>
          <p style={{ fontSize: '1.1rem' }}>（ここに測定秒数、ランク、メッセージが表示されます）</p>
          
          <button 
            onClick={() => setGameState('START')}
            style={{ 
              fontSize: '1.2rem', 
              padding: '10px 20px', 
              cursor: 'pointer',
              backgroundColor: '#6c757d',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              marginTop: '20px'
            }}
          >
            もう一度遊ぶ
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
