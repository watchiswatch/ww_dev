import { deleteDevice } from '@/api/memberPageApi';
import { MemberInfo } from '@/types/member.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const TagItem = ({ ...item }: MemberInfo) => {
  return (
    <li className="flex justify-evenly items-center h-12 text-center">
      <span className="basis-1/5">{item.userId}</span>
      <span className="basis-1/5">{item.name}</span>
      <div className="basis-2/5 flex justify-evenly items-center">
        <span className="font-bold">{item.deviceCode}</span>
        <DeleteDeviceButton id={item.id} deviceCode={item.deviceCode} />
      </div>
    </li>
  );
};

interface DeleteDeviceButtonProps {
  id: string;
  deviceCode: string | null;
}

const DeleteDeviceButton = ({ id, deviceCode }: DeleteDeviceButtonProps) => {
  const queryClient = useQueryClient();
  const deleteDeviceMutation = useMutation(() => deleteDevice(id, deviceCode), {
    onSuccess: () => {
      queryClient.invalidateQueries(['memberLists']);
    },
    onError: () => {},
  });
  return (
    <button
      onClick={() => deleteDeviceMutation.mutate()}
      className="w-16 h-8 text-white p-0 content-center bg-CustomNavy"
    >
      해제
    </button>
  );
};
