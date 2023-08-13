import { RankData } from '@/types/user.type';
import { useEffect, useState } from 'react';
interface TotalTimesProps {
  rankMonth: RankData[];
}
const TotalTimes = ({ rankMonth }: TotalTimesProps) => {
  const [myTime, setMyTime] = useState<number>(0);
  const tokendata = localStorage.getItem('userToken');
  useEffect(() => {
    if (tokendata) {
      const myname = JSON.parse(tokendata).subject;
      const findObj = rankMonth.findIndex((obj) => obj.id === myname);
      if (rankMonth[findObj]) {
        setMyTime(Math.round(rankMonth[findObj].second / 60));
      }
    }
  }, [rankMonth]);
  return (
    <div className="w-[200px] mt-[5px]">
      <div className="w-[120px] h-[30px] mx-auto bg-CustomOrange rounded-[20px] text-white font-Jeju text-center text-[20px]">
        총 운동시간
      </div>
      <div className="w-[120px] h-[30px] mt-[5px] mx-auto font-Jeju text-[20px]">
        <p className="text-center">{myTime} 분</p>
      </div>
    </div>
  );
};

export default TotalTimes;
