export type Rank = 'SS' | 'A' | 'B' | 'C' | 'D' | 'TIME_UP';

export type JudgeResult = {
  rank: Rank;
  message: string;
  color: string;
};

// ランクごとのテーマカラー定義を一括管理
const RANK_COLORS: Record<Rank, string> = {
  SS: '#ffcc00',
  A: '#ff4d4d',
  B: '#007bff',
  C: '#28a745',
  D: '#6c757d',
  TIME_UP: '#dc3545',
};

export function judgeRank(measuredTime: number): JudgeResult {
  // 20秒以上の場合はタイムアップ判定を最優先で返す
  if (measuredTime >= 20.00) {
    return { 
      rank: 'TIME_UP', 
      message: 'タイムアップ！10秒を大幅に過ぎてしまいました（記録なし）', 
      color: RANK_COLORS.TIME_UP 
    };
  }

  const timeDiff = parseFloat(Math.abs(measuredTime - 10.00).toFixed(2));

  if (timeDiff === 0) return { rank: 'SS', message: 'おめでとう！ぴったり10秒！', color: RANK_COLORS.SS };
  if (timeDiff <= 0.05) return { rank: 'A', message: '素晴らしい精度！お見事！', color: RANK_COLORS.A };
  if (timeDiff <= 0.20) return { rank: 'B', message: 'かなりの好記録！あと少し！', color: RANK_COLORS.B };
  if (timeDiff <= 0.50) return { rank: 'C', message: 'まずまずの記録！', color: RANK_COLORS.C };
  return { rank: 'D', message: 'まだまだ挑戦！', color: RANK_COLORS.D };
}
