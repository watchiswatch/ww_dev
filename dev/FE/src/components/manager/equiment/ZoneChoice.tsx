import { Zone } from '@/types/reader.type';

interface ZoneChoiceProps {
  zoneList: Zone[];
  onZoneClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

const ZoneChoice = ({ zoneList, onZoneClick }: ZoneChoiceProps) => {
  return (
    <div className="m-4">
      {zoneList.map((zone) => {
        return (
          <ZoneButton
            key={zone.name}
            name={zone.name}
            selected={zone.isSelected}
            onClick={onZoneClick}
          />
        );
      })}
    </div>
  );
};

export default ZoneChoice;

interface ZoneButtonProps {
  selected?: boolean;
  name: string;
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

const ZoneButton = ({ selected = false, name, onClick }: ZoneButtonProps) => {
  return (
    <button
      className={
        selected
          ? 'mx-4 bg-black text-white'
          : 'mx-4 border-solid border-2 border-black'
      }
      onClick={onClick}
    >
      {name}
    </button>
  );
};
