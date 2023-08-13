import { useEffect, useState } from 'react';
import waitListApi from '@/api/waitListApi';
import { EquipList, ReaderStateType } from '@/types/wait.type';
import WaitCard from './WaitCard';

interface WaitListDetailProps {
  section: string;
}

const WaitListDetail = ({ section }: WaitListDetailProps) => {
  const [waitEquipList, setWaitEquipList] = useState<EquipList[]>([]);
  const [filteredList, setFilteredList] = useState<EquipList[]>([]);
  const [state, setState] = useState<ReaderStateType[]>([]);

  useEffect(() => {
    waitListApi(setWaitEquipList, setState);
  }, []);

  useEffect(() => {
    const filteredWaitEquipList = waitEquipList.filter(
      (listitem) => listitem.region === section,
    );
    setFilteredList(filteredWaitEquipList);
  }, [waitEquipList]);

  return (
    <>
      <div className="flex flex-wrap mt-[70px] ml-[150px] fontJeju">
        {filteredList.map((item, idx) => (
          <WaitCard key={item.reader} data={item} state={state[idx]} />
        ))}
      </div>
    </>
  );
};

export default WaitListDetail;
