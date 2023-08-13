import dayjs from 'dayjs';

export interface DateRenderProps {
  todayDate: dayjs.Dayjs;
  setTodayDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  dropdownVisibility: boolean;
  setDropdownVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const DateRender = ({
  todayDate,
  setTodayDate,
  dropdownVisibility,
  setDropdownVisibility,
}: DateRenderProps) => {
  const handleDate = (index: number) => {
    if (index == 0) {
      setTodayDate(() => {
        return todayDate.add(-1, 'day');
      });
    } else {
      setTodayDate(() => {
        return todayDate.add(1, 'day');
      });
    }
    return todayDate;
  };
  return (
    <>
      <img
        className=" w-10 h-10 -z-[0]"
        src="img/usage/left_circle.png"
        alt="left_circle"
        onClick={() => handleDate(0)}
      />
      <p
        className="mx-2 pt-1 font-Bungee text-3xl"
        onClick={() => setDropdownVisibility(!dropdownVisibility)}
      >
        {todayDate.format('MM - DD')}
      </p>
      <img
        className=" w-10 h-10"
        src="img/usage/right_circle.png"
        alt="right_circle"
        onClick={() => handleDate(1)}
      />
    </>
  );
};

export default DateRender;
