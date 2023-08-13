import { RankData } from '@/types/user.type';

interface DetailRankProps {
  list: RankData;
  rankMonth: RankData[];
}

const DetailRank = ({ list, rankMonth }: DetailRankProps) => {
  const rank = rankMonth.indexOf(list) + 1;
  return (
    <>
      {rank === 1 ? (
        <div className="w-[100px] mx-[15px]">
          <img
            className="absolute  w-[90px]"
            src="/img/rank/crown1.png"
            alt="crown.png"
          />
          <div className="pt-[45px]">
            <div className="text-center font-Jeju me-[10px]">{rank} 등</div>
            <div className="text-center font-Jeju mt-[10px] me-[5px]">
              {list.id} 님
            </div>
            <div className="text-center font-Jeju me-[5px]">
              {Math.round(list.second / 60)} 분
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[100px] pt-[10px] ">
          <img
            className="absolute w-[70px]"
            src="/img/rank/crown.png"
            alt="crown.png"
          />
          <div className="pt-[34px]">
            <div className="text-center font-Jeju me-[30px]">{rank} 등</div>
            <div className="text-center font-Jeju mt-[10px] me-[25px]">
              {list.id} 님
            </div>
            <div className="text-center font-Jeju me-[25px]">
              {Math.round(list.second / 60)} 분
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailRank;
