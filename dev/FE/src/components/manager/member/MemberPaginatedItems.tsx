import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { MemberItem } from './MemberItem';
import { MemberInfo } from '@/types/member.type';

interface ItemsProps {
  currentItems: MemberInfo[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Items: React.FC<ItemsProps> = ({
  currentItems,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => {
          return (
            <MemberItem
              key={item.userId}
              item={item}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          );
        })}
    </>
  );
};

interface PaginatedItemsProps {
  itemsPerPage: number;
  checkText: string;
  memberInfoLists: MemberInfo[];
}

const MemberPaginatedItems: React.FC<PaginatedItemsProps> = ({
  itemsPerPage,
  checkText,
  memberInfoLists,
}) => {
  const [items, setDummyItems] = useState(memberInfoLists);

  useEffect(() => {
    const filterItems = memberInfoLists.filter((item) =>
      item.name.includes(checkText),
    );
    setDummyItems(filterItems);
  }, [checkText, memberInfoLists]);

  useEffect(() => {
    setItemOffset(0);
    setCurrentPage(0);
  }, [checkText]);

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    setCurrentPage(event.selected + 1);
  };

  return (
    <div className="flex flex-col h-[620px] justify-between">
      <div>
        <ul className="">
          <Items
            currentItems={currentItems}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </ul>
      </div>
      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          nextLinkClassName="text-[#323554] hover:text-CustomOrange"
          className="flex justify-center text-xl"
          pageLinkClassName=" mx-2 text-[#323554] hover:text-CustomOrange"
          disabledLinkClassName="text-black"
          activeLinkClassName="font-extrabold border-b-2 text-[#323554] border-[#323554]"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          previousLinkClassName="text-[#323554] hover:text-CustomOrange"
          renderOnZeroPageCount={null}
          // forcePage={currentPage}
        />
      </div>
    </div>
  );
};

export default MemberPaginatedItems;
