import { useDraggable } from '@/hooks/dndhooks';
import EquipmentCard from './EquipmentCard';
import { useEffect, useState } from 'react';
import EditSaveButton from './EditSaveButton';

interface EquipmentListSectionProps {
  isOnEdit: boolean;
  onEditClick: () => void;
}

const EquipmentListSection = ({
  isOnEdit,
  onEditClick,
}: EquipmentListSectionProps) => {
  const equipmentNames = [
    '벤치프레스',
    '데드리프트',
    '스쿼트랙',
    '덤벨',
    '랫풀다운',
    '런닝머신',
    '레그익스텐션',
    '레그프레스',
    '사이클',
    '천국의계단',
    '케이블',
    '케틀벨',
    '풀업바',
  ];

  const itemsPerPage = 6;
  const totalPage = Math.ceil(equipmentNames.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sliceIndex, setSliceIndex] = useState<{ start: number; end: number }>({
    start: 0,
    end: 8,
  });

  const handleUpClick = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
  };

  const handleDownClick = () => {
    if (currentPage >= totalPage) return;
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    const newSliceIndex = {
      start: (currentPage - 1) * itemsPerPage,
      end: currentPage * itemsPerPage,
    };
    setSliceIndex(newSliceIndex);
  }, [currentPage]);

  const equipmentList = equipmentNames.map((name) => {
    const { isDragging, getItem, drag, preview } = useDraggable(
      'equipment',
      name,
    );

    return {
      name,
      isDragging,
      getItem,
      drag,
      preview,
    };
  });

  return (
    <>
      {isOnEdit ? (
        <div
          className="py-4 px-4 shadow-right-bottom rounded-xl flex justify-between bg-slate-200"
          style={{ width: 580, height: 300 }}
        >
          <div className="flex flex-wrap">
            {equipmentList.slice(sliceIndex.start, sliceIndex.end).map((eq) => (
              <div key={eq.name} className="mx-4 mb-3">
                <EquipmentCard
                  title={eq.name}
                  equipment={eq.name}
                  dragRef={isOnEdit ? eq.drag : null}
                  isDragging={eq.isDragging}
                />
              </div>
            ))}
          </div>
          <div className="mt-16 mr-4 flex flex-col justify-between h-32">
            <PagenateArrow onClick={handleUpClick} isUp={true} />
            <PagenateArrow onClick={handleDownClick} isUp={false} />
          </div>
        </div>
      ) : (
        <div
          className="py-8 px-4 shadow-lg rounded-xl flex items-center justify-center bg-slate-200"
          style={{ width: 580, height: 300 }}
        >
          <EditSaveButton title="수정" onClick={onEditClick} />
        </div>
      )}
    </>
  );
};

export default EquipmentListSection;

interface PagenateArrowProps {
  isUp: boolean;
  onClick: () => void;
}

const PagenateArrow = ({ isUp, onClick }: PagenateArrowProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-CustomOrange w-8 h-8 rounded-full flex justify-center items-center"
    >
      {isUp ? '▲' : '▼'}
    </button>
  );
};
