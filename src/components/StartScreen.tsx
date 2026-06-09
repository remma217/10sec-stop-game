import styles from './StartScreen.module.css';

type StartScreenProps = {
  onStart: () => void;
};

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className={styles.container}>
      <p className={styles.description}>自身の感覚のみを頼りにぴったり10秒を目指せ！</p>
      <button className={styles.startButton} onClick={onStart}>
        スタートする
      </button>
    </div>
  );
}
