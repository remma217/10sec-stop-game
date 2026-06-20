import { useEffect } from 'react';
import { judgeRank } from '../utils/judgeRank';
import { useConfetti } from '../hooks/useConfetti';
import styles from './ResultScreen.module.css';

type ResultScreenProps = {
  measuredTime: number;
  onRestart: () => void;
};

export function ResultScreen({ measuredTime, onRestart }: ResultScreenProps) {
  const { rank, message, color } = judgeRank(measuredTime);
  const { fireSSConfettiLoop } = useConfetti();

  useEffect(() => {
    if (rank === 'SS') {
      // ループタイマーを起動し、戻ってきた関数cleanupを受け取る
      const cleanup = fireSSConfettiLoop();
      
      // 結果画面が消える（もう一度遊ぶを押す）とき、自動的にタイマーを破棄する
      return cleanup;
    }
  }, [rank, fireSSConfettiLoop]);

  const getBackgroundColor = (rankName: string) => {
    if (rankName === 'SS') return '#fff9e6';
    if (rankName === 'A') return '#ffe6e6';
    if (rankName === 'B') return '#e6f2ff';
    if (rankName === 'C') return '#e6f7eb';
    if (rankName === 'D') return '#f2f2f2';
    return '#fdf2f2';
  };

  const dynamicBgColor = getBackgroundColor(rank);

  return (
    /* 枠線の色（border）だけ、動的カラーを適用するためにインラインで残す */
    <div className={styles.container} style={{ border: `3px solid ${color}` }}>
      <h2 className={styles.title}>📊 結果発表</h2>

      {/* 🌟 タイムアップかどうかで表示を分ける */}
      {rank === 'TIME_UP' ? (
        <p className={styles.rank} style={{ color: color }}>タイムアップ！</p>
      ) : (
        <>
          <p className={styles.time}>{measuredTime.toFixed(2)} 秒</p>
          <p className={styles.rank} style={{ color: color }}>ランク: {rank}</p>
        </>
      )}
      
      <p className={styles.message}>{message}</p>
      
      <button className={styles.restartButton} onClick={onRestart}>
        もう一度遊ぶ
      </button>
    </div>
  );
}
