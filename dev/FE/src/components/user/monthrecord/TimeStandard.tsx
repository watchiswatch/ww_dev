import { Exercise } from '@/pages/user/RecordPage';

interface TimeStandardProps {
  exerciseList1: Exercise[];
}
const TimeStandard = ({ exerciseList1 }: TimeStandardProps) => {
  const readerCountTimeMap: { [key: string]: number } = {};

  exerciseList1.forEach((record: Exercise) => {
    if (record.endTime != null) {
      const tmpReader = record.name;
      const reader = tmpReader.replace(/\d+/g, '');
      const startTime: any = new Date(record.startTime);
      const endTime: any = new Date(record.endTime);
      const durationInMinutes = (endTime - startTime) / (1000 * 60); // 밀리초를 분으로 변환

      if (reader in readerCountTimeMap) {
        readerCountTimeMap[reader] += durationInMinutes;
      } else {
        readerCountTimeMap[reader] = durationInMinutes;
      }
    }
  });

  const sortedTimeReaders = Object.keys(readerCountTimeMap).sort(
    (a: string, b: string) => readerCountTimeMap[b] - readerCountTimeMap[a],
  );

  return (
    <>
      <div className="w-[220px] h-[35px] bg-CustomOrange rounded-[20px] text-center  ms-[20px] mt-[10px] ">
        <span className=" font-Jeju text-white text-[20px]">
          많이 사용한 기구(시간)
        </span>
      </div>
      <div className="flex justify-evenly mt-[10px] bg-CustomBg w-[320px] h-[120px] ms-[20px] rounded-[20px]">
        {sortedTimeReaders.length > 0 ? (
          sortedTimeReaders
            .slice(0, Math.min(3, sortedTimeReaders.length))
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
                    {Math.round(readerCountTimeMap[`${item}`])} 분
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

export default TimeStandard;
