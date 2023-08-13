import React from 'react';
import dayjs from 'dayjs';
interface MonthSelectProps {
  searchMonth: dayjs.Dayjs;
  setSearchMonth: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
}

const MonthSelect = ({ searchMonth, setSearchMonth }: MonthSelectProps) => {
  const handleMonth = (index: number) => {
    if (index === 0 && searchMonth != undefined) {
      setSearchMonth(() => {
        return searchMonth.add(-1, 'month');
      });
    }
    if (index === 1 && searchMonth != undefined) {
      setSearchMonth(() => {
        return searchMonth.add(1, 'month');
      });
    }
  };

  return (
    <>
      <button
        className="px-2 py-0 bg-CustomNavy text-CustomOrange text-3xl"
        onClick={() => handleMonth(0)}
      >
        {' '}
        {`<`}{' '}
      </button>
      <p className="text-center text-2xl">
        {searchMonth?.format('MM')} 월의 통계
      </p>
      <button
        className="px-2 py-0 bg-CustomNavy text-CustomOrange text-3xl"
        onClick={() => handleMonth(1)}
      >
        {' '}
        {`>`}{' '}
      </button>
    </>
  );
};

export default MonthSelect;
