import { useState, useRef, useEffect } from 'react';
import { StartScreen } from './components/StartScreen';
import { StopScreen } from './components/StopScreen';
import { ResultScreen } from './components/ResultScreen';
import { RankModal } from './components/RankModal';
import { judgeRank } from './utils/judgeRank';
import styles from './App.module.css';

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
    startTimeRef.current = performance.now();

    // ループ関数を定義してリアルタイムに時間を更新
    const updateTimer = () => {
      const currentTime = performance.now();
      const currentElapsed = (currentTime - startTimeRef.current) / 1000;

      // 20秒の上限チェック
      if (currentElapsed >= 20.00) {
        if (timerIdRef.current !== null) {
          cancelAnimationFrame(timerIdRef.current);
          timerIdRef.current = null;
        }
        setElapsedTime(20.00);
        setGameState('RESULT');
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

    // 最終的な確定時間を計測してセット
    const finalTime = (performance.now() - startTimeRef.current) / 1000;
    setElapsedTime(finalTime);
    setGameState('RESULT');

    // 自己ベスト判定のロジック
    // タイムアップ（20秒）の場合は自己ベスト判定から除外する
    if (finalTime < 20.00) {
      // 今回の誤差を計算
      const currentDiff = Math.abs(finalTime - 10.00);

      // 過去の自己ベストの「誤差」を計算（bestTimeが存在する場合のみ）
      const previousBestDiff = bestTime !== null ? Math.abs(bestTime - 10.00) : null;

      // 過去の記録が無い、または「今回の誤差」の方が「過去のベスト誤差」より小さければ更新
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

  // 自己ベストリセット処理
  const handleResetBest = () => {
    if (window.confirm('これまでの自己ベストの記録を完全にリセットしますか？')) {
      localStorage.removeItem('best_measured_time');
      setBestTime(null);
    }
  };

  useEffect(() => {
    return () => {
      if (timerIdRef.current !== null) {
        cancelAnimationFrame(timerIdRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.appContainer}>
      
      {/* ℹ️ ランク一覧を見る ボタンエリア */}
      <div className={styles.header}>
        <button onClick={() => setIsModalOpen(true)} className={styles.modalTrigger}>
          ℹ️ ランク判定基準
        </button>
      </div>

      <h1 className={styles.title}>⏱️ 10秒ストップゲーム</h1>

      {gameState === 'START' && <StartScreen onStart={handleStart} />}
      {gameState === 'STOP' && <StopScreen onStop={handleStop} elapsedTime={elapsedTime} />}
      {gameState === 'RESULT' && <ResultScreen measuredTime={elapsedTime} onRestart={handleRestart} />}

      <RankModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* 自己ベスト表示・管理エリア */}
      <div className={styles.bestScoreContainer}>
        {bestTime !== null ? (
          /* 描画する直前に、現在の自己ベスト時間を judgeRank に通してランク（SS〜D）と動的カラーを取り出す */
          (() => {
            const { rank, color } = judgeRank(bestTime);
            return (
              <p className={styles.bestScoreText}>
                👑 自己ベスト: <span className={styles.bestScoreValue}>{bestTime.toFixed(2)} 秒</span>
                <span style={{ color: color, fontWeight: 'bold', marginLeft: '8px' }}>
                  [ランク{rank}]
                </span>
                <span className={styles.bestScoreSub}>
                  (誤差: {Math.abs(bestTime - 10.00).toFixed(2)}秒)
                </span>
                {/* リセットボタン */}
                <button onClick={handleResetBest} className={styles.resetButton} title="記録をリセット">
                  [リセット]
                </button>
              </p>
            );
          })()
        ) : (
          <p className={styles.noRecordText}>まだ記録がありません。早速チャレンジ！</p>
        )}
      </div>

    </div>
  );
}

export default App;
