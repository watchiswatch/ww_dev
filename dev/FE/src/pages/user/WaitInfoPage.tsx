import Modal from '@/components/common/Modal';
import TimeInput from '@/components/user/waitinfo/TimeInput';
import WaitEquipmentList from '@/components/user/waitinfo/WaitEquipmentList';
import WaitTitle from '@/components/user/waitinfo/WaitTitle';
import { useState, useEffect, ChangeEvent } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getGymEquipments,
  getGymSearch,
  getUsingGymUsers,
} from '@/api/waitInfoApi';
import FormInput from '@/components/common/FormInput';
import { registGym } from '@/api/waitInfoApi';
import { GymEquipments, SearchingData } from '@/types/user.type';

const WaitInfoPage = () => {
  const token = JSON.parse(localStorage.getItem('userToken') as string);
  const getGymName = token.gymName;
  const { data: usingGymUsers } = useQuery(
    ['getUsingGymUsers'],
    getUsingGymUsers,
    { enabled: !!getGymName },
  );

  const registGymMutation = useMutation(
    (regiGymCode: string) => registGym(regiGymCode),
    {
      onSuccess: () => {
        alert('등록이 완료되었습니다! 헬스장 승인 후에 다시 로그인해주세요.');
      },
      onError: () => {
        alert('헬스장 번호를 입력해 주세요!');
      },
    },
  );
  const [checkGymApprove, setCheckGymApprove] = useState(false);
  useEffect(() => {
    if (token?.regist === 1) {
      setCheckGymApprove(true);
    }
  }, []);

  const [isModal, setIsModal] = useState(false);
  const handleOpenModal = () => {
    setIsModal(true);
  };
  const handleCloseModal = () => {
    setIsModal(false);
  };

  // 헬스장 기구정보
  const { data } = useQuery(['getGymEquipments'], getGymEquipments, {
    enabled: !!getGymName,
  });

  const [searchingData, setSearchingData] = useState<SearchingData | null>(
    null,
  );
  // 헬스장 기구 검색
  const gymSearchMutation = useMutation(
    () =>
      getGymSearch({
        date: `${hour.length == 1 ? '0' + hour : hour}:${
          minute.length == 1 ? '0' + minute : minute
        }`,
        reader: pickEquipment === null ? '' : pickEquipment.reader,
      }),
    {
      onSuccess: (data) => {
        setSearchingData(data);
      },
      onError: () => {
        alert('기구를 선택해주세요!');
      },
    },
  );

  const [regiGymCode, setRegiGymCode] = useState<string>('');
  const handleChangeGymCode = (event: ChangeEvent<HTMLInputElement>) => {
    setRegiGymCode(event.target.value);
  };

  const [pickEquipment, setPickEquipment] = useState<GymEquipments | null>(
    null,
  );
  const handleSetPickEquipment = (equipment: GymEquipments) => {
    setPickEquipment(equipment);
  };
  useEffect(handleCloseModal, [pickEquipment]);

  const [hour, setHour] = useState<string>('00');
  const [minute, setMinute] = useState<string>('00');

  useEffect(() => {
    const date = new Date();
    const roundedMinute = Math.ceil(date.getMinutes() / 10) * 10;
    setHour(String(date.getHours()));
    setMinute(String(roundedMinute));
  }, []);

  return (
    <div className="bg-[#f2f2f2]">
      {checkGymApprove ? (
        <div>
          <WaitTitle text={getGymName} />
          <div className="p-2">
            <span className="float-right">현재 {usingGymUsers}명 이용중</span>
          </div>
          <div className="flex justify-evenly items-center my-4">
            {isModal && (
              <Modal isOpen={isModal} onClose={handleCloseModal}>
                <WaitEquipmentList
                  equiptment={pickEquipment}
                  onClose={handleCloseModal}
                  equipmentLists={data}
                  handlePickEquipment={handleSetPickEquipment}
                />
              </Modal>
            )}
            <div className="flex justify-center">
              <div className="flex flex-col justify-center items-center">
                <EquipmentCircle equipment={pickEquipment} />
                <span className="w-24 text-center">{pickEquipment?.name}</span>
              </div>
            </div>
            <button
              className="w-[200px] h-[66px] text-xl bg-white"
              onClick={handleOpenModal}
            >
              기구 선택 하기
            </button>
          </div>
          <div className="w-[330px] mx-auto flex justify-between items-center my-4">
            <div>
              <TimeInput
                hour={hour}
                minute={minute}
                setHour={setHour}
                setMinute={setMinute}
              />
            </div>
            <button
              onClick={() => gymSearchMutation.mutate()}
              className="w-25 h-11 bg-CustomOrange text-white"
            >
              조회
            </button>
          </div>
          <div className="w-[360px] h-[200px] mt-8 flex justify-evenly py-4 bg-CustomGray rounded-lg mx-auto">
            <div className="w-[120px] text-black border-r-2 border-black">
              <span className="font-bold text-center">실시간</span>
              <p>
                {!searchingData
                  ? 0
                  : !searchingData.now
                  ? 0
                  : searchingData.now}
                명
              </p>
            </div>
            <div className="flex flex-col justify-evenly">
              <div className="w-[176px] h-[40px] bg-white rounded">
                저번주:
                {!searchingData
                  ? 0
                  : !searchingData.week
                  ? 0
                  : searchingData.week}
                명
              </div>
              <div className="w-[176px] h-[40px] bg-white rounded">
                저저번주:
                {!searchingData
                  ? 0
                  : !searchingData.week2
                  ? 0
                  : searchingData.week2}
                명
              </div>
              <div className="w-[176px] h-[40px] bg-white rounded">
                저저저번주:
                {!searchingData
                  ? 0
                  : !searchingData.week3
                  ? 0
                  : searchingData.week3}
                명
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <WaitTitle text="헬스장을 등록하세요!" />
          <div className="p-0 h-16 flex justify-evenly items-center">
            <FormInput
              type="text"
              value={regiGymCode}
              placeholder="헬스장 번호"
              onChange={handleChangeGymCode}
            />
            <button
              className="py-0 h-10 w-[80px] border-2 border-black"
              onClick={() => registGymMutation.mutate(regiGymCode)}
            >
              등록
            </button>
          </div>
          {getGymName && (
            <div>
              <p>{getGymName} 등록 대기중입니다.</p>
              <p>다른 헬스장을 등록하고 싶으시다면 새로 등록을 해주세요</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface EquipmentCircleProps {
  equipment: GymEquipments | null;
}

const EquipmentCircle = ({ equipment }: EquipmentCircleProps) => {
  const name =
    equipment === null
      ? ''
      : isNaN(parseInt(equipment.name[equipment.name.length - 1]))
      ? equipment.name
      : equipment.name.slice(0, equipment.name.length - 1);
  return (
    <div className="bg-white w-[84px] h-[84px] m-3 rounded-full flex justify-center items-center">
      {equipment === null ? (
        <span className="text-2xl text-black">?</span>
      ) : (
        <img src={`/img/equipments/${name}.png`} alt={name} width={52} />
      )}
    </div>
  );
};

export default WaitInfoPage;
