import styles from './RankModal.module.css';

type RankModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function RankModal({ isOpen, onClose }: RankModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.window}>
        <h3 className={styles.title}>🏆 ランク判定基準</h3>
        
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th className={styles.thRank}>ランク</th>
              <th className={styles.thCriteria}>判定基準（経過時間）</th>
              <th className={styles.thDiff}>誤差</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.trCell}>
              <td className={`${styles.tdRank} ${styles.rankSS}`}>SS</td>
              <td className={styles.tdCriteria}>10.00秒（ぴったり）</td>
              <td className={styles.tdDiff}>0.00秒</td>
            </tr>
            <tr className={styles.trCell}>
              <td className={`${styles.tdRank} ${styles.rankA}`}>A</td>
              <td className={styles.tdCriteria}>9.95秒 〜 10.05秒</td>
              <td className={styles.tdDiff}>±0.05秒以内</td>
            </tr>
            <tr className={styles.trCell}>
              <td className={`${styles.tdRank} ${styles.rankB}`}>B</td>
              <td className={styles.tdCriteria}>9.80秒 〜 10.20秒</td>
              <td className={styles.tdDiff}>±0.20秒以内</td>
            </tr>
            <tr className={styles.trCell}>
              <td className={`${styles.tdRank} ${styles.rankC}`}>C</td>
              <td className={styles.tdCriteria}>9.50秒 〜 10.50秒</td>
              <td className={styles.tdDiff}>±0.50秒以内</td>
            </tr>
            <tr className={styles.trCell}>
              <td className={`${styles.tdRank} ${styles.rankD}`}>D</td>
              <td className={styles.tdCriteria}>9.49秒以下 / 10.51秒以上</td>
              <td className={styles.tdDiff}>0.51秒以上</td>
            </tr>
          </tbody>
        </table>

        <div className={styles.closeButtonContainer}>
          <button className={styles.closeButton} onClick={onClose}>
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
