import Calendar from 'react-calendar';
import React, { useState } from 'react';
import dayjs from 'dayjs';
export interface DateSelectProps {
  setTodayDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
}
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const DateSelect = ({ setTodayDate }: DateSelectProps) => {
  const [today, onChange] = useState<Value>(new Date());

  const handleDateClick = (date: Date) => {
    const formattedDate = dayjs(date);
    setTodayDate(formattedDate);
  };

  return (
    <div>
      {' '}
      <Calendar
        className=" mx-auto border-white  bg-white rounded-[15px] "
        onChange={onChange}
        onClickDay={handleDateClick} // 날짜 클릭시 handleDateClick 함수를 실행
        formatDay={(_, date) => dayjs(date).format('DD')} // 날'일' 제외하고 숫자만 보이도록 설정
        minDetail="month"
        maxDetail="month"
        value={today}
        showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
      />
    </div>
  );
};

export default DateSelect;
