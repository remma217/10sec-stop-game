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
              <th className={styles.thCell} style={{ textAlign: 'center', width: '15%' }}>ランク</th>
              <th className={styles.thCell} style={{ textAlign: 'left', width: '50%' }}>判定基準（経過時間）</th>
              <th className={styles.thCell} style={{ textAlign: 'right', width: '35%' }}>誤差</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.trCell}>
              <td className={styles.tdCell} style={{ textAlign: 'center', fontWeight: 'bold', color: '#ffcc00' }}>SS</td>
              <td className={styles.tdCell}>10.00秒（ぴったり）</td>
              <td className={styles.tdCell} style={{ textAlign: 'right' }}>0.00秒</td>
            </tr>
            <tr className={styles.trCell}>
              <td className={styles.tdCell} style={{ textAlign: 'center', fontWeight: 'bold', color: '#ff4d4d' }}>A</td>
              <td className={styles.tdCell}>9.95秒 〜 10.05秒</td>
              <td className={styles.tdCell} style={{ textAlign: 'right' }}>±0.05秒以内</td>
            </tr>
            <tr className={styles.trCell}>
              <td className={styles.tdCell} style={{ textAlign: 'center', fontWeight: 'bold', color: '#007bff' }}>B</td>
              <td className={styles.tdCell}>9.80秒 〜 10.20秒</td>
              <td className={styles.tdCell} style={{ textAlign: 'right' }}>±0.20秒以内</td>
            </tr>
            <tr className={styles.trCell}>
              <td className={styles.tdCell} style={{ textAlign: 'center', fontWeight: 'bold', color: '#28a745' }}>C</td>
              <td className={styles.tdCell}>9.50秒 〜 10.50秒</td>
              <td className={styles.tdCell} style={{ textAlign: 'right' }}>±0.50秒以内</td>
            </tr>
            <tr>
              <td className={styles.tdCell} style={{ textAlign: 'center', fontWeight: 'bold', color: '#6c757d' }}>D</td>
              <td className={styles.tdCell}>9.49秒以下 / 10.51秒以上</td>
              <td className={styles.tdCell} style={{ textAlign: 'right' }}>0.51秒以上</td>
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
