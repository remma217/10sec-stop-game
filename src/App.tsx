import { useState } from 'react';

// 画面仕様と状態遷移（GameState）の型定義
type GameState = 'START' | 'STOP' | 'RESULT';

function App() {
  const [gameState, setGameState] = useState<GameState>('START');
  // モーダルの開閉状態を管理するステート
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '40px 20px', 
      maxWidth: '600px', 
      margin: '0 auto',
      position: 'relative' // 右上ボタンの配置基準にするため
    }}>
      
      {/* ランク一覧を見る ボタン（画面右上に配置） */}
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1rem',
            cursor: 'pointer',
            color: '#007bff',
            textDecoration: 'underline'
          }}
        >
          ℹ️ ランク一覧を見る
        </button>
      </div>

      <h1>⏱️ 10秒ストップゲーム</h1>

      {/* START（トップ画面） */}
      {gameState === 'START' && (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
          <p style={{ fontSize: '1.2rem' }}>自身の感覚のみを頼りにぴったり10秒を目指せ！</p>
          <button 
            onClick={() => setGameState('STOP')}
            style={{ 
              fontSize: '1.5rem', padding: '12px 24px', cursor: 'pointer',
              backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px'
            }}
          >
            スタートする
          </button>
        </div>
      )}

      {/* 🔴 STOP（カウント中） */}
      {gameState === 'STOP' && (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff4d4d' }}>[ カウント中... ]</p>
          <button 
            onClick={() => setGameState('RESULT')}
            style={{ 
              fontSize: '1.5rem', padding: '12px 24px', cursor: 'pointer',
              backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px'
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
              fontSize: '1.2rem', padding: '10px 20px', cursor: 'pointer',
              backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', marginTop: '20px'
            }}
          >
            もう一度遊ぶ
          </button>
        </div>
      )}

      {/* ランク一覧ポップアップ（モーダル窓） */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff', padding: '25px', borderRadius: '8px', maxWidth: '400px', width: '90%',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)', textAlign: 'left'
          }}>
            <h3 style={{ marginTop: 0, textAlign: 'center' }}>🏆 ランク判定基準</h3>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #ddd', backgroundColor: '#f5f5f5' }}>
                  <th style={{ padding: '8px', textAlign: 'center' }}>ランク</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>判定基準（誤差）</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #eee' }}><td style={{ padding: '8px', textAlign: 'center', fontWeight: 'bold', color: '#ffcc00' }}>SS</td><td style={{ padding: '8px' }}>0.00秒（ジャスト）</td></tr>
                <tr style={{ borderBottom: '1px solid #eee' }}><td style={{ padding: '8px', textAlign: 'center', fontWeight: 'bold', color: '#ff4d4d' }}>A</td><td style={{ padding: '8px' }}>0.05秒以内</td></tr>
                <tr style={{ borderBottom: '1px solid #eee' }}><td style={{ padding: '8px', textAlign: 'center', fontWeight: 'bold', color: '#007bff' }}>B</td><td style={{ padding: '8px' }}>0.20秒以内</td></tr>
                <tr style={{ borderBottom: '1px solid #eee' }}><td style={{ padding: '8px', textAlign: 'center', fontWeight: 'bold', color: '#28a745' }}>C</td><td style={{ padding: '8px' }}>0.50秒以内</td></tr>
                <tr><td style={{ padding: '8px', textAlign: 'center', fontWeight: 'bold', color: '#6c757d' }}>D</td><td style={{ padding: '8px' }}>0.51秒以上</td></tr>
              </tbody>
            </table>

            <div style={{ textAlign: 'center' }}>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{
                  fontSize: '1rem', padding: '8px 20px', cursor: 'pointer',
                  backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px'
                }}
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
