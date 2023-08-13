import { UsageData } from '@/types/usage.type';
import { useState } from 'react';
import ShowData from './ShowData';

interface SearchDataProps {
  dailyUsageData: UsageData[];
}

const SearchData = ({ dailyUsageData }: SearchDataProps) => {
  const itemsPerPage = 3; // 페이지당 표시할 항목의 개수

  const [currentPage, setCurrentPage] = useState(1);

  // 현재 페이지에 해당하는 데이터를 계산하는 함수
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return dailyUsageData.slice(startIndex, endIndex);
  };

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderedData = getCurrentPageData();
  return (
    <>
      <div className="float-left -mt-11 pt-5 w-[420px] h-[600px] rounded-[20px] bg-slate-200 mx-auto flex flex-col justify-between shadow-right-bottom shadow-gray-300">
        <ul>
          {renderedData.map((item) => (
            <ShowData renderData={item} key={item.name} />
          ))}
        </ul>
        <div className=" flex justify-center font-Bungee text-2xl ">
          {Array.from(
            { length: Math.ceil(dailyUsageData.length / itemsPerPage) },
            (_, index) => (
              <button
                className="bg-slate-200 "
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                <span>{index + 1}</span>
              </button>
            ),
          )}
        </div>
      </div>
    </>
  );
};

export default SearchData;
