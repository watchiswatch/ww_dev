import { DragElementWrapper } from 'react-dnd';

interface EquipmentCardProps {
  title?: string | null;
  equipment: string | null;
  dragRef?: DragElementWrapper<any> | null;
  isDragging?: boolean;
}

const EquipmentCard = ({
  title,
  equipment,
  dragRef,
  isDragging,
}: EquipmentCardProps) => {
  return (
    <div
      ref={dragRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="bg-white w-28 h-32 rounded-lg shadow-inner-deep flex flex-col justify-around items-center hover:cursor-pointer"
    >
      {equipment ? (
        <>
          <p>{title}</p>
          <img
            src={`/img/equipments/${equipment}.png`}
            alt={equipment}
            width={56}
          />
        </>
      ) : (
        <div>
          <img src="/img/plus.svg" alt="plus" width={60} />
        </div>
      )}
    </div>
  );
};

export default EquipmentCard;
