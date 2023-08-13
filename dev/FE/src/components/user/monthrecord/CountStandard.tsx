import { Exercise } from '@/pages/user/RecordPage';

interface CountStandardProps {
  exerciseList1: Exercise[];
}
const CountStandard = ({ exerciseList1 }: CountStandardProps) => {
  const readerCountMap: { [key: string]: number } = {};

  exerciseList1.forEach((record: Exercise) => {
    const tmpReader = record.name;
    const reader = tmpReader.replace(/\d+/g, '');

    if (reader in readerCountMap) {
      readerCountMap[reader]++;
    } else {
      readerCountMap[reader] = 1;
    }
  });

  const sortedCountReaders = Object.keys(readerCountMap).sort(
    (a: string, b: string) => readerCountMap[b] - readerCountMap[a],
  );

  return (
    <>
      <div className="w-[220px] h-[35px] bg-CustomOrange rounded-[20px] text-center  ms-[20px] mt-[10px] ">
        <span className=" font-Jeju text-white text-[20px]">
          많이 사용한 기구(횟수)
        </span>
      </div>
      <div className="flex justify-evenly mt-[10px] bg-CustomBg w-[320px] h-[120px] ms-[20px] rounded-[20px]">
        {sortedCountReaders.length > 0 ? (
          sortedCountReaders
            .slice(0, Math.min(3, sortedCountReaders.length))
            .map((item) => (
              <div key={item}>
                <img
                  className="mx-auto w-[50px] h-[50px] bg-white rounded-[20px] mt-[10px]"
                  src={`/img/equipments/${item}.png`}
                  alt={`${item}.png`}
                />
                <div className="font-Jeju mt-[10px]">
                  <div>{item}</div>
                  <div className="text-center">
                    {' '}
                    {readerCountMap[`${item}`]} 회
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="my-auto font-Jeju">검색 데이터가 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default CountStandard;
