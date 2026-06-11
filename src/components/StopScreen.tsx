import styles from './StopScreen.module.css';

type StopScreenProps = {
  onStop: () => void;
  elapsedTime: number; // 親から受け取る現在の秒数
};

export function StopScreen({ onStop, elapsedTime }: StopScreenProps) {
  // 3.00秒が経過したかどうかの判定フラグ
  const isStealthActive = elapsedTime >= 3.0;

  // 動的にクラス名を切り替える（3秒過ぎたら stealth クラスを追加）
  const counterClassName = `${styles.counter} ${isStealthActive ? styles.stealth : ''}`;

  return (
    <div className={styles.container}>
      {/* 動的に決定したクラス名を適用 */}
      <p className={counterClassName}>{elapsedTime.toFixed(2)} 秒</p>
      
      <button className={styles.stopButton} onClick={onStop}>
        ストップ！
      </button>
    </div>
  );
}
