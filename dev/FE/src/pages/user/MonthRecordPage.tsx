import { Exercise } from '@/pages/user/RecordPage';
import dayjs from 'dayjs';
// import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import recordApi from '@/api/recordApi';
import { RankData } from '@/types/user.type';
import { getRank } from '@/api/rankApi';
import MonthSelect from '@/components/user/monthrecord/MonthSelect';
import TimeStandard from '@/components/user/monthrecord/TimeStandard';
import CountStandard from '@/components/user/monthrecord/CountStandard';
import TotalDays from '@/components/user/monthrecord/TotalDays';
import TotalTimes from '@/components/user/monthrecord/TotalTimes';
import WholeMonthRank from '@/components/user/monthrecord/WholeMonthRank';
import MyRank from '@/components/user/monthrecord/MyRank';

const MonthRecordPage = () => {
  const [searchMonth, setSearchMonth] = useState<dayjs.Dayjs>(
    dayjs(new Date()),
  );
  const [exerciseList1, setExerciseList11] = useState<Exercise[]>([]);
  const [rankMonth, setRankMonth] = useState<RankData[]>([]);

  const resetListData = async () => {
    const response = await recordApi({ date: searchMonth.format('YYYY-MM') });
    setExerciseList11(response);
    return response;
  };
  const resetRankData = async () => {
    console.log(searchMonth.format('YYYY-MM'));
    const responserank = await getRank(searchMonth.format('YYYY-MM'));
    setRankMonth(responserank);
    console.log(responserank);
  };

  useEffect(() => {
    resetListData();
    resetRankData();
  }, [searchMonth]);

  return (
    <>
      <div className="flex justify-center mx-auto w-[350px] items-center bg-CustomNavy h-14 text-white rounded-lg">
        <MonthSelect
          searchMonth={searchMonth}
          setSearchMonth={setSearchMonth}
        />
      </div>
      <div className="w-[360px] h-[710px] rounded-[15px] bg-white mx-auto">
        <div className="flex">
          <div>
            <MyRank rankMonth={rankMonth} />
          </div>
          <div>
            <TotalDays exerciseList1={exerciseList1} />
            <TotalTimes rankMonth={rankMonth} />
          </div>
        </div>
        <WholeMonthRank rankMonth={rankMonth} />
        <CountStandard exerciseList1={exerciseList1} />
        <TimeStandard exerciseList1={exerciseList1} />
      </div>
    </>
  );
};

export default MonthRecordPage;
