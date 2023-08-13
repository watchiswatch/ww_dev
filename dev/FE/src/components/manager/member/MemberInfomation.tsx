import { changeUserGym, deleteDevice } from '@/api/memberPageApi';
import { MemberInfo } from '@/types/member.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const MemberInfomation = (item: MemberInfo) => {
  const infoTitle = [
    '이름',
    '전화번호',
    '아이디',
    '회원번호',
    '이메일',
    '성별',
  ];
  const queryClient = useQueryClient();
  const deleteDeviceMutation = useMutation(
    () => deleteDevice(item.id, item.deviceCode),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['memberLists']);
      },
      onError: () => {},
    },
  );
  const deleteUserMutation = useMutation((id: string) => changeUserGym(id), {
    onSuccess: () => {
      deleteDeviceMutation.mutate();
    },
    onError: () => {},
  });
  return (
    <div className="text-black pt-2 px-6 w-[400px] h-[440px] bg-CustomBg cursor-default rounded-2xl">
      <div className="w-50 h-16 border-b-2 border-black text-xl font-bold flex justify-center items-center">
        <span className="">회원 상세 정보</span>
      </div>
      <div className="border-white border-b-2 h-0"></div>
      <div className="flex align-middle text-center">
        <div className="basis-1/3">
          {infoTitle.map((item, idx) => {
            return (
              <p key={idx} className="h-12 flex justify-center items-center">
                <span>{item}</span>
              </p>
            );
          })}
        </div>
        <div className="basis-2/3 text-start">
          <p className="h-12 flex items-center">
            <span className="">{item.name}</span>
          </p>
          <p className="h-12 flex items-center">
            <span className="">{item.phoneNumber}</span>
          </p>
          <p className="h-12 flex items-center">
            <span className="">{item.id}</span>
          </p>
          <p className="h-12 flex items-center">
            <span className="">{item.userId}</span>
          </p>
          <p className="h-12 flex items-center">
            <span className="">{item.email}</span>
          </p>
          <p className="h-12 flex items-center">
            <span className="">{item.sex}</span>
          </p>
        </div>
      </div>
      <div className="">
        <button
          onClick={() => deleteUserMutation.mutate(item.id)}
          className="bg-CustomNavy float-right text-white w-24 h-12 text-center p-0"
        >
          회원 해제
        </button>
      </div>
    </div>
  );
};
