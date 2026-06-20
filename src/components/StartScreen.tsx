import { TARGET_TIME } from '../constants/gameConfig';
import styles from './StartScreen.module.css';

type StartScreenProps = {
  onStart: () => void;
};

export function StartScreen({ onStart }: StartScreenProps) {
  const formattedTargetTime = TARGET_TIME.toFixed(2);
  
  return (
    <div className={styles.container}>
      <p className={styles.description}>
        スタートボタンを押すとタイマーが始まります
      </p>
      <p className={styles.description}>
        {formattedTargetTime}秒ぴったりになったと思う瞬間にストップボタンを押してください
      </p>
      <button className={styles.startButton} onClick={onStart}>
        スタート
      </button>
    </div>
  );
}
