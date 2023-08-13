import { ResponsiveBar } from '@nivo/bar';
import { UsageData } from '@/types/usage.type';
interface UsagePageProps {
  dailyUsageData: UsageData[];
}

const UsagePage = ({ dailyUsageData }: UsagePageProps) => {
  const handle = {
    barClick: (data: any) => {
      console.log(data);
    },

    legendClick: (data: any) => {
      console.log(data);
    },
  };

  return (
    <div className="relative rounded-[20px] -mt-[60px] z-10 bg-slate-200 shadow-right-bottom shadow-gray-300">
      {/* chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정 */}
      <div className="w-[950px] h-[600px] relative rounded-[20px]  mx-auto bg-slate-200 ">
        <ResponsiveBar
          /**
           * chart에 사용될 데이터
           */
          data={dailyUsageData.map((data) => {
            return { equipment: data.name, 이용량: data.usingCount };
          })}
          /**
           * chart에 보여질 데이터 key (측정되는 값)
           */
          keys={['이용량']}
          /**
           * keys들을 그룹화하는 index key (분류하는 값)
           */
          indexBy="equipment"
          /**
           * chart margin
           */
          margin={{ top: 50, right: 20, bottom: 100, left: 50 }}
          /**
           * chart padding (bar간 간격)
           */
          padding={0.3}
          /**
           * chart 색상
           */
          colors={{ scheme: 'nivo' }} // 커스터하여 사용할 때
          // colors={{ scheme: 'nivo' }} // nivo에서 제공해주는 색상 조합 사용할 때
          /**
           * color 적용 방식
           */
          colorBy="indexValue" // 색상을 keys 요소들에 각각 적용
          // colorBy="indexValue" // indexBy로 묵인 인덱스별로 각각 적용

          theme={{
            /**
             * label style (bar에 표현되는 글씨)
             */
            labels: {
              text: {
                fontSize: 14,
                fill: '#000000',
                fontFamily: 'Bungee-Regular',
              },
            },
            /**
             * legend style (default로 우측 하단에 있는 색상별 key 표시)
             */
            legends: {
              text: {
                fontSize: 22,
                fill: '#000000',
                fontFamily: 'JejuGodic',
              },
            },
            axis: {
              /**
               * axis legend style (bottom, left에 있는 글씨)
               */
              legend: {
                text: {
                  fontSize: 20,
                  fill: '#000000',
                  fontFamily: 'JejuGodic',
                },
              },
              /**
               * axis ticks style (bottom, left에 있는 값)
               */
              ticks: {
                text: {
                  fontSize: 16,
                  fill: '#000000',
                  fontFamily: 'JejuGodic',
                },
              },
            },
          }}
          /**
           * axis bottom 설정
           */
          axisBottom={{
            tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
            tickPadding: 15, // tick padding
            tickRotation: -45, // tick 기울기
            legendPosition: 'middle', // 글씨 위치
            legendOffset: 40, // 글씨와 chart간 간격
          }}
          /**
           * axis left 설정
           */
          axisLeft={{
            tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
            tickPadding: 5, // tick padding
            tickRotation: 0, // tick 기울기
            legendPosition: 'middle', // 글씨 위치
            legendOffset: -60, // 글씨와 chart간 간격
          }}
          /**
           * label 안보이게 할 기준 width
           */
          labelSkipWidth={36}
          /**
           * label 안보이게 할 기준 height
           */
          labelSkipHeight={12}
          /**
           * bar 클릭 이벤트
           */
          onClick={handle.barClick}
          /**
           * legend 설정 (default로 우측 하단에 있는 색상별 key 표시)
           */
          legends={[]}
        />
      </div>
    </div>
  );
};

export default UsagePage;
