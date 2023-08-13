import { useDraggable } from '@/hooks/dndhooks';
import { Reader } from '@/types/reader.type';

interface IssueReaderRowProps {
  isOnEdit: boolean;
  data: Reader;
}
const IssueReaderRow = ({ isOnEdit, data }: IssueReaderRowProps) => {
  const { drag } = useDraggable('issue', data.reader);
  return (
    <div
      ref={isOnEdit ? drag : null}
      className="mx-5 my-2 px-8 py-1 rounded-lg bg-CustomOrange flex justify-between"
    >
      <span className="font-semibold text-CustomNavy">{data.reader}</span>
      <span className="text-CustomNavy">{data.name}</span>
    </div>
  );
};

export default IssueReaderRow;
