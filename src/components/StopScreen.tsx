import styles from './StopScreen.module.css';

type StopScreenProps = {
  onStop: () => void;
  elapsedTime: number; // 親から受け取る現在の秒数
};

export function StopScreen({ onStop, elapsedTime }: StopScreenProps) {
  return (
    <div className={styles.container}>
      {/* リアルタイムに届く数値を画面に表示する。toFixed(2)で小数点以下2桁に固定 */}
      <p className={styles.counter}>{elapsedTime.toFixed(2)} 秒</p>

      {/* 親から貰った関数をボタンのクリックイベントに仕込む */}
      <button className={styles.stopButton} onClick={onStop}>
        ストップ！
      </button>
    </div>
  );
}
