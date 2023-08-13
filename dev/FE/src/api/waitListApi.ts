import { BASEURL } from '@/constants/url';
import { EquipList, ReaderStateType } from '@/types/wait.type';
import { getToken } from '@/utils/storage';
import { EventSourcePolyfill } from 'event-source-polyfill';
const waitListApi = (
  setWaitEquipList: React.Dispatch<React.SetStateAction<EquipList[]>>,
  setState: React.Dispatch<React.SetStateAction<ReaderStateType[]>>,
) => {
  const token = getToken('managerToken');
  const eventSource = new EventSourcePolyfill(BASEURL + 'sse/tags/sse', {
    headers: {
      Authorization: `bearer ${token}`,
    },
    heartbeatTimeout: 600000,
  });

  eventSource.onopen = () => {
    // 연결 시 할 일
    console.log('sse connect success');
  };

  eventSource.onmessage = async (e) => {
    const res = await e.data;
    const parsedData = JSON.parse(res);
    console.log('Tagged', parsedData);
    setWaitEquipList(parsedData);
    const readerStateArray = parsedData.map((data: EquipList) => {
      if (data.userId) return 'using';
      else if (data.waitingCount) return 'waitnext';
      else return 'empty';
    });
    setState(readerStateArray);
    // 받아오는 data로 할 일
  };

  eventSource.onerror = (e: any) => {
    // 종료 또는 에러 발생 시 할 일
    eventSource.close();

    if (e.error) {
      console.log('sse linking error 발생');
      // 에러 발생 시 할 일
    }

    if (e.target.readyState === EventSource.CLOSED) {
      // 종료 시 할 일
    }
  };
};

export default waitListApi;
