import ViewSectionButton from '@/components/manager/waitlist/ViewSectionButton';
import { useQuery } from '@tanstack/react-query';
import { Reader } from '@/types/reader.type';
import { getReaders } from '@/api/equipmentApi';
import { useEffect, useState } from 'react';
const WaitListPage = () => {
  const [sectionList, setSectionList] = useState<(string | null)[]>(['A']);

  const { data, isLoading } = useQuery<Reader[]>(['regions'], getReaders);

  useEffect(() => {
    if (data) {
      const extractRegions = data
        ?.map((cur) => cur.region)
        .filter((cur) => !!cur);
      const regionsSet = new Set(extractRegions);
      const makeArray = [...regionsSet];
      makeArray.sort();
      setSectionList(makeArray);
    }
  }, [data, isLoading]);

  const handleOpenNewTab = (url: string | null) => {
    if (url) {
      window.open(
        `${window.location.href}/${url}`,
        '_blank',
        'width=1920,height=1080',
      );
    }
  };

  return (
    <>
      <div>
        <p className="font-Jeju text-4xl text-CustomNavy font-semibold text-center pt-20">
          구역을 선택하세요
        </p>
      </div>
      <div>
        <div className="w-[960px] mx-auto mt-20 rounded-xl flex flex-wrap bg-white">
          {sectionList.map((sect) =>
            sect ? (
              <ViewSectionButton
                key={sect}
                section={sect}
                onClick={() => handleOpenNewTab(sect)}
              />
            ) : null,
          )}
        </div>
      </div>
    </>
  );
};

export default WaitListPage;
