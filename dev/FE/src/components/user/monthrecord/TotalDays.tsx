import { Exercise } from '@/pages/user/RecordPage';

interface TotalDaysProps {
  exerciseList1: Exercise[];
}

const TotalDays = ({ exerciseList1 }: TotalDaysProps) => {
  const countDate: number = new Set(exerciseList1.map((item) => item.tagData))
    .size;

  return (
    <div className="w-[200px] mt-[15px]">
      <div className="w-[120px] h-[30px] mx-auto bg-CustomOrange rounded-[20px] text-white font-Jeju text-center text-[20px]">
        총 운동일
      </div>
      <div className="w-[120px] h-[30px] mt-[5px] mx-auto font-Jeju text-[20px]">
        <p className="text-center">{countDate} 일</p>
      </div>
    </div>
  );
};

export default TotalDays;
