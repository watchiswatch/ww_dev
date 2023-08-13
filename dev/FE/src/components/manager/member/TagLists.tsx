import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { matchDevice, deviceLists } from '@/api/memberPageApi';
import { Device } from '@/types/member.type';

interface TagListsProps {
  id: string;
  onClose: () => void;
  currentPaginationIdx: number;
  setCurrentPaginationIdx: React.Dispatch<React.SetStateAction<number>>;
}

const TagLists = ({
  id,
  onClose,
  currentPaginationIdx,
  setCurrentPaginationIdx,
}: TagListsProps) => {
  const { data } = useQuery<Device[]>(['deviceLists'], deviceLists);

  const itemsPerPage = 28; // 페이지당 표시할 항목의 개수
  const [currentPage, setCurrentPage] = useState(1);
  // 현재 페이지에 해당하는 데이터를 계산하는 함수
  const getCurrentPageData = () => {
    if (data) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return data.slice(startIndex, endIndex);
    }
    return [];
  };

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderedData = getCurrentPageData();
  return (
    <div className="text-black bg-CustomBg cursor-default w-[460px] h-[640px] p-4 rounded-2xl">
      <div className="h-16 flex justify-center items-center text-xl font-bold border-b-2 border-black">
        <span>디바이스 목록</span>
      </div>
      <div className="h-[540px] flex flex-col justify-between">
        <div className="flex flex-wrap">
          {renderedData.map((item, idx) => {
            return (
              <TagButton
                key={idx}
                currentPaginationIdx={currentPaginationIdx}
                setCurrentPaginationIdx={setCurrentPaginationIdx}
                onClose={onClose}
                id={id}
                deviceCode={item.deviceCode}
              />
            );
          })}
        </div>
        <div className="flex justify-center text-xl">
          {Array.from(
            { length: Math.ceil((data?.length || 0) / itemsPerPage) },
            (_, index) => (
              <button
                className="mx-2 bg-CustomBg text-xl"
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

interface TagButtonProps {
  deviceCode: string;
  id: string;
  onClose: () => void;
  currentPaginationIdx: number;
  setCurrentPaginationIdx: React.Dispatch<React.SetStateAction<number>>;
}

const TagButton = ({
  id,
  deviceCode,
  onClose,
  currentPaginationIdx,
  setCurrentPaginationIdx,
}: TagButtonProps) => {
  const [tempPage, setTempPage] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const matchDeviceMutation = useMutation(() => matchDevice(id, deviceCode), {
    onMutate: () => {
      setTempPage(currentPaginationIdx);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['memberLists']);
      if (tempPage !== null) {
        setCurrentPaginationIdx(tempPage);
      }
      onClose();
    },
    onError: () => {},
  });
  const handleMatchDevice = () => {
    matchDeviceMutation.mutate();
  };
  return (
    <div
      onClick={handleMatchDevice}
      className="w-[100px] h-[64px] my-2 mr-[6px] flex justify-center items-center cursor-pointer bg-CustomNavy text-white text-lg rounded-2xl hover:bg-CustomOrange"
    >
      <span>{deviceCode}</span>
    </div>
  );
};

export default TagLists;
