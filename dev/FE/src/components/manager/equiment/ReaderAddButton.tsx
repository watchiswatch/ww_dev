interface ReaderAddButtonProps {
  onClick: () => void;
}

const ReaderAddButton = ({ onClick }: ReaderAddButtonProps) => {
  return (
    <div
      onClick={onClick}
      className="w-28 h-28 bg-stone-300 shadow-xl hover:bg-green-400 hover:cursor-pointer rounded-full flex justify-center items-center"
    >
      <img src="/img/plus.svg" alt="plus" width={64} />
    </div>
  );
};

export default ReaderAddButton;
