export type Rank = 'SS' | 'A' | 'B' | 'C' | 'D' | 'TIME_UP';

export type JudgeResult = {
  rank: Rank;
  message: string;
  color: string;
};

export function judgeRank(measuredTime: number): JudgeResult {
  // 🌟 20秒以上の場合はタイムアップ判定を最優先で返す
  if (measuredTime >= 20.00) {
    return { rank: 'TIME_UP', message: 'タイムアップ！10秒を大幅に過ぎてしまいました。', color: '#dc3545' };
  }

  const error = Math.abs(measuredTime - 10.00);

  if (error === 0) return { rank: 'SS', message: '文句なし！ぴったり10秒！', color: '#ffcc00' };
  if (error <= 0.05) return { rank: 'A', message: '素晴らしい精度！お見事です！', color: '#ff4d4d' };
  if (error <= 0.20) return { rank: 'B', message: 'かなりの好記録！あと少し！', color: '#007bff' };
  if (error <= 0.50) return { rank: 'C', message: 'まずまずの感覚。もう一回挑戦！', color: '#28a745' };
  return { rank: 'D', message: 'まだまだ挑戦！！', color: '#6c757d' };
}
