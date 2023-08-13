interface ViewSectionButtonProps {
  section: string;
  onClick: () => void;
}

const ViewSectionButton = ({ section, onClick }: ViewSectionButtonProps) => {
  return (
    <div
      className="w-60 h-36 m-10 flex justify-center items-center rounded-xl bg-CustomOrange hover:bg-rose-500 shadow-gray-400 shadow-right-bottom hover:cursor-pointer"
      onClick={onClick}
    >
      <span className="font-Jeju text-4xl text-white">
        <span className="font-Bungee">{section}</span> 구역
      </span>
    </div>
  );
};

export default ViewSectionButton;
