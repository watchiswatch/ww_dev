interface EditSaveButtonProps {
  title: string;
  onClick: () => void;
}

const EditSaveButton = ({ title, onClick }: EditSaveButtonProps) => {
  return (
    <button onClick={onClick} className="m-4 bg-green-500 h-12 text-white">
      {title}
    </button>
  );
};

export default EditSaveButton;
