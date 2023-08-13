import { EquipList } from '@/types/wait.type';
import { useEffect, useState } from 'react';

interface TimerProps {
  data: EquipList;
}

const Timer = ({ data }: TimerProps) => {
  const TOTAL_TIME = 20 * 60;
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_TIME);

  useEffect(() => {
    if (!data.startTime) {
      setTimeLeft(0); // startTime이 null일 경우, 0으로 설정
      return;
    }

    const updateTimeLeft = () => {
      const startTimeUTC = new Date(data.startTime as string).getTime();

      // 현재 UTC 시간을 구하기
      const currentUTC = Date.now();

      // UTC 기준으로 경과 시간 계산
      const elapsedMilliseconds = currentUTC - startTimeUTC;
      const elapsedSecondsTotal = Math.floor(elapsedMilliseconds / 1000);

      // 20분에서 경과 시간을 빼서 남은 시간 계산
      const remainingTime = TOTAL_TIME - elapsedSecondsTotal;

      setTimeLeft(remainingTime > 0 ? remainingTime : 0);
    };

    updateTimeLeft(); // 최초 실행

    const intervalId = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(intervalId);
  }, [data.startTime]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (!data.startTime) {
    return <span className="font-extrabold">00:00</span>;
  }

  return (
    <span className="font-extrabold">
      {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
    </span>
  );
};

export default Timer;
