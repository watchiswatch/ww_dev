import { approveUserGym, changeUserGym } from '@/api/memberPageApi';
import { UnAuthorizedUser } from '@/types/member.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const ApproveContent = ({
  unAuthorizedUsers,
}: {
  unAuthorizedUsers: UnAuthorizedUser[];
}) => {
  return (
    <div className="bg-white rounded-lg w-[460px] h-[480px] px-4">
      <div className="flex justify-evenly items-center h-14 basis-32 font-bold text-lg text-center border-b-2 border-black">
        <span className="basis-1/4">이름</span>
        <span className="basis-1/4">회원 번호</span>
        <span className="basis-1/4">승인요청일</span>
        <span className="basis-1/4">승인/거절</span>
      </div>
      <div className="border-white border-b-2 h-0"></div>
      <div className="overflow-y-auto">
        {unAuthorizedUsers.map((item) => {
          return <ApproveItem key={item.userId} {...item} />;
        })}
      </div>
    </div>
  );
};

const ApproveItem = ({ ...item }: UnAuthorizedUser) => {
  return (
    <div className="flex justify-evenly items-center h-12 basis-32 text-center">
      <span className="basis-1/4">{item.name}</span>
      <span className="basis-1/4">{item.userId}</span>
      <span className="basis-1/4">{item.date}</span>
      <span className="basis-1/4 flex justify-around">
        <ApproveButton id={item.id} name="승인" />
        <ApproveButton id={item.id} name="거절" />
      </span>
    </div>
  );
};

interface ApproveButtonProps {
  name: string;
  id: string;
}

const ApproveButton = ({ name, id }: ApproveButtonProps) => {
  const queryClient = useQueryClient();
  const approveUserMutation = useMutation((id: string) => approveUserGym(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['memberLists']);
      queryClient.invalidateQueries(['unAuthorizedUsers']);
    },
    onError: () => {},
  });
  const deleteUserMutation = useMutation((id: string) => changeUserGym(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['unAuthorizedUsers']);
    },
    onError: () => {},
  });
  const approveColor = name === '승인' ? 'bg-green-600' : 'bg-red-600';
  const approveButtonClass = `w-12 h-8 p-0 text-white font-bold ${approveColor}`;
  return (
    <button
      onClick={() => {
        if (name === '승인') {
          approveUserMutation.mutate(id);
        } else {
          deleteUserMutation.mutate(id);
        }
      }}
      className={approveButtonClass}
    >
      {name}
    </button>
  );
};

export default ApproveContent;
