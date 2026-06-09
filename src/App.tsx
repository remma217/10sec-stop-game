import { useState } from 'react';
import { StartScreen } from './components/StartScreen';
import { StopScreen } from './components/StopScreen';
import { ResultScreen } from './components/ResultScreen';
import { RankModal } from './components/RankModal';

// 画面仕様と状態遷移（GameState）の型定義
type GameState = 'START' | 'STOP' | 'RESULT';

function App() {
  const [gameState, setGameState] = useState<GameState>('START');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // タイマー実装前のため、一旦「9.85秒」で止まったと仮定するダミーのState
  const [dummyTime] = useState<number>(9.85);

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '40px 20px', 
      maxWidth: '600px', 
      margin: '0 auto',
      position: 'relative'
    }}>
      
      {/* ランク一覧を見る ボタン */}
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

      {gameState === 'START' && <StartScreen onStart={() => setGameState('STOP')} />}
      {gameState === 'STOP' && <StopScreen onStop={() => setGameState('RESULT')} />}
      {gameState === 'RESULT' && <ResultScreen measuredTime={dummyTime} onRestart={() => setGameState('START')} />}

      <RankModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
