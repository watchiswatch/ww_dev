interface ConfirmModalProps {
  text: string;
  leftButtonTitle: string;
  rightButtonTitle: string;
  onLeftButtonClick: () => void;
  onRightButtonClick: () => void;
}

const ConfirmModal = ({
  text,
  leftButtonTitle,
  rightButtonTitle,
  onLeftButtonClick,
  onRightButtonClick,
}: ConfirmModalProps) => {
  return (
    <div className="w-[400px] h-[200px] flex flex-col justify-evenly items-center bg-cyan-600 rounded-2xl">
      <div className="text-white text-xl">{text}</div>
      <div>
        <button onClick={onLeftButtonClick} className="mx-7">
          {leftButtonTitle}
        </button>
        <button
          onClick={onRightButtonClick}
          className="mx-7 bg-orange-500 text-white"
        >
          {rightButtonTitle}
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
