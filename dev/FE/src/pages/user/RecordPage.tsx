import RecordCalendar from '@/components/user/record/RecordCalendar';
import moment from 'moment';
import RecordDetail from '@/components/user/record/Recorddetail';
import { useState } from 'react';
import WaitTitle from '@/components/user/waitinfo/WaitTitle';

export interface Exercise {
  reader: string;
  name: string;
  userId: string;
  startTime: string;
  endTime: string;
  tagData: string;
}
const RecordPage = () => {
  const [exerciseList, setExerciseList] = useState<Exercise[]>([]);
  const [pickDate, setPickDate] = useState<string>(
    moment(new Date()).format('YYYY-MM-DD'),
  );

  return (
    <div className="mb-[70px] font-Jeju">
      <WaitTitle text="내 운동기록" />
      <RecordCalendar
        setPickDate={setPickDate}
        setExerciseList={setExerciseList}
        exerciseList={exerciseList}
      />

      <RecordDetail selectedDate={pickDate} exerciseList={exerciseList} />
    </div>
  );
};

export { RecordPage };
