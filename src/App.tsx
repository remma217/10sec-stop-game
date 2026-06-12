import { useState, useRef, useEffect } from 'react';
import { StartScreen } from './components/StartScreen';
import { StopScreen } from './components/StopScreen';
import { ResultScreen } from './components/ResultScreen';
import { RankModal } from './components/RankModal';

// 画面仕様と状態遷移（GameState）の型定義
type GameState = 'START' | 'STOP' | 'RESULT';

function App() {
  const [gameState, setGameState] = useState<GameState>('START');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 計測した経過時間（秒単位、例: 1.234）を管理するState
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  // useRef を使って、再レンダリングを発生させずにタイマーの情報を保持する
  const startTimeRef = useRef<number>(0);
  const timerIdRef = useRef<number | null>(null);

  // ゲームスタート処理
  const handleStart = () => {
    setElapsedTime(0);
    setGameState('STOP');

    // 開始時刻を高精度タイムスタンプで記録
    startTimeRef.current = window.performance.now();

    // ループ関数を定義してリアルタイムに時間を更新
    const updateTimer = () => {
      const currentTime = window.performance.now();
      const currentElapsed = (currentTime - startTimeRef.current) / 1000;

      // 20秒の上限チェック
      if (currentElapsed >= 20.00) {
        // タイマー停止
        if (timerIdRef.current !== null) {
          cancelAnimationFrame(timerIdRef.current);
          timerIdRef.current = null;
        }
        setElapsedTime(20.00); // ぴったり20秒として記録
        setGameState('RESULT'); // 強制的に結果画面へ
        return;
      }

      // 20秒未満なら通常通りカウントアップを続ける
      setElapsedTime(currentElapsed);
      timerIdRef.current = requestAnimationFrame(updateTimer);
    };

    // タイマースタート
    timerIdRef.current = requestAnimationFrame(updateTimer);
  };

  // ゲームストップ処理
  const handleStop = () => {
    // タイマーのループを停止
    if (timerIdRef.current !== null) {
      cancelAnimationFrame(timerIdRef.current);
      timerIdRef.current = null;
    }

    // 最終的な確定時間を計測してセット（ミリ秒未満のわずかなズレもここで完全に補正）
    const finalTime = (window.performance.now() - startTimeRef.current) / 1000;
    setElapsedTime(finalTime);

    setGameState('RESULT');
  };

  // リスタート処理
  const handleRestart = () => {
    setElapsedTime(0);
    setGameState('START');
  };

  // コンポーネントがアンマウントされたときにタイマーを確実にクリアする安全策
  useEffect(() => {
    return () => {
      if (timerIdRef.current !== null) {
        cancelAnimationFrame(timerIdRef.current);
      }
    };
  }, []);

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

      {gameState === 'START' && (
        <StartScreen onStart={handleStart} />
      )}

      {gameState === 'STOP' && (
        /* 経過時間を StopScreen に渡してリアルタイム表示できるようにする */
        <StopScreen onStop={handleStop} elapsedTime={elapsedTime} />
      )}

      {gameState === 'RESULT' && (
        /* 実際に計測された時間を ResultScreen に渡す */
        <ResultScreen measuredTime={elapsedTime} onRestart={handleRestart} />
      )}

      <RankModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
