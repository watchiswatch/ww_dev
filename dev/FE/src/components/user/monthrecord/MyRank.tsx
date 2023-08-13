import { RankData } from '@/types/user.type';
interface MyRankProps {
  rankMonth: RankData[];
}

const MyRank = ({ rankMonth }: MyRankProps) => {
  const tokendata = localStorage.getItem('userToken');
  let myRank: number = 0;
  let bgIcon: string = 'norank';
  if (tokendata) {
    const myname = JSON.parse(tokendata).subject;
    const findObj = rankMonth.findIndex((obj) => obj.id === myname);
    myRank = findObj + 1;
    if (myRank <= 3) {
      bgIcon = 'crown';
      if (myRank == 1) {
        bgIcon = 'crown1';
      }
    }
  }
  let myRankPercent: number = 0;
  if (rankMonth.length != 0) {
    myRankPercent = Math.round((myRank / rankMonth.length) * 100);
  }
  return (
    <div className="w-[140px] h-[140px] ms-[20px]  bg-CustomBg rounded-[20px] mt-[12px]">
      <div className="mx-auto w-[100px] pt-[15px]">
        <img
          className="absolute  w-[80px] h-[80px] ms-[10px]"
          src={`/img/rank/${bgIcon}.png`}
          alt={`${bgIcon}.png`}
        />
        <p className="font-Jeju text-center pt-[35px]">{myRank}등 </p>
        <p className="mt-[15px] text-center font-Jeju">
          [ 상위 {myRankPercent}% ]
        </p>
      </div>
    </div>
  );
};

export default MyRank;
