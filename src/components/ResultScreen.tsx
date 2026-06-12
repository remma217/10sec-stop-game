import { judgeRank } from '../utils/judgeRank';
import styles from './ResultScreen.module.css';

type ResultScreenProps = {
  measuredTime: number;
  onRestart: () => void;
};

export function ResultScreen({ measuredTime, onRestart }: ResultScreenProps) {
  const { rank, message, color } = judgeRank(measuredTime);

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
