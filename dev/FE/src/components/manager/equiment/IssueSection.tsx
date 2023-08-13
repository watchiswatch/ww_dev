import { useDroppable } from '@/hooks/dndhooks';
import { Reader } from '@/types/reader.type';
import IssueReaderRow from './IssueReaderRow';

interface IssueSectionProps {
  isOnEdit: boolean;
  readers: Reader[];
  onIssueDrop: (droppedItem: { id: string }) => void;
}

const IssueSection = ({
  isOnEdit,
  readers,
  onIssueDrop,
}: IssueSectionProps) => {
  const { isOver, drop } = useDroppable('reader', onIssueDrop);
  return (
    <div
      ref={drop}
      className="mt-4 py-2 shadow-right-bottom rounded-xl flex flex-col bg-slate-200"
      style={{
        width: 580,
        height: 205,
        backgroundColor: isOver ? 'skyblue' : undefined,
      }}
    >
      {readers.map((reader) => (
        <IssueReaderRow key={reader.reader} data={reader} isOnEdit={isOnEdit} />
      ))}
    </div>
  );
};

export default IssueSection;
