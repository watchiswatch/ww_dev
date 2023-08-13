import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { TagItem } from './TagItem';
import { MemberInfo } from '@/types/member.type';

interface ItemsProps {
  currentItems: MemberInfo[];
}

const Items: React.FC<ItemsProps> = ({ currentItems }) => {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => {
          return <TagItem key={item.id} {...item} />;
        })}
    </>
  );
};

interface PaginatedItemsProps {
  itemsPerPage: number;
  usingTagMember: MemberInfo[];
}

const TagPaginatedItems: React.FC<PaginatedItemsProps> = ({
  usingTagMember,
  itemsPerPage,
}) => {
  const items = usingTagMember;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="flex flex-col h-[620px] justify-between">
      <ul className="">
        <Items currentItems={currentItems} />
      </ul>
      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          nextLinkClassName="text-[#323554] hover:text-CustomOrange"
          className="flex justify-center text-xl"
          pageLinkClassName="mx-2 text-[#323554] hover:text-CustomOrange"
          activeLinkClassName="font-extrabold border-b-2 border-[#323554]"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          previousLinkClassName="text-[#323554] hover:text-CustomOrange"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default TagPaginatedItems;
