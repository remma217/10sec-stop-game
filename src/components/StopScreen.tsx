import styles from './StopScreen.module.css';

type StopScreenProps = {
  onStop: () => void;
};

export function StopScreen({ onStop }: StopScreenProps) {
  return (
    <div className={styles.container}>
      <p className={styles.counter}>[ カウント中... ]</p>
      <button className={styles.stopButton} onClick={onStop}>
        ストップ！
      </button>
    </div>
  );
}
