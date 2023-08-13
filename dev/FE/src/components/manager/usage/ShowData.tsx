import { UsageData } from '@/types/usage.type';

interface ShowDataProps {
  renderData: UsageData;
}

const ShowData = ({ renderData }: ShowDataProps) => {
  return (
    <>
      <div
        className="flex w-[250px] h-[130px] rounded-[20px] bg-CustomOrange mx-auto my-6 shadow-right-bottom shadow-gray-400"
        key={renderData.name}
      >
        <img
          className="w-24 h-24 mt-4 ms-4"
          src={`/img/equipments/${renderData.name.replace(/[0-9]/g, '')}.png`}
          alt={`${renderData.name.replace(/[0-9]/g, '')}.png`}
        />
        <div className="ms-[15px] w-[110px]">
          <p className="font-Jeju text-[20px] text-center pt-[20px]">
            {renderData.name}
          </p>
          <p className="font-Bungee text-4xl pt-[20px] text-center">
            {renderData.searchCount}
          </p>
        </div>
      </div>
    </>
  );
};

export default ShowData;
