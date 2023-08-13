import { useDraggable, useDroppableForRfidCard } from '@/hooks/dndhooks';
import EquipmentCard from './EquipmentCard';
import { Reader } from '@/types/reader.type';
import { useRef } from 'react';
interface RfidCardProps {
  isOnEdit: boolean;
  data: Reader;
  onEquipmentDrop: (readerData: Reader, droppedItem: { id: string }) => void;
  deleteReader: (reader: Reader) => void;
}

const RfidCard = ({
  isOnEdit,
  data,
  onEquipmentDrop,
  deleteReader,
}: RfidCardProps) => {
  // pureName: '벤치프레스A', '벤치프레스B' 들을 '벤치프레스' 로 변환
  let pureName = null;
  if (data.name !== null) {
    const lastIndex = data.name.length - 1;
    pureName = isNaN(parseInt(data.name[lastIndex]))
      ? data.name
      : data.name.slice(0, lastIndex);
  }
  const ref = useRef(null);
  const { isOver, drop } = useDroppableForRfidCard(
    'equipment',
    onEquipmentDrop,
    data,
  );
  const { drag } = useDraggable('reader', data.reader);
  drag(drop(ref));

  return (
    <div
      ref={isOnEdit ? ref : null}
      style={{ backgroundColor: isOver ? 'red' : undefined }}
      className={`mx-4 w-40 h-48 bg-CustomOrange rounded-lg shadow-right-bottom flex flex-col justify-around items-center relative ${
        isOnEdit ? 'hover:cursor-pointer hover:shadow-2xl' : ''
      }`}
    >
      <span className="text-white text-xl font-semibold">{data.reader}</span>
      {isOnEdit ? (
        <img
          onClick={() => deleteReader(data)}
          className="ml-1 pt-1 hover:cursor-pointer absolute right-7 top-[9px]"
          width={24}
          src="/img/cancel.svg"
          alt="delete"
        />
      ) : null}
      <EquipmentCard title={data.name} equipment={pureName} />
    </div>
  );
};

export default RfidCard;
