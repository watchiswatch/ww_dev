interface TimeInputProps {
  hour: string;
  minute: string;
  setHour: (num: string) => void;
  setMinute: (num: string) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({
  hour,
  minute,
  setHour,
  setMinute,
}) => {
  const minutes = Array.from({ length: 6 }, (_, i) => i * 10);

  return (
    <div className="h-11">
      <select
        className="h-11 w-16 rounded-xl p-2"
        value={hour}
        onChange={(e) => {
          setHour(e.target.value);
        }}
      >
        {Array.from({ length: 24 }, (_, i) => i).map((_, i) => (
          <option key={i} value={i}>
            {i < 10 ? '0' + i : i}
          </option>
        ))}
      </select>
      <span className="text-black text-xl">시 </span>
      <select
        className="h-11 w-16 rounded-xl p-2"
        value={minute}
        onChange={(e) => setMinute(e.target.value)}
      >
        {minutes.map((minute) => (
          <option key={minute} value={minute}>
            {minute === 0 ? '00' : minute}
          </option>
        ))}
      </select>
      <span className="text-black text-xl">분</span>
    </div>
  );
};

export default TimeInput;
