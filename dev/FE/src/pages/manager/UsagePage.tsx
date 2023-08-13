import UsageChart from '@/components/manager/usage/UsageChart';
import SearchData from '@/components/manager/usage/SearchData';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getUsageData } from '@/api/usageDataApi';
import { UsageData } from '@/types/usage.type';
import DropDown from '@/components/common/DropDown';
import DateSelect from '@/components/manager/usage/DateSelect';
import DateRender from '@/components/manager/usage/DateRender';
import { TableMenu } from './MemberPage';
const UsagePage = () => {
  const [dropdownVisibility, setDropdownVisibility] = useState<boolean>(false);

  const [todayDate, setTodayDate] = useState<dayjs.Dayjs>(dayjs(new Date()));
  const [dailyUsageData, setDailyUsageData] = useState<UsageData[]>([]);

  useEffect(() => {
    getUsageData(todayDate.format('YYYY-MM-DD'), setDailyUsageData);
    setDropdownVisibility(false);
  }, [todayDate]);

  return (
    <>
      <div className="flex mx-auto w-[1440px] ">
        <div className="w-1/3 pt-12 ">
          <TableMenu name="검색량" />
          <SearchData dailyUsageData={dailyUsageData} />
        </div>
        <div className="w-2/3  pt-12 ">
          <div className="flex -z-50 justify-between h-28 me-1">
            <TableMenu name="이용량" />
            <div className="flex w-[210px] justify-end">
              <DateRender
                todayDate={todayDate}
                setTodayDate={setTodayDate}
                dropdownVisibility={dropdownVisibility}
                setDropdownVisibility={setDropdownVisibility}
              />
              <div className="absolute bg-white z-20  top-[190px] rounded-[20px]">
                <DropDown visibility={dropdownVisibility}>
                  <DateSelect setTodayDate={setTodayDate} />
                </DropDown>
              </div>
            </div>
          </div>
          <UsageChart dailyUsageData={dailyUsageData} />
        </div>
      </div>
    </>
  );
};

export default UsagePage;
