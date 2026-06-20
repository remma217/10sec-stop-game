import { useCallback } from 'react';
import confetti from 'canvas-confetti';

export function useConfetti() {
  
  const fireSSConfettiLoop = useCallback(() => {
    // 最初の一発目を即座に発動
    const shoot = () => {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      
      setTimeout(() => {
        confetti({ particleCount: 40, angle: 60, spread: 55, origin: { x: 0, y: 0.8 } });
      }, 150);

      setTimeout(() => {
        confetti({ particleCount: 40, angle: 120, spread: 55, origin: { x: 1, y: 0.8 } });
      }, 300);
    };

    shoot();

    // 3秒おきに、上記の打ち上げコンボを無限に繰り返すタイマーを設定
    const timerId = setInterval(shoot, 3000);

    // この画面を離れた（あるいはリスタートした）ときに、無限ループのタイマーを止めるための関数を返す
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return { fireSSConfettiLoop };
}
