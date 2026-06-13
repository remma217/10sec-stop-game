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
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [bestTime, setBestTime] = useState<number | null>(() => {
    const saved = localStorage.getItem('best_measured_time');
    return saved ? parseFloat(saved) : null;
  });
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

    // 自己ベスト判定のロジック
    // タイムアップ（20秒）の場合は自己ベスト判定から除外する
    if (finalTime < 20.00) {
      // 今回の誤差を計算
      const currentDiff = Math.abs(finalTime - 10.00);

      // 過去の自己ベストの「誤差」を計算（bestTimeが存在する場合のみ）
      const previousBestDiff = bestTime !== null ? Math.abs(bestTime - 10.00) : null;

      // 過去の記録が無い、または「今回の誤差」の方が「過去のベスト誤差」より小さければ更新！
      if (previousBestDiff === null || currentDiff < previousBestDiff) {
        setBestTime(finalTime);
        localStorage.setItem('best_measured_time', finalTime.toString());
      }
    }
  };

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

      {gameState === 'START' && <StartScreen onStart={handleStart} />}
      {gameState === 'STOP' && <StopScreen onStop={handleStop} elapsedTime={elapsedTime} />}
      {gameState === 'RESULT' && <ResultScreen measuredTime={elapsedTime} onRestart={handleRestart} />}

      <RankModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* 画面最下部への自己ベスト表示エリア */}
      <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px dashed #ccc', color: '#555' }}>
        {bestTime !== null ? (
          <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
            👑 自己ベスト: <span style={{ color: '#ff4d4d' }}>{bestTime.toFixed(2)} 秒</span>
            <span style={{ fontSize: '0.9rem', color: '#888', fontWeight: 'normal', marginLeft: '8px' }}>
              (誤差: {Math.abs(bestTime - 10.00).toFixed(2)}秒)
            </span>
          </p>
        ) : (
          <p style={{ fontStyle: 'italic', color: '#888' }}>まだ記録がありません。早速チャレンジ！</p>
        )}
      </div>

    </div>
  );
}

export default App;
