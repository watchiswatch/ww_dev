import { Reader } from '@/types/reader.type';
import RfidCard from './RfidCard';
import ReaderAddButton from './ReaderAddButton';
import { useDroppable } from '@/hooks/dndhooks';

interface EquipmentMatchingSectionProps {
  isOnEdit: boolean;
  readers: Reader[];
  onReaderAddClick: () => void;
  deleteReader: (reader: Reader) => void;
  onEquipmentDrop: (readerData: Reader, droppedItem: { id: string }) => void;
  onIssueDrop: (droppedItem: { id: string }) => void;
}

const EquipmentMatchingSection = ({
  isOnEdit,
  readers,
  onReaderAddClick,
  deleteReader,
  onEquipmentDrop,
  onIssueDrop,
}: EquipmentMatchingSectionProps) => {
  const { isOver, drop } = useDroppable('issue', onIssueDrop);
  return (
    <div
      ref={drop}
      className="pt-10 px-4 shadow-right-bottom rounded-xl flex flex-wrap bg-slate-200"
      style={{
        width: 800,
        height: 520,
        backgroundColor: isOver ? 'skyblue' : undefined,
      }}
    >
      {readers?.map((reader) => (
        <RfidCard
          key={reader.reader}
          isOnEdit={isOnEdit}
          onEquipmentDrop={onEquipmentDrop}
          data={reader}
          deleteReader={deleteReader}
        />
      ))}
      <div className="w-40 h-48 mx-4 flex justify-center items-center">
        {isOnEdit ? <ReaderAddButton onClick={onReaderAddClick} /> : null}
      </div>
    </div>
  );
};

export default EquipmentMatchingSection;
