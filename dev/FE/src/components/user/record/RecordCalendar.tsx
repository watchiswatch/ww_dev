import { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import { useQuery } from '@tanstack/react-query';
import recordApi from '@/api/recordApi';
import { Exercise } from '@/pages/user/RecordPage';
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
interface RecordCalendarProps {
  setPickDate: React.Dispatch<React.SetStateAction<string>>;
  setExerciseList: React.Dispatch<React.SetStateAction<Exercise[]>>;
  exerciseList: Exercise[];
}

const RecordCalendar = ({
  setPickDate,
  setExerciseList,
  exerciseList,
}: RecordCalendarProps) => {
  const [today, onChange] = useState<Value>(new Date());

  const handleDateClick = (date: Date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setPickDate(formattedDate);
  };
  const [pickMonth, setPickMonth] = useState<Date | null>(null);
  useQuery<Exercise[]>(['records', pickMonth], async () => {
    // pickMonth가 null인 경우에 대한 예외 처리
    let month = '';
    if (!pickMonth) {
      month = moment(new Date()).format('YYYY-MM');
    } else {
      month = moment(pickMonth).format('YYYY-MM');
    }
    const response = await recordApi({ date: month });
    setExerciseList(response);
    return response;
  });

  return (
    <>
      <div className="pt-[10px]">
        <Calendar
          className=" mx-auto border-white  bg-white rounded-[15px]"
          onChange={onChange}
          onClickDay={handleDateClick} // 날짜 클릭시 handleDateClick 함수를 실행
          formatDay={(_, date) => moment(date).format('DD')} // 날'일' 제외하고 숫자만 보이도록 설정
          minDetail="month"
          maxDetail="month"
          value={today}
          onActiveStartDateChange={({ activeStartDate }) =>
            setPickMonth(activeStartDate)
          }
          showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
          tileContent={({ date }) => {
            let html = [];
            if (
              exerciseList.find(
                (x) => x.tagData === moment(date).format('YYYY-MM-DD'),
              )
            ) {
              html.push(
                <div
                  key={date.toString()}
                  className="dot w-2 h-2 bg-green-500 rounded-full mx-auto"
                />,
              );
            } else {
              html.push(<div key={date.toString()} className="w-2 h-2" />);
            }
            return (
              <>
                <div>{html}</div>
              </>
            );
          }}
        />
      </div>
    </>
  );
};

export default RecordCalendar;
