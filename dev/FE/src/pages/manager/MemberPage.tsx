import { useState, useEffect } from 'react';
import { TagTableList } from '@/components/manager/member/TagTableList';
import { MemberTableList } from '@/components/manager/member/MemberTableList';
import Modal from '@/components/common/Modal';
import ApproveContent from '@/components/manager/member/ApproveContent';
import { getUserLists, getUnAuthorizedUsers } from '@/api/memberPageApi';
import { useQuery } from '@tanstack/react-query';
import { MemberInfo, UnAuthorizedUser } from '@/types/member.type';

const MemberPage = () => {
  const [isApproveModalOpen, setIsApproveModal] = useState(false);
  const [isSearchText, setIsSearchText] = useState('');
  const [userListsData, setUserListsData] = useState<MemberInfo[]>([]);

  const handleInputSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearchText(e.target.value);
  };
  const openApproveModal = () => {
    setIsApproveModal(!isApproveModalOpen);
  };

  const closeModal = () => {
    if (isApproveModalOpen) {
      setIsApproveModal(false);
    }
  };

  // 회원리스트 불러오기
  const { data, status } = useQuery<MemberInfo[]>(
    ['memberLists'],
    getUserLists,
  );
  // 회원리스트 추적
  useEffect(() => {
    if (status == 'success' && data) {
      setUserListsData(data);
    }
  }, [data, status]);

  // 미승인 회원정보 불러오기
  const { data: unAuthorizedUsers } = useQuery<UnAuthorizedUser[]>(
    ['unAuthorizedUsers'],
    getUnAuthorizedUsers,
  );

  return (
    <div
      onClick={closeModal}
      className="flex justify-between mx-auto mt-8"
      style={{ height: '830px', width: '1440px' }}
    >
      <div className="w-[440px]">
        <TableMenu name="태그 현황" />
        <TagTableList memberInfoLists={userListsData} />
      </div>
      <div className="w-[880px]">
        <div className="flex justify-between">
          <TableMenu name="회원 정보" />
          <div className="ml-40 float-right border-2 bg-white justify-center align-middle items-center border-black/30 flex w-[260px] h-10 rounded-2xl px-0">
            <input
              className="h-6 border-b-2 border-black/30 focus-visible:outline-transparent mr-1"
              type="text"
              placeholder="이름으로 검색"
              onInput={handleInputSearchText}
            />
            <img className="w-8 ml-1" src={`/img/member/loupe.png`} alt="" />
          </div>
        </div>

        <MemberTableList
          memberInfoLists={userListsData}
          checkText={isSearchText}
        />
        <div>
          <Modal onClose={closeModal} isOpen={isApproveModalOpen}>
            <ApproveContent unAuthorizedUsers={unAuthorizedUsers || []} />
          </Modal>
          <button
            className="mt-4 bg-CustomOrange text-white text-lg float-right hover:border-CustomNavy"
            onClick={openApproveModal}
          >
            승인 요청
          </button>
        </div>
      </div>
    </div>
  );
};

interface TableMenuProps {
  name: string;
}

export const TableMenu = (props: TableMenuProps) => {
  return (
    <div className="w-40 h-24 p-2 font-Jeju bg-CustomOrange text-white text-center rounded-2xl text-xl">
      {props.name}
    </div>
  );
};

export default MemberPage;
