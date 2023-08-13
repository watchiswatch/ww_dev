import { RankData } from '@/types/user.type';
import DetailRank from './DetailRank';
interface WholeMonthRankProps {
  rankMonth: RankData[];
}

const WholeMonthRank = ({ rankMonth }: WholeMonthRankProps) => {
  return (
    <>
      <div className="w-[150px] h-[35px] bg-CustomOrange rounded-[20px] text-center  ms-[20px] mt-[10px] ">
        <span className=" font-Jeju text-white text-[20px]">이달의 운동왕</span>
      </div>

      <div className="w-[320px] h-[130px] ms-[20px] bg-CustomBg flex mt-[10px] rounded-[20px]">
        {rankMonth.length > 0 ? (
          rankMonth.slice(0, Math.min(3, rankMonth.length)).map((list) => (
            <div key={list.userId}>
              <DetailRank list={list} rankMonth={rankMonth} />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default WholeMonthRank;
